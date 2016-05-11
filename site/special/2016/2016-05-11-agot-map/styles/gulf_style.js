var size = 0;

var styleCache_gulf={}
var style_gulf = function(feature, resolution){
    var value = ""
    var size = 0;
    var style = [ new ol.style.Style({
        image: new ol.style.Circle({radius: 0.0 + size,
            stroke: new ol.style.Stroke({color: "rgba(0,0,0,1.0)", lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0}), fill: new ol.style.Fill({color: "rgba(40,174,71,1.0)"})})
    })];
    if (feature.get("name") !== null) {
        var labelText = String(feature.get("name"));
    } else {
        var labelText = ""
    }
    var key = value + "_" + labelText

    if (!styleCache_gulf[key]){
        var text = new ol.style.Text({
              font: '7.8px Calibri,sans-serif',
              text: labelText,
              textBaseline: "center",
              textAlign: "left",
              offsetX: 5,
              offsetY: 3,
              fill: new ol.style.Fill({
                color: "rgba(31, 83, 180, 255)"
              }),
            });
        styleCache_gulf[key] = new ol.style.Style({"text": text})
    }
    var allStyles = [styleCache_gulf[key]];
    allStyles.push.apply(allStyles, style);
    return allStyles;
};