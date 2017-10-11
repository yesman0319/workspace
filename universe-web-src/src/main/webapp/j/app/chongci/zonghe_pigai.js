/**
 * Created by SaE on 2015/4/8.
 * 冲刺练习-综合写作批改
 */
define(['common/render', 'xml2json', 'app/baseURL', 'baseCookie', 'app/baseFinal','lib/audiojs/audio.min','lib/pagebar/jquery.paginate'], function (Render, xml2json, URL, BaseCookie, Final) {

    var ZHPiGai = (function () {
        //私有变量
        var _tokenTmp = "xiaoma";

        var obj = {
            $wrap: '',
            token: '',
            type:{
                baocun:1,
                daiqiang:2,
                chooseteacher:3,
                daipigai:4,
                yipigai:5
            },
            tokenTmp: function () {
                return _tokenTmp;
            },
            currentQuestions: [],
            TMPL: {
                list: 'app/chongci/tmpl_zonghe_write_list', //机经写作-机经预测列表
                doing: 'app/chongci/tmpl_zonghe_write_doing',//做题页
                result: 'app/chongci/tmpl_zonghe_write_result',//结果页
                right_list: 'app/chongci/tmpl_zonghe_write_right_list',//右侧列表
                result_detail_yibaocun: 'app/chongci/tmpl_zonghe_write_result_detail1',
                result_detail_yipigai: 'app/chongci/tmpl_zonghe_write_result_detail2',
                result_detail_daipigai: 'app/chongci/tmpl_zonghe_write_result_detail3',
                result_detail_daiqiang: 'app/chongci/tmpl_zonghe_write_result_daiqiang',
                result_detail_chooseteacher: 'app/chongci/tmpl_zonghe_write_result_chooseteacher'
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
    ZHPiGai.sendAjax = function (param) {
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


    ZHPiGai.init = function (conf) {
        var _this = ZHPiGai;
        var _conf = $.extend({
            wrap: ''
        }, conf || {});
        _this.$wrap = $(_conf.wrap);
        _this.getToken();

        _this.initEvent();
    };

    ZHPiGai.initEvent = function () {
        var $document = $(document);
        //显示正在开发中
        //$document.on('click', '#side9', function(){
        //    $('.sidebar-ul').find('a.sidebarLight').removeClass('sidebarLight');
        //    $("#side9").addClass('sidebarLight');
        //    toDoRender();
        //});
        $(document).on('trigger_side9', '#side9', ZHPiGai.loadList)
        $document.on('click', '#side9', ZHPiGai.loadList);
        $document.on('click', '.zonghepigai-div', ZHPiGai.Doing.showAnswerBefore);//显示做题页面
        $document.on('click', '.zonghewrite', ZHPiGai.Doing.showAnswerBefore);
        //$document.on('click', '.expand', ZHPiGai.Doing.expandOrCollapse);//折叠/展开
        $document.on('click', '#doZHPGAgain', ZHPiGai.Doing.doAgain);//重做
        $document.on('click', '#zongheWriteSubmit', ZHPiGai.Doing.Submit);//提交
        $document.on('click', '.useranswer', ZHPiGai.Doing.showDetails);//显示结果页每个答案的详细信息
        $document.on('click', '#btnPigaiSaved', ZHPiGai.Doing.PiGaiTheSaved);//批改之前已保存的答案
        $document.on('keyup', '#zongheWriteAnswer', ZHPiGai.Doing.checkLengthNew);
        $document.on('focus', '#zongheWriteAnswer', ZHPiGai.Doing.checkLogin);
        $document.on('click','.playthevideo',function(){
            ZHPiGai.Doing.playDemoVideo($(this).attr('data-source'));
        });//播放视频
        $document.on('click', '.divChoose .radio_teacher', function () {
            //切换单选按钮
            $('.divChoose .radio_teacher').removeClass("type-radi01").addClass("type-radi02");
            $(this).addClass("type-radi01").removeClass("type-radi02");
        });
        //保存选择的老师
        $document.on('click', '#btnSaveTeacher', ZHPiGai.Doing.saveTeacherOfChoose);
        $document.off('click', '.teacher_info').on('click', '.teacher_info', function () {
            var teacherId = $(this).attr('teacherid');
            window.open('teacherevaluate.html?teacherid='+teacherId,'_blank');
        });
        $document.on('click', '.nav-zhpigai', ZHPiGai.Doing.navigatorTolist);//导航条
        $document.on('click', '.navparent', function () {
            $('#leftDiv').hide();
            $("#wirte_menu_div").toggle();
            $('#side1').click();
            $('#side').show();
        });
        $document.on('click','#pigaiResult .cnote',function(e){
            //处理老师批注框在只选择两端的部分时的定位情况
            var that = e.target|| e.currentTarget,
                $that=$(that);
            var len = $that.text().length;
            var height=$that.height();
            //不够一行的字却占了两行的高度（占两行的那种情况）
            if(len<105&&height>30){
                var thisSpan=$('.popover').filter(':visible');
                thisSpan.css('left',-thisSpan.width()/2+30);
                thisSpan.css('top',thisSpan.position().top+20);
            }
        });
        $document.on('click', '#cancleSave', function(){
            $('.modal-backdrop').hide();

            var questionId = $('#zongheWriteSubmit').attr('qid');//已保存界面取消
            if(!questionId){
                questionId =$('#btnPigaiSaved').attr('qid');
            }
            var params = {
                questionId : questionId,
                status:4//已保存
            };
            ZHPiGai.Doing.showAnswerPage(params);
        });
    };

    /**
     列表
     */
    ZHPiGai.loadList = function () {
        $('.sidebar-ul').find('a.sidebarLight').removeClass('sidebarLight');
        $("#side9").addClass('sidebarLight');

        ZHPiGai.getToken();
        //from:1=web
        var param = {
            url: URL.baseURL5 + "tpo_writing_correction_questions",
            headers: {
                Authorization: ZHPiGai.token
            },
            data: {
                from: 1
            }
        };
        var promise = ZHPiGai.sendAjax(param);
        promise.then(function (json) {
            var renderData = [];
            $.each(json.tpo_writing_questions, function (key, val) {
                var tmp = {};
                tmp.id = val.question_id;
                tmp.content = val.content && val.content.length > 160 ? val.content.substr(0, 160) + '…' : val.content;
                tmp.sequence_number = val.question_sequence_number;
                tmp.score = val.score;
                tmp.type = val.type;
                tmp.is_today_task = val.is_today_task;
                tmp.grap_amount=val.grap_amount;
                renderData.push(tmp);
            });
            ZHPiGai.currentQuestions = renderData; //保存当前下载题目
            Render.render({
                wrap: ZHPiGai.$wrap,
                tmpl: {
                    tmplName: ZHPiGai.TMPL.list,
                    tmplData: renderData
                },
                afterRender:function(){
                    $(".right-part1 p.left25").each(function (){
                        var height=$(this).height();
                        if(!$(this).hasClass("jijing-speak-div")){
                            if(height<=20){
                                $(this).addClass("jj-speak-single");
                                $(this).find("a.sim-a2").removeClass("sim-a2"); //一行未做过 移除换行控制css
                            }else{
                                $(this).addClass("jj-speak-divnew");
                                $(this).find("span.fright").addClass("rewrite-font");
                                $(this).find("a.sim-width510").addClass("sim-anew");
                            }
                        }
                    });
                }
            });
        });

    };

    /**
     * 做题部分
     */
    ZHPiGai.Doing = ZHPiGai.Doing || {
            preWord: null,
            arrService: [],//批改服务
            arrCoupon: [],//优惠券
            huafeiTime:0,//花费时间
            writeTotalTime:60*25 //综合写作默认25分钟

        };

    ZHPiGai.Doing.showAnswerBefore = function () {
        var $this, params = {};
        $this = $(this);
        if (!$this.attr('qid')) {
            $this = $this.parents('div[qid]');
        }
        params.questionId = $this.attr("qid");
        params.type = $this.attr("type");

        ZHPiGai.Doing.showAnswerPage(params);
        //加载用户之前获得的优惠券和服务
        ZHPiGai.Doing.getUserCoupon();
    };

    /**
     * 显示用户答题页面
     **/
    ZHPiGai.Doing.showAnswerPage = function (params) {

        var questionId = params.questionId;
        var type = params.type;
        //var from = "exercise";

        var param = {
            url: URL.baseURL5 + 'tpo_writing_correction_questions/get_one',
            headers: {
                Authorization: ZHPiGai.token
            },
            data: {
                'question_id': questionId
            }
        };
        var promise = ZHPiGai.sendAjax(param);
        promise.then(function (json) {
            if (json && json.error) {
                alert(json.error);
            } else {
                var renderData = {};

                renderData.id = questionId;
                renderData.sequence_number = json.question_sequence_number;
                renderData.content = json.content ? [json.content.replace(/\n/g, '<br/>')] : [];
                renderData.audio_url = json.audio_url;
                renderData.analysis = json.analysis;
                renderData.question_answers = json.question_answers;
                renderData.questions = ZHPiGai.currentQuestions;
                $.each(renderData.questions, function (i, n) {
                    n.content = (n.content && n.content.length > 43) ? n.content.substring(0, 43) + '…' : n.content;
                });
                renderData.title = '综合写作批改';

                $("#side").css("display", "none"); //隐藏左边导航
                //type：0:未做,1:已保存, 2:待抢, 3:待选老师,4:待批改, 5:已批改
                if (type == 0) {
                    //做题页
                    Render.render({
                        wrap: ZHPiGai.$wrap,
                        tmpl: {
                            tmplName: ZHPiGai.TMPL.doing,
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
                            //重置花费时间
                            ZHPiGai.Doing.huafeiTime=0;
                            startWriteTimer();
                            ZHPiGai.Doing.initAudioControl('myMusic');
                        }
                    });
                } else {
                    clearWriteTimer();
                    /*结果页*/
                    //存储此题的用户答案
                    ZHPiGai.Doing.userAnswers = renderData.question_answers;
                    $.each(renderData.question_answers, function (i, n) {
                        n.answer_created_at = n.answer_created_at ? n.answer_created_at.substring(0, 19).replace("T", "&nbsp;&nbsp;") : n.answer_created_at;
                        n.cutAnswer = (n.answer_content && n.answer_content.length > 260) ? n.answer_content.substring(0, 260) + '…' : n.answer_content;
                        if (n.mark_created_at) {
                            n.mark_created_at = n.mark_created_at.substring(0, 19).replace("T", "&nbsp;&nbsp;");
                        }
                    });

                    Render.render({
                        wrap: ZHPiGai.$wrap,
                        tmpl: {
                            tmplName: ZHPiGai.TMPL.result,
                            tmplData: renderData
                        },
                        afterRender: function () {
                            //初始化音频播放器控件
                            ZHPiGai.Doing.initAudioControl('myMusic1');
                        }
                    });
                }

            }
        });
    };
    //初始化音频播放器控件
    ZHPiGai.Doing.initAudioControl=function(eleId){

        audiojs.events.ready(function () {
            var objAudit = document.getElementById(eleId);

            var ctlAudio = audiojs.create(objAudit, {
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
                ctlAudio.setVolume(i);
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
    };

    /*处理用户答题结果，显示教师的评语*/
    ZHPiGai.Doing.createTeacherRemark = function (item) {
        //教师已经给批改了
        if (item.type == ZHPiGai.type.yipigai) {
            var newContent = '', start = 0, end = 0;

            $.each(item.mark_tips, function (i, t) {
                if(t.start_index<start){
                    return ;
                }
                end = t.start_index;
                newContent += item.answer_content.substring(start, end);

                //音频形式的批改
                if (t.audio_url) {
                    newContent += '<span class="playaudio" data-html="true" audio_url="' + t.audio_url + '" style="background: #98C4FF;">'
                        + item.answer_content.substring(t.start_index, t.end_index) + '</span>';
                } else {
                    //文字形式的批改
                    newContent += '<span class="cnote" data-html="true" data-content="' + t.answer_content + '" data-toggle="popover" data-placement="top" style="background: #f9e6be;">'
                        + item.answer_content.substring(t.start_index, t.end_index) + '</span>';
                }

                start = t.end_index;
            });
            newContent += item.answer_content.substring(start);
            item.answer_content = newContent.replace(/\n/g, '<br/>');
        } else {
            item.answer_content = item.answer_content.replace(/\n/g, '<br/>');
        }
        return item.answer_content;
    };

    /*保存*/
    ZHPiGai.Doing.Submit = function () {
        var strAnswer = $('#zongheWriteAnswer').val();
        var questionId = $('#zongheWriteSubmit').attr('qid');

        if (!ZHPiGai.Doing.validWordsCount(strAnswer,150,"than")) {
            $('#tipModel').modal({
                backdrop: 'static'
            });
            return;
        }
        if(!ZHPiGai.Doing.validWordsCount(strAnswer,500,"less")){
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
                ZHPiGai.getToken();
                if (ZHPiGai.token && ZHPiGai.token != ZHPiGai.tokenTmp()) {
                    //登录后刷新右侧习题列表
                    ZHPiGai.Doing.loadPartRightQuestions();
                }
            });
            return;
        }
        ////弹出确认花费60积分
        //$('#spendJiFenModal').modal({
        //    backdrop: 'static'
        //});
        var param = {
            questionId: $('#zongheWriteSubmit').attr('qid'),
            strAnswer: $('#zongheWriteAnswer').val()
        };
        ZHPiGai.Doing.postData(param);
    };

    /*上传，保存用户写作内容*/
    ZHPiGai.Doing.postData = function (data) {
        var strAnswer = data.strAnswer;
        var questionId = data.questionId;

        var pdata = {};
        pdata.content = strAnswer;
        pdata.question_id = questionId;
        pdata.save_answers = 1;
        pdata.new_version = 1;
        pdata.spend_time=ZHPiGai.Doing.huafeiTime;

        var param = {
            url: URL.baseURL5 + "tpo_writing_correction_answers/app",
            type: "POST",
            headers: {
                Authorization: ZHPiGai.token,
                "Content-Type": "application/json"
            },
            data: JSON.stringify(pdata)
        };
        var promise = ZHPiGai.sendAjax(param);
        promise.then(function (json) {

            //type:1未批、2已批、3提交失败时,保存的答案
            if (json && json.error) {
                $('#txtShow').text(json.error);
                $('#waitPayModal').modal({
                    backdrop: 'static'
                });
                $('#waitPayModal').on('hidden.bs.modal', function (e) {
                });
                return;
            } else {
                /*计算用户实际需要支付的费用*/
                var obj = ZHPiGai.Doing.calculateCharge();
                obj.questionId = questionId;
                obj.answerId = json.answer_id+'_'+Final.ZONGHE_WRITE;

                $('#gotoPay').text(obj.btnName);
                $('#txtShow').text(obj.title);
                $('#waitPayModal').modal({
                    backdrop: 'static'
                });
                //$('#waitPayModal').on('hidden.bs.modal', function (e) {});
                $('#gotoPay').off('click').on('click', {obj: obj}, ZHPiGai.Doing.placeOrder);
            }
        });
    };

    /*计算用户实际需要支付的费用*/
    ZHPiGai.Doing.calculateCharge = function () {
        var obj={},
            objCoupon = {},
            objPiGai = {};
        //有名师批改券
        if (ZHPiGai.Doing.arrService.length > 0) {
            objPiGai = ZHPiGai.Doing.arrService[0];
            objPiGai.useCount =0;
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
        if (ZHPiGai.Doing.arrCoupon.length > 0) {
            objCoupon = ZHPiGai.Doing.arrCoupon[0];
            objCoupon.useCount =0;
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
        if (objPiGai.actualPay>=0 && objCoupon.actualPay>=0) {
            //看哪个方式需要用户支付的少
            if (objPiGai.actualPay <= objCoupon.actualPay) {
                obj = setObj('pigai', objPiGai);
            } else {
                obj = setObj('tuofuquan', objCoupon);
            }
        } else if (objPiGai.actualPay>=0) {
            obj = setObj('pigai', objPiGai);
        } else if (objCoupon.actualPay>=0) {
            obj = setObj('tuofuquan', objCoupon);
        } else {
            //啥都没有，只能去支付
            obj.btnName = '支付';
            obj.title = '作文已保存，名师写作批改1次需要' + Final.XIEZUO_PRICE + '元，确定要支付吗？';
        }
        return obj;

        function setObj(type,objQuan){
            var quan={};
            quan.useCount = objQuan.useCount;
            quan.actualPay = objQuan.actualPay < 0 ? 0 : objQuan.actualPay;
            quan.hasCount = objQuan.couponCount;
            // coupon说明：couponId_couponCount 赠券Id及使用数量中间加下划线。
            // 多种券之间用英文逗号分隔(例: 5_1,1_3,2_1)
            quan.coupon = objQuan.couponId + '_' + objQuan.useCount;
            quan.btnName = quan.actualPay == 0 ? '使用':'支付';
            if(type=='pigai'){
                //名师批改券
                quan.title = '作文已保存，你有' + quan.hasCount + '张小马名师批改券，一次可使用' + quan.useCount + '张，'
                    + (quan.actualPay == 0 ? '要使用吗？' : '还需支付' + quan.actualPay + '元');
            }else{
                //小马托福券
                quan.title = '作文已保存，名师写作批改1次需要' + Final.XIEZUO_PRICE + '元，可使用' + quan.useCount
                    + '张价值' + Final.COUPON_PRICE + '元的小马托福券，还需支付' + quan.actualPay + '元';
            }
            return quan;
        }
    };

    /*下单，韩瑜接口*/
    ZHPiGai.Doing.placeOrder = function (e) {
        $('#waitPayModal').modal('hide');
        var obj = e.data.obj, questionId = obj.questionId;
        var param = {
            url: URL.baseURL10 + "web/addCorrectOrder.action",
            type: "POST",
            async:false,
            data: {
                token: ZHPiGai.token,
                id: Final.CHONGCI_XIEZUO_ID,
                answerId: obj.answerId,
                coupon: obj.coupon
            }
        };
        var newWindowUrl='';
        var promise = ZHPiGai.sendAjax(param);
        promise.then(function (json) {
            //type：0:未做,1:已保存, 2:待抢, 3:待选老师,4:待批改, 5:已批改
            //下单成功。 status(0:成功,1:失败)
            if (json.status == 0 && json.result) {
                //免支付状态，不跳转到支付页面，直接刷新列表（用户使用了批改服务）
                //orderStatus == 1表示免支付
                if (json.result.orderInfo.orderStatus == 1) {
                    $('.modal-backdrop').hide();
                    /*刷新列表*/
                    //设置当前题目为已做
                    $.each(ZHPiGai.currentQuestions, function (i, item) {
                        if ((item.id + '') == questionId) {
                            item.type = 2;
                        }
                    });
                    var params = {
                        questionId: questionId,
                        type: 2//待抢
                    };
                    ZHPiGai.Doing.showAnswerPage(params);
                } else {
                    /*弹层提示支付*/
                    $('#payModel').modal({
                        backdrop: 'static'
                    });
                    $('#payModel').off('hidden.bs.modal').on('hidden.bs.modal', function (e) {
                        /*刷新列表*/
                        //设置当前题目为已保存
                        $.each(ZHPiGai.currentQuestions, function (i, item) {
                            if ((item.id + '') == questionId) {
                                item.type = 1;
                            }
                        });
                        var params = {
                            questionId: questionId,
                            type: 1//已保存
                        };
                        ZHPiGai.Doing.showAnswerPage(params);
                    });
                    //去支付的地址
                    newWindowUrl='../shoppingcenter/html/pigai.html#' + json.result.orderInfo.orderNum;
                }
            } else {
                /*下单失败*/
                $('#tipResult').text(json.message);
                $('#tipModel').modal({
                    backdrop: 'static'
                });
                $('#tipModel').off('hidden.bs.modal').on('hidden.bs.modal', function (e) {
                    /*刷新列表*/
                    //设置当前题目为已做
                    $.each(ZHPiGai.currentQuestions, function (i, item) {
                        if ((item.id + '') == questionId) {
                            item.type = 1;
                        }
                    });
                    var params = {
                        questionId: questionId,
                        type: 1//已保存
                    };
                    ZHPiGai.Doing.showAnswerPage(params);
                });
            }
        });
        //去支付的地址
        if(newWindowUrl){
            window.open(newWindowUrl,'_blank');
        }
    };
    /*视频播放*/
    ZHPiGai.Doing.playDemoVideo = function(source) {
        $('#playDemoVideo').modal({
            backdrop: 'static'
        });
        var content = '<script src="http://p.bokecc.com/player?vid=' + source
            + '&siteid=B86E9AC935D39444&autoStart=true&width=720&height=420&playerid=3B89CC3CB774B9A8&playertype=1" type="text/javascript"></script>';
        $("#divVideo").html(content);
    };

    /*获取用户的赠券以及规则，韩瑜的接口*/
    ZHPiGai.Doing.getUserCoupon = function () {
        ZHPiGai.Doing.arrService = [];
        ZHPiGai.Doing.arrCoupon = [];
        var param = {
            url: URL.baseURL10 + "order/myCoupon.action",
            type: "POST",
            data: {
                token: ZHPiGai.token,
                id: Final.CHONGCI_XIEZUO_ID
            }
        };
        var promise = ZHPiGai.sendAjax(param);
        promise.then(function (json) {
            //status(0:成功,1:失败)
            if (json.status == 0 && json.result) {

                $.each(json.result, function (i, item) {
                    //名师批改券（价值60）
                    if (item.couponId == Final.PIGAI_QUAN_ID) {
                        ZHPiGai.Doing.arrService.push(item);
                    } else if (item.couponId == Final.TUOFU_QUAN_ID) {
                        //小马托福券（价值40）
                        ZHPiGai.Doing.arrCoupon.push(item);
                    }
                });
            }
        });
    };

    /*验证用户是否登录*/
    ZHPiGai.Doing.checkLogin=function(){
        if (!BaseCookie.getToken()) {
            $('#dialogLogin').modal({
                backdrop: 'static'
            });
            $('#dialogLogin').on('hidden.bs.modal', function (e) {
                ZHPiGai.getToken();
                if (ZHPiGai.token && ZHPiGai.token != ZHPiGai.tokenTmp()) {
                    //登录后刷新右侧习题列表
                    ZHPiGai.Doing.loadPartRightQuestions();
                }
            });
            return;
        }
    };


    /**
     * 作文单词长度计算和限制最长字符长度
     */
    ZHPiGai.Doing.checkLengthNew = function (e) {
        var content = $(e.target).val();
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
            if (newContentArray.length > 500) {
                $(this).val(ZHPiGai.Doing.preWord);
            }else if(newContentArray.length > 480){
                ZHPiGai.Doing.preWord = $(this).val();
            }
        }
    };

    /**
     * 验证作文单词输入长度
     * @param e
     */
    ZHPiGai.Doing.validWordsCount = function (content, length, type) {
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
    ZHPiGai.Doing.calculateWordCount = function (content) {
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

    /*右部分列表条*/
    ZHPiGai.Doing.loadPartRightQuestions = function () {

        //from：1:web
        var param = {
            url: URL.baseURL5 + "tpo_writing_correction_questions",
            headers: {
                Authorization: ZHPiGai.token
            },
            data: {from: 1}
        };
        var promise = ZHPiGai.sendAjax(param);
        promise.then(function (json) {

            var questionsArray = new Array();
            var renderData = {};
            $.each(json.tpo_writing_questions, function (key, val) {
                var tmp = {};
                tmp.id = val.question_id;
                tmp.content = val.content;
                tmp.sequence_number = val.question_sequence_number;
                tmp.type = val.type;
                tmp.score = val.score;
                questionsArray.push(tmp);
            });
            renderData.questions = questionsArray; //保存当前下载题目
            ZHPiGai.currentQuestions = questionsArray; //保存当前下载题目
            $.each(renderData.questions, function (i, n) {
                n.content = (n.content && n.content.length > 43) ? n.content.substring(0, 43) : n.content;
            });
            Render.render({
                wrap: $('#partRightList'),
                tmpl: {
                    tmplName: ZHPiGai.TMPL.right_list,
                    tmplData: renderData
                }
            });
        });

    };

    /*重做*/
    ZHPiGai.Doing.doAgain = function () {
        var params = {};
        params.questionId = $('#doZHPGAgain').attr("qid");
        params.type = 0;
        ZHPiGai.Doing.showAnswerPage(params);
    };

    /*显示用户答案详细信息*/
    ZHPiGai.Doing.showDetails = function () {
        var $this = $(this),param = {};
        param.type = parseInt($this.attr('qtype'));
        param.qid = $this.attr('qid');//questionId
        param.answer_id = $this.attr('answer-id');
        //已批改走单独的接口
        if(param.type==ZHPiGai.type.yipigai){
            ZHPiGai.Doing.getYiPiGaiUserAnswer(param);
        }else{
            ZHPiGai.Doing.getUserAnswer(param);
        }
    };

    /*获取用户答案-已批改之外的其他状态*/
    ZHPiGai.Doing.getUserAnswer = function (param) {
        var params = {
            url: URL.baseURL5 + 'tpo_writing_correction_questions/get_one',
            headers: {
                Authorization: ZHPiGai.token
            },
            data: {
                'question_id': param.qid
            }
        };
        var promise = ZHPiGai.sendAjax(params);
        promise.then(function (json) {
            if (json && json.error) {
                alert(json.error);
            } else {
                var renderData = {};
                renderData.id = param.qid;
                renderData.answer_id=param.answer_id;
                renderData.sequence_number = json.question_sequence_number;
                renderData.content = json.content ? [json.content.replace(/\n/g, '<br/>')] : [];
                renderData.audio_url = json.audio_url;
                renderData.question_answers = json.question_answers;
                renderData.questions = ZHPiGai.currentQuestions;
                $.each(renderData.questions, function (i, n) {
                    n.content = (n.content && n.content.length > 43) ? n.content.substring(0, 43) + '…' : n.content;
                });
                renderData.title = '综合写作批改';

                //存储此题的用户答案
                ZHPiGai.Doing.userAnswers = renderData.question_answers;
                $.each(renderData.question_answers, function (i, n) {
                    n.answer_created_at = n.answer_created_at ? n.answer_created_at.substring(0, 19).replace("T", "&nbsp;&nbsp;") : n.answer_created_at;
                    n.cutAnswer = (n.answer_content && n.answer_content.length > 260) ? n.answer_content.substring(0, 260) + '…' : n.answer_content;
                    if (n.mark_created_at) {
                        n.mark_created_at = n.mark_created_at.substring(0, 19).replace("T", "&nbsp;&nbsp;");
                    }
                });
                param.renderData=renderData;
                ZHPiGai.Doing.renderAnswer(param);
            }
        });
    };
    /*只获取已批改的用户答案-新接口*/
    ZHPiGai.Doing.getYiPiGaiUserAnswer = function (param) {
        /*1	精华口语批改
        2	机经口语批改
        3	机经写作批改
        4	tpo综合口语批改
        5	tpo综合写作批改
        6	保分机经口语批改
        7	保分机经写作批改
        8	保分tpo综合口语批改
        9	保分tpo综合写作批改*/
        var params = {
            url: URL.baseURL10 + 'correct/web/getMarkDetail.action',
            headers: {
                token: ZHPiGai.token
            },
            data: {
                correctType:5,
                answerId: param.answer_id
            }
        };
        var promise = ZHPiGai.sendAjax(params);
        promise.then(function (json) {
            if (json.status==0) {
                var result=json.result,
                    renderData = {};
                renderData.id = param.qid;
                renderData.type=param.type;
                renderData.answer_id=param.answer_id;
                renderData.sequence_number = result.questionSeq;
                renderData.content = result.questionContent ? [result.questionContent.replace(/\n/g, '<br/>')] : [];
                renderData.answer_content=result.content;
                renderData.audio_url = result.audioUrl;
                renderData.questions = ZHPiGai.currentQuestions;
                $.each(renderData.questions, function (i, n) {
                    n.content = (n.content && n.content.length > 43) ? n.content.substring(0, 43) + '…' : n.content;
                });
                renderData.title = '综合写作批改';
                renderData.mark_created_at = formatDate(new Date(result.createTime),'yyyy-MM-dd hh:mm');
                renderData.score = result.score;
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
                renderData.answer_content = ZHPiGai.Doing.createTeacherRemark(renderData);
                renderData.wordCount = ZHPiGai.Doing.calculateWordCount(result.content);
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
                    wrap: ZHPiGai.$wrap,
                    tmpl: {
                        tmplName: ZHPiGai.TMPL.result_detail_yipigai,
                        tmplData: renderData
                    },
                    afterRender: function () {
                        ZHPiGai.Doing.initAudioControl('myMusic1');
                        //绑定评价按钮
                        $(document).off('click','button[isPingJia]').on('click', 'button[isPingJia]', function () {
                            var $this =$(this),
                                isPingJia=$this.attr('isPingJia'),
                                answerId=$this.attr('answerId'),
                                teacherId=$this.attr('teacherId'),
                                moduleName='TPOZHXZ';
                            /*ORAL_JJ	机经口语批改，WRITING_JJ	机经写作批改，TPOZHKY	tpo综合口语批改
                            TPOZHXZ	tpo综合写作批改，BF_ORAL_JJ	保分机经口语批改，BF_WRITING_JJ	保分机经写作批改
                            BF_TPOZHKY	保分tpo综合口语批改，BF_TPOZHXZ	保分tpo综合写作批改*/
                            require(['app/teacher/evaluate_teacher'],function(PingJia){
                                var obj={
                                    moduleName:moduleName,
                                    answerId:answerId,
                                    teacherId:teacherId,
                                    lookCallback:null,
                                    addCallback:function(){
                                        ZHPiGai.Doing.getYiPiGaiUserAnswer(param);
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
                        ZHPiGai.Doing.setPiGaiEffect();
                    }
                });

            }else{
                console.log(json.message);
            }
        });
    };

    /*显示用户答案详细信息*/
    ZHPiGai.Doing.renderAnswer = function (params) {
        var renderData = params.renderData,
            templName = '',
            type = params.type,
            answer_id = params.answer_id;

        renderData.id = params.qid;
        //$('#showDetail').removeClass('h202');
        //$('#doZHPGAgain').hide();

        $.each(ZHPiGai.Doing.userAnswers, function (i, item) {
            if (item.answer_id + '' == answer_id) {
                renderData.answer_id=answer_id;
                renderData.answer_created_at = item.answer_created_at;
                renderData.mark_created_at = item.mark_created_at;
                renderData.create_at = formatDate(new Date(item.answer_created_at.replace(/\&nbsp;/g,' ')),'yyyy-MM-dd hh:mm');
                renderData.score = item.score;
                if(item.spend_time){
                    renderData.spend_time = format_time(item.spend_time);
                }
                renderData.wordCount = ZHPiGai.Doing.calculateWordCount(item.answer_content);
                //鼠标悬浮时显示教师对相应内容的评价
                renderData.answer_content = ZHPiGai.Doing.createTeacherRemark(item);
                switch (type) {
                    //已保存
                    case ZHPiGai.type.baocun:
                        templName = ZHPiGai.TMPL.result_detail_yibaocun;
                        break;
                    //等待老师抢作业
                    case ZHPiGai.type.daiqiang:
                        templName = ZHPiGai.TMPL.result_detail_daiqiang;
                        break;
                    //选择老师
                    case ZHPiGai.type.chooseteacher:
                        templName = ZHPiGai.TMPL.result_detail_chooseteacher;
                        var teacher = ZHPiGai.Doing.loadTeacherList(answer_id,1);
                        renderData.teachers =teacher.teachers;
                        renderData.totalCount =teacher.totalCount;
                        break;
                    //待批改
                    case ZHPiGai.type.daipigai:
                        templName = ZHPiGai.TMPL.result_detail_daipigai;
                        renderData.teacher_avatar = item.teacher_avatar ? item.teacher_avatar : 'http://newbbs.b0.upaiyun.com/avater/avater.png';
                        renderData.teacher_nickname = item.teacher_nickname;
                        renderData.teacher_id = item.teacher_id;
                        break;
                    //已批改(已由单独的一个方法调用单独的接口来处理)
                    //case ZHPiGai.type.yipigai:
                    //    templName = ZHPiGai.TMPL.result_detail_yipigai;
                    //    renderData.teacher_avatar = item.teacher_avatar ? item.teacher_avatar : 'http://newbbs.b0.upaiyun.com/avater/avater.png';
                    //    renderData.teacher_nickname = item.teacher_nickname;
                    //    renderData.teacher_id = item.teacher_id;
                    //    break;
                }
            }
        });
        Render.render({
            wrap: ZHPiGai.$wrap,
            tmpl: {
                tmplName: templName,
                tmplData: renderData
            },
            afterRender: function () {
                ZHPiGai.Doing.initAudioControl('myMusic1');
                //待选老师
                if(type == ZHPiGai.type.chooseteacher){
                    bindPage('#pageSlide1', Math.ceil(renderData.totalCount/10), chooseTeacher_turnPage, 1,answer_id);
                }
            }
        });
    };

    /*设置老师文本和语音批注点击效果*/
    ZHPiGai.Doing.setPiGaiEffect = function () {
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
            ZHPiGai.Doing.playAudio();
            $('#btnPlay').hide();
            $('#btnStopPlay').show();
        });
        //暂停
        $('#btnStopPlay').on('click', function () {
            ZHPiGai.Doing.playAudio();
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
        //    playStartTime=(new Date()).getTime();
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
                answerType: 5,
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
    ZHPiGai.Doing.saveTeacherOfChoose=function(){
        var radioTeacher = $('.divChoose .type-radi01'),
            questionId =radioTeacher.attr('questionId'),
            answerId =radioTeacher.attr('answerid'),
            teacherId=radioTeacher.attr('teacherid');
        if(radioTeacher.length<=0){
            //alert('请选择老师');
            return;
        }
        $('#btnSaveTeacher').attr('disabled',true);
        var param = {
            url: URL.baseURL10 + "correct/submitTeacherChecked.action",
            type: 'post',
            data: {
                answerType: 5,
                answerId:answerId,
                teacherId:teacherId
            }
        };
        var promise = ZHPiGai.sendAjax(param);
        promise.then(function (json) {
            //成功
            if(json.status==0){
                ZHPiGai.Doing.switchToDaiPiGai(questionId,answerId);
            }else{
                alert(json.message);
            }
        });
    };

    /*切换到待批改页面*/
    ZHPiGai.Doing.switchToDaiPiGai = function (questionId,answerId) {
        var param = {};
        //待批改
        param.type = ZHPiGai.type.daipigai;
        param.qid = questionId;
        param.answer_id = answerId;
        //type：0:未做,1:已保存, 2:待抢, 3:待选老师,4:待批改, 5:已批改
        //设置当前题目为待批改
        $.each(ZHPiGai.currentQuestions, function (i, item) {
            if ((item.id + '') == questionId) {
                item.type = 4;
            }
        });
        ZHPiGai.Doing.getUserAnswer(param);
    };

    /*加载老师列表数据*/
    ZHPiGai.Doing.loadTeacherList = function (answerId,page) {
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
                answerType: 5,
                answerId:answerId,
                currentPage:page
            }
        };
        var promise = ZHPiGai.sendAjax(param);
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

    /*批改之前已经保存成功但还没有批改的用户答案*/
    ZHPiGai.Doing.PiGaiTheSaved = function () {

        if (!BaseCookie.getToken()) {
            $('#dialogLogin').modal({
                backdrop: 'static'
            });
            $('#dialogLogin').on('hidden.bs.modal', function (e) {
                ZHPiGai.getToken();
                if (ZHPiGai.token && ZHPiGai.token != ZHPiGai.tokenTmp()) {
                    //登录后刷新右侧习题列表
                    ZHPiGai.Doing.loadPartRightQuestions();
                }
            });
            return;
        }

        var $btnPiGai=$('#btnPigaiSaved');
        /*计算用户实际需要支付的费用*/
        var obj = ZHPiGai.Doing.calculateCharge();
        obj.questionId = $btnPiGai.attr('qid');
        obj.answerId = $btnPiGai.attr('answer_id')+'_'+Final.ZONGHE_WRITE;

        $('#gotoPay').text(obj.btnName);
        $('#txtShow').text(obj.title);
        $('#waitPayModal').modal({
            backdrop: 'static'
        });
        $('#gotoPay').off('click').on('click', {obj: obj}, ZHPiGai.Doing.placeOrder);
    };

    /*展开或收起结果*/
    //ZHPiGai.Doing.expandOrCollapse = function () {
    //    var $this = $(this), expandId = $this.attr('expand_id');
    //
    //    $this.hide().siblings().show();
    //    if ($this.text() == '展开') {
    //        $('span[expand_id="' + expandId + '"]').css({"display": "inline"});
    //    } else {
    //        $('span[expand_id="' + expandId + '"]').css({"display": "block"});
    //    }
    //};

    /*导航条*/
    ZHPiGai.Doing.navigatorTolist = function () {
        $('#leftDiv').hide();
        $('#side9').click();
        $('#side').show();
    };

    /*播放教师批注音频*/
    ZHPiGai.Doing.playAudio = function () {
        var music = document.getElementById("html5Audio");
        if (music.paused) {
            music.play();
        } else {
            music.pause();
        }
    };
    window.writeTimer=0;
    //倒计时（到达指定时间后开始正计时）
    var startWriteTimer = function () {
        var temptime = ZHPiGai.Doing.writeTotalTime;
        window.clearInterval(window.writeTimer);
        var fn = function () {
            if (temptime > 0 && temptime <= ZHPiGai.Doing.writeTotalTime) {
                temptime--;
                ZHPiGai.Doing.huafeiTime = ZHPiGai.Doing.writeTotalTime-temptime;
            } else if (temptime == 0) {
                temptime = ZHPiGai.Doing.writeTotalTime;
                temptime++;
                ZHPiGai.Doing.huafeiTime = temptime;
            } else {
                temptime++;
                ZHPiGai.Doing.huafeiTime = temptime;
            }

            $("#writeTimer").html(format_time(temptime));
        };
        window.writeTimer = window.setInterval(fn, 1000);
    };
    var clearWriteTimer= function (){
        window.clearInterval(window.writeTimer);
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

    //显示正在开发页面
    var toDoRender = function () {
        var param = {
            "tmplName": 'app/tmpl_todo',
            "tmplData": '',
            "afterRender": ''
        };

        var renderTemplate = function (param) {
            Render.render({
                wrap: param.wrap || ZHPiGai.$wrap,
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
        init: ZHPiGai.init
    };
});