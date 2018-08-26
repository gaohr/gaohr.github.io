var baseLayer = new ol.layer.Group({
    'title': 'Base maps',
    layers: [
new ol.layer.Tile({
    'title': 'Stamen Terrain',
    'type': 'base',
    source: new ol.source.Stamen({
        layer: 'terrain'
    })
})
]
});
var format_loc = new ol.format.GeoJSON();
var features_loc = format_loc.readFeatures(geojson_loc, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_loc = new ol.source.Vector();
jsonSource_loc.addFeatures(features_loc);var lyr_loc = new ol.layer.Vector({
                source:jsonSource_loc, 
                style: style_loc,
                title: "loc"
            });

lyr_loc.setVisible(true);
var layersList = [baseLayer,lyr_loc];
lyr_loc.set('fieldAliases', {'province': 'province', 'location': 'location', 'longitude': 'longitude', 'latitude': 'latitude', 'info': 'info', 'img': 'img', });
lyr_loc.set('fieldImages', {'province': 'TextEdit', 'location': 'TextEdit', 'longitude': 'TextEdit', 'latitude': 'TextEdit', 'info': 'TextEdit', 'img': 'TextEdit', });
lyr_loc.set('fieldLabels', {'province': 'header label', 'location': 'header label', 'longitude': 'inline label', 'latitude': 'inline label', 'info': 'inline label', 'img': 'inline label', });
lyr_loc.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});