'use strict'

define(function(){
    return [
            '{{each data.teacherList as teacher}}',
                //'<ul class="inf_list mleft25">',
                //    '<li class="img_li"><img  class="img_liimg" src="{{teacher.avatar}}"></li>',
                //    '<li class="font_li" style="padding: 5px;">',
                //    ' <div class="date_t"> <span class="font14 black mright20">{{teacher.nickName}}</span>  <span class="mright20">{{teacher.type==1 ?"口语":"写作"}}</span>手机号:<span >{{teacher.phone}}</span> </div>',
                //    '<div class="font_lidiv"><span class="width25">{{teacher.comment}}</span></div>',
                //    '</li>',
                //    '<li class="font_li"><div data-answerId="{{data.answer_id}}" data-teacherId="{{teacher.teacherId}}" class="dis_in type-radio type-radi02 robRadio pointer jjspeak_teacherRadio"></div></li>',
                //    ' <li style="clear: both;"></li>',
                //'</ul>',


        '                       <table class="inf_list mleft25">',
        '                            <tr>',
        '                              <th class="img_linew teacher_info " teacherid="{{teacher.teacherId}}"><img  class="img_liimg" src="{{teacher.avatar || \'http://newbbs.b0.upaiyun.com/avater/avater.png\'}}" ><p class="font14 black mtop5" style="margin-bottom:0px;">{{teacher.nickName}}</p></th>',
        '                              <th class="">',
        '                                  <div class="date_t" style="height:22px;line-height:21px;">',
        '                                      <span class="mright20" style="float:left;">批改数量：<span>{{teacher.correctTotal}}</span></span>',
        '                                      <span>',
        '                                         <span class="black3" style="float:left;">综合评价：</span>',
        '                                         <span class="" style="float:left;">',
        '                                            <span class="commstar_pg commstar1" style="line-height: 22px;"><span class="commstar_pg commstar2 {{data.parseClass(teacher.scoreFinal)}}"></span></span>',
        '                                         </span>',
        '                                      </span>',
        '                                  </div>',
        '                                  <div class="date_ts">',
        '                                      <span class="mright20">北京国贸</span><span class="mright20">{{teacher.type==1 ?"口语":"写作"}}</span>手机号：<span >{{teacher.phone}}</span>',
        '                                  </div>',
        '                                  <div class="font_lidiv"><span class="width25">{{teacher.comment}}</span></div>',
        '                              </th>',
        '                              <th><div data-questionId="{{data.id}}" data-answerId="{{data.answer_id}}" data-teacherId="{{teacher.teacherId}}" class="radio_teacher type-radionew type-radi02 pointer jjspeak_teacherRadio"></div></th>',
        '                            </tr>',
        '                          </table>',
            '{{/each}}',
    ].join('')
})
