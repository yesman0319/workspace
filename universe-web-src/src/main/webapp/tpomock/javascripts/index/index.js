// 导航
$(document).on('mouseover', '#learnNav', function() {
    var localTmp = window.location.href;
    if (localTmp.indexOf('exercise') != -1) {
        $('#jiChuNav').addClass('secondActive')
    } else if (localTmp.indexOf('jinJie') != -1) {
        $('#jinJieNav').addClass('secondActive')
    } else if (localTmp.indexOf('chongCi') != -1) { //冲刺
        $('#chongCiNav').addClass('secondActive')
    }
    $("#secondNav").slideDown("fast")
})
$(document).on('mouseout', 'body', function(e) {
    e = window.event || e; // 兼容IE7
    var obj = $(e.srcElement || e.target);
    if (!$(obj).is("#learnLi,#learnNav,#secondNav,.secondLi")) {
        $('#secondNav').hide();
    }
});
$(document).on('mouseover', 'body', function(e) {
    e = window.event || e; // 兼容IE7
    var obj = $(e.srcElement || e.target);
    if ($(obj).is("#divName, #divName *")) {
        $("#exitNav").css("display", "block");
        $("#profile").css("display", "block");
    } else {
        $("#exitNav").css("display", "none");
        $("#profile").css("display", "none");
    }
});



// 模考
var mockURL,
    mockType = "reading",
    tpoID = $("#firstId").attr("data-tpoid");
    tpotao = $("#firstId").text();
    $(".mock-chapt").text("TPO " + tpotao);
$(".mock-type .mock-box a").click(function() {
    $(".mock-type .mock-box a").removeClass("on");
    $(this).addClass("on");
    mockType = $(this).attr("data-type");
    $(".mock-section").text($(this).text());
});
$(".mock-topic .mock-box a").click(function() {
    $(".mock-topic .mock-box a").removeClass("on");
    $(this).addClass("on");
    tpoID = $(this).attr("data-tpoid");
    tpotao = $(this).text();
    $(".mock-chapt").text("TPO " + tpotao);
});

$(".JS_startMock").click(function(){
	var flag=false;
   $.ajax({
	   type:"GET",
	   url:"/tpomock/html/checkLogin",
	   async:false,
       dataType: "json",
       success:function(data){
    	  flag=data;
       },
       error:function(XMLHttpRequest, textStatus, errorThrown){
    	   $(".mask-bg").show();
           $(".m-pop-login").show();
        }
   })
   if(flag==true){
       mockURL = mockType + ".html?tpoId=" + tpoID+"&seqNum="+tpotao;
       $(this).attr("href", mockURL);
       $(".m-pop-login").hide();
       $(".mask-bg").hide();
   } else {
       $(".mask-bg").show();
       $(".m-pop-login").show();
   }
});
$(".JS_pop_mock").click(function() {
    mockURL = mockType + ".html?tpoId=" + tpoID+"&seqNum="+tpotao;
    $(this).attr("href", mockURL);
    $(".m-pop-login").hide();
    $(".mask-bg").hide();
});

// 关闭弹窗
$(".JS_pop_close").click(function() {
    $(".m-pop-login").hide();
    $(".mask-bg").hide();
});

$(".JS_pop_login").click(function(){
	window.location.href="/login";
});
// 获取窗口尺寸，返回数组
function getWindowSize() {
    var size = null,
        sizeArr = new Array();
    if(!Array.prototype.map){
        Array.prototype.map = function(fn,scope) {
            var result = [],ri = 0;
            for (var i = 0,n = this.length; i < n; i++){
                if(i in this){
                    result[ri++]  = fn.call(scope ,this[i],i,this);
                }
            }
            return result;
        };
    }
    var size = ["Width","Height"].map(function(name){
        return window["inner"+name] || document.compatMode === "CSS1Compat" && document.documentElement[ "client" + name ] || document.body[ "client" + name ]
    });
    return sizeArr = size.toString().split(",");
}

window.onload = function() {
    if(!+"\v1" && !document.querySelector) { // for IE6 IE7
        document.body.onresize = resize;
    } else {
        window.onresize = resize;
    }
    function resize() {
        winSize();
        return false;
    }
}

function winSize() {
    var wdSize,
        htSize,
        sizeArr = getWindowSize(),
        topHeight = $(".i_nav").height(),
        btmHeight = $(".foot").height();
    wdSize = sizeArr[0],
    htSize = sizeArr[1] - topHeight - btmHeight - 74;
    $(".m-mock").height(htSize);
}
winSize();
