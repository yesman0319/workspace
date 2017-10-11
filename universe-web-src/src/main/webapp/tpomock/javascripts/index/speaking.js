// 录音
function a(url) {
    var RECORDER_APP_ID = "recorderApp";
    var appWidth = 1;
    var appHeight = 1;
    var flashvars = {
        'upload_image': url
    };
    var params = {};
    var attributes = {
        'id': RECORDER_APP_ID,
        'name': RECORDER_APP_ID
    };
    swfobject.embedSWF("../javascripts/speaking/recorder.swf", "flashcontent", appWidth, appHeight, "11.0.0", "", flashvars, params, attributes);
}
a('');
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
        // var a = audio('#jp-speaking');
        // a.play('http://bbsnew.b0.upaiyun.com/listening_direction2.mp3');
    });

}());
//录音检测
var Testrecord = (function() {
    var time = 0;
    //开始录音
    $('.recordingBtn').on('click', function() {
        FWRecorder.record('audio', 'audio.wav');
        if (FWRecorder.isMicrophoneAccessible()) {
            $(this).hide();
            $('.inRecordingBtn').show();
        }
    });
    //停止录音
    $('.inRecordingBtn').on('click', function() {
        FWRecorder.stopRecording('audio');
        time = parseInt(FWRecorder.recorder.duration('audio'), 10);
        $(this).hide();
        $('.play-box').show();
        $('#RecordTime').html(time);
        ContinueBtnHandle();
    });
    //播放录音
    $('.playBtn').on('click', function() {
        FWRecorder.playBack('audio');
    });
    //重新录音
    $('.againRecord').on('click', function() {
        $('.play-box').hide();
        $('.recordingBtn').show();
    });

    function ContinueBtnHandle() {
            $('#speakingBtn').removeClass('no');
            $('#speakingBtn').on('click', function() {
                $('.Test-audio').find('.jp-jplayer').jPlayer('stop');
                $('.spoken_test').hide();
                $('.spoken_introduce').show();
                //aspause();
            });
        }
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
    var jpCountdown = $('#jp-countdown');
    $.fn.playProgress = function(callback) {
        var $currentTime = $(this).find('.jp-current-time'),
            $totalTime = $(this).find('.jp-total-time'),
            $bar = $(this).find('.jp-play-bar'),
            audiourl = $(this).attr('audiourl');
        jpCountdown.jPlayer({
            ready: function() {
                $(this).jPlayer("setMedia", {
                    mp3: audiourl
                }).jPlayer('play');
            },
            preload: 'auto',
            swfPath: "../swf",
            supplied: "mp3"
        });
        var audioDurationinSeconds;
        jpCountdown.bind($.jPlayer.event.timeupdate, function(event) {
            var curTime = event.jPlayer.status.currentTime;
            audioDurationinSeconds = event.jPlayer.status.duration;
            var p = curTime / audioDurationinSeconds;
            $bar.width(p * 100 + "%");
            $currentTime.text($.jPlayer.convertTime(curTime));
            time = parseInt(curTime, 10);
            $totalTime.text($.jPlayer.convertTime(audioDurationinSeconds));

        });
        jpCountdown.bind($.jPlayer.event.ended, function(event) {
            jpCountdown.jPlayer('clearMedia');
            callback && callback();
        })
    };
    var w_jplayer = audio('#jp-speaking');
    var fifteen = audio('#jp-fifteen');
    var fortyfive = audio('#jp-fortyfive');
    var jpTc = audio('#jp-tc');
    var sIndex = 0;

    function nextTopic() {
        var len = $('.speaking-wrap').length;
        sIndex++;
        if (sIndex == len) {
            $('.speaking-topic').hide();
            $('.Writing-testAudio').show();
            $('.Writing-testAudio').show();
            $('#jp-jplayer1').jPlayer({
                ready: function() {
                    $(this).jPlayer("setMedia", {
                        mp3: "http://bbsnew.b0.upaiyun.com/listening_direction1.mp3"
                    }).jPlayer('play');
                },
                preload: 'auto',
                swfPath: "../swf",
                supplied: "mp3,oga"
            });
            return;
        } else {
            $('.speaking-wrap').eq(sIndex - 1).hide();
            $('.speaking-wrap').eq(sIndex).show();
            $('.speaking-wrap').eq(sIndex).find(".remind-box").append($('.LeftTime-box'));
        }
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
                $btn.hide();
                $audio.hide();
                $content.show();
                w_jplayer.play(tagAudioUrl);
                w_jplayer.playEnd(function() {
                    $audiogetReady.hide();
                    $audioresponse.show();
                    $audioresponse.countdown(function() {
                        $audioresponse.hide();
                        $audiorecording.show();
                        $audiorecording.countdown(function() {
                            nextTopic();
                        });
                    });
                });
            });
        } else if (type == 3 || type == 4) {
            $audio = $wrap.find('.topic-audio'),
                $content = $wrap.find('.translate-content'),
                $a_info = $wrap.find('.a_info'),
                $getTimeShow = $wrap.find('.get-time-show'),
                $audiogetReady = $wrap.find('.audio-getReady'),
                $infomsg4 = $wrap.find('.infomsg-ready-4'),
                $audioresponse = $wrap.find('.audio-response'),
                $audiorecording = $wrap.find('.audio-recording'),
                $time = $wrap.find('.timeOut'),
                $msgShow = $wrap.find('.get-time-msgShow')
                // $btn = $wrap.find('.type3btn');
            var tag1url = $audio.attr('audiourl');
            var tag2url = $content.attr('audiourl');
            var tagAudioUrl = $a_info.attr('audiourl');
            var tag4url = $audioresponse.attr('audiourl');
            var tag5url = $audiorecording.attr('audiourl');
            w_jplayer.play(tag1url);
            w_jplayer.playEnd(function() {
                $btn.trigger('click');
            });
            $btn.bind('click', function() {
                $btn.hide();
                $audio.hide();
                $content.show();
                w_jplayer.play(tag2url);
                w_jplayer.playEnd(function() {

                    // w_jplayer.stop();
                    showMsg(function() {
                        $getTimeShow.hide();
                        $infomsg4.show();
                        $infomsg4.playProgress(function() {
                            $infomsg4.hide();
                            $a_info.show();
                            jpTc.play(tagAudioUrl);
                            jpTc.playEnd(function() {
                                jpTc.stop();
                                $audiogetReady.hide();
                                $audioresponse.show();
                                //fifteen.play(tag4url);
                                ///fifteen.playEnd(function(){
                                //fifteen.stop();
                                $audioresponse.countdown(function() {
                                    $audioresponse.hide();
                                    $audiorecording.show();
                                    //fortyfive.play(tag5url);
                                    //fortyfive.playEnd(function(){
                                    //fortyfive.stop();
                                    $audiorecording.countdown(function() {
                                        nextTopic();
                                    });
                                    //});
                                });

                                //})
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
        } else if (type == 5 || type == 6) {
            $audio = $wrap.find('.topic-audio'),
                $content = $wrap.find('.translate-content'),
                $a_info = $wrap.find('.a_info'),
                $getTimeShow = $wrap.find('.get-time-show'),
                $audiogetReady = $wrap.find('.audio-getReady'),
                $infomsg4 = $wrap.find('.infomsg-ready-4'),
                $audioresponse = $wrap.find('.audio-response'),
                $audiorecording = $wrap.find('.audio-recording')
                // $btn = $wrap.find('.typethree');
            var tag1url = $audio.attr('audiourl');
            var tag2url = $content.attr('audiourl');
            var tagAudioUrl = $a_info.attr('audiourl');
            var tag4url = $audioresponse.attr('audiourl');
            var tag5url = $audiorecording.attr('audiourl');
            w_jplayer.play(tag1url);
            w_jplayer.playEnd(function() {
                $btn.trigger('click');
            });
            $btn.on('click', function() {
                $btn.hide();
                $audio.hide();
                $content.show();
                //w_jplayer.play(tag2url);
                $infomsg4.show();
                w_jplayer.stop();
                $infomsg4.playProgress(function() {
                    $infomsg4.hide();
                    $a_info.show();
                    jpTc.play(tagAudioUrl);
                    jpTc.playEnd(function() {
                        jpTc.stop();
                        $audiogetReady.hide();
                        $audioresponse.show();
                        //fifteen.play(tag4url);
                        //fifteen.playEnd(function(){
                        //fifteen.stop();
                        $audioresponse.countdown(function() {
                            $audioresponse.hide();
                            $audiorecording.show();
                            //fortyfive.play(tag5url);
                            //fortyfive.playEnd(function(){
                            //fortyfive.stop();
                            $audiorecording.countdown(function() {
                                nextTopic();
                            });
                            //});
                        });

                        //})
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
