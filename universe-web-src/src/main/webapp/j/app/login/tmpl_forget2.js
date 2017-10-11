'use strict'

define(function(){
  return [
  '<div class="login-content">',
  '<div class="main mid">',
   '<div class="register-new">',
   '<div class="login">',
 '<div class="login-form">',
  '<input type="text" id="uname" value="{{data.uname}}" style="display:none;"/>',
  '<form role="form" id="forgetForm">',
    '<label for="login" class="all-blue font20 login-font">密码找回</label>',
    '<div class="form-group">',
     '<input type="text" class="code" id="code" placeholder="输入短信/邮箱验证码" nullmsg="验证码不能为空" maxlength="6" datatype="*" errormsg=""><label style="cursor:pointer" id="time" class="min white">59s后重发</label>',
      '<input type="hidden"  id="img_code" name="img_code">',
      '</div>',
    '<div id="sendto" style="display: none;">{{data.send}}</div>',
    '<p class="mistake1" id="errorMsg" style="height:39px;color: #d5ac50;">验证码已发送至您的{{data.sendMsg}}:{{data.send}}</p>',
    '<button id="btnCaptcha" type="submit" class="btn5 btn btn-primary">确定</button>',
  '</form>',
'</div> ',
'</div>'
  ].join('')
})
