var size = 0;

var styleCache_zone={}
var style_zone = function(feature, resolution){
    var value = ""
    var size = 0;
	if(resolution > 0.1) {
		var style = [ new ol.style.Style({
			stroke: new ol.style.Stroke({color: "rgba(255,255,199,1.0)", lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 2}) , fill: new ol.style.Fill({color: "rgba(253,191,111,1.0)"})
		})];
	} else {
		var style = [ new ol.style.Style({
			stroke: new ol.style.Stroke({color: "rgba(241,244,199,0)", lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0}) , fill: new ol.style.Fill({color: "rgba(253,191,111,0)"})
		})];
	}
    if ("" !== null) {
        var labelText = String("");
    } else {
        var labelText = ""
    }
    var key = value + "_" + labelText

    if (!styleCache_zone[key]){
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
        styleCache_zone[key] = new ol.style.Style({"text": text})
    }
    var allStyles = [styleCache_zone[key]];
    allStyles.push.apply(allStyles, style);
    return allStyles;
};