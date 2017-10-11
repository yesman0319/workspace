'use strict'

define(function(){
  return [
  '<div class="right-part1">',
    //'<p class="p1 bold black mleft25"><img src="../../i/list-pic.png" class="list-pic"><span>阅读词汇第<span id="volUnit"></span>单元</span><span class="unit"><a href="#" id="unitVol"></a></span></p>',
      '<p class="p1 bold black mleft25"><img src="../../i/list-pic.png" class="list-pic"><span>练习报告</span><span class="unit"><a href="#" id="unitVol"></a></span></p>',
    '<hr class="mleft25">',
    '{{if data.volErr.length}}',
      /*'<h4>正确率为{{data.rate}}%</h4>',*/
      '{{if data.rate < 50}}',
      '<div class="practice-result">',
      '<img src="../../i/i23.png">',
       // '<span class="result1 result-gray">正确率:{{data.rate}}%</span>',
          '<div class="i25 correctWrong">',
        '{{if null != data.avg_speed && "" != data.avg_speed}}',
              '<p class="font12"><img src="../../i/newimg-0.png"></p>',
            '{{/if}}',

            // '<p class="font12">正确率：{{data.rate}}%</p>',
            // '{{if null != data.avg_speed && "" != data.avg_speed}}',
            //   '<p class="font12 marginTop">平均速度：{{data.avg_speed}}/题</p>',
            // '{{/if}}',
            '<span class="font12 re_orange">{{if data.isBest == 1}}本次练习{{else}}最好成绩{{/if}}：</span>',
            '<span class="font12 re_orange  mright10">正确率：{{data.rate}}%</span>',
            '{{if null != data.avg_speed && "" != data.avg_speed}}',
              '<span class="font12 marginTop re_orange  mright10">平均速度：{{data.avg_speed}}/题</span>',
            '{{/if}}',
         '</div>',
  /*     '<span class="result1 result-gray">对{{data.rate}}&nbsp;错{{100-data.rate}}</span>',*/
      '</div>',
      '{{/if}}',


      '{{if data.rate >= 50 && data.rate <= 80 }}',
       '<div class="practice-result">',
      '<img src="../../i/i22.png" >',
       // '<span class="result1 result-orange">正确率:{{data.rate}}%</span>',
        '<div class="i25">',
       '{{if null != data.avg_speed && "" != data.avg_speed}}',
              '<p class="font12"><img src="../../i/newimg-0.png"></p>',
            '{{/if}}',

            // '<p class="font12">正确率：{{data.rate}}%</p>',
            // '{{if null != data.avg_speed && "" != data.avg_speed}}',
            //   '<p class="font12 marginTop">平均速度：{{data.avg_speed}}/题</p>',
            // '{{/if}}',


            '<span class="font12 re_orange">{{if data.isBest == 1}}本次练习{{else}}最好成绩{{/if}}：</span>',
            '<span class="font12 re_orange  mright10">正确率：{{data.rate}}%</span>',
            '{{if null != data.avg_speed && "" != data.avg_speed}}',
              '<span class="font12 marginTop re_orange  mright10">平均速度：{{data.avg_speed}}/题</span>',
            '{{/if}}',
         '</div>',
      /* '<span class="result1 result-gray">对{{data.rate}}&nbsp;错{{100-data.rate}}</span>',*/
      '</div>',
      '<div class="practice-result">',
        // '<span class="result2 result-orange">娃 你已经超越了好多小伙伴。继续加油哦！</span>',
      '</div>',
      '{{/if}}',


      '{{if data.rate > 80 && data.rate <= 100 }}',
       '<div class="practice-result">',
      '<img src="../../i/i21.png">',
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
            '<span class="font12 re_orange">{{if data.isBest == 1}}本次练习{{else}}最好成绩{{/if}}：</span>',
            '<span class="font12 re_orange  mright10">正确率：{{data.rate}}%</span>',
            '{{if null != data.avg_speed && "" != data.avg_speed}}',
              '<span class="font12 marginTop re_orange  mright10">平均速度：{{data.avg_speed}}/题</span>',
            '{{/if}}',
       '</div>',
        // '<span class="result1 result-red">正确率:{{data.rate}}%</span>',
     /*   '<span class="result1 result-gray">对{{data.rate}}&nbsp;错{{100-data.rate}}</span>',*/
         '</div>',
      '<div class="practice-result">',
        // '<span class="result2 result-red">学霸升级中~加油吧亲！</span>',
      '</div>',
      '{{/if}}',



'{{if data.rate != 100 }}',
      '<p class="mleft25 bold">答错词汇：</p>',
      '{{each data.volErr as value index}}',
      '<div class="table W645">',
          '<ul class="wrong_font">',
              '<li class="vol-space3" >',
                  // '<span class="vol-space1">{{value.volErr.sequenceNumber}}.&nbsp;</span>',
                  '<span class="td1 vol-space4">{{value.volErr.prompt}}</span>',
                  '<span class="mleft25">{{value.volErr.explanation}}</span>',
              '</li>',
              '<li class="vol-space5">',
                  '<span class="all-blue vol_newwid">{{value.volErr.partOfSpeech}}</span>',
                  '<span class="mleft25 gray1">[{{value.volErr.symbols}}]</span>',
              '</li>',
          '</ul>',
      '</div>',

         /*     '<div class="table W645">',
          '<table class="table2"><tbody>',
            '<tr>',
              '<td>{{value.volErr.sequenceNumber}}</td>',
              '<td class="td1 bold">{{value.volErr.prompt}}</td>',
            '</tr>',
            '<tr>',
              '<td>{{value.volErr.explanation}}</td>',
            '</tr>',
          '</tbody></table>',
        '</div>',*/


      '{{/each}}',
      '{{/if}}',
      '<div class="two-button">', 

      '<button type="button" class="btn btn-primary btn9" data-volUnit={{data.volUnit}} data-volGroupId={{data.volGroupId}}   id="againVol">再来一遍</button>',
      '<button type="button" class="btn btn-primary btn2" data-volUnit={{data.volUnit}} data-volGroupId={{data.volGroupId}}   id="errOnlyVol">重做错题</button>',
      //'<button type="button" class="btn btn-primary btn1 {{if data.canUnLocked!=1}}disabled{{/if}}" id="nextUnitVol">下一题</button>',
      '{{if !data.isFromPlan}}',
      '<button type="button" class="btn btn-primary btn1" id="showMorePlan">完成</button>',
      '{{/if}}',
      '</div>',
    '{{else if data.volErr.length == 0}}',
      '<div >',
      '<img src="../../i/i24.png" class="i24">',
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
        // '<p class="font12"><img src="../../i/i25-2.png">正确率：{{data.rate}}%</p>',
        // '{{if null != data.avg_speed && "" != data.avg_speed}}',
        //       '<p class="font12 marginTop"><img src="../../i/i25-3.png">平均速度：{{data.avg_speed}}/题</p>',
        //     '{{/if}}',
        '<span class="font12 re_orange">{{if data.isBest == 1}}本次练习{{else}}最好成绩{{/if}}：</span>',
            '<span class="font12 re_orange  mright10">正确率：{{data.rate}}%</span>',
            '{{if null != data.avg_speed && "" != data.avg_speed}}',
              '<span class="font12 marginTop re_orange  mright10">平均速度：{{data.avg_speed}}/题</span>',
            '{{/if}}',
       '</div>',
         '</div>',
    '<div>',
    '<div class="two-button3">',
      '<button type="button" class="btn btn-primary btn9" data-volUnit={{data.volUnit}} data-volGroupId={{data.volGroupId}}  id="againVol">再来一遍</button>',
      //'<button type="button" class="btn btn-primary btn1 {{if data.canClick!=1}}disabled{{/if}}" id="nextUnitVol">完成</button>',
      '{{if !data.isFromPlan}}',
      '<button type="button" class="btn btn-primary btn1" id="showMorePlan">完成</button>',
      '{{/if}}',
      '</div>',
    '{{else}}',
    '{{/if}}',
  '</div>'

  ].join('')
})
