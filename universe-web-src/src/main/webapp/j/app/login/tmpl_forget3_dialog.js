'use strict'

define(function(){
  return [
  '<form role="form" id="resetpwdForm" data-from="dialog">',
    '<label for="login" class="all-black font24">密码找回</label>',
    '<div style="display: none;" id="sendTo">{{data.sendTo}}</div>',
    '<div style="display: none;" id="code">{{data.code}}</div>',
    '<div style="display: none;" id="uname">{{data.uname}}</div>',
    '<div class="form-group">',
      '<input type="text" id="sendOpenId" class="tel login2-input" disabled value="{{data.sendTo}}" style="color: black;margin: 20px auto 0px;" placeholder="请输入手机号/邮箱" nullmsg="请输入手机/邮箱" datatype="*" errormsg="">',
    '</div>',
    '<div class="form-group">',
      '<input type="text" id="sendCode" class="tel login2-input" disabled value="{{data.code}}" style="color: black;" placeholder="输入验证码" nullmsg="验证码不能为空" maxlength="6" datatype="*" errormsg="">',
    '</div>',
    '<div class="form-group">',
     '<input type="password" class="pwd login2-input" id="newpwd" name="userpassword" placeholder="请输入新密码" nullmsg="新密码不能为空" datatype="/^[a-zA-Z0-9!@#\/$%\/^&amp;\/*\/(\/)_\/+]{6,16}$/" errormsg="密码以6-16位数字，字母(区分大小写)或特殊字符组成">',
    '</div>',
    '<div class="form-group">',
     '<input type="password" class="pwd login2-input" id="newpwd2" name="userpassword2" placeholder="再次输入密码" nullmsg="请输入确认密码" datatype="/^[a-zA-Z0-9!@#\/$%\/^&amp;\/*\/(\/)_\/+]{6,16}$/" errormsg="两次密码输入不同，请重新输入" recheck="userpassword">',
    '</div>',
    '<p class="red mistake2" id="f1_msg"><span id="errorMsg" class="Validform_checktip Validform_wrong"></span></p>',
    '<br>',
    '<button id="btnResetPwd" type="submit" class="btn5 btn btn-primary mbot20">重设密码</button>',
  '</form>'
  ].join('')
})

