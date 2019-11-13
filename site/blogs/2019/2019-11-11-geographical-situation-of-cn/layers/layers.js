var baseLayer = new ol.layer.Group({
    'title': 'Base maps',
    layers: []
});
var format_ = new ol.format.GeoJSON();
var features_ = format_.readFeatures(geojson_, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_SS = new ol.source.Vector();
jsonSource_SS.addFeatures(features_);var lyr_SS = new ol.layer.Vector({
                source:jsonSource_SS, 
                style: style_SS,
                title: "九段线"
            });var format_CN = new ol.format.GeoJSON();
var features_CN = format_CN.readFeatures(geojson_CN, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_CN = new ol.source.Vector();
jsonSource_CN.addFeatures(features_CN);var lyr_CN = new ol.layer.Vector({
                source:jsonSource_CN, 
                style: style_CN,
                title: "CN"
            });

lyr_SS.setVisible(true);lyr_CN.setVisible(true);
var layersList = [baseLayer,lyr_SS,lyr_CN];
lyr_CN.set('fieldAliases', {'NAME': 'NAME', });
lyr_CN.set('fieldImages', {'NAME': 'TextEdit', });
lyr_CN.set('fieldLabels', {'NAME': 'no label', });
lyr_CN.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});