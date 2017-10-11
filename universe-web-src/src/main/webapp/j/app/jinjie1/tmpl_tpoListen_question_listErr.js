'use strict'

define(function(){
  return [
       // '<p class="mleft30">确认提交</p>',
       '<ul class="N_tpo_alist">',
       '{{each data as value index}}',
       '{{if "" != value.answer && "/" != value.answer}}',
          '<li><a href="###" class="questionPageErrTpoListen N_r_circle N_b66a " data-localIndex={{index}} data-pageNum={{value.section_number}}>{{value.section_number+1}}</a></li>',
        '{{else}}',
          '<li><a href="###" class="N_gded questionPageErrTpoListen N_r_circle" data-localIndex={{index}} data-pageNum={{value.section_number}}>{{value.section_number+1}}</a></li>',
        '{{/if}}',
        '{{/each}}',
      '</ul>',
      '<div class="one-button2 answer_btn">',
        '<button type="button" class="btn1 btn btn-primary active" id="tpoListenSubmitErr">交卷看答案</button>',
      '</div>',
      //'<div>',
      //  '<a href="###" class="Previous tpo-page" id="preQuestionErrTpoListen"><span class="arrow-left"></span></a>',
      //  // '<a href="#" class="Next1 tpo-page"><span class="arrow-right"></span></a>',
      //'</div>'
  ].join('')
})
