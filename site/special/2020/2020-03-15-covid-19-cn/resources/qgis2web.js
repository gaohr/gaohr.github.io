
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
        expandedAttribution,new ol.control.ScaleLine({}),new ol.control.LayerSwitcher({tipLabel: "Layers"})
    ]),
    target: document.getElementById('map'),
    renderer: 'canvas',
    overlays: [overlayPopup],
    layers: layersList,
    view: new ol.View({
         maxZoom: 6, minZoom: 3.5
    })
});
map.getView().fit([8134005.831783, 1388247.558567, 15297617.399576, 7431145.191968], map.getSize());

if ($("#map").size() != 0) {
	$("#loading-map").hide();
}

var NO_POPUP = 0
var ALL_FIELDS = 1

popupLayers = [1];

var collection = new ol.Collection();
var featureOverlay = new ol.layer.Vector({
    map: map,
    source: new ol.source.Vector({
        features: collection,
        useSpatialIndex: false // optional, might improve performance
    }),
    style: [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#f00',
            width: 1
        }),
        fill: new ol.style.Fill({
            color: 'rgba(255,0,0,0.1)'
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
    var popupField = '';
    var popupText = '';
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
            popupText = '';
            for (var i=0; i<currentFeatureKeys.length; i++) {
                if (currentFeatureKeys[i] != 'geometry') {
					if (currentFeatureKeys[i] == "1") {
						popupField += '<span>' + currentFeature.get(currentFeatureKeys[i]) + '</span>'
					} else if (currentFeatureKeys[i] == "SHI") {
						if(code_keys.indexOf(String(parseInt(currentFeature.get(currentFeatureKeys[i])))) > -1) {
							popupField += '&nbsp;&nbsp;<span>' + ncov_data[String(parseInt(currentFeature.get(currentFeatureKeys[i])))]["cityConfirmed"][sliderVal] + '</span><br>'
						} else {
							popupField += '&nbsp;&nbsp;<span>0</span><br>'
						}
					}
					popupText = popupField;
                }
            }
        } else {
            var value = feature.get(field);
            if (value) {
                popupText = '<strong>' + field + ':</strong> ' + value;
            }  
        }
                  
    });

    if (doHighlight) {
        if (currentFeature !== highlight) {
            if (highlight) {
                featureOverlay.getSource().removeFeature(highlight);
            }
            if (currentFeature) {
                var styleDefinition = currentLayer.getStyle().toString();

                if (currentFeature.getGeometry().getType() == 'Point') {
                    var radius = styleDefinition.split('radius')[1].split(' ')[1];

                    highlightStyle = new ol.style.Style({
                        image: new ol.style.Circle({
                            fill: new ol.style.Fill({
                                color: "#ffff00"
                            }),
                            radius: radius
                        })
                    })
                } else if (currentFeature.getGeometry().getType() == 'LineString') {

                    var featureWidth = styleDefinition.split('width')[1].split(' ')[1].replace('})','');

                    highlightStyle = new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: '#ffff00',
                            lineDash: null,
                            width: featureWidth
                        })
                    });

                } else {
                    highlightStyle = new ol.style.Style({
                        fill: new ol.style.Fill({
                            color: 'rgba(0, 0, 0, 0.25)'
                        })
                    })
                }
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
    //if (doHover) {
    //    return;
    //}
    var pixel = map.getEventPixel(evt.originalEvent);
    var coord = evt.coordinate;
    var popupField;
    var popupText = '';
    var currentFeature;
    var currentFeatureKeys;
    map.forEachFeatureAtPixel(pixel, function(feature, layer) {
        currentFeature = feature;
        currentFeatureKeys = currentFeature.getKeys();
        var field = popupLayers[layersList.indexOf(layer) - 1];
        if (field == NO_POPUP) {          
        } else if (field == ALL_FIELDS) {
			$('#intro-text').hide();
			$('#ncov-trend').show();
			chart_option.title[0].text = currentFeature.get("1") + "疫情趋势";
			chart_option.series[0].data = ncov_data[String(parseInt(currentFeature.get("SHI")))]["cityConfirmed"];
			chart_option.series[1].data = ncov_data[String(parseInt(currentFeature.get("SHI")))]["cityCured"];
			chart_option.series[2].data = ncov_data[String(parseInt(currentFeature.get("SHI")))]["cityDead"];
			ncov_trend_chart.setOption(chart_option);
			
        } else {
        }  
    });

    if (popupText) {
        overlayPopup.setPosition(coord);
        content.innerHTML = popupText;
        container.style.display = 'block';        
    } else {
        container.style.display = 'none';
        closer.blur();
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
qgis2webAttribution.innerHTML = '<a href="http://gaohr.win">GaoHR</a>';
attributionList.insertBefore(qgis2webAttribution, firstLayerAttribution);


// 日期选择
function addDate(date, days){
	var d = new Date(date); 
	d.setDate(d.getDate() + days);
	var mon = d.getMonth() + 1;
	var day = d.getDate();
	var dd = "";
	var mm = "";
	if(day < 10){
		dd = "0" + day;
	} else {
		dd = "" + day;
	}
	if(mon < 10){
		mm = "0" + mon;
	} else {
		mm = "" + mon;
	}
	return d.getFullYear() + '-' + mm + '-' + dd;
}

var timer;
var initDate = "2020-01-25";
var curDate = initDate;
var sliderVal = 0;
var s_min = 0;
var s_max = ncov_data["110108"]['cityDead'].length - 1;

//创建日期字符数组
var dateArr = new Array();
for(var i = s_min; i < s_max; i++){
	dateArr.push(addDate(initDate, i))
}

var dateShow = $("#date-selected");
$("#date-slider").slider({
	range: "min",
	min: s_min,
	max: s_max,
	create: function(){
		dateShow.text(initDate, 0);
	},
	slide: function(event, ui){
		curDate = addDate(initDate, ui.value);
		dateShow.text(curDate);
		sliderVal = ui.value;
		updateStyle(sliderVal);
	}
});

$("#date-plus").click(function(){
	sliderVal += 1;
	$("#date-slider").slider("value", sliderVal);
	curDate = addDate(initDate, sliderVal);
	dateShow.text(curDate);
	updateStyle(sliderVal);
});

$("#date-minus").click(function(){
	sliderVal -= 1;
	$("#date-slider").slider("value", sliderVal);
	curDate = addDate(initDate, sliderVal);
	dateShow.text(curDate);
	updateStyle(sliderVal);
});

function Playing(){
	if(sliderVal < s_max) {
		updateStyle(sliderVal);
		sliderVal += 1;
		$("#date-slider").slider("value", sliderVal);
		curDate = addDate(initDate, sliderVal);
		dateShow.text(curDate);
	} else {
		// 暂停播放
		clearInterval(timer);
		sliderVal = 0;
		$("#date-slider").slider("value", sliderVal);
		ifplay = true;
		$("#date-play").css("color","#fff");
		$("#date-play").html("<i class='ion ion-play'></i>");
	}
}

var ifplay = true;
var intv_ms = 1000;
timer = setInterval("Playing()", intv_ms);
ifplay = false;
$("#date-play").css("color","#fa7");
$("#date-play").html("<i class='ion ion-pause'></i>");


$("#date-play").click(function(){
	if(ifplay){
		// 开始播放
		timer = setInterval("Playing()", intv_ms);
		ifplay = false;
		$("#date-play").css("color","#fa7");
		$("#date-play").html("<i class='ion ion-pause'></i>");
	} else {
		// 暂停播放
		clearInterval(timer);
		ifplay = true;
		$("#date-play").css("color","#fff");
		$("#date-play").html("<i class='ion ion-play'></i>");
	}
})

// Echart
var ncov_trend_chart = echarts.init(document.getElementById('ncov-trend'));
var colorList=['#f65', '#6f6', '#999'];
ncov_trend_chart.showLoading();
ncov_trend_chart.hideLoading();
var chart_option = {
    backgroundColor: "#333",
    color: ['#f65', '#6f6', '#999'],
    title: [{text: '疫情趋势',left: '1%',top: '1%',textStyle: {fontSize:16,fontWeight:'normal',color: '#fff'}}],
    tooltip: {trigger: 'axis'},
    legend: {left: "center",top: '15%',textStyle: {color: '#eee',},data: ['累计确诊', '累计治愈', '累计死亡']},
    grid: {left: '1%',right: '1%',top: '30%',bottom: '5%',containLabel: true},
    toolbox: {'color': '#aaa', "show": true,feature: {saveAsImage: {},magicType: {type: ['line', 'bar']},restore: {},dataView: {}}},
    xAxis: {
        type: 'category',
        "axisLine": {lineStyle: {color: '#fff'}},
        axisLabel: {textStyle: {color: '#fff'}},
        boundaryGap: false,
        data: dateArr
    },
    yAxis: {
        "axisLine": {lineStyle: {color: '#fff'}},
        splitLine: {show: true,lineStyle: {color: '#aaa'}},
        axisLabel: {textStyle: {color: '#fff'}},type: 'value'},
    series: [{
        name: '累计确诊',
        smooth: true,
        type: 'line',
        symbolSize: 5,
      	symbol: 'circle',
        data: []
    }, {
        name: '累计治愈',
        smooth: true,
        type: 'line',
        symbolSize: 5,
      	symbol: 'circle',
        data: []
    }, {
        name: '累计死亡',
        smooth: true,
        type: 'line',
        symbolSize: 5,
      	symbol: 'circle',
        data: []
    }]
}
