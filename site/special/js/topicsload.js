/*
*Load topics
*GaoHR
*2016-05-08
*/

// $(document).ready(function() {
	//load menu
	$("#mainmenu").html("<div class='menulist'>" +
					"<div class='btn-group'>" +
						"<ul class='nav nav-pills'>" +
							"<li class='dropdown'>" +
								"<a class='dropdown-toggle' data-toggle='dropdown' href='#'><i class='icon-list'></i></a>" +
								"<ul class='dropdown-menu'>" +
									"<li><a href='../../index.html'><i class='icon-home'></i></a></li>" +
									"<li><a href='../../Blogs.html'>博客</a></li>" +
									"<li><a href='../special/index.html'>专题</a></li>" +
									"<li class='divider'></li>" +
									"<li><a href='../../About.html'>关于</a></li>" +
									"<li><a href='../../Contact.html'>留言</a></li>" +
								"</ul>" +
							"</li>" +
						"</ul>" +
					"</div>" +
				"</div>" +
				"<div class='sider-bar'>" +
				"<div class='host'>" +
					"<img src='../../img/mainicon.png' class='img-rounded'><br><br>" +
					"<i class='icon-user'>&nbsp;&nbsp;GaoHR个人博客</i>" +
				"</div>" +
				"<!-- Navigation -->" +
				"<div class='svg-wrapper'>" +
					"<span class='svg'><svg height='40' width='150' xmlns='http://www.w3.org/2000/svg'><rect id='shape' height='40' width='150'></rect></svg></span>" +
					"<div id='text'><a href='../../index.html'><span class='spot'></span><i class='icon-home'></i></a></div>" +
				"</div>" +
				"<div class='sider-menu centerer-menu wrap-menu'>" +
					"<a href='../../Blogs.html' class='btn-menu'>博客</a>" +
					"<a href='../special/index.html' class='btn-menu menu-active'>专题</a>" +
					"<a href='../../About.html' class='btn-menu'>关于</a>" +
					"<a href='../../Contact.html' class='btn-menu'>留言</a>" +
				"</div>" +
				"<hr>" +
				"<div class='links'>" +
					"<a href='http://weibo.com/531239592' target='_blank' class='weibo' style='margin:2px'><i class='icon-weibo'></i></a>" +
					"<a href='https://github.com/gaohr' target='_blank' class='github' style='margin:2px'><i class='icon-github-sign'></i></a>" +
					"<a href='###' target='_blank' class='google' style='margin:2px'><i class='icon-google-plus-sign'></i></a>" +
					"<a href='###' target='_blank' class='fb' style='margin:2px'><i class='icon-facebook-sign'></i></a>" +
					"<a href='###' target='_blank' class='twitter' style='margin:2px'><i class='icon-twitter-sign'></i></a>" +
				"</div>" +
				"<hr>" +
				"<div id='cltmap' class='cltmap'></div>" +
				"<div id='leftad' class='leftad'></div>" +
			"</div>");
			
	for(var t = 0; t < topicslist.length; t++) {
		$("#topics").append(
			"<div class='topic'>" +
				"<a href='" + topicslist[t].href + "'><img src='" + topicslist[t].img + "' title='" + topicslist[t].content + "'></a>" +
				"<a href='" + topicslist[t].href + "'><p>" + topicslist[t].title + "</p></a>" +
				"<span class=\"topic-con\">" + topicslist[t].content + "</span>" +
				"<span class=\"topic-type\">" + topicslist[t].type + "</span>" +
			"</div>"
		);
		//All topics
		$("#alltopics").append(
			"<a href='" + topicslist[t].href + "'><p><span class=\"alltopics-type\">" + topicslist[t].type + "</span> " + topicslist[t].title + "</p></a>"
		);
	}
	
	$("#topicmainmenu").html("<div class=\"menulist\">" +
					"<div class=\"btn-group\">" +
						"<ul class=\"nav nav-pills\">" +
							"<li class=\"dropdown\">" +
								"<a class=\"dropdown-toggle\"data-toggle=\"dropdown\"href=\"#\"><i class=\"icon-list\"></i></a>" +
								"<ul class=\"dropdown-menu\">" +
									"<li><a href=\"../../../index.html\"><i class=\"icon-home\"></i></a></li>" +
									"<li><a href=\"../../../Blogs.html\">博客</a></li>" +
									"<li><a href=\"../../../special/index.html\">专题</a></li>" +
									"<li class=\"divider\"></li>" +
									"<li><a href=\"../../../About.html\">关于</a></li>" +
									"<li><a href=\"../../../Contact.html\">留言</a></li>" +
								"</ul>" +
							"</li>" +
						"</ul>" +
					"</div>" +
				"</div>" +
				"<div class=\"sider-bar\">" +
				"<div class=\"host\">" +
					"<img src=\"../../../img/mainicon.png\" class=\"img-rounded\"><br><br>" +
					"<i class=\"icon-user\">&nbsp;&nbsp;GaoHR个人博客</i>" +
				"</div>" +
				"<!-- Navigation -->" +
				"<div class=\"svg-wrapper\">" +
					"<span class=\"svg\"><svg height=\"40\" width=\"150\" xmlns=\"http://www.w3.org/2000/svg\"><rect id=\"shape\" height=\"40\" width=\"150\"></rect></svg></span>" +
					"<div id=\"text\"><a href=\"../../../index.html\"><span class=\"spot\"></span><i class=\"icon-home\"></i></a></div>" +
				"</div>" +
				"<div class=\"sider-menu centerer-menu wrap-menu\">" +
					"<a href=\"../../../Blogs.html\" class=\"btn-menu\">博客</a>" +
					"<a href=\"../../special/index.html\" class=\"btn-menu menu-active\">专题</a>" +
					"<a href=\"../../../About.html\" class=\"btn-menu\">关于</a>" +
					"<a href=\"../../../Contact.html\" class=\"btn-menu\">留言</a>" +
				"</div>" +
				"<hr>" +
				"<div class=\"links\">" +
					"<a href=\"http://weibo.com/531239592\" target=\"_blank\" class=\"weibo\" style=\"margin:2px\"><i class=\"icon-weibo\"></i></a>" +
					"<a href=\"https://github.com/gaohr\" target=\"_blank\" class=\"github\" style=\"margin:2px\"><i class=\"icon-github-sign\"></i></a>" +
					"<a href=\"###\" target=\"_blank\" class=\"google\" style=\"margin:2px\"><i class=\" icon-google-plus-sign\"></i></a>" +
					"<a href=\"###\" target=\"_blank\" class=\"fb\" style=\"margin:2px\"><i class=\"icon-facebook-sign\"></i></a>" +
					"<a href=\"###\" target=\"_blank\" class=\"twitter\" style=\"margin:2px\"><i class=\"icon-twitter-sign\"></i></a>" +
				"</div>" +
				"<hr>" +
				"<div id=\"cltmap\" class=\"cltmap\"></div>" +
			"</div>");
	tn = 0
	if(topicslist.length < 10) {
		tn = topicslist.length;
	} else {
		tn = 10
	}
	for(tr = 0; tr < tn; tr++) {
		$("#topics-right").append(
			"<div class='alltopics'>" +
				"<a href='" + topicslist[tr].href + "'><p><span class=\"alltopics-type\">" + topicslist[tr].type + "</span> " + topicslist[tr].title + "</p></a>" +
			"</div>"
		);
	}
//})
	
	
	
	
	
	
	
	
	
	