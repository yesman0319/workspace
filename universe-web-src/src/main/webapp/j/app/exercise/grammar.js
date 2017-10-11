'use strict'

define(['common/uniqueAjax', 'common/render', 'xml2json', 'app/baseURL', 'baseCookie', 'lib/store'], function(uniqueAjax, Render, xml2json, URL, BaseCookie) {
	var _conf, $wrap;
	// var typeMap;
	var questions;
	var testRecords;
	var currentQuestionIndex = 0;
	var groupSortArray;
	var currentGroupIndex;
	var tokenTmp;
	var xm_planDayId='',    //20160916
		xm_exerciseId='',  //20160916
		xm_startTime='',  //20160916
		xm_endTime='',   //20160916
		xm_title='',    //20160926
		xm_groupId='', //20161009
		xm_rate='';   //20161009
	var user_id;
	var userAns = "";
	var sureAnsAry = [];
	var color = "#509bfd";
	var joinHTML = "";
	var qcAry;
	var onlyWrong;
	var markWrongIng = false;
	var startTime, //用于积分时间计算
		endTime;
	var currentTestTimeStr; //当前时间字符串，用于下一题同步显示时间
	var testTimerID; //计时器ID
	var testTimerStatus = "show";
	var durationTime = 0; //计时时间
	var isRewardCoupon = false; //结果页是否送券
	var list_status=0; //是否付费解锁  0 未解锁 1 已解锁
	var newAnswers=[];
	var init = function(conf) {
		_conf = $.extend({
			wrap: ''
		}, conf || {})
		$wrap = $(_conf.wrap)
		initConfig()
		initEvent()
	}

	var initConfig = function() {
		BaseCookie.get();
		tokenTmp = BaseCookie.getToken();
		user_id = BaseCookie.getId();
	}

	var initEvent = function() {
		String.prototype.trim = function() { 
	 		return this.replace(/^\s\s*/, '').replace(/\s\s*$/, ''); 
	 	}
//			$(document).on('trigger_side2', '#side2', showGrammarUnit1) //20160909
//			$(document).on('click', '#side2', showGrammarUnit1)  //20160909
			$(document).on('click', '#grammarAnswer', showAnswer)
			$(document).on('click', '#grammarTranslation', showTranslation)
			$(document).on('click', '#grammarUnit', showGrammarUnit)
			$(document).on('click', '#recorded', doRecord)
			$(document).on('click', '#grammar-next', grammarNext)
			$(document).on('click', '#grammar-redo', grammarRedo)
			$(document).on('click', '.goGrammarUnit', goGrammarUnit)
			$(document).on('click', '#grammar-repeat', grammarRepeat)
				// $(document).on('click', '#grammar-nextUnit', grammarNextUnit)
			$(document).on('click', '#grammar-onlywrong', grammarOnlyWrong);
			$(document).on('click', '#grammar_done', function (){
				/*$(this).addClass("disabled");
				grammarNextUnit(e);---------20160927下一单元改为 完成*/
				$("#morePlan").show();
			});
			$(document).on('click', '#grammarLogin', grammarLogin)
			$(document).on('mouseup', '#grammar-subject', grammarSubject)
			$(document).on('blur', '#uinput', blurUinput)
//			$(document).on('click', '.goResult', goResult);
			$(document).on('click', '#testTimerA', showHideTimer);
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
			var typeName = null;
			for (var i = 0; i < groups.length; i++) {
				var group = groups[i];
				if (group.id == id) {
					typeName = group.typeName;
				}
			}
			for (var i = 0; i < groups.length; i++) {
				var group = groups[i];
				if (typeName == group.typeName) {
					if (group.id != id&&group.locked == 1) {
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

	var showHideTimer = function() {
		$("#testTimerShow").fadeToggle(function() {
			if ($("#testTimerShow").css("display") == "none") {
				testTimerStatus = "hide";
				$("#timeBtnStaus").html("显示");
				console.log(testTimerStatus);
			} else {
				$("#timeBtnStaus").html("计时");
				testTimerStatus = "show";
			}
		});
		
	}
	var startTimer = function() {
		var fn = function() {
			if ($("#testTimer1").length <= 0) {
				console.log("not find target");
				clearTimer();
			}
			if (startTime) {
				var checkTime = function(i) {
					if (i < 10) {
						i = "0" + i;
					}
					return i;
				}
				if (!durationTime) {
					durationTime = 1; //计算剩余的毫秒数
				} else {
					durationTime++;
				}
				//var ts = (new Date()) - startTime; //计算剩余的毫秒数
				var ts = durationTime * 1000;
				var dd = parseInt(ts / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
				var hh = parseInt(ts / 1000 / 60 / 60 % 24, 10); //计算剩余的小时数
				var mm = parseInt(ts / 1000 / 60 % 60, 10); //计算剩余的分钟数
				var ss = parseInt(ts / 1000 % 60, 10); //计算剩余的秒数
				dd = checkTime(dd);
				hh = checkTime(hh);
				mm = checkTime(mm);
				ss = checkTime(ss);
				$("#testTimer1").html(hh + ":" + mm + ":" + ss);
				currentTestTimeStr = hh + ":" + mm + ":" + ss;
			}
		}
		return (function start() {
			if (testTimerID) return;
			testTimerID = window.setInterval(fn, 1000);
		})();
	}

	var clearTimer = function() {
		window.clearInterval(testTimerID);
		testTimerID = undefined;
	}

	var goResult = function() {
		$('body,html').animate({
			scrollTop: 0
		}, 100)
		startTime = null;
		var groupId = $(this).attr("groupid");
		historyTo(groupId);
	}

	var showGrammarUnit1 = function() {
		$("#testTimer1").html("00:00:00");
		window.clearInterval(testTimerID);
		BaseCookie.get()
		tokenTmp = BaseCookie.getToken()
		user_id = BaseCookie.getId();
		if ("" == tokenTmp || null == tokenTmp) {
			tokenTmp = "xiaoma"
		}
		$('.sidebar-ul').find('a.sidebarLight').removeClass('sidebarLight');
		$('.sidebar-ul').find('li.sidebarLight').removeClass('sidebarLight');
		$("#side2").addClass('sidebarLight');
		$("#side2").parent().siblings().find(".sidebarLight").removeClass('sidebarLight');
		showGrammarUnit();// 跳转到单元列表
	}

	var qs = 0
	var grammarOnlyWrong = function() {
		startTime = null
		markWrongIng = true
		testRecords = []
		qs = 0
		var renderData;
		var tmp = true
		var _afterRender = function() {
			markWrongIng = true
		}

		$.each(questions, function(i, e) {
			if (questions[i].isCorrect == false) {

				if (tmp) {
					renderData = questions[i]
					tmp = false
				}
				qs = questions[i].questionSeqNum
			}
		})

		currentQuestionIndex = (parseInt(renderData.questionSeqNum) - 1) + '';
		// Render.render({
		// 	wrap: $wrap,
		// 	tmpl: {
		// 		tmplName: 'app/exercise/tmpl_grammar',
		// 		tmplData: renderData
		// 	},
		// 	afterRender: _afterRender
		// })
		renderData.hideTestTimer = true;
		renderTemplate({
			tmplName: 'app/exercise/tmpl_grammar',
			tmplData: renderData,
			afterRender: function() {
				var titleNum = $(".grammar-totalCount").html();
				titleNum = titleNum.substring(0, titleNum.length) + "/" + questions.length;
				$(".grammar-totalCount").html(titleNum);
				durationTime = 0; //计时时间间隔（单位秒）
				startTimer();
			}
		});
	}

	var blurUinput = function() {
		var uinput = $("#uinput"),
			uinputVal = uinput.val();
		if (uinputVal == "") {
			userAns = ""
		} else {
			userAns = uinputVal
		}

	}
	var isEmpty = function(param) {                     // 20160912
		if (null == param || "" == param || tokenTmp1 == param) {
			return true
		} else {
			return false
		}
	}
	var baseOffset = -1;
	var extentOffset = -1;
	var grammarSubject = function() {
			var userSelection, text, uiinput = $('#uinput');
			if (window.getSelection) {
				//现代浏览器
				userSelection = window.getSelection();
			} else if (document.selection) {
				//IE浏览器 考虑到Opera，应该放在后面
				userSelection = document.selection.createRange();
			}
			if (!(text = userSelection.text)) {
				text = userSelection;
			}
			baseOffset = userSelection.baseOffset;
			extentOffset = userSelection.extendOffset;
			/*if(userSelection.extentOffset== userSelection.baseOffset && userSelection.baseOffset==baseOffset && userSelection.extendOffset==extentOffset){
				console.log("双击重复选区-->执行return");
				return;
			}*/ 
			if(userAns == ""){
				userAns += text.toString().trim();
			}else{
				userAns += '|' +　text.toString().trim(); 
			}
			
			userAns = userAns.replace(/[,.'?:!\(\);]/g, '').trim();
			uiinput.val(userAns)
				// var rangeObject = getRangeObject(userSelection);
				// 
				// console.log(rangeObject)
		}

	var getRangeObject = function(selectionObject) {
		if (selectionObject.getRangeAt) {
			return selectionObject.getRangeAt(0);
		} else {
			var range = document.createRange();
			range.setStart(selectionObject.anchorNode, selectionObject.anchorOffset);
			range.setEnd(selectionObject.focusNode, selectionObject.focusOffset);
			return range;
		}
	}


	var grammarFun = function() {
		BaseCookie.get()
		tokenTmp = BaseCookie.getToken()
		user_id = BaseCookie.getId();
		if ("" == tokenTmp || null == tokenTmp) {
			tokenTmp = "xiaoma"
		}
		$('.sidebar-ul').find('a.sidebarLight').removeClass('sidebarLight');
		$('.sidebar-ul').find('li.sidebarLight').removeClass('sidebarLight');
		$("#side2").addClass('sidebarLight');
		$("#side2").parent().siblings().find(".sidebarLight").removeClass('sidebarLight');
		markWrongIng = false
		resetData()
		testRecords = new Array();
		questions = new Array();
		groupSortArray = new Array();

		var _afterRender = function() {

		};

		if (!tokenTmp) {
			tokenTmp = "xiaoma"
		}
		var typeJson = $.ajax({
			url: URL.baseURL + "grammar_types?new_speed=2&new_version=1",
			type: 'get',
			headers: {
				"Authorization": tokenTmp
			},
			async: false
		}).responseJSON;
		//积分group_level  avg_speed
		for (var i = 0; i < typeJson.grammar_types.length; i++) {
			var typeName = typeJson.grammar_types[i].name;
			var groups = typeJson.grammar_types[i].grammar_groups;
			groups.sort(function(v1, v2) {
				if (parseInt(v1.sequence_number) < parseInt(v2.sequence_number)) {
					return -1;
				} else if (parseInt(v1.sequence_number) > parseInt(v2.sequence_number)) {
					return 1;
				} else {
					return 0;
				}
			});
			for (var j = 0; j < groups.length; j++) {
				var item = {};
				item.id = groups[j].id;
				item.sequence_number = groups[j].sequence_number;
				item.typeName = typeName;
				if (groups[j].grammar_results) {
					var rate = (groups[j].grammar_questions.length - groups[j].grammar_results.length) / groups[j].grammar_questions.length;
					var ratePercent = percentNum(rate);
					item.rate = rate;
					item.ratePercent = ratePercent;
				}
				groupSortArray.push(item);
			}
		}

		var groupId;
		if (store.get('redirectObj')) { //如果首页跳过来
			groupId = store.get('redirectObj').groupId;
			groupId = groupId ? groupId : groupSortArray[0].id;
			currentGroupIndex = $.map(groupSortArray, function(val, key) {
				if (groupId == val.id) {
					return key;
				}
			});
			store.remove('redirectObj');
		} else if (tokenTmp == "xiaoma") { //fw语法匿名用户
			currentGroupIndex = 0;
			groupId = xm_groupId;
		} else {
			//find footprints
			var footprints = $.ajax({
//				url: URL.baseURL + "grammar_footprints",  //20160910 请求结果
				url: URL.xiaomaURL + "grammar/results/",
				type: 'get',
				headers: {
					"Authorization": exerciseApi.xiaomaToken
				},
				async: false
			}).responseJSON;

			if (footprints && footprints.grammar_footprint) {
				var ta = $.map(groupSortArray, function(val, key) {
					if (footprints.grammar_footprint.id == val.id) {
						return key;
					}
				});
				if (ta.length > 0) {
					currentGroupIndex = ta[0];
				} else {
					// currentQuestionIndex = -1;//to be check?
					currentGroupIndex = -1;
				}
				currentGroupIndex++; //TODO: should be the next unit
				if (currentGroupIndex >= groupSortArray.length) { //数组越界
					currentGroupIndex = 0;
				}
			} else {
				currentGroupIndex = 0;
			}
			groupId = xm_groupId;

		}


		var _group_callback = function(json) {
			questions = buildQuestions(json);
			var renderData = questions[0];
			currentQuestionIndex = 0;
			Render.render({
				wrap: $wrap,
				tmpl: {
					tmplName: 'app/exercise/tmpl_grammar',
					tmplData: renderData
				},
				afterRender: function() {
						durationTime = 0; //计时时间间隔（单位秒）
						startTimer();
					}
			})

		}

		AjaxEdit({
//			url: URL.baseURL5 + 'grammar_groups/' + groupId,
			url: URL.xiaomaURL + 'grammar/groups/' + groupId,
			type: 'get',
			headers:{
				"Authorization":exerciseApi.xiaomaToken
			},
			success: _group_callback
		});

	}

	var resetData = function() {
		sureAnsAry = []
		qcAry = ""
		userAns = ""
		$(".practice-result").css("display", "block")
	}

	/**
	 * 清空selection对象
	 */
	var resetSelection = function() {
		$("#uinput").val("").attr("disabled", true);
		userAns = "" //清空uswerAns;
		/*if (window.getSelection) {
			window.getSelection().empty();
		} else if (document.selection) {
			//IE浏览器 考虑到Opera，应该放在后面
			document.selection.empty();
		}*/
	}

	var showGrammarUnit = function() {
		var renderData = [];
		groupSortArray = new Array();
		markWrongIng = false;
		$.ajax({
			url: URL.baseURL + 'grammar_types?new_speed=2&new_version=1',
			headers: {
				"Authorization": tokenTmp
			},
			type: 'get',
			success: function(json) {
				//start
				groupSortArray = [];
				var rawData = json.grammar_types;

				for (var i = 0; i < rawData.length; i++) {
					list_status=rawData[i].list_status;
					var locked = 0;
					var typeName = rawData[i].name;
					var groups = rawData[i].grammar_groups;
					groups.sort(function(v1, v2) {
						if (parseInt(v1.sequence_number) < parseInt(v2.sequence_number)) {
							return -1;
						} else if (parseInt(v1.sequence_number) > parseInt(v2.sequence_number)) {
							return 1;
						} else {
							return 0;
						}
					});
					for (var j = 0; j < groups.length; j++) {
						var tempLocked = locked;
						if (!rawData[i].current_group_id) {
							locked = 1;
						} else if (groups[j].id == rawData[i].current_group_id) {
							locked = 1;
							tempLocked = 0;
						}
						if (groups[j].group_level != null) {
							tempLocked = 0;
						}
						groups[j].locked = tempLocked;

						var item = {};
						item.id = groups[j].id;
						item.sequence_number = groups[j].sequence_number;
						item.typeName = typeName;
						item.group_level = groups[j].group_level;
						item.avg_speed = groups[j].avg_speed;
						item.locked = tempLocked;
						item.is_today_task = groups[j].is_today_task;
						if (groups[j].grammar_results) {
							var rate = (groups[j].grammar_questions.length - groups[j].grammar_results.length) / groups[j].grammar_questions.length;
							var ratePercent = percentNum(rate);
							item.grammar_results = groups[j].grammar_results;
							item.rate = rate;
							item.ratePercent = ratePercent;
						}

						groupSortArray.push(item);
					}
					goGrammarUnit(groupId);
				}
				//end

				//Render.render({
				//	wrap: $wrap,
				//	tmpl: {
				//		tmplName: 'app/exercise/tmpl_grammar_unit',
				//		tmplData: groupSortArray
				//	},
				//	afterRender:function(){
				//		goGrammarUnit();
				//	}
				//});
			}
		})
	}


	var setSelect = function(obj, enabled) {
		if (enabled) {
			obj.removeAttr("unselectable").removeAttr("onselectstart").css("-moz-user-select", "").css("-webkit-user-select", "");
		} else {
			obj.attr("unselectable", "on").attr("onselectstart", "return false;").css("-moz-user-select", "none").css("-webkit-user-select", "none");
		}
	}

	var showAnswer = function() {
		var ele = $("#grammar-subject"),
			see = $("#grammarAnswer");
		if ($("#grammarAnswer").attr("mark") == "1") {
			var list = ele.find("span")
			$("#grammarAnswer").attr("mark", "0")
			setSelect(ele, true)
			ele.css({
				cursor: 'auto'
			})
			$.each(list, function(i, e) {
				$(e).removeAttr("style")
			})
			$("#uinput").attr("disabled", false);
			see.text("查看答案");
		} else {
			setSelect(ele, false)
			ele.css({
				cursor: "not-allowed"
			}).html("").html(questions[currentQuestionIndex]['html'].join(" "))
			$("#grammarAnswer").attr("mark", "1");
			see.text("隐藏答案");
			resetSelection();
		}
	}
	var showTranslation = function() {
		var translate = $("#grammarTranslation");
		if (translate.attr("mark") == "1") {
			translate.attr("mark", "0")
			translate.text("查看译文");
			$(".translation-p").hide();
		} else {
			translate.attr("mark", "1");
			$(".translation-p").show();
			translate.text("隐藏译文");
		}
	}


	var AjaxEdit = function(param) {
		UniqueAjax({
			url: param.url,
			data: param.data,
			headers:param.headers,
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

	var isCorrect = function(input, answer) {
		if (!input) {
			return false;
		}
		var s1 = input.replace(/[^a-zA-Z0-9\\s]+/g, " ");
		var s2 = answer.replace(/[^a-zA-Z0-9\\s]+/g, " ");
		return input.trim() == answer.trim();
	}

	var doRecord = function() {
		resetData()
		var questionContent=questions[currentQuestionIndex].questionContent.replace(/[,.'?:!\(\);]/g,"");//将题目中的,.'统一去掉;
		var ansArray = $('#uinput').val().replace(/\|+/g,"|").trim().split("|");
		var preIndex = 0;
		var tempAnswerArray=[];
			for(var i = 0;i<ansArray.length;i++){
				var indexStr = ansArray[i];
				var index = questionContent.indexOf(indexStr);
				if(index == 0){
					//当首个选中字符为此问题的第一个,则给此字符后面加空格;
					indexStr = indexStr + " "; 
				}else if(index > 0 && index + indexStr.length == questionContent.length){
					//若为此问题的最后一个,则给此字符前面加空格;
					indexStr = " " + indexStr;
				}else{
					//若为此问题的中间部分,则给此字符前后都加空格;
					indexStr = " " + indexStr + " ";
				}
				index = questionContent.indexOf(indexStr,preIndex);
				preIndex = index;
				var headStr = questionContent.substring(0,index);
				var headStrList = headStr.split(" ");
				var index2 = headStrList.length;//被选单词之前的个数，然后计算出选中单词的开始下标
				if(headStr==""){
					index2 = 0;
				}
				if(ansArray == ""){
					tempAnswerArray = [];
					break;
				}
				var tempArray = ansArray[i].split(" ");
				for(var j=0;j<tempArray.length;j++){ 
					tempAnswerArray.push(index2+j);
				}
			}
			
		var record = {};
		var rightAnsIndex = questions[currentQuestionIndex].questionAnswer
		rightAnsIndex = typeof rightAnsIndex == "object" ?  rightAnsIndex : rightAnsIndex.split(" ");
		record.questionSeqNum = questions[currentQuestionIndex].questionSeqNum;
		record.groupSeqNum = questions[currentQuestionIndex].groupSeqNum;
		record.groupType = questions[currentQuestionIndex].groupType;
		record.userInput = $('#uinput').val().replace(/\|+/g," ");
		record.questionTitle = questions[currentQuestionIndex].questionTitle;
		record.questionAnswer = tempAnswerArray.join("|");
		record.questionAnswerContent = (questions[currentQuestionIndex].sureAns).join(" ");
		record.isCorrect = isCorrect(record.userInput,record.questionAnswerContent.replace(/[,.'?:!\(\);]/g, ''));
		if(record.isCorrect){
			record.questionAnswer = rightAnsIndex.join("|");
		}
		record.questionContent = questions[currentQuestionIndex].questionContent;
		record.questionId = questions[currentQuestionIndex].questionId;
		record.groupId = questions[currentQuestionIndex].groupId;
		questions[currentQuestionIndex]['isCorrect'] = record.isCorrect
		testRecords.push(record);
		//fw不显示中间页，直接跳转
		// renderTemplate({tmplName:'app/exercise/tmpl_grammar_next',tmplData:record});
		if (currentQuestionIndex == questions.length - 1) {
			record.lastone = true;
			/*if (!exerciseApi.isLogin) {
				clearTimer(); //弹出登录层暂停时间
				$('#dialogLogin').modal({
					backdrop: 'static'
				})
				$('#dialogLogin').bind('hidden.bs.modal', function(e) {
					BaseCookie.get()
					if (BaseCookie.getToken()) {
						tokenTmp = BaseCookie.getToken()
						user_id = BaseCookie.getId();
						grammarNext()
					}
					startTimer();
				})
			} else {
				grammarNext()
			}--------20161010*/
		}
        grammarNext();
	}
	var grammarNext = function(param) {
		if (markWrongIng) {
			if (questions[parseInt(currentQuestionIndex) + 1]) {
				if (questions[parseInt(currentQuestionIndex) + 1].isCorrect == true) {
					for (var i = parseInt(currentQuestionIndex) + 1; i < questions.length; i++) {
						if (questions[i].isCorrect == false) {
							currentQuestionIndex = i
							break
						}
						if (questions[i].isCorrect == true && questions[i - 1].questionSeqNum == qs) {
							currentQuestionIndex = questions.length
						}
					}
				} else {
					currentQuestionIndex++;
				}
			} else {
				++currentQuestionIndex
			}
		} else {
			currentQuestionIndex++;
		}
		if (currentQuestionIndex == questions.length) { //本单元最后一题
			if (startTime) {
				endTime = new Date();
				var spend_time = Math.round((endTime.getTime() - startTime.getTime()) / 1000);
			}
			var wrongArray = [];
			var renderData = {};
			var records = [];
			var wrongtNum = 0;
			var userInputWordsNum = 0; //用户输入单词数量
			var questionWordsNum = 0; //单元答案单词数量
			var groupType = null; //题目分组 属于重点还是难点
			var wrong_answer=[];
			$.each(testRecords, function(index, value) {
				var tmp = {};
				if (index == 0) {
					groupType = value.groupType;
				}
				var data = {};
					data.questionSeqNum = value.questionSeqNum;
					data.isCorrect = value.isCorrect;
					tmp.question_id = value.questionId;
					if(!value.isCorrect){
						tmp.is_correct = 2;
						wrongtNum++;				
					}else{
						tmp.is_correct = 1;
					}
					tmp.answer = value.questionAnswer;
					wrongArray.push(tmp);				
					records.push(data);
				/**计算单词个数**/
				if (value.userInput) {
					var userInput = value.userInput;
					var userInputArray = userInput.split(" ");
					var temp_num = 0;
					for (var i = 0; i < userInputArray.length; i++) {
						if (userInputArray[i]) {
							temp_num++;
						}
					}
					userInputWordsNum += temp_num;
				}
				if (value.questionAnswer) {
					var answer = value.questionAnswer;
					var answerArray = answer.split(" ");
					var temp_num = 0;
					for (var i = 0; i < answerArray.length; i++) {
						if (answerArray[i]) {
							temp_num++;
						}
					}
					questionWordsNum += temp_num;
				}
			});
			renderData.correctNum = testRecords.length - wrongtNum;
			renderData.rate = percentNum(renderData.correctNum / testRecords.length);
			renderData.wrongtNum = wrongtNum;
			renderData.records = records;
			renderData.groupSeqNum = testRecords[0].groupSeqNum;
			records = null;
			xm_rate = renderData.rate.replace(/%/,"");
			// renderData.group_level = json.group_level;
			var avg_speed = null;
			var group_level = null;
			if (startTime) {
				//本地计算平均速度公式中
				var spend_time = Math.round((endTime.getTime() - startTime.getTime()) / 1000);
				//按题目个数计算平均速度
				//avg_speed = spend_time / questions.length;

				var amount = null; //向goup_level接口传递参数

				//按单词数计算平均速度
				/*if (groupType == "重点") {
					avg_speed = spend_time / (questions.length);
					amount = questions.length;
				} else if (groupType == "难点") {
					avg_speed = spend_time / (questionWordsNum);
					amount = questionWordsNum;
				} else {
					avg_index = -1;
				} --------20161108修改平均时间bug*/
				avg_speed = spend_time / (questions.length);
				amount = questions.length;
				var avg_string = avg_speed.toString();
				var avg_index = avg_string.indexOf('.');
				// var Digit = {};
				var digitRound = function(digit, length) {
					length = length ? parseInt(length) : 0;
					if (length <= 0) return Math.round(digit);
					digit = Math.round(digit * Math.pow(10, length)) / Math.pow(10, length);
					return digit;
				};
				if (avg_speed <= 10 && avg_speed > 0) {
					// avg_speed = avg_string.substring(0, avg_index + 3) + 's'
					avg_speed = digitRound(avg_string, 2).toString()
				} else if (avg_speed <= 60) {
					// avg_speed = avg_string.substring(0, avg_index) + 's'
					avg_speed = Math.round(avg_string).toString()
				} else if (avg_speed <= 3600) {
					var avg_string1 = avg_speed / 60;
					// var avg_index1 = avg_string1.indexOf('.')
					// avg_speed = avg_string1.substring(0, avg_index1) + 'min'
					avg_speed = digitRound(avg_string1, 1).toString() + 'min'
				} else if (avg_speed > 3600) {
					var avg_string2 = avg_speed / 3600;
					// var avg_index2 = avg_string2.indexOf('.')
					// avg_speed = avg_string2.substring(0, avg_index2) + 'h'
					avg_speed = Math.round(avg_string2).toString() + 'h'
				}
			}
			var date=new Date($.ajax({async: false}).getResponseHeader("Date"));
			xm_endTime=zeroFn(date.getFullYear())+"-"+zeroFn((date.getMonth()+1))+"-"+zeroFn(date.getDate())+" "+zeroFn(date.getHours())+":"+zeroFn(date.getMinutes())+":"+zeroFn(date.getSeconds());
			date=null;
			if (!markWrongIng) {
				$.ajax({
					//url: URL.baseURL1 + "grammar_results?" + 'user_id=' + user_id + '&grammar_group_id=' + xm_groupId,
					url: URL.xiaomaURL + "grammar/results",
					type: "POST",
					contentType:"application/json",
					data: JSON.stringify({
						"spend_time": spend_time,
						"rate": xm_rate,
						"wrong_results": wrongArray,
						"group_id": xm_groupId,
						"planDayId":xm_planDayId,
						"exerciseId":xm_exerciseId,
						"startTime":xm_startTime,
						"endTime":xm_endTime
					}),
					headers: {
						"Authorization": exerciseApi.xiaomaToken,
						 fromType:"web",
						"Content-Type": "application/json"
					},
					success: function(data) {
						exerciseApi.updateListItem();
						console.log(data);
					}
				});

			}
			renderData.avg_speed = avg_speed;
			renderData.group_level = group_level;
			/**-------计算最高等级 开始-------**/
			console.log("计算最高等级");
			//groupSortArray[currentGroupIndex].locked=0;
			var obj = getGroupLevelFromList(xm_groupId, groupSortArray);
			//如果下面仍然有题目  下一题按钮就可用
			renderData.canClick=currentGroupIndex+1<groupSortArray.length?1:0;
			var groupLevelFromList = obj.groupLevel;
			var leftUnLocked = obj.leftUnLocked;
			var nextUnLocked = obj.nextUnLocked;
			var highGroupLevel = renderData.group_level > groupLevelFromList ? renderData.group_level : groupLevelFromList;
			renderData.high_group_level = highGroupLevel;
			//groupSortArray[currentGroupIndex].group_level=highGroupLevel;
			if ((leftUnLocked == true && renderData.high_group_level >= 3) || nextUnLocked) {
				renderData.canUnLocked = 1;
			} else {
				renderData.canUnLocked = 0;
			}

			/**-------计算最高等级 结束-------**/

			if (markWrongIng) {
				renderData.hideTestTimer = true;
			}
			if (testTimerStatus) {
				renderData.testTimerStatus = testTimerStatus;
			}
			renderTemplate({
				tmplName: 'app/exercise/tmpl_grammar_result',
				tmplData: renderData,
				afterRender: function() {
					onlyWrong = renderData;
					if (isRewardCoupon) {
						// showDiv('quanDiv', 'fade')
						isRewardCoupon = false;
					}
					if (Math.round(renderData.rate.replace(/%/, "")) == "100") {
						$("#grammar-onlywrong").remove()
					}
					if (markWrongIng) {
						$(".practice-result").css("display", "none")
					} else {
						var tmpRate = Math.round(renderData.rate.replace(/%/, ""))
						if (tmpRate < 50) {
							// $(".gram-result ").html("").html("小盆友 差的有点远哦").css('color', 'black')
							$(".result-img1").attr("src", "../../i/i23.png")
						}
						if (tmpRate >= 50 && tmpRate <= 80) {
							// $(".gram-result ").html("").html("学霸升级中~加油吧亲!").color("#509bfd").css('color', color)
							$(".result-img1").attr("src", "../../i/i22.png")
						}
						if (tmpRate > 80 && tmpRate < 100) {
							// $(".gram-result ").html("").html("娃 你已经超越了好多小伙伴 继续加油哦!").css('color', color)
							$(".result-img1").attr("src", "../../i/i21.png")
						}
						if (tmpRate == 100) {
							$(".correctWrong").css("display", "block") //左上角对几错几
								// $(".correctWrong").css("display", "none") //左上角对几错几
							$(".practice-result").addClass("right100") //img外侧div添加样式
							$(".pagination4").css("display", "none") //结果题目圈圈不显示
								// $(".gram-result ").html("").html("娃 你已经超越了好多小伙伴 继续加油哦!").css('color', color)
							$(".result-img1").attr("src", "../../i/i24.png")
							$(".result-img1").addClass("i24") //i24图片中加的class
							$(".two-button2").addClass("two-button3")
						}
					}
					if(!exerciseApi.isFromPlan){
						$("#grammar_done").show();
					}else{
						$("#grammar_done").hide();
					}
				}
			});
			
		} else {
			//fw添加最后一提判断，让最后一题显示查看成绩
			var questionsTmp = questions[currentQuestionIndex]
			if (currentQuestionIndex == questions.length - 1) {
				questionsTmp.lastone = true;
			}
			if (currentTestTimeStr) {
				questionsTmp.currentTestTimeStr = currentTestTimeStr;
			}
			if (markWrongIng) {
				questionsTmp.hideTestTimer = true;
			}
			if (testTimerStatus) {
				questionsTmp.testTimerStatus = testTimerStatus;
			}
			// renderTemplate({tmplName:'app/exercise/tmpl_grammar',tmplData:questions[currentQuestionIndex]});
			renderTemplate({
				tmplName: 'app/exercise/tmpl_grammar',		
				tmplData: questionsTmp,
				afterRender: function() {
					// if (!markWrongIng) {
					var titleNum = $(".grammar-totalCount").html();
					// titleNum = titleNum.substring(0, titleNum.length - 1) + "/" + questions.length + "."
					titleNum = titleNum.substring(0, titleNum.length) + "/" + questions.length;
					$(".grammar-totalCount").html(titleNum);
					startTimer();
					// }
				}
			});
		}
	}

	var grammarRedo = function() {
		testRecords.pop();
		renderTemplate({
			tmplName: 'app/exercise/tmpl_grammar',
			tmplData: questions[currentQuestionIndex],
			afterRender: function() {
					durationTime = 0; //计时时间间隔（单位秒）
					startTimer();
				}
				// ,
				// afterRender: function() {}
		});

	}
	
	var percentNum = function(num) {
		return (Math.round(num * 10000) / 100.00 + "%"); //小数点后两位百分比
	}
	var goGrammarUnit = function(groupId) {
		//if ($(e.target).attr("data-locked") == 1) {//提示解锁逻辑 不再需要 20160830
		//	$("#lockModal").modal();
		//	return;
		//}
		startTime = new Date();
		questions = new Array();
		testRecords = new Array();
		currentQuestionIndex = 0;
		var ta = $.map(groupSortArray, function(val, key) {
			if (groupId == val.id) {
				return key;
			}
		});
		if (ta.length > 0) {
			currentGroupIndex = ta[0];
		} else {
			currentQuestionIndex = -1;
		}
		AjaxEdit({
			url: URL.xiaomaURL + 'grammar/groups/' + groupId,
			type: 'get',
			headers: {
				"Authorization": exerciseApi.xiaomaToken
			},
			success: function(json) {
				questions = buildQuestions(json);
				renderTemplate({
					tmplName: 'app/exercise/tmpl_grammar',
					tmplData: questions[currentQuestionIndex],
					afterRender: function() {
						var titleNum = $(".grammar-totalCount").html();
						titleNum = titleNum.substring(0, titleNum.length) + "/" + questions.length;
						$(".grammar-totalCount").html(titleNum);
						durationTime = 0; //计时时间间隔（单位秒）
						startTimer();
					}
				});
			}
		});
	}

	var buildQuestions = function(json) {
		var result = new Array();
		var tmpAry = [];
		var _fn = function() {
			for (var i = 0; i < sureAnsAry.length; i++) {
				var val = qcAry[sureAnsAry[i]]
				qcAry[sureAnsAry[i]] = "<span style='background-color:#509bfd'>" + val + "</span>"
				tmpAry.push(val)
			}
			return qcAry
		}
		$.each(json.questions, function(key, val) {
			resetData()
			tmpAry = []
			var tmp = {};
			tmp.title = xm_title;
			tmp.questionId = val.id;
			tmp.groupSeqNum = json.sequence_number;
			tmp.groupId = json.group_id;
			tmp.questionSeqNum = val.sequence_number;
			var jsondata = $.xml2json(val.content);//插件解析xml
			tmp.questionTitle = jsondata.title;
			tmp.questionContent = jsondata.itemBody.p;
			tmp.questionTranslation = jsondata.itemBody.ch;
			tmp.questionAnswer = jsondata.responseDeclaration.correctResponse.value;
			//tmp.groupType = groupSortArray[currentGroupIndex].typeName;
			tmp.groupType ="重点";
			var emptyArray = [];
			sureAnsAry = emptyArray.concat(tmp.questionAnswer);
			qcAry = tmp.questionContent.split(" ");
			tmp.html = _fn();
			tmp.sureAns = tmpAry;
			result.push(tmp);
		});
		return result;
	}


	var getUrlParam = function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]);
		return null;
	}

	var grammarRepeat = function() {
		startTime = new Date();
		testRecords = new Array();
		currentQuestionIndex = 0;
		markWrongIng = false; //add by allen(challenge to fu)
		var renderData = questions[currentQuestionIndex];
		renderData.title = xm_title;
		if(renderData.hideTestTimer){
			renderData.hideTestTimer=false;
		}
		renderTemplate({
			tmplName: 'app/exercise/tmpl_grammar',
			tmplData: renderData,
			afterRender: function() {
				var titleNum = $(".grammar-totalCount").html();
				titleNum = titleNum.substring(0, titleNum.length) + "/" + questions.length;
				$(".grammar-totalCount").html(titleNum);
				durationTime = 0; //计时时间间隔（单位秒）
				startTimer();
				var date=new Date($.ajax({async: false}).getResponseHeader("Date"));
				xm_startTime=zeroFn(date.getFullYear())+"-"+zeroFn((date.getMonth()+1))+"-"+zeroFn(date.getDate())+" "+zeroFn(date.getHours())+":"+zeroFn(date.getMinutes())+":"+zeroFn(date.getSeconds());
				date=null;
			}
		});/* */
//		showGrammar(xm_groupId,"","",xm_title);
	}

	var grammarNextUnit = function() {
		markWrongIng = false;
		startTime = new Date();
		questions = new Array();
		testRecords = new Array();
		currentGroupIndex++;
		currentQuestionIndex = 0;
		/*if (currentGroupIndex == groupSortArray.length) { //最后一个单元
			alert('已是最后一单元')
			//showGrammarUnit();
			return;
		}-----20161010*/
		if (!groupSortArray[currentGroupIndex].grammar_results) {
			AjaxEdit({
//				url: URL.baseURL5 + 'grammar_groups/' + xm_groupId, //grammar_group_id,
				url: URL.xiaomaURL + "grammar/groups" + xm_groupId,
				type: 'get',
				headers: {
					"Authorization": exerciseApi.xiaomaToken
				},
				success: function(json) {
					questions = buildQuestions(json);
					renderTemplate({
						tmplName: 'app/exercise/tmpl_grammar',
						tmplData: questions[currentQuestionIndex],
						afterRender: function() {
								durationTime = 0; //计时时间间隔（单位秒）
								startTimer();
						}
					});
				}
			});
		} else {
			historyTo(xm_groupId)
		}
	}

	var grammarLogin = function() {
		$('#dialogLogin').modal({
			backdrop: 'static'
		});
	}
	
	var historyTo = function(groupId) {        //20160912查看结果，下面的gotoHisResult已经重新封装。
		BaseCookie.get()
		tokenTmp = BaseCookie.getToken()
		if ("" == tokenTmp || null == tokenTmp) {
			tokenTmp = "xiaoma"
		}
		//group types
		$('.sidebar-ul').find('a.sidebarLight').removeClass('sidebarLight');
		$('.sidebar-ul').find('li.sidebarLight').removeClass('sidebarLight');
		$("#side2").addClass('sidebarLight');
		$("#side2").parent().siblings().find(".sidebarLight").removeClass('sidebarLight');
		groupSortArray = [];
		var typeJson = $.ajax({
			url: URL.baseURL + "grammar_types?new_speed=2&new_version=1",
//			url: URL.xiaomaURL + "grammar/results/" + groupId,
			type: 'get',
			headers: {
				"Authorization": tokenTmp
			},
			async: false
		}).responseJSON;
		//积分group_level  avg_speed
		for (var i = 0; i < typeJson.grammar_types.length; i++) {
			var typeName = typeJson.grammar_types[i].name;
			var groups = typeJson.grammar_types[i].grammar_groups;
			groups.sort(function(v1, v2) {
				if (parseInt(v1.sequence_number) < parseInt(v2.sequence_number)) {
					return -1;
				} else if (parseInt(v1.sequence_number) > parseInt(v2.sequence_number)) {
					return 1;
				} else {
					return 0;
				}
			});
			//start
			for (var j = 0; j < groups.length; j++) {
				var item = {};
				item.id = groups[j].id;
				item.sequence_number = groups[j].sequence_number;
				item.typeName = typeName;
				item.grammar_questions = groups[j].grammar_questions;
				item.grammar_results = groups[j].grammar_results;
				item.avg_speed = groups[j].avg_speed;
				item.group_level = groups[j].group_level;
				groupSortArray.push(item);
			}
			//

		}
		//end
		var result = $.map(groupSortArray, function(val, key) {
			if (val.id == groupId) {
				return key;
			}
		});
		if (result.length > 0) {
			currentGroupIndex = result[0];
		} else {
			currentGroupIndex = 0;
		}
		var qNum = groupSortArray[currentGroupIndex].grammar_questions.length;
		var wrongNum = groupSortArray[currentGroupIndex].grammar_results.length;
		var records = [];
		AjaxEdit({
			url: URL.xiaomaURL + 'grammar/groups/' + groupId,
			type: 'get', 
			headers: {
				"Authorization": exerciseApi.xiaomaToken
			},
			success: function(json) {
				questions = buildQuestions(json);
				$.each(questions, function(index, value) {
					var data = {};
					data.questionSeqNum = value.questionSeqNum;
					if ($.inArray(value.questionId, groupSortArray[currentGroupIndex].grammar_results) != -1) {
						value.isCorrect = false;
						data.isCorrect = false;
					} else {
						value.isCorrect = true;
						data.isCorrect = true;
					}
					records.push(data);
				});

				//here
				var renderData = {};

				renderData.correctNum = qNum - wrongNum;
				renderData.rate = percentNum(renderData.correctNum / qNum);
				renderData.wrongtNum = wrongNum;
				renderData.records = records;
				renderData.groupSeqNum = groupSortArray[currentGroupIndex].sequence_number;
				renderData.avg_speed = groupSortArray[currentGroupIndex].avg_speed;
				renderData.group_level = //groupSortArray[currentGroupIndex].group_level;
				renderData.isBest=1;

				/**-------计算最高等级 开始-------**/
				console.log("计算最高等级");
				//groupSortArray[currentGroupIndex].locked=0;
				var obj = getGroupLevelFromList(xm_groupId, groupSortArray);
				//如果下面仍然有题目  下一题按钮就可用
				renderData.canClick=currentGroupIndex+1<groupSortArray.length?1:0;
				var groupLevelFromList = obj.groupLevel;
				var leftUnLocked = obj.leftUnLocked;
				var nextUnLocked = obj.nextUnLocked;
				var highGroupLevel = renderData.group_level > groupLevelFromList ? renderData.group_level : groupLevelFromList;
				renderData.high_group_level = highGroupLevel;
				//groupSortArray[currentGroupIndex].group_level=highGroupLevel;
				if ((leftUnLocked == true && renderData.high_group_level >=3 ) || nextUnLocked) {
					renderData.canUnLocked = 1;
				} else {
					renderData.canUnLocked = 0;
				}
				/**-------计算最高等级 结束-------**/

				///**-------计算最高等级 开始-------**/
				//console.log("计算最高等级");
				///*var groupLevelFromList=getGroupLevelFromList(xm_groupId);
				//var highGroupLevel=renderData.group_level>groupLevelFromList ? renderData.group_level : groupLevelFromList ;*/
				//renderData.high_group_level=renderData.group_level;
				///**-------计算最高等级 结束-------**/
				// records = null;

				// renderData.group_level = json.group_level;
				// renderData.avg_speed = json.avg_speed;
				renderTemplate({
					tmplName: 'app/exercise/tmpl_grammar_result',
					tmplData: renderData,
					afterRender: function() {
						onlyWrong = renderData;

						if (Math.round(renderData.rate.replace(/%/, "")) == "100") {
							$("#grammar-onlywrong").remove()
						}
						if (markWrongIng) {
							$(".practice-result").css("display", "none")
						} else {
							var tmpRate = Math.round(renderData.rate.replace(/%/, ""))
							if (tmpRate < 50) {
								// $(".gram-result ").html("").html("小盆友 差的有点远哦").css('color', 'black')
								$(".result-img1").attr("src", "../../i/i23.png")
							}
							if (tmpRate >= 50 && tmpRate <= 80) {
								// $(".gram-result ").html("").html("学霸升级中~加油吧亲!").color("#509bfd").css('color', color)
								$(".result-img1").attr("src", "../../i/i22.png")
							}
							if (tmpRate > 80 && tmpRate < 100) {
								// $(".gram-result ").html("").html("娃 你已经超越了好多小伙伴 继续加油哦!").css('color', color)
								$(".result-img1").attr("src", "../../i/i21.png")
							}
							if (tmpRate == 100) {
								$(".correctWrong").css("display", "block") //左上角对几错几
									// $(".correctWrong").css("display", "none") //左上角对几错几
								$(".practice-result").addClass("right100") //img外侧div添加样式
								$(".pagination4").css("display", "none") //结果题目圈圈不显示
									// $(".gram-result ").html("").html("娃 你已经超越了好多小伙伴 继续加油哦!").css('color', color)
								$(".result-img1").attr("src", "../../i/i24.png")
								$(".result-img1").addClass("i24") //i24图片中加的class
								$(".two-button2").addClass("two-button3")
							}
						}
					}
				});

			}
		});

	}
	
	var zeroFn=function(n){
		n=n<10?"0"+n:n;
		return n;
	}
	
	//20160909 显示答题页面	
	var showGrammar = function (groupId,planDayId,exerciseId,title,showGrammar) {
		xm_planDayId=planDayId;
		xm_exerciseId=exerciseId;
		xm_title=title;
		xm_groupId = groupId;
		$("#testTimer1").html("00:00:00");
		window.clearInterval(testTimerID);
		var renderData = [];
		groupSortArray = [];
		markWrongIng = false;
		startTime = new Date();
		questions = [];
		testRecords = [];
		currentQuestionIndex = 0;
		AjaxEdit({
			url: URL.xiaomaURL + 'grammar/groups/' + groupId,
			type: 'get',
			headers: {
				"Authorization": exerciseApi.xiaomaToken
			},
			dataType: "json",
			success: function(json) {
				var date=new Date($.ajax({async: false}).getResponseHeader("Date"));
				xm_startTime=zeroFn(date.getFullYear())+"-"+zeroFn((date.getMonth()+1))+"-"+zeroFn(date.getDate())+" "+zeroFn(date.getHours())+":"+zeroFn(date.getMinutes())+":"+zeroFn(date.getSeconds());
				date=null;
				questions = buildQuestions(json);
				renderTemplate({
					tmplName: 'app/exercise/tmpl_grammar',
					tmplData: questions[currentQuestionIndex],
					afterRender: function() {
						var titleNum = $(".grammar-totalCount").html();
						titleNum = titleNum.substring(0, titleNum.length) + "/" + questions.length;
						$(".grammar-totalCount").html(titleNum);
						if(showGrammar==10){
							$("#grammarAnswer").hide();
						}
						durationTime = 0; //计时时间间隔（单位秒）
						startTimer();
					}
				});
			}
		});
   }
	//20160912 显示结果页面	
	var gotoHisResult = function(groupId,planDayId,exerciseId,title) {
		xm_planDayId=planDayId;
		xm_exerciseId=exerciseId;
		xm_groupId = groupId;
		xm_title = title;
		groupSortArray = [];
		$.ajax({
				url: URL.xiaomaURL + "grammar/groups/" + groupId,
				type: 'get',
				async: false,
				dataType: "json",
				headers: {
					Authorization: exerciseApi.xiaomaToken
				},
				success: function(typeJson) {
					var qNum = typeJson.questions.length;//问题数量
					var results = typeJson.results; //答题结果
					var wrong_results = results.wrong_results;//错题	
					var wrongNum = wrong_results.length;//这里可能有问题，app把正确的也提交了
					var records = [];
					questions = buildQuestions(typeJson);
					$.each(questions, function(index, value) {					
								var data = {};
								value.isCorrect = true;
								data.isCorrect = true;
								data.questionSeqNum = value.questionSeqNum;
								$.each(wrong_results, function(index2, value2) {
									if(value.questionId==value2.question_id){
										if(value2.is_correct == 1){ 
									 		value.isCorrect = true;
											data.isCorrect = true;
									 	}else{
									 		value.isCorrect = false;
											data.isCorrect = false;
									 	}
									}
								 	
								});
								records.push(data);
							});		
					//here
				var renderData = {};
				renderData.correctNum = qNum - wrongNum;
				renderData.rate = results.rate + "%";
				renderData.wrongtNum = wrongNum;
				renderData.records = records;
				renderData.groupSeqNum = typeJson.sequence_number;
				renderData.avg_speed = results.avg_speed;
				renderData.group_level = results.group_level;
				renderData.isBest=1;
				renderTemplate({
					tmplName: 'app/exercise/tmpl_grammar_result',
					tmplData: renderData,
					afterRender: function() {
						onlyWrong = renderData;
						if (Math.round(renderData.rate.replace(/%/, "")) == "100") {
							$("#grammar-onlywrong").remove()
						}
						if (markWrongIng) {
							$(".practice-result").css("display", "none")
						} else {
							var tmpRate = Math.round(renderData.rate.replace(/%/, ""))
							if (tmpRate < 50) {
								// $(".gram-result ").html("").html("小盆友 差的有点远哦").css('color', 'black')
								$(".result-img1").attr("src", "../../i/i23.png")
							}
							if (tmpRate >= 50 && tmpRate <= 80) {
								// $(".gram-result ").html("").html("学霸升级中~加油吧亲!").color("#509bfd").css('color', color)
								$(".result-img1").attr("src", "../../i/i22.png")
							}
							if (tmpRate > 80 && tmpRate < 100) {
								// $(".gram-result ").html("").html("娃 你已经超越了好多小伙伴 继续加油哦!").css('color', color)
								$(".result-img1").attr("src", "../../i/i21.png")
							}
							if (tmpRate == 100) {
								$(".correctWrong").css("display", "block") //左上角对几错几
									// $(".correctWrong").css("display", "none") //左上角对几错几
								$(".practice-result").addClass("right100") //img外侧div添加样式
								$(".pagination4").css("display", "none") //结果题目圈圈不显示
									// $(".gram-result ").html("").html("娃 你已经超越了好多小伙伴 继续加油哦!").css('color', color)
								$(".result-img1").attr("src", "../../i/i24.png")
								$(".result-img1").addClass("i24") //i24图片中加的class
								$(".two-button2").addClass("two-button3")
							}
						}
						if(!exerciseApi.isFromPlan){
							$("#grammar_done").show();
						}else{
							$("#grammar_done").hide();
						}
					}
				})},
				error:function(e) {
					console.log(e);
				}			
			});
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
	return {
		init: init,
		historyTo: historyTo,
		showGrammar:showGrammar,
		gotoHisResult:gotoHisResult
	}
})