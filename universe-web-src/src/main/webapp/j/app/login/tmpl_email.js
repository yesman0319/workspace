'use strict'

define(function(){
  return [
    '<form role="form" id="form" autocomplete="off" style="position:relative;" >',
    '    <label for="login" class="login-font all-blue">邮箱注册</label>',
    '    <div class="form-group">',
    '        <input type="text" class="tel" id="uname" placeholder="请输入邮箱" nullmsg="请输入邮箱" datatype="e|m|/^[a-zA-Z0-9_]{6,30}$/" errormsg="邮箱格式不正确">',
    '    </div>',

    '    <div class="form-group">',
    '        <input type="password" class="pwd inputxt" id="pwd" name="pwd" nullmsg="请输入密码" datatype="/^[a-zA-Z0-9!@#\/$%\/^&amp;\/*\/(\/)_\/+]{6,16}$/"  errormsg="密码以6-16位数字，字母(区分大小写)或特殊字符组成" placeholder="密码">',
    '    </div>',
    '    <div class="form-group">',
    '        <input type="password" class="pwd inputxt" id="pwd1" name="pwd1" nullmsg="请输入确认密码" datatype="/^[a-zA-Z0-9!@#\/$%\/^&amp;\/*\/(\/)_\/+]{6,16}$/"  errormsg="两次密码输入不同，请重新输入" placeholder="确认密码">',
    '    </div>',

    '    <div class="form-group" style="display:none;">',
    '        <input type="text" class="tel" id="tel" ignore="ignore" placeholder="手机号/邮箱(选填)用于密码找回"  datatype="e|m" errormsg="邮箱/手机号格式不正确">',
    '    </div>',
    '    <p class="red mistake">',
    '        <span id="errorMsg" class="Validform_checktip Validform_wrong"></span>',
    '    </p>',
    '    <div id="cbx_register" class="checkbox" style="height:30px;top:0px;">',
    '        <label>',
    '            <span class="glyphicon-unchecked"></span>',
    '            <span class="glyphicon glyphicon-ok gly" style=""></span>',
    '            <span class="regi-rule"> <a href="/html/xmxy.html" target="_blank" style="color:#fff;">我已阅读并遵守《小马过河服务条款》</a></span>',
    '        </label>',
    '      <a href="javaScript:;" id="phoneHref" class="a_style mail_lognnew" style="color: #fff;margin-left:256px">手机注册</a>',
    '    </div>',
    '    <button type="submit" id="btnRegister" data-flag="homeEmail" class="btn5 btn btn-primary active " style="margin-bottom: 20px;">注册</button>',
    //'    <div style="color:#343434;margin: 25px 0px;">',
    //'      <a href="###" id="phoneHref" class="a_style" style="float: right;">手机注册</a>',
    //'    </div>',
    '</form>'
  ].join('')
})
