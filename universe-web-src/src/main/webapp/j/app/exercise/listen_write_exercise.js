//'use strict';

define(['common/uniqueAjax', 'common/render', 'xml2json', 'app/baseURL', 'common/valiEnter', 'baseCookie', 'lib/store', 'audioControl'], function(uniqueAjax, Render, xml2json, URL, ValiEnter, BaseCookie) {
	var _conf,
		$wrap,
		groups, //所有单元列表
		lineObjs = [], //题横线的数组
		color = 'red',
		userDoneRecords = [], //答题记录
		markWrongIng = false, //只做错题
		wrongArray = [], //存储做错的习题信息
		doingWrong = {}, //根据此数组记录的信息，重做错题
		curGroupId = 0,
		curGroupNum = 0,
		questionId = 0,
		questionNum = 0, //习题排序号
		questionCount = 0, //习题总数
		nextQuestionId = 0,
		group_Id_Nums = {}, //存储单元序号和单元id的数组
		testTimerID, //计时器ID
		currentTestTimeStr, //当前时间字符串，用于下一题同步显示时间
		isShowTimer = true, //计时器是否显示标识
		questionList = [], //关卡信息列表
		durationTime = 0, //计时时间
		isSafari=false,
		ctlAudio=null,//音频播放控件实例
		thisQuestionIndex = 0,  //20160913
		xm_planDayId='',       //20160918
		xm_exerciseId='',     //20160918
		xm_startTime='',	 //20160918
		xm_endTime='',		//20160918
		xm_title='',       //20160926
		dicMsg = "",      //20161116
		TMPL = { 
			t1: 'app/exercise/tmpl_listen_write_submit',
			t2: 'app/exercise/tmpl_listen_write_unit',
			t3: 'app/exercise/tmpl_listen_write_login',
			result: 'app/exercise/tmpl_listen_write_result'
		};
	var list_status=0;//是否购买全日制(1:购买了)
	//找到最大的那个已经解锁关卡的序号num(感觉group_id不靠谱，因为它不一定是按顺序排的)
	//groups.current_group_id：当前需要到达级别4的group_id(也就是当前解锁到的关卡)
	var currentBiggestUnlockNum = 0;
	var isRewardCoupon = false;

	// var reg = /(^\s+)|(\s+$)/g;
	var token = undefined;
	var init = function(conf) {
		_conf = $.extend({
			wrap: ''
		}, conf || {});
		$wrap = $(_conf.wrap);
		BaseCookie.get();
		token = BaseCookie.getToken();
		if (isEmpty(token)) {
			token = "xiaoma";
		}
		initEvent();
	};

	var highLightNav = function() {
		$('.sidebar-ul').find('a.sidebarLight').removeClass('sidebarLight');
		$('.sidebar-ul').find('li.sidebarLight').removeClass('sidebarLight');
		$("#side3").addClass('sidebarLight')
		$("#side3").parent().siblings().find(".sidebarLight").removeClass('sidebarLight');
	};

	
	
	var initEvent = function() {
		
		var $document = $(document);
//		$document.on('trigger_side3', '#side3', side3);
		$document.on('click', '#side3', function() {
			BaseCookie.get();
			token = BaseCookie.getToken();
			if ("" == token || null == token) {
				token = "xiaoma";
			}
			highLightNav();
			selectUnit();
		});
		// $document.on('click', '#lookAnswer', lookAnswer);
		$document.on('click', '#listen_write_nextSub', nextSubject);
		$document.on('click', '#selectUnit', selectUnit);
		$document.on('click', '.someUnit', someUnit);

		$document.on('click', '#listen-write-repeat', doRepeat); //再做一遍
		$document.on('click', '#listen-write-onlywrong', doOnlyWrong); //重做错题
//		$document.on('click', '.someRate', showUserResult);  //20160918
		//$document.on('click', '#soundImg', playSound);
		$document.on('click', '#clearAnswer', function() {
			$('#answer .dic-input1').val('');
		});
//		$document.on('click', '#btnDictNextUnit', nextUnit);
		$document.on('click', '#btnDictDone', nextUnit);
		$document.on('click', '.time-pos', showHideTimer);
		$document.on('click', '.default-cursor', lockUnitTip);
	};

	//显示单元列表
	var selectUnit = function() {
		//if (userDoneRecords.length > 0 && userDoneRecords.length < questionCount) {
		//	if (!window.confirm("退出当前做题页，您的进度将无法保存")) {
		//		return;
		//	}
		//}
		//alert(URL.baseURL5 + 'dictation_groups/web');
		getDataMaster({
			url: URL.baseURL5 + 'dictation_groups/web',
			type: 'GET',
			headers: {
				Authorization: token
			},
			success: function(json) {
				groups = json;
				//是否购买了全日制解锁
				list_status=groups.list_status;
				if (groups.dictation_groups) {
					var renderData = new Array(groups.dictation_groups.length);

					//for(var j= 0,len=groups.dictation_groups.length;j<len;j++){
					//	if(groups.dictation_groups[j].group_id==groups.current_group_id){
					//		currentBiggestUnlockNum=parseInt(groups.dictation_groups[j].group_sequence_number);
					//		break;
					//	}
					//}
					$.each(groups.dictation_groups, function(index, value) {
						//算出当前用户已经解锁的最大单元
						if (value.group_id == groups.current_group_id) {
							currentBiggestUnlockNum = parseInt(value.group_sequence_number);
						}

						var item = {};
						item.group_id = value.group_id;
						item.rate = value.rate;
						item.group_sequence_number = value.group_sequence_number;
						//item.dictation_questions = JSON.stringify(value.dictation_questions);
						item.group_level = value.group_level;
						item.avg_speed = value.avg_speed;
						item.is_today_task = value.is_today_task;
						//最新一个解锁关卡后面的全部上锁
						if (parseInt(value.group_sequence_number) > currentBiggestUnlockNum) {
							if (value.rate) {
								isjump=true;
								//设置小旗子图片
								if (value.group_level == 0) {
									item.imgUrl = '../i/newimg-0.png';
								} else if (value.group_level == 1) {
									item.imgUrl = '../i/newimg-4.png';
								} else if (value.group_level == 2) {
									item.imgUrl = '../i/newimg-1.png';
								} else if (value.group_level == 3) {
									item.imgUrl = '../i/newimg-2.png';
								} else if (value.group_level == 4) {
									item.imgUrl = '../i/newimg-3.png';
								}
							} else {
								if(groups.current_group_id!=groups.dictation_groups[groups.dictation_groups.length-1].group_id) {
									//上锁
									item.isLock = true;
									item.imgUrl = '../i/side-pic42.png';
								}

							}
						} else {
							//设置小旗子图片
							if (value.group_level == 0) {
								item.imgUrl = '../i/newimg-0.png';
							} else if (value.group_level == 1) {
								item.imgUrl = '../i/newimg-4.png';
							} else if (value.group_level == 2) {
								item.imgUrl = '../i/newimg-1.png';
							} else if (value.group_level == 3) {
								item.imgUrl = '../i/newimg-2.png';
							} else if (value.group_level == 4) {
								item.imgUrl = '../i/newimg-3.png';
							} else if (parseInt(value.group_sequence_number) == currentBiggestUnlockNum) {
								//如果当前这个最新的解锁关卡还没做过，则不显示小旗子
								//正解锁到这个关卡
								item.biggestUnlockNoDone = true;
								item.imgUrl = '../i/newimg-0.png';
							}
						}
						renderData[index] = item;

						group_Id_Nums[value.group_sequence_number] = value.group_id;
					});
					//将关卡列表存储到全局中
					questionList = renderData;
					someUnit();
					//renderMaster({
					//	renderData: renderData,
					//	tmplName: TMPL.t2
					//});
				}
			}
		})
	};

	//从其他地方跳转过来
	var side3 = function() {
		BaseCookie.get();
		token = BaseCookie.getToken();
		if ("" == token || null == token) {
			token = "xiaoma";
		}
		highLightNav();
		if (store && store.get('redirectObj')) {
			var obj = store.get('redirectObj');
			$.ajax({
				url: URL.baseURL5 + 'dictation_groups/web',
				type: 'GET',
				headers: {
					Authorization: token
				},
				success: function(msg) {
					groups = msg;
					var nums = $.map(groups.dictation_groups, function(val, index) {
						if (obj.id == val.id) {
							return obj.group_sequence_number;
						}
					});
					//第一题的序号
					if (nums.length > 0) {
						curGroupNum = nums[0];
					} else {
						curGroupNum = 1;
					}
					curGroupId = obj.id;
					userDoneRecords = [];
					wrongArray = [];
					markWrongIng = false;
//					showDiction();
				}
			});
			store.remove('redirectObj')
		} else {
			selectUnit();
		}
	};

	//重做
	var doRepeat = function() {
		thisQuestionIndex = 0;
		userDoneRecords = [];
		wrongArray = [];
		markWrongIng = false;
		durationTime = 0; //计时时间间隔（单位秒）
		currentTestTimeStr = '00:00:00'; //重置计时时间
//		showDiction(); //20160918
		showDictation(curGroupId,xm_planDayId,xm_exerciseId,xm_title);
	};

	//只做错题
	var doOnlyWrong = function() {
		userDoneRecords = [];
		doingWrong = {};
		markWrongIng = true;
		//把上次的错题信息转存到doingWrong上
		//wrongArray继续记录当前的错题
		$.each(wrongArray, function(index, item) {
			var obj = {};
			obj.question_num = item.question_sequence_number;
			obj.question_id = item.question_id;
			if (wrongArray[index + 1]) {
				//下一题的序号
				obj.next_question_num = wrongArray[index + 1].question_sequence_number;
				obj.next_question_id = wrongArray[index + 1].question_id;
			}
			doingWrong[item.question_sequence_number] = obj;
		});
		wrongArray = [];
		
		//取得重做错题的第一道题的信息
		for (var v in doingWrong) {
			questionId = doingWrong[v].question_id;
			questionNum = v;
			thisQuestionIndex = questionNum - 1; // 20160918 取得错题第一个下标
			break;
		}
//		showDiction(questionId);
        buildDictation(thisQuestionIndex);
		$('.time-pos').hide();
	};


	/**
	 **呈现做题结果页面(从列表页进入)
	 **如果用户没有做过此题则转到下一单元
	 */
	var showUserResult = function() {
		$('body,html').animate({
			scrollTop: 0
		}, 100);
		curGroupId = $(this).attr("group_id");
		curGroupNum = $(this).attr("group_num");

		$.ajax({
			url: URL.baseURL5 + 'dictation_results/web?group_id=' + curGroupId,
			type: 'GET',
			headers: {
				Authorization: token
			},
			success: function(json) {
				wrongArray = [];
				wrongArray = $.map(json.dictation_results, function(val, index) {
					//1:全对
					if (val.is_correct != 1) {
						return val;
					}
				});
				var renderData = {};
				renderData.isBest=true;//直接进入结果页，显示最好成绩
				renderData.records = json.dictation_results;
				renderData.groupSeqNum = json.group_sequence_number;
				renderData.avg_speed = json.avg_speed;
				renderData.group_level = json.group_level;
				renderData.rate = json.rate;
				//设置小旗子图片
				if (json.group_level == 0) {
					renderData.imgUrl = '../i/newimg-0.png';
				} else if (json.group_level == 1) {
					renderData.imgUrl = '../i/newimg-4.png';
				} else if (json.group_level == 2) {
					renderData.imgUrl = '../i/newimg-1.png';
				} else if (json.group_level == 3) {
					renderData.imgUrl = '../i/newimg-2.png';
				} else if (json.group_level == 4) {
					renderData.imgUrl = '../i/newimg-3.png';
				}

				//达标了，但是之前做过的且在最大解锁关卡之外的默认不能下一题，但是如果它的下一题做过则可下一题
				if (json.group_level > 2) {
					//达标了可以去下一关
					renderData.isLockNextGroup = false;
					//如果老用户在最大解锁关卡外做过（照顾老用户的做题记录）
					if (curGroupNum > currentBiggestUnlockNum) {
						//禁止去下一关
						renderData.isLockNextGroup = true;
						//判断下一题是否已经做过
						$.each(questionList, function(i, o) {
							if (curGroupId == o.group_id && questionList[i + 1]) {
								//下一题做过
								if (questionList[i + 1].rate) {
									//可以去下一关
									renderData.isLockNextGroup = false;
								}
							}
						});
					}
				} else {
					//禁止去下一关
					renderData.isLockNextGroup = true;
				}
				//是否购买全日制，1：解锁(已购买)，0未解锁
				if(list_status==1){
					//可以去下一关
					renderData.isLockNextGroup = false;
				}
				renderResult(renderData);
			}
		});

	};

	//存储我做的每一道题
	var doRecords = function(obj) {
		var isDonePush = false,
			isErrorPush = false;
		var item = {};
		item.question_id = questionId;
		item.question_sequence_number = questionNum;
		item.result = obj.result;
		item.is_correct = obj.is_correct;
		
		//记录用户做过的题
		$.each(userDoneRecords, function(i, v) {
			if (v.question_id == questionId) {
				isDonePush = true;
			}
		});
		if (!isDonePush) {
			userDoneRecords.push(item);
		}

		//记录错题(1:正确)
		if (obj.is_correct != 1) {
			$.each(wrongArray, function(ii, vv) {
				if (vv.question_id == questionId) {
					isErrorPush = true;
				}
			});
			if (!isErrorPush) {
				wrongArray.push(item);
			}
		}
	};


	//从单元列表页面进入做题页面方法
	var someUnit = function() {
		durationTime = 0; //计时时间间隔（单位秒）
		currentTestTimeStr = '00:00:00'; //重置计时时间
		curGroupId = $(this).attr('group_id');
		curGroupNum = $(this).attr('group_num');
		userDoneRecords = [];
		wrongArray = [];
		markWrongIng = false;
		curGroupId = "200";
		curGroupNum = "1";
//		showDiction();
	};

	//从结果页进入下一单元
	var nextUnit = function() {
/*		$('#btnDictNextUnit').attr('disabled',true);
		//获取下一单元的排序号和单元ID
		if (group_Id_Nums[parseInt(curGroupNum) + 1]) {
			curGroupNum = parseInt(curGroupNum) + 1;
			curGroupId = group_Id_Nums[curGroupNum];
		} else {
			alert('已经是最后一个单元！');
			return;
		}
		//如果下一单元做过则进入结果页，否则进入做题页
		$.ajax({
			url: URL.baseURL5 + 'dictation_results/web?group_id=' + curGroupId,
			type: 'GET',
			headers: {
				Authorization: token
			},
			success: function(json) {
				//呈现结果页
				//json.rate有值，表示用户做过此单元
				if (json.dictation_results && json.dictation_results.length > 0) {
					userDoneRecords = [];
					wrongArray = [];
					wrongArray = $.map(json.dictation_results, function(val, index) {
						if (val.is_correct != 1) {
							return val;
						}
					});
					var renderData = {};
					renderData.isBest=true;//直接进入结果页，显示最好成绩
					renderData.records = json.dictation_results;
					renderData.groupSeqNum = json.group_sequence_number;
					renderData.avg_speed = json.avg_speed;
					renderData.group_level = json.group_level;
					renderData.rate = json.rate;

					//达标了，但是之前做过的且在最大解锁关卡之外的默认不能下一题，但是如果它的下一题做过则可下一题
					if (json.group_level > 2) {
						//达标了可以去下一关
						renderData.isLockNextGroup = false;
						//如果老用户在最大解锁关卡外做过（照顾老用户的做题记录）
						if (curGroupNum > currentBiggestUnlockNum) {
							//禁止去下一关
							renderData.isLockNextGroup = true;
							//判断下一题是否已经做过
							$.each(questionList, function(i, o) {
								if (curGroupId == o.group_id && questionList[i + 1]) {
									//下一题做过
									if (questionList[i + 1].rate) {
										//可以去下一关
										renderData.isLockNextGroup = false;
									}
								}
							});
						}

					} else {
						//禁止去下一关
						renderData.isLockNextGroup = true;
					}
					//是否购买全日制，1：解锁(已购买)，0未解锁
					if(list_status==1){
						//可以去下一关
						renderData.isLockNextGroup = false;
					}

					renderResult(renderData);
				} else {
					//下一单元去做题
					userDoneRecords = [];
					wrongArray = [];
					markWrongIng = false;
					durationTime=0;
					clearTimer();
					currentTestTimeStr = '00:00:00'; //充值计时时间
					//显示单词填空页面
//					showDiction();
				}
			}
		});--------20160927下一单元改完成*/
		$("#morePlan").show();  
	};

	//呈现填写单词页面
	var showDictions = function(quesId) {
		BaseCookie.get();
		token = BaseCookie.getToken();
		if (isEmpty(token)) {
			token = "xiaoma";
		}
		if (!quesId) {
			quesId = 0;
		}
		getDataMaster({
			url: URL.baseURL5 + 'dictation_questions/web',
			type: 'GET',
			headers: {
				Authorization: token
			},
			data: {
				group_id: curGroupId,
				question_id: quesId
			},
			success: _success
		});

		function _success(msg) {
			//计算需要生成多少个输入框
			lineNum.set(msg);
			msg['lineNum'] = lineNum.get();
			msg['group_id'] = curGroupId;
			msg['group_num'] = curGroupNum;
			questionId = msg.question_id;
			questionNum = msg.question_sequence_number;
			questionCount = msg.group_count;
			nextQuestionId = msg.next_question_id;
			//呈现填写单词页面
			renderMaster({
				renderData: msg,
				tmplName: TMPL.t1,
				cbk: function() {
					//初始化播放器
					initAudioControl('myMusic');
					if (markWrongIng) {
						//做错题不显示计时
						$('.time-pos').hide();
						if ((questionNum).toString() == questionCount) {
							$('#listen_write_nextSub').html("提交");
						}
					} else {
						/*计时*/
						if (!isShowTimer) {
							$('.mytime').hide();
						}
						if (currentTestTimeStr) {
							$("#testTimer2").html(currentTestTimeStr);
						}
						startTimer();
						//音频加载完成才开始播放
						//$('#myMusic').on('loadedmetadata', function (e) {
						//	if(!testTimerID){
						//		startTimer();
						//	}
						//});
						/*计时*/
					}
					//最后一题
					if (msg.question_sequence_number == msg.group_count) {
						$('#listen_write_nextSub').html("提交");
					}
					//苹果浏览器特殊处理
					isSafari= isSafariBrowser();
					//输入框按键事件
					$('.dic-input1').keydown(function(e) {
						//keycode=229(中文输入法下的字母和数字键为229)
						if (e.which == 32 || e.which == 13 || (isSafari && e.which == 229)) {
							var next = $(this).next();
							if (next.get(0).tagName.toLowerCase() == 'label') {
								next.next().focus();
							} else {
								var v = next.val();
								next.val('').focus().val(v);
							}
						}
					}).mouseup(function() {
						$(this).select();
					});

				}
			});

			//如果是做错题，则设置下一题等信息
			if (markWrongIng) {
				//如果是做错题的话，下一题id从错题列表里取
				nextQuestionId = doingWrong[questionNum].next_question_id;
				//做错题情况下，设置questionCount为最后一道题的questionNum
				for (var key in doingWrong) {
					questionCount = key;
				}
			}
		}
	};

	//是否苹果浏览器
	var isSafariBrowser=function(){
		var agent =navigator.userAgent.toLowerCase();
		var myBrowser = {
			safari: function(){return /webkit/i.test(agent) && !myBrowser.chrome();},
			chrome: function(){return /chrome/i.test(agent) && /webkit/i.test(agent) && /mozilla/i.test(agent);}
		};
		return myBrowser.safari();
	};

	//计算需生成的输入框数量
	var lineNum = function(obj) {};
	lineNum.prototype.num = undefined;

	var reg = /[^A-Z0-9a-z'\-]/g;
	lineNum.get = function() {
		return lineObjs
	};
	
	lineNum.set = function(obj) {
		//计算需要生成多少输入框
		if (obj) {
			var dicts = [];
			var strSample = obj.questions[thisQuestionIndex].sample;
			//匹配（D.C.）这种格式和900,888,000.123这种格式,wfl
			var reg_DC_Number = /(([a-zA-Z]+\.){2})|(((\d{1,3}(,\d{3})*)|(\d+))(\.\d+)?)/g;
			if (reg_DC_Number.test(strSample)) {
				dicts = dealCharacter(strSample, reg_DC_Number);
			} else {
				dicts = strSample.replace(reg, " ").replace(/\s+/g, " ").trim().split(' ');
			}

			lineObjs = [];
			//处理my-last-chara这个格式，wfl
			for (var i = 0; i < dicts.length; i++) {
				/*var item = dicts[i];
				if (item.indexOf('-') > 0) {
					item = item.replace(/-/g, ',-,');
					$.each(item.split(','), function(j, n) {
						if (n.trim() == '-') {
							lineObjs.push({
								type: "line"
							});
						} else {
							lineObjs.push({
								type: "line_dict",
								order: i + 1,
								subOrder: j
							});
						}
					});
				} else {
					lineObjs.push({
						type: "dict"
					});
				}*/
				lineObjs.push({
					type: "dict"
				});
			}
		}
	};

	//符合指定正则表达式的字符串不处理
	function dealCharacter(strSample, regx) {
		var dicts = [];
		var arr = strSample.match(regx);
		var reg_noline = /[^A-Z0-9a-z'\-\|]/g;

		//用|代替匹配的（D.C.）等
		for (var i = 0, len = arr.length; i < len; i++) {
			strSample = strSample.replace(arr[i], '|');
		}
		//去掉乱七八糟的东西
		strSample = strSample.replace(reg_noline, " ").replace(/\s+/g, " ");

		var arrClean = strSample.split('|');
		var strClean = '';
		for (var j = 0, len = arrClean.length; j < len; j++) {
			//把（D.C.）等再拼接上
			if (j < arr.length) {
				strClean += arrClean[j] + arr[j];
			} else {
				strClean += arrClean[j];
			}
		}
		dicts = strClean.trim().split(' ');
		return dicts;
	}

	//通过题目id设置单元文本
	var group_id;
	var group_name;
	var getUnitForId = function(id) {

		var _id, check = true;
		var ary = group['dictation_groups'];
		for (var i = 0; i < ary.length; i++) {
			if (check) {
				for (var j = 0; j < ary[i]['dictation_questions'].length; j++) {
					if (ary[i]['dictation_questions'][j]['id'] == id) {
						_id = ary[i]['name'];
						check = false;
						group_id = ary[i]['id'];
						group_name = _id;
						//$("#lblUnitId").text(_id);
					}
				}
			}
		}
	};


	/*//获得目录树group
	var getAllGroup = function(cbk) {
		var renderData;
		var _success = function(msg) {
			groups = msg;
			if (groups && cbk) {
				cbk(groups)
			}
		};
		renderData = getDataMaster({
			url: URL.baseURL5 + 'dictation_groups',
			type: 'GET',
			headers: {
				Authorization: token
			},
			success: _success
		})
	};*/

	//查看答案
	var lookAnswer = function() {
		var allInput = $('#answer').find("input");
		$(".ans").toggle();
		var dis = $(".ans").css("display");
		if (dis == "none") {
			$(allInput).each(function(i, o) {
				$(allInput[i]).removeAttr("disabled");
//				$(allInput[i]).val("")  查看答案并不清除答案;
			});
			renderDefault();
		} else {
			$(allInput).each(function(i, o) {
				$(allInput[i]).attr("disabled", "disabled")
			});
			var obj = checkAns();
			renderWrong(obj.result);
		}
	};
	//查看答案后，错误单词显示红色
	var renderWrong = function(result) {
		var inputs = $('#answer').find("input");
		result = $.map(result, function(item) {
			if (item.value.indexOf('-') > 0) {
				var answers = item.value.split('-');
				var arr = [];
				for (var i = 0; i < answers.length; i++) {
					arr.push({
						value: answers[i],
						correct: item.correct
					});
				}
				return arr;
			} else {
				return item;
			}
		});
		for (var i = 0; i < result.length; i++) {
			if (result[i].value) {
				if (result[i].correct) {
					$(inputs[i]).val(result[i].value);
					$(inputs[i]).css('color', '');
				} else {
					$(inputs[i]).val(result[i].value);
					$(inputs[i]).css('color', color);
				}
			}
		}
	};

	var renderDefault = function() {
		var inputs = $('#answer').find("input");
		for (var i = 0; i < inputs.length; i++) {
			$(inputs[i]).css('color', '');
		}
	};

	//计算结果
	var checkAns = function() {
		var reg1 = /[^\-A-Z0-9a-z']/g;
		var inputs = $('#answer').find("input");
		var answerArray = []; //正确答案

		var is_correct = 1;
		var userAnswers = []; //用户答案

		/*以下为：将正确答案字符串处理成数组*/
		var strSample = $("#sureAnswer").html();
		answerArray = strSample.replace(reg1, " ").replace(/\s+/g, " ").trim().split(' ');

		/*//匹配（D.C.）这种格式和900,888,000.123这种格式
		var reg_DC_Number = /(([a-zA-Z]+\.){2})|(((\d{1,3}(,\d{3})*)|(\d+))(\.\d+)?)/g;
		if (reg_DC_Number.test(strSample)) {
			answerArray = dealCharacter(strSample, reg_DC_Number);
		} else {
			answerArray = strSample.replace(reg1, " ").replace(/\s+/g, " ").trim().split(' ');
		}
		/!*以上为：将正确答案字符串处理成数组*!/

		//遍历输入框控件获得用户的输入值
		inputs.each(function(index, domEle) {
			var $this = $(domEle);
			//如果单词的值是由前后两个输入框和“-”组成的（如这种单词：my-test）
			//前半部分对应的输入框的属性为data-suborder=0，后半部分对应的属性为data-suborder=2
			if ($this.attr('data-type') == 'line_dict') {
				//只在前半部分时拼接前后两部分，在遍历到后半部分时不再处理
				if ($this.attr('data-suborder') == '0') {
					var order = $this.attr('data-order'),
						line_dicts = inputs.filter('[data-order="' + order + '"]'),
						matching_dicts = '';
					for (var m = 0; m < line_dicts.length; m++) {
						if (line_dicts[m].value) {
							if (m == line_dicts.length - 1) {
								matching_dicts += line_dicts[m].value;
							} else {
								matching_dicts += line_dicts[m].value + '-';
							}
						}
					}
					userAnswers.push(matching_dicts);
				}
			} else {
				userAnswers.push($this.val().trim());
			}
		});
		$.each(userAnswers, function(index, val) {
			var tmp = {};

			var input = val.replace(reg1, "").toLowerCase();
			//解决输入或者答案有左右侧单引号问题
			if (input.substring(0, 1) == "'" || input.substring(0, 1) == '"') {
				input = input.substring(1);
			}
			if (input.substring(input.length - 1) == "'" || input.substring(0, 1) == '"') {
				input = input.substring(0, input.length - 1);
			}
			var answer = answerArray[index].replace(reg1, "").toLowerCase()
			if (answer.substring(0, 1) == "'" || answer.substring(0, 1) == '"') {
				answer = answer.substring(1)
			}
			if (answer.substring(answer.length - 1) == "'" || answer.substring(0, 1) == '"') {
				answer = answer.substring(0, answer.length - 1)
			}
			tmp.value = val;
			tmp.correct = input == answer ? true : false;
			if (tmp.correct) {
				rightItems++;
			}
			result[index] = tmp;
		});*/

		//遍历输入框控件获得用户的输入值
		inputs.each(function(index, domEle) {
			userAnswers.push($(domEle).val().trim());
		});

		var theResult = MathWord_TF(answerArray,userAnswers,false);
		if (theResult.length == theResult.rightCount) { //全对
			is_correct = 1;
		} else if (theResult.rightCount == 0) { //全错
			is_correct = 2;
		} else { //部分正确
			for(var i1 = 0;i1 < answerArray.length;i1++){
				if(is_correct == 3){
					break;
				}else{
					is_correct = 2;
				}
				for(var j1 = 0;j1 < userAnswers.length;j1++){
					if(i1 == j1){
						if(answerArray[j1] == userAnswers[j1]){
							is_correct = 3;
							break;
						}
					}
				}
			}
		}
		return {
			"is_correct": is_correct,
			result: theResult
		};
	};
	
	
	var listeningTime = $("#listeningTime").val();  //获取限时提交时间

	//初始化音频播放器控件
	var initAudioControl=function(eleId){

		audiojs.events.ready(function () {
			var objAudit = document.getElementById(eleId);

			ctlAudio = audiojs.create(objAudit, {
				css: false,
				createPlayer: {
					markup: false,
					playPauseClass: 'play-pauseZ',
					scrubberClass: 'scrubberZ',
					progressClass: 'progressZ',
					loaderClass: 'loadedZ',
					timeClass: 'timeZ',
					durationClass: 'durationZ',
					playedClass: 'playedZ',
					errorMessageClass: 'error-messageZ',
					playingClass: 'playingZ',
					loadingClass: 'loadingZ',
					errorClass: 'errorZ'
				}
			});
			/*$('.setsound').on('click', function (e) {
				var i = (e.clientX - leftPos(this)) / this.offsetWidth;
				$('.play-voice').width((i * 100) + '%');
				ctlAudio.setVolume(i);
			});
			/!*
			 没发现或者说没理解是什么作用
			 不过 看到 audiojs 的进度以及音量调节中是有获取这个值的
			 *!/
			function leftPos(elem) {
				var curleft = 0;
				if (elem.offsetParent)
					do {
						curleft += elem.offsetLeft;
					} while (elem = elem.offsetParent);
				return curleft;
			};*/
			$(".play-pauseZ").on("click",function(){
				$(".play-pauseZ").hide();
			})
			$("#"+eleId).on("ended",function(){
				$(".play-pauseZ").show();
			})
		});
	};

	/*var renderIEObject = function(url) {
		var IEDiv = document.getElementById("IEDiv");
		var htmlstr = "<object id='soundIE' width='260' height='64' classid='CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6'>";
		htmlstr += "<param name='AutoStart' value='0'></param>";
		htmlstr += "<param name='url' value='" + url + "'></param>";
		htmlstr += "<param name='enabled' value='true'></param>";
		htmlstr += "<param name='uiMode' value='none'></param>";
		htmlstr += "</object>";
		IEDiv.innerHTML = htmlstr;

	};
	var setAudioUrl = function(url) {
		// $("#soundIE").attr("src", url);
		// $('#soundIE').find('param[name="url"]').val(url);
		renderIEObject(url);
		$('#sound_other').attr('src', url);
	};

	//播放DEMO
	var playSound = function() {
		if (isIE()) {
			playSoundIE();
		} else {
			playSoundOthers();
		}
	};

	var isIE = function() { //ie?
		if (!!window.ActiveXObject || "ActiveXObject" in window) {
			return true;
		} else {
			return false;
		}
	};

	var playSoundIE = function() {
		if ($('#soundIE')[0].playState == 1 || $('#soundIE')[0].playState == 2 || $('#soundIE')[0].playState == 10) {
			// $('#test').attr('src','123-1.gif');
			$('#soundIE')[0].controls.play();
		} else {
			// $('#test').attr('src','123.jpg');
			$('#soundIE')[0].controls.pause();
		}
	};

	var playSoundOthers = function() {
		var music = document.getElementById("sound_other");
		if (music.paused) {
			music.play();
			$('#soundImg').attr('src', '../i/i1.gif');
		} else {
			music.pause();
			$('#soundImg').attr('src', '../i/dic-pic.png');
		}
	};*/

	/*计时器相关*/
	var showHideTimer = function() {
		$(".mytime").fadeToggle("fast", function() {
			if ($('.mytime').is(':hidden')) {
				$("#timeBtnStaus").html("显示");
				isShowTimer = false;
			} else {
				$("#timeBtnStaus").html("计时");
				isShowTimer = true;
			}
		});
	};
	
	
	var startTimer = function() {
		var fn = function() {
			if ($("#testTimer2").length <= 0) {
				console.log("not find target");
				clearTimer();
			}

			var checkTime = function(i) {
				if (i < 10) {
					i = "0" + i;
				}
				return i;
			};

			if (!durationTime && durationTime<0) {
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
			//到时间，自动提交
				var currentTime = parseInt(parseInt(mm)*60+parseInt(ss));
                if(listeningTime != null &&　listeningTime　!= ""){
                	listeningTime = parseInt(listeningTime);
                }
                if(currentTime == listeningTime && currentTime != 0){ //如果已到时，则自动提交
                	//questionNum //当前做的题
        			//questionCount //总共有多少题
                    questionCount = questionNum;//将当前题的编号设为 最后一道题的编号，提交保存
                	nextSubject();
                }
			
			hh = checkTime(hh);
			mm = checkTime(mm);
			ss = checkTime(ss);
			currentTestTimeStr = hh + ":" + mm + ":" + ss;
			$("#testTimer2").html(currentTestTimeStr);
		};
		if (testTimerID) return;
		testTimerID = window.setInterval(fn, 1000);
	};
	var zeroFn=function(n){
		n=n<10?"0"+n:n;
		return n;
	}
	var clearTimer = function() {
		window.clearInterval(testTimerID);
		testTimerID = undefined;
	};

	var tipText='';//未解锁提示内容
	//获取未解锁提示
	var lockUnitTip = function () {
		if(tipText){
			$('#lockTip').text(tipText);
			$('#lockModal').modal({
				backdrop: 'static'
			});
			return;
		}
		//moduleType：1听写,61记忆复写
		$.ajax({
			url: URL.baseURL10 + "bfResult/getLevleRule.action",
			type: 'GET',
			headers: {
				fromType: 'web'
			},
			data: {
				moduleType: '1'
			},
			success: function (json) {
				if (json.status == 0) {
					tipText=json.message;
					$('#lockTip').text(json.message);
					$('#lockModal').modal({
						backdrop: 'static'
					});
				} else {
					console.log(json.message);
				}
			}
		});
	};

	/**
	 * [callJplayer jplayer的先后执行顺序为:
	 * 1、html/inc/jplayer.shtml(页面中include)
	 * 2、tmpl_jplayer模板(artTemplate中include)
	 * 3、require ['common/jplayer'](jplayer逻辑执行模块)
	 * ]
	 * @return {[type]} [description]
	 */
	var callJplayer = function() {
		//不能用require
		//require(['common/jplayer'], function() {})
		(function() {
			var my_jPlayer = $("#jquery_jplayer"),
				my_trackName = $("#jp_container .track-name"),
				my_playState = $("#jp_container .play-state"),
				my_extraPlayInfo = $("#jp_container .extra-play-info");
			var opt_play_first = false,
				opt_auto_play = true,
				opt_text_playing = "",
				opt_text_selected = "";
			var first_track = true;

			$.jPlayer.timeFormat.padMin = true;
			$.jPlayer.timeFormat.padSec = true;
			$.jPlayer.timeFormat.sepMin = " : ";
			$.jPlayer.timeFormat.sepSec = "";

			var $progress = $(".progress-bar");
			my_playState.text(opt_text_selected);
			my_jPlayer.jPlayer({
				ready: function() {
					$("#jp_container .track-default").click();
				},
				timeupdate: function(event) {
					var percentage = parseInt(event.jPlayer.status.currentPercentAbsolute, 10) + "%";
					// my_extraPlayInfo.text(percentage);
					$progress.css({
						width: (percentage)
					});
					// $progress.html(percentage)
				},
				play: function(event) {
					my_playState.text(opt_text_playing);
				},
				/*pause: function(event) {
					my_playState.text(opt_text_selected);
				},*/
				ended: function(event) {
					my_playState.text(opt_text_selected);
				},
				swfPath: "../../lib/jplayer",
				cssSelectorAncestor: "#jp_container",
				supplied: "mp3",
				wmode: "window"
			});

			$("#jp_container .track").click(function(e) {
				my_trackName.text($(this).text());
				my_jPlayer.jPlayer("setMedia", {
					mp3: $(this).attr("href")
				});
				if ((opt_play_first && first_track) || (opt_auto_play && !first_track)) {
					my_jPlayer.jPlayer("play");
				}
				first_track = false;
				$(this).blur();
				return false;
			});
		})()
	};

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

	var isEmpty = function(param) {
		if (null == param || "" == param || "xiaoma" == param) {
			return true;
		} else {
			return false;
		}
	};

	var percentNum = function(num) {
		return (Math.round(num * 10000) / 100.00 + "%"); //小数点后两位百分比
	};

	//练习历史
	var historyTo = function(groupId, groupSeqNum) {
		//$('body,html').animate({
		//	scrollTop: 0
		//}, 100);
		window.scrollTo(0, 0);
		curGroupId = groupId;
		curGroupNum = groupSeqNum;

		//获取单元列表
		getDataMaster({
			url: URL.baseURL5 + 'dictation_groups/web',
			type: 'GET',
			headers: {
				Authorization: token
			},
			success: function(json) {
				//存储全局对象以备后用（单元序号和单元id的数组）
				$.each(json.dictation_groups, function(index, obj) {
					group_Id_Nums[obj.group_sequence_number] = obj.group_id;
					if (obj.group_id == json.current_group_id) {
						currentBiggestUnlockNum = parseInt(obj.group_sequence_number);
					}
				});

				//将关卡列表存储到全局中
				questionList = json.dictation_groups;
				gotoResult();
			}
		});

	};

	/**
	 * [renderMaster render基础函数]
	 * @param  {[Object]} param [list]
	 */
	var renderMaster = function(param) {
		var renderData = '',
			tmplName = undefined,
			wrap = '';
		renderData = param.renderData == undefined ? renderData : param.renderData;
		tmplName = param.tmplName == undefined ? tmplName : param.tmplName;
		wrap = param.wrap == undefined ? $wrap : param.wrap;

		tmplName && ~(function() {
			var _afterRender = function() {
				if (param.cbk) {
					param['cbk']()
				}
			};
			Render.render({
				wrap: wrap,
				tmpl: {
					tmplName: tmplName,
					tmplData: renderData
				},
				afterRender: _afterRender
			})
		})()

	};

	var getDataMaster = function(param) {
		UniqueAjax({
			url: param.url,
			data: param.data || '',
			type: param.type || 'post',
			dataType: param.dataType || 'json',
			headers: param.headers || '',
			success: param.success
		})
	};

	/**
	 * 比较用户答案和正确答案（最佳公共子序列）
	 * @param TargetList:正确答案数组
	 * @param userList:用户答案数组
	 * @param MatchLetter:是否比较大小写
	 * @returns {Array}
	 * @constructor
	 */
	var MathWord_TF = function (TargetList, userList, MatchLetter) {
		var tlen = TargetList.length;
		var ulen = userList.length;

		var Ptable = new Array(tlen); 		//(tlen, ulen);
		var Stable = new Array(tlen); 		//(tlen, ulen);
		var Pathtable = new Array(tlen); 		//(tlen, ulen);
		for (var n = 0; n < tlen; n++) {
			Ptable[n] = [];
			Stable[n] = [];
			Pathtable[n] = [];
			for (var nn = 0; nn < ulen; nn++) {
				Ptable[n][nn] = 0;
				Stable[n][nn] = 0;
				Pathtable[n][nn] = 0;
			}
		}

		for (var i = 0; i < tlen; i++) {
			for (var r = 0; r < ulen; r++) {
				Ptable[i][r] = GetStringDifference(TargetList[i], userList[r], MatchLetter);
			}
		}
		//start
		for (var i = 0; i < ulen; i++) {
			Stable[0][i] = Ptable[0][i];
		}

		for (var x = 1; x < tlen; x++) {
			for (var y = 0; y < ulen; y++) {
				var max = -1;
				var index = -1;

				// begin
				for (var z = 0; z <= y; z++) {
					if (z == y && Ptable[x - 1][y] == 1) {
						if (z != ulen - 1)
						{
							continue;
						}
					}

					if (Stable[x - 1][z] > max) {
						max = Stable[x - 1][z];
						index = z;
					}
				}
				// end

				Stable[x][y] = max + Ptable[x][y];
				Pathtable[x][y] = index;
			}
		}
		var resultmax = -1;
		var resultlastindex = -1;
		for (var y = ulen - 1; y >= 0; y--) {
			if (Stable[tlen - 1][y] > resultmax) {
				resultlastindex = y;
				resultmax = Stable[tlen - 1][y];
			}
		}

		var result = [];
		for (var it = 0; it < userList.length; it++) {
			result[it] = {value: userList[it], correct: false};
		}

		var xx = tlen - 1;
		var rightCount = 0;
		while (xx >= 0) {
			if (Ptable[xx][resultlastindex] == 1) {
				result[resultlastindex].correct = true;
				rightCount++;
			}
			resultlastindex = Pathtable[xx][resultlastindex];
			xx--;
		}
		result.rightCount = rightCount;
		return result;
	};
	var GetStringDifference = function (str1, str2, mated) {
		if (mated == false) {
			str1 = str1;
			str2 = str2;
		}
		if ($.trim(str1) == $.trim(str2)) {
			return 1;
		}
		else {
			return 0;
		}
	};

	//下一题（或最后一题提交）
	var nextSubject = function() {
		//最后一题
		if (questionNum == questionCount) {
			//停止录音
			//ctlAudio.pause(); //暂停录音
			/*if (!exerciseApi.isLogin) {
				clearTimer(); //弹出登录层暂停时间
				$('#dialogLogin').modal();
				$('#dialogLogin').on('hidden.bs.modal', function(e) {
					BaseCookie.get();
					if (BaseCookie.getToken()) {
						token = BaseCookie.getToken();
					}
					startTimer();
				});
				thisQuestionIndex--; //20160918
				alert("请登录")
				return;
			}*/
			thisQuestionIndex = 0; //20160918
			doRecords(checkAns()); // 记录错题并且将结果存入userDoneRecords数组
			var renderData = {};
			renderData.records = userDoneRecords;
			renderData.groupSeqNum = curGroupNum;
			renderData.isBest=false;//做题进入结果页，显示本次成绩
			renderData.title = xm_title;
			
			if (markWrongIng) { //只练错题
				Render.render({
					wrap: $wrap,
					tmpl: {
						tmplName: TMPL.result,
						tmplData: renderData
					},
					afterRender: function() {
						if (wrongArray.length == 0) { //如果全做对了
							$("#listen-write-onlywrong").remove()
						}
						$(".practice-result").hide();
						if(!exerciseApi.isFromPlan){
							$("#btnDictDone").show();
						}else{
							$("#btnDictDone").hide();
						}
					}
				});		
			} else {
				var totalCount = 0;
				var rightCount = 0;
//				var dictation_results = new Array(userDoneRecords.length);
				var dictation_results = [];
				$.each(userDoneRecords, function(index, value) {
					var arr = [];
					$.each(value.result, function(idx, val) {
						if (val.correct) {
							rightCount++;
						}
						arr.push(val.value);					
					});
					var item = {};
					item.answer = arr.join("|");
					totalCount += value.result.length;
					item.question_sequence_number = value.question_sequence_number
					item.is_correct = value.is_correct;
					dictation_results[index] = item;
					/*if(item.answer.length){
						dictation_results.push(item);
					} 只提交错误的题*/
				});

				//单元中所有题中正确的单词数/单元中所有题中的所有单词数
				var rate = (rightCount / totalCount) * 100;
				if (rate > 99 && rate < 100) {
					rate = 99;
				} else if (rate > 0 && rate < 1) {
					rate = 1;
				} else {
					rate = Math.round(rate);
				}
				renderData.rate = rate;
				//计算话费时间
				var spend_time = Math.round(durationTime);
				spend_time = spend_time < 1 ? 1 : spend_time;
				//本地计算平均速度公式中
				var avg_speed = spend_time / totalCount;
				var digitRound = function(digit, length) {
					length = length ? parseInt(length) : 0;
					if (length <= 0) return Math.round(digit);
					digit = Math.round(digit * Math.pow(10, length)) / Math.pow(10, length);
					return digit;
				};
				if (avg_speed <= 10 && avg_speed > 0) {
					avg_speed = digitRound(avg_speed.toString(), 2).toString() + 's'
				} else if (avg_speed <= 60) {
					avg_speed = Math.round(avg_speed.toString()).toString() + 's'
				} else if (avg_speed <= 3600) {
					var avg_string1 = avg_speed / 60;
					avg_speed = digitRound(avg_string1, 1).toString() + 'min'
				} else if (avg_speed > 3600) {
					var avg_string2 = avg_speed / 3600;
					avg_speed = Math.round(avg_string2).toString() + 'h'
				}
				renderData.avg_speed = avg_speed;
				//设置小旗子图片
				if (renderData.rate < 50) {
					renderData.imgUrl = '../i/newimg-0.png';
				} else if (renderData.rate >= 50 && renderData.rate < 60) {
					renderData.imgUrl = '../i/newimg-4.png';
				} else if (renderData.rate >= 60 && renderData.rate < 80) {
					renderData.imgUrl = '../i/newimg-1.png';
				} else if (renderData.rate >= 80 && renderData.rate < 99) {
					renderData.imgUrl = '../i/newimg-2.png';
				} else if (renderData.rate >= 99 && renderData.rate < 100) {
					renderData.imgUrl = '../i/newimg-3.png';
				}
				renderResult(renderData);
				var date=new Date($.ajax({async: false}).getResponseHeader("Date"));
				xm_endTime=zeroFn(date.getFullYear())+"-"+zeroFn((date.getMonth()+1))+"-"+zeroFn(date.getDate())+" "+zeroFn(date.getHours())+":"+zeroFn(date.getMinutes())+":"+zeroFn(date.getSeconds());
				date=null;
				//alert(URL.xiaomaURL + 'dictation/results');
				$.ajax({
					url: URL.xiaomaURL + 'dictates/results',
					type: 'POST',
					contentType: "application/json; charset=utf-8",
					data: JSON.stringify({
						group_id: curGroupId,
						rate: rate,
						wrong_results: dictation_results,
						spend_time: spend_time,
						word_amount: totalCount,
						new_version: 2,
						"planDayId":xm_planDayId,
						"exerciseId":xm_exerciseId,
						"startTime":xm_startTime,
						"endTime":xm_endTime
					}),
					headers: {
						Authorization: exerciseApi.xiaomaToken,
						fromType:"web"
					},
					success: function(json) {
						exerciseApi.updateListItem();
					}
				});
			}
		} else {
			doRecords(checkAns());
			if(!markWrongIng){
				thisQuestionIndex++;
			}
			buildDictation(thisQuestionIndex);
		}
		 //20160918
	};
 
	//20160918 请求读题
	var showDictation = function(groupId,planDayId,exerciseId,title) {
		curGroupId = groupId; 
		xm_planDayId=planDayId;
		xm_exerciseId=exerciseId;
		xm_title=title;  //20160926
		getDataMaster({
			url: URL.xiaomaURL + 'dictates/group/'+ curGroupId,
			type: 'GET',
			async: false,
			success: function(data) {
					dicMsg = data;
					buildDictation(thisQuestionIndex);
					var date=new Date($.ajax({async: false}).getResponseHeader("Date"));
					xm_startTime=zeroFn(date.getFullYear())+"-"+zeroFn((date.getMonth()+1))+"-"+zeroFn(date.getDate())+" "+zeroFn(date.getHours())+":"+zeroFn(date.getMinutes())+":"+zeroFn(date.getSeconds());
					date=null;
			}
		});
	};
	
	function buildDictation(index){	
			//计算需要生成多少个输入框
				lineNum.set(dicMsg);
				dicMsg['lineNum'] = lineNum.get();
				dicMsg['group_id'] = curGroupId;
				dicMsg['group_num'] = curGroupNum;
				dicMsg['questionNum'] = dicMsg.questions[index].sequence_number; //20160918
				dicMsg['audioUrl'] = dicMsg.questions[index].audioUrl; //20160918
				dicMsg['sample'] = dicMsg.questions[index].sample; //20160918
				dicMsg['title'] = xm_title;
				questionId = dicMsg.questions[index].id; //20160918
				questionNum = dicMsg.questions[index].sequence_number; //20160918
				questionCount = dicMsg.questions.length; //20160918
				nextQuestionId = questionId + 1; //20160918
				//呈现填写单词页面
				renderMaster({
					renderData: dicMsg,
					tmplName: TMPL.t1,
					cbk: function() {
						//初始化播放器
						initAudioControl('myMusic');
						if (markWrongIng) {
							//做错题不显示计时
							$('.time-pos').hide();
							if (questionNum == questionCount) {
								$('#listen_write_nextSub').html("提交");
							}
						} else {
							/*计时*/
							if (!isShowTimer) {
								$('.mytime').hide();
							}
							if (currentTestTimeStr) {
								$("#testTimer2").html(currentTestTimeStr);
							}
							startTimer();
							//音频加载完成才开始播放
							//$('#myMusic').on('loadedmetadata', function (e) {
							//	if(!testTimerID){
							//		startTimer();
							//	}
							//});
							/*计时*/
						}
						//最后一题
						if (questionNum == questionCount) {
							$('#listen_write_nextSub').html("提交");
						}
						//苹果浏览器特殊处理
						isSafari= isSafariBrowser();
						//输入框按键事件
						$('.dic-input1').keydown(function(e) {
							//keycode=229(中文输入法下的字母和数字键为229)
							if (e.which == 32 || e.which == 13 || (isSafari && e.which == 229)) {
								var next = $(this).next();
								if (next.get(0).tagName.toLowerCase() == 'label') {
									next.next().focus();
								} else {
									var v = next.val();
									next.val('').focus().val(v);
								}
							}
						}).mouseup(function() {
							$(this).select();
						});
						setTimeout(function(){
							var $errorHtml = $(".error-messageZ").html();
							if($errorHtml != "" && $errorHtml != null){
								$(".play-pauseZ").click(function(){
									alert("请插入耳机后再刷新重试！");
								})	
							}
						},1000)
						
					},
				});
				//如果是做错题，则设置下一题等信息
				if (markWrongIng) {
					//如果是做错题的话，下一题id从错题列表里取
					nextQuestionId = doingWrong[questionNum].next_question_id;
					thisQuestionIndex = doingWrong[questionNum].next_question_num - 1;
					//做错题情况下，设置questionCount为最后一道题的questionNum
					for (var key in doingWrong) {
						questionCount = key;
					}
				}
			}	
	//20160918 进入最好成绩 结果页
		var gotoHisResult = function(groupId,planDayId,exerciseId,title) {
		curGroupId = groupId; 
		xm_planDayId=planDayId;
		xm_exerciseId=exerciseId;
		xm_title = title;
		$('body,html').animate({
			scrollTop: 0
		}, 100);
		$.ajax({
			url: URL.xiaomaURL + 'dictates/group/' + curGroupId,
			type: 'GET',
			dataType: 'json',
			headers: {
				Authorization: exerciseApi.xiaomaToken
			},
			success: function(json) {
				dicMsg = json;
				wrongArray = [];
				wrongArray = $.map(json.results.wrong_results, function(val, index) {
					//1:全对
					if (val.is_correct != 1) {
						return val;
					}
				});
				//wrongArray = [{"question_id":"2521","is_correct":"2"},{"question_id":"2522","is_correct":"0"}]; //测验
				var recordsArr = [];
				$.each(json.questions,function(index,value){
					var recordsObj = {};
					recordsObj.question_sequence_number = value.sequence_number;
					recordsObj.is_correct = 1;
					$.each(wrongArray,function(index2,value2){
						if(value2.question_sequence_number  == value.sequence_number){
							recordsObj.is_correct = value2.is_correct
						}					
					})
					recordsArr.push(recordsObj);
				})		
				var renderData = {};
				renderData.isBest=true;//直接进入结果页，显示最好成绩
				renderData.records = json.results.wrong_results; 
				renderData.groupSeqNum = json.results.group_sequence_number; //20160918
				renderData.avg_speed = json.results.avg_speed + "s"; //20160918
				renderData.group_level = json.results.group_level; //20160918
				renderData.rate = json.results.rate //20160918
				renderData.title = xm_title;
				//设置小旗子图片
				if (renderData.rate < 50) {
					renderData.imgUrl = '../i/newimg-0.png';
				} else if (renderData.rate >= 50 && renderData.rate < 60) {
					renderData.imgUrl = '../i/newimg-4.png';
				} else if (renderData.rate >= 60 && renderData.rate < 80) {
					renderData.imgUrl = '../i/newimg-1.png';
				} else if (renderData.rate >= 80 && renderData.rate < 99) {
					renderData.imgUrl = '../i/newimg-2.png';
				} else if (renderData.rate >= 99 && renderData.rate < 100) {
					renderData.imgUrl = '../i/newimg-3.png';
				}
				renderResult(renderData);
			}
		});

	};
	//渲染结果页模板
	var renderResult = function(renderData) {
		Render.render({
			wrap: $wrap,
			tmpl: {
				tmplName: TMPL.result,
				tmplData: renderData
			},
			afterRender: function() {
				if (isRewardCoupon) {
					// showDiv('quanDiv', 'fade')
					isRewardCoupon = false;
				}
				if (wrongArray.length == 0) {
					$("#listen-write-onlywrong").remove();
				}
				if (renderData.rate < 50) {
					$(".result-img1").attr("src", "../i/i23.png")
				}
				if (renderData.rate >= 50 && renderData.rate <= 80) {
					$(".result-img1").attr("src", "../i/i22.png")
				}
				if (renderData.rate > 80 && renderData.rate < 100) {
					$(".result-img1").attr("src", "../i/i21.png")
				}

				if (renderData.rate == 100) {
					$("#listen-write-onlywrong").remove();
					$(".correctWrong").css("display", "block"); //正确率框
					$(".practice-result").addClass("right100"); //img外侧div添加样式
					$(".pagination4").css("display", "none"); //结果题目圈圈不显示
					$(".result-img1").attr("src", "../i/i24.png");
					$(".result-img1").addClass("i24"); //i24图片中加的class
					$(".two-button2").addClass("two-button3");
					$("#dic_percent_tip").css("display", "none"); //正确率计算文
					$("#color_sample").css("display", "none");
				}
				////禁止去下一关
				//if(renderData.isLockNextGrou){
				//	$('#btnNextRewrite').attr('disabled',true);
				//}
				setTimeout(function(){
						var $errorHtml = $(".error-messageZ").html();
						if($errorHtml != "" && $errorHtml != null){
							$(".play-pauseZ").click(function(){
								alert("请插入耳机后再刷新重试！");
							})	
						}
					},1000)
				if(!exerciseApi.isFromPlan){
					$("#btnDictDone").show();
				}else{
					$("#btnDictDone").hide();
				}
			}
		});
	};

	return {
		init: init,
		historyTo: historyTo,
		showDictation: showDictation,
		gotoHisResult: gotoHisResult
	}
});