$(document).ready(function() {
		$.getJSON("../bloglist.json", function(data){
			alert(data.length);
				for(i = 0; i < data.length; i++) {
						$("#blog").append(
							"<div class='blog-page' id='blog'>" +
							"<div class='span4 blog-tag-data'>" +
							"<img src='img/images/ArcGIS.jpg' class='blog-img'>" +
							"<ul class='unstyled inline blog-tags'>" +
							"<li type='circle'>" +
							"<i class='icon-tags'></i> " +
							"<a href='#'>" + data[i].tags[0] + "</a> " +
							"<a href='#'>Ê¸Á¿</a>" +
							"<a href='#'>²Ã¼ô</a>" +
							"</li>" +
							"</ul>" +
							"<ul class='unstyled inline'>" +
							"<li type='circle' class='pull-left'><i class='icon-calendar'></i> <a href='#'>2016-04-15</a></li>" +
							"<li type='circle' class='pull-right'><i class='icon-comments'></i> <a href='#'>0 Comments</a></li>" +
							"</ul>" +
							"</div>" +
							"<div class='span8 blog-article'>" +
							"<a href='#' class='blog-title'>" + data[i].title + "</a>" +
							"<p>" + data[i].content + "</p>" +
							"<a class='btn-blue' href='###'>Read more <i class='icon-circle-arrow-right'></i></a>" +
							"</div>" +
							"</div>"
						);
					}
		}); 
	})