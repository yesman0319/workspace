/**
 * Created by SaE on 2015/4/9.
 * 综合写作批改
 */
define(function () {
    return [
        '{{each data.questions as value index}}',
        '<hr class="jijing-hr">',
        '<p class="mleft25 h40 border-bto"><span class="num bold">{{value.sequence_number}}.</span>' +
        '<a qid="{{value.id}}" href="#" class="zonghewrite" type="{{value.type}}">{{value.content}}...</a></p>',
        '{{/each}}'
    ].join('');
});