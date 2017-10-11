'use strict'

define(function(){
  return [
       '<ul class="N_tpo_alist">',
       '{{each data as value index}}',
       '{{if "" != value.answer && "/" != value.answer}}',
          '<li><a href="###" class="questionPageErrJinJie N_r_circle" data-localIndex={{index}} data-pageNum={{value.section_number}}>{{value.section_number+1}}</a></li>',
        '{{else}}',
          '<li><a href="###" class="N_gded N_r_circle questionPageErrJinJie" data-localIndex={{index}} data-pageNum={{value.section_number}}>{{value.section_number+1}}</a></li>',
        '{{/if}}',
        '{{/each}}',
      '</ul>',
      '<div class="one-button2 answer_btn">',
        '<button type="button" class="btn1 btn btn-primary active" id="tpoReadSubmitErr">交卷看答案</button>',
      '</div>',
      //'<div>',
      //  '<a href="###" class="Previous tpo-page" id="preQuestionErr"><span class="arrow-left"></span></a>',
      //  // '<a href="#" class="Next1 tpo-page"><span class="arrow-right"></span></a>',
      //'</div>'
  ].join('')
})
