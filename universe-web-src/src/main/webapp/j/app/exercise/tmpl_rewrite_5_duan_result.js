'use strict'

define(function(){
  return [
    '<div class="right-part1"> ',
  '<div class="content h650">',
    '<div class="rewr-div">',
    //' <p class="p1 bold mleft25 black"><img src="../../i/list-pic.png" class="list-pic">记忆复写</p>',
    ' <p class="p1 bold mleft25 black"><img src="../../i/list-pic.png" class="list-pic">练习报告</p>',
   '</div>',
    '<hr class="mleft25">',
    '<div class="mid in-block-style">',
    '<div class="in-block">',
     '<div class="b-blue round1 rewrite-style">',
      '<span class="number1">1</span>',
     '</div>',
     '<div class="line1 rebordergreen"></div>',
     '<span class="rewrite-check">查看范文</span>',
    '</div>',
    '<div class="in-block">',
     '<div class="b-blue round1 rewrite-style1">',
      '<span class="number1">2</span>',
     '</div>',
     '<div class="line2 rebordergreen "></div>',
      '<span class="rewrite-read">开始复写</span>',
    '</div>',
    '<div class="in-block">',
     '<div class="b-blue round1 rewrite-style1 rewrite-style3-round">',
      '<span class="number1">3</span>',
      '</div>',
     '<span class="rewrite-write">查看成绩</span>',
    '</div>',
    /* '<div class="in-block">',
     '<div class="bgray round1 rewrite-style2">',
     ' <span class="number1">4</span>',
     '</div>',
      '<span class="rewrite-score">成绩</span>',
     '</div>',*/
     '</div>',
    '<p class="left25 top40 font13">',
       /* '<span class="num bold">{{data.index+1}}.</span>',*/
        '<span>',
        '{{data.subject}}',
        '</span>',
    '</p>',
    '<p class="left25 top40 font13">',
      '<span>',
        '{{#data.sureAns}}',
      '</span>',
    '</p>',
    '<div class="left25 top35">',
      '<span class="num bold">我的复写：</span>',
      '{{if data.flag}}',
       '<div class="left25 bgreen round rewrite-percent" style="width:50px;">',
       '<span class="number">{{data.score}}%</span>',
       '</div>',
       '{{/if}}',
      '<p style="margin-top:10px;">',
        '<span>',
         '{{data.userContent}}',
        '</span>',
      '</p>',
    '</div>',
    '<div class="one-button2">',
      '<button type="button" id="btnDuanAgain" class="btn2 btn btn-primary active">再来一遍</button>',
      '<button id="btnNext" type="button" class="btn1 btn btn-primary active">下一段</button>',
  '</div>',
  '</div>',
 '</div>'
  ].join('')
})