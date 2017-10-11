//(function(){
	var record_status = "default";//录音器状态
	var allImgArray = []; //存放所有图片的bigUrl;
	var currentVoiceId; //播放时当前的播放id;
	var isEditing = false;//直播中是否在编辑或发送内容;
	var renderMsgOrder = 1;//默认1,正序添加;0倒序添加;
	var timeStampMsgCount = 0;//记录两个显示时间消息之间消息的数量
	$(function(){
		Room.setRoomHeight();//初始化聊天窗口大小	
		FastClick.attach(document.body);//初始化fastclick;
		if(isLiving == 1 || isLiving == 0){//未开始或正在直播
			//降序拉取最新的消息,消息从头部添加到列表
			renderMsgOrder = 0;
			getAlbumJson(1);//初始化加载素材专辑;
//			Storage.countDurationTimer();
		}else{
			renderMsgOrder = 1;
			
		}
		live.getHistoryMsg();
		$(document).on("click","#upload-img",Send.imgMsg);//发送图片
		$(document).on("click","#sendInsertVideo",Send.videoMsg);//发送视频iframe
		$(document).on("click","#re-start-btn",Recorder.start);
		$(document).on("click","#re-stop-btn",Recorder.stop);
		$(document).on("click","#re-send-btn",Recorder.send);//发送录音
		$(document).on("click","#re-cancel-btn",function(){
			mui.confirm('确定要取消录制的语音吗','提示',['取消','确认'],function (e) {
				if (e.index == 1) {
					Recorder.cancel();
	            }
			},'div')
		});
		
		//图片预览
		$(document).on("click",".img-wrapper",previewImg);
		//音频播放
		$(document).on("click",".audioplayer-playpause",function(){
			var $thisPlayer = $(this).parent();
			var thisPlayerId = $thisPlayer.attr("id");
			var voiceUrl = $thisPlayer.data("src");
			var msgId = $thisPlayer.parents(".message-list").data("msgid");
			var sqlId = $thisPlayer.parents(".message-list").data("sqlid");
			var isRead = $thisPlayer.parents(".message-list").data("read");
			//点击某个播放器，第一次时执行init方法;
			if(currentVoiceId == undefined || currentVoiceId != thisPlayerId){
				VoicePlayer.init(thisPlayerId,voiceUrl);
			}
			if($thisPlayer.hasClass("voice-playing")){
				VoicePlayer.pause();
			}else{
				VoicePlayer.play(sqlId,isRead);
			}
			currentVoiceId = thisPlayerId;
		})
		//消息操作
		$(document).on("click",".message-list",function(e){
			var thisId = $(this).data("sqlid");
			if($(e.target).hasClass("fa-thumbs-up")){
				//点赞
				if($(e.target).parent().hasClass("yizan")){
					return;
				}else{
					live.topMsg(thisId);
				}
			}else if($(e.target).hasClass("revoke")){
				//撤回
				mui.confirm('确定要撤回此消息吗','提示',['取消','确认'],function (e) {
					if (e.index == 1) {
						var cancelObj = {
							"userType": userType,
							"userId": userId,
							"userName": userName,
							"avatar":avatar,
							"msgType": "CancelMsg",
							"content": {
								"extra": thisId
							}
						};
						Send.mqttSend(cancelObj);
		           	}
				},'div')
			}
		})
		
		//工具栏操作
		$(document).on("click","#tb-top",function(){
			Room.goTop();
		});
		$(document).on("click","#tb-bottom",function(){
			Room.goBottom();
		});
		$(document).on("click","#tb-operate",function(){
			new Mask(".live-page","rgba(0,0,0,.4)").show();
			$("#operate-panel").slideToggle(300);
		})
		$(document).on("click","#tb-personal",function(){
			mui.toast('该功能尚未开发');
		})
		
		//兼容ios遮挡输入框问题
		$(document).on("focus",".ed-text-wrapper textarea",function(){
			if(browser.versions.ios){
				Room.goBottom({
					callback:function(){
						setTimeout(function(){
							window.scrollTo(0, $('body').height());
						},150)
					}
				})
			}else{
				//安卓弹出键盘live-page缩小
				Room.setRoomHeight().goBottom();
			}
		});
		//底部tab点击
		$(".tab-bar li").click(function(){
			isEditing = true;
			var tabIndex = $(this).index();
			if(isLiving == 2){
				mui.toast('直播已结束');
				return;
			}
			Tab.setActive(tabIndex);
			Room.setRoomHeight().goBottom()
		});
		//视频按钮
		$(document).on("click","#insert-iframe",function(){
			$(".insertVideo").show();
		}).on("click",".cancelTipsBtn",function(){
			$(".insertVideo").hide();
		});
		//素材复选框
		$(document).on("click",".sucai-item",function(){
			var thisCheckBox = $(this);
			if(thisCheckBox.hasClass("checked")){
				thisCheckBox.removeClass("checked");
			}else{
				thisCheckBox.addClass("checked");
			}			
		})
		$(document).on("click","#selectAll",function(){
			var $checkbox = $(".sucai-item");
			var $this = $(this);
			if($this.hasClass("all")){
				$checkbox.removeClass("checked");
				$this.removeClass("all");
			}else{
				$checkbox.addClass("checked");
				$this.addClass("all");
			}			
		})
		//专辑列表
		$(document).on("click",".material-item",function(){
			$(".sucai-wrapper").show();
			var albumId = $(this).data("albumid");
			getSuCaiJson(albumId,1);
		})
		//素材发送
		$(document).on("click","#sucai-send-btn",function(){
			var _this = this;
			var $sucai = $(document).find(".sucai-item.checked");
			$.each($sucai,function(index,value){
				mui(_this).button("loading");
				var fileUrl = $(value).data("fileurl");
				var fileType = $(value).data("filetype");
				var fileName = $(value).find(".name").html();
				var fileSize = $(value).find(".size").html();
				var fileDuration = $(value).data("duration");
				var sucaiObj = {
					"userType": userType,
					"userId": userId,
					"userName": userName,
					"avatar":avatar,
					"content":{}
				}
				if(fileType == "mp3"){//音频
					sucaiObj.msgType = "Material_VoiceMsg";
					sucaiObj.content.url = fileUrl;
					sucaiObj.content.duration = fileDuration;
				}else if(fileType == "img"){//图片
					sucaiObj.msgType = "Material_ImgMsg";
					sucaiObj.content.smallUrl = fileUrl + "!/fw/200";
					sucaiObj.content.bigUrl = fileUrl;
				}else{//pdf
					sucaiObj.msgType = "PdfMsg";
					sucaiObj.content.size = fileSize;
					sucaiObj.content.url = fileUrl;
					sucaiObj.content.title = fileName;
				}
				Send.mqttSend(sucaiObj);
				$(value).removeClass("checked")
				if(index == $sucai.length - 1){
					 mui(_this).button('reset');
					 mui.toast('发送成功')
				}
			})
		})
		//素材页关闭按钮
		$("#sucai-close-btn").click(function(){
			$(".sucai-wrapper").hide();
		});

		//结束直播操作
		$("#finish-live").click(function(){
			mui.confirm('确定要结束直播吗','提示',['取消','确认'],function (e) {
				if (e.index == 1) {
					live.finish(function(){
						mui.toast('直播已结束');
						$("#operate-panel").slideToggle(300);
					})
					return;
	            }else{
	            	$("#operate-panel").slideToggle(300);
	            	return;
	            }
			},'div')
		})
	})
	//本地存储听课时长、次数等
	var Storage = (function(){
		var store = window.localStorage,
			follow_duration,//听课时长
			tt;//计时器
		function count(follow_duration){
			tt = setInterval(function(){
				follow_duration++;
				store.setItem("follow_duration",follow_duration);
			},1000)
		}
		return {
			countDurationTimer:function(){
				if(store.getItem("follow_duration")){
					count(store.getItem("follow_duration"));
				}else{
					count(0);
				}
			},
			getFollowDuration:function(){
				if(isLiving != 1){
					tt = null;
				}
				var duration = store.getItem("follow_duration");
			}
		}
	}())

	
	 
	
	//音频播放器		
	var VoicePlayer = (function(){
		var theAudio = document.getElementById("myAudio");
		var thePlayerBox,theBtn,theBar,
			barPlayed,barLoaded,currentTimer,
			durations,moveX,moveLength;
		//更新进度条
		function updatePlayedBar(){
			if(!theAudio.currentTime || theAudio.currentTime == undefined){
				return;
			}
			barPlayed.width( ( theAudio.currentTime / durations ) * 100 + '%' );
			mui.toast(theAudio.currentTime.toFixed(2)+"/"+theAudio.duration);
		};
		//拖动进度条
		function dragBarMove(e){
			if(!theAudio.currentTime || theAudio.currentTime == undefined){
				return;
			}
			moveX = e.touches[0].pageX;
			moveLength = moveX - theBar.offset().left;
			if(moveLength > theBar.width() || moveLength < 0) return;
			barPlayed.width(moveLength);
		};
		//更新加载进度条
		function updateLoadBar(){
			var timer = 0;
			var interval = setInterval( function(){
				if( theAudio.buffered.length < 1 ){
					timer += 50;
					if(timer >= 5000){
						clearInterval( interval );
						VoicePlayer.failed();
					}
					return true;
				} 
//				barLoaded.width( ( theAudio.buffered.end( 0 ) / durations ) * 100 + '%' );
				if( Math.floor( theAudio.buffered.end( 0 ) ) >= 0 ){
					theBtn.removeClass("fa-spinner fa-spin");
					clearInterval( interval );
				} 
			}, 50 );
		};
		//重置所有播放器
		function resetAllPlayer(){
			$(document).find(".audioplayer").removeClass("voice-playing")
					.find(".audioplayer-playpause>a").removeClass("fa-pause").addClass("fa-play");
			$(document).find(".audioplayer .audioplayer-bar-played").width(0);
			$(document).find(".audioplayer .audioplayer-bar").off("touchstart").off("touchmove").off("touchend");
		}
		//设置已读
		function setMsgRead(thisId){
			$.ajax({
				type:"post",
				url: basePath + "/liveMessage/read/",
				data:{
					"id":thisId,
					"userId":userId
				},
				dataType:"json",
			}).done(function(message){
				console.log(message);
				thePlayerBox.parent().addClass("isReaded");
			}).fail(function(status){
				console.log(status);
			});
		}
		return{
			init:function(ele,src){
				var _this = this;
				if(!ele || !src){
					return;
				}
				thePlayerBox = $("#"+ele);
				theBtn = thePlayerBox.find(".audioplayer-playpause>a");//开始暂停按钮;
				theBar = thePlayerBox.find(".audioplayer-bar");//拖动的进度条dom;
				barPlayed = thePlayerBox.find(".audioplayer-bar-played");//已走的进度;
				barLoaded = thePlayerBox.find(".audioplayer-bar-loaded");//加载的进度条;
				currentTimer = thePlayerBox.find(".audioplayer-time-current");//当前的播放时间显示ele;
				durations = thePlayerBox.data("duration");//音频时长
				resetAllPlayer();
				theAudio.setAttribute("src",src);
				updateLoadBar();
				theBtn.removeClass("fa-play").addClass("fa-spinner fa-spin");
				theBar.on("touchstart",function(e){
					theAudio.removeEventListener( 'timeupdate', updatePlayedBar);
					currentTimer.show();
				}).on("touchmove",function(e){
					e.preventDefault();
					dragBarMove(e);
				}).on( 'touchend', function(e){
					currentTimer.hide();
					theAudio.currentTime = ( durations *  moveLength / theBar.width() ).toFixed(1);
					theAudio.addEventListener( 'timeupdate', updatePlayedBar);
				});
				theAudio.addEventListener("ended",function(){
					theAudio.pause();
					_this.pause();
				});
				theAudio.addEventListener( 'timeupdate', updatePlayedBar);
				return this;
			},
			play:function(sqlId,isRead){
				if(theBtn.hasClass("fa-times-circle")){
					return;
				}
				if(sqlId && isRead == 0){
					setMsgRead(sqlId);
				}
				thePlayerBox.addClass("voice-playing");
				theBtn.addClass("fa-pause").removeClass("fa-play");
				theAudio.play();
				return this;
			},
			pause:function(){
				thePlayerBox.removeClass("voice-playing");
				theBtn.removeClass("fa-pause").addClass("fa-play");
				theAudio.pause();
				return this;
			},
			failed:function(){
				theBtn.removeClass("fa-spinner fa-spin").addClass("fa-times-circle");
				return this;
			}				
		}
	}());
	//时间格式化
	function secondsToTime(secs){
		if(secs > 60){
			var minutes = Math.floor( secs % 3600 / 60 ), seconds = Math.ceil( secs % 3600 % 60 );
			return ( minutes+"'")  + ( seconds + "''");
		}else{
			return Math.ceil(secs) + "''";
		}
	};
	//图片预览
	function previewImg(){
		var src = $(this).parent().data("url");
		wx.previewImage({
		    current: src, // 当前显示图片的http链接
		    urls: allImgArray // 需要预览的图片http链接列表
		});
	}
	//录音模块
	var Recorder = (function(){
		var voiceIdUrl = null;
		var record_length = 0; //录音时长
		var record_totalLength = 60;//限定时长
		var record_timer //计时器;
		var that = this;
		//设置按钮状态样式
		window.setRecorderBtn = function(status){
			var allBtns = $(".re-control-btns");
			var statusMap = {
				"default" : "#re-start-btn",
				"start" : "#re-stop-btn",
				"stop" : "#re-send-btn",
				"sending" : "#re-sending-btn"
			}
			allBtns.hide();
			if(status == "default"){
				$("#re-tips").hide();
				$("#re-cancel-btn").hide();
			}else{
				$("#re-tips").show();
				$("#re-cancel-btn").show();
			}
			$(statusMap[status]).show();
		}
		//开始录音
		function startRecordTimer(){
			clearRecordTimer();
			record_length = 0;
			$("#re-tips").html("正在录音(点击上方取消)");
			var fn=function(){
				record_length++;
				$("#re-timer").html(format_time(record_length)+"s");
				if(record_length >= record_totalLength){
					Recorder.stop().send();	
				}
			}
			record_timer=window.setInterval(fn,1000);
		};
		//停止录音
		function stopRecord(){
			clearRecordTimer();
			$("#re-tips").html("点击发送录音");
			wx.stopRecord({
			    success: function (res) {
		        	voiceIdUrl = res.localId;
			   }
			});
		}
		//重置录音计时
		function resetPlayTimer(){
			clearRecordTimer();
			$("#re-timer").html("0s");
		}
		//清楚计时器
		function clearRecordTimer(){
			window.clearInterval(record_timer);
		}
		return{
			start : function(){
				wx.startRecord({
					success:function(){
						record_status = "start";
						setRecorderBtn(record_status);
						startRecordTimer();
					},
					fail:function(){
						return;
					}
				});
				console.log(status);
			},
			stop : function(){
				if(record_length <=1){
					mui.toast('录音时间太短!');
					return;
				}else{
					record_status = "stop";
					stopRecord();
				}
				setRecorderBtn(record_status);
				return this;
			},
			cancel : function(){
				record_status = "default";
				wx.stopRecord();
				setRecorderBtn(record_status);
				resetPlayTimer();
				return this;
			},
			send : function(){
				if(record_status == "sending"){
					return;
				}
				record_status = "sending";
				setRecorderBtn(record_status);
				$("#re-tips").html("正在转码，请稍等");
				wx.uploadVoice({
				    localId: voiceIdUrl, // 需要上传的音频的本地ID，由stopRecord接口获得
				    isShowProgressTips: 1, // 默认为1，显示进度提示
			        success: function (res) {
			       		var voiceObj = {
							"userType": userType,
							"userId": userId,
							"userName": userName,
							"avatar":avatar,
							"msgType": "VoiceMsg",
							"content": {
								"mediaId": res.serverId // 返回音频的服务器端ID,
							}
						}
			       		Send.mqttSend(voiceObj);
						resetPlayTimer();
				    }
				});
			},
			init : function(){
				record_status = "default";
				setRecorderBtn(record_status);
			}
		}
	}())

	//发送消息
	var Send = (function(){
		return{
			textMsg:function(){
				if(userType == 0){
					//观众禁言
					$.ajax({
						url:basePath +"/liveroom/student/getslient/"+MQTT_config.roomId+"/"+MQTT_config.courseId+"/"+MQTT_config.topicId,
						type:"get",
						async:false,
						dataType:"json"
					}).done(function(data){
						if(data.status == 1){
							if($(".audience-editor").data("status") == "1"){
								$(".ed-text-wrapper").find("#sendText").removeClass("mui-disabled")
								.attr("onclick","Send.textMsg()").attr("placeholder","请输入要发送的内容~");
								$(".audience-editor").prev().attr("data-status","1").removeAttr("disabled");
							}
							textFunc();
						}else if(data.status == 0){
							mui.toast('抱歉，你已经被禁言');
							$(".audience-editor").attr("data-status","0");
							$(".ed-text-wrapper").find("#sendText").addClass("mui-disabled")
							.removeAttr("onclick").prev().attr("placeholder","禁言中...").attr("disabled",true).val("");
							return;
						}else if(data.status == 3){
							mui.toast('直播已结束');
							$(".audience-editor").attr("data-status","0");
							$(".ed-text-wrapper").find("#sendText").addClass("mui-disabled")
							.removeAttr("onclick").prev().attr("placeholder","直播已结束").attr("disabled",true).val("");
						}
					});
				}else{
					textFunc();
				}
				function textFunc(){
					var textArea = $(".ed-text-wrapper").find("textarea");
					var textVal = textArea.val();
					if(textVal.replace(/(^\s+)|(\s+$)/g,"") == ""){
						mui.toast('消息不能为空');
						return false;
					}else if(textVal.getlen() >= 1000){
						mui.toast('字符长度不能超过1000');
						return false;
					}else{
						textVal = html_encode(textVal);//转义html字符
						var textObj = {
							"userType": userType,
							"userId": userId,
							"userName": userName,
							"avatar":avatar,
							"msgType": "txtMsg",
							"content": {
								"text": textVal,
								"extra": ""
							}
						};
						Send.mqttSend(textObj);
						textArea.val("");
					}
				}
			},
			imgMsg:function(){
				wx.chooseImage({
				    success: function (res) {
				       	var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
				        syncUploadImg(localIds);
				    }
				});
				function syncUploadImg(localIds){
					var localId = localIds.pop();
					var smallUrl,bigUrl;
					wx.uploadImage({
						localId: localId,
						isShowProgressTips: 1,
						success: function (res) {
							var imgObj = {
								"userType": userType,
								"userId": userId,
								"userName": userName,
								"avatar":avatar,
								"msgType": "ImgMsg",
								"content": {
								    "mediaId" : res.serverId
								}
							}
							Send.mqttSend(imgObj);
							//其他对serverId做处理的代码
							if(localIds.length > 0){
								syncUploadImg(localIds);
							}
						}
					});
				};	
			},
			videoMsg:function(){
				var iframeVal = $("#insertVideoText").val();
				if(iframeVal.replace(/(^\s+)|(\s+$)/g,"") == ""){
					mui.toast('代码不能为空');
					return false;
				}else if(!/^(<iframe).*(<\/iframe>)$/.test(iframeVal)){
					mui.toast('只能为优酷腾讯的通用代码');
					return false;
				}else{
					var videoSrc = $(iframeVal).attr("src");
					var videoObj = {
						"userType": userType,
						"userId": userId,
						"userName": userName,
						"avatar":avatar,
						"msgType": "VideoMsg",
						"content": {
							"extra": videoSrc
						}
					};
					Send.mqttSend(videoObj);
					$("#insertVideoText").val("");
					$(".insertVideo").hide();
				}
			},
			mqttSend:function(msgObj){
				//正在发送的消息 判断时间显示
				var preTime = $(document).find(".message-list:last").data("createtime");
				if(live.msgIsShowTime(new Date().getTime(),preTime)){
					msgObj.isShowTime = 1;
					timeStampMsgCount = 0;
				}else{
					if(timeStampMsgCount > 9){//两个显示时间的消息之间超过9条就添加时间
						msgObj.isShowTime = 1;
						timeStampMsgCount = 0;
					}else{
						msgObj.isShowTime = 0;
					}
				}
				msgObj = Base64.encode(JSON.stringify(msgObj));
				var message = new Paho.MQTT.Message(msgObj);//set body
	       		message.destinationName = MQTT_config.topic_a;// set topic
				mqtt.send(message);
			}
		}
		
	}());
	
	//获取滚动总高度
	function getScrollHeight(inner,wrapper){
		return Math.floor($(inner).outerHeight() - $(wrapper).outerHeight());
	}
	
	//窗口动态变化
	var Room = (function(){
		var roomCfg = {
			wrapper : ".live-room",
			inner:".message-wrapper",
			footer:".liveroom-edit-footer",
			callback:null
		};
		//内容大小变化时;
		$(".message-main").resize(function(){	
			if(isEditing){
				Room.goBottom();
			}
		});
		//直播中最底部距离可视区大于半个body距离时，就不执行自动下滚
		$(".live-room").on("scroll",function(){
			var height = getScrollHeight(".message-wrapper",".live-room");
			var topY = $(this).scrollTop();
			var bodyHeight = $("body").height();
			if(topY + bodyHeight/2 >= height && isLiving != 2){
				isEditing = true;
			}else{
				isEditing = false;
			}
		})
		//回到顶部
		function goTop(param){
			roomCfg = $.extend(roomCfg,param);
			var topY = $(roomCfg.inner).offset().top;
			if(topY >= 0){
				mui.toast('已经是最顶部了');
			}else{
				$(roomCfg.wrapper).animate({scrollTop: '0px'}, 300);
				setTimeout(function(){
					roomCfg.callback && roomCfg.callback();
				},300)
				emptyCall();
			}
			return this;
		};
		//回到底部
		function goBottom(param){
			roomCfg = $.extend(roomCfg,param);
			var height = getScrollHeight(roomCfg.inner,roomCfg.wrapper);
			$(roomCfg.wrapper).animate({scrollTop: height +'px'}, 300);
			setTimeout(function(){
				roomCfg.callback && roomCfg.callback();
				emptyCall();
			},300)
			return this;
		};
		//回到指定的节点位置
		function goTarget(target){
			if(target != undefined){
				var move = $(target).offset().top;
				//调整高度至窗口中间
				move -= $(".live-room").outerHeight()/3;
				$(roomCfg.wrapper).animate({scrollTop: move +'px'}, 100);
			}
			return this;
		}
		//动态设置消息窗口的高度
		function setRoomHeight(param){
			roomCfg = $.extend(roomCfg,param);
			var footerHeight = $(roomCfg.footer).outerHeight();//底部栏的高度
			var totalHeight = $("body").height();//body内容高度；
			$(roomCfg.wrapper).height(totalHeight - footerHeight);//设置直播窗口高度
			roomCfg.callback && roomCfg.callback();
			emptyCall();
			return this;
		};
		function emptyCall(){
			if(roomCfg.callback){
				roomCfg.callback = null;
			}
		}
		return {
			goTop:goTop,
			goBottom:goBottom,
			goTarget:goTarget,
			setRoomHeight:setRoomHeight
		}
	}());
	//底部切换模块
	var Tab = (function(){
		var tabCfg = {
			item : ".host-ed-tab",
			itemContent:".host-tab-item",
			callback:null
		}
		//点击active效果
		function setActive(index,param){
			tabCfg = $.extend(tabCfg,param);
			$(tabCfg.item).removeClass("active").eq(index).addClass("active");
			$(tabCfg.itemContent).hide().eq(index).show();
			if($(tabCfg.item).eq(index).hasClass("host-ed-tab")){
				new Mask(".live-page");
				if(index == 1){
					//$(tabCfg.itemContent).eq(index).find("textarea").focus();
				}
			}
		};
		//点击上方重置窗口样式
		function reset(param){
			if(record_status != "default"){
				return;
			}
			tabCfg = $.extend(tabCfg,param);
			$(tabCfg.item).removeClass("active");
			$(tabCfg.itemContent).hide();
			Room.setRoomHeight();
		};
		return{
			setActive:setActive,
			reset:reset
		}
	}());
	//聊天窗口遮罩层
	function Mask(outer,bgc){
		var that = this;
		this.tpl = $('<div id="live-mask">');
		this.outer = outer;
		$(this.outer).append(this.tpl);
		this.show = function(){
			if(bgc){
				that.tpl.css("background",bgc);
			}
		};
		this.tpl.on("click",function(){
			if(record_status != "default"){
				mui.confirm('确定要取消录制的语音吗','提示',['取消','确认'],function (e) {
					if (e.index == 1) {
						Recorder.cancel();
						record_status = "default";
		            } else {
//		            	record_status = "defalut";
		            	return;
		            }
				},'div')
			}else{
				isEditing = false;
				Tab.reset();
				$("#operate-panel").slideUp(300);
				that.tpl.remove();
			}
			
		})
	}
	
	function timeTransform(tmpTime) {
		//判断日期格式转时间戳
		tmpTime = /[-:]/gi.test(tmpTime)?Date.parse(tmpTime.replace(/-/gi, "/")):tmpTime;
		var minute = 1000 * 60;
		var hour = minute * 60;
		var day = hour * 24;
		var ansTimeDifference=0;//记录时间差
		var nowDay = new Date().getDate()//获取当前为哪一日;
		var tmpTimeDay =new Date(tmpTime).getDate()//获取传入的时间为那一日;
		var tmpTimeDifference = new Date().getTime() - tmpTime;//计算当前与需要计算的时间戳的间隔
		var DifferebceWeek = (tmpTimeDifference / (7 * day));//进行周取整
		var DifferebceDay = (tmpTimeDifference / day);//进行天取整
		if(DifferebceWeek >= 1) {
			//大于一星期,直接返回 yyyy-mm-dd hh:mm:ss
			ansTimeDifference = getMyTime(tmpTime,"ymdhms");
		} else if (DifferebceDay >= 1) {
			//大于一天小于一星期 返回mm-dd hh:mm:ss
			ansTimeDifference = getMyTime(tmpTime,"mdhms");
		} else{
			//小于一天但天已经为第二天;
			if(nowDay != tmpTimeDay){
				ansTimeDifference = getMyTime(tmpTime,"mdhms");
			}else{
				ansTimeDifference = getMyTime(tmpTime,"hms");
			}
		}
		return ansTimeDifference;
	}
	//构造消息体
	function Live(){
		this.cfg = {
			msgType:null,  //txtMsg||VoiceMsg||ImgMsg||PdfMsg||Material_VoiceMsg||Material_ImgMsg||CancelMsg,
			userId: null,
			userName:null,
			userType:0, //1host || 0audience;
			topicId: null,
			msgTime:"",
			isShowTime:0,
		  	msgId:null,
		  	avatar: "http://www.baidu.com/avatar.jpg",
		  	id: null,
		  	top:0,
		  	cancel:0,
		  	read:0,
			textMsg:{
				text:""
			},
			imgMsg:{
				smallUrl: "#",
		    	bigUrl: "#"
			},
			audioMsg:{
				url:"#",
				duration:null,
				isRead:0
			},
			fileMsg:{
		    	cover: "/img/chatroom/pdf.jpg",
		    	size: null,
		    	title: "pdf",
		    	url: "#"
			},
			videoMsg:{
				extra:""
			},
			callback:null,
		};
		this.order = 1;//默认1正序添加,0倒序添加;
//		this.init();
	};
	
	Live.prototype = {
		buildMessage:function(param){
			var _this = this,
				$message;
			param = $.extend(true,this.cfg,param); //深度拷贝
			if(param.userType == 0){
				$message = $(
					'<section class="message-list audience-list" data-createtime='+param.msgTime+' data-read='+param.read+' data-userid='+param.userId+' data-sqlid='+param.id+' data-msgid='+param.msgId+'>'+
					'	<article class="timer-tips">'+timeTransform(param.msgTime)+'</article>'+
					'	<img class="avatar" src='+param.avatar+'>'+
					'	<div class="side-part">'+
					'		<div class="nickname">'+param.userName+'</div>'+
					'		<div class="content type-text">'+
					'			<p class="text">'+param.textMsg.text+'</p>'+
					'		</div>'+
					'	</div>'+
					'</section>'
				);
			}else{
				$message = $(
					'<section class="message-list host-list" data-createtime='+param.msgTime+' data-read='+param.read+' data-userid='+param.userId+' data-sqlid='+param.id+' data-msgid='+param.msgId+'>'+
					'	<article class="timer-tips">'+timeTransform(param.msgTime)+'</article>'+
					'	<img class="avatar" src='+param.avatar+'>'+
					'	<div class="nickname">'+param.userName+'<mark>主讲人</mark></div>'+
					'</section>'
				);
				if(param.msgType == "txtMsg"){
					//匹配是否有http链接
					var reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
					var ptext = param.textMsg.text
					if(reg.test(ptext)){
						ptext = ptext.replace(reg,"<a href='$1$2'>$1$2</a>");
					}
				 	$(
						'	<div class="content type-text">'+
						'		<p class="text">'+ptext+'</p>'+
						'	</div>'
					).appendTo($message);
				}else if(param.msgType == "VoiceMsg" || param.msgType == "Material_VoiceMsg"){
					$(
						'	<div class="content type-audio">'+
						'		<div id="voice'+param.msgId+'" class="audioplayer" data-duration='+param.audioMsg.duration+' data-src='+param.audioMsg.url+'>'+
						'			<div class="audioplayer-playpause" title="">'+
						'				<a class="fa fa-play" href="#"></a>'+
						'			</div>'+
						'			<div class="audioplayer-bar">'+
						'				<div class="audioplayer-bar-loaded"></div>'+
						'				<div class="audioplayer-bar-played">'+
						'					<div class="audioplayer-time audioplayer-time-current">0\'\'</div>'+
						'				</div>'+
						'			</div>'+
						'			<div class="audioplayer-time audioplayer-time-duration">'+secondsToTime(param.audioMsg.duration)+'</div>'+
						'		</div>'+
						'		<b class="listen-mark"></b>'+
						'	</div>'
					).appendTo($message);
					if(parseInt(param.read)){
						$message.find(".type-audio").addClass("isReaded");
					}
				}else if(param.msgType == "ImgMsg" || param.msgType == "Material_ImgMsg"){
					$(
						'	<div class="content type-img" data-url='+param.imgMsg.bigUrl+'>'+
						'		<div class="img-wrapper">'+
						'			<img src='+param.imgMsg.smallUrl+' />'+
						'		</div>'+
						'	</div>'
					).appendTo($message);
				}else if(param.msgType == "PdfMsg"){
					$(
						'<div class="content type-file" data-download="">'+
						'	<a class="file-link" href='+param.fileMsg.url+'>'+
						'		<main>'+
						'			<img class="file-cover" src='+param.fileMsg.cover+' />'+
						'			<div class="file-right">'+
						'				<p class="file-title">'+param.fileMsg.title+'</p>'+
						'				<p class="file-size">'+param.fileMsg.size+'</p>'+
						'			</div>'+
						'		</main>'+
						'		<span class="download-tips">点击预览</span>'+
						'	</a>'+
						'</div>'
					).appendTo($message);
				}else if(param.msgType == "VideoMsg"){
					$(
						'	<div class="content type-video">'+
						'		<iframe class="viframe" src='+param.videoMsg.extra+' frameborder="0" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>'+
						'	</div>'
					).appendTo($message);
				}else{
					console.log("参数：消息type错误");
					return;
				}
			}
			//添加消息操作功能
			var $operation = $(
				'	<div class="operation">'+
				'		<p class="zan">'+
				'			<i class="fa fa-thumbs-up"></i>'+
				'			<span class="count">'+param.top+'</span>'+
				'		</p>'+
				'	</div>');
			if(param.userId == userId){
				$('<a class="revoke">撤回</a>').appendTo($operation);
			}
			$message.find(".content").append($operation);
			if(!param.isShowTime){
				$message.find(".timer-tips").text("");
			}
			if(renderMsgOrder){
				$(".message-main").append($message);
			}else{
				$(".message-main").prepend($message);
			}
			//是否有赞
			if(parseInt(param.top)){
				$message.find(".zan").addClass("top");
				if(parseInt(param.istop)){//自己是否点过
					$message.find(".zan").addClass("yizan");
				}
			}
			param.callback && param.callback();
			return this;
		},
		getHistoryMsg:function(ajaxCfg){//历史消息
			var that = this;
			var defaults = {
				page : 1,
				pageSize : 20,
				order : isLiving!=2 ? "DESC" : "ASC",//默认id升序，  直播中用降序DESC(获取最近的消息)
			}
			ajaxCfg = $.extend(true,defaults,ajaxCfg);
			$.ajax({
				type:"get",
				dataType : "json",
				url:basePath+"/liveMessage/search",
				data:{
					"topicId":MQTT_config.topicId,
					"userId":userId,
					"page":ajaxCfg.page,
					"pageSize":ajaxCfg.pageSize,
					"order":ajaxCfg.order
				},
				async:false,
				success:function(data){
					if(data.nextUrl != ""){
						//取消上次的绑定事件
						mui(".live-room").off();
						ajaxCfg.page++;
						if(!renderMsgOrder){//如果后面还有数据 && 下拉降序加载最近的消息(直播中)
							mui(".live-room").on("swipedown",'.message-wrapper',function(e){
								var offSetTop = $(".message-wrapper").offset().top;
							  	if(offSetTop+100 >= 0){
							  		renderMsgOrder = 0;
							  		that.getHistoryMsg(ajaxCfg);
							  	}
							});
						}else{//如果后面还有数据 && 上拉升序加载最早的消息(直播结束)
							mui(".live-room").on("swipeup",'.message-wrapper',function(e){
								var offSetTop = $(".message-wrapper").offset().top;
							  	if((-offSetTop+100) >= getScrollHeight(".message-wrapper",".live-room")){
							  		that.getHistoryMsg(ajaxCfg)
							  	}
							});
						}
					}else{
						mui(".live-room").off();
					}
					for(var j=0;j<data.items.length;j++){
						renderMessage(data.items[j]);
						//直播中下拉加载历史的时候，加载完毕后定位
						if(data.previousUrl != "" && j == data.items.length - 1){
							if(renderMsgOrder == 0){
								var targetid = $(".message-main").find(".message-list").eq(j).data("msgid");
								Room.goTarget(".message-list[data-msgid="+targetid+"]");
							}
						}
					}
				},
				complete:function(){
				},
				error:function(jqXHR,textStatus,errorThrown){
					console.log("jqXHR="+jqXHR+";textStatus="+textStatus+";errorThrown="+errorThrown);
				}
			});
		},
		revokeMsg:function(id,thisMsgUserId,thisMsgUserName){//消息撤回
			$.ajax({
				type:"delete",
				url: basePath + "/liveMessage/"+id,
				dataType:"json",
				async:false
			}).done(function(data){
				if(thisMsgUserId == userId){
					$(".message-list[data-sqlid="+id+"]").remove();
				}else{
					var removeMsgText = $('<section class="revoketips" data-id='+id+'>'+thisMsgUserName+'&nbsp;撤回了一条消息~</section>')
					$(".message-list[data-sqlid="+id+"]").replaceWith(removeMsgText);
				}
			}).done(function(data){
				mui.toast('消息已撤回');
			}).fail(function(error){
				console.log("请求失败"+error.status);
			})
		},
		topMsg:function(id){//消息点赞
			$.ajax({
				type:"post",
				url: basePath + "/liveMessage/top?id="+id,
				dataType:"json",
				async:false
			}).done(function(data){
				$(".message-list[data-sqlid="+id+"]").find(".zan").addClass("yizan");
				var countNum = parseInt($(".message-list[data-sqlid="+id+"]").find(".count").text()); 
				$(".message-list[data-sqlid="+id+"]").find(".count").text(countNum+1);
			}).fail(function(error){
				console.log("请求失败"+error.status);
			})		
		},
		msgIsShowTime:function(nowTime,preTime){//消息间隔时长
			if(preTime=="" || preTime==null){
				return true;
			}else{
				var interval = nowTime - preTime;
				if(interval >= 60000){//大于一分钟
					return true;
				}else{
					return false;
				}
			}
		},
		finish:function(callback){//结束直播
			$.ajax({
				url:basePath + "/liveroom/teacher/endtopic/" + MQTT_config.topicId,
				type:"get",
				dataType:"json",
				async:false
			}).done(function(data){
				console.log(data.message);
				if(data.status == 0){
					isLiving = 2;
				}
			}).done(function(){
				if(callback){
					callback();
				}
			})
		},
		init:function(data){
			return this;
		}
	}
	var live = new Live();
	//渲染消息列表
	function renderMessage(receiveMsg){
	    var renderParam = {};//接收消息对象
		renderParam.userType = receiveMsg.userType;
		renderParam.userId = receiveMsg.userId;
		renderParam.userName = receiveMsg.userName;
		renderParam.msgType = receiveMsg.msgType;
		renderParam.avatar = receiveMsg.avatar || avatar;
		renderParam.msgTime = receiveMsg.msgTime;
		renderParam.msgId = receiveMsg.msgId;
		renderParam.read = receiveMsg.read;
		renderParam.id = receiveMsg.id;
		renderParam.top = receiveMsg.top;
		renderParam.istop = receiveMsg.istop;
		renderParam.cancel = receiveMsg.cancel;
		renderParam.isShowTime = receiveMsg.isShowTime;
		if(receiveMsg.msgType == "CancelMsg"){
			renderParam.cancelId = receiveMsg.content.extra;
			live.revokeMsg(renderParam.cancelId,userId,userName);
			return;
		}else if(receiveMsg.msgType == "VoiceMsg" || receiveMsg.msgType == "Material_VoiceMsg"){
			record_status = "default";
			setRecorderBtn(record_status);//初始化录音器
			renderParam.url = receiveMsg.content.url;
			renderParam.duration = receiveMsg.content.duration;
		}else if(receiveMsg.msgType == "ImgMsg" || receiveMsg.msgType == "Material_ImgMsg"){
			renderParam.callback = function(){
				if(isEditing){
					//延迟400图片渲染出来后执行
					setTimeout(function(){
						Room.goBottom();
					},400)
				}
			}
			renderParam.smallUrl = receiveMsg.content.url+"!/fw/200";
			renderParam.bigUrl = receiveMsg.content.url;
			if(renderMsgOrder == 1){
				allImgArray.push(renderParam.bigUrl);//push到所有图片数组
			}else{
				//直播中加载的历史消息添加到数组的头部
				allImgArray.unshift(renderParam.bigUrl);
			}
		}else if(receiveMsg.msgType == "PdfMsg"){
			renderParam.size = receiveMsg.content.size;
			renderParam.title = receiveMsg.content.title;
			renderParam.pdfUrl = receiveMsg.content.url;
		}else if(receiveMsg.msgType == "VideoMsg"){
			renderParam.videoUrl = receiveMsg.content.extra;
		}else{
			renderParam.content = receiveMsg.content.text;
		}
		new Live().buildMessage({
			userType:renderParam.userType,
			userId:renderParam.userId,
			msgTime:renderParam.msgTime,
		  	msgId: renderParam.msgId,
		  	id:renderParam.id,
		  	read:renderParam.read,
		  	top:renderParam.top,
		  	cancel:renderParam.cancel,
		  	avatar: renderParam.avatar,
			msgType:renderParam.msgType,  //txtMsg||VoiceMsg||ImgMsg||PdfMsg||Material_VoiceMsg||Material_ImgMsg,
			userName:renderParam.userName,
			istop:renderParam.istop,
			isShowTime:renderParam.isShowTime,
			textMsg:{
				text:renderParam.content
			},
			audioMsg:{
				url:renderParam.url,
				duration:renderParam.duration,
				isRead:renderParam.read
			},
			imgMsg:{
				smallUrl: renderParam.smallUrl,
		    	bigUrl: renderParam.bigUrl
			},
			fileMsg:{
		    	size: renderParam.size,
		    	title: renderParam.title,
		    	url: renderParam.pdfUrl
			},
			videoMsg:{
				extra:renderParam.videoUrl
			},
			callback:renderParam.callback
		}) 
	};
	//页面初始化加载loading
	function wyyFakeLoader(){
		setTimeout(function(){
			$(".wyyLoading").hide();
		},1200);
	}
	function getAlbumJson(current_page){
		if(current_page == undefined || current_page == null){
			current_page = 1;
		}
		var tpl = "";
		$.ajax({
			type:"get",
			url: basePath + "/materialAlbum",
			async:false,
			data:{
				"current_page":current_page,
			},
			success:function(data){
				var data = $.parseJSON(data);
				var curPage = data.current_page,
					totalPage = data.total_page;
				if(data.materialAlbumList.length){
					$("#material-tips").hide();
					for(var i=0;i<data.materialAlbumList.length;i++){
						var materialAlbumlJson = data.materialAlbumList[i];
							tpl += 	'<li class="material-item"  data-sortNum='+materialAlbumlJson.sortNum+' data-albumId='+materialAlbumlJson.id+'>'+
									'	<div class="cover">'+
									'		<img src="/img/chatroom/course-bg.jpg" alt="专辑封面" />'+
									'		<span class="create-time">'+getMyTime(materialAlbumlJson.createTime,"ymd")+'</span>'+
									'	</div>'+
									'	<div class="material-info">'+
									'		<span class="material-title">'+materialAlbumlJson.albumName+'</span>	'+
									'		<div><span class="create-preson">'+materialAlbumlJson.createPersion+'</span></div>'+
									'	</div>'+
									'</li>';
					}
					$(".ed-material-box").append(tpl);
				}
				if(curPage < totalPage){
					curPage++;
					$("#loadMoreAlbum").show();
					$(document).on("click","#loadMoreAlbum",function(){
						if(curPage >= totalPage){
							$(this).hide();
						}
						getAlbumJson(curPage);
					})
				}
			}
		})		
	}
	function getSuCaiJson(albumId,pages){
		$.ajax({
			type:"get",
			url:basePath + "/material",
			dataType:"json",
			data:{
				"albumId" : albumId,
				"current_page" : pages
			}
		}).done(function(data){
			var curPage = data.current_page,
				totalPage = data.total_page;
			if(data.materialList.length){
				for(var i=0;i<data.materialList.length;i++){
					var sucaiJson = data.materialList[i];
					var faclass = "";
					if(sucaiJson.fileContentType == "mp3"){
						faclass = "fa-medium";
					}else if(sucaiJson.fileContentType == "img"){
						faclass = "fa-file-image-o";
					}else{
						faclass = "fa-file-pdf-o";
					}
				var	$tpl = $('<li class="sucai-item" data-duration='+sucaiJson.duration+' data-filetype='+sucaiJson.fileContentType+' data-sucaiid='+sucaiJson.id+' data-fileurl='+sucaiJson.fileUrl+'> '+
							'	<div class="left">'+
							'   	<i class="fa fa-check-square"></i><i class="fa fa-square-o"></i>'+
							'	</div>'+
							'	<div class="middle">'+
							'		<p class="name">'+sucaiJson.name+'</p>'+
							'		<p class="description">上传日期 : '+sucaiJson.year+"-"+sucaiJson.month+"-"+sucaiJson.day+'</p>'+
							'	</div>'+
							'	<div class="right">'+
							'		<i class="sucai-type fa '+faclass+'"></i>'+
							'		<span class="size">'+sucaiJson.fileSize+'</span>'+
							'	</div>'+
							'</li>');
							if(sucaiJson.duration && sucaiJson.duration>0){
								var $durationTpl = $('<span class="duration">时长:'+sucaiJson.duration+'</span>')
								$tpl.find(".description").append($durationTpl);
							}
					$(".sucai-item-wrapper").append($tpl);
				}
				
			}
			if(curPage < totalPage){
				curPage++;
				$("#loadMoreSucai").show();
				$(document).on("click","#loadMoreSucai",function(){
					if(curPage >= totalPage){
						$("#loadMoreSucai").hide();
					}
					getSuCaiJson(albumId,curPage);
				})
			}
		});  		
	}



//}())
