/*
*Common Elements
*GaoHR
*2016-04-21
*/

//Related links
$("#relatedlinks").html("<ul class=\"blog-images\">" +
							"<li><a href=\"site/special/index.html\" target=\"\" title=\"专题栏目\"><img alt=\"\" src=\"img/images/SpecialTopics.png\">专题栏目</a></li><br>" +
							"<li><a href=\"site/zhihu/index.html\" target=\"_blank\" title=\"知乎热门\"><img alt=\"\" src=\"img/images/zhihu.png\">知乎热门</a></li><br>" +
							"<li><a href=\"site/music/index.html\" target=\"_blank\" title=\"音乐盒\"><img alt=\"\" src=\"img/images/music.png\">音乐盒:休闲时光</a></li><br>" +
							"<li><a href=\"site/skills/index.html\" target=\"_blank\" title=\"技能图谱\"><img alt=\"\" src=\"img/images/skills.png\">技能图谱</a></li><br>" +
							"<li><a href=\"site/turing/index.html\" target=\"_blank\" title=\"图灵机器人\"><img alt=\"\" src=\"img/images/turing.png\">图灵-对话机器人</a></li><br>" +
							"<li><a href=\"site/food/index.html\" target=\"_blank\" title=\"菜谱查询\"><img alt=\"\" src=\"img/images/food.png\">菜谱查询</a></li><br>" +
							"<li><a href=\"site/weixin/index.html\" target=\"_blank\" title=\"微信精选\"><img alt=\"\" src=\"img/images/Weixinhot.png\">微信精选</a></li><br>" +
							"<li><a href=\"site/natgeo/index.html\" target=\"_blank\" title=\"国家地理百年典藏\"><img alt=\"\" src=\"img/images/NationalGeo.png\">国家地理百年典藏</a></li><br>" +
							"<li><a href=\"site/war2/index.html\" target=\"_blank\" title=\"二战全史\"><img alt=\"\" src=\"img/images/BBCWar2.png\">二战全史</a></li><br>" +
							"<li><a href=\"site/graph/index.html\" target=\"_blank\" title=\"函数绘图\"><img alt=\"\" src=\"img/images/Graph.png\">函数绘图</a></li><br>" +
							"<li><a href=\"site/rainbowposter/index.html\" target=\"_blank\" title=\"制作彩虹特效图片\"><img alt=\"\" src=\"img/images/RainbowPoster.png\">彩虹特效图片</a></li><br>" +
							"<li><a href=\"http://remotesensing.top/\" target=\"_blank\" title=\"Remote Sensing\"><img alt=\"\" src=\"img/images/RS_Yi_logo.png\">RemoteSensing.TOP</a></li><br>" +
							"</ul>");
	
// ClustrMaps
$("#cltmap").html("<script type=\"text/javascript\" id=\"clustrmaps\" src=\"//cdn.clustrmaps.com/map_v2.js?cl=ffffff&w=a&t=tt&d=2MAtWut9LH7lh-B1sQLqIbylbTqh4tSwQyno2E1RAEQ&cmo=cf2500&cmn=00bf00&co=00365c\"></script>");
	
// Comments
$("#comments").html("");
	
// Da shang
$("#dashang").append("<br><hr><div class=\"shang_img\"></div>" +
					"<span class=\"tdcode\">" +
						"<img src=\"http://gaohr.win/img/pay/alipay.png\">" +
						"<img src=\"http://gaohr.win/img/pay/wechat.png\">" +
					"</span><br>" + 
					"<span class=\"paylist\"></span>");
$(".shang_img").hover(function(){
    $(".shang_img").css("background-image","url(http://gaohr.win/img/pay/shang_hover.png)");
},function(){
    $(".shang_img").css("background-image","url(http://gaohr.win/img/pay/shang.png)");
});
$(".shang_img").click(function() {
	$(".tdcode").toggle(500);
});
var pays = eval('paylist');
for(i = 0; i < pays.length; i++) {
	$(".paylist").append(
		"<p><i class=\"icon-heart\"></i><span class=\"name\">" + pays[i].name + "</span>打赏了<span class=\"money\">￥<b>" + pays[i].amount + "</b>元</span><i class=\"date\">" + pays[i].date + "</i><span class=\"msg\" id=\"msg\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"" + pays[i].msg + "\"><i class=\"icon-comment\"></i></span></p>"
)};
$('#msg').tooltip();
	
// Copyright
$("#copyright").html("<hr><br>Copyright © 2016-2018 Gao Huiran");
	
	
	
	
	
	
	
	
	
	
	
	