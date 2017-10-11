'use strict'

define(function(){
  return [
    '{{each data as value index}}',
       '<p class="p1 bold black mleft25">',
        '<img src="../../i/list-pic.png" style="margin-left:-10px;margin-right:10px;" /><span>{{value.name}}</span>',
       '</p>',
       '<ul>',
        '<li>',
        '{{each value.tpo_types[0].tpo_questions as value1 index1}}',
         '<p class="totel-unit2">',
          '<a href="#" class="jinJieUnitDetail" data-question_id="{{value1.question_id}}" data-tpoNum="{{value.name}}" data-rates="{{value1.rate}}">Passage {{value1.question_sequence_number}}</a>',
          '{{if "" != value1.rate}}',
            '{{if (value1.rate.substring(0,value1.rate.indexOf("/")) / value1.rate.substring(value1.rate.indexOf("/")+1) * 100).toString().substring(0,value1.rate.indexOf("/")+3) < 50}}',
              '<a href="#" class="jinJieResult red" data-question_id="{{value1.question_id}}" data-tpoNum="{{value.name}}" data-rates="{{value1.rate}}" data-question_sequence_number="{{value1.question_sequence_number}}">',
            '{{else if (value1.rate.substring(0,value1.rate.indexOf("/")) / value1.rate.substring(value1.rate.indexOf("/")+1) * 100).toString().substring(0,value1.rate.indexOf("/")+3) >= 50 && (value1.rate.substring(0,value1.rate.indexOf("/")) / value1.rate.substring(value1.rate.indexOf("/")+1) * 100).toString().substring(0,value1.rate.indexOf("/")+3) <= 80}}',
              '<a href="#" class="jinJieResult orange" data-question_id="{{value1.question_id}}" data-tpoNum="{{value.name}}" data-rates="{{value1.rate}}" data-question_sequence_number="{{value1.question_sequence_number}}">',
            '{{else}}',
              '<a href="#" class="jinJieResult green" data-question_id="{{value1.question_id}}" data-tpoNum="{{value.name}}" data-rates="{{value1.rate}}" data-question_sequence_number="{{value1.question_sequence_number}}">',
            '{{/if}}',
          '(正确率:{{(value1.rate.substring(0,value1.rate.indexOf("/")) / value1.rate.substring(value1.rate.indexOf("/")+1) * 100).toString().substring(0,value1.rate.indexOf("/")+3)}}%)</a> ',
          '{{/if}}',
         '</p>',
        '{{/each}}',
        '</li>',
       '</ul>',
    '{{/each}}'
  ].join('')
})
