'use strict'

define(function(){
  return [


  	'<div class="h182">',
    '<p class="p3 gray">',
    '{{if data.from == "exercise"}}',
     '<a href="/html/chongci.html"><span>冲刺练习</span></a><span class="sign">></span><span><a id="go1" href="#">写作批改</a></span><span class="sign">></span><span><a id="go2" href="#" category="{{data.category}}">{{data.cText}}</a></span><span class="sign">></span><span>{{data.sequence_number}}</span>',
    '{{else}}',
    '<a href="/html/{{data.from}}.html">返回</a>',
    '{{/if}}',
    '</p>',
    '<hr class="mleft25">',
    '<p class="left25 sentence font13">',
     '<span class="bold" style="padding-right:5px;" id="jijing_question_id" category="{{data.category}}" jqid="{{data.id}}" from="{{data.from}}">{{data.sequence_number}} </span>',
     '{{data.content}}',
    '</p>',
    '<p class="gram-p correct-p">',
     '<span><a id = "jijingSample" href="#" class="see">答题范例</a></span><span>',
    '</p>',
    '<div id="jijingSampleDiv" class="ans" style="display:none;">',
      '<div class="arrow-up"></div>',
      '<div id="sampleContent" class="gram-p1 see-sample">',
        'this is sample area',
      '</div>',
    '</div>',
  '</div>',
  '<div class="h202">',
   '<div class="">',
    '<p class="p1 bold center">请等待老师批改</p>',
    '<hr class="mleft25">',
    '<p class="p4 bold"><span class="correct-ans">我的作文:</span><div class="left25 bgray round rewrite-percent"><span class="number zonghe-bgray">待批</span></div></p>',
    '<p class="left25 sentence score-p6 right13">{{#data.answerContent}}</p>',

  '</div>',
'</div>',



  ].join('')
})