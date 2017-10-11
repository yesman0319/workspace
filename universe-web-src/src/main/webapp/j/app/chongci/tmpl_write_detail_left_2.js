'use strict'

define(function(){
  return [

  	'<div class="content h182">',
    '<p class="p3 gray">',
    '{{if data.from =="exercise"}}',
     '<a href="/html/chongci.html"><span>冲刺练习</span></a><span class="sign">></span><span><a id="go1" href="#">写作批改</a></span><span class="sign">></span><span><a id="go2" href="#" category="{{data.category}}">{{data.cText}}</a></span><span class="sign">></span><span>{{data.sequence_number}}</span>',
    '{{else}}',
    '<a href="/html/{{data.from}}.html">返回</a>',
    '{{/if}}',
    '</p>',
    '<hr>',
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
  '<div class="content h202">',
   '<div class="ans-div1">',
    '<p class="p4 bold jijing-space2" ><span class="correct-ans">我的作文:</span><span class="red score-wcorrect" >{{data.score}}分</span></p>',
    '<p class="left25 sentence p5">{{#data.answerContent}}</p>',
  '</div>',
'</div>'
  ].join('')
})