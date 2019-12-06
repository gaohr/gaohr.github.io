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
		for(var i = 0; i < province_cities[p_id].length; i++) {
			$("#data-list").append("<tr><td><span class='g-color-purple'>" + province_cities[p_id][i] + "</span></td><td><form class='form-search'><input id='000' type='text' class='input-medium' placeholder='输入共享口令'></form></td><td><a href='###' onclick=\"openDownloadWin('000', '000')\" data-toggle='tooltip' title='下载链接' data-content='' data-html='true' data-trigger='click' data-placement='top' class='popup-top-download'><i class='icon-download-purple'></i></a></td></tr>");
		}
	}, 2000);
	
};
	
function openDownloadWin(id, name_en) {
	var key = $("#000").val();
	if(key == "" || key == null) {
		alert("口令不能为空");
	} else {
		window.location.href = "https://gaohr-blog.oss-cn-beijing.aliyuncs.com/data/OSM_map/OSM_railways_2019/railways_" + name_en + "_201910-osm-" + key + ".rar";
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
	
var province_cities = {
	"0":["浙江", "https://pan.baidu.com/s/1PRkMHN2zMrNGdxib-Hoo4g", "ti5i", "Zhejiang", "248.35 MB"],
	"1":["云南", "https://pan.baidu.com/s/1QxhHUpeA5KTG93T8JN3Ifw", "nchz", "Yunnan", "1.08 GB"],
	"2":["新疆", "https://pan.baidu.com/s/1GcGRsm1CBlk1lSCXrvuiJA", "ts9c", "Xinjiang", "2.82 GB"],
	"3":["香港", "https://pan.baidu.com/s/1X2kOe3xmDGRH9DeAAooYcA", "qjra", "Xianggang", "13.2 MB"],
	"4":["西藏", "https://pan.baidu.com/s/1TYEhrxlAfy3K3rebWxZnWA", "k8d4", "Xizang", "2.69 GB"],
	"5":["台湾", "https://pan.baidu.com/s/1R9E7glmuHe41QQ1kSPr4Rw", "16wu", "Taiwan", "50.84 MB"],
	"6":["四川", "https://pan.baidu.com/s/16PH8fFcngankQri3fhR-iA", "xbav", "Sichuan", "1.26 GB"],
	"7":["陕西", "https://pan.baidu.com/s/1oUQI96zIGLAcikO5Hc1mLA", "4qgj", "Shanxi2", "631.35 MB"],
	"8":["山西", "https://pan.baidu.com/s/1rJU4nmZIx2OzX0qS9guLzQ", "5nku", "Shanxi", "372.50 MB"],
	"9":["济南", "青岛", "菏泽", "济宁", "莱芜"], // 山东
	"10":["青海", "https://pan.baidu.com/s/17kANxxxxeJZNgutgrKFn-A", "smsp", "Qinghai", "1.47 GB"],
	"11":["宁夏", "https://pan.baidu.com/s/1kfmFc8Q7WPUYSIsYMoZilQ", "e4lf", "Ningxia", "149.33 MB"],
	"12":["内蒙古", "https://pan.baidu.com/s/17v_CvdcY_Z1C3T2g7IfmKA", "qk1t", "Neimenggu", "2.21 GB"],
	"13":["辽宁", "https://pan.baidu.com/s/1ihgvCPb_joIu2GM88ikHVg", "nwy4", "Liaoning", "325.27 MB"],
	"14":["江西", "https://pan.baidu.com/s/1IXaMf8fFiGkAbdc_zj3LOg", "en43", "Jiangxi", "412.02 MB"],
	"15":["吉林", "https://pan.baidu.com/s/1EgYcdyPBdeDeDjiR1rCcrw", "kkvl", "Jilin", "538.75 MB"],
	"16":["湖南", "https://pan.baidu.com/s/1ss4qrSC_M3iZPVquCHDUBg", "4iv7", "Hunan", "518.46 MB"],
	"17":["湖北", "https://pan.baidu.com/s/1mW4tB2UbWyFlG3r9G0qMtw", "kjga", "Hubei", "475.58 MB"],
	"18":["黑龙江", "https://pan.baidu.com/s/1eFH2FPwGMs4MxZd__XCnIg", "f63s", "Heilongjiang", "1.06 GB"],
	"19":["河南", "https://pan.baidu.com/s/1XcwhTMkMZOvVrlWwtqGlhA", "rnsn", "Henan", "366.00 MB"],
	"20":["北京", "https://pan.baidu.com/s/1XDHmfnxzmVQCQ7QQXVzHAQ", "nl7q", "Beijing", "82.52 MB"],
	"21":["天津", "https://pan.baidu.com/s/1zvHhR7_EUs8hJ4d3V6awGA", "g0bz", "Tianjin", "50.23 MB"],
	"22":["海南", "https://pan.baidu.com/s/1gePTN4U1Xpo0IIYbDvuqrw", "hiqq", "Hainan", "41.42 MB"],
	"23":["贵州", "https://pan.baidu.com/s/1OgnEfaFGWI81r3LK6qsV_Q", "lcfm", "Guizhou", "501.60 MB"],
	"24":["广西", "https://pan.baidu.com/s/19QJBloTq4HAHj5Xub4q3lg", "jlf9", "Guangxi", "563.87 MB"],
	"25":["甘肃", "https://pan.baidu.com/s/1zArxvVyOUsXhvlpvty25Rw", "3mzs", "Gansu", "1.10 GB"],
	"26":["福建", "https://pan.baidu.com/s/13I96jLryzWaK9TIIqHKmbA", "fivg", "Fujian", "318.69 MB"],
	"27":["澳门", "https://pan.baidu.com/s/1X2kOe3xmDGRH9DeAAooYcA", "qjra", "Aomen", "13.2 MB"],
	"28":["安徽", "https://pan.baidu.com/s/1A03CKmH__Awy8iQr2mMpFg", "1azd", "Anhui", "302.77 MB"],
	"29":["上海", "https://pan.baidu.com/s/1vggMuCW4PEQpm0Np3TW8Mw", "1ny6", "Shanghai", "20.09 MB"],
	"30":["重庆", "https://pan.baidu.com/s/12IX8cdN4sdiaUPIbQQ2iZA", "wvbn", "Chongqing", "375.78 MB"],
	"31":["江苏", "https://pan.baidu.com/s/1kM6_dE2WdwFFtW2cl0gf1g", "qjak", "Jiangsu", "161.06 MB"],
	"32":["广东", "https://pan.baidu.com/s/1rz3k9ZLiHt7OD1ScpBWCpw", "cd0l", "Guangdong", "331.46 MB"],
	"33":["河北", "https://pan.baidu.com/s/1vJ0Hbbyu535zQgTUmSeR9Q", "tv1u", "Hebei", "452.99 MB"]
}
	





