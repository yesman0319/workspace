/**
 * Created by MR_HE on 2015/9/21.
 */
'use strict';

define(['common/render','app/baseURL', 'baseCookie', 'app/baseFinal','lib/jquery-xm-password-widget/jquery-xm-password-widget'], function (Render, URL, BaseCookie, Final) {
    var _conf,
        $wrap,
        TMPL = {

        };
    var token,
        tokenTmp = "xiaoma",
        orderNum,
        callback,
        paymentAmount=0;


    var init = function(conf,fn) {
        _conf = $.extend({
            wrap: ''
        }, conf || {})
        $wrap = $(_conf.wrap)
        BaseCookie.get()
        token = BaseCookie.getToken();
        if (isEmpty(token)) {
            token = tokenTmp
        }
        orderNum=_conf.orderNumber;
        paymentAmount=_conf.useWalletPayAmount || 0;
        callback=fn;
        //如果组件已经渲染，则不执行初始化操作
        if($("#useWalletPayModel_widget").length<=0 && orderNum){
            renderModalToBody();
            renderPasswordWidget();
            bindEvent();
        }
        //$("#useWalletPayModel_widget").modal("show");
        showUserWalletPay();
    }
    var isEmpty = function(param) {
        if (null == param || "" == param || tokenTmp == param) {
            return true
        } else {
            return false
        }
    }
    var renderPasswordWidget=function (){
        var timerId=window.setInterval(function (){
            console.log("...........");
            if( $("#useWalletPayModel_widget .password_widget_p").xm_pay_password_widget){
                $("#useWalletPayModel_widget .password_widget_p").xm_pay_password_widget();
                window.clearInterval(timerId);
            }
        },10);
    }
    //渲染钱包支付组件
    var renderModalToBody = function (){
            var htmlArray=[
                //'<div class="modal" id="useWalletPayModel_widget" tabindex="-1" role="dialog" style="display: none;">',
                //'    <div class="modal-dialog">',
                //'       <div class="modal-content tipmodelcontent" style="width: 361px;height: 261px;text-align: center;"  >',
                //'           <div class="modal-body">',
                //'               <p>支付金额:<span id="useWalletPayAmountTip">'+paymentAmount+'</span></p>',
                //'              <hr style="width:325px;border:1px dashed #dcdcdc">',
                //'               <p >请输入6位支付密码</p>',
                //'                   <p class="password_widget_p" style="display: inline-block;" ></p>',
                //'                  <p id="passwordTip" style="display: inline-block;" ></p>',
                //'           </div>',
                //'           <div class="text-center">',
                //'           <button type="button" class="btn btn-warning btn-sm " id="useWalletPaySure">确认</button>',
                //'           <button type="button" data-dismiss="modal" class="btn btn-primary btn-sm  btn1" id="useWalletPayCancel">取消</button>',
                //'           </div>',
                //'       </div>',
                //'    </div>',
                //'</div>'
                '<div class="modal fade in" id="useWalletPayModel_widget" tabindex="-1" role="dialog" style="display: none;">',
                '    <div class="modal-dialog" style="width:361px;">',
                '       <div class="modal-content tipmodelcontent" style="width: 361px;height: 250px;text-align: center;"  >',
                '           <div class="modal-body">',
                '               <p class="font14 bold">支付金额:<span id="useWalletPayAmountTip">'+paymentAmount+'</span></p>',
                '              <hr style="width:325px;border:1px dashed #dcdcdc">',
                '               <p class="font12">请输入6位支付密码</p>',
                '                   <p class="password_widget_p" style="display: inline-block;" ></p>',
                '                  <p class="remind_red font12" id="passwordTip"  ></p>',
                '           </div>',
                '           <div class="M_btn_pos">',
                '           <button type="button" class="M_btn_size  M_pay_b " id="useWalletPaySure">确认</button>',
                '           <button type="button" data-dismiss="modal" class="mleft10 M_btn_size  M_pay_g" id="useWalletPayCancel">取消</button>',
                '           </div>',
                '       </div>',
                '    </div>',
                '</div>'

            ]
           $("body").append(htmlArray.join(" "));
    }

    //绑定事件
    var bindEvent = function (){
        $(document).on("click","#useWalletPayModel_widget #useWalletPaySure",useWalletPaySure)
    }
    //钱包支付请求
    var userWalletPay = function (orderNum,password,callbackfn){
        var that = this;
        $.ajax( {
            url: URL.URL + 'web/useWallet.action',
            type: 'post',
            data: {
                token: token,
                password: password,
                orderNum:orderNum
            },
            success: function (response) {
                resetPassword();
                $("#useWalletPayModel_widget #useWalletPaySure").removeAttr("disabled");
                callbackfn(response);
            }
        });
        //this.fetch(param);
    }
    //显示钱包支付面板
    var showUserWalletPay = function (){
        $("#useWalletPayModel_widget").modal({
            backdrop: 'static',
            keyboard:false
        });
    }

    var resetPassword = function (){
        $("#useWalletPayModel_widget .password_widget_p").find("input").val("");
        $("#useWalletPayModel_widget .password_widget_p").find("input").trigger("keyup");
        $("#useWalletPayModel_widget #passwordTip").html("");
    }
    //触发钱包支付接口
    var useWalletPaySure = function(){
        var password=$.md5($("#useWalletPayModel_widget .password_widget_p").find("input").val());
        $("#useWalletPayModel_widget #useWalletPaySure").attr("disabled","disabled");
        window.setTimeout(function (){
            $("#useWalletPayModel_widget #useWalletPaySure").removeAttr("disabled");
        },3000);
        userWalletPay(orderNum,password,function (response){
            //callback(response);
            if(response.status==0 || response.status==3){
                $('#useWalletPayModel_widget').on('hidden.bs.modal', function (e) {
                    window.setTimeout(function (){
                        callback(response);
                    },600);
                });
                $("#useWalletPayModel_widget").modal('hide');
            }else {
                $("#useWalletPayModel_widget #passwordTip").html(response.message);
            }
        });
    }
    return {init:init};
});