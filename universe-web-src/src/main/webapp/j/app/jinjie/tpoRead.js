/*TPO阅读题型*/
'use strict'

define(['common/uniqueAjax', 'common/render', 'xml2json', 'app/baseURL', 'baseCookie', 'lib/store'], function(uniqueAjax, Render, xml2json, URL, BaseCookie) {
    var _conf,
        $wrap,
        TMPL = {
            t2: 'app/jinjie/tmpl_tpoRead_exercise',
            t3: 'app/jinjie/tmpl_tpoRead_question',
            t4: 'app/jinjie/tmpl_tpoRead_result', //结果页有两个，一个直接计算结果页，另一个从单元列表进
            t7: 'app/jinjie/tmpl_tpoRead_question_list',
            t8: 'app/jinjie/tmpl_tpoRead_unitResult', //结果页有两个，一个直接计算结果页，另一个从单元列表进
            t9: 'app/jinjie/tmpl_tpoRead_questionErr',
            t10: 'app/jinjie/tmpl_tpoRead_question_listErr',
            t11: 'app/jinjie/tmpl_tpoRead_resultErr'

        };
    var token,
        tokenTmp = "xiaoma";
    var groups = [],
        artical = {},
        questions = [],
        arrArtical=[],
        currentQuestionIndex = 0,
        records = [], //is_correct是否正确,section_number序列号,answer所选答案
        page = 1,
        tpoNum = "", //记录当前tpo阅读
        vip_user = false, //非vip用户不能看视频
        playCount = 0, //第一次播放，modal位置确定，本题内做题始终为为1,在save时活选择单元列表页，都为0
        localIndex = 0, //记录localErr下表
        localErr = [],
        localTmp = [],
        localRecords = []; //记录localErr做题记录
    var xm_groupId="",
        xm_planDayId='',
        xm_exerciseId='',
        xm_startTime='',
        xm_endTime='',
        xm_type='',
        xm_title='',
        xm_sectionType='',
        xm_sectionTypeNum="";

    //下一单元
    var next_question_id,
        next_group_name,
        next_type_name,
        next_rate,
        is_last_question;
    var loadingTpoReadDetail = false;


    var init = function(conf) {
        _conf = $.extend({
            wrap: ''
        }, conf || {})
        $wrap = $(_conf.wrap)
        BaseCookie.get()
        token = BaseCookie.getToken();
        if (isEmpty(token)) {
            token = tokenTmp
        }
        initEvent()
    }

    var initEvent = function() {
        $(document).on('click', '.tpoReadUnit', tpoReadUnit);
        var tempClickStatus = 0;
        $(document).on('click', '.tpoReadUnitDetail', function(e) {
            var qid = $(e.target).attr('data-question_id');
            if (tempClickStatus == qid) {
                return;
            }
            tempClickStatus = qid;
            $(e.target).attr('disabled', true);
            var data = {
                'questionId': $(e.target).attr('data-question_id')
            };
            //初始化当前的tpoNum
            tpoNum = $(e.target).attr('data-tpoNum');
            if (!loadingTpoReadDetail) {
                loadingTpoReadDetail = true;
                tpoReadUnitDetail(data, function() {
                    tempClickStatus = 0;
                    loadingTpoReadDetail = false;
                })
            } else {
                console.log("reClick");
            }
        })
        $(document).on('click', '.tpoReadResult', function(e) {
            var data = {
                'questionId': $(e.target).attr('data-question_id'),
                'question_sequence_number': $(e.target).attr('data-question_sequence_number'), //passage
                'tpoNum': $(e.target).attr('data-tpoNum'),
                'rate': $(e.target).attr('data-rates')
            }
            tpoReadResult(data)
        })
        $(document).on('click', '#nextQuestion1', nextQuestion);
        $(document).on('click', '#preQuestion1', preQuestion);
        $(document).on('click', '#nextQuestionErr1', nextQuestionErr);
        $(document).on('click', '#preQuestionErr1', preQuestionErr);
        $(document).on('mouseout', '.tpoPart2', function(e) {
            e = window.event || e; // 兼容IE7
            var obj = $(e.srcElement || e.target);
            if ($(obj).is("#questionsTab,#questionsTab *,#questionsTabToggle, #questionsTabToggle *")) {
                // alert('内部区域');
                $("#questionsTab").css('display', 'block')
                $('#questionsTabToggle').addClass('tabHover')
                $('#questionsTabToggle .caret2').addClass('tabHover1')
            } else {
                $("#questionsTab").css('display', 'none')
                $('#questionsTabToggle').removeClass('tabHover')
                $('#questionsTabToggle .caret2').removeClass('tabHover1')
            }
        });
        $(document).on('mouseover', '#questionsTabToggle', questionsTabShow);
        $(document).on('mouseover', '#questionsTab', questionsTabShow);

        $(document).on('click', '.singleChoice', function(e) {
            //单选选择状态单选多选控制
            e=e||window.event;
            e.target= e.target|| e.srcElement;
            $(e.target).addClass('tpo-choice');
            $(e.target).parent().parent().siblings().find('span.tpo-choice').removeClass('tpo-choice');
        });
        $(document).on('click', '.singleChoiceInsert', function(e) {
            //插入选择状态单选多选控制
            e=e||window.event;
            e.target= e.target|| e.srcElement;
            $('.questionBrContent').find('span.tpo-choice').removeClass('tpo-choice');
            $(e.target).addClass('tpo-choice')
        });
        $(document).on('click', '.multipleChoice', function(e) {
            e=e||window.event;
            e.target= e.target|| e.srcElement;
            if ($(e.target).hasClass('tpo-choice')) {
                $(e.target).removeClass('tpo-choice')
            } else {
                $(e.target).addClass('tpo-choice')
            }
        });
        $(document).on('click', '.complexChoice3', function(e) {
            e=e||window.event;
            e.target= e.target|| e.srcElement;
            var ans = $(e.target).attr('data-answer');
            var g1Tmp = "";
            var g1Val = $('#g1AnswerDiv').html();
            if ($(e.target).hasClass('tpo-choice')) {
                $(e.target).removeClass('tpo-choice');
                g1Tmp = g1Val.substring(0, g1Val.indexOf(ans)) + g1Val.substring(g1Val.indexOf(ans) + 1);
                $('#g1AnswerDiv').html(g1Tmp)
            } else {
                $(e.target).addClass('tpo-choice');
                g1Tmp = g1Val + ans;
                if (g1Tmp.length > 1) {
                    var g1Arr = [];
                    for (var i = 0; i < g1Tmp.length; i++) {
                        g1Arr.push(g1Tmp.charAt(i))
                    }
                    g1Arr.sort()
                    $('#g1AnswerDiv').html(g1Arr.join(""))
                } else {
                    $('#g1AnswerDiv').html(g1Tmp)
                }
            }
        });
        $(document).on('click', '.complexChoice4', function(e) {
            e=e||window.event;
            e.target= e.target|| e.srcElement;
            var ans = $(e.target).attr('data-answer')
            var g2Tmp = "";
            var g2Val = $('#g2AnswerDiv').html();
            if ($(e.target).hasClass('tpo-choice')) {
                $(e.target).removeClass('tpo-choice');
                g2Tmp = g2Val.substring(0, g2Val.indexOf(ans)) + g2Val.substring(g2Val.indexOf(ans) + 1);
                $('#g2AnswerDiv').html(g2Tmp)
            } else {
                $(e.target).addClass('tpo-choice');
                g2Tmp = g2Val + ans;
                if (g2Tmp.length > 1) {
                    var g2Arr = [];
                    for (var i = 0; i < g2Tmp.length; i++) {
                        g2Arr.push(g2Tmp.charAt(i))
                    }
                    g2Arr.sort()
                    $('#g2AnswerDiv').html(g2Arr.join(""))
                } else {
                    $('#g2AnswerDiv').html(g2Tmp)
                }
            }
        });
        //题号面板,做到最后一题的面板
        $(document).on('click', '.questionPage1', function(e) {
            e=e||window.event;
            e.target= e.target|| e.srcElement;
            var data = {
                'pageNum': $(e.target).attr('data-pageNum')
            };
            questionPage(data)
        });
        $(document).on('click', '.questionPageErr', function(e) {
            e=e||window.event;
            var tar= e.target|| e.srcElement;
            var data = {
                'pageNum': $(tar).attr('data-pageNum'),
                'localIndex': $(tar).attr('data-localIndex')
            };
            questionPageErr(data)
        });
        //题号面板,题号前面的面板
        $(document).on('click', '.questionPageTab1', function(e) {
            e=e||window.event;
            e.target= e.target|| e.srcElement;
            e=e||window.event;
            var tar= e.target|| e.srcElement;
            //保存做题记录
            saveChoice();
            var data = {
                'pageNum': $(tar).attr('data-pageNum')
            };
            questionPage(data)
        });
        $(document).on('click', '.questionPageTabErr1', function(e) {
            //保存做题记录
            saveChoiceErr();
            e=e||window.event;
            var tar= e.target|| e.srcElement;
            var data = {
                'pageNum': $(tar).attr('data-pageNum'),
                'localIndex': $(tar).attr('data-localIndex')
            };
            questionPageErr(data)
        });
        //提交查看成绩
        $(document).on('click', '#tpoReadSubmit1', tpoReadSubmit);
        $(document).on('click', '#tpoReadSubmitErr1', tpoReadSubmitErr);
        $(document).on('click', '#againJinJie1', function(e) {
            e=e||window.event;
            var tar= e.target|| e.srcElement;
            var data = {
                'questionId': $(tar).attr('data-question_id')
            }
            againtpoRead(data)
        });
        //重做错题
        $(document).on('click', '#errOnlyJinJie1', function(e) {
            $(this).attr('disabled', true);
            var data = {
                'pickArtical': $(e.target).attr('data-pickArtical'),
                'groupId': $(e.target).attr('data-question_id')
            }
            errOnlytpoRead(data)
        });
        $(document).on('click', '#errOnlyJinJieErr1', function(e) {
            $(this).attr('disabled', true);
            localTmpToErr();
            var data = {
                'pickArtical': $(e.target).attr('data-pickArtical'),
                'questionId': $(e.target).attr('data-question_id')
            }
            errOnlytpoReadErr(data)
        });
        $(document).on('click', '#nextUnitRead', function(e) {
            $(this).addClass("disabled");
            tpoNum = $(e.target).attr('data-next_group_name');
            nextUnitRead()
        });
        //视频播放控制器
        $(document).on('click', '#seeJiangjie1', function(e) {
            showAudioPlayModal(0)
        });
        $(document).on('click', '.jiexiAudio', function(e) {
            $('.N_viedo_tab').find('a.N_V_active').removeClass('N_V_active')
            $(e.target).addClass('N_V_active')
            audioPlay($(e.target).attr('data-index'))
        });
        $(document).on('click', '#seeFanyi1', function(e) {
            $('.fanyi1').toggle()
            if ($('.fanyi1').css('display') == 'none') {
                $('#seeFanyi1').html('查看翻译')
            } else {
                $('#seeFanyi1').html('隐藏翻译')
            }
        })
        $(document).on('click', '#seeJieXiRead2', function(e) {
            $('#tpoReadJieXi').toggle()
            jiexiReadFun()
        })
        $(document).on('click', '#seeJieXiReadErr2', function(e) {
            $('#tpoReadJieXi').toggle()
            jiexiReadErrFun()
        })
        $(document).on('click', '#g1Div', function(e) {
            $('#g1Div').addClass('grayf2')
            $('#g2Div').removeClass('grayf2')
            $('.sanjiao').removeClass('triangle-border').addClass('triangle-borderl_l')
            $('.answerTr1').show();
            $('.answerTr2').hide();
        })
        $(document).on('click', '#g2Div', function(e) {
            $('#g2Div').addClass('grayf2')
            $('#g1Div').removeClass('grayf2')
            $('.sanjiao').addClass('triangle-border').removeClass('triangle-borderl_l')
            $('.answerTr2').show();
            $('.answerTr1').hide();
        })
    }

    var nextUnitRead = function() {
        artical = {};
        questions = [];
        currentQuestionIndex = 0;
        records = [];
        if (null != next_rate && "" != next_rate) {
            var data = {
                'question_id': next_question_id,
                'question_sequence_number': next_type_name, //passage
                'tpoNum': next_group_name,
                'rate': next_rate
            }
            tpoReadResult(data)
        } else { //进入第一题
            var param = {
                'question_id': next_question_id //不为空是，是从单元列表进来，需再取一次question_id
            };
            tpoReadUnitDetail(param)
        }
    }

    var tempClickStatus = 0;
    var tpoReadUnit = function() {
        BaseCookie.get()
        token = BaseCookie.getToken()
        if (isEmpty(token)) {
            token = tokenTmp
        }
        var _success = function(json) {

            var qid = json['tpo_group'][0]['tpo_types'][0]['tpo_questions'][0]['question_id'];;
            if (tempClickStatus == qid) {
                return;
            }
            tempClickStatus = qid;
            var data = {
                'question_id': qid
            };
            //初始化当前的tpoNum
            tpoNum = json['tpo_group'][0]['name'];
            if (!loadingTpoReadDetail) {
                loadingTpoReadDetail = true;
                tpoReadUnitDetail(data, function() {
                    tempClickStatus = 0;
                    loadingTpoReadDetail = false;
                })
            } else {
                console.log("reClick");
            }
        }
        $.ajax({
            url: URL.baseURL9 + 'tpo_groups',
            data: {
                tpo_type: 1,
                page: 1
            },
            type: 'get',
            headers: {
                "Authorization": token
            },
            success: _success
        })
    };

    var tpoReadUnitDetail = function(param, callback) {
        localIndex = 0;
        var _success = function(json) {
            json= $.parseJSON(json);
            xm_sectionTypeNum= json.section_type+json.sequence_number;
            xm_sectionType=json.section_type;
            //var date=new Date($.ajax({async: false}).getResponseHeader("Date"));
            var date=getTime();
            xm_startTime=zeroFn(date.getFullYear())+"-"+zeroFn((date.getMonth()+1))+"-"+zeroFn(date.getDate())+" "+zeroFn(date.getHours())+":"+zeroFn(date.getMinutes())+":"+zeroFn(date.getSeconds());
            date=null;
            //加载文章和题目信息, vip_user
            gettpoRead(json);
            //题号面板
            var questionsNum = [];
            var renderData = {};renderData.xm_title=xm_title;
            renderData.artical = arrArtical[currentQuestionIndex];
            renderData.tpoNum = tpoNum;
            //加载第一题
            renderData.question = questions[0];
            for (var i = 1; i <= questions.length; i++) {
                questionsNum.push(i)
                var record = {};

                //records初始化为空
                record.section_number = i - 1;
                record.is_correct = false;
                record.answer = "";
                records.push(record)
            }
            renderData.questionsNum = questionsNum;
            renderData.questionsLength = questionsNum.length;
            renderData.currentQuestionIndex = currentQuestionIndex;
            //renderData.vip_user = vip_user;
            var _afterRender = function() {
                var _afterRender1 = function() {
                    $("#preQuestion1").css('display', 'none');
                    $(".questionBrContent").html(renderData.question.prompt.replace(/\n/gi, "<br/>"));
                    if (callback) {
                        callback.call();
                    }
                };
                var param2 = {
                    "wrap": $('#tpoReadPart2'),
                    "tmplName": TMPL.t3,
                    "tmplData": renderData,
                    "afterRender": _afterRender1
                }
                renderTemplate(param2)
            }

            var param1 = {
                "tmplName": TMPL.t2,
                "tmplData": renderData,
                "afterRender": _afterRender
            };
            renderTemplate(param1)
        };
        $.ajax({
            url: URL.xiaomaURL + 'tpo/read/questions/'+param.groupId,
            type: 'get',
            headers: {
                "Authorization": exerciseApi.xiaomaToken
            },
            success: _success
        })
    };

    //从单元列表直接进结果页
    var tpoReadResult = function(param) {
        localIndex = 0;
        var _success = function(json) {
            json= $.parseJSON(json);
            xm_sectionTypeNum= json.section_type+json.sequence_number;
            xm_sectionType=json.section_type;
            var renderData = {};renderData.xm_title=xm_title;
            renderData.sequence_number=json.question_sequence_number;
            var rate = json.rate;
            var rateArray = rate.split('/');
			var correctCount = 0;
			var totalCount = 0;
			if(rateArray && rateArray.length==2){
				correctCount = rateArray[0];
				totalCount = rateArray[1];
			}else{
				totalCount = json.results.length;
				var  errCountTemp = 0;
				for(var i=0;i<json.results.length;i++){
					if(json.results[i].is_correct==2){
						errCountTemp++;
					}
					
				} 
				correctCount = totalCount-errCountTemp;
			}
            var errorCount = totalCount - correctCount;
            var rateTmp = (parseInt(correctCount) / parseInt(totalCount)).toString();
            renderData.rate = parseInt(rateTmp.substring(0, rateTmp.indexOf('.') + 3) * 100);
            renderData.correctCount = correctCount;
            renderData.errorCount = errorCount;
            renderData.question_id = json.group_id;
            renderData.question_results = json.results;
            renderData.sectionType = xm_sectionType;
            renderData.sectionTypeNum = xm_sectionTypeNum;
            renderData.isFromPlan=exerciseApi.isFromPlan;
            var param = {
                "tmplName": TMPL.t8,
                "tmplData": renderData,
                "afterRender": ''
            }
            renderTemplate(param)
        }

        $.ajax({
            url: URL.xiaomaURL + 'tpo/read/results/'+param.groupId,
            type: 'get',
            headers: {
                "Authorization": exerciseApi.xiaomaToken
            },
            success: _success
        })
    }

    var nextQuestion = function() {
        //保存做题记录
        saveChoice()

        //下一题渲染
        currentQuestionIndex = currentQuestionIndex + 1;
        var questionsNum = [];
        for (var i = 1; i <= questions.length; i++) {
            questionsNum.push(i)
        }
        //最后一题显示做题信息列表
        if (currentQuestionIndex == questionsNum.length) {
            var param2 = {
                "wrap": $('#tpoReadPart2'),
                "tmplName": TMPL.t7,
                "tmplData": records,
                "afterRender": ''
            };
            renderTemplate(param2)
        } else {
            var renderData = {};renderData.xm_title=xm_title;
            // renderData.artical = artical;
            renderData.artical = arrArtical[currentQuestionIndex];
            renderData.question = questions[currentQuestionIndex];
            renderData.questionsNum = questionsNum;
            renderData.questionsLength = questionsNum.length;
            renderData.currentQuestionIndex = currentQuestionIndex;
            renderData.vip_user = vip_user;

            var _afterRender = function() {
                var _afterRender1 = function() {
                    $("#preQuestion1").css('display', 'block');
                    var prompt=renderData.question.prompt;
                    if(renderData.question.questionType=='insert'){
                        prompt=prompt.replace('$$','<label style="color:#00b551;">');
                        prompt=prompt.replace('$$','</label>');
                    }
                    $(".questionBrContent").html(prompt.replace(/\n/gi, "<br/>"));
                    showChoice();
                };
                var param2 = {
                    "wrap": $('#tpoReadPart2'),
                    "tmplName": TMPL.t3,
                    "tmplData": renderData,
                    "afterRender": _afterRender1
                }
                renderTemplate(param2)
            }
            var param1 = {
                "tmplName": TMPL.t2,
                "tmplData": renderData,
                "afterRender": _afterRender
            }
            renderTemplate(param1)
        }
    }
    var nextQuestionErr = function() {
        //保存做题记录
        saveChoiceErr()
        //下一题渲染
        localIndex = localIndex + 1;
        var questionsNum = [];
        for (var i = 0; i < localErr.length; i++) {
            questionsNum.push(localErr[i].section_number + 1)
        }
        //最后一题显示做题信息列表
        if (localIndex == questionsNum.length) {
            var param2 = {
                "wrap": $('#tpoReadPart2'),
                "tmplName": TMPL.t10,
                "tmplData": localRecords,
                "afterRender": ''
            }
            renderTemplate(param2)
        } else {
            var currentErrIndex = localErr[localIndex].section_number;
            var renderData = {};renderData.xm_title=xm_title;
            //renderData.artical = artical;
            renderData.artical = arrArtical[currentErrIndex];
            renderData.question = questions[currentErrIndex];
            renderData.questionsNum = questionsNum;
            renderData.questionsLength = questions.length;
            renderData.currentQuestionIndex = currentErrIndex;
            renderData.vip_user = vip_user;

            var _afterRender = function() {
                var _afterRender1 = function() {
                    $("#preQuestionErr1").css('display', 'block');
                    var prompt=renderData.question.prompt;
                    if(renderData.question.questionType=='insert'){
                        prompt=prompt.replace('$$','<label style="color:#00b551;">');
                        prompt=prompt.replace('$$','</label>');
                    }
                    $(".questionBrContent").html(prompt.replace(/\n/gi, "<br/>"));
                    showChoiceErr();
                };
                var param2 = {
                    "wrap": $('#tpoReadPart2'),
                    "tmplName": TMPL.t9,
                    "tmplData": renderData,
                    "afterRender": _afterRender1
                }
                renderTemplate(param2)
            }

            var param1 = {
                "tmplName": TMPL.t2,
                "tmplData": renderData,
                "afterRender": _afterRender
            }
            renderTemplate(param1)
        }
    }
    var preQuestion = function() {
        //做题信息面板页倒回无需记录
        if (currentQuestionIndex != questions.length) {
            //保存做题记录
            saveChoice()        }
        //渲染上一题
        var questionsNum = []; //题号数组面板
        var renderData = {};renderData.xm_title=xm_title;
        currentQuestionIndex = currentQuestionIndex - 1;
        //renderData.artical = artical;
        renderData.artical = arrArtical[currentQuestionIndex];
        //做题信息面板页倒回无需记录
        if (currentQuestionIndex != questions.length) {
        }
        renderData.question = questions[currentQuestionIndex];
        for (var i = 1; i <= questions.length; i++) {
            questionsNum.push(i)
        }
        renderData.questionsNum = questionsNum;
        renderData.questionsLength = questionsNum.length;
        renderData.currentQuestionIndex = currentQuestionIndex;
        renderData.vip_user = vip_user;

        var _afterRender = function() {
            var _afterRender1 = function() {
                if (currentQuestionIndex == 0) {
                    $("#preQuestion1").css('display', 'none')
                } else {
                    $("#preQuestion1").css('display', 'block')
                }
                var prompt=renderData.question.prompt;
                if(renderData.question.questionType=='insert'){
                    prompt=prompt.replace('$$','<label style="color:#00b551;">');
                    prompt=prompt.replace('$$','</label>');
                }
                $(".questionBrContent").html(prompt.replace(/\n/gi, "<br/>"));
                showChoice();
            };
            var param2 = {
                "wrap": $('#tpoReadPart2'),
                "tmplName": TMPL.t3,
                "tmplData": renderData,
                "afterRender": _afterRender1
            }
            renderTemplate(param2)
        }

        var param1 = {
            "tmplName": TMPL.t2,
            "tmplData": renderData,
            "afterRender": _afterRender
        }
        renderTemplate(param1)
    }

    var preQuestionErr = function() {
        //做题信息面板页倒回无需记录
        if (localIndex != localErr.length) {
            saveChoiceErr()
        }
        localIndex = localIndex - 1;
        //渲染上一题
        var questionsNum = []; //题号数组面板
        var renderData = {};renderData.xm_title=xm_title;
        var currentErrIndex = localErr[localIndex].section_number;
        //renderData.artical = artical;
        renderData.artical = arrArtical[currentErrIndex];
        renderData.question = questions[currentErrIndex];
        for (var i = 0; i < localErr.length; i++) {
            questionsNum.push(localErr[i].section_number + 1)
        }
        renderData.questionsNum = questionsNum;
        renderData.questionsLength = questions.length;
        renderData.currentQuestionIndex = currentErrIndex;
        var _afterRender = function() {
            var _afterRender1 = function() {
                if (currentErrIndex == localErr[0].section_number) {
                    $("#preQuestionErr1").css('display', 'none')
                } else {
                    $("#preQuestionErr1").css('display', 'block')
                }
                var prompt=renderData.question.prompt;
                if(renderData.question.questionType=='insert'){
                    prompt=prompt.replace('$$','<label style="color:#00b551;">');
                    prompt=prompt.replace('$$','</label>');
                }
                $(".questionBrContent").html(prompt.replace(/\n/gi, "<br/>"));
                showChoiceErr();
            };
            var param2 = {
                "wrap": $('#tpoReadPart2'),
                "tmplName": TMPL.t9,
                "tmplData": renderData,
                "afterRender": _afterRender1
            }
            renderTemplate(param2)
        };
        var param1 = {
            "tmplName": TMPL.t2,
            "tmplData": renderData,
            "afterRender": _afterRender
        }
        renderTemplate(param1)
    }

    var questionsTabShow = function() {
        $("#questionsTab").css('display', 'block')
    }

    var questionsTabHid = function() {
        $("#questionsTab").css('display', 'none')
    }

    var questionsTabToggle = function() {
        if ($("#questionsTab").css('display') == "none") {
            $("#questionsTab").css('display', 'block')
        } else {
            $("#questionsTab").css('display', 'none')
        }
    }

    //加载文章、问题和vip_user信息
    var gettpoRead = function(param) { //得到artical,questions,vip_user
        questions = [];//问题
        arrArtical=[];//文章
        $.each(param.questions,function(index,value){
            var G1 = {}; //复杂题型题干内容及答案
            var G2 = {};
            artical = {};
            artical.p_en = value.en_web;
            artical.p_ch = value.ch;
            var question={};
            var typeTmp=value.question_type;
            //question.questionType=typeTmp==1?"single":typeTmp==2?"multiple":typeTmp==3?"sort":typeTmp==4?"insert":"directMultiple";
            /*句子插入题 4
             配对题3
             文章小结题 2
             其他都是1*/
            question.questionType=typeTmp==1?"single":typeTmp==2?"multiple":typeTmp==3?"complex":typeTmp==4?"insert":"directMultiple";
            question.sequenceNumber =value.section_number;//问题序号
            question.correctResponse = value.answer.join();//问题答案
            question.p = value.analysis;
            question.audio = value.audio;
            question.prompt = value.prompt;
            var simpleChoices = [];
            for (var j = 0; j < value.option.length; j++) {
                var simpleChoice = {};
                var choiceTmp=j==0?"A":j==1?"B":j==2?"C":j==3?"D":j==4?"E":j==5?"F":j==6?"G":j==7?"H":j==8?"I":j==9?"J":"K";
                simpleChoice.identifier = choiceTmp;
                simpleChoice.choiceOption = value.option[j];
                simpleChoices.push(simpleChoice);
            }
            question.simpleChoices = simpleChoices;
            if (question.questionType == 'complex') {
                //G1.p = questionContent.choiceInteraction.complexQuestion.G1.p;
                //G1.correctResponse = questionContent.choiceInteraction.complexQuestion.G1.correctResponse;
                //G2.p = questionContent.choiceInteraction.complexQuestion.G2.p;
                //G2.correctResponse = questionContent.choiceInteraction.complexQuestion.G2.correctResponse;
                G1.correctResponse=value.answer1.join();
                G1.p=value.G1;
                G2.correctResponse=value.answer2.join();
                G2.p=value.G2;
                question.G1 = G1;
                question.G2 = G2;
                question.correctResponse = G1.correctResponse + '/' + G2.correctResponse;
            } else if (question.questionType == 'insert') {
                var insertTmp = question.prompt.replace(/（/gm, '(').replace(/）/gm, ')');
                var aTmp = '<span><span><span class="tpo-choice-round pointer singleChoiceInsert showEnable newtop-top" style="display: inline-block; margin: 0 5px;" data-answer="A">A</span><span class="tpo-choice-round showDisable newtop-top" style="display: none; margin: 0 5px;" data-answer="A">A</span></span>';
                var bTmp = '<span><span class="tpo-choice-round pointer singleChoiceInsert showEnable newtop-top" style="display: inline-block; margin: 0 5px;" data-answer="B">B</span><span class="tpo-choice-round showDisable newtop-top" style="display: none; margin: 0 5px;" data-answer="B">B</span></span>';
                var cTmp = '<span><span class="tpo-choice-round pointer singleChoiceInsert showEnable newtop-top" style="display: inline-block; margin: 0 5px;" data-answer="C">C</span><span class="tpo-choice-round showDisable newtop-top" style="display: none; margin: 0 5px;" data-answer="C">C</span></span>';
                var dTmp = '<span><span class="tpo-choice-round pointer singleChoiceInsert showEnable newtop-top" style="display: inline-block; margin: 0 5px;" data-answer="D">D</span><span class="tpo-choice-round showDisable newtop-top" style="display: none; margin: 0 5px;" data-answer="D">D</span></span>';
                question.prompt = insertTmp.replace('(A)', aTmp).replace('(B)', bTmp).replace('(C)', cTmp).replace('(D)', dTmp);
            }
            questions.push(question);
            artical.id = param.group_id;
            artical.sequence_number = value.question_id;
            arrArtical.push(artical);
        });

    }

    var jiexiReadFun = function() {
        if ($('#tpoReadJieXi').css('display') != 'none') {
            $('.showEnable').hide()
            $('.showDisable').show()
            var yourAnswer = "";
            if (questions[currentQuestionIndex].questionType == 'single') {
                $('.tpo-choice').siblings().addClass('tpo-mistake');
                $("#singMul").find('span.showDisable[data-answer="' + questions[currentQuestionIndex].correctResponse + '"]').addClass('tpo-right');
                yourAnswer = $('.tpo-choice').html();
            } else if (questions[currentQuestionIndex].questionType == 'multiple') {
                /*错答案加红*/
                $('.tpo-choice').siblings().addClass('tpo-mistake');
                /*正确答案加绿*/
                var correctRes = questions[currentQuestionIndex].correctResponse.split(',');
                for (var j = 0; j < correctRes.length; j++) {
                    $("#singMul").find('span.showDisable[data-answer="' + correctRes[j] + '"]').addClass('tpo-right')
                }
                /*答案比对*/
                var answers = $("#singMul").find('span.tpo-choice');
                for (var i = 0; i < answers.length; i++) {
                    if (i == 0) {
                        yourAnswer = $(answers[0]).html();
                    } else {
                        yourAnswer = yourAnswer + "," + $(answers[i]).html();
                    }
                }
                $('#yourAnswer').html(yourAnswer)
            } else if (questions[currentQuestionIndex].questionType == 'insert') {
                $('.tpo-choice').siblings().addClass('tpo-mistake')
                $("#articleP").find('span.showDisable[data-answer="' + questions[currentQuestionIndex].correctResponse + '"]').addClass('tpo-right')
                yourAnswer = $('.tpo-choice').html();
                $('.showDisable').css('display', 'inline-block')
            } else {
                /*错答案加红*/
                $('.tpo-choice').siblings().addClass('tpo-mistake');
                /*正确答案加绿*/
                var correctRes1 = questions[currentQuestionIndex].G1.correctResponse.split(',');
                var correctRes2 = questions[currentQuestionIndex].G2.correctResponse.split(',');
                for (var m = 0; m < correctRes1.length; m++) {
                    $(".answerTr1").find('span.showDisable[data-answer="' + correctRes1[m] + '"]').addClass('tpo-right')
                }
                for (var n = 0; n < correctRes2.length; n++) {
                    $(".answerTr2").find('span.showDisable[data-answer="' + correctRes2[n] + '"]').addClass('tpo-right')
                }
                /*答案比对*/
                var answer = "";
                var answers = $(".answerTr1").find('span.tpo-choice');
                for (var i = 0; i < answers.length; i++) {
                    if (i == 0) {
                        answer = $(answers[0]).html();
                    } else {
                        answer = answer + "," + $(answers[i]).html();
                    }
                }
                var answer1 = "";
                var answers1 = $(".answerTr2").find('span.tpo-choice');
                for (var i = 0; i < answers1.length; i++) {
                    if (i == 0) {
                        answer1 = $(answers1[0]).html();
                    } else {
                        answer1 = answer1 + "," + $(answers1[i]).html();
                    }
                }
                if (answer == questions[currentQuestionIndex].G1.correctResponse && answer1 == questions[currentQuestionIndex].G2.correctResponse) {
                    $('#g1AnswerDiv').css('color', '#00b551')
                } else {
                    $('#g1AnswerDiv').css('color', '#f54040')
                }
                yourAnswer = answer + "/" + answer1;
            }

            $('#yourAnswer').html(yourAnswer)
            if (yourAnswer == questions[currentQuestionIndex].correctResponse) {
                $('#yourAnswerDiv').css('color', '#00b551').find("#yourAnswer").css('color', '#00b551');
            } else {
                $('#yourAnswerDiv').css('color', '#f54040').find("#yourAnswer").css('color', '#f54040');
            }
        } else {
            $('.showEnable').show()
            $('.showDisable').hide()
            if (questions[currentQuestionIndex].questionType == 'single') {
                $('#singMul').find('.tpo-mistake').removeClass('tpo-mistake')
                $("#singMul").find('.tpo-right').removeClass('tpo-right')
            } else if (questions[currentQuestionIndex].questionType == 'multiple') {
                $('#singMul').find('.tpo-mistake').removeClass('tpo-mistake')
                $("#singMul").find('.tpo-right').removeClass('tpo-right')
            } else if (questions[currentQuestionIndex].questionType == 'insert') {
                $('#articleP').find('.tpo-mistake').removeClass('tpo-mistake')
                $("#articleP").find('.tpo-right').removeClass('tpo-right')
                $('.showDisable').hide()
            } else {
                $('#singMul').find('.tpo-mistake').removeClass('tpo-mistake')
                $("#singMul").find('.tpo-right').removeClass('tpo-right')
                $('#g1AnswerDiv').css('color', '#000')
                $('#g2AnswerDiv').css('color', '#000')
            }
            $('#yourAnswer').html('')
        }
    }

    var jiexiReadErrFun = function() {
        var currentErrIndex = localErr[localIndex].section_number;
        if ($('#tpoReadJieXi').css('display') != 'none') {
            $('.showEnable').hide()
            $('.showDisable').show()
            var yourAnswer = "";
            if (questions[currentErrIndex].questionType == 'single') {
                $('.tpo-choice').siblings().addClass('tpo-mistake')
                $("#singMul").find('span.showDisable[data-answer="' + questions[currentErrIndex].correctResponse + '"]').addClass('tpo-right');
                yourAnswer = $('.tpo-choice').html();
            } else if (questions[currentErrIndex].questionType == 'multiple') {
                /*错答案加红*/
                $('.tpo-choice').siblings().addClass('tpo-mistake');
                /*正确答案加绿*/
                var correctRes = questions[currentErrIndex].correctResponse.split(',');
                for (var j = 0; j < correctRes.length; j++) {
                    $("#singMul").find('span.showDisable[data-answer="' + correctRes[j] + '"]').addClass('tpo-right')
                }
                /*答案比对*/
                var answers = $("#singMul").find('span.tpo-choice');
                for (var i = 0; i < answers.length; i++) {
                    if (i == 0) {
                        yourAnswer = $(answers[0]).html();
                    } else {
                        yourAnswer = yourAnswer + "," + $(answers[i]).html();
                    }
                }
                $('#yourAnswer').html(yourAnswer)
            } else if (questions[currentErrIndex].questionType == 'insert') {
                $('.tpo-choice').siblings().addClass('tpo-mistake')
                $("#articleP").find('span.showDisable[data-answer="' + questions[currentErrIndex].correctResponse + '"]').addClass('tpo-right')
                yourAnswer = $('.tpo-choice').html();
                $('.showDisable').css('display', 'inline-block')
            } else {
                /*错答案加红*/
                $('.tpo-choice').siblings().addClass('tpo-mistake');
                /*正确答案加绿*/
                var correctRes1 = questions[currentErrIndex].G1.correctResponse.split(',');
                var correctRes2 = questions[currentErrIndex].G2.correctResponse.split(',');
                for (var m = 0; m < correctRes1.length; m++) {
                    $(".answerTr1").find('span.showDisable[data-answer="' + correctRes1[m] + '"]').addClass('tpo-right')
                }
                for (var n = 0; n < correctRes2.length; n++) {
                    $(".answerTr2").find('span.showDisable[data-answer="' + correctRes2[n] + '"]').addClass('tpo-right')
                }
                /*答案比对*/
                var answer = "";
                var answers = $(".answerTr1").find('span.tpo-choice');
                for (var i = 0; i < answers.length; i++) {
                    if (i == 0) {
                        answer = $(answers[0]).html();
                    } else {
                        answer = answer + "," + $(answers[i]).html();
                    }
                }
                var answer1 = "";
                var answers1 = $(".answerTr2").find('span.tpo-choice');
                for (var i = 0; i < answers1.length; i++) {
                    if (i == 0) {
                        answer1 = $(answers1[0]).html();
                    } else {
                        answer1 = answer1 + "," + $(answers1[i]).html();
                    }
                }
                if (answer == questions[currentErrIndex].G1.correctResponse && answer1 == questions[currentErrIndex].G2.correctResponse) {
                    $('#g1AnswerDiv').css('color', '#00b551')
                    $('#g2AnswerDiv').css('color', '#00b551')
                } else {
                    $('#g1AnswerDiv').css('color', '#f54040')
                    $('#g2AnswerDiv').css('color', '#f54040')
                }
                yourAnswer = answer + "/" + answer1;
            }

            $('#yourAnswer').html(yourAnswer)
            if (yourAnswer == questions[currentErrIndex].correctResponse) {
                $('#yourAnswerDiv').css('color', '#00b551').find("#yourAnswer").css('color', '#00b551');
            } else {
                $('#yourAnswerDiv').css('color', '#f54040').find("#yourAnswer").css('color', '#f54040');
            }
        } else {
            $('.showEnable').show()
            $('.showDisable').hide()
            if (questions[currentErrIndex].questionType == 'single') {
                $('#singMul').find('.tpo-mistake').removeClass('tpo-mistake')
                $("#singMul").find('.tpo-right').removeClass('tpo-right')
            } else if (questions[currentErrIndex].questionType == 'multiple') {
                $('#singMul').find('.tpo-mistake').removeClass('tpo-mistake')
                $("#singMul").find('.tpo-right').removeClass('tpo-right')
            } else if (questions[currentErrIndex].questionType == 'insert') {
                $('#articleP').find('.tpo-mistake').removeClass('tpo-mistake')
                $("#articleP").find('.tpo-right').removeClass('tpo-right')
                $('.showDisable').hide()
            } else {
                $('#singMul').find('.tpo-mistake').removeClass('tpo-mistake')
                $("#singMul").find('.tpo-right').removeClass('tpo-right')
                $('#g1AnswerDiv').css('color', '#000')
                $('#g2AnswerDiv').css('color', '#000')
            }
            $('#yourAnswer').html('')
        }
    }

    //显示该题用户所选答案
    var showChoice = function() {
        if (records[currentQuestionIndex].answer) {
            if (questions[currentQuestionIndex].questionType != 'complex' && questions[currentQuestionIndex].questionType != 'insert') {
                //var answers = records[currentQuestionIndex].answer.split(',');
                var tmpAnswer=records[currentQuestionIndex].answer;
                if(tmpAnswer.indexOf("|")>0){
                    var answers = tmpAnswer.split('|');
                }else{
                    var answers = tmpAnswer.split(',');
                }

                if (answers[0] != "") {
                    for (var i = 0; i < answers.length; i++) {
                        $("#singMul").find('span.showEnable[data-answer="' + answers[i] + '"]').addClass('tpo-choice')
                    }
                }
            } else if (questions[currentQuestionIndex].questionType == 'insert') {
                var answers = records[currentQuestionIndex].answer.split(',');
                if (answers[0] != "") {
                    for (var i = 0; i < answers.length; i++) {
                        $(".questionBrContent").find('span.showEnable[data-answer="' + answers[i] + '"]').addClass('tpo-choice')
                    }
                }
            } else {
                //var answers = records[currentQuestionIndex].answer.split('/');
                var tmpAnswer=records[currentQuestionIndex].answer;
                if(tmpAnswer.indexOf("|")>0){
                    var answers = tmpAnswer.split('|');
                }else{
                    var answers = tmpAnswer.split('/');
                }
                var answers1=answers[0].replace("G1_","");
                var answers2=answers[1].replace("G2_","");


                answers1=="N"?$('#g1AnswerDiv').html(""):$('#g1AnswerDiv').html(answers1);
                answers2=="N"?$('#g2AnswerDiv').html(""):$('#g2AnswerDiv').html(answers2);
                answers1=answers1=="N"?"":answers1.split('');
                answers2=answers2=="N"?"":answers2.split('');

                /*var answers1 = answers[0].toString().split(',');
                var answers2 = answers[1].toString().split(',');

                $('#g1AnswerDiv').html(answers1.join(''));
                $('#g2AnswerDiv').html(answers2.join(''));*/

                if (answers1[0] != "") { //split会至少分割成一个
                    for (var i = 0; i < answers1.length; i++) {
                        $(".answerTr1").find('span.showEnable[data-answer=' + answers1[i] + ']').addClass('tpo-choice')
                    }
                }
                if (answers2[0] != "") { //split会至少分割成一个
                    for (var i = 0; i < answers2.length; i++) {
                        $(".answerTr2").find('span.showEnable[data-answer=' + answers2[i] + ']').addClass('tpo-choice')
                    }
                }
            }
        }
    }

    var showChoiceErr = function() {
        var currentErrIndex = localErr[localIndex].section_number;
        if (localRecords[localIndex].answer) {
            if (questions[currentErrIndex].questionType != 'complex' && questions[currentErrIndex].questionType != 'insert') {
            	if(localRecords[localIndex].answer.indexOf("|")>0){
    				var answers = localRecords[localIndex].answer.split('|');
    			}else{
    				var answers = localRecords[localIndex].answer.split(',');
    			}                
                if (answers[0] != "") {
                    for (var i = 0; i < answers.length; i++) {
                        $("#singMul").find('span.showEnable[data-answer="' + answers[i] + '"]').addClass('tpo-choice')
                    }
                }
            } else if (questions[currentErrIndex].questionType == 'insert') {
                var answers = localRecords[localIndex].answer.split(',');
                if (answers[0] != "") {
                    for (var i = 0; i < answers.length; i++) {
                        $(".questionBrContent").find('span.showEnable[data-answer="' + answers[i] + '"]').addClass('tpo-choice')
                    }
                }
            } else {
            	if(localRecords[localIndex].answer.indexOf("|")>0){
    				var answers = localRecords[localIndex].answer.split('|');
    			}else{
    				var answers = localRecords[localIndex].answer.split('/');
    			}
                
                var answers1 = answers[0].toString().split(',');
                var answers2 = answers[1].toString().split(',');

                $('#g1AnswerDiv').html(answers1.join(''));
                $('#g2AnswerDiv').html(answers2.join(''));

                if (answers1[0] != "") { //split会至少分割成一个
                    for (var i = 0; i < answers1.length; i++) {
                        $(".answerTr1").find('span.showEnable[data-answer=' + answers1[i] + ']').addClass('tpo-choice')
                    }
                }
                if (answers2[0] != "") { //split会至少分割成一个
                    for (var i = 0; i < answers2.length; i++) {
                        $(".answerTr2").find('span.showEnable[data-answer=' + answers2[i] + ']').addClass('tpo-choice')
                    }
                }
            }
        }
    }

    var questionPage = function(param) {
        //题号前面板进行保存
        // $('.tpo-right-part3').css('display', 'block')
        currentQuestionIndex = parseInt(param.pageNum);
        var questionsNum = []; //题号数组面板
        var renderData = {};renderData.xm_title=xm_title;
        //renderData.artical = artical;
        renderData.artical = arrArtical[currentQuestionIndex];
        renderData.question = questions[currentQuestionIndex];
        for (var i = 1; i <= questions.length; i++) {
            questionsNum.push(i)
        }
        renderData.questionsNum = questionsNum;
        renderData.questionsLength = questionsNum.length;
        renderData.currentQuestionIndex = currentQuestionIndex;
        // renderData.vip_user = vip_user;
        var _afterRender = function() {
            var _afterRender1 = function() {
                if (currentQuestionIndex == 0) {
                    $("#preQuestion1").css('display', 'none')
                } else {
                    $("#preQuestion1").css('display', 'block')
                }
                $(".questionBrContent").html(renderData.question.prompt.replace(/\n/gi, "<br/>"));
                showChoice();
                var prompt=renderData.question.prompt;
                if(renderData.question.questionType=='insert'){
                    prompt=prompt.replace('$$','<label style="color:#00b551;">');
                    prompt=prompt.replace('$$','</label>');
                }
            };
            var param2 = {
                "wrap": $('#tpoReadPart2'),
                "tmplName": TMPL.t3,
                "tmplData": renderData,
                "afterRender": _afterRender1
            };
            renderTemplate(param2)
        };
        var param1 = {
            "tmplName": TMPL.t2,
            "tmplData": renderData,
            "afterRender": _afterRender
        }
        renderTemplate(param1);
    }

    var questionPageErr = function(param) {
        //题号前面板进行保存
        // $('.tpo-right-part3').css('display', 'block')
        var currentErrIndex = parseInt(param.pageNum);
        localIndex = parseInt(param.localIndex);
        var questionsNum = []; //题号数组面板
        var renderData = {};renderData.xm_title=xm_title;
        //renderData.artical = artical;
        renderData.artical = arrArtical[currentErrIndex];
        renderData.question = questions[currentErrIndex];
        for (var i = 0; i < localErr.length; i++) {
            questionsNum.push(localErr[i].section_number + 1)
        }
        renderData.questionsNum = questionsNum;
        renderData.questionsLength = questions.length;
        renderData.currentQuestionIndex = currentErrIndex;
        renderData.vip_user = vip_user;

        var _afterRender = function() {
            var _afterRender1 = function() {
                if (currentErrIndex == 0) {
                    $("#preQuestionErr1").css('display', 'none')
                } else {
                    $("#preQuestionErr1").css('display', 'block')
                }
                var prompt=renderData.question.prompt;
                if(renderData.question.questionType=='insert'){
                    prompt=prompt.replace('$$','<label style="color:#00b551;">');
                    prompt=prompt.replace('$$','</label>');
                }
                $(".questionBrContent").html(prompt.replace(/\n/gi, "<br/>"));
                showChoiceErr();
            };
            var param2 = {
                "wrap": $('#tpoReadPart2'),
                "tmplName": TMPL.t9,
                "tmplData": renderData,
                "afterRender": _afterRender1
            };
            renderTemplate(param2);
        }

        var param1 = {
            //"wrap": $('#tpoReadPart2'),
            "tmplName": TMPL.t2,
            "tmplData": renderData,
            "afterRender": _afterRender
        }
        renderTemplate(param1)
    }

    //保存做题记录
    var saveChoice = function() {
        playCount = 0;
        //记录该题记录
        if (questions[currentQuestionIndex].questionType == 'single') {
            var answer = "";
            if ($("#singMul").find('span.tpo-choice').length) {
                answer = $($("#singMul").find('span.tpo-choice')[0]).html();
                if (answer == questions[currentQuestionIndex].correctResponse) {
                    records[currentQuestionIndex].is_correct = true;
                } else {
                    records[currentQuestionIndex].is_correct = false;
                }
            }
            records[currentQuestionIndex].answer = answer;
        } else if (questions[currentQuestionIndex].questionType == 'insert') {
            var answer = "";
            if ($(".questionBrContent").find('span.tpo-choice').length) {
                answer = $($(".questionBrContent").find('span.tpo-choice')[0]).html();
                if (answer == questions[currentQuestionIndex].correctResponse) {
                    records[currentQuestionIndex].is_correct = true;
                } else {
                    records[currentQuestionIndex].is_correct = false;
                }
            }
            records[currentQuestionIndex].answer = answer;
        } else if (questions[currentQuestionIndex].questionType == 'multiple') {
            var answer = "";
            var submitAnswer="";
            var answers = $("#singMul").find('span.tpo-choice');
            for (var i = 0; i < answers.length; i++) {
                if (i == 0) {
                    answer = $(answers[0]).html();
                    submitAnswer = $(answers[0]).html();
                } else {
                    answer = answer + "," + $(answers[i]).html();
                    submitAnswer = submitAnswer + "|" + $(answers[i]).html();
                }
            }
            if (answer == questions[currentQuestionIndex].correctResponse) {
                records[currentQuestionIndex].is_correct = true;
            } else {
                records[currentQuestionIndex].is_correct = false;
            }
            //records[currentQuestionIndex].answer = answer;
            records[currentQuestionIndex].answer = submitAnswer;
        } else {
            var answer = "";
            var answers = $(".answerTr1").find('span.tpo-choice');
            for (var i = 0; i < answers.length; i++) {
                if (i == 0) {
                    answer = $(answers[0]).html();
                } else {
                    answer = answer + "," + $(answers[i]).html();
                }
            }

            var answer1 = "";
            var answers1 = $(".answerTr2").find('span.tpo-choice');
            for (var i = 0; i < answers1.length; i++) {
                if (i == 0) {
                    answer1 = $(answers1[0]).html();
                } else {
                    answer1 = answer1 + "," + $(answers1[i]).html();
                }
            }
            if (answer == questions[currentQuestionIndex].G1.correctResponse && answer1 == questions[currentQuestionIndex].G2.correctResponse) {
                records[currentQuestionIndex].is_correct = true;
            } else {
                records[currentQuestionIndex].is_correct = false;
            }
            var submitAnswer1="G1";
            var submitAnswer2="G2";
            if (answers.length == 0) {
                submitAnswer1 = submitAnswer1 + "_N";
            } else {
                for (var i = 0; i < answers.length; i++) {
                    if (i == 0) {
                        submitAnswer1 = submitAnswer1 + "_" + $(answers[0]).html();
                    } else {
                        submitAnswer1 = submitAnswer1 + "" + $(answers[i]).html();
                    }
                }
            }
            if (answers1.length == 0) {
                submitAnswer2 = submitAnswer2 + "_N";
            } else {
                for (var i = 0; i < answers1.length; i++) {
                    if (i == 0) {
                        submitAnswer2 = submitAnswer2 + "_" + $(answers1[0]).html();
                    } else {
                        submitAnswer2 = submitAnswer2 + "" + $(answers1[i]).html();
                    }
                }
            }

            records[currentQuestionIndex].answer = submitAnswer1 + "|" + submitAnswer2;
        }
    }
    //保存做题记录
    var saveChoiceErr = function() {
        playCount = 0;
        var currentErrIndex = localErr[localIndex].section_number;
        //记录该题记录
        if (questions[currentErrIndex].questionType == 'single') {
            var answer = "";
            if ($("#singMul").find('span.tpo-choice').length) {
                answer = $($("#singMul").find('span.tpo-choice')[0]).html();
                if (answer == questions[currentErrIndex].correctResponse) {
                    localRecords[localIndex].is_correct = true;
                }
            }
            localRecords[localIndex].answer = answer;
        } else if (questions[currentErrIndex].questionType == 'insert') {
            var answer = "";
            if ($(".questionBrContent").find('span.tpo-choice').length) {
                answer = $($(".questionBrContent").find('span.tpo-choice')[0]).html();
                if (answer == questions[currentErrIndex].correctResponse) {
                    localRecords[localIndex].is_correct = true;
                }
            }
            localRecords[localIndex].answer = answer;
        } else if (questions[currentErrIndex].questionType == 'multiple') {
//        	 var answer = "";
//             var submitAnswer="";
//             var answers = $("#singMul").find('span.tpo-choice');
//             for (var i = 0; i < answers.length; i++) {
//                 if (i == 0) {
//                     answer = $(answers[0]).html();
//                     submitAnswer = $(answers[0]).html();
//                 } else {
//                     answer = answer + "," + $(answers[i]).html();
//                     submitAnswer = submitAnswer + "|" + $(answers[i]).html();
//                 }
//             }
//             if (answer == questions[currentQuestionIndex].correctResponse) {
//                 records[currentQuestionIndex].is_correct = true;
//             } else {
//                 records[currentQuestionIndex].is_correct = false;
//             }
//             //records[currentQuestionIndex].answer = answer;
//             records[currentQuestionIndex].answer = submitAnswer;	
        	        	
            var answer = "";
            var answers = $("#singMul").find('span.tpo-choice');
            for (var i = 0; i < answers.length; i++) {
                if (i == 0) {
                    answer = $(answers[0]).html();
                } else {
                    answer = answer + "," + $(answers[i]).html();
                }
            }
            if (answer == questions[currentErrIndex].correctResponse) {
                localRecords[localIndex].is_correct = true;
            }
            localRecords[localIndex].answer = answer;
        } else {
            var answer = "";
            var answers = $(".answerTr1").find('span.tpo-choice');
            for (var i = 0; i < answers.length; i++) {
                if (i == 0) {
                    answer = $(answers[0]).html();
                } else {
                    answer = answer + "," + $(answers[i]).html();
                }
            }

            var answer1 = "";
            var answers1 = $(".answerTr2").find('span.tpo-choice');
            for (var i = 0; i < answers1.length; i++) {
                if (i == 0) {
                    answer1 = $(answers1[0]).html();
                } else {
                    answer1 = answer1 + "," + $(answers1[i]).html();
                }
            }
            if (answer == questions[currentErrIndex].G1.correctResponse && answer1 == questions[currentErrIndex].G2.correctResponse) {
                localRecords[localIndex].is_correct = true;
            }
            localRecords[localIndex].answer = answer + "/" + answer1;
        }
    }

    var tpoReadSubmit = function() {
        var callback_submit = function() {
            //var date=new Date($.ajax({async: false}).getResponseHeader("Date"));
        	var date=getTime();
            xm_endTime=zeroFn(date.getFullYear())+"-"+zeroFn((date.getMonth()+1))+"-"+zeroFn(date.getDate())+" "+zeroFn(date.getHours())+":"+zeroFn(date.getMinutes())+":"+zeroFn(date.getSeconds());
            date=null;
            var correctCount = 0;
            var errorCount = 0;
            var question_results = [];
            for (var i = 0; i < records.length; i++) {
                var question_result = {};
                question_result.answer = records[i].answer;
                question_result.section_number = records[i].section_number;
                if (records[i].is_correct) {
                    question_result.is_correct = 1;
                } else {
                    question_result.is_correct = 2;
                }

                question_results.push(question_result);
                if (records[i].is_correct) {
                    correctCount = correctCount + 1;
                } else {
                    errorCount = errorCount + 1;
                }
            }
            var rate = correctCount + "/" + records.length;
            var _success = function(json) {
            	exerciseApi.updateListItem();
                //var date=new Date($.ajax({async: false}).getResponseHeader("Date"));
            	var date=getTime();
                xm_endTime=zeroFn(date.getFullYear())+"-"+zeroFn((date.getMonth()+1))+"-"+zeroFn(date.getDate())+" "+zeroFn(date.getHours())+":"+zeroFn(date.getMinutes())+":"+zeroFn(date.getSeconds());
                date=null;
                next_question_id = json.next_question_id;
                next_group_name = json.next_group_name;
                next_type_name = json.next_type_name;
                next_rate = json.next_rate;
                is_last_question = json.is_last_question;

                //tpoNum = next_group_name;
                var renderData = {};renderData.xm_title=xm_title;
                renderData.correctCount = correctCount;
                renderData.errorCount = errorCount;
                renderData.question_results = question_results;
                renderData.sequence_number = artical.sequence_number; //所属第几篇文章
                renderData.tpoNum = tpoNum;
                renderData.rate = parseInt(correctCount / records.length * 100);
                renderData.question_id = artical.id;
                //下一单元
                renderData.next_question_id = next_question_id;
                renderData.next_group_name = next_group_name;
                renderData.next_type_name = next_type_name;
                renderData.next_rate = next_rate;
                renderData.is_last_question = is_last_question;
                renderData.sectionType = xm_sectionType;
                renderData.sectionTypeNum = xm_sectionTypeNum;
                renderData.isFromPlan=exerciseApi.isFromPlan;
                var param = {
                    "tmplName": TMPL.t4,
                    "tmplData": renderData,
                    "afterRender": ''
                }
                renderTemplate(param)
            };
            $.ajax({
                //url: URL.baseURL9 + 'tpo_results/save_results',
                url: URL.xiaomaURL + 'tpo/read/results',
                data: JSON.stringify({
                    "group_id": artical.id,
                    "rate": rate,
                    "question_results": question_results,
                    "planDayId":xm_planDayId,
                    "exerciseId":xm_exerciseId,
                    "startTime":xm_startTime,
                    "endTime":xm_endTime
                }),
                type: 'Post',
                contentType: "application/json",
                headers: {
                    "Authorization": exerciseApi.xiaomaToken
                },
                success: _success
            })
        };
        //用户为空时弹出登陆框
        //if (isEmpty(token)) {
        //	$('#dialogLogin').modal({
        //		backdrop: 'static'
        //	})
        //	$('#dialogLogin').bind('hidden.bs.modal', function(e) {
        //		// debugger
        //		BaseCookie.get()
        //		if (!isEmpty(BaseCookie.getToken())) {
        //			token = BaseCookie.getToken()
        //			$('body,html').animate({
        //				scrollTop: 0
        //			}, 100)
        //			callback_submit()
        //		}
        //	})
        //} else {
        //	$('body,html').animate({
        //		scrollTop: 0
        //	}, 100)
        //	callback_submit()
        //}
        callback_submit();
    }

    var tpoReadSubmitErr = function() {
        var callback_submit = function() {
            var correctCount = 0;
            var errorCount = 0;
            var question_results = [];
            for (var i = 0; i < localRecords.length; i++) {
                var question_result = {};
                question_result.section_number = localRecords[i].section_number;
                if (localRecords[i].is_correct) {
                    question_result.is_correct = 1;
                } else {
                    question_result.is_correct = 2;
                }

                question_results.push(question_result)
                if (localRecords[i].is_correct) {
                    correctCount = correctCount + 1;
                } else {
                    errorCount = errorCount + 1;
                }
            }
            var renderData = {};renderData.xm_title=xm_title;
            renderData.correctCount = correctCount;
            renderData.errorCount = errorCount;
            renderData.question_results = question_results;
            renderData.sequence_number = artical.sequence_number; //所属第几篇文章
            renderData.tpoNum = tpoNum;
            // renderData.rate = parseInt(correctCount / records.length * 100);
            renderData.question_id = artical.id;
            //下一单元
            renderData.next_question_id = next_question_id;
            renderData.next_group_name = next_group_name;
            renderData.next_type_name = next_type_name;
            renderData.next_rate = next_rate;
            renderData.is_last_question = is_last_question;
            renderData.sectionType = xm_sectionType;
            renderData.sectionTypeNum = xm_sectionTypeNum;
            renderData.isFromPlan=exerciseApi.isFromPlan;
            var param = {
                "tmplName": TMPL.t11,
                "tmplData": renderData,
                "afterRender": ''
            }
            renderTemplate(param)
        }
        $('body,html').animate({
            scrollTop: 0
        }, 100)
        callback_submit()
    }

    var againtpoRead = function(param) {
        var param1 = {};
        if (isEmpty(param.questionId)) {
            param1 = {
                'groupId': artical.id //为空是，是从计算的结果页来，需从article中拿id就行
            };
        } else {
            param1 = {
                //'question_id': param.question_id //不为空是，是从单元列表进来，需再取一次question_id
                groupId:xm_groupId
            };
        }
        artical = {};
        questions = [];
        currentQuestionIndex = 0;
        records = [];
        tpoReadUnitDetail(param1)
    }

    var audioPlay = function(param) {
        var source = $($('.jiexiAudio')[param]).attr('data-source');
        var content = '<script src="http://p.bokecc.com/player?vid=' + source + '&siteid=B86E9AC935D39444&autoStart=true&width=720&height=400&playerid=3B89CC3CB774B9A8&playertype=1" type="text/javascript"></script>';
        $("#audioPlayDiv").html(content)
    }
    //音频模态框播放
    var showAudioPlayModal = function(param) {
        if ($('#audioAudio').length > 0) {
            $(".audioImg").attr("src", "../../i/i20.png")
            $("#audioAudio")[0].pause()
            $('#audioQuestion')[0].pause()
        }
        $('#audioPlayModal').modal({
            backdrop: 'static'
        })
        if (playCount == 0) { //第一次播放，控制播放窗口位置
            $('#audioPlayModal').on('shown.bs.modal', function(e) {
                $('#audioPlayModal .modal-dialog').css('left', (parseInt($('#audioPlayModal .modal-dialog').css('left')) - 120) + 'px')
            })
            playCount = 1;
        };
        audioPlay(param)
    }

    //重做错题
    var errOnlytpoRead = function(param) {
        var groupId = param.groupId;
        //置空全局变量
        currentQuestionIndex = 0;
        localErr = [];
        localTmp = [];
        localRecords = [];
        localIndex = 0;
        $('body,html').animate({
            scrollTop: 0
        }, 100);

        //是否需要重新加载文章、题目、vip_user
        if (param.pickArtical) {
            var _success = function(json) {
                //加载文章和题目信息, vip_user
                json= $.parseJSON(json);
                gettpoRead(json);
                var _success2 = function(json) {
                    json= $.parseJSON(json);
                    var tpo_results = json.results;
                    for (var i = 0; i < tpo_results.length; i++) {
                        if (tpo_results[i].is_correct == 2) {
                            localErr.push(tpo_results[i])
                        }
                    }
                    rendertpoReadErr()
                };
                $.ajax({
                    url: URL.xiaomaURL + 'tpo/read/results/'+param.groupId,
                    type: 'get',
                    headers: {
                        "Authorization": exerciseApi.xiaomaToken
                    },
                    success: _success2
                })
            }
            $.ajax({
                //url: URL.baseURL9 + 'tpo_questions/web',
                url: URL.xiaomaURL + 'tpo/read/questions/'+param.groupId,
                type: 'get',
                headers: {
                    "Authorization": exerciseApi.xiaomaToken
                },
                success: _success
            })
        }else{
            var _success1 = function(json) {
                json= $.parseJSON(json);
                var tpo_results = json.results;
                for (var i = 0; i < tpo_results.length; i++) {
                    if (tpo_results[i].is_correct == 2) {
                        localErr.push(tpo_results[i])
                    }
                }
                rendertpoReadErr()
            }

            $.ajax({
                url: URL.xiaomaURL + 'tpo/read/results/'+param.groupId,
                type: 'get',
                headers: {
                    "Authorization": exerciseApi.xiaomaToken
                },
                success: _success1
            })
        }


    }

    var errOnlytpoReadErr = function(param) {
        var question_id = param.question_id;
        //置空全局变量54
        var currentErrIndex = 0;
        localTmp = [];
        localRecords = [];
        localIndex = 0;
        $('body,html').animate({
            scrollTop: 0
        }, 100)
        rendertpoReadErr()
    }

    //错题页
    var rendertpoReadErr = function() {
        //题号面板
        var questionsNum = [];
        var currentErrIndex = localErr[0].section_number;
        var renderData = {};renderData.xm_title=xm_title;
        //renderData.artical = artical;
        renderData.artical = arrArtical[currentErrIndex];
        renderData.tpoNum = tpoNum;
        //加载错题中第一题
        renderData.question = questions[currentErrIndex];
        for (var i = 0; i < localErr.length; i++) {
            questionsNum.push(localErr[i].section_number + 1);
            var localRecord = {};

            //localRecord初始化为空
            // localRecord.section_number = i;
            localRecord.section_number = localErr[i].section_number;
            localRecord.is_correct = false;
            localRecord.answer = "";
            localRecords.push(localRecord)
        }
        renderData.questionsNum = questionsNum;
        renderData.questionsLength = questions.length;
        renderData.currentQuestionIndex = currentErrIndex;
        renderData.vip_user = vip_user;

        var _afterRender = function() {
            var _afterRender1 = function() {
                $("#preQuestionErr1").css('display', 'none');
                $(".questionBrContent").html(renderData.question.prompt.replace(/\n/gi, "<br/>"))
            };
            var param2 = {
                "wrap": $('#tpoReadPart2'),
                "tmplName": TMPL.t9,
                "tmplData": renderData,
                "afterRender": _afterRender1
            };
            renderTemplate(param2);
        };

        var param1 = {
            "tmplName": TMPL.t2,
            "tmplData": renderData,
            "afterRender": _afterRender
        }
        renderTemplate(param1)
    }

    var localTmpToErr = function() {
        for (var i = 0; i < localErr.length; i++) {
            if (!localRecords[i].is_correct) {
                localTmp.push(localErr[i])
            }
        }
        localErr = localTmp;
    }

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
            wrap: param.wrap || $wrap,
            isAppend: false || param.isAppend,
            tmpl: {
                tmplName: param.tmplName,
                tmplData: param.tmplData
            },
            afterRender: param.afterRender
        })
    }

    var isEmpty = function(param) {
        if (null == param || "" == param || tokenTmp == param) {
            return true
        } else {
            return false
        }
    }
    var zeroFn=function(n){
        n=n<10?"0"+n:n;
        return n;
    };
    function getTime(){ 
    	return new Date($.ajax({url: window.xiaoma.basePath+"/gettime",async: false}).getResponseHeader("Date"));
    }
    var showTpoRead=function(groupId,planDayId,exerciseId,type,xmTitle){
        xm_groupId=groupId;
        xm_planDayId=planDayId;
        xm_exerciseId=exerciseId;
        xm_type=type;
        xm_title=xmTitle;
        var param={
            groupId:xm_groupId,
            type:xm_type
        };
        tpoReadUnitDetail(param);
    };
    var gotoHisResult=function(groupId,planDayId,exerciseId,type,xmTitle){
        xm_groupId=groupId;
        xm_planDayId=planDayId;
        xm_exerciseId=exerciseId;
        xm_type=type;
        xm_title=xmTitle;
        var param={
            groupId:xm_groupId,
            type:xm_type
        };
        currentQuestionIndex=0;
        tpoReadResult(param)
    };
    return {
        init: init,
        showTpoRead:showTpoRead,
        gotoHisResult:gotoHisResult
    }
})