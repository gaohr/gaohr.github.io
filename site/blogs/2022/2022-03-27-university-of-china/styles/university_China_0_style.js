var p_size = 5;
var placement = 'point';

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
    var style = [ new ol.style.Style({
        image: new ol.style.Circle({radius: p_size,
            stroke: new ol.style.Stroke({color: 'rgba(255,255,255,0.8)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0}), fill: new ol.style.Fill({color: 'rgba(205,100,35,0.8)'})}),
    })];

    return style;
};