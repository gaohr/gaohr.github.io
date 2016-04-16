
	//判断是否登录，登录状态时显示用户信息
	$(document).ready(function() {
		username_i = $.cookie("username"); // 读取 cookie;
		//从配置文件中获得头像信息
		$.getJSON("/iFood/data/userFolders/" + username_i + "/config.ini", function(data){
			$("#userhead").attr("src", data.userHead);
		})
		if (username_i != null && username_i != "") {
			$("#name").html(username_i);
			$.ajax({
				url:"/iFood/GetUserInfo?un=" + username_i,
				async:true,
				success:function(e) {
					var result = eval("(" + e + ")");
					$("#tel").html(result.tel);
					$("#email").html(result.email);
				},
				error:function() {
					alert("Error!")
				}
			});
		} else {
			window.location.href="../html/Login.html"; 
		}
	})
	
//	$("#username-re").click(function() {
//		$.cookie("username", null);
//	})
	
	var uh = "";
	$("#userhead").click(function() {
		var options = {};
		$("#popupHead").show( "fold", options, 500, null );
		$("#headok").click(function() {
			$.ajax({
				url:"/iFood/ChangeUserHead?uh=" + uh + "&un=" + username_i,
				async:true,
				success:function(e) {
					location.reload();
				},
				error:function() {
					alert("Error!")
				}
			});
		})
		
		$("#headcancel").click(function() {
			var options = {};
			$("#popupHead").hide( "fold", options, 500, null );
		})
		
	})
	function selecthp(n) {
    	uh = n;
    	var objsa = document.getElementById("hps").getElementsByTagName("img");
  		for(var i = 0; i < objsa.length; i++) {
  			objsa[i].style.backgroundColor = "";
  		}
    	document.getElementById(n).style.backgroundColor = "#fff";
     }
	  
	
