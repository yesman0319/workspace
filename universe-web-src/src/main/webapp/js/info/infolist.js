$(function(){
    if(!placeholderSupport()){   // 判断浏览器是否支持 placeholder
        $('[placeholder]').focus(function() {
            var input = $(this);
            if (input.val() == input.attr('placeholder')) {
                input.val('');
                input.removeClass('placeholder');
            }
        }).blur(function() {
            var input = $(this);
            if (input.val() == '' || input.val() == input.attr('placeholder')) {
                input.addClass('placeholder');
                input.val(input.attr('placeholder'));
            }
        }).blur();
    };
    var title="";
    if($("#cateId").val()!=""){
    	var curCateId=$("#cateId").val();
    	$(".sort_li").find("a").removeClass("cur")
    	$(".sort_li").each(function(){
    		if($(this).attr("category")==curCateId){
    			$(this).find("a").addClass("cur");
    			 cateVal = $(this).find("a").html();
    			title+=cateVal+" - "
    			$("#selectCategory").addClass("th_li");
    	    	$("#selectCategory").html(cateVal+"<a href='javascript:onclick:cateclose();' class='close'>&times;</a>");
    		}
    	})
    };
    if($("#label").val()!=""){
    	var curCateId=$("#label").val();
    	$(".label_li").find("a").removeClass("cur")
    	$(".label_li").each(function(){
    		if($(this).find("a").html()==curCateId){
    			$(this).find("a").addClass("cur");
    			labelVal = $(this).find("a").html();
    			title +=labelVal+" - "
    			$("#selectLabel").addClass("th_li");
    			$("#selectLabel").html(labelVal+"<a href='javascript:onclick:labelclose();' class='close'>&times;</a>");
    		}
    	})
    }
    $("#title").html(title+="精英计划")
    if($("#sort").val()!=""){
    	 var sort=$("#sort").val()
    	$(".showcolor").each(function(){
    		if($(this).attr("num")==sort){
    			$(this).addClass("active");
    		}
    	})
    }
})
var basePath=$("#basePath").val();
function placeholderSupport() {
    return 'placeholder' in document.createElement('input');
}

function search(){
	var value = $("#searchName").val();
	var cateId=$("#cateId").val();
	var label=$("#label").val();
	
	var sort=$("#sort").val();
	var islike=value==""?false:true;
	var url=basePath+"/docs/list?name="+value+"&label="+label+"&categoryId="+cateId+"&islike="+islike+"&sort="+sort
	location.href=url;
}

//是否显示更多
$(".search_td").each(function(index,value){
	if(parseFloat($(this).find("ul").css("height"))<=45){
	$(this).find(".more_btn").css("display","none");
	}
	
})

//点击更多
$(".more_btn").click(function(){
	if($(this).attr("data-click")=="false"){
		$(this).attr("data-click","true");
		$(this).find("span").html("&and;");
		$(this).parent().css("height","auto");
		
	}else{
		$(this).attr("data-click","false");
		$(this).find("span").html("&or;");
		$(this).parent().css("height","45");
	}
	
})
$(".sort_li").click(function(){
	var cateVal = $(this).find("a").html();
	$(".sort_li").find("a").removeClass("cur");
	$(this).find("a").addClass("cur");
	if(cateVal=="不限"){
		cateclose();
		return;
 	}
	var category = $(this).attr("category");
	$("#selectCategory").addClass("th_li");
	$("#selectCategory").html(cateVal+"<a href='javascript:onclick:cateclose();' class='close'>&times;</a>");
 	$("#cateId").val(category);
 	search();
})
$(".label_li").click(function(){
	var labelVal = $(this).find("a").html();
	$(".label_li").find("a").removeClass("cur");
	$(this).find("a").addClass("cur");
	if(labelVal=="不限"){
		labelclose();
		return;
 	}
	var category = $(this).attr("category")
	$("#selectLabel").addClass("th_li");
	$("#selectLabel").html(labelVal+"<a href='javascript:onclick:labelclose();' class='close'>&times;</a>");
	$("#label").val(labelVal);
	search();
})

function cateclose(){
	$(".sort_li").find("a").removeClass("cur");
	$("#de_sort").addClass("cur");
	$("#cateId").val("");
	$("#selectCategory").removeClass("th_li");
	$("#selectCategory").html("");
    search();
}
function labelclose(){
	$(".label_li").find("a").removeClass("cur");
	$("#de_label").addClass("cur");
	$("#selectLabel").removeClass("th_li");
	$("#selectLabel").html("");
	$("#label").val("")
    search();
}

function orders(num){
	var value = $("#searchName").val();
	var cateId=$("#cateId").val();
	var label=$("#label").val();
	var sort=num==2?"download":"create_time";
	$(".showcolor").removeClass("active");
	$(this).addClass("active");
	var islike=value==""?false:true;
	var url = basePath+"/docs/list?name="+value+"&label="+label+"&categoryId="+cateId+"&islike="+islike+"&sort="+sort
	location.href=url;
}
function turnPage(page){
	var value = $("#searchName").val();
	var cateId=$("#cateId").val();
	var label=$("#label").val();
	var sort=$("#sort").val();
	var islike=value==""?false:true;
	var url= basePath+"/docs/list?name="+value+"&label="+label+"&categoryId="+cateId+"&islike="+islike+"&sort="+sort+"&page="+page
	location.href=url;
}