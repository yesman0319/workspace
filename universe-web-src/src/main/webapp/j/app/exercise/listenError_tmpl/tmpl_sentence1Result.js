'use strict'

define(function(){
  return [
   '<div class="right-part1">',
    /*'<p class="p1 bold black mleft25"><span>正在练习>练句>听音辨句>Unit<span id="">{{data.group_sequence_number}}</span></span><span class="unit"><a href="#" id="sentenceUnit1">选择单元</a></span></p>',*/
      '<p class="p1 bold black mleft25"><img src="../../i/list-pic.png" class="list-pic">{{data.xm_title}}</span></span></p>',
    '<hr class="mleft25" />',
    '<div class="family-song">',
    '<audio src="" id="audioAudio">亲 您的浏览器不支持html5的audio标签</audio>',
      '<p class="bold mleft25"><span class="pleft10">例句<img src="../../i/i20.png" data-url="{{data.errWord.sentence_url}}" class="pleft10 pointer audioImg"></span>',
        '<span class="right hear-percent font12 family-yahei">{{data.errWord.question_sequence_number}}/{{data.errWord.group_count}}</span></p>',
     /* '<ul class="hear-ul ">',
      '{{each data.errWord.simple_choice as value index}}',
        '<li>',
          '<span class="glyphicon choicehear glyphicon-ok hear-back pointer choiceErrSentence1Result" data-choice="{{index}}"></span>',
          '<span class="pleft10 font12">{{value}}</span>',
        '</li>',
      '{{/each}}',
      '</ul>',*/
      '<table class="table1 mleft25 tingli-table" cellpadding="0" cellspacing="0" style="display: none;">',
      '{{each data.errWord.simple_choice as value index}}',      
        '<tr>',
          '<td class="td1 word-layout2"><span class="glyphicon glyphicon-ok choicehear voca-back pointer choiceErrSentence1Result" data-choice="{{index}}"></span></td>',
          '<td class="volcabulary-space word-layout3"><span class="font12">{{value}}</span></td>',
        '</tr>', 
      '{{/each}}',
      '</table>',
      '<table class="table1 mleft25 tingli-table" cellpadding="0" cellspacing="0" style="display: none;">',
      '{{each data.errWord.simple_choice as value index}}',      
        '<tr>',
          '<td class="td1 word-layout2"><span class="glyphicon glyphicon-ok voca-back choiceResult" data-choice="{{index}}"></span></td>',
          '<td class="volcabulary-space word-layout3"><span class="font12">{{value}}</span></td>',
        '</tr>', 
      '{{/each}}',
      '</table>',
    '</div>',
   '</div>'
  ].join('')
})