var zinfo = [false,false,false,false,false];
var oinfo = [false,false,false];
var winfo = [false,false];
$(".zin").keyup(function(){
	var x = parseInt($(this).attr("id").replace("z",""));
		if($(this).hasClass("checkin")){
			zinfo[x-1]=true;
		}else{
			if($(this).val()!=null&$(this).val()!=""){
				zinfo[x-1]=true;
			}else{
				zinfo[x-1]=false;
			}
		}
		changeinput(".zinbtn", zinfo);
	//changeinput(".zinbtn", zinfo);
	$(this).focusout(function(){
		var x = parseInt($(this).attr("id").replace("z",""));
		if($(this).hasClass("checkin")){
			zinfo[x-1]=true;
		}else{
			if($(this).val()!=null&$(this).val()!=""){
				zinfo[x-1]=true;
			}else{
				zinfo[x-1]=false;
			}
		}
		changeinput(".zinbtn", zinfo);
		$(this).unbind("focusout");
	})	
});

$(".onin").keyup(function(){
	var x = parseInt($(this).attr("id").replace("o",""));
		
			if($(this).val()!=null&$(this).val()!=""){
				oinfo[x-1]=true;
			}else{
				oinfo[x-1]=false;
			}

		changeinput(".oninbtn", oinfo);
	//changeinput(".oninbtn", oinfo);
	$(this).focusout(function(){
		var x = parseInt($(this).attr("id").replace("o",""));
		
			if($(this).val()!=null&$(this).val()!=""){
				oinfo[x-1]=true;
			}else{
				oinfo[x-1]=false;
			}

		changeinput(".oninbtn", oinfo);
		$(this).unbind("focusout");
	})	
});

$(".win").keyup(function(){
	var x = parseInt($(this).attr("id").replace("w",""));
		
			if($(this).val()!=null&$(this).val()!=""){
				winfo[x-1]=true;
			}else{
				winfo[x-1]=false;
			}

		changeinput(".winbtn", winfo);
	//changeinput(".oninbtn", oinfo);
	$(this).focusout(function(){
		var x = parseInt($(this).attr("id").replace("w",""));
		
			if($(this).val()!=null&$(this).val()!=""){
				winfo[x-1]=true;
			}else{
				winfo[x-1]=false;
			}

		changeinput(".winbtn", winfo);
		$(this).unbind("focusout");
	})	
});
var cflag = true;
$(".checkin").click(function(){
	if(cflag){
		cflag=false;
		$(".zinbtn").removeClass("putinon");
		$(".zinbtn").css("color","#73ede0");
	}else{
		cflag=true;
		changeinput(".zinbtn", zinfo);
	}
});
function changeinput(x, info){
	var flag = true;
	for(var n = 0 ; n < info.length; n++){
		//console.log(n+":"+info[n])
		if(info[n]==false){
			flag = false;
			break;
		}
	}
	if(flag){
		$(x).addClass("putinon");
		$(x).css("color","#fff");
	}else{
		$(x).removeClass("putinon");
		$(x).css("color","#73ede0");
	}
}
