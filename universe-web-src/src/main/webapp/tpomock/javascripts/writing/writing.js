(function() {
    $.extend(xm, {
        initPage: function() {
            //解析URL
            xm.analysisUrl();
            xm.playObject();
            //绑定事件
            xm.bindEvent();
            //防止重复提交表单变量
            xm.flag = false;
            //load加载完成隐藏loading图
            $('.loadBox').hide();
            //写作全局变量
            xm.timer5 = null;
            xm.CursorHandle('#overall', '#js-writing-editor');
            xm.CursorHandle('#alone', '#autocephaly-writing-editor');
        },
        analysisUrl: function() {
            url = window.location.href;
            xm.tpoId = Utils.getUrlParam(url, "tpoId");
            xm.seqNum=Utils.getUrlParam(url, "seqNum");
            xm.dayId=Utils.getUrlParam(url, "dayid")==null?0:Utils.getUrlParam(url, "dayid");
            xm.exerciseId = Utils.getUrlParam(url, "exerciseid")==null?0:Utils.getUrlParam(url, "exerciseid");
            if (xm.tpoId) {
                $("title").text("TPO" + xm.seqNum + "写作在线模拟--精英计划中心");
                $(".tpoTit").text(xm.seqNum);
                //初始化页面
                xm.initForm();
            }
        },
        initForm: function() {
            //获取写作题数据
            $.ajax({
                type: "GET",
                url: xm.baseURL + "/mkWritingQuestion/tpos/" + xm.tpoId + "/writing/questions.action",
                dataType : "json",
                success: function(data) {
                    // 综合写作
                    var $paren = $('.Writing-sumup'),
                        $content = $('.l-content');
                    if(data.writingQuestions[0].txtImg!=""){
                    	$("#textImg").attr("src",data.writingQuestions[0].txtImg);
                    	$("#textImg").css("display","block");
                    }
                    $content.html(data.writingQuestions[0].readingContent.replace(/\n\n/g, '<br /><br />'));
                    var $audioWrap = $('.WritingPlay'),
                        $img = $audioWrap.find('.playImg');
                    $img.attr('src', data.writingQuestions[0].listeningImg);
                    $audioWrap.attr('audioUrl', data.writingQuestions[0].listeningAudio);
                    var $wrap = $('#overall'),
                        $head = $wrap.find('.head-content span'),
                        $columnText = $wrap.find('.column-text');
                    $wrap.attr("topicid", data.writingQuestions[0].id);
                    $wrap.attr("type", data.writingQuestions[0].type);
                    $head.html(data.writingQuestions[0].question + ".");
                    $columnText.html(data.writingQuestions[0].readingContent.replace(/\n\n/g, '<br /><br />'));
                    // 独立写作
                    var $wrap = $('#alone'),
                        $head = $wrap.find('.head-content span'),
                        $columnText = $wrap.find('.column-text');
                    $wrap.attr("topicid", data.writingQuestions[1].id);
                    $wrap.attr("type", data.writingQuestions[1].type);
                    $head.html(data.writingQuestions[1].question + ".");
                    $columnText.html(data.writingQuestions[1].listeningContent);
                    xm.volumeHandle('.Writing-sumup', '#jp-jplayer');
                    xm.volumeHandle('.WritingPlay','#jp-jplayer');
                    xm.volumeHandle('.Articlewriting','#jp-jplayer');
                }
            })
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
        asplayEnd: function(mp3url, time) {
            var time = time || 0;
            xm.play.jPlayer("setMedia", {
                mp3: mp3url
            }).jPlayer("play", time);
            $("#jp-jplayer").bind($.jPlayer.event.ended, function(event) {
                $("#jp-jplayer").unbind($.jPlayer.event.ended);
                $('.WritingPlay').hide();
                $('#overall').show();
                reStartTime("#overall .write-time .time-txt");
                xm.aspause();
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
        },
        asContplay: function(){
            xm.play.jPlayer("play");
        },
        asReplay: function() {
            xm.play.jPlayer("stop").jPlayer('play');
        },
        asStop: function(){
            xm.play.jPlayer("stop");
        },
        bindEvent: function() {
            // 关闭弹窗
            $(".JS_pop_close").click(function() {
                if($("#overall").css("display") == "block" || $("#alone").css("display") == "block" || $(".Writing-sumup").css("display") == "block"){
                    startTime();
                } else if($(".WritingPlay").css("display") == "block"){
                    xm.asContplay();
                }
                $(".m-pop-finish").hide();
                $(".m-pop-pause").hide();
                $(".mask-bg").hide();
                $(".JS_write_pause").html($(".JS_write_pause").html() == "暂停" ? "继续" : "暂停");
            });
            $(".JS_pop_continue").click(function() {
                if($("#overall").css("display") == "block"){
                    $(".mask-bg").hide();
                    $(".m-pop-finish").hide();
                    $('#overall').hide();
                    $('.autocephaly-testExplain').show();
                } else if($("#alone").css("display") == "block"){
                    $(".mask-bg").hide();
                    $(".m-pop-finish").hide();
                    xm.writeAnswerShow();
                    $("#alone").hide();
                    $(".write-result").removeClass("f-dn");
                }
            });
            $(".JS_pop_timeout").click(function() {
                xm.writeAnswerShow();
                $(".mask-bg").hide();
                $(".m-pop-timeout").hide();
                $("#alone").hide();
                $(".write-result").removeClass("f-dn");
            });
            // 写作准备页continue按钮操作
            $('#w-testAudio-continue').on('click', function() {
                $('.write-prepare').hide();
                $('.Writing-testExplain').show();
                $('#jp-jplayer1').remove();
            });
            // 写作说明页continue按钮操作
            $('#w-testExplain-continue').on('click', function() {
                $('.Writing-testExplain').hide();
                $('.Writing-sumup').show();
                reStartTime(".Writing-sumup .write-time .time-txt");
            });
            //综合写作文字阅读
            $('#continue-Writing-Text').on('click', function() {
                stopTime();
                $('.Writing-sumup').hide();
                $('.WritingPlay').show();
                xm.audioPlay(0);
            });
            //综合写作音频播放
            $('#continueWplay').on('click', function() {
                if($(".WritingPlay").find(".duration").text() != "00:00" && $(".WritingPlay").find(".currentTime").text() == $(".WritingPlay").find(".duration").text()){
                    $('.WritingPlay').hide();
                    $('#overall').show();
                    reStartTime("#overall .write-time .time-txt");
                    xm.aspause();
                }
            });
            //跳过综合写作文章
            $('#continue-sp-Writing').on('click', function() {
                stopTime();
                $(".overall-box").find(".word-count").text($("#overall").find(".count").text());
                var timeArr = $("#overall").find(".time-txt").text().split(":");
                var spentTime = parseInt(timeArr[0]*60) + parseInt(timeArr[1]);
                var timeCount = 1200 - spentTime;
                var mins = format(Math.floor(timeCount / 60)),
                    secs = format(Math.floor(timeCount % 60));
                $(".overall-box").find(".answer-time").text(mins + ":" + secs);
                if($("#overall").find(".time-txt").text() != "00:00"){
                    $(".mask-bg").show();
                    $(".m-pop-finish").show();
                }
            });
            //跳过独立写作介绍页面
            $('#autocephaly-continue').on('click', function() {
                $this = $(this);
                $('.autocephaly-testExplain').hide();
                $('#alone').show();
                reStartTime("#alone .write-time .time-txt");
            });
            $('.JS_write_submit').on('click',function(){
                stopTime();
                $(".alone-box").find(".word-count").text($("#alone").find(".count").text());
                var timeArr = $("#alone").find(".time-txt").text().split(":");
                var spentTime = parseInt(timeArr[0]*60) + parseInt(timeArr[1]);
                var timeCount = 1800 - spentTime;
                var mins = format(Math.floor(timeCount / 60)),
                    secs = format(Math.floor(timeCount % 60));
                $(".alone-box").find(".answer-time").text(mins + ":" + secs);
                if($("#alone").find(".time-txt").text() != "00:00"){
                    $(".mask-bg").show();
                    $(".m-pop-finish").show();
                } else {
                    xm.writeAnswerShow();
                    $("#alone").hide();
                    $(".write-result").removeClass("f-dn");
                }
            })
            // 写作结果提交按钮
            $('.JS_write_result').on('click',function(){
                if (!xm.flag) {
                    xm.submit();
                    xm.flag = true;
                }else {
                    return;
                }
            })
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
        //听力大类时间进度条音频播放
        audioPlay: function(index){
            var $this = $('.player-main').eq(index);
            var $imgCarousel = $this.find('.audio-wrap'),
                $playIcon = $this.find('.play'),
                $jplayer = $('#jp-jplayer'),
                $progressBox = $this.find('.prog-box'),
                $jdIcon = $this.find('.prog-range'),
                $duration = $this.find('.duration'),
                $currentTime = $this.find('.currentTime'),
                _that = $this;
            var time = 0;
            var $timeCarousel;
            if ($imgCarousel.find('img').eq(0).attr('data_id').indexOf(":")>0) {
                $timeCarousel = parseInt($imgCarousel.find('img').eq(0).attr('data_id').split(":")[0])*60+parseInt($imgCarousel.find('img').eq(0).attr('data_id').split(":")[1])
            }else{
                $timeCarousel = $imgCarousel.find('img').eq(0).attr('data_id');
            }
            if ($('.player-main').eq(index).css('display') != 'none') {
                xm.asplayEnd(_that.attr('audiourl'),time);
            }
            var curTime = 0;
            var audioDurationinSeconds = 0;
            if (curTime <= $timeCarousel) {
                $imgCarousel.find('img').eq(0).show();
                $imgCarousel.find('img').eq(0).siblings('img').hide();
            }
            $jplayer.bind($.jPlayer.event.timeupdate, function (event) {
                curTime = event.jPlayer.status.currentTime;
                audioDurationinSeconds = event.jPlayer.status.duration;
                var p = curTime / audioDurationinSeconds;
                $jdIcon.width(p  * 100 + "%");
                $currentTime.text($.jPlayer.convertTime(curTime));
                time = parseInt(curTime,10);
                $duration.text($.jPlayer.convertTime(audioDurationinSeconds));
                //图片每隔$timeCarousel秒轮播else
                if (curTime >= $timeCarousel) {
                    for (var i = 0; i < $imgCarousel.find('img').length; i++) {
                        var times;
                        if ($imgCarousel.find('img').eq(i).attr('data_id').indexOf(":")>0) {
                            times = parseInt($imgCarousel.find('img').eq(i).attr('data_id').split(":")[0])*60+parseInt($imgCarousel.find('img').eq(i).attr('data_id').split(":")[1])
                        } else{
                            times = $imgCarousel.find('img').eq(i).attr('data_id');
                        }
                        if ($timeCarousel != times  && times > curTime) {
                            $imgCarousel.find('img').eq(i).show();
                            $imgCarousel.find('img').eq(i).siblings('img').hide();
                            $timeCarousel = times;
                            return;
                        }
                    }
                    return;
                }
            });
        },
        hideWritingContent: function() {
            var $elem = $('.Writing-sumup-content');
            xm.timer5 = setTimeout(function() {
                $elem.hide();
            }, 1000 * 300);
        },
        get: function(tbid) {
            var sel = '';
            if (document.all) {
                var r = document.selection.createRange();
                document.selection.empty();
                sel = r.text;
            } else {
                var tb = document.getElementById(tbid);
                // tb.focus();
                var start = tb.selectionStart;
                var end = tb.selectionEnd;
                sel = tb.value.substring(start, end);
            }
            return sel;
        },
        set: function(tbid, pos) {
            var ctrl = document.getElementById(tbid);
            if (ctrl.setSelectionRange) {
                ctrl.focus();
                ctrl.setSelectionRange(pos, pos);
            } else if (ctrl.createTextRange) {
                var range = ctrl.createTextRange();
                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        },
        insert: function(tbid, str) {
            var tb = document.getElementById(tbid);
            tb.focus();
            if (document.all) {
                var r = document.selection.createRange();
                document.selection.empty();
                r.text = str;
                r.collapse();
                r.select();
            } else {
                var newstart = tb.selectionStart + str.length;
                tb.value = tb.value.substr(0, tb.selectionStart) + str + tb.value.substring(tb.selectionEnd);
                tb.selectionStart = newstart;
                tb.selectionEnd = newstart;
            }
        },
        //Cursor操作:写作的复制，剪切，粘贴
        CursorHandle: function(parent, area) {
            var $parent = $(parent),
                $copy = $parent.find('.js-copy'),
                $cut = $parent.find('.js-cut'),
                $paste = $parent.find('.js-paste'),
                $count = $parent.find('.count'),
                $area = $(area);
            var str = '';
            $copy.on('click', function() {
                str = xm.get(area.substring(1));
            });
            $cut.on('click', function() {
                str = xm.get(area.substring(1));
                $area.val($area.val().replace(str, ''));
                var val = $.trim($area.val()),
                re = /[\s\.\,\?\!]+/g,
                arr = $.trim(val.replace(re, ' ')).split(' '),
                g = 0;
	            g = val == '' ? 0 : arr.length;
	            $count.html(g);
            });
            $paste.on('click', function() {
                xm.insert(area.substring(1), str);
                
                var val = $.trim($area.val()),
                re = /[\s\.\,\?\!]+/g,
                arr = $.trim(val.replace(re, ' ')).split(' '),
                g = 0;
	            g = val == '' ? 0 : arr.length;
	            $count.html(g);
            });
            $area.keyup(function() {
                var val = $.trim($(this).val()),
                    re = /[\s\.\,\?\!]+/g,
                    arr = $.trim(val.replace(re, ' ')).split(' '),
                    g = 0;
                g = val == '' ? 0 : arr.length;
                $count.html(g);
            });
            $area.bind("contextmenu",function(e){
        		return false;
            });
        },
        writeAnswerShow: function() {
            var resultWArr = [];
            var WBox = $(".Articlewriting"),
                overallWBox = $(".overall-box"),
                aloneWBox = $(".alone-box");
            // 传给后台的数据
            for (var i = 0; i < WBox.length; i++) {
                resultWArr.push({
                    "mkType": 3, // 模考类型：1-阅读 2-听力 3-写作 4—口语 5-整套
                    "mkQuestionTit": WBox.eq(i).find(".head-content span").text(), // 问题题目标题
                    "mkQuestionId": WBox.eq(i).attr('topicid'), // 问题 ID
                    "mkQuestionType": WBox.eq(i).attr('type'), // 问题类型：1-综合 2-独立
                    "mkTpoId": xm.tpoId,
                    "writeAnswer": WBox.eq(i).find(".writing-editor").val() // 用户答案
                });
            }
            // 输出结果页
            for (var i = 0; i < WBox.length; i++) {
                if(resultWArr[i].mkQuestionType == 1){
                    overallWBox.find(".write-ques").html(resultWArr[i].mkQuestionTit);
                    overallWBox.find(".write-answer").html(resultWArr[i].writeAnswer.replace(/\n/g, '<br />'));
                }
                if(resultWArr[i].mkQuestionType == 2){
                    aloneWBox.find(".write-ques").html(resultWArr[i].mkQuestionTit);
                    aloneWBox.find(".write-answer").html(resultWArr[i].writeAnswer.replace(/\n/g, '<br />'));
                }
            }
            writingResult = {
                "writingAnswer": resultWArr, // 答案
                "tpoId": xm.tpoId, // tpoID
                "type": 3, // 类型：1-阅读 2-听力 3-写作 4—口语 5-整套
                "dayId":xm.dayId,
                "exerciseId":xm.exerciseId
            };
        },
        submit: function() {
                $.ajax({
                    url: xm.baseURL + "/mkSingleAnswer/tpos/save/listeningandreadinganswer.action",
                    type: "POST",
                    contentType: "application/json;charset=UTF-8",
                    data: JSON.stringify(writingResult),
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
                })
        }
    })
})()
