<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html> <!---->
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
		<title>我的课堂</title>
		<%@include file="../include/pub.jsp"%>
		<link rel="stylesheet" href="/css/reset.css" />
		<link rel="stylesheet" href="/css/mui/mui.css"/>
		<link rel="stylesheet" href="/css/chatroom/live-room.css"/>
		<link rel="stylesheet" href="/common/font-awesome-4.7.0/css/font-awesome.css" />
	</head>
	<body onload="wyyFakeLoader()">
		<!--页面加载前显示的fakeloader-->
		<div class="wyyLoading">
			<ul class="logoBox">
				<li></li><li></li><li></li><li></li><li></li>
			</ul>
			<div class="wyyName">未央云</div>
		</div>
		<!--聊天界面-->
		<div class="live-page audience-page  mui-scroll-wrapper">
			<div class="live-room mui-scroll">
				<div class="message-wrapper">
					<!--audio播放器-->
					<audio id="myAudio" preload="auto"></audio>
					<!--聊天室通告区-->
					<div class="message-banner">
						<p>
							直播时间 : <span id="live-time">${liveTopicVo.startTime }</span>
						</p>
						<p id="live-title"></p>
						<p style="color: rgb(136, 136, 136); font-size: 12px;">
							<span id="live-section">${liveTopicVo.mainTitle }</span>
							<span id="live-num">${liveTopicVo.viewNum }</span>人参与
						</p>
						<div class="error-tips"></div>
					</div>
					<!--聊天信息列表-->
					<div class="message-main">
					</div>
				</div>
			</div>
		</div>
		<!--左上角横幅-->
		<div class="my-liveroom isHost">
			<!--<img src="${liveTopicVo.avatar }" />-->
			<img src="/img/chatroom/liveHead.png" />
			<span>${liveTopicVo.teaName }的直播间${liveTopicVo.roomName }</span>
			<a id="follow">关注</a>
		</div>
		<!--右上角工具条-->
		<ul class="toolbar isHost">
			<li id="tb-operate">
				<span>操作</span>
			</li>
			<li id="tb-top">
				<i class="fa fa-chevron-circle-up"></i>
			</li>
			<li id="tb-bottom">
				<i class="fa fa-chevron-circle-down"></i>
			</li>
			<li id="tb-personal">
				<i class="fa fa-user"></i>
			</li>
		</ul>
		<!--操作面板-->
		<div id="operate-panel" style="display: none;">
			<ul>
				<li>
					<i class="fa fa-refresh" style="color: #ffba00;"  onclick="javascript: location.reload(true)"></i>
					<span>刷新</span>
				</li>
				<li>
					<i id="finish-live" class="fa fa-stop-circle-o" style="color: #ff6a6a;"></i>
					<span>分享直播</span>
				</li>
			</ul>
		</div>
		<!--底部编辑框-->
		<div class="audience-editor liveroom-edit-footer" data-status="0">
			<div class="audience ed-text">
				<div class="ed-text-wrapper">
					<textarea id="audience-textarea" placeholder="请输入要发送的内容~"></textarea>
					<!--<textarea id="audience-textarea-disabled" placeholder="禁言中..." disabled="disabled" style="display: none;"></textarea>-->
					<button id="sendText" class="mui-btn mui-btn-success" onclick="Send.textMsg()">发送</button>
				</div>
			</div>
		</div>
	</body>
	<script src="/js/common_mod.js"></script><!--常复用的方法-->
	<script src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
	<script src="/js/lib/jquery/jquery.resize.js"></script>
	<script src="/js/lib/base64.js"></script>
	<script src="/js/lib/jquery/fastclick.js"></script>
	<script src="/js/lib/mui/mui.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.min.js"></script>
    <script src="http://cdn.bootcss.com/crypto-js/3.1.9/crypto-js.min.js"></script>
	<script src="/js/chatroom/live-room.js"></script>
	<script>
		var isLiving = "${liveTopicVo.liveStatus}"; //直播话题状态0：未开始；1：正在直播；2：结束直播
		var urls = encodeURIComponent(window.location.href);
		var basePath = window.xiaoma.basePath;
		var userName = "${userInfo.username}",
			userType = 0,
			userId = "${userInfo.id}",
			avatar = "/img/tttt.jpg",
			mqtt;
		var MQTT_config = (function(){
			var obj = {
				reconnectTimeout :2000,
				topicId:"${liveTopicVo.id}",
				courseId:"${liveTopicVo.courseId}",
				roomId:"${liveTopicVo.roomId}"
			}
			return obj;
		}());

		if(isLiving){
			//请求配置mqtt协议相关参数
			$.ajax({
				type:"get",
				url:basePath + "/h5/live/alimessage.html",
				dataType:"json",
				async:false,
				success:function(data){
					MQTT_config.host = data.aliyun_mqtt_serverURI;// 设置当前用户的接入点域名;
					MQTT_config.port = parseInt(data.aliyun_mqtt_port);//WebSocket协议服务端口，如果是走HTTPS，设置443端口
					MQTT_config.topic_a = data.aliyun_mqtt_producer_topic_a+"/"+MQTT_config.roomId+"/"+MQTT_config.topicId;///data.aliyun_mqtt_producer_topic+"/"+MQTT_config.roomId+"/"+MQTT_config.topicId;//需要操作的Topic
					MQTT_config.topic_b = data.aliyun_mqtt_producer_topic_b+"/"+MQTT_config.roomId+"/"+MQTT_config.topicId;
					MQTT_config.useTLS = data.aliyun_mqtt_useTLS;//是否走加密HTTPS，如果走HTTPS，设置为true
					MQTT_config.accessKey = data.aliyun_mqtt_AccessKey;//账号的AccessKey，在阿里云控制台查看
					MQTT_config.secretKey = data.aliyun_mqtt_SecretKey;//账号的的SecretKey，在阿里云控制台查看
					MQTT_config.cleansession = data.aliyun_mqtt_cleansession;
					MQTT_config.groupId = data.aliyun_mqtt_producer_GroupId_a;
					MQTT_config.deviceId = generateUUID().replace(/[-]/g,'');
					MQTT_config.clientId = MQTT_config.groupId+'@@@'+MQTT_config.deviceId;//GroupId@@@DeviceId，由控制台申请的Group ID和自己指定的Device ID组合构成
				    var username = MQTT_config.accessKey;
				    var password = CryptoJS.HmacSHA1(MQTT_config.groupId,MQTT_config.secretKey).toString(CryptoJS.enc.Base64);
			   		MQTT_config.MQTTconnect = function(){
			   			var _this = this;
				   		mqtt = new Paho.MQTT.Client(
				            _this.host,//MQTT域名
				            _this.port,//WebSocket端口
				            _this.clientId//客户端ClientId
				        );
				        var options = {
				            timeout: 3,
				            onSuccess: _this.onConnect,
				            onFailure: function (message) {
				                setTimeout(_this.MQTTconnect, _this.reconnectTimeout);
				            }
				        };
				        mqtt.onConnectionLost = MQTT_config.onConnectionLost;
				        mqtt.onMessageArrived = MQTT_config.onMessageArrived;
				        if (username != null) {
				            options.userName = username;
				            options.password = password;
				        }
				        mqtt.connect(options);
				   	};
					MQTT_config.onConnect = function(){
						// 连接成功并订阅话题
				        mqtt.subscribe(MQTT_config.topic_b, {qos: 0});
					}
					MQTT_config.onConnectionLost = function(response){
						var _this = MQTT_config;
						setTimeout(_this.MQTTconnect, _this.reconnectTimeout);
					}
					//监听接收消息
					MQTT_config.onMessageArrived = function(message){
				    	//接受到的消息
				        var topic = message.destinationName;
				        var payload = message.payloadString;
				       	var receiveLiveMsg = JSON.parse(Base64.decode(payload));
				       	console.log(receiveLiveMsg);
				       	renderMsgOrder = 1;
				       	renderMessage(receiveLiveMsg);
				       	timeStampMsgCount++; 
					}
					//mqtt连接
					MQTT_config.MQTTconnect();	
				},
				error:function(jqXHR,textStatus,errorThrown){
					console.log("jqXHR="+jqXHR+";textStatus="+textStatus+";errorThrown="+errorThrown);
				}
			});
		}
		
		//请求微信参数
		$.ajax({
			type : "post",
			url : basePath + "/h5/sign.html",
			data : {
				'share_url' : urls
			},
			dataType : "json",
			success : function(data) {
				if (data.success) {
					var share = data.share;
					if (share != null) {
						var appId = share.appId;
						var timestamp = share.timestamp;
						var nonceStr = share.nonceStr;
						var signature = share.signature;
						wx.config({
							debug : false,
							appId : appId,
							timestamp : timestamp,
							nonceStr : nonceStr,
							signature : signature,
							jsApiList : [ 
											'checkJsApi',
											'onMenuShareTimeline',
											'onMenuShareAppMessage',
											'onMenuShareQQ',
											'startRecord',
											'stopRecord',
											'onVoiceRecordEnd',
											'playVoice',
											'pauseVoice',
											'stopVoice',
											'onVoicePlayEnd',
											'uploadVoice',
											'downloadVoice',
											'chooseImage',
											'previewImage',
											'uploadImage',
											'downloadImage'
										]
						});
						wx.error(function(res) {
							console.log(res.errMsg)
						});
					}
				} else {
					mui.confirm('请刷新页面重试','加载失败',['取消','确认'],function (e) {
						if(e.index == 1){
							window.location.reload(true);
						}
					},'div')				
				}
			}
		});

	//-----------------------------------------------------------------------------------------------	
	//-----------------------------------------------------------------------------------------------
	//移动端弹出键盘时窗口改变
	$(window).resize(function(){
		Room.setRoomHeight().goBottom();
	})

	</script>
</html>
