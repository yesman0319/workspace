$(function () {
   /*打开/关闭资料简介*/
    $(".open").click(function () {
        $(this).css("display", "none");
        $(".close").css("display", "inline-block");
        $(".desc").css("display", "block");
    });
    $(".close").click(function () {
        $(this).css("display", "none");
        $(".open").css("display", "inline-block");
        $(".desc").css("display", "none");
    });
     /*阅读更多*/
    $(".more").click(function () {
        //code
    });

     /*功能简介展开内容*/
    $(".spre").click(function () {
        $(this).css("display", "none");
        $(".fun_con").css("overflow", "visible").css("height","auto");
        $(".spre_desc").css("display", "block");
    });
    $(".spre_desc").click(function () {
        $(this).css("display", "none");
        $(".spre").css("display", "block");
        $(".fun_con").css("overflow", "hidden").css("height","120px");
    });
});
var basePath=$("#basePath").val();
	function downloadInfo(){
		   var url=basePath+"/docs/permit";
		    	$.ajax({
		            type: "GET",
		            url: url,
		            data: {
		            	id:$("#downId").val()
		            },
		            dataType: "json",
		            success: function(data){
		              var json=eval("(" + data + ")");
		              var obj = JSON.parse(json); 
	                  if(obj.check=='success'){
	                	  saveit(obj.url,obj.upt,obj.upd)
	                  }else if(obj.check=="fail"){
	                	  alert("请购买右侧资料所属学习计划后下载");
	                  }else{
	                	  alert(obj.message);
	                  }
		             },
		             error: function(jqXHR, error, errorThrown) {
			                var status_code = jqXHR.status;
	                       if(status_code==401)
				                {
				        			var url =basePath+"/login";
				        			window.location.href=url;
				                } 
			         }
		        });
		}
		function saveit(src,upt,upd) { 
		 var url =src+'?_upd='+upd+'&_upt='+upt;
			document.location=url;
			savepic(); 
			} 
			function savepic() { 
			var ipAdress = returnCitySN["cip"] ? returnCitySN["cip"] :""; 
	    	$.ajax({
	            type: "GET",
	            url: basePath+"/docs/up_save",
	            data: {
	            	id:$("#downId").val(),
	            	ip:ipAdress
	            },
	            dataType: "json",
	            success: function(data){

	             },
	             error: function(XMLHttpRequest, textStatus, errorThrown) {
	     
	            }
	        });
	    } 
	
	//文档浏览底部分页栏显示 fix效果自适应		
		window.onscroll = function(){
			var offSetTop = $(".footer1").offset().top;
			var innerHeight = window.innerHeight;
			var scrollTop = $(document).scrollTop();
			var fixedBottom;
			if(offSetTop - innerHeight < scrollTop){
				fixedBottom = scrollTop - offSetTop + innerHeight;
					$(".page_footer").css("bottom",fixedBottom+"px");
			}
			else{
				$(".page_footer").css("bottom","0");
			}
		}
		
		
