'use strict'

define(function(){
  return [
    '{{each data.questions as val idx}}',
              '<p class="left25 top40 font13">',
                '<span class="num bold">{{val.sequence_number}}.</span>',
                '<a id="{{val.id}}" href="#" category="{{data.category}}" score="{{val.score}}" type="{{val.type}}" class="item sim-a" answer_id="{{val.answer_id}}" sequence_number="{{val.sequence_number}}">',
                  '{{val.content}}',
                '</a>',
                '{{if val.type == "1"}}',
                '<span class="team-score">-待批</span>',
               /* '<hr class="hr-team">',*/
                '{{else if val.type == "2"}}',
                '<span class="team-score">-{{val.score}}分</span>',
               /* '<hr class="hr-team">',*/
                '{{/if}}',
              '</p>',
          '{{/each}}'
  ].join('')
})