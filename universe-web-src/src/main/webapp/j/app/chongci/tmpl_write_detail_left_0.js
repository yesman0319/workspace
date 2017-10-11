'use strict'

define(function(){
  return [

  '<div class="content h182">',
    '<p class="p3 gray">',
    '{{if data.from == "exercise"}}',
     // '<a href="/html/exercise.html"><span>全部练习</span></a><span class="sign">></span><span><a id="go1" href="#">写作批改</a></span><span class="sign">></span><span><a id="go2" href="#" category="{{data.category}}">{{data.cText}}</a></span><span class="sign">></span><span>{{data.sequence_number}}</span>',
     '<a href="/html/chongci.html"><span>全部练习</span></a><span class="sign">></span><span><a id="go1" href="#">写作批改</a></span><span class="sign">></span><span><a id="go2" href="#" category="{{data.category}}">{{data.cText}}</a></span><span class="sign">></span><span>{{data.sequence_number}}</span>',
    '{{else}}',
    '<a href="/html/{{data.from}}.html">返回</a>',
    '{{/if}}',
    '</p>',
    '<hr class="mleft25">',
    '<p class="left25 sentence font13">',
     '<span class="bold" style="padding-right:5px;" id="jijing_question_id" category="{{data.category}}" from="{{data.from}}" jqid="{{data.id}}" jqSeqNum="{{data.sequence_number}}" qContent="{{data.content}}">{{data.sequence_number}}.</span>',
     '{{data.content}}',
    '</p>',
    '<p class="gram-p correct-p">',
     '<span><a id = "jijingSample" href="#" class="see">答题范例</a></span>',
    '</p>',

    '<div id="jijingSampleDiv" class="ans" style="display:none;">',
      '<div class="arrow-up"></div>',
      '<div id="sampleContent" class="gram-p1 see-sample">',
        'this is sample area',
      '</div>',
    '</div>',
     '{{if data.anonymous}}',
     '<hr class="mleft25" />',
        '<p class="center">登陆之后开始写作，有老师帮你批改作业</p>',
        '<div class="one-loginbutton">',
        '<button type="button" class="btn btn1 btn-primary" id="btnLogin">登录</button>',
        '</div>',
    '{{/if}}',

  '</div>',
 '{{if !data.anonymous}}',
 '<div class="content h300">',
   '<div class="ans-div1">',
    '<p class="p4 bold"><span class="correct-ans1">我的作文:</span></p>',
    '<textarea id="articleAnswer" spellcheck="false" autocomplete="off" class="left25 form-control bordergreen rewrite-tarea" rows="5" placeholder="请输入作文，50-600个单词"></textarea>',
     '</div>',
    '<div class="one-button3">',
    '<button id="articleSubmit" type="button" class="btn1 btn btn-primary">提交</button>',
    '</div>',
   '</div>',
  '</div>',
'{{/if}}',
'</div>'
  ].join('')
})