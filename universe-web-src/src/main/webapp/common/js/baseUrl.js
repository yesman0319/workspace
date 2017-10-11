
var BaseUrl = (function(){
	var HOST = window.location.protocol+"//"+window.location.host;
	var PROCY_API = "plan/proxy?proxyurl=https://dev.api.vip-young.com";//请求接口时通过web代理的路径;
	if(HOST.indexOf("test.www.vip-young.com")>-1 || HOST.indexOf("localhost")>-1 || HOST.indexOf("127.0.0.1")>-1){
		//测试或者本地
		var api = "plan/proxy?proxyurl=https://dev.api.vip-young.com:8443/learning/";
		var wxApi = PROCY_API + ":8443/wxmp/binding/authority?backUrl=";//微信授权请求地址
		var wxOpenApi = PROCY_API + ":8443/wxmp/binding/getWeChatOpenId?code=";
	}else if(HOST.indexOf("www.vip-young.com")>-1){
		//正式
		var api = "plan/proxy?proxyurl=https://api.vip-young.com/learning/";
		var wxApi = PROCY_API + "/wxmp/binding/authority?backUrl=";//微信授权请求地址
		var wxOpenApi = PROCY_API + "/wxmp/binding/getWeChatOpenId?code=";
	}
	return {
		host:HOST,
		path:HOST+'/'+api,
		wxPath:HOST+'/'+wxApi,
		wxOpenPath:HOST+'/'+wxOpenApi
	}
}())

var WX_util = {
		config: {
			url: null, // "http://test.www.vip-young.com/html/jingying_jihua/h5/vocab-join.html?groupID=1293",
			userOpenId: JSON.parse(localStorage.getItem('OPEN_ID')),
		},
		isWeixin: function() {
			var ua = window.navigator.userAgent.toLowerCase();
			if(ua.match(/MicroMessenger/i) == 'micromessenger') {
				return true;
			} else {
				return false;
			}
		},
		getQueryString(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if(r != null) return unescape(r[2]);
			return null;
		},
		getOpenId(code){
			$.ajax({
				type: 'get',
				url: BaseUrl.wxOpenPath + code,
				cache: false,
				async: false,
				dataType: 'json',
				success: function(json) {
					//本地存储openid
					localStorage.setItem('OPEN_ID', JSON.stringify(json.openId));
				},
				error: function(data) {
					console.log(data);
				}
			})
		},
		getRedirectUrl(backUrl){
			$.ajax({
				type:"get",
				url:BaseUrl.wxPath + backUrl,
				dataType:'json',
				async:false,
			}).then(function(data){
				BaseUrl.shareUrl = data.redisUrl;
				WX_util.config.url = data.redisUrl;//获取回调的 授权链接 https://open.weixin.qq.com/connect/oauth2/authorize?...
				window.location.href = data.redisUrl;
			});	
		},
		getAuth(){
			if(WX_util.config.userOpenId != null) {
				return JSON.parse(localStorage.getItem('OPEN_ID'));
			} else {
				if(WX_util.getQueryString('code') != null) {
					window.location.href = window.location.href.split("&code")[0];
					WX_util.getOpenId(WX_util.getQueryString('code'));
					return JSON.parse(localStorage.getItem('OPEN_ID'));
				} else {
					WX_util.getRedirectUrl(window.location.href);
				}
			}
		}
	}

	var wx_openID = WX_util.getAuth();
	console.log(wx_openID);
