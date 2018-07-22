/*Load life section*/

// section name list
for(i = seclist.length - 1; i >= 0; i--) {
	$("#sec-list").append("<a href=\"###\" onClick=\"getSecContent(" + seclist[i].id + ")\"><p class=\"section\">" + seclist[i].name + "</p></a>");
}

// section content
$("#sec-content").html(
						"<p class=\"title\">" + seclist[seclist.length - 1].name + "</p>" +
						seclist[seclist.length - 1].content +
						"<br><br><br><br><br><p class=\"sec-end\">------ 本节落尽 ------</p>");

function getSecContent(id) {
	$("#sec-content").empty();
	$("#sec-content").hide();
	$("#sec-content").html(
						"<p class=\"title\">" + seclist[seclist.length - 1 - id].name + "</p>" +
						seclist[seclist.length - 1 - id].content +
						"<br><br><br><br><br><p class=\"sec-end\">------ 本节落尽 ------</p>");
	$("#sec-content").show(500);
}