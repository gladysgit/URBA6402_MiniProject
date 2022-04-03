mapboxgl.accessToken = 'pk.eyJ1IjoiZ2xhZHlzbHN3IiwiYSI6ImNraGN4Z2h6eTAxMWEycnBhYWc2ZTBibjgifQ.vurF3g-wliG-lYESX4NH1w';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/gladyslsw/cl1j13yws000314n6rt4x7ccl',
    center: [114.139, 22.370], // starting position [lng, lat]
    zoom: 10.2, // starting zoom
    pitch: 0,
    // interactive: false,
});

map.on('load', () => {
    map.addSource('trails', {
        type: 'geojson',
        data: 'https://gladysgit.github.io/URBA6402_MiniProject/assets/data/trail.json',
    });

    map.addLayer({
        'id': 'highlight',
        'type': 'line',
        'source': 'trails',
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'},
        'paint': {
            'line-color': '#888',
            'line-width': 8},
        'filter': ['<=', 'rank_like', 0],
        });

    // map.setFilter('highlight', ['<=', 'rank', '0']);

    map.addLayer({
        'id': 'sky',
        'type': 'sky',
        'paint': {
            'sky-type': 'gradient',
            'sky-gradient': ['interpolate', ['linear'], ['sky-radial-progress'], 0.8, 'rgba(135, 206, 235, 1.0)', 1, 'rgba(0,0,0,0.1)'],
            'sky-gradient-center': [0, 0],
            'sky-gradient-radius': 90,
            'sky-opacity': ['interpolate', ['exponential', 0.1], ['zoom'], 5, 0, 22, 1]}
    });

    // map.setFog({
    //     'range': [0.5, 20],
    //     'color': 'white',
    //     'horizon-blend': 0.1
    // });
});

    const chapters = {
        'intro': {
            center: [114.139, 22.365],
            bearing: 0,
            pitch: 0,
            // curve: 4,
            zoom: 10.2,
            // speed: 0.5,
            essential: true,
        },
        'firstloc': {
            center: [114.286000, 22.295800],
            bearing: 142.1,
            pitch: 75,
            // curve: 4,
            zoom: 15,
            speed: 0.5,
            essential: true,
        },
        'secondloc': {
            center: [114.085550, 22.464064],
            bearing: -36.4,
            pitch: 75,
            zoom: 15,
            curve: 4,
            speed: 0.5,
            essential: true,
        },
        'thirdloc': {
            center: [114.129035, 22.400556],
            bearing: 160,
            pitch: 75,
            zoom: 15,
            curve: 4,
            speed: 0.5,
            essential: true,
        },
        'break': {
            center: [114.139, 22.365],
            bearing: 0,
            pitch: 0,
            // curve: 4,
            zoom: 10.2,
            // speed: 0.5,
            essential: true,
        },
        'trail': {
            center: [114.139, 22.365],
            bearing: 0,
            pitch: 0,
            // curve: 4,
            zoom: 10.2,
            // speed: 0.5,
            essential: true,
        },
    };

    let activeChapterName = 'intro';
    function setActiveChapter(chapterName) {
        if (chapterName === activeChapterName) return;

        map.flyTo(chapters[chapterName]);

        document.getElementById(chapterName).classList.add('active');
        document.getElementById(activeChapterName).classList.remove('active');

        activeChapterName = chapterName;

        if (chapterName === 'trail') {
            map.setFilter('highlight', ['<=', 'rank', '10']);
        }
        else {
            map.setFilter('highlight', ['<=', 'rank', '0']);
        }
    }

    function isElementOnScreen(id) {
        const element = document.getElementById(id);
        const bounds = element.getBoundingClientRect();
        return bounds.top < window.innerHeight && bounds.bottom > 0;
    }

    // On every scroll event, check which element is on screen
    window.onscroll = () => {
        for (const chapterName in chapters) {
            if (isElementOnScreen(chapterName)) {
                setActiveChapter(chapterName);
                break;
            }
        }
    };
