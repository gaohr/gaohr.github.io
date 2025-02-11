/*
*Common Elements
*Author: GaoHR
*Create date: 2016-04-21
*Update date: 2019-09-16
*/

$(document).ready(function($) {
	/*LOGO*/
	$(".g-blog-logo").html("<img src='http://gaohr.win/img/blog_logo.png'>");
	$("head").append("<meta name='descrpition' content='GIS大饼,GaoHR个人综合类博客网站,博客主题多为GIS、遥感学科方向，博客和专题内容主要为专业技术、科研资源、经验分享等'/>");
	var this_title = $(document).attr("title");
	$('title').html("GIS大饼 | " + this_title)
	
	/*Background*/
	var now = new Date();
	var day = now.getDate() - 1;
	// var randomIndex = Math.floor(Math.random() * 24);
	if(day <= 24){
		$('body').css('background-image', 'url(http://gaohr.win/img/background/bg-' + day + '.jpg)');
	} else {
		$('body').css('background-image', 'url()');
	}
	
	
	/*粒子特效*/
	ParticalEffect();
	
	/*鼠标点击特效*/
	var a_idx = 0;
   $("body").click(function(e) {
       var arrT = new Array("富强", "民主", "文明", "和谐", "自由", "平等", "公正" ,"法治", "爱国", "敬业", "诚信", "友善", "@斩之浪", "蹉跎的点线面");
       //var arrT = new Array("战疫", "中国加油", "坚持", "不松懈", "必胜", "@斩之浪", "淘宝店：蹉跎的点线面");
	   var $i = $("<span/>").text(arrT[a_idx]);a_idx = (a_idx + 1) % arrT.length;var x = e.pageX,y = e.pageY;$i.css({"z-index": 9999,"top": y - 20,"left": x,"position": "absolute","font-weight": "bold","color": "#f65","font-size": "1.2em"});$("body").append($i);$i.animate({"top": y - 180,"opacity": 0},2000,function() {$i.remove();});
   });
   
	/*百度自动推送*/
	$("body").append("<script>(function(){var bp = document.createElement('script');var curProtocol = window.location.protocol.split(':')[0];if (curProtocol === 'https') {bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';}else {bp.src = 'http://push.zhanzhang.baidu.com/push.js';}var s = document.getElementsByTagName(\"script\")[0];s.parentNode.insertBefore(bp, s);})();</script>");
	
	/*百度统计*/
	$("head").append("<script>var _hmt = _hmt || [];(function() {var hm = document.createElement('script');hm.src = 'https://hm.baidu.com/hm.js?7c81b8e214184b45986721bd426be652';var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(hm, s);})();</script>");
	
	// 滚动监听
	if($("#mainmenu").length > 0) {if($(window).width() > 900) {ScrollDivFixed('mainmenu', 180);}}
	if($("#topicmainmenu").length > 0) {if($(window).width() > 900) {ScrollDivFixed('topicmainmenu', 180);}}
	if($("#rightad").length > 0) {ScrollDivFixed('rightad', -160);}
	
	//Related links
	if($("#relatedlinks").length > 0) {
		$("#relatedlinks").html(Relatedlinks());
	}
	
	/*暂停右键功能*/
	//$(document).bind("contextmenu",function(e){
	//	//构建个性右键化菜单
	//	var arrT = new Array("啊哦，右键功能不能用");
	//	var $i = $("<span/>").text(arrT[a_idx]);a_idx = (a_idx + 1) % arrT.length;var x = e.pageX,y = e.pageY;$i.css({"z-index": 9999,"top": y - 20,"left": x,"position": "absolute","color": "#666","font-size": "1.em"});$("body").append($i);$i.animate({"top": y - 180,"opacity": 0},2000,function() {$i.remove();});
	//	return false;
	//});
	
	if($("#weather").length > 0) {
		Weather();
		CurrentTime();
	}
	
	// Comments
	if($("#comments").length > 0) {
		likeIt(600);
		$("#comments").append(Comments());
		gotoComment(600);
	}
		
	// Share
	if($("#shareit").length > 0) {
		$("#shareit").append(Share());
	}
		
	// Dashang
	if($("#dashang").length > 0) {
		Dashang();
	}
		
	// Warning
	if($("#warning").length > 0) {
		$("#warning").html(Warning());
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
		
	// Blog ad
	BlogAD();
		
	// Hot topics
	HotTopic();
	
});

// Functions ****************************** Functions
	
function ScrollDivFixed(id, h) {
	var div001 = $('#' + id);
	var pos_div =  div001.offset();// offset() 获得div1当前的位置，左上角坐标(x,y)
	$(window).scroll(function () { //滚动条滚动事件
		if ($(this).scrollTop() > pos_div.top + h) {
			div001.css('top', $(this).scrollTop() - pos_div.top - h);
		} else if ($(this).scrollTop() <=  pos_div.top ) {
			div001.css('position', 'relative').css('top', 0);
		}
	})
}
	
function Relatedlinks() {
	return "<ul class=\"blog-images\">" +
			"<li><a href=\"http://gaohr.win/site/chat/index.html\" target=\"_blank\" title=\"GIS大饼聊天室\"><img alt=\"GIS大饼聊天室\" src=\"img/images/chat.png\">GIS大饼聊天室</a></li><br>" +
			"<li><a href=\"https://shop196715718.taobao.com/\" target=\"_blank\" title=\"淘宝店铺：蹉跎的点线面\"><img alt=\"蹉跎的点线面\" src=\"img/images/cuotuoPPP.png\">蹉跎的点线面</a></li><br>" +
			"<li><a href=\"site/special/index.html\" target=\"\" title=\"专题栏目\"><img alt=\"专题栏目\" src=\"img/images/SpecialTopics.png\">专题栏目</a></li><br>" +
			"<li><a href=\"site/historytoday/index.html\" target=\"\" title=\"历史上的今天\"><img alt=\"历史上的今天\" src=\"img/images/History.png\">历史上的今天</a></li><br>" +
			"<li><a href=\"site/food/index.html\" target=\"_blank\" title=\"菜谱查询\"><img alt=\"菜谱查询\" src=\"img/images/food.png\">菜谱查询</a></li><br>" +
			"<li><a href=\"site/weixin/index.html\" target=\"_blank\" title=\"微信精选\"><img alt=\"微信精选\" src=\"img/images/Weixinhot.png\">微信精选</a></li><br>" +
			"<li><a href=\"https://zhulj.net\" target=\"_blank\" title=\"Liang-Jun Zhu\"><img alt=\"Liang-Jun Zhu\" src=\"img/images/ljzhu.png\">Liang-Jun Zhu</a></li><br>" +
			"<li><a href=\"http://wetlands.top\" target=\"_blank\" title=\"Wetland\"><img alt=\"Wetland\" src=\"img/images/Water.png\">Wetland专题</a></li><br>" +
			"<li><a href=\"http://jpliu.top\" target=\"_blank\" title=\"LiuJP\"><img alt=\"LiuJP\" src=\"img/images/LiuJP.png\">LiuJP主页</a></li><br>" +
			"</ul>";
}

function ClustrMaps() {
	$("#cltmap").html("<script type='text/javascript' id='clustrmaps' src='//cdn.clustrmaps.com/map_v2.js?cl=ffffff&w=200&t=tt&d=2MAtWut9LH7lh-B1sQLqIbylbTqh4tSwQyno2E1RAEQ&co=00365c&ct=ffffff&cmo=00bf00&cmn=cf2500'></script>");
	//$("#cltmap").html("<div class='row-fluid'><div class='span2'></div><div class='span8'><script type='text/javascript' id='clstr_globe' src='//cdn.clustrmaps.com/globe.js?d=2MAtWut9LH7lh-B1sQLqIbylbTqh4tSwQyno2E1RAEQ'></script></div><div class='span2'></div></div>");
}
	
function Weather() {
	$("#weather").html("GIS大饼 你我共享<br><div id='cur-time'></div>");
}
	
function CurrentTime() {
    var i=0;
    function curDate(){
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth()+1;
        var day = now.getDate();
        var hours = now.getHours();
        var minutes = now.getMinutes();
        var seconds = now.getSeconds();
 
        $("#cur-time").html("<span class='g-color-lightgreen' style='font-family:SimHei'><b>" + year + "年" + month.toString().padStart(2, '0') + "月" + day.toString().padStart(2, '0') + "日 " + hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0') + "</b></span>");
    }
    setInterval(curDate,1000);
}
	
function Copyright() {
	$("#copyright").html("<img class='footer-logo' src='http://gaohr.win/img/head.png' width='50'><a href='http://gaohr.win/Blogs.html'> 原创博客 </a><span>|</span><a href='http://gaohr.win/site/special/index.html'> 专题系列 </a><span>|</span><a href='http://gaohr.win/site/special/About.html'> 关于本站 </a><span>|</span><a href='http://gaohr.win/site/pages/pay/'> 支付页面 </a><span>|</span><a href='http://gaohr.win/site/pages/specialneeds/'> 数据定制 </a><div class='footer-text'><span> 在线时间 17:00-22:00 </span><span> 单位地址:北京市海淀区邓庄南路9号 </span><span> 联系邮箱:gispie@163.com </span></div><div class='footer-copy' id='copyright'>Copyright © 2016-2023 <a href='http://gaohr.win/' target='_blank'>GIS大饼 GaoHR个人博客 <img src='http://gaohr.win/img/head.png' width='12'></a> All Rights Reserved<br>Powered by <a href='https://github.com/' target='_blank'>GitHub <i class='icon-github-sign'></i></a></div>");
}

function Comments() {
	return "<div class=\"portlet\">" +
			"<p class=\"title\"><i class=\"icon-comments\"></i><b> 评论</b></p>" +
			"<p class=\"g-color-gray\">温馨提示：如遇评论系统图标显示异常，可将鼠标停留在图标片刻查看登录方式等</p>" +
			"<p class=\"g-color-red\">特别提示：<b>评论系统后台登录异常，评论回复可能不及时,如需即时沟通，可联系邮箱 gispie@163.com！（2020.10.31）</b></p>" +
			"<!-- 来必力City版安装代码 -->" +
			"<div id=\"lv-container\" data-id=\"city\" data-uid=\"MTAyMC8zNzkwMC8xNDQzMA==\">" +
			"<script type=\"text/javascript\">(function(d, s) {var j, e = d.getElementsByTagName(s)[0];if (typeof LivereTower === 'function') { return; }j = d.createElement(s);j.src = 'https://cdn-city.livere.com/js/embed.dist.js';j.async = true;e.parentNode.insertBefore(j, e);})(document, 'script');</script>" +
			"</div><!-- City版安装代码已完成 --></div>";
}

function Share() {
	window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"16"},"slide":{"type":"slide","bdImg":"4","bdPos":"right","bdTop":"100"}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];
}

function Dashang() {
	$("#dashang").html("<br><hr><span class='g-color-red'>点击打赏支持</span><div class=\"shang_img\"></div>" +
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
	$(".shang_img").click(function() {$(".tdcode").toggle(200);});
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
	return "<p class='blog-sub-title'><b>一些说明，请留意</b></p><hr><br><p><i class='icon-bullhorn g-text-bg g-color-red'></i> <span class='g-color-red'>*** </span>由于工作原因，可能白天不会及时回复邮件，但我会尽可能及时回复和处理的~~</p><p><i class='icon-bullhorn g-text-bg g-color-red'></i> <span class='g-color-red'>*** </span>最近邮件较多，有时可能会选择性回复，<b>邮件内容空白或表达不明确的一律不回哦 </b><i class='emo-bg emo-02-13'></i> <i class='emo-bg emo-02-13'></i> <i class='emo-bg emo-02-13'></i></p><hr><p><i class='icon-bullhorn g-text-bg g-color-red'></i> <span class='g-color-red'>*** </span>关注我的新浪微博吧 <a href='http://weibo.com/531239592' target='_blank'>@斩之浪 <i class='icon-sina emo-sm'></i></a></p><p><i class='icon-bullhorn g-text-bg g-color-red'></i> <span class='g-color-red'>*** </span>有网友说发了私信没回，我都几年没收到过私信了，可能是账号或什么设置问题，也可以在我的微博下评论留言。</p><br><hr><p class='g-color-red'> 原创博客，转载请注明来源 <b class='mywarning'>GIS大饼: http://gaohr.win</b></p>";
}
	
/*
const getIPs = (callback) => {var ip_dups = {};var RTCPeerConnection = window.RTCPeerConnection|| window.mozRTCPeerConnection|| window.webkitRTCPeerConnection;var useWebKit = !!window.webkitRTCPeerConnection;var mediaConstraints = {optional: [{ RtpDataChannels: true }]};var servers = {iceServers: [{ urls: "stun:stun.services.mozilla.com" },{ urls: "stun:stun.l.google.com:19302" },]};var pc = new RTCPeerConnection(servers, mediaConstraints);function handleCandidate(candidate) {var ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/var hasIp = ip_regex.exec(candidate)if (hasIp) {var ip_addr = ip_regex.exec(candidate)[1];if (ip_dups[ip_addr] === undefined)callback(ip_addr);ip_dups[ip_addr] = true;}}pc.onicecandidate = function (ice) {if (ice.candidate) {handleCandidate(ice.candidate.candidate);}};pc.createDataChannel("");pc.createOffer(function (result) {pc.setLocalDescription(result, function () { }, function () { });}, function () { });setTimeout(function () {var lines = pc.localDescription.sdp.split('\n');lines.forEach(function (line) {if (line.indexOf('a=candidate:') === 0)handleCandidate(line);});}, 1000);}
*/
	
function BlogAD() {
	const month = new Date().getMonth() + 1;
	const day = new Date().getDate();
	var warm_alert = warmAlert()
	$("#leftad").append("<p class='warm-alert'>" + warm_alert + "</p>");
	$("#rightad").append("<div id='rightad-con' style='margin:0 auto;padding:5px;background:rgba(255,255,255,0.75);box-shadow: 2px 4px 8px rgba(195,195,195,0.75);'>" +
							"<p class='ad-close' id='ad-close-right'><span></span></p>" +
							// "<div class=\"timer-container\"><p class='g-color-purple'>71周年国庆倒计时</p><div id=\"timer\" class=\"timer\"></div></div><br>" +
							// "<div class=\"timer-container\"><p class='g-color-black'>中华人民共和国<br>70周年华诞</p></div>" +
							"<a href='http://gaohr.win/site/chat/index.html' target='_blank'><img src='http://gaohr.win/site/chat/GISerchat.jpg'></a><hr>" +
							"<p><img src='http://gaohr.win/img/importantdays/left_ad_" + importantDays(month, day) + ".jpg'></p>" +
							//"<p class='ad-content'><span class='g-color-purple'><b>提供数据处理服务，联系QQ: 2783343898</b></span><hr><img src='http://gaohr.win/img/importantdays/left_ad_nCov2020.jpg'></p>" +
						"</div>");
	$("#rightad-con").show(500);
	$("#ad-close-right").click(function() {$("#rightad-con").hide(500);});
	/*const year = new Date().getFullYear();const firstOfOct = new Date(year, 9, 1).getTime();let timer = setInterval(function() {const today = new Date().getTime();const diff = firstOfOct - today;let days = Math.floor(diff / (1000 * 60 * 60 * 24));let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));let seconds = Math.floor((diff % (1000 * 60)) / 1000);$("#timer").html("<div class=\"days\"><div class=\"numbers\">" + days + "</div>天</div><div class=\"hours\"><div class=\"numbers\">" + hours + "</div>时</div><div class=\"minutes\"><div class=\"numbers\">" + minutes + "</div>分</div><div class=\"seconds\"><div class=\"numbers\">" + seconds + "</div>秒</div></div>");}, 1000);*/
}
	
function importantDays(month, day) {
	var re = "";
	switch(month + day / 100) {
		case 1.01:re = "Yuandan";break;case 1.10:re = "Police110";break;case 1.15:re = "GoHome";break;case 3.12:re = "Planting";break;case 4.05:re = "Qingming";break;case 5.01:re = "LaborDay";break;case 5.04:re = "YouthDay";break;case 5.09:re = "MothersDay";break;case 6.01:re = "Children";break;case 6.14:re = "Duanwu";break;case 7.01:re = "Jiangdang";break;case 7.07:re = "Lugouqiao";break;case 8.01:re = "Jianjun";break;case 9.10:re = "TeachersDay";break;case 9.18:re = "918";break;case 10.01:re = "Guoqing";break;case 10.02:re = "Zhongqiu";break;case 11.01:re = "AIDS";break;case 12.13:re = "Nanjing";break;case 12.26:re = "Maozhuxi";break;default:re = "GreatChina";
	}
	return re;
}
	
function warmAlert() {
	day = new Date( )
	nge_Hour = day.getHours( )
	var nge_warmprompt = "";
	if (nge_Hour == 0){nge_warmprompt = "现在已经过凌晨了，身体是无价的，早点休息吧！"}
	if (nge_Hour == 1){nge_warmprompt = "凌晨1点多了，工作是永远都做不完的，别熬坏身子！"}
	if (nge_Hour == 2){nge_warmprompt = "该休息了，身体可是革命的本钱啊！啊？！！"}
	if (nge_Hour == 3){nge_warmprompt = "夜深了，熬夜很容易导致身体内分泌失调，长痘痘的！"}
	if (nge_Hour == 4){nge_warmprompt = "四点了，你是起了还是没睡？？？"}
	if (nge_Hour == 5){nge_warmprompt = "凌晨5点的天空，你看看了吗？"}
	if (nge_Hour == 6){nge_warmprompt = "清晨好，这么早就来看啦，嘿嘿？"}
	if (nge_Hour == 7){nge_warmprompt = "新的一天又开始了，好好吃早饭!"}
	if (nge_Hour == 8){nge_warmprompt = "早上好，一天之际在于晨~"}
	if ((nge_Hour >= 9) && (nge_Hour <= 11)){nge_warmprompt = "上午好！好像没什么想说的！"}
	if ((nge_Hour == 12)){nge_warmprompt = "吃午饭啦！有什么好吃的？您有午休的习惯吗？小憩一会儿吧~"}
	if ((nge_Hour == 13)){nge_warmprompt = "下午好！今天工作、学习还顺利吧！"}
	if ((nge_Hour >= 14) && (nge_Hour < 15)){nge_warmprompt = "今天阳光很好，bug很少，走一圈活动活动吧！"}
	if ((nge_Hour >= 15) && (nge_Hour < 17)){nge_warmprompt = "又是一天中最犯困的时候，不要给自己太大压力！"}
	if ((nge_Hour == 17)){nge_warmprompt = "太阳落山了！快看看夕阳吧！如果没下雨的话 ^_^"}
	if ((nge_Hour == 18)){nge_warmprompt = "晚上好，今天的心情怎么样，来我的聊天室聊聊吧！"}
	if ((nge_Hour >= 19) && (nge_Hour < 21)){nge_warmprompt = "忙碌了一天，累了吧？玩个游戏，看个电影，放松下！"}
	if ((nge_Hour >= 21) && (nge_Hour <= 23)){nge_warmprompt = "这么晚了，还在上网？早点洗洗睡吧，睡前记得洗洗脸！"}
	return nge_warmprompt;
}
	
function HotTopic() {
	var curProtocol = window.location.protocol.split(':')[0]
	$("#others").append("<div class=\"notice\">" +
						"<ul id=\"notice01\" class=\"noticTipTxt\">" +
						"<li><a href=\"http://gaohr.win/site/blogs/2020/2020-08-10-china-villages.html\" target=\"_blank\">全国农村居民点矢量数据（2021更新） <img src=\"http://gaohr.win/img/others/hot001.gif\" width=\"22\"></a></li>" +
						"<li><a href=\"http://gaohr.win/site/blogs/2019/2019-12-10-baidu-map-poi-cn.html\" target=\"_blank\">全国城市兴趣点（POI） <img src=\"http://gaohr.win/img/others/hot001.gif\" width=\"22\"></a></li>" +
						"<li><a href=\"http://gaohr.win/site/blogs/2020/2020-02-20-china-roads.html\" target=\"_blank\">全国道路网矢量数据集 <img src=\"http://gaohr.win/img/others/hot001.gif\" width=\"22\"></a></li>" +
						"<li><a href=\"http://gaohr.win/About.html\" target=\"_blank\">本站数据共享说明 <img src=\"http://gaohr.win/img/others/hot001.gif\" width=\"22\"></a></li>" +
						"<li><a href=\"http://gaohr.win/site/special/2019/2019-09-14-dem-30m-cn.html\" target=\"_blank\">全国各省30m DEM数据免费下载 <img src=\"http://gaohr.win/img/others/hot001.gif\" width=\"22\"></a></li>" +
						"<li><a href=\"http://gaohr.win/site/blogs/2019/2019-08-20-china-daily-ground-climate-data-extraction.html\" target=\"_blank\">中国地面气候资料数据提取Python程序 <img src=\"http://gaohr.win/img/others/hot001.gif\" width=\"22\"></a></li>" +
						"<li><a href=\"http://gaohr.win/site/blogs/2019/2019-09-13-china-soil-type.html\" target=\"_blank\">中国土壤类型1km空间分布数据 <img src=\"http://gaohr.win/img/others/hot001.gif\" width=\"22\"></a></li>" +
						"<li><a href=\"http://gaohr.win/site/blogs/2017/2017-04-18-GIS-basic-data-of-China.html\" target=\"_blank\">中国国家基础地理信息数据打包下载 <img src=\"http://gaohr.win/img/others/hot001.gif\" width=\"22\"></a></li>" +
						"<li><a href=\"http://gaohr.win/site/special/2016/2016-05-11-agot-map.html\" target=\"_blank\">冰与火之歌：在线世界电子地图 <img src=\"http://gaohr.win/img/others/hot001.gif\" width=\"22\"></a></li>" +
						"<li><a href=\"http://gaohr.win/site/blogs/2019/2019-01-15-arcgis-mapping-ink.html\" target=\"_blank\">利用ArcGIS制作水墨山水画风格图 <img src=\"http://gaohr.win/img/others/hot001.gif\" width=\"22\"></a></li>" +
						"</ul></div><script type=\"text/javascript\" src=\"" + curProtocol + "://gaohr.win/js/scrolltext.js\"></script>");
	if($("#notice01").length > 0){var scrollup = new ScrollText("notice01");scrollup.LineHeight = 36;scrollup.Amount = 1;scrollup.Delay = 20;scrollup.Start();scrollup.Direction = "down";}
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
	var gotoTop_html = "<div id='gotoTop'><i class='icon-double-angle-up'></i></div>";
	$("#others").append(gotoTop_html);
	$("#gotoTop").click(
		function(){$('html,body').animate({scrollTop:0}, 600);
	}).hover(
		function(){$(this).addClass("hover");$("#gotoTop").html('返回<br>顶部');},
		function(){$(this).removeClass("hover");$("#gotoTop").html("<i class='icon-double-angle-up'></i>");
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
	
function gotoComment(min_height){
	var gotoTop_html = "<div id='gotoComment'><i class='icon-comments'></i></div>";
	$("#others").append(gotoTop_html);
	$("#gotoComment").click(
		function(){$('html,body').animate({scrollTop: $("#comments").offset().top}, 600);
	}).hover(
		function(){$(this).addClass("hover");$("#gotoComment").html('评论<br>留言');},
		function(){$(this).removeClass("hover");$("#gotoComment").html("<i class='icon-comments'></i>");
	});
	$(window).scroll(function(){
		var s = $(window).scrollTop();
		if(s > min_height){
			$("#gotoComment").fadeIn(100);
		}else{
			$("#gotoComment").fadeOut(500);
		};
	});
};
	
function likeIt(min_height){
	var likeIt_html = "<div id='likeIt'><i class='icon-heart'></i><br><span id='likeNum' class='g-color-red'>0</span></div>";
	$("#others").append(likeIt_html);
	var g_plike = 0;
	var cur_link = window.location.href;
	var cur_link_new = cur_link.split("//")[1];
	$.ajax({url:"http://123.56.254.70:8080/gispie/PageLike?do=0&link=null", async:false, success:function(res) {g_plike = parseInt(res)}});
	$("#likeNum").html(g_plike);
	
	$("#likeIt").click(function(e){
		var $i = $("<span/>").text("♥ +1");var x = e.pageX,y = e.pageY;$i.css({"z-index": 9999,"top": y - 20,"left": x,"position": "absolute","font-weight": "bold","color": "#f00","font-size": "2em"});$("body").append($i);$i.animate({"top": y - 120,"opacity": 0},3000,function() {$i.remove();});
		$.ajax({url:"http://123.56.254.70:8080/gispie/PageLike?do=1&link=" + encodeURI(encodeURI(cur_link_new)), async:false, success:function(res) {g_plike = parseInt(res)}});
		$("#likeNum").html(g_plike);
		
	});
	$(window).scroll(function(){
		var s = $(window).scrollTop();
		if(s > min_height){
			$("#likeIt").fadeIn(100);
		}else{
			$("#likeIt").fadeOut(500);
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
	$("#head-tool").append(search_html);
	
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
	// 统计

	var g_pv = 0;
	var cur_link = window.location.href;
	var cur_link_new = cur_link.split("//")[1];
	console.log(cur_link_new);
	$.ajax({url:"http://123.56.254.70:8080/gispie/PageView?link=" + encodeURI(encodeURI(cur_link_new)), async:false, success:function(res) {g_pv = parseInt(res)}});
	
	if($(".blogtopinfo").length > 0) {
		$(".blogtopinfo").append("<span style='margin-left:10px;'><i class='icon-eye-open'></i> 本文阅读量 <b><span class='g-color-green'>" + g_pv + "</span></b></span><br><hr>");
	}
	if($(".topictopinfo").length > 0) {
		$(".topictopinfo").append("<span style='margin-left:10px;'>专题访问量 <b><span class='g-color-green'>" + g_pv + "</span></b></span>");
	}
	
	// busuanzi
	$("body").append("<script async src='//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js'></script>");

	/*
	if($(".blogtopinfo").length > 0) {
		$(".blogtopinfo").append("<span id='busuanzi_container_page_pv' style='margin-left:10px;'><i class='icon-eye-open'></i> 本文阅读量 <b><span class='g-color-green' id='busuanzi_value_page_pv'></span></b> </span><br><hr>");
	}
	if($(".topictopinfo").length > 0) {
		$(".topictopinfo").append("<span id='busuanzi_container_page_pv' style='margin-left:10px;'>专题访问量 <b><span class='g-color-green' id='busuanzi_value_page_pv'></span></b></span>");
	}
	*/

}
	
function ParticalEffect() {
	$(".mainlogo").append("<div id='particle-effect' style='position:fixed;top:0;left:0;right:0;height:60px;z-index:-1'></div><script type=\"text/javascript\" src=\"http://gaohr.win/js/particaleffect.js\"></script>")
}
