'use strict'

define(function(){
  return [
    '<div class="right-part1"> ',
    '<div class="content h650">',
    '<div class="rewr-div">',
        //'<p class="p1 bold mleft25 black"><img src="../../i/list-pic.png" class="list-pic">记忆复写</p>',
        '<p class="p1 bold mleft25 black"><img src="../../i/list-pic.png" class="list-pic">{{data.xm_title}}</p>',
    '</div>',
    '<hr class=" mleft25">',
    '<div class="mid in-block-style">',
        '<div class="in-block">',
            '<div class="b-blue round1 rewrite-style">',
            '<span class="number1">1</span>',
            '</div>',
            '<div class="line1 rebordergray"></div>',
            '<span class="rewrite-check">查看范文</span>',
        '</div>',
        '<div class="in-block">',
            '<div class="bgray round1 rewrite-style1">',
            '<span class="number1">2</span>',
            '</div>',
            '<div class="line2 rebordergray"></div>',
            '<span class="rewrite-read">开始复写</span>',
        '</div>',
        '<div class="in-block">',
            '<div class="bgray round1 rewrite-style1 rewrite-style3-round">',
            '<span class="number1">3</span>',
            '</div>',
            /*'<div class="line3 rebordergray"></div>',*/
            '<span class="rewrite-write">查看成绩</span>',
        '</div>',
        /* '<div class="in-block">',
        '<div class="bgray round1 rewrite-style2">',
        '<span class="number1">4</span>',
        '</div>',
        '<span class="rewrite-score">成绩</span>',
        '</div>',*/
    '</div>',
   /* '<div>',
        '<p class="left25 top40 font13">',
        '<span class="num bold">{{data.num}}.</span>{{data.content}}',
        '</p>',
        '<span class="left25" ><a id="showAnswer" href="##">查看翻译</a></span>',
        '<div class="ans" style="display:none">',
            '<div class="arrow-up3">',
            '<!--向上的三角-->',
            '</div>',
            '<div class="resee-ans1" >',
                '<p class="rewrite-ans">{{data.ch}}</p>',
            '</div>',
        '</div>',
    '</div>',*/

    '<div class="one-button2">',
      '<button id="btnReader" data-id={{data.id}} type="button" class="btn1 btn btn-primary active">阅读范文</button>',
    '</div>',

  '</div>',
 '</div>'
  ].join('')
})
