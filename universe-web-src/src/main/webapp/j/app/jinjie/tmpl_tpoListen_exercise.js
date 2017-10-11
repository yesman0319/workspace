'use strict';

define(function(){
    return [

        //   '<div class="right-part2">',

        //   '{{if data.artical}}',
        //    '<div class="tpo-right-part1">',
        //      '<p class="p3 gray">',
        //        // '<span><a class="bold bread-gray tpoListenUnit pointer">正在练习</a><span class="sign1 bread-gray">&nbsp;</span></span>',
        //        '<span><a class="bold bread-gray tpoListenUnit pointer">TPO听力</a><span class="sign1 bread-gray">></span></span>',
        //        // '<span><a class="bold bread-gray tpoListenUnit pointer">{{data.tpoNum}}</a></span><span class="sign1 bread-gray">></span>',
        //        '<span><a class="bold tpo-passage">{{data.tpoNum}} - {{data.artical.sectionType}} {{data.artical.sequence_number}}</a></span>',
        //        '<span class="unit"><a class="pointer tpoListenUnit">TPO听力列表</a></span>',
        //      '</p>',
        //      '<hr class="mleft25" />',
        //      '<p class="mleft25 bold font13">{{data.artical.sectionType}} {{data.artical.sequence_number}}</p>',
        //      // '{{each data.artical.p_en as value index}}',
        //        '<audio src="{{data.artical.audio}}" id="audioQuestion" controls="controls" style="width: 684px; height: 50px; margin-left:25px;"></audio>',
        //      // '{{/each}}',
        //    '</div>',


        //    '<div class="tpo-right-part2" id="tpo-right-part2">',

        //    '</div>',


        //     '<div class="tpo-right-part3">',

        //     '</div>',
        //    '{{/if}}',

        // '</div> '
        '<div class="right-part2 right-partTPO">',
        '{{if data.artical}}',
    /**面包屑部分**/
        '<p class="Ntpo_title Ntpo_border" id="tpoListenPart1">',
        '  <span><img src="../../i/list-pic.png" class="list-pic" style="margin-left:15px;margin-right:-10px;"><span class="bread-gray gray808 jinJieUnit pointer mleft25">{{data.xm_title}}</span></span>',
       // '  <span class="black23 ">{{data.tpoNum}} <span class="sign1 bread-gray">&gt;</span> {{data.artical.sectionType}} {{data.artical.sequence_number}}</span>',
        '</p>',

    /**题目部分**/
        '<div class="Ntpo_left Ntpo_border mright20 tpoPart2" id="tpoListenPart2"></div>',

    /**翻译部分**/
        '<div class="Ntpo_right Ntpo_border" id="tpoListenPart3">',
        '<div class="N_font_b text-right mright25 mbot15 N_c_p">',
        '<span class="N_tpoicon N_ticon_hidden" style="cursor: auto;"></span>',
        '<a class="all-blue font14" id="seeFanyiListen">查看原文</a>',
        '</div>',
        '<audio src="{{data.artical.audio}}" id="audioQuestion" controls="controls" style="width:466px; height:30px; margin-left:25px;"></audio>',
        '<img src="{{data.artical.picture}}" id="listenImg" style="width:310px; margin-left:103px; margin-top: 15px; height:220px;"/>',
        //两个人对话
        '<div id="listenDialog" style="display: none;">',
        '{{if data.artical.listenTrans}}',
        '<div class="N_tpo_points">',
        //'{{each data.artical.listenTrans as value index}}',
        //'<p class="" style="padding:0 20px;">{{value}}</p>',
        //'{{/each}}',
        '<p class="" style="padding:0 20px;">{{data.artical.listenTrans}}</p>',
        '</div>',
        '{{else}}',
        '<div style="margin-top: 15px;height: 488px;overflow-x: hidden;">',
        '{{each data.artical.p_a as value index}}',
        '<div class="tpo-dialog mtop25">',
        '<div class="tpo-points-p1 pleft15">',
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
        '</div>',
        '{{/if}}',
        '</div>',
        // '<div class="N_font_b text-right mright25 mbot15 N_c_p">',
        //    '<span class="N_tpoicon N_ticon_hidden" style="cursor: auto;"></span>',
        //    '<a class="all-blue font14" id="seeFanyi">查看翻译</a>',
        // '</div>',
        // '<div class="Ntpo_right_p font14">',
        //    '{{each data.artical.p_en as value index}}',
        //     '<p>{{value}}</p>',
        //     '{{each data.artical.p_ch as val ind}}',
        //       '{{if index == ind}}',
        //         '<p class="N_c_fy fanyi" style="display: none;">{{val}}</p>',
        //       '{{/if}}',
        //     '{{/each}}',
        //    '{{/each}}',
        // '</div>',
        '</div>',

        '{{/if}}',
        '</div> '
    ].join('')
})
