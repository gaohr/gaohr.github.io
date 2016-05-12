var size = 0;

var styleCache_river={}
var style_river = function(feature, resolution){
    var value = ""
    var size = 0;
    var style = [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: "rgba(31,120,180,1.0)", lineDash: null, lineCap: 'square', lineJoin: 'bevel', width: 0})
    })];
    if (feature.get("name") != null && resolution < 0.05) {
        var labelText = String(feature.get("name"));
		//var labelText = ""
    } else {
        var labelText = ""
    }
    var key = value + "_" + labelText

    if (!styleCache_river[key]){
        var text = new ol.style.Text({
              font: '6px Calibri,sans-serif',
              text: labelText,
              textBaseline: "center",
              textAlign: "left",
              offsetX: 5,
              offsetY: 3,
              fill: new ol.style.Fill({
                color: "rgba(31, 120, 180, 0.8)"
              }),
            });
			styleCache_river[key] = new ol.style.Style({"text": text})
    }
    var allStyles = [styleCache_river[key]];
    allStyles.push.apply(allStyles, style);
    return allStyles;
};