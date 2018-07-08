var styleCache_={}
var style_province = function(feature, resolution){
    var value = ""
    var style = [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: '#555', lineDash: [1,2,3,4,5,6], lineCap: 'square', lineJoin: 'bevel', width: 1.5}),
    })];
    if ("" !== null) {
        var labelText = String("");
    } else {
        var labelText = ""
    }
    var key = value + "_" + labelText

    if (!styleCache_[key]){
        var text = new ol.style.Text({
              font: '10px \'None\', sans-serif',
              text: labelText,
              textBaseline: "center",
              textAlign: "left",
              offsetX: 5,
              offsetY: 3,
              fill: new ol.style.Fill({
                color: 'rgba(None, None, None, 255)'
              }),
            });
        styleCache_[key] = new ol.style.Style({"text": text})
    }
    var allStyles = [styleCache_[key]];
    allStyles.push.apply(allStyles, style);
    return allStyles;
};