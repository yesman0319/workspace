'use strict'

define(function(){
  return [
    '<div class="login-content">',
    '<div class="main mid">',
     '<div class="register-new">',
    '<div class="login-forget">',
     '<div class="login-form" style="margin-top: 0px;">',
    '<form role="form" id="forgetForm">',
      '<label for="login" class="login-font all-blue">密码找回</label>',
      // '<div class="form-group">',
      //  '<input type="text" class="tel" id="tel" placeholder="手机号/邮箱" nullmsg="手机号/邮箱不能为空" datatype="e|m" errormsg="邮箱/手机号格式不正确">',
      // '</div>',
      '<div class="form-group">',
       /*'<input type="text" class="tel" id="uname" placeholder="手机/邮箱/用户名" nullmsg="请输入手机/邮箱/用户名" datatype="e|m|/^[a-zA-Z0-9_]{6,30}$/" errormsg="手机/邮箱/用户名格式不正确">',*/
       '<input type="text" class="tel" id="uname" style="margin-right:20px;" placeholder="请输入手机号/邮箱" nullmsg="请输入手机/邮箱" datatype="e|m|/^[a-zA-Z0-9_]{6,30}$/" errormsg="手机号/邮箱格式不正确">',
      '</div>',
      '<div class="form-group" style="display: inline-block;margin-bottom:0px;">',
      '<input type="text" class="inputxt" style="width: 200px;margin-right:20px;" id="img_code" name="img_code" nullmsg="请输入验证码" placeholder="请输入验证码">',
      '</div>',
      '<div id="codeImg_div" class="form-group " style="display: inline-block;">',
      '</div>',
      '<p class="mistake1 login_war"  id="errorMsg"></p>',

      // '<button type="submit" id="sure1" class="btn5 btn btn-primary">确定</button>',
      '<button type="submit" id="sure1" class="btn5 btn btn-primary" style="margin-top:30px;">获取验证码</button>',
    '</form>',
    '</div>',
     '</div>',
      '</div>',
      '</div>',
    '</div>'
  ].join('')
})
