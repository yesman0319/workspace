'use strict'

define(function(){
  return [
    '<form role="form" id="form" autocomplete="off">',
      '<label for="login" class=" all-black font24">用户登录</label>',
      '<div class="form-groupnew" style="width: 377px;/*margin-left: -7px;*/margin: 20px auto;position: relative;">',
         '<label for="loginname" class="login-label name-label"></label>',
         '<input type="text" class="tel login2-input" id="uname" placeholder="请输入手机号/邮箱" nullmsg="请输入手机号/邮箱" datatype="e|m|/^[a-zA-Z0-9_]{6,30}$/" errormsg="手机/邮箱格式不正确">',
         // '<span class="clear-btn" style="display: inline;"></span>',
      '</div>',
      '<div class="form-groupnew" style="width: 376px;/*margin-left: -7px;*/position: relative;">',
         '<label class="login-label pwd-label" for="nloginpwd"></label>',
         '<input type="password" class="pwd login-input1 login2-input" id="pwd" placeholder="请输入密码" nullmsg="请输入密码" datatype="*6-16" errormsg="密码长度为6-16位" maxlength="16">',
         // '<span class="clear-btn" style="display: inline;"></span>',
      '</div>',
      '<p class="red mistake2" style="margin-right: 0px;">',
        '<span id="errorMsg"></span>',
      '</p>',
      '<div class="checkbox mistake2">',
        /*'<span style="margin: 0px;width: 18px;height: 18px;"><input id=""  type="checkbox" style="margin: 0px;"> <label  for="" class="mleft10">记住登录状态</label></span>',*/
        '<label id="cbx_remember_lg" class=" clearb">',
          '<a id="forget" href="#" data-come="dialog" class="forget-pwd" style="color:#343434" >忘记密码?</a>',
        '</label>',
      '</div>',
      '<button type="submit" id="btnLogin" class="btn5 btn btn-primary "style="margin-left: 108px;">登录</button>',
      '<div class="text-center login-tooltip">',
       '<a href="javaScript:;" id="registPhoneHref" class="a_style" >立即注册</a>',
      '</div>',
    '</form>'
  ].join('')
})
