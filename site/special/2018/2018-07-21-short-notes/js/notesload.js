/*Load noteslist*/

colors = ["#fdd", "#fdf", "#ffd", "#dff", "#ddf", "#dfd"]

for(i = 0; i < noteslist.length; i++) {
	n = parseInt(Math.random()*(colors.length), 10);
	m = parseInt(Math.random()*(60), 10);
	$("#zturn").append(
		"<li class=\"poster-item  zturn-item\" style=\"position:absolute;left:50%;margin-left:-190px;z-index:11;opacity:1;transform:scale(1);background:" + colors[n] + "\">" +
		"	<p class=\"title\">" + noteslist[i].title + "</p>" +
		"	<p class=\"label\">" + noteslist[i].type + "</p>" +
			"<div class=\"info\"><span class=\"info-author\"><i class=\"icon-user\"></i>&nbsp;" + noteslist[i].author + "</span><small>于</small><span class=\"info-loc\">" + noteslist[i].loc + "</span><span class=\"info-date\">[" + noteslist[i].date + "]</span></div>" +
			"<img src=\"./2018-07-21-short-noteslist/img/img" + m + ".jpg\">" +
			"<p class=\"content\" style=\"box-shadow:1px 1px 1px " + colors[n] + " inset\">" + noteslist[i].content + "</p>" +
			"<div class=\"comment\">" + noteslist[i].comment + "</div>" +
		"</li>");
}


