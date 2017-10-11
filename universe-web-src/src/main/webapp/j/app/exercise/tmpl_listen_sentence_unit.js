'use strict'

define(function(){
  return [
  '<div class="right-part2">',
   '<ul class="nav nav-tabs" role="tablist" id="myTab">',
    '<li role="presentation" class="li-style1 bold active"><a href="##" id="listenSentenceTab1" role="tab" data-toggle="tab" style="text-align:center;">听音辨句</a></li>',
    '<li role="presentation" class="li-style1 bold "><a href="##" id="listenSentenceTab2" role="tab" data-toggle="tab" style="text-align:center;">看句辨音</a></li>',
   '</ul>',
   '<div class="tab-content">',
    '<div role="tabpanel" class="tab-pane active">',
     '<ul class="hear-unit mleft25" id="listenSentenceUnit">',
     '</ul>',
    '</div>',
   '</div>',
  '</div>',

  /**未解锁提示听音辩句**/
      '<div class="modal fade" id="lockModal1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">',
      '<div class="modal-dialog">',
      '<div class="modal-content" style="width:354px;border: 1px solid #C2BFBF;border-top: 7px solid #509bfd;">',
      '<div class="modal-body">',
      // '<p class="feedback-title" style="text-align:center;top:0px;">前面单元点亮奖杯和三面小旗才能解锁当前单元</p>',
      '<p class="feedback-title" style="text-align:center;top:0px;">前一单元90%正确,11.4秒每题才能解锁此单元</p>',
      '</div>',
      '<div class="one-button3" style="text-align:center;">',
      '<button type="button" class="btn btn-primary btn-sm feedback-button2 btn1" id="lockSure" onclick="javaScript:$(\'#lockModal1\').modal(\'hide\')">确定</button>',
      '</div>',
      '</div>',
      '</div>',
      '</div>',

  /**未解锁提示看词辩句**/
      '<div class="modal fade" id="lockModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">',
      '<div class="modal-dialog">',
      '<div class="modal-content" style="width:354px;border: 1px solid #C2BFBF;border-top: 7px solid #509bfd;">',
      '<div class="modal-body">',
      // '<p class="feedback-title" style="text-align:center;top:0px;">前面单元点亮奖杯和三面小旗才能解锁当前单元</p>',
      '<p class="feedback-title" style="text-align:center;top:0px;">前一单元90%正确,答题速度够快才能解锁此单元</p>',
      '</div>',
      '<div class="one-button3" style="text-align:center;">',
      '<button type="button" class="btn btn-primary btn-sm feedback-button2 btn1" id="lockSure" onclick="javaScript:$(\'#lockModal2\').modal(\'hide\')">确定</button>',
      '</div>',
      '</div>',
      '</div>',
      '</div>',
  ].join('')
})