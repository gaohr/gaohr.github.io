/*
*Load recent blogs to right sider
*GaoHR
*2016-04-19
*/

// $(document).ready(function() {
	
	//load menu
	$("#mainmenu").html("<div class=\"menulist\">" +
					"<div class=\"btn-group\">" +
						"<ul class=\"nav nav-pills\">" +
							"<li class=\"dropdown\">" +
								"<a class=\"dropdown-toggle\"data-toggle=\"dropdown\"href=\"#\"><i class=\"icon-list\"></i></a>" +
								"<ul class=\"dropdown-menu\">" +
									"<li><a href=\"../../../index.html\"><i class=\"icon-home\"></i></a></li>" +
									"<li><a href=\"../../../Blogs.html\">博客</a></li>" +
									"<li><a href=\"../../skills/index.html\">图谱</a></li>" +
									"<li><a href=\"../../special/index.html\">专题</a></li>" +
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
					"<i class=\"icon-user\">&nbsp;&nbsp;小浪</i>" +
				"</div>" +
				"<!-- Navigation -->" +
				"<div class=\"svg-wrapper\">" +
					"<span class=\"svg\"><svg height=\"40\" width=\"150\" xmlns=\"http://www.w3.org/2000/svg\"><rect id=\"shape\" height=\"40\" width=\"150\"></rect></svg></span>" +
					"<div id=\"text\"><a href=\"../../../index.html\"><span class=\"spot\"></span><i class=\"icon-home\"></i></a></div>" +
				"</div>" +
				"<div class=\"sider-menu centerer-menu wrap-menu\">" +
					"<a href=\"../../../Blogs.html\" class=\"btn-menu menu-active\">博客</a>" +
					"<a href=\"../../skills/index.html\" class=\"btn-menu\">图谱</a>" +
					"<a href=\"../../special/index.html\" class=\"btn-menu\">专题</a>" +
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
	var blogs = eval('bloglist');
	//for(i = 0; i < blogs.length; i++) {
	for(i = 0; i < 3; i++) {
		var tags = readtags(i);
		$("#blogs").append(addblog(blogs,i,tags));
		var blogid = $("#blogid").val();
		if(blogs[i].blogid == blogid) {
			$("#blogtopinfo").append("[" + blogs[i].date + "]&nbsp;&nbsp;&nbsp; <i class='icon-user'></i> " + blogs[i].author + "&nbsp;&nbsp;&nbsp; <i class='icon-tags'></i>" + tags + "<br><hr>");
		}
		
	}	
	//add Blog
	function addblog(blogs,n,tags) {
		var blogcon = "<div class='blog-article'>" +
			"<a href='" + blogs[n].href + "' class='blog-title' style='font-size:1.0em'>" + blogs[n].title + "</a><br><br>" +
			"</div>" +
			"<div class='blog-tag-data'>" +
			"<a href='" + blogs[n].href + "'><img src='../../../" + blogs[n].img + "' class='blog-img' style='width:60%;'></a>" +
			"<ul class='unstyled inline' style='font-size:9px'>" +
			//"<li type='circle' class='pull-left'><i class='icon-calendar'></i> <a href='#'>" + blogs[n].date + "</a></li>" +
			"</ul>" +
			"<ul class='unstyled inline blog-tags' style='font-size:9px'>" +
			"<li type='circle'>" +
			"<i class='icon-tags'></i>" + tags +
			"</li>" +
			"</ul>" +
			"</div>" +
			//"<a class='btn-blue' href='../../../" + blogs[n].href + "'>Read more <i class='icon-circle-arrow-right'></i></a>" +
			"<hr>";
			return blogcon;
	}
	
	function readtags(n) {
		tagslist = "";
		for(t = 0; t < blogs[n].tags.length; t++) {
			tagslist += "<a href='#' style='font-size:9px !important'>" + blogs[n].tags[t] + "</a>";
		}
		return tagslist;
	}
	
// });
	
	
	
	
	
	
	
	