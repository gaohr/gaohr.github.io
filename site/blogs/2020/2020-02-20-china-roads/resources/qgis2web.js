var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');
closer.onclick = function() {
    container.style.display = 'none';
    closer.blur();
    return false;
};
var overlayPopup = new ol.Overlay({
    element: container
});

var expandedAttribution = new ol.control.Attribution({
    collapsible: false
});

var map = new ol.Map({
    controls: ol.control.defaults({attribution:false}).extend([
        expandedAttribution,new ol.control.LayerSwitcher({tipLabel: "Layers"})
    ]),
    target: document.getElementById('map'),
    renderer: 'canvas',
    overlays: [overlayPopup],
    layers: layersList,
    view: new ol.View({
         maxZoom: 28, minZoom: 3
    })
});

map.getView().fit([5320697.062490, 1850319.243836, 18061099.299664, 6548967.501323], map.getSize());

var NO_POPUP = 0
var ALL_FIELDS = 1

if ($("#map").size() != 0) {
	$("#loading-map").hide();
}

/**
 * Returns either NO_POPUP, ALL_FIELDS or the name of a single field to use for
 * a given layer
 * @param layerList {Array} List of ol.Layer instances
 * @param layer {ol.Layer} Layer to find field info about
 */
function getPopupFields(layerList, layer) {
    // Determine the index that the layer will have in the popupLayers Array,
    // if the layersList contains more items than popupLayers then we need to
    // adjust the index to take into account the base maps group
    var idx = layersList.indexOf(layer) - (layersList.length - popupLayers.length);
    return popupLayers[idx];
}

var collection = new ol.Collection();
var featureOverlay = new ol.layer.Vector({
    map: map,
    source: new ol.source.Vector({
        features: collection,
        useSpatialIndex: false // optional, might improve performance
    }),
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
    var popupField;
    var popupText = '';
    var currentFeature;
    var currentLayer;
    var currentFeatureKeys;
    map.forEachFeatureAtPixel(pixel, function(feature, layer) {
        // We only care about features from layers in the layersList, ignore
        // any other layers which the map might contain such as the vector
        // layer used by the measure tool
        if (layersList.indexOf(layer) === -1) {
            return;
        }
        currentFeature = feature;
        currentLayer = layer;
        currentFeatureKeys = currentFeature.getKeys();
        var doPopup = false;
        for (k in layer.get('fieldImages')) {
            if (layer.get('fieldImages')[k] != "Hidden") {
                doPopup = true;
            }
        }
        if (doPopup) {
            popupText = '<table>';
            for (var i=0; i<currentFeatureKeys.length; i++) {
				if (currentFeatureKeys[i] != 'geometry') {
                    popupField = '';
					if(layer.get('fieldAliases')[currentFeatureKeys[i]] == "NAME") {
						popupField += currentFeature.get(currentFeatureKeys[i]);
					}
                    popupText = popupText + '<tr>' + popupField + '</tr>';
                }
            }
            popupText = popupText + '</table>';
        }
    });

    if (doHighlight) {
        if (currentFeature !== highlight) {
            if (highlight) {
                featureOverlay.getSource().removeFeature(highlight);
            }
            if (currentFeature) {
                highlightStyle = new ol.style.Style({fill: new ol.style.Fill({color: 'rgba(255,255,255,0.5)'})})
                featureOverlay.getSource().addFeature(currentFeature);
                featureOverlay.setStyle(highlightStyle);
            }
            highlight = currentFeature;
        }
    }

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

var onSingleClick = function(evt) {
    // if (doHover) {
    //     return;
    // }
	// 点击后，先刷新style
	allFeatures = jsonSource_province_cn.getFeatures();
	for (var f=0; f<allFeatures.length; f++) {
		allFeatures[f].setStyle(style_province_cn_original);
	}
	
    var pixel = map.getEventPixel(evt.originalEvent);
    var coord = evt.coordinate;
	var p_name = ""
	var p_id = ""
    var popupText = '';
    var currentFeature;
    var currentFeatureKeys;
    map.forEachFeatureAtPixel(pixel, function(feature, layer) {
        currentFeature = feature;
        currentFeatureKeys = currentFeature.getKeys();
        popupText = '';
        for (var i=0; i<currentFeatureKeys.length; i++) {
            if (currentFeatureKeys[i] != 'geometry') {
				if(currentFeatureKeys[i] == "NAME") {
					p_name = currentFeature.get(currentFeatureKeys[i]);
				} else if(currentFeatureKeys[i] == "ID") {
					p_id = String(parseInt(currentFeature.get(currentFeatureKeys[i])));
				}
            }
        }
    });
	
	// 点击后改变要素style
	currentFeature.setStyle(new ol.style.Style({stroke: new ol.style.Stroke({color: 'rgba(255,255,255,1)', width: 1}), fill: new ol.style.Fill({color: 'rgba(35,145,255,0.75)'})}));
	currentFeature.setId(p_id);
	
	// 清空列表
	$("#data-list").html("");
	
	$("#data-body").append("<img id=\"loading\" src=\"http://gaohr.win/img/others/loading-0.gif\" class=\"width-percent-60\">");
	$("#portlet-title-province").html("<i class='icon-list'></i> 地市列表 - <b>" + p_name + "</b>");
	setTimeout(function() {
		// 稍微增加等待时间
		$("#loading").remove();
		$("#data-list").append("<tr><td><span class='g-color-red g-text-bg'><b>全国</b></span></td><td><form class='form-search'><input id='China' type='text' class='input-medium' placeholder='输入共享口令'></form></td><td><a href='###' onclick=\"openDownloadWin('China')\" data-toggle='tooltip' title='下载' data-content='' data-html='true' data-trigger='click' data-placement='top' class='popup-top-download'><i class='icon-download'></i></a></td></tr>");
		for(var i = 0; i < province_cities[p_id].length; i++) {
			c_id = province_cities[p_id][0][1] + "_" + province_cities[p_id][i][1]
			if(i == 0){
				$("#data-list").append("<tr><td><span class='g-color-green g-text-bg'><b>" + province_cities[p_id][i][0] + "</b></span></td><td><form class='form-search'><input id='" + c_id + "' type='text' class='input-medium' placeholder='输入共享口令'></form></td><td><a href='###' onclick=\"openDownloadWin('" + c_id + "')\" data-toggle='tooltip' title='下载' data-content='' data-html='true' data-trigger='click' data-placement='top' class='popup-top-download'><i class='icon-download-green'></i></a></td></tr>");
			} else {
				$("#data-list").append("<tr><td><span class='g-color-purple'><b>" + province_cities[p_id][i][0] + "</b></span></td><td><form class='form-search'><input id='" + c_id + "' type='text' class='input-medium' placeholder='输入共享口令'></form></td><td><a href='###' onclick=\"openDownloadWin('" + c_id + "')\" data-toggle='tooltip' title='下载' data-content='' data-html='true' data-trigger='click' data-placement='top' class='popup-top-download'><i class='icon-download-purple'></i></a></td></tr>");
			}
			
		}
	}, 500);
	
};
	
function openDownloadWin(id) {
	var key = $("#" + id).val();
	idArr = id.split("_");
	if(idArr[0] == idArr[1]) {
		id = idArr[0]
	}
	if(key == "" || key == null) {
		alert("口令不能为空");
	} else {
		window.open("https://gaohr-blog.oss-cn-beijing.aliyuncs.com/data/Roads_data/roads_" + id + "_" + key + ".rar");
	}
}
	
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

/**********************************************************************/
