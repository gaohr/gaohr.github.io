var size = 0;

var styleCache_Essos={}
var style_Essos = function(feature, resolution){
    var value = ""
    var size = 0;
    var style = [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: "rgba(255,255,199,1.0)", lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 1}) , fill: new ol.style.Fill({color: "rgba(238,217,171,1.0)"})
    })];
    if ("" !== null) {
        var labelText = String("");
    } else {
        var labelText = ""
    }
    var key = value + "_" + labelText

    if (!styleCache_Essos[key]){
        var text = new ol.style.Text({
              font: '11.7px Calibri,sans-serif',
              text: labelText,
              textBaseline: "center",
              textAlign: "left",
              offsetX: 5,
              offsetY: 3,
              fill: new ol.style.Fill({
                color: "rgba(0, 0, 0, 255)"
              }),
            });
        styleCache_Essos[key] = new ol.style.Style({"text": text})
    }
    var allStyles = [styleCache_Essos[key]];
    allStyles.push.apply(allStyles, style);
    return allStyles;
};