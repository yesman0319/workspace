'use strict'

define(function(){
  return [
   '<div class="right-part1">',
    '<p class="p1 bold black mleft25">' +
    //'<span>正在练习>练词>听音辨词>Unit<span id="">{{data.group_sequence_number}}</span></span><span class="unit"><a href="#" id="wordUnit1"></a></span>' +
    '<span><img src="../../i/list-pic.png" class="list-pic">',
    '<span>{{data.xm_title}}</span>' +
    '<span class="time-pos" id="timerspan"><img src="../../i/time.png"><a href="##" class="timeBtn">计时:</a><a id="testTimer3">{{data.currentTestTimeStrListen || "00:00:00"}}</a></span></p>',
    '<hr class="mleft25" />',
    '<div class="family-song listen-question">',
    '</div>',
   '</div>'
  ].join('')
})