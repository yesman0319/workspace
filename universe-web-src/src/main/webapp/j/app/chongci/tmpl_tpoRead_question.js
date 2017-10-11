'use strict'

define(function(){
  return [
       '<div class="left25 font13 repeat-div3">',
         '<span class="num  left16  pointer">{{data.question.question_number}}/{{data.questionsLength}}</span>',
         '<p class="tpo-senten"><a score="0" class="item sim-a questionBrContent" answer_i="" sequence_number="1" ></a></p>',

        '{{if data.question.question_type == 3}}',
         '<p class="tpo-senten tpo-complex-ques">{{data.question.item_stems[0]}}</p>',
         '<p class="tpo-senten tpo-complex-choice" id="g1Answer">',
         '{{each data.question.options as value index}}',
         '<span class="tpo-choice-round pointer complexChoiceRead showEnable" data-question_type="{{data.question.question_type}}" data-option="{{value.option}}">{{value.option}}</span><span class="tpo-choice-round showDisable" style="display: none;">{{value.option}}</span>',
         '{{/each}}',
         '</p>',

         '<p class="tpo-senten tpo-complex-ques">{{data.question.item_stems[1]}}</p>',
         '<p class="tpo-senten tpo-complex-choice" id="g2Answer">',
         '{{each data.question.options as value index}}',
         '<span class="tpo-choice-round pointer complexChoiceRead showEnable" data-question_type="{{data.question.question_type}}" data-option="{{value.option}}">{{value.option}}</span><span class="tpo-choice-round showDisable" style="display: none;">{{value.option}}</span>',
         '{{/each}}',
         '</p>',
        '{{/if}}',

        '</div>',
         '<table class="table1 mleft25 tpo-table newtop" cellpadding="0" cellspacing="0" id="singMul">',

         '{{if data.question.question_type == 1}}',
         '{{each data.question.options as value index}}',
          '<tr>',
           '<td class="td1 word-layout2"><span class="tpo-choice-round pointer singleChoiceRead showEnable newtop-top" data-question_type="{{data.question.question_type}}">{{value.option}}</span><span class="tpo-choice-round showDisable" style="display: none;">{{value.option}}</span></td>',
           '<td class="newtpo-table">{{value.option_content}}</td>',
          '</tr>',
         '{{/each}}',

         '{{else if data.question.question_type == 2}}',
         '{{each data.question.options as value index}}',
          '<tr>',
           '<td class="td1 word-layout2"><span class="tpo-choice-round pointer multipleChoiceRead showEnable newtop-top" data-question_type="{{data.question.question_type}}">{{value.option}}</span><span class="tpo-choice-round showDisable" style="display: none;">{{value.option}}</span></td>',
           '<td class="newtpo-table">{{value.option_content}}</td>',
          '</tr>',
         '{{/each}}',

         '{{else}}',
         '{{each data.question.options as value index}}',
          '<tr>',
           '<td class="td1 word-layout2" data-option="{{value.option}}">{{value.option}}</td>',
           '<td class="newtpo-table">{{value.option_content}}</td>',
          '</tr>',
         '{{/each}}',
         '{{/if}}',

        '</table>',

        '<table class="table1 mleft25 tpo-table newtop" cellpadding="0" cellspacing="0" id="singMul1" style="display:none;">',

         '{{if data.question.question_type == 1}}',
         '{{each data.question.options as value index}}',
          '<tr>',
           '<td class="td1 word-layout2"><span class="tpo-choice-round showEnable newtop-top" data-question_type="{{data.question.question_type}}" data-option="{{value.option}}">{{value.option}}</span><span class="tpo-choice-round showDisable" style="display: none;">{{value.option}}</span></td>',
           '<td class="newtpo-table">{{value.option_content}}</td>',
          '</tr>',
         '{{/each}}',

         '{{else if data.question.question_type == 2}}',
         '{{each data.question.options as value index}}',
          '<tr>',
           '<td class="td1 word-layout2"><span class="tpo-choice-round showEnable newtop-top" data-question_type="{{data.question.question_type}}" data-option="{{value.option}}">{{value.option}}</span><span class="tpo-choice-round showDisable" style="display: none;">{{value.option}}</span></td>',
           '<td class="newtpo-table">{{value.option_content}}</td>',
          '</tr>',
         '{{/each}}',

         '{{else}}',
         '{{each data.question.options as value index}}',
          '<tr>',
           '<td class="td1 word-layout2" data-option="{{value.option}}">{{value.option}}</td>',
           '<td class="newtpo-table">{{value.option_content}}</td>',
          '</tr>',
         '{{/each}}',
         '{{/if}}',

        '</table>',

        '{{if data.question.question_type == 1 || data.question.question_number == data.questionsLength}}',
          '<div class="one-button1">',
          '<button type="button" class="btn1 btn btn-primary active" id="tpoReadSubmit">提交</button>',
          '</div>',
        '{{else}}',
          '<div class="two-button1">',
          '<button type="button" class="btn1 btn btn-primary active" id="tpoReadGoOn">继续</button>',
          '<button type="button" class="btn1 btn btn-primary active" id="tpoReadSubmit">提交</button>',
          '</div>',
        '{{/if}}'
  ].join('')
})
