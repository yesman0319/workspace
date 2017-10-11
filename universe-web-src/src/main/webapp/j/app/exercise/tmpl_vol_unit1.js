'use strict'

define(function(){
  return [
  '<div class="right-part1">',
    '<p class="p1 bold green mleft25"><span>单元列表</span><span class="unit"><a href="#" id="unitVol">选择单元</a></span><span class="time-pos"><img src="../../i/time.png"><a href="#">计时：00:00:00</a></span></p>',
    '<hr class="mleft25">',
    '<ul><li>',
    '{{each data as value index}}',
        '<a href="#" class="unitVolDetail totel-unit" data-index="{{index}}" data-sequence_number="{{value.sequence_number}}" data-rate="{{value.rate*100}}" data-groups-id="{{value.id}}" data-volUnit="{{value.sequence_number}}">unit{{value.sequence_number}}',
         /* '{{if value.rate == 1}}',
            '<span class="green unitVolDetail" data-index="{{index}}" data-sequence_number="{{value.sequence_number}}" data-rate="{{value.rate*100}}" data-groups-id="{{value.id}}" data-volUnit="{{value.sequence_number}}">(正确率: {{value.rate*100}}%)</span>',
            '<img src="../../i/i25-6.png" class="i25-6">',
          '{{/if}}',
          '{{if value.rate >= 0 && value.rate < 1}}',
            '<span class="green unitVolDetail" data-index="{{index}}" data-sequence_number="{{value.sequence_number}}" data-rate="{{value.rate*100}}" data-groups-id="{{value.id}}" data-volUnit="{{value.sequence_number}}">(正确率: {{value.rate*100}}%)</span>',
            '<img src="../../i/i25-6.png" class="i25-6">',
          '{{/if}}',*/
        '</a>',
        '{{if value.group_level == 0}}',
            '<img src="../../i/i25-5.png" data-group_level="{{value.group_level}}" data-avg_speed="{{value.avg_speed}}" data-rate="{{value.rate}}" data-groups-id="{{value.id}}" data-volUnit="{{value.sequence_number}}" class="i25-6 unitVolDetail pointer">',
          '{{/if}}',
          '{{if value.group_level == 1}}',
            '<img src="../../i/i25-6.png" data-group_level="{{value.group_level}}" data-avg_speed="{{value.avg_speed}}" data-rate="{{value.rate}}" data-groups-id="{{value.id}}" data-volUnit="{{value.sequence_number}}" class="i25-6 unitVolDetail pointer">',
          '{{/if}}',
          '{{if value.group_level == 2}}',
            '<img src="../../i/i25-7.png" data-group_level="{{value.group_level}}" data-avg_speed="{{value.avg_speed}}" data-rate="{{value.rate}}" data-groups-id="{{value.id}}" data-volUnit="{{value.sequence_number}}" class="i25-6 unitVolDetail pointer">',
          '{{/if}}',
          '{{if value.group_level == 3}}',
            '<img src="../../i/i25-8.png" data-group_level="{{value.group_level}}" data-avg_speed="{{value.avg_speed}}" data-rate="{{value.rate}}" data-groups-id="{{value.id}}" data-volUnit="{{value.sequence_number}}" class="i25-6 unitVolDetail pointer">',
          '{{/if}}',
    '{{/each}}',
    '</li></ul>',
   '</div>'
  ].join('')
})