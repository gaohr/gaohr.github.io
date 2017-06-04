//建立动画对象
function createAnime(callback) {
    if (!callback) return null;
    var anime = new Object();
    anime.starttime//动画开始时间
    anime.fps;//上一秒帧数
    anime.secondstarttime;//当前秒开始时间（用于统计每秒的帧数）
    anime.framestarttime;
    anime.nextfps;
    anime.status = "idle";
    anime.start = function () {
        if (this.status == "running") return;
        this.status = "running";
        if (this.status == "idle") this.starttime = new Date();//初次启动才计时
        this.secondstarttime = new Date();
        this.framestarttime = new Date();
        this.fps = 0;//上一秒帧数
        this.nextfps = 0;

        _animeFrame(this, callback);
    };
    anime.stop = function () {
        this.status = "stopped";
    };
    return anime;
}

function _animeFrame(anime, callback) {
    anime.nextfps++;//累加帧数
    var currenttime = new Date()
    if (currenttime - anime.secondstarttime >= 1000) {//满1秒则为帧数赋值，清空计数
        anime.fps = anime.nextfps;
        anime.nextfps = 0;
        anime.secondstarttime = currenttime;
    }
    var framespan = currenttime - anime.framestarttime;//计算两帧间隔
    anime.framestarttime = currenttime;

    callback(framespan, anime.fps);
    if (anime && anime.status == "running") {
        requestAnimationFrame(function () {
                _animeFrame(anime, callback);
            }
        );
    }
}


//requestAnimationFrame动画方法的兼容性
(function () {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // Webkit中此取消方法的名字变了
            window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function () {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
    }
}());