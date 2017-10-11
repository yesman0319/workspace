
// 可暂停倒计时
var show = true,
    timer = null;

// 阅读暂停按钮
$(".JS_read_pause").click(function() {
    $(".JS_read_pause").html() == "暂停" ? ($(".mask-bg").show(),$(".m-pop-pause").show(),stopTime()) : ($(".mask-bg").hide(),$(".m-pop-pause").hide(),startTime());
    $(".JS_read_pause").html($(".JS_read_pause").html() == '暂停' ? "继续" : '暂停');
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
    $(".mask-bg").show();
    $(".m-pop-timeout").show();
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