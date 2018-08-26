var size = 0;

var styleCache_loc={}
var style_loc = function(feature, resolution){
    var value = ""
    var size = 0;
    var style = [ new ol.style.Style({
        image: new ol.style.Circle({radius: 5.2 + size,
            stroke: new ol.style.Stroke({color: 'rgba(255,255,255,1.0)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0}), fill: new ol.style.Fill({color: 'rgba(255,127,0,1.0)'})})
    })];
    if ("" !== null) {
        var labelText = String("");
    } else {
        var labelText = ""
    }
    var key = value + "_" + labelText

    if (!styleCache_loc[key]){
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
        styleCache_loc[key] = new ol.style.Style({"text": text})
    }
    var allStyles = [styleCache_loc[key]];
    allStyles.push.apply(allStyles, style);
    return allStyles;
};