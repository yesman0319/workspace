/**
 * Created by SaE on 2015/4/8.
 * 机经写作-机经预测列表
 */
define(function () {
    return [
        '<div class="right-part1">',
        '    <p class="p1 bold black mleft25"><img src="../../i/list-pic.png" style="margin-left:-10px;margin-right:10px;"><span id="spanTitle">{{data.title}}</span></p>',
        '    <hr class="mleft25" />',
        '    {{each data as value index}}',
        '    <p class="left25 font13 jijing-speak-div">',
        '        <span class="num bold">{{value.question_sequence_number}}.</span>',
        '        <a href="javascript:;" class="sim-a zonghe" qid="{{value.question_id}}" type="{{value.type}}"  >',
        '            {{value.question_content}}',
        '        </a>',
        '        {{if value.type}}',
        '        <span class="team-score blue">-已练</span>',
        '        {{/if}}',
        '    </p>',
        '    {{/each}}',
        '</div>'
    ].join('');
});