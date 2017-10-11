'use strict'

define(function(){
  return [
       '<div class="tpo-points-part3">', 
        '<div class="tpo-fun-round tpo-fun-round1 pointer" id="translate"><img src="../../i/tpo-pic2.png" class="tpo-pic-style pointer"><span class="tpo-span-style">文本</span></div>',
        // '{{if data.vip_user}}',
        '<div class="tpo-fun-round tpo-fun-round2 pointer" id="videos"><img src="../../i/tpo-pic3.png" class="tpo-pic-style pointer"><span class="tpo-span-style">视频</span></div>',
        // '{{/if}}',
        '<div class="tpo-fun-round tpo-fun-round3 pointer" id="jiexi"><img src="../../i/tpo-pic4.png" class="tpo-pic-style pointer"><span class="tpo-span-style">解析</span></div>',
       '</div>',
       '<div class="tpo-points tpo-points-left-style1" id="translateTip" style="clear:both; display: none;">',
       '{{each data.artical.p_ch as value index}}',
        '<p class="tpo-points-p" style="padding:0 20px;">{{value}}</p>',
       '{{/each}}',
       '</div>',

       // '{{if data.vip_user}}',
       '<div class="tpo-points tpo-points-left-style2" id="videosTip" style="clear:both; display: none;">',
        '<div class="tpo-round-inc">',
        '{{if data.question.audio.length < 10}}',
        '{{each data.question.audio as value index}}',
          '<div class="tpo-fun-round tpo-fun-round-video pointer audioPlay" data-source="{{value}}"><span class="tpo-span-style1" data-source="{{value}}">视频{{index+1}}</span></div>',
        '{{/each}}',
        '{{else}}',
          '<div class="tpo-fun-round tpo-fun-round-video pointer audioPlay" data-source="{{data.question.audio}}"><span class="tpo-span-style1" data-source="{{data.question.audio}}">视频1</span></div>',
        '{{/if}}',
        '</div>',
       '</div>',
       // '{{/if}}',
         
      '<div class="tpo-points tpo-points-left-style3" id="jiexiTip" style="clear:both; display: none;">',
        '<p class="tpo-points-p" style="padding:0 20px;">{{data.question.p}}</p>',
       '</div>',
       // '<div id="audioPlayModal" style="height: 400px;">',
       //   '<div id="audioPlayDiv" style="height: 400px;">',
         // '<!--<script src="http://p.bokecc.com/player?vid={{value}}&siteid=B86E9AC935D39444&autoStart=true&width=710&height=400&playerid=3B89CC3CB774B9A8&playertype=1" type="text/javascript"></script>-->',
       //   '</div>'
       // '</div>'

       // <!-- Modal -->
    '<div class="modal fade" id="audioPlayModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">',
            // '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>',
      '<div class="modal-dialog jinjievideo-style">',
            '<button type="button" class="close jinjievideo-close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>',
            '<div id="audioPlayDiv" style="height: 400px;">',
             '</div>',
      '</div>',
    '</div>'
  ].join('')
})
