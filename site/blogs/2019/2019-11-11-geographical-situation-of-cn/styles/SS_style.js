var size = 0;

var styleCache_={}
var style_SS = function(feature, resolution){
    var value = ""
    var size = 0;
    var style = [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: 'rgba(155,255,255,1.0)', lineDash: null, lineCap: 'square', lineJoin: 'bevel', width: 2}),
    })];
    if ("" !== null) {
        var labelText = String("");
    } else {
        var labelText = ""
    }
    var key = value + "_" + labelText

    if (!styleCache_[key]){
        var text = new ol.style.Text({
              font: '11.7px \'SimSun\', sans-serif',
              text: labelText,
              textBaseline: "center",
              textAlign: "left",
              offsetX: 5,
              offsetY: 3,
              fill: new ol.style.Fill({
                color: 'rgba(0, 0, 0, 255)'
              }),
            });
        styleCache_[key] = new ol.style.Style({"text": text})
    }
    var allStyles = [styleCache_[key]];
    allStyles.push.apply(allStyles, style);
    return allStyles;
};