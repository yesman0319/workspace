'use strict'

define(function(){
  return [
  '<div class="right-part1">',
    '<p class="p1 bold  black mleft25"><span>正在练习>练词>看词辨音>Unit<span id="">{{data.group_sequence_number}}</span></span><span class="unit"><a href="#" id="wordUnit2">选择单元</a></span></p>',
    '<hr class="mleft25" />',
    '<div class="family-song">',
    '<audio src="" id="audioAudio">亲 您的浏览器不支持html5的audio标签</audio>',
      '<p class="bold mleft25"><img src="../../i/i19.png"><span class="word-position">{{data.errWord.question.prompt}}</span><span class="right hear-percent font12 family-yahei">{{data.errWord.question.sequence_number}}/{{data.errWord.question.group_count}}</span></p>',
    /*  '<ul class="hear-ul">',
      '{{each data.errWord.question.simpleChoices as value index}}',
        '<li>',
          '<span class="glyphicon choicehear glyphicon-ok hear-back pointer choiceErrWord2" data-choice="{{index}}"></span>',
          '<span class="pleft10">单词<img src="../../i/i20.png" data-url="{{value.word_audio}}" class="pleft10 pointer audioImg"></span>',
          '<span class="pleft30">例句<img src="../../i/i20.png" data-url="{{value.sentence_audio}}" class="pleft10 pointer audioImg"></span>',
        '</li>',
      '{{/each}}',
      '</ul>',*/
      '<table class="table1 mleft25 tingli-table" cellpadding="0" cellspacing="0">',
      '{{each data.errWord.question.simpleChoices as value index}}',      
        '<tr>',
          '<td class="td1 word-layout2"><span class="glyphicon choicehear glyphicon-ok voca-back pointer choiceErrWord2" data-choice="{{index}}"></span></td>',
          '<td class="volcabulary-space"><span>单词<img src="../../i/i20.png" data-url="{{value.word_audio}}" class="pleft10 pointer audioImg"></span></td>',
          '<td class="volcabulary-space"><span>例句<img src="../../i/i20.png" data-url="{{value.sentence_audio}}" class="pleft10 pointer audioImg"></span></td>',
        '</tr>', 
      '{{/each}}',
      '</table>',
      '<table class="table1 mleft25 tingli-table" cellpadding="0" cellspacing="0" style="display: none;">',
      '{{each data.errWord.question.simpleChoices as value index}}',      
        '<tr>',
          '<td class="td1 word-layout2"><span class="glyphicon glyphicon-ok voca-back choiceResult" data-choice="{{index}}"></span></td>',
          '<td class="volcabulary-space"><span>单词<img src="../../i/i20.png" data-url="{{value.word_audio}}" class="pleft10 pointer audioImg"></span></td>',
          '<td class="volcabulary-space"><span>例句<img src="../../i/i20.png" data-url="{{value.sentence_audio}}" class="pleft10 pointer audioImg"></span></td>',
        '</tr>', 
      '{{/each}}',
      '</table>',
    '</div>',
   '</div>'
  ].join('')
})