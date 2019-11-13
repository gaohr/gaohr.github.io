var size = 0;

var styleCache_CN={}
var style_CN = function(feature, resolution){
    var value = ""
    var size = 0;
    var style = [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: 'rgba(255,255,0,1.0)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 2}), fill: new ol.style.Fill({color: 'rgba(255,36,36,0.5)'})
    })];
    if ("" !== null) {
        var labelText = String("");
    } else {
        var labelText = ""
    }
    var key = value + "_" + labelText

    if (!styleCache_CN[key]){
        var text = new ol.style.Text({
              font: '12px \'SimSun\', sans-serif',
              text: labelText,
              textBaseline: "center",
              textAlign: "left",
              offsetX: 5,
              offsetY: 3,
              fill: new ol.style.Fill({
                color: 'rgba(0, 0, 0, 255)'
              }),
            });
        styleCache_CN[key] = new ol.style.Style({"text": text})
    }
    var allStyles = [styleCache_CN[key]];
    allStyles.push.apply(allStyles, style);
    return allStyles;
};