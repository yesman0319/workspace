'use strict'

define(['jquery', 'app/login/login', 'common/render', '../../../j/app/baseURL', 'lib/store'], function($, Login, Render, URL) {
  var $wrap = $('#loginDiv');
  var initEvent = function() {
    $(document).on('click', '#homeNav', function() {
      navClick("homeNav")
    })
    $(document).on('click', '#exeNav', function() {
      navClick("exeNav")
    })
    $(document).on('click', '#jinJieNav', function() {
      navClick("jinJieNav")
    })
    $(document).on('click', '#chongCiNav', function() {
      navClick("chongCiNav")
    })
    $(document).on('click', '#jjNav', function() {
      navClick("jjNav")
    })
    $(document).on('click', '#scoreNav', function() {
      navClick("scoreNav")
    })
    $(document).on('click', '#msgNav', function() {
      navClick("msgNav")
    })
    $(document).on('click', '#logoNav', function() {
      navClick("homeNav")
    })
    $(document).on('click', '#baofenNav', function() {
        navClick("baofenNav")
      })
      // $(document).on('click', '#loginNav', function() {
      //   $('#dialogLogin').modal({
      //     backdrop: 'static'
      //   })
      // })

    // $(document).on('click', '#registerNav', function() {
    //   $('#dialogLogin').modal({
    //     backdrop: 'static'
    //   })
    //   Render.render({
    //     wrap: $wrap,
    //     tmpl: {
    //       tmplName: 'app/login/tmpl_registPhone',
    //       tmplData: ''
    //     }
    //   });
    // })

    $('#dialogLogin').on('show.bs.modal', function(e) {
      Render.render({
        wrap: $wrap,
        tmpl: {
          tmplName: './../../../../j/app/login/tmpl_login',
          tmplData: ''
        },
        afterRender: function() {
          Login.initValiForm();
        }
      });
    });

    // $('#dialogLogin').on('hidden.bs.modal', function(e) {
    //   BaseCookie.get()
    //   if (BaseCookie.getToken()) {
    //     tokenTmp = BaseCookie.getToken()
    //     user_id = BaseCookie.getId();
    //     reloadQuestions();
    //     //callback_submit()
    //   }
    // })

    // $('#dialogLogin').on('hidden.bs.modal', function(e) {
    //   BaseCookie.get()
    //   if (BaseCookie.getToken()) {
    //     tokenTmp = BaseCookie.getToken()
    //     user_id = BaseCookie.getId();
    //     reloadQuestions();
    //     //callback_submit()
    //   }
    // })

    $(document).on('click', '#loginHref', function() {
      Render.render({
        wrap: $wrap,
        tmpl: {
          tmplName: './../../../../j/app/login/tmpl_login',
          tmplData: ''
        },
        afterRender: function() {
          Login.initValiForm();
        }
      });
    });

    $(document).on('click', '#registPhoneHref', function() {
      Render.render({
        wrap: $wrap,
        tmpl: {
          tmplName: 'app/login/tmpl_registPhone',
          tmplData: ''
        },
        afterRender: function() {
          var fn = function() {
            $.get(URL.baseURL14 + "common/update_captcha", {}, function(result) {
              $("#codeImg_div").html(result);
              $("#codeImg_div img").attr("title", "看不清楚？点击切换验证码").css("cursor", "pointer").css({
                height: "45px",
                width: "156px"
              }).on("click", function() {
                fn();
              });
            });
          }
          fn();

          Login.initValiForm();
        }
      });
    });

    $(document).on('click', '#registEmailHref', function() {
      Render.render({
        wrap: $wrap,
        tmpl: {
          tmplName: 'app/login/tmpl_registEmail',
          tmplData: ''
        },
        afterRender: function() {
          Login.initValiForm();
        }
      });
    });
  }

  var navClick = function(param) {
    store.set("eleNav", param)
  }

  initEvent()
})