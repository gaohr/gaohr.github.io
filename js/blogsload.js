/*
*Load recent blogs
*GaoHR
*2016-04-16
*/
$(document).ready(function() {
	var blogs = eval('bloglist');
	//blog
	for(i = 0; i < 3; i++) {
	//for(i = 0; i < blogs.length; i++) {
		var tags = readtags(i);
		$("#blog").append(
			"<div class='row-fluid'>" +
			"<div class='span12 blog-article'>" +
			"<a href='" + blogs[i].href + "' class='blog-title'><i class=' icon-bookmark' style='color:#6a6'> </i>" + blogs[i].title + "</a>" +
			"<a href='Blogs.html#" + blogtype(blogs[i].type) + "' class='blog-type'>[ " + blogs[i].type + " ]</a>" +
			"<div class='row-fluid'>" +
			"<div class='span4 blog-tag-data'>" +
			"<img src='" + blogs[i].img + "' class='blog-img' style='width:80%;margin-left:10%'>" +
			"<ul class='unstyled inline'>" +
			"<li type='circle' class='pull-left'><i class='icon-calendar'></i> <a href='#'>" + blogs[i].date + "</a></li>" +
			"</ul>" +
			"<ul class='unstyled inline blog-tags'>" +
			"<li type='circle'>" +
			"<i class='icon-tags'></i><small>" + tags +
			"</small></li>" +
			"</ul>" +
			"</div>" +
			"<div class='span8 blog-article'>" +
			"<p>" + blogs[i].content + "</p>" +
			"<a class='btn-blue' href='" + blogs[i].href + "'>Read more <i class='icon-circle-arrow-right'></i></a>" +
			"</div>" +
			"</div>" +
			"</div>" +
			
			"</div><hr>"
		);
	}
	//Blogs
	//for(i = 0; i < 1; i++) {
	for(i = 0; i < blogs.length; i++) {
		var tags = readtags(i);
		$("#allblogs").append(addblog(blogs,i,tags));
		if(blogs[i].type == "专业技术") {
			$("#technology").append(addblog(blogs,i,tags));
		} else if(blogs[i].type == "随笔小记") {
			$("#prose").append(addblog(blogs,i,tags));
		} else if(blogs[i].type == "心情寄语") {
			$("#emotion").append(addblog(blogs,i,tags));
		} else {}
	}	
	//add Blog
	function addblog(blogs,n,tags) {
		var blogcon = "<div class='row-fluid'>" +
			"<div class='span4 blog-tag-data'>" +
			"<img src='" + blogs[n].img + "' class='blog-img'>" +
			"<ul class='unstyled inline'>" +
			"<li type='circle' class='pull-left'><i class='icon-calendar'></i> <a href='#'>" + blogs[n].date + "</a></li>" +
			"<li type='circle'><i class='icon-comments'></i> <a href='#'>" + blogs[n].comments + " Comments</a></li>" +
			"</ul>" +
			"<ul class='unstyled inline blog-tags'>" +
			"<li type='circle'>" +
			"<i class='icon-tags'></i>" + tags +
			"</li>" +
			"</ul>" +
			"</div>" +
			"<div class='span8 blog-article'>" +
			"<a href='" + blogs[n].href + "' class='blog-title'>" + blogs[n].title + "</a>" +
			"<p>" + blogs[n].content + "</p>" +
			"<a class='btn-blue' href='" + blogs[n].href + "'>Read more <i class='icon-circle-arrow-right'></i></a>" +
			"</div>" +
			"</div><hr>";
			return blogcon;
	}
	
	function readtags(n) {
		tagslist = "";
		for(t = 0; t < blogs[n].tags.length; t++) {
			tagslist += "<a href='#' style='font-size:9px !important'>" + blogs[n].tags[t] + "</a>";
		}
		return tagslist;
	}
	
	function blogtype(type) {
		if(type == "专业技术") {
			return "tab_4_2";
		} else if(type == "随笔小记") {
			return "tab_4_3";
		} else if(type == "心情寄语") {
			return "tab_4_4";
		} else {}
	}
	
	//知乎热文
	var myDate = new Date();
			if((myDate.getMonth() + "").length == 1) {
				month = "0" + (myDate.getMonth() + 1);
			} else {
				month = myDate.getMonth();
			}
			if((myDate.getDate() + "").length == 1) {
				day = "0" + myDate.getDate();
			} else {
				day = myDate.getDate() - 1;
			}
			var date = myDate.getFullYear() + month + day;
			//alert(myDate.getFullYear() + "-" + month + "-" + day);
			$("#date").val(myDate.getFullYear() + "-" + month + "-" + day);
			$.ajax({
				url:"http://api.kanzhihu.com/getpostanswers/" + date + "/recent",
				dataType:"json",
				async:false,
				success:function(data){
					//for(i = 0; i < data.answers.length; i++) {
					for(i = 0; i < 5; i++) {
						$("#content").append("<a href=\"http://www.zhihu.com/question/" + data.answers[i].questionid + "\" target=\"_blank\">" + data.answers[i].title + "</a><span>" + data.answers[i].vote + "</span><i class=\"icon-thumbs-up\"></i><br><img src=\"" + data.answers[i].avatar + "\"><p>" + data.answers[i].authorname + "-" + data.answers[i].time + "</p><hr>" );
					}
				},
				error:function(){alert("Error")}
			});
			
			$("#refresh").click(function() {
				var year = ["2014", "2015", "2016"];
				var month = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
				var day = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];
				var synum = Math.round(Math.random() * 2);
				var smnum = Math.round(Math.random() * 11);
				var sdnum = Math.round(Math.random() * 30);
				selectdate = "" + year[synum] + month[smnum] + day[sdnum];
				//alert(selectdate);
				if(selectdate != null && selectdate != "") {
					$("#content").empty();
					$.ajax({
						url:"http://api.kanzhihu.com/getpostanswers/" + selectdate + "/recent",
						dataType:"json",
						async:false,
						success:function(data){
							//for(i = 0; i < data.answers.length; i++) {
							for(i = 0; i < 5; i++) {
								$("#content").append("<a href=\"http://www.zhihu.com/question/" + data.answers[i].questionid + "\" target=\"_blank\">" + data.answers[i].title + "</a><span>" + data.answers[i].vote + "</span><i class=\"icon-thumbs-up\"></i><br><img src=\"" + data.answers[i].avatar + "\"><p>" + data.answers[i].authorname + "-" + data.answers[i].time + "</p><hr>" );
							}
						},
						error:function(){alert("Error")}
					});
				} else {
					alert("错误日期，请重新选择！");
				}
			})
}) 
	
	
	
	
	
	
	
	
	
	
	
	
	
	