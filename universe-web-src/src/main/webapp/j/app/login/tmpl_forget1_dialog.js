'use strict'

define(function(){
  return [
    '<form role="form" id="forgetForm" data-from="dialog">',
      '<label for="login" class="all-black font24">密码找回</label>',
      '<div class="form-group">',
       '<input type="text" class="tel login2-input" style="color: black;margin: 20px auto 0px;" id="uname" placeholder="请输入手机号/邮箱" nullmsg="请输入手机/邮箱" datatype="e|m|/^[a-zA-Z0-9_]{6,30}$/" errormsg="手机号/邮箱格式不正确">',
      '</div>',
      '<div class="form-group" style="display: inline-block;margin-bottom:0px;">',
      '<input type="text" class="login2-input" style="width: 200px;margin-right:20px;" id="img_code" name="img_code" nullmsg="请输入验证码" placeholder="请输入验证码">',
      '</div>',
      '<div id="codeImg_div" class="form-group " style="display: inline-block;">',
      '</div>',
      '<p class="mistake2 login_war2" id="errorMsg"></p>',
      '<br>',
      '<button type="submit" id="sure1" class="btn5 btn btn-primary" style="margin-top: 30px;">获取验证码</button>',
    '</form>'
  ].join('')
})
