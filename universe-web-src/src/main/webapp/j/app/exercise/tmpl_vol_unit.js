'use strict'

define(function(){
  return [
  '<div class="right-part1">',
    '<p class="p1 bold balck mleft25"><img src="../../i/list-pic.png" class="list-pic"><span class="black">单元列表</span></p>',
    '<hr class="mleft25">',
    // '正确率{{data.vocabulary_groups[0].rate}}',
    //         '平均速度{{data.vocabulary_groups[0].avg_speed}}',
    '<ul><li>',
    '{{each data.vocabulary_groups as value index}}',
    '<p class="totel-unit">',
        '<a href="#" class="unitVolDetailWord {{if index == 0}}firstVol{{/if}}" data-locked="{{value.locked}}" data-group_level="{{value.group_level}}" data-rate="{{value.rate}}" data-groups-id="{{value.id}}" data-volUnit="{{value.sequence_number}}">unit{{value.sequence_number}}</a>{{if value.is_today_task}}<span class="orange left16">今日任务</span>{{/if}}',
        // '{{if value.rate == 100}}',
        //   '<a class="green unitVolDetail pointer" data-group_level="{{value.group_level}}" data-avg_speed="{{value.avg_speed}}" data-rate="{{value.rate}}" data-groups-id="{{value.id}}" data-volUnit="{{value.sequence_number}}">(正确率: {{value.rate}}%)</a>',
        // '{{/if}}',
        // '{{if value.rate > -1 && value.rate < 100}}',
        //   '<a class="green unitVolDetail pointer" data-group_level="{{value.group_level}}" data-avg_speed="{{value.avg_speed}}" data-rate="{{value.rate}}" data-groups-id="{{value.id}}" data-volUnit="{{value.sequence_number}}">(正确率: {{value.rate}}%)</a>',
        // '{{/if}}',
      '{{if value.locked==0}}',
          '{{if value.rate > -1}}',
            '{{if value.group_level == 0}}',
            '<img src="../../i/newimg-0.png" data-group_level="{{value.group_level}}" data-avg_speed="{{value.avg_speed}}" data-rate="{{value.rate}}" data-groups-id="{{value.id}}" data-volUnit="{{value.sequence_number}}" class="i25-6 unitVolDetail pointer">',
            '{{/if}}',
            '{{if value.group_level == 1}}',
            '<img src="../../i/newimg-4.png" data-group_level="{{value.group_level}}" data-avg_speed="{{value.avg_speed}}" data-rate="{{value.rate}}" data-groups-id="{{value.id}}" data-volUnit="{{value.sequence_number}}" class="i25-6 unitVolDetail pointer">',
            '{{/if}}',
            '{{if value.group_level == 2}}',
            '<img src="../../i/newimg-1.png" data-group_level="{{value.group_level}}" data-avg_speed="{{value.avg_speed}}" data-rate="{{value.rate}}" data-groups-id="{{value.id}}" data-volUnit="{{value.sequence_number}}" class="i25-6 unitVolDetail pointer">',
            '{{/if}}',
            '{{if value.group_level == 3}}',
            '<img src="../../i/newimg-2.png" data-group_level="{{value.group_level}}" data-avg_speed="{{value.avg_speed}}" data-rate="{{value.rate}}" data-groups-id="{{value.id}}" data-volUnit="{{value.sequence_number}}" class="i25-6 unitVolDetail pointer">',
            '{{/if}}',
            '{{if value.group_level == 4}}',
            '<img src="../../i/newimg-3.png" data-group_level="{{value.group_level}}" data-avg_speed="{{value.avg_speed}}" data-rate="{{value.rate}}" data-groups-id="{{value.id}}" data-volUnit="{{value.sequence_number}}" class="i25-6 unitVolDetail pointer">',
            '{{/if}}',
          // '{{else}}',
          //     '<img src="../../i/i25-5.png" data-rate="{{value.rate}}" data-groups-id="{{value.id}}" data-volUnit="{{value.sequence_number}}" class="i25-6 unitVolDetailWord pointer">',
          '{{/if}}',
      '{{else}}',
            '<img src="../../i/side-pic42.png" data-group_level="{{value.group_level}}" data-avg_speed="{{value.avg_speed}}" data-rate="{{value.rate}}" data-groups-id="{{value.id}}" data-volUnit="{{value.sequence_number}}" class="i25-6">',
      '{{/if}}',


        '</p>',
    '{{/each}}',
    '</li></ul>',
   '</div>',


  /**未解锁提示**/
    '<div class="modal fade" id="lockModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">',
    '<div class="modal-dialog">',
    '<div class="modal-content" style="width:354px;border: 1px solid #C2BFBF;border-top: 7px solid #509bfd;">',
    '<div class="modal-body">',
    // '<p class="feedback-title" style="text-align:center;top:0px;">前面单元点亮奖杯和三面小旗才能解锁当前单元</p>',
    '<p class="feedback-title" style="text-align:center;top:0px;">前一单元90%正确,4.4秒每题才能解锁此单元</p>',
    '</div>',
    '<div class="one-button3" style="text-align:center;">',
    '<button type="button" class="btn btn-primary btn-sm feedback-button2 btn1" id="lockSure" onclick="javaScript:$(\'#lockModal\').modal(\'hide\')">确定</button>',
    '</div>',
    '</div>',
    '</div>',
    '</div>',

  /**第一次做弹框**/
  // <!-- Modal -->
  '<div class="modal fade" id="firstModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">',
  '<div class="modal-dialog">',
  '<div class="modal-content" style="width:400px;border: 1px solid #C2BFBF;border-top: 7px solid #509bfd;">',
  '<div class="modal-body">',
  '<p style="text-align: center; font-weight: bold; font-size: 18px;">提示</p>',
  '<p class="feedback-title" style="text-indent:34px; top:0px;">童鞋，阅读词汇是老师从TPO阅读的文章中挑选出来的哦，练习的目的主要是为了扫清在阅读中的障碍，所以做题过程中只有词义。</p>',
  '</div>',
  '<div style="text-align:center;">',
  '<button type="button" class="btn btn-primary btn-sm feedback-button2 btn1" id="firstSure">我知道了</button>',
  '</div>',
  '</div>',
  '</div>',
  '</div>'
  ].join('')
})