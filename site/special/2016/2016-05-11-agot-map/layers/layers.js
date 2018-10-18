//update 
var format_ocean = new ol.format.GeoJSON();
var features_ocean = format_ocean.readFeatures(geojson_ocean, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:4326'});
var jsonSource_ocean = new ol.source.Vector();
jsonSource_ocean.addFeatures(features_ocean);var lyr_ocean = new ol.layer.Vector({
                source:jsonSource_ocean, 
                style: style_ocean,
                title: "海洋"
            });

var format_Sothoryos = new ol.format.GeoJSON();
var features_Sothoryos = format_Sothoryos.readFeatures(geojson_Sothoryos, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:4326'});
var jsonSource_Sothoryos = new ol.source.Vector();
jsonSource_Sothoryos.addFeatures(features_Sothoryos);var lyr_Sothoryos = new ol.layer.Vector({
                source:jsonSource_Sothoryos, 
                style: style_Sothoryos,
                title: "索斯罗斯"
            });
			
var format_Essos = new ol.format.GeoJSON();
var features_Essos = format_Essos.readFeatures(geojson_Essos, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:4326'});
var jsonSource_Essos = new ol.source.Vector();
jsonSource_Essos.addFeatures(features_Essos);var lyr_Essos = new ol.layer.Vector({
                source:jsonSource_Essos, 
                style: style_Essos,
                title: "厄索斯"
            });
			
var format_Westeros = new ol.format.GeoJSON();
var features_Westeros = format_Westeros.readFeatures(geojson_Westeros, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:4326'});
var jsonSource_Westeros = new ol.source.Vector();
jsonSource_Westeros.addFeatures(features_Westeros);var lyr_Westeros = new ol.layer.Vector({
                source:jsonSource_Westeros, 
                style: style_Westeros,
                title: "维斯特洛"
            });
			
var format_texturem = new ol.format.GeoJSON();
var features_texturem = format_texturem.readFeatures(geojson_texturem, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:4326'});
var jsonSource_texturem = new ol.source.Vector();
jsonSource_texturem.addFeatures(features_texturem);var lyr_texturem = new ol.layer.Vector({
                source:jsonSource_texturem, 
                style: style_texturem,
                title: "纹理-山脉"
            });
			
var format_texturet = new ol.format.GeoJSON();
var features_texturet = format_texturet.readFeatures(geojson_texturet, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:4326'});
var jsonSource_texturet = new ol.source.Vector();
jsonSource_texturet.addFeatures(features_texturet);var lyr_texturet = new ol.layer.Vector({
                source:jsonSource_texturet, 
                style: style_texturet,
                title: "纹理-森林"
            });
			
var format_TheWall = new ol.format.GeoJSON();
var features_TheWall = format_TheWall.readFeatures(geojson_Thewall, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:4326'});
var jsonSource_TheWall = new ol.source.Vector();
jsonSource_TheWall.addFeatures(features_TheWall);var lyr_TheWall = new ol.layer.Vector({
                source:jsonSource_TheWall, 
                style: style_TheWall,
                title: "绝境长城"
            });
			
var format_zone = new ol.format.GeoJSON();
var features_zone = format_zone.readFeatures(geojson_zone, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:4326'});
var jsonSource_zone = new ol.source.Vector();
jsonSource_zone.addFeatures(features_zone);var lyr_zone = new ol.layer.Vector({
                source:jsonSource_zone, 
                style: style_zone,
                title: "区域"
            });
			
var format_mountain = new ol.format.GeoJSON();
var features_mountain = format_mountain.readFeatures(geojson_mountain, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:4326'});
var jsonSource_mountain = new ol.source.Vector();
jsonSource_mountain.addFeatures(features_mountain);var lyr_mountain = new ol.layer.Vector({
                source:jsonSource_mountain, 
                style: style_mountain,
                title: "山脉"
            });
			
var format_forest = new ol.format.GeoJSON();
var features_forest = format_forest.readFeatures(geojson_forest, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:4326'});
var jsonSource_forest = new ol.source.Vector();
jsonSource_forest.addFeatures(features_forest);var lyr_forest = new ol.layer.Vector({
                source:jsonSource_forest, 
                style: style_forest,
                title: "森林"
            });
			
var format_place = new ol.format.GeoJSON();
var features_place = format_place.readFeatures(geojson_place, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:4326'});
var jsonSource_place = new ol.source.Vector();
jsonSource_place.addFeatures(features_place);var lyr_place = new ol.layer.Vector({
                source:jsonSource_place, 
                style: style_place,
                title: "地名"
            });
			
var format_relic = new ol.format.GeoJSON();
var features_relic = format_relic.readFeatures(geojson_relic, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:4326'});
var jsonSource_relic = new ol.source.Vector();
jsonSource_relic.addFeatures(features_relic);var lyr_relic = new ol.layer.Vector({
                source:jsonSource_relic, 
                style: style_relic,
                title: "遗迹"
            });
			
var format_river = new ol.format.GeoJSON();
var features_river = format_river.readFeatures(geojson_river, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:4326'});
var jsonSource_river = new ol.source.Vector();
jsonSource_river.addFeatures(features_river);var lyr_river = new ol.layer.Vector({
                source:jsonSource_river, 
                style: style_river,
                title: "河流"
            });
			
var format_road = new ol.format.GeoJSON();
var features_road = format_road.readFeatures(geojson_road, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:4326'});
var jsonSource_road = new ol.source.Vector();
jsonSource_road.addFeatures(features_road);var lyr_road = new ol.layer.Vector({
                source:jsonSource_road, 
                style: style_road,
                title: "道路"
            });
			
var format_castles = new ol.format.GeoJSON();
var features_castles = format_castles.readFeatures(geojson_castles, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:4326'});
var jsonSource_castles = new ol.source.Vector();
jsonSource_castles.addFeatures(features_castles);var lyr_castles = new ol.layer.Vector({
                source:jsonSource_castles, 
                style: style_castles,
                title: "城堡"
            });
			
var format_cities = new ol.format.GeoJSON();
var features_cities = format_cities.readFeatures(geojson_cities, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:4326'});
var jsonSource_cities = new ol.source.Vector();
jsonSource_cities.addFeatures(features_cities);var lyr_cities = new ol.layer.Vector({
                source:jsonSource_cities, 
                style: style_cities,
                title: "城市"
            });
			
var format_gulf = new ol.format.GeoJSON();
var features_gulf = format_gulf.readFeatures(geojson_gulf, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:4326'});
var jsonSource_gulf = new ol.source.Vector();
jsonSource_gulf.addFeatures(features_gulf);var lyr_gulf = new ol.layer.Vector({
                source:jsonSource_gulf, 
                style: style_gulf,
                title: "海湾"
            });
			
var format_island = new ol.format.GeoJSON();
var features_island = format_island.readFeatures(geojson_island, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:4326'});
var jsonSource_island = new ol.source.Vector();
jsonSource_island.addFeatures(features_island);var lyr_island = new ol.layer.Vector({
                source:jsonSource_island, 
                style: style_island,
                title: "岛屿"
            });
			
var format_sea = new ol.format.GeoJSON();
var features_sea = format_sea.readFeatures(geojson_sea, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:4326'});
var jsonSource_sea = new ol.source.Vector();
jsonSource_sea.addFeatures(features_sea);var lyr_sea = new ol.layer.Vector({
                source:jsonSource_sea, 
                style: style_sea,
                title: "海洋"
            });
			
var format_zonepoint = new ol.format.GeoJSON();
var features_zonepoint = format_zonepoint.readFeatures(geojson_zonepoint, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:4326'});
var jsonSource_zonepoint = new ol.source.Vector();
jsonSource_zonepoint.addFeatures(features_zonepoint);var lyr_zonepoint = new ol.layer.Vector({
                source:jsonSource_zonepoint, 
                style: style_zonepoint,
                title: "地区"
            });
			
var format_battle = new ol.format.GeoJSON();
var features_battle = format_battle.readFeatures(geojson_battle, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:4326'});
var jsonSource_battle = new ol.source.Vector();
jsonSource_battle.addFeatures(features_battle);var lyr_battle = new ol.layer.Vector({
                source:jsonSource_battle, 
                style: style_battle,
                title: "战斗"
            });
			
var format_event = new ol.format.GeoJSON();
var features_event = format_event.readFeatures(geojson_event, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:4326'});
var jsonSource_event = new ol.source.Vector();
jsonSource_event.addFeatures(features_event);var lyr_event = new ol.layer.Vector({
                source:jsonSource_event, 
                style: style_event,
                title: "事件"
            });
			
var format_wuwang = new ol.format.GeoJSON();
var features_wuwang = format_wuwang.readFeatures(geojson_wuwang, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:4326'});
var jsonSource_wuwang = new ol.source.Vector();
jsonSource_wuwang.addFeatures(features_wuwang);var lyr_wuwang = new ol.layer.Vector({
                source:jsonSource_wuwang, 
                style: style_wuwang,
                title: "五王之战"
            });

if($("#wuwang").prop("checked") == true) {lyr_wuwang.setVisible(true);}
if($("#event").prop("checked") == true) {lyr_event.setVisible(true);}
if($("#battle").prop("checked") == true) {lyr_battle.setVisible(true);}
if($("#ocean").prop("checked") == true) {lyr_sea.setVisible(true);lyr_ocean.setVisible(true);}
if($("#island").prop("checked") == true) {lyr_island.setVisible(true);}
if($("#gulf").prop("checked") == true) {lyr_gulf.setVisible(true);}
if($("#cities").prop("checked") == true) {lyr_cities.setVisible(true);}
if($("#castles").prop("checked") == true) {lyr_castles.setVisible(true);}
if($("#road").prop("checked") == true) {lyr_road.setVisible(true);}
if($("#river").prop("checked") == true) {lyr_river.setVisible(true);}
if($("#place").prop("checked") == true) {lyr_place.setVisible(true);}
if($("#relic").prop("checked") == true) {lyr_relic.setVisible(true);}
if($("#zone").prop("checked") == true) {lyr_zone.setVisible(true);lyr_zonepoint.setVisible(true);}
if($("#TheWall").prop("checked") == true) {lyr_TheWall.setVisible(true);}
if($("#forest").prop("checked") == true) {lyr_forest.setVisible(true);lyr_texturet.setVisible(true);}
if($("#mountain").prop("checked") == true) {lyr_mountain.setVisible(true);lyr_texturem.setVisible(true);}
if($("#Westeros").prop("checked") == true) {lyr_Westeros.setVisible(true);}
if($("#Essos").prop("checked") == true) {lyr_Essos.setVisible(true);}
if($("#Sothoryos").prop("checked") == true) {lyr_Sothoryos.setVisible(true);}

$("#wuwang").change(function(){if($("#wuwang").prop("checked") == true) {lyr_wuwang.setVisible(true);} else {lyr_wuwang.setVisible(false);}});
$("#event").change(function(){if($("#event").prop("checked") == true) {lyr_event.setVisible(true);} else {lyr_event.setVisible(false);}});
$("#battle").change(function(){if($("#battle").prop("checked") == true) {lyr_battle.setVisible(true);} else {lyr_battle.setVisible(false);}});
$("#ocean").change(function(){if($("#ocean").prop("checked") == true) {lyr_sea.setVisible(true);lyr_ocean.setVisible(true);} else {lyr_sea.setVisible(false);lyr_ocean.setVisible(false);}});
$("#island").change(function(){if($("#island").prop("checked") == true) {lyr_island.setVisible(true);} else {lyr_island.setVisible(false);}});
$("#gulf").change(function(){if($("#gulf").prop("checked") == true) {lyr_gulf.setVisible(true);} else {lyr_gulf.setVisible(false);}});
$("#cities").change(function(){if($("#cities").prop("checked") == true) {lyr_cities.setVisible(true);} else {lyr_cities.setVisible(false);}});
$("#castles").change(function(){if($("#castles").prop("checked") == true) {lyr_castles.setVisible(true);} else {lyr_castles.setVisible(false);}});
$("#road").change(function(){if($("#road").prop("checked") == true) {lyr_road.setVisible(true);} else {lyr_road.setVisible(false);}});
$("#river").change(function(){if($("#river").prop("checked") == true) {lyr_river.setVisible(true);} else {lyr_river.setVisible(false);}});
$("#place").change(function(){if($("#place").prop("checked") == true) {lyr_place.setVisible(true);} else {lyr_place.setVisible(false);}});
$("#relic").change(function(){if($("#relic").prop("checked") == true) {lyr_relic.setVisible(true);} else {lyr_relic.setVisible(false);}});
$("#zone").change(function(){if($("#zone").prop("checked") == true) {lyr_zone.setVisible(true);lyr_zonepoint.setVisible(true);} else {lyr_zone.setVisible(false);lyr_zonepoint.setVisible(false);}});
$("#TheWall").change(function(){if($("#TheWall").prop("checked") == true) {lyr_TheWall.setVisible(true);} else {lyr_TheWall.setVisible(false);}});
$("#forest").change(function(){if($("#forest").prop("checked") == true) {lyr_forest.setVisible(true);lyr_texturet.setVisible(true);} else {lyr_forest.setVisible(false);lyr_texturet.setVisible(false);}});
$("#mountain").change(function(){if($("#mountain").prop("checked") == true) {lyr_texturem.setVisible(true);lyr_mountain.setVisible(true);} else {lyr_texturem.setVisible(false);lyr_mountain.setVisible(false);}});
$("#Westeros").change(function(){if($("#Westeros").prop("checked") == true) {lyr_Westeros.setVisible(true);} else {lyr_Westeros.setVisible(false);}});
$("#Essos").change(function(){if($("#Essos").prop("checked") == true) {lyr_Essos.setVisible(true);} else {lyr_Essos.setVisible(false);}});
$("#Sothoryos").change(function(){if($("#Sothoryos").prop("checked") == true) {lyr_Sothoryos.setVisible(true);} else {lyr_Sothoryos.setVisible(false);}});

var layersList = [lyr_ocean,lyr_Sothoryos,lyr_Essos,lyr_Westeros,lyr_texturem,lyr_texturet,lyr_TheWall,lyr_zone,lyr_forest,lyr_mountain,lyr_place,lyr_relic,lyr_river,lyr_road,lyr_castles,lyr_cities,lyr_gulf,lyr_island,lyr_sea,lyr_zonepoint,lyr_battle,lyr_event,lyr_wuwang];
