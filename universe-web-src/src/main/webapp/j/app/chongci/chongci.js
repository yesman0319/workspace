'use strict';

define(['common/uniqueAjax', 'common/render', 'xml2json', 'app/baseURL', 'baseCookie', 'app/baseFinal', 'lib/store','lib/pagebar/jquery.paginate'], function (uniqueAjax, Render, xml2json, URL, BaseCookie, Final) {
    var _conf, $wrap;
    var tokenTmp;
    var user_id;
    var currentZTGroupId;
    var currentQuestions = new Array();
    var section;
    var playTotalTime = 0, playStartTime = 0;
    window.writeTimer=0;
    var writeTotalTime=0.5*60*60;//独立写作默认30分钟
    var huafeiTime=0;//花费时间
    var arrService = [],//批改服务
        arrCoupon = [];//优惠券

    var sendAjax = function (param) {
        var promise = $.Deferred();
        if (!param) {
            return null;
        }
        !param.type && (param.type = 'get');
        param.type.toLowerCase() == 'post' && !param.contentType && (param.contentType = 'application/x-www-form-urlencoded');
        !param.contentType && (param.contentType = 'application/json');
        !param.data && (param.data = '');
        !param.headers && (param.headers = '');
        param.async == undefined && (param.async = true);
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

    var init = function (conf) {
        _conf = $.extend({
            wrap: ''
        }, conf || {});
        $wrap = $(_conf.wrap);
        initConfig();
        initEvent()
    };

    var initConfig = function () {
        BaseCookie.get();
        tokenTmp = BaseCookie.getToken();
        user_id = BaseCookie.getId();
    };

    var initEvent = function () {
        var $document=$(document);
        $document.on('trigger_side1_3', '#side9', menuToggleWrite);//综合写作定位
        $document.on('trigger_side1_2', '#side9', menuToggleWriteLiNian);//历年写作定位
        $document.on('trigger_side1', '#side1', menuToggle);
        $document.on('trigger_side2', '#side2', writeJiJing);
        $document.on('trigger_side3', '#side3', writeSimulation);
        $document.on('click', '#side1', menuToggle); //menu toggle
        $document.on('click', '#side2', writeJiJing);
        $document.on('click', '#side3', writeSimulation);

        $document.on('click', '.duliwrite', showAnswerList1); //should be many
        $document.on('click', '#go1', go1);
        $document.on('click', '#go2', go2);
        $document.on('click', '#jijingSample', showjijingSample);
        $document.on('click', '#articleSubmit', articleSubmit);
        $document.on('click', '.rightItem', showAnswerList1);
        $document.on('click', '.yuceTab', loadYuceTabData);
        $document.on('click', '.wslTab', loadZhentiTabData);
        $document.on('click', '#btnLogin', login);
        $document.on('keyup', '#articleAnswer', checkLengthNew);
        $document.on('focus', '#articleAnswer', checkLogin);
        $document.on('click', '#doAgain', doAgain);
        $document.on('click', '.myanswer', showAnswerDetailInfo);
        $document.on("click", "#write_scoreLack_saved", write_saveOpration); //积分确定操作
        $document.on('click','.playthevideo',function(){
            playDemoVideo($(this).attr('data-source'));
        });//播放视频
        $document.on("click", "#notCorrection_submit", piGai); //已保存未提交批改按钮点击事件
        $document.on('click', '.divChoose .radio_teacher', function () {
            //切换单选按钮
            $('.divChoose .radio_teacher').removeClass("type-radi01").addClass("type-radi02");
            $(this).addClass("type-radi01").removeClass("type-radi02");
        });
        $document.off('click', '.teacher_info').on('click', '.teacher_info', function () {
            var teacherId = $(this).attr('teacherid');
            window.open('teacherevaluate.html?teacherid='+teacherId,'_blank');
        });
        //保存选择的老师
        $document.on('click', '#btnSubmitTeacher', saveTeacherOfChoose);
        $document.on('click','#jijingSampleDiv .cnote',function(e){
            //处理老师批注框在只选择两端的部分时的定位情况
            var that = e.target|| e.currentTarget,
                $that=$(that);
            var len = $that.text().length;
            var height=$that.height();
            //不够一行的字却占了两行的高度（占两行的那种情况）
            if(len<105&&height>30){
                setTimeout(function(){
                    var thisSpan=$('.popover').filter(':visible');
                    thisSpan.css('left',-thisSpan.width()/2+30);
                    thisSpan.css('top',thisSpan.position().top+20);
                },10);
            }
        });
        $document.on('click', '#cancleSave', function(){
            var $btnSubmit=$('#articleSubmit'),
                questionId=$btnSubmit.attr('question_id'),
                category=$btnSubmit.attr('category');
            $('.modal-backdrop').hide();

            var params = {
                questionId : questionId,
                type:4,//已保存
                category:category
            };
            showAnswerList(params);
        });
    };

    /*从列表页进入*/
    var showAnswerList1 = function () {
        var params = {};
        params.questionId = $(this).attr("id");
        params.type = $(this).attr("type");
        params.category = $(this).attr('category');
        showAnswerList(params);
    };

    /**
     * 独立写作列表
     * */
    var writeJiJing = function () {
        BaseCookie.get();
        tokenTmp = BaseCookie.getToken();
        user_id = BaseCookie.getId();
        if ("" == tokenTmp || null == tokenTmp) {
            tokenTmp = "xiaoma"
        }
        $('.sidebar-ul').find('a.sidebarLight').removeClass('sidebarLight');
        $('.sidebar-ul').find('li.sidebarLight').removeClass('sidebarLight');
        $("#side2").addClass('sidebarLight');
        $("#side2").parent().siblings().removeClass('sidebarLight');
        $("#wirte_menu_div1 li").removeClass('sidebarLight');
        if (!tokenTmp) {
            tokenTmp = "xiaoma";
        }

        $.ajax({
            url: URL.baseURL + "jijing_groups/yuce",
            type: 'get',
            data: {
                question_type: 2,
                new_version: 1
            },
            dataType: "json",
            headers: {
                "Authorization": tokenTmp
            },
            success: function (json) {
                var renderData = [];
                renderData.groups = json.group_messages;

                $.each(json.jijing_questions, function (key, val) {
                    var tmp = {};
                    tmp.id = val.id;
                    tmp.content = val.content;
                    tmp.sequence_number = val.sequence_number;
                    tmp.title = val.title;
                    tmp.answer_id = val.answer_id;
                    tmp.category = 'wjj';
                    tmp.type = val.type;
                    tmp.score = val.score;
                    tmp.grap_amount = val.grap_amount;
                    tmp.category_fanwei=val.category;
                    renderData.push(tmp);
                });
                currentQuestions = renderData; //保存当前下载题目
                Render.render({
                    wrap: $wrap,
                    tmpl: {
                        tmplName: 'app/chongci/tmpl_write_jijing',
                        tmplData: renderData
                    },
                    afterRender:function(){
                        $(".right-part2 p.left25").each(function (){
                            //var height=$(this).height();
                            if(!$(this).hasClass("jijing-speak-div")){
                                //没有带批改等状态的列表的文字的宽度增加
                                if($(this).find(".rewrite-font").length==0){
                                    $(this).find("a.sim-a2").width(635);
                                }
                                $(this).addClass("jj-speak-divnew");
                                $(this).find("span.fright").addClass("rewrite-font");
                                $(this).find("a.sim-width510").addClass("sim-anew1");
                                /*//一行的
                                if($(this).height()<=20){
                                    $(this).addClass("jj-speak-single");
                                    $(this).find("a").removeClass('sim-a2').css('display','inline');
                                    if($(this).find("span.rewrite-percentnew").length>0){
                                        $(this).removeClass("jj-speak-single").addClass("jj-speak-divnew");
                                    }
                                }else{
                                    $(this).addClass("jj-speak-divnew");
                                    $(this).find("span.fright").addClass("rewrite-font");
                                    $(this).find("a.sim-width510").addClass("sim-anew1");
                                }*/
                            }
                        });
                    }
                });
            }
        });
    };
    /**
     * 机经预测点击选项卡切换数据列表
     **/
    var loadYuceTabData = function () {
        var groupId = $(this).attr('id');
        currentZTGroupId = groupId;
        //设置焦点选项卡
        $('.tabWrite li').removeClass('current');
        $(this).parent('li').addClass('current');
        $.ajax({
            url: URL.baseURL + "jijing_groups/yuce",
            type: 'get',
            data: {
                group_id:groupId,
                question_type: 2,
                new_version: 1
            },
            dataType: "json",
            headers: {
                "Authorization": tokenTmp
            },
            success: function (json) {
                var renderData = {};
                $.each(json.jijing_questions,function(idx,item){
                    item.category_fanwei=item.category;
                    item.category='wjj';
                });
                renderData.questions = json.jijing_questions;
                renderData.category = 'wjj';
                currentQuestions = json.jijing_questions; //保存当前下载题目

                Render.render({
                    wrap: $('#yuceContent'),
                    tmpl: {
                        tmplName: 'app/chongci/tmpl_write_wjj_questions',
                        tmplData: renderData
                    },
                    afterRender:function(){
                        $(".right-part2 p.left25").each(function (){
                            //var height=$(this).height();
                            if(!$(this).hasClass("jijing-speak-div")){
                                //没有带批改等状态的列表的文字的宽度增加
                                if($(this).find(".rewrite-font").length==0){
                                    $(this).find("a.sim-a2").width(635);
                                }
                                $(this).addClass("jj-speak-divnew");
                                $(this).find("span.fright").addClass("rewrite-font");
                                $(this).find("a.sim-width510").addClass("sim-anew1");
                            }
                        });
                    }
                });
            }
        });

    };

    /**
     * 加载历年真题选项卡列表，同时加载第一个选项卡的内容
     * */
    var writeSimulation = function () {
        BaseCookie.get();
        tokenTmp = BaseCookie.getToken();
        user_id = BaseCookie.getId();
        if ("" == tokenTmp || null == tokenTmp) {
            tokenTmp = "xiaoma"
        }
        $('.sidebar-ul').find('a.sidebarLight').removeClass('sidebarLight');
        $('.sidebar-ul').find('li.sidebarLight').removeClass('sidebarLight');
        $("#side3").addClass('sidebarLight');
        $("#side3").parent().siblings().removeClass('sidebarLight');
        $("#wirte_menu_div1 li").removeClass('sidebarLight');
        if (!tokenTmp) {
            tokenTmp = "xiaoma";
        }

        $.ajax({
            url: URL.baseURL + "jijing_groups/zhenti",
            type: 'get',
            dataType: "json",
            headers: {
                "Authorization": tokenTmp
            },
            success: function (json) {
                var jijing_groups = json.jijing_groups;
                if (json.jijing_groups && json.jijing_groups.length > 0) {
                    var renderData = {};
                    renderData.groups = jijing_groups;
                    renderData.category = "wsl";

                    $.ajax({
                        url: URL.baseURL + "jijing_questions",
                        type: 'get',
                        data: {
                            id: jijing_groups[0].id,
                            question_type: 2,
                            new_version: 1
                        },
                        headers: {
                            "Authorization": tokenTmp
                        },
                        success: function (cjson) {
                            renderData.questions = cjson.jijing_questions;
                            currentQuestions = cjson.jijing_questions;
                            currentZTGroupId = jijing_groups[0].id;
                            Render.render({
                                wrap: $wrap,
                                tmpl: {
                                    tmplName: 'app/chongci/tmpl_write_simulation',
                                    tmplData: renderData
                                },
                                afterRender:function(){
                                    $("#wslContent p.left25").each(function (){
                                        if(!$(this).hasClass("jijing-speak-div")){
                                            //没有带批改等状态的列表的文字的宽度增加
                                            if($(this).find(".rewrite-font").length==0){
                                                $(this).find("a.sim-a2").width(635);
                                            }
                                            //一行的
                                            if($(this).height()<=20){
                                                $(this).addClass("jj-speak-single");
                                                $(this).find("a").removeClass('sim-a2').css('display','inline');
                                            }else{
                                                $(this).addClass("jj-speak-divnew");
                                                $(this).find("span.fright").addClass("rewrite-font");
                                                $(this).find("a.sim-width510").addClass("sim-anew1");
                                            }
                                        }
                                    });
                                }
                            });
                        }
                    });
                }


            }
        });
    };

    /**
     * 点击选项卡切换数据列表
     **/
    var loadZhentiTabData = function () {
        if (tokenTmp) {
            var groupId = $(this).attr('id');
            currentZTGroupId = groupId;
            //设置焦点选项卡
            $('.tabWrite li').removeClass('current');
            $(this).parent('li').addClass('current');
            $.ajax({
                url: URL.baseURL + "jijing_questions",
                type: 'get',
                data: {
                    id: groupId,
                    question_type: 2,
                    new_version: 1
                },
                headers: {
                    "Authorization": tokenTmp
                },
                success: function (json) {
                    var renderData = {};
                    renderData.questions = json.jijing_questions;
                    renderData.category = 'wsl';
                    currentQuestions = json.jijing_questions; //保存当前下载题目
                    Render.render({
                        wrap: $('#wslContent'),
                        tmpl: {
                            tmplName: 'app/chongci/tmpl_write_wsl_questions',
                            tmplData: renderData
                        },
                        afterRender:function(){
                            $("#wslContent p.left25").each(function (){
                                if(!$(this).hasClass("jijing-speak-div")){
                                    //没有带批改等状态的列表的文字的宽度增加
                                    if($(this).find(".rewrite-font").length==0){
                                        $(this).find("a.sim-a2").width(635);
                                    }
                                    //一行的
                                    if($(this).height()<=20){
                                        $(this).addClass("jj-speak-single");
                                        $(this).find("a").removeClass('sim-a2').css('display','inline');
                                    }else{
                                        $(this).addClass("jj-speak-divnew");
                                        $(this).find("span.fright").addClass("rewrite-font");
                                        $(this).find("a.sim-width510").addClass("sim-anew1");
                                    }
                                }
                            });
                        }
                    });
                }
            });
        }
    };

    /*
     *显示做题页面或我的做题记录页面
     */
    var showAnswerList = function (params) {
        var questionId = params.questionId;
        var type = params.type;
        var category = params.category;

        var from = "exercise";
        var cText;
        if (category == "wjj") {
            cText = "独立写作";
        } else {
            cText = "历年真题";
        }
        //重置花费时间
        huafeiTime=0;

        $.ajax({
            url: URL.baseURL5 + 'jijing_questions/writing_message',
            type: 'get',
            headers: {
                "Authorization": tokenTmp
            },
            data: {
                'question_id': questionId
            },
            success: function (json) {
                if (json && json.error) {
                    alert(json.error);
                } else {
                    var renderData = {};

                    renderData.category = category;
                    renderData.cText = cText;
                    renderData.from = from;
                    renderData.id = questionId;
                    renderData.sequence_number = json.sequence_number;
                    renderData.content = json.content;
                    renderData.answer_messages = json.answer_messages;
                    renderData.questions = currentQuestions;
                    renderData.title = renderData.questions[0].title;
                    $.each(renderData.answer_messages, function (i, n) {
                        n.answer_created_at = n.answer_created_at ? n.answer_created_at.substring(0, 19).replace("T", "&nbsp;&nbsp;") : n.answer_created_at;
                        n.cutAnswer = (n.answer_conent && n.answer_conent.length > 260) ? n.answer_conent.substring(0, 260) + '…' : n.answer_conent;
                    });

                    $("#side").css("display", "none"); //隐藏左边导航
                    //type：0:未做,1:已保存, 2:待抢, 3:待选老师,4:待批改, 5:已批改
                    if (type == 0) {
                        Render.render({
                            wrap: $wrap,
                            tmpl: {
                                tmplName: "app/chongci/tmpl_write_detail_0",
                                tmplData: renderData
                            },
                            afterRender: function () {
                                //案例分析显示隐藏
                                var $text=$('#exampleText'),
                                    $video=$('#exampleVideo'),
                                    analyText= $.trim($text.html()),
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
                                jijingSample();
                                startWriteTimer();
                            }
                        });
                    } else {
                        clearWriteTimer();
                        //呈现我的做题记录页面
                        Render.render({
                            wrap: $wrap,
                            tmpl: {
                                tmplName: 'app/chongci/tmpl_write_answer_list',
                                tmplData: renderData
                            },
                            afterRender: function () {
                                jijingSample();
                            }
                        });
                    }

                }
            }
        });
        //获取用户的赠券以及规则
        getUserCoupon();
    };

    /*显示一个用户答案的详细信息*/
    var showAnswerDetailInfo = function () {
        var params = {};
        params.type = $(this).attr('qtype');
        params.category = $("#jijing_question_id").attr('category');
        params.id = $("#jijing_question_id").attr('jqid');
        params.answer_id = $(this).attr('answer_id');
        params.sequence_number = $("#jijing_question_id").html();
        params.content = $('#sentence').attr('content');
        params.score = $(this).attr('score');
        params.from = $("#jijing_question_id").attr('from');
        //已批改走单独的接口
        if(params.type==5){
            getYiPiGaiUserAnswer(params);
        }else{
            showDetail(params);
        }
    };

    /**
     **显示用户答案详情
     **/
    var showDetail = function (obj) {
        var renderData = {};
        renderData.type = obj.type;
        renderData.category = obj.category;
        renderData.id = obj.id;
        renderData.answer_id = obj.answer_id;
        renderData.sequence_number = obj.sequence_number;
        renderData.content = obj.content;
        renderData.score = obj.score;
        renderData.from = obj.from; //表示从哪个入口进入
        renderData.questions = obj.questions || currentQuestions;
        renderData.title = obj.title || renderData.questions[0].title;

        if (renderData.category == "wjj") {
            renderData.cText = "独立写作";
        } else {
            renderData.cText = "历年真题";
        }

        //start
        $.ajax({
            url: URL.baseURL + 'articles/' + renderData.answer_id,
            type: 'get',
            headers: {
                "Authorization": tokenTmp
            },
            success: function (json) {
                var tmplName = '',
                    answerObj = json.article,
                    content=answerObj.content.replace(/\n/g, "<br>"),
                    create_time=json.article.created_at.substring(0, 19).replace("T", "&nbsp;&nbsp;");
                renderData.answerContent = answerObj.content;
                if(answerObj.spend_time){
                    renderData.spend_time = format_time(answerObj.spend_time);
                }
                renderData.wordCount = calculateWordCount(answerObj.content);

                //type：0:未做,1:已保存, 2:待抢, 3:待选老师,4:待批改, 5:已批改
                if ("1" == renderData.type) {
                    tmplName = 'app/chongci/tmpl_write_detail_3';
                    renderData.answerContent_original = answerObj.content;
                    renderData.answerContent = content;
                    renderData.answer_created_at=create_time;
                } else if ("2" == renderData.type) {
                    tmplName = 'app/chongci/tmpl_write_detail_daiqiang';
                    renderData.answerContent = content;
                    renderData.answer_created_at=create_time;
                } else if ("3" == renderData.type) {
                    tmplName = 'app/chongci/tmpl_write_detail_chooseteacher';
                    renderData.answerContent = content;
                    renderData.answer_created_at=create_time;
                    var teacher = loadTeacherList(renderData.answer_id,1);
                    renderData.teachers =teacher.teachers;
                    renderData.totalCount =teacher.totalCount;
                } else if ("4" == renderData.type) {
                    tmplName = 'app/chongci/tmpl_write_detail_1';
                    var mark = answerObj.article_marks[0];
                    if (!answerObj.article_marks || answerObj.article_marks.length == 0) {
                        mark = {
                            created_at: '',
                            score: 0,
                            user: {}
                        };
                    }
                    renderData.answerContent = content;
                    renderData.answer_created_at=create_time;
                    renderData.create_at = formatDate(new Date(create_time.replace(/\&nbsp;/g,' ')),'yyyy-MM-dd hh:mm');
                    renderData.teacher_avatar = mark.user.avatar ? mark.user.avatar : 'http://newbbs.b0.upaiyun.com/avater/avater.png';
                    renderData.teacher_nickname = answerObj.teacher_nickname;
                    renderData.teacher_id=answerObj.teacher_id;
                }
                //已批改(已由单独的一个方法调用单独的接口来处理)
                //else if ("5" == renderData.type) {
                //    //已批改
                //    tmplName = 'app/chongci/tmpl_write_detail_2';
                //    var mark = answerObj.article_marks[0];
                //    if (!answerObj.article_marks || answerObj.article_marks.length == 0) {
                //        mark = {
                //            created_at: '',
                //            score: 0,
                //            user: {}
                //        };
                //    }
                //    renderData.created_at = mark.created_at.substring(0, 19).replace("T", "&nbsp;&nbsp;");
                //    renderData.score = mark.score;
                //    renderData.teacher_avatar = mark.user.avatar ? mark.user.avatar : 'http://newbbs.b0.upaiyun.com/avater/avater.png';
                //    renderData.teacher_nickname = mark.user.nickname;
                //    renderData.teacher_id=answerObj.teacher_id;
                //    //加载老师的批改内容
                //    renderData.answerContent = createTeacherRemark(answerObj);
                //}

                $("#side").css("display", "none");
                Render.render({
                    wrap: $wrap,
                    tmpl: {
                        tmplName: tmplName,
                        tmplData: renderData
                    },
                    afterRender: function () {
                        jijingSample();
                        //待选老师
                        if(renderData.type == '3'){
                            bindPage('#pageSlide1', Math.ceil(renderData.totalCount/10), chooseTeacher_turnPage, 1,renderData.answer_id);
                        }
                    }
                });

            }
        });
        //end
    };
    /*只获取已批改的用户答案-新接口*/
    var getYiPiGaiUserAnswer = function (param) {
        /*1	精华口语批改
         2	机经口语批改
         3	机经写作批改
         4	tpo综合口语批改
         5	tpo综合写作批改
         6	保分机经口语批改
         7	保分机经写作批改
         8	保分tpo综合口语批改
         9	保分tpo综合写作批改*/
        $.ajax({
            url: URL.baseURL10 + 'correct/web/getMarkDetail.action',
            type: 'get',
            headers: {
                "token": tokenTmp
            },
            data: {
                correctType:3,
                answerId: param.answer_id
            },
            success: function (json) {
                if (json.status==0) {
                    var result=json.result,
                        renderData = {};
                    renderData.type = param.type;
                    renderData.id = param.id;
                    renderData.answer_id = param.answer_id;
                    renderData.category = param.category;
                    renderData.sequence_number = result.questionSeq;
                    if (renderData.category == "wjj") {
                        renderData.cText = "独立写作";
                    } else {
                        renderData.cText = "历年真题";
                    }
                    //题干
                    renderData.content = result.questionContent ? result.questionContent.replace(/\n/g, '<br/>') : '';
                    renderData.audio_url = result.audioUrl;
                    renderData.created_at = formatDate(new Date(result.createTime),'yyyy-MM-dd hh:mm');
                    renderData.score = result.score;
                    renderData.questions = param.questions || currentQuestions;
                    $.each(renderData.questions, function (i, n) {
                        n.content = (n.content && n.content.length > 43) ? n.content.substring(0, 43) + '…' : n.content;
                    });
                    renderData.title = param.title || renderData.questions[0].title;
                    //鼠标悬浮时显示教师对相应内容的评价
                    if(result.detailList){
                        renderData.mark_tips=result.detailList;
                        $.each(renderData.mark_tips,function(i,item){
                            item.start_index=item.startIndex;
                            item.end_index=item.endIndex;
                            item.audio_url=item.audioUrl;
                            item.answer_content=item.markContent;
                        });
                    }
                    renderData.answerContent = createTeacherRemark({mark_tips:renderData.mark_tips,content:result.content});
                    renderData.wordCount = calculateWordCount(result.content);
                    //是否评价过 1是,0否
                    renderData.isFeedback=result.isFeedback;

                    renderData.teacher_id = result.teacherInfo.teacherId;
                    renderData.teacher_nickname = result.teacherInfo.nickName;
                    renderData.teacher_avatar = result.teacherInfo.avatar ? result.teacherInfo.avatar : 'http://newbbs.b0.upaiyun.com/avater/avater.png';
                    renderData.correctTotal=result.teacherInfo.correctTotal;
                    renderData.phone=result.teacherInfo.phone;
                    renderData.comment=result.teacherInfo.comment;
                    renderData.teacherType=result.teacherInfo.type;
                    renderData.starClass=parseClass(result.teacherInfo.scoreFinal);

                    Render.render({
                        wrap: $wrap,
                        tmpl: {
                            tmplName: 'app/chongci/tmpl_write_detail_2',
                            tmplData: renderData
                        },
                        afterRender: function () {
                            //绑定评价按钮
                            $(document).off('click','button[isPingJia]').on('click', 'button[isPingJia]', function () {
                                var $this =$(this),
                                    isPingJia=$this.attr('isPingJia'),
                                    answerId=$this.attr('answerId'),
                                    teacherId=$this.attr('teacherId'),
                                    moduleName='WRITING_JJ';
                                /*ORAL_JJ:机经口语批改，WRITING_JJ:机经写作批改，TPOZHKY:tpo综合口语批改
                                 TPOZHXZ:tpo综合写作批改，BF_ORAL_JJ:保分机经口语批改，BF_WRITING_JJ:保分机经写作批改
                                 BF_TPOZHKY:保分tpo综合口语批改，BF_TPOZHXZ:保分tpo综合写作批改*/
                                require(['app/teacher/evaluate_teacher'],function(PingJia){
                                    var obj={
                                        moduleName:moduleName,
                                        answerId:answerId,
                                        teacherId:teacherId,
                                        lookCallback:null,
                                        addCallback:function(){
                                            getYiPiGaiUserAnswer(param);
                                        }
                                    };
                                    //已评价
                                    if(isPingJia==1){
                                        PingJia.showComment(obj);
                                    }else{
                                        PingJia.addComment(obj);
                                    }
                                });
                            });
                            $('#showDetail').removeClass('h202');
                            setPiGaiEffect();
                        }
                    });

                }else{
                    console.log(json.message);
                }
            }
        });
    };
    /*设置老师文本和语音批注点击效果*/
    var setPiGaiEffect = function () {
        //点击文字批注
        $('.cnote').popover({
            trigger: 'click focus'
        });
        $('body').on('click', function (e) {
            if (e.target.className != 'cnote') {
                $('.cnote').popover('hide');
            } else {
                $('.popover').hide();
                $(e.target).off('click');
                $(e.target).popover('show');
            }
        });
        //点击语音批注
        $('.playaudio').on('click', function () {
            var $this = $(this);
            //停止其他的播放-开始
            var music = document.getElementById("html5Audio");
            music.pause();
            $('#btnStopPlay').hide();
            $('#btnPlay').show();
            //停止其他的播放-结束
            $('#html5Audio').attr('src', $this.attr('audio_url'));
            //如果播放功能没显示则将其显示出来，
            if ($this.hasClass('tagshow')) {
                $('#divAudio').toggleClass('record');
            } else {
                $('.playaudio').removeClass('tagshow');
                $this.addClass('tagshow');
                if ($('#divAudio').is(':hidden')) {
                    $('#divAudio').toggleClass('record');
                }
            }
            if ($this.hasClass('audioin')) {
                $this.removeClass('audioin');
            } else {
                $('.playaudio').removeClass('audioin');
                $this.addClass('audioin');
            }
            playTotalTime = 0;
        });
        //播放
        $('#btnPlay').on('click', function () {
            playAudio();
            $('#btnPlay').hide();
            $('#btnStopPlay').show();
        });
        //暂停
        $('#btnStopPlay').on('click', function () {
            playAudio();
            $('#btnStopPlay').hide();
            $('#btnPlay').show();
        });
        //统计音频总时间
        $('#html5Audio').on('loadedmetadata', function (e) {
            playTotalTime = Math.round(e.currentTarget.duration);
            var min = '00';
            var sec = parseInt(playTotalTime % 60);
            (sec < 10) && (sec = '0' + sec);
            if (playTotalTime > 59) {
                min = parseInt(playTotalTime / 60);
                (min < 10) && (min = '0' + min);
            }
            $('#totalTime').text(min + ':' + sec);
            $('#spendTime').text('00:00');
        });
        ////计算开始时间
        //$('#html5Audio').on('playing',function(e){
        //	playStartTime=(new Date()).getTime();
        //});
        //计算剩余时间
        $('#html5Audio').on('timeupdate', function (e) {
            var stime = Math.ceil(e.currentTarget.currentTime),
                min = '00';
            if (stime > playTotalTime) {
                return;
            }
            var sec = parseInt(stime % 60);
            (sec < 10) && (sec = '0' + sec);
            if (stime > 59) {
                min = parseInt(stime / 60);
                (min < 10) && (min = '0' + min);
            }
            $('#spendTime').text(min + ':' + sec);
        });
        //播放完
        document.getElementById('html5Audio').addEventListener('ended', function () {
            $('#btnStopPlay').hide();
            $('#btnPlay').show();
        });
    };
    /*重做*/
    var doAgain = function () {
        var renderData = {};
        // renderData.type = obj.type
        renderData.category = $('#jijing_question_id').attr('category');
        renderData.id = $('#jijing_question_id').attr('jqid');
        // renderData.answer_id = obj.answer_id;
        renderData.sequence_number = $('#jijing_question_id').html();
        renderData.content = $('#sentence').attr('content');
        // debugger;
        // renderData.score = obj.score;
        renderData.from = $('#jijing_question_id').attr('from'); //表示从哪个入口进入
        renderData.questions = currentQuestions;
        renderData.title = renderData.questions[0].title;
        // renderData.wrap = obj.wrap || $wrap;

        if (renderData.category == "wjj") {
            renderData.cText = "独立写作";
        } else {
            renderData.cText = "历年真题";
        }
        //重置花费时间
        huafeiTime=0;
        startWriteTimer();

        $("#side").css("display", "none");
        Render.render({
            wrap: $wrap,
            tmpl: {
                tmplName: "app/chongci/tmpl_write_detail_0",
                tmplData: renderData
            },
            afterRender: function () {
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
                jijingSample();
            }
        });
    };

    /*加载老师列表数据*/
    var loadTeacherList = function (answerId,page) {
        var teacher = {
            teachers:[],
            totalCount:0
        };
        // answerType：1:精华口语批改，2：机经口语批改，3：机经写作批改，
        // 4：tpo综合口语批改，5：tpo综合写作批改
        var param = {
            url: URL.baseURL10 + "correct/myGrapTeacherList.action",
            async:false,
            data: {
                answerType: 3,
                answerId:answerId,
                currentPage:page
            }
        };
        var promise = sendAjax(param);
        promise.then(function (json) {
            //成功
            if(json.status==0){
                $.each(json.result,function(i,obj){
                    obj.starClass = parseClass(obj.scoreFinal);
                    obj.avatar = obj.avatar ? obj.avatar : 'http://newbbs.b0.upaiyun.com/avater/avater.png';
                });
                teacher.teachers=json.result;
                teacher.totalCount=json.totalCount;
            }else{
                if(console){
                    console.log(json.message);
                }
            }
        });
        return teacher;
    };

    /**
     * 选择老师列表翻页
     */
    var chooseTeacher_turnPage = function (page,answerId){
        // answerType：1:精华口语批改，2：机经口语批改，3：机经写作批改，
        // 4：tpo综合口语批改，5：tpo综合写作批改
        var param = {
            url: URL.baseURL10 + "correct/myGrapTeacherList.action",
            //async:false,
            data: {
                answerType: 3,
                answerId:answerId,
                currentPage:page
            }
        };
        var promise = sendAjax(param);
        promise.then(function (json) {
            //成功
            if(json.status==0){
                var renderData={};
                $.each(json.result,function(i,obj){
                    obj.starClass = parseClass(obj.scoreFinal);
                    obj.avatar = obj.avatar ? obj.avatar : 'http://newbbs.b0.upaiyun.com/avater/avater.png';
                });
                renderData.teacherList=json.result;
                renderData.answer_id=answerId;

                Render.render({
                    wrap: $('#teacherPage'),
                    tmpl: {
                        tmplName: 'app/chongci/tmpl_write_teacher_list',
                        tmplData: renderData
                    },
                    afterRender: function () {
                    }
                });
            }else{
                if(console){
                    alert(json.message);
                }
            }
        });
    };

    /*用户提交选择的老师*/
    var saveTeacherOfChoose=function(){
        var radioTeacher = $('.divChoose .type-radi01'),
            questionId =radioTeacher.attr('questionId'),
            answerId =radioTeacher.attr('answerid'),
            teacherId=radioTeacher.attr('teacherid');
        if(radioTeacher.length<=0){
            //alert('请选择老师');
            return;
        }
        $('#btnSubmitTeacher').attr('disabled',true);
        // answerType：1:精华口语批改，2：机经口语批改，3：机经写作批改，
        // 4：tpo综合口语批改，5：tpo综合写作批改
        var param = {
            url: URL.baseURL10 + "correct/submitTeacherChecked.action",
            type: 'post',
            data: {
                answerType: 3,
                answerId:answerId,
                teacherId:teacherId
            }
        };
        var promise = sendAjax(param);
        promise.then(function (json) {
            //成功
            if(json.status==0){
                switchToDaiPiGai(questionId,answerId);
            }else{
                alert(json.message);
            }
        });
    };

    /*切换到待批改页面*/
    var switchToDaiPiGai = function (questionId,answerId) {
        var params = {},
            $questionId=$("#jijing_question_id");
        //type：0:未做,1:已保存, 2:待抢, 3:待选老师,4:待批改, 5:已批改
        $.each(currentQuestions, function (i, item) {
            //设置当前题目为待批改
            if ((item.id + '') == questionId) {
                item.type = 4;
            }
        });
        //待批改
        params.type = 4;
        params.id = questionId;
        params.answer_id = answerId;
        params.category = $questionId.attr('category');
        params.sequence_number = $questionId.html();
        params.from = $questionId.attr('from');
        params.content = $('#sentence').html();
        params.score = 0;
        //表示从哪个入口进入
        showDetail(params);
    };

    /**
     * 绑定分页控件
     * @param pageWrap
     * @param totalCount
     * @param fnPage
     * @param currentPage
     */
    var bindPage = function(pageWrap, totalCount, fnPage, currentPage,answer_id) {
        $(pageWrap).paginate({
            count: totalCount,
            start: currentPage,
            display: 5,
            resizeParentWidth:true,
            border: false,
            border_color: '#327dde',
            text_color: '#333',
            background_color: '#fff',
            border_hover_color: '#327dde',
            text_hover_color: '#fff',
            background_hover_color: '#549dfd',
            images: false,
            mouse: 'press',
            onChange: function(page) {
                //window.scrollTo(0, 0);
                fnPage(page,answer_id)
            }
        });
    };

    /*处理用户答题结果，显示教师的评语*/
    var createTeacherRemark = function (item) {
        //教师已经给批改了
        var newContent = '', start = 0, end = 0;
        var mark_tips=item.mark_tips||item.article_marks[0].mark_tips;

        if (!mark_tips || mark_tips.length == 0) {
            return item.content.replace(/\n/g, '<br/>');
        }
        $.each(mark_tips, function (i, t) {
            if(t.start_index<start){
                return ;
            }
            end = t.start_index;
            newContent += item.content.substring(start, end);

            //音频形式的批改
            if (t.audio_url) {
                newContent += '<span class="playaudio" data-html="true" audio_url="' + t.audio_url + '" style="background: #98C4FF;">'
                    + item.content.substring(t.start_index, t.end_index) + '</span>';
            } else {
                //文字形式的批改
                newContent += '<span class="cnote" data-html="true" data-content="' + t.answer_content + '" data-toggle="popover" data-placement="top" style="background: #f9e6be;">'
                    + item.content.substring(t.start_index, t.end_index) + '</span>';
            }

            start = t.end_index;
        });
        newContent += item.content.substring(start);
        item.content = newContent.replace(/\n/g, '<br/>');
        return item.content;
    };

    /*播放教师批注音频*/
    var playAudio = function () {
        var music = document.getElementById("html5Audio");
        if (music.paused) {
            music.play();
        } else {
            music.pause();
        }
    };

    var preWord = null;
    /**
     * 作文单词长度计算和限制最长字符长度
     * @param e
     */
    var checkLengthNew = function (e) {
        var content = $(e.target).val();
        var $this=$(this);
        if (content) {
            var newcontent = content.replace(/[\n\,\.\?\:\!\(\)\;\u4e00-\u9fa5]/g, " ");
            var contentArray = newcontent.split(" ");
            var newContentArray = [];
            for (var i in contentArray) {
                if (contentArray[i] != "") {
                    newContentArray.push(contentArray[i]);
                }
            }
            $("#wordContent").html(newContentArray.length);
            $(e.target).val(content.replace(/[\u4e00-\u9fa5]/g, "")); //过滤中文
            if (newContentArray.length > 700) {
                $this.val(preWord);
            }else if(newContentArray.length > 680){
                preWord = $this.val();
            }
        }
    };
    /**
     * 验证作文单词输入长度
     * @param e
     */
    var validWordsCount = function (content, length, type) {
        if (content) {
            var newcontent = content.replace(/[\n\,\.\?\:\!\(\)\;\u4e00-\u9fa5]/g, " ");
            var contentArray = newcontent.split(" ");
            var newContentArray = [];
            for (var i in contentArray) {
                if (contentArray[i] != "") {
                    newContentArray.push(contentArray[i]);
                }
            }
            if (type == "less" && newContentArray.length <= length) {
                return true;
            } else if (type == "than" && newContentArray.length >= length) {
                return true;
            }
        }
        return false;
    };
    /**
     * 计算字符长度
     */
    var calculateWordCount = function (content) {
        if (content) {
            var newcontent = content.replace(/[\n\,\.\?\:\!\(\)\;\u4e00-\u9fa5]/g, " ");
            var contentArray = newcontent.split(" ");
            var newContentArray = [];
            for (var i in contentArray) {
                if (contentArray[i] != "") {
                    newContentArray.push(contentArray[i]);
                }
            }
            return newContentArray.length;
        }
        return 0;
    };

    /*检查是否登录*/
    var checkLogin=function(){
        if (!BaseCookie.getToken()) {
            $('#dialogLogin').modal({
                backdrop: 'static'
            });
            $('#dialogLogin').on('hidden.bs.modal', function (e) {
                BaseCookie.get();
                if (BaseCookie.getToken()) {
                    tokenTmp = BaseCookie.getToken();
                    user_id = BaseCookie.getId();
                    reloadQuestions();
                    //callback_submit()
                }
            });
            return;
        }
    };

    //倒计时（到达指定时间后开始正计时）
    var startWriteTimer = function (){
         var temptime=writeTotalTime;
        window.clearInterval(window.writeTimer);
         var fn = function (){
                if(temptime>0 && temptime<=writeTotalTime){
                    temptime --;
                    huafeiTime = writeTotalTime-temptime;
                }else if(temptime==0){
                    temptime=writeTotalTime;
                    temptime++;
                    huafeiTime = temptime;
                }else{
                    temptime++;
                    huafeiTime = temptime;
                }

             $("#writeTimer").html(format_time(temptime));
         };
        window.writeTimer=window.setInterval(fn,1000);
    };
    var clearWriteTimer= function (){
        window.clearInterval(window.writeTimer);
    };
    /**
     * 格式化时长
     */
    var format_time = function (time){
        if(time){
            var checkTime = function(i) {
                if (i < 10) {
                    i = "0" + i;
                }
                return i;
            };
            var dd = parseInt(time  / 60 / 60 / 24, 10); //计算剩余的天数
            var hh = parseInt(time  / 60 / 60 % 24, 10); //计算剩余的小时数
            var mm = parseInt(time  / 60 % 60, 10); //计算剩余的分钟数
            var ss = parseInt(time  % 60, 10); //计算剩余的秒数
            dd = checkTime(dd);
            hh = checkTime(hh);
            mm = checkTime(mm);
            ss = checkTime(ss);
           return (hh + ":" + mm + ":" + ss);
        }
        return "00:00:00";
    };
    /**
     * 保存用户写作内容
     */
    var write_saveOpration = function () {
        //write_hideScoreLack();
        var articleAnswer = $('#articleAnswer').val();
        var jijing_question_id = $('#jijing_question_id').attr('jqid');
        var jijing_question_seqNum = $('#jijing_question_id').attr('jqSeqNum');
        var from = $('#jijing_question_id').attr('from');
        var qContent = $('#jijing_question_id').attr('qContent');
        //var aContent = $('#articleAnswer').val();
        //aContent = aContent.replace(/\n/g, "<br>");

        var pdata = {};
        pdata.content = articleAnswer;
        pdata.jijing_question_id = jijing_question_id;
        pdata.new_version = 1;
        pdata.spend_time=huafeiTime;
        $.ajax({
            url: URL.baseURL5 + "articles/mark_article",
            type: "POST",
            data: JSON.stringify(pdata),
            headers: {
                "Authorization": tokenTmp,
                "Content-Type": "application/json"
            },
            success: function (json, textStatus, jqXHR) {

                //type:1未批、2已批、3提交失败时,保存的答案
                if (json && json.error) {
                    $('#txtShow').text(json.error);
                    $('#waitPayModal').modal({
                        backdrop: 'static'
                    });
                    $('#waitPayModal').on('hidden.bs.modal', function (e) {});
                    return;
                } else {
                    /*计算用户实际需要支付的费用*/
                    var obj = calculateCharge();
                    obj.questionId = jijing_question_id;
                    obj.answerId = json.answer_id + '_' + Final.JIJING_WRITE;

                    $('#gotoPay').text(obj.btnName);
                    $('#txtShow').text(obj.title);
                    $('#waitPayModal').modal({
                        backdrop: 'static'
                    });
                    //$('#waitPayModal').on('hidden.bs.modal', function (e) {});
                    $('#gotoPay').off('click').on('click', {obj: obj}, placeOrder);

                }
            }
        });
    };
    /**
     * 已保存页面去批改（不再保存）
     */
    var piGai = function () {
        var jijing_question_id = $('#jijing_question_id').attr('jqid');
        var answer_id = $('#jijing_question_id').attr('answer_id');

        //type:1未批、2已批、3提交失败时,保存的答案
        /*计算用户实际需要支付的费用*/
        var obj = calculateCharge();
        obj.questionId = jijing_question_id;
        obj.answerId = answer_id + '_' + Final.JIJING_WRITE;

        $('#gotoPay').text(obj.btnName);
        $('#txtShow').text(obj.title);
        $('#waitPayModal').modal({
            backdrop: 'static'
        });
        $('#gotoPay').off('click').on('click', {obj: obj}, placeOrder);
    };

    /*计算用户实际需要支付的费用*/
    var calculateCharge = function () {
        var obj = {},
            objCoupon = {},
            objPiGai = {};
        //有名师批改券
        if (arrService.length > 0) {
            objPiGai = arrService[0];
            if (objPiGai.couponCount > 0) {
                //名师批改券
                //用户手中的数量大于等于本次需支付的数量
                if (objPiGai.couponCount >= objPiGai.maxCount) {
                    objPiGai.useCount = objPiGai.maxCount;
                } else {
                    objPiGai.useCount = objPiGai.couponCount;
                }
                objPiGai.actualPay = Final.XIEZUO_PRICE - objPiGai.useCount * Final.PIGAI_PRICE;
            }
        }
        //有优惠券
        if (arrCoupon.length > 0) {
            objCoupon = arrCoupon[0];
            if (objCoupon.couponCount > 0) {
                //小马托福券
                if (objCoupon.couponCount >= objCoupon.maxCount) {
                    objCoupon.useCount = objCoupon.maxCount;
                } else {
                    objCoupon.useCount = objCoupon.couponCount;
                }
                objCoupon.actualPay = Final.XIEZUO_PRICE - objCoupon.useCount * Final.COUPON_PRICE;
            }
        }
        //有两种支付方式
        if (objPiGai.actualPay >= 0 && objCoupon.actualPay >= 0) {
            //看哪个方式需要用户支付的少
            if (objPiGai.actualPay <= objCoupon.actualPay) {
                obj = setObj('pigai', objPiGai);
            } else {
                obj = setObj('tuofuquan', objCoupon);
            }
        } else if (objPiGai.actualPay >= 0) {
            obj = setObj('pigai', objPiGai);
        } else if (objCoupon.actualPay >= 0) {
            obj = setObj('tuofuquan', objCoupon);
        } else {
            //啥都没有，只能去支付
            obj.btnName = '支付';
            obj.title = '作文已保存，名师写作批改1次需要' + Final.XIEZUO_PRICE + '元，确定要支付吗？';
        }
        return obj;

        function setObj(type, objQuan) {
            var quan = {};
            quan.useCount = objQuan.useCount;
            quan.actualPay = objQuan.actualPay < 0 ? 0 : objQuan.actualPay;
            quan.hasCount = objQuan.couponCount;
            // coupon说明：couponId_couponCount 赠券Id及使用数量中间加下划线。
            // 多种券之间用英文逗号分隔(例: 5_1,1_3,2_1)
            quan.coupon = objQuan.couponId + '_' + objQuan.useCount;
            quan.btnName = quan.actualPay == 0 ? '使用' : '支付';
            if (type == 'pigai') {
                //名师批改券
                quan.title = '作文已保存，你有' + quan.hasCount + '张小马名师批改券，一次可使用' + quan.useCount + '张，'
                    + (quan.actualPay == 0 ? '要使用吗？' : '还需支付' + quan.actualPay + '元');
            } else {
                //小马托福券
                quan.title = '作文已保存，名师写作批改1次需要' + Final.XIEZUO_PRICE + '元，可使用' + quan.useCount
                    + '张价值' + Final.COUPON_PRICE + '元的小马托福券，还需支付' + quan.actualPay + '元';
            }
            return quan;
        }
    };

    /*下单，韩瑜接口*/
    var placeOrder = function (e) {
        $('#waitPayModal').modal('hide');
        var obj = e.data.obj, questionId = obj.questionId;
        var param = {
            url: URL.baseURL10 + "web/addCorrectOrder.action",
            type: "POST",
            async: false,
            data: {
                token: tokenTmp,
                id: Final.CHONGCI_XIEZUO_ID,
                answerId: obj.answerId,
                coupon: obj.coupon
            }
        };
        var newWindowUrl = '';
        var promise = sendAjax(param);
        promise.then(function (json) {
            //下单成功。 status(0:成功,1:失败)
            if (json.status == 0 && json.result) {
                //免支付状态，不跳转到支付页面，直接刷新列表（用户使用了批改服务）
                //orderStatus == 1表示免支付
                if (json.result.orderInfo.orderStatus == 1) {
                    $('.modal-backdrop').hide();
                    /*刷新列表*/
                    var params = {};
                    params.category = $('#go2').attr('category');
                    params.questionId = questionId;
                    params.type = 1;//待批改
                    showAnswerList(params);
                    //刷新右侧列表
                    reloadQuestions();
                } else {
                    //弹层提示支付
                    $('#payModel').modal({
                        backdrop: 'static'
                    });
                    $('#payModel').off('hidden.bs.modal').on('hidden.bs.modal', function (e) {
                        /*刷新列表*/
                        var params = {};
                        params.category = $('#go2').attr('category');
                        params.questionId = questionId;
                        params.type = 3;//已保存
                        showAnswerList(params);
                        //刷新右侧列表
                        reloadQuestions();
                    });
                    //去支付的地址
                    newWindowUrl = '../shoppingcenter/html/pigai.html#' + json.result.orderInfo.orderNum;
                }
            } else {
                //下单失败
                write_showErrorTip({content: json.message});
                $('#write_errorTip').on('hidden.bs.modal', function (e) {
                    //加载列表
                    var params = {};
                    params.category = $('#go2').attr('category');
                    params.questionId = questionId;
                    params.type = 3;//已保存
                    showAnswerList(params);
                    //刷新右侧列表
                    reloadQuestions();
                });
            }
        });
        //去支付的地址
        if (newWindowUrl) {
            window.open(newWindowUrl, '_blank');
        }
    };

    /*获取用户的赠券以及规则，韩瑜的接口*/
    var getUserCoupon = function () {
        arrService = [];
        arrCoupon = [];
        var param = {
            url: URL.baseURL10 + "order/myCoupon.action",
            type: "POST",
            data: {
                token: tokenTmp,
                id: Final.CHONGCI_XIEZUO_ID
            }
        };
        var promise = sendAjax(param);
        promise.then(function (json) {
            //status(0:成功,1:失败)
            if (json.status == 0 && json.result) {

                $.each(json.result, function (i, item) {
                    //名师批改券（价值60）
                    if (item.couponId == Final.PIGAI_QUAN_ID) {
                        arrService.push(item);
                    } else if (item.couponId == Final.TUOFU_QUAN_ID) {
                        //小马托福券（价值40）
                        arrCoupon.push(item);
                    }
                });
            }
        });
    };

    /*视频播放*/
    var playDemoVideo = function(source) {
        $('#playDemoVideo').modal({
            backdrop: 'static'
        });
        var content = '<script src="http://p.bokecc.com/player?vid=' + source
            + '&siteid=B86E9AC935D39444&autoStart=true&width=720&height=420&playerid=3B89CC3CB774B9A8&playertype=1" type="text/javascript"></script>';
        $("#divVideo").html(content);
    };

    /**
     * 操作信息提示框
     * @param data
     */
    var write_showErrorTip = function (data) {
        if (data && data.content) {
            $("#write_errorMsg").html(data.content);
        }
        $("#write_errorTip_sure").off("click").on("click", function () {
            $("#write_errorTip").modal("hide");
        });
        $('#write_errorTip').on('hidden.bs.modal', function (e) {
            //加载列表
            var params = {};
            params.questionId = $('#articleSubmit').attr("question_id");
            params.type = 1;
            params.category = $('#articleSubmit').attr('category');
            //showAnswerList(params);
        });
        $("#write_errorTip").modal();
    };

    //加载右侧列表
    var reloadQuestions = function () {
        if ($('#jijing_question_id').attr('from') == 'home') {
            $.ajax({
                url: URL.baseURL + 'hot_exercises',
                headers: {
                    "Authorization": tokenTmp
                },
                type: 'get',
                success: function (json) {
                    var renderData = {};
                    if (section == 'hotPG') {
                        currentQuestions = buildWriteData(json.writing_questions); //保存当前下载题目
                    } else {
                        currentQuestions = buildWriteData(json.forecast_writings); //保存当前下载题目
                    }
                    renderData.questions = currentQuestions;
                    Render.render({
                        wrap: $('#rightitems'),
                        tmpl: {
                            tmplName: 'app/chongci/tmpl_write_detail_right',
                            tmplData: renderData
                        }
                    });
                    // hotJJRenderData = buildWriteData(json.forecast_writings);
                }
            });
            return;
        } //结束

        var category = $('#jijing_question_id').attr('category');
        var url;
        var data;
        //历年真题
        if (category == 'wsl') {
            url = URL.baseURL + "jijing_questions";
            data = {
                id: currentZTGroupId,
                question_type: 2,
                new_version: 1
            };
        } else {
            url = URL.baseURL + "jijing_groups/yuce";
            data = {
                question_type: 2,
                new_version: 1
            };
        }
        $.ajax({
            url: url,
            type: 'get',
            data: data,
            dataType: "json",
            headers: {
                "Authorization": tokenTmp
            },
            success: function (json) {
                var questionsArray = new Array();
                var renderData = {};
                $.each(json.jijing_questions, function (key, val) {
                    var tmp = {};
                    tmp.id = val.id;
                    tmp.content = val.content;
                    tmp.sequence_number = val.sequence_number;
                    tmp.title = val.title;
                    tmp.answer_id = val.answer_id;
                    tmp.category = category;
                    tmp.type = val.type;
                    tmp.score = val.score;
                    questionsArray.push(tmp);
                });
                currentQuestions = questionsArray; //保存当前下载题目
                renderData.questions = currentQuestions;
                Render.render({
                    wrap: $('#rightitems'),
                    tmpl: {
                        tmplName: 'app/chongci/tmpl_write_detail_right',
                        tmplData: renderData
                    }
                });
            }
        });
    };

    /**
     * 提交写作内容
     * */
    var articleSubmit = function () {
        var aContent = $('#articleAnswer').val();
        if (!validWordsCount(aContent, 200, "than")) {
            write_showErrorTip({content: "最少输入200个单词"});
            return;
        }
        if (!validWordsCount(aContent, 700, "less")) {
            write_showErrorTip({content: "最多输入700个单词"});
            return;
        }
        if (!BaseCookie.getToken()) {
            $('#dialogLogin').modal({
                backdrop: 'static'
            });
            $('#dialogLogin').on('hidden.bs.modal', function (e) {
                BaseCookie.get();
                if (BaseCookie.getToken()) {
                    tokenTmp = BaseCookie.getToken();
                    user_id = BaseCookie.getId();
                    reloadQuestions();
                    //callback_submit()
                }
            });
            return;
        }
        //保存写作内容
        write_saveOpration();

    };

    var showjijingSample = function () {
        $("#jijingSampleDiv").toggle();
    };

    //参考范例
    var jijingSample = function () {
        if (!tokenTmp) {
            var sampleContent = '';
            $("#sampleContent").html(sampleContent);
            $("#jijingSampleDiv").toggle();
            return;
        }
        $("#jijingSample").hide();
        var jijing_question_id = $("#jijing_question_id").attr('jqid');
        $.ajax({
            url: URL.baseURL + "jijing_samples",
            type: 'get',
            data: {
                jijing_question_id: jijing_question_id
            },
            dataType: "json",
            headers: {
                "Authorization": tokenTmp
            },
            success: function (json) {
                if (json.jijing_samples && json.jijing_samples.length > 0) {
                    $("#jijingSample").show();
                    $("#sampleContent").html(json.jijing_samples[0].content.replace(/\n/g, "<br>"));

                } else {
                    $("#jijingSample").hide();
                }
                //$("#jijingSampleDiv").toggle();
            }
        });

    };

    var menuToggle = function () {
        $("#side2").addClass('sidebarLight');
        $('.sidebar-ul').find('a.sidebarLight').removeClass('sidebarLight');
        $('.sidebar-ul').find('li.sidebarLight').removeClass('sidebarLight');
        $("#side1").parent().siblings().find(".sidebarLight").removeClass('sidebarLight');
        // $("#listen_menu_div").slideUp('fast');
        $("#wirte_menu_div").toggle()
        if ($('#wirte_menu_div').css('display') == "none") {
            $("#writeImg").attr("src", "../../i/side-ang1.png");
        } else {
            $("#writeImg").attr("src", "../../i/side-ang.png");
        }
        $("#wirte_menu_div1 li").removeClass('sidebarLight');
        $("#side2").click(); //默认定位写作机经
    };

    var menuToggleWrite = function () {
        $('.sidebar-ul').find('a.sidebarLight').removeClass('sidebarLight');
        $('.sidebar-ul').find('li.sidebarLight').removeClass('sidebarLight');
        $("#side1").parent().siblings().find(".sidebarLight").removeClass('sidebarLight');
        // $("#listen_menu_div").slideUp('fast');
        $("#wirte_menu_div").toggle()
        if ($('#wirte_menu_div').css('display') == "none") {
            $("#writeImg").attr("src", "../../i/side-ang1.png");
        } else {
            $("#writeImg").attr("src", "../../i/side-ang.png");
        }
        $("#wirte_menu_div1 li").removeClass('sidebarLight');
        $('#side9').click()
    };
    var menuToggleWriteLiNian = function () {
        $('.sidebar-ul').find('a.sidebarLight').removeClass('sidebarLight');
        $('.sidebar-ul').find('li.sidebarLight').removeClass('sidebarLight');
        $("#side1").parent().siblings().find(".sidebarLight").removeClass('sidebarLight');
        // $("#listen_menu_div").slideUp('fast');
        $("#wirte_menu_div").toggle()
        if ($('#wirte_menu_div').css('display') == "none") {
            $("#writeImg").attr("src", "../../i/side-ang1.png");
        } else {
            $("#writeImg").attr("src", "../../i/side-ang.png");
        }
        $("#wirte_menu_div1 li").removeClass('sidebarLight');
        $('#side3').click()
    };

    var parseClass=function(scoreFinal){
        var starClass='';
        scoreFinal = parseFloat(scoreFinal);
        if (!scoreFinal || scoreFinal <= 0) {
            starClass = 'cs_0';
        } else if (scoreFinal > 0 && scoreFinal <= 0.5) {
            starClass = 'cs_w0dian5';
        } else if (scoreFinal <= 1) {
            starClass = 'cs_w1';
        } else if (scoreFinal <= 1.5) {
            starClass = 'cs_w1dian5';
        } else if (scoreFinal <= 2) {
            starClass = 'cs_w2';
        } else if (scoreFinal <= 2.5) {
            starClass = 'cs_w2dian5';
        } else if (scoreFinal <= 3) {
            starClass = 'cs_w3';
        } else if (scoreFinal <= 3.5) {
            starClass = 'cs_w3dian5';
        } else if (scoreFinal <= 4) {
            starClass = 'cs_w4';
        } else if (scoreFinal <= 4.5) {
            starClass = 'cs_w4dian5';
        } else {
            starClass = 'cs_w5';
        }
        return starClass;
    };

    var formatDate = function (date, fmt) {
        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt))
        {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o){
            if (new RegExp("(" + k + ")").test(fmt))
            {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    };

    var login = function () {
        $('#dialogLogin').modal({
            backdrop: 'static'
        });
    };


    var go1 = function () {
        $('#leftDiv').hide();
        $("#side2").click();
        $("#side").css("display", "block");

    };
    var go2 = function () {
        $('#leftDiv').hide();
        var category = $(this).attr("category");
        if (category == 'wjj') {
            $("#side2").click();
        } else {
            $("#side3").click();
        }
        $("#side").css("display", "block");

    };

    var getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    };

    var buildWriteData = function (json) {
        var hot_exercises = json.hot_exercises;
        var result = new Array();
        $.each(hot_exercises, function (key, val) {
            var tmp = {};
            tmp.id = val.id;
            tmp.content = val.content;
            tmp.sequence_number = val.sequence_number;
            tmp.title = val.title;
            tmp.answer_id = val.answer_id;
            tmp.category = 'wjj';
            tmp.type = val.type;
            tmp.score = val.score;
            result.push(tmp);
        });
        return result;
    };

    var toDoRender = function () {
        var param = {
            "tmplName": 'app/tmpl_todo',
            "tmplData": '',
            "afterRender": ''
        };
        renderTemplate(param)
    };

    var renderTemplate = function (param) {
        Render.render({
            wrap: param.wrap || $wrap,
            tmpl: {
                tmplName: param.tmplName,
                tmplData: param.tmplData
            },
            afterRender: param.afterRender
        })
    };

    return {
        init: init
    };

});