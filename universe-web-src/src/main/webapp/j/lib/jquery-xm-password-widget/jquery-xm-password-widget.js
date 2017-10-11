/**
 * Created by MR_HE on 2015/9/18.
 */
$(function ($){
    $.fn.xm_pay_password_widget=function (options){
        var opts= $.extend({},$.fn.xm_pay_password_widget.defaults,options);

        var showBoxShadow = function ($this,param){
            var num= $this.find("#payPassword_rsainput").val().length;
            $this.find(".sixDigitPassword i").each(function (index,item){
                if(num==index){
                    $(item).addClass("active");
                    $this.find(".box_shadow").css({"left":(index*30)+"px","visibility":"visible"});
                    $(item).find("b").css("visibility","hidden");
                }else{
                    if(index<num){
                        $(item).find("b").css("visibility","visible");
                    }else{
                        $(item).find("b").css("visibility","hidden");
                    }
                    $(item).removeClass("active");
                    if(num==6 && index==5){
                        $this.find(".box_shadow").css({"left":(index*30)+"px","visibility":"visible"});
                    }
                }
            })
            if(param=="hide"){
                $this.find(".box_shadow").css({"visibility":"hidden"});
            }
        }

        var _genrateHtml = function (){
            var htmlArray=[
                '<span class="alieditContainer" id="payPassword_container">',
                '<input type="password" tabindex="1" id="payPassword_rsainput" name="payPassword_rsainput" class="ui-input i-text sixDigitPassword" oncontextmenu="return false" onpaste="return false" oncopy="return false" oncut="return false" autocomplete="off" value="" maxlength="6" minlength="6" style="outline: none; position:absolute;margin-left: -9999px;">',
                '<div class="sixDigitPassword content-box" tabindex="0" style="width: 181px;">',
                '<i class="content-box" id="test1" style="width: 29px; border-color: transparent;"><b style="visibility: hidden;"></b></i>',
                '<i style="width: 29px;" class="content-box"><b style="visibility: hidden;"></b></i>',
                '<i style="width: 29px;" class="content-box"><b style="visibility: hidden;"></b></i>',
                '<i style="width: 29px;" class="content-box"><b style="visibility: hidden;"></b></i>',
                '<i style="width: 29px;" class="content-box"><b style="visibility: hidden;"></b></i>',
                '<i style="width: 29px;" class="content-box"><b style="visibility: hidden;"></b></i>',
                '<span class="box_shadow content-box" style="width: 29px; visibility: hidden; left: 0px;"></span>',
                '</div>',
                '</span>'];
            return htmlArray.join("");
        }
        /**
         * 绑定事件
         * @private
         */
        var _bindEvents = function ($this){
            $this.find(".sixDigitPassword").on("focus",function (){
                $this.find("#payPassword_rsainput").get(0).focus();
            });
            $this.find(".sixDigitPassword").on("blur",function (){
                $this.find(".sixDigitPassword i").each(function (index,item){
                    $(item).removeClass("active");
                });
                showBoxShadow($this,"hide");
            });
            $this.find(".sixDigitPassword i").on("click",function (){
                $(this).addClass("active");
                showBoxShadow($this);
            });
            $this.find("#payPassword_rsainput").on("keyup input paste",function (){
                showBoxShadow($this);
                $this.find(".sixDigitPassword").get(0).focus();
            });
        }
        return this.each(function (index,item){
            var $this=$(item);
            $this.html(_genrateHtml());
            _bindEvents($this);
        });
    }
});