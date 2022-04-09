var layerTypes = {
    'fill': ['fill-opacity'],
    'line': ['line-opacity'],
    'circle': ['circle-opacity', 'circle-stroke-opacity'],
    'symbol': ['icon-opacity', 'text-opacity'],
    'raster': ['raster-opacity'],
    'fill-extrusion': ['fill-extrusion-opacity'],
    'heatmap': ['heatmap-opacity']
}

var alignments = {
    'left': 'lefty',
    'center': 'centered',
    'right': 'righty',
    'full': 'fully'
}

function getLayerPaintType(layer) {
    var layerType = map.getLayer(layer).type;
    return layerTypes[layerType];
}

function setLayerOpacity(layer) {
    var paintProps = getLayerPaintType(layer.layer);
    paintProps.forEach(function(prop) {
        var options = {};
        if (layer.duration) {
            var transitionProp = prop + "-transition";
            options = { "duration": layer.duration };
            map.setPaintProperty(layer.layer, transitionProp, options);
        }
        map.setPaintProperty(layer.layer, prop, layer.opacity, options);
    });
}

var story = document.getElementById('story');
var features = document.createElement('div');
features.setAttribute('id', 'features');


var header = document.createElement('div');

if (config.title) {
    var titleText = document.createElement('h1');
    titleText.innerText = config.title;
    header.appendChild(titleText);
}

if (config.subtitle) {
    var subtitleText = document.createElement('h2');
    subtitleText.innerText = config.subtitle;
    header.appendChild(subtitleText);
}

if (config.byline) {
    var bylineText = document.createElement('p');
    bylineText.innerText = config.byline;
    header.appendChild(bylineText);
}

if (header.innerText.length > 0) {
    header.classList.add(config.theme);
    header.setAttribute('id', 'header');
    story.appendChild(header);
}

config.chapters.forEach((record, idx) => {
    var container = document.createElement('div');
    var chapter = document.createElement('div');

    if (record.title) {
        var title = document.createElement('h4');
        // title.classList.add('fw-bold')
        title.innerText = record.title;
        chapter.appendChild(title);
    }

    if (record.description) {
        var story = document.createElement('h5');
        story.classList.add('text-black-50')
        story.innerHTML = record.description;
        chapter.appendChild(story);
    }

    if (record.image) {
        var image = new Image();
        image.classList.add('rounded')
        image.classList.add('shadow')
        image.src = record.image;
        chapter.appendChild(image);
    }

    if (record.link) {
        var link = document.createElement('a');
        if (record.linktext) {
            link.innerHTML = record.linktext;
        } else {
            link.innerHTML = record.link;
        }
        link.classList.add('text-decoration-none')
        link.href = record.link
        chapter.appendChild(link);
    }

    container.setAttribute('id', record.id);
    container.classList.add('step');
    if (idx === 0) {
        container.classList.add('active');
    }

    chapter.classList.add(config.theme);
    container.appendChild(chapter);
    container.classList.add(alignments[record.alignment] || 'centered');
    if (record.hidden) {
        container.classList.add('hidden');
    }
    features.appendChild(container);
});

story.appendChild(features);

var footer = document.createElement('div');

if (config.footer) {
    var footerText = document.createElement('p');
    footerText.innerHTML = config.footer;
    footer.appendChild(footerText);
}

if (footer.innerText.length > 0) {
    footer.classList.add(config.theme);
    footer.setAttribute('id', 'footer');
    story.appendChild(footer);
}

mapboxgl.accessToken = config.accessToken;

const transformRequest = (url) => {
    const hasQuery = url.indexOf("?") !== -1;
    const suffix = hasQuery ? "&pluginName=scrollytellingV2" : "?pluginName=scrollytellingV2";

    return {
        url: url + suffix
    }
}

var map = new mapboxgl.Map({
    container: 'map',
    style: config.style,
    center: config.chapters[0].location.center,
    zoom: config.chapters[0].location.zoom,
    bearing: config.chapters[0].location.bearing,
    pitch: config.chapters[0].location.pitch,
    interactive: false,
    // transformRequest: transformRequest
});

if (config.showMarkers) {
    var marker = new mapboxgl.Marker({ color: config.markerColor });
    marker.setLngLat(config.chapters[0].location.center).addTo(map);
}

// instantiate the scrollama
var scroller = scrollama();

function handleStepProgress(response) {
    let stepProgress;

    if (response.element.id.slice(0,5) === 'drive') {
        let driveSlideNum = parseInt(response.element.id.slice(-1));
        map.setLayoutProperty('animatedLine', 'visibility', 'visible');
        map.setLayoutProperty('animatedPoint', 'visibility', 'visible');

        if (driveSlideNum === 0) {
            stepProgress = Math.round(response.progress*driveSmoothness);
        } else {
            stepProgress = Math.round(response.progress*driveSmoothness+driveSmoothness*driveSlideNum);
        }
        console.log(response)
        console.log(stepProgress)
        changeCenter(stepProgress);
    } else {
        map.setLayoutProperty('animatedLine', 'visibility', 'none');
        map.setLayoutProperty('animatedPoint', 'visibility', 'none');
    }
}

function rotateCamera(timestamp) {
    const rotateNumber = map.getBearing();
    map.rotateTo(rotateNumber - 180, {
        duration: 20000, easing: function (t) {
            return t;
        }
    });
}

map.on("load", function() {
    if (config.use3dTerrain) {
        map.addSource('mapbox-dem', {
            'type': 'raster-dem',
            'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
            'tileSize': 512,
            'maxzoom': 14
        });
        // add the DEM source as a terrain layer with exaggerated height
        map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });

        // add a sky layer that will show when the map is highly pitched
        map.addLayer({
            'id': 'sky',
            'type': 'sky',
            'paint': {
                'sky-type': 'atmosphere',
                'sky-atmosphere-sun': [0.0, 0.0],
                'sky-atmosphere-sun-intensity': 15
            }
        });
    };

    map.addSource('lineSource', {
        "type": "geojson",
        "data": geojsonPoint
    });

    map.addSource('pointSource', {
        "type": "geojson",
        "data": geojsonPoint
    });

    map.addLayer({
      "id": "animatedLine",
      "type": "line",
      "source": "lineSource",
      'paint': {
            'line-opacity': 1,
            'line-color': '#333',
            'line-width': 3.5
       },
       'layout': {
           'visibility': 'none'
       }
    });

    map.addLayer({
      "id": "animatedPoint",
      "type": "circle",
      "source": "pointSource",
      'paint': {
            'circle-radius': 5,
            'circle-opacity': 1,
            'circle-color': '#333'
      },
      'layout': {
           'visibility': 'none'
       }
    });

    // setup the instance, pass callback functions
    scroller
    .setup({
        step: '.step',
        offset: 0.5,
        progress: true
    })
    .onStepEnter(response => {
        var chapter = config.chapters.find(chap => chap.id === response.element.id);
        response.element.classList.add('active');
        if (chapter.mapAnimation) {
            map[chapter.mapAnimation || 'flyTo'](chapter.location);
        }

        if (config.showMarkers) {
            marker.setLngLat(chapter.location.center);
        }
        if (chapter.onChapterEnter.length > 0) {
            chapter.onChapterEnter.forEach(setLayerOpacity);
        }
        if (chapter.callback) {
            window[chapter.callback]();
        }
        if (chapter.rotateAnimation) {
            map.once('moveend', function() {
                rotateCamera(0);
            });
        }
    })
    .onStepExit(response => {
        var chapter = config.chapters.find(chap => chap.id === response.element.id);
        response.element.classList.remove('active');
        if (chapter.onChapterExit.length > 0) {
            chapter.onChapterExit.forEach(setLayerOpacity);
        }
    })
    .onStepProgress(handleStepProgress);

    createLine();
});

// setup resize event
window.addEventListener('resize', scroller.resize);

$(document).ready(function (){
    $.ajax({
      url: "https://gladysgit.github.io/hkhiking/assets/data/toptrail.json",
      dataType: "json",
      success: function (data) {
        console.log('data', data.features[0]);
        routeData = data;
      },
      error: function () {
        console.log('error loading data');
      }
    });
});
