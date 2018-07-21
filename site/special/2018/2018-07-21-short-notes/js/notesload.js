/*Load notes*/

colors = ["#fbb", "#fdf", "#ffd", "#dff", "#ddf", "#dfd"]

var notes = eval('noteslist');
	for(i = 0; i < notes.length; i++) {
		n = parseInt(Math.random()*(colors.length), 10);
		$("#zturn").append(
			"<li class=\"poster-item  zturn-item\" style=\"position:absolute;left:50%;margin-left:-190px;z-index:11;opacity:1;transform:scale(1);background:" + colors[n] + "\">" +
			"	<p class=\"title\">" + notes[i].title + "</p>" +
			"	<p class=\"label\">" + notes[i].type + "</p>" +
				"<div class=\"info\"><span class=\"info-author\"><i class=\"icon-user\"></i>&nbsp;" + notes[i].author + "</span><small>于</small><span class=\"info-loc\">" + notes[i].loc + "</span><span class=\"info-date\">[" + notes[i].date + "]</span></div>" +
				"<img src=\"./2018-07-21-short-notes/img/img01.jpg\">" +
				"<p class=\"content\" style=\"box-shadow:1px 1px 1px " + colors[n] + " inset\">" + notes[i].content + "</p>" +
				"<div class=\"comment\">" + notes[i].comment + "</div>" +
			"</li>");
	}


