(function(){
    $.extend(xm,{
        initPage: function(){
            //解析URL
            xm.analysisUrl();
            //听力音频对象
            xm.playObject();
            xm.listenAIndex = 0;
            xm.listenMainIndex = 0;
            xm.listenPart1 = 0;
            xm.listenPart2 = 0;
            //初始化
            $('.loadBox').hide();
            //防止重复提交表单变量
            xm.flag = false;
            //多选变量
            xm.str = "";
        },
        analysisUrl: function(){
            url = window.location.href;
            xm.tpoId = Utils.getUrlParam(url, "tpoId");
            xm.seqNum=Utils.getUrlParam(url, "seqNum");
            xm.dayId=Utils.getUrlParam(url, "dayid")==null?0:Utils.getUrlParam(url, "dayid");
            xm.exerciseId = Utils.getUrlParam(url, "exerciseid")==null?0:Utils.getUrlParam(url, "exerciseid");
            if(xm.tpoId){
                $("title").text("TPO" + xm.seqNum + "听力在线模拟--精英计划中心");
                $(".tpoTit").text(xm.seqNum);
                //初始化数据
                xm.initForm();
            }
        },
        initForm: function(){
            $.ajax({
                type: "GET",
                url: xm.baseURL+"/mkListening/tpos/"+xm.tpoId+"/listenings.action",
                dataType : "json",
                success: function(content){
                    $.ajax({
                        type: "GET",
                        url: xm.baseURL+"/mkListening/tpos/"+xm.tpoId+"/listening/questions.action",
                        dataType : "json",
                        success: function(questions){
                            var contentStr = '';
                            for( var i=0,len=content.listenings.length; i<len; i++){
                                var imgUrl = '';
                                var audioUrl = '';
                                var data = content.listenings[i];  // 第几道听力题
                                var count = 0;
                                // 每道听力题问题总数count
                                for (var k = 0; k < questions.listeningQuestions.length; k++) {
                                    if (data.id == questions.listeningQuestions[k].mkListeningId) {
                                        count++;
                                    }else if(data.id < questions.listeningQuestions[k].mkListeningId){
                                        break;
                                    }
                                }
                                contentStr += '<div class="player-main abox switch-box ' +  (((data.subjectType==1 && data.subjectCode==1)||(data.subjectType==2&&(data.subjectCode==1||data.subjectCode==2)))? "listenPart1" : "listenPart2") + '" audioUrl="'+data.audio+'" topicName="'+(((data.subjectType==1)?'conversation ':'lecture ')+data.subjectCode)+'">'+'<div class="audio-wrap tc">';
                                for (var g = 0; g < data.imgs.length; g++) {
                                    contentStr += '<img src="'+data.imgs[g].url+'" data_id="'+data.imgs[g].time+'" alt="" style="display:none;" />';
                                }
                                contentStr+='<div class="progress-wrap ">'+
                                                '<div class="m-progress">'+
                                                    '<div class="prog-box">'+
                                                        '<div class="prog-range"><i class="prog-icon"></i></div>'+
                                                    '</div>'+
                                                '</div>'+
                                            '</div>'+
                                            '<p class="f20"><span class="currentTime">00:00</span>/<span class="duration">00:00</span></p>'+
                                        '</div>'+
                                    '</div>';
                                var number = 0;
                                for (var j = 0; j < questions.listeningQuestions.length; j++) {
                                    var question = questions.listeningQuestions[j];
                                    if(data.id == question.mkListeningId){
                                        number++;
                                        if(question.questionType==3){
                                        	contentStr+='<div type="'+question.questionType+'" belongTopicName="' + (((data.subjectType==1)?'conversation ':'lecture ')+data.subjectCode) + '" idenNum="' + (((data.subjectType==1 && data.subjectCode==1)||(data.subjectType==2&&(data.subjectCode==1||data.subjectCode==2)))?1:2) + '"' +'" id="'+question.id+'" class="audio-main autoPlaybox abox switch-box ' +  (((data.subjectType==1 && data.subjectCode==1)||(data.subjectType==2&&(data.subjectCode==1||data.subjectCode==2)))? "listenPart1" : "listenPart2") + '" audioUrl="'+question.audio+'"  choice_answer="'+question.answer+'" radioAnswer="">'+
                                            '<div class="main-bg listen-main-bg">' +
                                            '<p class="top-question-num"></p>' +                                            
                                            '</div>' +
                                            '<div class="audioMain-content auto">'+
                                                '<div class="audioView-l-box auto">'+
                                                    '<p class="f20 c3 topicText">'+question.question+'</p>'+
                                                    '<p class="answers-tips-yesno f20">Click in the correct box for each phrase</p>'+
                                                    '<div class="answers js-answers optionsList f-dn">'+
                                                    '<div class="p-th g-clearfix">'+
                                                    '<ul class="list">'+
                                                    '<li class="g-f16"><span class="split floatright">|</span><span class="g-g6" >Homogeneous</span></li>'+
                                                    '<li class="g-f16"><span class="g-g6">Heterogeneous</span></li>'+                                                    
                                                    '</ul>'+
                                                    '</div>'+
                                                    '<div class="p-tr g-clearfix">'+
                                                    '<ul class="list g-kmf-form answers-checkbox  radio">'+
                                                    '<li class="normal "><span class="g-formbg g-checkbox" _options="A"></span></li>'+
                                                    '<li class="normal "><span class="g-formbg g-checkbox" _options="A"></span></li>'+
                                                    '</ul>'+
                                                    '<span class="sub-question f20">'+question.optionA+'</span>'+
                                                    '</div>'+
                                                    '<div class="p-tr g-clearfix">'+
                                                    '<ul class="list g-kmf-form answers-checkbox  radio">'+
                                                    '<li class="normal "><span class="g-formbg g-checkbox" _options="B"></span></li>'+
                                                    '<li class="normal "><span class="g-formbg g-checkbox" _options="B"></span></li>'+
                                                    '</ul>'+
                                                    '<span class="sub-question f20">'+question.optionB+'</span>'+
                                                    '</div>'+
                                                    '<div class="p-tr g-clearfix">'+
                                                    '<ul class="list g-kmf-form answers-checkbox  radio">'+
                                                    '<li class="normal "><span class="g-formbg g-checkbox" _options="C"></span></li>'+
                                                    '<li class="normal "><span class="g-formbg g-checkbox" _options="C"></span></li>'+
                                                    '</ul>'+
                                                    '<span class="sub-question f20">'+question.optionC+'</span>'+
                                                    '</div>'+
                                                    '<div class="p-tr g-clearfix">'+
                                                    '<ul class="list g-kmf-form answers-checkbox  radio">'+
                                                    '<li class="normal "><span class="g-formbg g-checkbox" _options="D"></span></li>'+
                                                    '<li class="normal "><span class="g-formbg g-checkbox" _options="D"></span></li>'+
                                                    '</ul>'+
                                                    '<span class="sub-question f20">'+question.optionD+'</span>'+
                                                    '</div>'+   
                                                   '</div>'+
                                                        
                                                    /*'<ul class="optionsList f-dn">'+
                                                        '<li class="f20 c3">'+'<span _options="A" class="radioIcon cp"></span>'+question.optionA+'</li>'+
                                                        '<li class="f20 c3">'+'<span _options="B" class="radioIcon cp"></span>'+question.optionB+'</li>'+
                                                        '<li class="f20 c3">'+'<span _options="C" class="radioIcon cp"></span>'+question.optionC+'</li>'+
                                                        '<li class="f20 c3">'+'<span _options="D" class="radioIcon cp"></span>'+question.optionD+'</li>'+
                                                    '</ul>'+*/
                                                '</div>'+
                                                '<div class="audioView-r-box fr" style="display:none;">'+
                                                    '<div class="audio-img-box">'+
                                                        '<img src="'+data.imgs[0].url+'" class="audioImg" alt="" />'+
                                                    '</div>'+
                                                    '<div class="audio-btn-box">'+
                                                        '<div class="audioIcon-wrap">'+
                                                            '<a href="javascript:;" class="pauseIcon fl"></a>'+
                                                            '<a href="javascript:;" class="playIcon fl"></a>'+
                                                            '<a href="javascript:;" class="HhIcon fl"></a>'+
                                                        '</div>'+
                                                    '</div>'+
                                                '</div>'+
                                            '</div>'+
                                        '</div>';
                                        }else{
                                        	 contentStr+='<div type="'+question.questionType+'" belongTopicName="' + (((data.subjectType==1)?'conversation ':'lecture ')+data.subjectCode) + '" idenNum="' + (((data.subjectType==1 && data.subjectCode==1)||(data.subjectType==2&&(data.subjectCode==1||data.subjectCode==2)))?1:2) + '"' +'" id="'+question.id+'" class="audio-main autoPlaybox abox switch-box ' +  (((data.subjectType==1 && data.subjectCode==1)||(data.subjectType==2&&(data.subjectCode==1||data.subjectCode==2)))? "listenPart1" : "listenPart2") + '" audioUrl="'+question.audio+'"  choice_answer="'+question.answer+'" radioAnswer="">'+
                                             '<div class="main-bg listen-main-bg">' +
                                             '<p class="top-question-num"></p>' +
                                             '</div>' +
                                             '<div class="audioMain-content auto">'+
                                                 '<div class="audioView-l-box auto">'+
                                                     '<p class="f20 c3 topicText">'+question.question+'</p>'+
                                                     '<ul class="optionsList f-dn">'+
                                                         '<li class="f20 c3">'+'<span _options="A" class="radioIcon cp"></span>'+question.optionA+'</li>'+
                                                         '<li class="f20 c3">'+'<span _options="B" class="radioIcon cp"></span>'+question.optionB+'</li>'+
                                                         '<li class="f20 c3">'+'<span _options="C" class="radioIcon cp"></span>'+question.optionC+'</li>'+
                                                         '<li class="f20 c3">'+'<span _options="D" class="radioIcon cp"></span>'+question.optionD+'</li>'+
                                                     '</ul>'+
                                                 '</div>'+
                                                 '<div class="audioView-r-box fr" style="display:none;">'+
                                                     '<div class="audio-img-box">'+
                                                         '<img src="'+data.imgs[0].url+'" class="audioImg" alt="" />'+
                                                     '</div>'+
                                                     '<div class="audio-btn-box">'+
                                                         '<div class="audioIcon-wrap">'+
                                                             '<a href="javascript:;" class="pauseIcon fl"></a>'+
                                                             '<a href="javascript:;" class="playIcon fl"></a>'+
                                                             '<a href="javascript:;" class="HhIcon fl"></a>'+
                                                         '</div>'+
                                                     '</div>'+
                                                 '</div>'+
                                             '</div>'+
                                         '</div>';
                                        }
                                       
                                    }else if(data.id < question.mkListeningId){
                                      break;
                                    }
                                }
                            };
                            $(".listening_wrap").append(contentStr);
                            xm.asplay();
                            document.getElementById('jp_audio_0').autoplay = true;
                            //音频快进
                           //document.getElementById('jp_audio_0').defaultPlaybackRate =2000;
                            xm.audioSwitchPage();
                            console.log($(".audio-main[idenNum = 1]").length);
                            //听力题音频播放
                            $('.abox').each(function(){
                                var _that = $(this);
                                _that.find('.playIcon').on('click',function(){
                                    xm.asplay(_that.attr('audioUrl'));
                                });
                                $(this).find('.pauseIcon').bind('click',function(){
                                    xm.aspause();
                                });
                                $(this).find('.HhIcon').bind('click',function(){
                                    xm.asReplay();
                                });
                            });
                            xm.audioRadioHandle();
                            xm.replaceHeadset();
                            xm.volumeHandle('.listening_indexWrap','#jp-jplayer');
                            xm.volumeHandle('.listening_introduce','#jp-jplayer');
                            xm.volumeHandle('.listening_wrap','#jp-jplayer');
                            //绑定事件
                            xm.bindEvent();
                        }   
                    })
                }
            });
        },
        // 听力模块 “()” 替换耳机图标
        replaceHeadset: function() {
            $(".autoPlaybox").find(".topicText").each(function() {
                if($(this).html().indexOf("()") >= 0){
                    var str = $(this).html();
                    $(this).html(str.replace(/\(\)|\（\）/, '<img style="vertical-align:bottom;" src="../images/icon_headset.png" alt="">'));
                }
            });
        },
        bindEvent: function(){
            // 听力题目序号
            xm.listenPart1 = $(".audio-main[idenNum = 1]").length;
            xm.listenPart2 = $(".audio-main[idenNum = 2]").length;
            $(".audio-main[idenNum = 1]").each(function(index) {
                $(this).attr("index", index + 1);
            });
            $(".audio-main[idenNum = 2]").each(function(index) {
                $(this).attr("index", index + 1);
            });
            // 听力准备页continue按钮操作
            $(".JS_prepare_continue").click(function() {
                $(".listen-prepare").hide();
                $(".listening_indexWrap").show();
                xm.asplay("http://bbsnew.b0.upaiyun.com/listening_direction1.mp3");
            });
            // 关闭弹窗
            $(".JS_pop_close").click(function() {
                if($(".listening_wrap").css("display") != "none"){
                    if($(".audio-main").css("display") != "none"){
                        startTime();
                    } else {
                        xm.asContplay();
                    }
                    for(var i = 0; i < $(".player-main").length; i++){
                        if($(".player-main").eq(i).css("display") == "block"){
                            if($(".player-main").eq(i).find(".duration").text() != "00:00" && $(".player-main").eq(i).find(".currentTime").text() == $(".player-main").eq(i).find(".duration").text()){
                                startTime();
                            } else {
                                xm.asContplay();
                            }
                        }
                    }
                }
                if($(".listening_indexWrap").css("display") != "none" || $(".listening_introduce").css("display") != "none"){
                    xm.asContplay();
                }
                $(".m-pop-massage").hide();
                $(".m-pop-pause").hide();
                $(".mask-bg").hide();
                $(".JS_listen_pause").html($(".JS_listen_pause").html() == "暂停" ? "继续" : "暂停");
            });
            //听力说明页continue按钮操作
            $('#indexWrapBtn').on('click',function(){
                $('.listening_indexWrap').hide();
                $('.listening_introduce').show();
                xm.asplay("http://bbsnew.b0.upaiyun.com/listening_direction2.mp3");
            });
        },
        //set音频对象
        playObject: function(){
            xm.play = $("#jp-jplayer").jPlayer({
                ready: function () {
                    $(this).jPlayer("setMedia", {
                        mp3: ""
                    });
                },
                preload: 'auto',
                swfPath: "../swf",
                supplied: "mp3",
            });
        },
        // 听力大类音频播放结束执行操作
        asplayEndQues: function(mp3url, time) {
            var time = time || 0;
            xm.play.jPlayer("setMedia", {
                mp3: mp3url
            }).jPlayer("play", time);
            $("#jp-jplayer").bind($.jPlayer.event.ended, function(event) {
                $("#jp-jplayer").unbind($.jPlayer.event.ended);
                $($('.abox').eq(xm.listenAIndex)).find(".optionsList").removeClass("f-dn");
                $(".listen-time").removeClass("f-dn");
                startTime();
            });
        },
        asplayEnd: function(mp3url, time) {
            var time = time || 0;
            xm.play.jPlayer("setMedia", {
                mp3: mp3url
            }).jPlayer("play", time);
            $("#jp-jplayer").bind($.jPlayer.event.ended, function(event) {
                $("#jp-jplayer").unbind($.jPlayer.event.ended);
                xm.btn();
                $(".JS_listen_next").attr("disabled", true);
                $(".JS_listen_ok").attr("disabled", true);
                if($('.abox').eq(xm.listenAIndex).hasClass("listenPart1")){
                    var quesNum = $('.abox').eq(xm.listenAIndex).attr("index");
                    var contStr = "Question " + quesNum + " of " + xm.listenPart1;
                    $(".listen-main-bg .top-question-num").text(contStr);
                }
                if($('.abox').eq(xm.listenAIndex).hasClass("listenPart2")){
                    var quesNum = $('.abox').eq(xm.listenAIndex).attr("index");
                    var contStr = "Question " + quesNum + " of " + xm.listenPart2;
                    $(".listen-main-bg .top-question-num").text(contStr);
                }
                xm.asplayEndQues($('.abox').eq(xm.listenAIndex).attr("audiourl"));
            });
        },
        asplay: function(mp3url,time){
            var time = time || 0;
            xm.play.jPlayer("setMedia",{
                mp3:mp3url
            }).jPlayer("play",time);
        },
        aspause: function(){
            xm.play.jPlayer("pause");
        },
        asContplay: function(){
            xm.play.jPlayer("play");
        },
        asReplay: function(){
            xm.play.jPlayer("stop").jPlayer('play');
        },
        asStop: function(){
            xm.play.jPlayer("stop");
        },
        //音频设置单选题,多选题
        audioRadioHandle: function(){
            var aBox = $('.abox');
            for( var i=0; i<aBox.length; i++){            	
               
                if(aBox.eq(i).attr('type') == 1){//单选
                	var span = aBox.eq(i).find('.radioIcon');
                    span.on('click',function(){
                        $(this).addClass('active');
                        $(this).parent().siblings().find('.radioIcon').removeClass('active');
                        $(this).parents('.abox').attr('radioAnswer',$(this).attr('_options'));
                        $(".JS_listen_next").attr("disabled", false);
                    });
                }else if(aBox.eq(i).attr('type') == 2){//多选
                	var span = aBox.eq(i).find('.radioIcon');
                    span.on('click', function(){
                        if(!$(this).hasClass('active')){
                            $(this).addClass('active');
                            xm.str += $(this).attr('_options');
                        }else{
                            $(this).removeClass('active');
                            xm.str = xm.str.replace($(this).attr('_options'),'');
                        }
                        $(this).parents('.abox').attr('radioAnswer', xm.str.split('').sort().join(''));
                        $(".JS_listen_next").attr("disabled", false);
                    });
                }else{//type=3 新题型
                	var span = aBox.eq(i).find('.g-checkbox  ');
                	var xm_str1="",xm_str2="";
                
                	span.on('click',function(){
                		var $par=$(this).parent();
                		 if(!$par.hasClass('selected')){
                			 $par.parent().find(".normal").removeClass('selected')
                			 xm_str1 = xm_str1.replace($(this).attr('_options'),'');
                			 xm_str2 = xm_str2.replace($(this).attr('_options'),'');
                             $par.addClass('selected');
                			 if($par.index()==0){
                				 xm_str1 += $(this).attr('_options');
                			 }else{
                				 xm_str2 += $(this).attr('_options');
                			 }
                             
                        }else{
                        	$par.removeClass('selected');
                        	if($par.index()==0){
                        		xm_str1 = xm_str1.replace($(this).attr('_options'),'');
	               			 }else{
	               				xm_str2 = xm_str2.replace($(this).attr('_options'),'');
	               			 }
                             
                        }                		
                		xm.str=xm_str1.split('').sort().join('')+"/"+xm_str2.split('').sort().join('')
                        $(this).parents('.abox').attr('radioAnswer', xm.str);
                        $(".JS_listen_next").attr("disabled", false);
                	})
                }
            }
        },
        //翻页
        audioSwitchPage: function(){
            var $parent = $('.listening_wrap'),
                $a_Next = $parent.find('.JS_listen_next'),
                $a_Blak = $parent.find('.a_Blak'),
                $bMark = $parent.find('.blakMark'),
                $nMark = $parent.find('.nextMark'),
                $box = $parent.find('.abox'),
                len = $box.length;
            $(".JS_listen_result").click(function() {
                if (!xm.flag) {
                    xm.submit();
                    xm.flag = true;
                }else {
                    return;
                }
            });
            $(".JS_listen_ok").click(function() {
                stopTime();
                if($(".JS_listen_submit").hasClass("u-btn-next-active")){
                    xm.listenAnswerShow();
                    $(".listening_wrap").hide();
                    $(".listen-result").removeClass("f-dn");
                    /**/
                } else if($a_Next.hasClass("u-btn-next-active")){
                    if ($box.eq(xm.listenAIndex+1).attr("topicname") !== undefined && $('.player-main').eq(xm.listenMainIndex).css('display') == 'none') {
                        if ($box.eq(xm.listenAIndex+1).attr("topicname") == "conversation 2") {
                            stopTime();
                            $('.listening_wrap').hide();
                            $('.listening_introduce').show();
                            xm.asplay("http://bbsnew.b0.upaiyun.com/listening_direction2.mp3");
                        } else {
                            xm.listenAIndex++;
                            xm.btn();
                            $(".JS_listen_ok").hide();
                            xm.audioPlay(xm.listenMainIndex);
                        }
                    } else {
                        xm.listenAIndex++;
                        xm.btn();
                        $(".JS_listen_next").attr("disabled", true);
                        $(".JS_listen_ok").attr("disabled", true);
                        if($('.abox').eq(xm.listenAIndex).hasClass("listenPart1")){
                            var quesNum = $('.abox').eq(xm.listenAIndex).attr("index");
                            var contStr = "Question " + quesNum + " of " + xm.listenPart1;
                            $(".listen-main-bg .top-question-num").text(contStr);
                        }
                        if($('.abox').eq(xm.listenAIndex).hasClass("listenPart2")){
                            var quesNum = $('.abox').eq(xm.listenAIndex).attr("index");
                            var contStr = "Question " + quesNum + " of " + xm.listenPart2;
                            $(".listen-main-bg .top-question-num").text(contStr);
                        }
                        xm.asplayEndQues($box.eq(xm.listenAIndex).attr("audiourl"));
                    }
                }
            });
            $a_Next.bind('click',function(){
                if (typeof($box.eq(xm.listenAIndex).attr('radioanswer')) != 'undefined' && $box.eq(xm.listenAIndex).attr('radioanswer') != '') {
                    $(this).addClass("u-btn-next-active");
                    $(this).attr("disabled", true);
                    $(".JS_listen_ok").attr("disabled", false);
                }
            });
            //听力答题说明页continue按钮操作
            $('#introduceBtn').on('click',function(){
                if ($box.eq(xm.listenAIndex+1).attr("topicname") == "conversation 2" && $('.player-main').eq(xm.listenMainIndex).css('display') == 'none') {
                    if (typeof($box.eq(xm.listenAIndex).attr('radioanswer')) != 'undefined' && $box.eq(xm.listenAIndex).attr('radioanswer') != '') {
                        $('.listening_introduce').hide();
                        xm.asStop();
                        $a_Blak.addClass('no');
                        $bMark.show();
                        $('.player-main').eq(xm.listenMainIndex).show();
                        $box.eq(xm.listenAIndex).hide();
                        $('.listening_wrap').show();
                        $(".listen-time .time-txt").text($(".listen-time .time-txt").attr("date-timetxt"));
                        reStartTime(".listening_introduce .listen-time .time-txt");
                        stopTime();
                        xm.listenAIndex++;
                        $('#topicName').html($box.eq(xm.listenAIndex).attr('topicName'));
                        xm.btn();
                        $('.JS_listen_ok').hide();
                        xm.audioPlay(xm.listenMainIndex);
                    } else if($("body").attr("listen") == 1){
                        $('.listening_introduce').hide();
                        xm.asStop();
                        $('.player-main').eq(xm.listenMainIndex).show();
                        $box.eq(xm.listenAIndex).hide();
                        $('.listening_wrap').show();
                        $(".listen-time .time-txt").text($(".listen-time .time-txt").attr("date-timetxt"));
                        reStartTime(".listening_introduce .listen-time .time-txt");
                        stopTime();
                        xm.listenAIndex++;
                        $('#topicName').html($box.eq(xm.listenAIndex).attr('topicName'));
                        xm.btn();
                        $('.JS_listen_ok').hide();
                        xm.audioPlay(xm.listenMainIndex);
                    }
                } else {
                    $(".listening_introduce").hide();
                    $('.JS_listen_ok').hide();
                    $('.abox').eq(0).show();
                    xm.asStop();
                    $('.listening_wrap').show();
                    $(".listen-time .time-txt").text($(".listen-time .time-txt").attr("date-timetxt"));
                    reStartTime(".listening_introduce .listen-time .time-txt");
                    stopTime();
                    xm.audioPlay(0);
                }
            });
            $a_Blak.bind('click',function(){
                if ($(".currentTime").eq(xm.listenMainIndex).text() == $(".duration").eq(xm.listenMainIndex).text()) {
                    if ($box.eq(xm.listenAIndex-1).attr("topicname") == "conversation 2" && $box.eq(xm.listenAIndex-1).css('display') == 'none') {    
                        xm.listenAIndex--;
                        xm.btn();
                        $a_Blak.addClass('no');
                        $bMark.show();
                    }else{
                        xm.listenAIndex--;
                        xm.btn();
                    }
                    if ($('.player-main').eq(xm.listenMainIndex-1).css('display') != 'none') {
                        xm.listenMainIndex--;
                    }
                }
            });
            //提交
            $('.JS_listen_submit').on('click',function(){
                if (typeof($box.eq(xm.listenAIndex).attr('radioanswer')) != 'undefined' && $box.eq(xm.listenAIndex).attr('radioanswer') != '') {
                    $(this).addClass("u-btn-next-active");
                    $(this).attr("disabled", true);
                    $(".JS_listen_ok").attr("disabled", false);
                }
            });
        },
        
        btn: function(){
            var $parent = $('.listening_wrap'),
                $a_Next = $parent.find('.JS_listen_next'),
                $a_Blak = $parent.find('.a_Blak'),
                $bMark = $parent.find('.blakMark'),
                $nMark = $parent.find('.nextMark'),
                $box = $parent.find('.abox'),
                len = $box.length;
            $box.hide();
            $box.eq(xm.listenAIndex).show();
            //如果听力题到最后一题了
            if( xm.listenAIndex == len-1){
                $('.JS_listen_submit').removeClass("f-dn");
                $a_Next.hide();
                $a_Next.removeClass("u-btn-next-active");
                return;
            }
            if( xm.listenAIndex > 0){
                stopTime();
                $('.JS_listen_submit').addClass("f-dn");
                $a_Next.show();
                $('.JS_listen_ok').show();
                $a_Next.removeClass("u-btn-next-active");
            }
            if( xm.listenAIndex == 0 ){
                $('.JS_listen_submit').addClass("f-dn");
                $a_Next.show();
                $a_Next.removeClass("u-btn-next-active");
            }
            if( xm.listenAIndex < len-1 ){
                $('.JS_listen_submit').addClass("f-dn");
                $a_Next.attr("disabled",false);
                $a_Next.show();
                $a_Next.removeClass("u-btn-next-active");
            }
            xm.aspause();
            $('.play').removeClass('pause');
            $('#topicName').html($box.eq(xm.listenAIndex).attr('topicName'));
            xm.str = "";
        },
        //音量拖拽调节
        volumeHandle: function(parent,jPlayer){
            var $parent = $(parent),
                $VolumeBtn = $parent.find('.Volume'),
                $parent = $parent.find('.DragDrap-v-box'),
                $drapIcon = $parent.find('.drapIcon'),
                $volumeProgress = $parent.find('.volume-progress'),
                maxWidth = $volumeProgress.width() - $drapIcon.width(),
                $range = $parent.find('.range');
            $VolumeBtn.bind('click',function(event){
                if($parent.css("display") == "none"){
                    $parent.show();
                } else {
                    $parent.hide();
                }
                event.stopPropagation();
            });
            $parent.bind('click',function(event){
                event.stopPropagation();
            });
            $(document).bind('click',function(){
                $parent.hide();
            });
            $drapIcon.bind('mousedown',function(event){
                var offset = $drapIcon.offset(),
                    L = offset.left - $parent.offset().left;
                var disX = parseInt( event.clientX - L );
                $(document).bind('mousemove',function(event){
                    var Left = event.clientX - disX ;
                    if( Left <= 0){
                        Left = 0;
                    }else if( Left >= maxWidth ){
                        Left = maxWidth;
                    }
                    var snale = Left / maxWidth;
                    $drapIcon.css('left', + Left + 'px');
                    $range.css( 'width', Left + 'px');
                    $(jPlayer).jPlayer('volume',snale);
                });
                $(document).bind('mouseup',function(){
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
                xm.listenMainIndex++;
                xm.listenAIndex++;
                $(".listen-time").addClass("f-dn");
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
        listenAnswerShow: function() {
            var resultLArr = [],
                rightLArr = [],
                errorLarr = [];
            var LBox = $('.listening_wrap .audio-main');
            //传给后台的数据
            for( var j = 0; j < LBox.length; j++ ){
                if( LBox.eq(j).attr('radioAnswer') === LBox.eq(j).attr('choice_answer') ){
                    rightLArr.push( j );
                    resultLArr.push({
                        "readingListeningType": 2,
                        "mkQuestionTit": LBox.eq(j).find(".topicText").text(),
                        "mkQuestionId": LBox.eq(j).attr('id'),
                        "belongTopicName": LBox.eq(j).attr("belongtopicname"), // 问题归属 topicname
                        "isRight":1,
                        "originalAnswer": LBox.eq(j).attr('radioAnswer'),
                        "rightAnswer": LBox.eq(j).attr('choice_answer')
                    });
                }else{
                    errorLarr.push(j);
                    resultLArr.push({
                        "readingListeningType":2,
                        "mkQuestionTit": LBox.eq(j).find(".topicText").text(),
                        "mkQuestionId": LBox.eq(j).attr('id'),
                        "belongTopicName": LBox.eq(j).attr("belongtopicname"), // 问题归属 topicname
                        "isRight":0,
                        "originalAnswer": LBox.eq(j).attr('radioAnswer'),
                        "rightAnswer": LBox.eq(j).attr('choice_answer')
                    });
                }
            }
            // 输出结果页
            for(var i = 0; i < $(".autoPlaybox").length; i++){
                if(resultLArr[i].belongTopicName == "conversation 1"){
                    var contStr = "";
                    contStr += "<tr>" +
			                    "<td class='f-tal'>" + resultLArr[i].mkQuestionTit + "</td>";
			                    if(resultLArr[i].originalAnswer!=resultLArr[i].rightAnswer){
			                   	 contStr+= "<td style='color:red'>" + resultLArr[i].originalAnswer + "</td>";
			                    }else{
			                   	 contStr+= "<td>" + resultLArr[i].originalAnswer + "</td>";
			                    }
			                    contStr+="<td>" + resultLArr[i].rightAnswer + "</td>" +
                               "</tr>";
                    $(".listen-table-01 tbody").append(contStr);
                }
                if(resultLArr[i].belongTopicName == "lecture 1"){
                    var contStr = "";
                    contStr += "<tr>" +
			                    "<td class='f-tal'>" + resultLArr[i].mkQuestionTit + "</td>";
			                    if(resultLArr[i].originalAnswer!=resultLArr[i].rightAnswer){
			                   	 contStr+= "<td style='color:red'>" + resultLArr[i].originalAnswer + "</td>";
			                    }else{
			                   	 contStr+= "<td>" + resultLArr[i].originalAnswer + "</td>";
			                    }
			                    contStr+="<td>" + resultLArr[i].rightAnswer + "</td>" +
                               "</tr>";
                    $(".listen-table-02 tbody").append(contStr);
                }
                if(resultLArr[i].belongTopicName == "lecture 2"){
                    var contStr = "";
                    contStr += "<tr>" +
			                    "<td class='f-tal'>" + resultLArr[i].mkQuestionTit + "</td>";
			                    if(resultLArr[i].originalAnswer!=resultLArr[i].rightAnswer){
			                   	 contStr+= "<td style='color:red'>" + resultLArr[i].originalAnswer + "</td>";
			                    }else{
			                   	 contStr+= "<td>" + resultLArr[i].originalAnswer + "</td>";
			                    }
			                    contStr+="<td>" + resultLArr[i].rightAnswer + "</td>" +
                               "</tr>";
                    $(".listen-table-03 tbody").append(contStr);
                }
                if(resultLArr[i].belongTopicName == "conversation 2"){
                    var contStr = "";
                    contStr += "<tr>" +
			                    "<td class='f-tal'>" + resultLArr[i].mkQuestionTit + "</td>";
			                    if(resultLArr[i].originalAnswer!=resultLArr[i].rightAnswer){
			                   	 contStr+= "<td style='color:red'>" + resultLArr[i].originalAnswer + "</td>";
			                    }else{
			                   	 contStr+= "<td>" + resultLArr[i].originalAnswer + "</td>";
			                    }
			                    contStr+="<td>" + resultLArr[i].rightAnswer + "</td>" +
                               "</tr>";
                    $(".listen-table-04 tbody").append(contStr);
                }
                if(resultLArr[i].belongTopicName == "lecture 3"){
                    var contStr = "";
                    contStr += "<tr>" +
			                    "<td class='f-tal'>" + resultLArr[i].mkQuestionTit + "</td>";
			                    if(resultLArr[i].originalAnswer!=resultLArr[i].rightAnswer){
			                   	 contStr+= "<td style='color:red'>" + resultLArr[i].originalAnswer + "</td>";
			                    }else{
			                   	 contStr+= "<td>" + resultLArr[i].originalAnswer + "</td>";
			                    }
			                    contStr+="<td>" + resultLArr[i].rightAnswer + "</td>" +
                               "</tr>";
                    $(".listen-table-05 tbody").append(contStr);
                }
                if(resultLArr[i].belongTopicName == "lecture 4"){
                    var contStr = "";
                    contStr += "<tr>" +
			                    "<td class='f-tal'>" + resultLArr[i].mkQuestionTit + "</td>";
			                    if(resultLArr[i].originalAnswer!=resultLArr[i].rightAnswer){
			                   	 contStr+= "<td style='color:red'>" + resultLArr[i].originalAnswer + "</td>";
			                    }else{
			                   	 contStr+= "<td>" + resultLArr[i].originalAnswer + "</td>";
			                    }
			                     contStr+="<td>" + resultLArr[i].rightAnswer + "</td>" +
			                    "</tr>";
                    $(".listen-table-06 tbody").append(contStr);
                }
            }
            listeningResult = {
                "listeningAnswer": resultLArr,
                "tpoId": xm.tpoId,
                "score" : 20 * rightLArr.length,
                "rightCount" : rightLArr.length,
                "totalCount" : LBox.length,
                "type": 2,
                "dayId":xm.dayId,
                "exerciseId":xm.exerciseId
            };
        },
        submit: function(){
                $.ajax({
                    url: xm.baseURL+"/mkSingleAnswer/tpos/save/listeningandreadinganswer.action",
                    type: "POST",
                    contentType: "application/json;charset=UTF-8",
                    data: JSON.stringify(listeningResult),
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
