'use strict'

define(function(){
    return [
        '<div class="right-part2">',
            '<ul class="tabWrite tabs_new forecast_tabs" role="tablist" id="myTab">',
                '{{each data.tabs as tab index}}',
                    '<li role="presentation" tabstatus="allWork" class="allWork {{if (index==0 && !data.activeTab) || data.activeTab==tab.group_id}}current{{/if}}" >',
                    '<a href="#" role="tab" data-toggle="tab"  style="width:140px;" data-groupsid="{{tab.group_id}}" class="speak_wslTab" >{{tab.group_title}}</a>',
                    '</li>',
                '{{/each}}',
            '</ul>',
            '<div class="tab-content jijing-tab-style">',
                '<div role="tabpanel" class="jijing-speak-tab-js tab-pane active" id="wslContent">',
                '{{each data.content as value index}}',
                /*'<p class="left25 font13 jijing-speak-div">',
                    '<span class="num bold">{{value.question_sequence_number}}</span>',
                    '<a href="#" data-question_id="{{value.question_id}}" data-type="2" category="wjj" score="0" class="sim-a2" answer_id="" sequence_number="{{value.question_sequence_number}}">{{value.question_content}}</a>',
                    '{{if value.type==1}}',
                    '<div class="left25 bred round rewrite-percent zonghe-one" ><span class="number">已保存</span></div>',
                    '{{else if value.type==2}}',
                    '<div class="left25 bgray round rewrite-percent zonghe-one" ><span class="number zonghe-bgray">待抢</span></div>',
                    '{{else if value.type==3}}',
                    '<div class="left25 bgray round rewrite-percent zonghe-one" ><span class="number zonghe-bgray">已有多少位老师抢作业</span></div>',
                    '{{else if value.type==4}}',
                    '<div class="left25 bgray round rewrite-percent zonghe-one" ><span class="number zonghe-bgray">待批改</span></div>',
                    '{{else if value.type==5}}',
                    '<div class="left25 b-blue round rewrite-percent zonghe-one" ><span class="number">{{value.score}}分</span></div>',
                    '{{/if}}',
                '</p>',*/
              /*  '{{if value.type==1}}',
                '<p class="left25 font13 jj-speak-divnew">',
                '<span class="num bold sin_num">{{value.question_sequence_number}}</span>',
                '<a href="#" data-question_id="{{value.question_id}}" data-type="1" category="wjj" score="0" class="sim-anew sim-width510" answer_id="" sequence_number="{{value.question_sequence_number}}">{{value.question_content}}</a>',
                '<span class="left25 bred round rewrite-percentnew " ><span class="number">已保存</span></span>',
                '</p>',
                '{{else if value.type==2}}',
                '<p class="left25 font13 jj-speak-divnew">',
                '<span class="num bold sin_num">{{value.question_sequence_number}}</span>',
                '<a href="#" data-question_id="{{value.question_id}}" data-type="1" category="wjj" score="0" class="sim-anew sim-width510" answer_id="" sequence_number="{{value.question_sequence_number}}">{{value.question_content}}</a>',
                '<span class="fright">等待老师抢作业</span>',
                '</p>',
                '{{else if value.type==3}}',
                '<p class="left25 font13 jj-speak-divnew">',
                '<span class="num bold sin_num">{{value.question_sequence_number}}</span>',
                '<a href="#" data-question_id="{{value.question_id}}" data-type="1" category="wjj" score="0" class="sim-anew sim-width510" answer_id="" sequence_number="{{value.question_sequence_number}}">{{value.question_content}}</a>',
                '<span class="fright">已有{{value.grap_amount}}位老师抢作业</span>',
                '</p>',
                '{{else if value.type==4}}',
                '<p class="left25 font13 jj-speak-divnew">',
                '<span class="num bold sin_num">{{value.question_sequence_number}}</span>',
                '<a href="#" data-question_id="{{value.question_id}}" data-type="1" category="wjj" score="0" class="sim-anew sim-width510" answer_id="" sequence_number="{{value.question_sequence_number}}">{{value.question_content}}</a>',
                '<span class="left25 bgray round rewrite-percentnew " ><span class="number">待批改</span></span>',
                '</p>',
                '{{else if value.type==5}}',
                '<p class="left25 font13 jj-speak-divnew">',
                '<span class="num bold sin_num">{{value.question_sequence_number}}</span>',
                '<a href="#" data-question_id="{{value.question_id}}" data-type="1" category="wjj" score="0" class="sim-anew sim-width510" answer_id="" sequence_number="{{value.question_sequence_number}}">{{value.question_content}}</a>',
                '<span class="left25 b-blue round rewrite-percentnew " ><span class="number">{{value.score}}分</span></span>',
                '</p>',
                '{{else}}',
                '<p class="left25 font13 jj-speak-divnew">',
                '<span class="num bold sin_num">{{value.question_sequence_number}}</span>',
                '<a href="#" data-question_id="{{value.question_id}}" data-type="1" category="wjj" score="0" class="sim-anew" answer_id="" sequence_number="{{value.question_sequence_number}}">{{value.question_content}}</a>',
                '</p>',
                '{{/if}}',*//*  '{{if value.type==1}}',
                '<p class="left25 font13 jj-speak-divnew">',
                '<span class="num bold sin_num">{{value.question_sequence_number}}</span>',
                '<a href="#" data-question_id="{{value.question_id}}" data-type="1" category="wjj" score="0" class="sim-anew sim-width510" answer_id="" sequence_number="{{value.question_sequence_number}}">{{value.question_content}}</a>',
                '<span class="left25 bred round rewrite-percentnew " ><span class="number">已保存</span></span>',
                '</p>',
                '{{else if value.type==2}}',
                '<p class="left25 font13 jj-speak-divnew">',
                '<span class="num bold sin_num">{{value.question_sequence_number}}</span>',
                '<a href="#" data-question_id="{{value.question_id}}" data-type="1" category="wjj" score="0" class="sim-anew sim-width510" answer_id="" sequence_number="{{value.question_sequence_number}}">{{value.question_content}}</a>',
                '<span class="fright">等待老师抢作业</span>',
                '</p>',
                '{{else if value.type==3}}',
                '<p class="left25 font13 jj-speak-divnew">',
                '<span class="num bold sin_num">{{value.question_sequence_number}}</span>',
                '<a href="#" data-question_id="{{value.question_id}}" data-type="1" category="wjj" score="0" class="sim-anew sim-width510" answer_id="" sequence_number="{{value.question_sequence_number}}">{{value.question_content}}</a>',
                '<span class="fright">已有{{value.grap_amount}}位老师抢作业</span>',
                '</p>',
                '{{else if value.type==4}}',
                '<p class="left25 font13 jj-speak-divnew">',
                '<span class="num bold sin_num">{{value.question_sequence_number}}</span>',
                '<a href="#" data-question_id="{{value.question_id}}" data-type="1" category="wjj" score="0" class="sim-anew sim-width510" answer_id="" sequence_number="{{value.question_sequence_number}}">{{value.question_content}}</a>',
                '<span class="left25 bgray round rewrite-percentnew " ><span class="number">待批改</span></span>',
                '</p>',
                '{{else if value.type==5}}',
                '<p class="left25 font13 jj-speak-divnew">',
                '<span class="num bold sin_num">{{value.question_sequence_number}}</span>',
                '<a href="#" data-question_id="{{value.question_id}}" data-type="1" category="wjj" score="0" class="sim-anew sim-width510" answer_id="" sequence_number="{{value.question_sequence_number}}">{{value.question_content}}</a>',
                '<span class="left25 b-blue round rewrite-percentnew " ><span class="number">{{value.score}}分</span></span>',
                '</p>',
                '{{else}}',
                '<p class="left25 font13 jj-speak-divnew">',
                '<span class="num bold sin_num">{{value.question_sequence_number}}</span>',
                '<a href="#" data-question_id="{{value.question_id}}" data-type="1" category="wjj" score="0" class="sim-anew" answer_id="" sequence_number="{{value.question_sequence_number}}">{{value.question_content}}</a>',
                '</p>',
                '{{/if}}',*/

        '{{if value.type==1}}',
        '<p class="left25 mleft20 font13 jj-speak-padding jj-speak-list-js">',
        '<span class="num bold sin_num">{{value.question_sequence_number}}</span>',
        '<a href="#" data-question_id="{{value.question_id}}" data-type="1" category="wjj" score="0" class=" sim-width510" answer_id="" sequence_number="{{value.question_sequence_number}}">{{value.question_content.length>180?value.question_content.substr(0,180)+"..." : value.question_content}}</a>',
        '<span class="fright pg_red">已保存</span>',
        '</p>',
        '{{else if value.type==2}}',
        '<p class="left25 mleft20 font13 jj-speak-padding jj-speak-list-js">',
        '<span class="num bold sin_num">{{value.question_sequence_number}}</span>',
        '<a href="#" data-question_id="{{value.question_id}}" data-type="1" category="wjj" score="0" class=" sim-width510" answer_id="" sequence_number="{{value.question_sequence_number}}">{{value.question_content.length>180?value.question_content.substr(0,180)+"..." : value.question_content}}</a>',
        '<span class="fright pg_red">等待老师抢作业</span>',
        '</p>',
        '{{else if value.type==3}}',
        '<p class="left25 mleft20 font13 jj-speak-padding jj-speak-list-js">',
        '<span class="num bold sin_num">{{value.question_sequence_number}}</span>',
        '<a href="#" data-question_id="{{value.question_id}}" data-type="1" category="wjj" score="0" class=" sim-width510" answer_id="" sequence_number="{{value.question_sequence_number}}">{{value.question_content.length>180?value.question_content.substr(0,180)+"..." : value.question_content}}</a>',
        '<span class="fright pg_red">已有{{value.grap_amount}}位老师抢作业</span>',
        '</p>',
        '{{else if value.type==4}}',
        '<p class="left25 mleft20 font13 jj-speak-padding jj-speak-list-js">',
        '<span class="num bold sin_num">{{value.question_sequence_number}}</span>',
        '<a href="#" data-question_id="{{value.question_id}}" data-type="1" category="wjj" score="0" class=" sim-width510" answer_id="" sequence_number="{{value.question_sequence_number}}">{{value.question_content.length>180?value.question_content.substr(0,180)+"..." : value.question_content}}</a>',
        '<span class="fright pg_red">待批改</span>',
        '</p>',
        '{{else if value.type==5}}',
        '<p class="left25 mleft20 font13  jj-speak-padding jj-speak-list-js">',
        '<span class="num bold sin_num">{{value.question_sequence_number}}</span>',
        '<a href="#" data-question_id="{{value.question_id}}" data-type="1" category="wjj" score="0" class=" sim-width510" answer_id="" sequence_number="{{value.question_sequence_number}}">{{value.question_content.length>180?value.question_content.substr(0,180)+"..." : value.question_content}}</a>',
        '<span class="left25 b-blue round rewrite-percentnew " ><span class="number">{{value.score}}分</span></span>',
        '</p>',
        '{{else}}',
        '<p class="left25 mleft20 font13 jj-speak-padding jj-speak-list-js">',
        '<span class="num bold sin_num">{{value.question_sequence_number}}</span>',
        '<a href="#" data-question_id="{{value.question_id}}" data-type="1" category="wjj" score="0" class="sim-a2" answer_id="" sequence_number="{{value.question_sequence_number}}">{{value.question_content.length>180?value.question_content.substr(0,180)+"..." : value.question_content}}</a>',
        '</p>',
        '{{/if}}',
                '{{/each}}',
                '</div>',
            '</div>',
        '</div>'
    ].join('')
})
