
var styleCache_cities={}
var style_cities = function(feature, resolution){
    var value = ""
	if (resolution < 0.1) {
	  if (resolution < 0.05 && feature.get("name") == "临冬城") {
	var style = [ new ol.style.Style({
        image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
          src: './2016-05-11-agot-map/img/Lindong.png',
		  scale: 0.6
        }))
      })];
	} else if (resolution < 0.05 && feature.get("name") == "君临") {
	var style = [ new ol.style.Style({
        image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
          src: './2016-05-11-agot-map/img/Junlin.png',
		  scale: 0.6
        }))
      })];
	} else if (resolution < 0.05 && feature.get("name") == "维斯·多斯拉克") {
	var style = [ new ol.style.Style({
        image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
          src: './2016-05-11-agot-map/img/Vaes.png',
		  scale: 0.6
        }))
      })];
	} else if (resolution < 0.05 && feature.get("name") == "弥林") {
	var style = [ new ol.style.Style({
        image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
          src: './2016-05-11-agot-map/img/Milin.png',
		  scale: 1
        }))
      })];
	} else if (resolution < 0.05 && feature.get("name") == "布拉弗斯") {
	var style = [ new ol.style.Style({
        image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
          src: './2016-05-11-agot-map/img/Taitan.png',
		  scale: 0.4
        }))
      })];
	} else {
		var style = [ new ol.style.Style({
        image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
          src: './2016-05-11-agot-map/img/city.png',
		  scale: 0.3
        }))
      })];
	}
	} else {
    var style = [ new ol.style.Style({
        image: new ol.style.Circle({radius: 4,
            stroke: new ol.style.Stroke({color: "rgba(0,0,0,1.0)", lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0}), fill: new ol.style.Fill({color: "rgba(100,48,20,1.0)"})})
    }),new ol.style.Style({
        image: new ol.style.Circle({radius: 2,
            stroke: new ol.style.Stroke({color: "rgba(0,0,0,1.0)", lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0}), fill: new ol.style.Fill({color: "rgba(255,255,255,1.0)"})})
    })];
	}
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
              textBaseline: "middle",
              textAlign: "left",
              offsetX: 15,
              offsetY: -3,
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