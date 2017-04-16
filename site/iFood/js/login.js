
	$("#submit").click(function() {
		username_s = $("#username").val();
		password_s = $("#password").val();
		$.ajax({
    		url:"/iFood/data/userInfo.json",
    		async:false,
    		dataType:"json",
    		success:function(data){
    			for(i = 0; i < data.users.length; i++) {
    				if(data.users[i].name == username_s && data.users[i].password == password_s) {
    					$.cookie("username", username_s, { expires: 7, path: "/iFood/html" }); // 存储一个带7天期限的 cookie 
    				}
    			}
        	}
    	})
	})

	

