
	function onScroll(event){
		var scrollPosition = $(document).scrollTop();
		$('.nav li a').each(function () {
			var currentLink = $(this);
			var refElement = $(currentLink.attr("href"));
			if (refElement.position().top <= scrollPosition && refElement.position().top + refElement.height() > scrollPosition) {
				$('.nav li a').removeClass("active");
				currentLink.addClass("active");
			}
			else{
				currentLink.removeClass("active");
			}
		});
	}
	
var imgs = eval('imglist');
var imgid;
for(i = 0; i < imgs.length; i++) {
	if(imgs[i].title == "division") {
		$("#cd-timeline").append("<div class='cd-timeline-block division' id='year" + imgs[i].data + "'>" + imgs[i].data + "</div>")
	} else {
		$("#cd-timeline").append(
			"<div class='cd-timeline-block'>" + 
				"<div class='cd-timeline-img cd-" + selecttype(imgs[i].type) + "'>" + 
					"<img src='timeline/icon-" + selecttype(imgs[i].type) + ".svg' alt='Picture'>" + 
				"</div>" + 
				"<div class='cd-timeline-content'>" + 
					"<h2>" + imgs[i].title + "</h2>" + 
					"<a href='###'>" + getsrcnum(i) + "</a>" +
					"<p class='textcon' id='p_" + i + "'><span class='yinhao'>" + yinhao_left(imgs[i].type) + "</span>" + imgs[i].textcon + "<span class='yinhao'>" + yinhao_right(imgs[i].type) + "</span></p>" + 
					"<p style='color:#393'>" + imgs[i].location + "</p>" + 
					"<span class='cd-date'><strong>" + imgs[i].data + "</strong></span>" + 
				"</div>" + 
			"</div>"
		);
	}
	
}

function getsrcnum(n) {
	var imgsrc = "";
	for(k = 0; k < imgs[n].src.length; k++) {
		var year_cur = imgs[n].data.substring(0, 4);
		imgsrc += "<img class='imglh' onclick='imgdisplay(\"https://gaohr-blog.oss-cn-beijing.aliyuncs.com/imgs/life/langhua/" + year_cur + "/" + imgs[n].src[k].url + "\", " + n + ")' src='https://gaohr-blog.oss-cn-beijing.aliyuncs.com/imgs/life/langhua/" + year_cur + "/" + imgs[n].src[k].url + "'> "
	}
	return imgsrc;
}

function selecttype(n) {
	if(n == "image") return "picture";
	if(n == "movie") return "movie";
	if(n == "location") return "location";
}

function imgdisplay(imgurl,n) {
	$("#imgdiv").css('display', 'none');
	$("#imgdiv").html("<img class='imglhdis' onclick='divclose()' src='" + imgurl + "'>");
	$("#imgclose").css('display', 'block');
	$("#imgpre").css('display', 'block');
	$("#imgnext").css('display', 'block');
	$("#imgdiv").css('display', 'block');
	imgid = n + 1;
}
function divclose() {
	$("#imgclose").css('display', 'none');
	$("#imgdiv").css('display', 'none');
	$("#imgpre").css('display', 'none');
	$("#imgnext").css('display', 'none');
}

$("#imgclose").click(function() {
	$("#imgclose").css('display', 'none');
	$("#imgdiv").css('display', 'none');
	$("#imgpre").css('display', 'none');
	$("#imgnext").css('display', 'none');
})

function yinhao_left(n) {
	if(n == "image") return "";
	if(n == "movie") return "";
	if(n == "location") return "“";
}
function yinhao_right(n) {
	if(n == "image") return "";
	if(n == "movie") return "";
	if(n == "location") return "”";
}

/*文字动画*/
var i = 0;
function getColor(){
	i++;
	switch(i){ 
		case 1:return "#ff0000";
		case 2:return "#ff6600";
		case 3:return "#3366cc";
		case 4:return "#00cc66";
		case 5:return "#cc66ff";
		case 6:return "#3366ff";
		default:return "gray";
	}
}
function colorful(){
	var obj = document.getElementById('cd-timeline');
	obj.style.color = getColor();
	if(i == 6 ) i = 0;
	setTimeout('colorful()', 2000);
}
// colorful();

// 照片边框
function getColor_rdm(n){
	switch(n){ 
		case 1:return "#ff0000";
		case 2:return "#ff6600";
		case 3:return "#3366cc";
		case 4:return "#00cc66";
		case 5:return "#cc66ff";
		case 6:return "#3366ff";
		default:return "gray";
	}
}

var zkdhaurm = "love";
$(".imglh").hover(function(event){
	n = parseInt(6 * Math.random());
	$(this).css("border", "8px solid " + getColor_rdm(n));
},function(event){
	$(this).css("border", "8px solid rgba(255, 255, 255, 0.9)");
});

//向后翻
var imgnum = 0;
$("#imgnext").click(function() {
	var year_cur = imgs[imgid].data.substring(0, 4);
	imgsrc = "https://gaohr-blog.oss-cn-beijing.aliyuncs.com/imgs/life/langhua/" + year_cur + "/" + imgs[imgid].src[imgnum].url
	$("#imgdiv").html("<img class='imglhdis' onclick='divclose()' src='" + imgsrc + "'>");
	imgnum++;
	if(imgnum == imgs[imgid].src.length){
		imgid++;
		imgnum = 0
	}
	if(imgid == imgs.length) {imgid = 0;}
})
//向前翻
$("#imgpre").click(function() {
	imgid--;
	if(imgid == 0) { 
		alert("前面没有照片啦！"); 
		imgnum = 0;
	} else {
		var year_cur = imgs[imgid].data.substring(0, 4);
		imgsrc = "https://gaohr-blog.oss-cn-beijing.aliyuncs.com/imgs/life/langhua/" + year_cur + "/" + imgs[imgid].src[imgnum].url
		$("#imgdiv").html("<img class='imglhdis' onclick='divclose()' src='" + imgsrc + "'>");
	}
})

	
	$("#submit").click(function() {
		var key = $("#keyword").val();
		if(key == "love") {
			$("#cd-timeline").css('display', 'block');
			$("#errordiv").css('display', 'none');
			$("#logindiv").css('display', 'none');
			
			$.cookie("pw", key, { expires: 365, path: "/LangHua" }); // 存储一个一年期限的 cookie 
		} else {
			$("#errordiv").html("密码“" + key + "”错误，没有权限浏览");
			$("#errordiv").css('display', 'block');
		}
		photoview();
	})
	$("#keyword").keyup(function(){
        if(event.keyCode == 13){
            var key = $("#keyword").val();
			if(key == "love") {
				$("#cd-timeline").css('display', 'block');
				$("#errordiv").css('display', 'none');
				$("#logindiv").css('display', 'none');
			} else {
				$("#errordiv").html("密码“" + key + "”错误，没有权限浏览");
				$("#errordiv").css('display', 'block');
			}
			photoview();
		}
	});
	
//照片浮出动态效果
function photoview(){
var $timeline_block = $('.cd-timeline-block');
	//hide timeline blocks which are outside the viewport
	$timeline_block.each(function(){
		if($(this).offset().top > $(window).scrollTop()+$(window).height()*0.75) {
			$(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
		}
	});
	//on scolling, show/animate timeline blocks when enter the viewport
	$(window).on('scroll', function(){
		$timeline_block.each(function(){
			if( $(this).offset().top <= $(window).scrollTop()+$(window).height()*0.75 && $(this).find('.cd-timeline-img').hasClass('is-hidden') ) {
				$(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
			}
		});
	});
}



