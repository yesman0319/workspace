'use strict'

define(['common/uniqueAjax', 'common/render', 'xml2json', 'app/baseURL', 'baseCookie', 'lib/store'], function(uniqueAjax, Render, xml2json, URL, BaseCookie) {
	var _conf,
		$wrap,
		TMPL = {
			t1: 'app/jinjie/tmpl_tpoListen_unit', //单元列表页有两个，另一个是加载更多
			t2: 'app/jinjie/tmpl_tpoListen_exercise',
			t3: 'app/jinjie/tmpl_tpoListen_question',
			t4: 'app/jinjie/tmpl_tpoListen_result', //结果页有两个，一个直接计算结果页，另一个从单元列表进
			t5: 'app/jinjie/tmpl_tpoListen_unit_more', //单元列表加载更多
			// t6: 'app/jinjie/tmpl_tpoListen_question_jiexi',
			t7: 'app/jinjie/tmpl_tpoListen_question_list',
			t8: 'app/jinjie/tmpl_tpoListen_unitResult', //结果页有两个，一个直接计算结果页，另一个从单元列表进
			t9: 'app/jinjie/tmpl_tpoListen_questionErr',
			t10: 'app/jinjie/tmpl_tpoListen_question_listErr',
			t11: 'app/jinjie/tmpl_tpoListen_resultErr'
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

	var xm_questionId="",
		xm_planDayId='',
		xm_exerciseId='',
		xm_startTime='',
		xm_endTime='',
		xm_type='',
		xm_title='',
		xm_sectionType='',
		xm_sectionTypeNum="";
	//下一单元
	var next_question_id,
		next_group_name,
		next_type_name,
		next_rate,
		is_last_question;

	var loadingTpoListenDetail = false;

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
		$(document).on('click','#showMorePlan',function(){
			$('#morePlan').show();
		});
		//$(document).on('trigger_side2_2', '#side2_2', function() {
		//	$('#side2_2').click()
		//})
		//$(document).on('click', '#side2_2', tpoListenUnit);

		//$(document).on('click', '.tpoListenUnit', tpoListenUnit);
		var tempClickStatusListen = 0;
		$(document).on('click', '.tpoListenDetail', function(e) {
			var qid = $(e.target).attr('data-question_id');
			if (tempClickStatusListen == qid) {
				return;
			}
			tempClickStatusListen = qid;
			$(e.target).attr('disabled', true)
			var data = {
				'question_id': $(e.target).attr('data-question_id')
			};
			//初始化当前的tpoNum
			tpoNum = $(e.target).attr('data-tpoNum');
			if (!loadingTpoListenDetail) {
				loadingTpoListenDetail = true;
				tpoListenDetail(data, function() {
					tempClickStatusListen = 0;
					loadingTpoListenDetail = false;
				})
			} else {
				console.log("reClick");
			}
		})
		$(document).on('click', '.tpoListenResult', function(e) {
			var data = {
				'question_id': $(e.target).attr('data-question_id'),
				'question_sequence_number': $(e.target).attr('data-question_sequence_number'), //passage
				'tpoNum': $(e.target).attr('data-tpoNum'),
				'rate': $(e.target).attr('data-rates'),
				'name': $(e.target).attr('data-name')
			}
			tpoListenResult(data)
		})
		$(document).on('click', '#nextQuestionTpoListen', nextQuestionTpoListen);
		$(document).on('click', '#preQuestionTpoListen', preQuestionTpoListen);
		$(document).on('click', '#nextQuestionErrTpoListen', nextQuestionErrTpoListen);
		$(document).on('click', '#preQuestionErrTpoListen', preQuestionErrTpoListen);

		// $(document).on('click', '#translateTpoListen', translateToggleTpoListen);
		// $(document).on('click', '#videosTpoListen', videosToggleTpoListen);
		// $(document).on('click', '#jiexiTpoListen', jiexiToggleTpoListen);

		$(document).on('click', '#tpoListenMore', tpoListenMore);

		//题号面板,做到最后一题的面板
		$(document).on('click', '.questionPageTpoListen', function(e) {
			var data = {
				'pageNum': $(e.target).attr('data-pageNum')
			};
			questionPageTpoListen(data)
		});
		$(document).on('click', '.questionPageErrTpoListen', function(e) {
			var data = {
				'pageNum': $(e.target).attr('data-pageNum'),
				'localIndex': $(e.target).attr('data-localIndex')
			};
			questionPageErrTpoListen(data)
		});
		//题号面板,题号前面的面板
		$(document).on('click', '.questionPageTabTpoListen', function(e) {
			//保存做题记录
			saveChoiceTpoListen()
			var data = {
				'pageNum': $(e.target).attr('data-pageNum')
			};
			questionPageTpoListen(data)
		});
		$(document).on('click', '.questionPageTabErrTpoListen', function(e) {
			//保存做题记录
			saveChoiceTpoListenErr()
			var data = {
				'pageNum': $(e.target).attr('data-pageNum'),
				'localIndex': $(e.target).attr('data-localIndex')
			};
			questionPageErrTpoListen(data)
		});
		//提交查看成绩
		$(document).on('click', '#tpoListenSubmit', tpoListenSubmit);
		$(document).on('click', '#tpoListenSubmitErr', tpoListenSubmitErr);
		$(document).on('click', '#againTpoListen', function(e) {
			var data = {
				'question_id': $(e.target).attr('data-question_id')
			}
			againTpoListen(data)
		});
		$(document).on('click', '.audioPlayTpoListen', function(e) {
			var data = {
				'obj': $(e.target),
				'source': $(e.target).attr('data-source')
			}
			audioPlayTpoListen(data)
		});
		//重做错题
		$(document).on('click', '#errOnlyTpoListen', function(e) {
			$(this).attr('disabled', true);
			var data = {
				'pickArtical': $(e.target).attr('data-pickArtical'),
				'question_id': $(e.target).attr('data-question_id')
			}
			errOnlyTpoListen(data)
		});
		$(document).on('click', '#errOnlyTpoListenErr', function(e) {
			$(this).attr('disabled', true);
			localTmpToErrTpoListen()
			var data = {
				'pickArtical': $(e.target).attr('data-pickArtical'),
				'question_id': $(e.target).attr('data-question_id')
			}
			errOnlyTpoListenErr(data)
		});
		//小音频
		$(document).on('click', '.audioImg', function(e) {
			$(".audioImg").attr("src", "../../i/i20.png")
			$(e.target).attr("src", "../../i/i2.gif")
			$("#audioAudio")[0].pause()
			try{
				$('#audioQuestion')[0].pause();
			}catch(e){}

			$("#audioAudio").attr('src', $(e.target).attr('data-url'))
			$("#audioAudio")[0].play()
			$("#audioAudio")[0].addEventListener('ended', function() {
				$(e.target).attr("src", "../../i/i20.png")
			}, false);
		});
		$(document).on('click', '#nextUnitListen', function(e) {
			$("this").addClass("disabled");
			tpoNum = $(e.target).attr('data-next_group_name');
			nextUnitListen()
		});
		/*------排序--------*/
		$(document).on('click', '.sortChoice', function(e) {
			if (!$(e.target).hasClass('tpo-choice')) {
				//单选选择状态单选多选控制
				$(e.target).addClass('tpo-choice')
				$('#sortPlaceHolder').hide()
				var val = $('#sortAnswerDiv').html() + $(e.target).attr('data-answer');
				$('#sortAnswerDiv').html(val)
				$(e.target).hide()
				$(e.target).siblings().show();
			}
		});
		$(document).on('click', '#clearSort', function(e) {
				$('#sortAnswerDiv').html('')
				$('#sortPlaceHolder').show()
				$('.sortChoice').removeClass('tpo-choice')
				$('.sortChoice').show()
				$('.sortChoiceHid').hide()
			})
			/*------复杂--------*/
		$(document).on('click', '.complexChoiceListen', function(e) {
			//单选选择状态单选多选控制
			$(e.target).addClass('tpo_active').addClass('tpo_choise')
			$(e.target).siblings().removeClass('tpo_active').removeClass('tpo_choise')
		});
		$(document).on('click', '#seeJieXiListen', function(e) {
			$('#tpoListenJieXi').toggle()
			jiexiListenFun()
		})
		$(document).on('click', '#seeJieXiListenErr', function(e) {
			$('#tpoListenJieXi').toggle()
			jiexiListenErrFun()
		})
		$(document).on('click', '.directMultipleChoice', function(e) {
			var correctRes = questions[currentQuestionIndex].correctResponse.split(',');
			if ($("#singMul").find('span.tpo-choice').length < correctRes.length) {
				if (!$(e.target).hasClass('tpo-choice')) {
					$(e.target).addClass('tpo-choice')
				} else {
					$(e.target).removeClass('tpo-choice')
				}
			} else {
				if ($(e.target).hasClass('tpo-choice')) {
					$(e.target).removeClass('tpo-choice')
				}
			}
		});
		$(document).on('click', '.directMultipleChoiceErr', function(e) {
			var currentErrIndex = localErr[localIndex].section_number;
			var correctRes = questions[currentErrIndex].correctResponse.split(',');
			if ($("#singMul").find('span.tpo-choice').length < correctRes.length) {
				if (!$(e.target).hasClass('tpo-choice')) {
					$(e.target).addClass('tpo-choice')
				} else {
					$(e.target).removeClass('tpo-choice')
				}
			} else {
				if ($(e.target).hasClass('tpo-choice')) {
					$(e.target).removeClass('tpo-choice')
				}
			}
		});
		$(document).on('click', '#seeFanyiListen', function(e) {
			if ($('#listenImg').css('display') == 'none') {
				$('#listenImg').show()
				$('#listenDialog').hide()
				$('#seeFanyiListen').html('查看原文')
			} else {
				$('#listenImg').hide()
				$('#listenDialog').show()
				$('#seeFanyiListen').html('隐藏原文')
			}
		})
	}

	var nextUnitListen = function() {
		artical = {};
		questions = [];
		currentQuestionIndex = 0;
		records = [];
		if (null != next_rate && "" != next_rate) {
			var name,
				question_sequence_number;
			if (next_type_name.indexOf('Lecture') != '-1') {
				name = 'Lecture';
				question_sequence_number = next_type_name.substring(7);
			} else {
				name = 'Conversation';
				question_sequence_number = next_type_name.substring(12);
			}

			var data = {
				'question_id': next_question_id,
				'question_sequence_number': question_sequence_number, //passage
				'tpoNum': next_group_name,
				'rate': next_rate,
				'name': name
			}
			tpoListenResult(data)
		} else { //进入第一题
			var param = {
				'question_id': next_question_id //不为空是，是从单元列表进来，需再取一次question_id
			};
			tpoListenDetail(param)
		}
	}
	var tempClickStatus=0;

	var tpoListenDetail = function(param, callback) {
		//$("#tpoListenMore").css("display", "none")
		var _success = function(json) {
            //var date=new Date($.ajax({async: false}).getResponseHeader("Date"));
			var date=getTime();
            xm_startTime=zeroFn(date.getFullYear())+"-"+zeroFn((date.getMonth()+1))+"-"+zeroFn(date.getDate())+" "+zeroFn(date.getHours())+":"+zeroFn(date.getMinutes())+":"+zeroFn(date.getSeconds());
            json= $.parseJSON(json);
			xm_sectionTypeNum= json.section_type+json.sequence_number;
			xm_sectionType=json.section_type;
			getTpoListen(json);

			//题号面板
			var questionsNum = [];
			var renderData = {};renderData.xm_title=xm_title;
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
				//解决不分段bug20160920
				if(artical.sectionType != 'conversation'){
					var strMaterial=artical.listenTrans;
					$(".N_tpo_points").find("p").html(strMaterial);
				}
				var _afterRender1 = function() {
					$("#preQuestionTpoListen").css('display', 'none');
					$("#audioQuestion")[0].addEventListener('play', function() {
						$(".audioImg").attr("src", "../../i/i20.png")
						$("#audioAudio")[0].pause()
					}, false);


					if (callback) {
						callback.call();
					}
				}
				var param2 = {
					"wrap": $('#tpoListenPart2'),
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
		};
		$.ajax({
			//url: URL.baseURL9 + 'tpo_questions/web',
            url: URL.xiaomaURL + 'tpo/common/questions/'+param.question_id+'/'+xm_type,
			type: 'get',
			headers: {
				"Authorization": exerciseApi.xiaomaToken
			},
			success: _success
		});
	}

	//从单元列表直接进结果页
	var tpoListenResult = function(param) {
		//$("#tpoListenMore").css("display", "none")
		tpoNum = param.tpoNum;
		var _success = function(json) {
			json= $.parseJSON(json);
			xm_sectionTypeNum= json.section_type+json.sequence_number;
			xm_sectionType=json.section_type;
			var renderData = {};renderData.xm_title=xm_title;
			renderData.tpoNum = tpoNum;
			renderData.sequence_number = json.question_sequence_number;
			var rate = json.rate;
			var rateArray = rate.split('/');
			var correctCount = 0;
			var totalCount = 0;
			if(rateArray && rateArray.length==2){
				correctCount = rateArray[0];
				totalCount = rateArray[1];
			}else{
				totalCount = json.results.length;
				var  errCountTemp = 0;
				for(var i=0;i<json.results.length;i++){
					if(json.results[i].is_correct==2){
						errCountTemp++;
					}
				} 
				correctCount = totalCount-errCountTemp;
			}
			var errorCount = totalCount - correctCount;
			var rateTmp = (parseInt(correctCount) / parseInt(totalCount)).toString();
			renderData.rate = parseInt(rateTmp.substring(0, rateTmp.indexOf('.') + 3) * 100);
			renderData.correctCount = correctCount;
			renderData.errorCount = errorCount;
			renderData.question_id = json.question_id;
			//renderData.sectionType = json.section_type;
			renderData.sectionType = xm_sectionType;
			renderData.sectionTypeNum = xm_sectionTypeNum;


			renderData.question_results = json.results;
			renderData.isFromPlan=exerciseApi.isFromPlan;
			var param = {
				"tmplName": TMPL.t8,
				"tmplData": renderData,
				"afterRender": ''
			}
			renderTemplate(param)
		};
		$.ajax({
			url: URL.xiaomaURL + 'tpo/common/results/'+param.question_id+'/'+xm_type,
			type: 'get',
			headers: {
				"Authorization": exerciseApi.xiaomaToken
			},
			success: _success
		});
	}

	var nextQuestionTpoListen = function() {
		//保存做题记录
		saveChoiceTpoListen()

		//下一题渲染
		currentQuestionIndex = currentQuestionIndex + 1;
		var questionsNum = [];
		for (var i = 1; i <= questions.length; i++) {
			questionsNum.push(i)
		}
		//最后一题显示做题信息列表
		if (currentQuestionIndex == questionsNum.length) {
			var param2 = {
				"wrap": $('#tpoListenPart2'),
				"tmplName": TMPL.t7,
				"tmplData": records,
				"afterRender": ''
			}
			renderTemplate(param2)
				// $('.tpo-right-part3').css('display', 'none')
		} else {
			// $('.tpo-right-part3').css('display', 'block')
			var renderData = {};renderData.xm_title=xm_title;
			renderData.artical = artical;
			renderData.question = questions[currentQuestionIndex];
			renderData.questionsNum = questionsNum;
			renderData.questionsLength = questionsNum.length;
			renderData.currentQuestionIndex = currentQuestionIndex;
			renderData.vip_user = vip_user;

			var _afterRender = function() {
				$("#preQuestionTpoListen").css('display', 'block')
				showChoiceTpoListen()
			}

			var param1 = {
				"wrap": $('#tpoListenPart2'),
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
	var nextQuestionErrTpoListen = function() {
		//保存做题记录
		saveChoiceTpoListenErr()

		//下一题渲染
		localIndex = localIndex + 1;
		var questionsNum = [];
		for (var i = 0; i < localErr.length; i++) {
			questionsNum.push(localErr[i].section_number + 1)
		}
		//最后一题显示做题信息列表
		if (localIndex == questionsNum.length) {
			var param2 = {
				"wrap": $('#tpoListenPart2'),
				"tmplName": TMPL.t10,
				"tmplData": localRecords,
				"afterRender": ''
			}
			renderTemplate(param2)
				// $('.tpo-right-part3').css('display', 'none')
		} else {
			// $('.tpo-right-part3').css('display', 'block')
			var currentErrIndex = localErr[localIndex].section_number;
			var renderData = {};renderData.xm_title=xm_title;
			renderData.artical = artical;
			renderData.question = questions[currentErrIndex];
			renderData.questionsNum = questionsNum;
			renderData.questionsLength = questions.length;
			renderData.currentQuestionIndex = currentErrIndex;
			renderData.vip_user = vip_user;

			var _afterRender = function() {
				$("#preQuestionErrTpoListen").css('display', 'block')
				showChoiceTpoListenErr()
			}

			var param1 = {
				"wrap": $('#tpoListenPart2'),
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

	var preQuestionTpoListen = function() {
		//做题信息面板页倒回无需记录
		if (currentQuestionIndex != questions.length) {
			// $('.tpo-right-part3').css('display', 'block')
			//保存做题记录
			saveChoiceTpoListen()
		}
		//渲染上一题
		var questionsNum = []; //题号数组面板
		var renderData = {};renderData.xm_title=xm_title;
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
				$("#preQuestionTpoListen").css('display', 'none')
			} else {
				$("#preQuestionTpoListen").css('display', 'block')
			}
			showChoiceTpoListen()
		}

		var param1 = {
			"wrap": $('#tpoListenPart2'),
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

	var preQuestionErrTpoListen = function() {
		//做题信息面板页倒回无需记录
		if (localIndex != localErr.length) {
			// $('.tpo-right-part3').css('display', 'block')
			//保存做题记录
			saveChoiceTpoListenErr()
		}
		localIndex = localIndex - 1;
		//渲染上一题
		var questionsNum = []; //题号数组面板
		var renderData = {};renderData.xm_title=xm_title;
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
				$("#preQuestionErrTpoListen").css('display', 'none')
			} else {
				$("#preQuestionErrTpoListen").css('display', 'block')
			}
			showChoiceTpoListenErr()
		}

		var param1 = {
			"wrap": $('#tpoListenPart2'),
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


	var tpoListenMore = function() {
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
					$("#tpoListenMore").css("display", "block")
				} else {
					$("#tpoListenMore").css("display", "none")
				}
			}
			$.ajax({
				url: URL.baseURL9 + 'tpo_groups',
				data: {
					tpo_type: 2,
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
	var getTpoListen = function(param) { //得到artical,questions,vip_user
		questions = [];
		artical = {};
		//var xml = $.xml2json(param.content).itemBody;
		//辨别conversation和lecture
		//artical.sectionType = xml.sectionType;
		artical.sectionType = param.section_type;
        //artical.audio = xml.blockquote.audio;
		artical.audio = param.audio;
        //artical.picture = xml.blockquote.picture
		artical.picture = param.picture;
        //artical.dialogues = param.dialogues;

		if (artical.sectionType == 'conversation') {
			//artical.sectionName_p_a = xml.blockquote.sectionName.p_a;
			//artical.sectionName_p_b = xml.blockquote.sectionName.p_b;
			//artical.p_a = xml.blockquote.p_a;
			//artical.p_b = xml.blockquote.p_b;
            try{
            	artical.sectionName_p_a = param.dialogues[0].name;
                artical.sectionName_p_b = param.dialogues[1].name;
                artical.p_a=[];
                artical.p_b=[];
                for(var i=0;i< param.dialogues.length;i++){
                    if(i%2==0){
                        artical.p_a.push(param.dialogues[i].content)
                    }else{
                        artical.p_b.push(param.dialogues[i].content)
                    }
                }
            }catch(e){//dialogues为空
            	
            }
		} else {
			//artical.listenTrans = xml.blockquote.p;
			var strMaterial=param.material;
			strMaterial=strMaterial.replace(/\n\n\n/g,'<br>');
			artical.listenTrans = strMaterial;
		}

		//for (var i = 0; i < xml.questionContent.length; i++) {
		for (var i = 0; i < param.tpo_question.length; i++) {
			var questionContent = param.tpo_question[i];
			var question = {};
			var simpleChoices = [];
            //question.questionType = questionContent.questionType;
            //question.sequenceNumber = questionContent.sequenceNumber;
            //question.correctResponse = questionContent.correctResponse;
            //question.p = questionContent.p; //解析
            //question.audio = questionContent.audio.source;
            //question.prompt = questionContent.choiceInteraction.prompt;
            //小音频
            //question.rehearURL = questionContent.rehearURL;

            var typeTmp=questionContent.question_type;
            //question.questionType=typeTmp==1?"single":typeTmp==2?"multiple":typeTmp==3?"sort":typeTmp==4?"insert":"directMultiple";
            question.questionType=typeTmp==1?"single":typeTmp==2?"multiple":typeTmp==3?"sort":typeTmp==4?"complex":"directMultiple";
			question.sequenceNumber = questionContent.section_number;//问题序号
			question.correctResponse = questionContent.answer.join();//问题答案
			question.correctAnswers = questionContent.answer.join("|");//问题答案
			question.p = questionContent.analysis; //解析
			question.audio = questionContent.audio;
			question.prompt = questionContent.prompt;
			question.rehearURL = questionContent.rehear_url;

			//for (var j = 0; j < questionContent.choiceInteraction.simpleChoice.length; j++) {
			for (var j = 0; j < questionContent.option.length; j++) {
				var simpleChoice = {};
				/*simpleChoice.identifier = questionContent.choiceInteraction.simpleChoice[j].identifier;
				simpleChoice.choiceOption = questionContent.choiceInteraction.simpleChoice[j].choiceOption
				simpleChoices.push(simpleChoice);*/
                var choiceTmp=j==0?"A":j==1?"B":j==2?"C":j==3?"D":j==4?"E":j==5?"F":j==6?"G":j==7?"H":j==8?"I":j==9?"J":"K";
                simpleChoice.identifier = choiceTmp;
                simpleChoice.choiceOption = questionContent.option[j];
                simpleChoices.push(simpleChoice);
			}
			question.simpleChoices = simpleChoices;

			//排序题型
			if (question.questionType == 'sort') {
				var gArray = [];
				question.correctResponse = questionContent.choiceInteraction.correctResponse;
				for (var l = 0; l < questionContent.choiceInteraction.sortQuestion.G.length; l++) {
					var gTmp = {};
					gTmp.identifier = questionContent.choiceInteraction.sortQuestion.G[l].identifier;
					gTmp.p = questionContent.choiceInteraction.sortQuestion.G[l].p;
					gArray.push(gTmp);
				}
				question.G = gArray;
			}

			//排序题型
			if (question.questionType == 'directMultiple') {
				question.correctCount = question.correctResponse.split(',').length
			}

			//复杂题型
			if (question.questionType == 'complex') {
				var gArray = [];
				//question.correctResponse = questionContent.choiceInteraction.correctResponse;
				question.correctResponse = questionContent.answer.join();
				/*for (var m = 0; m < questionContent.choiceInteraction.complexQuestion.G.length; m++) {
					var gTmp = {};
					gTmp.p = questionContent.choiceInteraction.complexQuestion.G[m].p;
					gArray.push(gTmp);
				}*/
				for(var m=0;m<questionContent.g_contents.length;m++){
					var gTmp={};
					gTmp.p=questionContent.g_contents[m];
					gArray.push(gTmp);
				}

				question.G = gArray;
			}

			questions.push(question)
		}
		//artical.id = param.id;
		artical.id = param.question_id;
		artical.sequence_number = param.sequence_number;
		artical.artical = artical;
		vip_user = param.vip_user;
	}

	var jiexiListenFun = function() {
		if ($('#tpoListenJieXi').css('display') != 'none') {
			$('.showEnable').hide()
			$('.showDisable').show()
			var yourAnswer = "";
			if (questions[currentQuestionIndex].questionType == 'single') {
				$('.tpo-choice').siblings().addClass('tpo-mistake')
				$("#singMul").find('span.showDisable[data-answer="' + questions[currentQuestionIndex].correctResponse + '"]').addClass('tpo-right')
				yourAnswer = $('.tpo-choice').html();
			} else if (questions[currentQuestionIndex].questionType == 'multiple' || questions[currentQuestionIndex].questionType == 'directMultiple') {
				/*错答案加红*/
				$('.tpo-choice').siblings().addClass('tpo-mistake')
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
			} else if (questions[currentQuestionIndex].questionType == 'sort') {
				// var answer = "";
				// var answers = $("#sortTable").find('span.tpo-choice');
				var answers = $('#sortAnswerDiv').html();
				for (var i = 0; i < answers.length; i++) {
					if (i != answers.length - 1) {
						yourAnswer = yourAnswer + answers.charAt(i) + ','
					} else {
						yourAnswer = yourAnswer + answers.charAt(i);
					}
				}
				if (yourAnswer == questions[currentQuestionIndex].correctResponse) {
					$('#sortAnswerDiv').css('color', '#00b551')
					$('#sortTable').find('span.showDisable').addClass('tpo-right')
				} else {
					$('#sortAnswerDiv').css('color', '#f54040')
					$('#sortTable').find('span.showDisable').addClass('tpo-mistake')
				}

				$('#clearSort').hide()
				$('#clearSortHid').show()
					// $('.showDisable').addClass('N_bwrite')
			} else {
				// var yourAnswer = "";
				// var answers = $("#complexTable").find('td.tpo_active');
				// for (var i = 0; i < answers.length; i++) {
				// 	if (i == 0) {
				// 		yourAnswer = $(answers[0]).attr('data-answer');
				// 	} else {
				// 		yourAnswer = yourAnswer + "," + $(answers[i]).attr('data-answer');
				// 	}
				// 	$('#complexTableHid').find('.complexTd' + i).find('td[data-answer="' + answers[i] + '"]').addClass('tpo-mistake')
				// }
				// var answer = "";
				var correctLength = questions[currentQuestionIndex].correctResponse.split(',').length;
				for (var j = 0; j < correctLength; j++) {
					var ansTmp = $("#complexTable").find('.complexTd' + j).find('td.tpo_active');
					if (ansTmp.length != 0) {
						yourAnswer = yourAnswer + $(ansTmp).attr('data-answer') + ',';
					} else {
						yourAnswer = yourAnswer + ',';
					}
				}
				yourAnswer = yourAnswer.substring(0, yourAnswer.length - 1);
				var answers = yourAnswer.split(',');


				var correctRes = questions[currentQuestionIndex].correctResponse.split(',');
				for (var m = 0; m < correctRes.length; m++) {
					$("#complexTableHid").find('.complexTd' + m).find('td[data-answer="' + answers[m] + '"]').addClass('tpo_active_r')
				}
				for (var i = 0; i < correctRes.length; i++) {
					$("#complexTableHid").find('.complexTd' + i).find('td[data-answer="' + correctRes[i] + '"]').addClass('tpo_active_b')
				}

				$('#complexTable').hide()
				$('#complexTableHid').show()
			}
			$('#yourAnswer').html(yourAnswer)
			if (yourAnswer == questions[currentQuestionIndex].correctResponse) {
				$('#yourAnswerDiv').css('color', '#00b551').find("#yourAnswer").css('color', '#00b551');
			} else {
				$('#yourAnswerDiv').css('color', '#f54040').find("#yourAnswer").css('color', '#f54040');
			}
		} else {
			$('.showEnable').show()
			$('.showDisable').hide()
			if (questions[currentQuestionIndex].questionType == 'single') {
				$('#singMul').find('.tpo-mistake').removeClass('tpo-mistake')
				$("#singMul").find('.tpo-right').removeClass('tpo-right')
			} else if (questions[currentQuestionIndex].questionType == 'multiple' || questions[currentQuestionIndex].questionType == 'directMultiple') {
				$('#singMul').find('.tpo-mistake').removeClass('tpo-mistake')
				$("#singMul").find('.tpo-right').removeClass('tpo-right')
			} else if (questions[currentQuestionIndex].questionType == 'sort') {
				$('#sortTable').find('.tpo-mistake').removeClass('tpo-mistake')
				$("#sortTable").find('.tpo-right').removeClass('tpo-right')
				$('#sortAnswerDiv').css('color', '#000')
				$('#clearSort').show()
				$('#clearSortHid').hide()
					// $('.showDisable').removeClass('N_bwrite')
			} else {
				$('#complexTableHid').find('.tpo_active_r').removeClass('tpo_active_r')
				$('#complexTableHid').find('.tpo_active_b').removeClass('tpo_active_b')
				$('#complexTable').show()
				$('#complexTableHid').hide()
			}
			$('#yourAnswer').html('')
		}
	}

	var jiexiListenErrFun = function() {
		var currentErrIndex = localErr[localIndex].section_number;
		if ($('#tpoListenJieXi').css('display') != 'none') {
			$('.showEnable').hide()
			$('.showDisable').show()
			var yourAnswer = "";
			if (questions[currentErrIndex].questionType == 'single') {
				$('.tpo-choice').siblings().addClass('tpo-mistake')
				$("#singMul").find('span.showDisable[data-answer="' + questions[currentErrIndex].correctResponse + '"]').addClass('tpo-right')
				yourAnswer = $('.tpo-choice').html();
			} else if (questions[currentErrIndex].questionType == 'multiple' || questions[currentErrIndex].questionType == 'directMultiple') {
				/*错答案加红*/
				$('.tpo-choice').siblings().addClass('tpo-mistake')
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
			} else if (questions[currentErrIndex].questionType == 'sort') {
				// var answer = "";
				// var answers = $("#sortTable").find('span.tpo-choice');
				var answers = $('#sortAnswerDiv').html();
				for (var i = 0; i < answers.length; i++) {
					if (i != answers.length - 1) {
						yourAnswer = yourAnswer + answers.charAt(i) + ','
					} else {
						yourAnswer = yourAnswer + answers.charAt(i);
					}
				}
				if (yourAnswer == questions[currentErrIndex].correctResponse) {
					$('#sortAnswerDiv').css('color', '#00b551')
					$('#sortTable').find('span.showDisable').addClass('tpo-right')
				} else {
					$('#sortAnswerDiv').css('color', '#f54040')
					$('#sortTable').find('span.showDisable').addClass('tpo-mistake')
				}

				$('#clearSort').hide()
				$('#clearSortHid').show()
					// $('.showDisable').addClass('N_bwrite')
			} else {
				// var yourAnswer = "";
				// var answers = $("#complexTable").find('td.tpo_active');
				// for (var i = 0; i < answers.length; i++) {
				// 	if (i == 0) {
				// 		yourAnswer = $(answers[0]).attr('data-answer');
				// 	} else {
				// 		yourAnswer = yourAnswer + "," + $(answers[i]).attr('data-answer');
				// 	}
				// 	$('#complexTableHid').find('.complexTd' + i).find('td[data-answer="' + answers[i] + '"]').addClass('tpo-mistake')
				// }
				// var answer = "";
				var correctLength = questions[currentErrIndex].correctResponse.split(',').length;
				for (var j = 0; j < correctLength; j++) {
					var ansTmp = $("#complexTable").find('.complexTd' + j).find('td.tpo_active');
					if (ansTmp.length != 0) {
						yourAnswer = yourAnswer + $(ansTmp).attr('data-answer') + ',';
					} else {
						yourAnswer = yourAnswer + ',';
					}
				}
				yourAnswer = yourAnswer.substring(0, yourAnswer.length - 1);
				var answers = yourAnswer.split(',');


				var correctRes = questions[currentErrIndex].correctResponse.split(',');
				for (var m = 0; m < correctRes.length; m++) {
					$("#complexTableHid").find('.complexTd' + m).find('td[data-answer="' + answers[m] + '"]').addClass('tpo_active_r')
				}
				for (var i = 0; i < correctRes.length; i++) {
					$("#complexTableHid").find('.complexTd' + i).find('td[data-answer="' + correctRes[i] + '"]').addClass('tpo_active_b')
				}

				$('#complexTable').hide()
				$('#complexTableHid').show()
			}
			$('#yourAnswer').html(yourAnswer)
			if (yourAnswer == questions[currentErrIndex].correctResponse) {
				$('#yourAnswerDiv').css('color', '#00b551').find("#yourAnswer").css('color', '#00b551');
			} else {
				$('#yourAnswerDiv').css('color', '#f54040').find("#yourAnswer").css('color', '#f54040');
			}
		} else {
			$('.showEnable').show()
			$('.showDisable').hide()
			if (questions[currentErrIndex].questionType == 'single') {
				$('#singMul').find('.tpo-mistake').removeClass('tpo-mistake')
				$("#singMul").find('.tpo-right').removeClass('tpo-right')
			} else if (questions[currentErrIndex].questionType == 'multiple' || questions[currentErrIndex].questionType == 'directMultiple') {
				$('#singMul').find('.tpo-mistake').removeClass('tpo-mistake')
				$("#singMul").find('.tpo-right').removeClass('tpo-right')
			} else if (questions[currentErrIndex].questionType == 'sort') {
				$('#sortTable').find('.tpo-mistake').removeClass('tpo-mistake')
				$("#sortTable").find('.tpo-right').removeClass('tpo-right')
				$('#sortAnswerDiv').css('color', '#000')
				$('#clearSort').show()
				$('#clearSortHid').hide()
					// $('.showDisable').removeClass('N_bwrite')
			} else {
				$('#complexTableHid').find('.tpo_active_r').removeClass('tpo_active_r')
				$('#complexTableHid').find('.tpo_active_b').removeClass('tpo_active_b')
				$('#complexTable').show()
				$('#complexTableHid').hide()
			}
			$('#yourAnswer').html('')
		}
	}

	//显示该题用户所选答案
	var showChoiceTpoListen = function() {
		if (records[currentQuestionIndex].answer) {
			//var answers = records[currentQuestionIndex].answer.split(',');
			var tmpAnswer=records[currentQuestionIndex].answer;
			if(tmpAnswer.indexOf("|")>0){
				var answers = tmpAnswer.split('|');
			}else{
				var answers = tmpAnswer.split(',');
			}
			if (answers[0] != "") {
				for (var i = 0; i < answers.length; i++) {
					if (questions[currentQuestionIndex].questionType == 'sort') {
						// $($("#sortTable").find('.sortTd')[i]).find('span[data-answer="' + answers[i] + '"]').addClass('tpo-choice')
						$("#sortTable").find('.sortChoice[data-answer="' + answers[i] + '"]').addClass('tpo-choice').hide()
						$("#sortTable").find('.sortChoice[data-answer="' + answers[i] + '"]').siblings().addClass('tpo-choice').show()
						$('#sortAnswerDiv').html(answers.join(''))
					} else if (questions[currentQuestionIndex].questionType == 'complex') {
						$($("#complexTable").find('.complexTr')[i]).find('td[data-answer="' + answers[i] + '"]').addClass('tpo_active').addClass('tpo_choise')
					} else {
						$("#singMul").find('span.showEnable[data-answer="' + answers[i] + '"]').addClass('tpo-choice')
					}
				}
			}
		}
	}

	var showChoiceTpoListenErr = function() {
		var currentErrIndex = localErr[localIndex].section_number;
		if (localRecords[localIndex].answer) {
			if(localRecords[localIndex].answer.indexOf("|")>0){
				var answers = localRecords[localIndex].answer.split('|');
			}else{
				var answers = localRecords[localIndex].answer.split(',');
			}			
			if (answers[0] != "") {
				for (var i = 0; i < answers.length; i++) {
					if (questions[currentErrIndex].questionType == 'sort') {
						// $($("#sortTable").find('.sortTd')[i]).find('span[data-answer="' + answers[i] + '"]').addClass('tpo-choice')
						// $($("#sortTable").find('.sortChoice')[i]).addClass('tpo-choice').hide()
						// $($("#sortTable").find('.sortChoiceHid')[i]).addClass('tpo-choice').show()
						$("#sortTable").find('.sortChoice[data-answer="' + answers[i] + '"]').addClass('tpo-choice').hide()
						$("#sortTable").find('.sortChoice[data-answer="' + answers[i] + '"]').siblings().addClass('tpo-choice').show()
					} else if (questions[currentErrIndex].questionType == 'complex') {
						$($("#complexTable").find('.complexTr')[i]).find('td[data-answer="' + answers[i] + '"]').addClass('tpo_active').addClass('tpo_choise')
					} else {
						$("#singMul").find('span.showEnable[data-answer="' + answers[i] + '"]').addClass('tpo-choice')
					}
				}
			}
		}
	}

	var questionPageTpoListen = function(param) {
		//题号前面板进行保存
		// $('.tpo-right-part3').css('display', 'block')
		currentQuestionIndex = parseInt(param.pageNum);
		var questionsNum = []; //题号数组面板
		var renderData = {};renderData.xm_title=xm_title;
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
				$("#preQuestionTpoListen").css('display', 'none')
			} else {
				$("#preQuestionTpoListen").css('display', 'block')
			}
			showChoiceTpoListen()
		}

		var param1 = {
			"wrap": $('#tpoListenPart2'),
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

	var questionPageErrTpoListen = function(param) {
		//题号前面板进行保存
		// $('.tpo-right-part3').css('display', 'block')
		var currentErrIndex = parseInt(param.pageNum);
		localIndex = parseInt(param.localIndex);
		var questionsNum = []; //题号数组面板
		var renderData = {};renderData.xm_title=xm_title;
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
				$("#preQuestionErrTpoListen").css('display', 'none')
			} else {
				$("#preQuestionErrTpoListen").css('display', 'block')
			}
			showChoiceTpoListenErr()
		}

		var param1 = {
			"wrap": $('#tpoListenPart2'),
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
	var saveChoiceTpoListen = function() {
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
			} else if (questions[currentQuestionIndex].questionType == 'multiple' || questions[currentQuestionIndex].questionType == 'directMultiple') {
				var answer = "";
				var submitAnswer="";
				var answers = $("#singMul").find('span.tpo-choice');
				for (var i = 0; i < answers.length; i++) {
					if (i == 0) {
						answer = $(answers[0]).html();
						submitAnswer = $(answers[0]).html();
					} else {
						answer = answer + "," + $(answers[i]).html();
						submitAnswer = submitAnswer + "|" + $(answers[i]).html();
					}
				}
				if (answer == questions[currentQuestionIndex].correctResponse) {
					records[currentQuestionIndex].is_correct = true;
				} else {
					records[currentQuestionIndex].is_correct = false;
				}
				records[currentQuestionIndex].answer = submitAnswer;
			} else if (questions[currentQuestionIndex].questionType == 'sort') {
				var answer = "";
				// var answers = $("#sortTable").find('span.tpo-choice');
				var answers = $('#sortAnswerDiv').html();
				for (var i = 0; i < answers.length; i++) {
					if (i != answers.length - 1) {
						answer = answer + answers.charAt(i) + '|'
					} else {
						answer = answer + answers.charAt(i);
					}
				}
				if (answer == questions[currentQuestionIndex].correctResponse) {
					records[currentQuestionIndex].is_correct = true;
				} else {
					records[currentQuestionIndex].is_correct = false;
				}
				records[currentQuestionIndex].answer = answer;
			} else if (questions[currentQuestionIndex].questionType == 'complex') {
				var answer = "";
				var correctLength = questions[currentQuestionIndex].correctResponse.split(',').length;
				for (var j = 0; j < correctLength; j++) {
					var ansTmp = $("#complexTable").find('.complexTd' + j).find('td.tpo_active');
					if (ansTmp.length != 0) {
						answer = answer + $(ansTmp).attr('data-answer') + '|';
					} else {
						//answer = answer + '|';
						answer = answer + '';
					}
				}
				answer = answer.substring(0, answer.length - 1);
				// var answers = $("#complexTable").find('td.tpo_active');
				// for (var i = 0; i < answers.length; i++) {
				// 	if (i == 0) {
				// 		answer = $(answers[0]).attr('data-answer');
				// 	} else {
				// 		answer = answer + "," + $(answers[i]).attr('data-answer');
				// 	}
				// }
				if (answer == questions[currentQuestionIndex].correctAnswers) {
					records[currentQuestionIndex].is_correct = true;
				} else {
					records[currentQuestionIndex].is_correct = false;
				}
				records[currentQuestionIndex].answer = answer;
			}
		}
		//保存做题记录
	var saveChoiceTpoListenErr = function() {
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
		} else if (questions[currentErrIndex].questionType == 'multiple' || questions[currentErrIndex].questionType == 'directMultiple') {
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
		} else if (questions[currentErrIndex].questionType == 'sort') {
			var answer = "";
			// var answers = $("#sortTable").find('span.tpo-choice');
			// for (var i = 0; i < answers.length; i++) {
			// 	if (i == 0) {
			// 		answer = $(answers[0]).html();
			// 	} else {
			// 		answer = answer + "," + $(answers[i]).html();
			// 	}
			// }
			var answers = $('#sortAnswerDiv').html();
			for (var i = 0; i < answers.length; i++) {
				if (i != answers.length - 1) {
					answer = answer + answers.charAt(i) + ','
				} else {
					answer = answer + answers.charAt(i);
				}
			}
			if (answer == questions[currentErrIndex].correctResponse) {
				localRecords[localIndex].is_correct = true;
			}
			localRecords[localIndex].answer = answer;
		} else if (questions[currentErrIndex].questionType == 'complex') {
			// var answer = "";
			// var answers = $("#complexTable").find('td.tpo_active');
			// for (var i = 0; i < answers.length; i++) {
			// 	if (i == 0) {
			// 		answer = $(answers[0]).attr('data-answer');
			// 	} else {
			// 		answer = answer + "," + $(answers[i]).attr('data-answer');
			// 	}
			// }
			var answer = "";
			var correctLength = questions[currentErrIndex].correctResponse.split(',').length;
			for (var j = 0; j < correctLength; j++) {
				var ansTmp = $("#complexTable").find('.complexTd' + j).find('td.tpo_active');
				if (ansTmp.length != 0) {
					answer = answer + $(ansTmp).attr('data-answer') + '|';
				} else {
					/*answer = answer + ',';*/
					answer = answer + '';
				}
			}
			answer = answer.substring(0, answer.length - 1);
			// var answers = $("#complexTable").find('td.tpo_active');
			// for (var i = 0; i < answers.length; i++) {
			// 	if (i == 0) {
			// 		answer = $(answers[0]).attr('data-answer');
			// 	} else {
			// 		answer = answer + "," + $(answers[i]).attr('data-answer');
			// 	}
			// }
			if (answer == questions[currentErrIndex].correctAnswers) {
				localRecords[localIndex].is_correct = true;
			}
			localRecords[localIndex].answer = answer;
		}
	}

	var tpoListenSubmit = function() {
		var callback_submit = function() {
			//var date=new Date($.ajax({async: false}).getResponseHeader("Date"));
			var date=getTime();
			xm_endTime=zeroFn(date.getFullYear())+"-"+zeroFn((date.getMonth()+1))+"-"+zeroFn(date.getDate())+" "+zeroFn(date.getHours())+":"+zeroFn(date.getMinutes())+":"+zeroFn(date.getSeconds());
			date=null;
				var correctCount = 0;
				var errorCount = 0;
				var question_results = [];
				for (var i = 0; i < records.length; i++) {
					var question_result = {};
					question_result.section_number = records[i].section_number;
					question_result.answer = records[i].answer;
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
					exerciseApi.updateListItem();

					//tpoNum = next_group_name;
					var renderData = {};renderData.xm_title=xm_title;
					renderData.correctCount = correctCount;
					renderData.errorCount = errorCount;
					renderData.question_results = question_results;
					renderData.sequence_number = artical.sequence_number; //所属第几篇文章
					renderData.tpoNum = tpoNum;
					renderData.rate = parseInt(correctCount / records.length * 100);
					renderData.question_id = artical.id;
					//renderData.sectionType = artical.sectionType;
					renderData.sectionType = xm_sectionType;
					renderData.sectionTypeNum = xm_sectionTypeNum;
					//下一单元
					renderData.next_question_id = next_question_id;
					renderData.next_group_name = next_group_name;
					renderData.next_type_name = next_type_name;
					renderData.next_rate = next_rate;
					renderData.is_last_question = is_last_question;
					renderData.isFromPlan=exerciseApi.isFromPlan;
					var param = {
						"tmplName": TMPL.t4,
						"tmplData": renderData,
						"afterRender": ''
					}
					renderTemplate(param)
				}
				$.ajax({//提交答案
                    url: URL.xiaomaURL + 'tpo/common/results/'+xm_type,
                    data: JSON.stringify({
                        "question_id": artical.id,
                        "rate": rate,
                        "question_results": question_results,
                        "type":xm_type,
                        "planDayId":xm_planDayId,
                        "exerciseId":xm_exerciseId,
                        "startTime":xm_startTime,
                        "endTime":xm_endTime
                    }),
                    type: 'Post',
                    contentType: "application/json",
                    headers: {
                        "Authorization": exerciseApi.xiaomaToken
                    },
                    success: _success
				})
			}
        callback_submit();
			//用户为空时弹出登陆框
		//if (isEmpty(token)) {
		//	$('#dialogLogin').modal({
		//		backdrop: 'static'
		//	})
		//	$('#dialogLogin').bind('hidden.bs.modal', function(e) {
		//		// debugger
		//		BaseCookie.get()
		//		if (!isEmpty(BaseCookie.getToken())) {
		//			token = BaseCookie.getToken()
		//			$('body,html').animate({
		//				scrollTop: 0
		//			}, 100)
		//			callback_submit()
		//		}
		//	})
		//} else {
		//	$('body,html').animate({
		//		scrollTop: 0
		//	}, 100)
		//	callback_submit()
		//}
	}

	var tpoListenSubmitErr = function() {
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

				question_results.push(question_result);
				if (localRecords[i].is_correct) {
					correctCount = correctCount + 1;
				} else {
					errorCount = errorCount + 1;
				}
			}
			var renderData = {};renderData.xm_title=xm_title;
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
			renderData.isFromPlan=exerciseApi.isFromPlan;
			renderData.sectionType = xm_sectionType;
			renderData.sectionTypeNum = xm_sectionTypeNum;
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

	var againTpoListen = function(param) {
		var param1 = {};
		if (isEmpty(param.question_id)) {
			param1 = {
				'question_id': artical.id //为空是，是从计算的结果页来，需从article中拿id就行
			};
		} else {
			param1 = {
				//'question_id': param.question_id //不为空是，是从单元列表进来，需再取一次question_id
				'question_id': xm_questionId
			};
		}
		artical = {};
		questions = [];
		currentQuestionIndex = 0;
		records = [];
		tpoListenDetail(param1)
	}

	//音频模态框播放
	var audioPlayTpoListen = function(param) {
		$('#audioPlayTpoListenModal').modal({
			backdrop: 'static'
		})
		if (playCount == 0) { //第一次播放，控制播放窗口位置
			$('#audioPlayTpoListenModal').on('shown.bs.modal', function(e) {
				$('#audioPlayTpoListenModal .modal-dialog').css('left', (parseInt($('#audioPlayTpoListenModal .modal-dialog').css('left')) - 120) + 'px')
			})
			playCount = 1;
		}

		var source = param.source;
		var content = '<script src="http://p.bokecc.com/player?vid=' + source + '&siteid=B86E9AC935D39444&autoStart=true&width=720&height=400&playerid=3B89CC3CB774B9A8&playertype=1" type="text/javascript"></script>';
		$("#audioPlayTpoListenDiv").html(content)
			// var obj = param.obj;
			// for (var i = 0; i < $(obj).siblings().find('.audioPlayDiv').length; i++) {
			// 	var content = $($(obj).siblings().find('.audioPlayDiv')[i]).html();
			// 	$($(obj).siblings().find('.audioPlayDiv')[i]).html("<!--"+content+"-->")
			// 	$($(obj).siblings().find('.audioPlayDiv')[i]).css('display', 'none')
			// }
			// $(obj).next('.audioPlayDiv').css('display', 'block')
			// $(obj).next('.audioPlayDiv').html($(obj).next('.audioPlayDiv').html().replace("<!--","").replace("-->",""))
	}

	//重做错题
	var errOnlyTpoListen = function(param) {
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

        if (param.pickArtical) {
            var _success = function(json) {
                //加载文章和题目信息, vip_user
                json= $.parseJSON(json);
                getTpoListen(json);
                var _success2 = function(json) {
                    json= $.parseJSON(json);
                    var tpo_results = json.results;
                    for (var i = 0; i < tpo_results.length; i++) {
                        if (tpo_results[i].is_correct == 2) {
                            localErr.push(tpo_results[i])
                        }
                    }
                    renderTpoListenErr();
                }
                $.ajax({
                    url: URL.xiaomaURL + 'tpo/common/results/'+question_id+"/"+xm_type,
                    type: 'get',
                    headers: {
                        "Authorization": exerciseApi.xiaomaToken
                    },
                    success: _success2
                })
            }
            $.ajax({
                //url: URL.baseURL9 + 'tpo_questions/web',
                url: URL.xiaomaURL + 'tpo/common/questions/'+question_id+'/'+xm_type,
                type: 'get',
                headers: {
                    "Authorization": exerciseApi.xiaomaToken
                },
                success: _success
            })
        }else{
            var _success1 = function(json) {
                json= $.parseJSON(json);
                var tpo_results = json.results;
                for (var i = 0; i < tpo_results.length; i++) {
                    if (tpo_results[i].is_correct == 2) {
                        localErr.push(tpo_results[i])
                    }
                }
                renderTpoListenErr();
            }
            $.ajax({
                //url: URL.baseURL9 + 'tpo_results/results',
                url: URL.xiaomaURL + 'tpo/common/results/'+questionId+"/"+xm_type,
                type: 'get',
                headers: {
                    "Authorization": exerciseApi.xiaomaToken
                },
                success: _success1
            })
        }

	}

	var errOnlyTpoListenErr = function(param) {
		var question_id = param.question_id;
		//置空全局变量
		var currentErrIndex = 0;
		localTmp = [];
		localRecords = [];
		localIndex = 0;
		$('body,html').animate({
			scrollTop: 0
		}, 100)
		renderTpoListenErr()
	}

	//错题页
	var renderTpoListenErr = function() {
		//题号面板
		var questionsNum = [];
		var currentErrIndex = localErr[0].section_number;
		var renderData = {};renderData.xm_title=xm_title;
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
			var _afterRender1=function(){
				$("#preQuestionErrTpoListen").css('display', 'none');
				$("#audioQuestion")[0].addEventListener('play', function() {
					$(".audioImg").attr("src", "../../i/i20.png");
					$("#audioAudio")[0].pause()
				}, false);
			};
			var param2 = {
				"wrap": $('#tpoListenPart2'),
				"tmplName": TMPL.t9,
				"tmplData": renderData,
				"afterRender": _afterRender1
			};
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

	var localTmpToErrTpoListen = function() {
		for (var i = 0; i < localErr.length; i++) {
			if (!localRecords[i].is_correct) {
				localTmp.push(localErr[i])
			}
		}
		localErr = localTmp;
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
	};
    var zeroFn=function(n){
        n=n<10?"0"+n:n;
        return n;
    };
    function getTime(){ 
    	return new Date($.ajax({url: window.xiaoma.basePath+"/gettime",async: false}).getResponseHeader("Date"));
    }
    var showTpoListen=function(question_id,planDayId,exerciseId,type,xmTitle){
        xm_questionId=question_id;
        xm_planDayId=planDayId;
        xm_exerciseId=exerciseId;
        xm_type=type;
		xm_title=xmTitle;
        var data={
            question_id:xm_questionId
        };
        tpoListenDetail(data);
    };

    var gotoHisResult=function(question_id,planDayId,exerciseId,type,xmTitle){
        xm_questionId=question_id;
        xm_planDayId=planDayId;
        xm_exerciseId=exerciseId;
        xm_type=type;
		xm_title=xmTitle;
		var data={
			question_id:xm_questionId
		};
		tpoListenResult(data);
    };

	return {
		init: init,
		showTpoListen:showTpoListen,
		gotoHisResult:gotoHisResult
	}
})