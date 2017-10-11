'use strict'

define(['common/uniqueAjax', 'common/render', 'xml2json', 'app/baseURL', 'app/baseFinal', 'baseCookie', 'app/login/login', 'lib/store'], function(uniqueAjax, Render, xml2json, URL, Final, BaseCookie, Login) {
	var _conf,
		$wrap,
		tokenTmp,
		pgRenderData = new Array(),
		hotJJRenderData = new Array(),
		TMPL = {
			t1: 'app/home/learn/tmpl_learn',
			t2: 'app/home/learn/tmpl_login_niMing',
			t3: 'app/home/learn/tmpl_login_feiNoYue',
			t4: 'app/home/learn/tmpl_login_feiYue',
			t5: 'app/home/learn/tmpl_login_jiChu',
			t6: 'app/home/learn/tmpl_login_vip',
			t7: 'app/home/learn/tmpl_login_over'
		};

	var init = function(conf) {
		_conf = $.extend({
			wrap: ''
		}, conf || {})
		$wrap = $(_conf.wrap)
		BaseCookie.get()
		tokenTmp = BaseCookie.getToken();
		initEvent()
		Login.init()
		load()
	}

	var initEvent = function() {
		$(document).on('click', '#goCourse', function() {
			window.location.href = "../mall/html/courselist.html"
		})
		$(document).on('click', '#goQuestion', function() {
			_gaq.push(['_trackEvent', '53kf', 'clicked', '24ssx_bfjh_ZX']);
			fixedChat();
		})
		$(document).on('click', '#goMember', function() {
			window.location.href = "../html/member.html"
		})
		$(document).on('click', '#goLive', function() {
			window.open($(this).attr("data-coursesUrl"))
		})
		$(document).on('click', '#goExercise', function() {
			goExercise($(this).attr("data-moduleType"))
		})
		$(document).on('click', '#moreJJ', function() {
			store.set("eleNav", "jjNav")
			window.location.href = "../html/yuce.html";
		})
		$(document).on('click', '#downloadApp', function() {
			window.open("../html/downloadApp.html");
		})
		$(document).on('click', '#vol', function(e) {
			store.set("eleNav", "exeNav")
			var isToday = $(this).attr('data-has_today_task');
			if (isToday != 0) {
				clearToday(isToday)
			}
			pageInto(8)
		})
		$(document).on('click', '#gram', function(e) {
			store.set("eleNav", "exeNav")
			var isToday = $(this).attr('data-has_today_task');
			if (isToday != 0) {
				clearToday(isToday)
			}
			pageInto(2)
		})
		$(document).on('click', '#dic', function(e) {
			store.set("eleNav", "exeNav")
			var isToday = $(this).attr('data-has_today_task');
			if (isToday != 0) {
				clearToday(isToday)
			}
			pageInto(3)
		})
		$(document).on('click', '#pg', function() {
			store.set("eleNav", "exeNav")
			pageInto(5)
		})
		$(document).on('click', '#reWrite', function(e) {
			store.set("eleNav", "exeNav")
			var isToday = $(this).attr('data-has_today_task');
			if (isToday != 0) {
				clearToday(isToday)
			}
			pageInto(4)
		})
		$(document).on('click', '#listen', function(e) {
			store.set("eleNav", "exeNav")
			var isToday = $(this).attr('data-has_today_task');
			if (isToday != 0) {
				clearToday(isToday)
			}
			pageInto(9)
		})
		$(document).on('click', '#repeat', function() {
			store.set("eleNav", "exeNav")
			pageInto(13)
		})
		$(document).on('click', '#tpoWrite', function(e) {
			store.set("eleNav", "exeNav")
			var isToday = $(this).attr('data-has_today_task');
			if (isToday != 0) {
				clearToday(isToday)
			}
			pageInto(14)
		})
		$(document).on('click', '#jinJie1', function(e) {
			pageIntoJinJie(1)
		})
		$(document).on('click', '#jinJie2', function(e) {
			pageIntoJinJie(2)
		})
		$(document).on('click', '#jinJie3', function(e) {
			pageIntoJinJie('3_3')
		})
		$(document).on('click', '#jinJie4', function(e) {
			pageIntoJinJie(77)
		})
		$(document).on('click', '#jinJie5', function(e) {
			pageIntoJinJie(3)
		})
		$(document).on('click', '#jinJie6', function(e) {
			pageIntoJinJie(66)
		})
		$(document).on('click', '#chongCi1', function(e) {
			pageIntoChongCi(7)
		})
		$(document).on('click', '#chongCi2', function(e) {
			pageIntoChongCi(10)
		})
		$(document).on('click', '#chongCi3', function(e) {
			pageIntoChongCi('4_3')
		})
		$(document).on('click', '#chongCi4', function(e) {
			pageIntoChongCi('1_3')
		})
		$(document).on('click', '#chongCi5', function(e) { //历年口语
			pageIntoChongCi('4_2')
		})
		$(document).on('click', '#chongCi6', function(e) { //历年写作
			pageIntoChongCi('1_2')
		})
		$(document).on('click', '#loginHome', function(e) {
			$('#dialogLogin').modal({
				backdrop: 'static'
			})
		})
		$('#dialogLogin').bind('hidden.bs.modal', function(e) {
			tokenTmp = BaseCookie.getToken();
			if ("" != tokenTmp && null != tokenTmp && 'xiaoma' != tokenTmp) {
				BaseCookie.get();
				getToday()
			}
		});
	}

	//页面加载
	var load = function() {
		Render.render({
			wrap: $("#homeLeft"),
			tmpl: {
				tmplName: TMPL.t1,
				tmplData: ''
			}
		});

		// if (isEmpty(tokenTmp)) {
		// 	$.ajax({
		// 		url: URL.URLMall + 'm_order/myDirectSeedingAndTodayHyPlan.action',
		// 		headers: {
		// 			"token": tokenTmp,
		// 			"fromType": 'web',
		// 			"systemId": Final.systemId.tuoFu
		// 		},
		// 		type: 'post',
		// 		success: function(json) {
		// 			if (json.status != 1) {
		// 				var renderData = {
		// 					today: (new Date().getMonth() + 1) + "月" + new Date().getDate() + "日",
		// 					latest: (new Date(json.result.coursesObj.examDate).getMonth() + 1) + "月" + new Date().getDate() + "日",
		// 				};
		// 				Render.render({
		// 					wrap: $("#homeRight"),
		// 					tmpl: {
		// 						tmplName: TMPL.t2,
		// 						tmplData: renderData
		// 					}
		// 				});
		// 			}
		// 		}
		// 	})
		// } else {
		// 	getToday()
		// }
	}

	//首页课程和练习中心
	var getToday = function() {
		$.ajax({
			url: URL.URLMall + 'm_order/myDirectSeedingAndTodayHyPlan.action',
			headers: {
				"token": tokenTmp,
				"fromType": 'web',
				"systemId": Final.systemId.tuoFu
			},
			type: 'post',
			success: function(json) {
				if (json.status != 1) {
					var result = json.result.coursesObj;
					var renderData = {};
					if (result.memberId == 172) { //普通会员
						// $.ajax({
						// 	url: URL.baseURL10 + 'question/getTodayHyPlan.action',
						// 	headers: {
						// 		"token": tokenTmp,
						// 		"fromType": 'web'
						// 	},
						// 	async: false,
						// 	type: 'get',
						// 	success: function(json) {
						// if (json.status == 0) {
						var moduleInfoList = []
						var questionContent = []
						var todayHyPlan = result.todayHyPlan
						if (todayHyPlan) {
							$.each(todayHyPlan.moduleInfoList, function(index, value) {
								var isShow = true;
								var arr = [9, 10, 22, 23, 24, 25, 26, 65, 66, 67];
								if ($.inArray(value.moduleType, arr) != -1) {
									isShow = false
								}
								var tmp = {
									isShow: isShow,
									moduleType: value.moduleType,
									moduleName: value.moduleName
								}
								moduleInfoList.push(tmp)
							});
							renderData.productId = todayHyPlan.productId
							var questionContentTmp = todayHyPlan.questionContent.split(',')
							$.each(questionContentTmp, function(index, value) {
								var tmp = {}
								tmp.cname = value.split(':')[0]
								tmp.ccount = value.split(':')[1]
								questionContent.push(tmp)
							});
						}

						renderData = {
							nickName: $('#nameNav').text(),
							today: (new Date().getMonth() + 1) + "月" + new Date().getDate() + "日",
							latest: (new Date(result.examDate).getMonth() + 1) + "月" + new Date().getDate() + "日",
							questionContent: questionContent,
							// productId: todayHyPlan.productId,
							// description: todayHyPlan.description,
							moduleInfoList: moduleInfoList
						}

						Render.render({
							wrap: $("#homeRight"),
							tmpl: {
								tmplName: TMPL.t5,
								tmplData: renderData
							}
						});
						// }
						// }
						// })
					} else if (result.memberId == 173 || result.memberId == 174) { //173铁杆会员  174 VIP会员
						// $.ajax({
						// 	url: URL.baseURL10 + 'question/getTodayHyPlan.action',
						// 	headers: {
						// 		"token": tokenTmp,
						// 		"fromType": 'web'
						// 	},
						// 	async: false,
						// 	type: 'get',
						// 	success: function(json) {
						// if (json.status == 0) {
						var currentList = [],
							nextList = [];
						$.each(result.currentList, function(index, value) {
							var name = value.name.replace('（', '(').replace('）', ')')
							var tmp = {
								name: name.substring(0, name.indexOf('(')),
								nameSub: name.substring(name.indexOf('(') + 1, name.indexOf(')')),
								startTime: getTimeToday(value.startTime),
								endTime: getTimeToday(value.endTime),
								productId: value.productId,
								productTypeId: value.productTypeId,
								coursesUrl: value.coursesUrl
							}
							currentList.push(tmp)
						});
						$.each(result.nextList, function(index, value) {
							var name = value.name.replace('（', '(').replace('）', ')')
							var tmp = {
								name: name.substring(0, name.indexOf('(')),
								nameSub: name.substring(name.indexOf('(') + 1, name.indexOf(')')),
								startTime: getTimeToday(value.startTime),
								endTime: getTimeToday(value.endTime),
								productId: value.productId,
								productTypeId: value.productTypeId,
								coursesUrl: value.coursesUrl
							}
							nextList.push(tmp)
						});

						var moduleInfoList = []
						var todayHyPlan = result.todayHyPlan
						if (todayHyPlan) {
							$.each(todayHyPlan.moduleInfoList, function(index, value) {
								var isShow = true;
								var arr = [9, 10, 22, 23, 24, 25, 26, 65, 66, 67];
								if ($.inArray(value.moduleType, arr) != -1) {
									isShow = false
								}
								var tmp = {
									isShow: isShow,
									moduleType: value.moduleType,
									moduleName: value.moduleName
								}
								moduleInfoList.push(tmp)
							});
							renderData.productId = todayHyPlan.productId
							var questionContent = []
							var questionContentTmp = todayHyPlan.questionContent.split(',')
							$.each(questionContent, function(index, value) {
								var tmp = {}
								tmp.cname = value.split(':')[0]
								tmp.ccount = value.split(':')[1]
								questionContent.push(tmp)
							});
							renderData.questionContent = questionContent
						}

						renderData = {
							vipName: result.vipName,
							nickName: $('#nameNav').text(),
							today: (new Date().getMonth() + 1) + "月" + new Date().getDate() + "日",
							latest: (new Date(result.examDate).getMonth() + 1) + "月" + new Date().getDate() + "日",
							// productId: todayHyPlan.productId,
							// description: todayHyPlan.description,
							moduleInfoList: moduleInfoList,
							latest: (new Date(result.examDate).getMonth() + 1) + "月" + new Date().getDate() + "日",
							currentList: currentList,
							nextList: nextList
						}

						Render.render({
							wrap: $("#homeRight"),
							tmpl: {
								tmplName: TMPL.t6,
								tmplData: renderData
							}
						});
						// 	}
						// }
						// })
					} else { //非会员
						if (result.currentList && result.currentList.length > 0) {
							var currentList = [],
								nextList = [];
							$.each(result.currentList, function(index, value) {
								var name = value.name.replace('（', '(').replace('）', ')')
								var tmp = {
									name: name.substring(0, name.indexOf('(')),
									nameSub: name.substring(name.indexOf('(') + 1, name.indexOf(')')),
									startTime: getTimeToday(value.startTime),
									endTime: getTimeToday(value.endTime),
									productId: value.productId,
									productTypeId: value.productTypeId,
									coursesUrl: value.coursesUrl
								}
								currentList.push(tmp)
							});
							$.each(result.nextList, function(index, value) {
								var name = value.name.replace('（', '(').replace('）', ')')
								var tmp = {
									name: name.substring(0, name.indexOf('(')),
									nameSub: name.substring(name.indexOf('(') + 1, name.indexOf(')')),
									startTime: getTimeToday(value.startTime),
									endTime: getTimeToday(value.endTime),
									productId: value.productId,
									productTypeId: value.productTypeId,
									coursesUrl: value.coursesUrl
								}
								nextList.push(tmp)
							});

							renderData = {
								nickName: $('#nameNav').text(),
								today: (new Date().getMonth() + 1) + "月" + new Date().getDate() + "日",
								latest: (new Date(result.examDate).getMonth() + 1) + "月" + new Date().getDate() + "日",
								currentList: currentList,
								nextList: nextList
							}

							Render.render({
								wrap: $("#homeRight"),
								tmpl: {
									tmplName: TMPL.t4,
									tmplData: renderData
								}
							});
						} else { //非会员，且没有约课的用户登陆效果
							renderData = {
								nickName: $('#nameNav').text(),
								today: (new Date().getMonth() + 1) + "月" + new Date().getDate() + "日",
								latest: ""
							}
							Render.render({
								wrap: $("#homeRight"),
								tmpl: {
									tmplName: TMPL.t3,
									tmplData: renderData
								}
							});
						}
					}
				}
			},
			error: function() {}
		})
	}

	var goExercise = function(param) {
		switch (param) {
			case '1': //听写
				pageInto(3)
				break;
			case '2': //音译互辨
			case '3':
			case '4':
			case '5':
				pageInto(9)
				break;
			case '6': //tpo听力
				pageIntoJinJie(2)
				break;
			case '8': //tpo听力刷题
				pageIntoChongCi(10)
				break;
			case '21': //综合口语练习
				pageIntoJinJie('3_3')
				break;
			case '27': //历年真题口语练习
				pageIntoChongCi('4_2')
				break;
			case '28': //独立口语练习
				pageIntoJinJie(3)
				break;
			case '41': //词汇
				pageInto(8)
				break;
			case '42': //语法
				pageInto(2)
				break;
			case '43': //tpo阅读
				pageIntoJinJie(1)
				break;
			case '45': //tpo阅读刷题
				pageIntoChongCi(7)
				break;
			case '61': //记忆复习
				pageInto(4)
				break;
			case '64': //阅读填空
				pageInto(14)
				break;
			case '68': //综合写作练习
				pageIntoJinJie(77)
				break;
			case '69': //独立写作练习
				pageIntoJinJie(66)
				break;
			case '70': //历年真题写作练习
				pageIntoChongCi('1_2')
				break;
		}
	}

	//首页五大模块跳转
	var pageInto = function(triger) {
			$.cookie(Final.TOEFL_TRIGGER, triger)
			window.location.href = "../html/exercise.html"
		}
		//进阶模块跳转
	var pageIntoJinJie = function(triger) {
			$.cookie(Final.TOEFL_TRIGGER, triger)
			window.location.href = "../html/jinJie.html"
		}
		//冲刺模块跳转
	var pageIntoChongCi = function(triger) {
		$.cookie(Final.TOEFL_TRIGGER, triger)
		window.location.href = "../html/chongCi.html"
	}

	//点击今日任务模块传给后台参数
	var clearToday = function(param) {
		$.ajax({
			url: URL.baseURL9 + 'homes/visit_exercise_module',
			async: false,
			headers: {
				"Authorization": tokenTmp
			},
			data: {
				module_type: param
			},
			type: 'post',
			success: function(json) {}
		})
	}

	var buildWriteData = function(json) {
		var hot_exercises = json.hot_exercises;
		var result = new Array();
		$.each(hot_exercises, function(key, val) {
			var tmp = {};
			tmp.id = val.id;
			tmp.content = val.content;
			tmp.sequence_number = val.sequence_number;
			tmp.title = val.title;
			tmp.answer_id = val.answer_id;
			tmp.category = 'wjj';
			tmp.type = val.type;
			tmp.score = val.score;
			result.push(tmp);
		});
		return result;
	}

	var getTimeToday = function(param) {
		var date = new Date();
		date.setTime(param);
		var hour = date.getHours();
		var minute = date.getMinutes();
		var second = date.getSeconds();

		hour = hour < 10 ? "0" + hour : hour;
		minute = minute < 10 ? "0" + minute : minute;
		second = second < 10 ? "0" + second : second;
		return (hour + ":" + minute + ":" + second);
	}

	var isEmpty = function(param) {
		if (null == param || "" == param || "xiaoma" == param) {
			return true
		} else {
			return false
		}
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

	return {
		init: init
	}
})