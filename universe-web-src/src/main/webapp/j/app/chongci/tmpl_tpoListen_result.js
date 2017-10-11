'use strict'

define(function(){
  return [
   '<div class="right-part1">',
     '<p class="p3 gray">',
      '<span class="bold bread-gray jinJieUnit pointer">正在练习<span class="sign1 ">></span>{{data.group_name}}<span class="sign1 ">></span></span>',
      '<span><a class="bold tpo-passage black">刷题报告页</a></span>',
      '<span class="unit"><a class="pointer tpoListenUnit">TPO听力刷题列表</a></span>',
    '</p>',
   '<hr class="mleft25" />',

   '<div class="practice-result">',

   '{{if data.rate < 50}}',
    '<img src="../../i/i23.png" class="result-img1" />',
   '{{/if}}',
   '{{if data.rate >= 50 && data.rate <= 80 }}',
    '<img src="../../i/i22.png" class="result-img1" />',
   '{{/if}}',
   '{{if data.rate > 80 && data.rate < 100}}',
    '<img src="../../i/i21.png" class="result-img1" />',
   '{{/if}}',

      '{{if data.rate != 100}}',
      '<div class="i25 correctWrong left16">',
      '{{if data.rate >= 90}}',
      '<p class="font12">',
      '<img src="../../i/side-pic41.png" />',
      '</p>',
      '{{else}}',
      '<p class="font12">',
      '<img src="../../i/side-pic43.png" />',
      '</p>',
      '{{/if}}',
      // '<p class="font12">正确率:{{data.rate}}%</p>',
      // '<p class="font12 marginTop">所用时长:{{data.spend_time}}</p>',
      '<span class="font12 re_orange">{{if data.isBest == 1}}本次练习{{else}}最好成绩{{/if}}：</span>',
      '<span class="font12 re_orange  mright10">正确率：{{data.rate}}%</span>',
      '<span class="font12 marginTop re_orange  mright10">所用时长：{{data.spend_time}}</span>',
      '</div>',
      '{{/if}}',
      '</div>',

   '{{if data.rate == 100}}',
      '<div class="right-part2" style="padding-bottom:0px;">',

      '<div class=" correctWrong left50" style="position:absolute;margin-top:-30px;">',
      '<p class="font12">',
      '<img src="../../i/side-pic41.png" />',
      '</p>',
      // '<p class="font12">正确率:{{data.rate}}%</p>',
      // '<p class="font12 marginTop">所用时长:{{data.spend_time}}</p>',
      '<span class="font12 re_orange">{{if data.isBest == 1}}本次练习{{else}}最好成绩{{/if}}：</span>',
      '<span class="font12 re_orange  mright10">正确率：{{data.rate}}%</span>',
      '<span class="font12 marginTop re_orange  mright10">所用时长：{{data.spend_time}}</span>',
      '</div>',

      '<img src="../../i/i24.png" style="width:100%;">',

   '{{/if}}',
  '{{if data.rate != 100}}',

     '{{each data.resultTpos as value index}}',
      '<p style="margin-left:95px;">',
      'TPO{{value.tpoKey}}',
      '</p>',
    '<div style="margin-left:60px;width:80%;" class="bottom15">',
      '{{each value.tpoVal as val ind}}',
        '<span class="page center  pagination5 bottom15" style="margin-left:30px;line-height:50px;"><a href="##" rel="prev" class="b-blue">{{val}}</a></span>',
      '{{/each}}',
      '</div>',
     '{{/each}}',
      '<div class="one-button mbot15" style="">',
      '<button type="button" class="btn btn-primary btn2"  data-group_sequence_number="{{data.group_sequence_number}}" id="againTpoListen">再练一遍</button>',
      '{{if data-next_status != 2}}',
      // '<button type="button" class="btn btn-primary btn1"   id="tpoListenNextUnit" data-next_group_name="{{data.next_group_name}}" data-next_sequence_number="{{data.next_sequence_number}}" data-next_status="{{data.next_status}}" {{if data.next_status == -1}}disabled{{/if}}>下一单元</button>',
      '{{/if}}',
      '</div>',
      '{{else}}',
      '<div class="two-button3">',
      '<button type="button" class="btn btn-primary btn2"   data-group_sequence_number="{{data.group_sequence_number}}" id="againTpoListen">再练一遍</button>',
      '{{if data-next_status != 2}}',
      // '<button type="button" class="btn btn-primary btn1" id="tpoListenNextUnit" data-next_group_name="{{data.next_group_name}}" data-next_sequence_number="{{data.next_sequence_number}}" data-next_status="{{data.next_status}}" {{if data.next_status == -1}}disabled{{/if}}>下一单元</button>',
      '{{/if}}',
      '</div>',
  '{{/if}}',
      '</div>',

   '<div style="clear:both;"></div>',
  '</div>'

    // 券
   // '<div id="quanDiv" class="black_content display mid">',
   //  '<div class="coupon-box" style="">',
   //  '<button  title="关闭" id="closeQuan"></button>',
   //      '<p class="font-black center font20 padtop50  m-left25" >恭喜你获得</p>',
   //      '<span><img src="../../i/num40.png" class="left111"  ></span>',
   //      '<p class="font-black center font20 m-left25 padtop22" >小马托福<span>1</span>张</p>',
   //      '<p class="center white m-left25 padtop18 font14"  >请到<a href="#" class="white font14" >我的优惠</a>里面查看</p>',
   //  '</div>',
   //  '</div>'
  ].join('')
})
