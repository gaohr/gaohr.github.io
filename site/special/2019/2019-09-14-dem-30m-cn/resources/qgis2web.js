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
         maxZoom: 28, minZoom: 4
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

var select_data_id = new Array();
var onSingleClick = function(evt) {
    // if (doHover) {
    //     return;
    // }
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
	currentFeature.setStyle(new ol.style.Style({stroke: new ol.style.Stroke({color: 'rgba(255,255,255,1)', width: 1}), fill: new ol.style.Fill({color: 'rgba(35,145,255,0.5)'})}));
	currentFeature.setId(p_id);
	
	if(select_data_id.indexOf(p_id) == -1) {
		if(p_name != "") {
			// 添加id
			select_data_id.push(p_id);
			$("#data-list").append("<img id=\"loading\" src=\"2019-09-14-dem-30m-cn/loading.gif\" width=\"50%\">");
			setTimeout(function() {
				// 稍微增加等待时间
				$("#loading").remove();
				$("#data-list").append("<div id=\"" + p_id + "\" class=\"data-selected\">" +
								"<button type=\"button\" class=\"close\" data-dismiss=\"alert\" onclick=\"removeData('" + p_id + "')\">&times;</button>" +
								p_name + "-DEM-30m | TIFF" +
								"</div>");
			}, 2000);
		}
	} else {
		alert(p_name + "在数据列表中已存在！");
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

/**********************************************************************/

function removeData(id) {
	$("#" + id).remove();
	// 移除id
	select_data_id.splice(select_data_id.indexOf(id), 1);
	
	// 还原要素style
	selectedFeature = jsonSource_province_cn.getFeatureById(id);
	selectedFeature.setStyle(style_province_cn_original);
}

$("#submit").click(function() {
	$(".cont").html("<p class=\"g-color-red g-text-sm\">* 右键点击链接，选择“在新标签页中打开链接”，输入对应提取码，即可下载数据。</p>" +
					"<p class=\"g-color-red g-text-sm\">* 数据空间范围略大于行政区边界。</p>" +
					"<table class=\"table table-hover\">" +
					"<thead><tr><th>省份</th><th>下载地址</th><th>提取码</th><th>空间范围</th><th>数据缩略图</th><th>数据大小</th></tr></thead>" +
					"<tbody id=\"data_table\" class=\"data_table\"></tbody>" +
					"</table>");
	// 读取数组，获取相应数据链接
	$('#data_table').append("<img id=\"loading\" src=\"2019-09-14-dem-30m-cn/loading.gif\" width=\"30%\">")
	setTimeout(function() {
				$("#loading").remove();
				for(var k = 0; k < select_data_id.length; k++) {
					$("#data_table").append("<tr><td><span>" + data_links[select_data_id[k]][0] + "</span></td>" +
												"<td><a href=\"" + data_links[select_data_id[k]][1] + "\" target=\"_blank\">" + data_links[select_data_id[k]][1] + "</a></td>" +
												"<td><p><b>" + data_links[select_data_id[k]][2] + "</b></p></td>" +
												"<td><img src=\"2019-09-14-dem-30m-cn/imgs/" + data_links[select_data_id[k]][3] + ".jpg\" width=\"80\"></td>" +
												"<td><img src=\"2019-09-14-dem-30m-cn/imgs/" + imgshow(select_data_id[k]) + ".jpg\" width=\"80\"></td>" +
												"<td><p>" + data_links[select_data_id[k]][4] + "</p></td></tr>");
				}
				
			}, 1000);
	
	
	$('.close').click(function () {
		$('#popup_link').hide();
		$('#mask_shadow').hide();
	})
});

$("#refresh").click(function() {
	$("#data-list").html("");
	// 清空数组
	select_data_id = [];
	
	allFeatures = jsonSource_province_cn.getFeatures();
	for (var f=0; f<allFeatures.length; f++) {
		allFeatures[f].setStyle(style_province_cn_original);
	}
});

function imgshow(id) {
	if(data_links[id][2] == "") {
		return "no-img";
	} else {
		return data_links[id][3] + "-data";
	}
}
	
var data_links = {
	"0":["浙江", "抱歉，暂无该省区DEM数据，请在评论区留言定制数据！", "", "Zhejiang", ""],
	"1":["云南", "抱歉，暂无该省区DEM数据，请在评论区留言定制数据！", "", "Yunnan", ""],
	"2":["新疆", "https://pan.baidu.com/s/1GcGRsm1CBlk1lSCXrvuiJA", "ts9c", "Xinjiang", "2.82 GB"],
	"3":["香港", "抱歉，暂无该省区DEM数据，请在评论区留言定制数据！", "", "Xianggang", ""],
	"4":["西藏", "https://pan.baidu.com/s/1TYEhrxlAfy3K3rebWxZnWA", "k8d4", "Xizang", "2.69 GB"],
	"5":["台湾", "抱歉，暂无该省区DEM数据，请在评论区留言定制数据！", "", "Taiwan", ""],
	"6":["四川", "抱歉，暂无该省区DEM数据，请在评论区留言定制数据！", "", "Sichuan", ""],
	"7":["陕西", "https://pan.baidu.com/s/1oUQI96zIGLAcikO5Hc1mLA", "4qgj", "Shanxi2", "631.35 MB"],
	"8":["山西", "抱歉，暂无该省区DEM数据，请在评论区留言定制数据！", "", "Shanxi", ""],
	"9":["山东", "https://pan.baidu.com/s/1qnZcbh_ubIOY9z0TtSPjBQ", "371n", "Shandong", "220.58 MB"],
	"10":["青海", "https://pan.baidu.com/s/17kANxxxxeJZNgutgrKFn-A", "smsp", "Qinghai", "1.47 GB"],
	"11":["宁夏", "抱歉，暂无该省区DEM数据，请在评论区留言定制数据！", "", "Ningxia", ""],
	"12":["内蒙古", "https://pan.baidu.com/s/17v_CvdcY_Z1C3T2g7IfmKA", "qk1t", "Neimenggu", "2.21 GB"],
	"13":["辽宁", "https://pan.baidu.com/s/1ihgvCPb_joIu2GM88ikHVg", "nwy4", "Liaoning", "325.27 MB"],
	"14":["江西", "抱歉，暂无该省区DEM数据，请在评论区留言定制数据！", "", "Jiangxi", ""],
	"15":["吉林", "https://pan.baidu.com/s/1EgYcdyPBdeDeDjiR1rCcrw", "kkvl", "Jilin", "538.75 MB"],
	"16":["湖南", "抱歉，暂无该省区DEM数据，请在评论区留言定制数据！", "", "Hunan", ""],
	"17":["湖北", "https://pan.baidu.com/s/1mW4tB2UbWyFlG3r9G0qMtw", "kjga", "Hubei", "475.58 MB"],
	"18":["黑龙江", "https://pan.baidu.com/s/1eFH2FPwGMs4MxZd__XCnIg", "f63s", "Heilongjiang", "1.06 GB"],
	"19":["河南", "https://pan.baidu.com/s/1XcwhTMkMZOvVrlWwtqGlhA", "rnsn", "Henan", "366.00 MB"],
	"20":["北京市", "https://pan.baidu.com/s/1XDHmfnxzmVQCQ7QQXVzHAQ", "nl7q", "Beijing", "82.52 MB"],
	"21":["天津市", "https://pan.baidu.com/s/1zvHhR7_EUs8hJ4d3V6awGA", "g0bz", "Tianjin", "50.23 MB"],
	"22":["海南", "抱歉，暂无该省区DEM数据，请在评论区留言定制数据！", "", "Hainan", ""],
	"23":["贵州", "抱歉，暂无该省区DEM数据，请在评论区留言定制数据！", "", "Guizhou", ""],
	"24":["广西", "抱歉，暂无该省区DEM数据，请在评论区留言定制数据！", "", "Guangxi", ""],
	"25":["甘肃", "https://pan.baidu.com/s/1zArxvVyOUsXhvlpvty25Rw", "3mzs", "Gansu", "1.10 GB"],
	"26":["福建", "抱歉，暂无该省区DEM数据，请在评论区留言定制数据！", "", "Fujian", ""],
	"27":["澳门", "抱歉，暂无该省区DEM数据，请在评论区留言定制数据！", "", "Aomen", ""],
	"28":["安徽", "抱歉，暂无该省区DEM数据，请在评论区留言定制数据！", "", "Anhui", ""],
	"29":["上海", "抱歉，暂无该省区DEM数据，请在评论区留言定制数据！", "", "Shanghai", ""],
	"30":["重庆", "https://pan.baidu.com/s/12IX8cdN4sdiaUPIbQQ2iZA", "wvbn", "Chongqing", "375.78 MB"],
	"31":["江苏", "抱歉，暂无该省区DEM数据，请在评论区留言定制数据！", "", "Jiangsu", ""],
	"32":["广东", "抱歉，暂无该省区DEM数据，请在评论区留言定制数据！", "", "Guangdong", ""],
	"33":["河北", "https://pan.baidu.com/s/1vJ0Hbbyu535zQgTUmSeR9Q", "tv1u", "Hebei", "452.99 MB"]
}
	
// 将有数据的省份列出来
for(var key in data_links) {
if(data_links[key][2] != "") {
		$("#pd_list").append("<span>" + data_links[key][0] + "</span>");
	}
}




