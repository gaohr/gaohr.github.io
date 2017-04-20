function loadmore(a){function b(a){!a&&(a="加载数据失败"),alert(a)}function c(c){
	if(c&&"000000"===c.status){
	var d=c;0==d.detail.length&&(maxid=minid="");
$("#content").empty();
for(var e=0;e<d.detail.length;e++) {
	(!maxid||maxid<d.detail[e].xhid)&&(maxid=d.detail[e].xhid),
	(!minid||minid>d.detail[e].xhid)&&(minid=d.detail[e].xhid),
	createRecord(d.detail[e].author,d.detail[e].content,d.detail[e].picUrl);
}
a={maxXhid:maxid?maxid:"",minXhid:minid?minid:"",size:"4"},
setStorage(localParamName,a)
}else{
	var f;
	c&&(f=c.desc),b(f)
}
}
$.ajax({
	url:"http://api.1-blog.com/biz/bizserver/xiaohua/list.do",
	data:a,
	method:"POST",
	timeout:5e3,
	error:function(){b(),loading=!1},
	success:function(a){c(a),loading=!1}
})
}
function createRecord(a,b,c){
	var d=$("#content"),e=$("<div />",{"class":"xhitem",});
	var g=$("<div />",{"class":"xhcontent"});
	if(g.className="xhcontent",g.html(b),e.append(g),c){
		var h=$("<div />",{"class":"xhpic"});
		h.className="xhpic",
		h.html('<img src="'+c+'">'),
		e.append(h)
	}
	if(a){
		var f=$("<div />",{"class":"xhauthor"});
		f.className="xhauthor",
		f.html("<span style='width:30%'>作者：</span>"+a),
		e.append(f)
	}
	d.append(e)
}
	var loading=!1,localParamName="joker_ajaxParam",
	urlParam=getStorage(localParamName),maxid,minid;
	urlParam&&urlParam.maxXhid&&(maxid=urlParam.maxXhid),
	urlParam&&urlParam.minXhid&&(minid=urlParam.minXhid),
	Zepto(function(a){function b(a){d=a.touches[0].clientX,e=a.touches[0].clientY}
	function c(b){e-b.touches[0].clientY>20&&document.body.clientHeight-document.body.scrollTop<window.screen.availHeight&&a("#loadmore").click()}
	a("#loadmore").on("click",function(){if(!loading){loading=!0;
	var a=getStorage(localParamName);
	a||(a={maxXhid:maxid?maxid:"",minXhid:minid?minid:"",size:"4"}),loadmore(a)}}),"scroll"in window&&a("#loadmore").text("再来");
	var d,e;
	if("createTouch"in document){{document.getElementById("content")}a("#content").on("touchstart",b),a("#content").on("touchmove",c)}a("#loadmore").click()});
