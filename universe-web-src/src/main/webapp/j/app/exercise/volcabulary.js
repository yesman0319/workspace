'use strict'

define(['common/uniqueAjax', 'common/render', 'xml2json', 'app/baseURL', 'baseCookie', 'lib/store'], function (uniqueAjax, Render, xml2json, URL, BaseCookie) {
    var _conf,
        $wrap,
        TMPL = {
            t1: 'app/exercise/tmpl_volcabulary',
            t2: 'app/exercise/tmpl_vol_accuracy_nouser',
            t3: 'app/exercise/tmpl_vol_unit',
            // t4: 'app/exercise/tmpl_vol_unit_nouser',
            t5: 'app/exercise/tmpl_vol_accuracy',
            t6: 'app/exercise/tmpl_volcabulary_err',
            t7: 'app/exercise/tmpl_vol_accuracy_err',
            t8: 'app/exercise/tmpl_vol_login',
            t9: 'app/exercise/tmpl_volcabulary_question' //解决始终隐藏bug
        };
    var localErr = [], //存储本地练习错题
        localTmp = [],
        tokenTmp,
        gloablErr = [],
        allGroups,
        unitCount, //存储正常做题每道题的内容
        tokenTmp1 = "xiaoma",
        xm_groupId='',
        xm_planDayId='',
        xm_exerciseId='',
        xm_startTime='',
        xm_endTime='',
        xm_title='';
       // xiaomaToken = "bearer b23b2aad4b8543f1a5c0c5ef5ea74182";
    var startTime, //用于积分时间计算
        endTime;
    var durationTime = 0; //计时时间
    var currentTestTimeStrVol, //当前时间字符串，用于下一题同步显示时间
        testTimerIDVol; //计时器ID
    var groupLevelCommon, //记录common/group_level的group_level
        groupLevelOld;
    var isRewardCoupon = false;
    var requestFirestWordStatus = 0; //列表进详情页之间空挡时期状态标记 0 可提示需解锁提示框 1 代表不提示需解锁提示框.
    var list_status = 0; //是否付费解锁  0 未解锁 1 已解锁

    var init = function (conf) {
        _conf = $.extend({
            wrap: ''
        }, conf || {})
        $wrap = $(_conf.wrap)
        BaseCookie.get()
        tokenTmp = BaseCookie.getToken();
        if (isEmpty(tokenTmp)) {
            tokenTmp = tokenTmp1
        }
        initEvent()
        // if (tokenTmp == tokenTmp1) {
        // if (!isEmpty(tokenTmp)) {
        /*getGroups()*/
        // }
    }

    var initEvent = function () {
        $(document).on('trigger_side8', '#side8', vocalbularyFun)
        //$(document).on('click', '#side8', vocalbularyFun)
        //$(document).on('click', '#unitVol', unitVolFun)
        //$(document).on('click', '#unitEnd', unitVolFun)
        $(document).on('click', '#volLogin', function () {
            $('#dialogLogin').modal({
                backdrop: 'static'
            })
        })
        //添加单元列表页小旗子鼠标滑过
        $(document).on('mouseover', '.i25-6', function (e) {
            var srcString = $(e.target).attr('src');
            var pngIndex = srcString.indexOf('.png');
            var src = srcString.substring(0, pngIndex) + '-1.png';
            $(e.target).attr('src', src)
        })
        $(document).on('mouseout', '.i25-6', function (e) {
            var srcString = $(e.target).attr('src');
            var pngIndex = srcString.indexOf('-1.png');
            var src = srcString.substring(0, pngIndex) + '.png'
            $(e.target).attr('src', src)
        })
        $(document).on('click', '#btn', function () {
            $('#dialogLogin').modal({
                backdrop: 'static'
            })
        })
        $(document).on('click', '.unitVolDetail', function (e) {
            var data = {
                'volUnit': $(e.target).attr('data-volUnit'),
                'groupId': $(e.target).attr('data-groups-id'),
                'rate': $(e.target).attr('data-rate') / 100,
                'avg_speed': $(e.target).attr('data-avg_speed'),
                'group_level': $(e.target).attr('data-group_level')
            }
            unitVolDetailFun(data)
        })
        $(document).on('click', '.unitVolDetailWord', function (e) {
            var target = e.target;
            if ($(this).attr("data-locked") == 1 && requestFirestWordStatus == 0) {
                $("#lockModal").modal();
                return;
            }
            var paramTmp = {
                'volUnit': $(e.target).attr('data-volUnit'),
                'groupId': $(e.target).attr('data-groups-id'),
                'rate': -1
            }

            //是否提示词汇弹框
            if ($(this).hasClass('firstVol')) {
                if (isEmpty(tokenTmp)) { //token为空的时候弹
                    $("#firstModal").modal({
                        backdrop: 'static'
                    });
                    $('#firstSure').unbind("click"); //移除click
                    $(document).on('click', '#firstSure', function () {
                        requestFirestWordStatus = 1;
                        $(target).removeClass('firstVol');
                        $('#firstModal').on('hidden.bs.modal', function (e) {
                            unitVolDetailFun(paramTmp)
                        });
                        $('#firstModal').modal('hide')
                    })
                } else {
                    $.ajax({
                        url: URL.baseURL12 + 'vocabulary_results/first_exercise',
                        type: 'get',
                        async: false,
                        headers: {
                            Authorization: tokenTmp
                        },
                        data: {
                            group_id: $(e.target).attr('data-groups-id')
                        },
                        success: function (json) {
                            if (json.status == 1) { //是第一次练习
                                $("#firstModal").modal();
                                $('#firstSure').unbind("click"); //移除click
                                $(document).on('click', '#firstSure', function () {
                                    requestFirestWordStatus = 1;
                                    $(target).removeClass('firstVol');
                                    $('#firstModal').on('hidden.bs.modal', function (e) {
                                        unitVolDetailFun(paramTmp)
                                    });
                                    $('#firstModal').modal('hide')
                                })
                            } else {
                                unitVolDetailFun(paramTmp)
                            }
                        }
                    })
                }
            } else {
                unitVolDetailFun(paramTmp)
            }
        })
        //做题 点击选项
        $(document).on('click', '.choiceVol', function (e) {
            e= e||window.event;
            e.target= e.target|| e.srcElement;
            var data = {
                'obj': $(e.target),
                'answer': $(e.target).attr('data-answer'),
                'volId': $(e.target).attr('data-volId')
            };
            choiceVolFun(data)
        })
        $(document).on('click', '.choiceVolErr', function (e) {
            var data = {
                'obj': $(e.target),
                'answer': $(e.target).attr('data-answer'),
                'volId': $(e.target).attr('data-volId'),
                // 'errId': $(e.target).attr('data-errId'),
                'errAnswer': $(e.target).attr('data-erranswer')
            };
            choiceVolErrFun(data)
        })
        $(document).on('click', '#againVol', function (e) {
            var data = {
                'volUnit': $(e.target).attr('data-volUnit'),
                'volGroupId': $(e.target).attr('data-volGroupId')
            };
            againVolFun(data)
        })
        $(document).on('click', '#errOnlyVol', errOnlyVolFun)
        $(document).on('click', '#errOnlyVolErr', errOnlyVolErrFun)
        $(document).on('click', '#nextUnitVol', function (e) {
            $(this).addClass("disabled");
            nextUnitVolFun(e)
        })
        $(document).on('click', '#nextUnitVolErr', function (e) {
            $(this).addClass("disabled");
            nextUnitVolErrFun(e)
        })
        $(document).on('click', '.timeBtn', function () {
            if ($('#testTimer').css('display') == 'none') {
                $('.timeBtn').html('计时:');
                $('#testTimer').css('display', 'inline-block');
            } else {
                $('.timeBtn').html('显示');
                $('#testTimer').css('display', 'none');
            }
        })
        $(document).on('click', '#volSubmit', function (e) {
            clearTimerVol(); //弹出登录层暂停时间
            $('#dialogLogin').modal({
                backdrop: 'static'
            })
        })
        $(document).on('click', '#closeQuan', function () {
            closeDiv('quanDiv', 'fade')
        })
    }

    /**
     * 获取最好等级
     * @param id
     * @returns {number}
     */
    var getGroupLevelFromList = function (id, allGroups) {
        var groupLevel = -1; //当前题默认等级
        var leftUnLocked = true; //当前题左侧所有题默认解锁状态
        var nextUnLocked = false; //当前下一题默认解锁状态
        if (allGroups) {
            for (var i = 0; i < allGroups.length; i++) {
                var group = allGroups[i];
                if (group.id != id && group.locked == 1) {
                    leftUnLocked = false;
                }
                if (group.id == id) {
                    groupLevel = group.group_level;
                    if ((i < allGroups.length - 1 && allGroups[i + 1].group_level != null) || i == allGroups.length - 1) {
                        nextUnLocked = true;
                    }
                    break;
                }
            }
        }
        if (list_status == 1) {
            nextUnLocked = true;
        }
        //return groupLevel;
        return {
            groupLevel: groupLevel,
            leftUnLocked: leftUnLocked,
            nextUnLocked: nextUnLocked
        };
    }

    /**
     * 同步Group等级
     * @param id
     * @param allGroups
     * @param groupLevel
     */
    var syncGroupsGroupLevel = function (id, allGroups, groupLevel) {
        if (id && allGroups && groupLevel) {
            for (var i = 0; i < allGroups.length; i++) {
                if (allGroups[i].id == id) {
                    allGroups[i].group_level = groupLevel;
                    allGroups[i].locked = 0;
                    break;
                }
            }
        }
    }

    /**
     * 检测当次测试是否为最好成绩
     * @param data
     * @returns {boolean}
     */
    var checkGroupBetterResult = function (data) {
        var better = false;
        if (allGroups) {
            for (var i = 0; i < allGroups.length; i++) {
                var group = allGroups[i];
                if (group.id == data.id) {
                    var rate = group.rate ? parseFloat(group.rate) : -1;
                    var avg_speed = group.avg_speed ? parseFloat(group.avg_speed) : -1;
                    if (rate > -1 && avg_speed > -1) {
                        if (rate >= 0.9 && data.rate < 0.9) {
                            better = false;
                        } else if (rate < 0.9 && data.rate >= 0.9) {
                            better = true;
                        } else if (rate < 0.9 && data.rate < 0.9) {
                            if (data.rate > rate || (rate == data.rate && data.avg_speed < avg_speed)) {
                                better = true;
                            }
                        } else {
                            if (data.avg_speed < avg_speed || (avg_speed == data.avg_speed && data.rate > rate)) {
                                better = true;
                            }
                        }
                    } else {
                        better = true;
                    }
                    break;
                }
            }
        }
        return better;
    }

    var startTimerVol = function () {
            //var date=new Date($.ajax({async: false}).getResponseHeader("Date"));
    	    var date=getTime();
            xm_startTime=zeroFn(date.getFullYear())+"-"+zeroFn((date.getMonth()+1))+"-"+zeroFn(date.getDate())+" "+zeroFn(date.getHours())+":"+zeroFn(date.getMinutes())+":"+zeroFn(date.getSeconds());
            date=null;
        var fn = function () {
            if ($("#testTimer").length <= 0) {
               // console.log("not find target");
                clearTimerVol();
            }

            var checkTime = function (i) {
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
            //var dd = parseInt(ts / 60 / 60 / 24, 10); //计算剩余的天数
            var hh = parseInt(ts / 60 / 60 % 24, 10); //计算剩余的小时数
            var mm = parseInt(ts / 60 % 60, 10); //计算剩余的分钟数
            var ss = parseInt(ts % 60, 10); //计算剩余的秒数
            //dd = checkTime(dd);
            hh = checkTime(hh);
            mm = checkTime(mm);
            ss = checkTime(ss);
            currentTestTimeStrVol = hh + ":" + mm + ":" + ss;
            $("#testTimer").html(currentTestTimeStrVol);
        };
        if (testTimerIDVol) return;
        testTimerIDVol = window.setInterval(fn, 1000);
    };


    var clearTimerVol = function () {
        window.clearInterval(testTimerIDVol);
        testTimerIDVol = undefined;
    }

    //词汇结果页
    var renderVolResult = function (json, rate, isBest,groupLevel) {//错题 正确率
        var group_level = null;
        //本地计算平均速度公式中
        if (startTime) {
            group_level=groupLevel;
            var spend_time = Math.round(durationTime);
            // var spend_time = Math.round((endTime.getTime() - startTime.getTime()) / 1000);
            var avg_speed = spend_time / store.get('vocabularys').length;
            var avg_string = avg_speed.toString();
            var avg_index = avg_string.indexOf('.');
            // var Digit = {};
            var digitRound = function (digit, length) {
                length = length ? parseInt(length) : 0;
                if (length <= 0) return Math.round(digit);
                digit = Math.round(digit * Math.pow(10, length)) / Math.pow(10, length);
                return digit;
            };
            if (avg_speed <= 10 && avg_speed > 0) {
                // avg_speed = avg_string.substring(0, avg_index + 3) + 's'
                avg_speed = digitRound(avg_string, 2).toString() + 'S'
            } else if (avg_speed <= 60) {
                // avg_speed = avg_string.substring(0, avg_index) + 's'
                avg_speed = Math.round(avg_string).toString() + 'S'
            } else if (avg_speed <= 3600) {
                var avg_string1 = avg_speed / 60;
                avg_speed = digitRound(avg_string1, 1).toString() + 'MIN'
            } else if (avg_speed > 3600) {
                var avg_string2 = avg_speed / 3600;
                avg_speed = Math.round(avg_string2).toString() + 'H'
            }
            //$.ajax({
            //    url: URL.baseURL9 + 'common/group_level',
            //    type: 'get',
            //    async: false,
            //    headers: {
            //    	Authorization: exerciseApi.xiaomaToken//老接口 改token20160909
            //    },
            //    data: {
            //    	module_type: 2,
            //    	rate: rate,
            //    	spend_time: spend_time,
            //    	amount: 100,
            //    	group_id: store.get('volGroupId')
            //    },
            //    success: function (json) {
            //        group_level = json.group_level;
            //        groupLevelCommon = group_level;
            //        isRewardCoupon = json.is_reward_coupon;
            //    }
            //})
        } else {
            group_level = json.group_level;
            avg_speed = json.avg_speed;
        }
        var volErr = [];var answerArr=[];//20160909
        store.set('volNum', '1')
        store.set('vocabularys', [])
        store.set('volCorrectAnswer', '')
        store.set('volId', '');
        if (json.vocabulary_results && !isEmpty(json.vocabulary_results[0].vocabulary_question)) {
            for (var i = 0; i < json.vocabulary_results.length; i++) {
                var errTmp = {
                    'id': json.vocabulary_results[i].vocabulary_question.id, //错题在数据库中的id
                    'volErr': renderXmlVol(json.vocabulary_results[i].vocabulary_question), //题的内容
                    'errNum': parseInt(i) + 1, //错题的sequenceNum
                };
                volErr.push(errTmp)
            }
        }else if(json.wrong_results&& !isEmpty(json.wrong_results[0])){//20160910
            for (var i = 0; i < json.wrong_results.length; i++) {
                var errTmp = {
                    'id':json.wrong_results[i].question_id, //错题在数据库中的id
                    'volErr': renderXmlVol(json.wrong_results[i]), //题的内容
                    'errNum': parseInt(i) + 1, //错题的sequenceNum
                };
                volErr.push(errTmp)
            }
        };
        localErr = volErr;
        avg_speed=parseFloat(avg_speed)+"S";//速度加/s 20160910
        var renderData = {
            "xm_title":xm_title,
            "rate": Math.round(rate * 100),
            "volErr": volErr,
            'volUnit': store.get('volUnit'),
//          'volGroupId': store.get('volGroupId'),
			'volGroupId': xm_groupId || 1,//20170824 volGroupId为空影响模板标签中取这个字段的元素，导致id不可用,暂时换为请求题时候获取的groupid;
            'avg_speed': avg_speed,
            'group_level': group_level
        };
        renderData.isBest = 0; //默认直接进
        if (isBest == 1) { //1做题进入结果页
            renderData.isBest = 1;
        }
        //
        ///**------验证下一题是否解锁  开始-------**/
        //var obj = getGroupLevelFromList(store.get('volGroupId'), allGroups);
        ////如果下面仍然有题目  下一题按钮就可用
        //renderData.canClick = store.get('volGroupId') < allGroups.length ? 1 : 0;
        //var groupLevelFromList = obj.groupLevel;
        //var leftUnLocked = obj.leftUnLocked;
        //var nextUnLocked = obj.nextUnLocked;
        //var highGroupLevel = group_level > groupLevelFromList ? group_level : groupLevelFromList;
        //syncGroupsGroupLevel(store.get('volGroupId'), allGroups, highGroupLevel);
        //renderData.high_group_level = highGroupLevel;
        //// if ((leftUnLocked == true && renderData.high_group_level == 4) || nextUnLocked) {
        //if ((leftUnLocked == true && renderData.high_group_level > 2) || nextUnLocked) {
        //    renderData.canUnLocked = 1;
        //} else {
        //    renderData.canUnLocked = 0;
        //}
        renderData.isFromPlan=exerciseApi.isFromPlan;
        /**------验证下一题是否解锁 结束-------**/
            //存储错题用
        store.set('volResult', volErr);
        var param = {
            "tmplName": TMPL.t5,
            "tmplData": renderData,
            "afterRender": function () {
                $("#volUnit").html(store.get('volUnit'))
                $("#volUnit1").html(store.get('volUnit'))
                if (isRewardCoupon) {
                    // showDiv('quanDiv', 'fade')
                    isRewardCoupon = false;
                }
            }
        };
        renderTemplate(param)
    }

    //词汇错题结果页
    var renderVolResultErr = function (json) {
        var volErr = [];
        if (!isEmpty(json)) {
            for (var i = 0; i < json.length; i++) {
                var errTmp = {
                    'id': json[i].id, //数据库中错题id
                    'volErr': json[i].volErr,
                    'errNum': parseInt(i) + 1
                };
                volErr.push(errTmp)
            }
        }
        localErr = volErr;

        /*var groupLevelFromList=getGroupLevelFromList(store.get('volGroupId'));
         var highGroupLevel=groupLevelFromList ;*/

        var renderData = {
            "volErr": volErr
        };
        renderData.xm_title=xm_title;

        /*/!**------验证下一题是否解锁  开始-------**!/
        var obj = getGroupLevelFromList(store.get('volGroupId'), allGroups);
        var groupLevelFromList = obj.groupLevel;
        var leftUnLocked = obj.leftUnLocked;
        var nextUnLocked = obj.nextUnLocked;
        var highGroupLevel = groupLevelFromList;
        renderData.high_group_level = highGroupLevel;
        syncGroupsGroupLevel(store.get('volGroupId'), allGroups, highGroupLevel);
        // if ((leftUnLocked == true && renderData.high_group_level == 4) || nextUnLocked) {
        if ((leftUnLocked == true && renderData.high_group_level > 2) || nextUnLocked) {
            renderData.canUnLocked = 1;
        } else {
            renderData.canUnLocked = 0;
        }*/
        /**------验证下一题是否解锁  结束-------**/
        renderData.isFromPlan=exerciseApi.isFromPlan;
        var param = {
            "tmplName": TMPL.t7,
            "tmplData": renderData,
            "afterRender": function () {
                $("#volUnit").html(store.get('volUnit'))
            }
        }
        renderTemplate(param)
    }

    //词汇点击
    var vocalbularyFun = function () {
//		window.clearInterval(testTimerIDVol);
        clearInterval(testTimerIDVol);
        BaseCookie.get()
        tokenTmp = BaseCookie.getToken()
        if (isEmpty(tokenTmp)) {
            tokenTmp = tokenTmp1
        }
        $('.sidebar-ul').find('a.sidebarLight').removeClass('sidebarLight');
        $('.sidebar-ul').find('li.sidebarLight').removeClass('sidebarLight');
        $("#side8").addClass('sidebarLight')
        $("#side8").parent().siblings().find(".sidebarLight").removeClass('sidebarLight');
        //判断是否从首页热词中跳过来
        if (store.get('redirectObj')) {
            var rate;
            var _callback = function (json) {
                for (var i = 0; i < json.vocabulary_groups.length; i++) {
                    if (json.vocabulary_groups[i].id == store.get('redirectObj').groupId) {
                        rate = json.vocabulary_groups[i].rate;
                        break
                    }
                }
                var data = {
                    'volUnit': store.get('redirectObj').volUnit,
                    'groupId': store.get('redirectObj').groupId,
                    'rate': rate
                }
                unitVolDetailFun(data)
            }
            //游客
          /*  if (isEmpty(tokenTmp)) {
                $.ajax({
                    url: URL.baseURL + 'vocabulary_groups/group',
                    type: 'get',
                    headers: {
                        "Authorization": tokenTmp
                    },
                    data: {
                        new_version: 1
                    },
                    success: function (json) {
                        unitCount = json.vocabulary_groups.length;
                        _callback(json)
                    }
                })
            } else {
                $.ajax({
                    url: URL.baseURL + 'vocabulary_groups/group',
                    type: 'get',
                    headers: {
                        "Authorization": tokenTmp
                    },
                    data: {
                        new_version: 1
                    },
                    success: function (json) {
                        unitCount = json.vocabulary_groups.length;
                        _callback(json)
                    }
                })
            }*/
        } else {
            //unitVolFun()
            var param = {volUnit: "1", groupId: "1", rate: "-1"};
            unitVolDetailFun(param);

        }

    }

    //选择单元
    //var unitVolFun = function () {
    //    BaseCookie.get()
    //    tokenTmp = BaseCookie.getToken()
    //    if (isEmpty(tokenTmp)) {
    //        tokenTmp = tokenTmp1
    //    }
    //    localErr = []
    //    localTmp = []
    //    var _afterRender = function () {
    //
    //    }
    //    var _callback = function (json) {
    //        var jsonTmp;
    //        var vocabularyGroupsTmp = []
    //        var locked = 0;
    //        for (var i = 0; i < json.vocabulary_groups.length; i++) {
    //            var tempLocked = locked;
    //            if (!json.current_group_id) {
    //                locked = 1;
    //            } else if (json.vocabulary_groups[i].id == json.current_group_id) {
    //                locked = 1;
    //                tempLocked = 0;
    //            }
    //            //适配老用户已经做过的题
    //            if (json.vocabulary_groups[i].group_level != null) {
    //                tempLocked = 0;
    //            }
    //
    //            var tmp = {
    //                'id': json.vocabulary_groups[i].id,
    //                'sequence_number': json.vocabulary_groups[i].sequence_number,
    //                'rate': Math.round(json.vocabulary_groups[i].rate * 100),
    //                'result_created_at': json.vocabulary_groups[i].result_created_at,
    //                'group_level': json.vocabulary_groups[i].group_level,
    //                'avg_speed': json.vocabulary_groups[i].avg_speed,
    //                'locked': tempLocked,
    //                'is_today_task': json.vocabulary_groups[i].is_today_task
    //            }
    //            vocabularyGroupsTmp.push(tmp)
    //        }
    //        jsonTmp = {
    //            "vocabulary_groups": vocabularyGroupsTmp
    //        }
    //        var param = {
    //            "tmplName": TMPL.t3,
    //            "tmplData": jsonTmp,
    //            "afterRender": _afterRender
    //        }
    //        renderTemplate(param)
    //    }
    //    if (isEmpty(tokenTmp)) {
    //        //游客
    //        $.ajax({
    //            url: URL.baseURL + 'vocabulary_groups/group',
    //            type: 'get',
    //            headers: {
    //                "Authorization": tokenTmp
    //            },
    //            data: {
    //                new_version: 1
    //            },
    //            success: _callback
    //        })
    //    } else {
    //        $.ajax({
    //            url: URL.baseURL + 'vocabulary_groups/group',
    //            type: 'get',
    //            headers: {
    //                "Authorization": tokenTmp
    //            },
    //            data: {
    //                new_version: 1
    //            },
    //            success: _callback
    //        })
    //    }
    //
    //}

    //单元列表页，点击某一单元
    var unitVolDetailFun = function (param) {
        $('body,html').animate({
            scrollTop: 0
        }, 100)
        localErr = []; //存储本地练习错题
        localTmp = [];
        gloablErr = [];
        //store.set('volUnit', param.volUnit)
        store.set('volGroupId', param.groupId);
        // if (param.rate == -1) {
        if (param.rate < 0) {//说明没有做过  跳转到做题页面20160909
            renderUnitVol(param.volUnit)
            store.remove("redirectObj")
        } else if(!param.rate){//从历史记录进入 param.rate为undefined
            $.ajax({
                //url: URL.baseURL + 'vocabulary_results',
                url: URL.xiaomaURL + 'vocabulary/results',
                headers: {
                    //Authorization: tokenTmp
                    Authorization: exerciseApi.xiaomaToken
                },
                data: {
                    //vocabulary_group_id: param.groupId
                    group_id: param.groupId
                },
                type: 'get',
                success: function (json) {
                    //json转换为js对象20160910
                    json = $.parseJSON(json);
                    startTime = null;
                   //json.avg_speed = param.avg_speed;20160910
                   // json.group_level = param.group_level;20160910
                    renderVolResult(json, json.rate);
                    store.remove("redirectObj")
                }
            })
        }
    }

    //单词选择
    var choiceVolFun = function (data) {
        $($('.table1')[0]).css('display', 'none')
        $($('.table1')[1]).css('display', 'block')
        $($('.choiceVolResult')[store.get('volCorrectAnswer') - 1]).addClass('listen-right')//正确选项标记20160908
        if (store.get('volCorrectAnswer') != data.answer) {//做错题目20160908
            var arr = [];
            arr = store.get('volErr');
            arr.push(parseInt(data.volId))//题号--每个选项题号都相同 ，为当前题号20160908
            store.set('volErr', arr);//存储错题序号20160908
            //新增变量存储选项  存储当前题目的选项  1、2、3、4分别对应A B C D20160909
            var curAnswer="";var answerArr=[];
            curAnswer=data.answer==1?"A":data.answer==2?"B":data.answer==3?"C":"D";
            answerArr=store.get('volErrAnswer');
            answerArr.push(curAnswer);
            store.set('volErrAnswer',answerArr);
            //20160909
            var gloablTmp = {
                "vocabulary_question": store.get("vocabularys")[parseInt(store.get("volNum")) - 1]
            }
            $($('.choiceVolResult')[data.answer - 1]).addClass('listen-mistake')//错误选项20160908
            gloablErr.push(gloablTmp)//存储错题20160908
        }
        var showResult = function () {
            store.set('volNum', parseInt(store.get('volNum')) + 1);
             if (store.get('volNum') < parseInt(store.get('vocabularys').length) + 1) {//不是该单元的最后一道题目20160908
            //if (store.get('volNum')<5) {//不是该单元的最后一道题目20160908
                renderVol(store.get('volNum'))
            } else {//已经是最后一道题目了 提交答案20160908
                // debugger
                var callback_submit = function () {
                    endTime = new Date();
                    var spend_time = Math.round(durationTime);
                    var rate, dataArr = [];
                    var totalCount = store.get('vocabularys').length;
                    var correctCount = totalCount - store.get('volErr').length;
                    // 解决rate精准度问题
                    var digitRound = function (digit, length) {
                        length = length ? parseInt(length) : 0;
                        if (length <= 0) return Math.round(digit);
                        digit = Math.round(digit * Math.pow(10, length)) / Math.pow(10, length);
                        return digit;
                    };
                    var rateTmp = correctCount / totalCount;
                    rate = digitRound(rateTmp, 2).toString();
                    var _afterRender = function () {
                        $("#volUnit").html(store.get('volUnit'))
                    }
                    var volErr = [];
                    if (isEmpty(gloablErr)) {//没有错题20160908
                        gloablErr = [{
                            "volcabulary_question": null
                        }]
                    }
                    var jsonTmp = {
                        "vocabulary_results": gloablErr
                    }
                    gloablErr = [];
                    var isRequest = true;
                    if (startTime) {
                        var spend_time = Math.round(durationTime);
                        // var spend_time = Math.round((endTime.getTime() - startTime.getTime()) / 1000);
                        var avg_speed = spend_time / store.get('vocabularys').length;
                        var param = {
                            avg_speed: avg_speed,
                            rate: rate,
                            id: store.get('volGroupId')
                        };
                        //注释掉判断最好成绩..每次都提交成绩
                        //isRequest = checkGroupBetterResult(param);

                    }
                   /* for (var i = 0; i < allGroups.length; i++) {//allGroups 单元.length20160908
                        if (store.get('volUnit') == allGroups[i].sequence_number) {
                            store.set('volGroupId', allGroups[i].id)
                            groupLevelOld = allGroups[i].group_level ? allGroups[i].group_level : -1;
                            break
                        }
                    }*/
                    var groupLevel=null;
                    var _callback = function (json) {
                        exerciseApi.updateListItem();
                        json= $.parseJSON(json);
                        groupLevel = json.group_level;
                        renderVolResult(jsonTmp, rate, 1,groupLevel);//错题、正确率、
                    };

                    //$.ajax({
                    //    url: URL.baseURL + 'vocabulary_rates',
                    //    headers: {
                    //        Authorization: tokenTmp,
                    //        fromType: "web"
                    //    },
                    //    async: false,
                    //    data: {
                    //        rate: rate,
                    //        vocabulary_group_id: store.get('volGroupId'),
                    //        spend_time: spend_time,
                    //        new_version: 2
                    //    },
                    //    type: 'post',
                    //    success: function (json) {
                    //    }
                    //});20160909
                    if (isRequest || groupLevelCommon > groupLevelOld) {//提交结果201650909

                        for (var i = 0; i < store.get('volErr').length; i++) {
                            var errJson = {
                                //"user_id": BaseCookie.getId(),
                                //"vocabulary_group_id": store.get('volGroupId'),
                                //"vocabulary_question_id": store.get('volErr')[i] + ""
                                "answer":store.get('volErrAnswer')[i],
                                " is_correct":2,
                                "question_id":store.get('volErr')[i]
                            };
                            dataArr.push(errJson);
                        };
                        //var date=new Date($.ajax({async: false}).getResponseHeader("Date"));
                        var date=getTime();
                        xm_endTime=zeroFn(date.getFullYear())+"-"+zeroFn((date.getMonth()+1))+"-"+zeroFn(date.getDate())+" "+zeroFn(date.getHours())+":"+zeroFn(date.getMinutes())+":"+zeroFn(date.getSeconds());
                        date=null;
                        $.ajax({//20160909
                            //url: URL.baseURL1 + "vocabulary_results",
                            url: URL.xiaomaURL + "vocabulary/results",
                            //data: JSON.stringify({
                            //    "user"vocabulary_group_id": store.get('volGroupId'),
                            //    "vocabulary_results": dataArr
                            //}),
                            data: JSON.stringify({
                                "custom_exercise_id": store.get('volNum'),
                                "rate":rate,
                                "spend_time":spend_time,
                                "group_id": xm_groupId,
                                "wrong_results": dataArr,
                                "planDayId":xm_planDayId,
                                "exerciseId":xm_exerciseId,
                                "startTime":xm_startTime,
                                "endTime":xm_endTime
                            }),
                            headers:{
                                "Authorization": exerciseApi.xiaomaToken
                            },
                            type: "POST",
                            contentType: "application/json",
                            success: _callback
                        })
                        /*if (store.get('volErr').length > 0) {
                            for (var i = 0; i < store.get('volErr').length; i++) {
                                var errJson = {
                                    //"user_id": BaseCookie.getId(),
                                    //"vocabulary_group_id": store.get('volGroupId'),
                                    //"vocabulary_question_id": store.get('volErr')[i] + ""
                                    "answer":store.get('volErrAnswer')[i],
                                    " is_correct":2,
                                    "question_id":store.get('volErr')[i]
                                };
                                dataArr.push(errJson);
                            };
                            var date=new Date($.ajax({async: false}).getResponseHeader("Date"));
                            xm_endTime=zeroFn(date.getFullYear())+"-"+zeroFn((date.getMonth()+1))+"-"+zeroFn(date.getDate())+" "+zeroFn(date.getHours())+":"+zeroFn(date.getMinutes())+":"+zeroFn(date.getSeconds());
                            date=null;
                            $.ajax({//20160909
                                //url: URL.baseURL1 + "vocabulary_results",
                                url: URL.xiaomaURL + "vocabulary/results",
                                //data: JSON.stringify({
                                //    "user"vocabulary_group_id": store.get('volGroupId'),
                                //    "vocabulary_results": dataArr
                                //}),
                                data: JSON.stringify({
                                    "custom_exercise_id": store.get('volNum'),
                                    "rate":rate,
                                    "spend_time":spend_time,
                                    "group_id": xm_groupId,
                                    "wrong_results": dataArr,
                                    "planDayId":xm_planDayId,
                                    "exerciseId":xm_exerciseId,
                                    "startTime":xm_startTime,
                                    "endTime":xm_endTime
                                }),
                                headers:{
                                    "Authorization": exerciseApi.xiaomaToken
                                },
                                type: "POST",
                                contentType: "application/json",
                                success: _callback
                            })
                        } else {
                            var errJson = [{
                                "user_id": BaseCookie.getId(),
                                "vocabulary_group_id": store.get('volGroupId'),
                                "vocabulary_question_id": null
                            }]
                            $.ajax({
                                url: URL.baseURL1 + "vocabulary_results",
                                data: JSON.stringify({
                                    "user_id": BaseCookie.getId(),
                                    "vocabulary_group_id": store.get('volGroupId'),
                                    "vocabulary_results": errJson
                                }),
                                type: "POST",
                                contentType: "application/json",
                                success: _callback
                            })
                        }*/

                    }
                };
                callback_submit();
                //用户为空时不提交
                //if (isEmpty(exerciseApi.xiaomaToken)) {//用户没有登录20160908
                //    //游客
                //    clearTimerVol(); //弹出登录层暂停时间
                //    $('#dialogLogin').modal({
                //        backdrop: 'static'
                //    })
                //    $('#dialogLogin').bind('hidden.bs.modal', function (e) {
                //        // debugger
                //        BaseCookie.get()
                //        if (!isEmpty(BaseCookie.getToken())) {
                //            tokenTmp = BaseCookie.getToken()
                //            callback_submit()
                //        } else {
                //            $('#volSubmitDiv').css('display', 'block')
                //            startTimerVol();
                //        }
                //    })
                //} else {//用户已经登录 提交 20160908
                //    callback_submit()
                //}

            }
            clearTimeout(timeInterval)
        }
        //showResult();
        var timeInterval = setTimeout(showResult, 1000);
    }

    //单词错题选择
    var choiceVolErrFun = function (data) {
        $($('.table1')[0]).css('display', 'none')
        $($('.table1')[1]).css('display', 'block')
        var correctNum;
        if (data.errAnswer == 'A') {
            correctNum = 1;
        } else if (data.errAnswer == 'B') {
            correctNum = 2;
        } else if (data.errAnswer == 'C') {
            correctNum = 3;
        } else if (data.errAnswer == 'D') {
            correctNum = 4;
        }
        $($('.choiceVolErrResult')[correctNum - 1]).addClass('listen-right')
        if (correctNum != data.answer) {
            localTmp.push(localErr[parseInt(store.get('volErrNum')) - 1])
            $($('.choiceVolErrResult')[data.answer - 1]).addClass('listen-mistake')
        }
        var showResult = function () {
            store.set('volErrNum', parseInt(store.get('volErrNum')) + 1);
            if (store.get('volErrNum') < parseInt(localErr.length) + 1) {
                renderVolErr(store.get('volErrNum'))
            } else {
                localErr = localTmp
                localTmp = []
                renderVolResultErr(localErr)
            }
            clearTimeout(timeInterval)
        }
        var timeInterval = setTimeout(showResult, 1000);
    }

    //再做一遍
    var againVolFun = function (param) {
        startTime = null;
        localErr = [];
        localTmp = [];
        durationTime = 0;
        store.set('volNum', '1');
        store.set('volErr', []);
        store.set('volErrAnswer', [])//20160909
        store.set('vocabularys', []);
        store.set('volCorrectAnswer', '');
        store.set('volId', '');
        renderUnitVol(store.get('volUnit'));
        //if (isEmpty(tokenTmp)) {
        //    //游客
        //    store.set('volNum', '1')
        //    store.set('volErr', [])
        //    store.set('volErrAnswer', [])//20160909
        //    store.set('vocabularys', [])
        //    store.set('volCorrectAnswer', '')
        //    store.set('volId', '')
        //    renderUnitVol(store.get('volUnit'))
        //} else {
        //    store.set('volNum', '1')
        //    store.set('volErr', [])
        //    store.set('volErrAnswer', [])//20160909
        //    store.set('vocabularys', [])
        //    store.set('volCorrectAnswer', '')
        //    store.set('volId', '')
        //    renderUnitVol(store.get('volUnit'))
        //}
        $('body,html').animate({
            scrollTop: 0
        }, 100)
    }

    //只练错题
    var errOnlyVolFun = function () {
        $('body,html').animate({
            scrollTop: 0
        }, 100);
        var volUnit = store.get('volUnit')
        store.set('volErrNum', 1)
        renderVolErr(1)
        /*if (isEmpty(tokenTmp)) {
            //游客
            var volUnit = store.get('volUnit')
            store.set('volErrNum', 1)
            renderVolErr(1)
        } else {
            var volUnit = store.get('volUnit')
            store.set('volErrNum', 1)
            renderVolErr(1)
        }*/
    }

    //只练错题中只练错题
    var errOnlyVolErrFun = function () {
        $('body,html').animate({
            scrollTop: 0
        }, 100)
        store.set('volErrNum', 1)
        renderVolErr(1)
    }

    //下一单元
    var nextUnitVolFun = function () {
        $('body,html').animate({
            scrollTop: 0
        }, 100)
        localErr = []
        localTmp = []
        if (parseInt(store.get('volUnit')) == allGroups.length) {
            alert('已是最后一单元')
            //unitVolFun()
        } else {
            getGroups();
            var param = {};
            param.volUnit = parseInt(store.get('volUnit')) + 1;
            param.groupId = allGroups[parseInt(store.get('volUnit'))].id;
            param.rate = allGroups[parseInt(store.get('volUnit'))].rate;
            param.avg_speed = allGroups[parseInt(store.get('volUnit'))].avg_speed;
            param.group_level = allGroups[parseInt(store.get('volUnit'))].group_level;
            unitVolDetailFun(param)
        }
    }

    //下一单元
    var nextUnitVolErrFun = function () {
        $('body,html').animate({
            scrollTop: 0
        }, 100)
        localErr = []
        localTmp = []
        if (store.get('volUnit') == unitCount) {
            unitVolFun()
        } else {
            renderUnitVol(parseInt(store.get('volUnit')) + 1)
        }
    }

    //单词解析
    var renderXmlVol = function (result) {
        var wordXml = result.content;
        var sequenceNumber = "";
        if (!isEmpty(result.sequence_number)) {
            sequenceNumber = result.sequence_number;
        }

        var renderJson, volId, prompt, url, explanation, symbols, partOfSpeech, correctResponse, correctNum = 0;
        var simpleChoices = new Array();
        var word = $.xml2json(wordXml).itemBody;
        prompt = word.choiceInteraction.prompt;
        url = word.audio.url;
        explanation = word.explanation;
        symbols = word.symbols;//音标
        partOfSpeech = word.partOfSpeech;//词性
        var stemImg = word.image;//20170926需求题干添加图片
        correctResponse = $.xml2json(wordXml).responseDeclaration.correctResponse.value;
        for (var i = 0; i < 4; i++) {
            simpleChoices.push(word.choiceInteraction.simpleChoice[i].toString());
        }
        if (correctResponse == 'A') {
            correctNum = 1;
        } else if (correctResponse == 'B') {
            correctNum = 2;
        } else if (correctResponse == 'C') {
            correctNum = 3;
        } else {
            correctNum = 4;
        }
        store.set('volCorrectAnswer', correctNum);
        renderJson = {
            'volId': result.id,
            'volNum': store.getAll().volNum,
            'prompt': prompt,
            'url': url,
            "stemImg":stemImg,
            'simpleChoices': simpleChoices,
            'explanation': explanation,
            'symbols': symbols,
            'partOfSpeech': partOfSpeech,
            'correctResponse': correctResponse,
            'correctNum': correctNum,
            'sequenceNumber': sequenceNumber
        };
        return renderJson;
    }

    //render某一单元首个单词
    var renderUnitVol = function (volUnit) {
        requestFirestWordStatus = 1;
        window.setTimeout(function () {
            requestFirestWordStatus = 0;
        }, 5000);
        store.set('volUnit', volUnit);
        $.ajax({
            //url: URL.baseURL + 'vocabulary_groups',
            url: URL.xiaomaURL + "vocabulary/group/"+volUnit,
            headers: {
                //"Authorization":"bearer ad6474b5842d4c6e857ae7207b1b04e1"
                "Authorization": exerciseApi.xiaomaToken
            },
            type: 'get',

            success: function (json) {
                json = $.parseJSON(json);//20160907
                durationTime = 0; //计时时间间隔（单位秒）
                startTime = new Date()
                currentTestTimeStrVol = null;
                store.set('volNum', '1')
                store.set('volErr', [])
                store.set('volErrAnswer', [])//20160909
                //store.set('vocabularys', json.vocabulary_questions)
                store.set('vocabularys', json.questions);//20160907
                store.set('volCorrectAnswer', '');
                store.set('volId', '');
                store.set('volResult', []);
                renderVol(1)
            }
        })
    }

    //render单词页面
    var renderVol = function (volNum) {
        var xml = $($(store.get('vocabularys')))[parseInt(volNum) - 1];
        var renderData = {};
        renderData.xm_title=xm_title;
        renderData.xml = renderXmlVol(xml);
        if (currentTestTimeStrVol) {
            renderData.currentTestTimeStrVol = currentTestTimeStrVol;
        }
        if ($(".vol-question").length) {
            var _afterRender1 = function () {
                $("#volUnit").html(store.get('volUnit'))
                var titleNum = $("#totalCount").html();
                titleNum = titleNum.substring(0, titleNum.length) + "/" + store.get('vocabularys').length;
                $("#totalCount").html(titleNum)
                //startTimerVol();
                var showQuestion = function () {
                    $($('.table1')[0]).css('display', 'block')
                    clearTimeout(timeQuestionInterval)
                }
                var timeQuestionInterval = setTimeout(showQuestion, 1000);
            };
            var param = {
                "wrap": $(".vol-question"),
                "tmplName": TMPL.t9,
                "tmplData": renderData,
                "afterRender": _afterRender1
            }
            renderTemplate(param)
        } else {
            var _afterRender = function () {
                var _afterRender1 = function () {
                    $("#volUnit").html(store.get('volUnit'));
                    var titleNum = $("#totalCount").html();
                    titleNum = titleNum.substring(0, titleNum.length) + "/" + store.get('vocabularys').length;
                    $("#totalCount").html(titleNum)
                    startTimerVol();
                    var showQuestion = function () {
                        $($('.table1')[0]).css('display', 'block');
                        clearTimeout(timeQuestionInterval)
                    };
                    var timeQuestionInterval = setTimeout(showQuestion, 1000);
                };
                var param = {
                    "wrap": $(".vol-question"),
                    "tmplName": TMPL.t9,
                    "tmplData": renderData,
                    "afterRender": _afterRender1
                }
                renderTemplate(param)
            };
            var param = {
                "tmplName": TMPL.t1,
                "tmplData": renderData,
                "afterRender": _afterRender
            }
            renderTemplate(param)
        }
    }

    //render单词错题页面
    var renderVolErr = function (volErrNum) {
        var renderData = localErr[parseInt(volErrNum) - 1];
        renderData.xm_title=xm_title;
        var _afterRender = function () {
            var titleNum = $("#totalCount").html();
            titleNum = titleNum.substring(0, titleNum.length) + "/" +localErr.length;
            $("#totalCount").html(titleNum);//20160922
            $("#volUnit").html(store.get('volUnit'));
            var showQuestion = function () {
                $($('.table1')[0]).css('display', 'block')
                clearTimeout(timeQuestionInterval)
            };
            var timeQuestionInterval = setTimeout(showQuestion, 1000);
        };
        var param = {
            "tmplName": TMPL.t6,
            "tmplData": renderData,
            "afterRender": _afterRender
        };
        renderTemplate(param)
    }

    /*var getGroups = function () {
        $.ajax({
            url: URL.baseURL + 'vocabulary_groups/group',
            type: 'get',
            async: false,
            headers: {
                "Authorization": tokenTmp
            },
            data: {
                new_version: 1
            },
            success: function (json) {
                //积分group_level  avg_speed
                list_status = json.list_status;
                var current_group_id = json.current_group_id;
                var vocabulary_groups = json.vocabulary_groups;
                if (vocabulary_groups) {
                    var locked = 0;
                    var tempLocked = 0;
                    for (var i = 0; i < vocabulary_groups.length; i++) {
                        tempLocked = locked;
                        if (!current_group_id) {
                            locked = 1;
                            tempLocked = 1;
                        } else if (current_group_id == vocabulary_groups[i].id) {
                            locked = 1;
                            tempLocked = 0;
                        }
                        if (vocabulary_groups[i].group_level != null) {
                            tempLocked = 0;
                        }
                        vocabulary_groups[i].locked = tempLocked
                    }
                }
                allGroups = vocabulary_groups;
            }
        })
    }*/

    var hisVolcabulary = function (param) {
        BaseCookie.get()
        tokenTmp = BaseCookie.getToken()
        if (isEmpty(tokenTmp)) {
            tokenTmp = tokenTmp1
        }
        var rate;
        var _callback = function (json) {
            for (var i = 0; i < json.vocabulary_groups.length; i++) {
                if (json.vocabulary_groups[i].id == param.groupId) {
                    rate = json.vocabulary_groups[i].rate;
                    break
                }
            }
            var data = {
                'volUnit': param.volUnit,
                'groupId': param.groupId,
                'rate': rate,
                'avg_speed': param.avg_speed,
                'group_level': param.group_level
            }
            unitVolDetailFun(data)
        }
        //游客
       /* if (isEmpty(tokenTmp)) {
            //游客
            $.ajax({
                url: URL.baseURL + 'vocabulary_groups/group',
                type: 'get',
                headers: {
                    "Authorization": tokenTmp
                },
                data: {
                    new_version: 1
                },
                success: function (json) {
                    unitCount = json.vocabulary_groups.length;
                    _callback(json)
                }
            })
        } else {
            $.ajax({
                url: URL.baseURL + 'vocabulary_groups/group',
                type: 'get',
                headers: {
                    "Authorization": tokenTmp
                },
                data: {
                    new_version: 1
                },
                success: function (json) {
                    unitCount = json.vocabulary_groups.length;
                    _callback(json)
                }
            })
        }*/
    }

    //弹出隐藏层
    var showDiv = function (show_div, bg_div) {
        document.getElementById(show_div).style.display = 'block';
        document.getElementById(bg_div).style.display = 'block';
        var bgdiv = document.getElementById(bg_div);
        bgdiv.style.width = document.body.scrollWidth;
        $("#" + bg_div).height($(document).height());
    };
    //关闭弹出层
    var closeDiv = function (show_div, bg_div) {
        document.getElementById(show_div).style.display = 'none';
        document.getElementById(bg_div).style.display = 'none';
    };

    //页面重新加载，用于exercise.js
    var ajaxEdit = function (param) {
        UniqueAjax({
            url: param.url,
            data: param.data,
            contentType: param.contentType || 'appliction/x-www-form-urlencoded',
            type: param.type || 'post',
            dataType: param.dataType || 'json',
            success: param.success
        })
    }

    var renderTemplate = function (param) {
        Render.render({
            wrap: param.wrap || $wrap,
            tmpl: {
                tmplName: param.tmplName,
                tmplData: param.tmplData
            },
            afterRender: param.afterRender
        })
    }

    var isEmpty = function (param) {
        if (null == param || "" == param || tokenTmp1 == param) {
            return true
        } else {
            return false
        }
    };

    var zeroFn=function(n){
        n=n<10?"0"+n:n;
        return n;
    }
    function getTime(){ 
    	return new Date($.ajax({url: window.xiaoma.basePath+"/gettime",async: false}).getResponseHeader("Date"));
    }
    var showVolcabulary = function (groupId,planDayId,exerciseId,xmTitle) {
        xm_groupId=groupId;
        xm_planDayId=planDayId;
        xm_exerciseId=exerciseId;
        xm_title=xmTitle;
        $.ajax({
            url: URL.xiaomaURL + "vocabulary/group/"+groupId,
            headers: {
                "Authorization": exerciseApi.xiaomaToken
            },
            type: 'get',
            success: function (json) {
                json = $.parseJSON(json);//20160907
                store.set('volUnit',groupId);
                durationTime = 0; //计时时间间隔（单位秒）
                startTime = new Date()
                currentTestTimeStrVol = null;
                store.set('volNum', '1')
                store.set('volErr', [])
                store.set('volErrAnswer', [])//20160909
                //store.set('vocabularys', json.vocabulary_questions)
                store.set('vocabularys', json.questions);//20160907
                store.set('volCorrectAnswer', '');
                store.set('volId', '');
                store.set('volResult', []);
                renderVol(1)
            }
        })
    }




    //20160909
    //var param = {}
    //param.volUnit = $(e.target).attr('data-unit');
    //param.groupId = $(e.target).attr('data-groupId');
    //param.avg_speed = $(e.target).attr('data-avg_speed');
    //param.group_level = $(e.target).attr('data-group_level');
    //Volcabulary.hisVolcabulary(param);
    //
    var gotoHisResult = function (groupId,planDayId,exerciseId,xmTitle) {
        xm_groupId=groupId;
        xm_planDayId=planDayId;
        xm_exerciseId=exerciseId;
        xm_title=xmTitle;
        //BaseCookie.get()
        //tokenTmp = BaseCookie.getToken()
        //if (isEmpty(tokenTmp)) {
        //    tokenTmp = tokenTmp1
        //}
        store.set('volUnit',groupId);
        var data = {
                    'groupId':groupId
                };
        unitVolDetailFun(data);
    };
    return {
        init: init,
        hisVolcabulary: hisVolcabulary,
        showVolcabulary: showVolcabulary,
        gotoHisResult: gotoHisResult

    }
})