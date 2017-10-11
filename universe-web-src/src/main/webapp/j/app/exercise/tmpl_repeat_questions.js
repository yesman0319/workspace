
/**
 * Created by SaE on 2015/3/3.
 * 单元下试题列表页
 */
define(function () {
    return [
        '{{if data.repeat_questions && data.repeat_questions.length>0}}',
        '<div class="right-part1">',
        '<p class="p3 gray">',
        '   <span><a href="#" class="bold bread-gray">正在练习</a><span class="sign1 bread-gray">&gt;</span></span>',
        '   <span><a href="#" class="bold bread-gray repeat-unit">复述</a><span class="sign1 bread-gray">&gt;</span></span>',
        '   <span><a id="go1" href="#" class="bold bread-gray">unit{{data.groupNumber}}</a></span>',
        '   <span class="unit"><a id="selectRepeatUnit" href="#">选择单元</a></span>',
        '</p>',
        '<hr class="mleft25">',
        '{{each data.repeat_questions as value index}}',
        '<div class="left25 font13 repeat-div {{if value.is_correct==1}}repeat-div1{{else if value.is_correct==2}}repeat-div2{{/if}}">',
        '   <p class="repeat-p1">',
        '       <span class="num bold">{{value.question_sequence_number}}.</span>',
        '       <a href="#" class="sim-a gotoQuestion" question-id="{{value.question_id}}" group-number="{{data.groupNumber}}" group-id="{{data.groupId}}">{{value.en}}</a>',
        '   </p>',
        '   <p class="repeat-p2">{{value.ch}}</p>',
        '</div>',
        '{{/each}}',
        '</div>',
        '{{else}}',
        '<div class="right-part1">',
        '<p class="p3 gray">',
        '   <span><a href="#" class="bold bread-gray">正在练习</a><span class="sign1 bread-gray">&gt;</span></span>',
        '   <span><a href="#" class="bold bread-gray">复述</a><span class="sign1 bread-gray">&gt;</span></span>',
        '   <span><a id="go1" href="#" class="bold bread-gray">unit{{data.groupNumber}}</a></span>',
        '   <span class="unit"><a id="selectRepeatUnit" href="#">选择单元</a></span>',
        '</p>',
        '<hr class="mleft25">',
        '<div class="left25 font13 repeat-div" style="text-align: center;">暂无数据！</div>',
        '{{/if}}'
    ].join('');
});