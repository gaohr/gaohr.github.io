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
var format_province_cn = new ol.format.GeoJSON();
var features_province_cn = format_province_cn.readFeatures(geojson_province_cn, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_province_cn = new ol.source.Vector();
jsonSource_province_cn.addFeatures(features_province_cn);var lyr_province_cn = new ol.layer.Vector({
                source:jsonSource_province_cn, 
                style: style_province_cn,
                title: "省级行政区划"
            });

lyr_province_cn.setVisible(true);
var layersList = [baseLayer,lyr_province_cn];
lyr_province_cn.set('fieldAliases', {'NAME': 'NAME', 'ID': 'ID', });
lyr_province_cn.set('fieldImages', {'NAME': 'TextEdit', 'ID': 'TextEdit', });
lyr_province_cn.set('fieldLabels', {'NAME': 'header label', 'ID': 'no label', });
lyr_province_cn.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});