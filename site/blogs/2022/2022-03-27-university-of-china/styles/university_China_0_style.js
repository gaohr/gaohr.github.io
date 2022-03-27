var p_size = 4;
var placement = 'point';

var type_style = {"00": [ new ol.style.Style({
        image: new ol.style.Circle({radius: p_size,
            stroke: new ol.style.Stroke({color: 'rgba(255,255,255,0.8)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0}), fill: new ol.style.Fill({color: 'rgba(255,100,35,0.8)'})}),
    })],
		"01": [ new ol.style.Style({
        image: new ol.style.Circle({radius: p_size + 5,
            stroke: new ol.style.Stroke({color: 'rgba(255,255,255,0.8)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0}), fill: new ol.style.Fill({color: 'rgba(235,100,35,0.8)'})}),
    })],
		"10": [ new ol.style.Style({
        image: new ol.style.Circle({radius: p_size + 5,
            stroke: new ol.style.Stroke({color: 'rgba(255,255,255,0.8)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0}), fill: new ol.style.Fill({color: 'rgba(235,100,35,0.8)'})}),
    })],
		"11": [ new ol.style.Style({
        image: new ol.style.Circle({radius: p_size + 8,
            stroke: new ol.style.Stroke({color: 'rgba(255,255,255,0.9)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0}), fill: new ol.style.Fill({color: 'rgba(215,100,35,0.9)'})}),
    })]}
		
var style_university_China_0 = function(feature, resolution){
    var context = {
        feature: feature,
        variables: {}
    };
	
    var value = ""
    var labelText = "";
    var labelFont = "10px, sans-serif";
    var labelFill = "#000000";
    var bufferColor = "";
    var bufferWidth = 0;
    var textAlign = "center";
    var offsetX = 0;
    var offsetY = 0;
	
	var value985 = feature.get("985高校");
	var value211 = feature.get("211院校");
	var style = type_style[value985.toString() + value211.toString()];

    return style;
};