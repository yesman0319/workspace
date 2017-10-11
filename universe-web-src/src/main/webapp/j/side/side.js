'use strict'

define(['common/uniqueAjax', 'common/render', 'common/responser', 'app/baseURL', 'app/baseFinal', 'cookie'], function(uniqueAjax, Render, Responser, URL, Final) {
	var _conf,
		$wrap,
		TMPL = {
			t1: 'app/person/tmpl_person_side'
		};
	var init = function(conf) {
		_conf = $.extend({
			wrap: '',
			data: ''
		}, conf || {})
		$wrap = $(_conf.wrap)
		load(_conf.data)
	}

	var initPerson = function(conf) {
		_conf = $.extend({
			wrap: '',
			data: ''
		}, conf || {})
		$wrap = $(_conf.wrap)
		loadPerson(_conf.data)
	}

	var initJinJie = function(conf) {
		_conf = $.extend({
			wrap: '',
			data: ''
		}, conf || {})
		$wrap = $(_conf.wrap)
		loadJinJie(_conf.data)
	}

	var initChongCi = function(conf) {
		_conf = $.extend({
			wrap: '',
			data: ''
		}, conf || {})
		$wrap = $(_conf.wrap)
		loadChongCi(_conf.data)
	}

	var load = function(renderData) {
		var _afterRender = function() {
			//置左侧导航默认选中项
			$("#wirte_menu_div").css("display", "none"); //设置写作批改菜单为隐藏
			// if (location.href.indexOf('?') == -1) {
			
			if (isEmpty($.cookie(Final.TOEFL_TRIGGER))) {
				// $("#side8").trigger("trigger_side8")
				$("#side1").trigger("trigger_side1")
			} else {
				var tmp = $.cookie(Final.TOEFL_TRIGGER);
				//$.cookie(Final.TOEFL_TRIGGER, "")
				$("#side" + tmp).trigger("trigger_side" + tmp)
			}
			// }
		};
		Render.render({
			wrap: $wrap,
			tmpl: {
				tmplName: 'side/tmpl_side',
				tmplData: renderData
			},
			afterRender: _afterRender
		})

	}

	var loadPerson = function(renderData) {
		var _afterRender = function() {
			//置左侧导航默认选中项
			// Render.render({
			// 	wrap: $("#sidePerson"),
			// 	tmpl: {
			// 		tmplName: 'app/person/tmpl_person_side',
			// 		tmplData: ""
			// 	},
			// 	afterRender: ""
			// })
			// $("#side1").trigger("trigger_side1")
		};
		Render.render({
			wrap: $wrap,
			tmpl: {
				tmplName: 'side/tmpl_side_person',
				// tmplData: ""
				tmplData: renderData
			},
			afterRender: _afterRender
		})

	}

	var loadJinJie = function(renderData) {
		var _afterRender = function() {
			// $("#side1").trigger("trigger_side1")
			//置左侧导航默认选中项
			console.log($.cookie(Final.TOEFL_TRIGGER));
			if (isEmpty($.cookie(Final.TOEFL_TRIGGER))) {
				$("#side1").trigger("trigger_side1")
			} else {
				var tmp = $.cookie(Final.TOEFL_TRIGGER);
				//$.cookie(Final.TOEFL_TRIGGER, "")
				$("#side" + tmp).trigger("trigger_side" + tmp)
			}
		};
		Render.render({
			wrap: $wrap,
			tmpl: {
				tmplName: 'side/tmpl_side_jinjie',
				// tmplData: ""
				tmplData: renderData
			},
			afterRender: _afterRender
		})
	}

	var loadChongCi = function(renderData) {
		var _afterRender = function() {
			// $("#side1").trigger("trigger_side1")
			//置左侧导航默认选中项
			if (isEmpty($.cookie(Final.TOEFL_TRIGGER))) {
				$("#side1").trigger("trigger_side1")
			} else {
				var tmp = $.cookie(Final.TOEFL_TRIGGER);
				//$.cookie(Final.TOEFL_TRIGGER, "")
				if (tmp == '1_3') {
					$("#side9").trigger("trigger_side" + tmp)
				} else if (tmp == '4_3') {
					$("#side8").trigger("trigger_side" + tmp)
				} else if (tmp == '1_2') {
					$("#side9").trigger("trigger_side" + tmp)
				} else if (tmp == '4_2') {
					$("#side8").trigger("trigger_side" + tmp)
				} else {
					$("#side" + tmp).trigger("trigger_side" + tmp)
				}
			}
		};
		Render.render({
			wrap: $wrap,
			tmpl: {
				tmplName: 'side/tmpl_side_chongci',
				// tmplData: ""
				tmplData: renderData
			},
			afterRender: _afterRender
		})
	}

	var load1 = function(param) {
		var _callback, renderData, _afterRender
		_callback = function(json) {
			//renderData = Render.convJSON2Data(json)

			Render.render({
				wrap: $wrap,
				tmpl: {
					tmplName: 'side/tmpl_side',
					tmplData: renderData
				},
				afterRender: _afterRender
			})
		}

		Render.loadData({
			url: param.url,
			param: param.params,
			success: _callback
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
		init: init,
		initPerson: initPerson,
		initJinJie: initJinJie,
		initChongCi: initChongCi,
		load: load,
		loadPerson: loadPerson,
		loadJinJie: loadJinJie,
		loadChongCi: loadChongCi
	}
})