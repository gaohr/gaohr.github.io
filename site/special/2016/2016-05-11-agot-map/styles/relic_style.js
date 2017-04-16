
var styleCache_relic={}
var style_relic = function(feature, resolution){
    var value = ""
    var style = [ new ol.style.Style({
        image: new ol.style.Circle({radius: 2.5,
            stroke: new ol.style.Stroke({color: "rgba(0,0,0,1.0)", lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0}), fill: new ol.style.Fill({color: "rgba(178,223,138,1.0)"})})
    })];
    if ("" !== null) {
        var labelText = String("");
    } else {
        var labelText = ""
    }
    var key = value + "_" + labelText

    if (!styleCache_relic[key]){
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
        styleCache_relic[key] = new ol.style.Style({"text": text})
    }
    var allStyles = [styleCache_relic[key]];
    allStyles.push.apply(allStyles, style);
    return allStyles;
};