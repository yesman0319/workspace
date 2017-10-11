$(function() {
	Recorder.initialize({
	    swfSrc: "/common/plugins/recoder/recorder.swf"
	});
});

var Recorder;
//开始录音
function record(){
    Recorder.record({
        start: function(){
        	console.log("调用recorder");
        	recorderFlag=true;
            //录音在这里
        	$(".record-start").css("display","none");
        	$(".recording").css("display","block");
        	 $("#audioTip").html("录音中,再次点击结束录音");
            recordTimer=window.setInterval(function(){
                if(beginTime<600){
                    beginTime++;
                    $("#myrecord").text(beginTime+'"');
                }else{
                  	stop();
                    window.clearInterval(recordTimer);
                	$(".recording").css("display","none");
                	$(".record-stop-play").css("display","block");
                    $("#audioTip").html("");
                	upload(function(){
                		console.log("上传成功");
                	});
                }
            },1000);
        },
        progress: function(milliseconds){
            //document.getElementById("time").innerHTML = timecode(milliseconds);
        }
    });
}

// 播放录音
function play(){
    Recorder.stop();
    Recorder.play({
        progress: function(milliseconds){
            //document.getElementById("time").innerHTML = timecode(milliseconds);
        }
    });
}

// 停止录音/播放
function stop(){
    Recorder.stop();
}

var recordArr ="";
function upload(callback){ 
    var fileName = "";
    $.ajax({
        type: "GET",
        url: window.xiaoma.basePath+"/plan/proxy?proxyurl="+window.xiaoma.learning+"/mkTpo/file/posts.action",
        dataType : "json",
        success: function(data) {
            var expiration = data.expiration,
                saveKey = data["save-key"],
                bucket = data.bucket,
                policy = data.poily,
                signature = data.signature;
            	filename = data.name;
            Recorder.upload({
                method: "POST",
                url: "http://v0.api.upyun.com/universe1",
                audioParam: "file",
                params: {
                    "expiration": expiration,
                    "save-key": saveKey,
                    "bucket": bucket,
                    "policy": policy,
                    "signature": signature
                },
                success: function(responseText){
                    var data = JSON.parse(responseText);
                    console.log(data);
                    if(data.code==200){
	                    recordArr="http://universe1.b0.upaiyun.com"+data.url;
	                    console.log(recordArr);
	                    callback && callback();
                    }else{
                    	recordArr="";
                    }
                },
                error: function(responseText){
                	recordArr="";
                }
            });
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("XMLHttpRequest.status: " + XMLHttpRequest.status);
            console.log("XMLHttpRequest.readyState: " + XMLHttpRequest.readyState);  
            console.log("textStatus: " + textStatus);
            recordArr="";
        }
    });
}

