'use strict'

define(['common/uniqueAjax', 'common/render', 'xml2json', 'app/baseURL', 'baseCookie', 'lib/store', 'lib/flashwavrecorder/recorder', 'lib/flashwavrecorder/swfobject','app/baseFinal','lib/pagebar/jquery.paginate'], function(uniqueAjax, Render, xml2json, URL, BaseCookie,Store,Recorder, Swfobject,BaseFinal) {
	var _conf,
		$wrap,
		TMPL = {
			t1: 'app/chongci/tmpl_speakjj_forecast_list', //口语机经预测列表
			t2: 'app/chongci/tmpl_speakjj_paperExams_list', //历年题库列表
			t3: 'app/chongci/tmpl_speakjj_detail',//口语做题页面
			t4: 'app/chongci/tmpl_speakjj_detail_record',//口语机经详细-未做时初始化录音控件
			t5: 'app/chongci/tmpl_speakjj_detail_myanswer',//口语机经详细-已有答案时初始化我的答案
			t6: 'app/chongci/tmpl_speakjj_correction_list', // 综合口语批改列表
			t7: 'app/chongci/tmpl_speakjj_correction_record', // 综合口语批改录音
			t8: 'app/chongci/tmpl_speakjj_correction_myanswer', // 综合口语批改我的答案
			t9: 'app/chongci/tmpl_speakjj_detail_myanswer_notcommit',//口语机经详细-提交失败保存录音
			t10: 'app/chongci/tmpl_speakjj_correction_myanswer_notcommit',//综合口语批改详细-提交失败保存录音
			t11: 'app/chongci/tmpl_speakjj_detail_myanswer_detail',//口语机经详细-已有答案时初始化我的答案
			t12: 'app/chongci/tmpl_speakjj_correction_myanswer_detail', // 综合口语批改我的答案
			t13: 'app/chongci/tmpl_speakjj_detail_myanswer_status', // 口语机经答案提交状态展示
			t14: 'app/chongci/tmpl_speakjj_correction_myanswer_status', // 综合口答案提交状态展示
			t15:'app/chongci/tmpl_speakjj_detail_myanswer_teacherlist' //口语机经 综合口语 老师列表翻页模板

		};
	var token,
		tokenTmp = "xiaoma";
	var groups = [];
	var questions=[];
	var questionId=null;
	var questionTypeTag;  //题目类型：机经口语预测 或者 历年真题
	var currentPaperExamsGroupID; //历年真题所属年份对象
	var currentForecastGroupId;//机经预测所属预测日期
	var paperExamsGroup=[]; //历年真题年份组对象
	var currentQuestion=null;
	var record_totalLength=45; //录音最大长度
	var record_length=0;
	var record_timer;
	var record_ing=false;
	var record_status; //录音器状态
	var uploadUrl = URL.baseURL5 + "jijing_answers/web_mark";
	var correction_uploadUrl= URL.baseURL5 + "tpo_speaking_correction_answers/web";
	var group_title="" //组标题
	var answerTypeCode ={UNDONE:0,SAVED:1,WAIT_SEIZE:2,WAIT_CHOOSE_TEACHER:3,WAIT_CORRECT:4,FINESHED:5}

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
			var appWidth = 131;
			var appHeight = 39;
			var flashvars = {'upload_image': '../i/speak_corrent.png'};
			var params = {vspace : "200px",wmode:"transparent"};
			var attributes = {'id': RECORDER_APP_ID, 'name': RECORDER_APP_ID,style:'margin-top:-6000px;position:absolute;z-index:1100;'};
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
						//$("#recorderApp").css({"margin-top": "150px", "margin-left": "280px"});
						if(questionTypeTag==3){
							$("#recorderApp").css({"margin-top": "230px", "margin-left": "260px"});
						}else{
							$("#recorderApp").css({"margin-top": "100px", "margin-left": "270px"});
						}
						break;

					case "permission_panel_closed":
						$("#recordTimerP").hide();
						$("#recordTipP").show().find("span").html("请再次点击开始录音");
						$("#recorderApp").css({"margin-top": "-6000px"});
						FWRecorder.defaultSize();
						break;

					case "recording":
						record_status="recording";
						$("#recordTotalLength").html(format_time(record_totalLength));
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

						clearRecordTimer();
						var duration = arguments[2]; //录音时长
						record_length=Math.ceil(duration);
						//$("#recorderApp").css({"margin-top": "-6000px"});
						if(token && token!="xiaoma" && record_length>=30){
								//$("#recorderApp").css({"margin-top": "0px", "margin-left": "-124px"});
								if(questionTypeTag==3){
									$("#recorderApp").css({"margin-top": "470px", "margin-left": "386px"});
								}else{
									$("#recorderApp").css({"margin-top": "328px", "margin-left": "396px"});
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
						hideScoreLack();
						stopSoundPlay();
						stopPlayRecord();
						window.setTimeout(function (){
							showLoading();
						},500);
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
						savedResponse($.parseJSON(response));
						console.info('saving success', name, response);
						//提交成功后，跳转到结果页



						break;

					case "save_failed":
						name = arguments[1];

						$("#recordTimerP").hide();
						$("#recordTipP").show().find("span").html("上传失败，请稍后再试");
						window.setTimeout(function (){
							$("#recordTimerP").show();
							$("#recordTipP").hide();
						},2500);
						window.setTimeout(function (){
							closeLoading();
						},800);
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
		$(document).on('trigger_side4_3', '#side8', menuToggleListenOnly);//综合写作定位
		$(document).on('trigger_side4_2', '#side8', menuToggleListenLiNian);//综合写作定位
		$(document).on('click', '#side4', menuToggleListen);
		$(document).on('click', '#side5', speak_jjForecast);
		$(document).on('click', '#side6', speak_papersExams);
		$(document).on('trigger_side8', '#side8', speak_correction)
		$(document).on('click', '#side8', speak_correction);

		$(document).on('click',".speak_wslTab",changeListTab); //切换选项卡

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
		$(document).on('click',".jj-speak-list-js", function (e) {
			var question_id=$(e.target).attr("data-question_id");
			//var question_type=$(e.target).attr("data-type");
			if(question_id){
				var data={question_id:question_id};
				jjUintDetail(data);
			}

		});
		$(document).on('click',".forecastTab",function (e){
			changeListTab_forecast(e)
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
		});

		$(document).on('click', '.audioPlay', function(e) {
			var data = {
				'obj': $(e.target),
				'source': $(e.target).attr('data-source')
			}
			audioPlay(data)
		});

		$(document).on('click',"#jijingSampleTag",function (){
			$("#speak_jijingSampleDiv").slideToggle();
		});

		$(document).on("click",".speakjj-correction-done",function(){
			var answer_id=$(this).attr("data-answer_id");
			var answer_type=$(this).attr("data-answer_type");
			var teacher_id=$(this).attr("data-teacher_id") || undefined;
			if(answer_id){
				if(answer_type==answerTypeCode.SAVED){ //已保存
					jjUintDetail(currentQuestion,null,"notCommit");
				}else if(answer_type==answerTypeCode.WAIT_CHOOSE_TEACHER){ //等待选择老师
					jjAnswerDetail_chooseTeacher(answer_id,answer_type,1);
				}else if(answer_type==answerTypeCode.FINESHED) { //已批改
					jjAnswerDetail(answer_id,answer_type);
				}else {
					jjAnswerStatus(answer_id,answer_type,teacher_id);
				}

				/*if(answer_type!=5){
					jjAnswerDetail(answer_id);
				}else{

				}*/

			}
		});
		$(document).on("click",".speakjj-correction-choose-teacher",function (){
			var answer_id=$(this).attr("data-answer_id");
			var answer_type=$(this).attr("data-answer_type");
			if(answer_id){
				if(answer_type==answerTypeCode.WAIT_CHOOSE_TEACHER){
					jjAnswerDetail_chooseTeacher(answer_id,answer_type,1);
				}else{
					jjUintDetail(currentQuestion);
				}

			}
		});
		//选择老师单选按钮点击事件绑定
		$(document).on("click",".jjspeak_teacherRadio",function (){
			$(".jjspeak_teacherRadio").removeClass("type-radi01").addClass("type-radi02");
			$(this).addClass("type-radi01").removeClass("type-radi02");
		});
		//提交选择批改老师 按钮事件绑定
       $(document).on("click","#speakjj_commitChooseTeacher",function (){
		   var teacherId=$(".jjspeak_teacherRadio.type-radi01").attr("data-teacherId");
		   var answerId=$(".jjspeak_teacherRadio.type-radi01").attr("data-answerId");
		   if(teacherId && answerId ){
			   $(this).addClass("disabled");
			   submitTeacherChecked(teacherId,answerId);
		   }
	   });
		$(document).on("click","#startRecord",startRecord);
		$(document).on("click","#recording",stopRecord);
		$(document).on("click","#playRecord",playRecord);
		$(document).on("click","#playingRecord",stopPlayRecord);
		$(document).on("click","#speak-reRecord",reRecord);
		$(document).on("click","#speak-saveRecord",saveRecord);
		$(document).on("click","#playSavedRecord",playSavedRecord);
		$(document).on("click","#playingSavedRecord",stopPlaySavedRecord);
		$(document).on("click","#playTeacherCorrectionAudio",playTeacherCorrectionAudio);
		$(document).on("click","#playingTeacherCorrectionAudio",stopTeacherCorrectionAudio);
		$(document).on("click","#speak-saved-reRecord",jjUintDetail_ReDo);
		$(document).on("click","#speak-saved-saveRecord",showScoreLack_notCorrection);
		$(document).on("click","#speakjj_doAgain",jjUintDetail_ReDo);
		$(document).on("click",".tabItem",changeTab);
		$(document).on("click","#showl",showLoading);
		$(document).on("click","#closel",closeLoading);
		$(document).on("click","#scoreLack_cancel",hideScoreLack);
		$(document).on("click","#scoreLack_saved",saveOpration);
		$(document).on("click","#paySuccess",paySuccessOpreation);
		$(document).on("click","#payFail",payFailOpreation);
		$(document).keydown(function (event) {
			if(event.keyCode==27){
				hideScoreLack();
			}
		});
		$(document).off('click', '.teacher_info').on('click', '.teacher_info', function () {
			var teacherId = $(this).attr('teacherid');
			window.open('teacherevaluate.html?teacherid='+teacherId,'_blank');
		});
		$(document).off('click','button[isPingJia]').on('click', 'button[isPingJia]', function () {
			var $this =$(this),
				isPingJia=$this.attr('isPingJia'),
				answerId=$this.attr('answerId'),
				teacherId=$this.attr('teacherId'),
				moduleName=questionTypeTag==3 ?'TPOZHKY' : "ORAL_JJ";

			/*ORAL_JJ：机经口语批改，WRITING_JJ：机经写作批改，TPOZHKY：tpo综合口语批改
			 TPOZHXZ：tpo综合写作批改，BF_ORAL_JJ：保分机经口语批改，BF_WRITING_JJ：	保分机经写作批改
			 BF_TPOZHKY：保分tpo综合口语批改，BF_TPOZHXZ：保分tpo综合写作批改*/
			require(['app/teacher/evaluate_teacher'],function(PingJia){
				var obj={
					moduleName:moduleName,
					answerId:answerId,
					teacherId:teacherId,
					lookCallback:null,
					addCallback:function(){
						jjAnswerDetail(answerId);
					}
				};
				//已评价
				if(isPingJia==1){
					PingJia.showComment(obj);
				}else{
					PingJia.addComment(obj);
				}
			});
		});
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
	 * 积分不足 提交批改请求
	 */
	var saveRecord_notCorrection =function (param){
		savedResponse($.extend(param,{status:1}));
		return;
		if(currentQuestion && currentQuestion.not_commit_answer){
			var audio_length=currentQuestion.not_commit_answer.answer_audio_length;
			var auth_token= BaseCookie.getToken();
			var audio_url=currentQuestion.not_commit_answer.answer_audio_url;
			var question_id=currentQuestion.question_id;
			if(audio_length && auth_token && audio_url){
				var url=questionTypeTag==3 ?  correction_uploadUrl : uploadUrl;
				$.ajax({
					url:url, // URL.baseURL9 + 'jijing_answers/web_mark',
					data: {
						auth_token: auth_token,
						audio_url:audio_url,
						question_id:question_id,
						audio_length:audio_length
					},
					type: 'post',
					headers: {
						"Authorization": token
					},
					success: function (response){
						$('#scoreLackModal').modal("hide");
						if(typeof response=="string"){
							savedResponse($.parseJSON(response));
						}else{
							savedResponse(response);
						}
					}
				});
			}
		}
	}
	/**
	 * 积分扣除提示确定按钮点击操作
	 */
	var saveOpration= function (e){
		if(currentQuestion){
			var answerId=$(e.target).attr("data-answer_id");
			var id=currentQuestion.question_id;
			var couponId=$(e.target).attr("data-coupon");
			var param={answerId:answerId,couponId:couponId,id:id};
			addOrder(param);


		}
		/*if(currentQuestion && currentQuestion.not_commit_answer){
			saveRecord_notCorrection(); //已保存未批改录音 提交批改
		}*/
	}
	/**
	 * 显示扣除积分提示
	 */
	var showScoreLack = function (param){
			if(param && param.answer_id){
				$("#scoreLack_saved").attr("data-answer_id",param.answer_id);
				requestCouponInfo();
			}

			/*var token=BaseCookie.getToken();
			$("#auth_token").val(token);
			$('#scoreLackModal').modal({
				backdrop: 'static'
			});*/
			/*window.setTimeout(function (){
				var flashObj_position=document.getElementById("tab_record").getBoundingClientRect();
				var scoreLack_saved_position=document.getElementById("scoreLack_saved").getBoundingClientRect();

				if(flashObj_position &&scoreLack_saved_position){
					var flashLeft=flashObj_position.left;
					var flashTop=flashObj_position.top;
					var scoreLeft=scoreLack_saved_position.left;
					var scoreTop=scoreLack_saved_position.top;
					$("#recorderApp").css({"margin-top": (scoreTop-flashTop-30)+"px", "margin-left": (scoreLeft-flashLeft)+"px"});
				}
				//var top=parseInt($("#scoreLackModalDialog").css("top"));
				//var left=parseInt($("#scoreLackModalDialog").css("left"))
				//$("#recorderApp").css({"margin-top": "135px", "margin-left": "488px"});

			},600)*/


	}

	/**
	 * 已保存未批改页面提交时积分扣除提示
	 */
	var showScoreLack_notCorrection = function (e){
		if(currentQuestion && currentQuestion.not_commit_answer){
			stopPlaySavedRecord();
			$("#scoreLack_saved").attr("data-answer_id",currentQuestion.not_commit_answer.answer_id);
			saveRecord_notCorrection(currentQuestion.not_commit_answer); //已保存未批改录音 提交批改

		}
		/*var token=BaseCookie.getToken();
		$("#auth_token").val(token);
		$('#scoreLackModal').modal({
			backdrop: 'static'
		});*/
	}

	/**
	 * 隐藏提示扣除积分面板
	 */
	var hideScoreLack =function (){
		$("#recorderApp").css({"margin-top": "328px"});
		$('#scoreLackModal').modal("hide");
	}
	/*---------重写冲突方法 开始-----------*/

	var showAnswerList1 = function (){}
	/*---------重写冲突方法 结束-----------*/
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
			stopPlaySavedRecord(); //暂停已保存未提交批改音频播放
			stopTeacherCorrectionAudio();//暂停老师批改答案音频播放
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
		if(!token || token=="xiaoma"){
			$('#dialogLogin').modal();
			$('#dialogLogin').on('hidden.bs.modal', function (e) {
				token=BaseCookie.getToken();
				$("#auth_token").val(token);
			});
		}else{
			stopSoundPlay();
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
					//$("#recorderApp").attr("style","float: left;margin-top:-100px;margin-left:-280px;");
					//$("#recorderApp").css({"margin-top": "-6000px"});

				}
			}else{
				alert("请安装flash");
			}
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
			//$("#recordTotalLength").html("00:"+ (record_length<10 ? "0"+record_length+"" : record_length)+"");
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
		initRecordBtn("stop");
		$("#recordTimer").html("00:00");
	}

	/**
	 * 播放已保存录音
	 */
	var playSavedRecord = function (e){
		stopSoundPlay();
		if($("#savedRecordAudio").length>0){
			/*$("#savedRecordAudio").get(0).src=$(e.target).attr("data-audioUrl");
			$("#savedRecordAudio").get(0).loop=false;*/
			$("#savedRecordAudio").get(0).play();
		}
		$("#playSavedRecord").hide();
		$("#playingSavedRecord").show();
	}

	/**
	 * 暂停播放已保存录音
	 */
	var stopPlaySavedRecord = function (status){
		if(status!="end"){
			if($("#savedRecordAudio").length>0){
				$("#savedRecordAudio").get(0).pause();
			}
		}
		$("#playSavedRecord").show();
		$("#playingSavedRecord").hide();

	}

	/**
	 * 播放老师批改录音
	 */
	var playTeacherCorrectionAudio = function (e){
		stopSoundPlay();
		if($("#teacherCorrectionAudio").length>0){
			/*$("#savedRecordAudio").get(0).src=$(e.target).attr("data-audioUrl");
			 $("#savedRecordAudio").get(0).loop=false;*/
			$("#teacherCorrectionAudio").get(0).play();
		}
		$("#playTeacherCorrectionAudio").hide();
		$("#playingTeacherCorrectionAudio").show();
	}

	/**
	 * 暂停老师批改录音
	 */
	var stopTeacherCorrectionAudio = function (status){
		if(status!="end"){
			if($("#teacherCorrectionAudio").length>0){
				$("#teacherCorrectionAudio").get(0).pause();
			}
		}
		if(status=="stop"){
			$("#recordTimer").html("00:00");
		}
		$("#playTeacherCorrectionAudio").show();
		$("#playingTeacherCorrectionAudio").hide();

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
			//$("#recordTotalLength").html("00:"+record_totalLength);
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
		 if(record_length<30){
			$("#recordTipP").show().find("span").html("录音需大于30秒才能提交");
			showErrorTip({content:"录音需大于30秒才能提交"});
			$("#recordTimerP").hide();
			window.setTimeout(function (){
				$("#recordTipP").hide()
				$("#recordTimerP").show();
			},1000);
		}else if(!token || token=="xiaoma"){
			$('#dialogLogin').modal();
			$('#dialogLogin').on('hidden.bs.modal', function (e) {
				token=BaseCookie.getToken();
				$("#auth_token").val(token);
				//showScoreLack();
				$("#recorderApp").css({"margin-top": "328px", "margin-left": "395px"});
				if(record_length<30){
					/*$("#recordTipP").show().find("span").html("录音需大于30秒才能提交");
					showErrorTip({content:"录音需大于30秒才能提交"});
					$("#recordTimerP").hide();
					window.setTimeout(function (){
						$("#recordTipP").hide()
						$("#recordTimerP").show();
					},1000);*/
				}else{
					//$("#recorderApp").css({"margin-top": "0px", "margin-left": "-124px"});
					//$("#recorderApp").css({"margin-top": "355px", "margin-left": "397px"});
					//showScoreLack();
				}
			});
		}else {

			showScoreLack();
		}
	}
	/**
	 * 录音提交响应处理
	 * @param response
	 */
	var savedResponse = function (response){
		if(response.status==2 && response.error=="no point"){
			showErrorTip({content:"您的积分不足，无法提交"});
			//$("#recorderApp").css({"margin-top": "355px", "margin-left": "397px"});
			return;
		}else if(response.status==2 && response.error=="can not use point"){
			showErrorTip({content:"您的积分被冻结，无法提交"});
			//$("#recorderApp").css({"margin-top": "355px", "margin-left": "397px"});
			return;
		}else if(response.status==1){
			showScoreLack({answer_id:response.answer_id});
			//jjUintDetail(currentQuestion);
		}else{
			//$("#recorderApp").css({"margin-top": "355px", "margin-left": "397px"});
			showErrorTip({content:"上传失败"});
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
			//$("#recordTimer").html("00:"+ (record_length<10 ? "0"+record_length+"" : record_length)+"");
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
			//$("#recordTotalLength").html("00:"+record_totalLength);
			$("#recordTotalLength").html(format_time(record_totalLength));
			$("#speak-reRecord").removeAttr("disabled");
			$("#speak-saveRecord").removeAttr("disabled");
		}
	}


	/**
	 * 机经口语子菜单展示
	 */
	var menuToggleListen = function() {
		$('.sidebar-ul').find('a.sidebarLight').removeClass('sidebarLight');
		$('.sidebar-ul').find('li.sidebarLight').removeClass('sidebarLight');
		$("#side4").parent().siblings().find(".sidebarLight").removeClass('sidebarLight');
		$("#speak_menu_div").toggle();
		if ($('#speak_menu_div').css('display') == "none") {
			$("#speakImg").attr("src", "../../i/side-ang1.png");
		} else {
			$("#speakImg").attr("src", "../../i/side-ang.png");
		}
		$("#side5").click(); //默认定位机经预测
	}
	var menuToggleListenOnly = function() {
		$('.sidebar-ul').find('a.sidebarLight').removeClass('sidebarLight');
		$('.sidebar-ul').find('li.sidebarLight').removeClass('sidebarLight');
		$("#side4").parent().siblings().find(".sidebarLight").removeClass('sidebarLight');
		$("#speak_menu_div").toggle();
		if ($('#speak_menu_div').css('display') == "none") {
			$("#speakImg").attr("src", "../../i/side-ang1.png");
		} else {
			$("#speakImg").attr("src", "../../i/side-ang.png");
		}
		$("#side8").click(); //默认定位机经预测
	}
	var menuToggleListenLiNian = function() {
		$('.sidebar-ul').find('a.sidebarLight').removeClass('sidebarLight');
		$('.sidebar-ul').find('li.sidebarLight').removeClass('sidebarLight');
		$("#side4").parent().siblings().find(".sidebarLight").removeClass('sidebarLight');
		$("#speak_menu_div").toggle();
		if ($('#speak_menu_div').css('display') == "none") {
			$("#speakImg").attr("src", "../../i/side-ang1.png");
		} else {
			$("#speakImg").attr("src", "../../i/side-ang.png");
		}
		$("#side6").click(); //默认定位机经预测
	}
	/**
	 * 机经口语题目详情
	 * @param data
	 */
	var jjUintDetail = function (data,type,commitType){
		reset();
		if(data && data.question_id){
			var _success = function(json) {
				currentQuestion = json;
				if(questionTypeTag==3){
					//做数据适配 统一模板
					currentQuestion.answers=currentQuestion.question_answers || currentQuestion.answer_messages;
					if(!currentQuestion.question_content){
						currentQuestion.question_content=currentQuestion.content;
					}
					currentQuestion.sample_content=currentQuestion.audio_url;
				}
				if(type=="change") {
					questionId = json.question_id;
					if (currentQuestion && currentQuestion.answers.length <= 0) {
						jjUintDetail_UNDone();
					} else {
						//未提交答案逻辑验证
						var notCommit=false;
						for(var i=0;i<currentQuestion.answers.length;i++){
							var answer=currentQuestion.answers[i];
							if(answer.type==1){
								//notCommit=true;
								break;
							}
						}
						if(commitType=="notCommit"){
							jjUintDetail_notCommit();
						}else{
							jjUintDetail_Done();
						}
					}
				}else{
					//题号面板
					var questionsNum = [];
					var renderData = {};
					//renderData.question = json;
					//renderData.uploadUrl = URL.baseURL5 + "jijing_answers/web_mark";
					renderData.questions = questions;
					renderData.questionTypeTag=questionTypeTag;
					var param1 = {
						"wrap": $('#content'),
						"tmplName": TMPL.t3,
						"tmplData": renderData,
						"afterRender": function () {
							questionId = currentQuestion.question_id;
							if (currentQuestion && currentQuestion.answers.length <= 0) {
								jjUintDetail_UNDone();
							} else {
								//未提交答案逻辑验证
								var notCommit=false;
								for(var i=0;i<currentQuestion.answers.length;i++){
									var answer=currentQuestion.answers[i];
									if(answer.type==1){
										//notCommit=true;
										break;
									}
								}
								if(commitType=="notCommit"){
									jjUintDetail_notCommit();
								}else{
									jjUintDetail_Done();
								}

							}

						}
					}
					renderTemplate(param1)
				}
			}

			var detailUrl=URL.baseURL9 + 'jijing_questions/web_question_message';
			var detailParam={question_id: data.question_id, question_type:1, is_from_mark:1}
			if(questionTypeTag==3){
				detailUrl=URL.baseURL9 + 'tpo_speaking_correction_questions/get_one';
				detailParam={question_id: data.question_id}
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
		}

	}
	/**
	 * 机经口语题目详情
	 * @param data
	 */
	/*var jjUintDetail = function (data,type,commitType){
			reset();
			if(data && data.question_id){
				var _success = function(json) {
					currentQuestion = json;
					if(questionTypeTag==3){
						//做数据适配 统一模板
						currentQuestion.answers=currentQuestion.question_answers || currentQuestion.answer_messages;
						if(!currentQuestion.question_content){
							currentQuestion.question_content=currentQuestion.content;
						}
						currentQuestion.sample_content=currentQuestion.audio_url;
					}
					if(type=="change") {
						questionId = json.question_id;
						if (currentQuestion && currentQuestion.answers.length <= 0) {
							jjUintDetail_UNDone();
						} else {
							//未提交答案逻辑验证
							var notCommit=false;
							for(var i=0;i<currentQuestion.answers.length;i++){
								var answer=currentQuestion.answers[i];
								if(answer.type==3){
									//notCommit=true;
									break;
								}
							}
							if(notCommit){
								jjUintDetail_notCommit();
							}else{
								jjUintDetail_Done();
							}
						}
					}else{
						//题号面板
						var questionsNum = [];
						var renderData = {};
						//renderData.question = json;
						//renderData.uploadUrl = URL.baseURL5 + "jijing_answers/web_mark";
						renderData.questions = questions;
						renderData.questionTypeTag=questionTypeTag;
						var param1 = {
							"wrap": $('#content'),
							"tmplName": TMPL.t3,
							"tmplData": renderData,
							"afterRender": function () {
								questionId = currentQuestion.question_id;
								if (currentQuestion && currentQuestion.answers.length <= 0) {
									jjUintDetail_UNDone();
								} else {
									//未提交答案逻辑验证
									var notCommit=false;
									for(var i=0;i<currentQuestion.answers.length;i++){
										var answer=currentQuestion.answers[i];
										if(answer.type==3){
											//notCommit=true;
											break;
										}
									}
									if(notCommit){
										jjUintDetail_notCommit();
									}else{
										jjUintDetail_Done();
									}

								}

							}
						}
						renderTemplate(param1)
					}
				}

				var detailUrl=URL.baseURL9 + 'jijing_questions/web_question_message';
				var detailParam={question_id: data.question_id, question_type:1, is_from_mark:1}
				if(questionTypeTag==3){
					detailUrl=URL.baseURL9 + 'tpo_speaking_correction_questions/get_one';
					detailParam={question_id: data.question_id}
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
			}

		}*/
	/**
	 * 机经口语 未做过
	 */
	var jjUintDetail_UNDone = function (){
		if(currentQuestion &&currentQuestion.answers.length<=0){
			var renderData={};
			renderData.question=currentQuestion;
			renderData.uploadUrl=uploadUrl;
			renderData.group_title=group_title || "独立口语批改";
			if(questionTypeTag==2){
				var currentPaperExamsYearObj=getCurrentPaperExamsYearGroup(currentPaperExamsGroupID);
				if(currentPaperExamsYearObj){
					renderData.paperExamsYearObj=currentPaperExamsYearObj;
					renderData.group_title=currentPaperExamsYearObj.group_title || "历年真题";
				}
			}else if(questionTypeTag==3){
				renderData.uploadUrl=correction_uploadUrl;
				renderData.group_title="综合口语批改";
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
	 * 机经口语 查看提交答案状态
	 * @param answer_id
	 * @param answer_type
	 */
    var jjAnswerStatus = function (answer_id,answer_type,teacherParam,totalCount){
		if(answer_id && answer_type && currentQuestion &&currentQuestion.answers && currentQuestion.answers.length>0){
			var renderData={};
			renderData.question=currentQuestion;
			renderData.group_title=group_title || "独立口语批改";
			if(questionTypeTag==2){
				var currentPaperExamsYearObj=getCurrentPaperExamsYearGroup(currentPaperExamsGroupID);
				if(currentPaperExamsYearObj){
					renderData.paperExamsYearObj=currentPaperExamsYearObj;
					renderData.group_title=currentPaperExamsYearObj.group_title || "历年真题批改";
				}
			}else if(questionTypeTag==3){
				renderData.group_title="综合口语批改";
			}
			renderData.userHeadPic=$("#person").attr("src") || "../../i/tpo-pic7.png";
			for(var i=0;i<currentQuestion.answers.length;i++){
				if(currentQuestion.answers[i].answer_id==answer_id){
					renderData.currentAnswer=currentQuestion.answers[i];
					break;
				}
			}
			renderData.answer_type=answer_type;
			if(answer_type==answerTypeCode.WAIT_CHOOSE_TEACHER && teacherParam){
				renderData.teacherList=teacherParam;
			}else if(answer_type==answerTypeCode.WAIT_CORRECT && teacherParam){
				var teacherInfo=getTeacherInfoByTeacherId(teacherParam);
				var teacherInfoTemp={};
				teacherInfoTemp.teacher_nickname=teacherInfo.nickName;
				teacherInfoTemp.teacher_avatar=teacherInfo.avatar;
				teacherInfoTemp.teacher_id=teacherInfo.teacherId;
				renderData.teacherInfo=teacherInfo;
				$.extend(renderData.currentAnswer,teacherInfoTemp);
			}
			renderData.parseClass=parseClass;
			var param = {
				"wrap": $('#leftDiv'),
				"tmplName": questionTypeTag==3 ? TMPL.t14:TMPL.t13,
				"tmplData": renderData,
				"afterRender": function (){
					if(answer_type==answerTypeCode.WAIT_CHOOSE_TEACHER){

						bindPage('#pageSlide', Math.ceil(totalCount/10), jjAnswerDetail_chooseTeacher_turnPage, 1,{answer_id:answer_id,answer_type:answer_type});
					}

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
	 * 通过老师ID获取老师基础信息
	 * @param teacherId
	 */
	var getTeacherInfoByTeacherId= function (teacherId){
		if(teacherId){
			var url="correct/myMarkTeacherDetail.action";
			var teacherInfo=null;
			$.ajax({
				url: URL.baseURL10 + url,
				data:{
					teacherId:teacherId,
					form:1
				} ,
				type: 'get',
				async:false,
				headers: {
					"Authorization": token
				},
				success: function (res){
					if(res.status==0){
						teacherInfo=res.result;
					}
				}
			});
			return teacherInfo;
		}
		return null;
	}
	/**
	 * 绑定分页控件
	 * @param pageWrap
	 * @param totalCount
	 * @param fnPage
	 * @param currentPage
	 */
	var bindPage = function(pageWrap, totalCount, fnPage, currentPage,transmissionParam) {
		$(pageWrap).paginate({
			count: totalCount,
			start: currentPage,
			display: 5,
			resizeParentWidth:true,
			border: false,
			border_color: '#327dde',
			text_color: '#333',
			background_color: '#fff',
			border_hover_color: '#327dde',
			text_hover_color: '#fff',
			background_hover_color: '#549dfd',
			images: false,
			mouse: 'press',
			onChange: function(page) {
				//window.scrollTo(0, 0);
				fnPage(page,transmissionParam)
			}
		});
	}

	/**
	 * 机经口语 选择老师列表
	 */
	var jjAnswerDetail_chooseTeacher = function (answer_id,answer_type,currentPage){
		if(answer_id){
			var url="correct/myGrapTeacherList.action";
			var questionTypeTemp=2;
			if(questionTypeTag==3){
				questionTypeTemp=4;
			}
			var _success =function (res){
				if(res.status==0){
					var teacherList=res.result;
					var totalCount=res.totalCount;
					jjAnswerStatus(answer_id,answer_type,teacherList,totalCount);
				}else{
					alert(res.message);
				}
			}
			$.ajax({
				url: URL.baseURL10 + url,
				data:{
					answerId:answer_id,
					answerType:questionTypeTemp,
					currentPage:currentPage,
					form:1
				} ,
				type: 'get',
				headers: {
					"Authorization": token
				},
				success: _success
			});
		}
	}
	/**
	 * 机经口语 选择老师列表翻页
	 */
	var jjAnswerDetail_chooseTeacher_turnPage = function (page,param){
		var answer_id=param.answer_id;
		var answer_type=param.answer_type;
		if(answer_id){
			var url="correct/myGrapTeacherList.action";
			var questionTypeTemp=2;
			if(questionTypeTag==3){
				questionTypeTemp=4;
			}
			var _success =function (res){
				if(res.status==0){
					var renderData={};
					var teacherList=res.result;
					renderData.teacherList=teacherList;
					renderData.answer_id=answer_id;
					var param = {
						"wrap": $('#teacherList'),
						"tmplName": TMPL.t15,
						"tmplData": renderData,
						"afterRender": function (){
						}
					}
					renderTemplate(param);

				}else{
					alert(res.message);
				}
			}
			$.ajax({
				url: URL.baseURL10 + url,
				data:{
					answerId:answer_id,
					answerType:questionTypeTemp,
					currentPage:page,
					form:1
				} ,
				type: 'get',
				headers: {
					"Authorization": token
				},
				success: _success
			});
		}
	}
	var submitTeacherChecked = function (teacherId,answerId){
		var questionTypeTemp=2 //1:精华口语批改，2：机经口语批改，3：机经写作批改，4：tpo综合口语批改，5：tpo综合写作批改
		if(questionTypeTag==3){
			questionTypeTemp=4;
		}
		if(teacherId && answerId){
			var url="correct/submitTeacherChecked.action";
			var _success=function (res){
				if(res.status==0){
					jjAnswerStatus(answerId,answerTypeCode.WAIT_CORRECT,teacherId);
				}else{
					alert(res.message);
				}
			}
			$.ajax({
				url: URL.baseURL10 + url,
				data:{
					answerId:answerId,
					answerType:questionTypeTemp,
					teacherId:teacherId,
					form:1
				} ,
				type: 'post',
				headers: {
					"Authorization": token
				},
				success: _success
			});
		}
	}

	/**
	 * 机经口语 已做过
	 */
	var jjUintDetail_Done = function (){
		if(currentQuestion &&currentQuestion.answers && currentQuestion.answers.length>0){
			var renderData={};
			renderData.question=currentQuestion;
			renderData.group_title=group_title || "独立口语批改";
			if(questionTypeTag==2){
				var currentPaperExamsYearObj=getCurrentPaperExamsYearGroup(currentPaperExamsGroupID);
				if(currentPaperExamsYearObj){
					renderData.paperExamsYearObj=currentPaperExamsYearObj;
					renderData.group_title=currentPaperExamsYearObj.group_title || "历年真题批改";
				}
			}else if(questionTypeTag==3){
				renderData.group_title="综合口语批改";
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
	 * 机经口语 未提交答案
	 */
	var jjUintDetail_notCommit = function (){
		if(currentQuestion){
			var renderData={};
			renderData.question=currentQuestion;
			renderData.uploadUrl=uploadUrl;
			renderData.group_title=group_title || "独立口语批改";

			for(var i=0;i<currentQuestion.answers.length;i++){
				var answer=currentQuestion.answers[i];
				if(answer.type==1){
					renderData.not_commit_answer=answer;
					currentQuestion.not_commit_answer=answer;
					break;
				}
			}
			if(questionTypeTag==2){
				var currentPaperExamsYearObj=getCurrentPaperExamsYearGroup(currentPaperExamsGroupID);
				if(currentPaperExamsYearObj){
					renderData.paperExamsYearObj=currentPaperExamsYearObj;
					renderData.group_title=currentPaperExamsYearObj.group_title || "历年真题批改";
				}
			}else if(questionTypeTag==3){
				renderData.uploadUrl=correction_uploadUrl;
				renderData.group_title="综合口语批改";
			}
			var param = {
				"wrap": $('#leftDiv'),
				"tmplName": questionTypeTag==3 ? TMPL.t10: TMPL.t9,
				"tmplData": renderData,
				"afterRender": function (){
					if(renderData.not_commit_answer && renderData.not_commit_answer.answer_audio_length){
						$("#recordTotalLength").html(format_time(renderData.not_commit_answer.answer_audio_length))
					}
					$("#side").hide(); //隐藏左侧面板
					$("#h5Player").on("ended", function () {
						stopSoundPlay("end");
					});
					$("#audioAudio").on('play',function(){
						if(record_ing){
							this.pause();
						}
						stopSoundPlay("sampleAnswer");
						stopPlaySavedRecord();
						stopPlayRecord();
					});
					$("#savedRecordAudio").on('timeupdate',function (){
						var time=Math.round($(this).get(0).currentTime);
						//$("#recordTimer").html("00:"+(time<10 ? "0"+time : time));
						$("#recordTimer").html(format_time(time));
					});
					$("#savedRecordAudio").on("ended",function(){
						stopPlaySavedRecord("end");
						$("#recordTimer").html("00:00");
					});
				}
			}
			renderTemplate(param);
		}
	}
			//OLD
	///**
	// * 通过answerID获取答案批改详情
	// * @param answer_id
	// */
	//	var jjAnswerDetail = function (answer_id){
	//	if(answer_id){
	//		stopSoundPlay();
	//		var _success = function(json){
	//			var renderData={};
	//			renderData.question=currentQuestion;
	//			renderData.answerDetail=json;
	//			var mark_tips=json.mark_tips;
	//			if(mark_tips&& mark_tips.length>0){
	//				for(var i=0;i<mark_tips.length;i++){
	//					var tipobj=mark_tips[i];
	//					if(tipobj.start_index==-1 && tipobj.end_index==-1){
	//							renderData.answerDetail.is_old=true;
	//							break;
	//					}
	//				}
	//			}
	//			if(!renderData.answerDetail.is_old){
	//				renderData.answerDetail.answer_new_content=format_teacher_correction_answer(json.answer_content,json.mark_tips);
	//			}
	//			if(questionTypeTag==2){
	//				var currentPaperExamsYearObj=getCurrentPaperExamsYearGroup(currentPaperExamsGroupID);
	//				if(currentPaperExamsYearObj){
	//					renderData.paperExamsYearObj=currentPaperExamsYearObj;
	//					renderData.group_title=currentPaperExamsYearObj.group_title || "历年真题";
	//				}
	//			}else if(questionTypeTag==3){
	//				renderData.uploadUrl=correction_uploadUrl;
	//				renderData.group_title="综合口语批改";
	//			}
	//			var param = {
	//				"wrap": $('#leftDiv'),
	//				"tmplName": questionTypeTag==3 ? TMPL.t12: TMPL.t11,
	//				"tmplData": renderData,
	//				"afterRender": function (){
	//					$('body').on('click',function(e){
	//						if(e.target.className!='cnote'){
	//							$('.cnote').popover('hide');
	//						}
	//					});
	//					$('.cnote').popover({
	//						trigger: 'a'
	//					});
	//					$('.cnote').on("click",function (){
	//						$('.cnote').popover('hide');
	//						var self=this
	//						window.setTimeout(function (){
	//							$(self).popover('show');
	//						},200);
	//						stopTeacherCorrectionAudio("stop");
	//						var mark_type=$(this).attr("data-mark_type");
	//						if(mark_type==1){
	//							var audio_url=$(this).attr("data-audio_url");
	//							if($("#teacherCorrectionAudio").get(0)){
	//								$("#teacherCorrectionAudio").get(0).src=audio_url;
	//								$("#playTeacherCorrectionAudio").attr("data-audioUrl",audio_url);
	//								$("#teacherCorrectionAudioDiv").show();
	//							}
	//						}else{
	//							$("#teacherCorrectionAudioDiv").hide();
	//						}
    //
	//					})
	//					$("#side").hide(); //隐藏左侧面板
	//					$("#h5Player").on("ended", function () {
	//						stopSoundPlay("end");
	//					});
	//					$("#audioAudio").on('play',function(){
	//						if(record_ing){
	//							this.pause();
	//						}
	//						stopSoundPlay("sampleAnswer"); //停止我提交过的音频播放
	//						stopPlaySavedRecord(); //停止已保存录音播放
	//						stopPlayRecord(); //停止录音播放
	//						stopTeacherCorrectionAudio(); //停止老师批改录音播放
	//					});
	//					$("#teacherCorrectionAudio").on('loadedmetadata',function(e){
	//						var target= e.currentTarget
	//						if(target){
	//							var duration=target.duration;
	//							$("#recordTotalLength").html(format_time(Math.round(duration)));
	//						}
	//					});
	//					$("#teacherCorrectionAudio").on('timeupdate',function (){
	//						var time=Math.round($(this).get(0).currentTime);
	//						$("#recordTimer").html(format_time(time));
	//					});
	//					$("#teacherCorrectionAudio").on("ended",function(){
	//						stopTeacherCorrectionAudio("end");
	//						$("#recordTimer").html("00:00");
	//					});
	//				}
	//			}
	//			renderTemplate(param);
	//		};
	//		var url= questionTypeTag==3 ? "tpo_speaking_correction_answers/mark_tip_messages": "jijing_answers/mark_tip_messages";
	//		$.ajax({
	//			url: URL.baseURL9 + url,
	//			data:{
	//				answer_id:answer_id,
	//				form:1
	//			} ,
	//			type: 'get',
	//			headers: {
	//				"Authorization": token
	//			},
	//			success: _success
	//		});
	//	}
    //
	//}
	/* 通过answerID获取答案批改详情
	* @param answer_id
	*/
	var jjAnswerDetail = function (answer_id){
		if(answer_id){
			stopSoundPlay();
			var _success = function(response){
				var json=response.result;
				var renderData={};
				renderData.question=currentQuestion;
				renderData.answerDetail=json;
				var mark_tips=json.detailList;
				if(mark_tips&& mark_tips.length>0){
					for(var i=0;i<mark_tips.length;i++){
						var tipobj=mark_tips[i];
						if(tipobj.startIndex==-1 && tipobj.endIndex==-1){
							renderData.answerDetail.is_old=true;
							break;
						}
					}
				}
				if(!renderData.answerDetail.is_old){
					renderData.answerDetail.answer_new_content=format_teacher_correction_answer(json.content,json.detailList);
				}
				if(questionTypeTag==2){
					var currentPaperExamsYearObj=getCurrentPaperExamsYearGroup(currentPaperExamsGroupID);
					if(currentPaperExamsYearObj){
						renderData.paperExamsYearObj=currentPaperExamsYearObj;
						renderData.group_title=currentPaperExamsYearObj.group_title || "历年真题";
					}
				}else if(questionTypeTag==3){
					renderData.uploadUrl=correction_uploadUrl;
					renderData.group_title="综合口语批改";
				}
				renderData.answerDetail.answer_id=answer_id;
				renderData.formatDate=formatDate;
				renderData.parseClass=parseClass;
				var param = {
					"wrap": $('#leftDiv'),
					"tmplName": questionTypeTag==3 ? TMPL.t12: TMPL.t11,
					"tmplData": renderData,
					"afterRender": function (){
						$('body').on('click',function(e){
							if(e.target.className!='cnote'){
								$('.cnote').popover('hide');
							}
						});
						$('.cnote').popover({
							trigger: 'a'
						});
						$('.cnote').on("click",function (){
							$('.cnote').popover('hide');
							var self=this
							window.setTimeout(function (){
								$(self).popover('show');
							},200);
							stopTeacherCorrectionAudio("stop");
							var mark_type=$(this).attr("data-mark_type");
							if(mark_type==2){
								var audio_url=$(this).attr("data-audio_url");
								if($("#teacherCorrectionAudio").get(0)){
									$("#teacherCorrectionAudio").get(0).src=audio_url;
									$("#playTeacherCorrectionAudio").attr("data-audioUrl",audio_url);
									$("#teacherCorrectionAudioDiv").show();
								}
							}else{
								$("#teacherCorrectionAudioDiv").hide();
							}

						})
						$("#side").hide(); //隐藏左侧面板
						$("#h5Player").on("ended", function () {
							stopSoundPlay("end");
						});
						$("#audioAudio").on('play',function(){
							if(record_ing){
								this.pause();
							}
							stopSoundPlay("sampleAnswer"); //停止我提交过的音频播放
							stopPlaySavedRecord(); //停止已保存录音播放
							stopPlayRecord(); //停止录音播放
							stopTeacherCorrectionAudio(); //停止老师批改录音播放
						});
						$("#teacherCorrectionAudio").on('loadedmetadata',function(e){
							var target= e.currentTarget
							if(target){
								var duration=target.duration;
								$("#recordTotalLength").html(format_time(Math.round(duration)));
							}
						});
						$("#teacherCorrectionAudio").on('timeupdate',function (){
							var time=Math.round($(this).get(0).currentTime);
							$("#recordTimer").html(format_time(time));
						});
						$("#teacherCorrectionAudio").on("ended",function(){
							stopTeacherCorrectionAudio("end");
							$("#recordTimer").html("00:00");
						});
					}
				}
				renderTemplate(param);
			};
			//var url= questionTypeTag==3 ? "tpo_speaking_correction_answers/mark_tip_messages": "jijing_answers/mark_tip_messages";
			var correctType = questionTypeTag==3 ? 4 : 2;  //1 精华口语批改 2 机经口语批改 3 机经写作批改 4 tpo综合口语批改 5 tpo综合写作批改 6 保分机经口语批改 7 保分机经写作批改 8 保分tpo综合口语批改 9 保分tpo综合写作批改
			var url= "correct/web/getMarkDetail.action";
			$.ajax({
				//url: URL.baseURL9 + url,
				url: URL.baseURL10 + url,
				data:{
					answerId:answer_id,
					correctType:correctType
				} ,
				type: 'get',
				headers: {
					"Authorization": token,
					"token" : token
				},
				success: _success
			});
		}

	};

	var parseClass=function(scoreFinal){
		var starClass='';
		scoreFinal = parseFloat(scoreFinal);
		if (!scoreFinal || scoreFinal <= 0) {
			starClass = 'cs_0';
		} else if (scoreFinal > 0 && scoreFinal <= 0.5) {
			starClass = 'cs_w0dian5';
		} else if (scoreFinal <= 1) {
			starClass = 'cs_w1';
		} else if (scoreFinal <= 1.5) {
			starClass = 'cs_w1dian5';
		} else if (scoreFinal <= 2) {
			starClass = 'cs_w2';
		} else if (scoreFinal <= 2.5) {
			starClass = 'cs_w2dian5';
		} else if (scoreFinal <= 3) {
			starClass = 'cs_w3';
		} else if (scoreFinal <= 3.5) {
			starClass = 'cs_w3dian5';
		} else if (scoreFinal <= 4) {
			starClass = 'cs_w4';
		} else if (scoreFinal <= 4.5) {
			starClass = 'cs_w4dian5';
		} else {
			starClass = 'cs_w5';
		}
		return starClass;
	};
	/**
	 * 格式化老师批改答案 -------------------------OLD
	 */
	//var format_teacher_correction_answer = function (answer_content,mark_tips){
	//	if(answer_content && mark_tips && mark_tips.length>0){
	//		var newStr="";
	//		var answer_content_array=answer_content.split("");
	//		var tempIndex=0;
	//		for(var i=0;i<mark_tips.length;i++){
	//			var start_index=mark_tips[i].start_index;
	//			var end_index=mark_tips[i].end_index;
	//			var str=answer_content.substring(start_index,end_index);
	//			var tempStr=answer_content.substring(tempIndex,start_index);
	//			if(mark_tips[i].mark_type==1){
	//				newStr+=tempStr+'<span data-mark_type="1" data-audio_url="'+mark_tips[i].audio_url+'" class="cnote" style="background: #98C4FF;cursor:pointer">'+str+"</span>";
	//			}else{
	//				newStr+=tempStr+'<span data-mark_type="2" class="cnote" data-html="true" data-content="' + mark_tips[i].mark_content + '" data-toggle="popover" data-placement="top" style="background: #f9e6be;cursor:pointer;">'+str+"</span>";
	//			}
	//			if(i==mark_tips.length-1){
	//				tempStr=answer_content.substring(end_index,answer_content.length);
	//				newStr+=tempStr;
	//			}
	//			tempIndex=end_index;
	//		}
	//		newStr = newStr.replace(/\n/g, "<br>"); //换行
	//		return newStr;
	//	}
	//	return answer_content;
	//}
	/**
	 * 格式化老师批改答案
	 */
	var format_teacher_correction_answer = function (answer_content,mark_tips){
		if(answer_content && mark_tips && mark_tips.length>0){
			var newStr="";
			var answer_content_array=answer_content.split("");
			var tempIndex=0;
			for(var i=0;i<mark_tips.length;i++){

				var start_index=mark_tips[i].startIndex;
				var end_index=mark_tips[i].endIndex;
				var str=answer_content.substring(start_index,end_index);
				var tempStr=answer_content.substring(tempIndex,start_index);
				if(mark_tips[i].markType==2){
					newStr+=tempStr+'<span data-mark_type="2" data-audio_url="'+mark_tips[i].audioUrl+'" class="cnote" style="background: #98C4FF;cursor:pointer">'+str+"</span>";
				}else{
					newStr+=tempStr+'<span data-mark_type="1" class="cnote" data-html="true" data-content="' + mark_tips[i].markContent + '" data-toggle="popover" data-placement="top" style="background: #f9e6be;cursor:pointer;">'+str+"</span>";
				}
				if(i==mark_tips.length-1){
					tempStr=answer_content.substring(end_index,answer_content.length);
					newStr+=tempStr;
				}
				tempIndex=end_index;
			}
			newStr = newStr.replace(/\n/g, "<br>"); //换行
			return newStr;
		}
		return answer_content;
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
				renderData.group_title="综合口语批改";
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
							/*console.log("end");
							$(".jijing-speak-dic").attr("src","../../i/dic-pic.png");*/
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
					question_type:1,
					is_from_mark:1
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
		$("#side5").addClass('sidebarLight');
		$("#side5").parent().siblings().removeClass('sidebarLight');
		$("#speak_menu_div li").removeClass('sidebarLight');

		var _success = function(json) {
			var renderData={};
			questionTypeTag=1;     //机经预测类型标记
			questions = json.jijing_questions; //组信息初始化
			group_title=json.group_title || "独立口语批改";
			renderData.questions=questions;
			renderData.group_title=group_title;
			renderData.tabs=json.group_messages;
			var param = {
				"tmplName": TMPL.t1,
				"tmplData": renderData,
				"afterRender": function(){
					//var height=$(".right-part1 p.left25").height();
					$(".jj-speak-list-js").each(function (){
						var height=$(this).height();
						if(!$(this).hasClass("jijing-speak-div")){
							if(height<=20){
								$(this).addClass("jj-speak-single");
								$(this).find("a.sim-a2").removeClass("sim-a2"); //一行未做过 移除换行控制css
								//$(this).find("span.rewrite-percentnew").removeClass("rewrite-percentnew").siblings("a").addClass("sim-anew");
								if($(this).find("span.rewrite-percentnew").length>0){
									//$(this).removeClass("jj-speak-single").addClass("jj-speak-divnew");
								}
							}else{
								//$(this).addClass("jj-speak-divnew");
								$(this).find("span.fright").addClass("rewrite-font");
								$(this).find("a.sim-width510").addClass("sim-anew");
                                $(this).find("a.sim-width480").addClass("sim-anew");
							}
						}
					});

					$("#side").show();
					record_totalLength=45;

				}
			}
			renderTemplate(param)
		}
		$.ajax({
			url: URL.baseURL9 + 'jijing_questions/web_yuce_mark',
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

	//综合口语批改列表
	var speak_correction = function() {
		BaseCookie.get()
		token = BaseCookie.getToken()
		if ("" == token || null == token) {
			token = tokenTmp
		}
		//左侧导航active
		$('.sidebar-ul').find('a.sidebarLight').removeClass('sidebarLight');
		$('.sidebar-ul').find('li.sidebarLight').removeClass('sidebarLight');
		$("#side8").addClass('sidebarLight');
		$("#side8").parent().siblings().removeClass('sidebarLight');
		$("#speak_menu_div li").removeClass('sidebarLight');

		var _success = function(json) {
			var renderData={};
			questionTypeTag=3;     //综合口语批改类型标记
			questions = json.tpo_speaking_questions; //组信息初始化
			renderData.questions=questions;
			renderData.group_title="综合口语批改";
			var param = {
				"tmplName": TMPL.t6,
				"tmplData": renderData,
				"afterRender": function (){
					$(".jj-speak-list-js").each(function (){
						var height=$(this).height();
						if(!$(this).hasClass("jijing-speak-div")){
							if(height<=20){
								$(this).addClass("jj-speak-single");
								$(this).find("a.sim-a2").removeClass("sim-a2"); //一行未做过 移除换行控制css
								//$(this).find("span.rewrite-percentnew").removeClass("rewrite-percentnew");
								if($(this).find("span.rewrite-percentnew").length>0){
									$(this).removeClass("jj-speak-single").addClass("jj-speak-divnew");
								}
							}else{
								$(this).addClass("jj-speak-divnew");
								$(this).find("span.fright").addClass("rewrite-font");
								$(this).find("a.sim-width510").addClass("sim-anew");
							}
						}
					});

					$("#side").show();
					record_totalLength=60;
				}
			}
			renderTemplate(param)
		}
		$.ajax({
			url: URL.baseURL9 + 'tpo_speaking_correction_questions',
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
		$("#side6").addClass('sidebarLight');
		$("#side6").parent().siblings().removeClass('sidebarLight');
		$("#speak_menu_div li").removeClass('sidebarLight');

		var _success = function(json) {
			questionTypeTag=2;     //历年真题类型标记
			paperExamsGroup=json.group_messages; //缓存历年真题年份组
			var data={};
			questions = json.jijing_questions; //组信息初始化
			data.content=json.jijing_questions;
			data.tabs=json.group_messages;
			var param = {
				"tmplName": TMPL.t2,
				"tmplData": data,
				"afterRender": function(){
					$(".jijing-speak-tab-js p.left25").each(function (){
						var height=$(this).height();
						if(!$(this).hasClass("jijing-speak-div")){
							if(height<=20){
								$(this).addClass("jj-speak-single");
								$(this).find("a.sim-a2").removeClass("sim-a2"); //一行未做过 移除换行控制css
								if($(this).find("span.rewrite-percentnew").length>0){
									$(this).removeClass("jj-speak-single").addClass("jj-speak-divnew");
								}
							}else{
								$(this).addClass("jj-speak-divnew");
								$(this).find("span.fright").addClass("rewrite-font");
								$(this).find("a.sim-width510").addClass("sim-anew");
							}
						}
					});

					$("#side").show();
					record_totalLength=45;
				}
			}
			renderTemplate(param)
		}
		$.ajax({
			url: URL.baseURL9 + 'jijing_questions/web_zhenti_mark',
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
						$(".jj-speak-list-js").each(function (){
							var height=$(this).height();
							if(!$(this).hasClass("jijing-speak-div")){
								if(height<=20){
									$(this).addClass("jj-speak-single");
									$(this).find("a.sim-a2").removeClass("sim-a2"); //一行未做过 移除换行控制css
									//$(this).find("span.rewrite-percentnew").removeClass("rewrite-percentnew");
									if($(this).find("span.rewrite-percentnew").length>0){
										$(this).removeClass("jj-speak-single").addClass("jj-speak-divnew");
									}
								}else{
									//$(this).addClass("jj-speak-divnew");
									$(this).find("span.fright").addClass("rewrite-font");
									$(this).find("a.sim-width510").addClass("sim-anew");
								}
							}
						});

						$("#side").show();
						record_totalLength=60;
					}
				}
				renderTemplate(param)
			}
			$.ajax({
				url: URL.baseURL9 + 'jijing_questions/web_yuce_mark',
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
						$(".jijing-speak-tab-js p.left25").each(function (){
							var height=$(this).height();
							if(!$(this).hasClass("jijing-speak-div")){
								if(height<=20){
									$(this).addClass("jj-speak-single");
									$(this).find("a.sim-a2").removeClass("sim-a2"); //一行未做过 移除换行控制css
								}else{
									$(this).addClass("jj-speak-divnew");
									$(this).find("span.fright").addClass("rewrite-font");
									$(this).find("a.sim-width510").addClass("sim-anew");
								}
							}
						});

						$(e.target).parent().addClass("active");
						record_totalLength=45;
					}
				}
				renderTemplate(param)
			}
			$.ajax({
				url: URL.baseURL9 + 'jijing_questions/web_zhenti_mark',
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
					//$("#recorderApp").css({"margin-top": "355px", "margin-left": "397px"});
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

	/**
	 * 操作信息提示框
	 * @param data
	 */
	var showErrorTip = function (data){
		if(data && data.content){
			$("#errorMsg").html(data.content);
		}
		$("#errorTip_sure").off("click").on("click",function (){
			$("#errorTip").modal("hide");
		});
		$("#errorTip").modal();
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
	}

	var toDoRender = function() {
		var param = {
			"tmplName": 'app/tmpl_todo',
			"tmplData": '',
			"afterRender": ''
		};
		renderTemplate(param)
	};

	/*********-------------------------------添加批改支付 开始---------------------*******************/
	/**
	 * 使用批改服务提示
	 */
	var useFullCouponTip = function (count){
				if(count>0){
					$("#scoreLackModalDialog .feedback-title").html("录音已保存，你有"+count+"张小马名师批改券，一次可使用1张，要使用吗？");
					$("#scoreLack_saved").attr("data-coupon",2).html("确定");
					$('#scoreLackModal').modal({
						backdrop: 'static'
					});
					var fn=function (e){
				if(questionTypeTag==3){
					$("#recorderApp").css({"margin-top": "470px"});
				}else{
					$("#recorderApp").css({"margin-top": "328px"});
				}
				$("#scoreLackModal").off("hidden.bs.modal",fn);
			}
			$("#scoreLackModal").on("hidden.bs.modal",fn);
		}
	}
	/**
	 * 使用优惠券提示
	 */
	var usePartCouponTip = function (count){
		if(count>0){
			$("#scoreLackModalDialog .feedback-title").html("录音已保存，名师口语批改1次需要60元，可使用1张价值40元的小马托福券，还需支付20元");
			$("#scoreLack_saved").attr("data-coupon",1).html("支付");

			$('#scoreLackModal').modal({
				backdrop: 'static'
			});
			var fn=function (e){
				if(questionTypeTag==3){
					$("#recorderApp").css({"margin-top": "470px"});
				}else{
					$("#recorderApp").css({"margin-top": "328px"});
				}
				$("#scoreLackModal").off("hidden.bs.modal",fn);
			}
			$("#scoreLackModal").on("hidden.bs.modal",fn);
		}
	}
	/**
	 * 全额支付提示
	 */
	var useFullPayment =function (){
		$("#scoreLackModalDialog .feedback-title").html("录音已保存，名师口语批改1次需要60元，确定要支付吗？");
		$("#scoreLack_saved").attr("data-coupon",0).html("支付");
		$('#scoreLackModal').modal({
			backdrop: 'static'
		});
		var fn=function (e){
			if(questionTypeTag==3){
				$("#recorderApp").css({"margin-top": "470px"});
			}else{
				$("#recorderApp").css({"margin-top": "328px"});
			}
			$("#scoreLackModal").off("hidden.bs.modal",fn);
		}
		$("#scoreLackModal").on("hidden.bs.modal",fn);
	}
	/**
	 * 获取产品优惠券信息
	 */
	var requestCouponInfo = function (){
		var _success = function (json){
			if(json.status==0){
				if(json.result && json.result.length>0){
					var countFullCoupon=0;
					var countPartCoupon=0;
					var hasFullCoupon=false;
					var hasPartCoupon=false;
					for(var i=0;i<json.result.length;i++){
						var item=json.result[i];
						if(item.couponId==1){
							hasPartCoupon=true;
							countPartCoupon=item.couponCount;
						}else if(item.couponId==2){
							hasFullCoupon=true;
							countFullCoupon=item.couponCount;
						}
					}
					if(hasFullCoupon){
						//使用批改服务
						useFullCouponTip(countFullCoupon);

					}else if(hasPartCoupon){
						//使用优惠券
						usePartCouponTip(countPartCoupon);
					}else{
						//全额支付
						useFullPayment();
					}
				}else{
					//全额支付
					useFullPayment();
				}
			}else{
				//全额支付
				useFullPayment();
			}
		}
		var url=URL.baseURL10+"order/myCoupon.action";
		$.ajax({
			url: url,
			data:{token:token,id:BaseFinal.CHONGCI_KOUYU_ID} ,
			type: 'POST',
			dateType:"JSON",
			headers: {
				"Authorization": token
			},
			success: _success
		});
	}

	/**
	 * 添加订单
	 * @param param
	 */
	var addOrder = function (param){
		if(param.id && param.answerId && token){
			$('#scoreLackModal').modal("hide");
			var couponStr="";
			if(param.couponId>0){
				couponStr=param.couponId+"_1";
			}
			var data={};
			data.token=token;
			data.id=BaseFinal.CHONGCI_KOUYU_ID;
			//1:精华口语批改，2：机经口语批改，3：机经写作批改，4：tpo综合口语批改，5：tpo综合写作批改
			data.answerId=param.answerId+"_"+(questionTypeTag==3 ? 4 : 2);
			if(couponStr){
				data.coupon=couponStr;
			}
			var orderNum=null;
			var _success = function (json){
				if(json.status==0 && json.result && json.result.orderInfo){
					orderNum=json.result.orderInfo.orderNum;
					var orderStatus=json.result.orderInfo.orderStatus;
					if(orderStatus==1){
						//免支付...
						//showErrorTip({content:"提交批改成功"});
						window.setTimeout(function (){
							jjUintDetail(currentQuestion);
						},500);

					}else{
						$('#scoreLackModal').modal("hide");
						window.setTimeout(function (){
							$("#payFail").attr("data-orderNum",orderNum);
							$("#paySuccess").attr("data-orderNum",orderNum);
							//$("#recorderApp").css({"margin-top": "-6000px"});
							$("#payModel").on("hidden.bs.modal",function (e){
								if(questionTypeTag==3){
									$("#recorderApp").css({"margin-top": "470px"});
								}else{
									$("#recorderApp").css({"margin-top": "328px"});
								}
							});
							$("#payModel").on("show.bs.modal",function (e){
								$("#recorderApp").css({"margin-top": "-6000px"});
								window.open("/shoppingcenter/html/pigai.html#"+orderNum,"blank");
							});
							$("#payModel").modal("show");
						},500);
					}

				}

			}
			var url=URL.baseURL10+"web/addCorrectOrder.action";
			$.ajax({
				url: url,
				data:data,
				type: 'POST',
				dateType:"JSON",
				async : false,
				headers: {
					"Authorization": token
				},
				success: _success
			});
			if(orderNum){

			}
		}
	}

	var getOrderStatus = function (orderNum){
		var status=-1
		var url=URL.baseURL10+"order/orderDetail.action";
		$.ajax({
			url: url,
			data: {
				token:token,
				id: orderNum
			},
			type: 'POST',
			dateType:"JSON",
			async : false,
			headers: {
				"Authorization": token
			},
			success: function (json){
				if(json.status==0){
					status=json.result.orderInfo.orderStatus;
				}
			}
		});
		return status;
	}
	/**
	 * 支付成功操作  跳转至结果页
	 */
	var paySuccessOpreation = function (e) {
		var orderNum=$(e.target).attr("data-orderNum");
		if(orderNum){
			var status=getOrderStatus(orderNum);
			var fn=function (e){
				jjUintDetail(currentQuestion);
				return;
				if(status==1){
					jjUintDetail(currentQuestion);
				}else{
					var fn1=function (e){
						$("#recorderApp").css({"margin-top": "-6000px"});
						$("#errorTip").off("show.bs.modal",fn1);
					}
					var fn2=function (e){
						if(questionTypeTag==3){
							$("#recorderApp").css({"margin-top": "470px"});
						}else{
							$("#recorderApp").css({"margin-top": "328px"});
						}
						$("#errorTip").off("hidden.bs.modal",fn2);
					}
					$("#errorTip").on("show.bs.modal",fn1);
					$("#errorTip").on("hidden.bs.modal",fn2);
					showErrorTip({content:"支付失败，请刷新后重试"});
				}
				$("#payModel").off("hidden.bs.modal",fn);
			}
			$("#payModel").on("hidden.bs.modal",fn);
			/*if(status==1){
				jjUintDetail(currentQuestion);

			}else{
				$("#payModel").modal("hide");
			}*/
		}
	}
	/**
	 * 支付失败操作  跳转至结果页
	 */
	var payFailOpreation = function (e){
		var orderNum=$(e.target).attr("data-orderNum");
		if(orderNum) {
			var status = getOrderStatus(orderNum);
			var fn=function (e){
				jjUintDetail(currentQuestion);
				return;
				if(status==1){
					jjUintDetail(currentQuestion);
				}else{
					var fn1=function (e){
						$("#recorderApp").css({"margin-top": "-6000px"});
						$("#errorTip").off("show.bs.modal",fn1);
					}
					var fn2=function (e){
						if(questionTypeTag==3){
							$("#recorderApp").css({"margin-top": "470px"});
						}else{
							$("#recorderApp").css({"margin-top": "328px"});
						}
						$("#errorTip").off("hidden.bs.modal",fn2);
					}
					$("#errorTip").on("show.bs.modal",fn1);
					$("#errorTip").on("hidden.bs.modal",fn2);
					showErrorTip({content:"支付失败，请刷新后重试"});
				}
				$("#payModel").off("hidden.bs.modal",fn);
			}
			$("#payModel").on("hidden.bs.modal",fn);
		}
	}
	var formatDate = function (dateTime, fmt) {
		var date=new Date(dateTime);
		var o = {
			"M+": date.getMonth() + 1, //月份
			"d+": date.getDate(), //日
			"h+": date.getHours(), //小时
			"m+": date.getMinutes(), //分
			"s+": date.getSeconds(), //秒
			"q+": Math.floor((date.getMonth() + 3) / 3), //季度
			"S": date.getMilliseconds() //毫秒
		};
		if (/(y+)/.test(fmt))
		{
			fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
		}
		for (var k in o){
			if (new RegExp("(" + k + ")").test(fmt))
			{
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			}
		}
		return fmt;
	};
	/*********-------------------------------添加批改支付 结束---------------------*******************/
	return {
		init: init
	}
})