'use strict'

define(function(){
  return [

     '<div class="right-part2">',

      '<div class="tpo-right-part1">',
        '<p class="p3 gray">',
          '<span class="bold ">正在练习<span class="sign1">></span>TPO听力刷题<span class="sign1 bread-gray">></span><span class="black">{{data.group_name}}</span></span>',

          '<span class="unit"><a class="pointer tpoListenUnit">TPO听力刷题列表</a></span>',
           '<span class="time-pos" id="timerspan" style="margin-top:-3px;"><img src="../../i/time.png"><a href="##" class="timeBtn">计时:</a><a id="testTimer">{{data.currentTestTimeStrListen}}</a></span>',
        '</p>',
        '<hr class="mleft25" />',
        '<div id="tpoListenQuestion"></div>',
      '</div>',

   '</div> ',
'<div class="modal fade" id="submitModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">',
  '<div class="modal-dialog">',
    '<div class="modal-content" style="width:354px;border: 1px solid #C2BFBF;border-top: 7px solid #509bfd;;">',
      // '<div class="modal-header feedback-header">',
      //   '<span class="feedback-heading">反馈</span>  ',
      //   '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>',
      // '</div>',
      '<div class="modal-body">',
        '<p class="feedback-title" style="text-align:center;top:0px;">计时还未结束,确认提交?</p>',
      '</div>',
      '<div class="one-button3">',
        '<button type="button" class="btn btn-default btn-sm feedback-button1" data-dismiss="modal" id="cancleSubmitListen">取消</button>',
        '<button type="button" class="btn btn-primary btn-sm feedback-button2 btn1" id="submitListen">确认</button>',
      '</div>',
    '</div>',
  '</div>',
'</div>'
  ].join('')
})
