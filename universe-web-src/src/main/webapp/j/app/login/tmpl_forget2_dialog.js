'use strict'

define(function(){
  return [
  '<input type="text" id="uname" value="{{data.uname}}" style="display:none;"/>',
  '<input type="text" id="_openid" value="{{data._openid}}" style="display:none;"/>',
  '<input type="text" id="sendto" value="{{data.send}}" style="display:none;"/>',
  '<form role="form" id="forgetForm" data-from="dialog">',
    '<label for="login" class="all-black font24">密码找回</label>',
    '<div class="form-group">',
      '<input type="text" id="sendOpenId" class="tel login2-input" disabled value="{{data._openid}}" style="color: black;margin: 20px auto 0px;" id="uname" placeholder="请输入手机号/邮箱" nullmsg="请输入手机/邮箱" datatype="e|m|/^[a-zA-Z0-9_]{6,30}$/" errormsg="手机号/邮箱格式不正确">',
    '</div>',
    '<div class="form-group">',
     //'<label for="login" class="login-font3 white">输入验证码</label><br>',
     '<input type="text" class="code login2-input" style="margin-top: -4px;" id="code" placeholder="输入短信/邮箱验证码" nullmsg="验证码不能为空" maxlength="6" datatype="*" errormsg=""><label style="cursor:pointer;margin-left:22px;opacity: 0.3;background:#509bfd;" id="time" class="min white">59s后重发</label>',
    '<input type="hidden"  id="img_code" name="img_code">',
    '</div>',
    '<p class="mistake2" id="errorMsg" style="height:39px;color: #d5ac50; ">验证码已发送至您的{{data.sendMsg}}:{{data.send}}</p>',
    '<br>',
    '<button id="btnCaptcha" type="submit" class="btn5 btn btn-primary">确定</button>',
  '</form>'
  ].join('')
})
