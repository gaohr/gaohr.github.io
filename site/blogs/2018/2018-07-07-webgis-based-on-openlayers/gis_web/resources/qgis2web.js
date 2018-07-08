
var relations = eval('relations_fz');

var expandedAttribution = new ol.control.Attribution({
    collapsible: false
});

var map = new ol.Map({
    controls: ol.control.defaults({attribution:false}).extend([
        expandedAttribution,new ol.control.LayerSwitcher({tipLabel: "Layers"})
    ]),
    target: document.getElementById('map'),
    renderer: 'canvas',
    layers: layersList,
    view: new ol.View({
         maxZoom: 28, minZoom: 1
    })
});

map.getView().fit([12866358.946305, 3263469.058195, 13942883.702865, 3870270.788548], map.getSize());
map.addControl(new ol.control.ScaleLine());

var NO_POPUP = 0
var ALL_FIELDS = 1

/**
 * Returns either NO_POPUP, ALL_FIELDS or the name of a single field to use for
 * a given layer
 * @param layerList {Array} List of ol.Layer instances
 * @param layer {ol.Layer} Layer to find field info about
 */
 
function indexOfSmallest(a) {
 var lowest = 0;
 for (var i = 1; i < a.length; i++) {
  if (a[i] < a[lowest]) lowest = i;
 }
 return lowest;
}

var flightsSource = new ol.source.Vector({
        wrapX: false,
        loader: function() {
            for (var i = 0; i < relations.length; i++) {
              var city = relations[i].city;
              var neighbors = relations[i].neighbors;
			  
			  var from = city_coords[city];

              // create an arc circle between the two locations
			  for (var j = 0; j < neighbors.length; j++) {
				  // Find min distance point
				  //var distance = new Array();
				  //var to_points = city_points[neighbors[j]]
				  //for (var k = 0; k < to_points.length; k++) {
					//  xdiff = from[0] - to_points[k][0]
					//  ydiff = from[1] - to_points[k][1]
					//  distance.push(Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5));
				  //}
				  var to = city_coords[neighbors[j]]
				  //var to = to_points[indexOfSmallest(distance)]
				  //alert(to);
				  var arcGenerator = new arc.GreatCircle(
					  {x: from[0], y: from[1]},
					  {x: to[0], y: to[1]});

				  var arcLine = arcGenerator.Arc(10, {offset: 10});
				  if (arcLine.geometries.length === 1) {
					var line = new ol.geom.LineString(arcLine.geometries[0].coords);
					line.transform(ol.proj.get('EPSG:4326'), ol.proj.get('EPSG:3857'));
					
					var feature = new ol.Feature({
					  geometry: line
					  
					});
					
					var dx = to[0] - from[0];
					var dy = to[1] - from[1];
					//var mx = (to[0] + from[0]) / 2.;
					//var my = (to[1] + from[1]) / 2.;
					var mx = from[0] + (to[0] - from[0]) / 4. * 3.;
					var my = from[1] + (to[1] - from[1]) / 4. * 3.;
					var rotation = Math.atan2(dy, dx);
					
					// arrows
					point = new ol.geom.Point(to);
					point.transform(ol.proj.get('EPSG:4326'), ol.proj.get('EPSG:3857'));
					
					arrow_point = new ol.geom.Point([mx, my]);
					//arrow_point = new ol.geom.Point(to);
					arrow_point.transform(ol.proj.get('EPSG:4326'), ol.proj.get('EPSG:3857'));
					
					var arrow_feature = new ol.Feature({
					  geometry: arrow_point
					});
					
					var point_feature = new ol.Feature({
					  geometry: point
					});
					
					style_l = new ol.style.Style({
									stroke: new ol.style.Stroke({
										color: 'rgba(135, 20, 0, ' + relations[i].rv[j] * 3 + ')',
										width: relations[i].rv[j] * 50
									})
								})
					style_p = new ol.style.Style({
								  image: new ol.style.Icon({
									  src: '2018-07-07-webgis-based-on-openlayers/gis_web/images/point.png',
									  anchor: [1, 0.5],
									  rotateWithView: true,
									  scale: relations[i].rv[j] * 0.35
									})
								})
					style_ap = new ol.style.Style({
								  image: new ol.style.Icon({
									  src: '2018-07-07-webgis-based-on-openlayers/gis_web/images/arrow.png',
									  anchor: [0.5, 0.5],
									  rotateWithView: true,
									  rotation: -rotation,
									  scale: relations[i].rv[j] * 0.15
									})
								})
								
					feature.setStyle(style_l);
					point_feature.setStyle(style_p);
					arrow_feature.setStyle(style_ap);
				
					flightsSource.addFeature(point_feature);
					flightsSource.addFeature(arrow_feature);
					flightsSource.addFeature(feature);
				  }
			  }
            }
            //map.on('postcompose', animateFlights);
        }
      });
	  
	  
	  
	  
var flightsLayer = new ol.layer.Vector({
    source: flightsSource,
});
	  
map.addLayer(flightsLayer);
	  
	  
var attribution = document.getElementsByClassName('ol-attribution')[0];
var attributionList = attribution.getElementsByTagName('ul')[0];
var firstLayerAttribution = attributionList.getElementsByTagName('li')[0];
var qgis2webAttribution = document.createElement('li');
qgis2webAttribution.innerHTML = '<a href="https://github.com/tomchadwin/qgis2web">qgis2web</a>';
attributionList.insertBefore(qgis2webAttribution, firstLayerAttribution);
