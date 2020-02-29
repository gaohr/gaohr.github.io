var size = 0;
var categories_earthquackcnquick = {
"3": [ new ol.style.Style({
        image: new ol.style.Circle({radius: 1.0 + size,
            stroke: new ol.style.Stroke({color: "rgba(255,255,255,0.5)", width: 0.5}), fill: new ol.style.Fill({color: "rgba(255,235,155,0.6)"})})
    })],
"4": [ new ol.style.Style({
        image: new ol.style.Circle({radius: 3.0 + size,
            stroke: new ol.style.Stroke({color: "rgba(255,255,255,0.5)", width: 0.5}), fill: new ol.style.Fill({color: "rgba(255,175,115,0.5)"})})
    })],
"5": [ new ol.style.Style({
        image: new ol.style.Circle({radius: 5.0 + size,
            stroke: new ol.style.Stroke({color: "rgba(255,255,255,0.5)", width: 0.5}), fill: new ol.style.Fill({color: "rgba(255,125,75,0.4)"})})
    })],
"6": [ new ol.style.Style({
        image: new ol.style.Circle({radius: 7.0 + size,
            stroke: new ol.style.Stroke({color: "rgba(255,255,255,0.5)", width: 0.5}), fill: new ol.style.Fill({color: "rgba(235,95,55,0.3)"})})
    })],
"7": [ new ol.style.Style({
        image: new ol.style.Circle({radius: 9.0 + size,
            stroke: new ol.style.Stroke({color: "rgba(255,255,255,0.5)", width: 0.5}), fill: new ol.style.Fill({color: "rgba(215,55,30,0.2)"})})
    })],
"8": [ new ol.style.Style({
        image: new ol.style.Circle({radius: 11.0 + size,
            stroke: new ol.style.Stroke({color: "rgba(255,255,255,0.5)", width: 0.5}), fill: new ol.style.Fill({color: "rgba(155,15,15,0.1)"})})
    })]};
var styleCache_earthquackcnquick={}
var style_earthquackcnquick = function(feature, resolution){
    var value = feature.get("LEVEL_M_").toString().split(".")[0];
    var style = categories_earthquackcnquick[value];
    if ("" !== null) {
        var labelText = String("");
    } else {
        var labelText = ""
    }
    var key = value + "_" + labelText

    if (!styleCache_earthquackcnquick[key]){
        var text = new ol.style.Text({
              font: '12px Calibri,sans-serif',
              text: labelText,
              textBaseline: "center",
              textAlign: "left",
              offsetX: 5,
              offsetY: 3,
              fill: new ol.style.Fill({
                color: "rgba(35, 35, 35, 1)"
              }),
            });
        styleCache_earthquackcnquick[key] = new ol.style.Style({"text": text})
    }
    var allStyles = [styleCache_earthquackcnquick[key]];
    allStyles.push.apply(allStyles, style);
    return allStyles;
};