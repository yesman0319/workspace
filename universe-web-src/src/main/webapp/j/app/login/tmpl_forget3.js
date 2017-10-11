'use strict'

define(function(){
  return [
   '<div class="login-content">',
    '<div class="main mid">',
     '<div class="register-new">',
   '<div class="login">',
 '<div class="login-form">',
  '<form role="form" id="resetpwdForm">',
    '<label for="login" class="all-black font24">密码找回</label>',
    '<div style="display: none;">{{data.sendTo}}</div>',
    '<div style="display: none;">{{data.code}}</div>',
    '<div class="form-group">',
     '<input type="password" class="pwd" id="newpwd" name="userpassword" placeholder="请输入新密码" nullmsg="新密码不能为空" datatype="/^[a-zA-Z0-9!@#\/$%\/^&amp;\/*\/(\/)_\/+]{6,16}$/" errormsg="密码以6-16位数字，字母(区分大小写)或特殊字符组成">',
    '</div>',
    '<br>',
    '<div class="form-group">',
     '<input type="password" class="pwd" id="newpwd1" name="userpassword2" placeholder="再次输入密码" nullmsg="请输入确认密码" datatype="/^[a-zA-Z0-9!@#\/$%\/^&amp;\/*\/(\/)_\/+]{6,16}$/" errormsg="两次密码输入不同，请重新输入" recheck="userpassword">',
    '</div>',
    '<p class="red mistake1" id="f1_msg"><span id="errorMsg" class="Validform_checktip Validform_wrong"></span></p>',
    '<br>',
    '<button id="btnResetPwd" type="submit" class="btn5 btn btn-primary">重设密码</button>',
  '</form>',
'</div> ',
 '</div> ',
    '</div> ',
    '</div> ',
'</div>'
  ].join('')
})

