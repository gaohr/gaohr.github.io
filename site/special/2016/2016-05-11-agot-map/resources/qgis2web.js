
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');
var container_c = document.getElementById('popup-c');
var content_c = document.getElementById('popup-content-c');
var closer_c = document.getElementById('popup-closer-c');
closer.onclick = function() {
    container.style.display = 'none';
    closer.blur();
    return false;
};
closer_c.onclick = function() {
	container_c.style.display = 'none';
    closer_c.blur();
    return false;
};
var overlayPopup = new ol.Overlay({
    element: container,
});
var overlayPopup_c = new ol.Overlay({
	element: container_c,
});

var expandedAttribution = new ol.control.Attribution({
    collapsible: false
});

var map = new ol.Map({
    controls: ol.control.defaults({attribution:false}).extend([
        expandedAttribution,
		new ol.control.ScaleLine({})
		// new ol.control.LayerSwitcher({tipLabel: "Layers"})
    ]),
    target: document.getElementById('map'),
    renderer: 'canvas',
    overlays: [overlayPopup, overlayPopup_c],
    layers: layersList,
    view: new ol.View({
         maxZoom: 28, minZoom: 2, projection: 'EPSG:4326'
    })
});
map.getView().fit([93.717497, -19.679874, 69.187273, 55.030766], map.getSize());

var NO_POPUP = 0
var ALL_FIELDS = 1

/**
 * Returns either NO_POPUP, ALL_FIELDS or the name of a single field to use for
 * a given layer
 * @param layerList {Array} List of ol.Layer instances
 * @param layer {ol.Layer} Layer to find field info about
 */
function getPopupFields(layerList, layer) {
    popupLayers = [0,0,0,0,0,0,0,0,0,1,0,0,1,1,0,0,0,0,1,1,1];
    // Determine the index that the layer will have in the popupLayers Array,
    // if the layersList contains more items than popupLayers then we need to
    // adjust the index to take into account the base maps group
    var idx = layersList.indexOf(layer) - (layersList.length - popupLayers.length);
    return popupLayers[idx];
}

var doHover = true;
var onPointerMove = function(evt) {
    if (!doHover) {
        return;
    }
    var pixel = map.getEventPixel(evt.originalEvent);
    var coord = evt.coordinate;
    var popupField;
    var popupText = '';
    var currentFeature;
    var currentLayer;
    var currentFeatureKeys;
    map.forEachFeatureAtPixel(pixel, function(feature, layer) {
        currentFeature = feature;
        currentLayer = layer;
        currentFeatureKeys = currentFeature.getKeys();
        var field = getPopupFields(layersList, layer);
        if (field == NO_POPUP) {
        } else if (field == ALL_FIELDS) {
            for (var i=0; i<currentFeatureKeys.length; i++) {
                if (currentFeatureKeys[i] != 'geometry' && currentFeatureKeys[i] == "name") {
                    popupText = '<p>'+ currentFeature.get(currentFeatureKeys[i]) + '</p>';
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
            closer.blur();
        }
    }
};
var ifcity;
var onSingleClick = function(evt) {
	container.style.display = 'none';
    closer.blur();
    var pixel_c = map.getEventPixel(evt.originalEvent);
    var coord_c = evt.coordinate;
    var popupText_c = '';
    var currentFeature_c;
    var currentFeatureKeys_c;
	var city = true;
	ifcity = true;
    map.forEachFeatureAtPixel(pixel_c, function(feature_c, layer) {
        currentFeature_c = feature_c;
        currentFeatureKeys_c = currentFeature_c.getKeys();
        var field_c = getPopupFields(layersList, layer);
        if (field_c == NO_POPUP) {
        } else if (field_c == ALL_FIELDS) {
			for (var i=0; i<currentFeatureKeys_c.length; i++) {
				if(currentFeatureKeys_c[i] == 'type') {
						if(currentFeature_c.get(currentFeatureKeys_c[i]) == 'war') {
							city = false;
							ifcity = city;
							break;
						}
					}
			}
            for (var i=0; i<currentFeatureKeys_c.length; i++) {
                if (currentFeatureKeys_c[i] != 'geometry') {
					if(city) {
						if (currentFeatureKeys_c[i] == 'name') {
							popupText_c = '<p class=\"name\"><b>' + currentFeature_c.get(currentFeatureKeys_c[i]) + '</b></p>'
						} else if(currentFeatureKeys_c[i] == 'info') {
							popupText_c += '<p class=\"info\">' + currentFeature_c.get(currentFeatureKeys_c[i]) + '</p>'
						}
					} else {
						if (currentFeatureKeys_c[i] == 'name') {
							popupText_c = '<p class=\"name-w\"><b>' + currentFeature_c.get(currentFeatureKeys_c[i]) + '</b></p>'
						} else if(currentFeatureKeys_c[i] == 'info') {
							popupText_c += '<p class=\"info-w\">' + currentFeature_c.get(currentFeatureKeys_c[i]) + '</p>'
						}
					}
					
                   
                }
            }
            popupText_c = popupText_c + '</table>';
        } else {
            var value_c = feature_c.get(field_c);
            if (value_c) {
                popupText_c = '<strong>' + field_c + ':</strong> '+ value_c;
            }  
        }          
    });
	//alert(ifcity)
	if(!ifcity) {
		$("div#popup-c").attr("class", "ol-popup-w");
		$("a#popup-closer-c").attr("class", "ol-popup-closer-w");
	} else {
		$("div#popup-c").attr("class", "ol-popup-c");
		$("a#popup-closer-c").attr("class", "ol-popup-closer-c");
	}
    if (popupText_c) {
        overlayPopup_c.setPosition(coord_c);
        content_c.innerHTML = popupText_c;
        container_c.style.display = 'block';        
    } else {
        container_c.style.display = 'none';
        closer_c.blur();
    }
};

map.on('pointermove', function(evt) {
    onPointerMove(evt);
});
map.on('singleclick', function(evt) {
    onSingleClick(evt);
});




var attribution = document.getElementsByClassName('ol-attribution')[0];
var attributionList = attribution.getElementsByTagName('ul')[0];
var firstLayerAttribution = attributionList.getElementsByTagName('li')[0];
var qgis2webAttribution = document.createElement('li');
qgis2webAttribution.innerHTML = '<a href="https://github.com/tomchadwin/qgis2web">qgis2web</a>';
attributionList.insertBefore(qgis2webAttribution, firstLayerAttribution);
