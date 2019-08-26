function include(url) {
    document.write('<script src="' + url + '"></script>');
    return false;
}

/* cookie.JS
 ========================================================*/
include('js/jquery.cookie.js');


/* DEVICE.JS
 ========================================================*/
include('js/device.min.js');

/* Stick up menu
 ========================================================*/
include('js/tmstickup.js');
$(window).load(function () {
    if ($('html').hasClass('desktop')) {
        $('#stuck_container').TMStickUp({
        })
    }
});

/* Easing library
 ========================================================*/
include('js/jquery.easing.1.3.js');


/* ToTop
 ========================================================*/
include('js/jquery.ui.totop.js');
$(function () {
    $().UItoTop({ easingType: 'easeOutQuart' });
});


/* DEVICE.JS AND SMOOTH SCROLLIG
 ========================================================*/
include('js/jquery.mousewheel.min.js');
include('js/jquery.simplr.smoothscroll.min.js');
$(function () {
    if ($('html').hasClass('desktop')) {
        $.srSmoothscroll({
            step: 150,
            speed: 800
        });
    }
});

/* Copyright Year
 ========================================================*/
var currentYear = (new Date).getFullYear();
$(document).ready(function () {
    $("#copyright-year").text((new Date).getFullYear());
});


/* Superfish menu
 ========================================================*/
include('js/superfish.js');
include('js/jquery.mobilemenu.js');

/* Unveil
 ========================================================*/
include('js/jquery.unveil.js');
$(document).ready(function () {
    $('img').unveil();
});

/* Orientation tablet fix
 ========================================================*/
$(function () {
// IPad/IPhone
    var viewportmeta = document.querySelector && document.querySelector('meta[name="viewport"]'),
        ua = navigator.userAgent,

        gestureStart = function () {
            viewportmeta.content = "width=device-width, minimum-scale=0.25, maximum-scale=1.6, initial-scale=1.0";
        },

        scaleFix = function () {
            if (viewportmeta && /iPhone|iPad/.test(ua) && !/Opera Mini/.test(ua)) {
                viewportmeta.content = "width=device-width, minimum-scale=1.0, maximum-scale=1.0";
                document.addEventListener("gesturestart", gestureStart, false);
            }
        };

    scaleFix();
    // Menu Android
    if (window.orientation != undefined) {
        var regM = /ipod|ipad|iphone/gi,
            result = ua.match(regM)
        if (!result) {
            $('.sf-menu li').each(function () {
                if ($(">ul", this)[0]) {
                    $(">a", this).toggle(
                        function () {
                            return false;
                        },
                        function () {
                            window.location.href = $(this).attr("href");
                        }
                    );
                }
            })
        }
    }
});
var ua = navigator.userAgent.toLocaleLowerCase(),
    regV = /ipod|ipad|iphone/gi,
    result = ua.match(regV),
    userScale = "";
if (!result) {
    userScale = ",user-scalable=0"
}
document.write('<meta name="viewport" content="width=device-width,initial-scale=1.0' + userScale + '">')

/* Custom script
 ========================================================*/
$(document).ready(function () {
    var camera = $('#camera');
    var owl = $('#owl');
    var owl2 = $('#owl_2');
    var isotope = $('.isotope');

    if(camera.length > 0){
        camera.camera(
            {
                autoAdvance: false,
                height: '31.25%',
                minHeight: '200px',
                pagination: false,
                thumbnails: false,
                playPause: false,
                hover: false,
                loader: 'none',
                navigation: true,
                navigationHover: false,
                mobileNavHover: false,
                fx: 'simpleFade'
            }
        );
    }

    if(owl.length > 0){
        owl.owlCarousel(
            {
                navigation: true,
                autoPlay: true,
                slideSpeed: 300,
                stopOnHover: true,
                pagination: false,
                paginationSpeed: 400,
                singleItem: true,
                mouseDrag: false,
                navigationText: ["", ""]
            }
        );
    }

    if(owl2.length > 0){
        owl2.owlCarousel(
            {
                navigation: true,
                autoPlay: true,
                slideSpeed: 300,
                stopOnHover: true,
                pagination: false,
                paginationSpeed: 400,
                singleItem: true,
                mouseDrag: false,
                navigationText: ["", ""]
            }
        );
    }

    if(isotope.length > 0){
        isotope.isotope({
            itemSelector: '.element-item',
            layoutMode: 'fitRows'
        });

        $('#filters').on( 'click', 'a', function() {
            var filterValue = $( this ).attr('data-filter');
            console.log(filterValue);

            if(filterValue == '*'){
                isotope.isotope({ filter: filterValue });
            }else{
                isotope.isotope({ filter: '.'+filterValue });
            }
            return false;
        });
    }

	//百度地图服务
	//创建和初始化地图函数：
    function initMap(){
      createMap();//创建地图
      setMapEvent();//设置地图事件
      addMapControl();//向地图添加控件
      addMapOverlay();//向地图添加覆盖物
    }
    function createMap(){ 
      map = new BMap.Map("map"); 
      map.centerAndZoom(new BMap.Point(116.06347,35.148645),13);
	  
	  //创建图标
	var pt = new BMap.Point(116.100,35.132);
	var myIcon = new BMap.Icon("img/here.png", new BMap.Size(300,300));
	var marker2 = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
	map.addOverlay(marker2);  
	  
    }
    function setMapEvent(){
      map.enableScrollWheelZoom();
      map.enableKeyboard();
      map.enableDragging();
      map.enableDoubleClickZoom()
    }
    function addClickHandler(target,window){
      target.addEventListener("click",function(){
        target.openInfoWindow(window);
      });
    }
    function addMapOverlay(){
    }
    //向地图添加控件
    function addMapControl(){
      var scaleControl = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
      map.addControl(scaleControl);
      var navControl = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
      map.addControl(navControl);
      var overviewControl = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:true});
      map.addControl(overviewControl);
    }
    var map;
      initMap();

});