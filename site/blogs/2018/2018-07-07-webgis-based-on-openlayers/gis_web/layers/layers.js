var baseLayer = new ol.layer.Group({
    'title': 'Base maps',
    layers: [
	new ol.layer.Tile({
		'title': 'OSM',
		'type': 'base',
		//source: new ol.source.OSM()
})
]
});

var format_ = new ol.format.GeoJSON();
var features_ = format_.readFeatures(geojson_, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_ = new ol.source.Vector();
jsonSource_.addFeatures(features_);var lyr_huan = new ol.layer.Vector({
                source:jsonSource_, 
                style: style_,
                title: "环杭州湾"
            });var format_res2_4m = new ol.format.GeoJSON();

var features_res2_4m = format_res2_4m.readFeatures(geojson_res2_4m, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_res2_4m = new ol.source.Vector();
jsonSource_res2_4m.addFeatures(features_res2_4m);var lyr_res2_4m = new ol.layer.Vector({
                source:jsonSource_res2_4m, 
                style: style_res2_4m,
                title: "res2_4m"
            });

var format_province = new ol.format.GeoJSON();
var features_province = format_province.readFeatures(geojson_province, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_province = new ol.source.Vector();
jsonSource_province.addFeatures(features_province);var lyr_province = new ol.layer.Vector({
                source:jsonSource_province, 
                style: style_province,
                title: "省界线"
            });

var format_p_point = new ol.format.GeoJSON();
var features_p_point = format_p_point.readFeatures(geojson_p_point, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_p_point = new ol.source.Vector();
jsonSource_p_point.addFeatures(features_p_point);var lyr_p_point = new ol.layer.Vector({
                source:jsonSource_p_point, 
                style: style_p_point,
                title: "p_point"
            });

lyr_province.setVisible(true);
lyr_huan.setVisible(true);
lyr_res2_4m.setVisible(true);
lyr_p_point.setVisible(true);

var layersList = [baseLayer,lyr_province,lyr_huan,lyr_res2_4m,lyr_p_point];

