'use strict'

define(function(){
  return [
  '{{each data.questions as value index}}',
  '<hr class="hr4 mleft25">',
  '<p class="mleft25 h40 border-bto"><span class="num bold">{{value.sequence_number}}.</span>',
  '<a id="{{value.id}}" content="{{value.content}}" href="#" type="{{value.type}}" category="{{value.category}}" score="{{value.score}}" class="rightItem" answer_id="{{value.answer_id}}" sequence_number="{{value.sequence_number}}">',
  '{{value.content.substring(0,45)}}...',
  '</a>',
  '</p>',
  '{{/each}}'
  ].join('')
})