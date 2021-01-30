// USER DEFINED FUNCTIONS
allweekEarthquakeUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
d3.json(allweekEarthquakeUrl, function(earthquakeData) {
    console.log(earthquakeData);
    generateMap(earthquakeData);
});