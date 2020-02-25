/*
*Load recent blogs
*GaoHR
*2016-04-16
*/
$(document).ready(function() {
	//blog
	var blogs_index = "";
	for(i = 0; i < 8; i++) {
		var tags = readtags(i);
		blogs_index += "<div class='row-fluid'>" +
			"<div class='span12 blog-article'>" +
			"<a href='" + bloglist[i].href + "' class='blog-title'><i class='icon-bookmark'></i> " + bloglist[i].title + "</a>" +
			"<a href='Blogs.html#" + blogtype(bloglist[i].type) + "' class='blog-type'>[ " + bloglist[i].type + " ]</a>" +
			"<div class='row-fluid'>" +
			"<div class='span2 blog-tag-data'>" +
			"<img src='" + bloglist[i].img + "' class='blog-img' style='width:80%;margin-left:10%'>" +
			"<ul class='unstyled inline'>" +
			"<li type='circle' class='pull-left'><i class='icon-calendar'></i> <a href='#'>" + bloglist[i].date + "</a></li>" +
			"</ul><br><br>" +
			"</div>" +
			"<div class='span10'>" +
			"<p>" + bloglist[i].content + "</p>" +
			"<a class='btn-blue pull-right readmore' href='" + bloglist[i].href + "'>阅读更多 <i class='icon-circle-arrow-right'></i></a>" +
			"</div>" +
			"</div>" +
			"</div>" +
			"</div><hr>";
	}
	blogs_index += "<div class='text-center g-color-gray g-text-bg'><a href='Blogs.html' class='btn-default btn-block'><b>>>> 点 击 阅 读 更 多 博 客 <<<</b></a></div>"
	$("#blog").append(blogs_index);
	
	//Blogs
	for(i = 0; i < bloglist.length; i++) {
		var tags = readtags(i);
		$("#allblogs").append(addblog(bloglist,i,tags));
		if(bloglist[i].type == "专业技术") {
			$("#technology").append(addblog(bloglist,i,tags));
		} else if(bloglist[i].type == "数据资源") {
			$("#geodata").append(addblog(bloglist,i,tags));
		} else if(bloglist[i].type == "随笔小记") {
			$("#prose").append(addblog(bloglist,i,tags));
		} else if(bloglist[i].type == "奇闻趣问") {
			$("#interest").append(addblog(bloglist,i,tags));
		} else {}
	}	

	//Blog tags
	var tagscon = "";
	var tagsarr = [];  //put tags into array
	var tagnum = [];  //same tags numeber and index
	for(i = 0; i < bloglist.length; i++) {
		for(t = 0; t < bloglist[i].tags.length; t++) {
			var has = tagsarr.indexOf(bloglist[i].tags[t]);
			if(has == "-1") {
				tagsarr.push(bloglist[i].tags[t]);
			} else {
				if(tagnum[has] == undefined) {
						tagnum[has] = 2;
					} else {
						tagnum[has]++;
					}
			}
		}
	}
	for(j = 0; j < tagsarr.length; j++) {
		tagscon += "<li><a href='###' onclick=\"getBlogs('" + tagsarr[j] + "')\" style='font-size:" + (12 + tagssize(tagnum[j])) + "px'><i class='icon-tag'></i> " + tagsarr[j] + "</a></li>";
	}
	$("#tags").append(tagscon);
	$("#tags").append("<br><li><a href='###' onclick=\"getAllBlogs()\" style='font-size:16px;'>显示全部</a></li>");
	
	//Topics
	if($("#topics")) {
		for(t = 0; t < 8; t++) {
			if(t == 4) {
				$("#topics").append("<br>");
			}
			$("#topics").append(
				"<div class='topicbody'>" +
					"<a href='" + topicslist[t].href + "' title='" + topicslist[t].title + "'>" +
						"<img src='site/special/" + topicslist[t].img + "'>" +
						"<p><b>" + topicslist[t].title + "</b></p>" +
					"</a>" +
					"<span class=\"topicbody-con\">" + topicslist[t].content + "</span>" +
					"<span class=\"topicbody-type\">" + topicslist[t].type + "</span>" +
				"</div>");
		}
	}
})
	
//add Blog
function addblog(bloglist,n,tags) {
	var blogcon = "<div class='row-fluid'>" +
		"<div class='span3 blog-tag-data'>" +
		"<img src='" + bloglist[n].img + "' class='blog-img'>" +
		"<ul class='unstyled inline'>" +
		"<li type='circle' class='pull-left'><i class='icon-calendar'></i> <a href='#'>" + bloglist[n].date + "</a></li>" +
		"<li type='circle'><i class='icon-comments'></i> <a href='" + bloglist[n].href + "#cloud-tie-wrapper'><span>Comments</span></a></li>" +
		"</ul>" +
		"</div>" +
		"<div class='span9 blog-article'>" +
		"<a href='" + bloglist[n].href + "' class='blog-title'>" + bloglist[n].title + "</a>" +
		"<ul class='unstyled inline blog-tags pull-right'>" +
		"<li>" +
		"<i class='icon-tags'></i>" + tags +
		"</li>" +
		"</ul>" +
		"<p>" + bloglist[n].content + "</p>" +
		"<a class='btn-blue btn-mini pull-right readmore' href='" + bloglist[n].href + "'>阅读更多 <i class='icon-circle-arrow-right'></i></a>" +
		"</div>" +
		"</div>" +
		"<hr>";
		return blogcon;
}
	
function readtags(n) {
	tagslist = "";
	for(t = 0; t < bloglist[n].tags.length; t++) {
		tagslist += "<a href='###' style='font-size:9px'>" + bloglist[n].tags[t] + "</a>";
	}
	return tagslist;
}
	
function blogtype(type) {
	if(type == "专业技术") {
		return "tab_4_2";
	} else if(type == "数据资源") {
		return "tab_4_3";
	} else if(type == "随笔小记") {
		return "tab_4_4";
	} else if(type == "奇闻趣问") {
		return "tab_4_5";
	} else {}
}
	
//判断并确定标签大小
function tagssize(n) {
	if(n == undefined) {
		return 0;
	} else {
		return n * 2;
	}
}
	
	
// 通过标签显示博客
function getBlogs(tag) {
	$("#allblogs").html("");
	$("#technology").html("");
	$("#prose").html("");
	$("#geodata").html("");
	$("#interest").html("");
	for(i = 0; i < bloglist.length; i++) {
		var tags = readtags(i);
		for(t = 0; t < bloglist[i].tags.length; t++) {
			if(bloglist[i].tags[t] == tag) {
				$("#allblogs").append(addblog(bloglist,i,tags));
				if(bloglist[i].type == "专业技术") {
					$("#technology").append(addblog(bloglist,i,tags));
				} else if(bloglist[i].type == "数据资源") {
					$("#geodata").append(addblog(bloglist,i,tags));
				} else if(bloglist[i].type == "随笔小记") {
					$("#prose").append(addblog(bloglist,i,tags));
				} else if(bloglist[i].type == "奇闻趣问") {
					$("#interest").append(addblog(bloglist,i,tags));
				} else {}
				break;
			}
		}
	}
}
	
function getAllBlogs() {
	$("#allblogs").html("");
	$("#technology").html("");
	$("#prose").html("");
	$("#geodata").html("");
	$("#interest").html("");
	for(i = 0; i < bloglist.length; i++) {
		var tags = readtags(i);
		$("#allblogs").append(addblog(bloglist,i,tags));
		if(bloglist[i].type == "专业技术") {
			$("#technology").append(addblog(bloglist,i,tags));
		} else if(bloglist[i].type == "数据资源") {
			$("#geodata").append(addblog(bloglist,i,tags));
		} else if(bloglist[i].type == "随笔小记") {
			$("#prose").append(addblog(bloglist,i,tags));
		} else if(bloglist[i].type == "奇闻趣问") {
			$("#interest").append(addblog(bloglist,i,tags));
		} else {}
	}
}
	
var check = [1, 0, 0, 0, 0]
$("#icon-blog-all").click (function () {
	check = [1, 0, 0, 0, 0];
})
$("#icon-blog-tech").click (function () {
	check = [0, 1, 0, 0, 0];
})
$("#icon-blog-data").click (function () {
	check = [0, 0, 1, 0, 0];
})
$("#icon-blog-prose").click (function () {
	check = [0, 0, 0, 1, 0];
})
$("#icon-blog-interest").click (function () {
	check = [0, 0, 0, 0, 1];
})
	
$("#icon-blog-all").hover(
	function () {
		if(!check[0]) {
			$(this).attr("src", "img/others/blog_type_all_check.png");
		}
	},
	function () {
		if(!check[0]) {
			$(this).attr("src", "img/others/blog_type_all.png");
		}
	}
);
	
$("#icon-blog-tech").hover(
	function () {
		if(!check[1]) {
			$(this).attr("src", "img/others/blog_type_tech_check.png");
		}
	},
	function () {
		if(!check[1]) {
			$(this).attr("src", "img/others/blog_type_tech.png");
		}
	}
);
	
$("#icon-blog-data").hover(
	function () {
		if(!check[2]) {
			$(this).attr("src", "img/others/blog_type_data_check.png");
		}
	},
	function () {
		if(!check[2]) {
			$(this).attr("src", "img/others/blog_type_data.png");
		}
	}
);
	
$("#icon-blog-prose").hover(
	function () {
		if(!check[3]) {
			$(this).attr("src", "img/others/blog_type_prose_check.png");
		}
	},
	function () {
		if(!check[3]) {
			$(this).attr("src", "img/others/blog_type_prose.png");
		}
	}
);
	
$("#icon-blog-interest").hover(
	function () {
		if(!check[4]) {
			$(this).attr("src", "img/others/blog_type_interest_check.png");
		}
	},
	function () {
		if(!check[4]) {
			$(this).attr("src", "img/others/blog_type_interest.png");
		}
	}
);