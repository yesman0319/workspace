/**
 * Created by SaE on 2015/4/8.
 * 机经写作-历年真题指定年份列表
 */
define(function () {
    return [
    '{{each data.questions as val idx}}',
    '<p class="left25 font13 jijing-speak-div">',
    '    <span class="num bold">{{val.question_sequence_number}}.</span>',
    '    <a href="javascript:;" class="sim-a jjwrite" qid="{{val.question_id}}" type="{{val.has_answer?1:0}}" come="{{data.come}}" >',
    '        {{val.question_content}}',
    '    </a>',
    '    {{if val.has_answer}}',
    '    <span class="team-score blue">-已练</span>',
    '    {{/if}}',
    '</p>',
    '{{/each}}'
    ].join('');
});