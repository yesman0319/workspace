/**
 * Created by lcmjob on 2015/5/18.
 */

$(function(){

    $('.any-out .any-div').hover(function(){
        $(this).children('.box1').css("display","block");
        $(this).children('.box1').stop(true,true).delay(100).animate({'right':0,opacity:0.8},300);
    },function(){
        $(this).children('.box1').stop(true,true).animate({'right':-142,opacity:0},200);
    })
    $('.any-out .any-div1').hover(function(){
        $(this).children('.box2').css("display","block");
        $(this).children('.box2').stop(true,true).delay(100).animate({'right':0,opacity:0.8},300);
    },function(){
        $(this).children('.box2').stop(true,true).animate({'right':-142,opacity:0},200);
    })
})