'use strict'

define(function(){
  return [
  // 非会员 无预约
  '<img src="../../i/member_tit.jpg"/>',
  '<div class="member_con">',
  ' <div class="m_txt">',
  '   <div class="middle_tab">',
  '      <span class="font14 bold mtop15">{{data.nickName}}</span>',
  '     <p class="mtop5">今天是<span class="blue509">{{data.today}}</span>，最近一次托福考试是在<span class="blue509">{{data.latest}}</span></p>',
  '   </div>',
  ' </div>',
   '<div class="m_con">',
   '    <div class="text-left">',
   '        <p class="m_bluebg">今日课程</p>',
   '<div class="pleft10 pr10 text-center">',
         '<p class="text-left">非会员或基础会员没有免费的直播课程，你可以单独购买或者升级会员等级</p>',
           '<button class="light_btn mtop20 " id="goQuestion"><img class="mright5 vm" src="../../i/home_ip.png" /><span class="vm">咨询客服</span></button>',
           '</div>',
   // '        <p class="mleft15 mtop15 font12 ">你还没有预约课程哦，可以到课程中心查看。</p>',
   // '        <p class="text-center"><button class="light_btn mtop10 text-center" id="goCourse">去课程中看看</button></p>',
   '    </div>',
   '    <div class="text-left">',
   '        <p class="m_bluebg">今日练习</p>',
   '        <p class="mleft15 mtop15 font12 ">你还没有成为小马会员，暂时没有练习计划。</p>',
   // '        <p class="text-center"><button class="deep_btn mtop10" id="goMember">查看会员权益</button></p>',
   '    </div>',
   ' </div>',
   '</div>'
  ].join('')
})
