var size = 0;

var styleCache_mountain={}
var style_mountain = function(feature, resolution){
    var value = ""
    var size = 0;
    var style = [ new ol.style.Style({
        image: new ol.style.Circle({radius: 0.0 + size,
            stroke: new ol.style.Stroke({color: "rgba(0,0,0,1.0)", lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0}), fill: new ol.style.Fill({color: "rgba(175,43,169,1.0)"})})
    })];
    if (feature.get("name") !== null) {
        var labelText = String(feature.get("name"));
    } else {
        var labelText = ""
    }
    var key = value + "_" + labelText

    if (!styleCache_mountain[key]){
        var text = new ol.style.Text({
              font: '9.1px Calibri,sans-serif',
              text: labelText,
              textBaseline: "center",
              textAlign: "left",
              offsetX: 5,
              offsetY: 3,
              fill: new ol.style.Fill({
                color: "rgba(102, 27, 27, 255)"
              }),
            });
        styleCache_mountain[key] = new ol.style.Style({"text": text})
    }
    var allStyles = [styleCache_mountain[key]];
    allStyles.push.apply(allStyles, style);
    return allStyles;
};