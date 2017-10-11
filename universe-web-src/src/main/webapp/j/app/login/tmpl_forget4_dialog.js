'use strict'

define(function(){
  return [
  '<form role="form">',
  '<input type="text" id="uname" value="{{data.uname}}" style="display:none;"/>',
  '<input type="text" id="pwd" value="{{data.pwd}}" style="display:none;"/>',
  '<div class="text-center"> ',
    '<label for="login" class="all-black font24">修改密码成功</label>',
  '</div> ',
    '<p class="red mistake1" id="f1_msg"></p>',
    '<br>',
    // '<button id="resetpwd_after_into" type="button" class="btn5 btn btn-primary">进入小马托福</button>',
    '<button id="btnResetLogin" type="button" class="btn5 btn btn-primary" style="margin-top:60px">立即进入</button>',
  '</form>'
  ].join('')
})