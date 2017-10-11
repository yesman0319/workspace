'use strict'

define(function(){
  return [
       '<ul class="N_tpo_alist">',
       '{{each data as value index}}',
       '{{if "" != value.answer && "/" != value.answer&&"G1_N|G2_N"!=value.answer}}',
          '<li><a href="###" class="questionPage1 N_r_circle " data-pageNum={{value.section_number}}>{{value.section_number+1}}</a></li>',
        '{{else}}',
          '<li><a href="###" class="N_gded N_r_circle questionPage1" data-pageNum={{value.section_number}}>{{value.section_number+1}}</a></li>',
        '{{/if}}',
        '{{/each}}',
      '</ul>',
      '<div class="one-button2 answer_btn">',
        '<button type="button" class="btn1 btn btn-primary active" id="tpoReadSubmit1">交卷看答案</button>',
      '</div>',
      //'<div>',
      //  '<a href="###" class="Previous tpo-page" id="preQuestion"><span class="arrow-left"></span></a>',
      //  // '<a href="#" class="Next1 tpo-page"><span class="arrow-right"></span></a>',
      //'</div>'
  ].join('')
})
