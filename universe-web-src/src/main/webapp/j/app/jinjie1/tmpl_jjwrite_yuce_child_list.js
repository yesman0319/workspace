/**
 * 机经写作-机经预测指定年份列表
 */
define(function () {
    return [
    '{{each data.questions as val idx}}',
    '<p class="left25 font13 jijing-speak-div relative" style="min-height: 88px;padding-top: 20px;padding-left: 40px;">',
    '    {{if (val.category==1)}}<span class="jjyc_bluebg"><span class="font14 jjyc_bgfont">大范围</span></span>',
    '    {{else if (val.category==2)}}<span class="jjyc_bluebg"><span class="font14 jjyc_bgfont">大范围</span></span>{{/if}}',
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