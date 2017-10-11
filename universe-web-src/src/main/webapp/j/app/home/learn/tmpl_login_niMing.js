'use strict'

define(function(){
  return [
  // 未登录
  '<img src="../../i/member_tit.jpg"/>',
  '<div class="member_con">',
  '   <div class="m_txt">',
  '       <div class="middle_tab">',
  '           <p class="mtop5">今天是<span class="blue509">{{data.today}}</span>，最近一次托福考试是在<span class="blue509">{{data.latest}}</span></p>',
  '       </div>',
  '   </div>',
    '<div class="m_con">',
    '  <p class="font14 bold mtop50">课程和练习中心</p>',
    '  <p class="graynew">你还没有登录，请先<a class="blue509 pointer" id="loginHome">登录</a></p>',
    // '  <button class="light_btn mtop30" id="goCourse">去课程中看看</button></br>',
    // '<button class="deep_btn mtop10">查看会员权益</button>',
    '</div>',
  '</div>'
  ].join('')
})
