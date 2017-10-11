'use strict';
/*
 group_level为3或4时可以解锁以下关
 */
define(['common/render', 'app/baseURL', 'baseCookie', 'lib/store'], function(Render, URL, BaseCookie) {
    var token = undefined;
    var reg = /(^\s+)|(\s+$)/g;
    var flag = true; //标记是否曾经看过一次答案
    var allStage, allStageCN, en, ch, subject, index, allRate, allParagraphIds;
    var subId; //问题的id，就是整篇的id
    var startTime = 0; //整篇开始做的时间
    var testTimerID; //计时器ID
    var currentTestTimeStr; //当前时间字符串，用于下一题同步显示时间
    var pianStrArray; //和用户答案对比后的范文结果
    var questionList = []; //关卡信息列表
    //找到最大的那个已经解锁关卡的序号num(感觉id不靠谱，因为它不一定是按顺序排的)
    //msg.current_question_id：当前需要到达级别4的id(也就是当前解锁到的关卡)
    var currentBiggestUnlockNum = 1;
    var durationTime = 0; //计时时间
    var list_status = 0; //是否购买全日制(1:购买了)

    var _conf,
        $wrap,
        TMPL = {
            list: 'app/exercise/tmpl_rewrite_1_list',
            muban: 'app/exercise/tmpl_rewrite_3_reader_tmplate',
            fuxie: 'app/exercise/tmpl_rewrite_4_copy_tmplate',
            duan_result: 'app/exercise/tmpl_rewrite_5_duan_result',
            next: 'app/exercise/tmpl_rewrite_6_next',
            pian_result: 'app/exercise/tmpl_rewrite_7_pian_result_tmplate',
            login: 'app/exercise/tmpl_rewrite_login'
        };
    var xm_questionId="";
    var xm_planDayId="";
    var xm_exerciseId="";
    var xm_startTime="";
    var xm_endTime="";
    var xm_title="";
    //var xiaomaToken = "bearer b23b2aad4b8543f1a5c0c5ef5ea74182";
    var init = function(conf) {
        _conf = $.extend({
            wrap: ''
        }, conf || {});
        $wrap = $(_conf.wrap);
        BaseCookie.get();
        token = BaseCookie.getToken();
        initEvent();
        //document.body.onselectstart=function(){return false;};
    };

    var highLightNav = function() {
        $('.sidebar-ul').find('a.sidebarLight').removeClass('sidebarLight');
        $('.sidebar-ul').find('li.sidebarLight').removeClass('sidebarLight');
        $("#side4").addClass('sidebarLight');
        $("#side4").parent().siblings().find(".sidebarLight").removeClass('sidebarLight');
    };

    var initEvent = function() {
        var $document = $(document);
        $(document).on('click','#showMorePlan',function(){
            $('#morePlan').show();
        });
        //$document.on('click', '#side4', list);
        //$document.on('click', '.showDetail', lookModelEssay);
        //$document.on('trigger-detail', '.showDetail', lookModelEssay);
        //$document.on('click', '#btnReader', reader)
        $document.on('click', '#btnExerciseStage', copy);
        $document.on('click', '#btnExercisePiece1', copy);
        $document.on('click', '#btnSubmit1', submit);
        $document.on('click', '#btnNext', next);
        $document.on('click', '#btnNextRewrite', nextSubject);

        $document.on('click', '#showAnswer', showAnswer);
        //$document.on('click', '#duan,#pian', dpfn);
        $document.on('click', '#btnen1', btnen);
        $document.on('trigger-btnen', '#btnen', btnen);
        //$document.on('trigger_side4', '#side4', list);
        $document.on('click', '#rewriteLogin', rewriteLogin);
        $document.on('click', '#btnAgainRewrite1', doAgainPian);
        $document.on('click', '#btnDuanAgain', doAgainDuan);
        $document.on('click', '.time-pos1', showHideTimer);
        //$document.on('click', '.default-cursor', lockUnitTip);
        //$document.on('keyup', '#userContent', function () {
        //    if (firstHeight < this.scrollHeight) {
        //        $(this).height(this.scrollHeight);
        //        firstHeight = this.scrollHeight;
        //    }
        //});
    };

    //显示中英文
    var btnen = function() {
        flag = false;
        if (dp == "duan") {
            if ($(this).attr('data') == 'cn') {
                $("#duanAns").css("display", "block");
                $("#pianAns").css("display", "none");
                $("#piancn1").css("display", "none");
                $("#piancn").css("display", "none");
                $(this).attr('data', 'en');
                $(this).html('中文<span class="all-blue">（点击返回中文）</span>');
                $("#userContent").attr("disabled", "disabled")
            } else {
                $("#piancn1").css("display", "none");
                $("#pianAns").css("display", "none");
                $("#piancn").css("display", "block");
                $("#duanAns").css("display", "none");
                $(this).attr('data', 'cn');
                $(this).html('英文<span class="all-blue">（查看将不判断成绩）</span>');
                $("#btnSubmit1").removeAttr("disabled");
            }

        } else {
            if ($(this).attr('data') == 'cn') {
                $("#duanAns").css("display", "none");
                $("#pianAns").css("display", "block");
                $("#piancn1").css("display", "none");
                $("#piancn").css("display", "none");
                $(this).attr('data', 'en');
                $(this).html('隐藏模板').next().html("");
                $("#userContent").attr("disabled", "disabled").text("隐藏模板后才能输入哦~");
                $("#btnSubmit1").attr("disabled", "disabled");
            } else {
                $("#piancn1").css("display", "block");
                $("#pianAns").css("display", "none");
                $("#piancn").css("display", "none");
                $("#duanAns").css("display", "none");
                $(this).attr('data', 'cn');
                $(this).html('查看模板').next().html('查看后将不判断成绩');
                $("#userContent").removeAttr("disabled").text("");
                $("#btnSubmit1").removeAttr("disabled");
            }
        }
    };

    var rewriteLogin = function() {
        $('#dialogLogin').modal({
            backdrop: 'static'
        });
    };

    var getUrlParam = function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    };

    var allMsg; //全部的题
    var nextNum = 0; //下一题

    //列表页
    var list = function() {
        BaseCookie.get();
        token = BaseCookie.getToken();
        if ("" == token || null == token) {
            token = "xiaoma"
        }
        flag = true;
        highLightNav();
        resetDefault();
        if (store && store.get('redirectObj')) {
            var obj = store.get('redirectObj');
            showDetail("", {
                'id': obj.id,
                'sequence_number': obj.sequence_number,
                'content': obj.content,
                'content_ch': obj.content_ch
            });
            store.remove('redirectObj');
        } else {
            var _success = function(msg) {
                //是否购买了全日制解锁
                list_status = msg.list_status;

                for (var j = 0, len = msg.reproduction_questions.length; j < len; j++) {
                    if (msg.reproduction_questions[j].id == msg.current_question_id) {
                        currentBiggestUnlockNum = parseInt(msg.reproduction_questions[j].sequence_number);
                        break;
                    }
                }

                $.each(msg.reproduction_questions, function(index, value) {
                    value.allContent = value.content;
                    if (value.content && value.content.length > 160) {
                        value.content = value.content.substring(0, 160) + '…';
                    }
                    //最新一个解锁关卡后面的全部上锁
                    if (parseInt(value.sequence_number) > currentBiggestUnlockNum) {
                        if (value.top_score) {
                            //设置小旗子图片
                            if (value.group_level == 0) {
                                value.imgflagUrl = '../../i/newimg-0.png';
                            } else if (value.group_level == 1) {
                                value.imgflagUrl = '../../i/newimg-4.png';
                            } else if (value.group_level == 2) {
                                value.imgflagUrl = '../../i/newimg-1.png';
                            } else if (value.group_level == 3) {
                                value.imgflagUrl = '../../i/newimg-2.png';
                            } else if (value.group_level == 4) {
                                value.imgflagUrl = '../../i/newimg-3.png';
                            }
                        } else {
                            //上锁
                            value.isLock = true;
                            value.imgflagUrl = '../../i/side-pic42.png';
                        }
                    } else if (parseInt(value.sequence_number) == currentBiggestUnlockNum) {
                        //正解锁到这个关卡
                        value.imgflagUrl = '../../i/newimg-0.png';
                        //设置小旗子图片
                        if (setSmallImgUrl(value) == 'nodone') {
                            //如果当前这个最新的解锁关卡还没做过，则不显示小旗子
                            value.biggestUnlockNoDone = true;
                        }
                        if (value.group_level < 3) {
                            //当前这个关卡没有达标，不允许到下一关(按段练习时判断能否到下一篇使用)
                            value.isLockNextGroup = true;
                        }
                    } else {
                        //设置小旗子图片
                        setSmallImgUrl(value);
                    }
                });
                //将关卡列表存储到全局中
                questionList = msg.reproduction_questions;
                //显示列表
                //renderTemplate({
                //    tmplName: TMPL.list,
                //    tmplData: msg,
                //    afterRender: function() {
                //        allMsg = msg.reproduction_questions;
                //    }
                //})
                lookModelEssay("");
            };
            if (!token) {
                token = "xiaoma";
            }
            if (token) {
                $.ajax({
                    url: URL.baseURL + "reproduction_questions",
                    type: 'GET',
                    data: {
                        from: 'web',
                        new_version: 1
                    },
                    headers: {
                        Authorization: token
                    },
                    success: _success,
                    error: function() {}
                })
            }
        }
    };

    //第几篇文章的索引
    //点击列表item的时候，该值生效
    var who;
    //下一篇
    var nextSubject = function() {
        $('#btnNextRewrite').attr('disabled', true);
        if (!token) {
            var param = {
                "tmplName": TMPL.login,
                "tmplData": ""
            };
            renderTemplate(param);
            return false
        }
        var nextIndex = parseInt(who) + 1;
        //首页跳过来的时候没有allMsg（所有的题）,重新获得一次
        var getAllMsg = function() {
            $.ajax({
                url: URL.baseURL + "reproduction_questions",
                type: 'GET',
                async: false,
                data: {
                    from: 'web',
                    new_version: 1
                },
                headers: {
                    Authorization: token
                },
                success: function(msg) {
                    allMsg = msg.reproduction_questions;
                },
                error: function() {
                    list();
                }
            })
        };
        if (!allMsg) {
            allMsg = [];
            getAllMsg();
        }

        if (nextIndex < allMsg.length) {
            lookModelEssay('', allMsg[nextIndex]);
        } else {
            list();
        }

    };

    //标识
    var dp = "duan";
    var piancn, pianen;

    //查看范文或显示结果页
    var lookModelEssay = function(e, obj) {
        var id, num, content, ch,
            top_score, //此篇的分数
            avg_speed, //此篇的平均速度
            group_level; //单元level，null表示未做，0没有达到级别，1:正确率以到达90%,2:速度到达级别

        //绑定控件时调用
        if (arguments.length == 1) {
            var $this = $(e.target);
            if (!$this.attr('data-id')) {
                $this = $this.parents('p[data-id]');
            }

            //id = $this.attr('data-id');
            //num = $this.attr('data-num');
            //content = $this.find('span.disContent').html();
            //subId = id;
            //top_score = $this.attr('top_score');
            //group_level = $this.attr('group_level');
            //avg_speed = $this.attr('avg_speed');
            /*20160901*/
            id="1";
            num="1";
            content="Do you agree or disagree: students who keep their rooms neat and organized will be more likely to succeed than students who do not.";
            subId="1";
            top_score="";
            group_level="";
            avg_speed="";
        } else if (arguments.length == 2) {
            //其他方法调用
            id = obj.id;
            num = obj.sequence_number;
            content = obj.allContent;
            group_level = obj.group_level;
            subId = id;
        }
        who = num - 1; //第几篇文章的索引
        subject = content;
        index = num - 1;

        if (id && token) {
            $.ajax({
                url: URL.baseURL + "reproduction_questions/" + id,
                type: 'GET',
                headers: {
                    Authorization: token
                },
                success: _success
            })
        } else {
            $.ajax({
                url: '/j/app/data/rewrite' + num + '.json',
                type: 'GET',
                success: _success
            })
        }

        function _success(msg) {
            var showType;
            window.scrollTo(0, 0);
            //将接口返回数据分类到各个数组中
            joinStage(msg.reproduction_samples);
            //判断之前做过的类型（按篇做的/按段做的）
            showType = isBeforeDone(group_level);

            //上次是按篇做的
            if (showType == 'done_pian') {
                var arrMyAnswers = [];
                if (msg.answer_content) {
                    arrMyAnswers = msg.answer_content.split('\n');
                    //计算用户上次按篇的做题结果
                    getPianScore(msg.answer_content);
                } else {
                    //如果用户答案为空，则范文为原未处理的范文
                    pianStrArray = allStage;
                }

                //设置小旗子图片
                //如果查看过范文答案则不计算正确率和时间(1:看答案,2:没看答案)
                setSmallImgUrl(msg);

                //判断结果页大图
                if (msg.question_rate < 50) {
                    msg.imgBigUrl = '../i/i23.png';
                }
                if (msg.question_rate >= 50 && msg.question_rate <= 80) {
                    msg.imgBigUrl = '../i/i22.png';
                }
                if (msg.question_rate > 80 && msg.question_rate < 100) {
                    msg.imgBigUrl = '../i/i21.png';
                }
                if (msg.question_rate == 100) {
                    msg.imgBigUrl = '../i/i24-1.png';
                }
                //如果查看过答案则不计算
                if (msg.is_look_answer == 1) {
                    //结果页小图
                    msg.imgflagUrl = '../i/newimg-0.png';
                    //结果页大图
                    msg.imgBigUrl = '../i/i30.png';
                    msg.question_rate = '0';
                    msg.avg_speed = '0S';
                }

                msg.question_rate = msg.question_rate ? (parseFloat(msg.question_rate).toFixed(2)) : 0;
                if (msg.question_rate - parseInt(msg.question_rate) == 0) {
                    //如果数值是整数则去掉整数后面的.00
                    msg.question_rate = parseInt(msg.question_rate);
                }
                if (msg.question_rate > 100) {
                    msg.question_rate = 100;
                } else if (msg.question_rate < 0) {
                    msg.question_rate = 0;
                }
                var renderData = {
                    'xm_title':xm_title,
                    'subject': subject,
                    'index': index,
                    'allUserContent': arrMyAnswers,
                    'en': pianStrArray,
                    'score': msg.question_rate,
                    'spend_time': msg.avg_speed,
                    'group_level': msg.group_level,
                    'imgflagUrl': msg.imgflagUrl, //小旗子
                    'imgBigUrl': msg.imgBigUrl, //结果大图
                    'isLockNextGroup': msg.group_level < 3 ? true : false
                };
                renderData.isBest = true; //直接进入结果页，显示最好成绩
                renderData.isFromPlan=exerciseApi.isFromPlan;

                ////达标了，但是之前做过的且在最大解锁关卡之外的默认不能下一题，但是如果它的下一题做过则可下一题
                //if (msg.group_level > 2) {
                //    //达标了可以去下一关
                //    renderData.isLockNextGroup = false;
                //    //如果老用户在最大解锁关卡外做过（照顾老用户的做题记录）
                //    if (num > currentBiggestUnlockNum) {
                //        //禁止去下一关
                //        renderData.isLockNextGroup = true;
                //        //判断下一题是否已经做过
                //        $.each(questionList, function(i, o) {
                //            if (id == o.id && questionList[i + 1]) {
                //                //下一题未做过
                //                if (questionList[i + 1].top_score) {
                //                    //禁止去下一关
                //                    renderData.isLockNextGroup = false;
                //                }
                //            }
                //        });
                //    }
                //} else {
                //    //禁止去下一关
                //    renderData.isLockNextGroup = true;
                //}
                ////是否购买全日制，1：解锁(已购买)，0未解锁
                //if (list_status == 1) {
                //    //可以去下一关
                //    renderData.isLockNextGroup = false;
                //}20160913

                //group_level=（0,1,2）表示已做过段或篇
                //呈现上次按篇做的结果页
                renderTemplate({
                    tmplName: TMPL.pian_result,
                    tmplData: renderData
                });
            } else {
                var duanClass = [];
                $.each(allRate, function(i, n) {
                    if (n < 50) {
                        duanClass.push('bred');
                    } else if (n >= 50 && n < 80) {
                        duanClass.push('borange');
                    } else if (n >= 80 && n < 100) {
                        duanClass.push('bgreen');
                    } else {
                        duanClass.push('bblue');
                    }
                });
                //呈现范文页
                renderTemplate({
                    tmplName: TMPL.muban,
                    tmplData: {
                        'xm_title':xm_title,
                        'en': allStage,
                        'ch': allStageCN,
                        'rate': allRate,
                        'duanClass': duanClass,
                        'subject': subject,
                        'index': index
                    }
                });
            }
        }
    };

    //是否按篇做过，或者按段做过
    var isBeforeDone = function(group_level) {
        //一篇中的某一段是否已经做过(默认值false)
        var stageDone = false;
        $.each(allRate, function(i, val) {
            if (val != null&&val!="") {
                //已经做过
                stageDone = true;
            }
        });
        if (stageDone) {
            //做过段
            return 'done_duan';
        } else if (!isNaN(parseInt(group_level))) {
            //做过篇
            return 'done_pian';
        } else {
            //都没做过
            return false;
        }
    };

    //再来一遍(篇)
    var doAgainPian = function() {
        renderTemplate({
            tmplName: TMPL.muban,
            tmplData: {
                'xm_title':xm_title,
                'en': allStage,
                'ch': allStageCN,
                'rate': allRate,
                'subject': subject,
                'index': index
            }
        });
    };

    //再来一遍(段)
    var doAgainDuan = function() {
        //显示下一段复写内容
        renderTemplate({
            tmplName: TMPL.fuxie,
            tmplData: {
                'xm_title':xm_title,
                "en": allStage[where],
                "cn": allStageCN[where],
                "enAll": allStage,
                "cnAll": allStageCN,
                'subject': subject,
                'index': index
            },
            afterRender: function() {
                durationTime = 0; //计时时间间隔（单位秒）
                startTimer();
            }
        });
    };

    var showAnswer = function() {
        $(".ans").toggle();
        if ($('.ans').css('display') == 'none') {
            $('#showAnswer').html('查看翻译')
        } else {
            $('#showAnswer').html('隐藏翻译')
        }
    };

    var where = 0; //默认第一段，表示第几段
    var userContent; //用户复写内容
    var sureAns; //第几（一）段正确答案
    var userContent1;
    var sureAnsLen = 0;
    var userAnsLen = 0;
    var reg = /[^A-Z0-9a-z'\-]/g;
    var duanStr;

    //计算段的正确率
    var getDuanScore = function() {

        sureAns = allStage[where];
        sureAns = sureAns.replace(reg, " ").replace(/\s+/g, " ").trim().split(' ');
        userContent1 = userContent = $("#userContent").val();
        userContent = userContent.replace(reg, " ").replace(/\s+/g, " ").trim().split(' ');

        var sureNum = 0;
        var rt = new Array();
        // var b = lcsLength(x,y);
        var b = lcsLength(sureAns, userContent);
        printLcs(b, sureAns, userContent, sureAns.length, userContent.length, rt);
        sureNum = rt.length;
        userAnsLen += sureNum;
        duanStr = "";

        var ss = allStage[where];
        var start = 0;
        var end = 0;
        for (var i = 0; i < rt.length; i++) {
            end = ss.indexOf(rt[i], start);
            if (ss.substring(start, end).trim().replace(reg, "") != "") {
                duanStr += "<font color='red' style='font-size:14px;color:red;'>" + ss.substring(start, end) + "</font>";
            } else {
                duanStr += ss.substring(start, end);
            }
            duanStr += rt[i];
            start = end + rt[i].length;
        }
        if (ss.substring(start).trim().replace(reg, "") != "") {
            duanStr += "<font color='red' style='font-size:14px;color:red;'>" + ss.substring(start) + "</font>";
        } else {
            duanStr += ss.substring(start);
        }

        var duanScore = parseInt(sureNum) / parseInt(sureAns.length) * 100;
        return duanScore ? parseFloat(duanScore).toFixed(2) : 0;
    };

    //处理列表数据到各个数组中
    var joinStage = function(ary) {
        en = '', ch = '';
        if ($.isArray(ary) && ary.length > 0) {
            len = ary.length;
            allStage = [];
            allStageCN = [];
            allRate = [];
            allParagraphIds = [];
            for (var i = 0, l = ary.length; i < l; i++) {
                en += ary[i].en;
                ch += ary[i].ch;
                allStage.push(ary[i].en);
                allStageCN.push(ary[i].ch);
                allRate.push(ary[i].rate);
                allParagraphIds.push(ary[i].id);

            }
            sureAnsLen = getSureAnsLen();
        }
    };

    var len; //总段数
    //var allUserContent = [];

    //开始复写
    var copy = function() {
        durationTime = 0; //计时时间间隔（单位秒）
        dp = $(this).attr('data-type');

        renderTemplate({
            tmplName: TMPL.fuxie,
            tmplData: {
                'xm_title':xm_title,
                "en": allStage[where],
                "cn": allStageCN[where],
                "enAll": allStage,
                "cnAll": allStageCN,
                'subject': subject,
                'index': index
            },
            afterRender: function() {
                resetDefault();
                //计时开始
                startTimer();
                if (dp == "pian") {
                    $("#piancn").hide();
                    $("#duanAns").hide();
                    $("#pianAns").hide();
                    $("#piancn1").show();
                } else if (dp == "duan") {
                    $("#piancn1").hide();
                    $("#pianAns").hide();
                    $("#duanAns").hide();
                    $("#piancn").show();
                }
                $(this).attr('data', 'cn');
                /*//初始化输入框高度
                 var objContent = document.getElementById('userContent');
                 if (objContent) {
                 firstHeight = objContent.scrollHeight;
                 }*/
            }
        });

    };

    //提交
    var submit = function() {
        if (dp == "duan") {
            renderDuan()
        }
        if (dp == "pian") {
            renderPian()
        }
    };

    //计算整篇的成绩
    var getPianScore = function(userInput) {
        var userContent = userInput.replace(reg, " ").replace(/\s+/g, " ").trim().split(' ');
        //结果数组
        pianStrArray = [];
        var totalAnswerArray = new Array();
        for (var i = 0; i < allStage.length; i++) {
            var answerArray = allStage[i].replace(reg, " ").replace(/\s+/g, " ").trim().split(' ');
            totalAnswerArray = totalAnswerArray.concat(answerArray);
        }
        //计算结果
        var rt = new Array();
        var b = lcsLength(totalAnswerArray, userContent);
        printLcs(b, totalAnswerArray, userContent, totalAnswerArray.length, userContent.length, rt);
        //拼接结果字符串
        var point = -1;
        for (var i = 0; i < allStage.length; i++) {
            var ss = allStage[i];
            var start = 0;
            var end = 0;
            var pianStr = "";
            for (var j = point + 1; j < rt.length; j++) {
                end = ss.indexOf(rt[j], start);
                if (end == -1) {
                    break;
                } else {
                    point = j;
                }
                if (ss.substring(start, end).trim().replace(reg, "") != "") {
                    pianStr += "<font color='red' style='color:red;font-size:14px;'>" + ss.substring(start, end) + "</font>";
                } else {
                    pianStr += ss.substring(start, end);
                }
                pianStr += rt[j];
                start = end + rt[j].length;
            }
            if (ss.substring(start).trim().replace(reg, "") != "") {
                pianStr += "<font color='red' style='color:red;font-size:14px;'>" + ss.substring(start) + "</font>";
            } else {
                pianStr += ss.substring(start);
            }
            // pianStr += "<font color='red'>" + ss.substring(start) + "</font>";
            pianStrArray.push(pianStr);

        }
        var duanScore = rt.length / parseInt(totalAnswerArray.length) * 100;
        return duanScore ? parseFloat(duanScore).toFixed(2) : 0;
    };

    //提交整篇的复写
    var renderPian = function() {
        //if (!BaseCookie.getToken()) { //判断是否匿名
        //    clearTimer(); //弹出登录层暂停时间
        //    $('#dialogLogin').modal({
        //        backdrop: 'static'
        //    });
        //    $('#dialogLogin').on('hidden.bs.modal', function(e) {
        //        BaseCookie.get();
        //        if (BaseCookie.getToken()) {
        //            token = BaseCookie.getToken()
        //        }
        //        startTimer();
        //    });
        //    return;
        //}20160913
        clearTimer();//20160914
        var strUserInputContent = $('#userContent').val();
        //复写整篇使用的时间
        var strSpendtime,
            spend_time = 0,
            score = 0;
        //用户没有查看答案
        if (flag) {
            spend_time = durationTime;
            //说明：getPianScore方法计算分数，并把错误的内容标红赋给pianStrArray变量
            score = getPianScore(strUserInputContent);
        } else {
            //范文
            pianStrArray = allStage;
        }
        //如果结果是整数，则不显示后面的.00
        if (score - parseInt(score) == 0) {
            score = parseInt(score);
        }
        if (score > 100) {
            score = 100;
        } else if (score < 0) {
            score = 0;
        }

        //禁止提交按钮
        $('#btnSubmit1').attr('disabled', true);
        //is_look_answer=1:看答案,2:没看答案
        //var date=new Date($.ajax({async: false}).getResponseHeader("Date"));
        var date=getTime();
        xm_endTime=zeroFn(date.getFullYear())+"-"+zeroFn((date.getMonth()+1))+"-"+zeroFn(date.getDate())+" "+zeroFn(date.getHours())+":"+zeroFn(date.getMinutes())+":"+zeroFn(date.getSeconds());
        date=null;
        $.ajax({
            //url: URL.baseURL5 + "reproduction_sample_results",
            url: URL.xiaomaURL + "api/memory_sample_results",
            type: 'POST',
            contentType: "application/json",
            headers: {
                Authorization: exerciseApi.xiaomaToken
            },
            data: JSON.stringify({
                "answer_content":strUserInputContent,
                "endTime":xm_endTime,
                "exerciseId":xm_exerciseId,
                "is_look_answer": (flag ? 2 : 1),
                "new_version": 2, //具体没啥意义（加解锁功能后增加）
                "planDayId":xm_planDayId,
                "question_rate":score,
                "reproduction_question_id": subId,
                "spend_time": spend_time,
                "startTime":xm_startTime
            }),
            success: function(msg) {
                exerciseApi.updateListItem();
                msg= $.parseJSON(msg);
                if (!msg) {
                    //用户第一次做题同时查看答案后接口不返回任何东西
                    msg = {};
                }
                //var is_reward_coupon = msg.is_reward_coupon20160914;
                //用户没有查看答案(flag=1)
                if (flag) {
                    //设置小旗子图片
                    setSmallImgUrl(msg);
                    //判断结果页大图
                    if (score < 50) {
                        msg.imgBigUrl = '../i/i23.png';
                    }
                    if (score >= 50 && score <= 80) {
                        msg.imgBigUrl = '../i/i22.png';
                    }
                    if (score > 80 && score < 100) {
                        msg.imgBigUrl = '../i/i21.png';
                    }
                    if (score == 100) {
                        msg.imgBigUrl = '../i/i24-1.png';
                    }
                } else {
                    //不显示正确率和时间（即用户查看过答案）
                    //结果页小图
                    msg.imgflagUrl = '../i/newimg-0.png';
                    //结果页大图
                    msg.imgBigUrl = '../i/i30.png';
                    msg.avg_speed = '0S';
                }
                //拼接结果
                var pianEn=[];
                $.each(msg.paragraph,function(index,value){
                    var pianEnStr="";
                    for(var i=0;i<value.answers.length;i++){
                        if(value.answers[i].is_correct==1){//正确答案
                            pianEnStr+=value.answers[i].content;
                        }else{
                            pianEnStr+="<font color='red' style='color:red;font-size:14px;'>" + value.answers[i].content + "</font>";
                        }
                    }
                    pianEn.push(pianEnStr);
                })

                var renderData = {
                    'xm_title':xm_title,
                    'subject': subject,
                    'index': index,
                    'allUserContent': strUserInputContent.split('\n'),
                    //'en': pianStrArray, //计算后的结果
                    'en': pianEn, //计算后的结果
                    'score': msg.rate,
                    'group_level': msg.group_level,
                    'spend_time': msg.avg_speed_format,//20160914加单位S
                    'imgflagUrl': msg.imgflagUrl, //小旗子
                    'imgBigUrl': msg.imgBigUrl //结果大图
                };
                renderData.isBest = false; //做题进入结果页，显示本次成绩

                var level;
                //取本单元的最好成绩(如果这次做题不是最好成绩，则查询之前是不是得过最好成绩)
                $.each(questionList, function(idx, val) {
                    if (parseInt(val.id) == parseInt(subId)) {
                        if (val.group_level > 2 || msg.group_level > 2) {
                            if (val.group_level > msg.group_level) {
                                level = val.group_level;
                            } else {
                                level = msg.group_level;
                                val.group_level = msg.group_level;
                            }
                        }
                        return false;
                    }
                });

                if (level > 2) {
                    //达标了可以去下一关
                    renderData.isLockNextGroup = false;
                    if ((who + 1) == currentBiggestUnlockNum) {
                        currentBiggestUnlockNum++;
                    }
                    //who为当前题的序号减1
                    if ((who + 1) > currentBiggestUnlockNum) {
                        //如果老用户在最大解锁关卡外做过（照顾老用户的做题记录）,
                        //则默认禁止去下一关，但如果下一关之前做过则可以去下一关
                        renderData.isLockNextGroup = true;
                    }
                    $.each(questionList, function(i, o) {
                        if (subId == o.id) {
                            //当前关卡通过了则允许去下一关
                            o.isLockNextGroup = false;
                            //如果下一题做过，则允许去下一关
                            if (questionList[i + 1] && questionList[i + 1].top_score) {
                                //可以去下一关
                                renderData.isLockNextGroup = false;
                            }
                            return false;
                        }
                    });

                } else {
                    //如果当前是最后一道题，则禁止去下一关
                    renderData.isLockNextGroup = true;
                }
                //是否购买全日制，1：解锁(已购买)，0未解锁
                if (list_status == 1) {
                    //可以去下一关
                    renderData.isLockNextGroup = false;
                }
                renderData.isFromPlan=exerciseApi.isFromPlan;
                renderTemplate({
                    tmplName: TMPL.pian_result,
                    tmplData: renderData,
                    afterRender: function() {
                    }
                });
                resetDefault();
            },
            fail: function() {
                $('#btnSubmit1').attr('disabled', false);
            }
        });
    };

    //提交段的复写
    var renderDuan = function() {
        //if (!BaseCookie.getToken()) { //判断是否匿名
        //    clearTimer(); //弹出登录层暂停时间
        //    $('#dialogLogin').modal({
        //        backdrop: 'static'
        //    });
        //    $('#dialogLogin').on('hidden.bs.modal', function(e) {
        //        BaseCookie.get();
        //        if (BaseCookie.getToken()) {
        //            token = BaseCookie.getToken();
        //        }
        //        startTimer();
        //    });
        //    return;
        //}20160913
        clearTimer();//20160914
        var score = getDuanScore(); //段的正确率
        sureAnsLen = getSureAnsLen(); //段中正确的单词在全篇中的正确率
        var question_rate = (userAnsLen / sureAnsLen * 100);
        var reproduction_question_id = subId;

        question_rate = question_rate ? parseFloat(question_rate).toFixed(2) : 0;
        if ((question_rate - parseInt(question_rate)) == 0) {
            question_rate = parseInt(question_rate);
        }
        if (score - parseInt(score) == 0) {
            score = parseInt(score);
        }
        if (score > 100) {
            score = 100;
        } else if (score < 0) {
            score = 0;
        }
        if (question_rate > 100) {
            question_rate = 100;
        } else if (question_rate < 0) {
            question_rate = 0;
        }

        //禁止提交按钮
        $('#btnSubmit1').attr('disabled', true);
        //var date=new Date($.ajax({async: false}).getResponseHeader("Date"));
        var date=getTime();
        xm_endTime=zeroFn(date.getFullYear())+"-"+zeroFn((date.getMonth()+1))+"-"+zeroFn(date.getDate())+" "+zeroFn(date.getHours())+":"+zeroFn(date.getMinutes())+":"+zeroFn(date.getSeconds());
        date=null;
        var spend_time=(Date.parse(xm_endTime)-Date.parse(xm_startTime))/1000;
        $.ajax(
            {
                url: URL.xiaomaURL + "api/memory_sample_results",
                type: 'POST',
                contentType: "application/json",
                headers: {
                    Authorization: exerciseApi.xiaomaToken
                },
                data:JSON.stringify({
                    "answer_content":userContent1,
                    "endTime":xm_endTime,
                    "exerciseId":xm_exerciseId,
                    "is_look_answer": (flag ? 2 : 1),
                    "new_version": 2, //具体没啥意义（加解锁功能后增加）
                    "planDayId":xm_planDayId,
                    "reproduction_question_id": subId,
                    "sample_rate": score,
                    "sample_id": allParagraphIds[where],
                    "spend_time": spend_time,
                    "startTime":xm_startTime
                }),
                fail: function() {
                    $('#btnSubmit1').attr('disabled', false);
                },
                success: function(json) {
                    if (json && json.error) {
                        alert(json.error);
                        return;
                    }
                    exerciseApi.updateListItem();
                    renderTemplate({
                        tmplName: TMPL.duan_result,
                        tmplData: {
                            'userContent': userContent1,
                            'sureAns': duanStr,
                            'score': score,
                            'flag': flag,
                            'subject': subject,
                            'index': index
                        },
                        afterRender: function() {
                            //标记是否查看过答案
                            flag = true;
                            //最后一篇
                            if (len == 1) {
                                $('#btnNext').data('result', 1);
                                // $('#btnNext').text("下一篇");20160914 //.attr('disabled',true);
                                if(!exerciseApi.isFromPlan){
                                    $('#btnNext').text("完成").attr("id","showMorePlan");
                                }else{
                                    $('#btnNext').hide();
                                }


                                //判断是否能够跳转到下一关
                                $.each(questionList, function(idx, val) {
                                    if (val.id == subId) {
                                        //最后一题之前的题
                                        if (idx < (questionList.length - 1)) {

                                            //如果老用户在最大解锁关卡外做过（照顾老用户的做题记录）
                                            //who为当前题的序号减1
                                            if ((who + 1) > currentBiggestUnlockNum) {
                                                //禁止去下一关
                                                $('#btnNext').attr('disabled', true);
                                                //判断下一题是否已经做过
                                                $.each(questionList, function(i, o) {
                                                    if (subId == o.id && questionList[i + 1]) {
                                                        //下一题做过,可以下一关
                                                        if (questionList[i + 1].top_score) {
                                                            $('#btnNext').attr('disabled', false);
                                                        }
                                                    }
                                                });
                                            }
                                            //以前的最好做题记录没有达到解锁标准
                                            //用户之前做过的但是在解锁最大关卡之后是不允许下一关
                                            if (val.isLockNextGroup) {
                                                $('#btnNext').attr('disabled', true);
                                            }
                                        } else {
                                            $('#btnNext').attr('disabled', true);
                                        }
                                        return false;
                                    }
                                });

                            } else {
                                $('#btnNext').data('result', 0);
                                $('#btnNext').text("下一段");
                            }
                        }
                    })
                }
            });

    };

    //设置小旗子图片
    function setSmallImgUrl(value) {
        if (value.group_level == 0) {
            value.imgflagUrl = '../../i/newimg-0.png';
        } else if (value.group_level == 1) {
            value.imgflagUrl = '../../i/newimg-4.png';
        } else if (value.group_level == 2) {
            value.imgflagUrl = '../../i/newimg-1.png';
        } else if (value.group_level == 3) {
            value.imgflagUrl = '../../i/newimg-2.png';
        } else if (value.group_level == 4) {
            value.imgflagUrl = '../../i/newimg-3.png';
        } else {
            //未做过此题
            return 'nodone';
        }
    };

    //弹出隐藏层
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

    var reset = function() {
        renderTemplate({
            tmplName: TMPL.next
        })
    };

    //下一段
    var next = function() {
        ++where;
        --len;
        //最后一段
        if ($('#btnNext').data('result') == 1) {
            nextSubject();
        } else {
            //显示下一段复写内容
            renderTemplate({
                tmplName: TMPL.fuxie,
                tmplData: {
                    'xm_title':xm_title,
                    "en": allStage[where],
                    "cn": allStageCN[where],
                    "enAll": allStage,
                    "cnAll": allStageCN,
                    'subject': subject,
                    'index': index
                },
                afterRender: function() {
                    durationTime = 0; //计时时间间隔（单位秒）
                    startTimer();
                }
            });
        }
    };

    var resetDefault = function() {
        where = 0;
        //allUserContent = [];
        //dp = "duan";
        userAnsLen = 0;
        sureAnsLen = 0;
        //flag=true(显示正确率)，
        //flag=false（不显示正确率，因为用户已经查看过解释了）
        flag = true;
    };

    /*计时器相关*/
    var showHideTimer = function() {
        $(".mytime").fadeToggle();
    };
    var startTimer = function() {
        //var date=new Date($.ajax({async: false}).getResponseHeader("Date"));
    	var date=getTime();
        xm_startTime=zeroFn(date.getFullYear())+"-"+zeroFn((date.getMonth()+1))+"-"+zeroFn(date.getDate())+" "+zeroFn(date.getHours())+":"+zeroFn(date.getMinutes())+":"+zeroFn(date.getSeconds());
        date=null;
        var fn = function() {
            if ($("#testTimer4").length <= 0) {
                console.log("not find target");
                clearTimer();
            }
            var checkTime = function(i) {
                if (i < 10) {
                    i = "0" + i;
                }
                return i;
            };
            if (!durationTime) {
                durationTime = 1; //计算剩余的毫秒数
            } else {
                durationTime++;
            }
            var ts = durationTime;
            //var dd = parseInt(ts  / 60 / 60 / 24, 10); //计算剩余的天数
            var hh = parseInt(ts / 60 / 60 % 24, 10); //计算剩余的小时数
            var mm = parseInt(ts / 60 % 60, 10); //计算剩余的分钟数
            var ss = parseInt(ts % 60, 10); //计算剩余的秒数
            //dd = checkTime(dd);
            hh = checkTime(hh);
            mm = checkTime(mm);
            ss = checkTime(ss);
            currentTestTimeStr = hh + ":" + mm + ":" + ss;
            $("#testTimer4").html(currentTestTimeStr);
        };
        if (testTimerID) return;
        testTimerID = window.setInterval(fn, 1000);
    };
    var clearTimer = function() {
        window.clearInterval(testTimerID);
        testTimerID = undefined;
    };
    /*end-计时器相关*/

    var renderTemplate = function(param) {
        Render.render({
            wrap: param.wrap || $wrap,
            tmpl: {
                tmplName: param.tmplName,
                tmplData: param.tmplData || ""
            },
            afterRender: param.afterRender
        })
    };

    var lcsLength = function(x, y) {
        var m = x.length;
        var n = y.length;
        // var c = new var[m + 1][n + 1];
        var c = new Array(m + 1);
        for (var i = 0; i < m + 1; i++) {
            c[i] = new Array(n + 1);
        }
        var i, j;
        for (i = 1; i <= m; i++) {
            c[i][0] = 0;
        }
        for (j = 0; j <= n; j++) {
            c[0][j] = 0;
        }
        for (i = 1; i <= m; i++) {
            for (j = 1; j <= n; j++) {
                if (x[i - 1] == (y[j - 1])) {
                    c[i][j] = c[i - 1][j - 1] + 1;
                } else if (c[i - 1][j] >= c[i][j - 1]) {
                    c[i][j] = c[i - 1][j];
                } else {
                    c[i][j] = c[i][j - 1];
                }
            }
        }
        return c;
    };

    function printLcs(c, x, y, i, j, result) {
        if (i == 0 || j == 0) {
            return;
        }
        if (x[i - 1] == (y[j - 1])) {
            printLcs(c, x, y, i - 1, j - 1, result);
            // console.log(x[i - 1] + " ");
            result.push(x[i - 1]);
        } else if (c[i - 1][j] >= c[i][j - 1]) {
            printLcs(c, x, y, i - 1, j, result);
        } else {
            printLcs(c, x, y, i, j - 1, result);
        }
    }

    //userAnsLen = 0
    // sureAnsLen = 0
    function getSureAnsLen() {
        var result = 0;
        for (var i = 0; i < allStage.length; i++) {
            var item = allStage[i];
            var length = item.replace(reg, " ").replace(/\s+/g, " ").trim().split(' ').length;
            result += length;
        }
        return result;

    }

    var tipText = ''; //未解锁提示内容
    //获取未解锁提示
    var zeroFn=function(n){
        n=n<10?"0"+n:n;
        return n;
    }
    var showRewrite=function(questionId,planDayId,exerciseId,xmTitle){
        xm_questionId=questionId;
        xm_planDayId=planDayId;
        xm_exerciseId=exerciseId;
        xm_title=xmTitle;
        function _success(msg) {
            var showType;
            window.scrollTo(0, 0);
            //将接口返回数据分类到各个数组中
            var id =msg.question_id;
            var num = msg.question_sequence_number;
            var content = msg.content;
            subId = id;
            //var top_score = $this.attr('top_score');
            var group_level = msg.group_level;
            var avg_speed = msg.avg_speed;
            who = num - 1; //第几篇文章的索引
            subject = content;
            index = num - 1;
            joinStage(msg.reproduction_samples);
            var duanClass = [];
            $.each(allRate, function(i, n) {
                if (n < 50) {
                    duanClass.push('bred');
                } else if (n >= 50 && n < 80) {
                    duanClass.push('borange');
                } else if (n >= 80 && n < 100) {
                    duanClass.push('bgreen');
                } else {
                    duanClass.push('bblue');
                }
            });
            //直接做题 不显示上次按段做题结果
            $.each(allRate,function(index,value){
                allRate[index]="";
            });//20160914

            //呈现范文页
            renderTemplate({
                tmplName: TMPL.muban,
                tmplData: {
                    'xm_title':xm_title,
                    'en': allStage,
                    'ch': allStageCN,
                    'rate': allRate,
                    'duanClass': duanClass,
                    'subject': subject,
                    'index': index
                }
            });
        }
        $.ajax(
            {
                url:URL.xiaomaURL+"api/memory_questions/"+questionId,
                type:"GET",
                headers: {
                    Authorization: exerciseApi.xiaomaToken
                }  ,
                success:function(json){
                    json=$.parseJSON(json);
                    _success(json);
                }

            }
        )
    };
    var gotoHisResult=function(questionId,planDayId,exerciseId,xmTitle){
        xm_questionId=questionId;
        xm_planDayId=planDayId;
        xm_exerciseId=exerciseId;
        xm_title=xmTitle;
        var _success=function(msg){
            var showType;
            window.scrollTo(0, 0);
            var showType;
            var id =msg.question_id;
            var num = msg.question_sequence_number;
            var content = msg.content;
            subId = id;
            //var top_score = $this.attr('top_score');
            var group_level = msg.group_level;
            var avg_speed = msg.avg_speed;
            who = num - 1; //第几篇文章的索引
            subject = content;
            index = num - 1;
            joinStage(msg.reproduction_samples);
            var duanClass = [];


            //将接口返回数据分类到各个数组中
            joinStage(msg.reproduction_samples);
            //判断之前做过的类型（按篇做的/按段做的）
            showType = isBeforeDone(group_level);

            //上次是按篇做的
            if (showType == 'done_pian') {
                var arrMyAnswers = [];
                if (msg.answer_content) {
                    arrMyAnswers = msg.answer_content.split('\n');
                    //计算用户上次按篇的做题结果
                    getPianScore(msg.answer_content);
                } else {
                    //如果用户答案为空，则范文为原未处理的范文
                    pianStrArray = allStage;
                }

                //设置小旗子图片
                //如果查看过范文答案则不计算正确率和时间(1:看答案,2:没看答案)
                setSmallImgUrl(msg);

                //判断结果页大图
                if (msg.question_rate < 50) {
                    msg.imgBigUrl = '../i/i23.png';
                }
                if (msg.question_rate >= 50 && msg.question_rate <= 80) {
                    msg.imgBigUrl = '../i/i22.png';
                }
                if (msg.question_rate > 80 && msg.question_rate < 100) {
                    msg.imgBigUrl = '../i/i21.png';
                }
                if (msg.question_rate == 100) {
                    msg.imgBigUrl = '../i/i24-1.png';
                }
                //如果查看过答案则不计算
                if (msg.is_look_answer == 1) {
                    //结果页小图
                    msg.imgflagUrl = '../i/newimg-0.png';
                    //结果页大图
                    msg.imgBigUrl = '../i/i30.png';
                    msg.question_rate = '0';
                    msg.avg_speed = '0S';
                }

                msg.question_rate = msg.question_rate ? (parseFloat(msg.question_rate).toFixed(2)) : 0;
                if (msg.question_rate - parseInt(msg.question_rate) == 0) {
                    //如果数值是整数则去掉整数后面的.00
                    msg.question_rate = parseInt(msg.question_rate);
                }
                if (msg.question_rate > 100) {
                    msg.question_rate = 100;
                } else if (msg.question_rate < 0) {
                    msg.question_rate = 0;
                }
                //拼接结果
                var pianEn=[];
                $.each(msg.paragraph,function(index,value){
                    var pianEnStr="";
                    for(var i=0;i<value.answers.length;i++){
                        if(value.answers[i].is_correct==1){//正确答案
                            pianEnStr+=value.answers[i].content;
                        }else{
                            pianEnStr+="<font color='red' style='color:red;font-size:14px;'>" + value.answers[i].content + "</font>";
                        }
                    }
                    pianEn.push(pianEnStr);
                })



                var renderData = {
                    'xm_title':xm_title,
                    'subject': subject,
                    'index': index,
                    'allUserContent': arrMyAnswers,
                    /*'en': pianStrArray,*/
                    'en': pianEn,
                    'rate': allRate,
                    'score': msg.question_rate,
                    'spend_time': msg.avg_speed,
                    'group_level': msg.group_level,
                    'imgflagUrl': msg.imgflagUrl, //小旗子
                    'imgBigUrl': msg.imgBigUrl, //结果大图
                    'isLockNextGroup': msg.group_level < 3 ? true : false
                };
                renderData.isBest = true; //直接进入结果页，显示最好成绩
                //呈现上次按篇做的结果页
                renderData.isFromPlan=exerciseApi.isFromPlan;
                renderTemplate({
                    tmplName: TMPL.pian_result,
                    tmplData: renderData
                });
            }else{
                var duanClass = [];
                $.each(allRate, function(i, n) {
                    if (n < 50) {
                        duanClass.push('bred');
                    } else if (n >= 50 && n < 80) {
                        duanClass.push('borange');
                    } else if (n >= 80 && n < 100) {



                        duanClass.push('bgreen');
                    } else {
                        duanClass.push('bblue');
                    }
                });
                //呈现范文页
                renderTemplate({
                    tmplName: TMPL.muban,
                    tmplData: {
                        'xm_title':xm_title,
                        'en': allStage,
                        'ch': allStageCN,
                        'rate': allRate,
                        'duanClass': duanClass,
                        'subject': subject,
                        'index': index
                    }
                });

            }
        }
        $.ajax(
            {
                url:URL.xiaomaURL+"api/memory_questions/"+questionId,
                type:"GET",
                headers: {
                    Authorization: exerciseApi.xiaomaToken
                }  ,
                success:function(json){
                    json=$.parseJSON(json);
                    _success(json);
                }

            }
        )

    };
    function getTime(){ 
    	return new Date($.ajax({url: window.xiaoma.basePath+"/gettime",async: false}).getResponseHeader("Date"));
    }
    return {
        init: init,
        initEvent: initEvent,
        showRewrite:showRewrite,
        gotoHisResult:gotoHisResult
    }

})