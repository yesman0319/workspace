'use strict'

define(function(){
  return [
      // '<p class="mleft30">确认提交</p>',
       '<ul class="N_tpo_alist">',
       '{{each data as value index}}',
       '{{if "" != value.answer && "/" != value.answer}}',
          '<li><a href="###" class="questionPageTpoListen N_r_circle" data-pageNum={{value.section_number}}>{{value.section_number+1}}</a></li>',
        '{{else}}',
          '<li><a href="###" class="N_gded N_r_circle questionPageTpoListen" data-pageNum={{value.section_number}}>{{value.section_number+1}}</a></li>',
        '{{/if}}',
        '{{/each}}',
      '</ul>',
      '<div class="one-button2 answer_btn">',
        '<button type="button" class="btn1 btn btn-primary active" id="tpoListenSubmit">交卷看答案</button>',
      '</div>',
      //'<div>',
      //  '<a href="###" class="Previous tpo-page" id="preQuestionTpoListen"><span class="arrow-left"></span></a>',
      //  // '<a href="#" class="Next1 tpo-page"><span class="arrow-right"></span></a>',
      //'</div>'
  ].join('')
})
