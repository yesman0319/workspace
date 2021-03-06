'use strict'

define(function(){
  return [
    '<audio src="" id="audioAudio">亲 您的浏览器不支持html5的audio标签</audio>',
      '<p class="bold mleft25"><span class="pleft10">例句<img src="../../i/i20.png" data-url="{{data.content.sentence_audio}}" class="pleft10 pointer audioImg"></span>',
        '<span class="right hear-percent font12 family-yahei">{{data.current_count}}/{{data.group_count}}</span></p>',
   /*   '<ul class="hear-ul ">',
      '{{each data.content.simpleChoices as value index}}',
        '<li>',
          '<span class="glyphicon choicehear glyphicon-ok hear-back pointer choiceSentence1" data-choice="{{index}}"></span>',
          '<span class="pleft10 font12">{{value}}</span>',
        '</li>',
      '{{/each}}',
      '</ul>',*/
   '<table class="table1 mleft25 tingli-table" cellpadding="0" cellspacing="0" style="display: none;">',
      '{{each data.content.simpleChoices as value index}}',      
        '<tr>',
          '<td class="td1 word-layout2"><span class="glyphicon glyphicon-ok choicehear voca-back pointer choiceSentence1" data-choice="{{index}}"></span></td>',
          '<td class="volcabulary-space word-layout3"><span class="font12">{{value}}</span></td>',
        '</tr>', 
      '{{/each}}',
      '</table>',
      '<table class="table1 mleft25 tingli-table" cellpadding="0" cellspacing="0" style="display: none;">',
      '{{each data.content.simpleChoices as value index}}',      
        '<tr>',
          '<td class="td1 word-layout2"><span class="glyphicon glyphicon-ok voca-back choiceResult" data-choice="{{index}}"></span></td>',
          '<td class="volcabulary-space word-layout3"><span class="font12">{{value}}</span></td>',
        '</tr>', 
      '{{/each}}',
      '</table>',
      '{{if data.current_count == data.group_count}}',
        '<div class="one-button1" style="display: none;" id="sentence1SubmitDiv">',
        '<button type="button" class="btn1 btn btn-primary active" id="sentence1Submit">提交</button>',
        '</div>',
      '{{/if}}'
  ].join('')
})