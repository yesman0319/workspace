/**
 * Created by SaE on 2015/4/9.
 * 机经写作-做题页
 */
define(function () {
    return [
        '{{each data.questions as value index}}',
        '<hr class="jijing-hr">',
        '<p class="mleft25 h40 border-bto"><span class="num bold">{{value.question_sequence_number}}.</span>' +
        '<a qid="{{value.question_id}}" href="#" class="zonghe" type="{{value.type}}" sequence_number="{{value.question_sequence_number}}">{{value.right_content}}</a></p>',
        '{{/each}}'
    ].join('');
});