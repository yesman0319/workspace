'use strict'

define(function(){
  return [
    '<div class="right-part1">',
      /*'<p class="p1 bold black mleft25"><img src="../../i/list-pic.png" class="list-pic"><span>阅读词汇第<span id="volUnit"></span>单元</span><span class="unit"><a href="#" id="unitVol"></a></span></p>',*/
    '<p class="p1 bold black mleft25"><img src="../../i/list-pic.png" class="list-pic"><span>{{data.xm_title}}</span><span class="unit"><a href="#" id="unitVol"></a></span></p>',
      '<hr  class="mleft25">',
      '<p class="mleft25"><span class="td4 bold word-layout2" id="totalCount">{{data.errNum}}</span><span class="bold word-layout3 word-size1">{{data.volErr.prompt}}</span></p>',
      '<table class="table1 mleft25" cellpadding="0" cellspacing="0" style="display: none;">',
      /*  '<tr class="word-layout1" >',
          '<td class="td4 bold word-layout2" id="totalCount">{{data.volErr.sequenceNumber}}/100.</td>',
          '<td class="bold word-layout3 word-size1">{{data.volErr.prompt}}</td>',
        '</tr>',*/
        '{{each data.volErr.simpleChoices as value index}}',
          '<tr>',
            '<td class="td1 word-layout2" ><span class="glyphicon glyphicon-ok voca-back pointer choiceVolErr" data-answer="{{index+1}}" data-errAnswer="{{data.volErr.correctResponse}}" data-volId="{{data.volErr.volId}}"></span></td>',
            '<td colspan="2" class="volcabulary-space word-layout3" >{{value}}</td>',
          '</tr>',
        '{{/each}}',
      '</table>',
      '<table class="table1 mleft25" cellpadding="0" cellspacing="0" style="display: none;">',
      /*  '<tr class="word-layout1" >',
          '<td class="td4 bold word-layout2" id="totalCount">{{data.volErr.sequenceNumber}}/100.</td>',
          '<td class="bold word-layout3 word-size1">{{data.volErr.prompt}}</td>',
        '</tr>',*/
        '{{each data.volErr.simpleChoices as value index}}',
          '<tr>',
            '<td class="td1 word-layout2" ><span class="glyphicon glyphicon-ok voca-back choiceVolErrResult" data-answer="{{index+1}}" data-errAnswer="{{data.volErr.correctResponse}}" data-volId="{{data.volErr.volId}}"></span></td>',
            '<td colspan="2" class="volcabulary-space word-layout3" >{{value}}</td>',
          '</tr>',
        '{{/each}}',
      '</table>',
   '</div>'
  ].join('')
})