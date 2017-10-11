'use strict'

define(['common/uniqueAjax', 'common/render', 'app/baseURL', 'baseCookie'], function(uniqueAjax, Render, URL, BaseCookie) {
	var _conf,
		$wrap,
		tokenTmp,
		TMPL = {
			t1: 'app/exercise/tmpl_exercise'
		};

	var init = function(conf) {
		_conf = $.extend({
			wrap: ''
		}, conf || {})
		$wrap = $(_conf.wrap)
		BaseCookie.get()
		tokenTmp = BaseCookie.getToken();
		initEvent()
		load()
	}

	var load = function() {
		var hisVol,
			hisGram,
			hisDic,
			renderData;
		var _success1 = function(json) {
			hisVol = {
				'sequence_number': isEmpty(json.vocabulary_footprint) ? "" : json.vocabulary_footprint.sequence_number,
				'time': ''
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
				'time': ''
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
				'sequence_number': isEmpty(json) ? "" : json.dictation_question.sequence_number,
				'time': ''
			}
			renderData = {
				"hisVol": hisVol,
				"hisGram": hisGram,
				'hisDic': hisDic
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

	var initEvent = function() {

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
		if (null == param || "" == param) {
			return true
		} else {
			return false
		}
	}

	return {
		init: init
	}
})