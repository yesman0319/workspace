		
		var currentTestTimeStr;//当前时间字符串
		var testTimerID;//计时器
		var durationTime = 0;
		var recordCount = 0; //录音标识
		var record_length = 0; //录音时长
		var record_totalLength = 5;//总时长
		var record_status;//录音器状态
		var record_timer //计时器;
		
		//初始化flashRecorder
		initFlashWavRecorder();
		$("#start-live").click(function(){
			startTimer();
			$(this).hide().next().show();
		})
		$("#stop-live").click(function(){
			stopLive();
			$(this).hide().prev().show();
		})
		//输入框工具栏
		$(".tool-bar li").click(function(){
			var $this = $(this);
			var $id = $this.attr("id");
			$(".tool-bar li").removeClass("active");
			$this.addClass("active");
			if($id == "ed-record"){
				$(".mod").hide();
				$("#recorder").show();
			}else if($id == "ed-emoji"){
				$(".mod").hide();
				$("#emojis").show();
				$("#editor").show();
			}
		})
		//拖拽
		$(".fitem li").each(function(index,value){
			$(value).mousedown(function(){
				$(this).addClass("thisdraging");
			}).mouseup(function(){
				$(this).removeClass("thisdraging");
			}).draggable({
				cursor: "move",
				revert: true,
				containment: ".camp-content",//被约束的范围,
			});	
		})
		
		
		
		
		//点击开始录音
		$("#start").click(function(){
			startRecord();
		});
		
		//点击停止录音
		$("#recording").click(function(){
			stopRecord();
		});
		
		//点击播放录音
		$("#pause").click(function(){
			initRecordBtn("play");
			$("#recordTipP").hide();
			playRecord();
		});
		
		//点击停止播放
		$("#playing").click(function(){
			stopPlayRecord();
		});
		
		//重新录制
		$("#reRecord").click(function(){
			reRecord();
		});
		
		//保存录音
		$("#saveRecord").click(function(){
			saveRecord();
		});
		//开始计时
		function startTimer() {
			clearTimer();
			var fn = function() {
				if ($("#liveTimer").length <= 0) {
					console.log("not find target");
				}	
				if (!durationTime && durationTime<0) {
					durationTime = 1; //计算剩余的毫秒数
				} else {
					durationTime++;
				}
	
				var ts = durationTime;
				xm_spendTime = durationTime;
				//var dd = parseInt(ts / 60 / 60 / 24, 10); //计算剩余的天数
				var hh = parseInt(ts / 60 / 60 % 24, 10); //计算剩余的小时数
				var mm = parseInt(ts / 60 % 60, 10); //计算剩余的分钟数
				var ss = parseInt(ts % 60, 10); //计算剩余的秒数
				//dd = zeroFn(dd);
				hh = zeroFn(hh);
				mm = zeroFn(mm);
				ss = zeroFn(ss);
				currentTestTimeStr = hh + ":" + mm + ":" + ss;
				$("#liveTimer").html(currentTestTimeStr);
			};
			if (testTimerID) return;
			testTimerID = window.setInterval(fn, 1000);
			var date=new Date($.ajax({async: false}).getResponseHeader("Date"));
			xm_startTime=zeroFn(date.getFullYear())+"-"+zeroFn((date.getMonth()+1))+"-"+zeroFn(date.getDate())+" "+zeroFn(date.getHours())+":"+zeroFn(date.getMinutes())+":"+zeroFn(date.getSeconds());
			date=null;
		};
		function clearTimer() {
			durationTime = 0; //计时时间间隔（单位秒）
			currentTestTimeStr = '00:00:00'; //重置计时时间
			window.clearInterval(testTimerID);
			testTimerID = undefined;
		};
		function stopLive(){
			window.clearInterval(testTimerID);
		}
		function zeroFn(n){
			n=n<10?"0"+n:n;
			return n;
		};	
		function initRecordBtn(status) {
			var statusMapping={"default":"start","record":"recording","play":"playing","stop":"pause"}
			$("#recorder-box img").hide();
			$("#"+statusMapping[status]).show();
			if(status == "default"){
				$("#reRecord").attr("disabled","true").addClass("grey");
				$("#saveRecord").attr("disabled","true").addClass("grey");
			}
		}
		// 开始录音
		function startRecord(){
			$("#recordTotalLength").html(format_time(record_totalLength));
			var checkFlash=flashChecker();
			if(checkFlash.isInstall) {
				//开始录音，检测麦克风
				try {
					FWRecorder.record('content', recordCount + '-' + new Date().getTime() + '.wav');
				}catch(e){
					
				}
				if (FWRecorder.isMicrophoneAccessible()) {
					initRecordBtn("record");
				} else {
//					$("#recordTipP").show().html("flash正在初始化中");
				}
			}else{
				alert("请先安装flash");
			}
		};

		//停止录音
		function stopRecord(){
			if(FWRecorder &&  record_status=="recording"){
				try{
					FWRecorder.stopRecording('content');
				}catch(e){
					
				};
				initRecordBtn("stop");
				clearRecordTimer();
				resetPlayTimer();
				$("#reRecord").removeAttr("disabled").removeClass("grey");
				$("#saveRecord").removeAttr("disabled").removeClass("grey");
			}
		}
		//播放录音
		function playRecord(){
			if(FWRecorder){
				FWRecorder.playBack("content");
				playRecordTimer();
				initRecordBtn("play");
			}
		}
		//暂停录音播放
		function stopPlayRecord(){
			if(FWRecorder && record_status=="playing"){
				FWRecorder.stopPlayBack("content");
				clearRecordTimer();
				resetPlayTimer();
				initRecordBtn("stop");
			}
		}
		//播放录音结束
		function playEndRecord(){
			clearRecordTimer()
			initRecordBtn("stop");
			$("#recordTimer").html("00:00");
		}
		//重新录制
		function reRecord(){
			if(FWRecorder){
				if(record_status=="playing"){
					FWRecorder.stopPlayBack("content");
				}
				record_length=0; //重置录音长度
				resetPlayTimer();
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
			if(record_length > 0){
				window.setTimeout(function (){
					$("#recordTipP").hide()
					$("#recordTimerP").show();
				},1000);
			}else{
				$("#recordTipP").show().html("录音时长过短");
			}
			
		}

		/**
		 * 录音计时
		 */
		function startRecordTimer(){
			record_length=0;
			clearRecordTimer();
			var fn=function(){
				record_length++;
				$("#recordTimer").html(format_time(record_length));
				if(record_length >= record_totalLength){
					stopRecord();
				}
			}
			record_timer=window.setInterval(fn,1000);
		};
		//播放计时
		function playRecordTimer(){
			$("#recordTimerP").show();
			$("#recordTipP").hide();
			clearRecordTimer();
			if(record_length){
				var playRecord_length=0;
				resetPlayTimer();
				var fn=function(){
					playRecord_length++;
					$("#recordTimer").html(format_time(playRecord_length));
					if(playRecord_length>=record_length){
						$("#recordTimer").html("00:00");
						clearRecordTimer();
					}
				}
				record_timer=window.setInterval(fn,1000);
			}
		};

		function clearRecordTimer(){
			window.clearInterval(record_timer);
		}
		//重置播放计时
		function resetPlayTimer(){
			$("#recordTotalLength").html(format_time(record_length));
			$("#recordTimer").html("00:00");
		}
		/**
		 * 格式化时长
		 */
		function format_time(time){
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
		
		function initFlashWavRecorder(){
			var RECORDER_APP_ID = "recorderApp";
			var $level = $('.level .progress');
			var appWidth = 240;
			var appHeight = 160;
			var flashvars = {'upload_image': '../i/speak_save2.png'};
			var params = {vspace : "200px"};
			var attributes = {'id': RECORDER_APP_ID, 'name': RECORDER_APP_ID,style:'margin-top:-6000px;position:absolute;'};
			swfobject.embedSWF("../j/lib/flashwavrecorder/recorder.swf", "flashcontent", appWidth, appHeight, "11.0.0", "", flashvars, params, attributes);
			initRecordBtn("default");
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
						$("#recordTipP").show().html("请插入麦克风");
						$("#recorderApp").css({"margin-top": "-6000px"});
						record_status="no_microphone_found";
						break;
					case "microphone_connected":
						FWRecorder.isReady = true;
						break;

					case "microphone_user_request":
						FWRecorder.showPermissionWindow();
						$("#recorderApp").css({"margin-top": "40px", "margin-left": "-113px","z-index":"5"});
						break;

					case "permission_panel_closed":
						$("#recordTimerP").hide();
						$("#recordTipP").show().html("请再次点击开始录音");
						$("#recorderApp").css({"margin-top": "-6000px"});
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
						console.log(arguments);
						clearRecordTimer();
						var duration = arguments[2]; //录音时长
						record_length=Math.ceil(duration);
						if(record_length>0){						
							$("#recorderApp").css({"width":"140px","height":"40px","margin-top": "181px", "margin-left": "9px"});				
						}
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
						stopPlayRecord();
						window.setTimeout(function (){
							closeLoading();
							$("#recordTimerP").hide();
							$("#recordTipP").show().find("span").html("上传失败，请稍后再试");
							window.setTimeout(function (){
								$("#recordTimerP").show();
								$("#recordTipP").hide();
							},2000);
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
						$("#start_btn").show();
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
		
		//是否安装了flash
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