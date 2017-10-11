'use strict'

define(function(){
  return [
       '<div class="left25 font13 repeat-div3">',
         '<span class="num left16 pointer">{{data.question.question_number}}/{{data.questionsLength}}</span>',
         '<p class="tpo-senten"><a score="0" class="item sim-a" answer_i="" sequence_number="1"">{{data.question.question_content}}</a></p>',

        '</div>',
         '<table class="table1 mleft25 tpo-table newtop" cellpadding="0" cellspacing="0" id="singMul">',

         '{{if data.question.question_type == 1}}',
         '{{each data.question.options as value index}}',
          '<tr>',
           '<td class="td1 word-layout2"><span class="tpo-choice-round pointer singleChoiceListen showEnable newtop-top" data-question_type="{{data.question.question_type}}" data-option="{{value.option}}">{{value.option}}</span><span class="tpo-choice-round showDisable" style="display: none;">{{value.option}}</span></td>',
           '<td class="newtpo-table">{{value.option_content}}</td>',
          '</tr>',
         '{{/each}}',

         '{{else}}',
         '{{each data.question.options as value index}}',
          '<tr>',
           '<td class="td1 word-layout2"><span class="tpo-choice-round pointer multipleChoiceListen showEnable newtop-top" data-question_type="{{data.question.question_type}}" data-option="{{value.option}}">{{value.option}}</span><span class="tpo-choice-round showDisable" style="display: none;">{{value.option}}</span></td>',
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

         '{{else}}',
         '{{each data.question.options as value index}}',
          '<tr>',
           '<td class="td1 word-layout2"><span class="tpo-choice-round showEnable newtop-top" data-question_type="{{data.question.question_type}}" data-option="{{value.option}}">{{value.option}}</span><span class="tpo-choice-round showDisable" style="display: none;">{{value.option}}</span></td>',
           '<td class="newtpo-table">{{value.option_content}}</td>',
          '</tr>',
         '{{/each}}',
         '{{/if}}',

        '</table>',
      '{{if data.question.question_type == 1 || data.question.question_number == data.questionsLength}}',
        '<div class="one-button1">',
        '<button type="button" class="btn1 btn btn-primary active" id="tpoListenSubmit">提交</button>',
        '</div>',
      '{{else}}',
        '<div class="two-button1">',
        '<button type="button" class="btn1 btn btn-primary active" id="tpoListenGoOn">继续</button>',
        '<button type="button" class="btn1 btn btn-primary active" id="tpoListenSubmit">提交</button>',
        '</div>',
      '{{/if}}'
  ].join('')
})
