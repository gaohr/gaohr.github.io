
jQuery(document).ready(function() {
	username_i = $.cookie("username"); // 读取 cookie;
	//alert(username_i);
	if (username_i != null && username_i != "") {
		$("#username").html("" + username_i + "");
		$.getJSON("/iFood/data/userFolders/" + username_i + "/config.ini", function(data){
			$("#userhead").attr("src", data.userHead);
		})
	} else {
		$("#username").html("<a href='Login.html' style='color:#aaa'>登陆/注册</a>");
		$("#userhead").attr("src","../img/user-b.png");
	}
});
			
$("#logout").click(function() {
	$.cookie("username", null);
})








