$(function () {
    /*公共方法*/
    //播放进度条
    /*str：练习模块ID */
    function barAudio(str){
        var totalL=parseFloat($(str).find(".audiojsZ").find(".newscrubberZ").css("width"));
        var ss= 0,mm= 0,per=0;
        var $startTime=$(str).find(".timeZ").find(".playedZ");
        var totalTime=$(str).find(".timeZ").find(".durationZ").html();
        totalTime=totalTime.split(":");
        var totalSeconds=Number(totalTime[0]*60)+Number(totalTime[1]);
        var start=$startTime.html();
        start=start.split(":");
        var start=Number(start[0]*60)+Number(start[1]);
        audioTimer=window.setInterval(function(){
            if(start>=totalSeconds){
                window.clearInterval(audioTimer);
                $(str).find(".audiojsZ").find(".progressZ").css({width:0});
                $(str).find(".play_pauseZ").find("p").css("display","none");
                $(str).find(".play_pauseZ").find(".playZ").css("display","block");
                $startTime.html("00:00");
                return;
            }
            start++;
            per=start/totalSeconds;
            var perWidth=per*totalL;
            ss=start%60;
            mm=(start-ss)/60;
            mm=mm<10?"0"+mm:mm;
            ss=ss<10?"0"+ss:ss;
            $startTime.html(mm+":"+ss);
            $(str).find(".audiojsZ").find(".progressZ").css({width:perWidth});
        },1000);

    }


    /*阅读词汇*/
    $("#vocabulary .choiceVol").click(function () {
        var curIndex = $(this).parent().index() + 1;
        var rightAns = $("#vocabulary .answer").attr("data-id");
        if (curIndex == rightAns) {
            $(this).addClass("rightBg");
        } else {
            $(this).addClass("wrongBg");
            $("#vocabulary .answer").find("li").eq(rightAns - 1).find(".choiceVol").addClass("rightBg");
        }
        //选择正确答案后鼠标滑过背景不再有效果
        $("#vocabulary .choiceVol").hover(function () {
            $("#vocabulary .choiceVol").css({"cursor":"default","background":"#ccd1d9"});
        });
        //300ms后进入下一题
        window.setTimeout(function () {

        }, 300)
    })
    /*语法*/
    //题干中选择单词
    $("#grammar #grammar_sub").mouseup(function(){
        var userSelection, text;
        var uiInput = $('#uinput').text();
        if (window.getSelection) {
            userSelection = window.getSelection();
        } else if (document.selection) {
            //IE浏览器、Opera
            userSelection = document.selection.createRange();
        }
        try{
            uiInput+=" "+userSelection.toString();
        }catch(e){
            uiInput+=" "+userSelection.text;
        }
        $('#uinput').text(uiInput);
    });
    //查看答案
    $("#grammar #grammarAnswer").click(function(){
        if($(this).next().css("display")=="none"){
            $(this).next().css("display","inline-block");
            $("#grammar #grammar_sub").find("span").addClass("mark");
        }else{
            $(this).next().css("display","none");
            $("#grammar #grammar_sub").find("span").removeClass("mark");
        }

    });


    /*听写*/
    var audioTimer=null;//播放定时器
    $("#dictation .play_pauseZ").click(function(e){
        e=e||window.event;
        var tar= e.target|| e.srcElement;
        var audioEle = $("#dictation").find(" #myMusic")[0];
        if($(tar).hasClass("playZ")){
            $("#dictation .play_pauseZ").find("p").css("display","none");
            $("#dictation .play_pauseZ").find(".pauseZ").css("display","block");
            audioEle.play();
            barAudio("#dictation");
        }else{
            $("#dictation .play_pauseZ").find("p").css("display","none");
            $("#dictation .play_pauseZ").find(".playZ").css("display","block");
            audioEle.pause();
            window.clearInterval(audioTimer);
        }
    });
    //查看答案
    $("#dictation #lookAnswer").click(function(){
        if($(this).parent().parent().next().css("display")=="none"){
            $(this).parent().parent().next().show();
        }else{
            $(this).parent().parent().next().hide();
        }
    });
    //清除答案
    $("#dictation #clearAnswer").click(function(){
        $("#dictation .dic_answer").find(".dic_p").find("input").val("");
    });


    /*音义互辩*/
    //做题
    $("#listen_word .choiceVol").click(function () {
        var curIndex = $(this).parent().index() + 1;
        var rightAns = $("#listen_word .answer").attr("data-id");
        if (curIndex == rightAns) {
            $(this).addClass("rightBg");
        } else {
            $(this).addClass("wrongBg");
            $("#listen_word .answer").find("li").eq(rightAns - 1).find(".choiceVol").addClass("rightBg");
        }
        //选择正确答案后鼠标滑过背景不再有效果
        $("#listen_word .choiceVol").hover(function () {
            $("#listen_word .choiceVol").css({"cursor":"default","background":"#ccd1d9"});
        });
        //300ms后进入下一题
        window.setTimeout(function () {

        }, 300)
    });
    //播放音频
    $("#listen_word .lisWord_question").find(".p1").click(function(e){
        var audioSrc="";
        e=e||window.event;
        var tar= e.target|| e.srcElement;
        if(tar.tagName.toLowerCase()=="img"){
            //暂停播放，图片更换
            var audio=$("#listen_word").find("#audioAudio")[0];
            audio.pause();
            $("#listen_word .lisWord_question").find(".p1").find("img").attr("src","../i/plan/i2.png");
            //获取播放源
            audioSrc=$(tar).attr("data-url");
            //图片更换为gif
            $(tar).attr("src","../i/plan/i2.gif")
            $("#listen_word").find("#audioAudio").attr("src",audioSrc);
            audio.play();
            $(audio).bind('ended',function () {
                $(tar).attr("src","../i/plan/i2.png");
            });
        }
    });


    /*听音辩词*/
    //做题
    $("#listen_sentence .choiceVol").click(function () {
        var curIndex = $(this).parent().index() + 1;
        var rightAns = $("#listen_sentence .answer").attr("data-id");
        if (curIndex == rightAns) {
            $(this).addClass("rightBg");
        } else {
            $(this).addClass("wrongBg");
            $("#listen_sentence .answer").find("li").eq(rightAns - 1).find(".choiceVol").addClass("rightBg");
        }
        //选择正确答案后鼠标滑过背景不再有效果
        $("#listen_sentence .choiceVol").hover(function () {
            $("#listen_sentence .choiceVol").css({"cursor":"default","background":"#ccd1d9"});
        });
        //300ms后进入下一题
        window.setTimeout(function () {

        }, 300)
    });
    //播放音频
    $("#listen_sentence .lisSentence_question").find(".p1").click(function(e){
        var audioSrc="";
        e=e||window.event;
        var tar= e.target|| e.srcElement;
        if(tar.tagName.toLowerCase()=="img"){
            var audio=$("#listen_sentence").find("#audioAudio")[0];
            audio.pause();
            $("#listen_sentence .lisSentence_question").find(".p1").find("img").attr("src","../i/plan/i2.png");
            //获取播放源
            audioSrc=$(tar).attr("data-url");
            //图片更换为gif
            $(tar).attr("src","../i/plan/i2.gif");
            $("#listen_sentence").find("#audioAudio").attr("src",audioSrc);
            audio.play();
            $(audio).bind('ended',function () {
                $(tar).attr("src","../i/plan/i2.png");
            });
        }
    });



    /*看句辨音*/
    //做题
    $("#listen_sentence2 .choiceVol").click(function () {
        var curIndex = $(this).parent().index() + 1;
        var rightAns = $("#listen_sentence2 .answer").attr("data-id");
        if (curIndex == rightAns) {
            $(this).addClass("rightBg");
        } else {
            $(this).addClass("wrongBg");
            $("#listen_sentence2 .answer").find("li").eq(rightAns - 1).find(".choiceVol").addClass("rightBg");
        }
        //选择正确答案后鼠标滑过背景不再有效果
        $("#listen_sentence2 .choiceVol").hover(function () {
            $("#listen_sentence2 .choiceVol").css({"cursor":"default","background":"#ccd1d9"});
        });
        //300ms后进入下一题
        window.setTimeout(function () {

        }, 300)
    });
    //播放音频
    $("#listen_sentence2 .lisSentence2_question").find(".answer").find("li").click(function(e){
        var audioSrc="";
        e=e||window.event;
        var tar= e.target|| e.srcElement;
        if(tar.tagName.toLowerCase()=="img"){
            //暂停播放，图片更换
            var audio=$("#listen_sentence2").find("#audioAudio")[0];
            audio.pause();
            $("#listen_sentence2 .lisSentence2_question").find(".answer").find("li").find("img").attr("src","../i/plan/i2.png");
            //获取播放源
            audioSrc=$(tar).attr("data-url");
            //图片更换为gif
            $(tar).attr("src","../i/plan/i2.gif");
            $("#listen_sentence2").find("#audioAudio").attr("src",audioSrc);
            audio.play();
            $(audio).bind('ended',function () {
                $(tar).attr("src","../i/plan/i2.png");
            });
        }
    });



    /*记忆复写*/
    //查看翻译
    $("#rewrite #showTrans").click(function(){
        if($(".rewrite_ans").css("display")=="none"){
            $(this).html("隐藏翻译");
            $(".rewrite_ans").show();
        }else{
            $(this).html("查看翻译");
            $(".rewrite_ans").hide();
        }
    });
    //按段练习
    $("#rewrite #btnExerciseStage").click(function(){
        $("#rewrite .rewrite_question").hide();
        $("#rewrite .rewrite_paragraph").show();
    });
    //查看答案
    $("#rewrite .rewrite_paragraph").find("#showEnglish").click(function(){
        if($("#rewrite .stateEnglish").css("display")=="none"){
            $(this).html("中文<span class='blue'>（点击返回中文）</span>");
            $("#rewrite .stateEnglish").show();
            $("#rewrite .stateCn").hide();
        }else{
            $(this).html("英文<span class='blue'>（*查看将不判断成绩）</span>");
            $("#rewrite .stateEnglish").hide();
            $("#rewrite .stateCn").show();
        }
    });
    //全篇复写
    $("#rewrite #btnExercisePiece").click(function(){
        $("#rewrite .rewrite_question").hide();
        $("#rewrite .rewrite_all").show();
    });
    $("#rewrite .rewrite_all").find("#showAll").click(function(){
        if($("#rewrite .pieceEnglish").css("display")=="none"){
            $(this).html("中文<span class='blue'>（点击返回中文）</span>");
            $("#rewrite .pieceEnglish").show();
            $("#rewrite .pieceCn").hide();
        }else{
            $(this).html("英文<span class='blue'>（*查看将不判断成绩）</span>");
            $("#rewrite .pieceEnglish").hide();
            $("#rewrite .pieceCn").show();
        }
    });




    /*综合填空*/
    //选项卡
    $("#tpo_write .tpoWriteUl").find("li").each(function(){
       $(this).click(function(){
          var curIndex=$(this).index();
           $("#tpo_write .tpoWriteUl").find("li").removeClass("active");
           $(this).addClass("active");
           $("#tpo_write .tpo_write_question").find(".tabPanel").hide();
           $("#tpo_write .tpo_write_question").find(".tabPanel").eq(curIndex).show();
       });
    });
    //播放材料
    $("#tpo_write .play_pauseZ").click(function(e){
        e=e||window.event;
        var tar= e.target|| e.srcElement;
        var audioEle = $("#dictation").find(" #myMusic")[0];
        if($(tar).hasClass("playZ")){
            $("#tpo_write .play_pauseZ").find("p").css("display","none");
            $("#tpo_write .play_pauseZ").find(".pauseZ").css("display","block");
            audioEle.play();
            barAudio("#tpo_write");
        }else{
            $("#tpo_write .play_pauseZ").find("p").css("display","none");
            $("#tpo_write .play_pauseZ").find(".playZ").css("display","block");
            audioEle.pause();
            window.clearInterval(audioTimer);
        }
    });
    //答案页面选项卡
    $("#tpo_write .tpo_write_result").find(".tpoWriteUl").find("li").each(function(){
        $(this).click(function(){
            var curIndex=$(this).index();
            $("#tpo_write .tpoWriteUl").find("li").removeClass("active");
            $(this).addClass("active");
            $("#tpo_write .tpo_write_result").find(".tabPanel").hide();
            $("#tpo_write .tpo_write_result").find(".tabPanel").eq(curIndex).show();
        });
    });


    /*TPO阅读*/
    $("#tpo_read #questionsTabToggle").mouseenter(function(){
        $("#tpo_read #questionsTab").slideDown();
    }).mouseleave(function(e){
        $("#tpo_read #questionsTab").slideUp();
    });
    $("#tpo_read #questionsTab").mouseenter(function(){
        $(this).slideDown();
        $("#tpo_read #questionsTabToggle").addClass("mouseenter");
    }).mouseleave(function(){
        $(this).slideUp();
        $("#tpo_read #questionsTabToggle").removeClass("mouseenter");
    });
    //看解析
    $("#tpo_read #seeJieXiRead").click(function(){
        if($("#tpo_read #tpoReadJieXi").css("display")=="none"){
            $("#tpo_read #tpoReadJieXi").show();
        }else{
            $("#tpo_read #tpoReadJieXi").hide();
        }
    });
    //看讲解
    $("#tpo_read #seeJiangjie").click(function(){
        $("#audioPlayModal").show();
    });
    //关闭视频播放器
    $("#audioPlayModal  #close").click(function(){
        $("#audioPlayModal").hide();
    });
    //查看翻译
    $("#tpo_read .tpoRight").find("#seeFanyi").click(function(){
        if($("#tpo_read .tpoRight").find(".fanyi").css("display")=="none"){
            $("#tpo_read .tpoRight").find(".fanyi").show();
        }else{
            $("#tpo_read .tpoRight").find(".fanyi").hide();
        }
    })



    /*TPO听力*/
    $("#tpo_listen #questionsTabToggle").mouseenter(function(){
        $("#tpo_listen #questionsTab").show();
    }).mouseleave(function(e){
        $("#tpo_listen #questionsTab").hide();
    });
    $("#tpo_listen #questionsTab").mouseenter(function(){
        $(this).show();
        $("#tpo_listen #questionsTabToggle").addClass("mouseenter");
    }).mouseleave(function(){
        $(this).hide();
        $("#tpo_listen #questionsTabToggle").removeClass("mouseenter");
    });
    //看解析
    $("#tpo_listen #seeJieXiRead").click(function(){
        if($("#tpo_listen #tpoReadJieXi").css("display")=="none"){
            $("#tpo_listen #tpoReadJieXi").show();
        }else{
            $("#tpo_listen #tpoReadJieXi").hide();
        }
    });
    //看讲解
    $("#tpo_listen #seeJiangjie").click(function(){
        $("#audioPlayModal").show();
    });
    //播放左侧音频
    $("#tpo_listen #titListen").click(function(){
        var that=this;
        var audio=$("#tpo_listen .tpoLeft").find("#audioAudio")[0];
        audio.pause();
        $(that).attr("src","../i/plan/i2.png");
        //获取播放源
        var audioSrc=$(that).attr("data-url");
        //图片更换为gif
        $(that).attr("src","../i/plan/i2.gif");
        $("#tpo_listen .tpoLeft").find("#audioAudio").attr("src",audioSrc);
        audio.play();
        $(audio).bind('ended',function () {
            $(that).attr("src","../i/plan/i2.png");
        });
    });
    //查看原文
    $("#tpo_listen #seeFanyiListen").click(function(){
      if($(".tpoLecture").css("display")=="none"){
          $(".tpoLecture").show();
          $(".tpoListenImg").hide();
      }else{
          $(".tpoLecture").hide();
          $(".tpoListenImg").show();
      }
    });




    /*独立口语*/
    //选项卡
    $("#tpo_speaking .nav").find("li").each(function(){
        $(this).click(function(){
            var audio=$("#tpo_speaking  .da").find("#audioAudio")[0];
            if(audio.paused){}else{
                audio.pause();
                $("#tpo_speaking .da").find(".da_dic").attr("src","../i/plan/dic-pic.png");
            }
           var curIndex=$(this).index();
            $("#tpo_speaking .nav").find("li").removeClass("active");
            $(this).addClass("active");
            $("#tpo_speaking .xx").find(".tabPanel").hide();
            $("#tpo_speaking .xx").find(".tabPanel").eq(curIndex).show();
        });
    });
    //答案范例播放
    $("#tpo_speaking .da").find(".da_dic").click(function(){
        var that=this;
        var audio=$("#tpo_speaking  .da").find("#audioAudio")[0];
        if(audio.paused){
            $(that).attr("src","../i/plan/i1.gif");
            audio.play();
        }else{
            $(that).attr("src","../i/plan/dic-pic.png");
            audio.pause();
        }
        $(audio).bind("ended",function(){
            $(that).attr("src","../i/plan/dic-pic.png");
        });
    });
    //讲解视频播放
    $("#tpo_speaking .js").find(".tpo_fun_round").click(function(){
        $("#audioPlayModal").show();
    });
    //录音
    $("#tpo_speaking #start_btn").click(function(){
        if($("#tpo_speaking .tpo_speaking_container").css("display")=="none"){
            $("#tpo_speaking .tpo_speaking_container").show();
        }else{
            $("#tpo_speaking .tpo_speaking_container").hide();
        }
    });
    $("#tpo_speaking #startRecord").click(function(){
        $(this).hide();
        $("#tpo_speaking #recording").css("display","inline-block");
    });
    $("#tpo_speaking #recording").click(function(){
        $(this).hide();
        $("#tpo_speaking .button").find("button").removeAttr("disabled");
        $("#tpo_speaking #playRecord").css("display","inline-block");
    });
    $("#tpo_speaking #playRecord").click(function(){
        $(this).hide();
        $("#tpo_speaking #playingRecord").css("display","inline-block");
    });
    $("#tpo_speaking #playingRecord").click(function(){
        $(this).hide();
        $("#tpo_speaking #playRecord").css("display","inline-block");
    });
    //重新录
    $("#tpo_speaking #speak-reRecord").click(function(){
        $("#tpo_speaking .repeat_record").find("img").hide();
        $("#tpo_speaking #startRecord").css("display","inline-block");
        $("#tpo_speaking .button").find("button").attr("disabled","disabled");
    });
    //关闭保存成功提示
    $("#save_success .saveClose").click(function(){
        $("#save_success").hide();
    });



      /*综合口语*/
    $("#com_speaking .showArt").click(function(){
        if( $("#com_speaking .showArt_p").css("display")=="none"){
            $("#com_speaking .showArt_p").slideDown();
        }else{
            $("#com_speaking .showArt_p").slideUp();
        }
    })
    //讲解视频播放
    $("#com_speaking .js").find(".tpo_fun_round").click(function(){
        $("#audioPlayModal").show();
    });
    //录音
    $("#com_speaking #startRecord").click(function(){
        $(this).hide();
        $("#com_speaking #recording").css("display","inline-block");
    });
    $("#com_speaking #recording").click(function(){
        $(this).hide();
        $("#com_speaking .button").find("button").removeAttr("disabled");
        $("#com_speaking #playRecord").css("display","inline-block");
    });
    $("#com_speaking #playRecord").click(function(){
        $(this).hide();
        $("#com_speaking #playingRecord").css("display","inline-block");
    });
    $("#com_speaking #playingRecord").click(function(){
        $(this).hide();
        $("#com_speaking #playRecord").css("display","inline-block");
    });
    //重新录
    $("#com_speaking #speak-reRecord").click(function(){
        $("#com_speaking .repeat_record").find("img").hide();
        $("#com_speaking #startRecord").css("display","inline-block");
        $("#com_speaking .button").find("button").attr("disabled","disabled");
    });


    /*独立写作*/
    $("#tpo_writing #start_btn").click(function(){
        if($("#tpo_writing .ans_div").css("display")=="none"){
            $("#tpo_writing .ans_div").show();
        }else{
            $("#tpo_writing .ans_div").hide();
        }
    });
    $("#tpo_writing .share").find(".spre").click(function(){
        if($(this).attr("data-spre")=="1"){
            $(this).attr("data-spre","0");
            $(this).html("展开<span class='ic'>&or;</span>");
            $("#tpo_writing .share").find(".p2").css({"overflow":"hidden","display":"-webkit-box"});
        }else{
            $(this).attr("data-spre","1");
            $(this).html("收起<span class='ic'>&and;</span>");
            $("#tpo_writing .share").find(".p2").css({"height":"auto","display":"block"});
        }
    });




    /*综合写作*/
    //选项卡
    $("#com_writing .tpoWriteUl").find("li").each(function(){
        $(this).click(function(){
            var curIndex=$(this).index();
            $("#com_writing .tpoWriteUl").find("li").removeClass("active");
            $(this).addClass("active");
            $("#com_writing").find(".tabPanel").hide();
            $("#com_writing").find(".tabPanel").eq(curIndex).show();
        });
    });

    //音频
    $("#com_writing .play_pauseZ").click(function(e){
        e=e||window.event;
        var tar= e.target|| e.srcElement;
        var audioEle = $("#com_writing").find(" #myMusic")[0];
        if(audioEle.paused){
            $("#com_writing .play_pauseZ").find("p").css("display","none");
            $("#com_writing .play_pauseZ").find(".pauseZ").css("display","block");
            audioEle.play();
            barAudio("#com_writing");
        }else{
            $("#com_writing .play_pauseZ").find("p").css("display","none");
            $("#com_writing .play_pauseZ").find(".playZ").css("display","block");
            audioEle.pause();
            window.clearInterval(audioTimer);
        }
    });
    //讲解视频播放
    $("#com_writing .js").find(".tpo_fun_round").click(function(){
        $("#audioPlayModal").show();
    });




    /*口语练习*/
    //进度条
    var spokenTimer=null;
    function spokenBar(str){
        var audio=$(str).find("#spokenAudio")[0];
        var duration=audio.duration,curTime=audio.currentTime;
        var totalS=$(str).find("#bar").css("width");
        var curS=parseFloat(totalS)*curTime/duration;
        $(str).find("#bar").find(".finish").css("width",curS);
    }

    //播放音频
    $("#spoken").find(".control").click(function(){
        var audio=$("#spoken").find("#spokenAudio")[0];
        var that=this;
        if($(that).attr("data-play")==0){//未播放时点击
            spokenTimer=window.setInterval(function(){
                spokenBar("#spoken");
            },1000);
            $(that).attr("data-play","1");
            $(that).find("img").attr("src","../i/al/playing.png");
            audio.play();
        }else if($(that).attr("data-play")==1){//播放中点击
            window.clearInterval(spokenTimer);
            $(that).attr("data-play","2");
            $(that).find("img").attr("src","../i/al/stop.png");
            audio.pause();
        }else{//暂停时点击
            spokenTimer=window.setInterval(function(){
                spokenBar("#spoken");
            },1000);
            $(that).attr("data-play","1");
            $(that).find("img").attr("src","../i/al/playing.png");
            audio.play();
        }
        $(audio).bind("ended",function(){
            window.clearInterval(spokenTimer);
            $("#spoken").find("#bar").find(".finish").css("width",0);
            $(that).attr("data-play","0");
            $(that).find("img").attr("src","../i/al/start.png");
        });
    });
    //录音
    $("#spoken #startRecord").click(function(){
        $(this).hide();
        $("#spoken #recording").css("display","inline-block");
    });
    $("#spoken #recording").click(function(){
        $(this).hide();
        $("#spoken .right-btn").find("button").hide();
        $("#spoken .right-btn").find("button").eq(0).show();
        $("#spoken .right-btn").find("button").eq(1).show();
        //$("#spoken .right-btn").find("button").eq(2).show();

        $("#spoken #playRecord").css("display","inline-block");
    });
    $("#spoken #playRecord").click(function(){
        $(this).hide();
        $("#spoken #playingRecord").css("display","inline-block");
        $("#spoken .right-btn").find("button").eq(1).hide();
        $("#spoken .right-btn").find("button").eq(2).show();
    });
    $("#spoken #playingRecord").click(function(){
        $(this).hide();
        $("#spoken #playRecord").css("display","inline-block");
        $("#spoken .right-btn").find("button").eq(2).hide();
        $("#spoken .right-btn").find("button").eq(1).show();
    });
    //重录
    $("#spoken .right-btn").find(".btn1").click(function(){
        $("#spoken .repeat_record").find("img").hide();
        $("#spoken #startRecord").show();
        $("#spoken .right-btn").find("button").hide();
        $("#spoken .right-btn").find("button").eq(2).show();
    });
    //下一题
    $("#spoken .right-btn").find(".btn2").click(function(){
        $("#spoken .repeat_record").find("img").hide();
        $("#spoken #startRecord").show();
        $("#spoken .right-btn").find("button").hide();
        $("#spoken .right-btn").find("button").eq(2).show();
    });



    /*练习--习作*/
    //查看参考答案
    $("#translate #see_ans").click(function(){
        $(this).hide();
        $("#translate .right-key").show();
        $("#translate .right_textarea").hide();
    });
    $("#translate .right-key").find("#next_btn").click(function(){
        $("#translate .right-key").hide();
        $("#translate #see_ans").show();
        $("#translate .right_textarea").show();
    })















});