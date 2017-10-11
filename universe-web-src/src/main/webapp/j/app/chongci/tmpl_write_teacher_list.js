'use strict';
/**
 * 写作批改-详细结果页-选择老师-老师列表翻页
 */
define(function(){
    return [
        '{{each data.teachers as teacher}}',
        '<table class="inf_list mleft25">',
        '  <tr>',
        '    <th class="img_linew teacher_info " teacherid="{{teacher.teacherId}}"><img  class="img_liimg" src="{{teacher.avatar}}" ><p class="font14 black mtop5" style="margin-bottom:0px;">{{teacher.nickName}}</p></th>',
        '    <th class="">',
        '        <div class="date_t" style="height:22px;line-height:21px;">',
        '            <span class="mright20" style="float:left;">批改数量：<span>{{teacher.correctTotal}}</span></span>',
        '            <span>',
        '               <span class="black3" style="float:left;">综合评价：</span>',
        '               <span class="" style="float:left;">',
        '                  <span class="commstar_pg commstar1" style="line-height: 22px;"><span class="commstar_pg commstar2 {{teacher.starClass}}"></span></span>',
        '               </span>',
        '            </span>',
        '        </div>',
        '        <div class="date_ts">',
        '            <span class="mright20">{{teacher.type==1 ?"口语老师":"写作老师"}}</span>手机号：<span >{{teacher.phone}}</span>',
        '        </div>',
        '        <div class="font_lidiv"><span class="width25">{{teacher.comment}}</span></div>',
        '    </th>',
        '    <th><div questionId="{{data.id}}" answerId="{{data.answer_id}}" teacherId="{{teacher.teacherId}}" class="radio_teacher type-radionew type-radi02 pointer"></div></th>',
        '  </tr>',
        '</table>',
        '{{/each}}'
    ].join('');
});