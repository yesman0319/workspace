'use strict';
/**
 * Created by SaE on 2015/3/2.
 * 复述功能
 */
define(['require', 
		'common/uniqueAjax', 
		'common/render', 
		'xml2json', 
		'app/baseURL', 
		'common/valiEnter', 
		'baseCookie', 
		'audioControl'], function (require, uniqueAjax, Render, xml2json, URL, ValiEnter, BaseCookie, ctrlAudio) {
   // var exerciseApi.xiaomaToken = "bearer b23b2aad4b8543f1a5c0c5ef5ea74182";//20160918
    var xm_questionId="",
        xm_planDayId='',
        xm_exerciseId='',
        xm_startTime='',
        xm_endTime='',
        xm_title='';
    var lastQuestionId = 0;

    //自动化测试代码start
    //var testMode = true;
    var correctAnswer = [];
    var blanks = [];
    var fillBlanks = function(){
        if(correctAnswer.length != blanks.length){
            //alert("答案个数："+correctAnswer.length + "<br/>空位个数："+blanks.length + "<br/>测试失败！");
            return;
        }
        for(var i=0; i<blanks.length-1; i++){
            $(blanks[i]).val(correctAnswer[i]);
        }
    };
    //自动化测试代码end

    //命名空间单体对象
    var TpoWrite = {
        $wrap: '',
        token: '',
        currentUnitId: 1,
        TMPL: {
            t1: 'app/exercise/tmpl_tpo_write_unit',
            t2: 'app/exercise/tmpl_tpo_write_submit',
            t3: 'app/exercise/tmpl_tpo_write_result'
        },
        getToken: function () {
            BaseCookie.get();
            TpoWrite.token = BaseCookie.getToken();
            if ("" == TpoWrite.token || null == TpoWrite.token) {
                TpoWrite.token = "xiaoma";
            }
        },
        /*通用Ajax方法*/
        sendAjax: function (param) {
            var promise = $.Deferred();
            if (!param) {
                return null;
            }
            if (!param.type) {
                param.type = 'get';
            }
            if (!param.contentType) {
                param.contentType = 'application/json';
            }
            if (!param.data) {
                param.data = '';
            }
            if (!param.headers) {
                param.headers = '';
            }
            $.ajax({
                url: param.url,
                type: param.type,
                contentType: param.contentType,
                data: param.data,
                headers: param.headers,
                success: function (json) {
                    promise.resolve(json);
                },
                error: function () {
                    promise.reject();
                }
            });
            return promise;
        }
        ,
        init: function (conf) {
            var _conf = $.extend({wrap: ''}, conf || {});
            TpoWrite.$wrap = $(_conf.wrap);
            TpoWrite.getToken();
            (new TpoWrite.Unit()).initEvent()
        }
    };



    /**列表页部分**/
    /*构造函数*/
    TpoWrite.Unit = function () {};

    TpoWrite.Unit.prototype.initEvent = function () {
        var _this = this;
        $(document).on('click','#showMorePlan',function(){
            $('#morePlan').show();
        });
        //$(document).on('trigger_side14', '#side14', function () {
        //    //toDoRender();
        //    _this.navigatorToTpoWrite(_this);
        //});
//        $(document).on('click', '#side14', function () {
//            //toDoRender();
//            TpoWrite.getToken();
//            _this.highLightNav();
////          _this.showUnitList();  /*不加载练习单元列表*/
//			_this.startQuestion(); /*点击综合填空，即进入相应答题页面*/
//        });
//      $(document).on('click', '.tpounit', _this.showUnitList); 
//      $(document).on('click', '.goTpoQuestion', _this.startQuestion); 
        $(document).on('click', '.goTpoResult', function(ee){
            (new TpoWrite.Result).showUserResult($(this).attr('groupid'),$(this).attr('data-last_question'));
        });
        $(document).on('click', '.locked-item', function(event){
            $("#lockModal").modal();
            return;
        });
        $(document).on('click', '#start_btn', function(){
            if($("#speak_h202").css("display")=="none"){
                $("#speak_h202").css("display","block");
            }else{
                $("#speak_h202").css("display","none");
            }
        });
        $(document).on('click', '.spre', function() {
            if ($(this).attr("data-spre") == "1") {
                $(this).attr("data-spre", "0");
                $(this).html("展开<span class='ic'>&or;</span>");
                $(this).prev().css({"overflow": "hidden", "display": "-webkit-box"});
            } else {
                $(this).attr("data-spre", "1");
                $(this).html("收起<span class='ic'>&and;</span>");
                $(this).prev().css({"height": "auto", "display": "block"});
            }
        });
    };


    /*处理左侧导航条效果*/
    TpoWrite.Unit.prototype.highLightNav = function () {
        $('.sidebar-ul').find('a.sidebarLight').removeClass('sidebarLight');
        $("#side14").addClass('sidebarLight')
    };

    /*导航到功能页*/
    TpoWrite.Unit.prototype.navigatorToTpoWrite = function (_this) {
        TpoWrite.getToken();
        _this.highLightNav();
//      _this.showUnitList();
    };

    /*呈现单元列表*/
    TpoWrite.Unit.prototype.showUnitList = function () {
        var param = {
            url: URL.baseURL13 + 'tpo_writing_questions',
            headers: {
                Authorization: TpoWrite.token
            },
            data:{from:1}
        };
        var promise = TpoWrite.sendAjax(param);
        promise.then(function (data) {
            var renderData = [];
            if (data.tpo_writing_questions) {
                lastQuestionId = data.tpo_writing_questions[data.tpo_writing_questions.length-1].question_id;
                renderData = data.tpo_writing_questions;
            }
            Render.render({
                wrap: TpoWrite.$wrap,
                tmpl: {
                    tmplName: TpoWrite.TMPL.t1,
                    tmplData: renderData
                },
                afterRender: function () {
                }
            });
        });
    };


    /*开始做题页面*/
    TpoWrite.Unit.prototype.startQuestion = function () {
        var $this = $(this),
//          currGroupId = $this.attr('groupid'),
//          currGroupLevel = $this.attr('data-group_level'),
//          currIsLast = $this.attr('data-last_question');
			currGroupId = 1,
			currGroupLevel = -2,
			currIsLast;
        (new TpoWrite.Doing).showQuestionDetail(currGroupId,currGroupLevel,currIsLast);
    };


    /**做题部分**/
    /*构造函数*/
    TpoWrite.Doing = function () {
        var _this = this;
        _this.CurrQuestionId = 0;
        _this.currGroupId = 0;
        _this.nextGroupId = 0;
        _this.currGroupNumber = 0;
        _this.questionType = 0;
        _this.answerGroups = [];//正确答案(整句)
         _this.customAnswerGroups = [];//用户答案(整句)
        _this.correctedGroups = [];//用户答案(整句)
        _this.answers= [];//正确答案
        // 记录用户输入，如果没有填写任何内容，disable提交按钮
        _this.clientAnswerCount = 0;//是否有答题内容
        _this.usedTime = 0;
        _this.timer = null;
    };

    /*显示Tpo做题页面*/
    //TpoWrite.Doing.prototype.showQuestionDetail = function (currGroupId, currGroupLevel,currIsLast) {
    TpoWrite.Doing.prototype.showQuestionDetail = function (questionId) {
        var _this = this,
            renderData = [],
            param = {
                //url: URL.baseURL13 + 'tpo_writing_questions/get_one',
                url:URL.xiaomaURL+"api/v4/tpo_writing_questions/"+questionId,
                type:"GET",
                headers: {
                    Authorization: exerciseApi.xiaomaToken
                }
            };
        window.clearInterval(_this.timer);
        _this.timer=null;
        var promise = TpoWrite.sendAjax(param);
        promise.then(function (data) {
            data= $.parseJSON(data);
            if (!data.status) {
                //处理准备显示的数据
                renderData = _this.manageQuestionData(_this,data);
                //renderData.groupId = currGroupId;
                renderData.groupId = questionId;
                renderData.groupNumber = data.sequence_number;
                renderData.questionType = data.question_type;
                //_this.currGroupId = currGroupId;
                _this.currGroupId = questionId;
                //_this.currGroupLevel = currGroupLevel;
                _this.currGroupNumber = data.sequence_number;
                _this.questionType = data.question_type;
                //_this.currIsLast = currIsLast;
            }
            renderData.xm_title=xm_title;
            Render.render({
                wrap: TpoWrite.$wrap,
                tmpl: {
                    tmplName: TpoWrite.TMPL.t2,
                    tmplData: renderData
                },
                afterRender: function () {
                    _this.afterRenderQuestion(_this, renderData);
                    _this.clientAnswerCount = 0;
                    $(document).on('focus','input',function(){
                        if(!$(this).val().trim().length){
                            _this.clientAnswerCount ++;
                        }
                    });
                    $(document).on('blur','input',function(){
                        if($(this).val().trim()){
                            $("#btnSubmitTpo").removeClass("disabled");
                            $("#btnSubmitTpo").addClass("active");
                        }
                        else{
                            _this.clientAnswerCount --;
                        }
                        if(!_this.clientAnswerCount){
                            $("#btnSubmitTpo").removeClass("active");
                            $("#btnSubmitTpo").addClass("disabled");
                        }
                    });
                    $(document).on('click', '.nav-tabs>li',function(event){
                        if($(this).attr('id') == "test_content"){
                            var isAutoPlay = _this.isAutoPlay;
                            _this.autoPaused = true;
                            $("#myMusic")[0].pause();
                            $("#timerspan").css("visibility", "visible");
                            if(_this.timer)return;
                            _this.usedTime=0;
                           // var date=new Date($.ajax({async: false}).getResponseHeader("Date"));
                            var date=getTime();
                            xm_startTime=zeroFn(date.getFullYear())+"-"+zeroFn((date.getMonth()+1))+"-"+zeroFn(date.getDate())+" "+zeroFn(date.getHours())+":"+zeroFn(date.getMinutes())+":"+zeroFn(date.getSeconds());
                            date=null;
                            _this.timer = setInterval(function(){
                                _this.usedTime ++;
                                if ($("#testTimer5").length <= 0) {
                                    console.log("not find target");
                                }
                                var checkTime = function(i) {
                                    if (i < 10) {
                                        i = "0" + i;
                                    }
                                    return i;
                                };
                                var hh = parseInt(_this.usedTime / 60 / 60 % 24, 10);
                                var mm = parseInt(_this.usedTime / 60 % 60, 10);
                                var ss = parseInt(_this.usedTime % 60, 10);
                                hh = checkTime(hh);
                                mm = checkTime(mm);
                                ss = checkTime(ss);
                                $("#testTimer5").html(hh + ":" + mm + ":" + ss);
                            },1000);
                        }else{
                            if(_this.isAutoPlay){
                                $("#myMusic")[0].play();
                            }
                        }
                    });
                }
            });
        });
    };

    /*处理呈现做题页面的数据*/
    TpoWrite.Doing.prototype.manageQuestionData = function (_this, data) {
        if(!data){
            return;
        }
        var question = data,
            strSample='',
            finalData = {
                question_id: 0,
                audio_url: '',
                material: [],//范文
                strSample: ''//准备填空的文章
            };
        //记录单元和当前题的ID信息
        _this.CurrQuestionId = question.id;
        //解析出来的xml文档（包含范文和填空的文章）
        var content = $.xml2json(question.content);
        _this.content = question.content;
        if(!content.itemBody){
            return;
        }
        finalData.question_id=question.id;
        finalData.audio_url=question.audio_url;
        //范文
        $.each(content.itemBody.blockquoteMaterial.p_en,function(i,obj){
            finalData.material.push(obj);
        });
        //需填空的文章
        $.each(content.itemBody.blockquoteSample.p_en,function(i,obj){
            strSample += obj + '<br/><br/>';
        });
        finalData.strSample = strSample.replace(/\{.+?\}/g,function($all,$child,$index,str){
            var answer = $all.substring(1,$all.length-1);
            var wordArray = answer.split(/[,.:"，。：“”\s]/);
            var resultString = "";
            var trimArray = [];
            for(var i=0; i<wordArray.length; i++){
                if(wordArray[i] != ""){
                    trimArray.push(wordArray[i]);
                }
            }
            if(!_this.answerGroups){
                _this.answerGroups=[];
            }
            _this.answerGroups.push({group:$child,wordArray:trimArray});
            $.each(wordArray,function(i,obj){
                var array = obj.split('.');
                $.each(array, function(j, innerObj){
                    //过滤多出来的空格
                    if(innerObj.trim() == "" || innerObj.trim() == "'") return;
                    if(!_this.answers){
                        _this.answers=[];
                    }
                    _this.answers.push(innerObj);
                    resultString += '<input type="text" data-word-group="'+$child+'" class="fillin tpo-w-space tpo-write-input1" idx="'+(_this.answers.length-1)+'" />';
                });
            });
            return resultString;
        });
        return finalData;
    };

    /*呈现录音页面之后的回调函数*/
    TpoWrite.Doing.prototype.afterRenderQuestion = function (_this, renderData) {

        //初始化播放器控件
        audiojs.events.ready(function() {
            var objAudit = document.getElementById('myMusic');

            var a1 = audiojs.create(objAudit, {
                css: false,
                createPlayer: {
                    markup: false,
                    playPauseClass: 'play-pauseZ',
                    scrubberClass: 'scrubberZ',
                    progressClass: 'progressZ',
                    loaderClass: 'loadedZ',
                    timeClass: 'timeZ',
                    durationClass: 'durationZ',
                    playedClass: 'playedZ',
                    errorMessageClass: 'error-messageZ',
                    playingClass: 'playingZ',
                    loadingClass: 'loadingZ',
                    errorClass: 'errorZ'
                }
            });
        });

        //显示需填空的文章
        $('#divFill').html(renderData.strSample);
        //输入框按键事件
        $('.fillin').keydown(function(e) {
            //keycode=229(中文输入法下的字母和数字键为229)
            if (e.which == 32 || e.which == 13) {
                var thisIndex=parseInt($(this).attr('idx')),
                    nextIndex;
                if(isNaN(thisIndex)){
                    thisIndex=0;
                }
                nextIndex=thisIndex+1;
                var next = $('#divFill input[idx="'+nextIndex+'"]');
                if (next.length>0) {
                    next.focus();
                }
            }
        }).mouseup(function(){
            $(this).select();
        });

        /*--以下部分给按钮控件绑定事件--*/
        $('#btnSubmitTpo').on('click', function () {
            //TpoWrite.getToken();
            //if (!TpoWrite.token || TpoWrite.token == 'xiaoma') {
            //    $('#dialogLogin').modal();
            //    $('#dialogLogin').on('hidden.bs.modal', function(e) {
            //        TpoWrite.getToken();
            //    });
            //    return;
            //}
            $('#btnSubmitTpo').addClass("disabled");
            clearInterval(_this.timer);
            _this.tpoSubmit();
        });
        $('#myMusic').on('play', function () {
            _this.isAutoPlay = true;
        });
        $('#myMusic').on('pause', function () {
            if(_this.autoPaused) {
                _this.autoPaused = false;
                return;
            }
            _this.isAutoPlay = false;
        });
    };

    /*提交*/
    TpoWrite.Doing.prototype.tpoSubmit = function (_this) {
        var _this = this,
            rightCount=0,
            answer='',//正确答案
            myAnswer='',//我的答案
            arrResult=[],
            correctArrResult=[],
            isFill=false;//是否有填写内容
            for(var i=0; i<_this.answerGroups.length; i++){
                var $eles = $('.fillin[data-word-group='+_this.answerGroups[i].group+']');
                var customWordArray=[];
                $eles.each(function(i,obj){
                    if(!customWordArray){
                        customWordArray=[];
                    }
                    customWordArray.push($.trim($(obj).val()));
                });
                if(!_this.customAnswerGroups){
                    _this.customAnswerGroups=[];
                }
                _this.customAnswerGroups.push({group:_this.answerGroups[i].group,customWordArray:customWordArray});
            }
            //console.log("用户答案集");
            //console.log(_this.customAnswerGroups);
            var questionNum = -1;
            var questionNum_corr = -1;
            for(var i=0; i<_this.answerGroups.length; i++){
                if(_this.answerGroups[i].wordArray.length>1){
                    var matchedResult = MathWord_TF(_this.answerGroups[i].wordArray, _this.customAnswerGroups[i].customWordArray);
                    rightCount += matchedResult.rightCount;
                    //console.log("比对结果"+i);
                    //console.log(matchedResult);
                    for(var j=0; j<matchedResult.length; j++){
                        var obj = matchedResult[j];
                        var result = {
                            "section_number": 0,
                            "is_correct": 2,
                            "answer": ''
                        };
                        result.section_number= ++questionNum ;
                        result.answer=obj.value;
                        result.is_correct = obj.correct ? 1 : 2;
                        arrResult.push(result);
                    }
                    //console.log(arrResult);
                    var matchedCorrectResult = MathWord_TF(_this.customAnswerGroups[i].customWordArray, _this.answerGroups[i].wordArray);
                    for(var j=0; j<matchedCorrectResult.length; j++){
                        var obj = matchedCorrectResult[j];
                        var result = {
                            "section_number": 0,
                            "is_correct": 2,
                            "answer": ''
                        };
                        result.section_number= ++questionNum_corr ;
                        result.answer=obj.value;
                        result.is_correct = obj.correct ? 1 : 2;
                        correctArrResult.push(result);
                    }
                    //console.log(correctArrResult);

                }else{
                    var $input = $(obj),
                        result = {
                            "section_number": 0,
                            "is_correct": 2,
                            "answer": ''
                        };
                    myAnswer = _this.customAnswerGroups[i].customWordArray[0];
                    //questionNum =parseInt($input.attr('idx'));

                    result.section_number= ++questionNum ;
                    result.answer=myAnswer;
                    if(myAnswer){
                        answer = _this.answers[result.section_number];
                        var tempAnswer = myAnswer.toLowerCase().trim();
                        var correctAnswer = answer.toLowerCase();
                        //处理多余符号 ’
                        //忽略标准答案和用户答案中的第一个'、’
                        if(tempAnswer.toLowerCase()[0] =="'"){
                            tempAnswer = tempAnswer.substring(1,tempAnswer.length);
                        }
                        if(tempAnswer.toLowerCase()[0] =="’"){
                            tempAnswer = tempAnswer.substring(1,tempAnswer.length);
                        }
                        if(correctAnswer.toLowerCase()[0] =="'"){
                            correctAnswer = correctAnswer.substring(1,correctAnswer.length);
                        }
                        if(correctAnswer.toLowerCase()[0] =="’"){
                            correctAnswer = correctAnswer.substring(1,correctAnswer.length);
                        }
                        //忽略标准答案和用户答案中的最后一个'、‘；s后面的'为表示所属关系，不忽略
                        if(tempAnswer.toLowerCase()[tempAnswer.length-1] == "'" && tempAnswer.toLowerCase()[tempAnswer.length-2] != "s"){
                            tempAnswer = tempAnswer.substring(0,tempAnswer.length-1);
                        }
                        if(tempAnswer.toLowerCase()[tempAnswer.length-1] == "’" && tempAnswer.toLowerCase()[tempAnswer.length-2] != "s"){
                            tempAnswer = tempAnswer.substring(0,tempAnswer.length-1);
                        }
                        if(correctAnswer.toLowerCase()[correctAnswer.length-1] == "'" && correctAnswer.toLowerCase()[correctAnswer.length-2] != "s"){
                            correctAnswer = correctAnswer.substring(0,correctAnswer.length-1);
                        }
                        if(correctAnswer.toLowerCase()[correctAnswer.length-1] == "’" && correctAnswer.toLowerCase()[correctAnswer.length-2] != "s"){
                            correctAnswer = correctAnswer.substring(0,correctAnswer.length-1);
                        }
                        //if(testMode){
                        //    console.log(correctAnswer);
                        //    console.log(tempAnswer);
                        //}
                        if(tempAnswer.toLowerCase().trim()==correctAnswer.toLowerCase()){
                            //正确
                            result.is_correct=1;
                            rightCount++;
                        }else if(correctAnswer[correctAnswer.length-2] == '’' && tempAnswer[tempAnswer.length-2] == "'"){//处理中英文输入模式下的',
                            //正确
                            result.is_correct=1;
                            rightCount++;
                        }else if(correctAnswer[correctAnswer.length-1] == '’' && tempAnswer[tempAnswer.length-1] == "'"){
                            //正确
                            result.is_correct=1;
                            rightCount++;
                        }
                        isFill=true;
                    }
                    arrResult.push(result);

                    correctArrResult.push({
                        "section_number": ++questionNum_corr,
                        "is_correct": result.is_correct,
                        "answer": answer
                    });
                }
            }
        //var date=new Date($.ajax({async: false}).getResponseHeader("Date"));
        var date=getTime();
        xm_endTime=zeroFn(date.getFullYear())+"-"+zeroFn((date.getMonth()+1))+"-"+zeroFn(date.getDate())+" "+zeroFn(date.getHours())+":"+zeroFn(date.getMinutes())+":"+zeroFn(date.getSeconds());
        date=null;
        var postData={
            "question_id":_this.CurrQuestionId,
            "rate":(rightCount/_this.answers.length*100).toFixed(0),
            spend_time:_this.usedTime,
            word_amount:_this.answers.length,
            "question_results":arrResult,
            "planDayId":xm_planDayId,
            "exerciseId":xm_exerciseId,
            "startTime":xm_startTime,
            "endTime":xm_endTime
        };
        var param = {
            url: URL.xiaomaURL + 'api/v4/tpo_writing_results',
            headers: {
                Authorization:exerciseApi.xiaomaToken
            },
            type:'post',
            data: JSON.stringify(postData)
        };
        var promise = TpoWrite.sendAjax(param);
        promise.then(function (data) {
            exerciseApi.updateListItem();
            data= $.parseJSON(data);
            //提交成功
            if(!data.status){
                //显示结果页
                (new TpoWrite.Result).showCurrUserResult(_this.currGroupId, _this.currGroupLevel,postData,correctArrResult, data, _this.content, _this.currGroupNumber, _this.currIsLast);
            }else{
                var response;
                try{
                    response = JSON.parse(data);
                    alert(response.error);
                    return;
                }
                catch(e){}
                alert('提交失败！');
            }
        });

    };


    /**结果部分**/
    TpoWrite.Result=function(){
        var _this = this;
        _this.currGroupId = 0;
        _this.nextGroupId = 0;
        _this.nextGroupStatus = 0;
    };

    /*显示本次做答结果页*/
    TpoWrite.Result.prototype.showCurrUserResult = function (currGroupId, bestGroupLevel,currAnswer,correctArrResult, currResult,questionContent, currGroupNumber, currIsLast) {
        var _this = this,
            renderData = [];
        _this.currGroupId = currGroupId;
        _this.bestGroupLevel = bestGroupLevel;
        _this.currentAnswer = currAnswer;
        _this.currResult = currResult;
        _this.questionContent = questionContent;
        _this.sequence_number = currGroupNumber;
        _this.currIsLast = currIsLast;
        var data = {
            avg_speed:currResult.avg_speed,
            group_level:currResult.group_level,
            next_question_id:currResult.next_question_id,
            next_question_status:currResult.next_question_status,
            question_content:questionContent,
            question_id:currAnswer.question_id,
            question_results:currAnswer.question_results,
            correctArrResult: correctArrResult,
            rate:currAnswer.rate,
            sequence_number: currGroupNumber,
            is_last: _this.currIsLast,
            is_deblock: currResult.is_deblock
        };

        //处理准备显示的数据
        renderData = _this.dealResultData(_this,data);
        renderData.xm_title=xm_title;
        renderData.groupId = data.question_id;
        renderData.groupNumber = data.sequence_number;
        renderData.group_level = data.group_level;
        renderData.rate=data.rate;
        renderData.nextGroupStatus = data.next_question_status;
        renderData.avgSpeed = data.avg_speed;
        renderData.isLast = data.is_last;
        _this.enableNextBtn = bestGroupLevel>2?true:false;
        _this.enableNextBtn = data.group_level>2?true:_this.enableNextBtn;
        if(data.is_deblock == 1){
            _this.enableNextBtn = true;
        }
        renderData.enableNextBtn = _this.enableNextBtn;
        _this.currGroupId = data.question_id;
        _this.nextGroupId = data.next_question_id;
        _this.nextGroupStatus = data.next_question_status;
        if(data.next_question_status==0 && renderData.enableNextBtn){
            _this.nextGroupStatus = 1;
        }
        renderData.isBest = false;
        renderData.isFromPlan=exerciseApi.isFromPlan;
        Render.render({
            wrap: TpoWrite.$wrap,
            tmpl: {
                tmplName: TpoWrite.TMPL.t3,
                tmplData: renderData
            },
            afterRender: function () {
                _this.afterRenderResult(_this, renderData);
                //弹出隐藏层
                $(document).on('click', '#closeQuan', function() {
                    closeDiv('quanDiv', 'fade')
                })
                var showDiv = function(show_div, bg_div) {
                    document.getElementById(show_div).style.display = 'block';
                    document.getElementById(bg_div).style.display = 'block';
                    var bgdiv = document.getElementById(bg_div);
                    bgdiv.style.width = document.body.scrollWidth;
                    $("#" + bg_div).height($(document).height());
                };
                //关闭弹出层
                var closeDiv = function(show_div, bg_div) {
                    document.getElementById(show_div).style.display = 'none';
                    document.getElementById(bg_div).style.display = 'none';
                };
                if(currResult.is_reward_coupon){
                    // showDiv('quanDiv', 'fade')
                }
            }
        });
    };
    /*显示最好成绩结果页*/
    TpoWrite.Result.prototype.showUserResult = function (currGroupId, currIsLast) {
        var _this = this,
            renderData = [],
            param = {
                //url: URL.baseURL13 + 'tpo_writing_results',
                url:URL.xiaomaURL+"api/v4/tpo_writing_results",
                data:{
                    question_id:currGroupId
                },
                headers: {
                    Authorization: exerciseApi.xiaomaToken
                }
            };
        _this.currGroupId=currGroupId;

        var promise = TpoWrite.sendAjax(param);
        promise.then(function (data) {
            data= $.parseJSON(data);
            if (!data.status) {
                //处理准备显示的数据
                renderData = _this.dealResultData(_this,data,true);
                if(!renderData){//无法显示结果页，显示做题页
                    (new TpoWrite.Doing).showQuestionDetail(data.question_id);
                    return;
                }
                renderData.groupId = data.question_id;
                renderData.groupNumber = data.sequence_number;
                renderData.group_level = data.group_level;
                renderData.rate=data.rate;
                renderData.nextGroupStatus = data.next_question_status;
                renderData.avgSpeed = data.avg_speed;
                renderData.isLast = currIsLast;
                _this.currGroupId = data.question_id;
                _this.nextGroupId = data.next_question_id;
                _this.nextGroupStatus = data.next_question_status;
                _this.currIsLast = currIsLast;
            }
            renderData.isBest = true;
            renderData.xm_title=xm_title;
            renderData.isFromPlan=exerciseApi.isFromPlan;
            Render.render({
                wrap: TpoWrite.$wrap,
                tmpl: {
                    tmplName: TpoWrite.TMPL.t3,
                    tmplData: renderData
                },
                afterRender: function () {
                    _this.afterRenderResult(_this, renderData);
                }
            });
        });
    };

    /*处理结果页的数据*/
    TpoWrite.Result.prototype.dealResultData = function (_this, data,isBest) {
        if(!data||data.question_results.length==0){
            console.log("数据不符合1");
            return;
        }
        var question = data,
            article='',
            finalData = {
                question_id: 0,
                strArticle: ''//准备填空的文章
            };
        //解析出来的xml文档（包含范文和填空的文章）
        var content = $.xml2json(question.question_content);
        if(!content.itemBody){
            return;
        }

        //把接口返回结果处理成一个方便遍历的键值对对象（如：{1:{number:1,is_correct:2},2:{},3:{}}）
        var objResponse={};
        $.each(question.question_results,function(i,obj){
            //console.log(obj);
            objResponse[obj.section_number]=obj;
        });

        //文章的首行加几个空格，段尾加换行
        $.each(content.itemBody.blockquoteSample.p_en,function(i,obj){
            article += obj + '<br/><br/>';
        });
        //替换｛｝中的内容
        //将正确单词和用户填写的单词放到一起通过tab样式控制他们分别的显示
        var wordIndex=0;
        finalData.strArticle = article.replace(/\{.+?\}/g,function($all,$child,$index){
            var strReplace='';
            var answer = $all.substring(1,$all.length-1);
            //console.log(answer);
            //var wordArray = answer.split(" ");
            var wordArray = answer.split(/[,.\s]/);
            $.each(wordArray,function(i,obj){
                var array = obj.split('.');
                $.each(array, function(i, innerObj){
                    //过滤多出来的空格
                    //判断是否有 ' 符号
                    if(innerObj.trim() == "" || innerObj.trim() == "'") return;

                    //1:对，2:错
                    if(objResponse[wordIndex] && objResponse[wordIndex].is_correct==1){
                        //strReplace += '<span class="tpo-write-mistake tpo-w-space blue">'+innerObj+'</span>';
                        strReplace += '<span class="tpo-write-mistake tpo-w-space blue">' +
                        '<label class="sample">'+innerObj+'</label>' +
                        '<label data-word-group="'+$child+'" class="user-sample" style="min-width: 40px;">'+ (objResponse[wordIndex] ? objResponse[wordIndex].answer : '') +'</label></span>';
                    }else{
                        strReplace += '<span class="tpo-write-mistake tpo-w-space tpo-write-mistake-style" style="padding:0 10px;">' +
                        '<label class="sample">'+innerObj+'</label>' +
                        '<label  data-word-group="'+$child+'" class="user-sample" style="min-width: 40px;">'+ (objResponse[wordIndex] ? objResponse[wordIndex].answer : '') +'</label></span>';
                    }
                    wordIndex++;
                });
            });
            return strReplace;
        });
        var objResponseCorrect={};
        if(question.correctArrResult){
            $.each(question.correctArrResult,function(i,obj){
                objResponseCorrect[obj.section_number]=obj;
            });
        }else{
            var answerGroups = [],
                answers = [],
                answer='',//正确答案
                myAnswer='',//我的答案
                customAnswerGroups = [];
            article.replace(/\{.+?\}/g,function($all,$child,$index,str){
                var answer = $all.substring(1,$all.length-1);
                //console.log("原始答案");
                //console.log(answer);
                //var wordArray = answer.split(" ");
                var wordArray = answer.split(/[,.:"，。：“”\s]/);
                var resultString = "";
                var trimArray = [];
                for(var i=0; i<wordArray.length; i++){
                    if(wordArray[i] != ""){
                        trimArray.push(wordArray[i]);
                    }
                }
                answerGroups.push({group:$child,wordArray:trimArray});
                //console.log("句子");
                //console.log(answerGroups);
                $.each(wordArray,function(i,obj){
                    //var isOne = true;
                    var array = obj.split('.');
                    $.each(array, function(j, innerObj){
                        //过滤多出来的空格
                        if(innerObj.trim() == "" || innerObj.trim() == "'") return;
                        answers.push(innerObj);
                    });
                });
                return resultString;
            });
            var correctArrResult=[];
            for(var i=0; i<answerGroups.length; i++){
                var customWordArray=[];
                for(var t=0; t<answerGroups[i].wordArray.length; t++){
                    customWordArray.push(question.question_results.shift().answer);
                }
                customAnswerGroups.push({group:answerGroups[i].group,customWordArray:customWordArray});
            }
            //console.log("用户答案集");
            //console.log(customAnswerGroups);
            var questionNum = -1;
            var questionNum_corr = -1;
            for(var i=0; i<answerGroups.length; i++){
                if(answerGroups[i].wordArray.length>1){
                    var matchedCorrectResult = MathWord_TF(customAnswerGroups[i].customWordArray, answerGroups[i].wordArray);
                    for(var j=0; j<matchedCorrectResult.length; j++){
                        var obj = matchedCorrectResult[j];
                        var result = {
                            "section_number": 0,
                            "is_correct": 2,
                            "answer": ''
                        };
                        result.section_number= ++questionNum_corr ;
                        result.answer=obj.value;
                        result.is_correct = obj.correct ? 1 : 2;
                        correctArrResult.push(result);
                    }
                    //console.log("correctArrResult");
                    //console.log(correctArrResult);

                }else{
                    var $input = $(obj),
                        result = {
                            "section_number": 0,
                            "is_correct": 2,
                            "answer": ''
                        };
                    myAnswer = customAnswerGroups[i].customWordArray[0];

                    result.section_number= ++questionNum ;
                    result.answer=myAnswer;
                    if(myAnswer){
                        answer = answers[result.section_number];
                        var tempAnswer = myAnswer.toLowerCase().trim();
                        var correctAnswer = answer.toLowerCase();
                        //处理多余符号 ’
                        //忽略标准答案和用户答案中的第一个'、’
                        if(tempAnswer.toLowerCase()[0] =="'"){
                            tempAnswer = tempAnswer.substring(1,tempAnswer.length);
                        }
                        if(tempAnswer.toLowerCase()[0] =="’"){
                            tempAnswer = tempAnswer.substring(1,tempAnswer.length);
                        }
                        if(correctAnswer.toLowerCase()[0] =="'"){
                            correctAnswer = correctAnswer.substring(1,correctAnswer.length);
                        }
                        if(correctAnswer.toLowerCase()[0] =="’"){
                            correctAnswer = correctAnswer.substring(1,correctAnswer.length);
                        }
                        //忽略标准答案和用户答案中的最后一个'、‘；s后面的'为表示所属关系，不忽略
                        if(tempAnswer.toLowerCase()[tempAnswer.length-1] == "'" && tempAnswer.toLowerCase()[tempAnswer.length-2] != "s"){
                            tempAnswer = tempAnswer.substring(0,tempAnswer.length-1);
                        }
                        if(tempAnswer.toLowerCase()[tempAnswer.length-1] == "’" && tempAnswer.toLowerCase()[tempAnswer.length-2] != "s"){
                            tempAnswer = tempAnswer.substring(0,tempAnswer.length-1);
                        }
                        if(correctAnswer.toLowerCase()[correctAnswer.length-1] == "'" && correctAnswer.toLowerCase()[correctAnswer.length-2] != "s"){
                            correctAnswer = correctAnswer.substring(0,correctAnswer.length-1);
                        }
                        if(correctAnswer.toLowerCase()[correctAnswer.length-1] == "’" && correctAnswer.toLowerCase()[correctAnswer.length-2] != "s"){
                            correctAnswer = correctAnswer.substring(0,correctAnswer.length-1);
                        }
                        if(tempAnswer.toLowerCase().trim()==correctAnswer.toLowerCase()){
                            //正确
                            result.is_correct=1;
                        }else if(correctAnswer[correctAnswer.length-2] == '’' && tempAnswer[tempAnswer.length-2] == "'"){//处理中英文输入模式下的',
                            //正确
                            result.is_correct=1;
                        }else if(correctAnswer[correctAnswer.length-1] == '’' && tempAnswer[tempAnswer.length-1] == "'"){
                            //正确
                            result.is_correct=1;
                        }
                    }
                    correctArrResult.push({
                        "section_number": ++questionNum_corr,
                        "is_correct": result.is_correct,
                        "answer": answer
                    });
                }
            }
            $.each(correctArrResult,function(i,obj){
                objResponseCorrect[obj.section_number]=obj;
            });
        }
        //console.log("objResponseCorrect");
        //console.log(objResponseCorrect);
        var wordIndex_correct=0;
        finalData.strCorrectArticle = article.replace(/\{.+?\}/g,function($all,$child,$index){
            var strReplace='';
            var answer = $all.substring(1,$all.length-1);
            //console.log(answer);
            //var wordArray = answer.split(" ");
            var wordArray = answer.split(/[,.\s]/);
            $.each(wordArray,function(i,obj){
                var array = obj.split('.');
                $.each(array, function(i, innerObj){
                    //过滤多出来的空格
                    //判断是否有 ' 符号
                    if(innerObj.trim() == "" || innerObj.trim() == "'") return;

                    //1:对，2:错
                    if(objResponseCorrect[wordIndex_correct] && objResponseCorrect[wordIndex_correct].is_correct==1){
                        //strReplace += '<span class="tpo-write-mistake tpo-w-space blue">'+innerObj+'</span>';
                        strReplace += '<span class="tpo-write-mistake tpo-w-space blue">' +
                            '<label class="sample">'+innerObj+'</label>' +
                            '<label  data-word-group="'+$child+'" class="user-sample" style="min-width: 40px;">'+ (objResponseCorrect[wordIndex_correct] ? objResponseCorrect[wordIndex_correct].answer : '') +'</label></span>';
                    }else{
                        strReplace += '<span class="tpo-write-mistake tpo-w-space tpo-write-mistake-style" style="padding:0 10px;">' +
                            '<label class="sample">'+innerObj+'</label>' +
                            '<label data-word-group="'+$child+'"  class="user-sample" style="min-width: 40px;">'+ (objResponseCorrect[wordIndex_correct] ? objResponseCorrect[wordIndex_correct].answer : '') +'</label></span>';
                    }
                    wordIndex_correct++;
                });
            });
            return strReplace;
        });
        return finalData;
    };

    /*呈现结果页之后的回调函数*/
    TpoWrite.Result.prototype.afterRenderResult = function (_this, renderData) {
        var rate=renderData.rate;
        //显示正确文章
        $('#divMyAnswer').html(renderData.strArticle);
        //显示用户填写的文章
        //if(_this.questionType ==1){
        //    $('#divRightAnswer').html(renderData.strArticle);
        //}else{
            $('#divRightAnswer').html(renderData.strCorrectArticle);
        //}

        /*--重新练习按钮--*/
        $('#btnTpoAgain').on('click', function () {
            $('#btnTpoAgain').addClass("disabled");
            _this.doAgain();
        });
        /*--下一个章节按钮--*/
        $('#btnTpoNext').on('click', function () {
            $('#btnTpoNext').addClass("disabled");
            if($('#btnTpoNext').hasClass('last-question') || lastQuestionId == _this.currGroupId){
                alert('已经是最后一题了！');
                (new TpoWrite.Unit()).showUnitList();
            }
            else{
                _this.doNext();
            }
        });
        //吊炸天那个图的显示
        if (rate < 50) {
            $(".result-img1").attr("src", "../../i/i23.png");
        }else if (rate >= 50 && rate <= 80) {
            $(".result-img1").attr("src", "../../i/i22.png");
        }else if (rate > 80 && rate < 100) {
            $(".result-img1").attr("src", "../../i/i21.png");
        }else if(rate == 100) {
            $(".result-img1").attr("src", "../../i/i24-1.png");
            //$(".result-img1").addClass("i24");//i24图片中加的class
        }
    };

    /*重做*/
    TpoWrite.Result.prototype.doAgain = function () {
        var _this = this;
        (new TpoWrite.Doing).showQuestionDetail(_this.currGroupId);
    };

    /*做下一题*/
    TpoWrite.Result.prototype.doNext = function () {
        var _this = this;
        if(_this.nextGroupStatus == 1){
            (new TpoWrite.Doing).showQuestionDetail(_this.nextGroupId);
        }else if(_this.nextGroupStatus == 2){
            (new TpoWrite.Result).showUserResult(_this.nextGroupId);
        }else if(_this.nextGroupStatus == 0){
            alert("下一章还没有解锁！");
        }
    };

    var toDoRender = function() {
        var param = {
            "tmplName": 'app/tmpl_todo',
            "tmplData": '',
            "afterRender": ''
        }
        renderTemplate(param)
    }

    var renderTemplate = function(param) {
        Render.render({
            wrap: param.wrap || TpoWrite.$wrap,
            isAppend: false || param.isAppend,
            tmpl: {
                tmplName: param.tmplName,
                tmplData: param.tmplData
            },
            afterRender: param.afterRender
        })
    }
    /**
     * 比较用户答案和正确答案（最佳公共子序列）
     * @param TargetList:正确答案数组
     * @param userList:用户答案数组
     * @param MatchLetter:是否比较大小写
     * @returns {Array}
     * @constructor
     */
    var MathWord_TF=function( TargetList,  userList, MatchLetter) {
        var tlen = TargetList.length;
        var ulen = userList.length;

        var Ptable=new Array(tlen); 		//(tlen, ulen);
        var Stable=new Array(tlen); 		//(tlen, ulen);
        var Pathtable=new Array(tlen); 		//(tlen, ulen);
        for(var n= 0;n<tlen;n++){
            Ptable[n]=[];
            Stable[n]=[];
            Pathtable[n]=[];
            for(var nn= 0;nn<ulen;nn++){
                Ptable[n][nn]=0;
                Stable[n][nn]=0;
                Pathtable[n][nn]=0;
            }
        }

        for (var i = 0; i < tlen; i++)
        {
            for (var r = 0; r < ulen; r++)
            {
                if(TargetList[i] == "") continue;
                Ptable[i][r] = GetStringDifference(TargetList[i], userList[r], MatchLetter);
            }
        }
        //start
        for (var i = 0; i < ulen; i++)
        {
            Stable[0][i] = Ptable[0][i];
        }

        for (var x = 1; x < tlen; x++)
        {
            for (var y = 0; y < ulen; y++)
            {
                var max = -1;
                var index = -1;

                // begin
                for (var z = 0; z <= y; z++)
                {
                    if (z == y && Ptable[x - 1][y] == 1)
                    {
                        continue;
                    }

                    if (Stable[x - 1][z]>max)
                    {
                        max = Stable[x - 1][z];
                        index = z;
                    }
                }
                // end

                Stable[x][y] = max + Ptable[x][y];
                Pathtable[x][y] = index;
            }
        }
        var resultmax = -1;
        var resultlastindex = -1;
        for (var y = ulen - 1; y > 0; y--)
        {
            if (Stable[tlen - 1][y] > resultmax)
            {
                resultlastindex = y;
                resultmax = Stable[tlen - 1][y];
            }
        }

        var result = [] ;
        for(var it=0;it<userList.length;it++){
            result[it]={value:userList[it],correct:false};
        }

        var xx = tlen - 1;
        var rightCount=0;
        while (xx >= 0)
        {
            if (Ptable[xx][resultlastindex] == 1)
            {
                result[resultlastindex].correct = true;
                rightCount++;
            }
            resultlastindex = Pathtable[xx][resultlastindex];
            xx--;
        }
        result.rightCount=rightCount;
        return result;
    };
    var GetStringDifference=function( str1,  str2,  mated){
        if (mated == false)
        {
            str1=str1.toLowerCase();
            str2=str2.toLowerCase();
        }
        if ($.trim(str1) == $.trim(str2))
        {
            return 1;
        }
        else
        {
            return 0;
        }
    };
    var zeroFn=function(n){
        n=n<10?"0"+n:n;
        return n;
    }
    function getTime(){ 
    	return new Date($.ajax({url: window.xiaoma.basePath+"/gettime",async: false}).getResponseHeader("Date"));
    }

    var showTpoWrite=function(questionId,planDayId,exerciseId,xmTitle){//showQuestionDetail
       xm_questionId=questionId;
       xm_planDayId=planDayId;
       xm_exerciseId=exerciseId;
       xm_title=xmTitle;
       TpoWrite.Doing.prototype.showQuestionDetail(questionId);
    };
    var gotoHisResult=function(questionId,planDayId,exerciseId,xmTitle){
        xm_questionId=questionId;
        xm_planDayId=planDayId;
        xm_exerciseId=exerciseId;
        xm_title=xmTitle;
        (new TpoWrite.Result).showUserResult(questionId);
    }


    return {
        init: TpoWrite.init,
        showTpoWrite:showTpoWrite,
        gotoHisResult:gotoHisResult

    };
});