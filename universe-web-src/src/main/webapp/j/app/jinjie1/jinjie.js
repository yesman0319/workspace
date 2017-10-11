'use strict'

define(['common/uniqueAjax', 'common/render', 'xml2json', 'app/baseURL', 'baseCookie', 'lib/store'], function(uniqueAjax, Render, xml2json, URL, BaseCookie) {
	var _conf,
		$wrap,
		TMPL = {
			t1: 'app/jinjie/tmpl_jinJie_unit', //单元列表页有两个，另一个是加载更多
			t2: 'app/jinjie/tmpl_jinJie_exercise',
			t3: 'app/jinjie/tmpl_jinJie_question',
			t4: 'app/jinjie/tmpl_jinJie_result', //结果页有两个，一个直接计算结果页，另一个从单元列表进
			t5: 'app/jinjie/tmpl_jinJie_unit_more', //单元列表加载更多
			// t6: 'app/jinjie/tmpl_jinJie_question_jiexi',
			t7: 'app/jinjie/tmpl_jinJie_question_list',
			t8: 'app/jinjie/tmpl_jinJie_unitResult', //结果页有两个，一个直接计算结果页，另一个从单元列表进
			t9: 'app/jinjie/tmpl_jinJie_questionErr',
			t10: 'app/jinjie/tmpl_jinJie_question_listErr',
			t11: 'app/jinjie/tmpl_jinJie_resultErr'

		};
	var token,
		tokenTmp = "xiaoma";
	var groups = [],
		artical = {},
		questions = [],
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
		$(document).on('trigger_side1', '#side1', function() {
			$("#side1").click()
		});
		// $(document).on('click', '#side1', toDoRender);
		$(document).on('click', '#side1', jinJieUnit);
		// $(document).on('click', '#side2', toDoRender);
		//$(document).on('click', '#side3', menuToggleListen);
		//$(document).on('click', '#side4', speak_jjForecast);
		//$(document).on('click', '#side5', speak_papersExams);
		$(document).on('click', '#side6', toDoRender);

		$(document).on('click', '.side', function() {
			$(this).addClass('sidebarLight');
			$(this).parent().siblings().find('a').removeClass('sidebarLight');
		});

		$(document).on('click', '.jinJieUnit', jinJieUnit);
		var tempClickStatus = 0;
		$(document).on('click', '.jinJieUnitDetail', function(e) {
			var qid = $(e.target).attr('data-question_id');
			if (tempClickStatus == qid) {
				return;
			}
			tempClickStatus = qid;
			$(e.target).attr('disabled', true)
			var data = {
				'question_id': $(e.target).attr('data-question_id')
					// ,
					// 'tpoNum': $(e.target).attr('data-tpoNum')
			};
			//初始化当前的tpoNum
			tpoNum = $(e.target).attr('data-tpoNum');
			if (!loadingTpoReadDetail) {
				loadingTpoReadDetail = true;
				jinJieUnitDetail(data, function() {
					tempClickStatus = 0;
					loadingTpoReadDetail = false;
				})
			} else {
				console.log("reClick");
			}
		})
		$(document).on('click', '.jinJieResult', function(e) {
			var data = {
				'question_id': $(e.target).attr('data-question_id'),
				'question_sequence_number': $(e.target).attr('data-question_sequence_number'), //passage
				'tpoNum': $(e.target).attr('data-tpoNum'),
				'rate': $(e.target).attr('data-rates')
			}
			jinJieResult(data)
		})
		$(document).on('click', '#nextQuestion', nextQuestion);
		$(document).on('click', '#preQuestion', preQuestion);
		$(document).on('click', '#nextQuestionErr', nextQuestionErr);
		$(document).on('click', '#preQuestionErr', preQuestionErr);
		$(document).on('mouseout', '.tpoPart2', function(e) {
			e = window.event || e; // 兼容IE7
			var obj = $(e.srcElement || e.target);
			if ($(obj).is("#questionsTab,#questionsTab *,#questionsTabToggle, #questionsTabToggle *")) {
				// alert('内部区域'); 
				$("#questionsTab").css('display', 'block')
					// .repeat-num:hover{background: #519bfe;color: #fff;}
					// .repeat-num:hover .caret2{color: #fff!important;border-bottom: 7px solid!important;border-top: 0px solid!important;}
				$('#questionsTabToggle').addClass('tabHover')
				$('#questionsTabToggle .caret2').addClass('tabHover1')
					// $(".repeat-num").css('background', '#519bfe').css('color', '#fff')
			} else {
				$("#questionsTab").css('display', 'none')
				$('#questionsTabToggle').removeClass('tabHover')
				$('#questionsTabToggle .caret2').removeClass('tabHover1')
					// $(".repeat-num").css('background', '#eeeeee').css('color', '#333')
			}
		});
		$(document).on('mouseover', '#questionsTabToggle', questionsTabShow);
		$(document).on('mouseover', '#questionsTab', questionsTabShow);
		// $(document).on('mouseout', '#questionsTabToggle', questionsTabHid);
		// $(document).on('click', '#questionsTabToggle', questionsTabToggle);
		// $(document).on('click', '#translate', translateToggle);
		// $(document).on('click', '#videos', videosToggle);
		// $(document).on('click', '#jiexi', jiexiToggle);
		$(document).on('click', '#jinJieMore', jinJieMore);

		$(document).on('click', '.singleChoice', function(e) {
			//单选选择状态单选多选控制
			$(e.target).addClass('tpo-choice')
			$(e.target).parent().parent().siblings().find('span.tpo-choice').removeClass('tpo-choice');
		});
		$(document).on('click', '.singleChoiceInsert', function(e) {
			//插入选择状态单选多选控制
			$('.questionBrContent').find('span.tpo-choice').removeClass('tpo-choice');
			$(e.target).addClass('tpo-choice')
		});
		$(document).on('click', '.multipleChoice', function(e) {
			if ($(e.target).hasClass('tpo-choice')) {
				$(e.target).removeClass('tpo-choice')
			} else {
				$(e.target).addClass('tpo-choice')
			}
		});
		$(document).on('click', '.complexChoice1', function(e) {
			var ans = $(e.target).attr('data-answer')
			var g1Tmp = "";
			var g1Val = $('#g1AnswerDiv').html();
			if ($(e.target).hasClass('tpo-choice')) {
				$(e.target).removeClass('tpo-choice')
				g1Tmp = g1Val.substring(0, g1Val.indexOf(ans)) + g1Val.substring(g1Val.indexOf(ans) + 1);
				$('#g1AnswerDiv').html(g1Tmp)
			} else {
				$(e.target).addClass('tpo-choice')
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
		$(document).on('click', '.complexChoice2', function(e) {
			var ans = $(e.target).attr('data-answer')
			var g2Tmp = "";
			var g2Val = $('#g2AnswerDiv').html();
			if ($(e.target).hasClass('tpo-choice')) {
				$(e.target).removeClass('tpo-choice')
				$(e.target).removeClass('tpo-choice')
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
		$(document).on('click', '.questionPage', function(e) {
			var data = {
				'pageNum': $(e.target).attr('data-pageNum')
			};
			questionPage(data)
		});
		$(document).on('click', '.questionPageErr', function(e) {
			var data = {
				'pageNum': $(e.target).attr('data-pageNum'),
				'localIndex': $(e.target).attr('data-localIndex')
			};
			questionPageErr(data)
		});
		//题号面板,题号前面的面板
		$(document).on('click', '.questionPageTab', function(e) {
			//保存做题记录
			saveChoice()
			var data = {
				'pageNum': $(e.target).attr('data-pageNum')
			};
			questionPage(data)
		});
		$(document).on('click', '.questionPageTabErr', function(e) {
			//保存做题记录
			saveChoiceErr()
			var data = {
				'pageNum': $(e.target).attr('data-pageNum'),
				'localIndex': $(e.target).attr('data-localIndex')
			};
			questionPageErr(data)
		});
		//提交查看成绩
		$(document).on('click', '#tpoReadSubmit', tpoReadSubmit);
		$(document).on('click', '#tpoReadSubmitErr', tpoReadSubmitErr);
		$(document).on('click', '#againJinJie', function(e) {
			var data = {
				'question_id': $(e.target).attr('data-question_id')
			}
			againJinJie(data)
		});
		//重做错题
		$(document).on('click', '#errOnlyJinJie', function(e) {
			$(this).attr('disabled', true);
			var data = {
				'pickArtical': $(e.target).attr('data-pickArtical'),
				'question_id': $(e.target).attr('data-question_id')
			}
			errOnlyJinJie(data)
		});
		$(document).on('click', '#errOnlyJinJieErr', function(e) {
			$(this).attr('disabled', true);
			localTmpToErr()
			var data = {
				'pickArtical': $(e.target).attr('data-pickArtical'),
				'question_id': $(e.target).attr('data-question_id')
			}
			errOnlyJinJieErr(data)
		});
		$(document).on('click', '#nextUnitRead', function(e) {
			$(this).addClass("disabled");
			tpoNum = $(e.target).attr('data-next_group_name');
			nextUnitRead()
		});
		//视频播放控制器
		$(document).on('click', '#seeJiangjie', function(e) {
			showAudioPlayModal(0)
		});
		$(document).on('click', '.jiexiAudio', function(e) {
			$('.N_viedo_tab').find('a.N_V_active').removeClass('N_V_active')
			$(e.target).addClass('N_V_active')
			audioPlay($(e.target).attr('data-index'))
		});
		$(document).on('click', '#seeFanyi', function(e) {
			$('.fanyi').toggle()
			if ($('.fanyi').css('display') == 'none') {
				$('#seeFanyi').html('查看翻译')
			} else {
				$('#seeFanyi').html('隐藏翻译')
			}
		})
		$(document).on('click', '#seeJieXiRead', function(e) {
			$('#tpoReadJieXi').toggle()
			jiexiReadFun()
		})
		$(document).on('click', '#seeJieXiReadErr', function(e) {
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
			jinJieResult(data)
		} else { //进入第一题
			var param = {
				'question_id': next_question_id //不为空是，是从单元列表进来，需再取一次question_id
			};
			jinJieUnitDetail(param)
		}
	}


	var jinJieUnit = function() {
		BaseCookie.get()
		token = BaseCookie.getToken()
		if (isEmpty(token)) {
			token = tokenTmp
		}
		var _success = function(json) {
			groups = json.tpo_group; //组信息初始化
			artical = {};
			questions = [];
			currentQuestionIndex = 0;
			records = [];
			tpoNum = "";
			page = 1; //加载第几页初始化
			playCount = 0;
			// vip_user = false;
			var _afterRender = function() {
				//加载更多显示否
				if (!json.is_last_page) {
					$("#jinJieMore").css("display", "block")
				} else {
					$("#jinJieMore").css("display", "none")
				}
			}
			var param = {
				"tmplName": TMPL.t1,
				"tmplData": groups,
				"afterRender": _afterRender
			}
			renderTemplate(param)
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
	}

	var jinJieUnitDetail = function(param, callback) {
		localIndex = 0;
		$("#jinJieMore").css("display", "none")
		var _success = function(json) {
			//加载文章和题目信息, vip_user
			getJinJie(json)

			//题号面板
			var questionsNum = [];
			var renderData = {};
			renderData.artical = artical;
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
			renderData.vip_user = vip_user;

			var _afterRender = function() {
				var _afterRender1 = function() {
					$("#preQuestion").css('display', 'none')
					$(".questionBrContent").html(renderData.question.prompt.replace(/\n/gi, "<br/>"))
					if (callback) {
						callback.call();
					}
				}
				var param2 = {
					"wrap": $('#tpoReadPart2'),
					"tmplName": TMPL.t3,
					"tmplData": renderData,
					"afterRender": _afterRender1
				}
				renderTemplate(param2)

				// var param3 = {
				// 	"wrap": $('.tpo-right-part3'),
				// 	"tmplName": TMPL.t6,
				// 	"tmplData": renderData,
				// 	"afterRender": ''
				// }
				// renderTemplate(param3)
			}

			var param1 = {
				"tmplName": TMPL.t2,
				"tmplData": renderData,
				"afterRender": _afterRender
			}
			renderTemplate(param1)
		}
		$.ajax({
			url: URL.baseURL9 + 'tpo_questions/web',
			data: {
				question_id: param.question_id
			},
			type: 'get',
			headers: {
				"Authorization": token
			},
			success: _success
		})
	}

	//从单元列表直接进结果页
	var jinJieResult = function(param) {
		localIndex = 0;
		$("#jinJieMore").css("display", "none")
		tpoNum = param.tpoNum;
		var rate = param.rate;
		var correctCount = rate.split('/')[0];
		var totalCount = rate.split('/')[1];
		var errorCount = totalCount - correctCount;
		var renderData = {};
		renderData.tpoNum = tpoNum;
		renderData.sequence_number = param.question_sequence_number;
		var rateTmp = (parseInt(correctCount) / parseInt(totalCount)).toString()
		renderData.rate = parseInt(rateTmp.substring(0, rateTmp.indexOf('.') + 3) * 100);
		renderData.correctCount = correctCount;
		renderData.errorCount = errorCount;
		renderData.question_id = param.question_id;
		var _success = function(json) {
			next_question_id = json.next_question_id;
			next_group_name = json.next_group_name;
			next_type_name = json.next_type_name;
			next_rate = json.next_rate;
			is_last_question = json.is_last_question;
			renderData.question_results = json.tpo_results;
			//下一单元
			renderData.next_question_id = next_question_id;
			renderData.next_group_name = next_group_name;
			renderData.next_type_name = next_type_name;
			renderData.next_rate = next_rate;
			renderData.is_last_question = is_last_question;
			var param = {
				"tmplName": TMPL.t8,
				"tmplData": renderData,
				"afterRender": ''
			}
			renderTemplate(param)
		}

		$.ajax({
			url: URL.baseURL9 + 'tpo_results/results',
			data: {
				question_id: param.question_id
			},
			type: 'get',
			headers: {
				"Authorization": token
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
			}
			renderTemplate(param2)
				// $('.tpo-right-part3').css('display', 'none')
		} else {
			// $('.tpo-right-part3').css('display', 'block')
			var renderData = {};
			renderData.artical = artical;
			renderData.question = questions[currentQuestionIndex];
			renderData.questionsNum = questionsNum;
			renderData.questionsLength = questionsNum.length;
			renderData.currentQuestionIndex = currentQuestionIndex;
			renderData.vip_user = vip_user;

			var _afterRender = function() {
				$("#preQuestion").css('display', 'block');
				var prompt=renderData.question.prompt;
				if(renderData.question.questionType=='insert'){
					prompt=prompt.replace('$$','<label style="color:#509bfd;">');
					prompt=prompt.replace('$$','</label>');
				}
				$(".questionBrContent").html(prompt.replace(/\n/gi, "<br/>"))
				showChoice()
			}

			var param1 = {
				"wrap": $('#tpoReadPart2'),
				"tmplName": TMPL.t3,
				"tmplData": renderData,
				"afterRender": _afterRender
			}
			renderTemplate(param1)

			// var param2 = {
			// 	"wrap": $('.tpo-right-part3'),
			// 	"tmplName": TMPL.t6,
			// 	"tmplData": renderData,
			// 	"afterRender": ''
			// }
			// renderTemplate(param2)
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
				// $('.tpo-right-part3').css('display', 'none')
		} else {
			// $('.tpo-right-part3').css('display', 'block')
			var currentErrIndex = localErr[localIndex].section_number;
			var renderData = {};
			renderData.artical = artical;
			renderData.question = questions[currentErrIndex];
			renderData.questionsNum = questionsNum;
			renderData.questionsLength = questions.length;
			renderData.currentQuestionIndex = currentErrIndex;
			renderData.vip_user = vip_user;

			var _afterRender = function() {
				$("#preQuestionErr").css('display', 'block')
				$(".questionBrContent").html(renderData.question.prompt.replace(/\n/gi, "<br/>"))
				showChoiceErr()
			}

			var param1 = {
				"wrap": $('#tpoReadPart2'),
				"tmplName": TMPL.t9,
				"tmplData": renderData,
				"afterRender": _afterRender
			}
			renderTemplate(param1)

			// var param2 = {
			// 	"wrap": $('.tpo-right-part3'),
			// 	"tmplName": TMPL.t6,
			// 	"tmplData": renderData,
			// 	"afterRender": ''
			// }
			// renderTemplate(param2)
		}
	}

	var preQuestion = function() {
		//做题信息面板页倒回无需记录
		if (currentQuestionIndex != questions.length) {
			// $('.tpo-right-part3').css('display', 'block')
			//保存做题记录
			saveChoice()
		}
		//渲染上一题
		var questionsNum = []; //题号数组面板
		var renderData = {};
		renderData.artical = artical;
		currentQuestionIndex = currentQuestionIndex - 1;
		//做题信息面板页倒回无需记录
		if (currentQuestionIndex != questions.length) {
			// $('.tpo-right-part3').css('display', 'block')
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
			if (currentQuestionIndex == 0) {
				$("#preQuestion").css('display', 'none')
			} else {
				$("#preQuestion").css('display', 'block')
			}
			var prompt=renderData.question.prompt;
			if(renderData.question.questionType=='insert'){
				prompt=prompt.replace('$$','<label style="color:#509bfd;">');
				prompt=prompt.replace('$$','</label>');
			}
			$(".questionBrContent").html(prompt.replace(/\n/gi, "<br/>"))
			showChoice()
		}

		var param1 = {
			"wrap": $('#tpoReadPart2'),
			"tmplName": TMPL.t3,
			"tmplData": renderData,
			"afterRender": _afterRender
		}
		renderTemplate(param1)

		// var param2 = {
		// 	"wrap": $('.tpo-right-part3'),
		// 	"tmplName": TMPL.t6,
		// 	"tmplData": renderData,
		// 	"afterRender": ''
		// }
		// renderTemplate(param2)
	}

	var preQuestionErr = function() {
		//做题信息面板页倒回无需记录
		if (localIndex != localErr.length) {
			// $('.tpo-right-part3').css('display', 'block')
			//保存做题记录
			saveChoiceErr()
		}
		localIndex = localIndex - 1;
		//渲染上一题
		var questionsNum = []; //题号数组面板
		var renderData = {};
		renderData.artical = artical;
		var currentErrIndex = localErr[localIndex].section_number;
		renderData.question = questions[currentErrIndex];
		for (var i = 0; i < localErr.length; i++) {
			questionsNum.push(localErr[i].section_number + 1)
		}
		renderData.questionsNum = questionsNum;
		renderData.questionsLength = questions.length;
		renderData.currentQuestionIndex = currentErrIndex;
		renderData.vip_user = vip_user;

		var _afterRender = function() {
			if (currentErrIndex == localErr[0].section_number) {
				$("#preQuestionErr").css('display', 'none')
			} else {
				$("#preQuestionErr").css('display', 'block')
			}
			$(".questionBrContent").html(renderData.question.prompt.replace(/\n/gi, "<br/>"))
			showChoiceErr()
		}

		var param1 = {
			"wrap": $('#tpoReadPart2'),
			"tmplName": TMPL.t9,
			"tmplData": renderData,
			"afterRender": _afterRender
		}
		renderTemplate(param1)

		// var param2 = {
		// 	"wrap": $('.tpo-right-part3'),
		// 	"tmplName": TMPL.t6,
		// 	"tmplData": renderData,
		// 	"afterRender": ''
		// }
		// renderTemplate(param2)
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

	// var translateToggle = function() {
	// 	if ($("#jiexiTip").css('display') != "none") {
	// 		if (questions[currentQuestionIndex].questionType != 'complex') {
	// 			$(".showEnable").css('display', 'block')
	// 		} else {
	// 			$(".showEnable").css('display', 'inline-block')
	// 		}
	// 		$(".showDisable").css('display', 'none')
	// 	}
	// 	if ($("#translateTip").css('display') != "none") {
	// 		$("#translateTip").css('display', 'none')
	// 	} else {
	// 		$("#translateTip").css('display', 'block')
	// 		$("#videosTip").css('display', 'none')
	// 		$("#jiexiTip").css('display', 'none')
	// 	}
	// }

	// var videosToggle = function() {
	// 	if ($("#jiexiTip").css('display') != "none") {
	// 		$("#jiexiTip").css('display', 'none')
	// 		if (questions[currentQuestionIndex].questionType != 'complex') {
	// 			$(".showEnable").css('display', 'block')
	// 		} else {
	// 			$(".showEnable").css('display', 'inline-block')
	// 		}
	// 		$(".showDisable").css('display', 'none')
	// 	}
	// 	if ($("#videosTip").css('display') != "none") {
	// 		$("#videosTip").css('display', 'none')
	// 	} else {
	// 		$("#translateTip").css('display', 'none')
	// 		$("#videosTip").css('display', 'block')
	// 		$("#jiexiTip").css('display', 'none')
	// 	}
	// }

	// var jiexiToggle = function() {
	// 	if ($("#jiexiTip").css('display') != "none") {
	// 		$("#jiexiTip").css('display', 'none')
	// 		if (questions[currentQuestionIndex].questionType != 'complex') {
	// 			$(".showEnable").css('display', 'block')
	// 		} else {
	// 			$(".showEnable").css('display', 'inline-block')
	// 		}

	// 		$(".showDisable").css('display', 'none')
	// 	} else {
	// 		$("#translateTip").css('display', 'none')
	// 		$("#videosTip").css('display', 'none')
	// 		$("#jiexiTip").css('display', 'block')
	// 		$(".showEnable").css('display', 'none')
	// 		if (questions[currentQuestionIndex].questionType != 'complex') {
	// 			$(".showDisable").css('display', 'block')
	// 		} else {
	// 			$(".showDisable").css('display', 'inline-block')
	// 		}
	// 	}
	// }

	var jinJieMore = function() {
			page = page + 1;
			var _success = function(json) {
				groups = groups.concat(json.tpo_group);
				var param = {
					"wrap": $("#right-part1"),
					"isAppend": true,
					"tmplName": TMPL.t5,
					"tmplData": json.tpo_group,
					"afterRender": ''
				}
				renderTemplate(param)
				if (!json.is_last_page) {
					$("#jinJieMore").css("display", "block")
				} else {
					$("#jinJieMore").css("display", "none")
				}
			}
			$.ajax({
				url: URL.baseURL9 + 'tpo_groups',
				data: {
					tpo_type: 1,
					page: page
				},
				type: 'get',
				headers: {
					"Authorization": token
				},
				success: _success
			})
		}
		//加载文章、问题和vip_user信息
	var getJinJie = function(param) { //得到artical,questions,vip_user
		questions = [];
		artical = {};
		var xml = $.xml2json(param.content).itemBody;
		artical.p_en = xml.blockquote.p_en;
		artical.p_ch = xml.blockquote.p_ch;

		for (var i = 0; i < xml.questionContent.length; i++) {
			var questionContent = xml.questionContent[i];
			var question = {};
			var simpleChoices = [];
			var G1 = {}; //复杂题型题干内容及答案
			var G2 = {};

			question.questionType = questionContent.questionType;
			question.sequenceNumber = questionContent.sequenceNumber;
			question.correctResponse = questionContent.correctResponse;
			question.p = questionContent.p; //解析
			question.audio = questionContent.audio.source;
			question.prompt = questionContent.choiceInteraction.prompt;

			for (var j = 0; j < questionContent.choiceInteraction.simpleChoice.length; j++) {
				var simpleChoice = {};
				simpleChoice.identifier = questionContent.choiceInteraction.simpleChoice[j].identifier;
				simpleChoice.choiceOption = questionContent.choiceInteraction.simpleChoice[j].choiceOption
				simpleChoices.push(simpleChoice);
			}
			question.simpleChoices = simpleChoices;
			//复杂题型
			if (questionContent.questionType == 'complex') {
				G1.p = questionContent.choiceInteraction.complexQuestion.G1.p;
				G1.correctResponse = questionContent.choiceInteraction.complexQuestion.G1.correctResponse;
				G2.p = questionContent.choiceInteraction.complexQuestion.G2.p;
				G2.correctResponse = questionContent.choiceInteraction.complexQuestion.G2.correctResponse;
				question.G1 = G1;
				question.G2 = G2;
				question.correctResponse = G1.correctResponse + '/' + G2.correctResponse;
			} else if (questionContent.questionType == 'insert') {
				var insertTmp = question.prompt.replace(/（/gm, '(').replace(/）/gm, ')');
				var aTmp = '<span><span><span class="tpo-choice-round pointer singleChoiceInsert showEnable newtop-top" style="display: inline-block; margin: 0 5px;" data-answer="A">A</span><span class="tpo-choice-round showDisable newtop-top" style="display: none; margin: 0 5px;" data-answer="A">A</span></span>';
				var bTmp = '<span><span class="tpo-choice-round pointer singleChoiceInsert showEnable newtop-top" style="display: inline-block; margin: 0 5px;" data-answer="B">B</span><span class="tpo-choice-round showDisable newtop-top" style="display: none; margin: 0 5px;" data-answer="B">B</span></span>';
				var cTmp = '<span><span class="tpo-choice-round pointer singleChoiceInsert showEnable newtop-top" style="display: inline-block; margin: 0 5px;" data-answer="C">C</span><span class="tpo-choice-round showDisable newtop-top" style="display: none; margin: 0 5px;" data-answer="C">C</span></span>';
				var dTmp = '<span><span class="tpo-choice-round pointer singleChoiceInsert showEnable newtop-top" style="display: inline-block; margin: 0 5px;" data-answer="D">D</span><span class="tpo-choice-round showDisable newtop-top" style="display: none; margin: 0 5px;" data-answer="D">D</span></span>';
				question.prompt = insertTmp.replace('(A)', aTmp).replace('(B)', bTmp).replace('(C)', cTmp).replace('(D)', dTmp);
			}
			questions.push(question)
		}

		artical.id = param.id;
		artical.sequence_number = param.sequence_number;
		artical.artical = artical;
		vip_user = param.vip_user;
	}

	var jiexiReadFun = function() {
		if ($('#tpoReadJieXi').css('display') != 'none') {
			$('.showEnable').hide()
			$('.showDisable').show()
			var yourAnswer = "";
			if (questions[currentQuestionIndex].questionType == 'single') {
				$('.tpo-choice').siblings().addClass('tpo-mistake')
				$("#singMul").find('span.showDisable[data-answer="' + questions[currentQuestionIndex].correctResponse + '"]').addClass('tpo-right')
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
					$('#g1AnswerDiv').css('color', '#6bc04b')
					$('#g2AnswerDiv').css('color', '#6bc04b')
				} else {
					$('#g1AnswerDiv').css('color', '#fa3131')
					$('#g2AnswerDiv').css('color', '#fa3131')
				}
				yourAnswer = answer + "/" + answer1;
			}

			$('#yourAnswer').html(yourAnswer)
			if (yourAnswer == questions[currentQuestionIndex].correctResponse) {
				$('#yourAnswerDiv').css('color', '#6bc04b')
			} else {
				$('#yourAnswerDiv').css('color', '#fa3131')
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
				$("#singMul").find('span.showDisable[data-answer="' + questions[currentErrIndex].correctResponse + '"]').addClass('tpo-right')
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
					$('#g1AnswerDiv').css('color', '#6bc04b')
					$('#g2AnswerDiv').css('color', '#6bc04b')
				} else {
					$('#g1AnswerDiv').css('color', '#fa3131')
					$('#g2AnswerDiv').css('color', '#fa3131')
				}
				yourAnswer = answer + "/" + answer1;
			}

			$('#yourAnswer').html(yourAnswer)
			if (yourAnswer == questions[currentErrIndex].correctResponse) {
				$('#yourAnswerDiv').css('color', '#6bc04b')
			} else {
				$('#yourAnswerDiv').css('color', '#fa3131')
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
				var answers = records[currentQuestionIndex].answer.split(',');
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
				var answers = records[currentQuestionIndex].answer.split('/');
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

	var showChoiceErr = function() {
		var currentErrIndex = localErr[localIndex].section_number;
		if (localRecords[localIndex].answer) {
			if (questions[currentErrIndex].questionType != 'complex' && questions[currentErrIndex].questionType != 'insert') {
				var answers = localRecords[localIndex].answer.split(',');
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
				var answers = localRecords[localIndex].answer.split('/');
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
		var renderData = {};
		renderData.artical = artical;
		renderData.question = questions[currentQuestionIndex];
		for (var i = 1; i <= questions.length; i++) {
			questionsNum.push(i)
		}
		renderData.questionsNum = questionsNum;
		renderData.questionsLength = questionsNum.length;
		renderData.currentQuestionIndex = currentQuestionIndex;
		renderData.vip_user = vip_user;

		var _afterRender = function() {
			if (currentQuestionIndex == 0) {
				$("#preQuestion").css('display', 'none')
			} else {
				$("#preQuestion").css('display', 'block')
			}
			$(".questionBrContent").html(renderData.question.prompt.replace(/\n/gi, "<br/>"))
			showChoice()
		}

		var param1 = {
			"wrap": $('#tpoReadPart2'),
			"tmplName": TMPL.t3,
			"tmplData": renderData,
			"afterRender": _afterRender
		}
		renderTemplate(param1)

		// var param2 = {
		// 	"wrap": $('.tpo-right-part3'),
		// 	"tmplName": TMPL.t6,
		// 	"tmplData": renderData,
		// 	"afterRender": ''
		// }
		// renderTemplate(param2)
	}

	var questionPageErr = function(param) {
		//题号前面板进行保存
		// $('.tpo-right-part3').css('display', 'block')
		var currentErrIndex = parseInt(param.pageNum);
		localIndex = parseInt(param.localIndex);
		var questionsNum = []; //题号数组面板
		var renderData = {};
		renderData.artical = artical;
		renderData.question = questions[currentErrIndex];
		for (var i = 0; i < localErr.length; i++) {
			questionsNum.push(localErr[i].section_number + 1)
		}
		renderData.questionsNum = questionsNum;
		renderData.questionsLength = questions.length;
		renderData.currentQuestionIndex = currentErrIndex;
		renderData.vip_user = vip_user;

		var _afterRender = function() {
			if (currentErrIndex == localErr[0].section_number) {
				$("#preQuestionErr").css('display', 'none')
			} else {
				$("#preQuestionErr").css('display', 'block')
			}
			$(".questionBrContent").html(renderData.question.prompt.replace(/\n/gi, "<br/>"))
			showChoiceErr()
		}

		var param1 = {
			"wrap": $('#tpoReadPart2'),
			"tmplName": TMPL.t9,
			"tmplData": renderData,
			"afterRender": _afterRender
		}
		renderTemplate(param1)

		// var param2 = {
		// 	"wrap": $('.tpo-right-part3'),
		// 	"tmplName": TMPL.t6,
		// 	"tmplData": renderData,
		// 	"afterRender": ''
		// }
		// renderTemplate(param2)
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
				var answers = $("#singMul").find('span.tpo-choice');
				for (var i = 0; i < answers.length; i++) {
					if (i == 0) {
						answer = $(answers[0]).html();
					} else {
						answer = answer + "," + $(answers[i]).html();
					}
				}
				if (answer == questions[currentQuestionIndex].correctResponse) {
					records[currentQuestionIndex].is_correct = true;
				} else {
					records[currentQuestionIndex].is_correct = false;
				}
				records[currentQuestionIndex].answer = answer;
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
				records[currentQuestionIndex].answer = answer + "/" + answer1;
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
				var correctCount = 0;
				var errorCount = 0;
				var question_results = [];
				for (var i = 0; i < records.length; i++) {
					var question_result = {};
					question_result.section_number = records[i].section_number;
					if (records[i].is_correct) {
						question_result.is_correct = 1;
					} else {
						question_result.is_correct = 2;
					}

					question_results.push(question_result)
					if (records[i].is_correct) {
						correctCount = correctCount + 1;
					} else {
						errorCount = errorCount + 1;
					}
				}
				var rate = correctCount + "/" + records.length;
				var _success = function(json) {
					next_question_id = json.next_question_id;
					next_group_name = json.next_group_name;
					next_type_name = json.next_type_name;
					next_rate = json.next_rate;
					is_last_question = json.is_last_question;

					//tpoNum = next_group_name;
					var renderData = {};
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
					var param = {
						"tmplName": TMPL.t4,
						"tmplData": renderData,
						"afterRender": ''
					}
					renderTemplate(param)
				}
				$.ajax({
					url: URL.baseURL9 + 'tpo_results/save_results',
					data: JSON.stringify({
						"question_id": artical.id,
						"rate": rate,
						"question_results": question_results,
						"from": 1
					}),
					type: 'Post',
					contentType: "application/json",
					headers: {
						"Authorization": token
					},
					success: _success
				})
			}
			//用户为空时弹出登陆框
		if (isEmpty(token)) {
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
				}
			})
		} else {
			$('body,html').animate({
				scrollTop: 0
			}, 100)
			callback_submit()
		}
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
			var renderData = {};
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

	var againJinJie = function(param) {
		var param1 = {};
		if (isEmpty(param.question_id)) {
			param1 = {
				'question_id': artical.id //为空是，是从计算的结果页来，需从article中拿id就行
			};
		} else {
			param1 = {
				'question_id': param.question_id //不为空是，是从单元列表进来，需再取一次question_id
			};
		}
		artical = {};
		questions = [];
		currentQuestionIndex = 0;
		records = [];
		jinJieUnitDetail(param1)
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
		}
		audioPlay(param)
	}

	//重做错题
	var errOnlyJinJie = function(param) {
		var question_id = param.question_id;
		//置空全局变量
		currentQuestionIndex = 0;
		localErr = [];
		localTmp = [];
		localRecords = [];
		localIndex = 0;
		$('body,html').animate({
			scrollTop: 0
		}, 100)

		//是否需要重新加载文章、题目、vip_user
		if (param.pickArtical) {
			var _success = function(json) {
				//加载文章和题目信息, vip_user
				getJinJie(json)
			}
			$.ajax({
				url: URL.baseURL9 + 'tpo_questions/web',
				data: {
					question_id: question_id
				},
				type: 'get',
				async: false,
				headers: {
					"Authorization": token
				},
				success: _success
			})
		}

		var _success1 = function(json) {
			var tpo_results = json.tpo_results;
			for (var i = 0; i < tpo_results.length; i++) {
				if (tpo_results[i].is_correct == 2) {
					localErr.push(tpo_results[i])
				}
			}
			renderJinJieErr()
		}

		$.ajax({
			url: URL.baseURL9 + 'tpo_results/results',
			data: {
				question_id: param.question_id
			},
			type: 'get',
			headers: {
				"Authorization": token
			},
			success: _success1
		})
	}

	var errOnlyJinJieErr = function(param) {
		var question_id = param.question_id;
		//置空全局变量
		var currentErrIndex = 0;
		localTmp = [];
		localRecords = [];
		localIndex = 0;
		$('body,html').animate({
			scrollTop: 0
		}, 100)
		renderJinJieErr()
	}

	//错题页
	var renderJinJieErr = function() {
		//题号面板
		var questionsNum = [];
		var currentErrIndex = localErr[0].section_number;
		var renderData = {};
		renderData.artical = artical;
		renderData.tpoNum = tpoNum;
		//加载错题中第一题
		renderData.question = questions[currentErrIndex];
		for (var i = 0; i < localErr.length; i++) {
			questionsNum.push(localErr[i].section_number + 1)
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
				$(".questionBrContent").html(renderData.question.prompt.replace(/\n/gi, "<br/>"))
			}
			var param2 = {
				"wrap": $('#tpoReadPart2'),
				"tmplName": TMPL.t9,
				"tmplData": renderData,
				"afterRender": _afterRender1
			}
			renderTemplate(param2)

			// var param3 = {
			// 	"wrap": $('.tpo-right-part3'),
			// 	"tmplName": TMPL.t6,
			// 	"tmplData": renderData,
			// 	"afterRender": ''
			// }
			// renderTemplate(param3)
		}

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

	return {
		init: init
	}
})