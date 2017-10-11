'use strict'

define(['common/uniqueAjax', 'common/render', 'xml2json', 'app/baseURL', 'baseCookie', 'lib/store'], function(uniqueAjax, Render, xml2json, URL, BaseCookie) {
	var _conf, $wrap;
	var tokenTmp;
	var user_id;
	var currentZTGroupId;
	var currentQuestions = new Array();
	var section;

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
		user_id = BaseCookie.getId();
	}

	var initEvent = function() {
		$(document).on('trigger_side5', '#side5', menuToggle);
		$(document).on('trigger_side6', '#side6', writeJiJing);
		$(document).on('trigger_side7', '#side7', writeSimulation)
		$(document).on('click', '#side5', menuToggle); //menu toggle
		$(document).on('click', '#side6', writeJiJing);
		$(document).on('click', '#side7', writeSimulation);
		$(document).on('click', '.item', showAnswerList1); //should be many
		$(document).on('click', '#go1', go1);
		$(document).on('click', '#go2', go2);
		$(document).on('click', '#jijingSample', jijingSample);
		$(document).on('click', '#articleSubmit', articleSubmit);
		$(document).on('click', '.rightItem', showAnswerList1);
		$(document).on('click', '.wslTab', loadTabData);
		// $(document).on('click', '#btnLogin', login);
		$(document).on('keyup', '#articleAnswer', checkLength);
		$(document).on('click', '#doAgain', doAgain);
		$(document).on('click', '.article_item', article_item);

	}

	var checkLength = function() {
		var max = 4000;
		var length = $(this).val().length;
		if (length > max) {
			$(this).val($(this).val().substring(0, max));
		}
	}

	var reloadQuestions = function() {
		// console.log(tokenTmp);
		if ($('#jijing_question_id').attr('from') == 'home') {
			$.ajax({
				url: URL.baseURL + 'hot_exercises',
				headers: {
					"Authorization": tokenTmp
				},
				type: 'get',
				success: function(json) {
					var renderData = {};
					if (section == 'hotPG') {
						currentQuestions = buildWriteData(json.writing_questions); //保存当前下载题目
					} else {
						currentQuestions = buildWriteData(json.forecast_writings); //保存当前下载题目
					}
					renderData.questions = currentQuestions;
					Render.render({
						wrap: $('#rightitems'),
						tmpl: {
							tmplName: 'app/exercise/tmpl_write_detail_right',
							tmplData: renderData
						}
					});
					// hotJJRenderData = buildWriteData(json.forecast_writings);

				}
			});
			return;
		} //结束



		var category = $('#jijing_question_id').attr('category');
		var url;
		var data;

		if (category == 'wsl') {
			url = URL.baseURL + "jijing_questions";
			data = {
				id: currentZTGroupId,
				question_type: 2
			};
		} else {
			url = URL.baseURL + "jijing_groups/yuce";
			data = {
				question_type: 2
			};
		}
		$.ajax({
			url: url,
			type: 'get',
			data: data,
			dataType: "json",
			headers: {
				"Authorization": tokenTmp
			},
			success: function(json) {
				var questionsArray = new Array();
				var renderData = {};
				$.each(json.jijing_questions, function(key, val) {
					var tmp = {};
					tmp.id = val.id;
					tmp.content = val.content;
					tmp.sequence_number = val.sequence_number;
					tmp.title = val.title;
					tmp.answer_id = val.answer_id;
					tmp.category = category;
					tmp.type = val.type;
					tmp.score = val.score;
					questionsArray.push(tmp);
				});
				currentQuestions = questionsArray; //保存当前下载题目
				renderData.questions = currentQuestions;
				Render.render({
					wrap: $('#rightitems'),
					tmpl: {
						tmplName: 'app/exercise/tmpl_write_detail_right',
						tmplData: renderData
					}
				});
			}
		});
	}
	var articleSubmit = function() {
		//http://192.168.1.115:3000/api/v1/articles
		// debugger;
		if (!BaseCookie.getToken()) {
			$('#dialogLogin').modal({
				backdrop: 'static'
			});
			$('#dialogLogin').on('hidden.bs.modal', function(e) {
				BaseCookie.get()
				if (BaseCookie.getToken()) {
					tokenTmp = BaseCookie.getToken()
					user_id = BaseCookie.getId();
					reloadQuestions();
					//callback_submit()
				}
			})
			return;
		}
		// debugger;
		var articleAnswer = $('#articleAnswer').val();
		var jijing_question_id = $('#jijing_question_id').attr('jqid'); //jijing_question_id
		var jijing_question_seqNum = $('#jijing_question_id').attr('jqSeqNum');
		var from = $('#jijing_question_id').attr('from');
		var qContent = $('#jijing_question_id').attr('qContent');
		var aContent = $('#articleAnswer').val();
		if (aContent.length < 50) {
			alert("最少输入50个字符");
			return;
		}
		var aContent = aContent.substring(0, 4000).replace(/\n/g, "<br>");
		var pdata = {};
		pdata.content = articleAnswer;
		// pdata.user_id = user_id;
		pdata.jijing_question_id = jijing_question_id;
		$.ajax({
			url: URL.baseURL5 + "articles/mark_article",
			type: "POST",
			data: JSON.stringify(pdata),
			headers: {
				"Authorization": tokenTmp,
				"Content-Type": "application/json"
			},
			success: function(json, textStatus, jqXHR) {
				// if (jqXHR.status == 205) {
				// 	alert("这道题已经做过");
				// 	return;
				// }
				// console.log("post answer successful!");

				// console.log("post answer successful");
				// var params = {};
				// params.category = $('#go2').attr('category');
				// params.questionId = jijing_question_id;
				// params.type = 2;//只要不是0
				// renderData.sequence_number = jijing_question_seqNum;
				// renderData.content = qContent;
				// renderData.answerContent = aContent;
				// renderData.from = from;
				// renderData.questions = currentQuestions;
				// renderData.title = $('#groupTitle').attr('data');

				// $("#side").css("display", "none");
				// Render.render({
				// 	wrap: $wrap,
				// 	tmpl: {
				// 		tmplName: 'app/exercise/tmpl_write_detail_1',
				// 		tmplData: renderData
				// 	}
				// });
 	 			if(json && json.error){
 	 				alert(json.error);
 	 				return;
 	 			} else {
 	 				console.log("post answer successful");
 	 				var params = {};
					params.category = $('#go2').attr('category');
					params.questionId = jijing_question_id;
					params.type = 2;//只要不是0
					showAnswerList(params);
 	 			}
    // 			var params = {};
				// params.category = $('#go2').attr('category');
				// params.questionId = jijing_question_id;
				// params.type = 2;//只要不是0
				// showAnswerList(params);
		        // showAnswerList2();
				reloadQuestions();
			}
		});

	}

	var jijingSample = function() {
		//http://192.168.1.115:3000/api/v1/jijing_samples?jijing_question_id=3
		if (!tokenTmp) {
			var sampleContent = '测试范例Some people say that we should use clean energy to protect the environment, but others say that we should use traditional energy sources such as coal and oil because they are less expensive. What is your opinion?';
			$("#sampleContent").html(sampleContent);
			$("#jijingSampleDiv").toggle();
			return;
		}
		var jijing_question_id = $("#jijing_question_id").attr('jqid');
		$.ajax({
			url: URL.baseURL + "jijing_samples",
			type: 'get',
			data: {
				jijing_question_id: jijing_question_id
			},
			dataType: "json",
			headers: {
				"Authorization": tokenTmp
			},
			success: function(json) {
				console.log(json);
				if (json.jijing_samples && json.jijing_samples.length > 0) {
					$("#sampleContent").html(json.jijing_samples[0].content.replace(/\n/g, "<br>"));

				}
				$("#jijingSampleDiv").toggle();

			}
		});

	}

	var menuToggle = function() {
		// $("#side5").addClass('sidebarLight');
		$('.sidebar-ul').find('a.sidebarLight').removeClass('sidebarLight');
		$('.sidebar-ul').find('li.sidebarLight').removeClass('sidebarLight');
		$("#side5").parent().siblings().find(".sidebarLight").removeClass('sidebarLight');
		// $("#listen_menu_div").slideUp('fast');
		if (store.get('redirectObj')) {
			// debugger; //TODO;
			currentQuestions = store.get('redirectObj').questions;
			section = store.get('redirectObj').section;
			showDetail(store.get('redirectObj'));
			store.remove('redirectObj');
		} else {
			$("#wirte_menu_div").toggle();
			$("#side6").click(); //默认定位写作机经
		}

	}

	var writeJiJing = function() {
		BaseCookie.get()
		tokenTmp = BaseCookie.getToken()
		user_id = BaseCookie.getId();
		if ("" == tokenTmp || null == tokenTmp) {
			tokenTmp = "xiaoma"
		}
		$('.sidebar-ul').find('a.sidebarLight').removeClass('sidebarLight');
		$('.sidebar-ul').find('li.sidebarLight').removeClass('sidebarLight');
		$("#side6").parent().addClass('sidebarLight');
		$("#side6").parent().siblings().removeClass('sidebarLight');
		$("#listen_menu_div li").removeClass('sidebarLight');
		if (!tokenTmp) {
			tokenTmp = "xiaoma";
		}

		$.ajax({
			url: URL.baseURL + "jijing_groups/yuce",
			type: 'get',
			data: {
				question_type: 2
			},
			dataType: "json",
			headers: {
				"Authorization": tokenTmp
			},
			success: function(json) {
				var renderData = new Array();
				$.each(json.jijing_questions, function(key, val) {
					var tmp = {};
					tmp.id = val.id;
					tmp.content = val.content;
					tmp.sequence_number = val.sequence_number;
					tmp.title = val.title;
					tmp.answer_id = val.answer_id;
					tmp.category = 'wjj';
					tmp.type = val.type;
					tmp.score = val.score;
					renderData.push(tmp);
				});
				currentQuestions = renderData; //保存当前下载题目
				Render.render({
					wrap: $wrap,
					tmpl: {
						tmplName: 'app/exercise/tmpl_write_jijing',
						tmplData: renderData
					}
				});
			}
		});


	}

	var writeSimulation = function() {
		BaseCookie.get()
		tokenTmp = BaseCookie.getToken()
		user_id = BaseCookie.getId();
		if ("" == tokenTmp || null == tokenTmp) {
			tokenTmp = "xiaoma"
		}
		$('.sidebar-ul').find('a.sidebarLight').removeClass('sidebarLight');
		$('.sidebar-ul').find('li.sidebarLight').removeClass('sidebarLight');
		$("#side7").parent().addClass('sidebarLight');
		$("#side7").parent().siblings().removeClass('sidebarLight');
		$("#listen_menu_div li").removeClass('sidebarLight');
		if (!tokenTmp) {
			tokenTmp = "xiaoma";
		}

		// var renderData = {};
		$.ajax({
			url: URL.baseURL + "jijing_groups/zhenti",
			type: 'get',
			dataType: "json",
			headers: {
				"Authorization": tokenTmp
			},
			success: function(json) {
				var jijing_groups = json.jijing_groups;
				if (json.jijing_groups && json.jijing_groups.length > 0) {
					var renderData = {};
					renderData.groups = jijing_groups;
					renderData.category = "wsl";

					$.ajax({
						url: URL.baseURL + "jijing_questions",
						type: 'get',
						data: {
							id: jijing_groups[0].id,
							question_type: 2
						},
						headers: {
							"Authorization": tokenTmp
						},
						success: function(json) {
							renderData.questions = json.jijing_questions;
							currentQuestions = json.jijing_questions;
							currentZTGroupId = jijing_groups[0].id;
							Render.render({
								wrap: $wrap,
								tmpl: {
									tmplName: 'app/exercise/tmpl_write_simulation',
									tmplData: renderData
								}
							});
						}
					});
				}


			}
		});
	}

	var questionDetail = function() {
		var params = {};
		params.type = $(this).attr('type');
		params.category = $(this).attr('category');
		params.id = $(this).attr('id');
		params.answer_id = $(this).attr('answer_id');
		params.sequence_number = $(this).attr('sequence_number');
		params.content = $(this).html();
		params.score = $(this).attr('score');
		params.from = "exercise"; //表示从哪个入口进入
		showDetail(params);


	}

	var article_item = function(){
		var params = {};
		params.type = $(this).attr('type');
		params.category = $("#jijing_question_id").attr('category');
		params.id = $("#jijing_question_id").attr('jqid');
		params.answer_id = $(this).attr('answer_id');
		params.sequence_number = $("#jijing_question_id").html();
		params.content = $('#sentence').attr('content');
		params.score = $(this).attr('score');
		params.from = $("#jijing_question_id").attr('from');; //表示从哪个入口进入
		showDetail(params);
	}

	var showAnswerList1 = function(){
		var params = {};
		params.questionId = $(this).attr("id");
		params.type = $(this).attr("type");
		params.category = $(this).attr('category');
		showAnswerList(params);
	}

	// var showAnswerList2 = function(){
	// 	var params = {};
	// 	params.category = $('#go2').attr('category');
	// 	params.questionId = jijing_question_id;
	// 	params.type = 2;//只要不是0
	// 	showAnswerList(params);
	// }

	var showAnswerList = function(params){
		// var questionId = $(this).attr("id");
		// var type = $(this).attr("type");
		// var category = $(this).attr("category");

		var questionId = params.questionId;
		var type = params.type;
		var category = params.category;
		
		var from = "exercise";
		var cText;
		if (category == "wjj") {
			cText = "写作机经";
		} else {
			cText = "历年真题";
		}
		
		/*$.ajax({
				url: URL.baseURL5 + 'jijing_questions/writing_message',
				type: 'get',
				headers: {
					"Authorization": tokenTmp
				},
				data:{'question_id':questionId},
				success: function(json){
					if(json && json.error){
						alert(json.error);
					} else {
						var renderData = {};
						// var question_id = json.question_id;
						var sequence_number = json.sequence_number;
						var content = json.content;
						var answer_messages = json.answer_messages;
						
						renderData.category = category;
						renderData.cText = cText;
						renderData.from = from;
						renderData.id = questionId;
						renderData.sequence_number = sequence_number;
						renderData.content = content;
						renderData.answer_messages = json.answer_messages;
						renderData.questions = currentQuestions;
						renderData.title = renderData.questions[0].title;

						$("#side").css("display", "none");//隐藏左边导航
						if(type == 0){
							Render.render({
								wrap: $wrap,
								tmpl: {
									tmplName: "app/exercise/tmpl_write_detail_0",
									tmplData: renderData
								}
							});
						} else {
							Render.render({
								wrap: $wrap,
								tmpl: {
									tmplName: 'app/exercise/tmpl_write_answer_list',
									tmplData: renderData
								}
							});
						}

					}
				}
			}) */
	}

	var questionDetailLeft = function() {
		var renderData = {};
		renderData.type = $(this).attr('type');
		renderData.category = $(this).attr('category');
		renderData.id = $(this).attr('id');
		renderData.answer_id = $(this).attr('answer_id');
		renderData.sequence_number = $(this).attr('sequence_number');
		renderData.content = $(this).attr('content');
		renderData.score = $(this).attr('score');
		renderData.from = $('#jijing_question_id').attr('from'); //表示从哪个入口进入
		renderData.wrap = $("#leftDiv");
		// showDetail(params);
		if (renderData.category == "wjj") {
			renderData.cText = "写作机经";
		} else {
			renderData.cText = "历年真题";
		}

		if (!tokenTmp) {
			renderData.anonymous = true;
		}
		if (!renderData.answer_id) {
			$("#side").css("display", "none");
			Render.render({
				wrap: renderData.wrap,
				tmpl: {
					tmplName: "app/exercise/tmpl_write_detail_left_0",
					tmplData: renderData
				}
			});
		} else {
			$.ajax({
				url: URL.baseURL + 'articles/' + renderData.answer_id,
				type: 'get',
				headers: {
					"Authorization": tokenTmp
				},
				success: function(json) {
					var answerObj = json.article;
					renderData.answerContent = answerObj.content;
					// renderData.answerContent = answerObj.content.replace(/\n/g,"<br>");
					var tmplName = 'app/exercise/tmpl_write_detail_left_1';

					if ("2" == renderData.type) {
						var tmplName = 'app/exercise/tmpl_write_detail_left_2';
						var mark_tips = answerObj.article_marks[0].mark_tips;
						//sort end index
						var sortArray = new Array();
						var tmpMap = {};
						$.each(mark_tips, function(key, val) {
							sortArray.push(val.end_index); //todo
							tmpMap[val.end_index] = val;
						});

						sortArray.sort(function(v1, v2) {
							if (v1 < v2) {
								return -1;
							} else if (v1 > v2) {
								return 1;
							} else {
								return 0;
							}
						});
						var sort_mark_tips = new Array();
						$.each(sortArray, function(key, val) {
							sort_mark_tips.push(tmpMap[val]);
						});
						sortArray = null;
						tmpMap = null;
						//end sort end index

						var rawContent = renderData.answerContent;
						var newS = "";
						var offset = 0;
						$.each(sort_mark_tips, function(key, val) { //to be tested
							var text = rawContent.substring(val.start_index, val.end_index);
							var start = val.start_index;
							var end = val.end_index;
							// var comment = val.text_content? val.text_content : val.audio_url;
							var comment = val.text_content ? val.text_content : "批改内容为语音，请在手机端查看";
							var tmp = rawContent.substring(offset, start) + '<span class="cnote" data-content="' + comment + '" data-toggle="popover" data-placement="top" style="background: #f9e6be;">' + text + '</span>';
							newS += tmp;
							offset = end;
						});
						newS = newS + rawContent.substring(offset);
						newS = newS.replace(/\n/g, "<br>"); //换行
						renderData.answerContent = newS;

					} else {
						renderData.answerContent = answerObj.content.replace(/\n/g, "<br>");
					}

					$("#side").css("display", "none");
					Render.render({
						wrap: renderData.wrap,
						tmpl: {
							tmplName: tmplName,
							tmplData: renderData
						},
						afterRender: function() {
							$('.cnote').popover({
								trigger: 'hover focus'
							});
						}
					});

				}
			});

		}

	}


	var doAgain = function(){
		var renderData = {};
		// renderData.type = obj.type
		renderData.category = $('#jijing_question_id').attr('category');
		renderData.id = $('#jijing_question_id').attr('jqid');
		// renderData.answer_id = obj.answer_id;
		renderData.sequence_number = $('#jijing_question_id').html();
		renderData.content = $('#sentence').attr('content');
		// debugger;
		// renderData.score = obj.score;
		renderData.from = $('#jijing_question_id').attr('from'); //表示从哪个入口进入
		renderData.questions = currentQuestions;
		renderData.title = renderData.questions[0].title;
		// renderData.wrap = obj.wrap || $wrap;

		if (renderData.category == "wjj") {
			renderData.cText = "写作机经";
		} else {
			renderData.cText = "历年真题";
		}

		$("#side").css("display", "none");
		Render.render({
			wrap: $wrap,
			tmpl: {
				tmplName: "app/exercise/tmpl_write_detail_0",
				tmplData: renderData
			}
		});
	}

	var showDetail = function(obj) {
		var renderData = {};
		renderData.type = obj.type
		renderData.category = obj.category;
		renderData.id = obj.id;
		renderData.answer_id = obj.answer_id;
		renderData.sequence_number = obj.sequence_number;
		renderData.content = obj.content;
		renderData.score = obj.score;
		renderData.from = obj.from; //表示从哪个入口进入
		renderData.questions = obj.questions || currentQuestions;
		renderData.title = obj.title || renderData.questions[0].title;
		// renderData.wrap = obj.wrap || $wrap;

		if (renderData.category == "wjj") {
			renderData.cText = "写作机经";
		} else {
			renderData.cText = "历年真题";
		}

		//start
		$.ajax({
			url: URL.baseURL + 'articles/' + renderData.answer_id,
			type: 'get',
			headers: {
				"Authorization": tokenTmp
			},
			success: function(json) {
				var answerObj = json.article;
				renderData.answerContent = answerObj.content;
				// renderData.answerContent = answerObj.content.replace(/\n/g,"<br>");
				var tmplName = 'app/exercise/tmpl_write_detail_1';

				if ("2" == renderData.type) {
					var tmplName = 'app/exercise/tmpl_write_detail_2';
					var mark_tips = answerObj.article_marks[0].mark_tips;
					//sort end index
					var sortArray = new Array();
					var tmpMap = {};
					$.each(mark_tips, function(key, val) {
						sortArray.push(val.end_index); //todo
						tmpMap[val.end_index] = val;
					});

					sortArray.sort(function(v1, v2) {
						if (v1 < v2) {
							return -1;
						} else if (v1 > v2) {
							return 1;
						} else {
							return 0;
						}
					});
					var sort_mark_tips = new Array();
					$.each(sortArray, function(key, val) {
						sort_mark_tips.push(tmpMap[val]);
					});
					sortArray = null;
					tmpMap = null;
					//end sort end index

					var rawContent = renderData.answerContent;
					var newS = "";
					var offset = 0;
					$.each(sort_mark_tips, function(key, val) { //to be tested
						var text = rawContent.substring(val.start_index, val.end_index);
						var start = val.start_index;
						var end = val.end_index;
						// var comment = val.text_content? val.text_content : val.audio_url;
						var comment = val.text_content ? val.text_content : "批改内容为语音，请在手机端查看";
						var tmp = rawContent.substring(offset, start) + '<span class="cnote" data-content="' + comment + '" data-toggle="popover" data-placement="top" style="background: #f9e6be;">' + text + '</span>';
						newS += tmp;
						offset = end;
					});
					newS = newS + rawContent.substring(offset);
					newS = newS.replace(/\n/g, "<br>"); //换行
					renderData.answerContent = newS;

				} else {
					renderData.answerContent = answerObj.content.replace(/\n/g, "<br>");
				}

				$("#side").css("display", "none");
				Render.render({
					wrap: $wrap,
					tmpl: {
						tmplName: tmplName,
						tmplData: renderData
					},
					afterRender: function() {
						$('.cnote').popover({
							trigger: 'hover focus'
						});
					}
				});

			}
		});
		//end

		// if(!tokenTmp){
		// 	renderData.anonymous = true;
		// }
		// if (!renderData.answer_id) {
			// $("#side").css("display", "none");
			// Render.render({
			// 	wrap: $wrap,
			// 	tmpl: {
			// 		tmplName: "app/exercise/tmpl_write_detail_0",
			// 		tmplData: renderData
			// 	}
			// });
		// } else {
			// $.ajax({
			// 	url: URL.baseURL + 'articles/' + renderData.answer_id,
			// 	type: 'get',
			// 	headers: {
			// 		"Authorization": tokenTmp
			// 	},
			// 	success: function(json) {
			// 		var answerObj = json.article;
			// 		renderData.answerContent = answerObj.content;
			// 		// renderData.answerContent = answerObj.content.replace(/\n/g,"<br>");
			// 		var tmplName = 'app/exercise/tmpl_write_detail_1';

			// 		if ("2" == renderData.type) {
			// 			var tmplName = 'app/exercise/tmpl_write_detail_2';
			// 			var mark_tips = answerObj.article_marks[0].mark_tips;
			// 			//sort end index
			// 			var sortArray = new Array();
			// 			var tmpMap = {};
			// 			$.each(mark_tips, function(key, val) {
			// 				sortArray.push(val.end_index); //todo
			// 				tmpMap[val.end_index] = val;
			// 			});

			// 			sortArray.sort(function(v1, v2) {
			// 				if (v1 < v2) {
			// 					return -1;
			// 				} else if (v1 > v2) {
			// 					return 1;
			// 				} else {
			// 					return 0;
			// 				}
			// 			});
			// 			var sort_mark_tips = new Array();
			// 			$.each(sortArray, function(key, val) {
			// 				sort_mark_tips.push(tmpMap[val]);
			// 			});
			// 			sortArray = null;
			// 			tmpMap = null;
			// 			//end sort end index

			// 			var rawContent = renderData.answerContent;
			// 			var newS = "";
			// 			var offset = 0;
			// 			$.each(sort_mark_tips, function(key, val) { //to be tested
			// 				var text = rawContent.substring(val.start_index, val.end_index);
			// 				var start = val.start_index;
			// 				var end = val.end_index;
			// 				// var comment = val.text_content? val.text_content : val.audio_url;
			// 				var comment = val.text_content ? val.text_content : "批改内容为语音，请在手机端查看";
			// 				var tmp = rawContent.substring(offset, start) + '<span class="cnote" data-content="' + comment + '" data-toggle="popover" data-placement="top" style="background: #f9e6be;">' + text + '</span>';
			// 				newS += tmp;
			// 				offset = end;
			// 			});
			// 			newS = newS + rawContent.substring(offset);
			// 			newS = newS.replace(/\n/g, "<br>"); //换行
			// 			renderData.answerContent = newS;

			// 		} else {
			// 			renderData.answerContent = answerObj.content.replace(/\n/g, "<br>");
			// 		}

			// 		$("#side").css("display", "none");
			// 		Render.render({
			// 			wrap: $wrap,
			// 			tmpl: {
			// 				tmplName: tmplName,
			// 				tmplData: renderData
			// 			},
			// 			afterRender: function() {
			// 				$('.cnote').popover({
			// 					trigger: 'hover focus'
			// 				});
			// 			}
			// 		});

			// 	}
			// });

		// }

	}

	var loadTabData = function() {
		if (tokenTmp) {
			var groupId = $(this).attr('id');
			currentZTGroupId = groupId;
			$.ajax({
				url: URL.baseURL + "jijing_questions",
				type: 'get',
				data: {
					id: groupId,
					question_type: 2
				},
				headers: {
					"Authorization": tokenTmp
				},
				success: function(json) {
					var renderData = {};
					renderData.questions = json.jijing_questions;
					renderData.category = 'wsl';
					currentQuestions = json.jijing_questions; //保存当前下载题目
					Render.render({
						wrap: $('#wslContent'),
						tmpl: {
							tmplName: 'app/exercise/tmpl_write_wsl_questions',
							tmplData: renderData
						}
					});
				}
			});
		}

	}

	var login = function() {
		$('#dialogLogin').modal({
			backdrop: 'static'
		});
	}


	var go1 = function() {
		$("#side6").click();
		$("#side").css("display", "block");

	}
	var go2 = function() {
		var category = $(this).attr("category");
		if (category == 'wjj') {
			$("#side6").click();
		} else {
			$("#side7").click();
		}
		$("#side").css("display", "block");

	}

	var getUrlParam = function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]);
		return null;
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

	return {
		init: init
	}
})