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

    // Returns color based on magnitude
    function getColor(d) {
        return d >= 5 ? '#7a0177' :
            d >= 4 ? '#c51b8a' :
            d >= 3 ? '#f768a1' :
            d >= 2 ? '#fa9fb5' :
            d >= 1 ? '#fcc5c0' :
            '#feebe2';
    }
    // Creating a GeoJSON layer with the retrieved data
    L.geoJson(earthquakeData, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng, {
                radius: feature.properties.mag * 3,
                fillColor: getColor(feature.properties.mag),
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 1
            });
        },
        onEachFeature: onEachFeature
    }).addTo(myMap);
    var legend = L.control({ position: 'bottomright' });

    legend.onAdd = function(myMap) {
        // Display legend at bottom right corner of the map
        var div = L.DomUtil.create('div', 'info legend'),
            grades = [0, 1, 2, 3, 4, 5];

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(grades[i]) + '"></i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }

        return div;
    };

    legend.addTo(myMap);