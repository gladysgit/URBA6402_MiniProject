// Number of slides that will drive (more = smoother)
// If this doesn't match the number of slides named 'drive-slide' in config below you will not complete the full journey
var driveSlides = 3;

// Number of points on drive route (more = higher quality, but slower to process)
var driveSmoothness = 300;

// Value used to drive
var driveTime = driveSlides * driveSmoothness;

// Do you want to follow the point? True = follow
var followPoint = false;

// ...If so, what zoom, pitch, and bearing should be used to follow?
var followZoomLevel = 10;
var followBearing = 0;
var followPitch = 0;

var config = {
    style: 'mapbox://styles/gladyslsw/cl1j13yws000314n6rt4x7ccl',
    accessToken: 'pk.eyJ1IjoiZ2xhZHlzbHN3IiwiYSI6ImNraGN4Z2h6eTAxMWEycnBhYWc2ZTBibjgifQ.vurF3g-wliG-lYESX4NH1w',
    showMarkers: false,
    use3dTerrain: true,
    theme: 'light',
    title: '',
    subtitle: '',
    byline: '',
    footer: '',
    chapters: [
        {
            id: 'intro  ',
            alignment: 'left',
            title: 'Popular Sceneries',
            image: '',
            description: 'The best way to understand the locations is through the map. Let\'s take a <span class="highlight">virtual tour!</span>',
            mapAnimation: 'flyTo',
            location: {
                center: [114.090, 22.365],
                zoom: 10,
                pitch: 0,
                bearing: 0,
            },
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'firstloc',
            alignment: 'right',
            title: '#1 High Junk Peak 釣魚翁',
            image: 'assets/img/loc_1.png',
            description: 'Elevation: 344m<br>Distance to hiking trail: 235m',
            rotateAnimation: true,
            mapAnimation: 'flyTo',
            location: {
                center: [114.286000, 22.295800],
                zoom: 15,
                pitch: 75,
                bearing: 142.1,
                speed: 0.5,
            },
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'secondloc',
            alignment: 'right',
            title: '#2 Kai Kung Leng 雞公嶺',
            image: 'assets/img/loc_2.png',
            description: 'Elevation: 585m<br>Distance to hiking trail: 4806m',
            rotateAnimation: true,
            mapAnimation: 'flyTo',
            location: {
                center: [114.085550, 22.464064],
                zoom: 15,
                pitch: 75,
                bearing: -36.4,
                speed: 0.5,
            },
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'thirdloc',
            alignment: 'right',
            title: '#3 Tai Mo Shan 大帽山',
            image: 'assets/img/loc_3.png',
            description: 'Elevation: 957m<br>Distance to hiking trail: 45m',
            rotateAnimation: true,
            mapAnimation: 'flyTo',
            location: {
                center: [114.129035, 22.400556],
                zoom: 15,
                pitch: 75,
                bearing: 160,
                speed: 0.5,
            },
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'break',
            alignment: 'left',
            title: 'Popular Hiking Trails',
            image: '',
            description: 'So...where are the popular hiking trails? Some sceneries are quite far away from the official hiking trails.',
            mapAnimation: 'flyTo',
            location: {
                center: [114.090, 22.365],
                zoom: 10,
                pitch: 0,
                bearing: 0,
            },
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'trail',
            alignment: 'right',
            title: 'Top Hiking Trail',
            image: '',
            description: 'Maclenose Trail Section 8 - Lead Mine Pass to Route Twisk<br>麥理浩徑第8段鉛鑛坳至荃錦公路',
            mapAnimation: 'flyTo',
            location: {
                center: [114.12911, 22.41206],
                zoom: 13,
                pitch: 0,
                bearing: 0,
            },
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'drive-slide-0',
            alignment: 'left',
            title: 'Second Title',
            image: './path/to/image/source.png',
            description: 'Copy these sections to add to your story.',
            location: {
                // location information is from the drive route
            },
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'drive-slide-1',
            alignment: 'left',
            title: 'Second Title',
            image: './path/to/image/source.png',
            description: 'Copy these sections to add to your story.',
            location: {},
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'drive-slide-2',
            alignment: 'left',
            title: 'Second Title',
            image: './path/to/image/source.png',
            description: 'Copy these sections to add to your story.',
            location: {},
            onChapterEnter: [],
            onChapterExit: []
        },
    ]
};
