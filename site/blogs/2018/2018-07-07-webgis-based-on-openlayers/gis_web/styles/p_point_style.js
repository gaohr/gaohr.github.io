var size = 0;

var styleCache_p_point={}
var style_p_point = function(feature, resolution){
    var value = ""
    var size = 0;
	var style = [ new ol.style.Style({
        image: new ol.style.Circle({radius: 0.4 + size,
            stroke: new ol.style.Stroke({color: 'rgba(0,0,0,1.0)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0}), fill: new ol.style.Fill({color: 'rgba(212,127,212,1.0)'})})
    })];
    
    if (feature.get("NAME") !== null) {
        var labelText = String(feature.get("NAME"));
    } else {
        var labelText = ""
    }
    var key = value + "_" + labelText

    if (!styleCache_p_point[key]){
		if(feature.get("type") == 1) {
			var text = new ol.style.Text({
              font: '32px \'SimSun\', sans-serif',
              text: labelText,
              textBaseline: "center",
              textAlign: "left",
              offsetX: 5,
              offsetY: 3,
              fill: new ol.style.Fill({
                color: 'rgba(0, 75, 195, 255)'
              }),
            });
		} else {
			var text = new ol.style.Text({
              font: '24px \'SimSun\', sans-serif',
              text: labelText,
              textBaseline: "center",
              textAlign: "left",
              offsetX: 5,
              offsetY: 3,
              fill: new ol.style.Fill({
                color: 'rgba(0, 0, 0, 255)'
              }),
            });
		}
        
        styleCache_p_point[key] = new ol.style.Style({"text": text})
    }
    var allStyles = [styleCache_p_point[key]];
    allStyles.push.apply(allStyles, style);
    return allStyles;
};