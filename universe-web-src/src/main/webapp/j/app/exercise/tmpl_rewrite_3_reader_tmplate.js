'use strict'

define(function(){
  return [
  '<div class="right-part1"> ',
  '<div class="content h650">',
    '<div class="rewr-div">',
     '<p class="p1 bold black mleft25"><img src="../../i/list-pic.png" class="list-pic"><span>{{data.xm_title}}</span></p>',
    '</div>',
    '<hr class="mleft25">',
    '<div class="mid in-block-style">',
    '<div class="in-block">',
         '<div class="b-blue round1 rewrite-style">',
             '<span class="number1">1</span>',
         '</div>',
         '<div class="rebordergray line1"></div>',
         '<span class="rewrite-check">查看模板</span>',
    '</div>',
    '<div class="in-block">',
        '<div class="bgray round1 rewrite-style1">',
            '<span class="number1">2</span>',
        '</div>',
        '<div class="rebordergray line2"></div>',
        '<span class="rewrite-read">开始复写</span>',
    '</div>',
    '<div class="in-block">',
        '<div class="bgray round1 rewrite-style1 rewrite-style3-round">',
            '<span class="number1">3</span>',
        '</div>',
        /*'<div class="rebordergray line3"></div>',*/
        '<span class="rewrite-write">查看成绩</span>',
    '</div>',
   /*  '<div class="in-block">',
     '<div class="bgray round1 rewrite-style2">',
      '<span class="number1">4</span>',
     '</div>',
      '<span class="rewrite-score">成绩</span>',
     '</div>',*/
     '</div>',
    /*'<p class="left25 top40 font13">',
      /!*'<span class="num bold">{{data.index + 1}}.</span>{{data.subject}}',*!/
      '{{data.subject}}',
    '</p>',*/

    '<div class="left25 top40 right25" onselectstart="return false">',
      '<span class="num bold">模板:</span>',
      '{{each data.en as value index}}',
          '<div>',
              '{{if data.rate[index]&&data.duanClass}}',
              '<div class="left25 round rewrite-percent re-round {{data.duanClass[index]}}">',
              '<span class="number">{{data.rate[index]>=100?100:data.rate[index]}}%</span>',
              '</div>',
              '{{/if}}',
              '<p class="rewrite-span">{{value}}</p>',
          '</div>',
     '{{/each}}',
      
      /*'<p class="rewrite-span1 check-trans"><a href="##" id="showAnswer" >查看翻译</a></p>',*/
      '<div class="ans" style="display:none">',
        '<div class="arrow-up1">',
         '<!--向上的三角-->',
        '</div>',
        '<div class="resee-ans" >',
          '{{each data.ch as value index}}',
          '<p class="rewrite-span">{{value}}',
          '</p>',
          '{{/each}}',
       '</div>',
      '</div>',
   '</div>',
    '<div class="one-button">',
      '<button type="button" class="btn btn-primary btn1" data-type="pian" id="btnExercisePiece1">开始复写</button>',
  '</div>',
  /*'<div class="two-button">',
  '<button type="button" class="btn btn-primary btn2" data-type="duan" id="btnExerciseStage">按段练习</button>',
  '<button type="button" class="btn btn-primary btn1" data-type="pian" id="btnExercisePiece">全篇复写</button>',
  '</div>',*/
  '</div>',
 '</div>'
  ].join('')
})