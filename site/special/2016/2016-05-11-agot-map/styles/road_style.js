var size = 0;

var styleCache_road={}
var style_road = function(feature, resolution){
    var value = ""
    var size = 0;
	if (resolution < 0.1) {
		var style = [ new ol.style.Style({
			stroke: new ol.style.Stroke({color: "rgba(134,67,0,1.0)", lineDash: null, lineCap: 'square', lineJoin: 'bevel', width: 1})
		}),new ol.style.Style({
			stroke: new ol.style.Stroke({color: "rgba(251,154,153,1.0)", lineDash: null, lineCap: 'square', lineJoin: 'round', width: 1})
		})];
	} else {
		var style = [ new ol.style.Style({
			stroke: new ol.style.Stroke({color: "rgba(134,67,0,0)", lineDash: null, lineCap: 'square', lineJoin: 'bevel', width: 1})
		}),new ol.style.Style({
			stroke: new ol.style.Stroke({color: "rgba(251,154,153,0)", lineDash: null, lineCap: 'square', lineJoin: 'round', width: 1})
		})];
	}
    if (feature.get("name") !== null && resolution < 0.05) {
        var labelText = String(feature.get("name"));
    } else {
        var labelText = ""
    }
    var key = value + "_" + labelText

    if (!styleCache_road[key]){
        var text = new ol.style.Text({
              font: '9px Calibri,sans-serif',
              text: labelText,
              textBaseline: "center",
              textAlign: "left",
              offsetX: 5,
              offsetY: 3,
              fill: new ol.style.Fill({
                color: "rgba(102, 27, 27, 0.8)"
              }),
            });
        styleCache_road[key] = new ol.style.Style({"text": text})
    }
    var allStyles = [styleCache_road[key]];
    allStyles.push.apply(allStyles, style);
    return allStyles;
};