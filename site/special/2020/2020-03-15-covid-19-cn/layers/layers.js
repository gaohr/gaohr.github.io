var baseLayer = new ol.layer.Group({
    'title': 'Base maps',
    layers: [
new ol.layer.Tile({
    'title': 'OSM',
    'type': 'base',
    source: new ol.source.Stamen({
        layer: 'terrain'
    })
})
]
});
var format_CNcity = new ol.format.GeoJSON();
var features_CNcity = format_CNcity.readFeatures(geojson_CNcity, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_CNcity = new ol.source.Vector();
jsonSource_CNcity.addFeatures(features_CNcity);
var lyr_CNcity = new ol.layer.Vector({
                source:jsonSource_CNcity, 
                style: function style_CNcity(feature) {
							var value = 0;
							if(code_keys.indexOf(String(parseInt(feature.get("SHI")))) > -1) {
								value = ncov_data[String(parseInt(feature.get("SHI")))]["cityConfirmed"][0];
							}
							var style = ranges_CNcity[0][2];
							for (i = 1; i < ranges_CNcity.length; i++){
								var range = ranges_CNcity[i];
								if (value > range[0] && value <= range[1]){
									style =  range[2];
								}
							};
							var allStyles = [];
							allStyles.push.apply(allStyles, style);
							return allStyles;
						},
                title: "市级行政区划"
            });

			
lyr_CNcity.setVisible(true);
var layersList = [baseLayer,lyr_CNcity];

function updateStyle(t) {
	lyr_CNcity.setStyle(function style_CNcity(feature) {
							var value = 0;
							if(code_keys.indexOf(String(parseInt(feature.get("SHI")))) > -1) {
								value = ncov_data[String(parseInt(feature.get("SHI")))]["cityConfirmed"][t];
							}
							var style = ranges_CNcity[0][2];
							for (i = 1; i < ranges_CNcity.length; i++){
								var range = ranges_CNcity[i];
								if (value > range[0] && value <= range[1]){
									style =  range[2];
								}
							};
							var allStyles = [];
							allStyles.push.apply(allStyles, style);
							return allStyles;
						});
}


