'use strict'

define(function(){
  return [
  '<div class="right-part1">',
    '<p class="p1 bold black mleft25"><span>正在练习>练词>看词辨音>Unit<span id="">{{data.group_sequence_number}}</span></span><span class="unit"><a href="#" id="wordUnit2">选择单元</a></span><span class="time-pos" id="timerspan"><img src="../../i/time.png"><a href="##" class="timeBtn">计时:</a><a id="testTimer">{{data.currentTestTimeStrListen || "00:00:00"}}</a></span></p>',
    '<hr class="mleft25" />',
    '<div class="family-song listen-question">',
    '</div>',
   '</div>'
  ].join('')
})