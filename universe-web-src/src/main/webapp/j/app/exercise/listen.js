'use strict'

define(['common/uniqueAjax', 'common/render', 'xml2json', 'app/baseURL', 'baseCookie', 'lib/store'], function(uniqueAjax, Render, xml2json, URL, BaseCookie) {
	var _conf,
		$wrap,
		TMPL = {
			t1: 'app/exercise/tmpl_listen_word_unit',
			t2: 'app/exercise/tmpl_listen_word_unitList1',
			t3: 'app/exercise/tmpl_listen_word_unitList2',
			t4: 'app/exercise/tmpl_listen_sentence_unit',
			t5: 'app/exercise/tmpl_listen_sentence_unitList1',
			t6: 'app/exercise/tmpl_listen_sentence_unitList2',
			t7: 'app/exercise/tmpl_listen_word_word1',
			t8: 'app/exercise/tmpl_listen_word_word2',
			t9: 'app/exercise/tmpl_listen_sentence_sentence1',
			t10: 'app/exercise/tmpl_listen_sentence_sentence2',
			t11: 'app/exercise/tmpl_listen_word_result1',
			t12: 'app/exercise/tmpl_listen_word_result1_rate',
			t13: 'app/exercise/tmpl_listen_word_result2',
			t14: 'app/exercise/tmpl_listen_word_result2_rate',
			t15: 'app/exercise/tmpl_listen_sentence_result1',
			t16: 'app/exercise/tmpl_listen_sentence_result1_rate',
			t17: 'app/exercise/tmpl_listen_sentence_result2',
			t18: 'app/exercise/tmpl_listen_sentence_result2_rate',
			t19: 'app/exercise/listenError_tmpl/tmpl_word1',
			t20: 'app/exercise/listenError_tmpl/tmpl_word1_result',
			t21: 'app/exercise/listenError_tmpl/tmpl_word2',
			t22: 'app/exercise/listenError_tmpl/tmpl_word2_result',
			t23: 'app/exercise/listenError_tmpl/tmpl_sentence1',
			t24: 'app/exercise/listenError_tmpl/tmpl_sentence1_result',
			t25: 'app/exercise/listenError_tmpl/tmpl_sentence2',
			t26: 'app/exercise/listenError_tmpl/tmpl_sentence2_result',
			t27: 'app/exercise/listenError_tmpl/tmpl_word1Result',
			t28: 'app/exercise/listenError_tmpl/tmpl_word1_resultResult',
			t29: 'app/exercise/listenError_tmpl/tmpl_word2Result',
			t30: 'app/exercise/listenError_tmpl/tmpl_word2_resultResult',
			t31: 'app/exercise/listenError_tmpl/tmpl_sentence1Result',
			t32: 'app/exercise/listenError_tmpl/tmpl_sentence1_resultResult',
			t33: 'app/exercise/listenError_tmpl/tmpl_sentence2Result',
			t34: 'app/exercise/listenError_tmpl/tmpl_sentence2_resultResult',
			t35: 'app/exercise/tmpl_listen_word_word1_question',
			t36: 'app/exercise/tmpl_listen_word_word2_question',
			t37: 'app/exercise/tmpl_listen_sentence_sentence1_question',
			t38: 'app/exercise/tmpl_listen_sentence_sentence2_question'
		};

	var token,
		tokenTmp = "xiaoma";

	// var questions,
	var currentQuestion = {}, //一个题提取的时候清空
		currentQuestionIndex = 0,
		questions = [], //一次性提取所有问题
		questionsCount = 0, //当前单元共有多少题
		records,
		errIds,
		errSequenceNum,
		groups,
		currentGroupIndex = 0, //记录当前groups数组位置
		currentGroupSequneceNum = "", //记录当前group的sequence_number
		localIndex = 0, //本地含所有题对错index
		localErr = [], //本地含所有题对错
		localErrRecords = [], //本地含所有
		localTmp = [],
		local;
	var durationTime = 0; //计时时间

	var startTime, //用于积分时间计算
		endTime;
	var currentTestTimeStrListen, //当前时间字符串，用于下一题同步显示时间
		testTimerIDListen; //计时器ID

	var groupLevel_fromError = -1; //记录重做错题时当前Unit的groupLevel
	var isRewardCoupon = false;
	var list_status=0; //是否付费解锁  0 未解锁 1 已解锁
	//var xiaomaToken = "bearer b23b2aad4b8543f1a5c0c5ef5ea74182",
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
		//$(document).on('trigger_side9', '#side9', menuToggleListen);
		//$(document).on('trigger_side11', '#side11', listenSentence) //练句
		//$(document).on('click', '#side9', menuToggleListen);
		//$(document).on('click', '#side11', listenSentence) //练句
		//$(document).on('click', '#listenWordTab2', listenWordUnit2);
		//$(document).on('click', '#listenSentenceTab1', listenSentenceUnit1);
		//$(document).on('click', '#listenSentenceTab2', listenSentenceUnit2);

		$(document).on('click', '.wordUnitDetail1', function(e) {
			if ($(this).attr("data-locked") == 1) {
				$("#lockModal1").modal();
				return;
			}
			var data = {
				'id': $(e.target).attr('data-id'),
				'sequence_number': $(e.target).attr('data-sequenceNumber'),
				'index': $(e.target).attr('data-index'),
				'rate': $(e.target).attr('data-rate'),
				'error_question_ids': $(e.target).attr('data-errorQuestionIds')
			};
			wordUnitDetail1(data)
		})
		$(document).on('click', '.wordUnitDetailWord1', function(e) {
			durationTime = 0;
			if ($(this).attr("data-locked") == 1) {
				$("#lockModal1").modal();
				return;
			}
			var data = {
				'id': $(e.target).attr('data-id'),
				'sequence_number': $(e.target).attr('data-sequenceNumber'),
				'index': $(e.target).attr('data-index'),
				'rate': null,
				'error_question_ids': $(e.target).attr('data-errorQuestionIds')
			};
			wordUnitDetail1(data)
		})
		$(document).on('click', '.wordUnitDetail2', function(e) {
			if ($(this).attr("data-locked") == 1) {
				$("#lockModal2").modal();
				return;
			}
			var data = {
				'id': $(e.target).attr('data-id'),
				'sequence_number': $(e.target).attr('data-sequenceNumber'),
				'index': $(e.target).attr('data-index'),
				'rate': $(e.target).attr('data-rate'),
				'error_question_ids': $(e.target).attr('data-errorQuestionIds')
			};
			wordUnitDetail2(data)
		})
		$(document).on('click', '.wordUnitDetailWord2', function(e) {
			durationTime = 0;
			if ($(this).attr("data-locked") == 1) {
				$("#lockModal2").modal();
				return;
			}
			var data = {
				'id': $(e.target).attr('data-id'),
				'sequence_number': $(e.target).attr('data-sequenceNumber'),
				'index': $(e.target).attr('data-index'),
				'rate': null,
				'error_question_ids': $(e.target).attr('data-errorQuestionIds')
			};
			wordUnitDetail2(data)
		})

		$(document).on('click', '#nextUnitWord2', function(e) {
			$(this).addClass("disabled");
			currentQuestion = {}; //一个题提取的时候清空
			currentQuestionIndex = 0;
			questions = [];
			records = [];
			errIds = [];
			errSequenceNum = [];
			localIndex = 0;
			localErr = [];
			localErrRecords = [];
			localTmp = [];
			durationTime = 0;
			currentGroupIndex = parseInt(currentGroupIndex) + 1;
			if (currentGroupIndex == groups.length) {
				alert('已是最后一单元')
				$('body,html').animate({
					scrollTop: 0
				}, 100)
				var _afterRender = function() {
					$("#listenWordTab2").click()
				}
				var param = {
					"tmplName": TMPL.t1,
					"tmplData": '',
					"afterRender": _afterRender
				}
				renderTemplate(param)
			} else {
				var data = {
					'id': groups[currentGroupIndex].id,
					'sequence_number': groups[currentGroupIndex].sequence_number,
					'index': currentGroupIndex,
					'rate': groups[currentGroupIndex].rate,
					'error_question_ids': groups[currentGroupIndex].error_question_ids
				};
				wordUnitDetail2(data)
			}
		});

		$(document).on('click', '#wordUnit1', function(e) {
			var param = {
				"tmplName": TMPL.t1,
				"tmplData": '',
				"afterRender": ''
			}
			renderTemplate(param)
			listenWordUnit1()
		})
		$(document).on('click', '#wordUnit2', function(e) {
			var _afterRender = function() {
				$("#listenWordTab2").click()
			}
			var param = {
				"tmplName": TMPL.t1,
				"tmplData": '',
				"afterRender": _afterRender
			}
			renderTemplate(param)
		})

		$(document).on('click', '.choiceWord1', function(e) {
			$("#audioAudio")[0].pause();
			$(".audioImg").attr("src", "../../i/i20.png")
			var data = {
				'choice': $(e.target).attr('data-choice')
			};
			choiceWord1(data)
		})
		$(document).on('click', '.choiceWord2', function(e) {
			$("#audioAudio")[0].pause()
			$(".audioImg").attr("src", "../../i/i20.png")
			var data = {
				'choice': $(e.target).attr('data-choice')
			};
			choiceWord2(data)
		})

		$(document).on('click', '#againWord1', function(e) {
			//清空全局变量
			currentQuestion = {}
			currentQuestionIndex = 0;
			records = [];
			errIds = [];errAry=[];
			errSequenceNum = [];
			durationTime = 0;
			// groups = json.listen_vocabulary_word_groups; //保存当前单元列表
			// currentGroupIndex = 0;
			// currentGroupSequneceNum = "";
			var param = {}
			param.rate = null;
			param.index = currentGroupIndex;
			param.sequence_number = currentGroupSequneceNum;
			//param.id = groups[currentGroupIndex].id;
			param.groupId=xm_groupId;
			wordUnitDetail1(param)
			$('body,html').animate({
				scrollTop: 0
			}, 100)
		})
		$(document).on('click', '#againWord2', function(e) {
			//清空全局变量
			currentQuestion = {}
			currentQuestionIndex = 0;
			records = [];
			errIds = [];
			errSequenceNum = [];
			durationTime = 0;
			// groups = json.listen_vocabulary_word_groups; //保存当前单元列表
			// currentGroupIndex = 0;
			// currentGroupSequneceNum = "";
			var param = {}
			param.rate = null;
			param.index = currentGroupIndex;
			param.sequence_number = currentGroupSequneceNum;
			param.id = groups[currentGroupIndex].id;
			wordUnitDetail2(param)
			$('body,html').animate({
				scrollTop: 0
			}, 100)
		})

		$(document).on('click', '#errOnlyWord1', errOnlyWord1); //练词练习结束页重做错题
		$(document).on('click', '#errOnlyWord2', errOnlyWord2); //练词练习结束页重做错题

		$(document).on('click', '#errOnlyWord1Result', errOnlyWord1Result); //练词练习结束页重做错题
		$(document).on('click', '#errOnlyWord2Result', errOnlyWord2Result); //练词练习结束页重做错题
		$(document).on('click', '#errOnlySentence1', errOnlySentence1); //练句练习结束页重做错题
		$(document).on('click', '#errOnlySentence1Result', errOnlySentence1Result); //练句结果页面重做错题
		$(document).on('click', '#errOnlyErrSentence1Result',errOnlyErrSentence1Result);
		$(document).on('click', '#errOnlyErrSentence1', errOnlyErrSentence1);
		$(document).on('click', '.choiceErrSentence1Result', function(e) {//练句错题页面做题
			$("#audioAudio")[0].pause()
			$(".audioImg").attr("src", "../../i/i20.png")
			var data = {
				'choice': $(e.target).attr('data-choice')
			};
			choiceErrSentence1Result(data)
		});
		$(document).on('click', '.choiceErrSentence1', function(e) {
			$("#audioAudio")[0].pause()
			$(".audioImg").attr("src", "../../i/i20.png")
			var data = {
				'choice': $(e.target).attr('data-choice')
			};
			choiceErrSentence1(data)
		});
		$(document).on('click', '.choiceErrWord1', function(e) {
			$("#audioAudio")[0].pause()
			$(".audioImg").attr("src", "../../i/i20.png")
			var data = {
				'choice': $(e.target).attr('data-choice')
			};
			choiceErrWord1(data)
		});
		$(document).on('click', '.choiceErrWord2', function(e) {
			$("#audioAudio")[0].pause()
			$(".audioImg").attr("src", "../../i/i20.png")
			var data = {
				'choice': $(e.target).attr('data-choice')
			};
			choiceErrWord2(data)
		});

		$(document).on('click', '.choiceErrWord1Result', function(e) {
			$("#audioAudio")[0].pause()
			$(".audioImg").attr("src", "../../i/i20.png")
			var data = {
				'choice': $(e.target).attr('data-choice')
			};
			choiceErrWord1Result(data)
		});
		$(document).on('click', '.choiceErrWord2Result', function(e) {
			$("#audioAudio")[0].pause()
			$(".audioImg").attr("src", "../../i/i20.png")
			var data = {
				'choice': $(e.target).attr('data-choice')
			};
			choiceErrWord2Result(data)
		});

		$(document).on('click', '#errOnlyErrWord1', errOnlyErrWord1);
		$(document).on('click', '#errOnlyErrWord2', errOnlyErrWord2);

		$(document).on('click', '#errOnlyErrWord1Result', errOnlyErrWord1Result);
		$(document).on('click', '#errOnlyErrWord2Result', errOnlyErrWord2Result);

		$(document).on('click', '.audioImg', function(e) {
			$(".audioImg").attr("src", "../../i/i20.png")
			$(e.target).attr("src", "../../i/i2.gif")
			$("#audioAudio")[0].pause()
			$("#audioAudio").attr('src', $(e.target).attr('data-url'))
			$("#audioAudio")[0].play()
			$("#audioAudio")[0].addEventListener('ended', function() {
				$(e.target).attr("src", "../../i/i20.png")
			}, false);
		});

		$(document).on('click', '#word1Submit', function(e) {
			clearTimerListen(); //弹出登录层暂停时间
			$('#dialogLogin').modal({
				backdrop: 'static'
			})
		})

		$(document).on('click', '#word2Submit', function(e) {
			clearTimerListen(); //弹出登录层暂停时间
			$('#dialogLogin').modal({
				backdrop: 'static'
			})
		});


		$(document).on('click', '#closeQuan', function() {
			closeDiv('quanDiv', 'fade')
		});
		$(document).on('click', '.choiceSentence1', function(e) {
			$("#audioAudio")[0].pause()
			$(".audioImg").attr("src", "../../i/i20.png");
			var data = {
				'choice': $(e.target).attr('data-choice')
			};
			choiceSentence1(data)
		});
		$(document).on('click', '#againSentence1', function(e) {
			//清空全局变量
			currentQuestion = {}
			currentQuestionIndex = 0;
			records = [];
			errIds = [];
			errSequenceNum = [];
			durationTime = 0;
			// groups = json.listen_vocabulary_word_groups; //保存当前单元列表
			// currentGroupIndex = 0;
			// currentGroupSequneceNum = "";
			var param = {}
			param.rate = null;
			param.index = currentGroupIndex;
			param.sequence_number = currentGroupSequneceNum;
			//param.id = groups[currentGroupIndex].id;
			param.groupId = xm_groupId;
			sentenceUnitDetail1(param);
			$('body,html').animate({
				scrollTop: 0
			}, 100)
		})
	}


	 function rand(num){
	        return parseInt(Math.random()*num+1);
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
	    
	/**
	 * 获取最好等级
	 * @param id
	 * @returns {number}
	 */
	var getGroupLevelFromList = function(id, groups) {
		var groupLevel = -1; //当前题默认等级
		var leftUnLocked = true; //当前题左侧所有题默认解锁状态
		var nextUnLocked = false; //当前下一题默认解锁状态
		if (groups) {
			for (var i = 0; i < groups.length; i++) {
				var group = groups[i];
				if (group.id != id && group.locked == 1) {
					leftUnLocked = false;
				}
				if (group.id == id) {
					groupLevel = group.group_level;
					if ((i < groups.length - 1 && groups[i + 1].group_level != null) || i == groups.length - 1) {
						nextUnLocked = true;
					}
					break;
				}
			}
		}
		if(list_status==1){
			nextUnLocked=true;
		}
		//return groupLevel;
		return {
			groupLevel: groupLevel,
			leftUnLocked: leftUnLocked,
			nextUnLocked: nextUnLocked
		};
	};

	var startTimerListen = function() {
		//var date=new Date($.ajax({async: false}).getResponseHeader("Date"));
		var date=getTime();
		xm_startTime=zeroFn(date.getFullYear())+"-"+zeroFn((date.getMonth()+1))+"-"+zeroFn(date.getDate())+" "+zeroFn(date.getHours())+":"+zeroFn(date.getMinutes())+":"+zeroFn(date.getSeconds());
		date=null;
		var fn = function() {
			if ($("#testTimer3").length <= 0) {
				console.log("not find target");
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

	var menuToggleListen = function() {
		$('.sidebar-ul').find('a.sidebarLight').removeClass('sidebarLight');
		$('.sidebar-ul').find('li.sidebarLight').removeClass('sidebarLight');
		$("#side9").parent().siblings().find(".sidebarLight").removeClass('sidebarLight');
		$("#listen_menu_div").toggle();
		if ($('#listen_menu_div').css('display') == "none") {
			$("#listenImg").attr("src", "../../i/side-ang1.png");
		} else {
			$("#listenImg").attr("src", "../../i/side-ang.png");
		}
		$("#side10").click(); //默认定位写作机经
	}

	//练词
	var listenWord = function() {
		BaseCookie.get()
		token = BaseCookie.getToken()
		if ("" == token || null == token) {
			token = tokenTmp
		}
		//左侧导航active
		$('.sidebar-ul').find('a.sidebarLight').removeClass('sidebarLight');
		$('.sidebar-ul').find('li.sidebarLight').removeClass('sidebarLight');
		$("#side10").addClass('sidebarLight');
		$("#side10").parent().siblings().removeClass('sidebarLight');
		$("#wirte_menu_div li").removeClass('sidebarLight');

		var param = {
			"tmplName": TMPL.t1,
			"tmplData": '',
			"afterRender": ''
		}
		renderTemplate(param)
		listenWordUnit1()
	}


	//练词单元列表1
	var listenWordUnit1 = function() {
		$('#listenWordUnit').html('');
		//清空全局变量
		currentQuestion = {}
		currentQuestionIndex = 0;
		questions = [];
		records = [];
		errIds = [];errAry=[];
		errSequenceNum = [];
		//groups = json.listen_vocabulary_word_groups; //保存当前单元列表
		currentGroupIndex = 0;
		currentGroupSequneceNum = "";
		localIndex = 0;
		localErr = [];
		localErrRecords = [];
		localTmp = [];
		var data={
			'id': "1",
			'sequence_number': "1",
			'index': "0",
			'rate': null,
			'error_question_ids':"null"
		}
		wordUnitDetail1(data);
	}

	//练词单元列表2
	var listenWordUnit2 = function() {
		$('#listenWordUnit').html('')
		var _success = function(json) {
			if($(".nav li.active").find("a").attr('id') != "listenWordTab2"){
				return;
			}
			//清空全局变量
			currentQuestion = {}
			currentQuestionIndex = 0;
			questions = [];
			records = [];
			errIds = [];
			errSequenceNum = [];
			groups = json.listen_vocabulary_word_groups; //保存当前单元列表
			currentGroupIndex = 0;
			currentGroupSequneceNum = "";
			localIndex = 0;
			localErr = [];
			localErrRecords = [];
			localTmp = [];

			var renderData = {};renderData.xm_title=xm_title;
			// renderData.units = json.listen_vocabulary_word_groups;
			renderData.units = new Array(json.listen_vocabulary_word_groups);

			var locked = 0;
			list_status=json.list_status;
			$.each(json.listen_vocabulary_word_groups, function(index, value) {
				var tempLocked = locked;
				if (!json.current_group_id) {
					locked = 1;
				} else if (value.id == json.current_group_id) {
					locked = 1;
					tempLocked = 0;
				}
				if (value.group_level != null) {
					tempLocked = 0;
				}
				groups[index].locked = tempLocked;

				var item = {};
				item.id = value.id;
				item.sequence_number = value.sequence_number;
				item.zip_url = value.zip_url;
				item.question_count = value.question_count;
				item.rate = value.rate;
				item.error_question_ids = JSON.stringify(value.error_question_ids);
				item.group_level = value.group_level;
				item.avg_speed = value.avg_speed;
				item.locked = tempLocked;
				item.is_today_task = value.is_today_task;
				renderData.units[index] = item;
			});
			var param = {
				"wrap": $('#listenWordUnit'),
				"tmplName": TMPL.t3,
				"tmplData": renderData,
				"afterRender": ''
			}
			renderTemplate(param)
		}

		$.ajax({
			url: URL.baseURL9 + "listen_vocabulary_word_groups",
			type: 'get',
			data: {
				from: 1,
				listen_type: 2,
				new_version: 1
			},
			headers: {
				"Authorization": token
			},
			success: _success
		});
	}


	//练词点击某一具体单元1
	var wordUnitDetail1 = function(param) {
		$('body,html').animate({
			scrollTop: 0
		}, 100)
		//清空全局变量
		currentQuestion = {}
		currentQuestionIndex = 0;
		questions = [];
		records = [];
		errIds = [];errAry=[];
		errSequenceNum = [];
		currentGroupIndex = 0;
		currentGroupSequneceNum = "";
		localIndex = 0;
		localErr = [];
		localErrRecords = [];
		localTmp = [];
		if (isEmpty(param.rate)) { //rate=null，从第一个题开始
			startTime = new Date();
			currentTestTimeStrListen = null;
			//currentGroupIndex = param.index;
			//currentGroupSequneceNum = param.sequence_number;
			$.ajax({
				url: URL.xiaomaURL + "translation/group/"+param.groupId+"?listen_type=1",
				type: 'get',
				async: false,
				headers: {
					"Authorization": exerciseApi.xiaomaToken
				},
				success: function(json) {
					json=$.parseJSON(json);
					//questions = json.listen_vocabulary_word_questions
					
					questions=json.questions;
					questions = shuffle(questions);//乱序
					questionsCount = json.questions.length;
					var paramTmp = {
						sequence_number: 1,
						group_id: param.groupId
					};
					getWord1(paramTmp);
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
			// currentGroupIndex = param.sequence_number - 1;
			resultWord1(2)
		}
	}

	//练词点击某一具体单元2
	var wordUnitDetail2 = function(param) {
		$('body,html').animate({
			scrollTop: 0
		}, 100)
		if (isEmpty(param.rate)) { //rate=null，从第一个题开始
			startTime = new Date();
			currentTestTimeStrListen = null;
			currentGroupIndex = param.index;
			currentGroupSequneceNum = param.sequence_number;
			$.ajax({
				url: URL.baseURL9 + "listen_vocabulary_word_questions/web",
				type: 'get',
				data: {
					group_id: param.id
				},
				async: false,
				headers: {
					"Authorization": token
				},
				success: function(json) {
					questions = json.listen_vocabulary_word_questions
					questionsCount = json.group_count
					var paramTmp = {
						sequence_number: 1,
						group_id: param.id
					}
					getWord2(paramTmp)
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
			// currentGroupIndex = param.sequence_number - 1;
			resultWord2(2)
		}
	}


	//练词点击某一具体单元2
	var sentenceUnitDetail2 = function(param) {
		$('body,html').animate({
			scrollTop: 0
		}, 100)
		if (isEmpty(param.rate)) { //rate=null，从第一个题开始
			startTime = new Date();
			currentTestTimeStrListen = null;
			currentGroupIndex = param.index;
			currentGroupSequneceNum = param.sequence_number;
			// currentQuestion = {}
			// currentQuestionIndex = 0;
			// records = [];
			// errIds = [];
			// groups = json.listen_vocabulary_word_groups; //保存当前单元列表
			// currentGroupIndex = 0;
			// currentGroupIndex = param.sequence_number - 1;
			// 
			$.ajax({
				url: URL.baseURL9 + "listen_vocabulary_sentence_questions/web",
				type: 'get',
				data: {
					group_id: param.id
				},
				async: false,
				headers: {
					"Authorization": token
				},
				success: function(json) {
					questions = json.listen_vocabulary_sentence_questions
					questionsCount = json.group_count
					var paramTmp = {
						sequence_number: 1,
						group_id: param.id
					}
					getSentence2(paramTmp)
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
			// currentGroupIndex = param.sequence_number - 1;
			resultSentence2(2)
		}
	}

	//听词选择1
	var choiceWord1 = function(param) {
			$($('.table1')[0]).css('display', 'none')
			$($('.table1')[1]).css('display', 'block')
			var correctResponse;
			if (currentQuestion.correctResponse == "A") {
				correctResponse = 0;
			} else if (currentQuestion.correctResponse == "B") {
				correctResponse = 1;
			} else if (currentQuestion.correctResponse == "C") {
				correctResponse = 2;
			} else {
				correctResponse = 3;
			}
			$($('.choiceResult')[correctResponse]).addClass('listen-right');
			var record = {};
			record.question = currentQuestion;
		    record.question.sequence_number_order=currentQuestionIndex+1;//20161026
			if (param.choice != correctResponse) {//做错题20160912
				record.isError = true;
				var errObj={};
				errObj.answer=param.choice==0?"A":param.choice==1?"B":param.choice==2?"C":"D";
				errObj.is_correct=2;
				errObj.question_id=currentQuestion.id;
				errObj.sequence_number=currentQuestion.sequence_number;
				errIds.push(errObj);//错题集合
				errSequenceNum.push(currentQuestion.sequence_number_order);
				$($('.choiceResult')[param.choice]).addClass('listen-mistake')
			} else {
				record.isError = false;
			}
		    records.push(record);
		    errAry.push(currentQuestion.id);//做题顺序20160912

			var showResult = function() {
				if (currentQuestionIndex == currentQuestion.group_count - 1) { //做到最后一题，出结果页
					endTime = new Date();
					var spend_time = Math.round(durationTime);
					var recordsLength = records.length;
					if (records[recordsLength - 2].question.id == records[recordsLength - 1].question.id) {
						records.pop();
						errIds.pop();
					}
					submitWord1(spend_time);
					/*if (isEmpty(exerciseApi.xiaomaToken)) { //用户没登陆，先弹框让其登录20160910
						clearTimerListen(); //弹出登录层暂停时间
						$('#dialogLogin').modal({
							backdrop: 'static'
						})
						$('#dialogLogin').bind('hidden.bs.modal', function(e) {
							BaseCookie.get()
							if (!isEmpty(BaseCookie.getToken())) {
								token = BaseCookie.getToken()
								submitWord1(spend_time)
							} else {
								$('#word1SubmitDiv').css('display', 'block')
								startTimerListen();
							}
						})
					} else { //出结果页
						submitWord1(spend_time)
					}*/
				} else {
					currentQuestionIndex = currentQuestionIndex + 1;
					var paramTmp = {
						sequence_number: currentQuestionIndex + 1,
						//group_id: groups[currentGroupIndex].id
					}
					getWord1(paramTmp)
				}
				clearTimeout(timeInterval)
			}
			var timeInterval = setTimeout(showResult, 1000);
		}
		//听词选择2
	var choiceWord2 = function(param) {
			// currentQuestion = {}
			// currentQuestionIndex = 0;
			// records = [];
			// errIds = [];
			// groups = json.listen_vocabulary_word_groups; //保存当前单元列表
			// currentGroupIndex = 0;

			$($('.table1')[0]).css('display', 'none')
			$($('.table1')[1]).css('display', 'block')

			var correctResponse;
			if (currentQuestion.correctResponse == "A") {
				correctResponse = 0;
			} else if (currentQuestion.correctResponse == "B") {
				correctResponse = 1;
			} else if (currentQuestion.correctResponse == "C") {
				correctResponse = 2;
			} else {
				correctResponse = 3;
			}

			$($('.choiceResult')[correctResponse]).addClass('listen-right')
			var record = {};
			record.question = currentQuestion;
			if (param.choice != correctResponse) {
				record.isError = true;
				errIds.push(currentQuestion.id)
				errSequenceNum.push(currentQuestion.sequence_number_order)
				$($('.choiceResult')[param.choice]).addClass('listen-mistake')
			} else {
				record.isError = false;
			}
			records.push(record);

			var showResult = function() {
				if (currentQuestionIndex == currentQuestion.group_count - 1) { //做到最后一题，出结果页
					endTime = new Date();
					var spend_time = Math.round(durationTime);
					// var spend_time = Math.round((endTime.getTime() - startTime.getTime()) / 1000);
					var recordsLength = records.length;
					if (records[recordsLength - 2].question.id == records[recordsLength - 1].question.id) {
						records.pop()
						errIds.pop()
					}
					if (isEmpty(token)) { //用户没登陆，先弹框让其登录
						clearTimerListen(); //弹出登录层暂停时间
						$('#dialogLogin').modal({
							backdrop: 'static'
						})
						$('#dialogLogin').bind('hidden.bs.modal', function(e) {
							BaseCookie.get()
							if (!isEmpty(BaseCookie.getToken())) {
								token = BaseCookie.getToken()
								submitWord2(spend_time)
							} else {
								$('#word2SubmitDiv').css('display', 'block')
								startTimerListen();
							}
						})
					} else { //出结果页
						submitWord2(spend_time)
					}
				} else {
					currentQuestionIndex = currentQuestionIndex + 1;
					var paramTmp = {
						sequence_number: currentQuestionIndex + 1,
						group_id: groups[currentGroupIndex].id
					}
					getWord2(paramTmp)
				}
				clearTimeout(timeInterval)
			}
			var timeInterval = setTimeout(showResult, 1000);
		}

	//获得单词1,参数第几组第几个sequence_number,group_id
	var getWord1 = function(param) {
		var currentQuestionXml = questions[currentQuestionIndex].content;
		// var _success = function(json) {
		currentQuestion = {};
		//post接口增加sequence_number参数
		currentQuestion.sequence_number_order = questions[currentQuestionIndex].sequence_number;
		currentQuestion.correctResponse = $.xml2json(currentQuestionXml).responseDeclaration.correctResponse.value;
		var bodyTmp = $.xml2json(currentQuestionXml).itemBody;
		currentQuestion.id = bodyTmp.id;
		currentQuestion.sequence_number = bodyTmp.sequence_number;
		currentQuestion.word_audio = bodyTmp.choiceInteraction.prompt.word_audio;
		currentQuestion.sentence_audio = bodyTmp.choiceInteraction.prompt.sentence_audio;
		var simpleChoices = [];
		if (currentQuestion.correctResponse == "A") {
			currentQuestion.correctResponseWord = bodyTmp.choiceInteraction.simpleChoice[0].toString()
		} else if (currentQuestion.correctResponse == "B") {
			currentQuestion.correctResponseWord = bodyTmp.choiceInteraction.simpleChoice[1].toString()
		} else if (currentQuestion.correctResponse == "C") {
			currentQuestion.correctResponseWord = bodyTmp.choiceInteraction.simpleChoice[2].toString()
		} else {
			currentQuestion.correctResponseWord = bodyTmp.choiceInteraction.simpleChoice[3].toString()
		}
		for (var i = 0; i < 4; i++) {
			simpleChoices.push(bodyTmp.choiceInteraction.simpleChoice[i].toString());
		}
		currentQuestion.simpleChoices = simpleChoices;
		currentQuestion.group_count = questionsCount;

		var renderData = {}; renderData.xm_title=xm_title;
		renderData.content = currentQuestion;
		renderData.group_count = questionsCount;
		// renderData.sequence_number = currentGroupIndex + 1;
		renderData.group_sequence_number = currentGroupSequneceNum;
		renderData.current_count = currentQuestionIndex + 1;
		if (currentTestTimeStrListen) {
			renderData.currentTestTimeStrListen = currentTestTimeStrListen;
		}
		if ($(".listen-question").length) {
			var _afterRender1 = function() {
				//startTimerListen();
				$($(".audioImg")[0]).attr("src", "../../i/i2.gif")
				$("#audioAudio")[0].pause()
				$("#audioAudio").attr('src', $($(".audioImg")[0]).attr('data-url'))
				$("#audioAudio")[0].addEventListener('ended', function() {
					$($(".audioImg")[0]).attr("src", "../../i/i20.png")
					$($(".table1")[0]).css('display', 'block')
				}, false);
				$("#audioAudio")[0].play()
			}
			var param = {
				"wrap": $(".listen-question"),
				"tmplName": TMPL.t35,
				"tmplData": renderData,
				"afterRender": _afterRender1
			}
			renderTemplate(param)
		} else {
			var _afterRender = function() {
				var _afterRender1 = function() {
					durationTime=0;startTimerListen();
					$($(".audioImg")[0]).attr("src", "../../i/i2.gif")
					$("#audioAudio")[0].pause()
					$("#audioAudio").attr('src', $($(".audioImg")[0]).attr('data-url'))
					$("#audioAudio")[0].addEventListener('ended', function() {
						$($(".audioImg")[0]).attr("src", "../../i/i20.png")
						$($(".table1")[0]).css('display', 'block')
					}, false);
					$("#audioAudio")[0].play()
				}
				var param = {
					"wrap": $(".listen-question"),
					"tmplName": TMPL.t35,
					"tmplData": renderData,
					"afterRender": _afterRender1
				};
				renderTemplate(param)
			}
			var param = {
				"tmplName": TMPL.t7,
				"tmplData": renderData,
				"afterRender": _afterRender
			}
			renderTemplate(param)
		}
	}
	var getWord2 = function(param) {
		var currentQuestionXml = questions[currentQuestionIndex].content;
		// var _success = function(json) {
		currentQuestion = {};
		//post接口增加sequence_number参数
		currentQuestion.sequence_number_order = questions[currentQuestionIndex].sequence_number;
		currentQuestion.correctResponse = $.xml2json(currentQuestionXml).responseDeclaration.correctResponse.value;
		var bodyTmp = $.xml2json(currentQuestionXml).itemBody;
		currentQuestion.id = bodyTmp.id;
		currentQuestion.sequence_number = bodyTmp.sequence_number;
		currentQuestion.prompt = bodyTmp.choiceInteraction.prompt;
		var simpleChoices = [];
		if (currentQuestion.correctResponse == "A") {
			currentQuestion.correctResponseWordAudio = bodyTmp.choiceInteraction.simpleChoice[0].word_audio.toString()
			currentQuestion.correctResponseSentenceAudio = bodyTmp.choiceInteraction.simpleChoice[0].sentence_audio.toString()
		} else if (currentQuestion.correctResponse == "B") {
			currentQuestion.correctResponseWordAudio = bodyTmp.choiceInteraction.simpleChoice[1].word_audio.toString()
			currentQuestion.correctResponseSentenceAudio = bodyTmp.choiceInteraction.simpleChoice[1].sentence_audio.toString()
		} else if (currentQuestion.correctResponse == "C") {
			currentQuestion.correctResponseWordAudio = bodyTmp.choiceInteraction.simpleChoice[2].word_audio.toString()
			currentQuestion.correctResponseSentenceAudio = bodyTmp.choiceInteraction.simpleChoice[2].sentence_audio.toString()
		} else {
			currentQuestion.correctResponseWordAudio = bodyTmp.choiceInteraction.simpleChoice[3].word_audio.toString()
			currentQuestion.correctResponseSentenceAudio = bodyTmp.choiceInteraction.simpleChoice[3].sentence_audio.toString()
		}
		for (var i = 0; i < 4; i++) {
			var mp3Tmp = {};
			mp3Tmp.word_audio = bodyTmp.choiceInteraction.simpleChoice[i].word_audio.toString();
			mp3Tmp.sentence_audio = bodyTmp.choiceInteraction.simpleChoice[i].sentence_audio.toString();
			simpleChoices.push(mp3Tmp);
		}
		currentQuestion.simpleChoices = simpleChoices;
		currentQuestion.group_count = questionsCount;

		var renderData = {};renderData.xm_title=xm_title;
		renderData.content = currentQuestion;
		renderData.group_count = questionsCount;
		// renderData.sequence_number = currentGroupIndex + 1;
		renderData.group_sequence_number = currentGroupSequneceNum;
		renderData.current_count = currentQuestionIndex + 1;
		if (currentTestTimeStrListen) {
			renderData.currentTestTimeStrListen = currentTestTimeStrListen;
		}
		if ($(".listen-question").length) {
			var _afterRender1 = function() {
				durationTime=0;startTimerListen();
			}
			var param = {
				"wrap": $(".listen-question"),
				"tmplName": TMPL.t36,
				"tmplData": renderData,
				"afterRender": _afterRender1
			}
			renderTemplate(param)
		} else {
			var _afterRender = function() {
				var _afterRender1 = function() {
					startTimerListen();
				}
				var param = {
					"wrap": $(".listen-question"),
					"tmplName": TMPL.t36,
					"tmplData": renderData,
					"afterRender": _afterRender1
				}
				renderTemplate(param)
			}
			var param = {
				"tmplName": TMPL.t8,
				"tmplData": renderData,
				"afterRender": _afterRender
			}
			renderTemplate(param)
		}
		// }
		// $.ajax({
		// 	url: URL.baseURL9 + "listen_vocabulary_word_questions/get_one",
		// 	type: 'get',
		// 	data: {
		// 		sequence_number: param.sequence_number,
		// 		group_id: param.group_id
		// 	},
		// 	headers: {
		// 		"Authorization": token
		// 	},
		// 	success: _success
		// });
	}

	//练词结果提交1
	var submitWord1 = function(param) {
			var spend_time = param;
			var correctCount = currentQuestion.group_count - errIds.length;
			var rate = correctCount + "/" + currentQuestion.group_count;
			var rateValue = Math.round(correctCount/currentQuestion.group_count*100)/100;

		var digitRound = function(digit, length) {
				length = length ? parseInt(length) : 0;
				if (length <= 0) return Math.round(digit);
				digit = Math.round(digit * Math.pow(10, length)) / Math.pow(10, length);
				return digit;
			};
			var rateTmp = digitRound(correctCount / currentQuestion.group_count * 100, 2);
			

			var _success = function(json) {
				json= $.parseJSON(json);
				exerciseApi.updateListItem();
				resultWord1(1, rate,json.group_level)
			};
		//var date=new Date($.ajax({async: false}).getResponseHeader("Date"));
		var date=getTime();
		xm_endTime=zeroFn(date.getFullYear())+"-"+zeroFn((date.getMonth()+1))+"-"+zeroFn(date.getDate())+" "+zeroFn(date.getHours())+":"+zeroFn(date.getMinutes())+":"+zeroFn(date.getSeconds());
		date=null;
			$.ajax({//提交答案20160910
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
				success: _success
			});
		}
		//练词结果提交2
	var submitWord2 = function(param) {
			var spend_time = param;
			var correctCount = currentQuestion.group_count - errIds.length;
			var rate = correctCount + "/" + currentQuestion.group_count;

			var digitRound = function(digit, length) {
				length = length ? parseInt(length) : 0;
				if (length <= 0) return Math.round(digit);
				digit = Math.round(digit * Math.pow(10, length)) / Math.pow(10, length);
				return digit;
			};
			var rateTmp = digitRound(correctCount / currentQuestion.group_count * 100, 2);
			$.ajax({
				url: URL.baseURL9 + 'common/group_level',
				type: 'get',
				async: false,
				headers: {
					Authorization: token
				},
				data: {
					module_type: 4,
					rate: rateTmp,
					spend_time: spend_time,
					amount: records.length,
					group_id: groups[currentGroupIndex].id
				},
				success: function(json) {
					isRewardCoupon = json.is_reward_coupon;
				}
			})

			var _success = function() {
				resultWord2(1, rate)
			}
			$.ajax({
				url: URL.baseURL9 + "listen_vocabulary_word_results",
				type: 'post',
				data: {
					group_id: groups[currentGroupIndex].id,
					question_ids: errIds.join(","),
					sequence_numbers: errSequenceNum.join(","),
					rate: rate,
					spend_time: spend_time,
					new_version: 2
				},
				headers: {
					"Authorization": token,
					fromType:"web"
				},
				success: _success
			});
		}

	//练词结果页1,type用来判断是做题来的还是直接结果页
	var resultWord1 = function(type, rate,level) {
			var renderData = {};renderData.xm_title=xm_title;
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
				// var spend_time = Math.round((endTime.getTime() - startTime.getTime()) / 1000);
				var avg_speed = spend_time / records.length;
				var avg_string = avg_speed.toString();
				var avg_index = avg_string.indexOf('.');
				// var Digit = {};
				var digitRound = function(digit, length) {
					length = length ? parseInt(length) : 0;
					if (length <= 0) return Math.round(digit);
					digit = Math.round(digit * Math.pow(10, length)) / Math.pow(10, length);
					return digit;
				};
				var rateTmp = renderData.correctCount / records.length;
				renderData.rate = digitRound(rateTmp * 100, 2);
				/*if (avg_speed <= 10 && avg_speed > 0) {
					// avg_speed = avg_string.substring(0, avg_index + 3) + 's'
					avg_speed = digitRound(avg_string, 2).toString() + 'S'
				} else if (avg_speed <= 60) {
					// avg_speed = avg_string.substring(0, avg_index) + 's'
					avg_speed = Math.round(avg_string).toString() + 'S'
				} else if (avg_speed <= 3600) {
					var avg_string1 = avg_speed / 60;
					// var avg_index1 = avg_string1.indexOf('.')
					// avg_speed = avg_string1.substring(0, avg_index1) + 'min'
					avg_speed = digitRound(avg_string1, 1).toString() + 'MIN'
				} else if (avg_speed > 3600) {
					var avg_string2 = avg_speed / 3600;
					// var avg_index2 = avg_string2.indexOf('.')
					// avg_speed = avg_string2.substring(0, avg_index2) + 'h'
					avg_speed = Math.round(avg_string2).toString() + 'H'
				}*/
				avg_speed = digitRound(avg_string, 2).toString() + 'S';
				renderData.group_level=level;
				renderData.avg_speed = avg_speed;
				renderData.errWords = errWords;				
				renderData.records = records;
				renderData.isFromPlan=exerciseApi.isFromPlan;
				var _afterRender = function() {
					startTime = null;
					if (isRewardCoupon) {
						// showDiv('quanDiv', 'fade')
						isRewardCoupon = false;
					}
				}
				var param = {
					"tmplName": TMPL.t11,
					"tmplData": renderData,
					"afterRender": _afterRender
				}
				renderTemplate(param)
			} else if (type == 2) { //直接进结果页
				startTime = null;
				var _success = function(json) {
					json= $.parseJSON(json);
					//修改重做错题直接进结果页bug
					//var jsonResult = json.listen_vocabulary_word_results;
					var jsonResult = json.questions;
					//for (var i = 0; i < jsonResult.length; i++) {
					//	if (jsonResult[i].is_correct == 2) {
					//		localErr.push(jsonResult[i])
					//		localErrRecords.push(jsonResult[i])
					//	}
					//}

					var jsonResultTmp=json.results.wrong_results;
					$.each(jsonResultTmp,function(index,value){
						$.each(json.questions,function(index2,value2){
							if(value.question_id==value2.id){
								value.correctAnswer=$.xml2json(value2.content).responseDeclaration.correctResponse.value;
								value.group_count=json.questions.length;
								value.question_sequence_number=value2.sequence_number;
								localErr.push(value)
								localErrRecords.push(value)
								return (function(){;})();
							}
						})
					});
					localIndex = 0;
					localTmp = [];
					var renderData = {};renderData.xm_title=xm_title;
					var rate;
					//questions是所有的题目
					//wrong_results错误的题目
					$.each(json.results.wrong_results,function(index,value){
						$.each(json.questions,function(index2,value2){
							if(value.question_id==value2.id){
								value2.is_correct=2;
							}
						})
					});
					/*题目排序 保证和做题的顺序是一样的20161027*/
					var sortQuestion=[];
					$.each(json.results.question_numbers,function(index,value){
						$.each(json.questions,function(index2,value2){
							if(value==value2.id){
								sortQuestion.push(value2);
							}
						})
					});
					//if (json.listen_vocabulary_word_results.length != 0) {
					if (json.questions!= 0) {
						rate =json.results.rate;
						//renderData.correctCount = rate.split("/")[0];20160912
						//renderData.errorCount = rate.split("/")[1] - rate.split("/")[0];20160912
						//renderData.rate = renderData.correctCount / rate.split("/")[1] * 100;
						renderData.rate=rate;
					} else {
						renderData.rate = rate;
					}
					//renderData.group_sequence_number = currentGroupSequneceNum;
					renderData.group_sequence_number = json.sequence_number;
					//renderData.errWords = json.listen_vocabulary_word_results;
					renderData.errWords = sortQuestion;
					sortQuestion=[];
					renderData.avg_speed = json.results.avg_speed+"S";
					renderData.group_level = json.results.point_level;
					renderData.isFromPlan=exerciseApi.isFromPlan;					
					var _afterRender=function(){
						/*20161026乱序*/
						localErr=shuffle(localErr);
					}
					var param = {
						"tmplName": TMPL.t12,
						"tmplData": renderData,
						"afterRender": _afterRender
					}
					renderTemplate(param)
				}
				$.ajax({
					url: URL.xiaomaURL + "translation/group/"+xm_groupId+"?listen_type=1",
					type: 'get',
					headers: {
						"Authorization": exerciseApi.xiaomaToken
					},
					success: _success
				});

			}
		}
		//练词结果页2
	var resultWord2 = function(type, rate) {
			var renderData = {};renderData.xm_title=xm_title;
			if (type == 1) { //做题来的，直接从records和errids取
				renderData.group_sequence_number = currentGroupSequneceNum;
				renderData.correctCount = rate.split("/")[0];
				renderData.errorCount = rate.split("/")[1] - rate.split("/")[0];
				// renderData.rate = renderData.correctCount / records.length * 100;
				var errWords = []
				for (var i = 0; i < records.length; i++) {
					if (records[i].isError) {
						errWords.push(records[i])
					}
				}
				//本地计算平均速度公式中
				var spend_time = Math.round(durationTime);
				// var spend_time = Math.round((endTime.getTime() - startTime.getTime()) / 1000);
				var avg_speed = spend_time / records.length;
				var avg_string = avg_speed.toString();
				var avg_index = avg_string.indexOf('.');
				// var Digit = {};
				var digitRound = function(digit, length) {
					length = length ? parseInt(length) : 0;
					if (length <= 0) return Math.round(digit);
					digit = Math.round(digit * Math.pow(10, length)) / Math.pow(10, length);
					return digit;
				};
				var rateTmp = renderData.correctCount / records.length;
				renderData.rate = digitRound(rateTmp * 100, 2);
				/*if (avg_speed <= 10 && avg_speed > 0) {
					// avg_speed = avg_string.substring(0, avg_index + 3) + 's'
					avg_speed = digitRound(avg_string, 2).toString() + 'S'
				} else if (avg_speed <= 60) {
					// avg_speed = avg_string.substring(0, avg_index) + 's'
					avg_speed = Math.round(avg_string).toString() + 'S'
				} else if (avg_speed <= 3600) {
					var avg_string1 = avg_speed / 60;
					// var avg_index1 = avg_string1.indexOf('.')
					// avg_speed = avg_string1.substring(0, avg_index1) + 'min'
					avg_speed = digitRound(avg_string1, 1).toString() + 'MIN'
				} else if (avg_speed > 3600) {
					var avg_string2 = avg_speed / 3600;
					// var avg_index2 = avg_string2.indexOf('.')
					// avg_speed = avg_string2.substring(0, avg_index2) + 'h'
					avg_speed = Math.round(avg_string2).toString() + 'H'
				}*/
				avg_speed = digitRound(avg_string, 2).toString() + 'S';
				renderData.avg_speed = avg_speed;
				//group_level
				$.ajax({
					url: URL.baseURL9 + 'common/group_level',
					type: 'get',
					async: false,
					headers: {
						Authorization: token
					},
					data: {
						module_type: 5,
						rate: renderData.rate,
						spend_time: spend_time,
						amount: records.length,
						group_id: groups[currentGroupIndex].id
					},
					success: function(json) {
						renderData.group_level = json.group_level;
						// isRewardCoupon = json.is_reward_coupon;
					}
				})
				renderData.errWords = errWords;
				renderData.records = records;

				///**-------计算最高等级 开始-------**/
				//console.log("计算最高等级");
				//var groupLevelFromList=getGroupLevelFromList(groups[currentGroupIndex].id);
				//var highGroupLevel=renderData.group_level>groupLevelFromList ? renderData.group_level : groupLevelFromList ;
				//renderData.high_group_level=highGroupLevel;
				///**-------计算最高等级 结束-------**/
				/**-------计算最高等级 开始-------**/
				//console.log("计算最高等级");
				groups[currentGroupIndex].locked = 0;
				var obj = getGroupLevelFromList(groups[currentGroupIndex].id, groups);
				var groupLevelFromList = obj.groupLevel;
				var leftUnLocked = obj.leftUnLocked;
				var nextUnLocked = obj.nextUnLocked;
				var highGroupLevel = renderData.group_level > groupLevelFromList ? renderData.group_level : groupLevelFromList;
				groups[currentGroupIndex].group_level = highGroupLevel;
				renderData.high_group_level = highGroupLevel;
				// if ((leftUnLocked == true && renderData.high_group_level == 4) || nextUnLocked) {
				if ((leftUnLocked == true && renderData.high_group_level > 2) || nextUnLocked) {
					renderData.canUnLocked = 1;
				} else {
					renderData.canUnLocked = 0;
				}
				/**-------计算最高等级 结束-------**/

				var _afterRender = function() {
					startTime = null;
					if (isRewardCoupon) {
						// showDiv('quanDiv', 'fade')
						isRewardCoupon = false;
					}
				}
				var param = {
					"tmplName": TMPL.t13,
					"tmplData": renderData,
					"afterRender": _afterRender
				}
				renderTemplate(param)
			} else if (type == 2) { //直接进结果页
				startTime = null;
				var _success = function(json) {
					var renderData = {};renderData.xm_title=xm_title;
						localErr = json.listen_vocabulary_word_results;
						 localErrRecords = json.listen_vocabulary_word_results;
					var jsonResult = json.listen_vocabulary_word_results;
					for (var i = 0; i < jsonResult.length; i++) {
						if (jsonResult[i].is_correct == 2) {
							localErr.push(jsonResult[i])
							localErrRecords.push(jsonResult[i])
						}
					}
					localIndex = 0;
					localTmp = [];
					var rate;
					if (json.listen_vocabulary_word_results.length != 0) {
						rate = json.rate;
						renderData.correctCount = rate.split("/")[0];
						renderData.errorCount = rate.split("/")[1] - rate.split("/")[0];
						renderData.rate = renderData.correctCount / rate.split("/")[1] * 100;
					} else {
						renderData.rate = 100;
					}
					renderData.group_sequence_number = currentGroupSequneceNum;
					renderData.errWords = json.listen_vocabulary_word_results;
					renderData.avg_speed = json.avg_speed;
					renderData.group_level = json.group_level;

					///**-------计算最高等级 开始-------**/
					//console.log("计算最高等级");
					//var groupLevelFromList=getGroupLevelFromList(groups[currentGroupIndex].id);
					//var highGroupLevel=renderData.group_level>groupLevelFromList ? renderData.group_level : groupLevelFromList ;
					//renderData.high_group_level=highGroupLevel;
					///**-------计算最高等级 结束-------**/
					/**-------计算最高等级 开始-------**/
					console.log("计算最高等级");
					groups[currentGroupIndex].locked = 0;
					var obj = getGroupLevelFromList(groups[currentGroupIndex].id, groups);
					var groupLevelFromList = obj.groupLevel;
					var leftUnLocked = obj.leftUnLocked;
					var nextUnLocked = obj.nextUnLocked;
					var highGroupLevel = renderData.group_level > groupLevelFromList ? renderData.group_level : groupLevelFromList;
					groups[currentGroupIndex].group_level = highGroupLevel;
					renderData.high_group_level = highGroupLevel;
					// if ((leftUnLocked == true && renderData.high_group_level == 4) || nextUnLocked) {
					if ((leftUnLocked == true && renderData.high_group_level > 2) || nextUnLocked) {
						renderData.canUnLocked = 1;
					} else {
						renderData.canUnLocked = 0;
					}
					/**-------计算最高等级 结束-------**/

					var param = {
						"tmplName": TMPL.t14,
						"tmplData": renderData,
						"afterRender": ''
					}
					renderTemplate(param)
				}
				$.ajax({
					url: URL.baseURL9 + "listen_vocabulary_word_results/web",
					type: 'get',
					data: {
						group_id: groups[currentGroupIndex].id
					},
					headers: {
						"Authorization": token
					},
					success: _success
				});

			}
		}
		//练词结果页2
	var resultSentence2 = function(type, rate) {
		var renderData = {};renderData.xm_title=xm_title;
		if (type == 1) { //做题来的，直接从records和errids取
			renderData.group_sequence_number = currentGroupSequneceNum;
			renderData.correctCount = rate.split("/")[0];
			renderData.errorCount = rate.split("/")[1] - rate.split("/")[0];
			// renderData.rate = renderData.correctCount / records.length * 100;
			var errWords = []
			for (var i = 0; i < records.length; i++) {
				if (records[i].isError) {
					errWords.push(records[i])
				}
			}
			//本地计算平均速度公式中
			var spend_time = Math.round(durationTime);
			// var spend_time = Math.round((endTime.getTime() - startTime.getTime()) / 1000);
			var avg_speed = spend_time / records.length;
			var avg_string = avg_speed.toString();
			var avg_index = avg_string.indexOf('.');
			// var Digit = {};
			var digitRound = function(digit, length) {
				length = length ? parseInt(length) : 0;
				if (length <= 0) return Math.round(digit);
				digit = Math.round(digit * Math.pow(10, length)) / Math.pow(10, length);
				return digit;
			};
			var rateTmp = renderData.correctCount / records.length;
			renderData.rate = digitRound(rateTmp * 100, 2);
			/*if (avg_speed <= 10 && avg_speed > 0) {
				// avg_speed = avg_string.substring(0, avg_index + 3) + 's'
				avg_speed = digitRound(avg_string, 2).toString() + 'S'
			} else if (avg_speed <= 60) {
				// avg_speed = avg_string.substring(0, avg_index) + 's'
				avg_speed = Math.round(avg_string).toString() + 'S'
			} else if (avg_speed <= 3600) {
				var avg_string1 = avg_speed / 60;
				// var avg_index1 = avg_string1.indexOf('.')
				// avg_speed = avg_string1.substring(0, avg_index1) + 'min'
				avg_speed = digitRound(avg_string1, 1).toString() + 'MIN'
			} else if (avg_speed > 3600) {
				var avg_string2 = avg_speed / 3600;
				// var avg_index2 = avg_string2.indexOf('.')
				// avg_speed = avg_string2.substring(0, avg_index2) + 'h'
				avg_speed = Math.round(avg_string2).toString() + 'H'
			}*/
			avg_speed = digitRound(avg_string, 2).toString() + 'S';
			renderData.avg_speed = avg_speed;
			//group_level
			$.ajax({
				url: URL.baseURL9 + 'common/group_level',
				type: 'get',
				async: false,
				headers: {
					Authorization: token
				},
				data: {
					module_type: 7,
					rate: renderData.rate,
					spend_time: spend_time,
					amount: records.length,
					group_id: groups[currentGroupIndex].id
				},
				success: function(json) {
					renderData.group_level = json.group_level;
					// isRewardCoupon = json.is_reward_coupon;
				}
			})
			renderData.errWords = errWords;
			renderData.records = records;

			///**-------计算最高等级 开始-------**/
			//console.log("计算最高等级");
			//var groupLevelFromList=getGroupLevelFromList(groups[currentGroupIndex].id);
			//var highGroupLevel=renderData.group_level>groupLevelFromList ? renderData.group_level : groupLevelFromList ;
			//renderData.high_group_level=highGroupLevel;
			///**-------计算最高等级 结束-------**/
			/**-------计算最高等级 开始-------**/
			console.log("计算最高等级");
			groups[currentGroupIndex].locked = 0;
			var obj = getGroupLevelFromList(groups[currentGroupIndex].id, groups);
			var groupLevelFromList = obj.groupLevel;
			var leftUnLocked = obj.leftUnLocked;
			var nextUnLocked = obj.nextUnLocked;
			var highGroupLevel = renderData.group_level > groupLevelFromList ? renderData.group_level : groupLevelFromList;
			groups[currentGroupIndex].group_level = highGroupLevel;
			renderData.high_group_level = highGroupLevel;
			// if ((leftUnLocked == true && renderData.high_group_level == 4) || nextUnLocked) {
			if ((leftUnLocked == true && renderData.high_group_level > 2) || nextUnLocked) {
				renderData.canUnLocked = 1;
			} else {
				renderData.canUnLocked = 0;
			}
			/**-------计算最高等级 结束-------**/

			var _afterRender = function() {
				startTime = null;
				if (isRewardCoupon) {
					// showDiv('quanDiv', 'fade')
					isRewardCoupon = false;
				}
			}
			var param = {
				"tmplName": TMPL.t17,
				"tmplData": renderData,
				"afterRender": _afterRender
			}
			renderTemplate(param)
		} else if (type == 2) { //直接进结果页
			startTime = null;
			var _success = function(json) {
				// localErr = json.listen_vocabulary_sentence_results;
				// localErrRecords = json.listen_vocabulary_sentence_results;
				var jsonResult = json.listen_vocabulary_sentence_results;
				for (var i = 0; i < jsonResult.length; i++) {
					if (jsonResult[i].is_correct == 2) {
						localErr.push(jsonResult[i])
						localErrRecords.push(jsonResult[i])
					}
				}
				localIndex = 0;
				localTmp = [];
				var renderData = {};renderData.xm_title=xm_title;
				var rate;
				if (json.listen_vocabulary_sentence_results.length != 0) {
					rate = json.rate;
					renderData.correctCount = rate.split("/")[0];
					renderData.errorCount = rate.split("/")[1] - rate.split("/")[0];
					renderData.rate = renderData.correctCount / rate.split("/")[1] * 100;
				} else {
					renderData.rate = 100;
				}
				renderData.group_sequence_number = currentGroupSequneceNum;
				renderData.errWords = json.listen_vocabulary_sentence_results;
				renderData.avg_speed = json.avg_speed;
				renderData.group_level = json.group_level;

				///**-------计算最高等级 开始-------**/
				//console.log("计算最高等级");
				//var groupLevelFromList=getGroupLevelFromList(groups[currentGroupIndex].id);
				//var highGroupLevel=renderData.group_level>groupLevelFromList ? renderData.group_level : groupLevelFromList ;
				//renderData.high_group_level=highGroupLevel;
				///**-------计算最高等级 结束-------**/
				/**-------计算最高等级 开始-------**/
				console.log("计算最高等级");
				groups[currentGroupIndex].locked = 0;
				var obj = getGroupLevelFromList(groups[currentGroupIndex].id, groups);
				var groupLevelFromList = obj.groupLevel;
				var leftUnLocked = obj.leftUnLocked;
				var nextUnLocked = obj.nextUnLocked;
				var highGroupLevel = renderData.group_level > groupLevelFromList ? renderData.group_level : groupLevelFromList;
				groups[currentGroupIndex].group_level = highGroupLevel;
				renderData.high_group_level = highGroupLevel;
				// if ((leftUnLocked == true && renderData.high_group_level == 4) || nextUnLocked) {
				if ((leftUnLocked == true && renderData.high_group_level > 2) || nextUnLocked) {
					renderData.canUnLocked = 1;
				} else {
					renderData.canUnLocked = 0;
				}
				/**-------计算最高等级 结束-------**/

				var param = {
					"tmplName": TMPL.t18,
					"tmplData": renderData,
					"afterRender": ''
				}
				renderTemplate(param)
			}
			$.ajax({
				url: URL.baseURL9 + "listen_vocabulary_sentence_results/web",
				type: 'get',
				data: {
					group_id: groups[currentGroupIndex].id
				},
				headers: {
					"Authorization": token
				},
				success: _success
			});

		}
	}

	//练词练习结束页，重做错题1
	var errOnlyWord1 = function() {
			groupLevel_fromError = $(this).attr("data-group_level") ? $(this).attr("group_level") : groupLevel_fromError;
			localErr = [];
			localErrRecords = [];
			localTmp = [];
			localIndex = 0;
			$('body,html').animate({
				scrollTop: 0
			}, 100);
		   //20161026重做错题乱序
		    records=shuffle(records);
			for (var i = 0; i < records.length; i++) {
				if (records[i].isError) {
					localErr.push(records[i])
					localErrRecords.push(records[i])
				}
			}
			renderWordErr1()
	}
		//练词练习结束页，重做错题2
	var errOnlyWord2 = function() {
			groupLevel_fromError = $(this).attr("data-group_level") ? $(this).attr("data-group_level") : groupLevel_fromError;
			localErr = [];
			localErrRecords = [];
			localTmp = [];
			localIndex = 0;
			$('body,html').animate({
				scrollTop: 0
			}, 100)
			for (var i = 0; i < records.length; i++) {
				if (records[i].isError) {
					localErr.push(records[i])
					localErrRecords.push(records[i])
				}
			}
			renderWordErr2()
		}

	var errOnlyWord1Result = function() {
		groupLevel_fromError = $(this).attr("data-group_level") ? $(this).attr("data-group_level") : groupLevel_fromError;
		$('body,html').animate({
			scrollTop: 0
		}, 100)
		renderWordErr1Result()
	}
	var errOnlyWord2Result = function() {
		groupLevel_fromError = $(this).attr("data-group_level") ? $(this).attr("data-group_level") : groupLevel_fromError;
		$('body,html').animate({
			scrollTop: 0
		}, 100)
		renderWordErr2Result()
	}
	var errOnlySentence1Result = function() {
		groupLevel_fromError = $(this).attr("data-group_level") ? $(this).attr("data-group_level") : groupLevel_fromError;
		$('body,html').animate({
			scrollTop: 0
		}, 100)
		renderSentenceErr1Result()
	}
	var errOnlySentence2Result = function() {
		groupLevel_fromError = $(this).attr("data-group_level") ? $(this).attr("data-group_level") : groupLevel_fromError;
		$('body,html').animate({
			scrollTop: 0
		}, 100)
		renderSentenceErr2Result()
	}

	//练词错词页面1
	var renderWordErr1 = function() {
			var renderData = {};renderData.xm_title=xm_title;
			renderData.errWord = localErr[localIndex];
		    /*20161026错题题号*/
		    renderData.errWord.question.sequence_number_order=localIndex+1;
		    renderData.errWord.question.group_count=localErr.length;
			renderData.group_sequence_number = currentGroupSequneceNum;
			var _afterRender = function() {
				$($(".audioImg")[0]).attr("src", "../../i/i2.gif")
				$("#audioAudio")[0].pause()
				$("#audioAudio").attr('src', $($(".audioImg")[0]).attr('data-url'))
				$("#audioAudio")[0].addEventListener('ended', function() {
					$($(".audioImg")[0]).attr("src", "../../i/i20.png")
					$($(".table1")[0]).css('display', 'block')
				}, false);
				$("#audioAudio")[0].play()
			}
			var param = {
				"tmplName": TMPL.t19,
				"tmplData": renderData,
				"afterRender": _afterRender
			};
			renderTemplate(param)
		}
		//练词错词页面2
	var renderWordErr2 = function() {
			var renderData = {};renderData.xm_title=xm_title;
			renderData.errWord = localErr[localIndex];
			renderData.group_sequence_number = currentGroupSequneceNum;
			var param = {
				"tmplName": TMPL.t21,
				"tmplData": renderData,
				"afterRender": ""
			}
			renderTemplate(param)
		}

	//练词错词页面1
	var renderWordErr1Result = function() {
			var renderData = {};renderData.xm_title=xm_title;
			renderData.errWord = localErr[localIndex];
			renderData.group_sequence_number = xm_groupId;
		    renderData.errWord.question_sequence_number=localIndex+1;
		    renderData.errWord.group_count = localErr.length;
			var _afterRender = function() {
				$($(".audioImg")[0]).attr("src", "../../i/i2.gif")
				$("#audioAudio")[0].pause()
				$("#audioAudio").attr('src', $($(".audioImg")[0]).attr('data-url'))
				$("#audioAudio")[0].addEventListener('ended', function() {
					$($(".audioImg")[0]).attr("src", "../../i/i20.png")
					$($(".table1")[0]).css('display', 'block')
				}, false);
				$("#audioAudio")[0].play()
			};
		var bodyTmp = $.xml2json(renderData.errWord.content).itemBody;
		var simpleChoices = [];
		for (var i = 0; i < 4; i++) {
			simpleChoices.push(bodyTmp.choiceInteraction.simpleChoice[i].toString());
		}
		renderData.errWord.simple_choice=simpleChoices;
		renderData.errWord.word_url=bodyTmp.choiceInteraction.prompt.word_audio;
		renderData.errWord.sentence_url=bodyTmp.choiceInteraction.prompt.sentence_audio;
			var param = {
				"tmplName": TMPL.t27,
				"tmplData": renderData,
				"afterRender": _afterRender
			}
			renderTemplate(param)
		}
		//练词错词页面2
	var renderWordErr2Result = function() {
			var renderData = {};renderData.xm_title=xm_title;
			renderData.errWord = localErr[localIndex];
			renderData.group_sequence_number = currentGroupSequneceNum;
			var param = {
				"tmplName": TMPL.t29,
				"tmplData": renderData,
				"afterRender": ""
			}
			renderTemplate(param)
		}

	//练词错词页面选择1
	var choiceErrWord1 = function(param) {
			$($('.table1')[0]).css('display', 'none')
			$($('.table1')[1]).css('display', 'block')
			var correctResponse;
			if (localErr[localIndex].question.correctResponse == "A") {
				correctResponse = 0;
			} else if (localErr[localIndex].question.correctResponse == "B") {
				correctResponse = 1;
			} else if (localErr[localIndex].question.correctResponse == "C") {
				correctResponse = 2;
			} else {
				correctResponse = 3;
			}

			$($('.choiceResult')[correctResponse]).addClass('listen-right')
			if (param.choice != correctResponse) {
				localTmp.push(localErr[localIndex])
				$($('.choiceResult')[param.choice]).addClass('listen-mistake')
				localErrRecords[localIndex].isError = true
			} else {
				localErrRecords[localIndex].isError = false
			}

			var showResult = function() {
				if (localIndex == localErr.length - 1) { //做到最后一题，出结果页
					resultErrWord1()
				} else {
					localIndex = localIndex + 1;
					renderWordErr1()
				}
				clearTimeout(timeInterval)
			}
			var timeInterval = setTimeout(showResult, 1000);
		}
		//练词错词页面选择2
	var choiceErrWord2 = function(param) {
			$($('.table1')[0]).css('display', 'none')
			$($('.table1')[1]).css('display', 'block')
			var correctResponse;
			if (localErr[localIndex].question.correctResponse == "A") {
				correctResponse = 0;
			} else if (localErr[localIndex].question.correctResponse == "B") {
				correctResponse = 1;
			} else if (localErr[localIndex].question.correctResponse == "C") {
				correctResponse = 2;
			} else {
				correctResponse = 3;
			}

			$($('.choiceResult')[correctResponse]).addClass('listen-right')
			if (param.choice != correctResponse) {
				localTmp.push(localErr[localIndex])
				$($('.choiceResult')[param.choice]).addClass('listen-mistake')
				localErrRecords[localIndex].isError = true
			} else {
				localErrRecords[localIndex].isError = false
			}

			var showResult = function() {
				if (localIndex == localErr.length - 1) { //做到最后一题，出结果页
					resultErrWord2()
				} else {
					localIndex = localIndex + 1;
					renderWordErr2()
				}
				clearTimeout(timeInterval)
			}
			var timeInterval = setTimeout(showResult, 1000);
		}

	//练词错词页面选择1
	var choiceErrWord1Result = function(param) {
			$($('.table1')[0]).css('display', 'none')
			$($('.table1')[1]).css('display', 'block')

			var correctResponse;
			if (localErr[localIndex].correctAnswer == "A") {
				correctResponse = 0;
			} else if (localErr[localIndex].correctAnswer == "B") {
				correctResponse = 1;
			} else if (localErr[localIndex].correctAnswer == "C") {
				correctResponse = 2;
			} else {
				correctResponse = 3;
			}

			$($('.choiceResult')[correctResponse]).addClass('listen-right')
			if (param.choice != correctResponse) {
				localTmp.push(localErr[localIndex])
				$($('.choiceResult')[param.choice]).addClass('listen-mistake')
				localErrRecords[localIndex].isError = true
			} else {
				localErrRecords[localIndex].isError = false
			}

			var showResult = function() {
				if (localIndex == localErr.length - 1) { //做到最后一题，出结果页
					resultErrWord1Result()
				} else {
					localIndex = localIndex + 1;
					renderWordErr1Result()
				}
				clearTimeout(timeInterval)
			}
			var timeInterval = setTimeout(showResult, 1000);
		}
		//练词错词页面选择2
	var choiceErrWord2Result = function(param) {
			$($('.table1')[0]).css('display', 'none')
			$($('.table1')[1]).css('display', 'block')

			var correctResponse;
			if (localErr[localIndex].answer == "A") {
				correctResponse = 0;
			} else if (localErr[localIndex].answer == "B") {
				correctResponse = 1;
			} else if (localErr[localIndex].answer == "C") {
				correctResponse = 2;
			} else {
				correctResponse = 3;
			}

			$($('.choiceResult')[correctResponse]).addClass('listen-right')
			if (param.choice != correctResponse) {
				localTmp.push(localErr[localIndex])
				$($('.choiceResult')[param.choice]).addClass('listen-mistake')
				localErrRecords[localIndex].isError = true
			} else {
				localErrRecords[localIndex].isError = false
			}

			var showResult = function() {
				if (localIndex == localErr.length - 1) { //做到最后一题，出结果页
					resultErrWord2Result()
				} else {
					localIndex = localIndex + 1;
					renderWordErr2Result()
				}
				clearTimeout(timeInterval)
			}
			var timeInterval = setTimeout(showResult, 1000);
		}

	//练词重练错题结果页1
	var resultErrWord1 = function() {
			var renderData = {};renderData.xm_title=xm_title;
			renderData.correctCount = localErr.length - localTmp.length;
			renderData.errorCount = localTmp.length;
			renderData.group_sequence_number = currentGroupSequneceNum;
			renderData.errWords = localTmp;
			renderData.allErrWords = localErrRecords;
		    renderData.isFromPlan=exerciseApi.isFromPlan;
			//
			//groups[currentGroupIndex].locked = 0;
			//var obj = getGroupLevelFromList(groups[currentGroupIndex].id, groups);
			//var groupLevelFromList = obj.groupLevel;
			//var leftUnLocked = obj.leftUnLocked;
			//var nextUnLocked = obj.nextUnLocked;
			//var highGroupLevel = renderData.group_level > groupLevelFromList ? renderData.group_level : groupLevelFromList;
			//groups[currentGroupIndex].group_level = highGroupLevel;
			//renderData.high_group_level = highGroupLevel;
			//// if ((leftUnLocked == true && renderData.high_group_level == 4) || nextUnLocked) {
			//if ((leftUnLocked == true && renderData.high_group_level > 2) || nextUnLocked) {
			//	renderData.canUnLocked = 1;
			//} else {
			//	renderData.canUnLocked = 0;
			//}
			/**-------计算最高等级 结束-------**/

			localErr = localTmp;
			localErrRecords = localTmp;
			localTmp = [];
			localIndex = 0;
			var param = {
				"tmplName": TMPL.t20,
				"tmplData": renderData,
				"afterRender": ""
			}
			renderTemplate(param)
		}
		//练词重练错题结果页2
	var resultErrWord2 = function() {
			var renderData = {};renderData.xm_title=xm_title;
			renderData.correctCount = localErr.length - localTmp.length;
			renderData.errorCount = localTmp.length;
			renderData.group_sequence_number = currentGroupSequneceNum;
			renderData.errWords = localTmp;
			renderData.allErrWords = localErrRecords;

			///**-------计算最高等级 开始-------**/
			//console.log("计算最高等级---->w--result");
			//var groupLevelFromList=getGroupLevelFromList(groups[currentGroupIndex].id);
			//var highGroupLevel=groupLevel_fromError>groupLevelFromList ? groupLevel_fromError : groupLevelFromList ;
			//renderData.high_group_level=highGroupLevel;
			///**-------计算最高等级 结束-------**/
			/**-------计算最高等级 开始-------**/
			console.log("计算最高等级");
			groups[currentGroupIndex].locked = 0;
			var obj = getGroupLevelFromList(groups[currentGroupIndex].id, groups);
			var groupLevelFromList = obj.groupLevel;
			var leftUnLocked = obj.leftUnLocked;
			var nextUnLocked = obj.nextUnLocked;
			var highGroupLevel = renderData.group_level > groupLevelFromList ? renderData.group_level : groupLevelFromList;
			groups[currentGroupIndex].group_level = highGroupLevel;
			renderData.high_group_level = highGroupLevel;
			// if ((leftUnLocked == true && renderData.high_group_level == 4) || nextUnLocked) {
			if ((leftUnLocked == true && renderData.high_group_level > 2) || nextUnLocked) {
				renderData.canUnLocked = 1;
			} else {
				renderData.canUnLocked = 0;
			}
			/**-------计算最高等级 结束-------**/

			localErr = localTmp;
			localErrRecords = localTmp;
			localTmp = [];
			localIndex = 0;
			var param = {
				"tmplName": TMPL.t22,
				"tmplData": renderData,
				"afterRender": ""
			}
			renderTemplate(param)
		}

	//练词重练错题结果页1
	var resultErrWord1Result = function() {
			var renderData = {};renderData.xm_title=xm_title;
			renderData.correctCount = localErr.length - localTmp.length;
			renderData.errorCount = localTmp.length;
			renderData.group_sequence_number = currentGroupSequneceNum;
			renderData.errWords = localTmp;
			renderData.allErrWords = localErrRecords;
		    renderData.isFromPlan=exerciseApi.isFromPlan;

			///**-------计算最高等级 开始-------**/
			//console.log("计算最高等级---->word2");
			//var groupLevelFromList=getGroupLevelFromList(groups[currentGroupIndex].id);
			//var highGroupLevel=groupLevel_fromError>groupLevelFromList ? groupLevel_fromError : groupLevelFromList ;
			//renderData.high_group_level=highGroupLevel;
			///**-------计算最高等级 结束-------**/
			/**-------计算最高等级 开始-------**/
			//console.log("计算最高等级");
			//groups[currentGroupIndex].locked = 0;
			//var obj = getGroupLevelFromList(groups[currentGroupIndex].id, groups);
			//var groupLevelFromList = obj.groupLevel;
			//var leftUnLocked = obj.leftUnLocked;
			//var nextUnLocked = obj.nextUnLocked;
			//var highGroupLevel = renderData.group_level > groupLevelFromList ? renderData.group_level : groupLevelFromList;
			//groups[currentGroupIndex].group_level = highGroupLevel;
			//renderData.high_group_level = highGroupLevel;
			//// if ((leftUnLocked == true && renderData.high_group_level == 4) || nextUnLocked) {
			//if ((leftUnLocked == true && renderData.high_group_level > 2) || nextUnLocked) {
			//	renderData.canUnLocked = 1;
			//} else {
			//	renderData.canUnLocked = 0;
			//}
			/**-------计算最高等级 结束-------**/

			localErr = localTmp;
			localErrRecords = localTmp;
			localTmp = [];
			localIndex = 0;
			var param = {
				"tmplName": TMPL.t28,
				"tmplData": renderData,
				"afterRender": ""
			}
			renderTemplate(param)
		}
		//练词重练错题结果页2
	var resultErrWord2Result = function() {
			var renderData = {};renderData.xm_title=xm_title;
			renderData.correctCount = localErr.length - localTmp.length;
			renderData.errorCount = localTmp.length;
			renderData.group_sequence_number = currentGroupSequneceNum;
			renderData.errWords = localTmp;
			renderData.allErrWords = localErrRecords;

			///**-------计算最高等级 开始-------**/
			//console.log("计算最高等级---->word2--result");
			//var groupLevelFromList=getGroupLevelFromList(groups[currentGroupIndex].id);
			//var highGroupLevel=groupLevel_fromError>groupLevelFromList ? groupLevel_fromError : groupLevelFromList ;
			//renderData.high_group_level=highGroupLevel;
			///**-------计算最高等级 结束-------**/
			/**-------计算最高等级 开始-------**/
			console.log("计算最高等级");
			groups[currentGroupIndex].locked = 0;
			var obj = getGroupLevelFromList(groups[currentGroupIndex].id, groups);
			var groupLevelFromList = obj.groupLevel;
			var leftUnLocked = obj.leftUnLocked;
			var nextUnLocked = obj.nextUnLocked;
			var highGroupLevel = renderData.group_level > groupLevelFromList ? renderData.group_level : groupLevelFromList;
			groups[currentGroupIndex].group_level = highGroupLevel;
			renderData.high_group_level = highGroupLevel;
			// if ((leftUnLocked == true && renderData.high_group_level == 4) || nextUnLocked) {
			if ((leftUnLocked == true && renderData.high_group_level > 2) || nextUnLocked) {
				renderData.canUnLocked = 1;
			} else {
				renderData.canUnLocked = 0;
			}
			/**-------计算最高等级 结束-------**/

			localErr = localTmp;
			localErrRecords = localTmp;
			localTmp = [];
			localIndex = 0;
			var param = {
				"tmplName": TMPL.t30,
				"tmplData": renderData,
				"afterRender": ""
			}
			renderTemplate(param)
		}

	//练词重做错题中的重做错题1
	var errOnlyErrWord1 = function() {
			$('body,html').animate({
				scrollTop: 0
			}, 100)
		/*错题乱序20161026*/
		   localErr=shuffle(localErr);
			renderWordErr1()
		}
		//练词重做错题中的重做错题2
	var errOnlyErrWord2 = function() {
			$('body,html').animate({
				scrollTop: 0
			}, 100)
			renderWordErr2()
		}

	//练词重做错题中的重做错题1
	var errOnlyErrWord1Result = function() {
			$('body,html').animate({
				scrollTop: 0
			}, 100);
		    localErr=shuffle(localErr);
			renderWordErr1Result()
		}
		//练词重做错题中的重做错题2
	var errOnlyErrWord2Result = function() {
			$('body,html').animate({
				scrollTop: 0
			}, 100)
			renderWordErr2Result()
		}

	var hisListen = function(param) {
		BaseCookie.get()
		token = BaseCookie.getToken()
		if (isEmpty(token)) {
			token = tokenTmp
		}
		currentQuestion = {}
		currentQuestionIndex = 0;
		questions = [];
		questionsCount = 0;
		records = [];
		//errIds = JSON.parse(param.error_question_ids);
		//currentGroupIndex = param.index;
		//currentGroupSequneceNum = param.sequence_number;
		localIndex = 0;
		localErr = [];
		localErrRecords = [];
		localTmp = [];

		if (param.type == 1) {//听音辩词(词)
			resultWord1(2);
		} else if (param.type == 2) {
			var _success = function(json) {
				//清空全局变量
				groups = json.listen_vocabulary_word_groups; //保存当前单元列表
				resultWord2(2)
			}

			$.ajax({
				url: URL.baseURL9 + "listen_vocabulary_word_groups",
				type: 'get',
				data: {
					from: 1,
					listen_type: 2,
					new_version: 1
				},
				headers: {
					"Authorization": token
				},
				success: _success
			});
		} else if (param.type == 3) {//听音辨句
			resultSentence1(2)
		} else {
			var _success = function(json) {
				//清空全局变量
				groups = json.listen_vocabulary_sentence_groups; //保存当前单元列表
				resultSentence2(2)
			}

			$.ajax({
				url: URL.baseURL9 + "listen_vocabulary_sentence_groups",
				type: 'get',
				data: {
					listen_type: 2,
					new_version: 1
				},
				headers: {
					"Authorization": token
				},
				success: _success
			});
		}
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
	var showListen=function(groupId,planDayId,exerciseId,xmTitle,type){//listenWord()
		xm_groupId=groupId;//groupId
		xm_planDayId=planDayId;//提交答案参数
		xm_exerciseId=exerciseId;//提交答案参数
		xm_title=xmTitle;//当前题目标题
		xm_sortType=type;
		//左侧导航active  菜单样式--后期可删除
		$('.sidebar-ul').find('a.sidebarLight').removeClass('sidebarLight');
		$('.sidebar-ul').find('li.sidebarLight').removeClass('sidebarLight');
		$("#side10").addClass('sidebarLight');
		$("#side10").parent().siblings().removeClass('sidebarLight');
		$("#wirte_menu_div li").removeClass('sidebarLight');
		//
		//var param = {
		//	"tmplName": TMPL.t1,
		//	"tmplData": '',
		//	"afterRender": ''
		//}
		//renderTemplate(param);
		var data = {
			'groupId':groupId
		};
		if(type=="2"){
			//练句
			data.type=type;
			sentenceUnitDetail1(data);
		}else{
			wordUnitDetail1(data);
		}

	};
	var gotoHisResult=function(groupId,planDayId,exerciseId,xmTitle,type){//hisListen
		xm_groupId=groupId;
		xm_planDayId=planDayId;
		xm_exerciseId=exerciseId;
		xm_title=xmTitle;
		xm_sortType=type;
		var param={
			'groupId':groupId,
			'type':1
		};
		if(type=="2"){
			//练句
			param={
				'groupId':groupId,
				'type':3
			}
			hisListen(param)
		}else{
			hisListen(param);
		}

	};
	//练句点击某一具体单元1
	var sentenceUnitDetail1 = function(param) {
		$('body,html').animate({
			scrollTop: 0
		}, 100);
		//清空全局变量
		currentQuestion = {}
		currentQuestionIndex = 0;
		questions = [];
		records = [];
		errIds = [];errAry=[];
		errSequenceNum = [];
		currentGroupIndex = 0;
		currentGroupSequneceNum = "";
		localIndex = 0;
		localErr = [];
		localErrRecords = [];
		localTmp = [];
		if (isEmpty(param.rate)) { //rate=null，从第一个题开始
			startTime = new Date();
			currentTestTimeStrListen = null;
			//currentGroupIndex = param.index;
			//currentGroupSequneceNum = param.sequence_number;
			$.ajax({
				url: URL.xiaomaURL + "translation/group/"+param.groupId+"?listen_type=1&type="+xm_sortType,
				type: 'get',
				async: false,
				headers: {
					"Authorization": exerciseApi.xiaomaToken
				},
				success: function(json) {
					json=$.parseJSON(json);
					questions=json.questions;
					questions = shuffle(questions);//乱序
					questionsCount = json.questions.length;
					var paramTmp = {
						sequence_number: 1,
						group_id: param.groupId
					};
					getSentence1(paramTmp)
				}
			});
		} else {
			currentQuestion = {};
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
			// currentGroupIndex = param.sequence_number - 1;
			resultSentence1(2)
		}
	};
	var getSentence1 = function(param) {
		var currentQuestionXml = questions[currentQuestionIndex].content;
		// var _success = function(json) {
		currentQuestion = {};
		//post接口增加sequence_number参数
		currentQuestion.sequence_number_order = questions[currentQuestionIndex].sequence_number;
		currentQuestion.correctResponse = $.xml2json(currentQuestionXml).responseDeclaration.correctResponse.value;
		var bodyTmp = $.xml2json(currentQuestionXml).itemBody;
		currentQuestion.id = bodyTmp.id;
		currentQuestion.sequence_number = bodyTmp.sequence_number;
		// currentQuestion.word_audio = bodyTmp.choiceInteraction.prompt.word_audio;
		currentQuestion.sentence_audio = bodyTmp.choiceInteraction.prompt;
		var simpleChoices = [];
		if (currentQuestion.correctResponse == "A") {
			currentQuestion.correctResponseSentence = bodyTmp.choiceInteraction.simpleChoice[0].toString()
		} else if (currentQuestion.correctResponse == "B") {
			currentQuestion.correctResponseSentence = bodyTmp.choiceInteraction.simpleChoice[1].toString()
		} else if (currentQuestion.correctResponse == "C") {
			currentQuestion.correctResponseSentence = bodyTmp.choiceInteraction.simpleChoice[2].toString()
		} else {
			currentQuestion.correctResponseSentence = bodyTmp.choiceInteraction.simpleChoice[3].toString()
		}
		for (var i = 0; i < 4; i++) {
			simpleChoices.push(bodyTmp.choiceInteraction.simpleChoice[i].toString());
		}
		currentQuestion.simpleChoices = simpleChoices;
		currentQuestion.group_count = questionsCount;

		var renderData = {};renderData.xm_title=xm_title;
		renderData.content = currentQuestion;
		renderData.group_count = questionsCount;
		// renderData.sequence_number = currentGroupIndex + 1;
		renderData.group_sequence_number = currentGroupSequneceNum;
		renderData.current_count = currentQuestionIndex + 1;
		if (currentTestTimeStrListen) {
			renderData.currentTestTimeStrListen = currentTestTimeStrListen;
		}
		if ($(".listen-question").length) {
			var _afterRender1 = function() {
				//startTimerListen();
				$($(".audioImg")[0]).attr("src", "../../i/i2.gif")
				$("#audioAudio")[0].pause()
				$("#audioAudio").attr('src', $($(".audioImg")[0]).attr('data-url'))
				$("#audioAudio")[0].addEventListener('ended', function() {
					$($(".audioImg")[0]).attr("src", "../../i/i20.png")
					$($(".table1")[0]).css('display', 'block')
				}, false);
				$("#audioAudio")[0].play()
			}
			var param = {
				"wrap": $(".listen-question"),
				"tmplName": TMPL.t37,
				"tmplData": renderData,
				"afterRender": _afterRender1
			}
			renderTemplate(param)
		} else {
			var _afterRender = function() {
				var _afterRender1 = function() {
					durationTime=0;startTimerListen();
					$($(".audioImg")[0]).attr("src", "../../i/i2.gif")
					$("#audioAudio")[0].pause()
					$("#audioAudio").attr('src', $($(".audioImg")[0]).attr('data-url'))
					$("#audioAudio")[0].addEventListener('ended', function() {
						$($(".audioImg")[0]).attr("src", "../../i/i20.png")
						$($(".table1")[0]).css('display', 'block')
					}, false);
					$("#audioAudio")[0].play()
				}
				var param = {
					"wrap": $(".listen-question"),
					"tmplName": TMPL.t37,
					"tmplData": renderData,
					"afterRender": _afterRender1
				}
				renderTemplate(param)
			}
			var param = {
				"tmplName": TMPL.t9,
				"tmplData": renderData,
				"afterRender": _afterRender
			}
			renderTemplate(param)
		}
	};
	//听句选择1
	var choiceSentence1 = function(param) {
		$($('.table1')[0]).css('display', 'none');
		$($('.table1')[1]).css('display', 'block');
		var correctResponse;
		if (currentQuestion.correctResponse == "A") {
			correctResponse = 0;
		} else if (currentQuestion.correctResponse == "B") {
			correctResponse = 1;
		} else if (currentQuestion.correctResponse == "C") {
			correctResponse = 2;
		} else {
			correctResponse = 3;
		}

		$($('.choiceResult')[correctResponse]).addClass('listen-right');
		var record = {};
		record.question = currentQuestion;
		record.question.sequence_number_order=currentQuestionIndex+1;//20161026
		if (param.choice != correctResponse) {//做错的题目
			record.isError = true;
			var errObj={};
			errObj.answer=param.choice==0?"A":param.choice==1?"B":param.choice==2?"C":"D";
			errObj.is_correct=2;
			errObj.question_id=currentQuestion.id;
			errObj.sequence_number=currentQuestion.sequence_number;
			errIds.push(errObj);//错题集合
			errSequenceNum.push(currentQuestion.sequence_number_order);
			$($('.choiceResult')[param.choice]).addClass('listen-mistake')
		} else {//作对的
			record.isError = false;
		}
		records.push(record);
		errAry.push(currentQuestion.id);//做题顺序20161019

		var showResult = function() {
			if (currentQuestionIndex == currentQuestion.group_count - 1) { //做到最后一题，出结果页
				endTime = new Date();
				var spend_time = Math.round(durationTime);
				var recordsLength = records.length;
				if (records[recordsLength - 2].question.id == records[recordsLength - 1].question.id) {
					records.pop();
					errIds.pop();
				}
				submitSentence1(spend_time);
				/*if (isEmpty(exerciseApi.xiaomaToken)) { //用户没登陆，先弹框让其登录
					clearTimerListen(); //弹出登录层暂停时间
					$('#dialogLogin').modal({
						backdrop: 'static'
					})
					$('#dialogLogin').bind('hidden.bs.modal', function(e) {
						BaseCookie.get()
						if (!isEmpty(BaseCookie.getToken())) {
							token = BaseCookie.getToken()
							submitSentence1(spend_time)
						} else {
							$('#sentence1SubmitDiv').css('display', 'block')
							startTimerListen();
						}
					})
				} else { //出结果页
					submitSentence1(spend_time)
				}*/
			} else {
				currentQuestionIndex = currentQuestionIndex + 1;
				var paramTmp = {
					sequence_number: currentQuestionIndex + 1
					//group_id: groups[currentGroupIndex].id
				};
				getSentence1(paramTmp)
			}
			clearTimeout(timeInterval)
		};
		var timeInterval = setTimeout(showResult, 1000);
	};
	//练句结果提交1
	var submitSentence1 = function(param) {
		var spend_time = param;
		var correctCount = currentQuestion.group_count - errIds.length;
		var rate = correctCount + "/" + currentQuestion.group_count;

		var digitRound = function(digit, length) {
			length = length ? parseInt(length) : 0;
			if (length <= 0) return Math.round(digit);
			digit = Math.round(digit * Math.pow(10, length)) / Math.pow(10, length);
			return digit;
		};
		var rateTmp = digitRound(correctCount / currentQuestion.group_count * 100, 2);
		var _success = function(json) {
			json= $.parseJSON(json);
			var groupLevel=json.group_level;
			var avgSpeed=json.avg_speed;
			exerciseApi.updateListItem();//已提交题目显示绿色对勾(已做过)
			resultSentence1(1, rate,groupLevel,avgSpeed);//type=1  做题来的，直接从records和errids取
		}
		//var date=new Date($.ajax({async: false}).getResponseHeader("Date"));
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
				"type":"2",
				"wrong_results":errIds,
				"planDayId":xm_planDayId,
				"exerciseId":xm_exerciseId,
				"startTime":xm_startTime,
				"endTime":xm_endTime
			}),
			headers: {
				"Authorization": exerciseApi.xiaomaToken
			},
			success: _success
		});
	};
	//练句结果页1
	var resultSentence1 = function(type, rate,level,speed) {
		var renderData = {}
		if (type == 1) { //做题来的，直接从records和errids取
			renderData.group_sequence_number = currentGroupSequneceNum;
			renderData.correctCount = rate.split("/")[0];
			renderData.errorCount = rate.split("/")[1] - rate.split("/")[0];
			renderData.rate = renderData.correctCount / records.length * 100;
			var errWords = [];
			for (var i = 0; i < records.length; i++) {
				if (records[i].isError) {
					errWords.push(records[i])
				}
			}
			//本地计算平均速度公式中
			var spend_time = Math.round(durationTime);
			// var spend_time = Math.round((endTime.getTime() - startTime.getTime()) / 1000);
			//var avg_speed = spend_time / records.length;
			var avg_speed = speed;
			var avg_string = avg_speed.toString();
			var avg_index = avg_string.indexOf('.');
			// var Digit = {};
			var digitRound = function(digit, length) {
				length = length ? parseInt(length) : 0;
				if (length <= 0) return Math.round(digit);
				digit = Math.round(digit * Math.pow(10, length)) / Math.pow(10, length);
				return digit;
			};
			var rateTmp = renderData.correctCount / records.length;
			renderData.rate = digitRound(rateTmp * 100, 2);
			/*if (avg_speed <= 10 && avg_speed > 0) {
				// avg_speed = avg_string.substring(0, avg_index + 3) + 's'
				avg_speed = digitRound(avg_string, 2).toString() + 'S'
			} else if (avg_speed <= 60) {
				// avg_speed = avg_string.substring(0, avg_index) + 's'
				avg_speed = Math.round(avg_string).toString() + 'S'
			} else if (avg_speed <= 3600) {
				var avg_string1 = avg_speed / 60;
				// var avg_index1 = avg_string1.indexOf('.')
				// avg_speed = avg_string1.substring(0, avg_index1) + 'min'
				avg_speed = digitRound(avg_string1, 1).toString() + 'MIN'
			} else if (avg_speed > 3600) {
				var avg_string2 = avg_speed / 3600;
				// var avg_index2 = avg_string2.indexOf('.')
				// avg_speed = avg_string2.substring(0, avg_index2) + 'h'
				avg_speed = Math.round(avg_string2).toString() + 'H'
			}*/
			avg_speed = digitRound(avg_string, 2).toString() + 'S';

			renderData.avg_speed = avg_speed;
			renderData.group_level=level;
            /*答案序号重新排序*/
			/*records=records.sort(function(a,b){
				return a.question.sequence_number_order- b.question.sequence_number_order;
			});*/
			renderData.errWords = errWords;
			renderData.records = records;
			renderData.isFromPlan=exerciseApi.isFromPlan;


			var _afterRender = function() {
				startTime = null;
				if (isRewardCoupon) {
					// showDiv('quanDiv', 'fade')
					isRewardCoupon = false;
				}
			}
			var param = {
				"tmplName": TMPL.t15,
				"tmplData": renderData,
				"afterRender": _afterRender
			}
			renderTemplate(param)
		} else if (type == 2) { //直接进结果页
			startTime = null;
			var _success = function(json) {
				// localErr = json.listen_vocabulary_sentence_results;
				// localErrRecords = json.listen_vocabulary_sentence_results;
				json= $.parseJSON(json);
				var jsonResult = json.questions;
				/*for (var i = 0; i < jsonResult.length; i++) {
					if (jsonResult[i].is_correct == 2) {
						localErr.push(jsonResult[i])
						localErrRecords.push(jsonResult[i])
					}
				}*/
				var jsonResultTmp=json.results.wrong_results;
				$.each(jsonResultTmp,function(index,value){
					$.each(json.questions,function(index2,value2){
						if(value.question_id==value2.id){
							value.correctAnswer=$.xml2json(value2.content).responseDeclaration.correctResponse.value;
							value.group_count=json.questions.length;
							value.question_sequence_number=value2.sequence_number;
							localErr.push(value);
							localErrRecords.push(value);
							return (function(){;})();
						}

					})
				});
				localIndex = 0;
				localTmp = [];
				var renderData = {};renderData.xm_title=xm_title;
				var rate;
				//questions是所有的题目
				//wrong_results错误的题目
				$.each(json.results.wrong_results,function(index,value){
					$.each(json.questions,function(index2,value2){
						if(value.question_id==value2.id){
							value2.is_correct=2;
						}
					})
				});
				/*题目排序 保证和做题的顺序是一样的20161027*/
				var sortQuestion=[];
				$.each(json.results.question_numbers,function(index,value){
					$.each(json.questions,function(index2,value2){
						if(value==value2.id){
							sortQuestion.push(value2);
						}
					})
				});
				//if (json.listen_vocabulary_sentence_results.length != 0) {
				if (json.questions.length!= 0) {
					rate = json.results.rate;
					/*renderData.correctCount = rate.split("/")[0];
					renderData.errorCount = rate.split("/")[1] - rate.split("/")[0];
					renderData.rate = renderData.correctCount / rate.split("/")[1] * 100;*/
					renderData.rate=rate;
				} else {
					renderData.rate = rate;
				}
				//renderData.group_sequence_number = currentGroupSequneceNum;
				renderData.group_sequence_number = json.sequence_number;
				//renderData.errWords = json.listen_vocabulary_word_results;
				renderData.errWords = sortQuestion;
				sortQuestion=[];
				renderData.avg_speed = json.results.avg_speed+"S";
				renderData.group_level = json.results.point_level;
				renderData.isFromPlan=exerciseApi.isFromPlan;

                var _afterRender=function(){
					/*20161026乱序*/
					localErr=shuffle(localErr);
				}
				var param = {
					"tmplName": TMPL.t16,
					"tmplData": renderData,
					"afterRender":_afterRender
				}
				renderTemplate(param)
			}
			$.ajax({
				url: URL.xiaomaURL + "translation/group/"+xm_groupId+"?listen_type=1&type="+xm_sortType,
				type: 'get',
				headers: {
					"Authorization": exerciseApi.xiaomaToken
				},
				success: _success
			});

		}
	};
	//练句练习结束页，重做错题1
	var errOnlySentence1 = function() {
		groupLevel_fromError = $(this).attr("data-group_level") ? $(this).attr("data-group_level") : groupLevel_fromError;
		localErr = [];
		localErrRecords = [];
		localTmp = [];
		localIndex = 0;
		$('body,html').animate({
			scrollTop: 0
		}, 100);
		//20161026重做错题乱序
		records=shuffle(records);
		for (var i = 0; i < records.length; i++) {
			if (records[i].isError) {
				localErr.push(records[i]);
				localErrRecords.push(records[i])
			}
		}
		renderSentenceErr1()

	};
	//练句错词页面1
	var renderSentenceErr1 = function() {
		var renderData = {};renderData.xm_title=xm_title;
		renderData.errWord = localErr[localIndex];
		/*20161026错题题号*/
		renderData.errWord.question.sequence_number=localIndex+1;
		renderData.errWord.question.group_count=localErr.length;
		renderData.group_sequence_number = currentGroupSequneceNum;
		var _afterRender = function() {
			$($(".audioImg")[0]).attr("src", "../../i/i2.gif");
			$("#audioAudio")[0].pause();
			$("#audioAudio").attr('src', $($(".audioImg")[0]).attr('data-url'));
			$("#audioAudio")[0].addEventListener('ended', function() {
				$($(".audioImg")[0]).attr("src", "../../i/i20.png");
				$($(".table1")[0]).css('display', 'block')
			}, false);
			$("#audioAudio")[0].play()
		}
		var param = {
			"tmplName": TMPL.t23,
			"tmplData": renderData,
			"afterRender": _afterRender
		}
		renderTemplate(param)
	};
	//练句错词页面1
	var renderSentenceErr1Result = function() {
		var renderData = {};renderData.xm_title=xm_title;
		renderData.errWord = localErr[localIndex];
		//20161026
		renderData.errWord.question_sequence_number=localIndex+1;
		renderData.errWord.group_count = localErr.length;
		renderData.group_sequence_number = xm_groupId;

		var _afterRender = function() {
			$($(".audioImg")[0]).attr("src", "../../i/i2.gif");
			$("#audioAudio")[0].pause();
			$("#audioAudio").attr('src', $($(".audioImg")[0]).attr('data-url'));
			$("#audioAudio")[0].addEventListener('ended', function() {
				$($(".audioImg")[0]).attr("src", "../../i/i20.png");
				$($(".table1")[0]).css('display', 'block')
			}, false);
			$("#audioAudio")[0].play()
		};
		var bodyTmp = $.xml2json(renderData.errWord.content).itemBody;
		var simpleChoices = [];
		for (var i = 0; i < 4; i++) {
			simpleChoices.push(bodyTmp.choiceInteraction.simpleChoice[i].toString());
		}
		renderData.errWord.simple_choice=simpleChoices;
		//renderData.errWord.word_url=bodyTmp.choiceInteraction.prompt.word_audio;
		renderData.errWord.sentence_url=bodyTmp.choiceInteraction.prompt;
		var param = {
			"tmplName": TMPL.t31,
			"tmplData": renderData,
			"afterRender": _afterRender
		};
		renderTemplate(param)
	};
	//练句错词页面选择1
	var choiceErrSentence1Result = function(param) {
		$($('.table1')[0]).css('display', 'none');
		$($('.table1')[1]).css('display', 'block');

		var correctResponse;
		if (localErr[localIndex].correctAnswer == "A") {
			correctResponse = 0;
		} else if (localErr[localIndex].correctAnswer == "B") {
			correctResponse = 1;
		} else if (localErr[localIndex].correctAnswer == "C") {
			correctResponse = 2;
		} else {
			correctResponse = 3;
		}
		$($('.choiceResult')[correctResponse]).addClass('listen-right');
		if (param.choice != correctResponse) {
			localTmp.push(localErr[localIndex]);
			$($('.choiceResult')[param.choice]).addClass('listen-mistake');
			localErrRecords[localIndex].isError = true
		} else {
			localErrRecords[localIndex].isError = false
		}
		localErrRecords[localIndex].question_sequence_number=(localIndex+1);

		var showResult = function() {
			if (localIndex == localErr.length - 1) { //做到最后一题，出结果页
				console.log(localErrRecords);resultErrSentence1Result()
			} else {
				localIndex = localIndex + 1;
				renderSentenceErr1Result()
			}
			clearTimeout(timeInterval)
		}
		var timeInterval = setTimeout(showResult, 1000);
	};
	//练句重练错题结果页1
	var resultErrSentence1Result = function() {
		console.log(localErrRecords);
		var renderData = {};renderData.xm_title=xm_title;
		renderData.correctCount = localErr.length - localTmp.length;
		renderData.errorCount = localTmp.length;
		renderData.group_sequence_number = currentGroupSequneceNum;
		renderData.errWords = localTmp;
		/*localErrRecords=localErrRecords.sort(function(a,b){
			return a.question_sequence_number- b.question_sequence_number;
		});*/
		renderData.allErrWords = localErrRecords;
		renderData.isFromPlan=exerciseApi.isFromPlan;


		localErr = localTmp;
		localErrRecords = localTmp;
		localTmp = [];
		localIndex = 0;
		var param = {
			"tmplName": TMPL.t32,
			"tmplData": renderData,
			"afterRender": ""
		}
		renderTemplate(param)
	};
	//练句重做错题中的重做错题1
	var errOnlyErrSentence1Result = function() {
		$('body,html').animate({
			scrollTop: 0
		}, 100);
		localErr=shuffle(localErr);
		renderSentenceErr1Result()
	};
	//练句错词页面选择1
	var choiceErrSentence1 = function(param) {
		$($('.table1')[0]).css('display', 'none');
		$($('.table1')[1]).css('display', 'block');
		var correctResponse;
		if (localErr[localIndex].question.correctResponse == "A") {
			correctResponse = 0;
		} else if (localErr[localIndex].question.correctResponse == "B") {
			correctResponse = 1;
		} else if (localErr[localIndex].question.correctResponse == "C") {
			correctResponse = 2;
		} else {
			correctResponse = 3;
		}

		$($('.choiceResult')[correctResponse]).addClass('listen-right');
		if (param.choice != correctResponse) {
			localTmp.push(localErr[localIndex]);
			$($('.choiceResult')[param.choice]).addClass('listen-mistake');
			localErrRecords[localIndex].isError = true
		} else {
			localErrRecords[localIndex].isError = false
		}

		var showResult = function() {
			if (localIndex == localErr.length - 1) { //做到最后一题，出结果页
				resultErrSentence1()
			} else {
				localIndex = localIndex + 1;
				renderSentenceErr1()
			}
			clearTimeout(timeInterval)
		}
		var timeInterval = setTimeout(showResult, 1000);
	};
	//练句重练错题结果页1
	var resultErrSentence1 = function() {
		var renderData = {};renderData.xm_title=xm_title;
		renderData.correctCount = localErr.length - localTmp.length;
		renderData.errorCount = localTmp.length;
		renderData.group_sequence_number = currentGroupSequneceNum;
		renderData.errWords = localTmp;
		renderData.allErrWords = localErrRecords;
		renderData.isFromPlan=exerciseApi.isFromPlan;


		localErr = localTmp;
		localErrRecords = localTmp;
		localTmp = [];
		localIndex = 0;
		var param = {
			"tmplName": TMPL.t24,
			"tmplData": renderData,
			"afterRender": ""
		}
		renderTemplate(param)
	};
	//练句重做错题中的重做错题1
	var errOnlyErrSentence1 = function() {
		$('body,html').animate({
			scrollTop: 0
		}, 100);
		/*错题乱序*/
		localErr=shuffle(localErr);
		renderSentenceErr1()
	}
	function getTime(){ 
    	return new Date($.ajax({url: window.xiaoma.basePath+"/gettime",async: false}).getResponseHeader("Date"));
    }

	return {
		init: init,
		hisListen: hisListen,
		showListen:showListen,
		gotoHisResult:gotoHisResult
	}
})