'use strict'

define(function(){
  return [
    '<div class="right-part1" id="right-part1">',
     '<p class="p1 bold black mleft25">',
      '<img src="../../i/list-pic.png" style="margin-left:-10px;margin-right:10px;" /><span>TPO听力刷题</span>',
     '</p>',
      '<hr class="mleft25">',
     '<ul>',
      '<li>',
    '{{each data.groups as value index}}',
       '<p class="totel-unit">',
       '{{if data.current_group_sequence_number >= index + 1}}',
             '{{if value.group_level == 1 && value.rate >= 90}}',
              '<a href="#" class="tpoListenDetail" data-group_level="{{value.group_level}}" data-group_name="{{value.group_name}}" data-rate="{{value.rate}}" data-group_sequence_number="{{value.group_sequence_number}}">{{value.group_name}}</a>{{if value.is_today_task}}<span class="orange left16">今日任务</span>{{/if}}',
              '<img src="../i/side-pic41.png" data-group_level="{{value.group_level}}" class="i25-6 tpoListenResult pointer" data-group_name="{{value.group_name}}" data-rate="{{value.rate}}" data-group_sequence_number="{{value.group_sequence_number}}">',
             '{{else if value.group_level == 0 && value.rate < 90 && null != value.rate}}',
              '<a href="#" class="tpoListenDetail" data-group_level="{{value.group_level}}" data-group_name="{{value.group_name}}" data-rate="{{value.rate}}" data-group_sequence_number="{{value.group_sequence_number}}">{{value.group_name}}</a>{{if value.is_today_task}}<span class="orange left16">今日任务</span>{{/if}}',
              '<img src="../i/side-pic43.png" data-group_level="{{value.group_level}}" class="i25-6 tpoListenResult pointer" data-group_name="{{value.group_name}}" data-rate="{{value.rate}}" data-group_sequence_number="{{value.group_sequence_number}}">',
              '{{else}}',
                '<a href="#" class="tpoListenDetail" data-group_level="{{value.group_level}}" data-group_name="{{value.group_name}}" data-rate="{{value.rate}}" data-group_sequence_number="{{value.group_sequence_number}}">{{value.group_name}}</a>{{if value.is_today_task}}<span class="orange left16">今日任务</span>{{/if}}',
              '{{/if}}',
        '{{else}}',
            '{{if value.group_level == 1 && value.rate >= 90}}',
              '<a href="#" class="tpoListenDetail" data-group_level="{{value.group_level}}" data-group_name="{{value.group_name}}" data-rate="{{value.rate}}" data-group_sequence_number="{{value.group_sequence_number}}">{{value.group_name}}</a>{{if value.is_today_task}}<span class="orange left16">今日任务</span>{{/if}}',
              '<img src="../i/side-pic41.png" data-group_level="{{value.group_level}}" class="i25-6 tpoListenResult pointer" data-group_name="{{value.group_name}}" data-rate="{{value.rate}}" data-group_sequence_number="{{value.group_sequence_number}}">',
            '{{else if value.group_level == 0 && value.rate < 90 && null != value.rate}}',
            '<a href="#" class="tpoListenDetail" data-group_level="{{value.group_level}}" data-group_name="{{value.group_name}}" data-rate="{{value.rate}}" data-group_sequence_number="{{value.group_sequence_number}}">{{value.group_name}}</a>{{if value.is_today_task}}<span class="orange left16">今日任务</span>{{/if}}',
              '<img src="../i/side-pic43.png" data-group_level="{{value.group_level}}" class="i25-6 tpoListenResult pointer" data-group_name="{{value.group_name}}" data-rate="{{value.rate}}" data-group_sequence_number="{{value.group_sequence_number}}">',
            '{{else}}',
              '<a class="lockUnit pointer" data-group_level="{{value.group_level}}" data-group_name="{{value.group_name}}" data-rate="{{value.rate}}" data-group_sequence_number="{{value.group_sequence_number}}">{{value.group_name}}</a>{{if value.is_today_task}}<span class="orange left16">今日任务</span>{{/if}}',
              '<img src="../i/side-pic42.png" data-group_level="{{value.group_level}}" class="i25-6" data-group_name="{{value.group_name}}" data-rate="{{value.rate}}" data-group_sequence_number="{{value.group_sequence_number}}">',
            '{{/if}}',
        '{{/if}}',
       '</p>',
    '{{/each}}',
    '</li>',
   '</ul>',
   '</div>'
  ].join('')
})
