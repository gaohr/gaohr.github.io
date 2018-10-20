var size = 0;

var styleCache_pRoute_JonSnow={}
var style_pRoute_JonSnow = function(feature, resolution){
    var value = ""
    var size = 0;
    var style = [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: 'rgba(43,143,55,0.8)', lineDash: null, lineCap: 'square', lineJoin: 'bevel', width: 6}),
    })];
    if ("" !== null) {
        var labelText = String("");
    } else {
        var labelText = ""
    }
    var key = value + "_" + labelText

    if (!styleCache_pRoute_JonSnow[key]){
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
        styleCache_pRoute_JonSnow[key] = new ol.style.Style({"text": text})
    }
    var allStyles = [styleCache_pRoute_JonSnow[key]];
    allStyles.push.apply(allStyles, style);
    return allStyles;
};

var size = 0;
var styleCache_pRoute_Daenerys={}
var style_pRoute_Daenerys = function(feature, resolution){
    var value = ""
    var size = 0;
    var style = [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: 'rgba(222,127,83,0.8)', lineDash: null, lineCap: 'square', lineJoin: 'bevel', width: 6}),
    })];
    if ("" !== null) {
        var labelText = String("");
    } else {
        var labelText = ""
    }
    var key = value + "_" + labelText

    if (!styleCache_pRoute_Daenerys[key]){
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
        styleCache_pRoute_Daenerys[key] = new ol.style.Style({"text": text})
    }
    var allStyles = [styleCache_pRoute_Daenerys[key]];
    allStyles.push.apply(allStyles, style);
    return allStyles;
};