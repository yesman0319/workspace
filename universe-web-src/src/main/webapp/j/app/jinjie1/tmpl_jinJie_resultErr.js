'use strict'

define(function(){
  return [
   '<div class="right-part1">',
     '<p class="p3 gray">',
      // '<span><a href="/html/chongci.html" class="bold bread-gray">正在练习</a><span class="sign1 bread-gray">></span></span>',
      '<span><a class="bold bread-gray jinJieUnit pointer">TPO阅读</a><span class="sign1 bread-gray">></span></span>',
      // '<span><a class="bold bread-gray jinJieUnit pointer">{{data.tpoNum}}</a></span><span class="sign1 bread-gray">></span>',
      '<span><a class="bold tpo-passage">{{data.tpoNum}} - passage {{data.sequence_number}}</a></span>',
      '<span class="unit"><a class="pointer jinJieUnit">TPO阅读列表</a></span>',
    '</p>',
   '<hr class="mleft25" />',

   '<div class="practice-result">',

   '{{if data.errorCount != 0}}',
   '<div class="hear-judge family-yahei">',
        '<span>Passage {{data.sequence_number}} {{data.group_sequence_number}}  对：{{data.correctCount}}  错：{{data.errorCount}}</span>',
        '</div>',
   '{{/if}}',
   '</div>',

   '{{if data.errorCount == 0}}',
   '<h4 class="h41">练习结束！错题已全部练完<img src="../../i/i2.png"></h4>',
    // '<img src="../../i/i24.png">',
   '{{/if}}',

  '{{if data.errorCount != 0}}',
   '<nav class="pagination4 center">',
     '{{each data.question_results as value index}}',
      '{{if value.is_correct == 1}}',
        '<span class="page"><a href="##" rel="prev" class="ball-blue">{{value.section_number+1}}</a></span>',
      '{{else}}',
        '<span class="page"><a href="##" rel="prev" class="bred">{{value.section_number+1}}</a></span>',
      '{{/if}}',
     '{{/each}}',
   '</nav>',
  '{{/if}}',

  '{{if data.errorCount != 0}}',
   '<div class="two-button2">',
    '<button type="button" class="btn btn-primary btn9" id="againJinJie">再练一遍</button>',
    '<button type="button" class="btn btn-primary btn2" data-question_id="{{data.question_id}}" data-pickArtical="false" id="errOnlyJinJieErr">重做错题</button>',
    '{{if !data.is_last_question}}',
    '<button type="button" class="btn btn-primary btn1" id="nextUnitRead" data-next_question_id="{{data.next_question_id}}"  data-next_group_name="{{data.next_group_name}}" data-next_type_name="{{data.next_type_name}}" data-next_rate="{{data.next_rate}}" data-is_last_question="{{data.is_last_question}}">下一单元</button>',
    '{{/if}}',
   '</div>',

    '{{else}}',
     '<div class="two-button">',
      '<button type="button" class="btn btn-primary btn9" id="againJinJie">再来一遍</button>',
      '{{if !data.is_last_question}}',
      '<button type="button" class="btn btn-primary btn1" id="nextUnitRead" data-next_question_id="{{data.next_question_id}}"  data-next_group_name="{{data.next_group_name}}" data-next_type_name="{{data.next_type_name}}" data-next_rate="{{data.next_rate}}" data-is_last_question="{{data.is_last_question}}">下一单元</button>',
      '{{/if}}',
    '</div>',
   '{{/if}}',
   '<div style="clear:both;"></div>',
  '</div>'
  ].join('')
})
