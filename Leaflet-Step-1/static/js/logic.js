// USER DEFINED FUNCTIONS
allweekEarthquakeUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
d3.json(allweekEarthquakeUrl, function(earthquakeData) {
    console.log(earthquakeData);
    generateMap(earthquakeData);
});

// Create a map object
function generateMap(earthquakeData) {
    var myMap = L.map("map", {
        center: [15.5994, -28.6731],
        zoom: 3
    });

    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    }).addTo(myMap);