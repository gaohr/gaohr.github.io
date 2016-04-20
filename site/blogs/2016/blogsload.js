/*
*Load recent blogs to right sider
*GaoHR
*2016-04-19
*/
$(document).ready(function() {
	var blogs = eval('bloglist');
	//for(i = 0; i < blogs.length; i++) {
	for(i = 0; i < 3; i++) {
		var tags = readtags(i);
		$("#blogs").append(addblog(blogs,i,tags));
		var blogid = $("#blogid").val();
		if(blogs[i].blogid == blogid) {
			$("#blogtopinfo").append("[" + blogs[i].date + "]&nbsp;&nbsp; <i class='icon-tags'></i>" + tags );
		}
		
	}	
	//add Blog
	function addblog(blogs,n,tags) {
		var blogcon = "<div class='blog-article'>" +
			"<a href='../../../" + blogs[n].href + "' class='blog-title' style='font-size:1.2em'>" + blogs[n].title + "</a><br><br>" +
			"</div>" +
			"<div class='blog-tag-data'>" +
			"<img src='../../../" + blogs[n].img + "' class='blog-img' style='width:60%;'>" +
			"<ul class='unstyled inline' style='font-size:9px'>" +
			"<li type='circle' class='pull-left'><i class='icon-calendar'></i> <a href='#'>" + blogs[n].date + "</a></li>" +
			"</ul>" +
			"<ul class='unstyled inline blog-tags' style='font-size:9px'>" +
			"<li type='circle'>" +
			"<i class='icon-tags'></i>" + tags +
			"</li>" +
			"</ul>" +
			"</div>" +
			"<a class='btn-blue' href='../../../" + blogs[n].href + "'>Read more <i class='icon-circle-arrow-right'></i></a>" +
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
})
	
	
	
	
	
	
	
	
	
	