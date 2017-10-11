'use strict'

define(['jquery', 'app/baseFinal'], function($, Final) {


	//private 
	var _id,
		_token,
		_openId,
		_nickname,
		_ok = false,
		_uuid;
	
	var get = function() {;

		$.cookie(Final.TOEFL_ID) && $.cookie(Final.TOEFL_TOKEN) && ~(function(id,token,openId,nickname,uuid) {
			_id = id;
			_token = token;
			_openId = openId;
			_nickname = nickname;
			_ok = true;
			_uuid = uuid
		})($.cookie(Final.TOEFL_ID),$.cookie(Final.TOEFL_TOKEN),$.cookie(Final.TOEFL_OPEN_ID),$.cookie(Final.TOEFL_NICKNAME),$.cookie(Final.TOEFL_UUID))

		//return ok()
	}

	//独立于get 防止cookie被修改
	var ok = function() {
		return _ok
	}

	var getId = function() {
		return _id || ""
	}

	var getToken = function() {
		 // return _token || "xiaoma"
		return _token || ""
	}

	var getOpenId = function() {
		return _openId || ""
	}

	var getNickname = function() {
		return _nickname || ""
	}

	var getUuid = function() {
		return _uuid || ""
	}

	var clearAll = function(cbk) {
		// debugger
		$.cookie(Final.TOEFL_ID,"",{expires: 1,
				path: '/',domain:".yuzhoutuofu.com"})
		$.cookie(Final.TOEFL_TOKEN,"",{expires: 1,
				path: '/',domain:".yuzhoutuofu.com"})
		$.cookie(Final.TOEFL_OPEN_ID,"",{expires: 1,
				path: '/',domain:".yuzhoutuofu.com"})
		$.cookie(Final.TOEFL_NICKNAME,"",{expires: 1,
				path: '/',domain:".yuzhoutuofu.com"})
		$.cookie(Final.TOEFL_UUID,"",{expires: 1,
				path: '/',domain:".yuzhoutuofu.com"})
		// if(WB2) {
		// 	WB2.logout(function() {
	 //    		$.cookie("weibojs_2044429661","")
	 //    		WB2.oauthData.access_token = ""
	 //    		if(cbk) cbk() 
		// 	})
		// }
	}

	//get()

	return {
		get: get,
		ok : ok,
		getId : getId,
		getToken : getToken,
		getOpenId : getOpenId,
		getNickname : getNickname,
		getUuid : getUuid,
		clearAll : clearAll
	}
})