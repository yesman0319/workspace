function timecode(ms) {
    var hms = {
        h: Math.floor(ms/(60*60*1000)),
        m: Math.floor((ms/60000) % 60),
        s: Math.floor((ms/1000) % 60)
    };
    var tc = []; // Timecode array to be joined with '.'

    if (hms.h > 0) {
        tc.push(hms.h);
    }

    tc.push((hms.m < 10 && hms.h > 0 ? "0" + hms.m : hms.m));
    tc.push((hms.s < 10  ? "0" + hms.s : hms.s));

    return tc.join(':');
}

// 初始化
Recorder.initialize({
    swfSrc: "../javascripts/speaking/recorder.swf"
});

// 开始录音
function record(callback){
    Recorder.record({
        start: function(){
            callback && callback();
        },
        progress: function(milliseconds){
            //document.getElementById("time").innerHTML = timecode(milliseconds);
        }
    });
}

// 播放录音
function play(){
    Recorder.stop();
    Recorder.play({
        progress: function(milliseconds){
            //document.getElementById("time").innerHTML = timecode(milliseconds);
        }
    });
}

// 停止录音/播放
function stop(){
    Recorder.stop();
}

// 上传
var recordArr = [];
function upload(callback){
    $.ajax({
        type: "GET",
        url: xm.baseURL + "/mkTpo/file/posts.action",
        dataType : "json",
        success: function(data) {
            var expiration = data.expiration,
                saveKey = data["save-key"],
                bucket = data.bucket,
                policy = data.poily,
                signature = data.signature;

            Recorder.upload({
                method: "POST",
                url: "http://v0.api.upyun.com/universe1",
                audioParam: "file",
                params: {
                    "expiration": expiration,
                    "save-key": saveKey,
                    "bucket": bucket,
                    "policy": policy,
                    "signature": signature
                },
                success: function(responseText){
                    var data = JSON.parse(responseText);
                    recordArr.push(data.url);
                    callback && callback();
                }
            });
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("XMLHttpRequest.status: " + XMLHttpRequest.status);
            console.log("XMLHttpRequest.readyState: " + XMLHttpRequest.readyState);  
            console.log("textStatus: " + textStatus);
        }
    });
}

var audio = (function() {
    return function(obj) {
        var speakingJPlayer;
        speakingJPlayer = $(obj).jPlayer({
            ready: function() {
                $(this).jPlayer("setMedia", {
                    mp3: ""
                });
            },
            preload: 'auto',
            swfPath: "../swf",
            supplied: "mp3"
        });
        return {
            play: function(mp3url) {
                speakingJPlayer.jPlayer("setMedia", {
                    mp3: mp3url
                }).jPlayer("play");
            },
            stop: function() {
                speakingJPlayer.jPlayer('stop');
            },
            playEnd: function(callback) {
                speakingJPlayer.unbind();
                speakingJPlayer.bind($.jPlayer.event.ended, function(event) {
                    speakingJPlayer.jPlayer('clearMedia');
                    callback && callback();
                })
            }
        };
    }
}());

//口语音频测试
var TestAudio = (function() {
    var $parent = $('.Test-audio'),
        $lbIcon = $parent.find('.lbIcon');

    $lbIcon.on('click', function() {
        var a = audio('#jp-jplayer');
        a.play("../autio/beep2.mp3");
    });

}());

var jpCountdown3 = $('#jp-progress3');
var jpCountdown4 = $('#jp-progress4');
var jpCountdown5 = $('#jp-progress5');
var jpCountdown6 = $('#jp-progress6');
//录音检测
var Testrecord = (function() {
    var time = 0;
    //切换口语考题
    var ContinueSpeaking = (function() {
        var btn = $('#continueSpeaking');
        btn.on('click', function() {
            $('.spoken_introduce').hide();
            $('.speaking-wrap:eq(0)').show();
            $('.speaking-wrap:eq(0)').find('.remind-box').append($('.LeftTime-box'));
            SpeakingTopicHandle();
        });
    }());

    // 进度条
    $.fn.playProgress3 = function(callback) {
        var $currentTime = $(this).find('.jp-current-time'),
            $totalTime = $(this).find('.jp-total-time'),
            $bar = $(this).find('.jp-play-bar'),
            audiourl = $(this).attr('audiourl');
            that = $(this);
        jpCountdown3.jPlayer({
            ready: function() {
                $(this).jPlayer("setMedia", {
                    mp3: that.attr('audiourl')
                }).jPlayer('play');
            },
            preload: 'auto',
            swfPath: "../swf",
            supplied: "mp3"
        });
        var audioDurationinSeconds;
        jpCountdown3.bind($.jPlayer.event.timeupdate, function(event) {
            var curTime = event.jPlayer.status.currentTime;
            audioDurationinSeconds = event.jPlayer.status.duration;
            var p = curTime / audioDurationinSeconds;
            $bar.width(p * 100 + "%");
            $currentTime.text($.jPlayer.convertTime(curTime));
            time = parseInt(curTime, 10);
            $totalTime.text($.jPlayer.convertTime(audioDurationinSeconds));
        });
        jpCountdown3.bind($.jPlayer.event.ended, function(event) {
            jpCountdown3.jPlayer('clearMedia');
            callback && callback();
        })
    };
    $.fn.playProgress4 = function(callback) {
        var $currentTime = $(this).find('.jp-current-time'),
            $totalTime = $(this).find('.jp-total-time'),
            $bar = $(this).find('.jp-play-bar'),
            audiourl = $(this).attr('audiourl');
            that = $(this);
        jpCountdown4.jPlayer({
            ready: function() {
                $(this).jPlayer("setMedia", {
                    mp3: that.attr('audiourl')
                }).jPlayer('play');
            },
            preload: 'auto',
            swfPath: "../swf",
            supplied: "mp3"
        });
        var audioDurationinSeconds;
        jpCountdown4.bind($.jPlayer.event.timeupdate, function(event) {
            var curTime = event.jPlayer.status.currentTime;
            audioDurationinSeconds = event.jPlayer.status.duration;
            var p = curTime / audioDurationinSeconds;
            $bar.width(p * 100 + "%");
            $currentTime.text($.jPlayer.convertTime(curTime));
            time = parseInt(curTime, 10);
            $totalTime.text($.jPlayer.convertTime(audioDurationinSeconds));
        });
        jpCountdown4.bind($.jPlayer.event.ended, function(event) {
            jpCountdown4.jPlayer('clearMedia');
            callback && callback();
        })
    };
    $.fn.playProgress5 = function(callback) {
        var $currentTime = $(this).find('.jp-current-time'),
            $totalTime = $(this).find('.jp-total-time'),
            $bar = $(this).find('.jp-play-bar'),
            audiourl = $(this).attr('audiourl');
            that = $(this);
        jpCountdown5.jPlayer({
            ready: function() {
                $(this).jPlayer("setMedia", {
                    mp3: that.attr('audiourl')
                }).jPlayer('play');
            },
            preload: 'auto',
            swfPath: "../swf",
            supplied: "mp3"
        });
        var audioDurationinSeconds;
        jpCountdown5.bind($.jPlayer.event.timeupdate, function(event) {
            var curTime = event.jPlayer.status.currentTime;
            audioDurationinSeconds = event.jPlayer.status.duration;
            var p = curTime / audioDurationinSeconds;
            $bar.width(p * 100 + "%");
            $currentTime.text($.jPlayer.convertTime(curTime));
            time = parseInt(curTime, 10);
            $totalTime.text($.jPlayer.convertTime(audioDurationinSeconds));
        });
        jpCountdown5.bind($.jPlayer.event.ended, function(event) {
            jpCountdown5.jPlayer('clearMedia');
            callback && callback();
        })
    };
    $.fn.playProgress6 = function(callback) {
        var $currentTime = $(this).find('.jp-current-time'),
            $totalTime = $(this).find('.jp-total-time'),
            $bar = $(this).find('.jp-play-bar'),
            audiourl = $(this).attr('audiourl');
            that = $(this);
        jpCountdown6.jPlayer({
            ready: function() {
                $(this).jPlayer("setMedia", {
                    mp3: that.attr('audiourl')
                }).jPlayer('play');
            },
            preload: 'auto',
            swfPath: "../swf",
            supplied: "mp3"
        });
        var audioDurationinSeconds;
        jpCountdown6.bind($.jPlayer.event.timeupdate, function(event) {
            var curTime = event.jPlayer.status.currentTime;
            audioDurationinSeconds = event.jPlayer.status.duration;
            var p = curTime / audioDurationinSeconds;
            $bar.width(p * 100 + "%");
            $currentTime.text($.jPlayer.convertTime(curTime));
            time = parseInt(curTime, 10);
            $totalTime.text($.jPlayer.convertTime(audioDurationinSeconds));
        });
        jpCountdown6.bind($.jPlayer.event.ended, function(event) {
            jpCountdown6.jPlayer('clearMedia');
            callback && callback();
        })
    };
    var w_jplayer = audio('#jp-jplayer');
    var sIndex = 0;

    function nextTopic() {
        var len = $('.speaking-wrap').length;
        sIndex++;
        if (sIndex == len) {
            $('.speaking-topic').hide();
            xm.speakAnswerShow();
            $('.speak-result').removeClass("f-dn");
            return;
        } else {
            $('.speaking-wrap').eq(sIndex - 1).hide();
            $('.speaking-wrap').eq(sIndex).show();
            $('.speaking-wrap').eq(sIndex).find(".remind-box").append($('.LeftTime-box'));
        }
        $(".audio-recording-upload").text("");
        SpeakingTopicHandle();
    }

    function SpeakingTopicHandle() {
        var $wrap = $('.speaking-wrap:visible'),
            type = $wrap.attr('type');
        $btn = $wrap.find('.continueTopic');

        $btn.unbind();

        if (type == 1 || type == 2) {
            $audio = $wrap.find('.topic-audio'),
            $content = $wrap.find('.translate-content'),
            $audiogetReady = $wrap.find('.audio-getReady'),
            $audioresponse = $wrap.find('.audio-response'),
            $audiorecording = $wrap.find('.audio-recording');
            var tag1url = $audio.attr('audiourl');
            w_jplayer.play(tag1url);
            w_jplayer.playEnd(function() {
                $btn.trigger('click');
            });
            var tag1url = $audio.attr('audiourl');
            var tag4url = $audioresponse.attr('audiourl');
            var tag5url = $audiorecording.attr('audiourl');
            var tagAudioUrl = $content.attr('audiourl');
            $btn.bind('click', function() {
                w_jplayer.stop();
                $btn.hide();
                $audio.hide();
                $content.show();
                if($(".translate-content").css("display") == "block"){
                    if($(".audio-response").css("display") == "block" || $(".audio-recording").css("display") == "block" || $(".get-time-show").css("display") == "block"){
                        $(".JS_speak_pause").attr("disabled", true);
                    }
                }
                w_jplayer.play(tagAudioUrl);
                w_jplayer.playEnd(function() {
                    $audiogetReady.hide();
                    $audioresponse.show();
                    
                    w_jplayer.play(tag4url);
                    w_jplayer.playEnd(function() {
                        $audioresponse.countdown(function() {
                            $audioresponse.hide();
                            $audiorecording.show();
                            w_jplayer.play(tag5url);
                            w_jplayer.playEnd(function() {
                                record(function() {
                                    $audiorecording.countdown(function() {
                                        window.setTimeout(function(){
                                            stop();
                                            $(".audio-recording-upload").text("音频提交中...");
                                            upload(function() {
                                                $(".audio-recording-upload").text("提交完成");
                                                $(".JS_speak_pause").attr("disabled", false);
                                                nextTopic();
                                            });
                                        },1000)

                                    });
                                });
                            })
                        });
                    })
                    
                });
            });
        } else if (type == 3) {
            $audio = $wrap.find('.topic-audio'),
            $content = $wrap.find('.translate-content'),
            $a_info = $wrap.find('.a_info'),
            $getTimeShow = $wrap.find('.get-time-show'),
            $audiogetReady = $wrap.find('.audio-getReady'),
            $infomsg4 = $wrap.find('.infomsg-ready-4'),
            $audioresponse = $wrap.find('.audio-response'),
            $audiorecording = $wrap.find('.audio-recording'),
            $time = $wrap.find('.timeOut'),
            $msgShow = $wrap.find('.get-time-msgShow');

            var tag1url = $audio.attr('audiourl');
            var tag2url = $content.attr('audiourl');
            var tagAudioUrl = $a_info.attr('audiourl');
            var tag3url = $infomsg4.attr('audiourl');
            var tag4url = $audioresponse.attr('audiourl');
            var tag5url = $audiorecording.attr('audiourl');
            w_jplayer.play(tag1url);
            w_jplayer.playEnd(function() {
                $btn.trigger('click');
            });
            $btn.bind('click', function() {
                w_jplayer.stop();
                $btn.hide();
                $audio.hide();
                $content.show();
                if($(".translate-content").css("display") == "block"){
                    if($(".audio-response").css("display") == "block" || $(".audio-recording").css("display") == "block" || $(".get-time-show").css("display") == "block"){
                        $(".JS_speak_pause").attr("disabled", true);
                    }
                }
                w_jplayer.play(tag2url);
                w_jplayer.playEnd(function() {
                    showMsg(function() {
                        $getTimeShow.hide();
                        $(".JS_speak_pause").attr("disabled", false);
                        $infomsg4.show();
                        //w_jplayer.play(tag3url);
                        $infomsg4.playProgress3(function() {
                            $infomsg4.hide();
                            if($(".translate-content").css("display") == "block"){
                                if($(".audio-response").css("display") == "block" || $(".audio-recording").css("display") == "block" || $(".get-time-show").css("display") == "block"){
                                    $(".JS_speak_pause").attr("disabled", true);
                                }
                            }
                            $a_info.show();
                            w_jplayer.play(tagAudioUrl);
                            w_jplayer.playEnd(function() {
                                w_jplayer.stop();
                                $audiogetReady.hide();
                                $audioresponse.show();
                                w_jplayer.play(tag4url);
                                w_jplayer.playEnd(function(){
                                    $audioresponse.countdown(function() {
                                        $audioresponse.hide();
                                        $audiorecording.show();
                                        w_jplayer.play(tag5url);
                                        w_jplayer.playEnd(function(){
                                            record(function() {
                                                $audiorecording.countdown(function() {
                                                    window.setTimeout(function(){
                                                        stop();
                                                        $(".audio-recording-upload").text("音频提交中...");
                                                        upload(function() {
                                                            $(".audio-recording-upload").text("提交完成");
                                                            $(".JS_speak_pause").attr("disabled", false);
                                                            nextTopic();
                                                        });
                                                    },1000)

                                                });
                                            });
                                        });
                                    });
                                })
                            });
                        });

                    });
                });
            });

            function showMsg(callback) {
                var text = $time.html();
                var timer = null;
                timer = setInterval(function() {
                    $msgShow.fadeIn(300);
                    text--;
                    if (text <= 0) {
                        clearInterval(timer);
                        callback && callback();
                    }
                    $time.html(checkTime(text));
                }, 1000);
            }
        } else if (type == 4) {
            $audio = $wrap.find('.topic-audio'),
            $content = $wrap.find('.translate-content'),
            $a_info = $wrap.find('.a_info'),
            $getTimeShow = $wrap.find('.get-time-show'),
            $audiogetReady = $wrap.find('.audio-getReady'),
            $infomsg4 = $wrap.find('.infomsg-ready-4'),
            $audioresponse = $wrap.find('.audio-response'),
            $audiorecording = $wrap.find('.audio-recording'),
            $time = $wrap.find('.timeOut'),
            $msgShow = $wrap.find('.get-time-msgShow');

            var tag1url = $audio.attr('audiourl');
            var tag2url = $content.attr('audiourl');
            var tagAudioUrl = $a_info.attr('audiourl');
            var tag3url = $infomsg4.attr('audiourl');
            var tag4url = $audioresponse.attr('audiourl');
            var tag5url = $audiorecording.attr('audiourl');
            w_jplayer.play(tag1url);
            w_jplayer.playEnd(function() {
                $btn.trigger('click');
            });
            $btn.bind('click', function() {
                w_jplayer.stop();
                $btn.hide();
                $audio.hide();
                $content.show();
                if($(".translate-content").css("display") == "block"){
                    if($(".audio-response").css("display") == "block" || $(".audio-recording").css("display") == "block" || $(".get-time-show").css("display") == "block"){
                        $(".JS_speak_pause").attr("disabled", true);
                    }
                }
                w_jplayer.play(tag2url);
                w_jplayer.playEnd(function() {
                    showMsg(function() {
                        $getTimeShow.hide();
                        $(".JS_speak_pause").attr("disabled", false);
                        $infomsg4.show();
                        //w_jplayer.play(tag3url);
                        $infomsg4.playProgress4(function() {
                            $infomsg4.hide();
                            if($(".translate-content").css("display") == "block"){
                                if($(".audio-response").css("display") == "block" || $(".audio-recording").css("display") == "block" || $(".get-time-show").css("display") == "block"){
                                    $(".JS_speak_pause").attr("disabled", true);
                                }
                            }
                            $a_info.show();
                            w_jplayer.play(tagAudioUrl);
                            w_jplayer.playEnd(function() {
                                w_jplayer.stop();
                                $audiogetReady.hide();
                                $audioresponse.show();
                                w_jplayer.play(tag4url);
                                w_jplayer.playEnd(function(){
                                    $audioresponse.countdown(function() {
                                        $audioresponse.hide();
                                        $audiorecording.show();
                                        w_jplayer.play(tag5url);
                                        w_jplayer.playEnd(function(){
                                            record(function() {
                                                $audiorecording.countdown(function() {
                                                    window.setTimeout(function(){
                                                        stop();
                                                        $(".audio-recording-upload").text("音频提交中...");
                                                        upload(function() {
                                                            $(".audio-recording-upload").text("提交完成");
                                                            $(".JS_speak_pause").attr("disabled", false);
                                                            nextTopic();
                                                        });},1000)
                                                });
                                            });
                                        });
                                    });
                                })
                            });
                        });

                    });
                });
            });

            function showMsg(callback) {
                var text = $time.html();
                var timer = null;
                timer = setInterval(function() {
                    $msgShow.fadeIn(300);
                    text--;
                    if (text <= 0) {
                        clearInterval(timer);
                        callback && callback();
                    }
                    $time.html(checkTime(text));
                }, 1000);
            }
        } else if (type == 5) {
            $audio = $wrap.find('.topic-audio'),
            $content = $wrap.find('.translate-content'),
            $a_info = $wrap.find('.a_info'),
            $getTimeShow = $wrap.find('.get-time-show'),
            $audiogetReady = $wrap.find('.audio-getReady'),
            $infomsg4 = $wrap.find('.infomsg-ready-4'),
            $audioresponse = $wrap.find('.audio-response'),
            $audiorecording = $wrap.find('.audio-recording')

            var tag1url = $audio.attr('audiourl');
            var tag2url = $content.attr('audiourl');
            var tagAudioUrl = $a_info.attr('audiourl');
            var tag3url = $infomsg4.attr('audiourl');
            var tag4url = $audioresponse.attr('audiourl');
            var tag5url = $audiorecording.attr('audiourl');
            w_jplayer.play(tag1url);
            w_jplayer.playEnd(function() {
                $btn.trigger('click');
            });
            $btn.on('click', function() {
                w_jplayer.stop();
                $btn.hide();
                $audio.hide();
                $content.show();
                $infomsg4.show();
                //w_jplayer.play(tag3url);
                $infomsg4.playProgress5(function() {
                    $infomsg4.hide();
                    if($(".translate-content").css("display") == "block"){
                        if($(".audio-response").css("display") == "block" || $(".audio-recording").css("display") == "block" || $(".get-time-show").css("display") == "block"){
                            $(".JS_speak_pause").attr("disabled", true);
                        }
                    }
                    $a_info.show();
                    w_jplayer.play(tagAudioUrl);
                    w_jplayer.playEnd(function() {
                        $audiogetReady.hide();
                        $audioresponse.show();
                        w_jplayer.play(tag4url);
                        w_jplayer.playEnd(function(){
                            $audioresponse.countdown(function() {
                                $audioresponse.hide();
                                $audiorecording.show();
                                w_jplayer.play(tag5url);
                                w_jplayer.playEnd(function(){
                                    record(function() {
                                        $audiorecording.countdown(function() {
                                            window.setTimeout(function(){
                                                stop();
                                                $(".audio-recording-upload").text("音频提交中...");
                                                upload(function() {
                                                    $(".audio-recording-upload").text("提交完成");
                                                    $(".JS_speak_pause").attr("disabled", false);
                                                    nextTopic();
                                                });
                                            },1000);

                                        });
                                    });
                                });
                            });
                        })
                    });
                });
            });
        } else if (type == 6) {
            $audio = $wrap.find('.topic-audio'),
            $content = $wrap.find('.translate-content'),
            $a_info = $wrap.find('.a_info'),
            $getTimeShow = $wrap.find('.get-time-show'),
            $audiogetReady = $wrap.find('.audio-getReady'),
            $infomsg4 = $wrap.find('.infomsg-ready-4'),
            $audioresponse = $wrap.find('.audio-response'),
            $audiorecording = $wrap.find('.audio-recording')

            var tag1url = $audio.attr('audiourl');
            var tag2url = $content.attr('audiourl');
            var tagAudioUrl = $a_info.attr('audiourl');
            var tag3url = $infomsg4.attr('audiourl');
            var tag4url = $audioresponse.attr('audiourl');
            var tag5url = $audiorecording.attr('audiourl');
            w_jplayer.play(tag1url);
            w_jplayer.playEnd(function() {
                $btn.trigger('click');
            });
            $btn.on('click', function() {
                w_jplayer.stop();
                $btn.hide();
                $audio.hide();
                $content.show();
                $infomsg4.show();
                //w_jplayer.play(tag3url);
                $infomsg4.playProgress6(function() {
                    $infomsg4.hide();
                    if($(".translate-content").css("display") == "block"){
                        if($(".audio-response").css("display") == "block" || $(".audio-recording").css("display") == "block" || $(".get-time-show").css("display") == "block"){
                            $(".JS_speak_pause").attr("disabled", true);
                        }
                    }
                    $a_info.show();
                    w_jplayer.play(tagAudioUrl);
                    w_jplayer.playEnd(function() {
                        $audiogetReady.hide();
                        $audioresponse.show();
                        w_jplayer.play(tag4url);
                        w_jplayer.playEnd(function(){
                            $audioresponse.countdown(function() {
                                $audioresponse.hide();
                                $audiorecording.show();
                                w_jplayer.play(tag5url);
                                w_jplayer.playEnd(function(){
                                    record(function() {
                                        $audiorecording.countdown(function() {
                                            window.setTimeout(function(){
                                                stop();
                                                $(".audio-recording-upload").text("音频提交中...");
                                                upload(function() {
                                                    $(".audio-recording-upload").text("提交完成");
                                                    $(".JS_speak_pause").attr("disabled", false);
                                                    nextTopic();
                                                });
                                            },1000)

                                        });
                                    });
                                });
                            });
                        })
                    });
                });
            });
        }
    }
}())

$.fn.countdown = function(callback) {
    var timer = null,
        $time = $(this).find('.time'),
        $progress = $(this).find('.audio-recording-run'),
        num = text = $time.text(),
        i = 0,
        salce;
    clearInterval(timer);
    timer = setInterval(function() {
        i++;
        salce = i / num;

        $time.text(checkTime(text - i));
        $progress.width(salce * $progress.parent().width());

        if (i >= num) {
            clearInterval(timer);
            callback && callback();
        }
    }, 1000);
    
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
