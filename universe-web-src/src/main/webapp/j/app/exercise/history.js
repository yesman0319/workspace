'use strict'

define(['common/uniqueAjax', 'common/render', 'xml2json', 'app/baseURL', 'baseCookie', 'app/baseFinal', 'app/exercise/volcabulary', 'app/exercise/grammar', 'app/exercise/dictation', 'app/exercise/listen', 'lib/store'], function(uniqueAjax, Render, xml2json, URL, BaseCookie, Final, Volcabulary, Grammar, Dictation, Listen) {
	var _conf,
		$wrap,
		tokenTmp,
		userId,
		TMPL = {
			t1: 'app/exercise/tmpl_history',
			t2: 'app/exercise/tmpl_history_login'
		},
		tokenTmp1 = "xiaoma";

	var init = function(conf) {
		_conf = $.extend({
			wrap: ''
		}, conf || {})
		$wrap = $(_conf.wrap)
		initConfig();
		initEvent()
	}

	var initConfig = function() {
		BaseCookie.get();
		tokenTmp = BaseCookie.getToken();
		if (isEmpty(tokenTmp)) {
			tokenTmp = tokenTmp1
		}
		userId = BaseCookie.getId();
	}

	var initEvent = function() {
		$(document).on('trigger_side1', '#side1', historyFun);
		$(document).on('click', '#side1', historyFun);
		$(document).on('click', '#side12', function() {
			$('.sidebar-ul').find('a.sidebarLight').removeClass('sidebarLight');
			$('.sidebar-ul').find('li.sidebarLight').removeClass('sidebarLight');
			$("#side12").addClass('sidebarLight')
			$("#side12").parent().siblings().find(".sidebarLight").removeClass('sidebarLight');
			toDoRender()
		});
		//$(document).on('click', '#side13', function() {
		//	$('.sidebar-ul').find('a.sidebarLight').removeClass('sidebarLight');
		//	$('.sidebar-ul').find('li.sidebarLight').removeClass('sidebarLight');
		//	$("#side13").addClass('sidebarLight')
		//	$("#side13").parent().siblings().find(".sidebarLight").removeClass('sidebarLight');
		//	toDoRender()
		//});
		//$(document).on('click', '#side14', function() {
		//	$('.sidebar-ul').find('a.sidebarLight').removeClass('sidebarLight');
		//	$('.sidebar-ul').find('li.sidebarLight').removeClass('sidebarLight');
		//	$("#side14").addClass('sidebarLight')
		//	$("#side14").parent().siblings().find(".sidebarLight").removeClass('sidebarLight');
		//	toDoRender()
		//});
		$(document).on('click', '#hisLogin', function() {
			$('#dialogLogin').modal({
				backdrop: 'static'
			})
			$('#dialogLogin').bind('hidden.bs.modal', function(e) {
				BaseCookie.get()
				if (!isEmpty(BaseCookie.getToken())) {
					tokenTmp = BaseCookie.getToken()
					historyFun()
				}
			})
		});
		$(document).on('click', '.hisGo', function(e) {
			var type = $(e.target).attr('data-type');
			if (type == 1) {
				// $.cookie(Final.TOEFL_TRIGGER, 8)
				// var volUnit = $(e.target).attr('data-unit'),
				// 	groupId = $(e.target).attr('data-groupId');
				// var redirectObj = {
				// 	'volUnit': volUnit,
				// 	'groupId': groupId
				// }
				// store.set('redirectObj', redirectObj);
				// window.location.href = "../html/exercise.html";
				$('.sidebar-ul').find('a.sidebarLight').removeClass('sidebarLight');
				$('.sidebar-ul').find('li.sidebarLight').removeClass('sidebarLight');
				$("#side8").addClass('sidebarLight');
				$("#side8").parent().siblings().removeClass('sidebarLight');

				var param = {}
				param.volUnit = $(e.target).attr('data-unit');
				param.groupId = $(e.target).attr('data-groupId');
				param.avg_speed = $(e.target).attr('data-avg_speed');
				param.group_level = $(e.target).attr('data-group_level');
				Volcabulary.hisVolcabulary(param)
			} else if (type == 2) {
				$('.sidebar-ul').find('a.sidebarLight').removeClass('sidebarLight');
				$('.sidebar-ul').find('li.sidebarLight').removeClass('sidebarLight');
				$("#side2").addClass('sidebarLight');
				$("#side2").parent().siblings().removeClass('sidebarLight');
				var groupId = $(e.target).attr('data-groupId');
				Grammar.historyTo(groupId);
			} else if (type == 3) {

				var dicGroupSeqNum = $(e.target).attr('data-unit');
				var dicGroupId = $(e.target).attr('data-unitId');
				Dictation.historyTo(dicGroupId, dicGroupSeqNum);
				$('.sidebar-ul').find('a.sidebarLight').removeClass('sidebarLight');
				$('.sidebar-ul').find('li.sidebarLight').removeClass('sidebarLight');
				$("#side3").addClass('sidebarLight');
				$("#side3").parent().siblings().removeClass('sidebarLight');
			} else {
				var param = {}
				param.index = $(e.target).attr('data-index');
				param.sequence_number = $(e.target).attr('data-sequence_number');
				param.type = $(e.target).attr('data-type').substring(1, 2);
				param.error_question_ids = $(e.target).attr('data-error_question_ids');
				param.avg_speed = $(e.target).attr('data-avg_speed');

				if (type == 11 || type == 12) {
					//左侧导航active
					$('.sidebar-ul').find('a.sidebarLight').removeClass('sidebarLight');
					$('.sidebar-ul').find('li.sidebarLight').removeClass('sidebarLight');
					$("#listen_menu_div").slideDown();
					$("#side10").addClass('sidebarLight');
					$("#side10").parent().siblings().removeClass('sidebarLight');
				} else {
					$('.sidebar-ul').find('a.sidebarLight').removeClass('sidebarLight');
					$('.sidebar-ul').find('li.sidebarLight').removeClass('sidebarLight');
					$("#listen_menu_div").slideDown();
					$("#side11").addClass('sidebarLight');
					$("#side11").parent().siblings().removeClass('sidebarLight');
				}
				Listen.hisListen(param)
			}
		});
	}

	//练习历史点击
	var historyFun = function() {
		BaseCookie.get()
		tokenTmp = BaseCookie.getToken()
		if (isEmpty(tokenTmp)) {
			tokenTmp = tokenTmp1
		}
		$('.sidebar-ul').find('a.sidebarLight').removeClass('sidebarLight');
		$('.sidebar-ul').find('li.sidebarLight').removeClass('sidebarLight');
		$("#side1").addClass('sidebarLight')
		$("#side1").parent().siblings().find(".sidebarLight").removeClass('sidebarLight');
		if (isEmpty(tokenTmp)) {
			var param = {
				"tmplName": TMPL.t2,
				"tmplData": "",
				"afterRender": function() {}
			}
			renderTemplate(param)
		} else {
			var hisVol,
				hisGram,
				hisDic,
				hisLis,
				renderData;
			var _success1 = function(json) {
				hisVol = {
					'sequence_number': isEmpty(json.vocabulary_footprint) ? "" : json.vocabulary_footprint.sequence_number,
					'created_at': isEmpty(json.vocabulary_footprint) ? "" : json.vocabulary_footprint.result_created_at.substring(0, 19).replace("T", "&nbsp;&nbsp;"),
					'id': isEmpty(json.vocabulary_footprint) ? "" : json.vocabulary_footprint.id,
					'avg_speed': isEmpty(json.vocabulary_footprint) ? "" : json.vocabulary_footprint.avg_speed,
					'group_level': isEmpty(json.vocabulary_footprint) ? "" : json.vocabulary_footprint.group_level
				}
				$.ajax({
					url: URL.baseURL + "grammar_footprints",
					type: 'GET',
					headers: {
						Authorization: tokenTmp,
					},
					success: function(json) {
						_success2(json)
					}
				})
			}
			var _success2 = function(json) {
				hisGram = {
					'sequence_number': isEmpty(json.grammar_footprint) ? "" : json.grammar_footprint.sequence_number,
					'created_at': isEmpty(json.grammar_footprint) ? "" : json.grammar_footprint.result_created_at.substring(0, 19).replace("T", "&nbsp;&nbsp;"),
					'id': isEmpty(json.grammar_footprint) ? "" : json.grammar_footprint.id,
					'avg_speed': isEmpty(json.grammar_footprint) ? "" : json.grammar_footprint.avg_speed,
					'group_level': isEmpty(json.grammar_footprint) ? "" : json.grammar_footprint.group_level
				}
				$.ajax({
					url: URL.baseURL + "dictation_footprints",
					type: 'GET',
					headers: {
						Authorization: tokenTmp,
					},
					success: function(json) {
						_success3(json)
					}
				})
			}
			var _success3 = function(json) {
				hisDic = {
					'sequence_number': isEmpty(json.dictation_footprints) ? "" : json.dictation_footprints.unit_sequence_number,
					'created_at': isEmpty(json.dictation_footprints) ? "" : json.dictation_footprints.result_created_at.substring(0, 19).replace("T", "&nbsp;&nbsp;"),
					'id': isEmpty(json.dictation_footprints) ? "" : json.dictation_footprints.id,
					'unit_id': isEmpty(json.dictation_footprints) ? "" : json.dictation_footprints.unit_id,
					'avg_speed': isEmpty(json.dictation_footprints) ? "" : json.dictation_footprints.avg_speed,
					'group_level': isEmpty(json.dictation_footprints) ? "" : json.dictation_footprints.group_level
				}
				$.ajax({
					url: URL.baseURL9 + "listen_vocabulary_footprints",
					type: 'GET',
					headers: {
						Authorization: tokenTmp,
					},
					success: function(json) {
						_success4(json)
					}
				})
			}
			var _success4 = function(json) {
				hisLis = {
					'sequence_number': isEmpty(json.listen_footprint) ? "" : json.listen_footprint.sequence_number,
					'created_at': isEmpty(json.listen_footprint) ? "" : json.listen_footprint.create_at.substring(0, 19).replace("T", "&nbsp;&nbsp;"),
					'type': isEmpty(json.listen_footprint) ? "" : json.listen_footprint.type,
					'index': isEmpty(json.listen_footprint) ? "" : json.listen_footprint.index,
					'error_question_ids': isEmpty(json.listen_footprint) ? "" : JSON.stringify(json.listen_footprint.error_question_ids),
					'avg_speed': isEmpty(json.listen_footprint) ? "" : json.listen_footprint.avg_speed,
					'group_level': isEmpty(json.listen_footprint) ? "" : json.listen_footprint.group_level
				}
				renderData = {
					"hisVol": hisVol,
					"hisGram": hisGram,
					'hisDic': hisDic,
					'hisLis': hisLis
				}
				var param = {
					"tmplName": TMPL.t1,
					"tmplData": renderData,
					"afterRender": function() {}
				}
				renderTemplate(param)
			}


			$.ajax({
				url: URL.baseURL + "vocabulary_footprints",
				type: 'GET',
				headers: {
					Authorization: tokenTmp,
				},
				success: function(json) {
					_success1(json)
				}
			})
		}
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
		init: init
	}
})