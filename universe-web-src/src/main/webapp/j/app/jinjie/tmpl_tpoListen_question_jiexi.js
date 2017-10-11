'use strict'

define(function(){
  return [
       '<div class="tpo-points-part3">', 
        '<div class="tpo-fun-round tpo-fun-round1 pointer" id="translateTpoListen"><img src="../../i/tpo-pic2.png" class="tpo-pic-style pointer"><span class="tpo-span-style">文本</span></div>',
        // '{{if data.vip_user}}',
        '<div class="tpo-fun-round tpo-fun-round2 pointer" id="videosTpoListen"><img src="../../i/tpo-pic3.png" class="tpo-pic-style pointer"><span class="tpo-span-style">视频</span></div>',
        // '{{/if}}',
        '<div class="tpo-fun-round tpo-fun-round3 pointer" id="jiexiTpoListen"><img src="../../i/tpo-pic4.png" class="tpo-pic-style pointer"><span class="tpo-span-style">解析</span></div>',
       '</div>',
       '<div class="tpo-points tpo-points-left-style1" id="translateTip" style="clear:both; display: none;">',
       '{{if data.artical.listenTrans}}',
         '{{each data.artical.listenTrans as value index}}',
           '<p class="tpo-points-p" style="padding:0 20px;">{{value}}</p>',
         '{{/each}}',
       '{{else}}',
        //两个人对话
         '{{each data.artical.p_a as value index}}',
          '<div class="tpo-dialog">',
            '<div class="tpo-points-p1">',
              '<img src="../../i/tpo-pic7.png">',
              '<p>{{data.artical.sectionName_p_a}}</p>',
              '<span class="tpo-points-p-topic  tpo-topic1 fleft">{{value}}</span>',
            '</div>',
            '<div style="clear:both;"></div>',
            '{{if data.artical.p_b.length >= (index + 1)}}',
             '<div class="tpo-points-p2 right">',
              '<img src="../../i/tpo-pic8.png" class="right tpo-pic8">',
              '<span  class="right tpo-name">{{data.artical.sectionName_p_b}}</span>',
              '<div style="clear: both;"></div>',
              '<span class="tpo-points-p-topic tpo-topic2">{{data.artical.p_b[index]}}</span>',
            '</div>',
            '<div style="clear:both;"></div>',
            '{{/if}}',
          '</div>',
         '{{/each}}',
       '{{/if}}',
       '</div>',

       // '{{if data.vip_user}}',
       '<div class="tpo-points tpo-points-left-style2" id="videosTip" style="clear:both; display: none;">',
        '<div class="tpo-round-inc">',
        '{{if data.question.audio.length < 10}}',
        '{{each data.question.audio as value index}}',
          '<div class="tpo-fun-round tpo-fun-round-video pointer audioPlayTpoListen" data-source="{{value}}"><span class="tpo-span-style1" data-source="{{value}}">视频{{index+1}}</span></div>',
        '{{/each}}',
        '{{else}}',
          '<div class="tpo-fun-round tpo-fun-round-video pointer audioPlayTpoListen" data-source="{{data.question.audio}}"><span class="tpo-span-style1" data-source="{{data.question.audio}}">视频1</span></div>',
        '{{/if}}',
        '</div>',
       '</div>',
       // '{{/if}}',
         
      '<div class="tpo-points tpo-points-left-style3" id="jiexiTip" style="clear:both; display: none;">',
        '<p class="tpo-points-p" style="padding:0 20px;">{{data.question.p}}</p>',
       '</div>',
       // '<div id="audioPlayTpoListenModal" style="height: 400px;">',
       //   '<div id="audioPlayTpoListenDiv" style="height: 400px;">',
         // '<!--<script src="http://p.bokecc.com/player?vid={{value}}&siteid=B86E9AC935D39444&autoStart=true&width=710&height=400&playerid=3B89CC3CB774B9A8&playertype=1" type="text/javascript"></script>-->',
       //   '</div>'
       // '</div>'

       // <!-- Modal -->
    '<div class="modal fade" id="audioPlayTpoListenModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">',
            // '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>',
      '<div class="modal-dialog jinjievideo-style">',
            '<button type="button" class="close jinjievideo-close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>',
            '<div id="audioPlayTpoListenDiv" style="height: 400px;">',
             '</div>',
      '</div>',
    '</div>'
  ].join('')
})
