'use strict'

define(function(){
  return [
   //   '<div class="right-part2">',

   //   '{{if data.artical}}',
   //    '<div class="tpo-right-part1">',
   //      '<p class="p3 gray">',
   //        // '<span><a class="bold bread-gray jinJieUnit pointer">正在练习</a><span class="sign1 bread-gray">&nbsp;</span></span>',
   //        '<span><a class="bold bread-gray jinJieUnit pointer">TPO阅读</a><span class="sign1 bread-gray">></span></span>',
   //        // '<span><a class="bold bread-gray jinJieUnit pointer">{{data.tpoNum}}</a></span><span class="sign1 bread-gray">></span>',
   //        '<span><a class="bold tpo-passage">{{data.tpoNum}} - Passage {{data.artical.sequence_number}}</a></span>',
   //        '<span class="unit"><a class="pointer jinJieUnit">TPO阅读列表</a></span>',
   //      '</p>',
   //      '<hr class="mleft25" />',
   //      '<p class="mleft25 bold font13">Passage {{data.artical.sequence_number}}</p>',
   //      '{{each data.artical.p_en as value index}}',
   //        '<p class="mleft25 tpo-right-part1-p">{{value}}</p>',
   //      '{{/each}}',
   //    '</div>',


   //    '<div class="tpo-right-part2" id="tpo-right-part2">',

   //    '</div>',


   //     '<div class="tpo-right-part3">',
       
   //     '</div>',
   //    '{{/if}}',

   // '</div> '
   // '<div class="tpo-right-part1">',
      //   // '<p class="p3 gray">',
      //   //   '<span><a class="bold bread-gray jinJieUnit pointer">TPO阅读</a><span class="sign1 bread-gray">></span></span>',
      //   //   '<span><a class="bold tpo-passage">{{data.tpoNum}} - Passage {{data.artical.sequence_number}}</a></span>',
      //   //   '<span class="unit"><a class="pointer jinJieUnit">TPO阅读列表</a></span>',
      //   // '</p>',
      //   '<hr class="mleft25" />',
      //   '<p class="mleft25 bold font13">Passage {{data.artical.sequence_number}}</p>',
      //   '{{each data.artical.p_en as value index}}',
      //     '<p class="mleft25 tpo-right-part1-p">{{value}}</p>',
      //   '{{/each}}',
      // '</div>',


      // '<div class="tpo-right-part2" id="tpo-right-part2">',

      // '</div>',


      //  '<div class="tpo-right-part3">',
       
      //  '</div>',
   
  '<div class="right-part2">',
    '{{if data.artical}}',
       /**面包屑部分**/
       '<p class="Ntpo_title Ntpo_border" id="tpoReadPart1">',
       '  <span><a class="bread-gray gray808 jinJieUnit pointer mleft25">TPO阅读</a><span class="sign1 bread-gray">&gt;</span></span>',
       '  <span class="black23 ">{{data.tpoNum}} <span class="sign1 bread-gray">&gt;</span> Passage {{data.artical.sequence_number}}</span>',
       '</p>',

       /**题目部分**/
       '<div class="Ntpo_left Ntpo_border mright10 tpoPart2" id="tpoReadPart2"></div>',

       /**翻译部分**/
       '<div class="Ntpo_right Ntpo_border" id="tpoReadPart3">',
          '<div class="N_font_b text-right mright25 mbot15 N_c_p">',
             '<span class="N_tpoicon N_ticon_hidden" style="cursor: auto;"></span>',
             '<a class="all-blue font14" id="seeFanyi">查看翻译</a>',
          '</div>',
          '<div class="Ntpo_right_p font14">',
             '{{each data.artical.p_en as value index}}',
              '<p>{{value}}</p>',
              '{{each data.artical.p_ch as val ind}}',
                '{{if index == ind}}',
                  '<p class="N_c_fy fanyi" style="display: none;">{{val}}</p>',
                '{{/if}}',
              '{{/each}}',
             '{{/each}}',
          '</div>',
       '</div>',
    '{{/if}}',
  '</div> '
  ].join('')
})
