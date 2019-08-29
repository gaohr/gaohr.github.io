/*
*Common Elements
*GaoHR
*2016-04-21
*/

//Related links
if(document.getElementById("relatedlinks")) {
	$("#relatedlinks").html(Relatedlinks());
}

	
// ClustrMaps
if(document.getElementById("cltmap")) {
	$("#cltmap").html(ClustrMaps());
}

	
// Copyright
if(document.getElementById("copyright")) {
	$("#copyright").html(Copyright());
}

	
// Comments
if(document.getElementById("comments")) {
	$("#comments").append(Comments());
}

	
// Share
if(document.getElementById("shareit")) {
	$("#shareit").append(Share());
}

	
// Dashang
if(document.getElementById("dashang")) {
	$("#dashang").html(Dashang());
}

	
// Warning
if(document.getElementById("warning")) {
	$("#warning").html(Warning());
}

	
// Weather
if(document.getElementById("weather")) {
	$("#weather").html(Weather());
}

	
// others -> Advertisement
if(document.getElementById("others")) {
	//$("#others").append(Advertisement());
	$("#others").append(GreatChina());
}
	
// Declare
Declare();

// Functions ****************************** Functions

function Relatedlinks() {
	return "<ul class=\"blog-images\">" +
			"<li><a href=\"site/special/index.html\" target=\"\" title=\"专题栏目\"><img alt=\"专题栏目\" src=\"img/images/SpecialTopics.png\">专题栏目</a></li><br>" +
			"<li><a href=\"site/historytoday/index.html\" target=\"\" title=\"历史上的今天\"><img alt=\"历史上的今天\" src=\"img/images/History.png\">历史上的今天</a></li><br>" +
			//"<li><a href=\"site/skills/index.html\" target=\"_blank\" title=\"技能图谱\"><img alt=\"技能图谱\" src=\"img/images/skills.png\">技能图谱</a></li><br>" +
			"<li><a href=\"site/turing/index.html\" target=\"_blank\" title=\"图灵机器人\"><img alt=\"图灵机器人\" src=\"img/images/turing.png\">图灵-对话机器人</a></li><br>" +
			"<li><a href=\"site/food/index.html\" target=\"_blank\" title=\"菜谱查询\"><img alt=\"菜谱查询\" src=\"img/images/food.png\">菜谱查询</a></li><br>" +
			"<li><a href=\"site/weixin/index.html\" target=\"_blank\" title=\"微信精选\"><img alt=\"微信精选\" src=\"img/images/Weixinhot.png\">微信精选</a></li><br>" +
			"<li><a href=\"site/natgeo/index.html\" target=\"_blank\" title=\"国家地理百年典藏\"><img alt=\"国家地理百年典藏\" src=\"img/images/NationalGeo.png\">国家地理百年典藏</a></li><br>" +
			"<li><a href=\"site/war2/index.html\" target=\"_blank\" title=\"二战全史\"><img alt=\"二战全史\" src=\"img/images/BBCWar2.png\">二战全史</a></li><br>" +
			"<li><a href=\"site/graph/index.html\" target=\"_blank\" title=\"函数绘图\"><img alt=\"函数绘图\" src=\"img/images/Graph.png\">函数绘图</a></li><br>" +
			"<li><a href=\"site/rainbowposter/index.html\" target=\"_blank\" title=\"制作彩虹特效图片\"><img alt=\"彩虹特效图片\" src=\"img/images/RainbowPoster.png\">彩虹特效图片</a></li><br>" +
			//"<li><a href=\"site/music/index.html\" target=\"_blank\" title=\"音乐盒\"><img alt=\"\" src=\"img/images/music.png\">音乐盒:休闲时光</a></li><br>" +
			"<li><a href=\"http://wetlands.top\" target=\"_blank\" title=\"Wetland\"><img alt=\"Wetland\" src=\"img/images/Water.png\">Wetland专题</a></li><br>" +
			"<li><a href=\"http://jpliu.top\" target=\"_blank\" title=\"LiuJP\"><img alt=\"LiuJP\" src=\"img/images/LiuJP.png\">LiuJP主页</a></li><br>" +
			"</ul>";
}

function ClustrMaps() {
	return "<script type=\"text/javascript\" id=\"clustrmaps\" src=\"//cdn.clustrmaps.com/map_v2.js?cl=ffffff&w=a&t=tt&d=2MAtWut9LH7lh-B1sQLqIbylbTqh4tSwQyno2E1RAEQ&cmo=cf2500&cmn=00bf00&co=00365c\"></script>";
}

function Copyright() {
	return "<hr>Copyright © 2016-2019 Gao Huiran";
}

function Comments() {
	return "<div class=\"portlet\">" +
			"<p class=\"title\"><i class=\"icon-comments\"></i><b> 评论</b></p>" +
			"<!-- 来必力City版安装代码 -->" +
			"<div id=\"lv-container\" data-id=\"city\" data-uid=\"MTAyMC8zNzkwMC8xNDQzMA==\">" +
			"<script type=\"text/javascript\">(function(d, s) {var j, e = d.getElementsByTagName(s)[0];if (typeof LivereTower === 'function') { return; }j = d.createElement(s);j.src = 'https://cdn-city.livere.com/js/embed.dist.js';j.async = true;e.parentNode.insertBefore(j, e);})(document, 'script');</script>" +
			"</div><!-- City版安装代码已完成 --></div>";
}

function Share() {
	return "<script>window._bd_share_config={\"common\":{\"bdSnsKey\":{},\"bdText\":\"\",\"bdMini\":\"2\",\"bdMiniList\":false,\"bdPic\":\"\",\"bdStyle\":\"0\",\"bdSize\":\"16\"},\"slide\":{\"type\":\"slide\",\"bdImg\":\"4\",\"bdPos\":\"right\",\"bdTop\":\"100\"}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];</script>";
}

function Dashang() {
	return "<br><hr><div class=\"shang_img\"></div>" +
			"<span class=\"tdcode\">" +
			"<img src=\"http://gaohr.win/img/pay/alipay.png\">" +
			"<img src=\"http://gaohr.win/img/pay/wechat.png\">" +
			"</span><br>" + 
			"<div class=\"dshlist\"></div>" +
			"<script type=\"text/javascript\">$(\".shang_img\").hover(function(){$(\".shang_img\").css(\"background-image\",\"url(http://gaohr.win/img/pay/shang_hover.png)\");},function(){$(\".shang_img\").css(\"background-image\",\"url(http://gaohr.win/img/pay/shang.png)\");});$(\".shang_img\").click(function() {$(\".tdcode\").toggle(500);});for(i = 0; i < paylist.length; i++) {$(\".dshlist\").append(\"<p><i class='icon-heart'></i><span class='name'>\" + paylist[i].name + \"</span>打赏了<span class='money'>￥<b>\" + paylist[i].amount + \"</b>元</span><i class='date'>\" + paylist[i].date + \"</i><span class='msg' title='\" + paylist[i].msg + \"'><i class='icon-comment'></i></span></p>\")};</script>";
}

function Warning() {
	return "<br><p class=\"g-color-red\">(原创博客，转载请注明 <a href=\"http://gaohr.win\" class=\"mywarning\" title=\"GaoHR blogs\"><b>GaoHR blogs: http://gaohr.win</b></a>)</p>";
}
	
function Weather() {
	loc = returnCitySN.cip;
	key = "422ad66c7a314de9b05f91cf70ec2c18";
	re = ""
	$.ajax({
		url:"https://free-api.heweather.com/s6/weather/forecast?key=" + key + "&location=" + loc,
		dataType:"json",
		async:false,
		success:function(data){
			if(data.HeWeather6[0].status == "ok") {
				re += "明日天气预报<br><b>" + data.HeWeather6[0].basic.location + "</b><img src=\"http://gaohr.win/img/weather/" + data.HeWeather6[0].daily_forecast[1].cond_code_d + ".png\" title=\"" + data.HeWeather6[0].daily_forecast[1].cond_txt_n + "\"><span class=\"tmp\">" + data.HeWeather6[0].daily_forecast[1].tmp_min + " ~ " + data.HeWeather6[0].daily_forecast[1].tmp_max + " ℃</span><span class=\"wnd\">" + data.HeWeather6[0].daily_forecast[1].wind_dir + " " + data.HeWeather6[0].daily_forecast[1].wind_sc + "级</span>";
			} else {
				re += "N/A";
			}
		},
		error:function(){
			re += "N/A";
		}
	});
	return re;
}
	
function Advertisement() {
	return "<div id=\"advertisement\" class=\"advertisement\">" +
			"<p class=\"ad-close\" id=\"ad-close\"><span></span></p>" +
			"<p class=\"ad-title\">编程开发服务</p>" +
			"<p class=\"ad-content\"><i class=\"icon-bullhorn\"></i> Python、Java、C、C++、C#、IDL开发，Web开发等<br><i class=\"icon-bullhorn\"></i> 本人及团队成员具有较强的编程技术，可利用闲暇之余承接计算机编程任务~<br><span class=\"pull-right\">欢迎交流 <a href=\"http://gaohr.win/About.html\"><i class=\"icon-envelope\"></i></a></span></p>" +
		"</div>" +
		"<script src=\"https://code.jquery.com/ui/1.12.1/jquery-ui.js\"></script><script type=\"text/javascript\">$(\"#advertisement\").show(500, callback);$(\"#ad-close\").click(function() {$(\"#advertisement\").hide(500);});function callback() {setTimeout(function() {$(\"#advertisement:visible\").removeAttr(\"style\").fadeOut();}, 10000);}</script>";
}
	
function GreatChina() {
	return "<script src=\"https://code.jquery.com/jquery-1.12.4.js\"></script><script src=\"https://code.jquery.com/ui/1.12.1/jquery-ui.js\"></script>" +
		"<img src=\"http://gaohr.win/img/Flag_CN.gif\" class=\"flagimg\">" +
		"<div id=\"greatChina\" class=\"greatChina\">" +
			"<p class=\"ad-close\" id=\"ad-close\"><span></span></p>" +
			"<p class=\"ad-content\"><img src=\"http://gaohr.win/img/GreatChina.jpg\"></p>" +
		"</div>" +
		"<script type=\"text/javascript\">$(\"#greatChina\").show(500);$(\"#ad-close\").click(function() {$(\"#greatChina\").hide(500);});</script>";
}
	

function Declare() {
	Date.prototype.Format = function (fmt) {
		var o = {
			"M+": this.getMonth() + 1, //月份 
			"d+": this.getDate(), //日 
			"H+": this.getHours(), //小时 
			"m+": this.getMinutes(), //分 
			"s+": this.getSeconds(), //秒 
			"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
			"S": this.getMilliseconds() //毫秒 
		};
		if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	}
	var time = new Date().Format("yyyy-MM-dd HH:mm:ss");
	$("#declareDiv").html("<p class=\"title\"><i class=\"icon-bullhorn\"></i><b> 博客主题</b></p>" +
		"<div id=\"declare\">" +
			"<div id=\"content\">" +
				"<div id=\"code\">" +
					"<span class=\"comments\">/**</span>" +
					"<br>" +
					"<span class=\"comments space\">* Author: GaoHR</span>" +
					"<br>" +
					"<span class=\"comments space\">* Date: " + time + "</span>" +
					"<br>" +
					"<span class=\"comments space\">*/</span>" +
					"<br>" +
					"<span class=\"var\">var</span> 博客主题 = <span class=\"string\">'GIS、遥感学科方向,个人综合类博客'</span>" +
					"<br>" +
					"<span class=\"var\">var</span> 网站主旨 = <span class=\"string\">'记录生活，记录学习'</span>" +
					"<br> " +
				"</div>" +
			"</div>" +
		"</div>" +
		"<script type=\"text/javascript\">$.fn.typewriter = function() {this.each(function() {var $ele = $(this), str = $ele.html(), progress = 0;$ele.html('');var timer = setInterval(function() {var current = str.substr(progress, 1);if (current == '<') {progress = str.indexOf('>', progress) + 1;} else {progress++;}$ele.html(str.substring(0, progress) + (progress & 1 ? '_' : ''));if (progress >= str.length) {clearInterval(timer);}}, 75);});return this;};$(\"#code\").typewriter();</script>");
}
	
	
	
	
	
	
	
	
	
	
	
	
	