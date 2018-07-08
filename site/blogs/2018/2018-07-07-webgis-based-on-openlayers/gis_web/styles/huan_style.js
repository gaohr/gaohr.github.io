var size = 0;
function categories_(feature, value) {
                switch(value) {case "常州市":
                    return [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: 'rgba(0,0,0,1.0)', width: 0}), fill: new ol.style.Fill({color: 'rgba(203,187,63,0.25)'})
    })];
                    break;
case "杭州市":
                    return [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: 'rgba(0,0,0,1.0)', width: 0}), fill: new ol.style.Fill({color: 'rgba(142,102,234,0.25)'})
    })];
                    break;
case "湖州市":
                    return [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: 'rgba(0,0,0,1.0)', width: 0}), fill: new ol.style.Fill({color: 'rgba(226,79,199,0.25)'})
    })];
                    break;
case "嘉兴市":
                    return [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: 'rgba(0,0,0,1.0)', width: 0}), fill: new ol.style.Fill({color: 'rgba(206,94,90,0.25)'})
    })];
                    break;
case "金华市":
                    return [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: 'rgba(0,0,0,1.0)', width: 0}), fill: new ol.style.Fill({color: 'rgba(114,222,223,0.25)'})
    })];
                    break;
case "南通市":
                    return [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: 'rgba(0,0,0,1.0)', width: 0}), fill: new ol.style.Fill({color: 'rgba(240,141,54,0.25)'})
    })];
                    break;
case "宁波市":
                    return [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: 'rgba(0,0,0,1.0)', width: 0}), fill: new ol.style.Fill({color: 'rgba(85,216,41,0.25)'})
    })];
                    break;
case "上海市":
                    return [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: 'rgba(0,0,0,1.0)', width: 0}), fill: new ol.style.Fill({color: 'rgba(169,203,95,0.25)'})
    })];
                    break;
case "绍兴市":
                    return [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: 'rgba(0,0,0,1.0)', width: 0}), fill: new ol.style.Fill({color: 'rgba(202,41,105,0.25)'})
    })];
                    break;
case "苏州市":
                    return [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: 'rgba(0,0,0,1.0)', width: 0}), fill: new ol.style.Fill({color: 'rgba(54,153,233,0.25)'})
    })];
                    break;
case "台州市":
                    return [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: 'rgba(0,0,0,1.0)', width: 0}), fill: new ol.style.Fill({color: 'rgba(76,223,164,0.25)'})
    })];
                    break;
case "无锡市":
                    return [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: 'rgba(0,0,0,1.0)', width: 0}), fill: new ol.style.Fill({color: 'rgba(179,15,233,0.25)'})
    })];
                    break;
case "舟山市":
                    return [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: 'rgba(0,0,0,1.0)', width: 0}), fill: new ol.style.Fill({color: 'rgba(72,91,233,0.25)'})
    })];
                    break;
case "":
                    return [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: 'rgba(0,0,0,1.0)', width: 0}), fill: new ol.style.Fill({color: 'rgba(255,255,255,0)'})
    })];
                    break;}};
var styleCache_={}
var style_ = function(feature, resolution){
    var value = feature.get("NAME");
    var style = categories_(feature, value);
	
    var labelText = String(value);
	
    var key = value + "_" + labelText

    if (!styleCache_[key]){
        var text = new ol.style.Text({
              font: '20px \'SimSun\', sans-serif',
              text: labelText,
              textBaseline: "center",
              textAlign: "left",
              offsetX: 5,
              offsetY: 5,
              fill: new ol.style.Fill({
                color: 'rgba(0, 0, 0, 1)'
              }),
            });
        styleCache_[key] = new ol.style.Style({"text": text})
    }
    var allStyles = [styleCache_[key]];
    allStyles.push.apply(allStyles, style);
    return allStyles;
};