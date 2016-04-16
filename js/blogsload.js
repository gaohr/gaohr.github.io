/*
*Load recent blogs
*GaoHR
*2016-04-16
*/
$(document).ready(function() {
		var blogs = eval('bloglist');
		for(i = 0; i < blogs.length; i++) {
				for(i = 0; i < blogs.length; i++) {
					var tags = readtags(i);
					$("#blog").append(
							"<div class='row-fluid'>" +
							"<div class='span4 blog-tag-data'>" +
							"<img src='" + blogs[i].img + "' class='blog-img'>" +
							"<ul class='unstyled inline blog-tags'>" +
							"<li type='circle'>" +
							"<i class='icon-tags'></i> " + tags +
							"</li>" +
							"</ul>" +
							"<ul class='unstyled inline'>" +
							"<li type='circle' class='pull-left'><i class='icon-calendar'></i> <a href='#'>" + blogs[i].date + "</a></li>" +
							"<li type='circle'><i class='icon-comments'></i> <a href='#'>" + blogs[i].comments + " Comments</a></li>" +
							"</ul>" +
							"</div>" +
							"<div class='span8 blog-article'>" +
							"<a href='" + blogs[i].href + "' class='blog-title'>" + blogs[i].title + "</a>" +
							"<p>" + blogs[i].content + "</p>" +
							"<a class='btn-blue' href='" + blogs[i].href + "'>Read more <i class='icon-circle-arrow-right'></i></a>" +
							"</div>" +
							"</div><hr>"
						);
					}
		}
		
		function readtags(n) {
			tagslist = "";
			for(t = 0; t < blogs[n].tags.length; t++) {
				tagslist += "<a href='#'>" + blogs[n].tags[t] + "</a>";
			}
			return tagslist;
		}
	})
	
	
	
	
	
	
	
	
	
	
	
	
	
	