'use strict';

define(function(){
  return [
 '<div class="sidebar">',
   '<div class="list-group" id="firstpane">',
   '<ul class="sidebar-ul ">',
   '<li>',
      '<a href="#" id="side1" class="list-group-item side-border1 bold menu_head current lida side height45"><img src="../../i/side-pic12.png" class="side-pic">TPO阅读</a>',
    '</li>',
    '<li>',
      '<a href="#" id="side2" class="list-group-item side-border2 bold menu_head current lida side height45"><img src="../../i/side-pic13.png" class="side-pic">TPO听力</a>',
    '</li>',
    '<li>',
      '<a href="#" id="side3" class="list-group-item side-border1 bold menu_head lida"><img src="../../i/side-pic14.png" class="side-pic">独立口语<img src="../../i/side-ang1.png" style="margin-left: 85px;"  id="speakImg"></a>',
      '<div id="speak_menu_div" style="display:none;">',
          '<ul>',
              '<li class="lida2 side-li "><a id="side3_1" href="javaScript:;" class="list-group-item side-border1 bold  subsidebar lida3 height45 sidebarLight"><img src="../../i/side-pic21.png" class="side-pic" />机经预测</a></li>',
              '<li class="lida2 side-li"><a id="side3_2" href="javaScript:;" class="list-group-item side-border1 bold subsidebar lida3 height45"><img src="../../i/side-pic22.png" class="side-pic" />历年真题</a></li>',
          '</ul>',
      '</div>',
    '</li>',
      '<li>',
      '<a href="#" id="side3_3" class="list-group-item side-border2 bold menu_head current lida side height45"><img src="../../i/side-pic30.png" class="side-pic">综合口语</a>',
      '</li>',
    '<li>',
      //'<a href="#" id="side66" class="list-group-item side-border2 bold menu_head current lida side height45"><img src="../../i/side-pic15.png" class="side-pic">机经写作</a>',
      '<a href="#" id="side66" class="list-group-item side-border1 bold menu_head current lida side height45"><img src="../../i/side-pic15.png" class="side-pic">独立写作<img id="imgJJWrite" src="../../i/side-ang1.png" style="margin-left: 85px;" /></a>',
      '<div id="jj_write_menu_div" style="display:none;">',
          '<ul>',
          '<li class="lida2 side-li "><a id="side661" href="javaScript:;" class="list-group-item side-border1 bold  subsidebar lida3 height45 sidebarLight"><img src="../../i/side-pic21.png" class="side-pic" />机经预测</a></li>',
          '<li class="lida2 side-li"><a id="side662" href="javaScript:;" class="list-group-item side-border1 bold subsidebar lida3 height45"><img src="../../i/side-pic22.png" class="side-pic" />历年真题</a></li>',
          '</ul>',
      '</div>',
    '</li>',
    '<li>',
    '<a href="#" id="side77" class="list-group-item side-border2 bold menu_head current lida side height45"><img src="../../i/side-pic31.png" class="side-pic">综合写作</a>',
    '</li>',
   '</ul>',
   '</div>', 
  '</div>'
  ].join('')
});
