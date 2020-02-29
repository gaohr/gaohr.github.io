var size = 0;

var styleCache_earthquackworld={}
var style_earthquackworld = function(feature, resolution){
    var value = ""
    var size = 0;
    var style = [ new ol.style.Style({
        image: new ol.style.Circle({radius: 3 + size,
            stroke: new ol.style.Stroke({color: "rgba(0,0,0,0)", width: 0}), fill: new ol.style.Fill({color: "rgba(55,55,195,0.25)"})})
    })];
    if ("" !== null) {
        var labelText = String("");
    } else {
        var labelText = ""
    }
    var key = value + "_" + labelText

    if (!styleCache_earthquackworld[key]){
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
        styleCache_earthquackworld[key] = new ol.style.Style({"text": text})
    }
    var allStyles = [styleCache_earthquackworld[key]];
    allStyles.push.apply(allStyles, style);
    return allStyles;
};