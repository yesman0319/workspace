'use strict'

define(function(){
  return [
    '<form role="form" id="form" autocomplete="off" style="position:relative;" >',
      '<label for="login" class="all-black font24">邮箱注册</label>',
      '<div class="form-group">',
       '<input type="text" class="tel login2-input" style="margin: 20px auto 0px;" data-flag="registEmail" id="uname" placeholder="请输入邮箱" nullmsg="请输入邮箱" datatype="e" errormsg="邮箱格式不正确">',
      '</div>',
      '<div class="form-group">',
        '<input type="password" class="pwd inputxt login2-input" id="pwd" name="pwd" nullmsg="请输入密码" datatype="/^[a-zA-Z0-9!@#\/$%\/^&amp;\/*\/(\/)_\/+]{6,16}$/"  errormsg="密码以6-16位数字，字母(区分大小写)或特殊字符组成" placeholder="请输入密码">',
      '</div> ',
      '<div class="form-group">',
        '<input type="password" class="pwd inputxt login2-input" id="pwd1" name="pwd1" nullmsg="请再次输入密码" datatype="/^[a-zA-Z0-9!@#\/$%\/^&amp;\/*\/(\/)_\/+]{6,16}$/"  errormsg="两次密码输入不同，请重新输入" placeholder="请再次输入密码">',
      '</div> ',
      '<div class="form-group" style="display:none;">',
        '<input type="text" class="tel" id="tel" ignore="ignore" placeholder="邮箱用于密码找回"  datatype="e" errormsg="邮箱格式不正确">',
      '</div>',
      '<p class="red mistake2">',
        '<span id="errorMsg" class="Validform_checktip Validform_wrong"></span>',
      '</p>',
      '<div id="cbx_register" class="checkbox" style="height:30px;top:0px;">',
      '<label>',
        '<span class="glyphicon-unchecked" style="border:1px solid #dcdcdc;"></span>',
        '<span class="glyphicon glyphicon-ok gly" style="padding-left:4px;"></span>',
        '<span class="regi-rule"> <a href="/html/xmxy.html" target="_blank">我已阅读并遵守《小马过河服务条款》</a></span>',
      '</label>',
      '</div>',
        '<button type="submit" id="btnRegister" data-flag="dialogEmail" class="btn5 btn btn-primary active ">注册</button>',
      '<div style="color:#343434;margin: 25px 0px;">',
        '<a href="javaScript:; id="loginHref" class="a_style" >登录</a>',
        '<a href="javaScript:;" id="registPhoneHref" class="a_style" style="float: right;">手机注册</a>',
      '</div>',
  '</form>'
  ].join('')
})
