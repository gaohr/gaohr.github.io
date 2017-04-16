var size = 0;

var styleCache_texturet={}
var style_texturet = function(feature, resolution){
    var value = ""
    var size = 0;
    var style = [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: "rgba(51,160,44,1.0)", lineDash: null, lineCap: 'square', lineJoin: 'bevel', width: 0})
    })];
    if ("" !== null) {
        var labelText = String("");
    } else {
        var labelText = ""
    }
    var key = value + "_" + labelText

    if (!styleCache_texturet[key]){
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
        styleCache_texturet[key] = new ol.style.Style({"text": text})
    }
    var allStyles = [styleCache_texturet[key]];
    allStyles.push.apply(allStyles, style);
    return allStyles;
};