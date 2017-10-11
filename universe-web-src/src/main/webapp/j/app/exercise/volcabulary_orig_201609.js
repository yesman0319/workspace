'use strict'

define(['common/uniqueAjax', 'common/render', 'xml2json', 'app/baseURL', 'baseCookie', 'lib/store'], function(uniqueAjax, Render, xml2json, URL, BaseCookie) {
	var _conf,
		$wrap,
		TMPL = {
			t1: 'app/exercise/tmpl_volcabulary',
			// t2: 'app/exercise/tmpl_vol_accuracy_nouser',
			t3: 'app/exercise/tmpl_vol_unit',
			// t4: 'app/exercise/tmpl_vol_unit_nouser',
			t5: 'app/exercise/tmpl_vol_accuracy',
			t6: 'app/exercise/tmpl_volcabulary_err',
			t7: 'app/exercise/tmpl_vol_accuracy_err',
			// t8: 'app/exercise/tmpl_vol_login'
		};
	var tokenTmp,
		tokenTmp1 = "xiaoma";

	var questions = [],
		currentQuestionIndex = 0,
		currentQuestion = {},
		records = [],
		errIds = [],
		groups = [],
		currentGroupIndex = 0, //记录当前groups数组位置
		currentGroupSequneceNum = "", //记录当前group的sequence_number
		localIndex = 0,
		localErr = [],
		localTmp = [];

	var init = function(conf) {
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
	}

	var initEvent = function() {
		$(document).on('trigger_side8', '#side8', vocalbularyFun)
		$(document).on('click', '#side8', vocalbularyFun)
		$(document).on('click', '#unitVol', unitVolFun)
		$(document).on('click', '#btn', function() {
			$('#dialogLogin').modal({
				backdrop: 'static'
			})
		})
		$(document).on('click', '.unitVolDetail', function(e) {
			currentGroupIndex = $(e.target).attr('data-index');
			currentGroupSequneceNum = $(e.target).attr('data-sequence_number');
			var data = {
				'rate': $(e.target).attr('data-rate') / 100
			}
			unitVolDetailFun(data)
		})
		$(document).on('click', '.choiceVol', function(e) {
			var data = {
				'obj': $(e.target),
				'answer': $(e.target).attr('data-answer'),
				'volId': $(e.target).attr('data-volId')
			};
			choiceVolFun(data)
		})
		$(document).on('click', '.choiceVolErr', function(e) {
			var data = {
				'obj': $(e.target),
				'answer': $(e.target).attr('data-answer'),
				'volId': $(e.target).attr('data-volId'),
				// 'errId': $(e.target).attr('data-errId'),
				'errAnswer': $(e.target).attr('data-erranswer')
			};
			choiceVolErrFun(data)
		})
		$(document).on('click', '#againVol', function(e) {
			var data = {
				'volUnit': $(e.target).attr('data-volUnit'),
				'volGroupId': $(e.target).attr('data-volGroupId')
			};
			againVolFun(data)
		})
		$(document).on('click', '#errOnlyVol', errOnlyVolFun)
		$(document).on('click', '#errOnlyVolErr', errOnlyVolErrFun)
		$(document).on('click', '#nextUnitVol', nextUnitVolFun)
		$(document).on('click', '#nextUnitVolErr', nextUnitVolErrFun)
	}

	//词汇结果页
	var renderVolResult = function(json, rate) {
		var volErr = [];
		store.set('volNum', '1')
		store.set('vocabularys', [])
		store.set('volCorrectAnswer', '')
		store.set('volId', '')

		questions = [],
		currentQuestionIndex = 0,
		currentQuestion = {},
		records = [],
		errIds = [],
		groups = [],
		currentGroupIndex = 0, //记录当前groups数组位置
		currentGroupSequneceNum = "", //记录当前group的sequence_number
		localIndex = 0,
		localErr = [],
		localTmp = [];
		if (!isEmpty(json.vocabulary_results[0].vocabulary_question)) {
			for (var i = 0; i < json.vocabulary_results.length; i++) {
				var errTmp = {
					'id': json.vocabulary_results[i].id, //错题在数据库中的id
					'volErr': renderXmlVol(json.vocabulary_results[i].vocabulary_question), //题的内容				
					'errNum': parseInt(i) + 1 //错题的sequenceNum
				};
				volErr.push(errTmp)
			}
		}
		localErr = volErr
		var renderData = {
				"rate": Math.round(rate * 100),
				"volErr": volErr,
				'volUnit': store.get('volUnit'),
				'volGroupId': store.get('volGroupId')
			}
			//存储错题用
		store.set('volResult', volErr)
		var param = {
			"tmplName": TMPL.t5,
			"tmplData": renderData,
			"afterRender": function() {
				$("#volUnit").html(store.get('volUnit'))
				$("#volUnit1").html(store.get('volUnit'))
			}
		}
		renderTemplate(param)
	}

	//词汇错题结果页
	var renderVolResultErr = function(json) {
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
		localErr = volErr
		var renderData = {
			"volErr": volErr,
		}
		var param = {
			"tmplName": TMPL.t7,
			"tmplData": renderData,
			"afterRender": function() {
				$("#volUnit").html(store.get('volUnit'))
			}
		}
		renderTemplate(param)
	}

	//词汇点击
	var vocalbularyFun = function() {
		BaseCookie.get()
		tokenTmp = BaseCookie.getToken()
		if (isEmpty(tokenTmp)) {
			tokenTmp = tokenTmp1
		}
		$('.sidebar-ul').find('a.sidebarLight').removeClass('sidebarLight');
		$('.sidebar-ul').find('li.sidebarLight').removeClass('sidebarLight');
		$("#side8").addClass('sidebarLight')
		$("#side8").parent().siblings().find(".sidebarLight").removeClass('sidebarLight');

		getGroups()
	}

	//选择单元
	var unitVolFun = function() {
		BaseCookie.get()
		tokenTmp = BaseCookie.getToken()
		if (isEmpty(tokenTmp)) {
			tokenTmp = tokenTmp1
		}
		getGroups()
	}

	//单元列表页，点击某一单元
	var unitVolDetailFun = function(param) {
		if (param.rate < 0) {
			renderUnitVol(currentGroupSequneceNum)
				// store.remove("redirectObj")
		} else {
			$.ajax({
				url: URL.baseURL + 'vocabulary_results',
				headers: {
					Authorization: tokenTmp
				},
				data: {
					vocabulary_group_id: groups[currentGroupIndex].id
				},
				type: 'get',
				success: function(json) {
					renderVolResult(json, param.rate)
						// store.remove("redirectObj")
				}
			})
		}
	}

	//单词选择
	var choiceVolFun = function(data) {
		if (store.get('volCorrectAnswer') != data.answer) {
			var arr = [];
			arr = store.get('volErr')
			arr.push(parseInt(data.volId))
			store.set('volErr', arr)
			var gloablTmp = {
				"vocabulary_question": store.get("vocabularys")[parseInt(store.get("volNum")) - 1]
			}
			gloablErr.push(gloablTmp)
		}
		store.set('volNum', parseInt(store.get('volNum')) + 1);
		if (store.get('volNum') < parseInt(store.get('vocabularys').length) + 1) {
			renderVol(store.get('volNum'))
		} else {
			var recordsLength = store.get('volErr').length;
			if (store.get('volErr')[recordsLength - 2] == store.get('volErr')[recordsLength - 1]) {
				var volErrPop = store.get('volErr');
				volErrPop.splice(store.get('volErr').length - 1)
				store.set('volErr', volErrPop)
				gloablErr.splice(gloablErr.length - 1)
			}
			// debugger
			var callback_submit = function() {
					var rate, dataArr = [];
					var totalCount = store.get('vocabularys').length;
					var correctCount = totalCount - store.get('volErr').length;
					var rateTmp = Math.round(correctCount / totalCount * 100);
					rate = rateTmp / 100;
					var _afterRender = function() {
						$("#volUnit").html(store.get('volUnit'))
					}
					var volErr = [];
					if (isEmpty(gloablErr)) {
						gloablErr = [{
							"volcabulary_question": null
						}]
					}
					var jsonTmp = {
						"vocabulary_results": gloablErr
					}
					gloablErr = [];
					renderVolResult(jsonTmp, rate)
					var _callback = function(json) {}
					for (var i = 0; i < allGroups.length; i++) {
						if (store.get('volUnit') == allGroups[i].sequence_number) {
							store.set('volGroupId', allGroups[i].id)
							break
						}
					}
					if (store.get('volErr').length > 0) {
						for (var i = 0; i < store.get('volErr').length; i++) {
							var errJson = {
								"user_id": BaseCookie.getId(),
								"vocabulary_group_id": store.get('volGroupId'),
								"vocabulary_question_id": store.get('volErr')[i] + ""
							}
							dataArr.push(errJson)
						}
						$.ajax({
							url: URL.baseURL1 + "vocabulary_results",
							data: JSON.stringify({
								"user_id": BaseCookie.getId(),
								"vocabulary_group_id": store.get('volGroupId'),
								"vocabulary_results": dataArr
							}),
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
					}
					$.ajax({
						url: URL.baseURL + 'vocabulary_rates',
						headers: {
							Authorization: tokenTmp
						},
						data: {
							rate: rate,
							vocabulary_group_id: store.get('volGroupId')
						},
						type: 'post',
						success: function(json) {}
					})
				}
				//用户为空时不提交
			if (isEmpty(tokenTmp)) {
				//游客
				// var _afterRender = function() {
				// 	$("#volUnit").html(store.get('volUnit'))
				// }
				// var volErr = [];
				// for (var i = 0; i < store.get("volErr").length; i++) {
				// 	for (var j = 0; j < store.get("vocabularys").length; j++) {
				// 		if (store.get("volErr")[i] == store.get("vocabularys")[j].id) {
				// 			volErr.push(renderXmlVol(store.get("vocabularys")[j]))
				// 			break
				// 		}
				// 	}
				// }
				// var totalCount = store.get('vocabularys').length;
				// var correctCount = totalCount - store.get('volErr').length;
				// var rateTmp = Math.round(correctCount / totalCount * 100);
				// var renderData = {
				// 	rate: rateTmp,
				// 	'volErr': volErr
				// };
				// var param = {
				// 	"tmplName": TMPL.t2,
				// 	"tmplData": renderData,
				// 	"afterRender": _afterRender
				// }
				// renderTemplate(param)
				$('#dialogLogin').modal({
					backdrop: 'static'
				})
				$('#dialogLogin').bind('hidden.bs.modal', function(e) {
					// debugger
					BaseCookie.get()
					if (!isEmpty(BaseCookie.getToken())) {
						tokenTmp = BaseCookie.getToken()
						callback_submit()
					}
				})
			} else {
				callback_submit()
			}

		}

	}

	//单词错题选择
	var choiceVolErrFun = function(data) {
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
		if (correctNum != data.answer) {
			localTmp.push(localErr[parseInt(store.get('volErrNum')) - 1])
		}
		store.set('volErrNum', parseInt(store.get('volErrNum')) + 1);
		if (store.get('volErrNum') < parseInt(localErr.length) + 1) {
			renderVolErr(store.get('volErrNum'))
		} else {
			localErr = localTmp
			localTmp = []
			renderVolResultErr(localErr)
		}
	}

	//再做一遍
	var againVolFun = function(param) {
		localErr = []
		localTmp = []
		var _callback2 = function(json, sequenceNumber) {
			store.set('volNum', '1')
			store.set('volErr', [])
			store.set('vocabularys', json.vocabulary_questions)
			store.set('volUnit', sequenceNumber)
			store.set('volCorrectAnswer', '')
			store.set('volId', '')
			store.set('volResult', [])
			renderVol(1)
		}
		if (isEmpty(tokenTmp)) {
			//游客
			// $.ajax({
			// 	url: '/j/app/data/volcabulary.json',
			// 	type: 'get',
			// 	success: function(json) {
			// 		_callback2(json, 1)
			// 	}
			// })
			store.set('volNum', '1')
			store.set('volErr', [])
			store.set('vocabularys', [])
			store.set('volCorrectAnswer', '')
			store.set('volId', '')
			renderUnitVol(store.get('volUnit'))
		} else {
			store.set('volNum', '1')
			store.set('volErr', [])
			store.set('vocabularys', [])
			store.set('volCorrectAnswer', '')
			store.set('volId', '')
			renderUnitVol(store.get('volUnit'))
		}
		$('body,html').animate({
			scrollTop: 0
		}, 100)
	}

	//只练错题
	var errOnlyVolFun = function() {
		$('body,html').animate({
			scrollTop: 0
		}, 100)
		if (isEmpty(tokenTmp)) {
			//游客
			// var param = {
			// 	"tmplName": TMPL.t8,
			// 	"tmplData": ""
			// }
			// renderTemplate(param)
			var volUnit = store.get('volUnit')
			store.set('volErrNum', 1)
			renderVolErr(1)
		} else {
			var volUnit = store.get('volUnit')
			store.set('volErrNum', 1)
				// localErr = store.get('volResult')
			renderVolErr(1)
		}
	}

	//只练错题中只练错题
	var errOnlyVolErrFun = function() {
		$('body,html').animate({
			scrollTop: 0
		}, 100)
		store.set('volErrNum', 1)
		renderVolErr(1)
	}

	//单词解析
	var renderXmlVol = function(wordXmls) {
		var wordXml = wordXmls.content;
		var sequenceNumber = "";
		if (!isEmpty(wordXmls.sequence_number)) {
			sequenceNumber = wordXmls.sequence_number;
		}

		var renderJson, volId, prompt, url, explanation, correctResponse, correctNum = 0;
		var simpleChoices = new Array();
		var word = $.xml2json(wordXml).itemBody;
		prompt = word.choiceInteraction.prompt;
		url = word.audio.url;
		explanation = word.explanation;
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
		store.set('volCorrectAnswer', correctNum)
		renderJson = {
			'volId': wordXmls.id,
			'volNum': store.getAll().volNum,
			'prompt': prompt,
			'url': url,
			'simpleChoices': simpleChoices,
			'explanation': explanation,
			'correctResponse': correctResponse,
			'correctNum': correctNum,
			'sequenceNumber': sequenceNumber
		};
		return renderJson;
	}

	//render某一单元首个单词
	var renderUnitVol = function(volUnit) {
		$.ajax({
			url: URL.baseURL + 'vocabulary_groups',
			data: {
				sequence_number: currentGroupSequneceNum
			},
			type: 'get',
			success: function(json) {
				currentQuestionIndex = 0,
				currentQuestion = {},
				records = [],
				errIds = [],
				localIndex = 0,
				localErr = [],
				localTmp = [];
				questions = json.vocabulary_questions;
				renderVol(1)
			}
		})
	}

	//render单词页面
	var renderVol = function(volNum) {
		var xml = $($(store.get('vocabularys')))[parseInt(volNum) - 1];
		var renderData = renderXmlVol(xml);
		var _afterRender = function() {
			$("#volUnit").html(store.get('volUnit'))
		};
		var param = {
			"tmplName": TMPL.t1,
			"tmplData": renderData,
			"afterRender": _afterRender
		}
		renderTemplate(param)
	}

	//render单词错题页面
	var renderVolErr = function(volErrNum) {
		var renderData = localErr[parseInt(volErrNum) - 1];
		var _afterRender = function() {
			$("#volUnit").html(store.get('volUnit'))
		};
		var param = {
			"tmplName": TMPL.t6,
			"tmplData": renderData,
			"afterRender": _afterRender
		}
		renderTemplate(param)
	}

	var getGroups = function() {
		questions = [];
		currentQuestionIndex = 0;
		currentQuestion = {};
		records = [];
		errIds = [];
		currentGroupIndex = 0, //记录当前groups数组位置
			currentGroupSequneceNum = "", //记录当前group的sequence_number
			localIndex = 0,
			localErr = [],
			localTmp = [];
		$.ajax({
			url: URL.baseURL + 'vocabulary_groups/group',
			type: 'get',
			headers: {
				"Authorization": tokenTmp
			},
			success: function(json) {
				groups = json.vocabulary_groups;
				var param = {
					"tmplName": TMPL.t3,
					"tmplData": groups,
					"afterRender": ""
				}
				renderTemplate(param)
			}
		})
	}

	var hisVolcabulary = function(param) {
		BaseCookie.get()
		tokenTmp = BaseCookie.getToken()
		if (isEmpty(tokenTmp)) {
			tokenTmp = tokenTmp1
		}
		var rate;
		var _callback = function(json) {
				for (var i = 0; i < json.vocabulary_groups.length; i++) {
					if (json.vocabulary_groups[i].id == param.groupId) {
						rate = json.vocabulary_groups[i].rate;
						break
					}
				}
				var data = {
					'volUnit': param.volUnit,
					'groupId': param.groupId,
					'rate': rate
				}
				unitVolDetailFun(data)
			}
			//游客
		if (isEmpty(tokenTmp)) {
			//游客
			$.ajax({
				url: URL.baseURL + 'vocabulary_groups/group',
				type: 'get',
				headers: {
					"Authorization": tokenTmp
				},
				success: function(json) {
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
				success: function(json) {
					unitCount = json.vocabulary_groups.length;
					_callback(json)
				}
			})
		}
	}

	//页面重新加载，用于exercise.js
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
		if (null == param || "" == param || tokenTmp1 == param) {
			return true
		} else {
			return false
		}
	}

	return {
		init: init,
		hisVolcabulary: hisVolcabulary
	}
})