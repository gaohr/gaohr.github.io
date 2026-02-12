var baseLayer = new ol.layer.Group({
    'title': '底图',
    layers: [
new ol.layer.Tile({
			"title": "<span style='color:#012'>Stamen Terrain</span>",
			"type": "base",
			source: new ol.source.XYZ({
		         url: 'https://thematic.geoq.cn/arcgis/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}',
		    })
		}),
	]
});

var format_university_China_0 = new ol.format.GeoJSON();
var features_university_China_0 = format_university_China_0.readFeatures(json_university_China_0, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_university_China_0 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_university_China_0.addFeatures(features_university_China_0);

var lyr_university_China_0 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_university_China_0, 
                style: style_university_China_0,
                interactive: true,
                title: '<img src="./2022-03-27-university-of-china/styles/legend/university_China_0.png" /> 全国大学分布</br></br>'
            });

lyr_university_China_0.setVisible(true);
var layersList = [baseLayer, lyr_university_China_0];
lyr_university_China_0.set('fieldAliases', {'省份': '省份', '名称': '名称', '专业类别': '专业类别', '办学性质': '办学性质', '学校类型': '学校类型', '985高校': '985高校', '211院校': '211院校', '双一流': '双一流', '城市': '城市', '隶属': '隶属', '地址': '地址', '经度': '经度', '纬度': '纬度', });
lyr_university_China_0.set('fieldImages', {'省份': 'TextEdit', '名称': 'TextEdit', '专业类别': 'TextEdit', '办学性质': 'TextEdit', '学校类型': 'TextEdit', '985高校': 'TextEdit', '211院校': 'TextEdit', '双一流': 'TextEdit', '城市': 'TextEdit', '隶属': 'TextEdit', '地址': 'TextEdit', '经度': 'TextEdit', '纬度': 'TextEdit', });
lyr_university_China_0.set('fieldLabels', {'省份': 'no label', '名称': 'header label', '专业类别': 'no label', '办学性质': 'no label', '学校类型': 'no label', '985高校': 'no label', '211院校': 'no label', '双一流': 'no label', '城市': 'no label', '隶属': 'no label', '地址': 'no label', '经度': 'no label', '纬度': 'no label', });
lyr_university_China_0.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});