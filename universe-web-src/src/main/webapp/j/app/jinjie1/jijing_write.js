/**
 * Created by SaE on 2015/4/8.
 * 进阶练习-机经写作
 */
define(['common/render', 'xml2json', 'app/baseURL', 'baseCookie'], function (Render, xml2json, URL, BaseCookie) {

    var JJWrite = (function () {
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
                yuce_list: 'app/jinjie/tmpl_jjwrite_yuce_list', //机经写作-机经预测列表
                zhenti_list: 'app/jinjie/tmpl_jjwrite_zhenti_list', //机经写作-历年真题列表
                yuce_child_list:'app/jinjie/tmpl_jjwrite_yuce_child_list',//选项卡下面列表
                zhenti_child_list: 'app/jinjie/tmpl_jjwrite_zhenti_child_list',
                doing: 'app/jinjie/tmpl_jjwrite_doing',//机经写作-做题页
                result: 'app/jinjie/tmpl_jjwrite_result'//机经写作-用户做题记录列表页
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
    JJWrite.sendAjax = function (param) {
        var promise = $.Deferred();
        if (!param) {
            return null;
        }
        !param.type && (param.type = 'get');
        !param.contentType && (param.contentType = 'application/json');
        !param.data && (param.data = '');
        !param.headers && (param.headers = '');

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


    JJWrite.init = function (conf) {
        var _this = JJWrite;
        var _conf = $.extend({
            wrap: ''
        }, conf || {});
        _this.$wrap = $(_conf.wrap);
        _this.getToken();

        _this.initEvent();
    };

    JJWrite.initEvent = function () {
        var $document = $(document);
        //不上线时用
        //$document.on('click', '#side66', function(){
        //    toDoRender();
        //});
        $(document).on('trigger_side66', '#side66', JJWrite.menuToggle)
        $document.on('click', '#side66', JJWrite.menuToggle);
        $document.on('click', '#side661', JJWrite.loadYuCeList);
        $document.on('click', '#side662', JJWrite.loadZhenTiList);

        $document.on('click', '.yuceTab', JJWrite.loadOneYearYuceList);//切换年份选项卡
        $document.on('click', '.jjWriteTab', JJWrite.loadOneYearZhenTiList);//切换年份选项卡
        $document.on('click', '.jjwrite', JJWrite.Doing.showAnswerBefore);//显示做题页面
        $document.on('click', '.expand', JJWrite.Doing.expandOrCollapse);//折叠/展开
        $document.on('click', '#jjWriteDoAgain', JJWrite.Doing.doAgain);//重做
        $document.on('click','#jjWriteSubmit',JJWrite.Doing.Submit);//提交
        $document.on('keyup', '#jjWriteAnswer', JJWrite.Doing.checkLengthNew);
        $document.on('click','.navjjlist',JJWrite.Doing.navigatorTolist);//导航条
        $document.on('click', '.navjjwrite', function () {
            $('#leftDiv').hide();
            $('#side661').click();
            $('#side').show();
        });
        $document.on('click','.playthevideo',function(){
            JJWrite.Doing.playDemoVideo($(this).attr('data-source'));
        });//播放视频
        $document.off('click','#btnNextQuestion').on('click','#btnNextQuestion',function(){
            var params = {},
                next_status = $(this).attr("next_status");
            params.questionId = $(this).attr("qid");
            params.come = $(this).attr('come');
            //0:无做题记录，1：有做题记录，2：最后一题
            if(next_status==0){
                params.type=0;
            }else if(next_status==1){
                params.type=1;
            }else{
                alert('已经是最后一题了！');
                return;
            }
            JJWrite.Doing.showAnswerPage(params);
        });

    };

    /**
     * 机经口语子菜单展示
     */
    JJWrite.menuToggle = function () {
        $('.sidebar-ul').find('a.sidebarLight').removeClass('sidebarLight');
        $("#side661").addClass('sidebarLight');
        $("#jj_write_menu_div").toggle();
        if ($('#jj_write_menu_div').css('display') == "none") {
            $("#imgJJWrite").attr("src", "../../i/side-ang1.png");
        } else {
            $("#imgJJWrite").attr("src", "../../i/side-ang.png");
        }
        $("#side661").click(); //默认定位机经预测
    };

    /**
     机经预测列表
     */
    JJWrite.loadYuCeList = function () {
        $('.sidebar-ul').find('a.sidebarLight').removeClass('sidebarLight');
        $("#side661").addClass('sidebarLight');

        JJWrite.getToken();
        //question_type：1:口语，2：写作
        var param = {
            url: URL.baseURL5 + "jijing_questions/web_yuce",
            headers: {
                Authorization: JJWrite.token
            },
            data: {
                question_type: 2
            }
        };
        var promise = JJWrite.sendAjax(param);
        promise.then(function (json) {
            var renderData = {};
            renderData.title=json.group_title;
            //json.group_messages.unshift({group_id:0,group_title:json.group_title});
            renderData.groups = json.group_messages;
            renderData.questions = json.jijing_questions;
            renderData.come = 'wjj';//机经预测
            //json.jijing_questions.sort(function(v1,v2){
            //    return v1.question_sequence_number-v2.question_sequence_number;
            //});
            JJWrite.currentQuestions = json.jijing_questions; //保存当前下载题目
            //JJWrite.currYearGroupId = json.jijing_groups[0].group_id;
            JJWrite.currentTitle=json.group_title;

            Render.render({
                wrap: JJWrite.$wrap,
                tmpl: {
                    tmplName: JJWrite.TMPL.yuce_list,
                    tmplData: renderData
                }
            });
        });

    };
    /**
     机经预测（各年份选项卡切换）
     */
    JJWrite.loadOneYearYuceList = function () {
        var groupId = $(this).attr('gid'),
            groupTitle = $(this).attr('gtitle');
        JJWrite.getToken();
        //设置焦点选项卡
        $('.tabWrite li').removeClass('current');
        $(this).parent('li').addClass('current');

        //获取某一年下所有的试题
        var paramZhenti = {
            url: URL.baseURL5 + "jijing_questions/web_yuce",
            headers: {
                Authorization: JJWrite.token
            },
            data: {
                group_id: groupId,
                question_type: 2
            }
        };
        promise = JJWrite.sendAjax(paramZhenti);
        promise.then(function (json) {
            var renderData = {};
            renderData.questions = json.jijing_questions;
            //机经预测
            renderData.come = 'wjj';
            JJWrite.currentQuestions = json.jijing_questions; //保存当前下载题目
            JJWrite.currentTitle=groupTitle;
            Render.render({
                wrap: $('#jjWriteYuceContent'),
                tmpl: {
                    tmplName: JJWrite.TMPL.yuce_child_list,
                    tmplData: renderData
                }
            });
        }, function (error) {
        });
    };

    /**
     历年真题列表
     */
    JJWrite.loadZhenTiList = function () {
        $('.sidebar-ul').find('a.sidebarLight').removeClass('sidebarLight');
        $("#side662").addClass('sidebarLight');

        JJWrite.getToken();
        //获取年份列表
        //1:口语，2：写作
        var param = {
            url: URL.baseURL5 + "jijing_questions/web_zhenti",
            headers: {
                Authorization: JJWrite.token
            },
            data: {
                question_type: 2
            }
        };
        var jijing_groups, renderData = {};
        var promise = JJWrite.sendAjax(param);
        promise.then(function (json) {
            jijing_groups = json.group_messages;
            if (json.group_messages && json.group_messages.length > 0) {
                renderData.groups = jijing_groups;
                //历年真题
                renderData.come = "wsl";
                //某一年下所有的试题
                renderData.questions = json.jijing_questions;
                JJWrite.currentQuestions = json.jijing_questions;
                JJWrite.currYearGroupId = jijing_groups[0].group_id;
                JJWrite.currentTitle=jijing_groups[0].group_title;

                Render.render({
                    wrap: JJWrite.$wrap,
                    tmpl: {
                        tmplName: JJWrite.TMPL.zhenti_list,
                        tmplData: renderData
                    }
                });

            }
        }, function (error) {
        });
    };

    /**
     历年真题（各年份选项卡切换）
     */
    JJWrite.loadOneYearZhenTiList = function () {
        var groupId = $(this).attr('gid'),
            groupTitle = $(this).attr('gtitle');
        JJWrite.getToken();
        //设置焦点选项卡
        $('.tabWrite li').removeClass('current');
        $(this).parent('li').addClass('current');

        //获取某一年下所有的试题
        var paramZhenti = {
            url: URL.baseURL5 + "jijing_questions/web_zhenti",
            headers: {
                Authorization: JJWrite.token
            },
            data: {
                group_id: groupId,
                question_type: 2
            }
        };
        promise = JJWrite.sendAjax(paramZhenti);
        promise.then(function (json) {
            var renderData = {};
            renderData.questions = json.jijing_questions;
            //历年真题
            renderData.come = 'wsl';
            JJWrite.currentQuestions = json.jijing_questions; //保存当前下载题目
            JJWrite.currentTitle=groupTitle;
            Render.render({
                wrap: $('#jjWriteZhentiContent'),
                tmpl: {
                    tmplName: JJWrite.TMPL.zhenti_child_list,
                    tmplData: renderData
                }
            });
        }, function (error) {
        });
    };

    /**
     * 做题部分
     */
    JJWrite.Doing = JJWrite.Doing || {preWord:null};

    JJWrite.Doing.showAnswerBefore = function () {
        var params = {};
        params.questionId = $(this).attr("qid");
        params.type = $(this).attr("type");
        params.come = $(this).attr('come');
        JJWrite.Doing.showAnswerPage(params);
    };

    /**
     * 显示用户答题页面
     **/
    JJWrite.Doing.showAnswerPage = function (params) {

        var questionId = params.questionId;
        var type = params.type;
        var come = params.come;

        var from = "exercise";
        var cText;
        if (come == "wjj") {
            cText = "机经预测";
        } else {
            cText = "历年真题";
        }

        var param = {
            url: URL.baseURL5 + 'jijing_questions/web_question_message',
            headers: {
                Authorization: JJWrite.token
            },
            data: {
                'question_type':2,
                'question_id': questionId
            }
        };
        var promise = JJWrite.sendAjax(param);
        promise.then(function (json) {

            if (json && json.error) {
                alert(json.error);
            } else {
                var renderData = {};

                renderData.come = come;
                renderData.cText = cText;
                //renderData.from = from;
                renderData.question_id = questionId;
                renderData.question_sequence_number = json.question_sequence_number;
                renderData.question_content = json.question_content;
                renderData.answers = json.answers;
                //答案范例
                renderData.sample_content=(json.sample_messages&&json.sample_messages.sample_content)?[json.sample_messages.sample_content.replace(/\n/g,'<br/>')]:[];
                renderData.question_analysis=json.question_analysis?[json.question_analysis]:[];
                //右侧列表
                renderData.questions = JJWrite.currentQuestions;
                renderData.rightPartTitle=JJWrite.currentTitle;
                $.each(renderData.questions, function (i, n) {
                    n.question_content = (n.question_content && n.question_content.length > 43) ? n.question_content.substring(0, 43) : n.question_content;
                });

                $("#side").css("display", "none"); //隐藏左边导航
                if (type == 0) {
                    //做题页
                    Render.render({
                        wrap: JJWrite.$wrap,
                        tmpl: {
                            tmplName: JJWrite.TMPL.doing,
                            tmplData: renderData
                        },
                        afterRender:function(){
                            if(renderData.sample_content.length==0&&renderData.question_analysis.length==0){
                                $('div.h202').hide();
                            }
                        }
                    });
                } else {
                    renderData.next_question_id=json.next_question_id;
                    renderData.next_sequence_number=json.next_sequence_number;
                    renderData.next_status=json.next_status;

                    //结果页
                    Render.render({
                        wrap: JJWrite.$wrap,
                        tmpl: {
                            tmplName: JJWrite.TMPL.result,
                            tmplData: renderData
                        },
                        afterRender:function(){
                            if(renderData.sample_content.length==0&&renderData.question_analysis.length==0){
                                $('div.h202').hide();
                            }
                        }
                    });
                }

            }
        });
    };

    /*保存*/
    JJWrite.Doing.Submit = function () {
        var strAnswer = $('#jjWriteAnswer').val();
        var questionId = $('#jjResultContent').attr('qid');
        //var from = $('#jjResultContent').attr('from');

        if (!JJWrite.Doing.validWordsCount(strAnswer,200,"than")) {
            $('#tipModel').modal({
                backdrop: 'static'
            });
            return;
        }
        if(!JJWrite.Doing.validWordsCount(strAnswer,700,"less")){
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
                JJWrite.getToken();
                if (JJWrite.token && JJWrite.token != JJWrite.tokenTmp()) {
                    //登录后刷新右侧习题列表
                    //JJWrite.Doing.loadPartRightQuestions();
                }
            });
            return;
        }

        $('#jjWriteSubmit').attr('disabled',true);
        var pdata = {
            content: strAnswer,
            jijing_question_id: questionId
        };

        var param = {
            url: URL.baseURL5 + "articles",
            type: "POST",
            headers: {
                Authorization: JJWrite.token,
                "Content-Type": "application/json"
            },
            data: JSON.stringify(pdata)
        };
        var promise = JJWrite.sendAjax(param);
        promise.then(function (json) {
            if (json && json.error == 'no data for this question id') {
                alert("没有对应题ID!");
                return;
            } else {
                var params = {};
                params.come = $('#jjResultContent').attr('come');
                params.questionId = questionId;
                params.type = 1; //只要不是0
                //设置当前题目为已做
                $.each(JJWrite.currentQuestions,function(i,item){
                    if(item.question_id.toString()==questionId){
                        item.has_answer=true;
                    }
                });
                JJWrite.Doing.showAnswerPage(params);
            }
        });
    };

    /**
     * 作文单词长度计算和限制最长字符长度
     */
    JJWrite.Doing.checkLengthNew = function (e) {
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
            if(newContentArray.length>700){
                $(this).val(JJWrite.Doing.preWord);
            }else if(newContentArray.length>680){
                JJWrite.Doing.preWord=$(this).val();
            }
        }
    };

    /**
     * 验证作文单词输入长度
     * @param e
     */
    JJWrite.Doing.validWordsCount = function (content,length,type){
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
    }

    /*重做*/
    JJWrite.Doing.doAgain = function () {
        var $jjContent = $('#jjResultContent');
        var params = {};
        params.questionId = $jjContent.attr("qid");
        params.type = 0;
        params.come = $jjContent.attr('come');
        JJWrite.Doing.showAnswerPage(params);
    };

    /*展开或收起结果*/
    JJWrite.Doing.expandOrCollapse = function () {
        var $this = $(this), expandId = $this.attr('expand_id');

        $this.hide().siblings().show();
        if ($this.text() == '展开') {
            $('span[expand_id="' + expandId + '"]').css({"display": "inline"});
        } else {
            $('span[expand_id="' + expandId + '"]').css({"display": "block"});
        }
    };

    /*导航条（机经预测或历年真题）*/
    JJWrite.Doing.navigatorTolist = function () {
        $('#leftDiv').hide();
        var come = $(this).attr('come');
        //机经预测
        if(come=='wjj'){
            $('#side661').click();
        }else{
            $('#side662').click();
        }
        $('#side').show();

    };

    /*视频播放*/
    JJWrite.Doing.playDemoVideo = function(source) {
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
                wrap: param.wrap || JJWrite.$wrap,
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
        init: JJWrite.init
    };
});