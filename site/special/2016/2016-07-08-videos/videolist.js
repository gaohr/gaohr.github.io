var videolist = [
	{"id":"000", "title":"中国5000年历史版图演变", "mp4":"China_territory"},
	{"id":"001", "title":"权力的游戏 360°全景", "mp4":"a_song_of_ice_and_fire_360C"},
	{"id":"002", "title":"没有翅膀，却梦想飞翔", "mp4":"dream"},
	{"id":"003", "title":"《迷雾花开》", "mp4":"TangsQiny"},
	{"id":"004", "title":"我们的宇宙，了解一下", "mp4":"universe1"},
	{"id":"005", "title":"中华上下五千年", "mp4":"History"},
	{"id":"006", "title":"肥版国家地理-合集", "mp4":"fat_world"},
	{"id":"007", "title":"生活大爆炸", "mp4":"big_bang"},
	{"id":"008", "title":"火影·晓组织 燃爆瞬间", "mp4":"xiao"},
	{"id":"009", "title":"冰河世纪", "mp4":"ice_age"},
	{"id":"010", "title":"看完这个视频：我是谁？我在哪？", "mp4":"universe2"},
	{"id":"011", "title":"蓝雨伞之恋", "mp4":"blue_umbrella"},
	{"id":"012", "title":"星际争霸", "mp4":"star_craft"},
	{"id":"013", "title":"雇佣人生，深刻的短片", "mp4":"employ_life"},
	{"id":"014", "title":"行尸走肉第九季主题曲", "mp4":"walking_dead_S9"},
	{"id":"015", "title":"《海上钢琴师》经典片段", "mp4":"Piano"}
]

for(i = 0; i < videolist.length; i++) {
	$("#videoDiv").append("<div class='span4' style='margin-left:0'>" +
							"<p style='color:#f52;font-size:1.2em;margin-top:30px;text-indent:0'>" + videolist[i].title + "</p>" +
							"<video id='my-video' class='video-js' controls preload='auto' width='240' height='200' poster='http://gaohr.win/site/special/2016/2016-07-08-videos/" + videolist[i].mp4 + ".jpg' data-setup='{}'>" +
							"<source src='http://gaohr.win/MyImages/videos/blogs/" + videolist[i].mp4 + ".mp4' type='video/mp4'>" +
							"</video>" +
							"</div>");
}