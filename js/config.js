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
            location: {
                center: [114.286000, 22.295800],
                zoom: 15,
                pitch: 75,
                bearing: 142.1,
            },
            rotateAnimation: true,
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
            location: {
                center: [114.085550, 22.464064],
                zoom: 15,
                pitch: 75,
                bearing: -36.4,
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
            location: {
                center: [114.129035, 22.400556],
                zoom: 15,
                pitch: 75,
                bearing: 160,
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
            title: 'Top 3 Hiking Trails',
            image: '',
            description: 'Pennypack is a great introduction trail system. Not too steep and not too technical, the beautiful wooded park also provides a great escape from urban life. The south side trails are originally bridle trails, so be nice to equestrians and dismount when you approach them.',
            location: {
                center: [114.090, 22.365],
                zoom: 10,
                pitch: 0,
                bearing: 0,
            },
            onChapterEnter: [],
            onChapterExit: []
        }
    ]
};
