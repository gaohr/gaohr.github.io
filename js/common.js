/*
*Common Elements
*Author: GaoHR
*Create date: 2016-04-21
*Update date: 2019-09-16
*/

$(document).ready(function($) {
	/*鼠标点击特效*/
	var a_idx = 0;
   $("body").click(function(e) {
       var arrT = new Array("富强", "民主", "文明", "和谐", "自由", "平等", "公正" ,"法治", "爱国", "敬业", "诚信", "友善", "GaoHR", "@斩之浪");
       var $i = $("<span/>").text(arrT[a_idx]);a_idx = (a_idx + 1) % arrT.length;
       var x = e.pageX,y = e.pageY;
       $i.css({"z-index": 9999,"top": y - 20,"left": x,"position": "absolute","font-weight": "bold","color": "#f65","font-size": "1.2em"});
       $("body").append($i);
       $i.animate({"top": y - 180,"opacity": 0},2000,function() {$i.remove();});
   });
   
	/*滚动监听，显示侧边菜单*/
	$(".span2:first").append("<div class='centerer-menu-2 g-text-lg'>" +
							"<div class='host'>" +
							"<img src='http://gaohr.win/img/mainicon.png' class='img-rounded'><br><br>" +
							"<i class='icon-user'>&nbsp;&nbsp;GaoHR个人博客</i>" +
							"</div><br>" +
							"<a href='http://gaohr.win/index.html'>首页</a><br><br>" +
							"<a href='http://gaohr.win/Blogs.html'>博客</a><br><br>" +
							"<a href='http://gaohr.win/site/special/index.html'>专题</a><br><br>" +
							"<a href='http://gaohr.win/About.html'>关于</a><br><br>" +
							"<a href='http://gaohr.win/Contact.html'>留言</a>" +
							"</div></div>");
	
	var min_height = 600;
	$(window).scroll(function(){
		var sh = $(window).scrollTop();
		if($(window).width() > 900) {
			if(sh > min_height){
				$(".centerer-menu-2").fadeIn(500);
			}else{
				$(".centerer-menu-2").fadeOut(100);
			};
		};
	});
	
	/*百度自动推送*/
	$("body").append("<script>(function(){var bp = document.createElement('script');var curProtocol = window.location.protocol.split(':')[0];if (curProtocol === 'https') {bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';}else {bp.src = 'http://push.zhanzhang.baidu.com/push.js';}var s = document.getElementsByTagName(\"script\")[0];s.parentNode.insertBefore(bp, s);})();</script>");
	
	/*百度统计*/
	$("head").append("<script>var _hmt = _hmt || [];(function() {var hm = document.createElement('script');hm.src = 'https://hm.baidu.com/hm.js?7c81b8e214184b45986721bd426be652';var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(hm, s);})();</script>");
	
	//更新访问计数
	// 原因：计数器添加较晚，每页计数数值加上已有计数（总计数的平均值）
	//setTimeout(function() {
	//			var bc = $("#busuanzi_value_page_pv").html();
	//			if(bc != "") {
	//				$("#busuanzi_value_page_pv").html((2121 + parseInt(bc)).toString());
	//			} else {
	//				$("#busuanzi_value_page_pv").html((2121 + Math.floor(Math.random() * 200 - 100)).toString());
	//			}
	//}, 1000);
	
});

//Related links
if($("#relatedlinks")) {
	$("#relatedlinks").html(Relatedlinks());
}
	
// Comments
if($("#comments")) {
	$("#comments").append(Comments());
}
	
// Share
if($("#shareit")) {
	$("#shareit").append(Share());
}
	
// Dashang
if(document.getElementById("dashang")) {
	Dashang();
}
	
// Warning
if($("#warning")) {
	$("#warning").html(Warning());
}
	
// Weather
if($("#weather")) {
	$("#weather").html(Weather());
}
	
// ClustrMaps
ClustrMaps();
	
// Copyright
Copyright();
	
// Search
Search();
	
// Declare
Declare();
	
// Visitors statistic
PageViews();
	
// Scroll top
gotoTop(600);
	
// Great China
//GreatChina();
China70();
	
// Hot topics
HotTopic();
	
	
// Functions ****************************** Functions

function Relatedlinks() {
	return "<ul class=\"blog-images\">" +
			"<li><a href=\"site/special/index.html\" target=\"\" title=\"专题栏目\"><img alt=\"专题栏目\" src=\"img/images/SpecialTopics.png\">专题栏目</a></li><br>" +
			"<li><a href=\"site/historytoday/index.html\" target=\"\" title=\"历史上的今天\"><img alt=\"历史上的今天\" src=\"img/images/History.png\">历史上的今天</a></li><br>" +
			"<li><a href=\"site/skills/index.html\" target=\"_blank\" title=\"技能图谱\"><img alt=\"技能图谱\" src=\"img/images/skills.png\">技能图谱</a></li><br>" +
			"<li><a href=\"site/turing/index.html\" target=\"_blank\" title=\"图灵机器人\"><img alt=\"图灵机器人\" src=\"img/images/turing.png\">图灵-对话机器人</a></li><br>" +
			"<li><a href=\"site/food/index.html\" target=\"_blank\" title=\"菜谱查询\"><img alt=\"菜谱查询\" src=\"img/images/food.png\">菜谱查询</a></li><br>" +
			"<li><a href=\"site/weixin/index.html\" target=\"_blank\" title=\"微信精选\"><img alt=\"微信精选\" src=\"img/images/Weixinhot.png\">微信精选</a></li><br>" +
			"<li><a href=\"site/natgeo/index.html\" target=\"_blank\" title=\"国家地理百年典藏\"><img alt=\"国家地理百年典藏\" src=\"img/images/NationalGeo.png\">国家地理百年典藏</a></li><br>" +
			"<li><a href=\"site/war2/index.html\" target=\"_blank\" title=\"二战全史\"><img alt=\"二战全史\" src=\"img/images/BBCWar2.png\">二战全史</a></li><br>" +
			"<li><a href=\"site/graph/index.html\" target=\"_blank\" title=\"函数绘图\"><img alt=\"函数绘图\" src=\"img/images/Graph.png\">函数绘图</a></li><br>" +
			"<li><a href=\"http://wetlands.top\" target=\"_blank\" title=\"Wetland\"><img alt=\"Wetland\" src=\"img/images/Water.png\">Wetland专题</a></li><br>" +
			"<li><a href=\"http://jpliu.top\" target=\"_blank\" title=\"LiuJP\"><img alt=\"LiuJP\" src=\"img/images/LiuJP.png\">LiuJP主页</a></li><br>" +
			"</ul>";
}

function ClustrMaps() {
	$("#cltmap").html("<script type=\"text/javascript\" id=\"clustrmaps\" src=\"//cdn.clustrmaps.com/map_v2.js?cl=ffffff&w=a&t=tt&d=2MAtWut9LH7lh-B1sQLqIbylbTqh4tSwQyno2E1RAEQ&cmo=cf2500&cmn=00bf00&co=00365c\"></script>");
}

function Copyright() {
	$("#copyright").html("<img class='footer-logo' src='http://gaohr.win/img/mainicon.png' width='50'><a href='http://gaohr.win/Blogs.html'> 原创博客 </a><span>|</span><a href='http://gaohr.win/site/special/index.html'> 专题系列 </a><span>|</span><a href='###'> 公告专区 </a><span>|</span><a href='###'> 关于本站 </a><div class='footer-text'><span> 在线服务时间 10:00-15:00 </span><span> 地址:北京市海淀区邓庄南路9号 中国科学院遥感与数字地球研究所 </span></div><div class='footer-copy' id='copyright'>Copyright © 2016-2019 <a href='http://gaohr.win/' target='_blank'>GaoHR个人博客 <img src='http://gaohr.win/img/mainicon.png' width='12'></a> All Rights Reserved<br>Powered by <a href='https://github.com/' target='_blank'>GitHub <i class='icon-github-sign'></i></a></div>");
}

function Comments() {
	return "<div class=\"portlet\">" +
			"<p class=\"title\"><i class=\"icon-comments\"></i><b> 评论</b></p>" +
			"<p class=\"g-color-red\">温馨提示：如遇评论系统图标显示异常，可将鼠标停留在图标片刻查看登录方式等</p>" +
			"<!-- 来必力City版安装代码 -->" +
			"<div id=\"lv-container\" data-id=\"city\" data-uid=\"MTAyMC8zNzkwMC8xNDQzMA==\">" +
			"<script type=\"text/javascript\">(function(d, s) {var j, e = d.getElementsByTagName(s)[0];if (typeof LivereTower === 'function') { return; }j = d.createElement(s);j.src = 'https://cdn-city.livere.com/js/embed.dist.js';j.async = true;e.parentNode.insertBefore(j, e);})(document, 'script');</script>" +
			"</div><!-- City版安装代码已完成 --></div>";
}

function Share() {
	return "<script>window._bd_share_config={\"common\":{\"bdSnsKey\":{},\"bdText\":\"\",\"bdMini\":\"2\",\"bdMiniList\":false,\"bdPic\":\"\",\"bdStyle\":\"0\",\"bdSize\":\"16\"},\"slide\":{\"type\":\"slide\",\"bdImg\":\"4\",\"bdPos\":\"right\",\"bdTop\":\"100\"}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];</script>";
}

function Dashang() {
	$("#dashang").html("<br><hr><span class='g-color-red'>点击打赏小钱钱</span><div class=\"shang_img\"></div>" +
						"<span class=\"tdcode\">" +
						"<p style='color:#fff'>非常感谢您的支持！</p>" +
						"<img src=\"http://gaohr.win/img/pay/alipay.png\">" +
						"<img src=\"http://gaohr.win/img/pay/wechat.png\">" +
						"<p style='color:#fff'>扫码打赏，建议金额：1-10元</p>" +
						"</span><br>" + 
						"<div class=\"row-fluid\"><div class=\"span8\"><div class=\"dshstatis\" id=\"dshstatis\"></div></div><div class=\"span4\"><div class=\"dshlist\"><p class=\"dshtext\"></p><hr><div class=\"dshcontent\"></div></div></div></div><hr>");
	
	$(".shang_img").hover(
		function(){$(".shang_img").css("background-image","url(http://gaohr.win/img/pay/shang_hover.png)");}, 
		function(){$(".shang_img").css("background-image","url(http://gaohr.win/img/pay/shang.png)");});
	$(".shang_img").click(function() {$(".tdcode").toggle(300);});
	var dsh_num = paylist.length;
	$(".dshtext").append("共 <span><i>" + dsh_num + "</i></span> 人次打赏");
	for(i = 0; i < dsh_num; i++) {$(".dshcontent").append("<p><i class='icon-heart'></i><span class='name'>" + paylist[i].name + "</span>打赏了<span class='money'><b>" + paylist[i].amount + "</b>元</span><i class='date'>" + paylist[i].date + "</i></p>");}
	$(".dshlist").append("<hr><p class=\"dshbottom\">非常感谢您的支持！<i class=\"emo emo-02-16\" style=\"margin-top:-10px\"></i></p>");
	var a1 = 0,a2 = 0, a3 = 0, a4 = 0, a5 = 0;
	for(i = 0; i < dsh_num; i++) {if(paylist[i].amount < 1) {a1 += 1;} else if(paylist[i].amount >= 1 && paylist[i].amount < 2) {a2 += 1;} else if(paylist[i].amount >= 2 && paylist[i].amount < 5) {a3 += 1;} else if(paylist[i].amount >= 5 && paylist[i].amount < 10) {a4 += 1;} else {a5 += 1;}};
	var chart = echarts.init(document.getElementById('dshstatis'));
	var colorList=['#fee', '#ea4', '#0d0', '#09f', '#f65'];
	chart.showLoading();chart.hideLoading();
	// 定义图表属性
	chart.setOption(option = {backgroundColor:"#333",title: {text: '打赏统计',subtext: '打赏金额占比',textStyle: {fontSize:20,fontWeight:'normal',color: ['#fff']},subtextStyle: {color: '#ccc',fontSize: 16},},grid: {bottom: 150,left: 0,right: '2%'},tooltip: {trigger: 'item',formatter: "{b} : {c} ({d}%)"},legend: {type: "scroll",orient: "vartical",top: "center",right: "0",itemWidth: 32,itemHeight: 16,itemGap: 16,textStyle: {color: '#fff',fontSize: 16,fontWeight: 0},data: ['< 1元', '1元 - 2元', '2元 - 5元', '5元 - 10元', '> 10元']},series: [{radius: ['30%', '75%'],center: ['42%', '50%'],type: 'pie',itemStyle: {normal: {color: function(params) {return colorList[params.dataIndex]}}},labelLine: {normal: {show:true,length:10,length2:10,lineStyle:{color:'#d3d3d3'},align:'right'},color: "#000",emphasis: {show: true}},label: {normal: {show:true,formatter:"{d}%",textStyle:{fontSize:18}}},data: [{name:'< 1元', value:a1},{name:'1元 - 2元', value:a2},{name:'2元 - 5元', value:a3},{name:'5元 - 10元', value:a4},{name:'> 10元', value:a5}],},{radius: ['50%', '51%'],center: ['42%', '50%'],type: 'pie',label: {normal: {show: false},emphasis: {show: false}},labelLine: {normal: {show: false},emphasis: {show: false}},animation: false,tooltip: {show: false},itemStyle: {normal: {color:'rgba(255,255,255,0.25)'}},data: [{value: 1,}],},{radius: ['78%', '79%'],center: ['42%', '50%'],type: 'pie',label: {normal: {show: false},emphasis: {show: false}},labelLine: {normal: {show: false},emphasis: {show: false}},animation: false,tooltip: {show: false},itemStyle: {normal: {color:'rgba(255,0,255,0.75)'}},data: [{value: 1,}],}]});
}

function Warning() {
	return "<br><p>关注新浪微博：<a href='http://weibo.com/531239592' target='_blank'>@斩之浪 <i class='icon-sina emo-sm'></i></a></p><br><p class='g-color-red'> (原创博客，转载请注明来源 <b class='mywarning'>GaoHR 个人博客: http://gaohr.win</b>)</p>";
}
	
function Weather() {
	loc = returnCitySN.cip;
	key = "422ad66c7a314de9b05f91cf70ec2c18";
	re = ""
	$.ajax({url:"https://free-api.heweather.com/s6/weather/forecast?key=" + key + "&location=" + loc,dataType:"json",async:false,success:function(data){if(data.HeWeather6[0].status == "ok") {re += "明日天气预报<br><b>" + data.HeWeather6[0].basic.location + "</b><img src=\"http://gaohr.win/img/weather/" + data.HeWeather6[0].daily_forecast[1].cond_code_d + ".png\" title=\"" + data.HeWeather6[0].daily_forecast[1].cond_txt_n + "\"><span class=\"tmp\">" + data.HeWeather6[0].daily_forecast[1].tmp_min + " ~ " + data.HeWeather6[0].daily_forecast[1].tmp_max + " ℃</span><span class=\"wnd\">" + data.HeWeather6[0].daily_forecast[1].wind_dir + " " + data.HeWeather6[0].daily_forecast[1].wind_sc + "级</span>";} else {re += "N/A";}},error:function(){re += "N/A";}});
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
	$("#others").append("<script src=\"https://code.jquery.com/ui/1.12.1/jquery-ui.js\"></script>" +
						"<img src=\"http://gaohr.win/img/others/Flag_CN.gif\" class=\"flagimg\">" +
						"<div id=\"greatChina\" class=\"greatChina\">" +
							"<p class=\"ad-close\" id=\"ad-close\"><span></span></p>" +
							"<p class=\"ad-content\"><img src=\"../img/others/China70.jpg\"></p>" +
						"</div>");
		$("#greatChina").show(500);
		$("#ad-close").click(function() {$("#greatChina").hide(500);});
}
	
function China70() {
	$("#others").append("<div id=\"China70\" class=\"greatChina\">" +
							"<p class=\"ad-close\" id=\"ad-close\"><span></span></p>" +
							// "<div class=\"timer-container\"><p>70周年国庆倒计时</p><div id=\"timer\"></div></div><br>" +
							"<div class=\"timer-container\"><p>中华人民共和国<br>70周年华诞</p></div>" +
							"<p class=\"ad-content\"><img src=\"http://gaohr.win/img/others/China70.jpg\"></p>" +
						"</div>");
		$("#China70").show(500);
		$("#ad-close").click(function() {$("#China70").hide(500);});
		
		/*
		// 倒计时
		const year = new Date().getFullYear();
		const firstOfOct = new Date(year, 9, 1).getTime();
		// countdown
		let timer = setInterval(function() {
			// get today's date
			const today = new Date().getTime();
			// get the difference
			const diff = firstOfOct - today;
			let days = Math.floor(diff / (1000 * 60 * 60 * 24));
			let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
			let seconds = Math.floor((diff % (1000 * 60)) / 1000);
			$("#timer").html("<div class=\"days\"><div class=\"numbers\">" + days + "</div>天</div><div class=\"hours\"><div class=\"numbers\">" + hours + "</div>时</div><div class=\"minutes\"><div class=\"numbers\">" + minutes + "</div>分</div><div class=\"seconds\"><div class=\"numbers\">" + seconds + "</div>秒</div></div>");
		}, 1000);
		*/
}
	
function HotTopic() {
	$("#others").append("<div class=\"notice\">" +
						"<ul id=\"notice01\" class=\"noticTipTxt\">" +
						"<li><a href=\"http://gaohr.win/site/blogs/2019/2019-10-16-china-railway.html\" target=\"_blank\">全国精细铁路网矢量数据集 <img src=\"http://gaohr.win/img/others/hot001.gif\" width=\"22\"></a></li>" +
						"<li><a href=\"http://gaohr.win/site/special/2019/2019-09-14-dem-30m-cn.html\" target=\"_blank\">全国各省30m DEM数据免费下载 <img src=\"http://gaohr.win/img/others/hot001.gif\" width=\"22\"></a></li>" +
						"<li><a href=\"http://gaohr.win/site/blogs/2019/2019-08-20-china-daily-ground-climate-data-extraction.html\" target=\"_blank\">中国地面气候资料数据提取Python程序 <img src=\"http://gaohr.win/img/others/hot001.gif\" width=\"22\"></a></li>" +
						"<li><a href=\"http://gaohr.win/site/blogs/2019/2019-09-13-china-soil-type.html\" target=\"_blank\">中国土壤类型1km空间分布数据 <img src=\"http://gaohr.win/img/others/hot001.gif\" width=\"22\"></a></li>" +
						"<li><a href=\"http://gaohr.win/site/blogs/2017/2017-04-18-GIS-basic-data-of-China.html\" target=\"_blank\">中国国家基础地理信息数据打包下载 <img src=\"http://gaohr.win/img/others/hot001.gif\" width=\"22\"></a></li>" +
						"<li><a href=\"http://gaohr.win/site/special/2016/2016-05-11-agot-map.html\" target=\"_blank\">冰与火之歌：在线世界电子地图 <img src=\"http://gaohr.win/img/others/hot001.gif\" width=\"22\"></a></li>" +
						"<li><a href=\"http://gaohr.win/site/blogs/2019/2019-05-27-arcgis-and-art.html\" target=\"_blank\">GISer情怀：GIS地图制图的艺术之美 <img src=\"http://gaohr.win/img/others/hot001.gif\" width=\"22\"></a></li>" +
						"</ul></div><script type=\"text/javascript\" src=\"http://gaohr.win/js/scrolltext.js\"></script>");
	if(document.getElementById("notice01")){var scrollup = new ScrollText("notice01");scrollup.LineHeight = 36;scrollup.Amount = 1;scrollup.Delay = 20;scrollup.Start();scrollup.Direction = "down";}
}
	
function Declare() {
	Date.prototype.Format = function (fmt) {
		var o = {"M+": this.getMonth() + 1,"d+": this.getDate(),"H+": this.getHours(),"m+": this.getMinutes(),"s+": this.getSeconds(),"q+": Math.floor((this.getMonth() + 3) / 3),"S": this.getMilliseconds()};
		if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	}
	var time = new Date().Format("yyyy-MM-dd HH:mm:ss");
	$("#declareDiv").html("<p class=\"title\"><i class=\"icon-bullhorn\"></i><b> 网站主题</b></p>" +
		"<div id=\"declare\">" +
			"<div id=\"content\">" +
				"<div id=\"code\">" +
					"<span class=\"comments\">/**</span><br>" +
					"<span class=\"comments space\">* Author: GaoHR</span><br>" +
					"<span class=\"comments space\">* Date: " + time + "</span><br>" +
					"<span class=\"comments space\">*/</span><br>" +
					"<span class=\"var\">var</span> 博客主题 = <span class=\"string\">'GIS、遥感学科方向,个人综合类博客'</span><br>" +
					"<span class=\"var\">var</span> 网站主旨 = <span class=\"string\">'记录生活，记录学习，分享快乐'</span><br> " +
				"</div>" +
			"</div>" +
		"</div>");
		$.fn.typewriter = function() {
			this.each(function() {
				var $ele = $(this), str = $ele.html(), progress = 0;
				$ele.html('');
				var timer = setInterval(function() {
					var current = str.substr(progress, 1);
					if (current == '<') {progress = str.indexOf('>', progress) + 1;} else {progress++;}$ele.html(str.substring(0, progress) + (progress & 1 ? '_' : ''));
					if (progress >= str.length) {clearInterval(timer);}
				}, 75);
			});return this;
		};
		$("#code").typewriter();
}
	
function gotoTop(min_height){
	var gotoTop_html = '<div id="gotoTop"><i class=\"icon-double-angle-up\"></i></div>';
	$("#others").append(gotoTop_html);
	$("#gotoTop").click(
		function(){$('html,body').animate({scrollTop:0},600);
	}).hover(
		function(){$(this).addClass("hover");$("#gotoTop").html('返回<br>顶部');},
		function(){$(this).removeClass("hover");$("#gotoTop").html('<i class=\"icon-double-angle-up\"></i>');
	});
	$(window).scroll(function(){
		var s = $(window).scrollTop();
		if(s > min_height){
			$("#gotoTop").fadeIn(100);
		}else{
			$("#gotoTop").fadeOut(500);
		};
	});
};
	
function Search() {
	$("body").append("<div id='popup-search' class='popup-search'><div class='title'><p id='p-title' class='g-text-bg no-indent'>查询结果</p><span class='close'>X</span></div><div id='pop-cont' class='cont'></div></div>");
	// 屏幕居中
	body_width = parseInt($(window).width());
	body_height = parseInt($(window).height());
	block_width = parseInt($("#popup-search").width());
	block_height = parseInt($("#popup-search").height());

	search_html = "<section class='g-search'><form><input id='input-value' type='search' placeholder='你想找什么？'><a id='g-search'><i class='icon-search g-text-bg'></i></a></form><p class='warning'>查询字段不能为空</p></section>"
	$("#others").append(search_html);
	
	// 显示窗体
	$("#g-search").click(function() {
		var search_val = $("#input-value").val();
		if(search_val != "") {
			$("#p-title").html("查询 <i class='g-color-red'>" + search_val + "</i> 的结果");
			top_position = parseInt((body_height / 2.25) - (block_height / 2.25) + $(window).scrollTop());
			if (body_height < block_height) {
				top_position = 0 + $(window).scrollTop();
			};
			$("#popup-search").show().animate({opacity: 1, top: top_position});
			blogsSearch(search_val);
		} else {
			$('.warning').show();
			setTimeout(function() {
				$('.warning').hide();
			}, 3000);
		}
	});
	
	// 关闭窗体
	$(".close").click(function() {
		$("#popup-search").animate({opacity:0, top:150}, function () {
			$("#popup-search").hide();
		});
	});
}
	
function blogsSearch(keyword) {
	// 搜索博客
	$("#pop-cont").html("");
	for(var b = 0; b < bloglist.length; b++) {
		if(bloglist[b].title.indexOf(keyword) != -1 || bloglist[b].content.indexOf(keyword) != -1) {
			$("#pop-cont").append(findblog(keyword, bloglist, b, 0));
		}
		
	}
	// 搜索专题
	for(var t = 0; t < topicslist.length; t++) {
	if(topicslist[t].title.indexOf(keyword) != -1 || topicslist[t].content.indexOf(keyword) != -1) {
			$("#pop-cont").append(findblog(keyword, topicslist, t, 1));
		}
		
	}
	if($("#pop-cont").html() == "") {
		$("#pop-cont").html("<p class='g-color-gray g-text-lg'>抱歉，未搜索到与 <i class='g-color-red'>" + keyword + "</i> 相关的主题</p>" +
							"<hr>" +
							"<p class='g-color-red g-text-bg'>热门话题推荐</p>" +
							"<ul class='g-text-bg'>" +
							"<li><a href=\"http://gaohr.win/site/special/2019/2019-09-14-dem-30m-cn.html\" target=\"_blank\">全国各省30m DEM数据免费下载</a></li>" +
							"<li><a href=\"http://gaohr.win/site/blogs/2019/2019-08-20-china-daily-ground-climate-data-extraction.html\" target=\"_blank\">中国地面气候资料数据提取Python程序</a></li>" +
							"<li><a href=\"http://gaohr.win/site/blogs/2019/2019-09-13-china-soil-type.html\" target=\"_blank\">中国土壤类型1km空间分布数据</a></li>" +
							"<li><a href=\"http://gaohr.win/site/blogs/2017/2017-04-18-GIS-basic-data-of-China.html\" target=\"_blank\">中国国家基础地理信息数据打包下载</a></li>" +
							"<li><a href=\"http://gaohr.win/site/special/2016/2016-05-11-agot-map.html\" target=\"_blank\">冰与火之歌：在线世界电子地图</a></li>" +
							"<li><a href=\"http://gaohr.win/site/blogs/2019/2019-05-27-arcgis-and-art.html\" target=\"_blank\">GISer情怀：GIS地图制图的艺术之美</a></li>" +
							"</ul>")
	}
}
	
function findblog(key, bloglist,n, type) {
	var type_mark = "";
	if(type == 0) {
		type_mark = "博客";
	} else {
		type_mark = "专题";
	}
	var blogcon = "<div class='blog-article'>" +
		"<a href='" + bloglist[n].href + "' class='blog-title' target='_blank'><b>" + bloglist[n].title + "</b></a> " +
		"<a class='pull-right btn-red btn-mini' href='" + bloglist[n].href + "' style='margin-right:2%' target='_blank'>" + type_mark + "</a>" +
		"<p style='margin-right:7%'>" + bloglist[n].content + "</p>" +
		"</div>" +
		"<hr>";
	var blogcon_new = blogcon.split(key);
	res = blogcon_new.join('<span style="color:#f65;padding:0 2px;border-radius:2px">' + key + '</span>');
	return res;
}
	
// Pageview statistics
function PageViews() {
	if($(".blogtopinfo")) {
		$(".blogtopinfo").append("<script async src='//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js'></script><span id='busuanzi_container_page_pv' style='margin-left:10px;'><i class='icon-eye-open'></i> 本文阅读量 <b><span class='g-color-green' id='busuanzi_value_page_pv'></span></b> 次</span><br><hr>");
	}
	
	if($(".topictopinfo")) {
		$(".topictopinfo").append("<script async src='//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js'></script><span id='busuanzi_container_page_pv' style='margin-left:10px;'>专题访问量 <b><span class='g-color-green' id='busuanzi_value_page_pv'></span></b> 次</span>");
	}
}
	