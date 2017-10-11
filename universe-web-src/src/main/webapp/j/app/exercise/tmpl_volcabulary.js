'use strict'

define(function(){
  return [
    '<div class="right-part1">',
      //'<p class="p1 bold black mleft25"><img src="../../i/list-pic.png" class="list-pic"><span>阅读词汇第<span id="volUnit"></span>单元</span><span class="unit">' +
      '<p class="p1 bold black mleft25"><img src="../../i/list-pic.png" class="list-pic"><span >{{data.xm_title}}</span><span class="unit">' +
      '<a href="#" id="unitVol"></a></span><span class="time-pos" id="timerspan"><img src="../../i/time.png"><a href="##" class="timeBtn">计时:</a><a id="testTimer">{{data.currentTestTimeStrVol || "00:00:00"}}</a></span></p>',
      '<hr class="mleft25">',
      '<div class="vol-question">',
      '<div>',
   '</div>'
  ].join('')
})