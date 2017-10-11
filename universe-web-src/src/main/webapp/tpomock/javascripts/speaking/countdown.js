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
    timer = null,
    timeCount = parseInt($(".time-txt").attr("date-timestamp"));
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
// 清除计时器
function stopTime() {
    clearInterval(timer);
}
// 开始计时
function startTime() {
    timer = setInterval(updateTime, 10);
}
// 暂停时间
$(".JS_speak_pause").live('click', function() {
    $(".JS_speak_pause").html() == "暂停" ? ($(".mask-bg").show(), $(".m-pop-pause").show(), xm.aspause()) : ($(".mask-bg").hide(), $(".m-pop-pause").hide(), xm.asContplay());
    $(".JS_speak_pause").html($(".JS_speak_pause").html() == '暂停' ? "继续" : '暂停');
});

function format(num) {
    return num.toString().replace(/^(\d)$/,'0$1')
}
function updateTime() {
    timeCount -= 10;
    var mins = format(Math.floor(timeCount / (1000 * 60)) % 60),
        secs = format(Math.floor(timeCount / 1000) % 60),
        msec = Math.floor(timeCount) % 1000;
    msec = msec < 100 ? "0" + msec : msec;
    $(".time-txt").text(mins + ":" + secs);
    $(".time-txt").attr("date-time", mins + ":" + secs + "." + msec);
    if(timeCount <= 999){
        clearInterval(timer);
        $(".JS_end").attr("disabled", true);
        return;
    }
}