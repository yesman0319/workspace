function Audios(opt){
    this.opt={
        myVid : 'videos',
        finish : 'finish',
        autoPlay : 'autoPlay',
        stopPlay : 'stopPlay',
        record : 'record',
        start : 'start',
        btnb : 'btnb',
        records : 'records',
        starts : 'starts',
        btnd : 'btnd',
        suspend : 'suspend',
        suspends : 'suspends',
        startPlay : 'startPlay',
        startPlays : 'startPlays',
        btnc : 'btnc',
        pic1 : 'pic1',
        pic2 : 'pic2',
        btna : 'btna',
        nums : 'nums',
        click : 'onclick'
    }
    for(var i in opt){
        this.opt[i]=opt[i];
    }
    this.myVid=document.getElementById(this.opt.myVid);
    this.finish=document.getElementById(this.opt.finish);
    this.autoPlay=document.getElementById(this.opt.autoPlay);
    this.stopPlay=document.getElementById(this.opt.stopPlay);
    this.record=document.getElementById(this.opt.record);
    this.start=document.getElementById(this.opt.start);
    this.btnb=document.getElementById(this.opt.btnb);
    this.records=document.getElementById(this.opt.records);
    this.starts=document.getElementById(this.opt.starts);
    this.btnd=document.getElementById(this.opt.btnd);
    this.suspend=document.getElementById(this.opt.suspend);
    this.suspends=document.getElementById(this.opt.suspends);
    this.startPlay=document.getElementById(this.opt.startPlay);
    this.startPlays=document.getElementById(this.opt.startPlays);
    this.btnc=document.getElementById(this.opt.btnc);
    this.btna=document.getElementById(this.opt.btna);
    this.pic1=document.getElementById(this.opt.pic1);
    this.pic2=document.getElementById(this.opt.pic2);
    this.nums=document.getElementById(this.opt.nums);
    
}


/*Audios.prototype.eve=function(){
	var that = this;
	that.s= that.myVid.currentTime;   //获取到播放了多少时间
	that.m = that.myVid.duration;   //获取到总的时间
	
	that.surplus = that.m - that.s;    //获取播放剩余的时间
	that.surplusMin = parseInt(that.surplus/60);   //获取剩余的分钟
	that.surplusSecond = parseInt(that.surplus%60); //获取 分钟后面的秒数
	
	shijian.innerHTML =  surplusMin + ":" +surplusSecond;  //让页面id为shijian的盒子显示总的时间
	if (that.surplusSecond < 10 ) {  //如果分钟后面的秒数小于10  则让surplusSecond = surplusMin ：surplusSecond
		that.surplusSecond = '0'+that.surplusSecond;
	}; 
	setTimeout(function(){
		that.progressValue = that.s/that.m*636;   //定义滚动条  每秒走多少
		that.finish.style.width = parseInt(that.progressValue) + 'px' //设置id为finish的样式 实现滚动 
	},1)
	if(that.surplus==0){
     stop();
    that.stopPlay.style.display="none";
    that.autoPlay.style.display="block"
}
}*/

/*Audios.prototype.dy=function(){
    var that = this;
    setInterval(function(){
        that.eve();
    },1000)
}*/
/*Audios.prototype.clicks=function(){
    var that = this;
    that.autoPlay[that.opt.click]=function(){
      play() ;
       that.autoPlay.style.display="none";
       that.stopPlay.style.display="block"
    }
    that.stopPlay[that.opt.click]=function(){
       that.stopPlay.style.display="none";
       that.autoPlay.style.display="block"
    }
}     ----20161228*/
//点击开始录音
Audios.prototype.spok=function(){
    var that=this;
    var setSS=null;
    that.record[that.opt.click]=function(){
    	try{
    		record();
    	}catch(e){
    		if(setSS) {
    			console.log("setSS---ing");
    			return;
    		}  		
    		$("#sub"+that.nums.value).text("请插入麦克风刷新重试.");
    		setSS = setTimeout(function(){
    			$("#sub"+that.nums.value).text("");
    			setSS = null;
    		},3000);
    		return;
    	}
    	$(".right-audio .autoPlay").attr("disabled","true");
    	$(".right-audio .autoPlay").css({"color":"#666","cursor":"default"})
        that.record.style.display="none";
        that.start.style.display="block";
    }

    //录音中
    setTimeout(function(){
    	that.start[that.opt.click]=function(){
            that.start.style.display="none";
            that.suspend.style.display="block";
            that.btnc.style.display="none";//不可点击的下一题按钮
            that.btna.style.display="block";//重录按钮
            that.btnb.style.display="block";//go下一题按钮
        	$(".autoPlay").removeAttr("disabled");
        	$(".right-audio .autoPlay").css({"color":"#00b652","cursor":"pointer"});
        	$(".my").css({"color":"#539bff","cursor":"default"})
        	stop();
        	var hh=parseInt(that.nums.value)+1;
            $("#sub"+that.nums.value).text("音频提交中...");
            upload(function() {
                $("#sub"+that.nums.value).text("提交完成");
                setTimeout(function(){
                	 $("#sub"+that.nums.value).text("");
                },1000)
            },hh);
        	if(hh==$("#spokenCount").val()){
        		that.btnb.style.display="none";
        		that.btnd.style.display="block";//查看结果按钮
        	}
        }
	},2000)
    
    //重录
    that.btna[that.opt.click]=function(){
        that.btna.style.display="none";
        that.btnb.style.display="none";
        that.btnc.style.display="block";
        /*that.pic1.style.display="block";
        that.pic2.style.display="none";*/
        that.record.style.display="block";
        that.suspend.style.display="none";
        that.btnd.style.display="none";
        that.startPlay.style.display="none";
        that.startPlays.style.display="none";
        $(".autoPlay").removeAttr("disabled")
        $(".right-audio .autoPlay").css({"color":"#00b652","cursor":"pointer"})
    }
    //点击播放录音
    that.suspend[that.opt.click]=function(){
        that.suspend.style.display="none";
        that.startPlay.style.display="block";
        that.btnc.style.display="block";
        that.btnb.style.display="none";
        $(".right-audio .autoPlay").attr("disabled","true");
        $(".right-audio .autoPlay").css({"color":"#666","cursor":"default"});
        play();
    }
    //点击停止播放录音
    that.startPlay[that.opt.click]=function(){
        that.suspend.style.display="block";
        that.startPlay.style.display="none";
        that.btnc.style.display="none";
        that.btnb.style.display="block";
        $(".right-audio .autoPlay").removeAttr("disabled");
        $(".right-audio .autoPlay").css({"color":"#00b54e","cursor":"pointer"});
        stop();
    }
    that.suspends[that.opt.click]=function(){
        that.suspends.style.display="none";
        that.startPlays.style.display="block";
        $(".right-audio .autoPlay").attr("disabled","true");
        $(".right-audio .autoPlay").css({"color":"#666","cursor":"default"})
    }
   /* that.btnb[that.opt.click]=function(){
        that.pic1.style.display="none";
        that.pic2.style.display="block";
        that.btnc.style.display="none";
        that.btna.style.display="block";
        that.btnb.style.display="none";  
        that.btnd.style.display="none";
        that.records.style.display="block";
        that.suspends.style.display="none";
        that.starts.style.display="none";    
    }*/
    that.records[that.opt.click]=function(){
        that.records.style.display="none";
        that.starts.style.display="block";
        $(".right-audio .autoPlay").attr("disabled","true")
        $(".right-audio .autoPlay").css({"color":"#666","cursor":"default"})
    }
    that.starts[that.opt.click]=function(){
        that.starts.style.display="none";
        that.suspends.style.display="block";
        that.btnc.style.display="none";
        that.btna.style.display="block";
        that.btnd.style.display="block";
        $(".autoPlay").removeAttr("disabled")
        $(".right-audio .autoPlay").css({"color":"#00b652","cursor":"pointer"})
        $(".my").css({"color":"#539bff","cursor":"default"})
    }
}





