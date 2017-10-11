/**
 * Created by SaE on 2015/6/16.
 * 进阶练习-综合写作练习
 */
define(['common/render', 'xml2json', 'app/baseURL', 'baseCookie', 'lib/audiojs/audio.min'], function (Render, xml2json, URL, BaseCookie) {

    var ZongHeWrite = (function () {
        //私有变量
        var _tokenTmp = "xiaoma";

        var obj = {
            $wrap: '',
            token: '',
            tokenTmp: function () {
                return _tokenTmp;
            },
            currentQuestions: [],
            TMPL: {
                yuce_list: 'app/jinjie/tmpl_zonghe_write_list', //列表
                doing: 'app/jinjie/tmpl_zonghe_write_doing',//做题页
                result: 'app/jinjie/tmpl_zonghe_write_result',//用户做题记录列表页
                right_list:'app/jinjie/tmpl_zonghe_write_doing_right_list'
            }
        };
        obj.getToken = function () {
            BaseCookie.get();
            obj.token = BaseCookie.getToken();
            if (null == obj.token || "" == obj.token) {
                obj.token = obj.tokenTmp();
            }
        };
        return obj;
    }());

    /*通用Ajax方法*/
    ZongHeWrite.sendAjax = function (param) {
        var promise = $.Deferred();
        if (!param) {
            return null;
        }
        !param.type && (param.type = 'get');
        param.type.toLowerCase() == 'post' && !param.contentType && (param.contentType = 'application/x-www-form-urlencoded');
        !param.contentType && (param.contentType = 'application/json');
        !param.data && (param.data = '');
        !param.headers && (param.headers = '');
        param.async==undefined && (param.async = true);
        $.ajax({
            url: param.url,
            type: param.type,
            async: param.async,
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


    ZongHeWrite.init = function (conf) {
        var _this = ZongHeWrite;
        var _conf = $.extend({
            wrap: ''
        }, conf || {});
        _this.$wrap = $(_conf.wrap);
        _this.getToken();

        _this.initEvent();
    };

    ZongHeWrite.initEvent = function () {
        var $document = $(document);
        //不上线时用
        //$document.on('click', '#side77', function(){
        //    toDoRender();
        //});
        $(document).on('trigger_side77', '#side77', ZongHeWrite.loadList)
        $document.on('click', '#side77', ZongHeWrite.loadList);
        $document.on('click', '.zonghe', ZongHeWrite.Doing.showAnswerBefore);//显示做题页面
        $document.on('click', '.expand1', ZongHeWrite.Doing.expandOrCollapse);//折叠/展开
        $document.on('click', '#DoAgain', ZongHeWrite.Doing.doAgain);//重做
        $document.on('click','#btnSubmit',ZongHeWrite.Doing.Submit);//提交
        $document.on('keyup', '#jjWriteAnswer1', ZongHeWrite.Doing.checkLengthNew);
        $document.on('click','.navzhlist',ZongHeWrite.Doing.navigatorTolist);//导航条
        $document.on('click', '.navzhwrite', function () {
            $('#leftDiv').hide();
            $('#side77').click();
            $('#side').show();
        });
        $document.on('click','.playthevideo1',function(){
            ZongHeWrite.Doing.playDemoVideo($(this).attr('data-source'));
        });//播放视频
        $document.off('click','#btnNextQuestion1').on('click','#btnNextQuestion1',function(){
            var params = {},
                next_status = $(this).attr("next_status");
            params.questionId = $(this).attr("qid");
            //0:无做题记录，1：有做题记录，2：最后一题
            if(next_status==0){
                params.type=0;
            }else if(next_status==1){
                params.type=1;
            }else{
                alert('已经是最后一题了！');
                return;
            }
            ZongHeWrite.Doing.showAnswerPage(params);
        });

    };
    /**
     列表
     */
    ZongHeWrite.loadList = function () {
        $('.sidebar-ul').find('a.sidebarLight').removeClass('sidebarLight');
        $("#side77").addClass('sidebarLight');

        ZongHeWrite.getToken();
        //question_type：1:口语，2：写作
        var param = {
            url: URL.baseURL5 + "tpo_writing_correction_questions/exercises",
            headers: {
                Authorization: ZongHeWrite.token
            },
            data: {
                from:1
            }
        };
        var promise = ZongHeWrite.sendAjax(param);
        promise.then(function (json) {
            var renderData = [];
            renderData.title='综合写作';
            json.tpo_writing_questions.sort(function(v1,v2){
                return v1.question_sequence_number-v2.question_sequence_number;
            });
            $.each(json.tpo_writing_questions, function (key, val) {
                var tmp = {};
                tmp.question_id = val.question_id;
                tmp.question_content = val.content.length>190?val.content.substring(0,190)+'...':val.content;
                tmp.right_content = val.content.length>43?val.content.substring(0,43)+'...':val.content;
                tmp.question_sequence_number = val.question_sequence_number;
                tmp.type=val.type;
                renderData.push(tmp);
            });
            ZongHeWrite.currentQuestions = renderData; //保存当前下载题目
            ZongHeWrite.currentTitle=renderData.title;

            Render.render({
                wrap: ZongHeWrite.$wrap,
                tmpl: {
                    tmplName: ZongHeWrite.TMPL.yuce_list,
                    tmplData: renderData
                }
            });
        });

    };
    /**
     * 做题部分
     */
    ZongHeWrite.Doing = ZongHeWrite.Doing || {preWord:null};

    ZongHeWrite.Doing.showAnswerBefore = function () {
        var params = {};
        params.questionId = $(this).attr("qid");
        params.type = $(this).attr("type");
        ZongHeWrite.Doing.showAnswerPage(params);
    };

    /**
     * 显示用户答题页面
     **/
    ZongHeWrite.Doing.showAnswerPage = function (params) {
        //0：未做过，1：待批改，2：已批改，3：已保存
        var questionId = params.questionId;
        var type = params.type;

        var param = {
            url: URL.baseURL5 + 'tpo_writing_correction_answers/exercise',
            headers: {
                Authorization: ZongHeWrite.token
            },
            data: {
                'from':1,
                'question_id': questionId
            }
        };
        var promise = ZongHeWrite.sendAjax(param);
        promise.then(function (json) {

            if (json && json.error) {
                alert(json.error);
            } else {
                var renderData = {};

                renderData.cText = "综合写作";
                renderData.question_id = questionId;
                renderData.question_sequence_number = json.question_sequence_number;
                renderData.question_content = json.content;
                renderData.answers = json.question_answers;
                renderData.audio_url=json.audio_url;
                renderData.analysis=json.analysis;
                ////答案范例
                //renderData.sample_content = (json.sample_messages && json.sample_messages.sample_content) ?
                //    [json.sample_messages.sample_content.replace(/\n/g, '<br/>')] : [];
                //renderData.question_analysis=json.question_analysis?[json.question_analysis]:[];
                //右侧列表
                renderData.questions = ZongHeWrite.currentQuestions;
                renderData.rightPartTitle=ZongHeWrite.currentTitle;
                $.each(renderData.questions, function (i, n) {
                    n.question_content = (n.question_content && n.question_content.length > 43) ? n.question_content.substring(0, 43) : n.question_content;
                });

                $("#side").css("display", "none"); //隐藏左边导航
                if (type == 0) {
                    //做题页
                    Render.render({
                        wrap: ZongHeWrite.$wrap,
                        tmpl: {
                            tmplName: ZongHeWrite.TMPL.doing,
                            tmplData: renderData
                        },
                        afterRender:function(){
                            //案例分析显示隐藏
                            var $text=$('#exampleText'),
                                $video=$('#exampleVideo'),
                                analyText=$.trim($text.html()),
                                analyVideo=$.trim($video.html());
                            if(!analyText && !analyVideo){
                                $('.analysis').hide();
                            }else if(!analyText){
                                $('.exampleText').hide();
                                $text.hide();
                                $video.show();
                            }else if(!analyVideo){
                                $('.exampleVideo').hide();
                                $text.show();
                                $video.hide();
                            }
                            initAudioControl('myMusic');
                        }
                    });
                } else {
                    //结果页
                    renderData.next_question_id=json.next_question_id;
                    renderData.next_sequence_number=json.next_sequence_number;
                    renderData.next_status=json.next_status;
                    Render.render({
                        wrap: ZongHeWrite.$wrap,
                        tmpl: {
                            tmplName: ZongHeWrite.TMPL.result,
                            tmplData: renderData
                        },
                        afterRender:function(){
                            initAudioControl('myMusic1');
                        }
                    });
                }
            }
            //初始化加载音频播放控件
            function initAudioControl(elemId){
                //初始化音频播放器控件
                audiojs.events.ready(function () {
                    var objAudit1 = document.getElementById(elemId);
                    var auditControl= audiojs.create(objAudit1, {
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
                    $('.setsound').on('click', function (e) {
                        var i = (e.clientX - leftPos(this)) / this.offsetWidth;
                        $('.play-voice').width((i * 100) + '%');
                        auditControl.setVolume(i);
                    });
                    /*
                     没发现或者说没理解是什么作用
                     不过 看到 audiojs 的进度以及音量调节中是有获取这个值的
                     */
                    function leftPos(elem) {
                        var curleft = 0;
                        if (elem.offsetParent)
                            do {
                                curleft += elem.offsetLeft;
                            } while (elem = elem.offsetParent);
                        return curleft;
                    }

                });
            }
        });
    };

    /*保存*/
    ZongHeWrite.Doing.Submit = function () {
        var strAnswer = $('#jjWriteAnswer1').val();
        var questionId = $('#jjResultContent').attr('qid');

        if (!ZongHeWrite.Doing.validWordsCount(strAnswer,150,"than")) {
            $('#tipModel').modal({
                backdrop: 'static'
            });
            return;
        }
        if(!ZongHeWrite.Doing.validWordsCount(strAnswer,500,"less")){
            $('#tipModel').modal({
                backdrop: 'static'
            });
            return;
        }
        if (!BaseCookie.getToken()) {
            $('#dialogLogin').modal({
                backdrop: 'static'
            });
            $('#dialogLogin').on('hidden.bs.modal', function (e) {
                ZongHeWrite.getToken();
                if (ZongHeWrite.token && ZongHeWrite.token != ZongHeWrite.tokenTmp()) {
                    //登录后刷新右侧习题列表
                    ZongHeWrite.Doing.loadPartRightQuestions();
                }
            });
            return;
        }

        $('#btnSubmit').attr('disabled',true);
        var pdata = {
            content: strAnswer,
            question_id: questionId
        };

        var param = {
            url: URL.baseURL5 + "tpo_writing_correction_answers/save_exercise",
            type: "POST",
            headers: {
                Authorization: ZongHeWrite.token,
                "Content-Type": "application/json"
            },
            data: JSON.stringify(pdata)
        };
        var promise = ZongHeWrite.sendAjax(param);
        promise.then(function (json) {
            if (json && json.error == 'no data for this question id') {
                alert("没有对应题ID!");
                return;
            }else if(json && json.error){
                alert(json.error);
                return;
            } else {
                var params = {};
                params.questionId = questionId;
                params.type = 1; //0:未做, 1 已做
                //设置当前题目为已做
                $.each(ZongHeWrite.currentQuestions,function(i,item){
                    if(item.question_id.toString()==questionId){
                        item.type=1;
                    }
                });
                ZongHeWrite.Doing.showAnswerPage(params);
            }
        });
    };
    /*右部分列表条*/
    ZongHeWrite.Doing.loadPartRightQuestions = function () {

        //from：1:web
        var param = {
            url: URL.baseURL5 + "tpo_writing_correction_questions/exercises",
            headers: {
                Authorization: ZongHeWrite.token
            },
            data: {from: 1}
        };
        var promise = ZongHeWrite.sendAjax(param);
        promise.then(function (json) {

            var questionsArray = new Array();
            var renderData = {};
            $.each(json.tpo_writing_questions, function (key, val) {
                var tmp = {};
                tmp.question_id = val.question_id;
                tmp.question_content = val.content.length>190?val.content.substring(0,190)+'...':val.content;
                tmp.right_content = val.content.length>43?val.content.substring(0,43)+'...':val.content;
                tmp.question_sequence_number = val.question_sequence_number;
                tmp.type=val.type;
                questionsArray.push(tmp);
            });
            renderData.questions = questionsArray; //保存当前下载题目
            ZongHeWrite.currentQuestions = questionsArray; //保存当前下载题目
            $.each(renderData.questions, function (i, n) {
                n.content = (n.content && n.content.length > 43) ? n.content.substring(0, 43) : n.content;
            });
            Render.render({
                wrap: $('#partRightList'),
                tmpl: {
                    tmplName: ZongHeWrite.TMPL.right_list,
                    tmplData: renderData
                }
            });
        });

    };

    /**
     * 作文单词长度计算和限制最长字符长度
     */
    ZongHeWrite.Doing.checkLengthNew = function (e) {
        var content = $(e.target).val();
        if(content){
            var newcontent=content.replace(/[\n\,\.\?\:\!\(\)\;\u4e00-\u9fa5]/g, " ");
            var contentArray=newcontent.split(" ");
            var newContentArray=[];
            for(var i in contentArray){
                if(contentArray[i]!=""){
                    newContentArray.push(contentArray[i]);
                }
            }
            $("#wordContent").html(newContentArray.length);
            $(e.target).val(content.replace(/[\u4e00-\u9fa5]/g, "")); //过滤中文
            if(newContentArray.length>500){
                $(this).val(ZongHeWrite.Doing.preWord);
            }else if(newContentArray.length>480){
                ZongHeWrite.Doing.preWord=$(this).val();
            }
        }

    };

    /**
     * 验证作文单词输入长度
     * @param e
     */
    ZongHeWrite.Doing.validWordsCount = function (content,length,type){
        if(content){
            var newcontent=content.replace(/[\n\,\.\?\:\!\(\)\;\u4e00-\u9fa5]/g, " ");
            var contentArray=newcontent.split(" ");
            var newContentArray=[];
            for(var i in contentArray){
                if(contentArray[i]!=""){
                    newContentArray.push(contentArray[i]);
                }
            }
            if(type=="less" && newContentArray.length<=length){
                return true;
            }else if(type=="than" && newContentArray.length>=length){
                return true;
            }
        }
        return false;
    };

    /*重做*/
    ZongHeWrite.Doing.doAgain = function () {
        var $jjContent = $('#jjResultContent');
        var params = {};
        params.questionId = $jjContent.attr("qid");
        params.type = 0;
        ZongHeWrite.Doing.showAnswerPage(params);
    };

    /*展开或收起结果*/
    ZongHeWrite.Doing.expandOrCollapse = function () {
        var $this = $(this), expandId = $this.attr('expand_id');

        $this.hide().siblings().show();
        if ($this.text() == '展开') {
            $('span[expand_id="' + expandId + '"]').css({"display": "inline"});
        } else {
            $('span[expand_id="' + expandId + '"]').css({"display": "block"});
        }
    };

    /*导航条（机经预测或历年真题）*/
    ZongHeWrite.Doing.navigatorTolist = function () {
        $('#leftDiv').hide();
        $('#side77').click();
        $('#side').show();

    };

    /*视频播放*/
    ZongHeWrite.Doing.playDemoVideo = function(source) {
        $('#playDemoVideo').modal({
            backdrop: 'static'
        });

        var content = '<script src="http://p.bokecc.com/player?vid=' + source
            + '&siteid=B86E9AC935D39444&autoStart=true&width=720&height=420&playerid=3B89CC3CB774B9A8&playertype=1" type="text/javascript"></script>';
        $("#divVideo").html(content)
    };


    //显示正在开发页面
    var toDoRender = function () {
        var param = {
            "tmplName": 'app/tmpl_todo',
            "tmplData": '',
            "afterRender": ''
        };

        var renderTemplate = function (param) {
            Render.render({
                wrap: param.wrap || ZongHeWrite.$wrap,
                isAppend: false || param.isAppend,
                tmpl: {
                    tmplName: param.tmplName,
                    tmplData: param.tmplData
                },
                afterRender: param.afterRender
            })
        };
        renderTemplate(param);
    };


    return {
        init: ZongHeWrite.init
    };
});