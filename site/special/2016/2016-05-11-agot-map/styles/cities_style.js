
var styleCache_cities={}
var style_cities = function(feature, resolution){
    var value = ""
	var iconStyle = [ new ol.style.Style({
		image: new ol.style.Icon({
			size: [5, 5],
			anchor: [3, 3],
			anchorXUnits: "pixels",
			anchorYUnits: "pixels",
			src: '../img/blue-marker.svg'
		})
	})];
    if (feature.get("name") !== null) {
        var labelText = String(feature.get("name"));
    } else {
        var labelText = ""
    }
    var key = value + "_" + labelText
    if (!styleCache_cities[key]){
        var text = new ol.style.Text({
              font: '12px Calibri,sans-serif',
              text: labelText,
              textBaseline: "center",
              textAlign: "left",
              offsetX: 5,
              offsetY: 3,
              fill: new ol.style.Fill({
                color: "rgba(0, 0, 0, 0.7)"
              }),
            });
        styleCache_cities[key] = new ol.style.Style({"text": text})
    }
    var allStyles = [styleCache_cities[key]];
    allStyles.push.apply(allStyles, iconStyle);
    return allStyles;
};