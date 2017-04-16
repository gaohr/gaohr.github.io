/**
 * message
 */

var username_m;
var userhead_m;
$(document).ready(function() {
	//加载留言
	$.getJSON("/iFood/data/userMessage.json", function(data){
	  	var mes_len = data.length;
	  	for(m = 0; m < mes_len; m++) {
	  		$("#message").append(mesDisplay(data[m].user, data[m].message, data[m].time));
	  	}
	})
	username_m = $.cookie("username"); // 读取 cookie;
	$.getJSON("/iFood/data/userFolders/" + username_m + "/config.ini", function(data){
		userhead_m = data.userHead;
	})
})

$("#submit_m").click(function() {
	if(username_m != null && username_m != "") {
		var messagecon = $("#messagecon").val();
	    var myDate = new Date();
	    var data = myDate.toLocaleString(); 
	    if(messagecon != "") {
	    	userarea = "<div class=\"row-fluid message\"><div class=\"span2 message_u\"><img src=\"" + userhead_m + "\"></div>";
	    	content = "<div class=\"span10\"><p>" + username_m + "</p><h6>" + messagecon + "</h6><p class=\"pull-right message_p\"><i class=\"icon-time\"> </i>" + data + "</p></div></div>";
	    	/*传递后台存储*/
	    	$.ajax({
	    		url:"/iFood/Message?un=" + username_m + "&mes=" + encodeURI(encodeURI(messagecon)) + "&time=" + data,
	    		async:true,
	    		error:function(data){
	        	  	alert("未成功提交！");
	        	},
	    	})
	    	$("#message").append(userarea + content);
	    	} else {
	    		alert("别偷懒！");
	    	}
	    	document.getElementById("messagecon").value = "";
		} else {
			window.location.href = "/iFood/html/Login.html";
		}
    
    })
      
    $("#cancel_m").click(function() {
    	document.getElementById("messagecon").value = "";
    })
    
	function mesDisplay(username_m, messagecon, data) {
		userarea = "<div class=\"row-fluid message\"><div class=\"span2 message_u\"><img src=\"" + getHead(username_m) + "\"></div>";
		content = "<div class=\"span10\"><p>" + username_m + "</p><h6>" + messagecon + "</h6><p class=\"pull-right message_p\"><i class=\"icon-time\"> </i>" + data + "</p></div></div>";
		return(userarea + content);
	}
	function getHead(name) {
    	var head = "";
    	$.ajax({
    		url:"/iFood/data/userFolders/" + name + "/config.ini",
    		async:false,
    		dataType:"json",
    		success:function(data){
        	  	head = data.userHead;
        	}
    	})
    	return(head);
    }











    