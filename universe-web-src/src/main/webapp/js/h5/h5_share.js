/*	var base = "${bathPath}";
	var lineLink = window.location.href;//这个是分享的网址
	var imgUrl = "${cdnPath}"+"/i/ic_share.png";//这里是分享的时候的那个图片
	var descContent = "精英计划-${courseName}直播课";
	var share_title = "精英计划-${courseName}直播课"; */
	
	
	var url = encodeURIComponent(window.location.href);
	function share(lineLink, imgUrl, descContent, share_title) {
/*		alert("linkLink= " + lineLink);
		alert("imgUrl= " + imgUrl);
		alert("descContent= " + descContent);
		alert("share_title= " + share_title); */
		$.ajax({
			type : "post",
			url : basePath + "/h5/sign.html",
			data : {
				'share_url' : url
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
							jsApiList : [ 'checkJsApi', 'onMenuShareTimeline',
									'onMenuShareAppMessage', 'onMenuShareQQ' ]
						});

						wx.ready(function() {
							//分享到朋友圈
							wx.onMenuShareTimeline({
								title : descContent,
								desc : descContent,
								link : lineLink,
								imgUrl : imgUrl,
								success : function() {
									// 用户确认分享后执行的回调函数
								},
								cancel : function() {
									// 用户取消分享后执行的回调函数
								}
							});
							//分享给朋友
							wx.onMenuShareAppMessage({
								title : share_title,
								desc : descContent,
								link : lineLink,
								imgUrl : imgUrl,
								success : function() {
									// 用户确认分享后执行的回调函数
								},
								cancel : function() {
									// 用户取消分享后执行的回调函数
								}
							});

							wx.onMenuShareQQ({
								title : share_title,
								desc : descContent,
								link : lineLink,
								imgUrl : imgUrl,
								success : function() {
									// 用户确认分享后执行的回调函数
								},
								cancel : function() {
									// 用户取消分享后执行的回调函数
								}
							});
						});

						wx.error(function(res) {
							//alert(res.errMsg);
						});

					}

				} else {
					//alert("请刷新页面，重新选择")
				}
			}
		});
	}