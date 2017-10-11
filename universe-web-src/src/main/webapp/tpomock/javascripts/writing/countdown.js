/*var now = new Date(),
    TimeEl = document.getElementById('LeftTime'),
    showTime = document.getElementById('showTime'),
    targetTime, num, LeftTime, t, mm, ss, show = true;
showTime.onclick = function() {
    if (show) {
        this.innerHTML = 'SHOW TIME';
        TimeEl.style.visibility = 'hidden';
    } else {
        this.innerHTML = 'HIDE TIME';
        TimeEl.style.visibility = '';
    }
    show = !show;
}

function countdown(options, callback) {
    options = options || {};
    targetTime = new Date();
    targetTime.setHours(targetTime.getHours() + 1);
    LeftTime = targetTime - now;
    if (options.minutes == 0) {
        mm = 0;
    } else {
        mm = options.minutes || parseInt(LeftTime / 60000, 10);
    }
    ss = options.seconds || parseInt(LeftTime / 100 % 60, 10);

    t = setInterval(function() {
        ss--;
        if (ss <= 0) {
            ss = 59;
            mm -= 1;
        }
        if (mm < 0) {
            clearInterval(t);
            TimeEl.innerHTML = '00:00';
            callback && callback();
            return;
        }
        TimeEl.innerHTML = checkTime(mm) + ':' + checkTime(ss);
    }, 1000);

};

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}*/


// 可暂停倒计时
var show = true,
    timer = null;

// 暂停时间
$(".JS_write_pause").click(function() {
    $(".JS_write_pause").html() == "暂停" ? ($(".mask-bg").show(), $(".m-pop-pause").show(), stopTime(), xm.aspause()) : ($(".mask-bg").hide(), $(".m-pop-pause").hide(), startTime(), xm.asContplay());
    $(".JS_write_pause").html($(".JS_write_pause").html() == '暂停' ? "继续" : '暂停');
})
// 显示/隐藏事件
$(".JS_hidetime").click(function() {
    if(show){
        $(".JS_hidetime").text("SHOW TIME");
        $(".time-txt").fadeOut();
    } else {
        $(".JS_hidetime").text("HIDE TIME");
        $(".time-txt").fadeIn();
    }
    show = !show;
});
// 重新开始计时
function reStartTime(timeElem) {
    clearInterval(timer);
    var timeElem = timeElem || ".time-txt";
    timeCount = parseInt($(timeElem).attr("date-timestamp"));
    timer = setInterval(updateTime, 1000);
}
// 暂停计时
function stopTime() {
    clearInterval(timer);
}
// 继续计时
function startTime() {
    timer = setInterval(updateTime, 1000);
}
// 格式化时间
function format(num) {
    return num.toString().replace(/^(\d)$/,'0$1')
}
// 时间结束执行操作
function readEndAction() {
    if($(".Writing-sumup").css("display") == "block"){
        stopTime();
        $('.Writing-sumup').hide();
        $('.WritingPlay').show();
        xm.audioPlay(0);
    }
    if($("#overall").css("display") == "block"){
        stopTime();
        $(".overall-box").find(".word-count").text($("#overall").find(".count").text());
        var timeArr = $("#overall").find(".time-txt").text().split(":");
        var spentTime = parseInt(timeArr[0]*60) + parseInt(timeArr[1]);
        var timeCount = 1200 - spentTime;
        var mins = format(Math.floor(timeCount / 60)),
            secs = format(Math.floor(timeCount % 60));
        $(".overall-box").find(".answer-time").text(mins + ":" + secs);
        $('#overall').hide();
        $('.autocephaly-testExplain').show();
    }
    if($("#alone").css("display") == "block"){
        stopTime();
        $(".alone-box").find(".word-count").text($("#alone").find(".count").text());
        var timeArr = $("#alone").find(".time-txt").text().split(":");
        var spentTime = parseInt(timeArr[0]*60) + parseInt(timeArr[1]);
        var timeCount = 1800 - spentTime;
        var mins = format(Math.floor(timeCount / 60)),
            secs = format(Math.floor(timeCount % 60));
        $(".alone-box").find(".answer-time").text(mins + ":" + secs);
        $(".mask-bg").show();
        $(".m-pop-timeout").show();
    }
}
function updateTime() {
    timeCount--;
    var mins = format(Math.floor(timeCount / 60)),
        secs = format(Math.floor(timeCount % 60)),
        msec = Math.floor(timeCount) % 1000;
    msec = msec < 100 ? "0" + msec : msec;
    $(".time-txt").text(mins + ":" + secs);
    $(".time-txt").attr("date-time", mins + ":" + secs);
    if(timeCount < 1){
        readEndAction();
        clearInterval(timer);
        return;
    }
}
