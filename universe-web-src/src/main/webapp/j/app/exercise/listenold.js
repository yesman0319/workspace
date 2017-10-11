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
		records,
		errIds,
		groups,
		currentGroupIndex = 0, //记录当前groups数组位置
		currentGroupSequneceNum = "", //记录当前group的sequence_number
		localIndex = 0, //本地含所有题对错index
		localErr = [], //本地含所有题对错
		localErrRecords = [], //本地含所有
		localTmp = [],
		local;

	var startTime, //用于积分时间计算
		endTime;
	var currentTestTimeStrListen, //当前时间字符串，用于下一题同步显示时间
		testTimerIDListen; //计时器ID

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
		$(document).on('trigger_side9', '#side9', menuToggleListen);
		$(document).on('trigger_side10', '#side10', listenWord); //练词
		$(document).on('trigger_side11', '#side11', listenSentence) //练句
		$(document).on('click', '#side9', menuToggleListen);
		$(document).on('click', '#side10', listenWord); //练词
		$(document).on('click', '#side11', listenSentence) //练句

		$(document).on('click', '#listenWordTab1', listenWordUnit1);
		$(document).on('click', '#listenWordTab2', listenWordUnit2);
		$(document).on('click', '#listenSentenceTab1', listenSentenceUnit1);
		$(document).on('click', '#listenSentenceTab2', listenSentenceUnit2);

		$(document).on('click', '.wordUnitDetail1', function(e) {
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
			var data = {
				'id': $(e.target).attr('data-id'),
				'sequence_number': $(e.target).attr('data-sequenceNumber'),
				'index': $(e.target).attr('data-index'),
				'rate': null,
				'error_question_ids': $(e.target).attr('data-errorQuestionIds')
			};
			wordUnitDetail2(data)
		})
		$(document).on('click', '.sentenceUnitDetail1', function(e) {
			var data = {
				'id': $(e.target).attr('data-id'),
				'sequence_number': $(e.target).attr('data-sequenceNumber'),
				'index': $(e.target).attr('data-index'),
				'rate': $(e.target).attr('data-rate'),
				'error_question_ids': $(e.target).attr('data-errorQuestionIds')
			};
			sentenceUnitDetail1(data)
		})
		$(document).on('click', '.sentenceUnitDetailSentence1', function(e) {
			var data = {
				'id': $(e.target).attr('data-id'),
				'sequence_number': $(e.target).attr('data-sequenceNumber'),
				'index': $(e.target).attr('data-index'),
				'rate': null,
				'error_question_ids': $(e.target).attr('data-errorQuestionIds')
			};
			sentenceUnitDetail1(data)
		})
		$(document).on('click', '.sentenceUnitDetail2', function(e) {
			var data = {
				'id': $(e.target).attr('data-id'),
				'sequence_number': $(e.target).attr('data-sequenceNumber'),
				'index': $(e.target).attr('data-index'),
				'rate': $(e.target).attr('data-rate'),
				'error_question_ids': $(e.target).attr('data-errorQuestionIds')
			};
			sentenceUnitDetail2(data)
		})
		$(document).on('click', '.sentenceUnitDetailSentence2', function(e) {
			var data = {
				'id': $(e.target).attr('data-id'),
				'sequence_number': $(e.target).attr('data-sequenceNumber'),
				'index': $(e.target).attr('data-index'),
				'rate': null,
				'error_question_ids': $(e.target).attr('data-errorQuestionIds')
			};
			sentenceUnitDetail2(data)
		})

		$(document).on('click', '#nextUnitWord1', function(e) { //练习下一单元
			currentQuestion = {}; //一个题提取的时候清空
			currentQuestionIndex = 0;
			records = [];
			errIds = [];
			localIndex = 0;
			localErr = [];
			localErrRecords = [];
			localTmp = [];
			currentGroupIndex = parseInt(currentGroupIndex) + 1;
			if (currentGroupIndex == groups.length) {
				alert('已是最后一单元')
				$('body,html').animate({
					scrollTop: 0
				}, 100)
				var param = {
					"tmplName": TMPL.t1,
					"tmplData": '',
					"afterRender": ''
				}
				renderTemplate(param)
				listenWordUnit1()
			} else {
				var data = {
					'id': groups[currentGroupIndex].id,
					'sequence_number': groups[currentGroupIndex].sequence_number,
					'index': currentGroupIndex,
					'rate': groups[currentGroupIndex].rate,
					'error_question_ids': groups[currentGroupIndex].error_question_ids
				};
				wordUnitDetail1(data)
			}
		});
		$(document).on('click', '#nextUnitWord2', function(e) {
			currentQuestion = {}; //一个题提取的时候清空
			currentQuestionIndex = 0;
			records = [];
			errIds = [];
			localIndex = 0;
			localErr = [];
			localErrRecords = [];
			localTmp = [];
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
		$(document).on('click', '#nextUnitSentence1', function(e) {
			currentQuestion = {}; //一个题提取的时候清空
			currentQuestionIndex = 0;
			records = [];
			errIds = [];
			localIndex = 0;
			localErr = [];
			localErrRecords = [];
			localTmp = [];
			currentGroupIndex = parseInt(currentGroupIndex) + 1;
			if (currentGroupIndex == groups.length) {
				alert('已是最后一单元')
				$('body,html').animate({
					scrollTop: 0
				}, 100)
				var param = {
					"tmplName": TMPL.t4,
					"tmplData": '',
					"afterRender": ''
				}
				renderTemplate(param)
				listenSentenceUnit1()
			} else {
				var data = {
					'id': groups[currentGroupIndex].id,
					'sequence_number': groups[currentGroupIndex].sequence_number,
					'index': currentGroupIndex,
					'rate': groups[currentGroupIndex].rate,
					'error_question_ids': groups[currentGroupIndex].error_question_ids
				};
				sentenceUnitDetail1(data)
			}
		});
		$(document).on('click', '#nextUnitSentence2', function(e) {
			currentQuestion = {}; //一个题提取的时候清空
			currentQuestionIndex = 0;
			records = [];
			errIds = [];
			localIndex = 0;
			localErr = [];
			localErrRecords = [];
			localTmp = [];
			currentGroupIndex = parseInt(currentGroupIndex) + 1;
			if (currentGroupIndex == groups.length) {
				alert('已是最后一单元')
				$('body,html').animate({
					scrollTop: 0
				}, 100)
				var _afterRender = function() {
					$("#listenSentenceTab2").click()
				}
				var param = {
					"tmplName": TMPL.t4,
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
				sentenceUnitDetail2(data)
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
		$(document).on('click', '#sentenceUnit1', function(e) {
			var param = {
				"tmplName": TMPL.t4,
				"tmplData": '',
				"afterRender": ''
			}
			renderTemplate(param)
			listenSentenceUnit1()
		})
		$(document).on('click', '#sentenceUnit2', function(e) {
			var _afterRender = function() {
				$("#listenSentenceTab2").click()
			}
			var param = {
				"tmplName": TMPL.t4,
				"tmplData": '',
				"afterRender": _afterRender
			}
			renderTemplate(param)
		})

		$(document).on('click', '.choiceWord1', function(e) {
			$("#audioAudio")[0].pause()
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
		$(document).on('click', '.choiceSentence1', function(e) {
			$("#audioAudio")[0].pause()
			$(".audioImg").attr("src", "../../i/i20.png")
			var data = {
				'choice': $(e.target).attr('data-choice')
			};
			choiceSentence1(data)
		})
		$(document).on('click', '.choiceSentence2', function(e) {
			$("#audioAudio")[0].pause()
			$(".audioImg").attr("src", "../../i/i20.png")
			var data = {
				'choice': $(e.target).attr('data-choice')
			};
			choiceSentence2(data)
		})

		$(document).on('click', '#againWord1', function(e) {
			//清空全局变量
			currentQuestion = {}
			currentQuestionIndex = 0;
			records = [];
			errIds = [];
			// groups = json.listen_vocabulary_word_groups; //保存当前单元列表
			// currentGroupIndex = 0;
			// currentGroupSequneceNum = "";
			var param = {}
			param.rate = null;
			param.index = currentGroupIndex;
			param.sequence_number = currentGroupSequneceNum;
			param.id = groups[currentGroupIndex].id;
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
		$(document).on('click', '#againSentence1', function(e) {
			//清空全局变量
			currentQuestion = {}
			currentQuestionIndex = 0;
			records = [];
			errIds = [];
			// groups = json.listen_vocabulary_word_groups; //保存当前单元列表
			// currentGroupIndex = 0;
			// currentGroupSequneceNum = "";
			var param = {}
			param.rate = null;
			param.index = currentGroupIndex;
			param.sequence_number = currentGroupSequneceNum;
			param.id = groups[currentGroupIndex].id;
			sentenceUnitDetail1(param)
			$('body,html').animate({
				scrollTop: 0
			}, 100)
		})
		$(document).on('click', '#againSentence2', function(e) {
			//清空全局变量
			currentQuestion = {}
			currentQuestionIndex = 0;
			records = [];
			errIds = [];
			// groups = json.listen_vocabulary_word_groups; //保存当前单元列表
			// currentGroupIndex = 0;
			// currentGroupSequneceNum = "";
			var param = {}
			param.rate = null;
			param.index = currentGroupIndex;
			param.sequence_number = currentGroupSequneceNum;
			param.id = groups[currentGroupIndex].id;
			sentenceUnitDetail2(param)
			$('body,html').animate({
				scrollTop: 0
			}, 100)
		})

		$(document).on('click', '#errOnlyWord1', errOnlyWord1); //练词练习结束页重做错题
		$(document).on('click', '#errOnlyWord2', errOnlyWord2); //练词练习结束页重做错题
		$(document).on('click', '#errOnlySentence1', errOnlySentence1); //练词练习结束页重做错题
		$(document).on('click', '#errOnlySentence2', errOnlySentence2); //练词练习结束页重做错题

		$(document).on('click', '#errOnlyWord1Result', errOnlyWord1Result); //练词练习结束页重做错题
		$(document).on('click', '#errOnlyWord2Result', errOnlyWord2Result); //练词练习结束页重做错题
		$(document).on('click', '#errOnlySentence1Result', errOnlySentence1Result); //练词练习结束页重做错题
		$(document).on('click', '#errOnlySentence2Result', errOnlySentence2Result); //练词练习结束页重做错题

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
		$(document).on('click', '.choiceErrSentence1', function(e) {
			$("#audioAudio")[0].pause()
			$(".audioImg").attr("src", "../../i/i20.png")
			var data = {
				'choice': $(e.target).attr('data-choice')
			};
			choiceErrSentence1(data)
		});
		$(document).on('click', '.choiceErrSentence2', function(e) {
			$("#audioAudio")[0].pause()
			$(".audioImg").attr("src", "../../i/i20.png")
			var data = {
				'choice': $(e.target).attr('data-choice')
			};
			choiceErrSentence2(data)
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
		$(document).on('click', '.choiceErrSentence1Result', function(e) {
			$("#audioAudio")[0].pause()
			$(".audioImg").attr("src", "../../i/i20.png")
			var data = {
				'choice': $(e.target).attr('data-choice')
			};
			choiceErrSentence1Result(data)
		});
		$(document).on('click', '.choiceErrSentence2Result', function(e) {
			$("#audioAudio")[0].pause()
			$(".audioImg").attr("src", "../../i/i20.png")
			var data = {
				'choice': $(e.target).attr('data-choice')
			};
			choiceErrSentence2Result(data)
		});

		$(document).on('click', '#errOnlyErrWord1', errOnlyErrWord1);
		$(document).on('click', '#errOnlyErrWord2', errOnlyErrWord2);
		$(document).on('click', '#errOnlyErrSentence1', errOnlyErrSentence1);
		$(document).on('click', '#errOnlyErrSentence2', errOnlyErrSentence2);

		$(document).on('click', '#errOnlyErrWord1Result', errOnlyErrWord1Result);
		$(document).on('click', '#errOnlyErrWord2Result', errOnlyErrWord2Result);
		$(document).on('click', '#errOnlyErrSentence1Result', errOnlyErrSentence1Result);
		$(document).on('click', '#errOnlyErrSentence2Result', errOnlyErrSentence2Result);

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
	}

	var startTimerListen = function() {
		var fn = function() {
			if ($("#testTimer").length <= 0) {
				console.log("not find target");
				clearTimerListen();
			}
			if (startTime) {
				var checkTime = function(i) {
					if (i < 10) {
						i = "0" + i;
					}
					return i;
				}
				var ts = (new Date()) - startTime; //计算剩余的毫秒数
				var dd = parseInt(ts / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
				var hh = parseInt(ts / 1000 / 60 / 60 % 24, 10); //计算剩余的小时数
				var mm = parseInt(ts / 1000 / 60 % 60, 10); //计算剩余的分钟数
				var ss = parseInt(ts / 1000 % 60, 10); //计算剩余的秒数
				dd = checkTime(dd);
				hh = checkTime(hh);
				mm = checkTime(mm);
				ss = checkTime(ss);
				$("#testTimer").html(hh + ":" + mm + ":" + ss);
				currentTestTimeStrListen = hh + ":" + mm + ":" + ss;
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

	//练句
	var listenSentence = function(listenType) {
		BaseCookie.get()
		token = BaseCookie.getToken()
		if ("" == token || null == token) {
			token = tokenTmp
		}
		$('.sidebar-ul').find('a.sidebarLight').removeClass('sidebarLight');
		$('.sidebar-ul').find('li.sidebarLight').removeClass('sidebarLight');
		$("#side11").addClass('sidebarLight');
		$("#side11").parent().siblings().removeClass('sidebarLight');
		$("#wirte_menu_div li").removeClass('sidebarLight');

		var param = {
			"tmplName": TMPL.t4,
			"tmplData": '',
			"afterRender": ''
		}
		renderTemplate(param)

		listenSentenceUnit1()
	}

	//练词单元列表1
	var listenWordUnit1 = function() {
		var _success = function(json) {
			//清空全局变量
			currentQuestion = {}
			currentQuestionIndex = 0;
			records = [];
			errIds = [];
			groups = json.listen_vocabulary_word_groups; //保存当前单元列表
			currentGroupIndex = 0;
			currentGroupSequneceNum = "";
			localIndex = 0;
			localErr = [];
			localErrRecords = [];
			localTmp = [];

			var renderData = {};
			// renderData.units = json.listen_vocabulary_word_groups;
			renderData.units = new Array(json.listen_vocabulary_word_groups);
			$.each(json.listen_vocabulary_word_groups, function(index, value) {
				var item = {};
				item.id = value.id;
				item.sequence_number = value.sequence_number;
				item.zip_url = value.zip_url;
				item.question_count = value.question_count;
				item.rate = value.rate;
				item.error_question_ids = JSON.stringify(value.error_question_ids);
				item.group_level = value.group_level;
				item.avg_speed = value.avg_speed;
				renderData.units[index] = item;
			});
			var param = {
				"wrap": $('#listenWordUnit'),
				"tmplName": TMPL.t2,
				"tmplData": renderData,
				"afterRender": ''
			}
			renderTemplate(param)
		}

		$.ajax({
			url: URL.baseURL9 + "listen_vocabulary_word_groups",
			type: 'get',
			data: {
				listen_type: 1
			},
			headers: {
				"Authorization": token
			},
			success: _success
		});
	}

	//练词单元列表2
	var listenWordUnit2 = function() {
		var _success = function(json) {
			//清空全局变量
			currentQuestion = {}
			currentQuestionIndex = 0;
			records = [];
			errIds = [];
			groups = json.listen_vocabulary_word_groups; //保存当前单元列表
			currentGroupIndex = 0;
			currentGroupSequneceNum = "";
			localIndex = 0;
			localErr = [];
			localErrRecords = [];
			localTmp = [];

			var renderData = {};
			// renderData.units = json.listen_vocabulary_word_groups;
			renderData.units = new Array(json.listen_vocabulary_word_groups);
			$.each(json.listen_vocabulary_word_groups, function(index, value) {
				var item = {};
				item.id = value.id;
				item.sequence_number = value.sequence_number;
				item.zip_url = value.zip_url;
				item.question_count = value.question_count;
				item.rate = value.rate;
				item.error_question_ids = JSON.stringify(value.error_question_ids);
				item.group_level = value.group_level;
				item.avg_speed = value.avg_speed;
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
				listen_type: 2
			},
			headers: {
				"Authorization": token
			},
			success: _success
		});
	}

	//练句单元列表1
	var listenSentenceUnit1 = function() {
		var _success = function(json) {
			//清空全局变量
			currentQuestion = {}
			currentQuestionIndex = 0;
			records = [];
			errIds = [];
			groups = json.listen_vocabulary_sentence_groups; //保存当前单元列表
			currentGroupIndex = 0;
			currentGroupSequneceNum = "";
			localIndex = 0;
			localErr = [];
			localErrRecords = [];
			localTmp = [];

			var renderData = {};
			// renderData.units = json.listen_vocabulary_sentence_groups;
			renderData.units = new Array(json.listen_vocabulary_sentence_groups);
			$.each(json.listen_vocabulary_sentence_groups, function(index, value) {
				var item = {};
				item.id = value.id;
				item.sequence_number = value.sequence_number;
				item.zip_url = value.zip_url;
				item.question_count = value.question_count;
				item.rate = value.rate;
				item.error_question_ids = JSON.stringify(value.error_question_ids);
				item.group_level = value.group_level;
				item.avg_speed = value.avg_speed;
				renderData.units[index] = item;
			});
			var param = {
				"wrap": $('#listenSentenceUnit'),
				"tmplName": TMPL.t5,
				"tmplData": renderData,
				"afterRender": ''
			}
			renderTemplate(param)
		}

		$.ajax({
			url: URL.baseURL9 + "listen_vocabulary_sentence_groups",
			type: 'get',
			data: {
				listen_type: 1
			},
			headers: {
				"Authorization": token
			},
			success: _success
		});
	}

	//练句单元列表2
	var listenSentenceUnit2 = function() {
		var _success = function(json) {
			//清空全局变量
			currentQuestion = {}
			currentQuestionIndex = 0;
			records = [];
			errIds = [];
			groups = json.listen_vocabulary_sentence_groups; //保存当前单元列表
			currentGroupIndex = 0;
			currentGroupSequneceNum = "";
			localIndex = 0;
			localErr = [];
			localErrRecords = [];
			localTmp = [];

			var renderData = {};
			// renderData.units = json.listen_vocabulary_sentence_groups;
			renderData.units = new Array(json.listen_vocabulary_sentence_groups);
			$.each(json.listen_vocabulary_sentence_groups, function(index, value) {
				var item = {};
				item.id = value.id;
				item.sequence_number = value.sequence_number;
				item.zip_url = value.zip_url;
				item.question_count = value.question_count;
				item.rate = value.rate;
				item.error_question_ids = JSON.stringify(value.error_question_ids);
				item.group_level = value.group_level;
				item.avg_speed = value.avg_speed;
				renderData.units[index] = item;
			});
			var param = {
				"wrap": $('#listenSentenceUnit'),
				"tmplName": TMPL.t6,
				"tmplData": renderData,
				"afterRender": ''
			}
			renderTemplate(param)
		}

		$.ajax({
			url: URL.baseURL9 + "listen_vocabulary_sentence_groups",
			type: 'get',
			data: {
				listen_type: 2
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
		if (isEmpty(param.rate)) { //rate=null，从第一个题开始
			startTime = new Date();
			currentTestTimeStrListen = null;
			// currentQuestion = {}
			// currentQuestionIndex = 0;
			// records = [];
			// errIds = [];
			// groups = json.listen_vocabulary_word_groups; //保存当前单元列表
			// currentGroupIndex = 0;

			currentGroupIndex = param.index;
			currentGroupSequneceNum = param.sequence_number;
			// currentGroupIndex = param.sequence_number - 1;
			var paramTmp = {
				sequence_number: 1,
				group_id: param.id
			}
			getWord1(paramTmp)
		} else {
			currentQuestion = {}
			currentQuestionIndex = 0;
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
			// currentQuestion = {}
			// currentQuestionIndex = 0;
			// records = [];
			// errIds = [];
			// groups = json.listen_vocabulary_word_groups; //保存当前单元列表
			// currentGroupIndex = 0;

			// currentGroupIndex = param.sequence_number - 1;
			currentGroupIndex = param.index;
			currentGroupSequneceNum = param.sequence_number;
			var paramTmp = {
				sequence_number: 1,
				group_id: param.id
			}
			getWord2(paramTmp)
		} else {
			currentQuestion = {}
			currentQuestionIndex = 0;
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

	//练句点击某一具体单元1
	var sentenceUnitDetail1 = function(param) {
		$('body,html').animate({
			scrollTop: 0
		}, 100)
		if (isEmpty(param.rate)) { //rate=null，从第一个题开始
			startTime = new Date();
			currentTestTimeStrListen = null;
			// currentQuestion = {}
			// currentQuestionIndex = 0;
			// records = [];
			// errIds = [];
			// groups = json.listen_vocabulary_word_groups; //保存当前单元列表
			// currentGroupIndex = 0;

			// currentGroupIndex = param.sequence_number - 1;
			currentGroupIndex = param.index;
			currentGroupSequneceNum = param.sequence_number;
			var paramTmp = {
				sequence_number: 1,
				group_id: param.id
			}
			getSentence1(paramTmp)
		} else {
			currentQuestion = {}
			currentQuestionIndex = 0;
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
	}

	//练词点击某一具体单元2
	var sentenceUnitDetail2 = function(param) {
		$('body,html').animate({
			scrollTop: 0
		}, 100)
		if (isEmpty(param.rate)) { //rate=null，从第一个题开始
			startTime = new Date();
			currentTestTimeStrListen = null;
			// currentQuestion = {}
			// currentQuestionIndex = 0;
			// records = [];
			// errIds = [];
			// groups = json.listen_vocabulary_word_groups; //保存当前单元列表
			// currentGroupIndex = 0;
			// currentGroupIndex = param.sequence_number - 1;
			currentGroupIndex = param.index;
			currentGroupSequneceNum = param.sequence_number;
			var paramTmp = {
				sequence_number: 1,
				group_id: param.id
			}
			getSentence2(paramTmp)
		} else {
			currentQuestion = {}
			currentQuestionIndex = 0;
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
				$($('.choiceResult')[param.choice]).addClass('listen-mistake')
			} else {
				record.isError = false;
			}
			records.push(record)

			var showResult = function() {
				if (currentQuestionIndex == currentQuestion.group_count - 1) { //做到最后一题，出结果页
					endTime = new Date();
					var spend_time = Math.round((endTime.getTime() - startTime.getTime()) / 1000);
					var recordsLength = records.length;
					if (records[recordsLength - 2].question.id == records[recordsLength - 1].question.id) {
						records.pop()
						errIds.pop()
					}
					if (isEmpty(token)) { //用户没登陆，先弹框让其登录
						$('#dialogLogin').modal({
							backdrop: 'static'
						})
						$('#dialogLogin').bind('hidden.bs.modal', function(e) {
							BaseCookie.get()
							if (!isEmpty(BaseCookie.getToken())) {
								token = BaseCookie.getToken()
								submitWord1(spend_time)
							}
						})
					} else { //出结果页
						submitWord1(spend_time)
					}
				} else {
					currentQuestionIndex = currentQuestionIndex + 1;
					var paramTmp = {
						sequence_number: currentQuestionIndex + 1,
						group_id: groups[currentGroupIndex].id
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
				$($('.choiceResult')[param.choice]).addClass('listen-mistake')
			} else {
				record.isError = false;
			}
			records.push(record)

			var showResult = function() {
				if (currentQuestionIndex == currentQuestion.group_count - 1) { //做到最后一题，出结果页
					endTime = new Date();
					var spend_time = Math.round((endTime.getTime() - startTime.getTime()) / 1000);
					var recordsLength = records.length;
					if (records[recordsLength - 2].question.id == records[recordsLength - 1].question.id) {
						records.pop()
						errIds.pop()
					}
					if (isEmpty(token)) { //用户没登陆，先弹框让其登录
						$('#dialogLogin').modal({
							backdrop: 'static'
						})
						$('#dialogLogin').bind('hidden.bs.modal', function(e) {
							BaseCookie.get()
							if (!isEmpty(BaseCookie.getToken())) {
								token = BaseCookie.getToken()
								submitWord2(spend_time)
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
		//听句选择1
	var choiceSentence1 = function(param) {
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
				$($('.choiceResult')[param.choice]).addClass('listen-mistake')
			} else {
				record.isError = false;
			}
			records.push(record)

			var showResult = function() {
				if (currentQuestionIndex == currentQuestion.group_count - 1) { //做到最后一题，出结果页
					endTime = new Date();
					var spend_time = Math.round((endTime.getTime() - startTime.getTime()) / 1000);
					var recordsLength = records.length;
					if (records[recordsLength - 2].question.id == records[recordsLength - 1].question.id) {
						records.pop()
						errIds.pop()
					}
					if (isEmpty(token)) { //用户没登陆，先弹框让其登录
						$('#dialogLogin').modal({
							backdrop: 'static'
						})
						$('#dialogLogin').bind('hidden.bs.modal', function(e) {
							BaseCookie.get()
							if (!isEmpty(BaseCookie.getToken())) {
								token = BaseCookie.getToken()
								submitSentence1(spend_time)
							}
						})
					} else { //出结果页
						submitSentence1(spend_time)
					}
				} else {
					currentQuestionIndex = currentQuestionIndex + 1;
					var paramTmp = {
						sequence_number: currentQuestionIndex + 1,
						group_id: groups[currentGroupIndex].id
					}
					getSentence1(paramTmp)
				}
				clearTimeout(timeInterval)
			}
			var timeInterval = setTimeout(showResult, 1000);
		}
		//听句选择2
	var choiceSentence2 = function(param) {
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
			$($('.choiceResult')[param.choice]).addClass('listen-mistake')
		} else {
			record.isError = false;
		}
		records.push(record)

		var showResult = function() {
			if (currentQuestionIndex == currentQuestion.group_count - 1) { //做到最后一题，出结果页
				endTime = new Date();
				var spend_time = Math.round((endTime.getTime() - startTime.getTime()) / 1000);
				var recordsLength = records.length;
				if (records[recordsLength - 2].question.id == records[recordsLength - 1].question.id) {
					records.pop()
					errIds.pop()
				}
				if (isEmpty(token)) { //用户没登陆，先弹框让其登录
					$('#dialogLogin').modal({
						backdrop: 'static'
					})
					$('#dialogLogin').bind('hidden.bs.modal', function(e) {
						BaseCookie.get()
						if (!isEmpty(BaseCookie.getToken())) {
							token = BaseCookie.getToken()
							submitSentence2(spend_time)
						}
					})
				} else { //出结果页
					submitSentence2(spend_time)
				}
			} else {
				currentQuestionIndex = currentQuestionIndex + 1;
				var paramTmp = {
					sequence_number: currentQuestionIndex + 1,
					group_id: groups[currentGroupIndex].id
				}
				getSentence2(paramTmp)
			}
			clearTimeout(timeInterval)
		}
		var timeInterval = setTimeout(showResult, 1000);
	}

	//获得单词1,参数第几组第几个sequence_number,group_id
	var getWord1 = function(param) {
		var _success = function(json) {
			currentQuestion = {};
			currentQuestion.correctResponse = $.xml2json(json.content).responseDeclaration.correctResponse.value;
			var bodyTmp = $.xml2json(json.content).itemBody;
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
			currentQuestion.group_count = json.group_count;

			var renderData = {};
			renderData.content = currentQuestion;
			renderData.group_count = json.group_count;
			// renderData.sequence_number = currentGroupIndex + 1;
			renderData.group_sequence_number = currentGroupSequneceNum;
			renderData.current_count = currentQuestionIndex + 1;
			if (currentTestTimeStrListen) {
				renderData.currentTestTimeStrListen = currentTestTimeStrListen;
			}
			if ($(".listen-question").length) {
				var _afterRender1 = function() {
					startTimerListen();
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
						startTimerListen();
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
				}
				var param = {
					"tmplName": TMPL.t7,
					"tmplData": renderData,
					"afterRender": _afterRender
				}
				renderTemplate(param)
			}
		}
		$.ajax({
			url: URL.baseURL9 + "listen_vocabulary_word_questions/get_one",
			type: 'get',
			data: {
				sequence_number: param.sequence_number,
				group_id: param.group_id
			},
			headers: {
				"Authorization": token
			},
			success: _success
		});
	}
	var getWord2 = function(param) {
		var _success = function(json) {
			currentQuestion = {};
			currentQuestion.correctResponse = $.xml2json(json.content).responseDeclaration.correctResponse.value;
			var bodyTmp = $.xml2json(json.content).itemBody;
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
			currentQuestion.group_count = json.group_count;

			var renderData = {};
			renderData.content = currentQuestion;
			renderData.group_count = json.group_count;
			// renderData.sequence_number = currentGroupIndex + 1;
			renderData.group_sequence_number = currentGroupSequneceNum;
			renderData.current_count = currentQuestionIndex + 1;
			if (currentTestTimeStrListen) {
				renderData.currentTestTimeStrListen = currentTestTimeStrListen;
			}
			if ($(".listen-question").length) {
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
		}
		$.ajax({
			url: URL.baseURL9 + "listen_vocabulary_word_questions/get_one",
			type: 'get',
			data: {
				sequence_number: param.sequence_number,
				group_id: param.group_id
			},
			headers: {
				"Authorization": token
			},
			success: _success
		});
	}
	var getSentence1 = function(param) {
		var _success = function(json) {
			currentQuestion = {};
			currentQuestion.correctResponse = $.xml2json(json.content).responseDeclaration.correctResponse.value;
			var bodyTmp = $.xml2json(json.content).itemBody;
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
			currentQuestion.group_count = json.group_count;

			var renderData = {};
			renderData.content = currentQuestion;
			renderData.group_count = json.group_count;
			// renderData.sequence_number = currentGroupIndex + 1;
			renderData.group_sequence_number = currentGroupSequneceNum;
			renderData.current_count = currentQuestionIndex + 1;
			if (currentTestTimeStrListen) {
				renderData.currentTestTimeStrListen = currentTestTimeStrListen;
			}
			if ($(".listen-question").length) {
				var _afterRender1 = function() {
					startTimerListen();
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
						startTimerListen();
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
		}
		$.ajax({
			url: URL.baseURL9 + "listen_vocabulary_sentence_questions/get_one",
			type: 'get',
			data: {
				sequence_number: param.sequence_number,
				group_id: param.group_id
			},
			headers: {
				"Authorization": token
			},
			success: _success
		});
	}
	var getSentence2 = function(param) {
		var _success = function(json) {
			currentQuestion = {};
			currentQuestion.correctResponse = $.xml2json(json.content).responseDeclaration.correctResponse.value;
			var bodyTmp = $.xml2json(json.content).itemBody;
			currentQuestion.id = bodyTmp.id;
			currentQuestion.sequence_number = bodyTmp.sequence_number;
			currentQuestion.prompt = bodyTmp.choiceInteraction.prompt;
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
			currentQuestion.group_count = json.group_count;

			var renderData = {};
			renderData.content = currentQuestion;
			renderData.group_count = json.group_count;
			// renderData.sequence_number = currentGroupIndex + 1;
			renderData.group_sequence_number = currentGroupSequneceNum;
			renderData.current_count = currentQuestionIndex + 1;
			if (currentTestTimeStrListen) {
				renderData.currentTestTimeStrListen = currentTestTimeStrListen;
			}
			if ($(".listen-question").length) {
				var _afterRender1 = function() {
					startTimerListen();
				}
				var param = {
					"wrap": $(".listen-question"),
					"tmplName": TMPL.t38,
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
						"tmplName": TMPL.t38,
						"tmplData": renderData,
						"afterRender": _afterRender1
					}
					renderTemplate(param)
				}
				var param = {
					"tmplName": TMPL.t10,
					"tmplData": renderData,
					"afterRender": _afterRender
				}
				renderTemplate(param)
			}
		}
		$.ajax({
			url: URL.baseURL9 + "listen_vocabulary_sentence_questions/get_one",
			type: 'get',
			data: {
				sequence_number: param.sequence_number,
				group_id: param.group_id
			},
			headers: {
				"Authorization": token
			},
			success: _success
		});
	}

	//练词结果提交1
	var submitWord1 = function(param) {
			var spend_time = param;
			var correctCount = currentQuestion.group_count - errIds.length;
			var rate = correctCount + "/" + currentQuestion.group_count;
			var _success = function() {
				resultWord1(1, rate)
			}
			$.ajax({
				url: URL.baseURL9 + "listen_vocabulary_word_results",
				type: 'post',
				data: {
					group_id: groups[currentGroupIndex].id,
					question_ids: errIds.join(","),
					rate: rate,
					spend_time: spend_time
				},
				headers: {
					"Authorization": token
				},
				success: _success
			});
		}
		//练词结果提交2
	var submitWord2 = function(param) {
			var spend_time = param;
			var correctCount = currentQuestion.group_count - errIds.length;
			var rate = correctCount + "/" + currentQuestion.group_count;
			var _success = function() {
				resultWord2(1, rate)
			}
			$.ajax({
				url: URL.baseURL9 + "listen_vocabulary_word_results",
				type: 'post',
				data: {
					group_id: groups[currentGroupIndex].id,
					question_ids: errIds.join(","),
					rate: rate,
					spend_time: spend_time
				},
				headers: {
					"Authorization": token
				},
				success: _success
			});
		}
		//练句结果提交1
	var submitSentence1 = function(param) {
			var spend_time = param;
			var correctCount = currentQuestion.group_count - errIds.length;
			var rate = correctCount + "/" + currentQuestion.group_count;
			var _success = function() {
				resultSentence1(1, rate)
			}
			$.ajax({
				url: URL.baseURL9 + "listen_vocabulary_sentence_results",
				type: 'post',
				data: {
					group_id: groups[currentGroupIndex].id,
					question_ids: errIds.join(","),
					rate: rate,
					spend_time: spend_time
				},
				headers: {
					"Authorization": token
				},
				success: _success
			});
		}
		//练句结果提交2
	var submitSentence2 = function(param) {
		var spend_time = param;
		var correctCount = currentQuestion.group_count - errIds.length;
		var rate = correctCount + "/" + currentQuestion.group_count;
		var _success = function() {
			resultSentence2(1, rate)
		}
		$.ajax({
			url: URL.baseURL9 + "listen_vocabulary_sentence_results",
			type: 'post',
			data: {
				group_id: groups[currentGroupIndex].id,
				question_ids: errIds.join(","),
				rate: rate,
				spend_time: spend_time
			},
			headers: {
				"Authorization": token
			},
			success: _success
		});
	}

	//练词结果页1,type用来判断是做题来的还是直接结果页
	var resultWord1 = function(type, rate) {
			var renderData = {}
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
				var spend_time = Math.round((endTime.getTime() - startTime.getTime()) / 1000);
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
				renderData.rate = digitRound(rateTmp, 2) * 100;
				if (avg_speed <= 10 && avg_speed > 0) {
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
				}
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
						module_type: 4,
						rate: renderData.rate,
						spend_time: spend_time,
						amount: records.length,
						group_id: groups[currentGroupIndex].id
					},
					success: function(json) {
						renderData.group_level = json.group_level;
					}
				})
				renderData.errWords = errWords;
				renderData.records = records;
				var _afterRender = function() {
					startTime = null;
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
					//修改重做错题直接进结果页bug
					// localErr = json.listen_vocabulary_word_results;
					// localErrRecords = json.listen_vocabulary_word_results;
					var jsonResult = json.listen_vocabulary_word_results;
					for (var i = 0; i < jsonResult.length; i++) {
						if (jsonResult[i].is_correct == 2) {
							localErr.push(jsonResult[i])
							localErrRecords.push(jsonResult[i])
						}
					}
					localIndex = 0;
					localTmp = [];
					var renderData = {}
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
					var param = {
						"tmplName": TMPL.t12,
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
	var resultWord2 = function(type, rate) {
			var renderData = {}
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
				var spend_time = Math.round((endTime.getTime() - startTime.getTime()) / 1000);
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
				renderData.rate = digitRound(rateTmp, 2) * 100;
				if (avg_speed <= 10 && avg_speed > 0) {
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
				}
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
					}
				})
				renderData.errWords = errWords;
				renderData.records = records;
				var _afterRender = function() {
					startTime = null;
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
					var renderData = {}
						// localErr = json.listen_vocabulary_word_results;
						// localErrRecords = json.listen_vocabulary_word_results;
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
		//练句结果页1
	var resultSentence1 = function(type, rate) {
			var renderData = {}
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
				var spend_time = Math.round((endTime.getTime() - startTime.getTime()) / 1000);
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
				renderData.rate = digitRound(rateTmp, 2) * 100;
				if (avg_speed <= 10 && avg_speed > 0) {
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
				}
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
						module_type: 6,
						rate: renderData.rate,
						spend_time: spend_time,
						amount: records.length,
						group_id: groups[currentGroupIndex].id
					},
					success: function(json) {
						renderData.group_level = json.group_level;
					}
				})
				renderData.errWords = errWords;
				renderData.records = records;
				var _afterRender = function() {
					startTime = null;
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
					var jsonResult = json.listen_vocabulary_sentence_results;
					for (var i = 0; i < jsonResult.length; i++) {
						if (jsonResult[i].is_correct == 2) {
							localErr.push(jsonResult[i])
							localErrRecords.push(jsonResult[i])
						}
					}
					localIndex = 0;
					localTmp = [];
					var renderData = {}
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
					var param = {
						"tmplName": TMPL.t16,
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
		//练词结果页2
	var resultSentence2 = function(type, rate) {
		var renderData = {}
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
			var spend_time = Math.round((endTime.getTime() - startTime.getTime()) / 1000);
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
			renderData.rate = digitRound(rateTmp, 2) * 100;
			if (avg_speed <= 10 && avg_speed > 0) {
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
			}
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
				}
			})
			renderData.errWords = errWords;
			renderData.records = records;
			var _afterRender = function() {
				startTime = null;
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
				var renderData = {}
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
			renderWordErr1()
		}
		//练词练习结束页，重做错题2
	var errOnlyWord2 = function() {
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
		//练句练习结束页，重做错题1
	var errOnlySentence1 = function() {
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
			renderSentenceErr1()
		}
		//练句练习结束页，重做错题2
	var errOnlySentence2 = function() {
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
		renderSentenceErr2()
	}

	var errOnlyWord1Result = function() {
		$('body,html').animate({
			scrollTop: 0
		}, 100)
		renderWordErr1Result()
	}
	var errOnlyWord2Result = function() {
		$('body,html').animate({
			scrollTop: 0
		}, 100)
		renderWordErr2Result()
	}
	var errOnlySentence1Result = function() {
		$('body,html').animate({
			scrollTop: 0
		}, 100)
		renderSentenceErr1Result()
	}
	var errOnlySentence2Result = function() {
		$('body,html').animate({
			scrollTop: 0
		}, 100)
		renderSentenceErr2Result()
	}

	//练词错词页面1
	var renderWordErr1 = function() {
			var renderData = {}
			renderData.errWord = localErr[localIndex];
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
			}
			renderTemplate(param)
		}
		//练词错词页面2
	var renderWordErr2 = function() {
			var renderData = {}
			renderData.errWord = localErr[localIndex];
			renderData.group_sequence_number = currentGroupSequneceNum;
			var param = {
				"tmplName": TMPL.t21,
				"tmplData": renderData,
				"afterRender": ""
			}
			renderTemplate(param)
		}
		//练句错词页面1
	var renderSentenceErr1 = function() {
			var renderData = {}
			renderData.errWord = localErr[localIndex];
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
				"tmplName": TMPL.t23,
				"tmplData": renderData,
				"afterRender": _afterRender
			}
			renderTemplate(param)
		}
		//练句错词页面2
	var renderSentenceErr2 = function() {
		var renderData = {}
		renderData.errWord = localErr[localIndex];
		renderData.group_sequence_number = currentGroupSequneceNum;
		var param = {
			"tmplName": TMPL.t25,
			"tmplData": renderData,
			"afterRender": ""
		}
		renderTemplate(param)
	}

	//练词错词页面1
	var renderWordErr1Result = function() {
			var renderData = {}
			renderData.errWord = localErr[localIndex];
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
				"tmplName": TMPL.t27,
				"tmplData": renderData,
				"afterRender": _afterRender
			}
			renderTemplate(param)
		}
		//练词错词页面2
	var renderWordErr2Result = function() {
			var renderData = {}
			renderData.errWord = localErr[localIndex];
			renderData.group_sequence_number = currentGroupSequneceNum;
			var param = {
				"tmplName": TMPL.t29,
				"tmplData": renderData,
				"afterRender": ""
			}
			renderTemplate(param)
		}
		//练句错词页面1
	var renderSentenceErr1Result = function() {
			var renderData = {}
			renderData.errWord = localErr[localIndex];
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
				"tmplName": TMPL.t31,
				"tmplData": renderData,
				"afterRender": _afterRender
			}
			renderTemplate(param)
		}
		//练句错词页面2
	var renderSentenceErr2Result = function() {
		var renderData = {}
		renderData.errWord = localErr[localIndex];
		renderData.group_sequence_number = currentGroupSequneceNum;
		var param = {
			"tmplName": TMPL.t33,
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
		//练句错词页面选择1
	var choiceErrSentence1 = function(param) {
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
					resultErrSentence1()
				} else {
					localIndex = localIndex + 1;
					renderSentenceErr1()
				}
				clearTimeout(timeInterval)
			}
			var timeInterval = setTimeout(showResult, 1000);
		}
		//练句错词页面选择2
	var choiceErrSentence2 = function(param) {
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
				resultErrSentence2()
			} else {
				localIndex = localIndex + 1;
				renderSentenceErr2()
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
		//练句错词页面选择1
	var choiceErrSentence1Result = function(param) {
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
					resultErrSentence1Result()
				} else {
					localIndex = localIndex + 1;
					renderSentenceErr1Result()
				}
				clearTimeout(timeInterval)
			}
			var timeInterval = setTimeout(showResult, 1000);
		}
		//练句错词页面选择2
	var choiceErrSentence2Result = function(param) {
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
				resultErrSentence2Result()
			} else {
				localIndex = localIndex + 1;
				renderSentenceErr2Result()
			}
			clearTimeout(timeInterval)
		}
		var timeInterval = setTimeout(showResult, 1000);
	}

	//练词重练错题结果页1
	var resultErrWord1 = function() {
			var renderData = {};
			renderData.correctCount = localErr.length - localTmp.length;
			renderData.errorCount = localTmp.length;
			renderData.group_sequence_number = currentGroupSequneceNum;
			renderData.errWords = localTmp;
			renderData.allErrWords = localErrRecords;

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
			var renderData = {};
			renderData.correctCount = localErr.length - localTmp.length;
			renderData.errorCount = localTmp.length;
			renderData.group_sequence_number = currentGroupSequneceNum;
			renderData.errWords = localTmp;
			renderData.allErrWords = localErrRecords;

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
		//练句重练错题结果页1
	var resultErrSentence1 = function() {
			var renderData = {};
			renderData.correctCount = localErr.length - localTmp.length;
			renderData.errorCount = localTmp.length;
			renderData.group_sequence_number = currentGroupSequneceNum;
			renderData.errWords = localTmp;
			renderData.allErrWords = localErrRecords;

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
		}
		//练句重练错题结果页2
	var resultErrSentence2 = function() {
		var renderData = {};
		renderData.correctCount = localErr.length - localTmp.length;
		renderData.errorCount = localTmp.length;
		renderData.group_sequence_number = currentGroupSequneceNum;
		renderData.errWords = localTmp;
		renderData.allErrWords = localErrRecords;

		localErr = localTmp;
		localErrRecords = localTmp;
		localTmp = [];
		localIndex = 0;
		var param = {
			"tmplName": TMPL.t26,
			"tmplData": renderData,
			"afterRender": ""
		}
		renderTemplate(param)
	}

	//练词重练错题结果页1
	var resultErrWord1Result = function() {
			var renderData = {};
			renderData.correctCount = localErr.length - localTmp.length;
			renderData.errorCount = localTmp.length;
			renderData.group_sequence_number = currentGroupSequneceNum;
			renderData.errWords = localTmp;
			renderData.allErrWords = localErrRecords;

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
			var renderData = {};
			renderData.correctCount = localErr.length - localTmp.length;
			renderData.errorCount = localTmp.length;
			renderData.group_sequence_number = currentGroupSequneceNum;
			renderData.errWords = localTmp;
			renderData.allErrWords = localErrRecords;

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
		//练句重练错题结果页1
	var resultErrSentence1Result = function() {
			var renderData = {};
			renderData.correctCount = localErr.length - localTmp.length;
			renderData.errorCount = localTmp.length;
			renderData.group_sequence_number = currentGroupSequneceNum;
			renderData.errWords = localTmp;
			renderData.allErrWords = localErrRecords;

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
		}
		//练句重练错题结果页2
	var resultErrSentence2Result = function() {
		var renderData = {};
		renderData.correctCount = localErr.length - localTmp.length;
		renderData.errorCount = localTmp.length;
		renderData.group_sequence_number = currentGroupSequneceNum;
		renderData.errWords = localTmp;
		renderData.allErrWords = localErrRecords;

		localErr = localTmp;
		localErrRecords = localTmp;
		localTmp = [];
		localIndex = 0;
		var param = {
			"tmplName": TMPL.t34,
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
			renderWordErr1()
		}
		//练词重做错题中的重做错题2
	var errOnlyErrWord2 = function() {
			$('body,html').animate({
				scrollTop: 0
			}, 100)
			renderWordErr2()
		}
		//练句重做错题中的重做错题1
	var errOnlyErrSentence1 = function() {
			$('body,html').animate({
				scrollTop: 0
			}, 100)
			renderSentenceErr1()
		}
		//练句重做错题中的重做错题2
	var errOnlyErrSentence2 = function() {
		$('body,html').animate({
			scrollTop: 0
		}, 100)
		renderSentenceErr2()
	}

	//练词重做错题中的重做错题1
	var errOnlyErrWord1Result = function() {
			$('body,html').animate({
				scrollTop: 0
			}, 100)
			renderWordErr1Result()
		}
		//练词重做错题中的重做错题2
	var errOnlyErrWord2Result = function() {
			$('body,html').animate({
				scrollTop: 0
			}, 100)
			renderWordErr2Result()
		}
		//练句重做错题中的重做错题1
	var errOnlyErrSentence1Result = function() {
			$('body,html').animate({
				scrollTop: 0
			}, 100)
			renderSentenceErr1Result()
		}
		//练句重做错题中的重做错题2
	var errOnlyErrSentence2Result = function() {
		$('body,html').animate({
			scrollTop: 0
		}, 100)
		renderSentenceErr2Result()
	}

	var hisListen = function(param) {
		BaseCookie.get()
		token = BaseCookie.getToken()
		if (isEmpty(token)) {
			token = tokenTmp
		}
		currentQuestion = {}
		currentQuestionIndex = 0;
		records = [];
		errIds = JSON.parse(param.error_question_ids);
		currentGroupIndex = param.index;
		currentGroupSequneceNum = param.sequence_number;
		localIndex = 0;
		localErr = [];
		localErrRecords = [];
		localTmp = [];

		if (param.type == 1) {
			var _success = function(json) {
				//清空全局变量
				groups = json.listen_vocabulary_word_groups; //保存当前单元列表
				resultWord1(2)
			}

			$.ajax({
				url: URL.baseURL9 + "listen_vocabulary_word_groups",
				type: 'get',
				data: {
					listen_type: 1
				},
				headers: {
					"Authorization": token
				},
				success: _success
			});
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
					listen_type: 2
				},
				headers: {
					"Authorization": token
				},
				success: _success
			});
		} else if (param.type == 3) {
			var _success = function(json) {
				//清空全局变量
				groups = json.listen_vocabulary_sentence_groups; //保存当前单元列表
				resultSentence1(2)
			}

			$.ajax({
				url: URL.baseURL9 + "listen_vocabulary_sentence_groups",
				type: 'get',
				data: {
					listen_type: 1
				},
				headers: {
					"Authorization": token
				},
				success: _success
			});
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
					listen_type: 2
				},
				headers: {
					"Authorization": token
				},
				success: _success
			});
		}
	}

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
	}

	var isEmpty = function(param) {
		if (null == param || "" == param || tokenTmp == param) {
			return true
		} else {
			return false
		}
	}

	return {
		init: init,
		hisListen: hisListen
	}
})