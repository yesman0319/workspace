'use strict'

define(function(){
    return [
        '<div class="right-part2">',
            '<ul class="tabs_new forecast_tabs" role="tablist" id="myTab">',
                 '{{each data.tabs as tab index}}',
                     '<li role="presentation" class="{{if (index==0 && !data.activeTab) || data.activeTab==tab.group_id}}current{{/if}}"><a href="#"  data-groupsid="{{tab.group_id}}" class="wslTab" style="width:140px;">{{tab.group_title}}</a></li>',
                 '{{/each}}',
            '</ul>',
            '<div class="tab-content jijing-tab-style">',
                '<div role="tabpanel" class="tab-pane active" id="wslContent">',
                '{{each data.content as value index}}',
                '<p class="left25 font13 jijing-speak-div jijing-speak-div-js">',
                    '<span class="num bold">{{value.question_sequence_number}}.</span>',
                    '<a href="#" data-question_id="{{value.question_id}}" type="1" category="wjj" score="0" class="item sim-a" answer_id="" sequence_number="{{value.question_sequence_number}}">{{value.question_content}}</a>',
                    '{{if value.has_answer}}',
                    '<span class="team-score blue">-已练</span>',
                    '{{else}}',
                    '<span class="team-score blue"></span>',
                    '{{/if}}',
                '</p>',
                '{{/each}}',
                '</div>',
            '</div>',
        '</div>'
    ].join('')
})
