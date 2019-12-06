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
		for(var i = 1; i < province_cities[p_id].length; i++) {
			c_id = province_cities[p_id][0][1] + "_" + province_cities[p_id][i][1]
			$("#data-list").append("<tr><td><span class='g-color-purple'><b>" + province_cities[p_id][i][0] + "</b></span></td><td><form class='form-search'><input id='" + c_id + "' type='text' class='input-medium' placeholder='输入共享口令'></form></td><td><a href='###' onclick=\"openDownloadWin('" + c_id + "')\" data-toggle='tooltip' title='下载链接' data-content='' data-html='true' data-trigger='click' data-placement='top' class='popup-top-download'><i class='icon-download-purple'></i></a></td></tr>");
		}
	}, 500);
	
};
	
function openDownloadWin(id) {
	var key = $("#" + id).val();
	if(key == "" || key == null) {
		alert("口令不能为空");
	} else {
		window.location.href = "https://gaohr-blog.oss-cn-beijing.aliyuncs.com/data/POI/baidu_map_2019/poi_" + id + "-2019-" + key + ".rar";
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
	"0":[["浙江", "zhejiang"], ["杭州", ""], ["嘉兴", ""], ["湖州", ""], ["绍兴", ""], ["宁波", ""], ["舟山", ""], ["衢州", "quzhou"], ["温州", ""], ["丽水", ""], ["金华", ""], ["台州", ""]],
	"1":[["云南", "yunnan"], ["昆明", ""], ["曲靖", ""], ["玉溪", ""], ["保山", ""], ["临沧", ""], ["思茅", ""], ["昭通", ""], ["楚雄", ""], ["怒江", ""], ["大理", ""], ["文山", ""], ["红河", ""], ["德宏", ""], ["迪庆", ""], ["西双版纳", ""]],
	"2":[["新疆", "xinjiang"], ["乌鲁木齐", ""], ["克拉玛依", ""], ["吐鲁番", ""], ["喀什", ""], ["巴音郭楞", ""], ["和田", ""], ["哈密", ""], ["阿勒泰", ""], ["塔城", ""], ["博尔塔", ""], ["阿克苏", ""], ["昌吉", ""], ["伊犁", ""], ["克孜勒", ""]],
	"3":[["香港", "xianggang"], ["香港", ""]],
	"4":[["西藏", "xizang"], ["拉萨", ""], ["那曲", ""], ["林芝", ""], ["昌都", ""], ["日喀则", ""], ["山南", ""], ["阿里", ""]],
	"5":[["台湾", "taiwan"], ["台湾", ""]],
	"6":[["四川", "sichuan"], ["成都", ""], ["资阳", ""], ["乐山", ""], ["自贡", ""], ["内江", ""], ["眉山", ""], ["雅安", ""], ["绵阳", ""], ["德阳", ""], ["遂宁", ""], ["宜宾", ""], ["南充", ""], ["广安", ""], ["广元", ""], ["巴中", ""], ["达州", ""], ["攀枝花", ""], ["泸州", ""], ["凉山", ""], ["阿坝", ""], ["甘孜", ""]],
	"7":[["陕西", "shanxi02"], ["西安", ""], ["咸阳", ""], ["铜川", ""], ["渭南", ""], ["延安", ""], ["宝鸡", ""], ["商洛", ""], ["榆林", ""], ["汉中", ""], ["安康", ""]],
	"8":[["山西", "shanxi"], ["太原", ""], ["晋中", ""], ["临汾", ""], ["吕梁", ""], ["大同", ""], ["阳泉", ""], ["朔州", ""], ["忻州", ""], ["长治", ""], ["晋城", ""], ["运城", ""]],
	"9":[["山东", "shandong"], ["济南", "jinan"], ["青岛", "qingdao"], ["菏泽", "heze"], ["济宁", "jining"], ["莱芜", "laiwu"], ["枣庄", "zaozhuang"], ["临沂", "linyi"], ["日照", "rizhao"], ["淄博", "zibo"], ["滨州", "binzhou"], ["东营", "dongying"], ["聊城", "liaocheng"], ["德州", "dezhou"], ["潍坊", "weifang"], ["烟台", "yantai"], ["威海", "weihai"], ["泰安", "taian"]],
	"10":[["青海", "qinghai"], ["西宁", ""], ["海东", ""], ["海西", ""], ["海南", ""], ["海北", ""], ["玉树", ""], ["黄南", ""], ["果洛", ""]],
	"11":[["宁夏", "ningxia"], ["银川", ""], ["中卫", ""], ["吴忠", ""], ["固原", ""], ["石嘴山", ""]],
	"12":[["内蒙古", "neimenggu"], ["呼和浩特", ""], ["乌兰察布", ""], ["包头", ""], ["阿拉善", ""], ["鄂尔多斯", ""], ["乌海", ""], ["锡林郭勒", ""], ["呼伦贝尔", ""], ["赤峰", ""], ["通辽", ""], ["兴安", ""]],
	"13":[["辽宁", "ningxia"], ["沈阳", ""], ["大连", ""], ["锦州", ""], ["辽阳", ""], ["本溪", ""], ["鞍山", ""], ["丹东", ""], ["营口", ""], ["盘锦", ""], ["阜新", ""], ["铁岭", ""], ["抚顺", ""], ["朝阳", ""], ["葫芦岛", ""]],
	"14":[["江西", "jiangxi"], ["南昌", ""], ["九江", ""], ["赣州", ""], ["吉安", ""], ["抚州", ""], ["宜春", ""], ["新余", ""], ["萍乡", ""], ["上饶", ""], ["鹰潭", ""], ["景德镇", ""]],
	"15":[["吉林", "jilin"], ["长春", ""], ["吉林", ""], ["白山", ""], ["四平", ""], ["松原", ""], ["白城", ""], ["通化", ""], ["辽源", ""], ["延边", ""]],
	"16":[["湖南", "hunan"], ["长沙", ""], ["岳阳", ""], ["衡阳", ""], ["湘潭", ""], ["永州", ""], ["株洲", ""], ["郴州", "chenzhou"], ["邵阳", "shaoyang"], ["怀化", ""], ["娄底", ""], ["益阳", ""], ["常德", ""], ["张家界", ""], ["湘西", ""]],
	"17":[["湖北", "hubei"], ["武汉", ""], ["襄阳", ""], ["荆门", ""], ["荆州", ""], ["孝感", ""], ["黄冈", ""], ["黄石", ""], ["宜昌", ""], ["十堰", ""], ["随州", ""], ["鄂州", ""], ["恩施", ""], ["省直辖", ""]],
	"18":[["黑龙江", "heilongjiang"], ["哈尔滨", ""], ["齐齐哈尔", ""], ["大庆", ""], ["绥化", ""], ["黑河", ""], ["伊春", ""], ["鹤岗", ""], ["七台河", ""], ["牡丹江", ""], ["鸡西", ""], ["双鸭山", ""], ["佳木斯", ""], ["大兴安岭", ""]],
	"19":[["河南", "henan"], ["郑州", ""], ["许昌", ""], ["平顶山", ""], ["开封", ""], ["商丘", ""], ["新乡", ""], ["焦作", ""], ["洛阳", ""], ["南阳", ""], ["驻马店", ""], ["三门峡", ""], ["漯河", ""], ["周口", ""], ["鹤壁", ""], ["安阳", ""], ["濮阳", ""], ["信阳", ""]],
	"20":[["北京", "beijing"], ["北京", ""]],
	"21":[["天津", "tianjin"], ["天津", ""]],
	"22":[["海南", "hainan"], ["海口", ""], ["三亚", ""]],
	"23":[["贵州", "guizhou"], ["贵阳", ""], ["遵义", ""], ["铜仁", ""], ["六盘水", ""], ["毕节", ""], ["安顺", ""], ["黔东南", ""], ["黔南", ""], ["黔西南", ""]],
	"24":[["广西", "guangxi"], ["南宁", ""], ["桂林", ""], ["柳州", ""], ["来宾", ""], ["河池", ""], ["白色", ""], ["贺州", ""], ["梧州", ""], ["钦州", ""], ["贵港", ""], ["防城港", ""], ["北海", ""], ["玉林", ""], ["崇左", ""]],
	"25":[["甘肃", "gansu"], ["兰州", ""], ["白银", ""], ["定西", ""], ["天水", ""], ["庆阳", ""], ["平凉", ""], ["陇南", ""], ["武威", ""], ["金昌", ""], ["张掖", ""], ["酒泉", ""], ["嘉峪关", ""], ["临夏", ""], ["甘南", ""]],
	"26":[["福建", "fujian"], ["福州", ""], ["厦门", ""], ["泉州", ""], ["龙岩", ""], ["莆田", "putian"], ["三明", ""], ["宁德", ""], ["南平", ""], ["漳州", ""]],
	"27":[["澳门", "aomen"], ["澳门", "aomen"]],
	"28":[["安徽", "anhui"], ["合肥", ""], ["淮北", ""], ["宿州", ""], ["蚌埠", ""], ["六安", ""], ["阜阳", ""], ["亳州", ""], ["芜湖", ""], ["安庆", ""], ["宣城", ""], ["马鞍山", ""], ["淮南", ""], ["铜陵", ""], ["池州", ""], ["滁州", ""], ["黄山", ""]],
	"29":[["上海", "shanghai"], ["上海", ""]],
	"30":[["重庆", "chongqing"], ["重庆", ""]],
	"31":[["江苏", "jiangsu"], ["南京", ""], ["苏州", ""], ["扬州", ""], ["无锡", ""], ["镇江", ""], ["常州", ""], ["南通", ""], ["泰州", ""], ["盐城", ""], ["淮安", ""], ["宿迁", ""], ["徐州", ""], ["连云港", ""]],
	"32":[["广东", "guangdong"], ["广州", ""], ["深圳", ""], ["珠海", ""], ["中山", ""], ["佛山", ""], ["东莞", ""], ["惠州", ""], ["肇庆", ""], ["云浮", ""], ["茂名", ""], ["湛江", ""], ["阳江", ""], ["江门", ""], ["清远", ""], ["韶关", ""], ["河源", ""], ["梅州", ""], ["汕尾", ""], ["汕头", ""], ["揭阳", ""], ["潮州", ""]],
	"33":[["河北", "hebei"], ["石家庄", ""], ["保定", ""], ["承德", ""], ["唐山", ""], ["廊坊", ""], ["衡水", ""], ["邢台", ""], ["沧州", ""], ["邯郸", ""], ["秦皇岛", ""], ["张家口", ""]]
}
	





