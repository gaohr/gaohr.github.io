/**
 * 
 */

	$("#submit").click(function() {
		var username_r = $("#username").val();
		$.cookie("username", username_r, { expires: 7, path: "/iFood/html" }); // 存储一个带7天期限的 cookie 
	})
	
	