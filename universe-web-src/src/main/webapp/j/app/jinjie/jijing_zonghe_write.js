/**
 * Created by SaE on 2015/6/16.
 * 进阶练习-综合写作练习
 */
define(['common/render', 'xml2json', 'app/baseURL', 'baseCookie'], function (Render, xml2json, URL, BaseCookie) {
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
	var xm_planDayId='',    //20160921
		xm_exerciseId='',	//20160921
		xm_startTime='',	//20160921
		xm_endTime='',	    //20160921
		xm_title='',        //20160926
		xm_curQuestionId='',
		durationTime = 0,//写作计时
		testTimerMark = true,
        writeTestTimer;//计时器
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
//      $(document).on('trigger_side77', '#side77', ZongHeWrite.loadList) 
//      $document.on('click', '#side77', ZongHeWrite.loadList); //加载列表
        $document.on('click', '.zonghe', ZongHeWrite.Doing.showAnswerBefore);//显示做题页面
        $document.on('click', '.expand1', ZongHeWrite.Doing.expandOrCollapse);//折叠/展开
        $document.on('click', '#DoAgain', ZongHeWrite.Doing.doAgain);//重做
        $document.on('click','#btnSubmits',ZongHeWrite.Doing.Submit);//提交
        $document.on('keyup', '#jjWriteAnswer1', ZongHeWrite.Doing.checkLengthNew);
        $document.on('click','.navzhlist',ZongHeWrite.Doing.navigatorTolist);//导航条
        $document.on('click', '.navzhwrite', function () {
            $('#leftDiv').hide();
            $('#side77').click();
            $('#side').show();
        });
        $document.on('click','#startWrite',ZongHeWrite.Doing.startTimer);//开始写作并计时
        $document.on('click','.playthevideo',function(){
            ZongHeWrite.Doing.playDemoVideo($(this).attr('data-source'));
        });//播放视频
        $document.on('click','#btnDoneQuestion',function(){
        	$("#morePlan").show();
        })
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
                },
                afterRender:function(){$(".zonghe").eq(0).trigger("click");}
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
    ZongHeWrite.Doing.showAnswerPage = function (params) {  //可注释，等同于 showZongheWrite
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

        });
    };
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
    /*保存*/
    ZongHeWrite.Doing.Submit = function () {
    	var date=new Date($.ajax({async: false}).getResponseHeader("Date"));
			xm_endTime=zeroFn(date.getFullYear())+"-"+zeroFn((date.getMonth()+1))+"-"+zeroFn(date.getDate())+" "+zeroFn(date.getHours())+":"+zeroFn(date.getMinutes())+":"+zeroFn(date.getSeconds());
			date=null;
        var strAnswer = $('#jjWriteAnswer1').val();
		var spend_time = Math.round(durationTime);
		var questionId = xm_curQuestionId;
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
        var pdata = { 
            "content": strAnswer,
            "question_id": questionId,
//          "audio_url": xm_audio_url,
			"planDayId": xm_planDayId,
			"exerciseId": xm_exerciseId,
			"startTime":xm_startTime,
			"endTime": xm_endTime,
			"spend_time": spend_time
        };
        var param = {
        	url: URL.xiaomaURL + "tpo_writing_correction_answers/save_exercise",
            type: "POST",
            headers: {
                Authorization: exerciseApi.xiaomaToken             
            },
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(pdata)
        };
        testTimerMark = true;
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
				exerciseApi.updateListItem();
				gotoHisZongheResult(questionId,xm_planDayId,xm_exerciseId,xm_title);	
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
        }else{
        	$("#wordContent").html(0);
        }

    };
				//开始计时
		ZongHeWrite.Doing.startTimer = function() {
				if(!testTimerMark) return;
				ZongHeWrite.Doing.clearTimer();
				var fn = function() {
					if ($("#writeSpendTime").length <= 0) {
						console.log("not find target");
					}	
					if (!durationTime && durationTime<0) {
						durationTime = 1; //计算剩余的毫秒数
					} else {
						durationTime++;
					}
		
					var ts = durationTime;
					//var dd = parseInt(ts / 60 / 60 / 24, 10); //计算剩余的天数
					var hh = parseInt(ts / 60 / 60 % 24, 10); //计算剩余的小时数
					var mm = parseInt(ts / 60 % 60, 10); //计算剩余的分钟数
					var ss = parseInt(ts % 60, 10); //计算剩余的秒数
					//dd = zeroFn(dd);
					hh = zeroFn(hh);
					mm = zeroFn(mm);
					ss = zeroFn(ss);
					currentTestTimeStr = hh + ":" + mm + ":" + ss;
					$("#writeSpendTime").html(currentTestTimeStr);
				};
				if (writeTestTimer) return;
				writeTestTimer = window.setInterval(fn, 1000);
				testTimerMark = false; 
			};
			ZongHeWrite.Doing.clearTimer = function() {
				durationTime = 0; //计时时间间隔（单位秒）
				currentTestTimeStr = '00:00:00'; //重置计时时间
				window.clearInterval(writeTestTimer);
				writeTestTimer = undefined;
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
        /*var $jjContent = $('#jjResultContent');
        var params = {};
        params.questionId = $jjContent.attr("qid");
        params.type = 0;
        ZongHeWrite.Doing.showAnswerPage(params);*/
        showZongheWrite(xm_curQuestionId,xm_planDayId,xm_exerciseId,xm_title);
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
        //20160927 播放视频时 暂停audio播放
    	var $audioDiv = $(".audiojsZ");
    	if($audioDiv.hasClass("playingZ")){
    		$audioDiv.removeClass("playingZ");
    		$("#myMusic")[0].pause();
    	}
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
    
	//毫秒转年月日  
        function getMyDate(str){  
            var oDate = new Date(str),  
            oYear = oDate.getFullYear(),  
            oMonth = oDate.getMonth()+1,  
            oDay = oDate.getDate(),  
            oHour = oDate.getHours(),  
            oMin = oDate.getMinutes(),  
            oSen = oDate.getSeconds(),  
            oTime = oYear +'-'+ getzf(oMonth) +'-'+ getzf(oDay) +' '+ getzf(oHour) +':'+ getzf(oMin) +':'+getzf(oSen);//最后拼接时间  
            return oTime;  
        };  
        //补0操作  
        function getzf(num){  
            if(parseInt(num) < 10){  
                num = '0'+num;  
            }  
            return num;  
        } 
		var zeroFn=function(n){
			n=n<10?"0"+n:n;
			return n;
		}
	//答题页面20160921
	var showZongheWrite = function(question_id,planDayId,exerciseId,title){
		//0：未做过，1：待批改，2：已批改，3：已保存
		xm_planDayId = planDayId?planDayId:xm_planDayId;
		xm_exerciseId = exerciseId?exerciseId:xm_exerciseId;
		xm_title = title?title:xm_title; //20160926
		var questionId = question_id;
		xm_curQuestionId = question_id; //全局变量 当前问题id
        $.ajax({
        	url: URL.xiaomaURL + 'tpo_writing_correction_answers/exercise/' + questionId,
        	headers: {
                Authorization: exerciseApi.xiaomaToken
            },
            dataType: "json",
            success: function(json){
                var renderData = {};
                renderData.cText = "综合写作";
                renderData.question_id = json.question_id;
                renderData.question_sequence_number = json.question_sequence_number;
                renderData.question_content = (json.content);
                renderData.answers = json.question_answers;
                renderData.audio_url=json.audio_url;
                //renderData.analysis=json.analysis;
                //讲解视频
                if(json.analysisVideo.length!=0){
                	renderData.analysisVideo=json.analysisVideo[0];
                	renderData.analysis=(renderData.analysisVideo&&renderData.analysisVideo.content)?renderData.analysisVideo.content:[];
               		
                }
                // 文本范例
                if(json.analysisText.length!=0){
                	renderData.analysisText=json.analysisText[0];
                	renderData.textAnalysis=(renderData.analysisText&&renderData.analysisText.content)?renderData.analysisText.content.replace(/\n/gi,'<br/>'):"";
                }
                
                renderData.questions = ZongHeWrite.currentQuestions;
                renderData.rightPartTitle=ZongHeWrite.currentTitle;
                renderData.title=xm_title; //20160926
                $.each(renderData.questions, function (i, n) {
                    n.question_content = (n.question_content && n.question_content.length > 43) ? n.question_content.substring(0, 43) : n.question_content;
                });
                $("#side").css("display", "none"); //隐藏左边导航
                    //做题页
                    Render.render({
                        wrap: ZongHeWrite.$wrap,
                        tmpl: {
                            tmplName: ZongHeWrite.TMPL.doing,
                            tmplData: renderData
                        },
                        afterRender:function(){
                        	//作文范本 分段
                        	/*var parrten = json.content.replace(/\n/gi,"<br/>");
                           	$("#Integralgain p").html(parrten);
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
                            }*/
                        	$(".jijingwrite-p .myjjcontent1").each(function(index,value){
	                    		   $(value).html($(value).text());
	                    	   })
                            initAudioControl('myMusic');
                        }
                    });
                    var date=new Date($.ajax({async: false}).getResponseHeader("Date"));
					xm_startTime=zeroFn(date.getFullYear())+"-"+zeroFn((date.getMonth()+1))+"-"+zeroFn(date.getDate())+" "+zeroFn(date.getHours())+":"+zeroFn(date.getMinutes())+":"+zeroFn(date.getSeconds());
					date=null;
           		}
       		 });

		}
	//结果页20160921
	var gotoHisZongheResult = function(question_id,planDayId,exerciseId,title){
		var questionId = question_id;
		xm_curQuestionId = question_id; //全局变量 当前问题id
		xm_planDayId = planDayId?planDayId:xm_planDayId;
		xm_exerciseId = exerciseId?exerciseId:xm_exerciseId;
		xm_title = title?title:xm_title;
        $.ajax({
        	url: URL.xiaomaURL + 'tpo_writing_correction_answers/exercise/' + questionId,
        	headers: {
                Authorization: exerciseApi.xiaomaToken
            },
            dataType: "json",
            success: function(json){
                var renderData = {};
/*                renderData.cText = "综合写作";*/
                renderData.question_id = json.question_id;
                renderData.question_sequence_number = json.question_sequence_number;
                renderData.question_content = json.content;
                $.each(json.question_answers,function(index,value){
                	value.answer_content=value.answer_content.replace(/\n+/g,"<br/>");
                	value.spend_time = toTimerStr(value.spend_time);
                })
                function toTimerStr(timeNum){
					var hh = parseInt(timeNum / 60 / 60 % 24, 10); //小时数
					var mm = parseInt(timeNum / 60 % 60, 10); //分钟数
					var ss = parseInt(timeNum % 60, 10); //秒数
					hh = getzf(hh);
					mm = getzf(mm);
					ss = getzf(ss);
					return timeNum = hh + ":" + mm + ":" + ss;
                }
                renderData.answers = json.question_answers;
                renderData.audio_url=json.audio_url;
              //讲解视频
                if(json.analysisVideo.length!=0){
                	renderData.analysisVideo=json.analysisVideo[0];
                	renderData.analysis=(renderData.analysisVideo&&renderData.analysisVideo.content)?renderData.analysisVideo.content:[];
                }
                // 文本范例
                if(json.analysisText.length!=0){
                	renderData.analysisText=json.analysisText[0];
                	renderData.textAnalysis=(renderData.analysisText&&renderData.analysisText.content)?renderData.analysisText.content.replace(/\n/gi,'<br/>'):"";
                }
                
                
                renderData.questions = ZongHeWrite.currentQuestions;
                renderData.rightPartTitle=ZongHeWrite.currentTitle;
                renderData.title=xm_title; //20160926
                $.each(renderData.questions, function (i, n) {
                    n.question_content = (n.question_content && n.question_content.length > 43) ? n.question_content.substring(0, 43) : n.question_content;
                });
                    //渲染结果页
                    Render.render({
                        wrap: ZongHeWrite.$wrap,
                        tmpl: {
                            tmplName: ZongHeWrite.TMPL.result,
                            tmplData: renderData
                        },
                        afterRender:function(){
                            initAudioControl('myMusic1');
		                   /* var $create_at = Number($(".correct-ans").html());
							$(".correct-ans").html(getMyDate($create_at));*/  //毫秒转年月日方法 
							if(!exerciseApi.isFromPlan){
								$("#btnDoneQuestion").show();
							}else{
								$("#btnDoneQuestion").hide();
							}
							$(".jijingwrite-p .myjjcontent1").each(function(index,value){
	                    		   $(value).html($(value).text());
	                    	   })
                        }
                    });
           		}
       		 });

           
	}
    return {
        init: ZongHeWrite.init,
        showZongheWrite:showZongheWrite,
        gotoHisZongheResult:gotoHisZongheResult
    };
});