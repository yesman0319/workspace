'use strict';

define([''],function() {
	var url=location.href,
		protocolUrl;
	if (url.indexOf('www.xiaoma') > -1) {
		protocolUrl='http://c.xiaomatuofu.com/web/agreementOrder.action';
	}else {
		protocolUrl='http://center.xiaomatuofu.com/web/agreementOrder.action';
	}

	return {
		TOEFL_ID : "TOEFL_ID",
		TOEFL_OPEN_ID : "TOEFL_OPEN_ID",
		TOEFL_TOKEN : "TOEFL_TOKEN",
		TOEFL_ORIGIN_WEIBO : "weibo",
		TOEFL_ORIGIN_QQ : "qq",
		TOEFL_TRIGGER : "TOEFL_TRIGGER",
		TOEFL_NICKNAME : "TOEFL_NICKNAME",
		TOEFL_UUID : "TOEFL_UUID",
		XIEZUO_PRICE:120,//一次写作批改需支付的价钱
		PROTOCOL_URL:protocolUrl,
		systemId:{
			tuoFu:1,//1小马托福
			twentyOneDay:2,//2托福21天
			ieltsSpoken:3,//3雅思口语
			ieltsTwentyOne:4//4雅思21天
		},
		from:{
			huiyuan:'huiyuan',
			chongci:'chongci',
			haoke:'haoke',
			jichuban:'jichuban',
			qianghuaban:'qianghuaban',
			nayiye:'nayiye',
			baofen:'baofen',
			quanrizhi:'quanrizhi'
		}
	};
});