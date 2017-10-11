'use strict';

define(function(){
  return [
    '{{ if data }}',
    '<div class="right-part1">',
    '<p class="p1 bold black mleft25"><img src="../../i/list-pic.png" style="margin-left:-6px;margin-right:10px;"><span>单元列表</span></p>',
    '<hr class="mleft25">',
    '<ul><li>',
    '{{each data as value index}}',
        '<p class="totel-unit">',
        '{{if value.isLock}}',
        '<a class="default-cursor" href="javascript:;">',
        '{{else}}',
        '<a class="someUnit" group_id="{{value.group_id}}" group_num="{{value.group_sequence_number}}" href="#">',
        '{{/if}}',
        'unit{{ value.group_sequence_number }}',
        '</a>{{if value.is_today_task}}<span class="orange left16">今日任务</span>{{/if}}',
        '{{if !value.biggestUnlockNoDone}}',
        '<img src="{{value.imgUrl}}" alt="" group_id="{{value.group_id}}" group_num="{{value.group_sequence_number}}" class="{{if !value.isLock}}someRate pointer{{/if}} i25-6">',
        '{{/if}}',
      '</p>',
     '{{/each}}',
    '</li></ul>',
  '</div>',
  '{{ /if }}',
  /**未解锁提示**/
      '<div class="modal fade" id="lockModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">',
      '<div class="modal-dialog">',
      '<div class="modal-content" style="width:354px;border: 1px solid #C2BFBF;border-top: 7px solid #509bfd;">',
      '<div class="modal-body">',
      '<p id="lockTip" class="feedback-title" style="text-align:center;top:0px;">前一单元90%正确,5.5秒每空才能解锁此单元</p>',
      '</div>',
      '<div class="one-button3" style="text-align:center;">',
      '<button type="button" class="btn btn-primary btn-sm feedback-button2 btn1" id="lockSure" onclick="javaScript:$(\'#lockModal\').modal(\'hide\')">确定</button>',
      '</div>',
      '</div>',
      '</div>',
      '</div>'
  ].join('')
})
