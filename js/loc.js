mapboxgl.accessToken = 'pk.eyJ1IjoiZ2xhZHlzbHN3IiwiYSI6ImNraGN4Z2h6eTAxMWEycnBhYWc2ZTBibjgifQ.vurF3g-wliG-lYESX4NH1w';
const map = new mapboxgl.Map({
    container: 'map',
    // style: 'mapbox://styles/mapbox/streets-v11',
    // style: 'mapbox://styles/gladyslsw/cl1h9yxr4000515pk330l6z6c',
    style: 'mapbox://styles/gladyslsw/cl1j13yws000314n6rt4x7ccl',
    center: [114.139, 22.365], // starting position [lng, lat]
    zoom: 10.2, // starting zoom
    pitch: 0,
    // center: [-74.0315, 40.6989],
    // maxZoom: 16,
    // minZoom: 9,
    // zoom: 9.68
    interactive: false,
});

// map.addControl(new mapboxgl.FullscreenControl());

const title = document.getElementById('location-title');
const title_ch = document.getElementById('location-title-ch');
const description = document.getElementById('location-description');

const locations = [
    {
        'title': 'Top 5',
        'title_ch': '',
        'description': 'Hong Kong',
        'camera': {
            center: [114.139, 22.365],
            zoom: 10.2,
            bearing: 0,
            pitch: 0,
            curve: 1,
            // essential: true
        }
    },
    {
        'id': '1',
        'title': 'High Junk Peak',
        'title_ch': '釣魚翁',
        'description': '1st',
        'camera': {
            center: [114.286000, 22.295800],
            bearing: 25.3,
            pitch: 35,
            zoom: 15,
            curve: 1,
            essential: true,
            // easing: 'easeInCubic',
            // animate: true,
        }
    },
    {
        'id': '2',
        'title': 'Kai Kung Leng',
        'title_ch': '雞公嶺',
        'description': "2nd",
        'camera': {
            center: [114.085550, 22.464064],
            zoom: 15,
            pitch: 50,
            curve: 3,
            // essential: true,
        }
    },
    {
        'id': '3',
        'title': 'Tai Mo Shan',
        'title_ch': '大帽山',
        'description':
        "3rd",
        'camera': {
            center: [114.105854, 22.405366],
            bearing: -8.9,
            zoom: 15,
            curve: 3,
            // essential: true,
        }
    },
    {
        'id': '4',
        'title': 'Lion Rock',
        'title_ch': '獅子山',
        'description':
        "4th",
        'camera': {
            center: [114.185731, 22.352515],
            bearing: 36,
            zoom: 15,
            curve: 3,
            // essential: true,
        }
    },
    {
        'id': '5',
        'title': 'Suicide Wall, Kowloon Peak',
        'title_ch': '飛鵝山自殺崖',
        'description':
        '5th',
        'camera': {
            center: [114.223271, 22.338328],
            bearing: 28.4,
            zoom: 15,
            curve: 3,
            // essential: true,
        }
    },
];

function highlightBorough(code) {
    // Only show the polygon feature that corresponds to `borocode` in the data.
    map.setFilter('highlight', ['==', 'borocode', code]);
}

function playback(index) {
    title.textContent = locations[index].title;
    title_ch.textContent = locations[index].title_ch;
    description.textContent = locations[index].description;

    highlightBorough(locations[index].id ? locations[index].id : '');

    // Animate the map position based on camera properties.
    map.flyTo(locations[index].camera);

    map.once('moveend', () => {
        // Duration the slide is on screen after interaction.
        window.setTimeout(() => {
            // Increment index, looping back to the first after the last location.
            index = (index + 1) % locations.length;
            playback(index);
        }, 3000); // After callback, show the location for 3 seconds.
    });
}

// Display the last title/description first.
title.textContent = locations[locations.length - 1].title;
description.textContent = locations[locations.length - 1].description;

map.on('load', () => {
    // map.addSource('boroughs', {
    //     'type': 'vector',
    //     'url': 'mapbox://mapbox.8ibmsn6u'
    // });
    //
    // map.addLayer(
    //     {
    //         'id': 'highlight',
    //         'type': 'fill',
    //         'source': 'boroughs',
    //         'source-layer': 'original',
    //         'paint': {
    //             'fill-color': '#fd6b50',
    //             'fill-opacity': 0.25
    //         },
    //         'filter': ['==', 'borocode', '']
    //     },
    //     // Place polygon under the neighborhood labels.
    //     'settlement-subdivision-label'
    // );

    map.addLayer({
        'id': 'sky',
        'type': 'sky',
        'paint': {
            // set up the sky layer to use a color gradient
            'sky-type': 'gradient',
            // the sky will be lightest in the center and get darker moving radially outward
            // this simulates the look of the sun just below the horizon
            'sky-gradient': [
                'interpolate',
                ['linear'],
                ['sky-radial-progress'],
                0.8,
                'rgba(135, 206, 235, 1.0)',
                1,
                'rgba(0,0,0,0.1)'
            ],
            'sky-gradient-center': [0, 0],
            'sky-gradient-radius': 90,
            'sky-opacity': [
                'interpolate',
                ['exponential', 0.1],
                ['zoom'],
                5,
                0,
                22,
                1
            ]
        };

        // Start the playback animation for each borough.
        playback(0);
    });
