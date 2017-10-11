'use strict'

define(['common/uniqueAjax', 'common/render', 'xml2json', 'app/baseURL', 'baseCookie', 'lib/store'], function(uniqueAjax, Render, xml2json, URL, BaseCookie) {
	var _conf,
		$wrap,
		TMPL = {
			t1: 'app/chongci/tmpl_tpoListen_unit', //单元列表页有两个，另一个是加载更多
			t2: 'app/chongci/tmpl_tpoListen_exercise', //单元列表页有两个，另一个是加载更多
			t3: 'app/chongci/tmpl_tpoListen_question',
			t4: 'app/chongci/tmpl_tpo_loading',
			t7: 'app/chongci/tmpl_tpoListen_question_list',
			t8: 'app/chongci/tmpl_tpoListen_result' //结果页有两个，一个直接计算结果页，另一个从单元列表进
		};
	var token,
		tokenTmp = "xiaoma";
	// var startTime, //用于积分时间计算
	// 	endTime,
	var totalTime = 0,
		totalTimeInit = 0;
	var currentTestTimeStrListen, //当前时间字符串，用于下一题同步显示时间
		testTimerIDListen; //计时器ID
	var groups = [],
		questions = [],
		currentQuestionIndex = 0,
		records = [], //is_correct是否正确,question_id,question_sequence_number
		current_group_sequence_number = 0,
		group_sequence_number = 0,
		group_name = "";
	var timeInterval;
	var timeIntervalSubmit;

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
		$(document).on('trigger_side10', '#side10', function() {
			$('#side10').click()
		})
		$(document).on('click', '#side10', function(e) {
			$("#wirte_menu_div li").removeClass('sidebarLight');
			$("#wirte_menu_div1 li").removeClass('sidebarLight');
			$(this).addClass('sidebarLight');
			$(this).parent().siblings().find('a').removeClass('sidebarLight');
			tpoListenUnit()
		});

		$(document).on('click', '.tpoListenUnit', tpoListenUnit);
		$(document).on('click', '.tpoListenDetail', function(e) {
			group_name = $(e.target).attr('data-group_name');
			group_sequence_number = $(e.target).attr('data-group_sequence_number');
			tpoListenDetail(e)
		})
		$(document).on('click', '#tpoListenNextUnit', function(e) {
			group_name = $(e.target).attr('data-next_group_name');
			group_sequence_number = $(e.target).attr('data-next_sequence_number');
			var next_status = $(e.target).attr('data-next_status');
			if (next_status == 0) {
				tpoListenDetail()
			} else if (next_status == 1) {
				tpoListenResult()
			}
		})
		$(document).on('click', '.tpoListenResult', function(e) {
			group_name = $(e.target).attr('data-group_name');
			group_sequence_number = $(e.target).attr('data-group_sequence_number');
			tpoListenResult()
		})

		$(document).on('click', '.singleChoiceListen', function(e) {
			//单选选择状态单选多选控制
			$(e.target).addClass('tpo-choice')
			$(e.target).parent().parent().siblings().find('span.tpo-choice').removeClass('tpo-choice');
			saveChoiceTpoListen()
		});
		$(document).on('click', '.multipleChoiceListen', function(e) {
			var data = {
				'question_type': $(e.target).attr('data-question_type')
			}
			if ($(e.target).hasClass('tpo-choice')) {
				$(e.target).removeClass('tpo-choice')
			} else {
				$(e.target).addClass('tpo-choice')
			}
		});
		$(document).on('click', '.complexChoiceListen', function(e) {
			var data = {
				'question_type': $(e.target).attr('data-question_type')
			}
			if ($(e.target).hasClass('tpo-choice')) {
				$(e.target).removeClass('tpo-choice')
			} else {
				$(e.target).addClass('tpo-choice')
			}
		});
		$(document).on('click', '#tpoListenGoOn', saveChoiceTpoListen);

		//提交查看成绩
		$(document).on('click', '#tpoListenSubmit', tpoListenSubmit);
		$(document).on('click', '#againTpoListen', function(e) {
			currentTestTimeStrListen = null;
			testTimerIDListen = null;
			timeInterval = null;
			totalTime = questions.length * 5;
			totalTimeInit = totalTime;
			currentQuestionIndex = 0,
				records = [];
			$('body,html').animate({
				scrollTop: 0
			}, 100)
			tpoListenDetail(e)
		});
		$(document).on('click', '#timeListen', function() {
			startTimerListen()
			$('#timeModalListen').modal('hide')
		})
		$(document).on('click', '#cancleSubmitListen', function() {
			startTimerListen()
			timeInterval = setTimeout(showResult, 1000);
			$('#submitModal').modal('hide')
		})
		$(document).on('click', '#submitListen', function() {
			$(this).addClass("disabled");
			$('#submitModal').modal('hide')
			tpoListenCommit()
		})
		$(document).on('click', '#closeQuan', function() {
			closeDiv('quanDiv', 'fade')
		})
	}

	var tpoListenUnit = function() {
		BaseCookie.get()
		token = BaseCookie.getToken()
		if (isEmpty(token)) {
			token = tokenTmp
		}
		var _success = function(json) {
			current_group_sequence_number = json.current_group_sequence_number;
			groups = json.tpo_listen_groups; //组信息初始化
			questions = [];
			currentQuestionIndex = 0;
			records = [];
			var renderData = {};
			renderData.groups = groups;
			renderData.current_group_sequence_number = current_group_sequence_number;
			var _afterRender = function() {}
			var param = {
				"tmplName": TMPL.t1,
				"tmplData": renderData,
				"afterRender": _afterRender
			}
			renderTemplate(param)
		}
		$.ajax({
			url: URL.baseURL9 + 'tpo_listen_brush_groups',
			data: {
				tpo_type: 2,
				page: 1,
				new_version: 1
			},
			type: 'get',
			headers: {
				"Authorization": token
			},
			success: _success
		})
	}

	var loadingTpoListenDetail=false;
	var tpoListenDetail = function(e) {
		//过滤重复请求
		if(!loadingTpoListenDetail){
			loadingTpoListenDetail=true;
			//加载题目信息
			getTpoListen(function (){
				getTpoListenQuestion();
				loadingTpoListenDetail=false;
			})
		}else{
			console.log("reClick");
		}

			// startTime = new Date();
	}

	//从单元列表直接进结果页
	var tpoListenResult = function() {
		var _success = function(json) {
			var renderData = {};
			renderData.group_name = group_name;
			renderData.rate = json.rate;
			renderData.spend_time = sToTime(json.spend_time);
			var resultTpos = [];
			//jquery解析map数据
			var result_messages = json.result_messages;
			for (var i = 0; i < result_messages.length; i++) {
				var resultTpo = {};
				resultTpo.tpoKey = result_messages[i].group_name;
				resultTpo.tpoVal = result_messages[i].error_sequence_numbers;
				resultTpos.push(resultTpo)
			}
			renderData.resultTpos = resultTpos;
			renderData.next_group_name = json.next_group_name;
			renderData.next_sequence_number = json.next_sequence_number;
			renderData.next_status = json.next_status;
			var param = {
				"tmplName": TMPL.t8,
				"tmplData": renderData,
				"afterRender": ''
			}
			renderTemplate(param)
		}

		$.ajax({
			url: URL.baseURL9 + 'tpo_listen_brush_results',
			data: {
				group_sequence_number: group_sequence_number
			},
			type: 'get',
			headers: {
				"Authorization": token
			},
			success: _success
		})
	}

	//加载题目信息
	var getTpoListen = function(callback) { //得到questions
		var _success = function(json) {
			questions = json.tpo_listen_questions;
			totalTime = questions.length * 5;
			totalTimeInit = questions.length * 5;
			for (var i = 0; i < questions.length; i++) {
				var record = {};
				record.question_id = questions[i].question_id;
				record.question_sequence_number = questions[i].question_number;
				record.is_correct = false;
				records.push(record)
			};
			if(callback){callback.call();}
		}
		$.ajax({
			url: URL.baseURL9 + 'tpo_listen_brush_questions',
			data: {
				"group_sequence_number": group_sequence_number,
				'from': 1
			},
			type: 'get',
			//async: false,
			headers: {
				"Authorization": token
			},
			success: _success
		})
	}
	var showResult = function() {
			if (currentQuestionIndex == questions.length - 1) { //做到最后一题，出结果页
				tpoListenSubmit()
			} else {
				currentQuestionIndex = currentQuestionIndex + 1;
				getTpoListenQuestion()
			}
			clearTimeout(timeInterval)
			clearTimerListen()
		}
		//保存做题记录
	var saveChoiceTpoListen = function() {
		var currentQuestion = questions[currentQuestionIndex];
		//记录该题记录
		if (currentQuestion.question_type == 1) {
			var answer = "";
			answer = $($("#singMul").find('span.tpo-choice')[0]).html();
			$($('.table1')[0]).css('display', 'none')
			$($('.table1')[1]).css('display', 'block')
			$($(".tpo-choice-round[data-option=" + currentQuestion.answer + "]")).addClass('listen-right')
			if (answer == currentQuestion.answer) {
				records[currentQuestionIndex].is_correct = true;
			} else {
				$($(".tpo-choice-round[data-option=" + answer + "]")).addClass('listen-mistake')
			}
		} else if (currentQuestion.question_type == 2) {
			var answer = "";
			var answers = $("#singMul").find('span.tpo-choice');
			$($('.table1')[0]).css('display', 'none')
			$($('.table1')[1]).css('display', 'block')
			for (var i = 0; i < answers.length; i++) {
				if (i == 0) {
					answer = $(answers[0]).html();
				} else {
					answer = answer + "," + $(answers[i]).html();
				}
				$($(".tpo-choice-round[data-option=" + $(answers[i]).html() + "]")).addClass('listen-mistake')
			}
			var currentAnswers = currentQuestion.answer.split(',')
			for (var j = 0; j < currentAnswers.length; j++) {
				$($(".tpo-choice-round[data-option=" + currentAnswers[j] + "]")).removeClass('listen-mistake')
				$($(".tpo-choice-round[data-option=" + currentAnswers[j] + "]")).addClass('listen-right')
			}
			if (answer == currentQuestion.answer) {
				records[currentQuestionIndex].is_correct = true;
			}
		}
		timeInterval = setTimeout(showResult, 1000);
	}

	//保存做题记录
	var saveChoiceTpoListenSubmit = function() {
		var currentQuestion = questions[currentQuestionIndex];
		//记录该题记录
		if (currentQuestion.question_type == 1) {
			var answer = "";
			answer = $($("#singMul").find('span.tpo-choice')[0]).html();
			$($('.table1')[0]).css('display', 'none')
			$($('.table1')[1]).css('display', 'block')
			$($(".tpo-choice-round[data-option=" + currentQuestion.answer + "]")).addClass('listen-right')
			if (answer == currentQuestion.answer) {
				records[currentQuestionIndex].is_correct = true;
			} else {
				$($(".tpo-choice-round[data-option=" + answer + "]")).addClass('listen-mistake')
			}
		} else if (currentQuestion.question_type == 2) {
			var answer = "";
			var answers = $("#singMul").find('span.tpo-choice');
			$($('.table1')[0]).css('display', 'none')
			$($('.table1')[1]).css('display', 'block')
			for (var i = 0; i < answers.length; i++) {
				if (i == 0) {
					answer = $(answers[0]).html();
				} else {
					answer = answer + "," + $(answers[i]).html();
				}
				$($(".tpo-choice-round[data-option=" + $(answers[i]).html() + "]")).addClass('listen-mistake')
			}
			var currentAnswers = currentQuestion.answer.split(',')
			for (var j = 0; j < currentAnswers.length; j++) {
				$($(".tpo-choice-round[data-option=" + currentAnswers[j] + "]")).removeClass('listen-mistake')
				$($(".tpo-choice-round[data-option=" + currentAnswers[j] + "]")).addClass('listen-right')
			}
			if (answer == currentQuestion.answer) {
				records[currentQuestionIndex].is_correct = true;
			}
		}
	}

	var getTpoListenQuestion = function() {
		var renderData = {};
		//加载第一题
		renderData.question = questions[currentQuestionIndex];
		renderData.questionsLength = questions.length;
		renderData.group_name = group_name;
		renderData.currentTestTimeStrListen = sToTime(totalTime);

		var _afterRender = function() {
			var _afterRender1 = function() {
				$(".questionBrContent").html(questions[currentQuestionIndex].question_content.replace(/\n/gi, "<br/>"))
				startTimerListen()
			}
			startTimerListen()
			var param2 = {
				"wrap": $('#tpoListenQuestion'),
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

	var tpoListenCommit = function() {
		clearTimerListen()
			// endTime = new Date();
		var contentLoad = '<img src="../../i/loading.gif" style="width: 50px; height: 50px; margin-left: 20px;">';
		$("#tpoListenQuestion").html(contentLoad)
			// var spend_time = Math.round((endTime.getTime() - startTime.getTime()) / 1000);
		var spend_time = totalTimeInit - totalTime;
		var correctCount = 0;
		var question_results = [];
		for (var i = 0; i < records.length; i++) {

			if (records[i].is_correct) {
				correctCount = correctCount + 1;
			} else {
				var question_result = {};
				question_result.question_id = records[i].question_id;
				question_result.question_sequence_number = records[i].question_sequence_number;
				question_results.push(question_result)
			}
		}
		var digitRound = function(digit, length) {
			length = length ? parseInt(length) : 0;
			if (length <= 0) return Math.round(digit);
			digit = Math.round(digit * Math.pow(10, length)) / Math.pow(10, length);
			return digit;
		};
		var rateTmp = correctCount / records.length;
		var rate = digitRound(rateTmp * 100, 2);
		var _success = function(json) {
			var renderData = {};
			renderData.group_name = group_name;
			renderData.rate = json.rate;
			renderData.spend_time = sToTime(json.spend_time);
			var resultTpos = [];
			//jquery解析map数据
			var result_messages = json.result_messages;
			for (var i = 0; i < result_messages.length; i++) {
				var resultTpo = {};
				resultTpo.tpoKey = result_messages[i].group_name;
				resultTpo.tpoVal = result_messages[i].error_sequence_numbers;
				resultTpos.push(resultTpo)
			}
			renderData.resultTpos = resultTpos;
			renderData.isBest = 1;
			renderData.next_group_name = json.next_group_name;
			renderData.next_sequence_number = json.next_sequence_number;
			renderData.next_status = json.next_status;
			var _afterRender = function() {
				if (json.is_reward_coupon) {
					// showDiv('quanDiv', 'fade')
				}
			}
			var param = {
				"tmplName": TMPL.t8,
				"tmplData": renderData,
				"afterRender": _afterRender
			}
			renderTemplate(param)
		}
		$.ajax({
			url: URL.baseURL9 + 'tpo_listen_brush_results',
			data: JSON.stringify({
				"group_sequence_number": group_sequence_number,
				"rate": rate,
				"spend_time": spend_time,
				"question_results": question_results,
				"new_version": 1
			}),
			type: 'Post',
			contentType: "application/json",
			headers: {
				"Authorization": token
			},
			success: _success
		})
	}

	var tpoListenSubmit = function() {
		if ($($('.table1')[1]).css('display') != 'block') {
			saveChoiceTpoListenSubmit()
			var showResultSubmit = function() {
				var callback_submit = function() {
						if (totalTime > 0 && currentQuestionIndex != questions.length - 1) {
							clearTimeout(timeIntervalSubmit)
							clearTimerListen()
							clearTimeout(timeInterval)
							$('#submitModal').modal({
								backdrop: 'static'
							})
						} else {
							tpoListenCommit()
						}

					}
					//用户为空时弹出登陆框
				if (isEmpty(token)) {
					clearTimerListen()
					$('#dialogLogin').modal({
						backdrop: 'static'
					})
					$('#dialogLogin').bind('hidden.bs.modal', function(e) {
						// debugger
						BaseCookie.get()
						if (!isEmpty(BaseCookie.getToken())) {
							token = BaseCookie.getToken()
							$('body,html').animate({
								scrollTop: 0
							}, 100)
							callback_submit()
						} else {
							if (currentQuestionIndex != questions.length - 1 && totalTime != 0) {
								startTimerListen()
								timeInterval = setTimeout(showResult, 1000);
							}
						}
					})
				} else {
					$('body,html').animate({
						scrollTop: 0
					}, 100)
					callback_submit()
				}
			}
			timeIntervalSubmit = setTimeout(showResultSubmit, 1000);
		} else {
			var callback_submit = function() {
					if (totalTime > 0 && currentQuestionIndex != questions.length - 1) {
						clearTimerListen()
						clearTimeout(timeInterval)
						$('#submitModal').modal({
							backdrop: 'static'
						})
					} else {
						tpoListenCommit()
					}

				}
				//用户为空时弹出登陆框
			if (isEmpty(token)) {
				clearTimerListen()
				clearTimeout(timeInterval)
				$('#dialogLogin').modal({
					backdrop: 'static'
				})
				$('#dialogLogin').bind('hidden.bs.modal', function(e) {
					// debugger
					BaseCookie.get()
					if (!isEmpty(BaseCookie.getToken())) {
						token = BaseCookie.getToken()
						$('body,html').animate({
							scrollTop: 0
						}, 100)
						callback_submit()
					} else {
						if (currentQuestionIndex != questions.length - 1 && totalTime != 0) {
							startTimerListen()
							timeInterval = setTimeout(showResult, 1000);
						}
					}
				})
			} else {
				$('body,html').animate({
					scrollTop: 0
				}, 100)
				callback_submit()
			}
		}

		// if (currentQuestionIndex == questions.length - 1) {
		// 	//显示正确答案
		// 	saveChoiceTpoListenSubmit()
		// 	var showResultSubmit = function() {
		// 		var callback_submit = function() {
		// 				if (totalTime > 0 && currentQuestionIndex != questions.length - 1) {
		// 					clearTimeout(timeIntervalSubmit)
		// 					clearTimerListen()
		// 					clearTimeout(timeInterval)
		// 					$('#submitModal').modal({
		// 						backdrop: 'static'
		// 					})
		// 				} else {
		// 					tpoListenCommit()
		// 				}

		// 			}
		// 			//用户为空时弹出登陆框
		// 		if (isEmpty(token)) {
		// 			clearTimerListen()
		// 			$('#dialogLogin').modal({
		// 				backdrop: 'static'
		// 			})
		// 			$('#dialogLogin').bind('hidden.bs.modal', function(e) {
		// 				// debugger
		// 				BaseCookie.get()
		// 				if (!isEmpty(BaseCookie.getToken())) {
		// 					token = BaseCookie.getToken()
		// 					$('body,html').animate({
		// 						scrollTop: 0
		// 					}, 100)
		// 					callback_submit()
		// 				}
		// 			})
		// 		} else {
		// 			$('body,html').animate({
		// 				scrollTop: 0
		// 			}, 100)
		// 			callback_submit()
		// 		}
		// 	}
		// 	timeIntervalSubmit = setTimeout(showResultSubmit, 1000);
		// } else {
		// 	var callback_submit = function() {
		// 			if (totalTime > 0 && currentQuestionIndex != questions.length - 1) {
		// 				clearTimerListen()
		// 				clearTimeout(timeInterval)
		// 				$('#submitModal').modal({
		// 					backdrop: 'static'
		// 				})
		// 			} else {
		// 				tpoListenCommit()
		// 			}

		// 		}
		// 		//用户为空时弹出登陆框
		// 	if (isEmpty(token)) {
		// 		clearTimerListen()
		// 		$('#dialogLogin').modal({
		// 			backdrop: 'static'
		// 		})
		// 		$('#dialogLogin').bind('hidden.bs.modal', function(e) {
		// 			// debugger
		// 			BaseCookie.get()
		// 			if (!isEmpty(BaseCookie.getToken())) {
		// 				token = BaseCookie.getToken()
		// 				$('body,html').animate({
		// 					scrollTop: 0
		// 				}, 100)
		// 				callback_submit()
		// 			}
		// 		})
		// 	} else {
		// 		$('body,html').animate({
		// 			scrollTop: 0
		// 		}, 100)
		// 		callback_submit()
		// 	}
		// }
		// endTime = new Date();
	}

	var sToTime = function(longTime) {
		//转化为 日+小时+分+秒
		var time = parseFloat(longTime);
		if (time == 0 || (time != null && time != "")) {
			if (time < 60) {
				var s = time;
				if (s < 10) {
					time = '00:00:0' + s;
				} else {
					time = '00:00:' + s;
				}
			} else if (time >= 60 && time < 3600) {
				var m = parseInt(time / 60);
				var s = parseInt(time % 60);
				var stime = '';
				var mtime = '';
				if (s < 10) {
					stime = '0' + s;
				} else {
					stime = s;
				}
				if (m < 10) {
					mtime = '0' + m;
				} else {
					mtime = m;
				}
				time = "00:" + mtime + ":" + stime;
			} else if (time >= 3600) {
				var h = parseInt(time / 3600);
				var m = parseInt(time % 3600 / 60);
				var s = parseInt(time % 3600 % 60 % 60);
				var stime = '';
				var mtime = '';
				var htime = '';
				if (s < 10) {
					stime = '0' + s;
				} else {
					stime = s;
				}
				if (m < 10) {
					mtime = '0' + m;
				} else {
					mtime = m;
				}
				if (h < 10) {
					htime = '0' + h;
				} else {
					htime = h;
				}
				time = htime + ":" + mtime + ":" + stime;
			}
		}
		return time;
	}

	var startTimerListen = function() {
		var fn = function() {
			if (totalTime) {
				totalTime = totalTime - 1;
				currentTestTimeStrListen = sToTime(totalTime);
			}
			if ($("#testTimer").length <= 0) {
				console.log("not find target");
				clearTimerListen();
			} else {
				$("#testTimer").html(currentTestTimeStrListen)
			}
			if (totalTime == 60) {
				clearTimerListen()
				$('#timeModalListen').modal({
					backdrop: 'static'
				})
				return false;
			}
			if (totalTime == 0) {
				window.clearInterval(testTimerIDListen);
				tpoListenSubmit()
			}
		}
		return (function start() {
			if (testTimerIDListen) return;
			testTimerIDListen = window.setInterval(fn, 1000);
		})();
	}

	var clearTimerListen = function() {
		window.clearInterval(testTimerIDListen);
		testTimerIDListen = undefined;
	}

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

	return {
		init: init
	}
})