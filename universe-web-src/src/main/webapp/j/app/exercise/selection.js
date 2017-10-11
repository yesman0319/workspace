'use strict'

define(['common/uniqueAjax', 'common/render', 'xml2json', 'app/baseURL', 'baseCookie', 'lib/store'], function(uniqueAjax, Render, xml2json, URL, BaseCookie) {
	var _conf,
		$wrap,
		TMPL = {
			t_result_page: 'app/exercise/tmpl_selection_result',
			t_err_question_page: 'app/exercise/listenError_tmpl/tmpl_selection',
			t_question_page: 'app/exercise/tmpl_listen_selection_question',
			t_question_wrapper_page: 'app/exercise/tmpl_listen_selection_selection',
			t12: 'app/exercise/tmpl_selection_result_rate'//直接进入结果页
		};

	var token,
		tokenTmp = "xiaoma";
	var currentQuestion = {}, //一个题提取的时候清空
		currentQuestionIndex = 0,
		questions = [], //一次性提取所有问题
		questionsCount = 0, //当前单元共有多少题
		records,//记录做过的每一道题
		errIds,
		currentGroupIndex = 0, //记录当前groups数组位置
		currentGroupSequneceNum = "", //记录当前group的sequence_number
		localErr = []; //记录错题
	var durationTime = 0; //计时时间
	var timeInterval;//延迟器变量
	var startTime, //用于积分时间计算
		endTime;
	var currentTestTimeStrListen, //当前时间字符串，用于下一题同步显示时间
		testTimerIDListen; //计时器ID
	var xm_groupId='',
		xm_planDayId='',
		xm_exerciseId='',
		xm_startTime='',
		xm_endTime='',
		xm_title='',
		xm_sortType='';
	var errAry=[];//错题集合
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
		//点击选择
		$(document).on('click', '.selectWord', function(e) {
			var $this = $(this);
			$("#selectionAudio")[0].pause();
			$(".selectAudioImg").attr("src", "../../i/i20.png")
			if($this.hasClass("selected")){
				$this.removeClass("selected");
			}else{
				$this.addClass("selected");
			}
			if($(".selected").length){
				$("#nextSelectQuestion").removeAttr("disabled");
				$("#nextSelectErrQuestion").removeAttr("disabled");
			}
		});
		$(document).on('click', '#againSelection', function(e) {
			//清空全局变量
			currentQuestion = {}
			currentQuestionIndex = 0;
			records = [];
			errIds = [];
			errAry=[];
			durationTime = 0;
			var param = {}
			param.rate = null;
			param.index = currentGroupIndex;
			param.sequence_number = currentGroupSequneceNum;
			param.groupId=xm_groupId;
			selectionInitData(param)
		})
		$(document).on('click', '#errOnlySelection', errOnlySelection); //多选重做错题
		$(document).on('click', '.selectAudioImg', function(e) {
			$(".selectAudioImg").attr("src", "../../i/i20.png")
			$("#selectionAudio")[0].pause();   
			$(e.target).attr("src", "../../i/i2.gif");
			$("#selectionAudio").attr('src', $(e.target).attr('data-url'));
			$("#selectionAudio")[0].play()
			$("#selectionAudio")[0].addEventListener('ended', function() {
				$(e.target).attr("src", "../../i/i20.png")
			}, false);
		});
		$(document).on('click', '#word1Submit', function(e) {
			clearTimerListen(); //弹出登录层暂停时间
			$('#dialogLogin').modal({
				backdrop: 'static'
			})
		})
		$(document).on('click', '#closeQuan', function() {
			closeDiv('quanDiv', 'fade')
		});
		$(document).on("click","#nextSelectQuestion",function(){
			doQuesiton();
			timeInterval = setTimeout(showResult,1200);
		});
	} 
	 function shuffle (inputArr) {
	     var valArr = [],k = '';
		 for (k in inputArr) { // Get key and value arrays
	       if (inputArr.hasOwnProperty(k)) {
	           valArr.push(inputArr[k]);
		   }
		 }
		 valArr.sort(function () {
			 return 0.5 - Math.random();
		 });
		 return valArr;
	 }
	    
	var startTimerListen = function() {
		var date=getTime();
		xm_startTime=zeroFn(date.getFullYear())+"-"+zeroFn((date.getMonth()+1))+"-"+zeroFn(date.getDate())+" "+zeroFn(date.getHours())+":"+zeroFn(date.getMinutes())+":"+zeroFn(date.getSeconds());
		date=null;
		var fn = function() {
			if ($("#testTimer3").length <= 0) {
				clearTimerListen();
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
			//var dd = parseInt(ts / 60 / 60 / 24, 10); //计算剩余的天数
			var hh = parseInt(ts / 60 / 60 % 24, 10); //计算剩余的小时数
			var mm = parseInt(ts / 60 % 60, 10); //计算剩余的分钟数
			var ss = parseInt(ts % 60, 10); //计算剩余的秒数
			//dd = checkTime(dd);
			hh = checkTime(hh);
			mm = checkTime(mm);
			ss = checkTime(ss);
			currentTestTimeStrListen = hh + ":" + mm + ":" + ss;
			$("#testTimer3").html(currentTestTimeStrListen);
		};
		if (testTimerIDListen) return;
		testTimerIDListen = window.setInterval(fn, 1000);
	}

	var clearTimerListen = function() {
		window.clearInterval(testTimerIDListen);
		testTimerIDListen = undefined;
	}
	//初始化变量并请求json数据
	var selectionInitData = function(param) {
		$('body,html').animate({scrollTop: 0}, 100);
		//清空全局变量
		currentQuestion = {}
		currentQuestionIndex = 0;
		questions = [];
		records = [];
		errIds = [];
		errAry=[];
		currentGroupIndex = 0;
		currentGroupSequneceNum = "";
		localErr = [];
		if (isEmpty(param.rate)) { //rate=null，从第一个题开始
			startTime = new Date();
			currentTestTimeStrListen = null;
			$.ajax({
				url: URL.xiaomaURL + "wyjySelectionGroups/get/"+param.groupId,
				type: 'get',
				async: false,
				headers: {
					"Authorization": exerciseApi.xiaomaToken
				},
				success: function(json) {
					json=$.parseJSON(json);
					questions = shuffle(json.rows);//乱序
					questionsCount = json.rows.length;
					var paramTmp = {
						sequence_number: 1,
						group_id: param.groupId
					};
					getWord(paramTmp);
				}
			});
		} else {
			currentQuestion = {}
			currentQuestionIndex = 0;
			questions = [];
			records = [];
			if (typeof(param.error_question_ids) == 'string') {
				errIds = JSON.parse(param.error_question_ids);
			} else {
				errIds = param.error_question_ids;
			}
			currentGroupIndex = param.index;
			currentGroupSequneceNum = param.sequence_number;
			resultSelection(2)
		}
	}
	//读题,参数第几组第几个sequence_number,group_id
	var getWord = function(param) {
		currentQuestion = {};
		currentQuestion.correctResponse = questions[currentQuestionIndex].answer.split(",");//存放正确答案数组
		var bodyTmp = questions[currentQuestionIndex];
		currentQuestion.id = bodyTmp.id;//此题id
		currentQuestion.sequence_number = currentQuestionIndex + 1;//当前题序号
		currentQuestion.questionAudioUrl = bodyTmp.questionAudioUrl;//单词音频
		currentQuestion.questionImgUrl = bodyTmp.questionImgUrl;//单词图片
		var simpleChoices = [];
		for (var i = 0; i < bodyTmp.options.length; i++) {
			var choiceItemObj = {};
			choiceItemObj.optionHead = bodyTmp.options[i].optionSelection;//选项标头ABCD..
			choiceItemObj.optionContent = bodyTmp.options[i].optionDescription;//选项内容
			simpleChoices.push(choiceItemObj);
		}
		currentQuestion.simpleChoices = simpleChoices;
		currentQuestion.group_count = questionsCount;
		var renderData = {}; 
		renderData.xm_title=xm_title;
		renderData.content = currentQuestion;
		renderData.group_count = questionsCount;
		renderData.current_count = currentQuestionIndex + 1;
		if (currentTestTimeStrListen) {
			renderData.currentTestTimeStrListen = currentTestTimeStrListen;
		}
		
		function _afterRender1() {
//			$($(".selectAudioImg")[0]).attr("src", "../../i/i2.gif")
//			$("#selectionAudio")[0].pause()
//			$("#selectionAudio").attr('src', $(".selectAudioImg").eq(0).attr('data-url'))
/*			$("#selectionAudio")[0].addEventListener('ended', function() {
				$($(".selectAudioImg")[0]).attr("src", "../../i/i20.png")
				$($(".table1")[0]).css('display', 'block')
			}, false);
			$("#selectionAudio")[0].play()*/
			$($(".table1")[0]).css('display', 'block');
		}
		if ($(".listen-question").length) {//判断是否为本题第一道选择题
			var param = {
				"wrap": $(".listen-question"),
				"tmplName": TMPL.t_question_page,
				"tmplData": renderData,
				"afterRender": _afterRender1
			}
			renderTemplate(param)
		} else {
			startTimerListen();
			var _afterRender = function() {
				var param = {
					"wrap": $(".listen-question"),
					"tmplName": TMPL.t_question_page,
					"tmplData": renderData,
					"afterRender": _afterRender1
				};
				renderTemplate(param)
			}
			var param = {
				"tmplName": TMPL.t_question_wrapper_page,
				"tmplData": renderData,
				"afterRender": _afterRender
			}
			renderTemplate(param)
		}
	}
	function showResult() {
		if (currentQuestionIndex == currentQuestion.group_count - 1) { //做到最后一题，出结果页
			endTime = new Date();
			var spend_time = Math.round(durationTime);
			var recordsLength = records.length;
//				if (records[recordsLength - 2].question.id == records[recordsLength - 1].question.id) {
//					debugger
//					records.pop();
//					errIds.pop();
//				}
			$("#nextSelectQuestion").hide();
			submitSelection(spend_time);
		} else {
			currentQuestionIndex = currentQuestionIndex + 1;
			var paramTmp = {
				sequence_number: currentQuestionIndex + 1,
			}
			$("#nextSelectQuestion").attr("disabled","disabled");
			getWord(paramTmp)
		}
		clearTimeout(timeInterval);
	}
		//重做错题
	var errOnlySelection = function() {
			localErr = [];
			currentQuestionIndex = 0;
			$('body,html').animate({scrollTop: 0}, 100);
		    records=shuffle(records);//重做错题乱序
			for (var i = 0; i < records.length; i++) {
				if (records[i].isError) {
					localErr.push(records[i])
				}
			}
			records = [];
			renderSelectionErr()
	}
	//做题并且记录每一题
	function doQuesiton(){
		//记录每一题结果
		var record = {};
		record.question = currentQuestion;
	    record.question.sequence_number_order = currentQuestionIndex+1;
		//给正确选项显示绿色标记
		currentQuestion.correctResponse.map(function(v){
			$('.selectWord[data-choice='+v+']').addClass('listen-right');
		})
		var userSelected = [];//选择的答案
		//给错误选项显示红色标记
		$(".selected").each(function(index,value){
			userSelected.push($(value).data("choice"));
			if(!$(value).hasClass("listen-right")){
				$(value).removeClass("selected").addClass("listen-mistake");
			}
		});
	    var userSelectedStr = userSelected.join("");
	    var correctStr = currentQuestion.correctResponse.join("");
	    //比对拼接后的结果  (如：AB == BC >>>>> false)
		if(userSelectedStr == correctStr){
			record.isError = false;
			$("#user-anwser").addClass("ans-right");
		}else{
			record.isError = true;
			var errObj = {};
			errObj.answer = userSelected.join(",");
			errObj.is_correct=2;
			errObj.question_id=currentQuestion.id;
			errObj.sequence_number=currentQuestion.sequence_number;
			errIds.push(errObj);//错题集合
		    $("#user-anwser").addClass("ans-wrong");
		}
		$("#user-anwser").html(userSelectedStr);
		$("#correct-anwser").html(correctStr);
		records.push(record);
		errAry.push(currentQuestion.id);//做题顺序
	}
	$(document).on("click","#nextSelectErrQuestion",function(){
		doQuesiton();
		timeInterval = setTimeout(function(){
			if(currentQuestionIndex == localErr.length - 1){
				var renderData = {};
				renderData.xm_title=xm_title;
				var errWords = []
				for (var i = 0; i < records.length; i++) {
					if (records[i].isError) {
						errWords.push(records[i])
					}
				}
				renderData.errWords = errWords;				
				renderData.records = records;
				$("#nextSelectErrQuestion").hide();
				var param = {
					"tmplName": TMPL.t_result_page,
					"tmplData": renderData,
					"afterRender":function(){
						$(".family-song").hide();
					}
				}
				renderTemplate(param)
			}else{
				currentQuestionIndex++;
				$("#nextSelectErrQuestion").attr("disabled","disabled");
				renderSelectionErr();
			}
			clearTimeout(timeInterval);
		},1200);
		
	});
	
	//渲染错题页
	var renderSelectionErr = function() {
		currentQuestion = localErr[currentQuestionIndex].question;
			var renderData = {};
			renderData.xm_title = "测试错题页面";
			renderData = localErr[currentQuestionIndex];
		    renderData.question.sequence_number_order = currentQuestionIndex+1;//题序号
		    renderData.question.group_count = localErr.length;
			var _afterRender = function() {
				/*$($(".selectAudioImg")[0]).attr("src", "../../i/i2.gif")
				$("#selectionAudio")[0].pause()
				$("#selectionAudio").attr('src', $($(".selectAudioImg")[0]).attr('data-url'))
				$("#selectionAudio")[0].addEventListener('ended', function() {
					$($(".selectAudioImg")[0]).attr("src", "../../i/i20.png")
					$($(".table1")[0]).css('display', 'block')
				}, false);
				$("#selectionAudio")[0].play()*/
				$($(".table1")[0]).css('display', 'block');
			}
			var param = {
				"tmplName": TMPL.t_err_question_page,
				"tmplData": renderData,
				"afterRender": _afterRender
			};
			renderTemplate(param)
		}
	//提交答案
	var submitSelection = function(param) {
			var spend_time = param;
			var correctCount = currentQuestion.group_count - errIds.length;
			var rate = correctCount + "/" + currentQuestion.group_count;
			var rateValue = Math.round(correctCount/currentQuestion.group_count*100)/100;
			var rateTmp = digitRound(correctCount / currentQuestion.group_count * 100, 2);
			var date=getTime();
			xm_endTime=zeroFn(date.getFullYear())+"-"+zeroFn((date.getMonth()+1))+"-"+zeroFn(date.getDate())+" "+zeroFn(date.getHours())+":"+zeroFn(date.getMinutes())+":"+zeroFn(date.getSeconds());
			date=null;
			$.ajax({
				url: URL.xiaomaURL + "translation/results",
				type: 'post',
				contentType: "application/json",
				data: JSON.stringify({
					"group_id":xm_groupId,//20160910
					"question_numbers":errAry,//做题顺序
					"rate":rateTmp,
					"spend_time": spend_time,
					"wrong_results":errIds,
					"planDayId":xm_planDayId,
					"exerciseId":xm_exerciseId,
					"startTime":xm_startTime,
					"endTime":xm_endTime
				}),
				headers: {
					"Authorization": exerciseApi.xiaomaToken
				},
				success: function(json) {
					json= $.parseJSON(json);
					exerciseApi.updateListItem();
					resultSelection(1, rate,json.group_level)
				}
			});
		}

		//多选结果页
		var resultSelection = function(type,rate,level) {
			var renderData = {};
			renderData.xm_title=xm_title;
			if (type == 1) { //做题来的，直接从records和errids取
				renderData.group_sequence_number = currentGroupSequneceNum;
				renderData.correctCount = rate.split("/")[0];
				renderData.errorCount = rate.split("/")[1] - rate.split("/")[0];
				var errWords = []
				for (var i = 0; i < records.length; i++) {
					if (records[i].isError) {
						errWords.push(records[i])
					}
				}
				//本地计算平均速度公式中
				var spend_time = Math.round(durationTime);
				var avg_speed = spend_time / records.length;
				var avg_string = avg_speed.toString();
				var avg_index = avg_string.indexOf('.');
				var rateTmp = renderData.correctCount / records.length;
				renderData.rate = digitRound(rateTmp * 100, 2);
				avg_speed = digitRound(avg_string, 2).toString() + 'S';
				renderData.group_level=level;
				renderData.avg_speed = avg_speed;
				renderData.errWords = errWords;				
				renderData.records = records;
				renderData.isFromPlan=exerciseApi.isFromPlan;
				var param = {
					"tmplName": TMPL.t_result_page,
					"tmplData": renderData,
					"afterRender": function(){
						startTime = null;
					}
				}
				renderTemplate(param)
			} else if (type == 2) { //直接进结果页
				startTime = null;
				$.ajax({
					url: URL.xiaomaURL + "wyjySelectionGroups/group/"+xm_groupId+"?listen_type=1",
					type: 'get',
					headers: {
						"Authorization": exerciseApi.xiaomaToken
					},
					success: function(json) {
						json= $.parseJSON(json);
						var jsonResult = json.questions;
						var jsonResultTmp=json.results.wrong_results;//错题
						//重构数据
						$.each(jsonResultTmp,function(index,value){
							$.each(json.questions,function(index2,value2){
								var resultQuestion = {};
								resultQuestion.question = {};
								resultQuestion.question.correctResponse = value2.answer.split(",");//存放正确答案数组
								resultQuestion.question.id = value2.id;//此题id
								resultQuestion.question.sequence_number = index2 + 1;//当前题序号
								resultQuestion.question.questionAudioUrl = value2.questionAudioUrl;//单词音频
								resultQuestion.question.questionImgUrl = value2.questionImgUrl;//单词图片
								var simpleChoices = [];
								for (var i = 0; i < value2.options.length; i++) {
									var choiceItemObj = {};
									choiceItemObj.optionHead = value2.options[i].optionSelection;//选项标头ABCD..
									choiceItemObj.optionContent = value2.options[i].optionDescription;//选项内容
									simpleChoices.push(choiceItemObj);
								}
								resultQuestion.question.simpleChoices = simpleChoices;
								resultQuestion.question.group_count = questionsCount;
								resultQuestion.question.sequence_number_order = index2+1;
								if(value.question_id==value2.id){
									resultQuestion.isError = true;
									value2.is_correct=2;
									records.push(resultQuestion);
									return;
								}
							})
						});
						var rate;
						/*题目排序 保证和做题的顺序是一样的20161027*/
						var sortQuestion=[];
						$.each(json.results.question_numbers,function(index,value){
							$.each(json.questions,function(index2,value2){
								if(value==value2.id){
									sortQuestion.push(value2);
								}
							})
						});
						if (json.questions!= 0) {
							rate =json.results.rate;
							renderData.rate=rate;
						} else {
							renderData.rate = rate;
						}
						renderData.group_sequence_number = json.sequence_number;
						renderData.errWords = sortQuestion;
						renderData.avg_speed = json.results.avg_speed+"S";
						renderData.group_level = json.results.point_level;
						renderData.isFromPlan=exerciseApi.isFromPlan;					
						var _afterRender=function(){
							//乱序
							localErr=shuffle(localErr);
						}
						var param = {
							"tmplName": TMPL.t12,
							"tmplData": renderData,
							"afterRender": _afterRender
						}
						renderTemplate(param)
					}
				});
			}
		}
	//计算正确率
	function digitRound(digit, length) {
		length = length ? parseInt(length) : 0;
		if (length <= 0) return Math.round(digit);
		digit = Math.round(digit * Math.pow(10, length)) / Math.pow(10, length);
		return digit;
	};
	function showSelection(groupId,planDayId,exerciseId,xmTitle){
		xm_groupId=groupId;//groupId
		xm_planDayId=planDayId;//提交答案参数
		xm_exerciseId=exerciseId;//提交答案参数
		xm_title=xmTitle;//当前题目标题
		var data = {
			'groupId':groupId
		};
		//选择题
		selectionInitData(data);
	};
	function gotoHisResult(groupId,planDayId,exerciseId,xmTitle,type){
		xm_groupId=groupId;
		xm_planDayId=planDayId;
		xm_exerciseId=exerciseId;
		xm_title=xmTitle;
		xm_sortType=type;
		currentQuestion = {}
		currentQuestionIndex = 0;
		questions = [];
		questionsCount = 0;
		records = [];
		localErr = [];
		resultSelection(2);
	};
	//获取请求头时间
	function getTime(){ 
    	return new Date($.ajax({url: window.xiaoma.basePath+"/gettime",async: false}).getResponseHeader("Date"));
    }

/*	//弹出隐藏层
	var showDiv = function(show_div, bg_div) {
		document.getElementById(show_div).style.display = 'block';
		document.getElementById(bg_div).style.display = 'block';
		var bgdiv = document.getElementById(bg_div);
		bgdiv.style.width = document.body.scrollWidth;
		$("#" + bg_div).height($(document).height());
	};*/
	//关闭弹出层
	var closeDiv = function(show_div, bg_div) {
		document.getElementById(show_div).style.display = 'none';
		document.getElementById(bg_div).style.display = 'none';
	};

	//页面重新加载，用于exercise.json
	var ajaxEdit = function(param) {
		UniqueAjax({
			url: param.url,
			data: param.data,
			contentType: param.contentType || 'appliction/x-www-form-urlencoded',
			type: param.type || 'post',
			dataType: param.dataType || 'json',
			success: param.success
		})
	}

	var renderTemplate = function(param) {
		Render.render({
			wrap: param.wrap || $wrap,
			tmpl: {
				tmplName: param.tmplName,
				tmplData: param.tmplData
			},
			afterRender: param.afterRender
		})
	};

	var isEmpty = function(param) {
		if (null == param || "" == param || tokenTmp == param) {
			return true
		} else {
			return false
		}
	};
	var zeroFn=function(n){
		n=n<10?"0"+n:n;
		return n;
	};
	return {
		init: init,
		showSelection:showSelection,
		gotoHisResult:gotoHisResult
	}
})