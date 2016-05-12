var size = 0;

var styleCache_zonepoint={}
var style_zonepoint = function(feature, resolution){
    var value = ""
    var size = 0;
    var style = [ new ol.style.Style({
        image: new ol.style.Circle({radius: 0.0 + size,
            stroke: new ol.style.Stroke({color: "rgba(0,0,0,1.0)", lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0}), fill: new ol.style.Fill({color: "rgba(155,93,159,1.0)"})})
    })];
    if (feature.get("name") !== null && resolution > 0.1) {
        var labelText = String(feature.get("name"));
    } else {
        var labelText = ""
    }
    var key = value + "_" + labelText

    if (!styleCache_zonepoint[key]){
        var text = new ol.style.Text({
              font: '18px Calibri,sans-serif',
              text: labelText,
              textBaseline: "center",
              textAlign: "left",
              offsetX: 1,
              offsetY: 3,
              fill: new ol.style.Fill({
                color: "rgba(255, 255, 255, 1)"
              }),
            });
        styleCache_zonepoint[key] = new ol.style.Style({"text": text})
    }
    var allStyles = [styleCache_zonepoint[key]];
    allStyles.push.apply(allStyles, style);
    return allStyles;
};