'use strict';

define(['common/uniqueAjax', 'common/render', 'xml2json', 'app/baseURL', 'baseCookie', 'lib/store', 'lib/flashwavrecorder/recorder', 'lib/flashwavrecorder/swfobject'], function(uniqueAjax, Render, xml2json, URL, BaseCookie,Store,Recorder, Swfobject) {
	var _conf,
		$wrap,
		TMPL = {
			t1: 'app/jinjie/tmpl_speakjj_forecast_list', //口语机经预测列表
			t2: 'app/jinjie/tmpl_speakjj_paperExams_list', //历年题库列表
			t3: 'app/jinjie/tmpl_speakjj_detail',//口语做题页面
			t4: 'app/jinjie/tmpl_speakjj_detail_record',//口语机经详细-未做时初始化录音控件
			t5: 'app/jinjie/tmpl_speakjj_detail_myanswer',//口语机经详细-已有答案时初始化我的答案
			t6: 'app/jinjie/tmpl_speakjj_correction_list', // 综合口语练习列表
			t7: 'app/jinjie/tmpl_speakjj_correction_record', // 综合口语练习录音
			t8: 'app/jinjie/tmpl_speakjj_correction_myanswer' // 综合口语练习我的答案

		};
	var token,
		tokenTmp = "xiaoma";
	var groups = [];
	var questions=[];
	var questionId=null;
	var questionTypeTag;  //题目类型：机经口语预测 或者 历年真题
	var currentForecastGroupId; //机经预测所属预测日期
	var currentPaperExamsGroupID; //历年真题所属年份对象
	var paperExamsGroup=[]; //历年真题年份组对象
	var currentQuestion=null;
	var record_totalLength=45; //录音最大长度
	var record_length=0;
	var record_timer;
	var record_ing=false;
	var record_status; //录音器状态
	var group_title="" //组标题
	var uploadUrl = URL.baseURL5 + "jijing_answers/web";
	var correction_uploadUrl= URL.baseURL5 + "tpo_speaking_correction_answers/web_exercise";

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

		initEvent();
	}
	var initFlashWavRecorder = function(){
			var RECORDER_APP_ID = "recorderApp";
			var $level = $('.level .progress');
			var appWidth = 104;
			var appHeight = 39;
			var flashvars = {'upload_image': '../i/speak_save1.png'};
			var params = {vspace : "200px"};
			var attributes = {'id': RECORDER_APP_ID, 'name': RECORDER_APP_ID,style:'margin-top:-6000px;position:absolute;'};
			Swfobject.swfobject.embedSWF("../j/lib/flashwavrecorder/recorder.swf", "flashcontent", appWidth, appHeight, "11.0.0", "", flashvars, params, attributes);
			window.fwr_event_handler = function fwr_event_handler() {
				var name, $controls;
				switch (arguments[0]) {
					case "ready":
						FWRecorder.uploadFormId = "#uploadForm";
						FWRecorder.uploadFieldName = "content";
						FWRecorder.connect(RECORDER_APP_ID, 0);
						FWRecorder.recorderOriginalWidth = appWidth;
						FWRecorder.recorderOriginalHeight = appHeight;
						record_status="ready";
						break;

					case "no_microphone_found":
						$("#recordTimerP").hide();
						$("#recordTipP").show().find("span").html("请插入麦克风");
						$("#recorderApp").css({"margin-top": "-6000px"});
						record_status="no_microphone_found";
						break;
					case "microphone_connected":
						FWRecorder.isReady = true;
						break;

					case "microphone_user_request":
						FWRecorder.showPermissionWindow();
						//$("#recorderApp").css({"margin-top": "-220px", "margin-left": "-240px"});
						if(questionTypeTag==3){
							$("#recorderApp").css({"margin-top": "230px", "margin-left": "250px"});
						}else{
							$("#recorderApp").css({"margin-top": "200px", "margin-left": "260px"});
						}

						break;

					case "permission_panel_closed":
						$("#recordTimerP").hide();
						$("#recordTipP").show().find("span").html("请再次点击开始录音");
						$("#recorderApp").css({"margin-top": "-6000px"});
						/*if(FWRecorder.isReady){
							xm.showTipMsg("startRecord","请点击开始录音","bottom",1500);
						}else{
							xm.showTipMsg("startRecord","请刷新页面后点击允许","bottom",1500);
						}*/
						FWRecorder.defaultSize();
						break;

					case "recording":
						record_status="recording";
						$("#recordTimerP").show();
						$("#recordTipP").hide();
						startRecordTimer(); //开始录音，启动计时
						record_ing=true;
						FWRecorder.hide();
						FWRecorder.observeLevel();
						break;

					case "recording_stopped":
						record_status="recording_stopped";
						record_ing=false;
						console.log("stop");

						console.log(arguments);
						clearRecordTimer();
						var duration = arguments[2]; //录音时长
						record_length=Math.ceil(duration);
						$("#recordTotalLength").html(format_time(record_length));
						if(token && token!="xiaoma" && record_length>=30){
								//$("#recorderApp").css({"margin-top": "0px", "margin-left": "-124px"});
								//$("#recorderApp").css({"margin-top": "378px", "margin-left": "397px"});
								if(questionTypeTag==3){
									$("#recorderApp").css({"margin-top": "470px", "margin-left": "387px"});
								}else{
									$("#recorderApp").css({"margin-top": "430px", "margin-left": "387px"});
								}
								$("#auth_token").val(token);
						}else{
							$("#recorderApp").css({"margin-top": "-6000px"});
						}
						$("#audio_length").val(record_length);
						$("#question_id").val(questionId);
						FWRecorder.show();
						FWRecorder.stopObservingLevel();

						$level.css({height: 0});
						break;

					case "microphone_level":
						break;
					case "playing":
						record_status="playing";
						break;
					case "stopped":
						record_status="stopped";
						playEndRecord(); //录音播放结束操作
						break;

					case "save_pressed":
						FWRecorder.updateForm();
						break;

					case "saving":
						showLoading();
						stopSoundPlay();
						stopPlayRecord();
						window.setTimeout(function (){
							closeLoading();
							$("#recordTimerP").hide();
							$("#recordTipP").show().find("span").html("上传失败，请稍后再试");
							window.setTimeout(function (){
								$("#recordTimerP").show();
								$("#recordTipP").hide();
							},1500);
						},60*1000)
						name = arguments[1];
						console.info('saving started', name);
						$("#recordSaveStatus").html("提交中...");
						$("#recorderApp").css({"margin-top": "-6000px"});
						break;

					case "saved":
						closeLoading();
						name = arguments[1];
						var response = arguments[2];
						console.info('saving success', name, response);
						//提交成功后，跳转到结果页
						jjUintDetail(currentQuestion);


						break;

					case "save_failed":
						name = arguments[1];
						closeLoading();
						$("#recordTimerP").hide();
						$("#recordTipP").show().find("span").html("上传失败，请稍后再试");
						window.setTimeout(function (){
							$("#recordTimerP").show();
							$("#recordTipP").hide();
						},1500);
						var errorMessage = arguments[2];
						console.info('saving failed', name, errorMessage);
						break;

					case "save_progress":
						name = arguments[1];
						var bytesLoaded = arguments[2];
						var bytesTotal = arguments[3];
						console.info('saving progress', name, bytesLoaded, '/', bytesTotal);
						break;
				}
			};
	}
	var initEvent = function() {
		/*此功能暂时不上线，所以暂时注释机经口语导航*/
		/*$(document).on('click', '#side4', function(){
			$('.sidebar-ul').find('a.sidebarLight').removeClass('sidebarLight');
			$("#side3").addClass('sidebarLight');
			toDoRender();
		});
		$(document).on('click', '#side5', function(){
			toDoRender();
		});
		$(document).on('click', '#side6', function(){
			toDoRender();
		});*/
		/*此功能暂时不上线，所以暂时注释机经口语导航*/

		$(document).on('trigger_side3', '#side3', menuToggleListen)
		$(document).on('click', '#side3', menuToggleListen);
		$(document).on('click', '#side3_1', speak_jjForecast);
		$(document).on('click', '#side3_2', speak_papersExams);
		$(document).on('trigger_side3_3', '#side3_3', speak_correction)
		$(document).on('click', '#side3_3', speak_correction);

		$(document).on('click',".forecastTab",function (e){
			//$(".forecast_tabs li").removeClass("current");
			//$(this).parents("li").addClass("current");
			//console.log($(this).attr("data-groupsid"));
			changeListTab_forecast(e)
		});
		$(document).on('click',".wslTab",changeListTab); //切换选项卡


		$(document).on('click',".speakjjUnit",function (){
			var target= $(this).attr("data-target");

			if(target=="all" || target=="parentMenu" || target=="jjForecast"){
				speak_jjForecast();
			}else if(target=="jjPaperExams"){
				speak_papersExams();
			}else if(target=="correction"){
				speak_correction();
			}
		})
		$(document).on('click',".jijing-speak-div-js", function (e) {
			var question_id=$(e.target).attr("data-question_id");
			if(question_id){
				var data={question_id:question_id};
				jjUintDetail(data);
			}

		});

		$(document).on("click",".speakjj-rightItem",function (e){
			var question_id=$(e.target).attr("data-question_id");
			if(question_id){
				var data={question_id:question_id};
				$("#h5Player").get(0).pause();
				jjUintDetail(data,"change");
			}
		})

		$(document).on("click",".soundPlay",function (){
			playSoundPlay(this);
			/*if(!record_ing){
				if(record_length>0){
					stopPlayRecord(); //停止录音播放
				}
				if($(this).attr("data-currentAudio")=="true"){
					if($(this).attr("data-playing")=="true"){

						$("#h5Player").get(0).pause();
						$(this).attr("data-playing",false);
						$(this).attr("src","../../i/dic-pic.png")
					}else{
						$("#h5Player").get(0).play();
						$(this).attr("data-playing",true);
						$(this).attr("src","../../i/i1.gif")
					}
				}else{

					$(".soundPlay").attr("src","../../i/dic-pic.png").attr("data-playing",false);
					$(".soundPlay").attr("src","../../i/dic-pic.png").removeAttr("data-currentAudio");
					$(this).attr("src","../../i/i1.gif").attr("data-playing",true);
					$(this).attr("data-currentAudio",true);
					$("#h5Player").get(0).src=$(this).attr("data-audioUrl");
					$("#h5Player").get(0).loop=false;
					$("#h5Player").get(0).play();
				}
			}*/

		});
		$(document).on('click', '.audioPlay', function(e) {
			var data = {
				'obj': $(e.target),
				'source': $(e.target).attr('data-source')
			}
			audioPlay(data)
		});
		$(document).on("click","#startRecord",startRecord);
		$(document).on("click","#recording",stopRecord);
		$(document).on("click","#playRecord",playRecord);
		$(document).on("click","#playingRecord",stopPlayRecord);
		$(document).on("click","#speak-reRecord",reRecord);
		$(document).on("click","#speak-saveRecord",saveRecord);
		$(document).on("click","#doAgain",jjUintDetail_ReDo);
		$(document).on("click",".tabItem",changeTab);
		$(document).on("click","#showl",showLoading);
		$(document).on("click","#closel",closeLoading);

		$(document).on('click',"#jijingSampleTag",function (){
			$("#jijingSampleDiv").slideToggle();
		});
		$(document).off('click','#btnNextQuestion2').on('click','#btnNextQuestion2',function(){
			var next_status = $(this).attr("next_status"),
				questionId = $(this).attr("data-question_id");
			//0:无做题记录，1：有做题记录，2：最后一题
			if(next_status==2){
				alert('已经是最后一题了！');
				return;
			}
			if(questionId){
				var data={question_id:questionId};
				jjUintDetail(data);
			}
		});

	}
	/**
	 * 播放音频播放器内容
	 */
	var playSoundPlay = function (target){
		if(!record_ing){
			if(record_length>0){
				stopPlayRecord(); //停止录音播放
			}
			if($("#audioAudio").length>0){
				$("#audioAudio").get(0).pause(); //暂停答案范例播放
			}
			//stopPlaySavedRecord(); //暂停已保存未提交批改音频播放
			//stopTeacherCorrectionAudio();//暂停老师批改答案音频播放
			var isRight=$(target).hasClass("soundPlayRight") ;
			if($(target).attr("data-currentAudio")=="true"){
				if($(target).attr("data-playing")=="true"){

					$("#h5Player").get(0).pause();
					$(target).attr("data-playing",false);
					if(isRight){
						$(target).attr("src","../../i/dic-pic3.png")
					}else{
						$(target).attr("src","../../i/dic-pic.png");
					}
				}else{
					$("#h5Player").get(0).play();
					$(target).attr("data-playing",true);
					if(isRight) {
						$(target).attr("src", "../../i/g2.gif");
					}else{
						$(target).attr("src", "../../i/i1.gif")
					}
				}
			}else{

				$(".soundPlay").attr({"src":"../../i/dic-pic.png","data-playing":false}).removeAttr("data-currentAudio");
				$(".soundPlayRight").attr("src","../../i/dic-pic3.png");
				if(isRight) {
					$(target).attr("src", "../../i/g2.gif").attr("data-playing",true);
				}else{
					$(target).attr("src", "../../i/i1.gif").attr("data-playing",true);
				}
				//$(this).attr("src","../../i/i1.gif").attr("data-playing",true);
				$(target).attr("data-currentAudio",true);
				$("#h5Player").get(0).src=$(target).attr("data-audioUrl");
				$("#h5Player").get(0).loop=false;
				$("#h5Player").get(0).play();
			}
		}
	};
	/**
	 * 停止音频播放器
	 */
	var stopSoundPlay = function(status){
		$(".soundPlay").attr("src","../../i/dic-pic.png").attr("data-playing",false);
		$(".soundPlayRight").attr("src","../../i/dic-pic3.png");
		if(status!="end"){
			if($("#h5Player").length>0){
				$("#h5Player").get(0).pause();
			}
			//逻辑控制暂停参考答案播放
			if(status!="sampleAnswer"){
				if($("#audioAudio").length>0){
					$("#audioAudio").get(0).pause();
				}
			}
		}
	}
	/**
	 * 是否安装了flash
	 */
	var flashChecker = function () {
		var hasFlash = 0;
		var flashVersion = 0;//flash版本
		try{
			var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
			if (swf) {
				hasFlash = 1;
				var VSwf = swf.GetVariable("$version");
				flashVersion = parseInt(VSwf.split(" ")[1].split(",")[0]);
			}
		}
		catch(e){
			if (navigator.plugins && navigator.plugins.length > 0) {
				var swf = navigator.plugins["Shockwave Flash"];
				if (swf) {
					hasFlash = 1;
					var words = swf.description.split(" ");
					for (var i = 0; i < words.length; ++i) {
						if (isNaN(parseInt(words[i]))) continue;
						flashVersion = parseInt(words[i]);
					}
				}
			}
		}

		return {isInstall: hasFlash, version: flashVersion};
	};
	/**
	 * 初始化录音按钮状态
	 */
	var initRecordBtn = function (status) {
		var statusMapping={"default":"startRecord","record":"recording","play":"playingRecord","stop":"playRecord"}
		$(".repeat-pic10").hide();
		$("#"+statusMapping[status]).show();
		if(status=="default"){
			$("#speak-reRecord").attr("disabled","true");
			$("#speak-saveRecord").attr("disabled","true");
		}
	}
	/**
	 * 开始录音
	 */
	var startRecord =function (){
		$("#recordTotalLength").html(format_time(record_totalLength));
		stopSoundPlay()
		var checkFlash=flashChecker();
		if(checkFlash.isInstall) {
			//开始录音，检测麦克风
			try {
				FWRecorder.record('content', questionId + '-' + new Date().getTime() + '.wav');
			}catch(e){

			}
			if (FWRecorder.isMicrophoneAccessible()) {
				initRecordBtn("record");
			} else {
				//$("#recorderApp").attr("style","float: left;margin-top:-100px;margin-left:-250px;");
				//$("#recorderApp").css({"margin-top": "-6000px"});

			}
		}else{
			alert("请安装flash");
		}
	};
	/**
	 * 停止录音
	 */
	var stopRecord = function (){
		/*if(record_length<30){
			$("#recordTipP").show().find("span").html("录音时长需大于30秒");
			$("#recordTimerP").hide();
			window.setTimeout(function (){
				$("#recordTipP").hide()
				$("#recordTimerP").show();
			},1000);
			return;
		}*/
		if(FWRecorder &&  record_status=="recording"){
			try{
				FWRecorder.stopRecording('content');
			}catch(e){};
			initRecordBtn("stop");
			clearRecordTimer();
			$("#recordTotalLength").html(format_time(record_length));
			$("#recordTimer").html("00:00");
			$("#speak-reRecord").removeAttr("disabled");
			$("#speak-saveRecord").removeAttr("disabled");
		}
	}
	/**
	 * 播放录音
	 */
	var playRecord = function (){
		if(FWRecorder){
			stopSoundPlay();
			FWRecorder.playBack("content");
			playRecordTimer();
			initRecordBtn("play");
		}
	}
	/**
	 * 暂停录音播放
	 */
	var stopPlayRecord = function (){
		if(FWRecorder && record_status=="playing"){
			FWRecorder.stopPlayBack("content");
			window.clearInterval(record_timer);
			//$("#recordTotalLength").html("00:"+ (record_length<10 ? "0"+record_length+"" : record_length)+"");
			$("#recordTotalLength").html(format_time(record_length));
			$("#recordTimer").html("00:00");

			initRecordBtn("stop");
		}
	}
	/**
	 * 播放录音结束
	 */
	var playEndRecord = function(){
		clearRecordTimer()
		initRecordBtn("stop");
		$("#recordTimer").html("00:00");
	}
	/**
	 * 重新录制
	 */
	var reRecord = function (){
			stopSoundPlay();
			if(FWRecorder){
				if(record_status=="playing"){
					FWRecorder.stopPlayBack("content");
				}
				record_length=0; //重置录音长度
				$("#recordTimer").html("00:00");
				$("#recordTotalLength").html(format_time(record_totalLength));
				$("#recordTimerP").show();
				$("#recordTipP").hide();
				$("#recorderApp").css({"margin-top": "-6000px"});
				initRecordBtn("default");
			}
		}
	/**
	 * 提交录音
	 */
	var saveRecord = function (){
		if(!token || token=="xiaoma"){
			$('#dialogLogin').modal();
			$('#dialogLogin').on('hidden.bs.modal', function (e) {
				token=BaseCookie.getToken();
				$("#auth_token").val(token);
				if(record_length<30){
					$("#recordTipP").show().find("span").html("录音需大于30秒才能提交");
					$("#recordTimerP").hide();
					window.setTimeout(function (){
						$("#recordTipP").hide()
						$("#recordTimerP").show();
					},1000);
				}else{
					//$("#recorderApp").css({"margin-top": "0px", "margin-left": "-124px"});
					//$("#recorderApp").css({"margin-top": "378px", "margin-left": "397px"});
					if(questionTypeTag==3){
						$("#recorderApp").css({"margin-top": "470px", "margin-left": "387px"});
					}else{
						$("#recorderApp").css({"margin-top": "430px", "margin-left": "387px"});
					}
				}
			});
		}else if(record_length<30){
			$("#recordTipP").show().find("span").html("录音需大于30秒才能提交");
			$("#recordTimerP").hide();
			window.setTimeout(function (){
				$("#recordTipP").hide()
				$("#recordTimerP").show();
			},1000);
		}
	}
	/**
	 * 录音计时
	 */
	var startRecordTimer = function (){
		record_length=0;
		window.clearInterval(record_timer);
		var fn=function(){
			record_length++;
			$("#recordTimer").html(format_time(record_length));
			if(record_length>=record_totalLength){
				stopRecord();
				window.clearInterval(record_timer);
			}
		}
		record_timer=window.setInterval(fn,1000);
	};
	/**
	 * 播放录音计时
	 */
	var playRecordTimer = function (){
		window.clearInterval(record_timer);
		if(record_length){
			var playRecord_length=0;
			//$("#recordTotalLength").html("00:"+ (record_length<10 ? "0"+record_length+"" : record_length)+"");
			$("#recordTotalLength").html(format_time(record_length));
			$("#recordTimer").html("00:00");
			var fn=function(){
				playRecord_length++;
				//$("#recordTimer").html("00:"+ (playRecord_length<10 ? "0"+playRecord_length+"" : playRecord_length)+"");
				$("#recordTimer").html(format_time(playRecord_length));
				if(playRecord_length>=record_length){
					$("#recordTimer").html("00:00");
					window.clearInterval(record_timer);
				}
			}
			record_timer=window.setInterval(fn,1000);
		}
	};
	/**
	 * 清除录音计时
	 */
	var clearRecordTimer =function(){
		window.clearInterval(record_timer);
		//$("#recordTimerP").hide()
		//$("#recordTipP").show().find("span").html("00:"+(record_length<10 ? "0"+record_length+"" : record_length)+"");
	}

	var reset = function (){
		record_length=0;
		if(FWRecorder){
			try{
				FWRecorder.stopRecording('content');
			}catch(e){}
			initRecordBtn("stop");
			clearRecordTimer();
			$("#recordTimer").html("00:00");
			$("#recordTotalLength").html(format_time(record_totalLength));
			$("#speak-reRecord").removeAttr("disabled");
			$("#speak-saveRecord").removeAttr("disabled");
		}
	}
	/**
	 * 格式化时长
	 */
	var format_time = function (time){
		if(time){
			var checkTime = function(i) {
				if (i < 10) {
					i = "0" + i;
				}
				return i;
			}
			var mm=checkTime(parseInt(time/60,10));
			var ss=checkTime(parseInt(time%60,10));
			return mm+":"+ss;
		}
		return "00:00";
	}
	/**
	 * 机经口语子菜单展示
	 */
	var menuToggleListen = function() {
		$('.sidebar-ul').find('a.sidebarLight').removeClass('sidebarLight');
		$('.sidebar-ul').find('li.sidebarLight').removeClass('sidebarLight');
		$("#side3").parent().siblings().find(".sidebarLight").removeClass('sidebarLight');
		$("#speak_menu_div").toggle();
		if ($('#speak_menu_div').css('display') == "none") {
			$("#speakImg").attr("src", "../../i/side-ang1.png");
		} else {
			$("#speakImg").attr("src", "../../i/side-ang.png");
		}
		$("#side3_1").click(); //默认定位机经预测
	}

	/**
	 * 机经口语题目详情
	 * @param data
	 */
	var jjUintDetail = function (data,type){
			reset();
			if(data && data.question_id){
				var _success = function(json) {
					currentQuestion = json;
					questionId = json.question_id; //全局变量 上传音频时使用
					if(questionTypeTag==3){
						//做数据适配 统一模板
						currentQuestion.answers=currentQuestion.question_answers || currentQuestion.answer_messages;
						if(!currentQuestion.question_content){
							currentQuestion.question_content=currentQuestion.content;
						}
						currentQuestion.sample_content=currentQuestion.audio_url;
					}

					if(type=="change") {
						if (currentQuestion && currentQuestion.answers.length <= 0) {
							jjUintDetail_UNDone();
						} else {
							jjUintDetail_Done();
						}
					}else{
						//题号面板
						var questionsNum = [];
						var renderData = {};
						//renderData.question = json;
						//renderData.uploadUrl = URL.baseURL5 + "jijing_answers/web";
						renderData.questions = questions;
						renderData.questionTypeTag=questionTypeTag;
						var param1 = {
							"wrap": $('#content'),
							"tmplName": TMPL.t3,
							"tmplData": renderData,
							"afterRender": function () {
								if (currentQuestion && currentQuestion.answers.length <= 0) {
									jjUintDetail_UNDone();
								} else {
									jjUintDetail_Done();
								}

							}
						}
						renderTemplate(param1)
					}
				}
				var detailUrl=URL.baseURL9 + 'jijing_questions/web_question_message';
				var detailParam={question_id: data.question_id, question_type:1}
				if(questionTypeTag==3){
					detailUrl=URL.baseURL9 + 'tpo_speaking_correction_answers/exercise';
					detailParam={question_id: data.question_id,from:1}
				}
				$.ajax({
					url: detailUrl,
					data:detailParam ,
					type: 'get',
					headers: {
						"Authorization": token
					},
					success: _success
				});
				/*$.ajax({
					url: URL.baseURL9 + 'jijing_questions/web_question_message',
					data: {
						question_id: data.question_id,
						question_type:1
					},
					type: 'get',
					headers: {
						"Authorization": token
					},
					success: _success
				});*/
			}

		}
	/**
	 * 机经口语 未做过
	 */
	var jjUintDetail_UNDone = function (){
		if(currentQuestion &&currentQuestion.answers.length<=0){
			var renderData={};
			renderData.question=currentQuestion;
			renderData.uploadUrl=uploadUrl;
			renderData.group_title=group_title;
			//if(questionTypeTag==1){
			//	var currentForecastGroupObj=getCurrentPaperExamsYearGroup(currentForecastGroupId);
			//	if(currentForecastGroupObj){
			//		renderData.currentForecastGroupObj=currentForecastGroupObj;
			//		renderData.group_title=currentForecastGroupObj.group_title;
			//	}
			//} else
			if(questionTypeTag==2){
				var currentPaperExamsYearObj=getCurrentPaperExamsYearGroup(currentPaperExamsGroupID);
				if(currentPaperExamsYearObj){
					renderData.paperExamsYearObj=currentPaperExamsYearObj;
					renderData.group_title=currentPaperExamsYearObj.group_title;
				}
			}else if(questionTypeTag==3){
				renderData.uploadUrl=correction_uploadUrl;
				renderData.group_title="综合口语";
			}
			var param = {
				"wrap": $('#leftDiv'),
				"tmplName": questionTypeTag==3 ? TMPL.t7:TMPL.t4,
				"tmplData": renderData,
				"afterRender": function (){
					initFlashWavRecorder();
					initRecordBtn("default");
					$("#side").hide(); //隐藏左侧面板
					$("#h5Player").on("ended", function () {
						stopSoundPlay("end");
					})
					$("#audioAudio").on('play',function(){
						if(record_ing){
							this.pause();
						}
						stopSoundPlay("sampleAnswer");
						stopPlayRecord();
					})
				}
			}
			renderTemplate(param);
		}
	}

	/**
	 * 机经口语 已做过
	 */
	var jjUintDetail_Done = function (){
		if(currentQuestion &&currentQuestion.answers && currentQuestion.answers.length>0){
			var renderData={};
			renderData.question=currentQuestion;
			renderData.group_title=group_title;
			//if(questionTypeTag==1){
			//	var currentForecastGroupObj=getCurrentPaperExamsYearGroup(currentForecastGroupId);
			//	if(currentForecastGroupObj){
			//		renderData.currentForecastGroupObj=currentForecastGroupObj;
			//		renderData.group_title=currentForecastGroupObj.group_title;
			//	}
			//}else
			if(questionTypeTag==2){
				var currentPaperExamsYearObj=getCurrentPaperExamsYearGroup(currentPaperExamsGroupID);
				if(currentPaperExamsYearObj){
					renderData.paperExamsYearObj=currentPaperExamsYearObj;
					renderData.group_title=currentPaperExamsYearObj.group_title;
				}
			}else if(questionTypeTag==3){
				renderData.group_title="综合口语";
			}
			renderData.userHeadPic=$("#person").attr("src") || "../../i/tpo-pic7.png";
			var param = {
				"wrap": $('#leftDiv'),
				"tmplName": questionTypeTag==3 ? TMPL.t8:TMPL.t5,
				"tmplData": renderData,
				"afterRender": function (){
					$("#side").hide(); //隐藏左侧面板
					$("#h5Player").on("ended", function () {
						stopSoundPlay("end");
					});
					$("#audioAudio").on('play',function(){
						if(record_ing){
							this.pause();
						}
						stopSoundPlay("sampleAnswer");
						stopPlayRecord();
					})
				}
			}
			renderTemplate(param);
		}
	}

	/**
	 * 机经口语 重做
	 */
	var jjUintDetail_ReDo = function (){
		stopSoundPlay();
		if(currentQuestion){
			var renderData={};
			renderData.question=currentQuestion;
			renderData.uploadUrl=uploadUrl;
			if(questionTypeTag==3){
				renderData.uploadUrl=correction_uploadUrl;
				renderData.group_title="综合口语";
			}
			var param = {
				"wrap": $('#leftDiv'),
				"tmplName": questionTypeTag==3 ? TMPL.t7:TMPL.t4,
				"tmplData": renderData,
				"afterRender": function (){
					initFlashWavRecorder();
					initRecordBtn("default");
					$("#side").hide(); //隐藏左侧面板
					$("#h5Player").on("ended", function () {
						stopSoundPlay("end");
					});
					$("#audioAudio").on('play',function(){
						if(record_ing){
							this.pause();
						}
						stopSoundPlay("sampleAnswer");
						stopPlayRecord();
					})
				}
			}
			renderTemplate(param);
		}
	}

	/**
	 * 机经口语题目详情-下一题
	 * @param data
	 */
	var jjForecastUintNextDetail = function (data){
		reset();
		if(data && data.question_id){
			var _success = function(json) {

				//题号面板
				var questionsNum = [];
				var renderData = {};
				renderData.question=json;
				renderData.uploadUrl=URL.baseURL5+"jijing_answers/web";
				renderData.questions=questions;
				var param1 = {
					"wrap": $('#content'),
					"tmplName": TMPL.t3,
					"tmplData": renderData,
					"afterRender": function (){
						questionId=renderData.question.question_id;
						initFlashWavRecorder();
						initRecordBtn("default");
						$("#side").hide(); //隐藏左侧面板
						$("#h5Player").on("ended",function(){
							stopSoundPlay("end");
						})
					}
				}
				renderTemplate(param1)
			}
			$.ajax({
				url: URL.baseURL9 + 'jijing_questions/web_question_message',
				data: {
					question_id: data.question_id,
					question_type:1
				},
				type: 'get',
				headers: {
					"Authorization": token
				},
				success: _success
			});
		}

	}

	//机经预测
	var speak_jjForecast = function() {
		record_totalLength=45;
		BaseCookie.get()
		token = BaseCookie.getToken()
		if ("" == token || null == token) {
			token = tokenTmp
		}
		//清除缓存数据
		currentForecastGroupId=null;
		//左侧导航active
		$('.sidebar-ul').find('a.sidebarLight').removeClass('sidebarLight');
		$('.sidebar-ul').find('li.sidebarLight').removeClass('sidebarLight');
		$("#side3_1").addClass('sidebarLight');
		$("#side3_1").parent().siblings().removeClass('sidebarLight');
		$("#speak_menu_div li").removeClass('sidebarLight');

		var _success = function(json) {
			questionTypeTag=1;     //机经预测类型标记
			questions = json.jijing_questions; //组信息初始化
			group_title=json.group_title;
			var renderData={};
			renderData.questions=questions;
			renderData.group_title=group_title;
			renderData.tabs=json.group_messages;
			var param = {
				"tmplName": TMPL.t1,
				"tmplData": renderData,
				"afterRender": function(){
					$("#side").show();
				}
			}
			renderTemplate(param)
		}
		$.ajax({
			url: URL.baseURL9 + 'jijing_questions/web_yuce',
			data: {
				question_type: 1
			},
			type: 'get',
			headers: {
				"Authorization": token
			},
			success: _success
		})
	}
	//综合口语练习列表
	var speak_correction = function() {
		BaseCookie.get()
		token = BaseCookie.getToken()
		if ("" == token || null == token) {
			token = tokenTmp
		}
		//左侧导航active
		$('.sidebar-ul').find('a.sidebarLight').removeClass('sidebarLight');
		$('.sidebar-ul').find('li.sidebarLight').removeClass('sidebarLight');
		$("#side3_3").addClass('sidebarLight');
		$("#side3_3").parent().siblings().removeClass('sidebarLight');
		$("#speak_menu_div li").removeClass('sidebarLight');

		var _success = function(json) {
			var renderData={};
			questionTypeTag=3;     //综合口语练习类型标记
			questions = json.tpo_speaking_questions; //组信息初始化
			renderData.questions=questions;
			renderData.group_title="综合口语";
			var param = {
				"tmplName": TMPL.t6,
				"tmplData": renderData,
				"afterRender": function (){
					$("#side").show();
					record_totalLength=60;
				}
			}
			renderTemplate(param)
		}
		$.ajax({
			url: URL.baseURL9 + 'tpo_speaking_correction_questions/web_exercises',
			data: {
				from:1
			},
			type: 'get',
			headers: {
				"Authorization": token
			},
			success: _success
		})
	}
	/**
	 * 历年真题
	 */
	var speak_papersExams = function() {
		record_totalLength=45;
		BaseCookie.get();
		token = BaseCookie.getToken()
		if ("" == token || null == token) {
			token = tokenTmp
		}

		//清除缓存数据
		currentPaperExamsGroupID=null;

		//左侧导航active
		$('.sidebar-ul').find('a.sidebarLight').removeClass('sidebarLight');
		$('.sidebar-ul').find('li.sidebarLight').removeClass('sidebarLight');
		$("#side3_2").addClass('sidebarLight');
		$("#side3_2").parent().siblings().removeClass('sidebarLight');
		$("#speak_menu_div li").removeClass('sidebarLight');

		var _success = function(json) {
			questionTypeTag=2;     //历年真题类型标记
			paperExamsGroup=json.group_messages; //缓存历年真题年份组
			var data={};
			data.content=json.jijing_questions;
			data.tabs=json.group_messages;
			var param = {
				"tmplName": TMPL.t2,
				"tmplData": data,
				"afterRender": function(){
					$("#side").show();
				}
			}
			renderTemplate(param)
		}
		$.ajax({
			url: URL.baseURL9 + 'jijing_questions/web_zhenti',
			data: {
				question_type: 1
			},
			type: 'get',
			headers: {
				"Authorization": token
			},
			success: _success
		})
	}

	/**
	 * 获取当前历年真题 年份组信息
	 * @param groupID
	 */
	var getCurrentPaperExamsYearGroup = function (groupID){
		if(groupID){
			var obj=null;
			for(var i=0;i<paperExamsGroup.length;i++){
				var item=paperExamsGroup[i];
				if(item.group_id==groupID){
					obj=item;
					break;
				}
			}
			return obj
		}else{
			return paperExamsGroup[0];
		}
	}

	/**
	 *切换选项卡
	 * @param dom
	 */
	var changeListTab_forecast = function (e){
		var group_id=$(e.target).attr("data-groupsid");
		if(group_id){
			currentForecastGroupId=group_id;
			var _success = function(json) {
				var data={};
				data.questions=json.jijing_questions;
				data.tabs=json.group_messages;
				data.activeTab=group_id;
				data.group_title=group_title=json.group_title;
				var param = {
					"tmplName": TMPL.t1,
					"tmplData": data,
					"afterRender":function(){
						//$(".forecast_tabs li").removeClass("current");
						//$(e.target).parent().addClass("current");

						//$(this).parents("li").addClass("current");
					}
				}
				renderTemplate(param)
			}
			$.ajax({
				url: URL.baseURL9 + 'jijing_questions/web_yuce',
				data: {
					question_type: 1,
					group_id:group_id
				},
				type: 'get',
				headers: {
					"Authorization": token
				},
				success: _success
			})
		}
	}

	/**
	 *切换选项卡
	 * @param dom
	 */
	var changeListTab = function (e){
		var group_id=$(e.target).attr("data-groupsid");
		if(group_id){
			currentPaperExamsGroupID=group_id;
			var _success = function(json) {
				var data={};
				data.content=json.jijing_questions;
				data.tabs=json.group_messages;
				data.activeTab=group_id;
				var param = {
					"tmplName": TMPL.t2,
					"tmplData": data,
					"afterRender":function(){
						$(e.target).parent().addClass("active");
					}
				}
				renderTemplate(param)
			}
			$.ajax({
				url: URL.baseURL9 + 'jijing_questions/web_zhenti',
				data: {
					question_type: 1,
					group_id:group_id
				},
				type: 'get',
				headers: {
					"Authorization": token
				},
				success: _success
			})
		}
	}
	/**
	 *切换选项卡
	 * @param dom
	 */
	var changeTab = function (e){
		var target= e.target;
		var targetPanel=$(e.target).attr("data-target");
		if(targetPanel){
			if(targetPanel=="Integraluse"){
					if(FWRecorder){
						if(record_ing){
							stopRecord();
						}else{
							stopPlayRecord();
						}
					}
					stopSoundPlay();
					if(token && token!="xiaoma" && record_length>=30){
						$("#recorderApp").css({"margin-top": "-6000px"});
					}
			}else{
				if(token && token!="xiaoma" && record_length>=30){
					//$("#recorderApp").css({"margin-top": "378px", "margin-left": "397px"});
					if(questionTypeTag==3){
						$("#recorderApp").css({"margin-top": "470px", "margin-left": "387px"});
					}else{
						$("#recorderApp").css({"margin-top": "430px", "margin-left": "387px"});
					}
				}
			}
			/*window.setTimeout(function (){},300);*/
				$(".tab-pane").removeClass("active")
				$("#"+targetPanel).addClass("active");


		}
	}
	//音频模态框播放 视频播放
	var audioPlay = function(param) {
		if(FWRecorder){
			if(record_ing){
				stopRecord();
			}else{
				stopPlayRecord();
			}
		}
		stopSoundPlay();
		if(token && token!="xiaoma" && record_length>=30){
			$("#recorderApp").css({"margin-top": "-6000px"});
		}

		$('#audioPlayModal').modal({
			backdrop: 'static'
		})
		var source = param.source;
		var content = '<script src="http://p.bokecc.com/player?vid=' + source + '&siteid=B86E9AC935D39444&autoStart=true&width=720&height=400&playerid=3B89CC3CB774B9A8&playertype=1" type="text/javascript"></script>';
		$("#audioPlayDiv").html(content)
	}

	//弹出隐藏层
	var showLoading = function (show_div,bg_div){
		show_div="MyDiv";
		bg_div ="fade";
		document.getElementById(show_div).style.display='block';
		document.getElementById(bg_div).style.display='block' ;
		var bgdiv = document.getElementById(bg_div);
		bgdiv.style.width = document.body.scrollWidth;
		$("#"+bg_div).height($(document).height());
	};
	//关闭弹出层
	var closeLoading = function (show_div,bg_div)
	{
		show_div="MyDiv";
		bg_div = "fade";
		document.getElementById(show_div).style.display='none';
		document.getElementById(bg_div).style.display='none';
	};
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
	}

	var toDoRender = function() {
		var param = {
			"tmplName": 'app/tmpl_todo',
			"tmplData": '',
			"afterRender": ''
		};
		renderTemplate(param)
	};

	return {
		init: init
	}
})