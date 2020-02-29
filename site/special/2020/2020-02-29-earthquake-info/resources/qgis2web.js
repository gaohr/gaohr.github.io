var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var overlayPopup = new ol.Overlay({
    element: container
});
var expandedAttribution = new ol.control.Attribution({
    collapsible: false
});
var map = new ol.Map({
    controls: ol.control.defaults({attribution:false}).extend([
        expandedAttribution,new ol.control.ScaleLine({}),new ol.control.LayerSwitcher({tipLabel: "Layers"})
    ]),
    target: document.getElementById('map'),
    renderer: 'canvas',
    overlays: [overlayPopup],
    layers: layersList,
    view: new ol.View({
         maxZoom: 5, minZoom: 3
    })
});
map.getView().fit([5320697.062490, 1850319.243836, 18061099.299664, 6548967.501323], map.getSize());

var NO_POPUP = 0;
var ALL_FIELDS = 1;

if ($("#map").size() != 0) {
	$("#loading-map").hide();
}

popupLayers = [0, 0, 1];

var collection = new ol.Collection();
var featureOverlay = new ol.layer.Vector({
    map: map,
    source: new ol.source.Vector({
        features: collection,
        useSpatialIndex: false // optional, might improve performance
    }),
    style: [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'rgba(255,0,0,0)',
            width: 1
        }),
        fill: new ol.style.Fill({
            color: 'rgba(255,0,0,0)'
        }),
    })],
    updateWhileAnimating: true, // optional, for instant visual feedback
    updateWhileInteracting: true // optional, for instant visual feedback
});

var doHighlight = true;
var doHover = true;

var highlight;
var onPointerMove = function(evt) {
    if (!doHover && !doHighlight) {
        return;
    }
    var pixel = map.getEventPixel(evt.originalEvent);
    var coord = evt.coordinate;
    var popupText = "";
    var currentFeature;
    var currentLayer;
    var currentFeatureKeys;
    map.forEachFeatureAtPixel(pixel, function(feature, layer) {
        currentFeature = feature;
        currentLayer = layer;
        currentFeatureKeys = currentFeature.getKeys();
        var field = popupLayers[layersList.indexOf(layer) - 1];
        if (field == NO_POPUP) {
        } else if (field == ALL_FIELDS) {
			popupText = "";
            for (var i=0; i<currentFeatureKeys.length; i++) {
                if (currentFeatureKeys[i] != 'geometry') {
					if(currentFeatureKeys[i] == '7') {
						popupText += '<p style="background:#555;padding:2px;font-size:12px;color:#fff">发生日期：<b>' + currentFeature.get(currentFeatureKeys[i]) + '</b></p>';
					} else if (currentFeatureKeys[i] == '5') {
						popupText += '<span><b>地点</b>: ' + currentFeature.get(currentFeatureKeys[i]) + '</span><br>';
					} else if (currentFeatureKeys[i] == '6') {
						popupText += '<span><b>类型</b>: ' + currentFeature.get(currentFeatureKeys[i]) + '</span><br>';
					} else if (currentFeatureKeys[i] == '4') {
						popupText += '<span><b>震级</b>: ' + currentFeature.get(currentFeatureKeys[i]) + '</span><br>';
					} else if (currentFeatureKeys[i] == '3') {
						popupText += '<span><b>震深</b>: ' + currentFeature.get(currentFeatureKeys[i]) + ' (km)</span><br>';
					} else {
						continue;
					}
                }
            }
        } else {
            var value = feature.get(field);
            if (value) {
                popupText = '<strong>' + field + ':</strong> ' + value;
            }  
        }
    });
    if (doHover) {
        if (popupText) {
            overlayPopup.setPosition(coord);
            content.innerHTML = popupText;
            container.style.display = 'block';        
        } else {
            container.style.display = 'none';
        }
    }
	
	if (doHighlight) {
        if (currentFeature !== highlight) {
            if (highlight) {
                featureOverlay.getSource().removeFeature(highlight);
            }
            if (currentFeature) {
                if (currentFeature.getGeometry().getType() == 'Point') {
                    highlightStyle = new ol.style.Style({
                        image: new ol.style.Circle({
                            fill: new ol.style.Fill({
                                color: "#ffff00"
                            }),
                            radius: 5
                        })
                    })
                } else if (currentFeature.getGeometry().getType() == 'LineString') {
                    highlightStyle = new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: '#ffff00',
                            lineDash: null,
                            width: 1
                        })
                    });
                } else {
                    highlightStyle = new ol.style.Style({
                        fill: new ol.style.Fill({
                            color: 'rgba(255,0,0,0.05)'
                        })
                    })
                }
                featureOverlay.getSource().addFeature(currentFeature);
                featureOverlay.setStyle(highlightStyle);
            }
            highlight = currentFeature;
        }
    }
};

map.on('pointermove', function(evt) {
    onPointerMove(evt);
});

// 获取最新的100条记录的经纬度
var coordinates = [];
var npoint = 20;
for(var k = 0; k < npoint; k++) {
	coord = geojson_earthquackcnquick["features"][k]["geometry"]["coordinates"];
	coordinates.push(coord);
}
var newstyle = new ol.style.Style({
	image: new ol.style.Circle({
		radius: 4,
		stroke: new ol.style.Stroke({color: "rgba(255,0,0,0.8)", width: 2}), 
		fill: new ol.style.Fill({color: "rgba(255,255,0,1)"})
	})
});
var geoPoints = new ol.geom.MultiPoint(coordinates);
geoPoints.applyTransform(ol.proj.getTransform('EPSG:4326', 'EPSG:3857'));

var newFeature = new ol.Feature({
	//geometry: new ol.geom.Point(coordinates, {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'})
	geometry: geoPoints
});
newFeature.setStyle(newstyle);
var newSource = new ol.source.Vector({
	features: [newFeature]
});
var pointLayer = new ol.layer.Vector({
	source:newSource, 
	title: "最新发生的地震事件"
});
map.addLayer(pointLayer);

// 
coordinates_trans = geoPoints.getCoordinates();
function timer(timeout){
	let i = 0;
	let t;
	t = setInterval(time, 500);
	function time() {
		var point_div = document.createElement('div');
		point_div.className = "css_animation";
		var point_overlay = new ol.Overlay({
			element: point_div,
			positioning: 'center-center'
		});
		map.addOverlay(point_overlay);
		point_overlay.setPosition(coordinates_trans[i]);
		i++;
		if(i >= timeout) {
			clearInterval(t);
		}
	}
}
timer(npoint);


////////////////////////////////////////////////////////////////////////
var attribution = document.getElementsByClassName('ol-attribution')[0];
var attributionList = attribution.getElementsByTagName('ul')[0];
var firstLayerAttribution = attributionList.getElementsByTagName('li')[0];
var qgis2webAttribution = document.createElement('li');
qgis2webAttribution.innerHTML = '<a href="http://gaohr.win">GaoHR</a>';
attributionList.insertBefore(qgis2webAttribution, firstLayerAttribution);
