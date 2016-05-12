var size = 0;

var styleCache_sea={}
var style_sea = function(feature, resolution){
    var value = ""
    var size = 0;
    var style = [ new ol.style.Style({
        image: new ol.style.Circle({radius: 0.0 + size,
            stroke: new ol.style.Stroke({color: "rgba(0,0,0,1.0)", lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0}), fill: new ol.style.Fill({color: "rgba(108,126,205,1.0)"})})
    })];
    if (feature.get("name") !== null) {
        var labelText = String(feature.get("name"));
    } else {
        var labelText = ""
    }
    var key = value + "_" + labelText

    if (!styleCache_sea[key]){
        var text = new ol.style.Text({
              font: '22px STKaiti',
              text: labelText,
              textBaseline: "center",
              textAlign: "left",
              offsetX: 5,
              offsetY: 3,
              fill: new ol.style.Fill({
                color: "rgba(255,255,255, 1.0)"
              }),
            });
        styleCache_sea[key] = new ol.style.Style({"text": text})
    }
    var allStyles = [styleCache_sea[key]];
    allStyles.push.apply(allStyles, style);
    return allStyles;
};