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

// 获取最新的n条记录的经纬度
var coordinates = [];
var levels = [];
var npoint = 50;
for(var k = 0; k < npoint; k++) {
	coord = geojson_earthquackcnquick["features"][k]["geometry"]["coordinates"];
	lv = geojson_earthquackcnquick["features"][k]["properties"]["LEVEL_M_"]
	coordinates.push(coord);
	levels.push(lv.toString()[0]);
}
var newstyle = new ol.style.Style({
	image: new ol.style.Circle({
		radius: 3,
		stroke: new ol.style.Stroke({color: "rgba(255,0,0,0.5)", width: 2}), 
		fill: new ol.style.Fill({color: "rgba(255,255,0,1)"}),
	})
});
var geoPoints = new ol.geom.MultiPoint(coordinates);
geoPoints.applyTransform(ol.proj.getTransform('EPSG:4326', 'EPSG:3857'));

var newFeature = new ol.Feature({
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
		point_div.className = "css_animation_" + levels[i];
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


// Echart
var eqk_chart = echarts.init(document.getElementById('eqk-statis'));
var colorList=['#fee', '#fca', '#fa8', '#f85', '#f63', '#f21'];
eqk_chart.showLoading();
eqk_chart.hideLoading();
featuresArr = geojson_earthquackcnquick["features"];
var p_num = featuresArr.length;
var a1 = 5514,a2 = 1611, a3 = 858, a4 = 1178, a5 = 185, a6 = 14;
//var a1 = 0,a2 = 0, a3 = 0, a4 = 0, a5 = 0, a6 = 0;
//for(i = 0; i < p_num; i++) {if(featuresArr[i].properties.LEVEL_M_ >=3 && featuresArr[i].properties.LEVEL_M_ < 4) {a1 += 1;} else if(featuresArr[i].properties.LEVEL_M_ >= 4 && featuresArr[i].properties.LEVEL_M_ < 5) {a2 += 1;} else if(featuresArr[i].properties.LEVEL_M_ >= 5 && featuresArr[i].properties.LEVEL_M_ < 6) {a3 += 1;} else if(featuresArr[i].properties.LEVEL_M_ >= 6 && featuresArr[i].properties.LEVEL_M_ < 7) {a4 += 1;} else if(featuresArr[i].properties.LEVEL_M_ >= 7 && featuresArr[i].properties.LEVEL_M_ < 8) {a5 += 1;} else {a6 += 1;}};
// 定义图表属性
eqk_chart.setOption(option = {
	backgroundColor:"#333",
	title: {text: '震级占比统计',textStyle: {fontSize:16,fontWeight:'normal',color: ['#fff']}},
	toolbox:{right:0,feature:{saveAsImage: {},restore: {},dataView: {},dataZoom: {}}},
	//grid: {bottom: 150,left: 0,right: '2%'},
	tooltip: {trigger: 'item',formatter: "{b} : {c} ({d}%)"},
	legend: {type: "scroll",orient: "horizontal",left: "center",bottom:0,itemWidth: 12,itemHeight: 12,itemGap: 4,textStyle: {color: '#fff',fontSize: 12,fontWeight: 0},data: ['3级', '4级', '5级', '6级', '7级', '8级']},
	series: [
		{radius: ['20%', '55%'],
		center: ['50%', '50%'],
		type: 'pie',itemStyle: {normal: {color: function(params) {return colorList[params.dataIndex]}}},labelLine: {normal: {show:true,length:10,length2:5,lineStyle:{color:'#d3d3d3'},align:'right'},color: "#000",emphasis: {show: true}},label: {normal: {show:true,formatter:"{d}%",textStyle:{fontSize:12}}},data: [{name:'3级', value:a1},{name:'4级', value:a2},{name:'5级', value:a3},{name:'6级', value:a4},{name:'7级', value:a5},{name:'8级', value:a6}],},
		{radius: ['40%', '41%'],
		center: ['50%', '50%'],
		type: 'pie',label: {normal: {show: false},emphasis: {show: false}},labelLine: {normal: {show: false},emphasis: {show: false}},animation: false,tooltip: {show: false},itemStyle: {normal: {color:'rgba(255,255,255,0.25)'}},data: [{value: 1,}],},
		{radius: ['58%', '59%'],
		center: ['50%', '50%'],
		type: 'pie',label: {normal: {show: false},emphasis: {show: false}},labelLine: {normal: {show: false},emphasis: {show: false}},animation: false,tooltip: {show: false},itemStyle: {normal: {color:'rgba(255,0,255,0.75)'}},data: [{value: 1,}],}
	]
});

var eqk_chart_year = echarts.init(document.getElementById('eqk-statis-year'));
eqk_chart_year.showLoading();
eqk_chart_year.hideLoading();
eqk_chart_year.setOption(option = {
    backgroundColor: "#333333",
    title: {text: '各年地震发生次数',textStyle: {fontSize:16,fontWeight:'normal',color: ['#fff']}},
    tooltip: {trigger: 'axis',backgroundColor: 'rgba(0,0,0,0.9)',formatter: function(prams) {return "发生次数：" + prams[0].data}},
    toolbox:{right:0,feature:{saveAsImage: {},restore: {},dataView: {},dataZoom: {}}},
    grid: {left: '16%',top: '10%',bottom: '16%',right: '5%'},
    xAxis: {
        data: ['2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'],
       axisTick: {show: false},
		axisLine: {lineStyle: {color: 'rgba(255, 129, 109, 0.2)',width: 1}},
		axisLabel: {textStyle: {color: '#999',fontSize: 12}}
    },
    yAxis: [{
			splitNumber: 2,
			axisTick: {show: false},
			axisLine: {lineStyle: {color: 'rgba(255, 129, 109, 0.7)',width: 1 }},
			axisLabel: {textStyle: {color: '#999'}},
			splitArea: {areaStyle: {color: 'rgba(255,255,255,.75)'}},
			splitLine: {show: true,lineStyle: {color: 'rgba(255, 129, 109, 0.1)',width: 0.5,type: 'dashed'}}
		}
	],
    series: [{
        name: 'hill',
        type: 'pictorialBar',
        barCategoryGap: '0%',
        symbol: 'path://M0,10 L10,10 C5.5,10 9,8.5 3,0 C4.5,5 4.5,10 0,10 z',
        label: {show: true,position: 'top',distance: 15,color: '#DB5E6A',fontWeight: 'bolder',fontSize: 12,},
        itemStyle: {
            normal: {color: {type: 'linear',x: 0,y: 0,x2: 0,y2: 1,colorStops: [{offset: 0,color: 'rgba(255, 105, 75, 1)'},{offset: 1,color: 'rgba(255, 75, 105, .2)'}],global: false}},
			emphasis: {opacity: 1}
        },
        data: [844, 699, 664, 697, 1005, 896, 885, 867, 726, 800, 1039],
        z: 10
    }]
});


////////////////////////////////////////////////////////////////////////
var attribution = document.getElementsByClassName('ol-attribution')[0];
var attributionList = attribution.getElementsByTagName('ul')[0];
var firstLayerAttribution = attributionList.getElementsByTagName('li')[0];
var qgis2webAttribution = document.createElement('li');
qgis2webAttribution.innerHTML = '<a href="http://gaohr.win">GaoHR</a>';
attributionList.insertBefore(qgis2webAttribution, firstLayerAttribution);
