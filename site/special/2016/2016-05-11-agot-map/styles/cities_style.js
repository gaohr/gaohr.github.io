
var styleCache_cities={}
var style_cities = function(feature, resolution){
    var value = ""
    var style = [ new ol.style.Style({
        image: new ol.style.Circle({radius: 4,
            stroke: new ol.style.Stroke({color: "rgba(0,0,0,1.0)", lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0}), fill: new ol.style.Fill({color: "rgba(100,48,20,1.0)"})})
    }),new ol.style.Style({
        image: new ol.style.Circle({radius: 2,
            stroke: new ol.style.Stroke({color: "rgba(0,0,0,1.0)", lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0}), fill: new ol.style.Fill({color: "rgba(255,255,255,1.0)"})})
    })];
    if (feature.get("name") !== null && resolution < 0.1) {
        var labelText = String(feature.get("name"));
    } else {
        var labelText = ""
    }
    var key = value + "_" + labelText
    if (!styleCache_cities[key]){
        var text = new ol.style.Text({
              font: '14px Calibri,sans-serif',
              text: labelText,
              textBaseline: "center",
              textAlign: "left",
              offsetX: 5,
              offsetY: 3,
              fill: new ol.style.Fill({
                color: "rgba(0, 0, 0, 0.8)"
              }),
			  stroke: new ol.style.Stroke({
				color: '#fff',
				width: 3
			})
            });
        styleCache_cities[key] = new ol.style.Style({"text": text})
    }
    var allStyles = [styleCache_cities[key]];
    allStyles.push.apply(allStyles, style);
    return allStyles;
};