
'use strict'

define(function(){
  return [
    '{{if data}}',
   '<div class="sidebar">',
   '<div class="list-group" id="firstpane">',
   '<ul class="sidebar-ul ">',
   // '{{each data as value index}}',
   //  '<li>',
   //    '<a href="#" id="{{value.id}}" class="bold menu_head current lida">{{value.content}}<hr class="hr6 mleft25"></a>',
   //  '</li>',
   // '{{/each}}',
   // '<li>',
   //     '<a id="side5" href="##" class=" bold menu_head lida">写作批改</a>',
   //       '<div id="wirte_menu_div">',
   //       '<hr class="hr6" style="margin-bottom: 0px;">',
   //       '<ul>',
   //         '<li class="lida2">',
   //          '<a id="side6" href="##"  class=" bold  subsidebar lida3">写作机经</a>',
   //         '</li>',
   //         '<li class="lida2">',
   //           '<a id="side7" href="##"  class=" bold subsidebar lida3">历年真题</a>',
   //         '</li>',
   //       '</ul>',
   //       '</div>',
   //       '<hr class="hr6" /></a>',
   // '</li>',

/*   '<li>',
      '<a href="#" id="side1" class="list-group-item side-border1 bold menu_head current lida"><img src="../../i/side-pic1.png" class="side-pic">练习历史</a>',
    '</li>',*/
    '<li>',
      '<a href="#" id="side8" class="list-group-item  side-border2 bold menu_head current lida"><img src="../../i/side-pic6.png" class="side-pic">阅读词汇</a>',
    '</li>',
    '<li>',
      '<a href="#" id="side2" class="list-group-item side-border1 bold menu_head current lida"><img src="../../i/side-pic2.png" class="side-pic">语法</a>',
    '</li>',
    '<li>',
      '<a href="#" id="side3" class="list-group-item side-border2 bold menu_head current lida"><img src="../../i/side-pic3.png" class="side-pic">听写</a>',
    '</li>',
   '<li>',
    '<a id="side10" href="##" class="list-group-item side-border1 bold menu_head lida"><img src="../../i/side-pic4.png" class="side-pic">音义互辨</a>',
/*     '<div id="listen_menu_div" style="display:none;">',
      '<ul>',
       '<li class="lida2 side-li sidebarLight" style="display: none;"><a id="side10" href="##" class="list-group-item  side-border2 bold subsidebar sidebarLight lida3"><img src="../../i/side-pic11.png" class="side-pic">练词</a></li>',
       '<li class="lida2 side-li"><a id="side11" href="##" class="list-group-item  side-border2 bold subsidebar lida3"><img src="../../i/side-pic10.png" class="side-pic">练句</li>',
      '</ul>',
     '</div>',*/
   '</li>',

   '<li>',
       '<a href="#" id="side4" class="list-group-item  side-border2 bold menu_head current lida"><img src="../../i/side-pic5.png" class="side-pic">记忆复写</a>',
    '</li>',
    // '<li>',
    //    '<a href="#" id="side8" class="list-group-item  side-border2 bold menu_head current lida"><img src="../../i/side-pic6.png" class="side-pic">词汇</a>',
    // '</li>',
    //   '<li>',
    //    '<a href="##" id="side12"  class="list-group-item  side-border1 bold height45"><img src="../../i/side-pic7.png" class="side-pic">跟读</a>' ,
    // '</li>',
      '<li>',
      	'<a href="##" id="side14" class="list-group-item  menu_head1 side-border1 bold height45"><img src="../../i/side-pic9.png" class="side-pic">综合填空</a>',
      '</li>',
      '<li>',
      	'<a href="#" id="side1_1" class="list-group-item side-border1 bold menu_head current lida side height45"><img src="../../i/side-pic12.png" class="side-pic">TPO阅读</a>',
    	'</li>',
      '<li>',
      '<a href="#" id="side100" class="list-group-item side-border1 bold menu_head current lida side height45"><img src="../../i/side-pic12.png" class="side-pic">TPO阅读题型</a>',
      '</li>',
    	'<li>',
      	'<a href="#" id="side2_2" class="list-group-item side-border2 bold menu_head current lida side height45"><img src="../../i/side-pic13.png" class="side-pic">TPO听力</a>',
    	'</li>',
    	'<li>',
      	'<a href="#" id="side33_1" class="list-group-item side-border1 bold menu_head lida"><img src="../../i/side-pic14.png" class="side-pic">独立口语</a>',
/*      	'<div id="speak_menu_div" style="display:none;">',
          '<ul>',
              '<li class="lida2 side-li" style="display: none;"><a id="side33_1" href="javaScript:;" class="list-group-item side-border1 bold  subsidebar lida3 height45 sidebarLight"><img src="../../i/side-pic21.png" class="side-pic" />机经预测</a></li>',
          '</ul>',
      	'</div>',*/
    	'</li>',
    	'<li>',
      	'<a href="#" id="side3_3" class="list-group-item side-border2 bold menu_head current lida side height45"><img src="../../i/side-pic30.png" class="side-pic">综合口语</a>',
      '</li>',
    	'<li>',
     		'<a href="#" id="side661" class="list-group-item side-border1 bold menu_head current lida side height45"><img src="../../i/side-pic15.png" class="side-pic">独立写作</a>',
/*      	'<div id="jj_write_menu_div" style="display:none;">',
          '<ul>',
          	'<li class="lida2 side-li" style="display:none;"><a id="side661" href="javaScript:;" class="list-group-item side-border1 bold  subsidebar lida3 height45 sidebarLight"><img src="../../i/side-pic21.png" class="side-pic" />机经预测</a></li>',
          '</ul>',
      	'</div>',*/
    	'</li>',
    	'<li>',
    		'<a href="#" id="side77" class="list-group-item side-border2 bold menu_head current lida side height45"><img src="../../i/side-pic31.png" class="side-pic">综合写作</a>',
    	'</li>',
      '<li style="display: none;">',
       '<a href="##" id="side13" class="list-group-item  side-border2 bold height45"><img src="../../i/side-pic8.png" class="side-pic">复述</a>',
    	'</li>',
    '<li style="display: none;">',
     '<a href="##" id="side12"  class="list-group-item  side-border1 bold height45"><img src="../../i/side-pic7.png" class="side-pic">跟读</a>' ,
    '</li>',
      '<li>',
      '<a href="##" id="ex_fanyi" class="list-group-item  menu_head1 side-border1 bold height45"><img src="../../i/side-pic9.png" class="side-pic">句子翻译</a>',
      '</li>',
      '<li>',
      '<a href="##" id="ex_spoken" class="list-group-item  menu_head1 side-border1 bold height45"><img src="../../i/side-pic9.png" class="side-pic">口语练习</a>',
      '</li>',
   '</ul>',
   '</div>', 
  '</div>',
   '{{/if}}'
  ].join('')
})

/*'use strict'

define(function(){
  return [
    '{{if data}}',
   '<div class="sidebar">',
   '<div class="list-group menu_list hearlist-group" id="firstpane">',
   '<ul class="sidebar-ul ">',
   // '{{each data as value index}}',
   //  '<li>',
   //    '<a href="#" id="{{value.id}}" class="bold menu_head current lida">{{value.content}}<hr class="hr6 mleft25"></a>',
   //  '</li>',
   // '{{/each}}',
   // '<li>',
   //     '<a id="side5" href="##" class=" bold menu_head lida">写作批改</a>',
   //       '<div id="wirte_menu_div">',
   //       '<hr class="hr6" style="margin-bottom: 0px;">',
   //       '<ul>',
   //         '<li class="lida2">',
   //          '<a id="side6" href="##"  class=" bold  subsidebar lida3">写作机经</a>',
   //         '</li>',
   //         '<li class="lida2">',
   //           '<a id="side7" href="##"  class=" bold subsidebar lida3">历年真题</a>',
   //         '</li>',
   //       '</ul>',
   //       '</div>',
   //       '<hr class="hr6" /></a>',
   // '</li>',
   '<li>',
      '<a href="#" id="side1" class="bold menu_head current lida">练习历史<hr class="hr6 mleft25"></a>',
    '</li>',
    '<li>',
      '<a href="#" id="side2" class="bold menu_head current lida">语法<hr class="hr6 mleft25"></a>',
    '</li>',
    '<li>',
      '<a href="#" id="side3" class="bold menu_head current lida">听写<hr class="hr6 mleft25"></a>',
    '</li>',
   '<li>',
    '<a id="side9" href="##" class=" bold menu_head lida">音义互辨<hr class="hr6 mleft25"></a></a>',
     '<div id="listen_menu_div" style="display:none;">',
      '<hr class="hr6" style="margin-bottom: 0px;">',
      '<ul>',
       '<li class="lida2 sidebarLight"><a id="side10" href="##" class=" bold  subsidebar lida3">练词</a></li>',
       '<li class="lida2"><a id="side11" href="##" class=" bold subsidebar lida3">练句</li>',
      '</ul>',
     '</div>',
   '</li>',
   '<li>',
      '<a href="#" id="side4" class="bold menu_head current lida">记忆复写<hr class="hr6 mleft25"></a>',
    '</li>',
    '<li>',
      '<a href="#" id="side8" class="bold menu_head current lida">词汇</a>',
    '</li>',
   '</ul>',
   '</div>', 
  '</div>',
   '{{/if}}'
  ].join('')
})*/
