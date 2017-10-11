(function() {
    $.extend(xm, {
        initPage: function() {
            //解析URL
            xm.analysisUrl();
            //绑定事件
            xm.bindEvent();
            //听力音频对象
            xm.playObject();
            //load加载完成隐藏loading图
            $('.loadBox').hide();
            //防止重复提交表单变量
            xm.flag = false;
        },
        analysisUrl: function() {
            url = window.location.href;
            xm.tpoId = Utils.getUrlParam(url, "tpoId");
            xm.seqNum=Utils.getUrlParam(url, "seqNum");
            xm.dayId=Utils.getUrlParam(url, "dayid")==null?0:Utils.getUrlParam(url, "dayid");
            xm.exerciseId = Utils.getUrlParam(url, "exerciseid")==null?0:Utils.getUrlParam(url, "exerciseid");
            if (xm.tpoId) {
                $("title").text("TPO" + xm.seqNum + "口语在线模拟--精英计划中心");
                $(".tpoTit").text(xm.seqNum);
                //初始化页面
                xm.initForm();
            }
        },
        initForm: function() {
            //获取口语
            $.ajax({
                type: "GET",
                url: xm.baseURL + "/mkSpeakingQuestion/tpos/" + xm.tpoId + "/speaking/questions.action",
                dataType : "json",
                success: function(speakingData) {
                    var dataStr = '';
                    for (var i = 0, len = speakingData.speakingQuestions.length; i < len; i++) {
                        var data = speakingData.speakingQuestions[i];
                        var type = speakingData.speakingQuestions[i].seqNum;
                        dataStr += '<div class="speaking-wrap" topicid="' + data.id + '" type="' + type + '">' +
                            '<div class="m-top">'+
                                '<a class="logo f-fl" href="#"><img src="../images/logo.png" alt=""></a>'+
                                '<div class="top-cnt f-fl">'+
                                    '<h3 class="top-tit u-tit f-mbm">TPO <span class="tpoTit">' + xm.tpoId + '</span>&nbsp;&nbsp;Speaking</h3>'+
                                    '<a class="u-btn u-btn-fn2 u-btn-pause JS_speak_pause" href="javascript:;">暂停</a>'+
                                '</div>'+
                                '<div class="top-cte">' +
                                    '<p class="top-question-num">Question ' + type + ' of ' + speakingData.speakingQuestions.length + '</p>' +
                                '</div>' +
                                '<div class="top-cnt f-fr">'+
                                    '<div class="top-fn f-mbm f-fr">'+
                                        '<a class="u-btn u-btn-continue continueTopic" href="javascript:;">Continue</a>'+
                                        '<div class="m-volume f-fr">'+
                                            '<a class="u-btn u-btn-fn u-btn-volume f-ti Volume" href="javascript:;">volume</a>'+
                                            '<div class="volume-box DragDrap-v-box">'+
                                                '<div class="volume-progress">'+
                                                    '<div class="volume-range range"></div>'+
                                                    '<div class="volume-icon drapIcon"></div>'+
                                                '</div>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="clear"></div>'+
                                    '<div class="top-time f-dn f-fr">'+
                                        '<span class="time-txt f-fr" date-timestamp="3600000">60:00</span>'+
                                        '<a class="u-btn u-btn-time f-fr JS_hidetime" href="javascript:;">HIDE TIME</a>'+
                                    '</div>'+
                                '</div>'+
                            '</div>';
                        if (type == 1 || type == 2) {
                            dataStr += '<div class="topic-audio" audiourl="' + data.preQuestionAudio + '">' +
                                '<div class="img-wrap">' +
                                '<img class="topic-img" width="400" src="' + data.preQuestionImg + '" alt="" />' +
                                '<p class="s-audio-text f18 c3">播放Question' + data.seqNum + '题型介绍中，您可以点击右上角的Continue跳过</p>' +
                                '</div>' +
                                '</div>' +
                                '<div class="translate-content" audiourl="' + data.questionAudio + '">' +
                                '<div class="audio-info auto">' +
                                '<div class="audio-infomsg-main auto">' +
                                '<p class="audio-test-infomsg f18 c3 tl">' + data.question + '</p>' +
                                '</div>' +
                                '</div>' +
                                '<div class="audio-getReady">' +
                                '<div class="headset-icon"></div>' +
                                '<div class="getReady-time f18 cf">Preparation Time: ' + data.prepareTime + ' Seconds</div>' +
                                '<div class="getReady-time f18 cf">Response Time: ' + data.answerTime + ' Seconds</div>' +
                                '</div>' +
                                '<div class="audio-response" audiourl="' + data.prepareAudio + '">' +
                                '<div class="audio-recording-t">Prepare your response</div>' +
                                '<div class="audio-recording-m">00:<span class="time">' + data.prepareTime + '</span></div>' +
                                '<div class="audio-recording-b">' +
                                '<div class="audio-recording-run"></div>' +
                                '</div>' +
                                '</div>' +
                                '<div class="audio-recording" audiourl="' + data.recordingAudio + '">' +
                                '<div class="audio-recording-t">Recording</div>' +
                                '<div class="audio-recording-m">00:<span class="time">' + data.answerTime + '</span></div>' +
                                '<div class="audio-recording-b">' +
                                '<div class="audio-recording-run"></div>' +
                                '</div>' +
                                '</div>' +
                                '<p class="audio-recording-upload"></p>' +
                                '</div>' +
                                '</div>';
                        } else if (type == 3 || type == 4) {
                            dataStr +='<div class="topic-audio" audiourl="' + data.preQuestionAudio + '">' +
                                '<div class="img-wrap">' +
                                '<img class="topic-img" width="400" src="' + data.preQuestionImg + '" alt="" />' +
                                '<p class="s-audio-text f18 c3">播放Question' + data.seqNum + '题型介绍中，您可以点击右上角的Continue跳过</p>' +
                                '</div>' +
                                '</div>' +
                                '<div class="translate-content" audiourl="' + data.preReadingAudio + '">' +
                                '<div class="infomsg-ready-2">' +
                                '<div class="get-time-show">' +
                                '<div class="get-time-top">Reading time : 00:<span class="timeOut">45</span></div>' +
                                '<div class="get-time-messag">' +
                                '<p style="" class="get-time-msgShow">' + data.readingContent + '</p>' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '<div class="infomsg-ready-4" audiourl="' + data.dialogAudio + '">' +
                                '<div class="ill-body-main">' +
                                '<img src="' + data.dialogImg + '">' +
                                '</div>' +
                                
                                '<div class="m-progress jp-progress">'+
                                    '<div class="prog-box jp-seek-bar">'+
                                        '<div class="prog-range jp-play-bar"><i class="prog-icon"></i></div>'+
                                    '</div>'+
                                '</div>'+
                                '<div class="update-time f20 c6">' +
                                    '<span class="jp-current-time">00:00</span><span class="total-time">/<em class="jp-total-time">00:00</em></span>' +
                                '</div>' +
                                
                                '</div>' +
                                '<div class="a_info" audiourl="' + data.questionAudio + '">' +
                                '<div class="audio-info auto">' +
                                '<div class="audio-infomsg-main auto">' +
                                '<p class="audio-test-infomsg f18 c3 tl">' + data.question + '</p>' +
                                '</div>' +
                                '</div>' +
                                '<div class="audio-getReady">' +
                                '<div class="headset-icon"></div>' +
                                '<div class="getReady-time f18 cf">Preparation Time: ' + data.prepareTime + ' Seconds</div>' +
                                '<div class="getReady-time f18 cf">Response Time: ' + data.answerTime + ' Seconds</div>' +
                                '</div>' +
                                '</div>' +
                                '<div class="audio-response" audiourl="' + data.prepareAudio + '">' +
                                '<div class="audio-recording-t">Prepare your response</div>' +
                                '<div class="audio-recording-m">00:<span class="time">' + data.prepareTime + '</span></div>' +
                                '<div class="audio-recording-b">' +
                                '<div class="audio-recording-run"></div>' +
                                '</div>' +
                                '</div>' +
                                '<div class="audio-recording" audiourl="' + data.recordingAudio + '">' +
                                '<div class="audio-recording-t">Recording</div>' +
                                '<div class="audio-recording-m">00:<span class="time">' + data.answerTime + '</span></div>' +
                                '<div class="audio-recording-b">' +
                                '<div class="audio-recording-run"></div>' +
                                '</div>' +
                                '</div>' +
                                '<p class="audio-recording-upload"></p>' +
                                '</div>' +
                                '</div>';
                        } else if (type == 5 || type == 6) {
                            dataStr += '<div class="topic-audio" audiourl="' + data.preQuestionAudio + '">' +
                                '<div class="img-wrap">' +
                                '<img class="topic-img" width="400" src="' + data.preQuestionImg + '" alt="" />' +
                                '<p class="s-audio-text f18 c3">播放Question' + data.seqNum + '题型介绍中，您可以点击右上角的Continue跳过</p>' +
                                '</div>' +
                                '</div>' +
                                '<div class="translate-content" audiourl="' + data.questionAudio + '">' +
                                '<div class="topic-audio" audiourl="' + data.preQuestionAudio + '">' +
                                '<div class="img-wrap">' +
                                '<img class="topic-img" width="400" src="' + data.preQuestionImg + '" alt="" />' +
                                '</div>' +
                                '</div>' +
                                '<div class="infomsg-ready-4" audiourl="' + data.dialogAudio + '">' +
                                '<div class="ill-body-main">' +
                                '<img src="' + data.dialogImg + '">' +
                                '</div>' +
                                
                                '<div class="m-progress jp-progress">'+
                                    '<div class="prog-box jp-seek-bar">'+
                                        '<div class="prog-range jp-play-bar"><i class="prog-icon"></i></div>'+
                                    '</div>'+
                                '</div>'+
                                '<div class="update-time f20 c6">' +
                                    '<span class="jp-current-time">00:00</span><span class="total-time">/<em class="jp-total-time">00:00</em></span>' +
                                '</div>' +
                                
                                '</div>' +
                                '<div class="a_info" audiourl="' + data.questionAudio + '">' +
                                '<div class="audio-info auto">' +
                                '<div class="audio-infomsg-main auto">' +
                                '<p class="audio-test-infomsg f18 c3 tl">' + data.question + '</p>' +
                                '</div>' +
                                '</div>' +
                                '<div class="audio-getReady">' +
                                '<div class="headset-icon"></div>' +
                                '<div class="getReady-time f18 cf">Preparation Time: ' + data.prepareTime + ' Seconds</div>' +
                                '<div class="getReady-time f18 cf">Response Time: ' + data.answerTime + ' Seconds</div>' +
                                '</div>' +
                                '</div>' +
                                '<div class="audio-response" audiourl="' + data.prepareAudio + '">' +
                                '<div class="audio-recording-t">Prepare your response</div>' +
                                '<div class="audio-recording-m">00:<span class="time">' + data.prepareTime + '</span></div>' +
                                '<div class="audio-recording-b">' +
                                '<div class="audio-recording-run"></div>' +
                                '</div>' +
                                '</div>' +
                                '<div class="audio-recording" audiourl="' + data.recordingAudio + '">' +
                                '<div class="audio-recording-t">Recording</div>' +
                                '<div class="audio-recording-m">00:<span class="time">' + data.answerTime + '</span></div>' +
                                '<div class="audio-recording-b">' +
                                '<div class="audio-recording-run"></div>' +
                                '</div>' +
                                '</div>' +
                                '<p class="audio-recording-upload"></p>' +
                                '</div>' +
                                '</div>';
                        }

                        $('.speaking-topic').html(dataStr);
                        xm.volumeHandle('.spoken_introduce', '#jp-jplayer');
                        xm.volumeHandle('.spoken_test', '#jp-jplayer');
                        xm.volumeHandle('.speaking-topic', '#jp-jplayer');
                        $('.speaking-wrap').each(function() {
                            xm.volumeHandle('.' + $(this).attr('class'), '#jp-jplayer');
                        });
                        xm.speakSwitchPage();
                    }
                }
            })
        },
        // 口语页面切换
        speakSwitchPage: function() {
            $(".JS_speak_prepare_continue").click(function() {
                $(".speak-prepare").hide();
                $(".spoken_introduce").show();
            });
        },
        //音频播放对象
        playObject: function() {
            xm.play = $("#jp-jplayer").jPlayer({
                ready: function() {
                    $(this).jPlayer("setMedia", {
                        mp3: ""
                    });
                },
                preload: 'auto',
                swfPath: "../swf",
                supplied: "mp3"
            });
        },
        asplay: function(mp3url, time) {
            var time = time || 0;
            xm.play.jPlayer("setMedia", {
                mp3: mp3url
            }).jPlayer("play", time);
        },
        aspause: function() {
            xm.play.jPlayer("pause");
            jpCountdown3.jPlayer("pause");
            jpCountdown4.jPlayer("pause");
            jpCountdown5.jPlayer("pause");
            jpCountdown6.jPlayer("pause");
        },
        asContplay: function(){
            xm.play.jPlayer("play");
            jpCountdown3.jPlayer("play");
            jpCountdown4.jPlayer("play");
            jpCountdown5.jPlayer("play");
            jpCountdown6.jPlayer("play");
        },
        asReplay: function() {
            xm.play.jPlayer("stop").jPlayer('play');
        },
        asStop: function(){
            xm.play.jPlayer("stop");
        },
        setDrapStr: function(parent) {
            var dstr = '';
            var target = parent.find('.target');
            target.each(function() {
                dstr += $(this).attr('_options');
            })
            parent.attr('radioAnswer', dstr);
        },
        bindEvent: function() {
            $()
            // 关闭弹窗
            $(".JS_pop_close").click(function() {
                xm.asContplay();
                $(".m-pop-massage").hide();
                $(".m-pop-pause").hide();
                $(".mask-bg").hide();
                $(".JS_speak_pause").html($(".JS_speak_pause").html() == "暂停" ? "继续" : "暂停");
            });
            // 口语结果提交按钮
            $('.JS_speak_result').on('click',function() {
                if (!xm.flag) {
                    xm.submit();
                    xm.flag = true;
                }else {
                    return;
                }
            });
        },
        //音量拖拽调节
        volumeHandle: function(parent, jPlayer) {
            var $parent = $(parent),
                $VolumeBtn = $parent.find('.Volume'),
                $parent = $parent.find('.DragDrap-v-box'),
                $drapIcon = $parent.find('.drapIcon'),
                $volumeProgress = $parent.find('.volume-progress'),
                maxWidth = $volumeProgress.width() - $drapIcon.width(),
                $range = $parent.find('.range');
            $VolumeBtn.bind('click', function(event) {
                if($parent.css("display") == "none"){
                    $parent.show();
                } else {
                    $parent.hide();
                }
                event.stopPropagation();
            });
            $parent.bind('click', function(event) {
                event.stopPropagation();
            });
            $(document).bind('click', function() {
                $parent.hide();
            });
            $drapIcon.bind('mousedown', function(event) {
                var offset = $drapIcon.offset(),
                    L = offset.left - $parent.offset().left;
                var disX = parseInt(event.clientX - L);

                $(document).bind('mousemove', function(event) {
                    var Left = event.clientX - disX;
                    if (Left <= 0) {
                        Left = 0;
                    } else if (Left >= maxWidth) {
                        Left = maxWidth;
                    }
                    var snale = Left / maxWidth;
                    $drapIcon.css('left', +Left + 'px');
                    $range.css('width', Left + 'px');
                    $(jPlayer).jPlayer('volume', snale);
                });
                $(document).bind('mouseup', function() {
                    $(document).unbind("mousemove");
                });
                return false;
            });
        },
        // 口语答案提交播放器
        speakPlayer: function() {
            $("#jquery_jplayer_1").jPlayer({
                ready: function () {
                    $(this).jPlayer("setMedia", {
                        mp3: "http://universe1.b0.upaiyun.com" + recordArr[0]
                    });
                },
                play: function() {
                    $(this).jPlayer("pauseOthers");
                },
                swfPath: "../swf",
                supplied: "mp3, wav",
                cssSelectorAncestor: "#jp_container_1",
                wmode: "window",
                globalVolume: true,
                useStateClassSkin: true,
                autoBlur: false,
                smoothPlayBar: false,
                keyEnabled: true
            });
            $("#jquery_jplayer_2").jPlayer({
                ready: function () {
                    $(this).jPlayer("setMedia", {
                        mp3: "http://universe1.b0.upaiyun.com" + recordArr[1]
                    });
                },
                play: function() {
                    $(this).jPlayer("pauseOthers");
                },
                swfPath: "../swf",
                supplied: "mp3, wav",
                cssSelectorAncestor: "#jp_container_2",
                wmode: "window",
                globalVolume: true,
                useStateClassSkin: true,
                autoBlur: false,
                smoothPlayBar: false,
                keyEnabled: true
            });
            $("#jquery_jplayer_3").jPlayer({
                ready: function () {
                    $(this).jPlayer("setMedia", {
                        mp3: "http://universe1.b0.upaiyun.com" + recordArr[2]
                    });
                },
                play: function() {
                    $(this).jPlayer("pauseOthers");
                },
                swfPath: "../swf",
                supplied: "mp3, wav",
                cssSelectorAncestor: "#jp_container_3",
                wmode: "window",
                globalVolume: true,
                useStateClassSkin: true,
                autoBlur: false,
                smoothPlayBar: false,
                keyEnabled: true
            });
            $("#jquery_jplayer_4").jPlayer({
                ready: function () {
                    $(this).jPlayer("setMedia", {
                        mp3: "http://universe1.b0.upaiyun.com" + recordArr[3]
                    });
                },
                play: function() {
                    $(this).jPlayer("pauseOthers");
                },
                swfPath: "../swf",
                supplied: "mp3, wav",
                cssSelectorAncestor: "#jp_container_4",
                wmode: "window",
                globalVolume: true,
                useStateClassSkin: true,
                autoBlur: false,
                smoothPlayBar: false,
                keyEnabled: true
            });
            $("#jquery_jplayer_5").jPlayer({
                ready: function () {
                    $(this).jPlayer("setMedia", {
                        mp3: "http://universe1.b0.upaiyun.com" + recordArr[4]
                    });
                },
                play: function() {
                    $(this).jPlayer("pauseOthers");
                },
                swfPath: "../swf",
                supplied: "mp3, wav",
                cssSelectorAncestor: "#jp_container_5",
                wmode: "window",
                globalVolume: true,
                useStateClassSkin: true,
                autoBlur: false,
                smoothPlayBar: false,
                keyEnabled: true
            });
            $("#jquery_jplayer_6").jPlayer({
                ready: function () {
                    $(this).jPlayer("setMedia", {
                        mp3: "http://universe1.b0.upaiyun.com" + recordArr[5]
                    });
                },
                play: function() {
                    $(this).jPlayer("pauseOthers");
                },
                swfPath: "../swf",
                supplied: "mp3, wav",
                cssSelectorAncestor: "#jp_container_6",
                wmode: "window",
                globalVolume: true,
                useStateClassSkin: true,
                autoBlur: false,
                smoothPlayBar: false,
                keyEnabled: true
            });
        },
        speakAnswerShow: function() {
            var speakCcntStr = "";
            var resultSArr = [];
            var SBox = $(".speaking-wrap");
            // 输出结果页
            for(var i = 0; i < recordArr.length; i++){
                speakCcntStr += '<h3 class="table-tit">Question ' + (i + 1) + '</h3>' +
                '<div id="jp_container_' + (i + 1) + '" class="box-bd m-audio jp-audio f-cb" role="application" aria-label="media player">' +
                    '<div class="jp-type-single">' +
                        '<div class="jp-gui jp-interface">' +
                            '<div class="jp-controls f-fl">' +
                                '<button class="u-btn u-btn-play JS_write_play jp-play" role="button" tabindex="0">play</button>' +
                            '</div>' +
                            '<div class="m-progress jp-progress f-fl">' +
                                '<div class="prog-box jp-seek-bar">' +
                                    '<div class="prog-range jp-play-bar"><i class="prog-icon"></i></div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="audio-time jp-time-holder f-fl">' +
                                '<div class="time-txt jp-current-time" role="timer" aria-label="time">00:00</div> /' +
                                '<div class="time-txt jp-duration" role="timer" aria-label="duration">00:00</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>';
            }
            $(".speak-tab").append(speakCcntStr);
            // 传给后台的数据
            for(var i = 0; i < recordArr.length; i++){
                resultSArr.push({
                    "mkType": 4, // 模考类型：1-阅读 2-听力 3-写作 4—口语 5-整套
                    "mkQuestionId": SBox.eq(i).attr('topicid'), // 问题 ID
                    "mkTpoId": xm.tpoId,
                    "speakUrl": "http://universe1.b0.upaiyun.com" + recordArr[i] // 用户答案
                });
            }
            speakingResult = {
                "speakingAnswer": resultSArr, // 答案
                "tpoId": xm.tpoId, // tpoID
                "type": 4, // 类型：1-阅读 2-听力 3-写作 4—口语 5-整套
                "dayId":xm.dayId,
                "exerciseId":xm.exerciseId
            };
            xm.speakPlayer();
        },
        submit: function() {
                $.ajax({
                    url: xm.baseURL + "/mkSingleAnswer/tpos/save/listeningandreadinganswer.action",
                    type: "POST",
                    contentType: "application/json;charset=UTF-8",
                    data: JSON.stringify(speakingResult),
                    dataType: "json",
                    success: function(data) {
                        alert(data.message);
                        window.location.href = "index";

                    },
                    error: function(jqXHR, error, errorThrown){
    	                var status_code = jqXHR.status
    		                if(status_code==401)
    		                {
    		                	alert("未登录,不能保存");
    		                }
    		       }
                });
        }
    })
})()
