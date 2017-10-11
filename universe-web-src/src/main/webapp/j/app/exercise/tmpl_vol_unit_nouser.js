'use strict'

define(function(){
  return [
  '<div class="right-part1">',
   /* '<p class="p1 bold black mleft25"><img src="../../i/list-pic.png" class="list-pic"><span>单元列表</span><span class="unit"><a href="#" id="unitVol">选择单元</a></span><span class="time-pos"><img src="../../i/time.png"><a href="#">计时：00:00:00</a></span></p>',*/
    '<p class="p1 bold black mleft25"><img src="../../i/list-pic.png" class="list-pic"><span>练习报告</span><span class="time-pos"><img src="../../i/time.png"><a href="#">计时：00:00:00</a></span></p>',
    '<hr class="mleft25">',
    '<ul><li>',
      '{{each data.volUnit as value index}}',
        '<a href="#" class="unitVolDetail" data-rate="-1" data-groups-id="{{value}}" data-volUnit="{{value}}">unit{{value}}</a>',
      '{{/each}}',
    '</li></ul>',
   '</div>'
  ].join('')
})