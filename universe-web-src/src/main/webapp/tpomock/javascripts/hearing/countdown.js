
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
    timer = setInterval(updateTime, 1000);
}
// 重新开始计时
function reStartTime(timeElem) {
    clearInterval(timer);
    var timeElem = timeElem || ".time-txt";
    $(timeElem).text($(timeElem).attr("date-timetxt"));
    timeCount = parseInt($(timeElem).attr("date-timestamp"));
    timer = setInterval(updateTime, 1000);
}
// 暂停时间
$(".JS_listen_pause").click(function() {
    $(".JS_listen_pause").html() == "暂停" ? ($(".mask-bg").show(), $(".m-pop-pause").show(), stopTime(), xm.aspause()) : ($(".mask-bg").hide(), $(".m-pop-pause").hide(), startTime(), xm.asContplay());
    $(".JS_listen_pause").html($(".JS_listen_pause").html() == '暂停' ? "继续" : '暂停');
})
// 格式化时间
function format(num) {
    return num.toString().replace(/^(\d)$/,'0$1')
}
// 时间结束执行操作
function readEndAction() {
    if($(".listening_wrap").css("display") == "block"){
        $(".listening_wrap").find(".abox").each(function() {
            if($(this).css("display") == "block" && $(this).hasClass("listenPart1")){
                console.log(1);
                stopTime();
                $(this).css("display", "none");
                $('.listening_wrap').hide();
                $(".listen-time").addClass("f-dn");
                xm.listenMainIndex = 3;
                xm.listenAIndex = 19;
                $("body").attr("listen", "1");
                $('.listening_introduce').show();
                xm.asplay("http://bbsnew.b0.upaiyun.com/listening_direction2.mp3");
            } else if($(this).css("display") == "block" && $(this).hasClass("listenPart2")){
                console.log(2);
                $(this).css("display", "none");
                xm.listenAnswerShow();
                $(".listening_wrap").hide();
                $(".listen-result").removeClass("f-dn");
            }
        });
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