var size = 0;

var styleCache_world={}
var style_world = function(feature, resolution){
    var value = ""
    var size = 0;
    var style = [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: "rgba(205, 205, 205, 1.0)", lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0}) , fill: new ol.style.Fill({color: "rgba(55, 55, 55, 1.0)"})
    })];
    if ("" !== null) {
        var labelText = String("");
    } else {
        var labelText = ""
    }
    var key = value + "_" + labelText

    if (!styleCache_world[key]){
        var text = new ol.style.Text({
              font: '16px Calibri,sans-serif',
              text: labelText,
              textBaseline: "center",
              textAlign: "left",
              offsetX: 5,
              offsetY: 3,
              fill: new ol.style.Fill({
                color: "rgba(0, 0, 0, 255)"
              }),
            });
        styleCache_world[key] = new ol.style.Style({"text": text})
    }
    var allStyles = [styleCache_world[key]];
    allStyles.push.apply(allStyles, style);
    return allStyles;
};