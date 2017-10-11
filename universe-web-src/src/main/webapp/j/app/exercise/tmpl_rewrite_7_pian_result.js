
'use strict';

define(function(){
  return [
      '<div class="right-part1">',
//    '    <p class="p1 bold black mleft25"><img src="../../i/list-pic.png" style="margin-left:23px;margin-right:10px;"><span>第{{data.index+1}}篇结果</span></p>',
 			'<p class="p1 bold black mleft25"><img src="../../i/list-pic.png" style="margin-left:   -6px;margin-right:10px;"><span>练习报告</span><span class="unit"><a id="selectUnit" href="#" ></a></span></p>',
 			'    <hr class="mleft25"><!--{{data.subject}}-->',
      '    <div class="family-song">',
      '        <div style="text-align: center;">',
      '            <img src="{{data.imgBigUrl}}" alt="" />',
      '            <div class="i25">',
      '                <p class="font12" style="margin:5px 0;"><img style="margin-left: -2px;" src="{{data.imgflagUrl}}" alt="" /></p>',
      '                <span class="font12 re_orange">{{data.isBest?"最好成绩：":"本次练习："}}</span>',
      '                <span class="font12 re_orange  mright10">正确率：{{data.score}}%</span>',
      '                <span class="font12 marginTop re_orange mright10">平均速度：{{data.spend_time}}/题</span>',
      '            </div>',
      '        </div>',
      '        <div class="partmid">',
      '            <div class="part-left">',
      '                <label class="con-one">范文</label>',
      '                <div class="con-two">',
      '                    {{each data.en as value index}}',
      '                    <p class="pright20" style="font-size:14px;">{{#value}}',
      '                    </p>',
      '                    {{/each}}',
      '                </div>',
      '            </div>',
      '            <div class="part-right">',
      '                <label class="con-one">我的复写</label>',
      '                <div class="con-two">',
      '                    {{each data.allUserContent as value index}}',
      '                    <p class="pright20">{{value}}</p>',
      '                    {{/each}}',
      '                </div>',
      '            </div>',
      '',
      '        </div>',
      '        <div class="two-button deleteclear">',
      '            <button id="btnAgainRewrite" type="button" class="btn btn-primary btn2">再来一遍</button>',
      //'            <button id="btnNextRewrite" type="button" class="btn btn-primary btn1" {{if data.isLockNextGroup}}disabled{{/if}}>下一篇</button>',
      '{{if !data.isFromPlan}}',
      '<button type="button" class="btn btn-primary btn1" id="showMorePlan">完成</button>',
      '{{/if}}',
      '        </div>',
      '    </div>',
      '</div>'


    // 券
   // '<div id="quanDiv" class="black_content display mid">',
   //  '<div class="coupon-box" style="">',
   //  '<button  title="关闭" id="closeQuan"></button>',
   //      '<p class="font-black center font20 padtop50  m-left25" >恭喜你获得</p>',
   //      '<span><img src="../../i/num40.png" class="left111"  ></span>',
   //      '<p class="font-black center font20 m-left25 padtop22" >小马托福<span>1</span>张</p>',
   //      '<p class="center white m-left25 padtop18 font14"  >请到<a href="#" class="white font14" >我的优惠</a>里面查看</p>',
   //  '</div>',
   //  '</div>'
  ].join('')
})