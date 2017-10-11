console.log("require");
require.config({
	paths: {
		"jquery": "../lib/jquery-3.1.1.min",
		"wx" : "http://res.wx.qq.com/open/js/jweixin-1.2.0.js",
		"mui" : "../lib/mui/mui.min",
		"audiojs" : "../lib/audiojs/live-audioplayer",
		"base64" : "../lib/base64",
		"fastclick":"../lib/jquery/fastclick",
		"mqtt" : "https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.min",
		"crypto" : "http://cdn.bootcss.com/crypto-js/3.1.9/crypto-js.min.js"
　　},
	shim : {
		"resize": ["jquery"],
		"audiojs":["jquery"],
		"base64":{
			exports: 'audiojs'
		},
		"fastclick":["jquery"]
	}
});

require(['jquery', 'live-room'], function ($, liveroom){

});