/*
@ Developed by GIS大饼
*/

var cur_url_full = window.location.href;
cur_url = cur_url_full.split("/")[2];
if(cur_url == ""){
	cur_url += "0"
}

var spetial_name = ["GIS大饼"];

$("#chat-box").height($(window).height() * 0.66);

$(document).ready(function(){
		
		var un_arr = ["天", "地", "人", "君", "臣", "义", "仁", "道", "信", "智", "贤", "德", 
		              "一", "二", "三", "五", "八", "十一", 
		              "甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸", 
		              "十里", "百里", "千里", "万里", "千百", "百万", 
		              "江", "河", "湖", "海", "日", "月", "山", "川", 
		              "龙", "虎", "象", "鹤", "鹏", "飞", "行", "步", "远", 
		              "飞云", "北风", "青溪", "舒月", "何人", "秋千", "江花", "玉山", "天外"];
		var uh_arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
		c1 = Math.round( Math.random() * (un_arr.length - 1));
		c2 = Math.round( Math.random() * (un_arr.length - 1));
		user_name = un_arr[c1] + un_arr[c2];
		user_head = Math.round( Math.random() * (uh_arr.length - 1)) + "";
		
		// 读取 cookie;
		var user_now_name = $.cookie("gispie_username");
		var user_now_head = $.cookie("gispie_userhead");
		if (user_now_name == null || user_now_name == "" ||  user_now_name == undefined) {
			$.cookie("gispie_username", user_name, {expires: 999, path: "/", secure: false});
			$.cookie("gispie_userhead", user_head, {expires: 999, path: "/", secure: false});
		} else {
			user_name = user_now_name;
			user_head = user_now_head;
		}
		
		// 添加容器
		$("#chat-box").html("<div id=\"chat-list\" class=\"chat-list\"></div><div id=\"chat-edit\" class=\"chat-edit\"></div>");
		$("#chat-edit").html("<div class=\"user-info\">" + 
							"<div id=\"user-info-content\"><span>我的头像：<img src=\"https://123.56.254.70:8443/gispie/chat/imgs/img" + user_head + 
							".png\"></span><br><span class=\"chat-username\"><span>我的昵称：</span><b><span id=\"user-name-show\" class=\"user-name-show\">" + user_name + 
							"</span></b><a href=\"###\" id=\"user-name-change\" class=\"user-name-change\">改名</a></span></div>" + 
							"<span class=\"user-info-des\">(随机头像，暂无法更改)</span></div>" + 
							"<div class=\"chat-info\">" + 
							"<input type=\"text\" id=\"chat-submit-text\" class=\"span10\"> " + 
							"<a href=\"###\" id=\"chat-submit\" class=\"chat-submit\">发送</a></div>");
		$("body").append("<div class=\"chat-change-name\" id=\"chat-change-name\">" + 
						"<div class=\"content-title text-bg\"><span>---&nbsp;&nbsp;<b>修改昵称</b>&nbsp;&nbsp;---</span>" + 
						"<a id=\"close-chat-change-name\" class=\"pull-right\" href=\"###\"> X </a></div>" + 
						"<div class=\"content-body\"><div class=\"chat-hr\"></div><form class=\"form-horizontal\"><div class=\"control-group\">" + 
						"<label class=\"control-label\" for=\"input-user\">昵称：</label>" + 
						"<div class=\"controls\"><input width=\"80%\" type=\"text\" id=\"input-name\" placeholder=\"输入昵称\"></div></div>" + 
						"<div class=\"chat-hr\"></div><div class=\"control-group\">" + 
						"<div class=\"controls\"><label class=\"checkbox\"><input type=\"checkbox\" checked> 记住我</label>" + 
						"<a href=\"###\" id=\"btn-change-name-ok\" class=\"chat-btn btn-blue\">确认</a>" + 
						"<a href=\"###\" id=\"btn-change-name-cancel\" class=\"chat-btn btn-white\">取消</a></div></div></form></div></div>");
						
		$("#chat-list").height($("#chat-box").height() - 125);
		
		// alert(user_now_name + user_now_head);
		// 每隔2分钟提交一次状态，以此判断在线人数
		uploadStatus();
		setInterval("uploadStatus()", 120000);
		
		// 先更新1次线人数数字和聊天列表，然后每隔30秒更新1次
		updateComment();
		setInterval("updateComment()", 30000);
		
		updateNumOL();
		setInterval("updateNumOL()", 60000);
		
		
		$("#chat-submit").click(function(){
			var chat_text = $("#chat-submit-text").val();
			
			var date = new Date();  //当前时间
			var date_s = date.getTime();
			
			var datetime_cur = date.getFullYear() + "-" + add0(date.getMonth() + 1) + "-" + date.getDate() + 
			                   " " + date.getHours() + ":" + date.getMinutes() + ":" + add0(date.getSeconds());
				
			// alert(datetime_cur + "," + date_s);
			
			if(chat_text != "" && chat_text != null){
				if(chat_text.length < 200){
					$("#chat-list").append("<div class=\"chat-content\"><div class=\"chat-userhead\"><img src=\"http://123.56.254.70:8080/gispie/chat/imgs/img" + user_head + 
							".png\"></div><div><span class=\"chat-username\">" + user_name + 
							"</span><br><span class=\"chat-time\">" + datetime_cur + 
							"</span></div><div class=\"chat-text\" style=\"background-color:rgba(0,155,0,0.15)\"><span>" + chat_text + 
							"</span></div></div><div class=\"chat-hr\"></div>");
					
					// 提交到服务器
					$.ajax({
						//type: 'get',
						url:"https://123.56.254.70:8443/gispie/SaveComment?url=" + cur_url + "&userhead=" + user_head + 
						"&username=" + encodeURI(encodeURI(user_name)) + 
						"&datetime=" + datetime_cur + 
						"&comment=" + encodeURI(encodeURI(chat_text)),
						async:false
					});
					
				} else {
					alert("话太多了，慢点儿说！")
				}
				
			} else {
				alert("说什么？我没戴眼镜听不见！")
			}
			
			// 窗口滚动到最底部
			var scroll_box = document.getElementById('chat-list');
			scroll_box.scrollTop = scroll_box.scrollHeight;
			
			// 清空文本框
			$("#chat-submit-text").val("");
		})
		
		$("#user-name-change").click(function(){
			$("#chat-change-name").show();
		});
		
		$("#btn-change-name-ok").click(function(){
			var change_name_text = $("#input-name").val();
			
			if(spetial_name.indexOf(change_name_text) != -1){
				alert("不要冒充博主哦！");
			} else if(change_name_text.length > 50){
				alert("你名字太长我记不住！");
			} else {
				$.cookie("gispie_username", change_name_text, {expires: 999, path: "/", secure: false});
				$("#user-name-show").html(change_name_text);
				$("#chat-change-name").hide();
				user_name = change_name_text;
			}
		});
		
		$("#btn-change-name-cancel").click(function(){
			$("#chat-change-name").hide();
		});
		
		$("#close-chat-change-name").click(function(){
			$("#chat-change-name").hide();
		});
		
	});
		
		function uploadStatus(){
			var date = new Date();
			var date_s = date.getTime();  //当前时间(毫秒数)
			$.ajax({
				//type: 'get',
				url:"https://123.56.254.70:8443/gispie/NumOnLine?url=" + cur_url + "&username=" + encodeURI(encodeURI(user_name)) + "&datetime=" + date_s,
				async:false
			});
		}
		
		function updateComment(){
			// 先清空列表
			$("#chat-list").html("");
			res = $.ajax({
				//type: 'get',
				url:"https://123.56.254.70:8443/gispie/ReadComment?url=" + cur_url,
				async:false
			});
			resComment = eval("(" + res.responseText + ")");
			
			for(var i = 0; i < resComment["chat_list"].length; i++){
				if(resComment["chat_list"][i]["user"] == user_name && spetial_name.indexOf(resComment["chat_list"][i]["user"]) == -1){
					$("#chat-list").append("<div class=\"chat-content\"><div class=\"chat-userhead\"><img src=\"https://123.56.254.70:8443/gispie/chat/imgs/img" + resComment["chat_list"][i]["head"] + 
						".png\"></div><div><span class=\"chat-username\" style=\"color:#c21\"><b>" + resComment["chat_list"][i]["user"] + 
						"</b></span><br><span class=\"chat-time\">" + resComment["chat_list"][i]["time"] + 
						"</span></div><div class=\"chat-text\" style=\"background-color:rgba(0,155,0,0.15)\"><span>" + resComment["chat_list"][i]["comment"] + 
						"</span></div></div><div class=\"chat-hr\"></div>");
				} else if(spetial_name.indexOf(resComment["chat_list"][i]["user"]) != -1){
					$("#chat-list").append("<div class=\"chat-content\"><div class=\"chat-userhead\"><img src=\"https://123.56.254.70:8443/gispie/chat/imgs/img" + resComment["chat_list"][i]["head"] + 
						".png\"></div><div><span class=\"chat-username\" style=\"color:#c21\"><b>" + resComment["chat_list"][i]["user"] + 
						"</b></span><br><span class=\"chat-time\">" + resComment["chat_list"][i]["time"] + 
						"</span></div><div class=\"chat-text\" style=\"background-color:rgba(0,155,255,0.15)\"><span>" + resComment["chat_list"][i]["comment"] + 
						"</span></div></div><div class=\"chat-hr\"></div>");
				} else {
					$("#chat-list").append("<div class=\"chat-content\"><div class=\"chat-userhead\"><img src=\"https://123.56.254.70:8443/gispie/chat/imgs/img" + resComment["chat_list"][i]["head"] + 
						".png\"></div><div><span class=\"chat-username\">" + resComment["chat_list"][i]["user"] + 
						"</span><br><span class=\"chat-time\">" + resComment["chat_list"][i]["time"] + 
						"</span></div><div class=\"chat-text\"><span>" + resComment["chat_list"][i]["comment"] + 
						"</span></div></div><div class=\"chat-hr\"></div>");
				}
			}
			// 窗口滚动到最底部
			var scroll_box = document.getElementById('chat-list');
			scroll_box.scrollTop = scroll_box.scrollHeight;
		}
		
		function updateNumOL(){
			res = $.ajax({
				//type: 'get',
				url:"https://123.56.254.70:8443/gispie/ReadNum?url=" + cur_url,
				async:false
			});
			resNum = eval("(" + res.responseText + ")");
			var users = new Array();
			for(var i = 0; i < resNum["user_time"].length; i++){
				if(users.indexOf(resNum["user_time"][i]["user"]) == -1){
					users.push(resNum["user_time"][i]["user"]);
				}
			}
			$("#num-online").html("<i><b> " + users.length + " </b></i>");
		}
		
		function add0(n){
			if(n < 10){
				return "0" + n;
			} else {
				return n;
			}
		}
