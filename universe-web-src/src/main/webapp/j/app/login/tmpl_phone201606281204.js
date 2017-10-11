'use strict'

define(function(){
  return [
    '<form role="form" id="form" autocomplete="off" style="position:relative;" >',
      '<label for="login" class="login-font all-blue">手机注册</label>',
      '<div class="form-group">',
      ' <input autocomplete="off" type="text" class="tel inputxt unameBlur" id="uname" placeholder="请输入手机号" nullmsg="请输入手机号" datatype="m" errormsg="请输入正确的11位手机号码">',
      '</div>',

      '<div class="form-group" style="display: inline-block;margin-bottom:0px;">',
      '<input autocomplete="off" type="text" class="inputxt" style="width: 200px;height: 45px;margin-right:20px;" id="img_code" name="img_code" nullmsg="请输入验证码" placeholder="请输入验证码">',
      '</div>',
      '<div id="codeImg_div" class="form-group " style="display: inline-block;">',
      '</div>',

      '<div class="form-group"  style="display: inline-block;">',
      ' <input autocomplete="off" type="text" class="inputxt" style="width: 200px;height: 45px;margin-right:20px;" id="code" name="code" nullmsg="请输入短信验证码" datatype="/^\\d{6}$/" errormsg="短信验证码由6位数字组成" placeholder="短信验证码">',
      '</div>',
      '<div class="form-group "  style="display: inline-block;margin-bottom: 5px;">',
      ' <button id="codeBtn" class="btn5 btn btn-primary active ml0" style="font-size: 16px!important;padding:6px 10px;margin-left: 1px;" disabled="true">获取验证码</button>',
      '</div>',

      '<div class="form-group">',
      '<input style="display:none">','<input type="password" style="display:none">',
      ' <input autocomplete="off" type="password" class="pwd inputxt" id="pwd" name="pwd" nullmsg="请输入密码" datatype="/^[a-zA-Z0-9!@#\/$%\/^&amp;\/*\/(\/)_\/+]{6,16}$/"  errormsg="密码以6-16位数字，字母(区分大小写)或特殊字符组成" placeholder="密码">',
      '</div>',
      '<div class="form-group">',
       '<input autocomplete="off" type="password" class="pwd inputxt" id="pwd1" name="pwd1" nullmsg="请输入确认密码" datatype="/^[a-zA-Z0-9!@#\/$%\/^&amp;\/*\/(\/)_\/+]{6,16}$/"  errormsg="两次密码输入不同，请重新输入" placeholder="确认密码">',
      '</div>',

      '<div class="form-group" style="display:none;">',
       '<input autocomplete="off" type="text" class="tel" id="tel" ignore="ignore" placeholder="手机号/邮箱(选填)用于密码找回"  datatype="e|m" errormsg="邮箱/手机号格式不正确">',
      '</div>',
      '<p class="red mistake">',
       ' <span id="errorMsg" class="Validform_checktip Validform_wrong"></span>',
      '</p>',
      '<div id="cbx_register" class="checkbox" style="height:30px;top:0px;">',
       '<label>',
       ' <span class="glyphicon-unchecked"></span>',
        '<span class="glyphicon glyphicon-ok gly " style="padding-left:5px;"></span>',
        '<span class="regi-rule"> <a href="/html/xmxy.html" target="_blank" style="color:#fff;">我已阅读并遵守《小马过河服务条款》</a></span>',
        ' <a href="javaScript:;" id="emailHref" class="a_style mail_lognnew" style="color: #fff;margin-left:256px">邮箱注册</a>',
       '</label>',
      '</div>',
       '<button type="submit" id="btnRegister" data-flag="homePhone" class="btn5 btn btn-primary active " style="margin-bottom: 20px;">注册</button>',
       //'<div style="color:#343434;margin: 25px 0px;">',
       //' <a href="###" id="emailHref" class="a_style" style="float: right;">邮箱注册</a>',
       //'</div>',
      '</form>'
  ].join('')
})
