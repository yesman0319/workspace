'use strict'

define(function(){
  return [
   '<div class="right-part1">',
//  '<p class="p1 bold black mleft25"><span>练词>听音辨词>Unit<span id="">{{data.group_sequence_number}}</span>练习报告</span><span class="unit"><a href="#" id="wordUnit1">选择单元</a></span></p>',
    '<p class="p1 bold black mleft25"><img src="../../i/list-pic.png" style="margin-left:   -6px;margin-right:10px;"><span>练习报告</span><span class="unit"><a id="selectUnit" href="#" ></a></span></p>',
    '<hr class="mleft25" />',
    '<div class="family-song" >',
      '<div style="text-align: center;" margin-bottom:30px;">',
       '{{if data.rate < 50}}',
       '<img src="../../i/i23.png">',
       '<div class="i25">',
       /* '<img src="../../i/i25.png">',
        '<div class="hear-tage">',
          '<p class="bold">unit{{data.group_sequence_number}}</p>',
          '<p class="font12">对：{{data.correctCount}}</p>',
          '<p class="font12 marginTop">错：{{data.errorCount}}</p>',
        '</div>',*/
       /* '<p class="font12"><img src="../../i/i25-2.png">正确率：{{data.rate}}%</p>',
        '{{if null != data.avg_speed && "" != data.avg_speed}}',
          '<p class="font12 marginTop"><img src="../../i/i25-3.png">平均速度：{{data.avg_speed}}/题</p>',
        '{{/if}}',*/
        '{{if null != data.avg_speed && "" != data.avg_speed}}',
              '<p class="font12"><img src="../../i/newimg-0.png"></p>',
            '{{/if}}',
        // '<p class="font12">正确率：{{data.rate}}%</p>',
        // '{{if null != data.avg_speed && "" != data.avg_speed}}',
        //   '<p class="font12 marginTop">平均速度：{{data.avg_speed}}/题</p>',
        // '{{/if}}',
        '<span class="font12 re_orange">本次练习：</span>',
        '<span class="font12 re_orange  mright10">正确率：{{data.rate}}%</span>',
        '{{if null != data.avg_speed && "" != data.avg_speed}}',
          '<span class="font12 marginTop re_orange  mright10">平均速度：{{data.avg_speed}}/题</span>',
        '{{/if}}',
       '</div>',
      '{{/if}}',

      '{{if data.rate >= 50 && data.rate <= 80 }}',
       '<img src="../../i/i22.png">',
       '<div class="i25">',
        /*'<img src="../../i/i25.png">',
        '<div class="hear-tage">',
          '<p class="bold">unit{{data.group_sequence_number}}</p>',
          '<p class="font12">对：{{data.correctCount}}</p>',
          '<p class="font12 marginTop">错：{{data.errorCount}}</p>',
        '</div>',*/
        '{{if null != data.avg_speed && "" != data.avg_speed}}',
              '<p class="font12"><img src="../../i/newimg-0.png"></p>',
            '{{/if}}',
        '<span class="font12 re_orange">本次练习：</span>',
        '<span class="font12 re_orange  mright10">正确率：{{data.rate}}%</span>',
        '{{if null != data.avg_speed && "" != data.avg_speed}}',
          '<span class="font12 marginTop re_orange  mright10">平均速度：{{data.avg_speed}}/题</span>',
        '{{/if}}',
       '</div>',
      '{{/if}}',

      '{{if data.rate > 80 && data.rate < 100}}',
       '<img src="../../i/i21.png">',
       '<div class="i25">',
       /* '<img src="../../i/i25.png">',
        '<div class="hear-tage">',
          '<p class="bold">unit{{data.group_sequence_number}}</p>',
          '<p class="font12">对：{{data.correctCount}}</p>',
          '<p class="font12 marginTop">错：{{data.errorCount}}</p>',
        '</div>',*/
        '{{if null != data.avg_speed && "" != data.avg_speed}}',
            '{{if data.group_level == 0}}',
              '<p class="font12"><img src="../../i/newimg-0.png"></p>',
            '{{/if}}',
            '{{if data.group_level == 1}}',
              '<p class="font12"><img src="../../i/newimg-4.png"></p>',
            '{{/if}}',
            '{{if data.group_level == 2}}',
              '<p class="font12"><img src="../../i/newimg-1.png"></p>',
            '{{/if}}',
            '{{if data.group_level == 3}}',
              '<p class="font12"><img src="../../i/newimg-2.png"></p>',
            '{{/if}}',
            '{{if data.group_level == 4}}',
              '<p class="font12"><img src="../../i/newimg-3.png"></p>',
            '{{/if}}',
        '{{/if}}',
        '<span class="font12 re_orange">本次练习：</span>',
        '<span class="font12 re_orange  mright10">正确率：{{data.rate}}%</span>',
        '{{if null != data.avg_speed && "" != data.avg_speed}}',
          '<span class="font12 marginTop re_orange  mright10">平均速度：{{data.avg_speed}}/题</span>',
        '{{/if}}',



        
       '</div>',
      '{{/if}}',

      '{{if data.rate == 100}}',
      '<div class="right-part2" style="padding-bottom:30px;right:0;">',

      '<img src="../../i/i24.png" style="width:100%;">',
      '<div class="two-button3" style="clear:both; position:relative;z-index:100;">',
      '<button type="button" class="btn btn-primary active btn9" data-volunit="1" data-volgroupid="1" id="againWord1">再来一遍</button>',
      //'<button type="button" class="btn btn-primary btn1 {{if data.canUnLocked!=1}}disabled{{/if}}" id="nextUnitWord1">下一单元</button>',
      '{{if !data.isFromPlan}}',
      '<button type="button" class="btn btn-primary btn1" id="showMorePlan">完成</button>',
      '{{/if}}',
      '</div>',
      '</div>',
       '<div class="i25">',
       '{{if null != data.avg_speed && "" != data.avg_speed}}',
            '{{if data.group_level == 0}}',
              '<p class="font12"><img src="../../i/newimg-0.png"></p>',
            '{{/if}}',
            '{{if data.group_level == 1}}',
              '<p class="font12"><img src="../../i/newimg-4.png"></p>',
            '{{/if}}',
            '{{if data.group_level == 2}}',
              '<p class="font12"><img src="../../i/newimg-1.png"></p>',
            '{{/if}}',
            '{{if data.group_level == 3}}',
              '<p class="font12"><img src="../../i/newimg-2.png"></p>',
            '{{/if}}',
            '{{if data.group_level == 4}}',
              '<p class="font12"><img src="../../i/newimg-3.png"></p>',
            '{{/if}}',
        '{{/if}}',
        '<span class="font12 re_orange">本次练习：</span>',
        '<span class="font12 re_orange  mright10">正确率：{{data.rate}}%</span>',
        '{{if null != data.avg_speed && "" != data.avg_speed}}',
          '<span class="font12 marginTop re_orange  mright10">平均速度：{{data.avg_speed}}/题</span>',
        '{{/if}}',
       '</div>',
      '{{/if}}',

      '</div>',
      '{{if data.rate != 100}}',
      '<nav class="pagination4 center">',
       '{{each data.records as value index}}',
        '<span class="page">',
       '<a href="##" rel="prev" {{if !value.isError}}class="ball-blue"{{else}}class="bred"{{/if}}>{{value.question.sequence_number_order}}</a>',
/*  '<a href="##" rel="prev" {{if !value.isError}}class="ball-blue"{{else}}class="bred"{{/if}}>{{index+1}}</a>',*/
       '</span>',
      '{{/each}}',
      '</nav>',
     //    '<div class="hear-wrongvoca hear-wrongvocatop-50" style="clear:both;">',
     //    '<p class="bold" style="margin-left:15px;margin-top: 34px;"><span class="word-position"><img src="../../i/list-pic.png" class="list-pic">答错词汇</span></p>',
     //    '<audio src="" id="audioAudio">亲 您的浏览器不支持html5的audio标签</audio>',
     //      '<ul class="hear-unit hear-misvoca">',
     //      '{{each data.errWords as value index}}',
     //        '{{if index % 2 == 0}}',
     //          '<li>',
     //            '<span class="hearvoca2">{{value.question.sequence_number}}.{{value.question.correctResponseWord}}</span>',
     //            '<span class="pleft10 hearvoca1 font12 tingli-mright6">单词<img src="../../i/i20.png" data-url="{{value.question.word_audio}}" class="pleft10 pointer audioImg"></span>',
     //            '<span class="pleft10 hearvoca1 font12">例句<img src="../../i/i20.png" data-url="{{value.question.sentence_audio}}" class="pleft10 pointer audioImg"></span>',
     //          '</li>',
     //        '{{/if}}',
     //        '{{if index % 2 == 1}}',
     //          '<li>',
     //            '<span class="hearvoca2">{{value.question.sequence_number}}. {{value.question.correctResponseWord}}</span>',
     //            '<span class="pleft10 hearvoca1 font12 tingli-mright6">单词<img src="../../i/i20.png" data-url="{{value.question.word_audio}}" class="pleft10 pointer audioImg"></span>',
     //            '<span class="pleft10 hearvoca1 font12">例句<img src="../../i/i20.png" data-url="{{value.question.sentence_audio}}" class="pleft10 pointer audioImg"></span>',
     //          '</li>',
     //        '{{/if}}',
     //        '{{/each}}',
     //     '</ul>',
     //  '</div>',
     '{{/if}}',
//   '{{if data.rate == 100}}',
//     '<div class="two-button3" style="clear:both; position:absolute;z-index:100;">',
//      '<button type="button" class="btn btn-primary active btn9" data-volunit="1" data-volgroupid="1" id="againWord1">再来一遍</button>',
//'<button type="button" class="btn btn-primary btn1 {{if data.canUnLocked!=1}}disabled{{/if}}" id="nextUnitWord1">下一单元</button>',
//    '</div>',
//   '{{/if}}',
   '{{if data.rate != 100}}',
     '<div class="two-button2">',
      '<button type="button" class="btn btn-primary active btn9" data-volunit="1" data-volgroupid="1" id="againWord1">再来一遍</button>',
      '<button type="button" class="btn btn-primary active btn2" data-group_level="{{data.group_level}}" data-volunit="1" data-volgroupid="1" id="errOnlyWord1">重做错题</button>',
      //'<button type="button" class="btn btn-primary btn1 {{if data.canUnLocked!=1}}disabled{{/if}}" id="nextUnitWord1">完成</button>',
      '{{if !data.isFromPlan}}',
      '<button type="button" class="btn btn-primary btn1" id="showMorePlan">完成</button>',
      '{{/if}}',
    '</div>',
   '{{/if}}'

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