var datalist_province = [
	{"id":"01", "name":"北京市", "name_en":"Beijing", "data_cpl":"Beijing-zd3jh4zd", "data_city":"Beijing-2015-j198r56g"},
	{"id":"02", "name":"天津市", "name_en":"Tianjin", "data_cpl":"Tianjin-l2fx9zr6", "data_city":"Tianjin-city-dftuj9hfd"},
	{"id":"03", "name":"河北省", "name_en":"Hebei", "data_cpl":"Hebei-51fjy87t", "data_city":"Hebei-city-64cfyf"},
	{"id":"04", "name":"山东省", "name_en":"Shandong", "data_cpl":"Shandong-fx65tkj4", "data_city":"Shandong-city-6hv8g"},
	{"id":"05", "name":"甘肃省", "name_en":"Gansu", "data_cpl":"Gansu-6t87kfdw", "data_city":"Gansu-city-86jrs4"},
	{"id":"06", "name":"新疆维吾尔族自治区", "name_en":"Xinjiang", "data_cpl":"Xinjiang-qag6rjtr", "data_city":"Xinjiang-city-rstu6j"},
	{"id":"07", "name":"上海市", "name_en":"Shanghai", "data_cpl":"Shanghai-xf3g456d", "data_city":"Shanghai-city-6hgv5lu4"},
	{"id":"08", "name":"重庆市", "name_en":"Chongqing", "data_cpl":"Chongqing-86hrc6dd", "data_city":"Chongqing-city-fdstj65"},
	{"id":"09", "name":"江苏省", "name_en":"Jiangsu", "data_cpl":"Jiangsu-xfky354a", "data_city":"Jiangsu-city-zeh56j"},
	{"id":"10", "name":"黑龙江省", "name_en":"Heilongjiang", "data_cpl":"Heilongjiang-lcrzdhr6z", "data_city":"Heilongjiang-city-6djrt"},
	{"id":"11", "name":"贵州省", "name_en":"Guizhou", "data_cpl":"Guizhou-d3d65rcn", "data_city":"Guizhou-city-srk948"},
	{"id":"12", "name":"福建省", "name_en":"Fujian", "data_cpl":"Fujian-fx345jzz", "data_city":"Fujian-city-s6jr4t"},
	{"id":"13", "name":"河南省", "name_en":"Henan", "data_cpl":"Henan-zdjt634n", "data_city":"Henan-city-srj68t"},
	{"id":"14", "name":"吉林省", "name_en":"Jilin", "data_cpl":"Jilin-6c8fky46", "data_city":"Jilin-city-z6ejt84"},
	{"id":"15", "name":"四川省", "name_en":"Sichuan", "data_cpl":"Sichuan-btr94fgd", "data_city":"Sichuan-city-fdg5kyf"},
	{"id":"16", "name":"云南省", "name_en":"Yunnan", "data_cpl":"Yunnan-nf6rse64", "data_city":"Yunnan-city-td8o6u4"},
	{"id":"17", "name":"宁夏回族自治区", "name_en":"Ningxia", "data_cpl":"Ningxia-fx35kyfd", "data_city":"Ningxia-city-pkhw16"},
	{"id":"18", "name":"广西壮族自治区", "name_en":"Guangxi", "data_cpl":"Guangxi-z6djt8nm", "data_city":"Guangxi-city-rs64jt"},
	{"id":"19", "name":"台湾省", "name_en":"Taiwan", "data_cpl":"Taiwan-6f4kcasd", "data_city":""},
	{"id":"20", "name":"湖南省", "name_en":"Hunan", "data_cpl":"Hunan-xfm6kd45", "data_city":"Hunan-city-fp648"},
	{"id":"21", "name":"湖北省", "name_en":"Hubei", "data_cpl":"Hubei-zn5dt8jn", "data_city":"Hubei-city-zjrt516"},
	{"id":"22", "name":"江西省", "name_en":"Jiangxi", "data_cpl":"Jiangxi-xfdzbfy8", "data_city":"Jiangxi-city-z46j8tt"},
	{"id":"23", "name":"辽宁省", "name_en":"Liaoning", "data_cpl":"Liaoning-aejt6srf", "data_city":"Liaoning-city-z6xftj"},
	{"id":"24", "name":"青海省", "name_en":"Qinghai", "data_cpl":"Qinghai-xmf356hg", "data_city":"Qinghai-city-otf6gj"},
	{"id":"25", "name":"广东省", "name_en":"Guangdong", "data_cpl":"Guangdong-k6tc8svt", "data_city":"Guangdong-city-6jtrss"},
	{"id":"26", "name":"香港特别行政区", "name_en":"Xianggang", "data_cpl":"Xianggang-ng6h8u6f", "data_city":""},
	{"id":"27", "name":"澳门特别行政区", "name_en":"Aomen", "data_cpl":"Aomen-ew64ew64", "data_city":""},
	{"id":"28", "name":"陕西省", "name_en":"Shanxi2", "data_cpl":"Shanxi2-xfm35s5f", "data_city":"Shanxi2-city-6gyk48"},
	{"id":"29", "name":"浙江省", "name_en":"Zhejiang", "data_cpl":"Zhejiang-gc38b5fs", "data_city":"Zhejiang-city-d6t48k"},
	{"id":"30", "name":"山西省", "name_en":"Shanxi", "data_cpl":"Shanxi-kds6d8at", "data_city":"Shanxi-city-ffb8u4"},
	{"id":"31", "name":"内蒙古自治区", "name_en":"Neimenggu", "data_cpl":"Neimenggu-xf6y8kj9", "data_city":"Neimenggu-city-rit864"},
	{"id":"32", "name":"安徽省", "name_en":"Anhui", "data_cpl":"Anhui-zhd348ag", "data_city":"Anhui-city-drh648"},
	{"id":"33", "name":"西藏自治区", "name_en":"Xizang", "data_cpl":"Xizang-f56g1hss", "data_city":"Xizang-city-kh1s6r"},
	{"id":"34", "name":"海南省", "name_en":"Hainan", "data_cpl":"Hainan-xfg3k6cd", "data_city":"Hainan-city-j65489d"}
]

for(var i = 0; i < datalist_province.length; i++) {
	if(datalist_province[i].data_city != "") {
		$("#data-province").append("<tr><td>"+ datalist_province[i].id +"</td><td style='color:#921;font-size:1.2em'>"+ datalist_province[i].name +"</td><td><img width='60' src='http://gaohr.win/site/special/2019/2019-09-14-dem-30m-cn/imgs/"+ datalist_province[i].name_en +".jpg' class='picture-show'> <img width='60' src='http://gaohr.win/site/special/2019/2019-09-14-dem-30m-cn/imgs/"+ datalist_province[i].name_en +"-data-shi.jpg' class='picture-show'></td><td>ESRI Shapefile<br>Polygon</td><td><select id='year-select-" + datalist_province[i].id + "' class='selectpicker' data-width='100' data-style='btn-warning'><option>2020</option><option>2015</option></select> <span class='badge badge-important'>选</span></td><td><a href='###' onclick=\"openDownloadWin_prvn('" + datalist_province[i].name_en + "', '" + datalist_province[i].id + "')\" data-toggle='tooltip' title='省界' data-placement='left' class='popup-left'><i class='icon-download'></i></a> | <a href='###' onclick=\"openDownloadWin_city('" + datalist_province[i].name_en + "', '" + datalist_province[i].id + "')\" data-toggle='tooltip' title='地市界' data-placement='right' class='popup-right'><i class='icon-download-purple'></i></a></td></tr>");
	} else {
		$("#data-province").append("<tr><td>"+ datalist_province[i].id +"</td><td style='color:#921;font-size:1.2em'>"+ datalist_province[i].name +"</td><td><img width='60' src='http://gaohr.win/site/special/2019/2019-09-14-dem-30m-cn/imgs/"+ datalist_province[i].name_en +".jpg'> <img width='60' src='http://gaohr.win/site/special/2019/2019-09-14-dem-30m-cn/imgs/"+ datalist_province[i].name_en +"-data-shi.jpg'></td><td>ESRI Shapefile<br>Polygon</td><td><select id='year-select-" + datalist_province[i].id + "' class='selectpicker' data-width='100' data-style='btn-warning'><option>2020</option><option>2015</option></select> <span class='badge badge-important'>选</span></td><td><a href='###' onclick=\"openDownloadWin_prvn('" + datalist_province[i].name_en + "', '" + datalist_province[i].id + "')\" data-toggle='tooltip' title='省界' data-placement='left' class='popup-left'><i class='icon-download'></i></a> | ---</td></tr>");
	}
}

function openDownloadWin_prvn(name, id) {
			var year_select = $("#year-select-" + id).val();
			window.open("https://gaohr-blog.oss-cn-beijing.aliyuncs.com/data/GIS_China/province/" + name + "-" + year_select + ".rar");
		}

function openDownloadWin_city(name, id) {
			var year_select = $("#year-select-" + id).val();
			window.open("https://gaohr-blog.oss-cn-beijing.aliyuncs.com/data/GIS_China/province_city/" + name + "-city-" + year_select + ".rar");
		}


for(var c = 0; c < datalist_province.length; c++) {
	if(datalist_province[c].data_cpl != "") {
		$("#data-province-cpl").append("<tr><td>"+ datalist_province[c].id +"</td><td style='color:#921;font-size:1.2em'>"+ datalist_province[c].name +"</td><td><img width='80' src='http://gaohr.win/site/special/2019/2019-09-14-dem-30m-cn/imgs/"+ datalist_province[c].name_en +"-data-cpl.jpg' class='picture-show'></td><td>ESRI Shapefile | Polygon</td><td><a href='https://gaohr-blog.oss-cn-beijing.aliyuncs.com/data/GIS_China/County_pl/"+ datalist_province[c].data_cpl +".rar' target='_blank'><i class='icon-download-blue'></i></a></td></tr>");
	} else {
		$("#data-province-cpl").append("<tr><td>"+ datalist_province[c].id +"</td><td style='color:#921;font-size:1.2em'>"+ datalist_province[c].name +"</td><td><img width='80' src='http://gaohr.win/site/special/2019/2019-09-14-dem-30m-cn/imgs/"+ datalist_province[c].name_en +".jpg'></td><td>ESRI Shapefile | Polygon</td><td class='g-color-gray'>---</td></tr>");
	}
}
		
$(".picture-show").click(function(){  
			var _this = $(this);//将当前的pimg元素作为_this传入函数  
			imgShow("#outerdiv", "#innerdiv", "#bigimg", _this);  
		}); 
		
		function imgShow(outerdiv, innerdiv, bigimg, _this){  
			var src = _this.attr("src");//获取当前点击的pimg元素中的src属性  
			$(bigimg).attr("src", src);//设置#bigimg元素的src属性  
		  
				/*获取当前点击图片的真实大小，并显示弹出层及大图*/  
			$("<img/>").attr("src", src).load(function(){  
				var windowW = $(window).width();//获取当前窗口宽度  
				var windowH = $(window).height();//获取当前窗口高度  
				var realWidth = this.width;//获取图片真实宽度  
				var realHeight = this.height;//获取图片真实高度  
				var imgWidth, imgHeight;  
				var scale = 0.8;//缩放尺寸，当图片真实宽度和高度大于窗口宽度和高度时进行缩放  
				  
				if(realHeight > windowH * scale) {//判断图片高度  
					imgHeight = windowH * scale;//如大于窗口高度，图片高度进行缩放  
					imgWidth = imgHeight / realHeight * realWidth;//等比例缩放宽度  
					if(imgWidth > windowW * scale) {//如宽度扔大于窗口宽度  
						imgWidth = windowW * scale;//再对宽度进行缩放  
					}  
				} else if(realWidth > windowW * scale) {//如图片高度合适，判断图片宽度  
					imgWidth = windowW * scale;//如大于窗口宽度，图片宽度进行缩放  
					imgHeight = imgWidth / realWidth * realHeight;//等比例缩放高度  
				} else {//如果图片真实高度和宽度都符合要求，高宽不变  
					imgWidth = realWidth;  
					imgHeight = realHeight;  
				}  
						$(bigimg).css("width",imgWidth);//以最终的宽度对图片缩放  
				  
				var w = (windowW - imgWidth) / 2;//计算图片与窗口左边距  
				var h = (windowH - imgHeight) / 2;//计算图片与窗口上边距  
				$(innerdiv).css({"top": h, "left": w});//设置#innerdiv的top和left属性  
				$(outerdiv).fadeIn("fast");//淡入显示#outerdiv及.pimg  
			});  
			  
			$(outerdiv).click(function(){//再次点击淡出消失弹出层  
				$(this).fadeOut("fast");  
			});  
}