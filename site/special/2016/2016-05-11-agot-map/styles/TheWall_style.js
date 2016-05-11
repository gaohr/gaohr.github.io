var size = 0;

var styleCache_TheWall={}
var style_TheWall = function(feature, resolution){
    var value = ""
    var size = 0;
    var style = [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: "rgba(175,179,138,1.0)", lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0}) , fill: new ol.style.Fill({color: "rgba(255,255,255,1.0)"})
    }),new ol.style.Style({
        
    })];
    if ("" !== null) {
        var labelText = String("");
    } else {
        var labelText = ""
    }
    var key = value + "_" + labelText

    if (!styleCache_TheWall[key]){
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
        styleCache_TheWall[key] = new ol.style.Style({"text": text})
    }
    var allStyles = [styleCache_TheWall[key]];
    allStyles.push.apply(allStyles, style);
    return allStyles;
};