'use strict'

define(function(){
  return [
      '<p class="mleft25">',
      		'<span class="td4 bold word-layout2" id="totalCount">{{data.xml.volNum}}</span>',
      		'{{if data.xml.prompt}}',
      			'<span class="bold word-layout3 word-size1">{{data.xml.prompt}}</span>',
      		'{{/if}}',
  		'</p>',
      '<table class="table1 mleft25" cellpadding="0" cellspacing="0" style="display: none;">',
       /* '<tr class="word-layout1">',
          '<td class="td4 bold word-layout2" id="totalCount">{{data.volNum}}.</td>',
          '<td class="bold word-layout3 word-size1">{{data.prompt}}</td>',
        '</tr>',*/
        '{{each data.xml.simpleChoices as value index}}',      
          '<tr>',
            '<td class="td1 word-layout2"><span class="glyphicon glyphicon-ok voca-back pointer choiceVol " data-answer="{{index+1}}" data-volId="{{data.xml.volId}}"></span></td>',
            '<td colspan="2 " class="volcabulary-space word-layout3">{{value}}</td>',
          '</tr>', 
        '{{/each}}',
      '</table>',
      '<table class="table1 mleft25" cellpadding="0" cellspacing="0" style="display: none;">',
       /* '<tr class="word-layout1">',
          '<td class="td4 bold word-layout2" id="totalCount">{{data.volNum}}.</td>',
          '<td class="bold word-layout3 word-size1">{{data.prompt}}</td>',
        '</tr>',*/
        '{{each data.xml.simpleChoices as value index}}',      
          '<tr>',
            '<td class="td1 word-layout2"><span class="glyphicon glyphicon-ok voca-back choiceVolResult " data-answer="{{index+1}}" data-volId="{{data.xml.volId}}"></span></td>',
            '<td colspan="2 " class="volcabulary-space word-layout3">{{value}}</td>',
          '</tr>', 
        '{{/each}}',
      '</table>',
      '{{if data.xml.stemImg}}',
      		'<div class="volStemImgWrap"><img src="{{data.xml.stemImg}}" alt="图片展示"></div>',
      '{{/if}}',
      '{{if data.xml.volNum == 100}}',
        '<div class="one-button1" style="display: none;" id="volSubmitDiv">',
        '<button type="button" class="btn1 btn btn-primary active" id="volSubmit">提交</button>',
        '</div>',
      '{{/if}}'
  ].join('')
})