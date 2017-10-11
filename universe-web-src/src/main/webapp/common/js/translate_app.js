function Translate(ID){
	this.leftpart1 = document.getElementById("left-part1");
	this.H = this.leftpart1.offsetTop;
}
Translate.prototype.eve=function(){
	var that=this
	window.onscroll=function(){
		var bH = document.documentElement.scrollTop || document.body.scrollTop; 
		if(bH>that.H){
			that.leftpart1.style.position="fixed";
	        that.leftpart1.style.top=0
		}else{
			that.leftpart1.style.position="absolute"; 
	        that.leftpart1.style.top=that.H+"px"
		}
	}
}

function Click(ID){
    this.rightTextarea = document.getElementById("right-textarea");
    this.btn = document.getElementById("btn");
    this.btns = document.getElementById("btns");
    this.daan = document.getElementById("daan");
    this.yw = document.getElementById("yw");
    this.rightKey = document.getElementById("right-key");
    this.indexs = document.getElementById("indexs");
    this.spoken = document.getElementById("spoken");
}

Click.prototype.eves=function(){
    var that=this;
    this.rightTextarea.onfocus=function(){
        that.btn.className="on";
        that.btn.disabled=false;
    }

    this.btn.onclick=function(){
        that.values = that.rightTextarea.value;
        that.rightTextarea.style.display="none";
        that.yw.style.display="none";
        that.rightKey.style.display="block";
        that.daan.innerHTML=that.values;
        that.btn.style.display="none";
    }
    this.btns.onclick=function(){
        $(this).parents("#right-key").hide()
        $("#ywy").show();
        $("#yw").show();
        $("#right-textarea").show();
        $("#btn2").show()
    }

    $("#btns1").on("click",function(){
        location.href="specifics.html"
    })
    $("#btn2").on("click",function(){
        $("#right-k2").show();
        $("#yw").hide();
        $("#right-textarea").hide();
        $(this).hide();
    })

    $("#indexs").on("click",function(){
        location.href="index.html";
        
    })
    $("#spoken").on("click",function(){
        location.href="spoken.html";
        
    })
    
}


function Tab(ID,on,bg){
	this.ulsLi = document.getElementById("uls").getElementsByTagName("li");
	this.divs = document.getElementsByClassName("uli");
}


Tab.prototype.events=function(){
	var that = this;

	for(var i=0;i<that.ulsLi.length;i++){
        that.classval = that.ulsLi[i].getAttribute("class");
        that.ulsLi[i].index=i;
        that.ulsLi[i].onclick=function(){
            for(var i=0;i<that.ulsLi.length;i++){
               /* that.classval = that.classval.replace("on","");
                that.ulsLi[i].setAttribute("class",that.classval );*/
                that.ulsLi[i].className=""
                that.divs[i].style.display="none"
            }
            this.className="on"
            that.divs[this.index].style.display="block";
            that.spans = $(this).find("span").text()

           if(that.spans == "音译互辩"){
                $("#bb").show()
                $("#bb div").on("click",function(){

                    $(this).addClass("bg").siblings("div").removeClass("bg")
                    $(this).find("h2").show().parents("div").siblings("div").find("h2").hide()
                    for(var i=0;i<that.ulsLi.length;i++){
                        /*that.classval = that.classval.replace("on","");
                        that.ulsLi[i].setAttribute("class",that.classval );*/
                        that.ulsLi[i].className="";
                        that.divs[i].style.display="none"
                    }
                })
            } else{
                $("#bb").hide()
                $("#bb div").removeClass("bg")
                $("#bb div").find("h2").hide()
            }
        }
    }
}