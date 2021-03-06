/**
 * Created by SaE on 2015/3/23.
 */
define(function () {
    return [
        '    <div class="right-part1">',
        '       <p class="p1 bold balck mleft25">',
        '       <img src="../../i/list-pic.png" class="list-pic"><span class="black">题目列表</span>',
        '       </p>',
        '       <hr class="mleft25">',
        '        {{if data}}',
        '        <ul>',
        '            <li>',
        '             {{each data as value index}}',
        '                <p class="totel-unit">',
        '                   {{if value.group_level>=0}}',
        '                               <a href="#" groupid="{{value.question_id}}"  {{if value.sequence_number==data.length}}data-last_question="true"{{/if}}  data-group_level="{{value.group_level}}" class="goTpoQuestion">第{{value.sequence_number}}题</a>{{if value.is_today_task}}<span class="orange left16">今日任务</span>{{/if}}',
        '                           {{if value.group_level == 0}}',
        '                                   <img src="../../i/newimg-0.png" groupid="{{value.question_id}}"   {{if value.sequence_number==data.length}}data-last_question="true"{{/if}}  data-group_level="{{value.group_level}}" data-avg_speed="{{value.avg_speed}}" data-index="{{index}}" data-id="{{value.question_id}}" data-sequenceNumber="{{value.sequence_number}}"  data-questionCount="{{value.question_count}}" data-rate="{{value.rate}}" data-errorQuestionIds="{{value.error_question_ids}}" class="i25-6 goTpoResult pointer">',
        '                           {{/if}}',
        '                           {{if value.group_level == 1}}',
        '                                   <img src="../../i/newimg-4.png" groupid="{{value.question_id}}"   {{if value.sequence_number==data.length}}data-last_question="true"{{/if}}  data-group_level="{{value.group_level}}" data-avg_speed="{{value.avg_speed}}" data-index="{{index}}" data-id="{{value.question_id}}" data-sequenceNumber="{{value.sequence_number}}"  data-questionCount="{{value.question_count}}" data-rate="{{value.rate}}" data-errorQuestionIds="{{value.error_question_ids}}" class="i25-6 goTpoResult pointer">',
        '                           {{/if}}',
        '                           {{if value.group_level == 2}}',
        '                                   <img src="../../i/newimg-1.png" groupid="{{value.question_id}}"   {{if value.sequence_number==data.length}}data-last_question="true"{{/if}}  data-group_level="{{value.group_level}}" data-avg_speed="{{value.avg_speed}}" data-index="{{index}}" data-id="{{value.question_id}}" data-sequenceNumber="{{value.sequence_number}}"  data-questionCount="{{value.question_count}}" data-rate="{{value.rate}}" data-errorQuestionIds="{{value.error_question_ids}}" class="i25-6 goTpoResult pointer">',
        '                           {{/if}}',
        '                           {{if value.group_level == 3}}',
        '                                   <img src="../../i/newimg-2.png" groupid="{{value.question_id}}"   {{if value.sequence_number==data.length}}data-last_question="true"{{/if}}  data-group_level="{{value.group_level}}" data-avg_speed="{{value.avg_speed}}" data-index="{{index}}" data-id="{{value.question_id}}" data-sequenceNumber="{{value.sequence_number}}"  data-questionCount="{{value.question_count}}" data-rate="{{value.rate}}" data-errorQuestionIds="{{value.error_question_ids}}" class="i25-6 goTpoResult pointer">',
        '                           {{/if}}',
        '                           {{if value.group_level == 4}}',
        '                                   <img src="../../i/newimg-3.png" groupid="{{value.question_id}}"   {{if value.sequence_number==data.length}}data-last_question="true"{{/if}}  data-group_level="{{value.group_level}}" data-avg_speed="{{value.avg_speed}}" data-index="{{index}}" data-id="{{value.question_id}}" data-sequenceNumber="{{value.sequence_number}}"  data-questionCount="{{value.question_count}}" data-rate="{{value.rate}}" data-errorQuestionIds="{{value.error_question_ids}}" class="i25-6 goTpoResult pointer">',
        '                           {{/if}}',
        '                   {{else if value.group_level == -1}}',
        '                           <a href="#" groupid="{{value.question_id}}" {{if value.sequence_number==data.length}}data-last_question="true"{{/if}}  class="locked-item">第{{value.sequence_number}}题</a>{{if value.is_today_task}}<span class="orange left16">今日任务</span>{{/if}}',
        '                           <img src="../../i/side-pic42.png" groupid="{{value.question_id}}" data-group_level="{{value.group_level}}"   {{if value.sequence_number==data.length}}data-last_question="true"{{/if}}  data-avg_speed="{{value.avg_speed}}" data-rate="{{value.rate}}" data-groups-id="{{value.question_id}}" data-volUnit="{{value.sequence_number}}" data-questionCount="{{value.question_count}}" data-rate="{{value.rate}}" data-errorQuestionIds="{{value.error_question_ids}}" class="i25-6">',
        '                   {{else if value.group_level == -2}}',
        '                               <a href="#" groupid="{{value.question_id}}" {{if value.sequence_number==data.length}}data-last_question="true"{{/if}} data-group_level="{{value.group_level}}" class="goTpoQuestion">第{{value.sequence_number}}题</a>{{if value.is_today_task}}<span class="orange left16">今日任务</span>{{/if}}',
        '                   {{/if}}',
        '                </p>',
        '             {{/each}}',
        '            </li>',
        '        </ul>',
        //'<div class="tpo-load-more pointer" id="tpoWriteMore" style="display:none;">',
        //'<p><img src="../../i/tpo-pic1.png">点击加载更多</p>',
        //'</div>',
        '        {{else}}',
        '        <div>暂无数据!</div>',
        '        {{/if}}',
        '    </div>',

    /**未解锁提示**/
        '<div class="modal fade" id="lockModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">',
        '<div class="modal-dialog">',
        '<div class="modal-content" style="width:354px;border: 1px solid #C2BFBF;border-top: 7px solid #509bfd;">',
        '<div class="modal-body">',
        '<p class="feedback-title" style="text-align:center;top:0px;">前一单元90%正确,14秒每空才能解锁此单元</p>',
        '</div>',
        '<div class="one-button3" style="text-align:center;">',
        '<button type="button" class="btn btn-primary btn-sm feedback-button2 btn1" id="lockSure" onclick="javaScript:$(\'#lockModal\').modal(\'hide\')">确定</button>',
        '</div>',
        '</div>',
        '</div>',
        '</div>'
    ].join('');
});