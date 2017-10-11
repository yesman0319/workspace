'use strict'

define(['jquery', 'valiForm', 'app/baseURL', 'common/render', 'app/baseFinal', 'app/baseNavInfo', '$md5', 'cookie', 'lib/store', 'lib/math.uuid'], function($, ValiForm, URL, Render, Final, NavInfo) {
	var form = $("#form")
	var regIns, lgInsl
	var wrap = $("#wrap")
	var msgInto
	var regPhone = /^1[3|4|5|7|8]\d{9}$/,
		regMail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
	var forgetMsg; //用于记录发送邮箱还是手机文字
	var TMPL = {
		t1: 'app/login/tmpl_forget1',
		t2: 'app/login/tmpl_forget2',
		t3: 'app/login/tmpl_forget3',	
		t4: 'app/login/tmpl_forget4',
		t5: 'app/login/tmpl_register_success',
		t6: 'app/login/tmpl_forget1_dialog',
		t7: 'app/login/tmpl_forget2_dialog',
		t8: 'app/login/tmpl_forget3_dialog',
		t9: 'app/login/tmpl_forget4_dialog',
		t10: 'app/login/tmpl_phone',
		t11: 'app/login/tmpl_email'
	};
	var _openid;
	var hrefTmp = "http://www.yuzhoutuofu.com/";

	//(function() {
	//	/*
	//	 * 如果用户使用的是手机则跳转到m站
	//	 */
	//	function IsPC() {
	//		var userAgentInfo = navigator.userAgent;
	//		var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
	//		var flag = true;
	//		for (var v = 0; v < Agents.length; v++) {
	//			if (userAgentInfo.indexOf(Agents[v]) > 0) {
	//				flag = false;
	//				break;
	//			}
	//		}
	//		return flag;
	//	}
	//	if (!IsPC()) {
	//		window.location.href = 'http://m.xiaoma.com.cn/';
	//	}
	//})();

	//document.writeln("语言版本: "+browser.language);
	//document.writeln(" 是否为移动终端: "+browser.versions.mobile);
	//document.writeln(" ios终端: "+browser.versions.ios);
	//document.writeln(" android终端: "+browser.versions.android);
	//document.writeln(" 是否为iPhone: "+browser.versions.iPhone);
	//document.writeln(" 是否iPad: "+browser.versions.iPad);

	var init = function() {
		var fromurl = getUrlParam(window.location.href, "fromurl");
		if(fromurl){
			$(".regsiter").attr("href","register.html?fromurl="+fromurl);
		};

		initValiForm()
		initEvent()
		// if (store.get("dialogLg") == "true") {
		// 	$("#forget").trigger("trigger-forget")
		// 	store.remove("dialogLg")
		// }
	}

	var initEvent = function() {
		// $(document).on('click', '#btnRegister', btnRegister)
		$(document).on('trigger_register', '#btnRegister', btnRegister)
		$(document).off('click', '#forget').on('click', '#forget', forget)
		$(document).on('trigger-forget', '#forget', forget)
		$(document).on('click', '#sure1', sure1)
		$(document).on('click', '#register_after_into', register_after_into)
		$(document).on('click', '#resetpwd_after_into', resetpwd_after_into)
		$(document).on('click', '#time', function() {
			if (!($("#time").attr("disabled"))) {
				$("#errorMsg").css("color", "green").text(forgetMsg)
				fn()
			}
		})
		$(document).on('click', '#codeBtn', function(event) {
			event.preventDefault();
			if (!($("#codeBtn").attr("disabled"))) {
				// $("#errorMsg").css("color", "green").text(codeMsg)
				fn1()
			}
		})
		$(document).on('click', '#btnCaptcha', btnCaptcha)
		$(document).on('click', '#btnResetPwd', btnResetPwd)
		$(document).on('click', '#sinalg', sinalg)
		$(document).on('click', '#cbx_register', cbx_register)
		// $(document).on('change', '#uname', function(e) {
		// $('#username').bind('input propertychange', function() {
		$(document).on('change', '#uname', function(e) {
			$("#uname").val($("#uname").val().trim().replace(/\s+/g, "")); //去掉前后空格
		})
		$(document).on('input propertychange', '.unameBlur', function(e) {
			var tel = $('.unameBlur').val().trim();
			//if (regPhone.test(tel)) {
			//	$('#codeBtn')[0].removeAttribute('disabled')
			//} else {
			//	$('#codeBtn').attr('disabled', true)
			//}

			validPhoneNumAndImgCode();
		})
		$(document).on('blur', '.unameBlur', function(e) {
			var tel = $('.unameBlur').val().trim();
			if (regPhone.test(tel)) {
				$.ajax({
					url: URL.baseURL12 + 'users/check_users',
					type: 'get',
					data: {
						'mobile': tel
					},
					success: function(msg) {
						if (msg.status == 1) {
							// $("#errorMsg").css("color", "#d5ac50;").text("手机号已存在")
							$("#errorMsg").css("color", "red").text("手机号已存在")
						}
					}
				})
			}
		});
		$(document).on("input propertychange","#img_code",function (){
			validPhoneNumAndImgCode();
		});
		// $(document).on('blur', '.unameEmailBlur', function(e) {
		// 		var email = $('.unameEmailBlur').val().trim();
		// 		if (regMail.test(email)) {
		// 			$.ajax({
		// 				url: URL.baseURL12 + 'users/check_users',
		// 				type: 'get',
		// 				data: {
		// 					'mobile': tel
		// 				},
		// 				success: function(msg) {
		// 					if (msg.status == 1) {
		// 						$("#errorMsg").css("color", "#d5ac50;").text("手机号已存在")
		// 					}
		// 				}
		// 			})
		// 			$.ajax({
		// 				url: URL.baseURL11 + "user/emailRegister.action",
		// 				type: "POST",
		// 				async: false,
		// 				data: {
		// 					"email": regIns.ep,
		// 					"password": $.md5(regIns.pwd) || "",
		// 				},
		// 				success: _success,
		// 				error: function(msg1) {}
		// 			})
		// 		}
		// 	})
		// $(document).on('click', '#nameNav', function() {
		// 	$("#userInfoid").toggle()
		// })
		$(document).on('click', '#phoneHref', phoneHref)
		$(document).on('click', '#emailHref', emailHref)
		$(function() {
			if (window.location.href.indexOf('login') != -1) {
				$('#loginNav').parent().addClass('navActive1')
			} else if (window.location.href.indexOf('register') != -1) {
				$('#registerNav').parent().addClass('navActive1')
			}
			//注册页面显示手机注册
			Render.render({
				wrap: $('#regist-form'),
				tmpl: {
					tmplName: TMPL.t10,
					tmplData: ''
				},
				afterRender: function() {
					initValiForm();
					var fn=function (){
						$.get(URL.baseURL14+"common/update_captcha",{},function (result){
							$("#codeImg_div").html(result);
							$("#codeImg_div img").attr("title","看不清楚？点击切换验证码").css("cursor","pointer").css({height:"45px",width:"156px"}).on("click",function (){
								fn();
							})
						});
					}
					fn();
				}
			})
		})
	}

	var validPhoneNumAndImgCode = function (){
		var tel = $.trim($('.unameBlur').val());
		if (regPhone.test(tel)) {
			// $('#codeBtn').attr('disabled', false)
			if($.trim($('#img_code').val())){
				$.ajax({
					url: URL.baseURL14 + 'common/check_captcha',
					type: 'POST',
					xhrFields: {
						withCredentials: true
					},
					data: {
						'captcha': $('#img_code').val().trim()
					},
					success: function(msg) {
						if (msg.status ==0) {
							// $("#errorMsg").css("color", "#d5ac50;").text("手机号已存在");
							$('#codeBtn')[0].removeAttribute('disabled');
							$("#errorMsg").text("");

						}else{
							$("#errorMsg").css("color", "red").text("验证码输入错误");
							$('#codeBtn').attr('disabled', true);
						}
					}
				})
			}
		} else {
			$('#codeBtn').attr('disabled', true)
		}
	};
	var phoneHref = function() {
		//注册页面显示手机注册
		Render.render({
			wrap: $('#regist-form'),
			tmpl: {
				tmplName: TMPL.t10,
				tmplData: ''
			},
			afterRender: function() {
				initValiForm();
				var fn=function (){
					$.get(URL.baseURL14+"common/update_captcha",{crossDomain:true},function (result){
						$("#codeImg_div").html(result);
						$("#codeImg_div img").css("cursor","pointer").on("click",function (){
							fn();
						})
					});
				}
				fn();
			}
		})
	}

	var emailHref = function() {
		//注册页面显示邮箱注册
		Render.render({
			wrap: $('#regist-form'),
			tmpl: {
				tmplName: TMPL.t11,
				tmplData: ''
			},
			afterRender: function() {
				initValiForm()
			}
		})
	}

	var sinalg = function() {

		$.ajax({
			url: URL.baseURL4 + "users/omniauth_login?" + "origin=qq",
			type: "GET",
			success: function(msg) {

			}
		})
	}

	var cbx_register = function() {
		loginStatus().set()
	}

	var loginStatus = function() {

		var get = function() {
			return $("#cbx_register").find(".gly").css("display")
		}

		var set = function() {
			$("#cbx_register").find(".gly").toggle()
			if (this.get() == "none") {
				$("#btnRegister").attr("disabled", "disabled")
			} else {
				$("#btnRegister")[0].removeAttribute("disabled")
			}

		}
		return {
			get: get,
			set: set
		}
	}

	// var again = function() {
	// 	$("#forgetForm").Validform({
	// 		ajaxPost: false,
	// 		tiptype: function(msg, o, cssctl) {
	// 			var objtip = $("#errorMsg");
	// 			cssctl(objtip, o.type);
	// 			objtip.text(msg);
	// 		},
	// 		beforeCheck: function(msg) {},
	// 		callback: function() {
	// 			fn()
	// 		}
	// 	})
	// }

	//todo验证码
	var btnResetPwd = function() {

		$("#resetpwdForm").Validform({
			ajaxPost: false,
			tiptype: function(msg, o, cssctl) {
				var objtip = $("#errorMsg");
				cssctl(objtip, o.type);
				objtip.text(msg);
			},
			beforeCheck: function(msg) {},
			callback: function() {


				// $.ajax({
				// 	url: URL.baseURL1 + "users/" + _id,
				// 	type: 'PUT',
				// 	contentType: "application/json",
				// 	data: JSON.stringify({
				// 		"user": {
				// 			"captcha": _captcha,
				// 			"open_id": _openid,
				// 			"password": $.md5($("#newpwd").val().trim())
				// 		}
				// 	}),

				$.ajax({
					url: "/action/user/modifyPassword.action",
					type: 'POST',
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					async: false,
					data: {
						"captcha": _captcha,
						"openId": _openid,
						"password": $.md5($("#newpwd").val().trim())
					},
					success: function(msg) {
						if (msg.status == 0) {
							if ($('#resetpwdForm').attr('data-from') == 'dialog') {
								var renderData = {
									uname: $('#uname').html(),
									pwd: $("#newpwd").val().trim()
								};
								wrap = $('#loginDiv');
								Render.render({
									wrap: wrap,
									tmpl: {
										tmplName: TMPL.t9,
										tmplData: renderData
									},
									afterRender: function() {
										$(document).on('click', '#btnResetLogin', function() {
											var unameVal = $('#uname').val();
											var pwd = $('#pwd').val();
											btnResetLogin(unameVal, pwd)
										})
									}
								})
							} else {
								Render.render({
									wrap: wrap,
									tmpl: {
										tmplName: TMPL.t4
									}
								})
							}
							return false
						} else {
							// $("#errorMsg").css("color", "#d5ac50;").text(msg.message)
							$("#errorMsg").css("color", "red").text(msg.message)
							return false
						}
					},
					error: function(msg1) {

						return false
					}
				})
				return false
			}
		})

	}

	var _id, _captcha, _token;
	//todo验证码
	var btnCaptcha = function() {
		$("#forgetForm").Validform({
			ajaxPost: false,
			tiptype: function(msg, o, cssctl) {
				var objtip = $("#errorMsg");
				cssctl(objtip, o.type);
				objtip.text(msg);
			},
			beforeCheck: function(msg) {},
			callback: function() {
				if (!_openid) {
					_openid = $('#_openid').val()
				}
				// debugger
				$.ajax({
					// url: URL.baseURL1 + "users/verify_captcha",
					//url: URL.baseURL9 + "users/verify_captcha",
					url: URL.baseURL14 + "users/verify_captcha",
					// type: 'POST',
					type: 'GET',
					data: {
						open_id: _openid,
						dynamic_captcha: $("#code").val(),
						captcha:$("#img_code").val()
					},
					success: function(msg) {
						if (!isEmpty(msg) && msg.error == "captcha error") {
							// $("#errorMsg").css("color", "#d5ac50;").text("验证码错误")
							$("#errorMsg").css("color", "red").text("验证码错误")
							return false
						} else {
							_id = msg.user.id
							_captcha = $("#code").val()
							_token = msg.user.auth_token
							var renderData = {
								sendTo: $('#sendto').val(),
								code: _captcha,
								uname: $('#uname').val()
							};
							if ($('#forgetForm').attr('data-from') == 'dialog') {
								Render.render({
									wrap: $('#loginDiv'),
									tmpl: {
										tmplName: TMPL.t8,
										tmplData: renderData
									},
									afterRender: function() {
										//TODO 423（验证码不正确或者open_id不存在）

										btnResetPwd()
										return false
									}
								})
							} else {
								Render.render({
									wrap: wrap,
									tmpl: {
										tmplName: TMPL.t3,
										tmplData: renderData
									},
									afterRender: function() {
										//TODO 423（验证码不正确或者open_id不存在）

										btnResetPwd()
										return false
									}
								})
							}
							return false
						}
						return false
					},
					error: function(msg1) {

						// if (msg1.status == "423") {
						// 	$("#errorMsg").css("color", "red").text("验证码错误")
						// }
						return false
					}
				})
				return false
			}
		})

	}

	var forget = function(e) {
		if ($(e.target).attr("data-come") == "dialog") {
			// store.set("dialogLg", "true")
			Render.render({
				wrap: $('#loginDiv'),
				tmpl: {
					tmplName: TMPL.t6,
					tmplData: ''
				},
				afterRender: function() {
					sure1();
					var fn=function (){
						$.get(URL.baseURL14+"common/update_captcha",{},function (result){
							$("#codeImg_div").html(result);
							$("#codeImg_div img").attr("title","看不清楚？点击切换验证码").css("cursor","pointer").css({height:"60px",width:"156px"}).on("click",function (){
								fn();
							});
						});
					}
					fn();
					return false
				}
			})
			// window.location.href = "../html/login.html"
		} else {
			Render.render({
				wrap: wrap,
				tmpl: {
					tmplName: TMPL.t1,
					tmplData: ''
				},
				afterRender: function() {
					sure1();
					var fn=function (){
						$.get(URL.baseURL14+"common/update_captcha",{},function (result){
							$("#codeImg_div").html(result);
							$("#codeImg_div img").attr("title","看不清楚？点击切换验证码").css("cursor","pointer").css({height:"60px",width:"156px"}).on("click",function (){
								fn();
							});
						});
					}
					fn();
					return false
				}
			})
		}
	}
	var tempPE;

	var fn = function() {
		var ep = $("#uname").val() || _openid;
		var img_code=$("#img_code").val() ;
		_openid = ep
		// debugger
		$.ajax({
			url: URL.baseURL14 + "users/verify_open_id",
			async: false,
			type: 'POST',
			data: {
				open_id: _openid,
				captcha:img_code
			},
			success: function(msg) {
				if (!isEmpty(msg) && msg.error == "open id not exist") {
					$("#errorMsg").css("color", "red").text("没有对应的手机或邮箱")
					$('#sure1').removeAttr('disabled')
					return false
				} else if (!isEmpty(msg) && msg.error == 2) {
					$("#errorMsg").css("color", "red").text("账号未绑定手机/邮箱无法找回密码")
					$('#sure1').removeAttr('disabled')
					return false
				} else if (!isEmpty(msg) && msg.error == 1) {
					$("#errorMsg").css("color", "red").text("手机/邮箱/用户名不存在")
					$('#sure1').removeAttr('disabled')
					return false
				}else if(!isEmpty(msg) && msg.error == 3){
					$("#errorMsg").css("color", "red").text("验证码输入错误")
					$('#sure1').removeAttr('disabled')
				} else {
					forgetMsg = $("#errorMsg").val()
					// debugger
					tempPE = $("#tel").val()
					var sendMsg;
					if (msg.send_to == "mobile") {
						sendMsg = "手机";
					} else if (msg.send_to == "email") {
						sendMsg = "邮箱";
					}
					var renderData = {
						sendMsg: sendMsg,
						send: msg.content,
						uname: $("#uname").val() || _openid
					}
					if ($('#forgetForm').attr('data-from') == 'dialog') {
						wrap = $('#loginDiv')
						renderData.uname = $('#uname').val();
						renderData._openid = _openid;
						Render.render({
							wrap: wrap,
							tmpl: {
								tmplName: TMPL.t7,
								tmplData: renderData
							},
							afterRender: function() {
								$("#img_code").val(img_code);
								time($("#time"));
								return false
							}
						})
					} else {
						Render.render({
							wrap: wrap,
							tmpl: {
								tmplName: TMPL.t2,
								tmplData: renderData
							},
							afterRender: function() {
								$("#img_code").val(img_code);
								time($("#time"))
								return false
							}
						})
					}
					return false
				}
				return false
			},
			error: function(msg1) {
				$('#sure1').removeAttr('disabled')
				return false
			}

		})
	}

	var fn1 = function() {
		var mobile = $("#uname").val();
		$.ajax({
			url: URL.baseURL14 + "users/get_captcha_code",
			async: false,
			type: 'POST',
			data: {
				'mobile': mobile,
				'captcha':$("#img_code").val()
			},
			success: function(msg) {
				if (msg.status == 1) {
					$("#errorMsg").css("color", "red").text(msg.message)
					return false
				} else {
					time($("#codeBtn"))
					return false
				}
				return false
			},
			error: function(msg1) {
				return false
			}

		})
	}

	var sure1 = function() {

		$("#forgetForm").Validform({
			ajaxPost: false,
			tiptype: function(msg, o, cssctl) {
				var objtip = $("#errorMsg");
				cssctl(objtip, o.type);
				objtip.text(msg);
			},
			beforeCheck: function(msg) {},
			callback: function() {
				$('#sure1').attr('disabled', true)
				fn()
				return false
			}
		})

	}

	var showErrorMsg = function(ele, msg) {
		ele.css({
			color: "red"
		}).html(msg)
	}

	var wait = 60;
	var time = function(o) {

		if (wait == 0) {
			o[0].removeAttribute("disabled");
			$(o[0]).css("opacity",1);
			o.text("获取验证码")
			wait = 60
		} else {
			o[0].setAttribute("disabled", true);
			$(o[0]).css("opacity",0.3);
			o.text(wait + "s后重发")
			wait--;
			setTimeout(function() {
					time(o)
				},
				1000)
		}
	}

	var getOrigin = function(param) {
		// fw
		if (regPhone.test(param)) {
			return "phone"
		} else {
			return ""
		}
	}

	var initValiForm = function() {
		$(function() {
			form = $('#form');
			var formSet = form.Validform({
				ajaxPost: false,
				tiptype: function(msg, o, cssctl) {
					var objtip = $("#errorMsg");
					cssctl(objtip, o.type);
					objtip.text(msg);
				},
				beforeCheck: function(msg) {},
				callback: function(data) {
					//fw
					// if ($(data[0][3]).attr("id") == "btnRegister") {
					if ($(data[0][7]).attr("id") == "btnRegister") { //注册按钮是data[0][4]
						btnRegister(data)
						return false
					} else if ($(data[0][0]).attr("data-flag") == "registEmail") {
						btnRegister(data)
						return false
					} else if ($(data[0][4]).attr("data-flag") == "homeEmail") {
						btnRegister(data)
						return false
					} else {
						btnLogin(data)
						return false
					}
					return false
				}
			})
			if ($("#btnRegister").length != 0 && $("#uname").attr("data-flag") == "registEmail") { //邮箱注册密码是否一致
				formSet.addRule([{
					ele: ".inputxt:eq(2)",
					recheck: "pwd" //name
				}]);
			} else if ($("#btnRegister").length != 0) { //手机注册密码是否一致
				formSet.addRule([{
					ele: ".inputxt:eq(4)",
					recheck: "pwd" //name
				}]);
			}
		})
	}

	var btnResetLogin = function(ep, pwd) {
		var lgIns;
		lgIns = new Login(ep, pwd)
		lgIns.request1(ep, pwd)
	}

	var btnLogin = function(data, obj) {
		var ep = $("#uname").val(),
			pwd = $("#pwd").val();

		if (ep && pwd) {
			if (!lgIns) {
				var lgIns
			}
			if ($(data).attr("data-flag") == "home") {
				var insBase = new baseMaster()
				lgIns = new Login(ep, pwd)
				insBase.request1(undefined, undefined, lgIns)
			} else {
				lgIns = new Login(ep, pwd)
				lgIns.request1(ep, pwd)
			}
		}
		store.set("eleNav", "homeNav")
	}

	var btnRegister = function(data) {
		var
			nickname, //openid
			pwd,
			ep;

		if ($($(data)[0][7]).attr("data-flag") == "homePhone") { //注册页注册
			nickname = data[0][0]; //openid
			pwd = data[0][4];
			ep = data[0][6];
			regIns = new Register($(ep).val(), $(pwd).val(), $(nickname).val())
			regIns.request()
		} else if ($($(data)[0][4]).attr("data-flag") == "homeEmail") { //弹框邮箱注册
			nickname = data[0][0]; //openid
			pwd = data[0][2];
			ep = data[0][3];
			regIns = new Register($(ep).val(), $(pwd).val(), $(nickname).val())
			regIns.requestEmail()
		} else if ($($(data)[0][7]).attr("data-flag") == "dialogPhone") { //弹框手机注册
			nickname = data[0][0]; //openid
			pwd = data[0][4];
			ep = data[0][6];
			regIns = new Register($(ep).val(), $(pwd).val(), $(nickname).val())
			regIns.requestDialogPhone()
		} else if ($($(data)[0][4]).attr("data-flag") == "dialogEmail") { //弹框邮箱注册
			nickname = data[0][0]; //openid
			pwd = data[0][2];
			ep = data[0][3];
			regIns = new Register($(ep).val(), $(pwd).val(), $(nickname).val())
			regIns.requestDialogEmail()
		}
		// }

	}
	//获得链接里的参数
	var getUrlParam = function(url, name) {
		var pattern = new RegExp("[?&]" + name + "=([^&]+)", "g");
		var matcher = pattern.exec(url);
		var items = null;
		if (null != matcher) {
			try {
				items = decodeURIComponent(decodeURIComponent(matcher[1]));
			} catch (e) {
				try {
					items = decodeURIComponent(matcher[1]);
				} catch (e) {
					items = matcher[1];
				}
			}
		}
		return items;
	}
	//注册成功后进入小马托福
	var register_after_into = function() {
		if (msgInto) {
			$.cookie(Final.TOEFL_ID, msgInto.user.id, {
				expires: 1,
				path: '/',
				domain:"yuzhoutuofu.com"})
			$.cookie(Final.TOEFL_OPEN_ID, msgInto.user.open_id, {
				expires: 1,
				path: '/',
				domain:"yuzhoutuofu.com"})
			$.cookie(Final.TOEFL_TOKEN, msgInto.user.auth_token, {
				expires: 1,
				path: '/',
				domain:"yuzhoutuofu.com"})
			$.cookie(Final.TOEFL_NICKNAME, msgInto.user.nickname, {
				expires: 1,
				path: '/',
				domain:"yuzhoutuofu.com"})
			if (!window.WebSocket) {
				$.cookie(Final.TOEFL_UUID, getUuidOnly(), {
					expires: 1,
					path: '/',
					domain:"yuzhoutuofu.com"})
			}
			$.ajax({
				url: URL.baseURL9 + 'users/sign_in',
				headers: {
					Authorization: msgInto.user.auth_token
				},
				data: {
					from: 3
				},
				type: 'post',
				success: function(json) {

				}
			})
			var fromurl = getUrlParam(window.location.href, "fromurl");
			var from = "";
			if (fromurl) {
				from =fromurl
			} else if ($.cookie("TOEFL_SOURCE_TAG")) {
				from = $.cookie("TOEFL_SOURCE_TAG");
			}
			if (fromurl) {
				if (fromurl.indexOf("?") > -1) {
					window.location.href = fromurl + "&tag=1";
				} else {
					window.location.href = fromurl + "?tag=1";
				}
				return;
			}
			if(window.location.href.split("?")[0].indexOf("/html/xiaoma/")>-1){
				window.location.href = "/html/xiaoma/home.html"
			}else{
 				window.location.href = hrefTmp;
			}

		}

	}

	//注册成功后进入小马托福
	var register_after_dialog = function() {
		if (msgInto) {
			$.cookie(Final.TOEFL_ID, msgInto.user.id, {
				expires: 1,
				path: '/',
				domain:"yuzhoutuofu.com"})
			$.cookie(Final.TOEFL_OPEN_ID, msgInto.user.open_id, {
				expires: 1,
				path: '/',
				domain:"yuzhoutuofu.com"})
			$.cookie(Final.TOEFL_TOKEN, msgInto.user.auth_token, {
				expires: 1,
				path: '/',
				domain:"yuzhoutuofu.com"})
			$.cookie(Final.TOEFL_NICKNAME, msgInto.user.nickname, {
				expires: 1,
				path: '/',
				domain:"yuzhoutuofu.com"})
			if (!window.WebSocket) {
				$.cookie(Final.TOEFL_UUID, getUuidOnly(), {
					expires: 1,
					path: '/',
					domain:"yuzhoutuofu.com"})
			}
			$.ajax({
				url: URL.baseURL9 + 'users/sign_in',
				headers: {
					Authorization: msgInto.user.auth_token
				},
				data: {
					from: 3
				},
				type: 'post',
				success: function(json) {

				}
			})
		}

	}

	var resetpwd_after_into = function() {
		if (_id && _openid && _token) {
			$.cookie(Final.TOEFL_ID, _id, {
				expires: 1,
				path: '/'
			})
			$.cookie(Final.TOEFL_OPEN_ID, _openid, {
				expires: 1,
				path: '/'
			})
			$.cookie(Final.TOEFL_TOKEN, _token, {
				expires: 1,
				path: '/'
			})
			if (!window.WebSocket) {
				$.cookie(Final.TOEFL_UUID, getUuidOnly(), {
					expires: 1,
					path: '/'
				})
			}
			if(window.location.href.split("?")[0].indexOf("/html/xiaoma/")>-1){
				window.location.href = "/html/xiaoma/home.html"
			}else{
				window.location.href = hrefTmp;
			}
		}
	}

	var baseMaster = function() {

	}

	baseMaster.prototype.tip = function(t) {

	}

	baseMaster.prototype.request = function(origin) {
		var fromurl = getUrlParam(window.location.href, "fromurl");
		var from = "";
		if (fromurl) {
			from = getUrlParam(fromurl, "from");
		} else if ($.cookie("TOEFL_SOURCE_TAG")) {
			from = $.cookie("TOEFL_SOURCE_TAG");
		}
		var _success = function(msg) {
			if (msg.status == 1) {
				$("#errorMsg").css("color", "red").text(msg.message)
				return false
			} else {
				msgInto = msg
				Render.render({
					wrap: wrap,
					tmpl: {
						tmplName: TMPL.t5
					}
				})
				return false
			}
		}
		$.ajax({
			url: URL.baseURL14 + "users/save_mobile_users",
			type: "POST",
			async: false,
			contentType: "application/json",
			data: JSON.stringify({
				"captcha":$("#img_code").val(),
				"user": {
					"origin": 'phone',
					"open_id": regIns.nickname,
					"password": $.md5(regIns.pwd) || "",
					"from": from || "web",
					"captcha": $('#code').val()
				}
			}),
			success: _success,
			error: function(msg1) {}
		})
	}

	baseMaster.prototype.requestEmail = function(origin) {
		var fromurl = getUrlParam(window.location.href, "fromurl");
		var from = "";
		if (fromurl) {
			from = getUrlParam(fromurl, "from");
		} else if ($.cookie("TOEFL_SOURCE_TAG")) {
			from = $.cookie("TOEFL_SOURCE_TAG");
		}
		var _success = function(msg) {
			if (msg.status == 1) {
				$("#errorMsg").css("color", "red").text(msg.message)
				return false
			} else {
				msgInto = msg
				Render.render({
					wrap: wrap,
					tmpl: {
						tmplName: TMPL.t5
					},
					afterRender: function() {
					}
				})
				return false
			}
		}
		$.ajax({
			url: "/action/user/emailRegister.action",
			type: "POST",
			async: false,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			data: {
				"email": regIns.nickname,
				"password": $.md5(regIns.pwd) || ""
			},
			success: _success,
			error: function(msg1) {}
		})
	}


	baseMaster.prototype.requestDialogPhone = function(origin) {
		var unameRegist = $('#uname').val();
		var pwdRegist = $('#pwd').val();
		var fromurl = getUrlParam(window.location.href, "fromurl");
		var from = "";
		if (fromurl) {
			from = getUrlParam(fromurl, "from");
		} else if ($.cookie("TOEFL_SOURCE_TAG")) {
			from = $.cookie("TOEFL_SOURCE_TAG");
		}
		var _success = function(msg) {
			if (msg.status == 1) {
				$("#errorMsg").css("color", "red").text(msg.message)
				return false
			} else {
				msgInto = msg
				Render.render({
					wrap: $('#loginDiv'),
					tmpl: {
						tmplName: 'app/login/tmpl_login'
					},
					afterRender: function() {
						initValiForm();
						$('#uname').val(unameRegist)
						$('#pwd').val(pwdRegist)
					}
				})
				return false
			}
		}
		$.ajax({
			url: URL.baseURL14 + "users/save_mobile_users",
			type: "POST",
			async: false,
			contentType: "application/json",
			data: JSON.stringify({
				"captcha":$("#img_code").val(),
				"user": {
					// "origin": getOrigin(regIns.nickname),
					"origin": 'phone',
					"open_id": regIns.nickname,
					"password": $.md5(regIns.pwd) || "",
					"from": from || "web",
					"captcha": $('#code').val()
				}
			}),
			success: _success,
			error: function(msg1) {}
		})
	}

	baseMaster.prototype.requestDialogEmail = function(origin) {
		var unameRegist = $('#uname').val();
		var pwdRegist = $('#pwd').val();
		var fromurl = getUrlParam(window.location.href, "fromurl");
		var from = "";
		if (fromurl) {
			from = getUrlParam(fromurl, "from");
		} else if ($.cookie("TOEFL_SOURCE_TAG")) {
			from = $.cookie("TOEFL_SOURCE_TAG");
		}
		var _success = function(msg) {
			if (msg.status == 1) {
				$("#errorMsg").css("color", "red").text(msg.message)
				return false
			} else {
				msgInto = msg
				Render.render({
					wrap: $('#loginDiv'),
					tmpl: {
						tmplName: 'app/login/tmpl_login'
					},
					afterRender: function() {
						initValiForm()
						$('#uname').val(unameRegist)
						$('#pwd').val(pwdRegist)
					}
				})
				return false
			}
		}
		$.ajax({
			url: "/action/user/emailRegister.action",
			type: "POST",
			async: false,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			data: {
				"email": regIns.nickname,
				"password": $.md5(regIns.pwd) || ""
			},
			success: _success,
			error: function(msg1) {}
		})
	}


	baseMaster.prototype.request1 = function(ep, pwd, lgIns) {
		var ep1, pwd1, href1
		if (ep && pwd) { //ep 即为openid
			ep1 = ep
			pwd1 = pwd
		} else {
			ep1 = lgIns.ep
			pwd1 = lgIns.pwd
			href1 =  hrefTmp;
		}
		var _success = function(msg) {
			if (msg.error == "open id not exist") {
				$("#errorMsg").css("color", "red").text("用户名不存在")
				return false
			} else if (msg.error == "password error") {
				$("#errorMsg").css("color", "red").text("密码输入错误，请重新输入")
				return false
			} else {
				// debugger
				if (msg.user.auth_token != "" && msg.user.auth_token != null) {
					//统计用户连续登录天数
					$.ajax({
						url: URL.baseURL9 + 'users/sign_in',
						headers: {
							Authorization: msg.user.auth_token
						},
						data: {
							from: 3
						},
						type: 'post',
						success: function(json) {

						}
					})
					$.cookie(Final.TOEFL_ID, msg.user.id, {
						expires: 1,
						path: '/',
						domain:"yuzhoutuofu.com"});
					$.cookie(Final.TOEFL_OPEN_ID, msg.user.open_id, {
						expires: 1,
						path: '/',
						domain:"yuzhoutuofu.com"});
					$.cookie(Final.TOEFL_TOKEN, msg.user.auth_token, {
						expires: 1,
						path: '/',
						domain:"yuzhoutuofu.com"});
					$.cookie(Final.TOEFL_NICKNAME, msg.user.nickname, {
						expires: 1,
						path: '/',
						domain:"yuzhoutuofu.com"});
					if (!window.WebSocket) {
						$.cookie(Final.TOEFL_UUID, getUuidOnly(), {
							expires: 1,
							path: '/',
							domain:"yuzhoutuofu.com"})
					}
					// }
					if (window.location.href.indexOf('login.html') != -1) {
						var fromurl = getUrlParam(window.location.href, "fromurl")
						if (fromurl) {
							if (fromurl.indexOf("?") > -1) {
								window.location.href = fromurl + "&tag=1";
							} else {
								window.location.href = fromurl + "?tag=1";
							}
							return;
						}
						window.location.href = href1
					} else {
						$('#dialogLogin').modal('hide')
						$.ajax({
							url: '/action/user/getUserProfile.action',
							headers: {
								'token': msg.user.auth_token
							},
							type: 'get',
							success: function(json) {
								var result = json.result;
								// require("app/baseNavInfo")	
								$("#lgNav").css("display", "none")
								$("#userNav").css("display", "block")
								if (isEmpty(result.nickname)) {
									if (result.openId.length > 11) {
										$("#nameNav").html(result.openId.substring(0, 11) + "...")
										$("#nameNav").attr("title", result.openId)

										$("#sideNickname").html(result.openId.substring(0, 11) + "...")
										$("#sideNickname").attr("title", result.openId)
									} else {
										$("#nameNav").html(result.openId)
										$("#nameNav").attr("title", result.openId)

										$("#sideNickname").html(result.openId)
										$("#sideNickname").attr("title", result.openId)
									}
								} else {
									if (result.nickname.length > 11) {
										$("#nameNav").html(result.nickname.substring(0, 11) + "...")
										$("#nameNav").attr("title", result.nickname)

										$("#sideNickname").html(result.nickname.substring(0, 11) + "...")
										$("#sideNickname").attr("title", result.nickname)
									} else {
										$("#nameNav").html(result.nickname)
										$("#nameNav").attr("title", result.nickname)

										$("#sideNickname").html(result.nickname)
										$("#sideNickname").attr("title", result.nickname)
									}
								}
								if (result.avatar) {
									$('#person').attr("src", result.avatar)
								} else {
									$('#person').attr("src", "../i/i1.png")
								}
								NavInfo.initInfo();
								return false
							}
						})
						return false
					}
					return false
				}
				return false
			}
			return false
		}
		$.ajax({
			url: URL.baseURL9 + "users/login?" + "open_id=" + ep1 + "&password=" + $.md5(pwd1),
			type: "POST",
			async: false,
			success: _success,
			error: function(msg) {
				$("#errorMsg").css("color", "red").text("连接不上服务器，请重试")
			}
		})
	}


	var Register = function(ep, pwd, nickname) {
		this.ep = ep
		this.pwd = pwd
		this.nickname = nickname
	}

	var Login = function(ep, pwd) {
		this.ep = ep
		this.pwd = pwd
	}

	//生成唯一标识uuid
	var getUuidOnly = function() {
		var uuid = Math.uuid();
		//生成uuid
		//同时告诉后台，把其他客户端踢掉
		$.ajax({
			url: URL.baseURL9 + 'single_landings/save_tag',
			headers: {
				Authorization: $.cookie(Final.TOEFL_TOKEN)
			},
			data: JSON.stringify({
				"tag": uuid,
				"from": 3
			}),
			contentType: "application/json",
			async: false,
			type: 'post',
			success: function(json) {

			}
		})
		return uuid
	}

	Register.prototype = new baseMaster();
	Login.prototype = new baseMaster();

	var isEmpty = function(param) {
		if (null == param || "" == param) {
			return true
		} else {
			return false
		}
	}

	return {
		init: init,
		initValiForm: initValiForm,
		btnLogin: btnLogin
	}
})
