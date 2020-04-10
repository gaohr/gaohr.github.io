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
			c_id = province_cities[p_id][0][1] + "_" + province_cities[p_id][i][1]
			if(i == 0){
				$("#data-list").append("<tr><td><span class='g-color-red g-text-bg'><b>" + province_cities[p_id][i][0] + "</b></span></td><td><form class='form-search'><input id='" + c_id + "' type='text' class='input-medium' placeholder='输入共享口令'></form></td><td><a target='_blank' href='###' onclick=\"openDownloadWin('" + c_id + "')\" data-toggle='tooltip' title='下载链接' data-content='' data-html='true' data-trigger='click' data-placement='top' class='popup-top-download'><i class='icon-download'></i></a></td></tr>");
			} else {
				$("#data-list").append("<tr><td><span class='g-color-purple'><b>" + province_cities[p_id][i][0] + "</b></span></td><td><form class='form-search'><input id='" + c_id + "' type='text' class='input-medium' placeholder='输入共享口令'></form></td><td><a target='_blank' href='###' onclick=\"openDownloadWin('" + c_id + "')\" data-toggle='tooltip' title='下载链接' data-content='' data-html='true' data-trigger='click' data-placement='top' class='popup-top-download'><i class='icon-download-purple'></i></a></td></tr>");
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
	
var province_cities = {
	"0": [["浙江", "Zhejiang"], ["杭州", "Hangzhou"], ["嘉兴", "Jiaxing"], ["湖州", "Huzhou"], ["绍兴", "Shaoxing"], ["宁波", "Ningbo"], ["舟山", "Zhoushan"], ["衢州", "Quzhou"], ["温州", "Wenzhou"], ["丽水", "Lishui"], ["金华", "Jinhua"], ["台州", "Taizhou"]], 
	"1": [["云南", "Yunnan"], ["昆明", "Kunming"], ["曲靖", "Qujing"], ["玉溪", "Yuxi"], ["保山", "Baoshan"], ["临沧", "Lincang"], ["思茅", "Simao"], ["昭通", "Zhaotong"], ["楚雄", "Chuxiong"], ["怒江", "Nujiang"], ["大理", "Dali"], ["文山", "Wenshan"], ["红河", "Honghe"], ["德宏", "Dehong"], ["迪庆", "Diqing"], ["西双版纳", "Xishuangbanna"]], 
	"2": [["新疆", "Xinjiang"], ["乌鲁木齐", "Wulumuqi"], ["克拉玛依", "Kelamayi"], ["吐鲁番", "Tulufan"], ["喀什", "Kashen"], ["巴音郭楞", "Bayinguoleng"], ["和田", "Hetian"], ["哈密", "Hami"], ["阿勒泰", "Aletai"], ["塔城", "Tacheng"], ["博尔塔", "Boerta"], ["阿克苏", "Akesu"], ["昌吉", "Changji"], ["伊犁", "Yili"], ["克孜勒", "Kezile"]], 
	"3": [["香港", "Xianggang"], ["香港", "Xianggang"]], 
	"4": [["西藏", "Xicang"], ["拉萨", "Lasa"], ["那曲", "Naqu"], ["林芝", "Linzhi"], ["昌都", "Changdu"], ["日喀则", "Rikaze"], ["山南", "Shannan"], ["阿里", "Ali"]], 
	"5": [["台湾", "Taiwan"], ["台湾", "Taiwan"]], 
	"6": [["四川", "Sichuan"], ["成都", "Chengdu"], ["资阳", "Ziyang"], ["乐山", "Leshan"], ["自贡", "Zigong"], ["内江", "Neijiang"], ["眉山", "Meishan"], ["雅安", "Yaan"], ["绵阳", "Mianyang"], ["德阳", "Deyang"], ["遂宁", "Suining"], ["宜宾", "Yibin"], ["南充", "Nanchong"], ["广安", "Guangan"], ["广元", "Guangyuan"], ["巴中", "Bazhong"], ["达州", "Dazhou"], ["攀枝花", "Panzhihua"], ["泸州", "Luzhou"], ["凉山", "Liangshan"], ["阿坝", "Aba"], ["甘孜", "Ganzi"]], 
	"7": [["陕西", "Shaanxi"], ["西安", "Xian"], ["咸阳", "Xianyang"], ["铜川", "Tongchuan"], ["渭南", "Weinan"], ["延安", "Yanan"], ["宝鸡", "Baoji"], ["商洛", "Shangluo"], ["榆林", "Yulin"], ["汉中", "Hanzhong"], ["安康", "Ankang"]], 
	"8": [["山西", "Shanxi"], ["太原", "Taiyuan"], ["晋中", "Jinzhong"], ["临汾", "Linfen"], ["吕梁", "Lvliang"], ["大同", "Datong"], ["阳泉", "Yangquan"], ["朔州", "Shuozhou"], ["忻州", "Xinzhou"], ["长治", "Changzhi"], ["晋城", "Jincheng"], ["运城", "Yuncheng"]], 
	"9": [["山东", "Shandong"], ["济南", "Jinan"], ["青岛", "Qingdao"], ["菏泽", "Heze"], ["济宁", "Jining"], ["莱芜", "Laiwu"], ["枣庄", "Zaozhuang"], ["临沂", "Linyi"], ["日照", "Rizhao"], ["淄博", "Zibo"], ["滨州", "Binzhou"], ["东营", "Dongying"], ["聊城", "Liaocheng"], ["德州", "Dezhou"], ["潍坊", "Weifang"], ["烟台", "Yantai"], ["威海", "Weihai"], ["泰安", "Taian"]], 
	"10": [["青海", "Qinghai"], ["西宁", "Xining"], ["海东", "Haidong"], ["海西", "Haixi"], ["海南", "Hainan"], ["海北", "Haibei"], ["玉树", "Yushu"], ["黄南", "Huangnan"], ["果洛", "Guoluo"]], 
	"11": [["宁夏", "Ningxia"], ["银川", "Yinchuan"], ["中卫", "Zhongwei"], ["吴忠", "Wuzhong"], ["固原", "Guyuan"], ["石嘴山", "Shizuishan"]], 
	"12": [["内蒙古", "Neimenggu"], ["呼和浩特", "Huhehaote"], ["乌兰察布", "Wulanchabu"], ["包头", "Baotou"], ["阿拉善", "Alashan"], ["鄂尔多斯", "Eerduosi"], ["乌海", "Wuhai"], ["锡林郭勒", "Xilinguole"], ["呼伦贝尔", "Hulunbeier"], ["赤峰", "Chifeng"], ["通辽", "Tongliao"], ["兴安", "Xingan"]], 
	"13": [["辽宁", "Liaoning"], ["沈阳", "Shenyang"], ["大连", "Dalian"], ["锦州", "Jinzhou"], ["辽阳", "Liaoyang"], ["本溪", "Benxi"], ["鞍山", "Anshan"], ["丹东", "Dandong"], ["营口", "Yingkou"], ["盘锦", "Panjin"], ["阜新", "Fuxin"], ["铁岭", "Tieling"], ["抚顺", "Fushun"], ["朝阳", "Zhaoyang"], ["葫芦岛", "Huludao"]], 
	"14": [["江西", "Jiangxi"], ["南昌", "Nanchang"], ["九江", "Jiujiang"], ["赣州", "Ganzhou"], ["吉安", "Jian"], ["抚州", "Fuzhou"], ["宜春", "Yichun"], ["新余", "Xinyu"], ["萍乡", "Pingxiang"], ["上饶", "Shangrao"], ["鹰潭", "Yingtan"], ["景德镇", "Jingdezhen"]], 
	"15": [["吉林", "Jilin"], ["长春", "Changchun"], ["吉林", "Jilin"], ["白山", "Baishan"], ["四平", "Siping"], ["松原", "Songyuan"], ["白城", "Baicheng"], ["通化", "Tonghua"], ["辽源", "Liaoyuan"], ["延边", "Yanbian"]], 
	"16": [["湖南", "Hunan"], ["长沙", "Changsha"], ["岳阳", "Yueyang"], ["衡阳", "Hengyang"], ["湘潭", "Xiangtan"], ["永州", "Yongzhou"], ["株洲", "Zhuzhou"], ["郴州", "Chenzhou"], ["邵阳", "Shaoyang"], ["怀化", "Huaihua"], ["娄底", "Loudi"], ["益阳", "Yiyang"], ["常德", "Changde"], ["张家界", "Zhangjiajie"], ["湘西", "Xiangxi"]], 
	"17": [["湖北", "Hubei"], ["武汉", "Wuhan"], ["襄阳", "Xiangyang"], ["荆门", "Jingmen"], ["荆州", "Jingzhou"], ["孝感", "Xiaogan"], ["黄冈", "Huanggang"], ["黄石", "Huangshi"], ["宜昌", "Yichang"], ["十堰", "Shiyan"], ["随州", "Suizhou"], ["鄂州", "Ezhou"], ["恩施", "Enshi"], ["省直辖", "Shengzhixia"]], 
	"18": [["黑龙江", "Heilongjiang"], ["哈尔滨", "Haerbin"], ["齐齐哈尔", "Qiqihaer"], ["大庆", "Daqing"], ["绥化", "Suihua"], ["黑河", "Heihe"], ["伊春", "Yichun"], ["鹤岗", "Hegang"], ["七台河", "Qitaihe"], ["牡丹江", "Mudanjiang"], ["鸡西", "Jixi"], ["双鸭山", "Shuangyashan"], ["佳木斯", "Jiamusi"], ["大兴安岭", "Daxinganling"]], 
	"19": [["河南", "Henan"], ["郑州", "Zhengzhou"], ["许昌", "Xuchang"], ["平顶山", "Pingdingshan"], ["开封", "Kaifeng"], ["商丘", "Shangqiu"], ["新乡", "Xinxiang"], ["焦作", "Jiaozuo"], ["洛阳", "Luoyang"], ["南阳", "Nanyang"], ["驻马店", "Zhumadian"], ["三门峡", "Sanmenxia"], ["漯河", "Tahe"], ["周口", "Zhoukou"], ["鹤壁", "Hebi"], ["安阳", "Anyang"], ["濮阳", "Puyang"], ["信阳", "Xinyang"]], 
	"20": [["北京", "Beijing"], ["北京", "Beijing"]], 
	"21": [["天津", "Tianjin"], ["天津", "Tianjin"]], 
	"22": [["海南", "Hainan"], ["海口", "Haikou"], ["三亚", "Sanya"]], 
	"23": [["贵州", "Guizhou"], ["贵阳", "Guiyang"], ["遵义", "Zunyi"], ["铜仁", "Tongren"], ["六盘水", "Liupanshui"], ["毕节", "Bijie"], ["安顺", "Anshun"], ["黔东南", "Qiandongnan"], ["黔南", "Qiannan"], ["黔西南", "Qianxinan"]], 
	"24": [["广西", "Guangxi"], ["南宁", "Nanning"], ["桂林", "Guilin"], ["柳州", "Liuzhou"], ["来宾", "Laibin"], ["河池", "Hechi"], ["白色", "Baise"], ["贺州", "Hezhou"], ["梧州", "Wuzhou"], ["钦州", "Qinzhou"], ["贵港", "Guigang"], ["防城港", "Fangchenggang"], ["北海", "Beihai"], ["玉林", "Yulin"], ["崇左", "Chongzuo"]], 
	"25": [["甘肃", "Gansu"], ["兰州", "Lanzhou"], ["白银", "Baiyin"], ["定西", "Dingxi"], ["天水", "Tianshui"], ["庆阳", "Qingyang"], ["平凉", "Pingliang"], ["陇南", "Longnan"], ["武威", "Wuwei"], ["金昌", "Jinchang"], ["张掖", "Zhangye"], ["酒泉", "Jiuquan"], ["嘉峪关", "Jiayuguan"], ["临夏", "Linxia"], ["甘南", "Gannan"]], 
	"26": [["福建", "Fujian"], ["福州", "Fuzhou"], ["厦门", "Shamen"], ["泉州", "Quanzhou"], ["龙岩", "Longyan"], ["莆田", "Futian"], ["三明", "Sanming"], ["宁德", "Ningde"], ["南平", "Nanping"], ["漳州", "Zhangzhou"]], 
	"27": [["澳门", "Aomen"], ["澳门", "Aomen"]], 
	"28": [["安徽", "Anhui"], ["合肥", "Hefei"], ["淮北", "Huaibei"], ["宿州", "Suzhou"], ["蚌埠", "Bangbu"], ["六安", "Liuan"], ["阜阳", "Fuyang"], ["亳州", "Bozhou"], ["芜湖", "Wuhu"], ["安庆", "Anqing"], ["宣城", "Xuancheng"], ["马鞍山", "Maanshan"], ["淮南", "Huainan"], ["铜陵", "Tongling"], ["池州", "Chizhou"], ["滁州", "Chuzhou"], ["黄山", "Huangshan"]], 
	"29": [["上海", "Shanghai"], ["上海", "Shanghai"]], 
	"30": [["重庆", "Zhongqing"], ["重庆", "Zhongqing"]], 
	"31": [["江苏", "Jiangsu"], ["南京", "Nanjing"], ["苏州", "Suzhou"], ["扬州", "Yangzhou"], ["无锡", "Wuxi"], ["镇江", "Zhenjiang"], ["常州", "Changzhou"], ["南通", "Nantong"], ["泰州", "Taizhou"], ["盐城", "Yancheng"], ["淮安", "Huaian"], ["宿迁", "Suqian"], ["徐州", "Xuzhou"], ["连云港", "Lianyungang"]], 
	"32": [["广东", "Guangdong"], ["广州", "Guangzhou"], ["深圳", "Shenzhen"], ["珠海", "Zhuhai"], ["中山", "Zhongshan"], ["佛山", "Foshan"], ["东莞", "Dongguan"], ["惠州", "Huizhou"], ["肇庆", "Zhaoqing"], ["云浮", "Yunfu"], ["茂名", "Maoming"], ["湛江", "Zhanjiang"], ["阳江", "Yangjiang"], ["江门", "Jiangmen"], ["清远", "Qingyuan"], ["韶关", "Shaoguan"], ["河源", "Heyuan"], ["梅州", "Meizhou"], ["汕尾", "Shanwei"], ["汕头", "Shantou"], ["揭阳", "Jieyang"], ["潮州", "Chaozhou"]], 
	"33": [["河北", "Hebei"], ["石家庄", "Shijiazhuang"], ["保定", "Baoding"], ["承德", "Chengde"], ["唐山", "Tangshan"], ["廊坊", "Langfang"], ["衡水", "Hengshui"], ["邢台", "Xingtai"], ["沧州", "Cangzhou"], ["邯郸", "Handan"], ["秦皇岛", "Qinhuangdao"], ["张家口", "Zhangjiakou"]]}