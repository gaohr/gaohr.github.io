/*
*Load recent blogs to right sider
*GaoHR
*2016-04-19
*/

// $(document).ready(function() {
	//load menu
	$("#mainmenu").html("<div class='menulist'>" +
					"<div class='btn-group'>" +
						"<ul class='nav nav-pills'>" +
							"<li class='dropdown'>" +
								"<a class='dropdown-toggle data-toggle='dropdown' href='#'><i class='icon-list'></i></a>" +
								"<ul class='dropdown-menu'>" +
									"<li><a href='../../../index.html'><i class='icon-home'></i></a></li>" +
									"<li><a href='../../../Blogs.html'>博客</a></li>" +
									"<li><a href='../../special/index.html'>专题</a></li>" +
									"<li class='divider'></li>" +
									"<li><a href='../../../About.html'>关于</a></li>" +
									"<li><a href='../../../Contact.html'>留言</a></li>" +
								"</ul>" +
							"</li>" +
						"</ul>" +
					"</div>" +
				"</div>" +
				"<div class='sider-bar'>" +
				"<div class='host'>" +
					"<img src='http://gaohr.win/img/blog_logo_main.png'><br><br>" +
				"</div>" +
				"<!-- Navigation -->" +
				"<div class='svg-wrapper'>" +
					"<span class='svg'><svg height='40' width='150' xmlns='http://www.w3.org/2000/svg'><rect id='shape' height='40' width='150'></rect></svg></span>" +
					"<div id='text'><a href='../../../index.html'><span class='spot'></span><i class='icon-home'></i></a></div>" +
				"</div>" +
				"<div class='sider-menu centerer-menu wrap-menu'>" +
					"<a href='../../../Blogs.html' class='btn-menu menu-active'>博客</a>" +
					"<a href='../../special/index.html' class='btn-menu'>专题</a>" +
					"<a href='../../../About.html' class='btn-menu'>关于</a>" +
					"<a href='../../../Contact.html' class='btn-menu'>留言</a>" +
				"</div>" +
				"<hr>" +
				"<div class='links'>" +
					"<a href='http://weibo.com/531239592' target='_blank' class='weibo' style='margin:2px'><i class='icon-weibo'></i></a>" +
					"<a href='https://github.com/gaohr' target='_blank' class='github' style='margin:2px'><i class='icon-github-sign'></i></a>" +
					"<a href='###' target='_blank' class='google' style='margin:2px'><i class=' icon-google-plus-sign'></i></a>" +
					"<a href='###' target='_blank' class='fb' style='margin:2px'><i class='icon-facebook-sign'></i></a>" +
					"<a href='###' target='_blank' class='twitter' style='margin:2px'><i class='icon-twitter-sign'></i></a>" +
				"</div>" +
				"<hr>" +
				"<div id='cltmap' class='cltmap'></div>" +
				"<div id='leftad' class='leftad'></div>" +
			"</div>");
			
	// 在正文中添加作者等信息
	for(i = 0; i < bloglist.length; i++) {
		var blogid = $("#blogid").val();
		if(bloglist[i].blogid == blogid) {
			var tags = readtags(i);
			$("#blogtopinfo").append("<i class='icon-user'></i> " + bloglist[i].author + "&nbsp;&nbsp;&nbsp; [" + bloglist[i].date + "]&nbsp;&nbsp;&nbsp; <i class='icon-tags'></i>" + tags);
		}
	}
	
	// 在侧栏中添加最新博客信息
	for(i = 0; i < 5; i++) {
		$("#blogs").append(addblog_right(bloglist,i));
	}
	
	function readtags(n) {
		tagslist = "";
		for(t = 0; t < bloglist[n].tags.length; t++) {
			tagslist += "<a href='#'>" + bloglist[n].tags[t] + "</a>";
		}
		return tagslist;
	}
	
	//add blog info to right side
	function addblog_right(bloglist,n) {
		var blogcon = "<div class='blog-article'>" +
			"<a href='" + bloglist[n].href + "' class='blog-title' style='font-size:1.1em;line-height:12px;'><span class='bg-black g-color-white' style='padding:0 2px;border-radius:2px;'>" + bloglist[n].type + "</span>&nbsp;<span class='hover-blue'>" + bloglist[n].title + "</span></a>" +
			"</div><hr>";
			return blogcon;
	}
	
// });
	
// 滚动监听
ScrollDivFixed('blogs', 160);
	
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
	
	
	
	