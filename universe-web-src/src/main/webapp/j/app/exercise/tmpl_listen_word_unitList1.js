'use strict'

define(function(){
  return [
      '<li style="width:732px;/*margin-left:15px;*/">',
      '{{each data.units as value index}}',
      '<p class="totel-unit">',
        '<a href="#" class="wordUnitDetailWord1" data-locked="{{value.locked}}" data-group_level="{{value.group_level}}" data-index="{{index}}" data-id="{{value.id}}" data-sequenceNumber="{{value.sequence_number}}"  data-questionCount="{{value.question_count}}" data-rate="{{value.rate}}" data-errorQuestionIds="{{value.error_question_ids}}">unit{{value.sequence_number}}{{if value.is_today_task}}<span class="orange left16">今日任务</span>{{/if}}',
        '</a>',
      /*  '{{if value.rate}}',
          '{{if value.rate.split("/")[0] == value.rate.split("/")[1]}}',
            '<a class="green wordUnitDetail1 pointer" data-index="{{index}}" data-id="{{value.id}}" data-sequenceNumber="{{value.sequence_number}}"  data-questionCount="{{value.question_count}}" data-rate="{{value.rate}}" data-errorQuestionIds="{{value.error_question_ids}}">(正确率: 100%)</a>',
          '{{/if}}',
          '{{if value.rate.split("/")[0] != value.rate.split("/")[1]}}',
            // '<a class="green wordUnitDetail1 pointer" data-index="{{index}}" data-id="{{value.id}}" data-sequenceNumber="{{value.sequence_number}}"  data-questionCount="{{value.question_count}}" data-rate="{{value.rate}}" data-errorQuestionIds="{{value.error_question_ids}}">(对:{{value.rate.split("/")[0]}} 错:{{value.rate.split("/")[1]-value.rate.split("/")[0]}})</a>',
          '<a class="green wordUnitDetail1 pointer" data-index="{{index}}" data-id="{{value.id}}" data-sequenceNumber="{{value.sequence_number}}"  data-questionCount="{{value.question_count}}" data-rate="{{value.rate}}" data-errorQuestionIds="{{value.error_question_ids}}">(正确率: {{(value.rate.split("/")[0] / value.rate.split("/")[1] * 100).toString().split(".")[0]}}%) </a>',
          '{{/if}}',
        '{{/if}}',*/
      '{{if value.locked==0}}',
            '{{if value.rate}}',
              '{{if value.group_level == 0}}',
                '<img src="../../i/newimg-0.png" data-group_level="{{value.group_level}}" data-avg_speed="{{value.avg_speed}}" data-index="{{index}}" data-id="{{value.id}}" data-sequenceNumber="{{value.sequence_number}}"  data-questionCount="{{value.question_count}}" data-rate="{{value.rate}}" data-errorQuestionIds="{{value.error_question_ids}}" class="i25-6 wordUnitDetail1 pointer">',
              '{{/if}}',
              '{{if value.group_level == 1}}',
                '<img src="../../i/newimg-4.png" data-group_level="{{value.group_level}}" data-avg_speed="{{value.avg_speed}}" data-index="{{index}}" data-id="{{value.id}}" data-sequenceNumber="{{value.sequence_number}}"  data-questionCount="{{value.question_count}}" data-rate="{{value.rate}}" data-errorQuestionIds="{{value.error_question_ids}}" class="i25-6 wordUnitDetail1 pointer">',
              '{{/if}}',
              '{{if value.group_level == 2}}',
                '<img src="../../i/newimg-1.png" data-group_level="{{value.group_level}}" data-avg_speed="{{value.avg_speed}}" data-index="{{index}}" data-id="{{value.id}}" data-sequenceNumber="{{value.sequence_number}}"  data-questionCount="{{value.question_count}}" data-rate="{{value.rate}}" data-errorQuestionIds="{{value.error_question_ids}}" class="i25-6 wordUnitDetail1 pointer">',
              '{{/if}}',
              '{{if value.group_level == 3}}',
                '<img src="../../i/newimg-2.png" data-group_level="{{value.group_level}}" data-avg_speed="{{value.avg_speed}}" data-index="{{index}}" data-id="{{value.id}}" data-sequenceNumber="{{value.sequence_number}}"  data-questionCount="{{value.question_count}}" data-rate="{{value.rate}}" data-errorQuestionIds="{{value.error_question_ids}}" class="i25-6 wordUnitDetail1 pointer">',
              '{{/if}}',
              '{{if value.group_level == 4}}',
                '<img src="../../i/newimg-3.png" data-group_level="{{value.group_level}}" data-avg_speed="{{value.avg_speed}}" data-index="{{index}}" data-id="{{value.id}}" data-sequenceNumber="{{value.sequence_number}}"  data-questionCount="{{value.question_count}}" data-rate="{{value.rate}}" data-errorQuestionIds="{{value.error_question_ids}}" class="i25-6 wordUnitDetail1 pointer">',
              '{{/if}}',
          // '{{else}}',
          //     '<img src="../../i/i25-5.png" data-index="{{index}}" data-id="{{value.id}}" data-sequenceNumber="{{value.sequence_number}}"  data-questionCount="{{value.question_count}}" data-rate="{{value.rate}}" data-errorQuestionIds="{{value.error_question_ids}}" class="i25-6 wordUnitDetailWord1 pointer">',
            '{{/if}}',
      '{{else}}',
            '<img src="../../i/side-pic42.png" data-group_level="{{value.group_level}}" data-avg_speed="{{value.avg_speed}}" data-rate="{{value.rate}}" data-groups-id="{{value.id}}" data-volUnit="{{value.sequence_number}}" data-questionCount="{{value.question_count}}" data-rate="{{value.rate}}" data-errorQuestionIds="{{value.error_question_ids}}" class="i25-6">',
      '{{/if}}',

        '</p>',
        '{{/each}}',
        // '<a href="#" class="">unit1<span class="green font12">(对:18 错:20)</span></a>',
        // '<a href="#" class="">unit1</a>',
        // '<a href="#" class="">unit1<span class="green font12">(正确率：100%)</span></a>',
      '</li>'
  ].join('')
})