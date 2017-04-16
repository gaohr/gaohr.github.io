/**
 * 
 */
	
	$(document).ready(function() {
		$.getJSON("../data/food-suitable.json", function(data){
			$( "#btn-1" ).click(function() {
				$( "#result-div" ).hide();
				var options = {};
				$( "#result-div" ).show("fold", options, 1000, null);
        
				var fname_1 = $("#xiangyi").val();
				$("#resultDiv").empty();
				$("#ii").hide();
				var has_1 = false;
				for(i = 0; i < data.length; i++) {
					//alert(suitableLists[i].name1+","+fname);
					if(data[i].name1 == fname_1 || data[i].name2 == fname_1) {
						has_1 = true;
						$("#resultDiv").append(
								"<table>" +
								"<tr>" +
								"<td style='width:20%'><img src='" + data[i].src[0].url + "' width='100%' onerror=\"this.src='../img/foodVector/loadding.gif'\" style='border:1px solid #ffd;box-shadow:1px 1px 1px #aaa'><br></td>" +
								"<td style='width:5%;font-size:24px;color:#5a5;margin:5px'>+</td>" +
								"<td style='width:20%'><img src='" + data[i].src[1].url + "' width='100%' onerror=\"this.src='../img/foodVector/loadding.gif'\" style='border:1px solid #ffd;box-shadow:1px 1px 1px #aaa'><br></td>" +
								"<td style='width:45%;overflow-y:scroll;height:60px;margin:10px;padding:5px;border-radius:5px;box-shadow:inset 1px 1px 1px #777'><p style='color:#555'>" + data[i].effect + "</p></td>" +
								"</tr>" +
								"<tr>" +
								"<td><p style='text-align:center'>" + data[i].name1 + "</p></td>" +
								"<td></td>" +
								"<td><p style='text-align:center'>" + data[i].name2 + "</td>" +
								"</tr>" +
								"</table>"
						);
					}
				}
				if(has_1 == false) {
					$("#resultDiv").html(
							"<div style='text-align:center;margin:10px;color:#d55'>抱歉，未搜索到……</div>"
					);
				}
			});
		}); 
		
		$.getJSON("../data/food-inappro.json", function(data){
			$("#btn-2").click(function() {
				$( "#result-div" ).hide();
				var options = {};
				$("#result-div").show("fold", options, 1000, null);
				//$("#result-div").addclass("red");
				var fname_2 = $("#xiangyi").val();
				$("#resultDiv").empty();
				$("#ii").hide();
				var has_2 = false;
				for(i = 0; i < data.length; i++) {
					//alert(suitableLists[i].name1+","+fname);
					if(data[i].name1 == fname_2 || data[i].name2 == fname_2) {
						has_2 = true;
						$("#resultDiv").append(
								"<table>" +
								"<tr>" +
								"<td style='width:20%'><img src='" + data[i].src[0].url + "' width='100%' onerror=\"this.src='../img/foodVector/loadding.gif'\" style='border:1px solid #ffd;box-shadow:1px 1px 1px #aaa'><br></td>" +
								"<td style='width:5%;font-size:24px;color:#5a5;margin:5px'>+</td>" +
								"<td style='width:20%'><img src='" + data[i].src[1].url + "' width='100%' onerror=\"this.src='../img/foodVector/loadding.gif'\" style='border:1px solid #ffd;box-shadow:1px 1px 1px #aaa'><br></td>" +
								"<td style='width:45%;overflow-y:scroll;height:100px;margin:5px;padding:5px;border-radius:5px;box-shadow:inset 1px 1px 1px #777'><p style='color:#555'>" + data[i].effect + "</p></td>" +
								"</tr>" +
								"<tr>" +
								"<td><p style='text-align:center'>" + data[i].name1 + "</p></td>" +
								"<td></td>" +
								"<td><p style='text-align:center'>" + data[i].name2 + "</td>" +
								"</tr>" +
								"</table>"
						);
					} 
				}
				if(has_2 == false) {
					$("#resultDiv").html(
							"<div style='text-align:center;margin:10px;color:#d55'>抱歉，未搜索到……</div>"
					);
				}
			});
		}); 
		
		$.getJSON("../data/food-inappro.json", function(data){
			$("#btn-3").click(function() {
				$( "#result-div" ).hide();
				var options = {};
				$("#result-div").show("fold", options, 1000, null);
				//$("#result-div").addclass("red");
				var fname_3 = $("#food-1").val();
				var fname_4 = $("#food-2").val();
				$("#resultDiv").empty();
				$("#ii").hide();
				var has_3 = false;
				for(i = 0; i < data.length; i++) {
					//alert(suitableLists[i].name1+","+fname);
					if((data[i].name1 == fname_3 && data[i].name2 == fname_4) || (data[i].name1 == fname_4 && data[i].name2 == fname_3)) {
						has_3 = true;
						$("#resultDiv").append(
								"<table>" +
								"<tr>" +
								"<td style='width:20%'><img src='" + data[i].src[0].url + "' width='100%' onerror=\"this.src='../img/foodVector/loadding.gif'\" style='border:1px solid #ffd;box-shadow:1px 1px 1px #aaa'><br></td>" +
								"<td style='width:5%;font-size:24px;color:#5a5;margin:5px'>+</td>" +
								"<td style='width:20%'><img src='" + data[i].src[1].url + "' width='100%' onerror=\"this.src='../img/foodVector/loadding.gif'\" style='border:1px solid #ffd;box-shadow:1px 1px 1px #aaa'><br></td>" +
								"<td style='width:45%;overflow-y:scroll;height:100px;margin:5px;padding:5px;border-radius:5px;box-shadow:inset 1px 1px 1px #777'><p style='color:#555'>" + data[i].effect + "</p></td>" +
								"</tr>" +
								"<tr>" +
								"<td><p style='text-align:center'>" + data[i].name1 + "</p></td>" +
								"<td></td>" +
								"<td><p style='text-align:center'>" + data[i].name2 + "</td>" +
								"</tr>" +
								"</table>"
						);
					} 
				}
				if(has_3 == false) {
					$("#resultDiv").html(
							"<div style='text-align:center;margin:10px;color:#595'>未查询到相克信息，可放心食用！</div>"
					);
				}
			});
		}); 
		
	})
    
    