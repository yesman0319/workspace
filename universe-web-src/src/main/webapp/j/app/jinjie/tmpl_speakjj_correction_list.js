'use strict'

define(function(){
    return [
        '<div class="right-part1">',
        '<p class="p1 bold black mleft25"><img src="../../i/list-pic.png" style="margin-left:-10px;margin-right:10px;"><span>{{data.group_title}}</span></p>',
        '<hr class="mleft25" />',
        '{{each data.questions as value index}}',
        '<p class="left25 font13 jijing-speak-div jijing-speak-div-js">',
           // '<img src="../../i/icon-top1.png " class="zonghe-img">',
            '<span class="num bold">{{value.question_sequence_number}}.</span>',
            '<a href="#" data-question_id="{{value.question_id}}" data-type="1" category="wjj" score="0" class="sim-a" answer_id="" sequence_number="{{value.question_sequence_number}}">{{value.content}}</a>{{if value.is_today_task}}<span class="orange left16">今日任务</span>{{/if}}',
            '{{if value.type==1}}',
            '<span class="team-score blue">-已练</span>',
            '{{else}}',
            '<span class="team-score blue"></span>',
            '{{/if}}',
        '</p>',
        '{{/each}}',
        '</div>'
    ].join('')
})
