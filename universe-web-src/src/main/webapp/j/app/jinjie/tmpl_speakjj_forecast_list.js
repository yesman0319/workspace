'use strict'

define(function(){
    return [

        '<div class="right-part2">',
        '<ul class="tabWrite tabs_new forecast_tabs" role="tablist" id="myTab">',
        '{{each data.tabs as tab index}}',
        '<li role="presentation" tabstatus="allWork" class="allWork {{if (index==0 && !data.activeTab) || data.activeTab==tab.group_id}}current{{/if}}" >',
        '<a href="#" role="tab" data-toggle="tab"  style="width:140px;" data-groupsid="{{tab.group_id}}" class="forecastTab" >{{tab.group_title}}</a>',
        '</li>',
        '{{/each}}',
        '</ul>',


        '<div class="right_part_jjyc">',
        '<div role="tabpanel" class="tab-pane active" id="wslContent">',
        '<p class="p1 bold black mleft25"><img src="../../i/list-pic.png" style="margin-left:-10px;margin-right:10px;"><span>{{data.group_title}}</span></p>',
        '<hr class="mleft25" />',
        '{{each data.questions as value index}}',
        //'<p class="left25 font13 jijing-speak-div">',
        //    '<span class="num bold">{{value.question_sequence_number}}.</span>',
        //    '<a href="#" data-question_id="{{value.question_id}}" type="1" category="wjj" score="0" class="item sim-a" answer_id="" sequence_number="{{value.question_sequence_number}}">{{value.question_content}}</a>',
        //    '{{if value.has_answer}}',
        //    '<span class="team-score blue">-已练</span>',
        //    '{{else}}',
        //    '<span class="team-score blue"></span>',
        //    '{{/if}}',
        //'</p>',
        '<div class="jjyc_box jijing-speak-div-js">',
            '<div class="jjyc_table">',
                '<div style=" vertical-align:middle;display:table-cell;width:680px;">',
                    '{{if value.category==1}}',
                    '<span class="jjyc_bluebg"><span class="font14 jjyc_bgfont">大范围</span></span>',
                    '{{else if value.category==2}}',
                    '<span class="jjyc_bluebg"><span class="font14 jjyc_bgfont">小范围</span></span>',
                    '{{/if}}',
                    '<span class="num bold">{{value.question_sequence_number}}.</span>',
                    '<a href="#" data-question_id="{{value.question_id}}" type="1" category="wjj" score="0" class="item sim-a" answer_id="" sequence_number="{{value.question_sequence_number}}">{{value.question_content}}</a>',
                    '{{if value.has_answer}}',
                    '<span class="blue jjyc_yl">-已练</span>',
                    '{{else}}',
                    '<span class="blue jjyc_yl"></span>',
                    '{{/if}}',
                '</div>',
            '</div>',
        '</div>',
        '{{/each}}',
        '</div></div>',
        '</div>'
    ].join('')
})
