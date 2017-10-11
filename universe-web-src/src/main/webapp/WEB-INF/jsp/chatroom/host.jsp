<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html> <!---->
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
		<title>我的教室</title>
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
		<div class="live-page host-page mui-scroll-wrapper">
			<div class="live-room mui-scroll">
				<div class="message-wrapper host-list">	
					<!--audio播放器-->
					<audio id="myAudio" preload="none" autoplay="autoplay">
						Your browser does not support the audio element.您的浏览器不支持 audio 标签。
					</audio>
					<!--聊天室通告区-->
					<div class="message-banner">
						<p>
							直播时间 : <span id="live-time">${liveTopicVo.startTime }</span>
						</p>
						<p id="live-title">${liveTopicVo.name }</p>
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
			<!--左上角横幅-->
			<div class="my-liveroom isHost">
				<a href="my-liveroom.html">
					<!--<img src="${liveTopicVo.avatar }" />-->
					<img src="/img/chatroom/liveHead.png" />
					<span>未央云的直播间${liveTopicVo.roomName }</span>
					<!--<span>${liveTopicVo.teaName }的直播间${liveTopicVo.roomName }</span>-->
					<a id="follow">关注</a>
				</a>
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
		</div>

		<!--底部编辑区-->
		<footer class="host-editor liveroom-edit-footer">
			<ul class="tab-bar">
				<li class="host-ed-tab">
					<i class="fa fa-microphone"></i>
					<span>语音</span>
					<b class="cutline"></b>
				</li>
				<li class="host-ed-tab">
					<i class="fa fa-keyboard-o"></i>
					<span>文字</span>
					<b class="cutline"></b>
				</li>
				<li class="host-ed-tab" id="material">
					<i class="fa fa-folder"></i>
					<span>素材库</span>
					<b class="cutline"></b>
				</li>
				<li class="host-ed-tab">
					<i class="fa fa-film"></i>
					<span>媒体库</span>
				</li>
			</ul>
			<div class="host-tab-item ed-record">
				<p id="re-tips" style="display: none;"></p>
				<div id="re-wrapper">
					<p class="re-timer-box">
						<span id="re-timer">0s</span> / <span>60s</span>
					</p>
					<div class="re-control-btns" id="re-start-btn" style="display: ;">
						<span>开始录音</span>
					</div>
					<div class="re-control-btns" id="re-stop-btn" style="display:none;">
						<i class="fa fa-pause"></i>
					</div>
					<div class="re-control-btns" id="re-send-btn" style="display:none;">
						<b style="font-size: 20px;">发送</b>
					</div>
					<div class="re-control-btns" id="re-sending-btn" style="display:none;">
						<b style="font-size: 17px;">发送中···</b>
					</div>
				</div>
				<a id="re-cancel-btn" style="display: none;">取消</a>
			</div>
			<div class="host-tab-item ed-text">
				<div class="ed-text-wrapper">
					<textarea id="textarea" placeholder="请输入要发送的内容~"></textarea>
					<button id="sendText" class="mui-btn mui-btn-success" onclick="Send.textMsg()">发送</button>
				</div>
			</div>
			<div class="host-tab-item ed-material" style="display:none;">
				<div id="material-tips"><i class="fa fa-cube"></i> 暂无素材专辑~</div>
				<ul class="ed-material-box"></ul>
				<div class="footer">
					<button type="button" id="loadMoreAlbum" class="mui-btn" style="display: none;">
						点击加载更多
					</button>
				</div>
			</div>
			<div class="host-tab-item ed-media">
				<span class="fa fa-image" id="upload-img">图片</span>
				<span class="fa fa-file-audio-o">音频</span>
				<span class="fa fa-youtube-play" id="insert-iframe">视频</span>
				<span class="fa fa-file-pdf-o" id="send-file">文件</span>
			</div>
		</footer>
		<!--操作面板-->
		<div id="operate-panel" style="display: none;">
			<ul>
				<li>
					<a href="javascript:;">
						<i class="fa fa-refresh" style="color: #ffba00;"  onclick="javascript: location.reload(true)"></i>
						<span>刷新</span>
					</a>
				</li>
				<li>
					<a href="javascript:;">
						<i id="finish-live" class="fa fa-stop-circle-o" style="color: #ff6a6a;"></i>
						<span>结束直播</span>
					</a>
				</li>
			</ul>
		</div>
		<!--视频地址编辑区-->
		<div class="vyMsgTips insertVideo">
			<div class="main">
				<div class="text_box">
					<textarea id="insertVideoText" placeholder="发送优酷腾讯iframe通用代码可播放视频"></textarea>
				</div>
				<div class="btnBottom">
					<button type="button" class="mui-btn cancelTipsBtn">取消</button>
					<button type="button" class="mui-btn mui-btn-primary" id="sendInsertVideo">发送</button>
				</div>
			</div>
		</div>
		<!--素材页-->
		<div class="sucai-wrapper">
			<header>
				<a href="javascript:;" id="sucai-close-btn">返回主屏</a>
			</header>
			<div class="sucai-item-box">
				<div class="sucai-top">
					<button type="button" id="selectAll" data-loading-text="发送中" class="mui-btn mui-btn-primary">全选</button>
					<span style="font-size: 10px;">注&nbsp;:&nbsp;发送的顺序为由上至下所选中的素材</span>
				</div>
				<ul class="sucai-item-wrapper">
				</ul>
				<button type="button" id="loadMoreSucai" class="mui-btn" style="display: none;">
					点击加载更多
				</button>
			</div>
			<footer>
				<button type="button" id="sucai-send-btn" data-loading-text="发送中" class="mui-btn mui-btn-primary">确认</button>
			</footer>
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
			userType = 1,
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
						/*message = new Paho.MQTT.Message("Hello mqtt!!ajkshdasd");//set body 
						message.destinationName = MQTT_config.topic;// set topic
						mqtt.send(message);*/
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
				error:function(msg){
					console.log(msg);
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

//		wx.ready();
		
	//-----------------------------------------------------------------------------------------------	
	//-----------------------------------------------------------------------------------------------
	
	</script>
</html>

