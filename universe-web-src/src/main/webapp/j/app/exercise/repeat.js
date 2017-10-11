'use strict';
/**
 * Created by SaE on 2015/3/2.
 * 复述功能
 */
define(['require', 'common/uniqueAjax', 'common/render', 'xml2json', 'app/baseURL', 'common/valiEnter', 'baseCookie', 'lib/flashwavrecorder/recorder', 'lib/flashwavrecorder/swfobject'], function (require, uniqueAjax, Render, xml2json, URL, ValiEnter, BaseCookie, Recorder, Swfobject) {
    //命名空间单体对象
    var Repeat = {
        $wrap: '',
        token: '',
        groups:[],
        currentUnitId: 1,
        TMPL: {
            t1: 'app/exercise/tmpl_repeat_unit',
            t2: 'app/exercise/tmpl_repeat_questions',
            t3: 'app/exercise/tmpl_repeat_record',
            t4: ''
        },
        getToken: function () {
            BaseCookie.get();
            Repeat.token = BaseCookie.getToken();
            if ("" == Repeat.token || null == Repeat.token) {
                Repeat.token = "xiaoma";
            }
        },
        init: function (conf) {
            var _conf = $.extend({
                wrap: ''
            }, conf || {});
            Repeat.$wrap = $(_conf.wrap);
            Repeat.getToken();
            (new Repeat.Unit()).initEvent()
        }
    };

    /*是否安装了flash*/
    Repeat.flashChecker = function () {
        var hasFlash = 0;
        var flashVersion = 0;//flash版本

        try{
            var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
            if (swf) {
                hasFlash = 1;
                var VSwf = swf.GetVariable("$version");
                flashVersion = parseInt(VSwf.split(" ")[1].split(",")[0]);
            }
        }
        catch(e){
            if (navigator.plugins && navigator.plugins.length > 0) {
                var swf = navigator.plugins["Shockwave Flash"];
                if (swf) {
                    hasFlash = 1;
                    var words = swf.description.split(" ");
                    for (var i = 0; i < words.length; ++i) {
                        if (isNaN(parseInt(words[i]))) continue;
                        flashVersion = parseInt(words[i]);
                    }
                }
            }
        }

        return {isInstall: hasFlash, version: flashVersion};
    };
    /*通用Ajax方法*/
    Repeat.sendAjax = function (param) {
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
    };
    /*通用方法*/
    Repeat.isIE = function () {
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
            return true;
        }
        else {
            return false;
        }
    };


    /**列表页部分**/
    /*构造函数*/
    Repeat.Unit = function () {   };

    Repeat.Unit.prototype.initEvent = function () {
        var _this = this;
        $(document).on('trigger_side13', '#side13', function () {
            toDoRender();
            //_this.navigatorToRepeatPage(_this);
        });
        $(document).on('click', '#side13', function () {
            toDoRender();
            _this.highLightNav();
            //Repeat.getToken();
            //_this.showUnitList();
        });

        $(document).on('click', '#selectRepeatUnit', _this.showUnitList);
        $(document).on('click', '.repeat-unit', _this.showUnitList);
        $(document).on('click', '.goQuestionList', _this.showQuestionList);
        $(document).on('click', '#showParentQues', _this.showQuestionList);
        $(document).on('click', '.gotoQuestion', _this.showOneQuestion);
        $(document).on('click','.list-group-item',function(){
            //隐藏全局的录音flash控件
            var recordFlash=$("#recorderApp");
            if(recordFlash.length>0){
                $("#recorderApp").css({"height": "0", "width": "0"});
            }
        });
    };
    /*处理左侧导航条效果*/
    Repeat.Unit.prototype.highLightNav = function () {
        $('.sidebar-ul').find('a.sidebarLight').removeClass('sidebarLight');
        $("#side13").addClass('sidebarLight')
    };

    /*导航到复述功能页*/
    Repeat.Unit.prototype.navigatorToRepeatPage = function (_this) {
        Repeat.getToken();
        _this.highLightNav();
        _this.showUnitList();
    };

    /*呈现单元列表*/
    Repeat.Unit.prototype.showUnitList = function () {
        //隐藏全局的录音flash控件
        $("#recorderApp").css({"height": "0", "width": "0"});
        var param = {
            url: URL.baseURL5 + 'repeat_groups/web',
            headers: {
                Authorization: Repeat.token
            }
        };
        var promise = Repeat.sendAjax(param);
        promise.then(function (data) {
            var renderData = [];
            if (data.repeat_groups) {
                renderData = data.repeat_groups;
                //存储单元信息，暂时没有下一单元功能所以注释
                /*data.repeat_groups.sort(function(a,b){
                    return a.group_sequence_number- b.group_sequence_number;
                });
                $.each(data.repeat_groups,function(index,val){
                    val.index=index;
                    Repeat.groups.push(val);
                });*/
            }
            //单元列表通过率颜色
            $.each(renderData,function(i,o){
                var floatRate=parseFloat(o.rate);
                if(!isNaN(floatRate)){
                    if(floatRate<60){
                        o.eleClass='red';
                    }else if(floatRate==100){
                        o.eleClass='green';
                    }else{
                        o.eleClass='orange';
                    }
                }
            });
            Render.render({
                wrap: Repeat.$wrap,
                tmpl: {
                    tmplName: Repeat.TMPL.t1,
                    tmplData: renderData
                },
                afterRender: function () {
                }
            });
        });

    };


    /*某个单元下的所有试题列表*/
    Repeat.Unit.prototype.showQuestionList = function () {
        var currGroupId = parseInt($(this).attr('group-id')),
            currGroupNumber = parseInt($(this).attr('group_number'));
        var param = {
            url: URL.baseURL5 + 'repeat_questions',
            headers: {
                Authorization: Repeat.token
            },
            data: {group_id: currGroupId}
        };
        var promise = Repeat.sendAjax(param);
        promise.then(function (data) {
            var renderData = [];
            if (data.repeat_questions) {
                data.repeat_questions.sort(function (item1, item2) {
                    return item1.question_sequence_number - item2.question_sequence_number;
                });
                renderData = data;
                renderData.groupNumber = currGroupNumber;
                renderData.groupId = currGroupId;
            }
            Render.render({
                wrap: Repeat.$wrap,
                tmpl: {
                    tmplName: Repeat.TMPL.t2,
                    tmplData: renderData
                },
                afterRender: function () {
                }
            });
        });
    };

    /*显示一道题*/
    Repeat.Unit.prototype.showOneQuestion = function () {
        var $this = $(this),
            currQuestionId = $this.attr('question-id'),
            currGroupId = $this.attr('group-id'),
            currGroupNumber = $this.attr('group-number');
        (new Repeat.Record).showQuestion(currQuestionId, currGroupId, currGroupNumber);
    };

    /**录音部分**/
    /*构造函数*/
    Repeat.Record = function () {
        var _this = this;
        _this.isListenedDemo = false;
        _this.RECORDER_APP_ID = "recorderApp";
        _this.has_microphone_found = true;
        //一个单元下的所有问题序号和问题ID一一对应组成的数组
        _this.CurrQuestionId = 0;
        _this.currGroupId = 0;
        _this.currGroupNumber = 0;
        //是否曾经上传过录音(用于控制第一次使用html标签播
        // 放过去的录音，录音之后则使用录音flash播放)
        _this.isBeforeUpload = false;
        //很棒一般般那个提示只显示一次
        _this.showColorTip=true;
        //是否正在录音
        _this.isRecording=false;

        //是否点击了重新录音
        _this.isagainRecord=false;

        //是否已经录过音
        _this.isHasRecord=false;
    };

    /*显示录音页面*/
    Repeat.Record.prototype.showQuestion = function (currQuestionId, currGroupId, currGroupNumber) {
        var _this = this,
            renderData = [],
            param = {
                url: URL.baseURL5 + 'repeat_questions/' + currQuestionId,
                headers: {
                    Authorization: Repeat.token
                }
            };
        var promise = Repeat.sendAjax(param);
        promise.then(function (data) {
            var arr_number_id = [];
            if (data.question_id) {
                arr_number_id = $.map(data.sequence_number_ids, function (val, key) {
                    return val;
                });
                renderData = data;
                renderData.groupNumber = currGroupNumber;
                renderData.groupId = currGroupId;
                renderData.questionNumber = data.question_sequence_number;
                renderData.questionCount = arr_number_id.length;
                renderData.uploadUrl = URL.baseURL5 + 'repeat_results/web';
                //记录单元和当前题的ID信息
                _this.CurrQuestionId = currQuestionId;
                _this.CurrQuestionNumber = data.question_sequence_number;
                _this.currGroupId = currGroupId;
                _this.currGroupNumber = currGroupNumber;
                //下一题ID
                _this.NextQuestionId = arr_number_id[_this.CurrQuestionNumber];
                //最后一题ID
                _this.MaxQuestionId = arr_number_id[arr_number_id.length - 1];

                //重置标识
                _this.isRecording=false;
                _this.isagainRecord=false;
                _this.isHasRecord=false;
                //曾经录音并上传过
                if (data.answer_audio_url) {
                    _this.isHasRecord=true;
                    _this.isBeforeUpload = true;
                }

            }
            Render.render({
                wrap: Repeat.$wrap,
                tmpl: {
                    tmplName: Repeat.TMPL.t3,
                    tmplData: renderData
                },
                afterRender: function () {
                    _this.afterRenderQuestion(_this, renderData);
                }
            });
        });
    };

    /*呈现录音页面之后的回调函数*/
    Repeat.Record.prototype.afterRenderQuestion = function (_this, renderData) {
        //动态创建录音的object加载flash
        _this.createFlash();
        //绑定录音flash的回调事件
        _this.bindFlashCallbackEvent();
        //$("#recorderApp").css({position:'absolute'})

        /*--以下初始化显示控件状态--*/
        _this.isListenedDemo = false;
        //用户已经做过此题
        if (renderData.answer_content && renderData.answer_content.length > 0) {
            //如果用户之前做过此题则设置标识为true
            _this.isListenedDemo = true;
            _this.initBtnStatus('StopRecord');
            //如果用户登录了，设置用户已经录制的音频路径
            $('.tip-record').hide();
            $('.tip-play').show();
            //很棒，一般般提示
            $('.repeat-colortip').show();
            _this.calculateResult(renderData.en,renderData.answer_content,renderData.is_correct);
        } else {
            _this.initBtnStatus('WaitRecord');
        }

        if (parseInt(_this.CurrQuestionId) == _this.MaxQuestionId) {
            //$('#nextQuestion').attr('disabled', true);
            $('#nextQuestion').hide();
        }
        /*--以上初始化显示控件状态--*/

        /*--以下部分给按钮控件绑定事件--*/
        //显示中英文
        $('.repeat-round').on('click', function () {
            $('.repeat-round').removeClass('bblue');
            $(this).addClass('bblue');
            $('.senten').hide();
            switch ($(this).attr('data-showtype')) {
                case 'btn_En_Ch':
                    $('.senten').show();
                    break;
                case 'btn_Ch':
                    $('.ch-senten').show();
                    break;
                case 'btn_En':
                    $('.en-senten').show();
                    break;
                default:
                    break;
            }
        });

        $('#demoSound').on('click', function () {
            if(!_this.isRecording){
                //播放Demo
                _this.playMySound(renderData.audio_url, 'demo');
            }
        });
        $('#btnRecord').on('click', function () {
            //开始录音
            _this.recordVoice();
        });
        $('#btnStopRecord').on('click', function () {
            //完成录音
            _this.stopRecord();
            $(".click-tip").hide();
            $(".tip-play").text('点击播放').show();
            _this.initBtnStatus('StopRecord');
        });
        $('#btnPlay').on('click', function () {
            //播放录音
            if (_this.isBeforeUpload) {
                //播放上次上传的录音
                _this.playMySound(renderData.answer_audio_url, 'myvoice');
            } else {
                _this.playBack();
            }
            _this.initBtnStatus('Play');
            $('.tip-play').text('播放中...').show();
        });
        $('#submitRecord').on('click', function () {
            //上传
            _this.uploadMyVoice();
        });
        $('#nextQuestion').on('click', function () {
            //下一题
            _this.showNextQuestion();
        });
        $('.navlist').on('click', function () {
            _this.hideRecordFlash();
            //到指定题
            var questionId = $(this).attr('data-question-id');
            _this.showQuestion(questionId, _this.currGroupId, _this.currGroupNumber);
        });
        $('#againRecord').on('click', function () {
            //标识开始重录（重录状态中不允许设置中间大图状态为录音以外的其他状态）
            _this.isagainRecord=true;
            //重录
            _this.reRecord();
        });
        //试题题号列表
        $(document).on('mouseover', '.repeat-num', function () {
            $(".repeat-points").slideDown("fast");
            $(this).addClass('repeat-num-hover');
        });
        $(document).on('mouseout', '.repeat-points', function (e) {
            e = window.event || e; // 兼容IE7
            var obj = $(e.srcElement || e.target);
            var toElement = $(e.toElement);
            if (toElement.is('.repeat-points') || obj.find(toElement).length > 0) {
                return;
            }
            $('.repeat-num').removeClass('repeat-num-hover');
            $(".repeat-points").hide();
        });
        /*暂时不用
         $(document).on('mouseout', 'body', function(e) {
         e = window.event || e; // 兼容IE7
         var obj = $(e.srcElement || e.target);
         if (!$(obj).is(".repeat-num,.repeat-num *,.repeat-points,.repeat-points *,.repeat-div3,.senten")) {
         $(".repeat-points").hide();
         }
         });*/

        /*--给按钮控件绑定事件--*/
    };

    /*隐藏录音控件录音*/
    Repeat.Record.prototype.hideRecordFlash = function () {
        if (FWRecorder.isMicrophoneAccessible()) {
            $("#recorderApp").css({"height": "0", "width": "0"});
        }
    };

    /*录音*/
    Repeat.Record.prototype.recordVoice = function () {
        var _this = this;

        //未登陆,弹窗
        Repeat.getToken();
        if (!Repeat.token || Repeat.token == 'xiaoma') {
            $('#dialogLogin').modal();
            $('#dialogLogin').on('hidden.bs.modal', function (e) {
                Repeat.getToken();
            });
            return;
        }
        $('.click-tip').hide();
        $('.tip-record').text('准备中...').show();
        //用户再次录音后就不能再次播放以前的录音（控制登录用户首次进入时播放按钮播放的内容）
        _this.isBeforeUpload=false;

        //开始录音
        var installFlash = Repeat.flashChecker();
        if (installFlash.isInstall) {
            //先暂停其他播放插件的播放
            window.my_stopped_func=function(){};
            if (Repeat.isIE()) {
                var ieDemoObject = document.getElementById('ieAudio');
                if (ieDemoObject) {
                    ieDemoObject.controls.pause();
                }
            } else {
                var music = document.getElementById("html5Audio");
                if(music){
                    //先暂停demo播放
                    if (!music.paused) {
                        $('#demoSoundImg').attr('src', '../../i/dic-pic.png');
                        music.pause();
                    }
                }
            }
            //开始录音，检测麦克风
            FWRecorder.record('audio_url', _this.currGroupId+'-'+_this.CurrQuestionId+'-'+new Date().getTime() + '.wav');
            if (FWRecorder.isMicrophoneAccessible()) {
                //录音中
                _this.isRecording=true;
                //取消重录状态
                _this.isagainRecord=false;
                //初始化按钮的状态
                $('.tip-record').text('录音中...').show();
                _this.initBtnStatus('Recording');
                _this.hideRecordFlash();
                $("#againRecord").attr('disabled', true);
                $("#submitRecord").attr('disabled', true);
            } else {
                //调整flash窗口位置
                if (_this.has_microphone_found) {
                    //var offset=$('.repeat-record').offset();
                    //$("#recorderApp").offset({top: offset.top, left: offset.left+250});
                    $("#recorderApp").css({"margin-top": "280px", "margin-left": "515px"});
                } else {
                    _this.hideRecordFlash();
                }
            }
        } else {
            //提示安装flash
            $("#tip-installfalsh").show();
        }
    };

    /*完成录音*/
    Repeat.Record.prototype.stopRecord = function stop_record() {
        //设置正在录音标识为false
        this.isRecording=false;
        FWRecorder.stopRecording('audio_url');
        var $questionEn = $('#question_en');
        //设置上传的表单元素的value
        //启用重录按钮
        $('#group_id').val($questionEn.attr('data-group-id'));
        $('#question_id').val($questionEn.attr('data-question-id'));
        $("#againRecord").attr('disabled', false);
        $("#submitRecord").attr('disabled', false);
        //把flash正好盖在上传按钮的位置上（奶奶的，必须鼠标点击flash才能触发上传）
        var offset=$('#submitRecord').offset();
        $("#recorderApp").offset({top: offset.top, left: offset.left})
            .css({"height": "38px", "width": "124px"});
    };

    /*播放录的音*/
    Repeat.Record.prototype.playBack = function play_back() {
        //先暂停其他播放插件的播放
        if (Repeat.isIE()) {
            var ieDemoObject = document.getElementById('ieAudio');
            if (ieDemoObject) {
                ieDemoObject.controls.pause();
            }
        } else {
            var music = document.getElementById("html5Audio");
            if(music){
                //先暂停demo播放
                if (!music.paused) {
                    $('#demoSoundImg').attr('src', '../../i/dic-pic.png');
                    music.pause();
                }
            }
        }
        //录音控件播放录音
        FWRecorder.playBack('audio_url');
    };

    /*停止播放录音*/
    Repeat.Record.prototype.stopPlayBack = function stop_play_back() {
        FWRecorder.stopPlayBack();
    };

    /*重新录音*/
    Repeat.Record.prototype.reRecord = function re_record() {
        //先暂停其他播放插件的播放
        window.my_stopped_func=function(){};
        if (Repeat.isIE()) {
            var ieDemoObject = document.getElementById('ieAudio');
            if (ieDemoObject) {
                ieDemoObject.controls.pause();
            }
        } else {
            var music = document.getElementById("html5Audio");
            if(music){
                //先暂停demo播放
                if (!music.paused) {
                    $('#demoSoundImg').attr('src', '../../i/dic-pic.png');
                    music.pause();
                }
            }
        }
        this.initBtnStatus('Record');
        $('.click-tip').hide();
        $('.tip-record').show().text('点击录音');
        this.hideRecordFlash();
        $('#againRecord').attr('disabled', true);
        $('#submitRecord').attr('disabled', true);
        $('.repeat-colortip').hide();
        $('.ispass').hide();
    };


    /*显示下一道题*/
    Repeat.Record.prototype.showNextQuestion = function () {
        var _this = this;

        this.hideRecordFlash();
        //如果上一题没有停止录音
        if(this.isRecording){
            this.isRecording=false;
            FWRecorder.stopRecording('audio_url');
        }

        _this.showQuestion(_this.NextQuestionId, _this.currGroupId, _this.currGroupNumber);
    };

    /*处理上传后的返回结果*/
    Repeat.Record.prototype.dealUploadResult = function (strResponse) {
        var _this = this,response;
        try{
            response = JSON.parse(strResponse);
        }catch(e){
            response={};
        }
        //很棒，一般般那个 提示只显示一次
        if(_this.showColorTip){
            _this.showColorTip=false;
            $('.repeat-colortip').show();
            setTimeout(function(){
                $('.repeat-colortip').fadeOut('slow');
            },3500);
        }
        //返回处理结果中包含is_correct键说明处理完成，否则说明返回错误格式数据
        if(response.is_correct){
            _this.calculateResult($('#question_en').text(),response.word_scores,response.is_correct);
        }else{
            //弹层提示错误
            _this.tipUploadResult(response.error);
        }
    };

    /*计算用户录音中的各个单词的分数，以及是否通过
    * rightSenten：正确的英语句子
    * word_scores：接口返回的句子中每个单词的分数数组
    * is_correct：是否通过
    * */
    Repeat.Record.prototype.calculateResult = function (rightSenten,word_scores,is_correct) {
        var _this = this,
            arrRight=[],
            word,
            myResult='',
            arrLowcaseScore=[];

        if(!word_scores){
            return;
        }
        //很棒，一般般提示
        //$('.repeat-colortip').show();
        ////很棒，一般般那个 提示只显示一次
        //if(_this.showColorTip){
        //    _this.showColorTip=false;
        //    $('.repeat-colortip').show();
        //    setTimeout(function(){
        //        $('.repeat-colortip').fadeOut('slow');
        //    },3500);
        //}

        /*标注句子中单词的颜色*/
        //把例句打散成数组
        if((/\w+\.\w+/g).test(rightSenten)){
            var arrPeriod= rightSenten.match(/\w+\.\w+/g);
            for(var i= 0,len=arrPeriod.length;i<len;i++){
                rightSenten = rightSenten.replace(arrPeriod[i],arrPeriod[i].replace('.','. '));
            }
        }
        rightSenten=rightSenten.replace(/,/g,', ');
        arrRight = rightSenten.replace(/\s+/g,' ').replace('...','... ').replace(/-/g,'- ').split(' ');

        //将返回结果中的键名都转换成小写
        for(var j= 0;j<word_scores.length;j++){
            for(var k in word_scores[j]){
                var newObj={};
                newObj[k.toLowerCase()]=word_scores[j][k];
                arrLowcaseScore.push(newObj);
            }
        }

        for(var key in arrRight){
            var score= 0,isFind=false;

            //去掉单词（例句中）左右的各种符号
            word=arrRight[key].replace(/[^\w']/g,'').replace(/(^')|('$)/g,'');
            //遍历接口返回的结果
            for(var rkey in arrLowcaseScore){
                score=arrLowcaseScore[rkey][word.toLowerCase()];
                //已经找到的就在找了
                if(!arrLowcaseScore[rkey].isFind && score!=undefined && score!=null){
                    arrLowcaseScore[rkey].isFind=true;
                    isFind=true;
                    if(score<0.2){
                        //未识别
                        myResult += arrRight[key].replace(word,'<span class="red">'+word+'</span>')+' ';
                    }else if(0.2<=score&&score<0.5){
                        //一般
                        myResult += arrRight[key].replace(word,'<span class="general">'+word+'</span>')+' ';
                    }else{
                        //很棒
                        myResult += arrRight[key].replace(word,'<span class="green">'+word+'</span>')+' ';
                    }
                    break;
                }
            }
            //返回结果中没有找到这个单词，算未识别
            if(!isFind){
                //未识别
                myResult += arrRight[key].replace(word,'<span class="red">'+word+'</span>')+' ';
            }
        }
        //设置整句话的文字为绿色
        $('#question_en').addClass('green');
        $('#question_en').html(myResult);
        $('.ispass').hide();
        if(is_correct==1){
            //通过
            $('.okpass').show();
        }else if(is_correct==2){
            //未通过
            $('.nopass').show();
        }
        $('#againRecord').attr({"disabled":false});
    };



    /*按状态显示指定的按钮图片*/
    Repeat.Record.prototype.initBtnStatus = function (status) {
        var _this = this;
        $('.record').hide();
        switch (status) {
            case 'WaitRecord':
                $('#btnWaitRecord').show();
                $('#btnWaitRecord').on('mouseover', function () {
                    $('.mustPlayDemo').fadeIn('fast');
                    setTimeout(function () {
                        $('.mustPlayDemo').fadeOut('fast');
                    }, 1500);
                });
                break;
            case 'Record':
                $('#btnRecord').show();
                break;
            case 'Recording':
                $('#btnStopRecord').show();
                break;
            case 'StopRecord':
                $('#btnPlay').show();
                break;
            case 'Play':
                $('#btnStopPlay').show();
                break;
            case 'Evaluate':
                $('#btnEvaluate').show();
                break;
        }
    };

    /*动态创建录音的object标签*/
    Repeat.Record.prototype.createFlash = function () {
        var _this = this;

        var appWidth = 5;
        var appHeight = 5;
        var flashvars = {'upload_image': '../i/shangchuan.png'};
        var params = {rate: 11};
        var attributes = {
            'id': _this.RECORDER_APP_ID,
            'name': _this.RECORDER_APP_ID,
            style: 'position: absolute;z-index:99999;'
        };
        //flashcontent为html页面中存放这个创建的object的标签ID
        Swfobject.swfobject.embedSWF("../j/lib/flashwavrecorder/recorder.swf", "flashcontent", appWidth, appHeight, "11.0.0", "", flashvars, params, attributes);

    };

    /*录音flash的回调事件*/
    Repeat.Record.prototype.bindFlashCallbackEvent = function () {
        var _this = this;

        var appWidth = 5;
        var appHeight = 5;

        var flag = false;
        //固定名称（不要问为什么叫这个）
        window.fwr_event_handler = function fwr_event_handler() {
            var name, $controls;
            _this.has_microphone_found = true;
            switch (arguments[0]) {
                case "ready":
                    //提交的表单ID
                    FWRecorder.uploadFormId = "#uploadForm";
                    //后台接口接收录音文件时的参数名
                    FWRecorder.uploadFieldName = "audio_url";

                    FWRecorder.connect(_this.RECORDER_APP_ID, 0);
                    FWRecorder.recorderOriginalWidth = appWidth;
                    FWRecorder.recorderOriginalHeight = appHeight;
                    break;
                case "microphone_user_request":
                    FWRecorder.showPermissionWindow();
                    break;
                case "permission_panel_closed":
                    if (FWRecorder.isMicrophoneAccessible()) {
                        $('.tip-record').text('点击录音').show();
                    } else {
                        //提示刷新页面可以使用麦克
                        $('.tip-refresh').show();
                    }
                    FWRecorder.defaultSize();
                    configureMicrophone();
                    break;
                case "microphone_activity":
                    break;
                //开始录音
                case "recording":
                    FWRecorder.hide();
                    FWRecorder.observeLevel();
                    break;
                case "recording_stopped":

                    FWRecorder.show();
                    FWRecorder.stopObservingLevel();
                    //设置正在录音标识为false
                    this.isRecording=false;
                    break;
                case "microphone_level"://录音中会不停的触发此事件
                    break;
                case "playing":
                    break;
                case "playback_started":
                    break;
                case "stopped":
                    //重录状态时不允许设置按钮为播放状态
                    if(_this.isagainRecord){
                        return;
                    }
                    _this.initBtnStatus('StopRecord');
                    $('.tip-play').text('点击播放').show();
                    break;
                case "playing_paused":
                    break;
                //此录音flash被点击后，上传开始
                case "save_pressed":
                    $('#auth_token').val(Repeat.token);
                    FWRecorder.updateForm();
                    break;
                //上传中
                case "saving":
                    if(console){
                        name = arguments[1];
                        console.info('saving started', name);
                    }
                    //显示评估状态
                    //禁用假提交按钮，同时移走flash，使用户在上传的过程中不能再次上传
                    //禁用重录按钮
                    _this.initBtnStatus('Evaluate');
                    _this.hideRecordFlash();
                    $("#submitRecord").attr('disabled', true);
                    $("#againRecord").attr('disabled', true);
                    $('.tip-play').text('评估中...').show();
                    break;
                //上传成功
                case "saved":
                    name = arguments[1];
                    var response = arguments[2];
                    if(console){
                        console.info('saving success', name, response);
                    }
                    //上传成功后恢复可播放状态
                    //重录按钮可用
                    _this.initBtnStatus('StopRecord');
                    $("#againRecord").attr('disabled', false);
                    $('.tip-play').text('点击播放').show();
                    _this.dealUploadResult(response);
                    break;
                case "save_failed":
                    name = arguments[1];
                    var errorMessage = arguments[2];
                    if(console){
                        console.info('saving failed', name, errorMessage);
                    }
                    //重录按钮可用
                    _this.initBtnStatus('StopRecord');
                    $("#againRecord").attr('disabled', false);
                    $('.tip-play').text('点击播放').show();

                    //弹层提示错误
                    _this.tipUploadResult(errorMessage);
                    break;
                case "save_progress":
                    if(console){
                        name = arguments[1];
                        var bytesLoaded = arguments[2];
                        var bytesTotal = arguments[3];
                        console.info('saving progress', name, bytesLoaded, '/', bytesTotal);
                    }
                    break;
                case "no_microphone_found":
                    $(".tip-nomicrophone").show();
                    setTimeout(function () {
                        $(".tip-nomicrophone").hide();
                    }, 1000);
                    _this.has_microphone_found = false;
                    break;
                case "microphone_not_connected":
                    $('.tip-refresh').show();
                    setTimeout(function () {
                        $('.tip-refresh').hide();
                    }, 1000);
                    break;
            }
        };
        //配置录音频率
        function  configureMicrophone() {
            //if (!FWRecorder.isReady) {
            //    return;
            //}
            //配置，码率：11
            FWRecorder.configure(11, 100, 0, 4000);//rate,gain,Silence Level,Silence Timeout
            //FWRecorder.setUseEchoSuppression($('#useEchoSuppression').is(":checked"));
            //FWRecorder.setLoopBack($('#loopBack').is(":checked"));
        };
    };


    //提示上传结果
    Repeat.Record.prototype.tipUploadResult = function (errorMessage) {
        //提示错误
        var $rightPart = $('.right-part1'),
            $alert = $('.alert'),
            pageWidth = $rightPart.outerWidth();
        switch(errorMessage){
            case 'audio too long':
                errorMessage='您录的音频太长了！';
                break;
            case 'audio too short':
                errorMessage='您录的音频太短了！';
                break;
            case 'no data for this question id':
                errorMessage='对应的ID不存在！';
                break;
            case 'not wav format':
                errorMessage='您的音频不是wav格式！';
                break;
            case 'fail':
                errorMessage='此次打分失败！';
                break;
        }
        $('#lblError').text(errorMessage);
        $alert.css({left: ((pageWidth - $alert.outerWidth())/2-2) + 'px'})
              .fadeIn('slow');
        $('.closetip').on('click',function(){$('.alert').fadeOut('slow');});
    };

    /*播放Demo或上次的录音*/
    Repeat.Record.prototype.playMySound = function (url, which) {
        var _this = this;
        _this.setAudioUrl(url, which);
        if (Repeat.isIE()) {
            _this.playSoundByIE(which);
        } else {
            _this.playSoundByOtherBrowser(which);
        }
    };

    /*设置音频mp3的路径,which:(demo/myvoice)*/
    Repeat.Record.prototype.setAudioUrl = function (url, which) {
        var _this = this;
        if (Repeat.isIE()) {
            var IEDiv = document.getElementById("divIEObject");
            var htmlstr = "<object id='ieAudio' width='260' height='64' classid='CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6'>";
            htmlstr += "<param name='AutoStart' value='0'></param>";
            htmlstr += "<param name='url' value='" + url + "'></param>";
            htmlstr += "<param name='enabled' value='true'></param>";
            htmlstr += "<param name='uiMode' value='none'></param>";
            htmlstr += "</object>";
            IEDiv.innerHTML = htmlstr;
        } else {
            $('#html5Audio').attr('src', url);
        }

        //播放结束（针对IE浏览器）
        window.my_stopped_func = function () {
            playVoiceEnd(which);
        };

        //IE以外的其他浏览器
        $('#html5Audio')[0].addEventListener('ended', function () {
            //playVoiceEnd(which);
            window.my_stopped_func();
        });

        function playVoiceEnd(which) {
            //已经听完demo
            if (which == 'demo') {
                $('#demoSoundImg').attr('src', '../../i/dic-pic.png');
                //正在录音的情况下，播放Demo不能设置下面录音按钮状态
                if(_this.isRecording){
                   return;
                }
                //重录状态下，大的图片必须为录音图片
                if(_this.isagainRecord){
                    return;
                }

                if(!_this.isListenedDemo){
                    $('.click-tip').hide();
                    _this.isListenedDemo = true;
                    _this.initBtnStatus('Record');
                    $('.tip-record').text('点击录音').show();
                }/*else{
                    $('.tip-play').show();
                }*/
            } else if (which == 'myvoice') {
                $('.click-tip').hide();
                _this.initBtnStatus('StopRecord');
                $('.tip-play').text('点击播放').show();
            }
        }
    };

    /*IE浏览器播放*/
    Repeat.Record.prototype.playSoundByIE = function (which) {
        var _this = this;
        var ieDemoObject = $('#ieAudio')[0];
        if (ieDemoObject.playState == 1 || ieDemoObject.playState == 2 || ieDemoObject.playState == 10) {
            //先暂停录音flash控件的播放
            if(FWRecorder&&FWRecorder.stopPlayBack){
                FWRecorder.stopPlayBack();
            }
            ieDemoObject.controls.play();
            if (which == 'demo') {
                //i1.gif为正在录音动态效果图片
                $('#demoSoundImg').attr('src', '../../i/i1.gif');
                //重录状态下，大的图片必须为录音图片
                if(_this.isagainRecord){
                    return;
                }
                if(_this.isHasRecord && !_this.isRecording){
                    //先停止我的录音图片状态
                    $('.tip-play').text('点击播放');
                    _this.initBtnStatus('StopRecord');
                }

            } else if (which == 'myvoice') {
                $('#demoSoundImg').attr('src', '../../i/dic-pic.png');
                _this.initBtnStatus('Play');
            }
        } else {
            ieDemoObject.controls.pause();
            if (which == 'demo') {
                $('#demoSoundImg').attr('src', '../../i/dic-pic.png');
            } else if (which == 'myvoice') {
                _this.initBtnStatus('Play');
            }
        }
    };
    /*非IE的其他浏览器播放*/
    Repeat.Record.prototype.playSoundByOtherBrowser = function (which) {
        var _this = this;
        var music = document.getElementById("html5Audio");
        if (music.paused) {
            //先暂停录音flash控件的播放
            if(FWRecorder&&FWRecorder.stopPlayBack){
                FWRecorder.stopPlayBack();
            }
            music.play();
            if (which == 'demo') {
                $('#demoSoundImg').attr('src', '../../i/i1.gif');
                //重录状态下，大的图片必须为录音图片
                if(_this.isagainRecord){
                    return;
                }
                //正在录音的情况下，播放Demo不能设置下面录音按钮状态
                if(_this.isHasRecord && !_this.isRecording){
                    //先暂停其他的音频播放，然后再播放
                    $('.tip-play').text('点击播放');
                    _this.initBtnStatus('StopRecord');
                }

            } else if (which == 'myvoice') {
                $('#demoSoundImg').attr('src', '../../i/dic-pic.png');
                _this.initBtnStatus('Play');
            }
        } else {
            music.pause();
            if (which == 'demo') {
                $('#demoSoundImg').attr('src', '../../i/dic-pic.png');
            } else if (which == 'myvoice') {
                _this.initBtnStatus('Play');
            }
        }
    };

    //必须先注册flash的事件回调函数
    //(new Repeat.Record).bindFlashCallbackEvent();

    var toDoRender = function() {
        var param = {
            "tmplName": 'app/tmpl_todo',
            "tmplData": '',
            "afterRender": ''
        };
        renderTemplate(param)
    };

    var renderTemplate = function(param) {
        Render.render({
            wrap: param.wrap || Repeat.$wrap,
            isAppend: false || param.isAppend,
            tmpl: {
                tmplName: param.tmplName,
                tmplData: param.tmplData
            },
            afterRender: param.afterRender
        })
    };

    return {
        init: Repeat.init
    };
});