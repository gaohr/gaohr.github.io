var baseLayer = new ol.layer.Group({
    'title': 'Base map',
    layers: [
new ol.layer.Tile({
			"title": "<span style='color:#012'>Stamen Terrain</span>",
			"type": "base",
			source: new ol.source.XYZ({
		         url: 'https://thematic.geoq.cn/arcgis/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}',
		    })
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
var format_earthquackcnquick = new ol.format.GeoJSON();
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
lyr_earthquackcnquick.setVisible(true);
var layersList = [baseLayer,lyr_world,lyr_earthquackcnquick];


