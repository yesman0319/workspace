
/**
 * Created by SaE on 2015/3/2.
 */
define(function () {
    return [
        '<div class="right-part1">',
            '<p class="p1 bold balck mleft25">',
                '<img src="../../i/list-pic.png" class="list-pic"><span class="black">单元列表</span>',
            '</p>',
            '<hr class="mleft25">',
            '{{if data}}',
            '<ul>',
                '<li>',
                    '{{each data as value index}}',
                    '<p class="totel-unit">',
                        '<a href="#" class="goQuestionList" group-id="{{value.group_id}}" group_number="{{value.group_sequence_number}}">unit{{value.group_sequence_number}}</a>',
                        '{{if value.rate!=null }}',
                        '<span class="repeat-results {{value.eleClass}}">(正确率：{{value.rate.toFixed(1)}}%)</span>',
                        '{{/if}}',
                    '</p>',
                    '{{/each}}',
                '</li>',
            '</ul>',
            '{{else}}',
            '<div>暂无数据!</div>',
        '{{/if}}',
        '</div>'
    ].join('');
});

