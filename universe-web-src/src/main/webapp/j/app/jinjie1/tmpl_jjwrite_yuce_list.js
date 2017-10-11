/**
 * Created by SaE on 2015/4/8.
 * 机经写作-机经预测列表
 */
define(function () {
    return [
        '<div class="right-part2">',
        '    <ul class="tabWrite tabs_new forecast_tabs" role="tablist" id="myTabWrite">',
        '        {{each data.groups as value index}}',
                    '<li role="presentation" class="{{if index == 0}}current{{/if}}"><a href="#" gid="{{value.group_id}}" gtitle="{{value.group_title}}" class="yuceTab " style="width:140px;">{{value.group_title}}</a></li>',
        '        {{/each}}',
        '    </ul>',
        //'    <p class="p1 bold black mleft25"><img src="../../i/list-pic.png" style="margin-left:-10px;margin-right:10px;"><span id="spanTitle">{{data.title}}</span></p>',
        //'    <hr class="mleft25" />',
        '    <div class="tab-content jijing-tab-style">',
        '        <div role="tabpanel" class="tab-pane active jijing-speak-tab" id="jjWriteYuceContent">',
        '        {{each data.questions as value index}}',
        '        <p class="left25 font13 jijing-speak-div relative" style="min-height: 88px;padding-top: 20px;padding-left: 40px;">',
        '            {{if (value.category==1)}}<span class="jjyc_bluebg"><span class="font14 jjyc_bgfont">大范围</span></span>',
        '            {{else if (value.category==2)}}<span class="jjyc_bluebg"><span class="font14 jjyc_bgfont">大范围</span></span>{{/if}}',
        '            <span class="num bold">{{value.question_sequence_number}}.</span>',
        '            <a href="javascript:;" class="sim-a jjwrite" qid="{{value.question_id}}" type="{{value.has_answer?1:0}}" come="{{data.come}}" >',
        '                {{value.question_content}}',
        '            </a>',
        '            {{if value.has_answer}}',
        '            <span class="team-score blue">-已练</span>',
        '            {{/if}}',
        '        </p>',
        '        {{/each}}',
        '        </div>',
        '    </div>',
        '</div>'
    ].join('');
});