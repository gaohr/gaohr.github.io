
var styleCache_castles={}
var style_castles = function(feature, resolution){
    var value = ""
	if (resolution < 0.1) {
	  if (resolution < 0.03 && feature.get("name") == "鹰巢城") {
	var style = [ new ol.style.Style({
        image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
          src: './2016-05-11-agot-map/img/Yingchao.png',
		  scale: 0.4
        }))
      })];
	} else if(resolution < 0.03 && feature.get("name") == "卡林湾") {
		var style = [ new ol.style.Style({
        image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
          src: './2016-05-11-agot-map/img/Calinwan.png',
		  scale: 0.4
        }))
      })];
	} else if(resolution < 0.03 && feature.get("name") == "风息堡") {
		var style = [ new ol.style.Style({
        image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
          src: './2016-05-11-agot-map/img/Fengxi.png',
		  scale: 0.4
        }))
      })];
	} else if(resolution < 0.03 && feature.get("name") == "奔流城") {
		var style = [ new ol.style.Style({
        image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
          src: './2016-05-11-agot-map/img/Benliu.png',
		  scale: 0.4
        }))
      })];
	} else if(resolution < 0.03 && feature.get("name") == "黑城堡") {
		var style = [ new ol.style.Style({
        image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
          src: './2016-05-11-agot-map/img/Wall.png',
		  scale: 0.4
        }))
      })];
	} else {
		var style = [ new ol.style.Style({
        image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
          src: './2016-05-11-agot-map/img/castle.png',
		  scale: 0.2
        }))
      })];
	}
	} else {
    var style = [ new ol.style.Style({
        image: new ol.style.Circle({radius: 3,
            stroke: new ol.style.Stroke({color: "rgba(255,255,255,1.0)", lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 1}), fill: new ol.style.Fill({color: "rgba(145,75,62,1.0)"})})
    }),new ol.style.Style({
        image: new ol.style.Circle({radius: 1,
            stroke: new ol.style.Stroke({color: "rgba(0,0,0,1.0)", lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0}), fill: new ol.style.Fill({color: "rgba(255,255,255,1.0)"})})
    })];
	}
    if (feature.get("name") !== null && resolution < 0.08) {
        var labelText = String(feature.get("name"));
    } else {
        var labelText = ""
    }
    var key = value + "_" + labelText

    if (!styleCache_castles[key]){
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
        styleCache_castles[key] = new ol.style.Style({"text": text})
    }
    var allStyles = [styleCache_castles[key]];
    allStyles.push.apply(allStyles, style);
    return allStyles;
};