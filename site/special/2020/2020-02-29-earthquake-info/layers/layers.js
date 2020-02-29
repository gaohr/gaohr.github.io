var baseLayer = new ol.layer.Group({
    'title': 'Base map',
    layers: [
new ol.layer.Tile({
    'title': 'Open Street Map',
    'type': 'base',
    source: new ol.source.OSM()
})
]
});
var format_world = new ol.format.GeoJSON();
var features_world = format_world.readFeatures(geojson_world, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_world = new ol.source.Vector();
jsonSource_world.addFeatures(features_world);
var lyr_world = new ol.layer.Vector({
                source:jsonSource_world, 
                style: style_world,
                title: "全球国界地图"
            });
var format_earthquackworld = new ol.format.GeoJSON();
var features_earthquackworld = format_earthquackworld.readFeatures(geojson_earthquackworld, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_earthquackworld = new ol.source.Vector();
jsonSource_earthquackworld.addFeatures(features_earthquackworld);
var lyr_earthquackworld = new ol.layer.Vector({
                source:jsonSource_earthquackworld, 
                style: style_earthquackworld,
                title: "全球6级以上历史地震"
            });var format_earthquackcnquick = new ol.format.GeoJSON();
var features_earthquackcnquick = format_earthquackcnquick.readFeatures(geojson_earthquackcnquick, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_earthquackcnquick = new ol.source.Vector();
jsonSource_earthquackcnquick.addFeatures(features_earthquackcnquick);
var lyr_earthquackcnquick = new ol.layer.Vector({
                source:jsonSource_earthquackcnquick, 
                style: style_earthquackcnquick,
                title: "中国地震台速报"
            });

lyr_world.setVisible(true);
lyr_earthquackworld.setVisible(false);
lyr_earthquackcnquick.setVisible(true);
var layersList = [baseLayer,lyr_world,lyr_earthquackworld,lyr_earthquackcnquick];


