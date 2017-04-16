var size = 0;

var styleCache_zone={}
var categories_zone = {"9": [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: "rgba(200,100,100,1.0)", lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 1}) , fill: new ol.style.Fill({color: "rgba(255,255,255,0.9)"})
    })],
		"8": [ new ol.style.Style({
			stroke: new ol.style.Stroke({color: "rgba(200,100,100,1.0)", lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 1}) , fill: new ol.style.Fill({color: "rgba(255,255,255,0.3)"})
		})],
		"7": [ new ol.style.Style({
			stroke: new ol.style.Stroke({color: "rgba(200,100,100,1.0)", lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 1}) , fill: new ol.style.Fill({color: "rgba(253,191,111,0.1)"})
		})],
		"6": [ new ol.style.Style({
			stroke: new ol.style.Stroke({color: "rgba(200,100,100,1.0)", lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 1}) , fill: new ol.style.Fill({color: "rgba(253,191,111,0.15)"})
		})],
		"5": [ new ol.style.Style({
			stroke: new ol.style.Stroke({color: "rgba(200,100,100,1.0)", lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 1}) , fill: new ol.style.Fill({color: "rgba(253,191,111,0.25)"})
		})],
		"4": [ new ol.style.Style({
			stroke: new ol.style.Stroke({color: "rgba(200,100,100,1.0)", lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 1}) , fill: new ol.style.Fill({color: "rgba(253,191,111,0.3)"})
		})],
		"3": [ new ol.style.Style({
			stroke: new ol.style.Stroke({color: "rgba(200,100,100,1.0)", lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 1}) , fill: new ol.style.Fill({color: "rgba(253,111,111,0.35)"})
		})],
		"2": [ new ol.style.Style({
			stroke: new ol.style.Stroke({color: "rgba(200,100,100,1.0)", lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 1}) , fill: new ol.style.Fill({color: "rgba(253,191,111,0.4)"})
		})],
		"1": [ new ol.style.Style({
			stroke: new ol.style.Stroke({color: "rgba(200,100,100,1.0)", lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 1}) , fill: new ol.style.Fill({color: "rgba(253,191,111,0.45)"})
		})],
		"0": [ new ol.style.Style({
			stroke: new ol.style.Stroke({color: "rgba(200,100,100,1.0)", lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 1}) , fill: new ol.style.Fill({color: "rgba(253,191,111,0.5)"})
		})],}

var style_zone = function(feature, resolution){
    
	if(resolution > 0.1) {
		var value = feature.get("Id");
		var style = categories_zone[value];
		
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