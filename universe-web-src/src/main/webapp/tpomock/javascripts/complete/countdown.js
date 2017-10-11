// 可暂停倒计时
var show = true,
    timer = null;

// 阅读暂停按钮
$(".JS_read_pause").click(function() {
    $(".JS_read_pause").html() == "暂停" ? ($(".mask-bg").show(),$(".m-pop-pause").show(),stopTime()) : ($(".mask-bg").hide(),$(".m-pop-pause").hide(),startTime());
    $(".JS_read_pause").html($(".JS_read_pause").html() == '暂停' ? "继续" : '暂停');
})
// 听力暂停时间
$(".JS_listen_pause").click(function() {
    $(".JS_listen_pause").html() == "暂停" ? ($(".mask-bg").show(), $(".m-pop-pause").show(), stopTime(), xm.aspause()) : ($(".mask-bg").hide(), $(".m-pop-pause").hide(), startTime(), xm.asContplay());
    $(".JS_listen_pause").html($(".JS_listen_pause").html() == '暂停' ? "继续" : '暂停');
})
// 写作暂停时间
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
    $(timeElem).text($(timeElem).attr("date-timetxt"));
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
    stopTime();
    if($(".g-read").css("display") == "block"){
        $(".wrap").hide();
        $(".g-read").addClass("f-dn");
        $(".g-listen").removeClass("f-dn");
        $(".listen-prepare").removeClass("f-dn");
    }
    if($(".g-listen").css("display") == "block"){
        if($(".listening_wrap").css("display") == "block"){
            $(".listening_wrap").find(".abox").each(function() {
                if($(this).css("display") == "block" && $(this).hasClass("listenPart1")){
                    $(this).css("display", "none");
                    $('.listening_wrap').hide();
                    $(".listen-time").addClass("f-dn");
                    xm.listenMainIndex = 3;
                    xm.listenAIndex = 19;
                    $("body").attr("listen", "1");
                    $('.listening_introduce').show();
                    xm.asplay("http://bbsnew.b0.upaiyun.com/listening_direction2.mp3");
                } else if($(this).css("display") == "block" && $(this).hasClass("listenPart2")){
                    $(this).css("display", "none");
                    $(".listening_wrap").hide();
                    $(".g-listen").addClass("f-dn");
                    $(".g-speak").removeClass("f-dn");
                    $(".speak-prepare").removeClass("f-dn");
                }
            });
        }
    }
    if($(".g-write").css("display") == "block"){
        if($(".Writing-sumup").css("display") == "block"){
            $('.Writing-sumup').hide();
            $('.WritingPlay').show();
            xm.audioPlay(0);
        }
        if($("#overall").css("display") == "block"){
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