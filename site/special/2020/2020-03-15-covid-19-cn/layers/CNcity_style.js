var size = 0;
var ranges_CNcity = [[-1.000000, 0.000000, [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: "rgba(55,55,55,0.25)", width: 0}) , fill: new ol.style.Fill({color: "rgba(245,255,245,1.0)"})
    })]],
[1.000000, 9.000000, [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: "rgba(55,55,55,0.25)", width: 0}) , fill: new ol.style.Fill({color: "rgba(255,240,215,1.0)"})
    })]],
[9.000000, 99.000000, [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: "rgba(55,55,55,0.25)", width: 0}) , fill: new ol.style.Fill({color: "rgba(255,205,145,1.0)"})
    })]],
[99.000000, 499.000000, [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: "rgba(55,55,55,0.25)", width: 0}) , fill: new ol.style.Fill({color: "rgba(250,155,100,1.0)"})
    })]],
[499.000000, 999.000000, [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: "rgba(55,55,55,0.25)", width: 0}) , fill: new ol.style.Fill({color: "rgba(245,125,80,1.0)"})
    })]],
[999.000000, 4999.000000, [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: "rgba(55,55,55,0.25)", width: 0}) , fill: new ol.style.Fill({color: "rgba(200,35,25,1.0)"})
    })]],
[4999.000000, 99999.000000, [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: "rgba(55,55,55,0.25)", width: 0}) , fill: new ol.style.Fill({color: "rgba(100,0,0,1.0)"})
    })]]];
var code_keys = []
for(var key in ncov_data) {
	code_keys.push(key);
}
