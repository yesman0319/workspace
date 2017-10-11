/**
 * Created by SaE on 2015/4/8.
 * 机经写作-历年真题列表
 */
define(function () {
    return [
        '<div class="right-part2">',
        '    <ul class="tabWrite tabs_new forecast_tabs" role="tablist" id="myTabWrite">',
        '        {{each data.groups as value index}}',
                    '<li role="presentation" class="{{if index == 0}}current{{/if}}"><a href="#" gid="{{value.group_id}}" gtitle="{{value.group_title}}" class="jjWriteTab " style="width:140px;">{{value.group_title}}</a></li>',
        '        {{/each}}',
        '    </ul>',
        '    <div class="tab-content jijing-tab-style">',
        '        <div role="tabpanel" class="tab-pane active jijing-speak-tab" id="jjWriteZhentiContent">',
        '            {{each data.questions as val idx}}',
        '            <p class="left25 font13 jijing-speak-div">',
        '                <span class="num bold">{{val.question_sequence_number}}.</span>',
        '                <a href="javascript:;" class="sim-a jjwrite" qid="{{val.question_id}}" type="{{val.has_answer?1:0}}" come="{{data.come}}" >',
        '                    {{val.question_content}}',
        '                </a>',
        '                {{if val.has_answer}}',
        '                <span class="team-score blue">-已练</span>',
        '                {{/if}}',
        '            </p>',
        '            {{/each}}',
        '        </div>',
        '    </div>',
        '</div>'
    ].join('');
});