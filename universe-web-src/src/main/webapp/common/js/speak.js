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
            //录音在这里
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

var recordArr = [];
function upload(callback,idx){ 
    var fileName = "";
    $.ajax({
        type: "GET",
        url: exerciseApi.learnApi+"mkTpo/file/posts.action",
        dataType : "json",
        success: function(data) {
            var expiration = data.expiration,
                saveKey = data["save-key"],
                bucket = data.bucket,
                policy = data.poily,
                signature = data.signature;
            	filename = data.name;
            console.log(data);
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
                    if(idx==recordArr.length+1){
                    	  recordArr.push("http://universe1.b0.upaiyun.com"+data.url);
                    }else{
                    	recordArr.splice(idx-1,1,"http://universe1.b0.upaiyun.com"+data.url);
                    }
                    console.log(recordArr);
                    callback && callback();
                    }else{
                    	recordArr.push("");
                    }
                },
                error: function(responseText){
                	recordArr.push("");
                }
            });
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("XMLHttpRequest.status: " + XMLHttpRequest.status);
            console.log("XMLHttpRequest.readyState: " + XMLHttpRequest.readyState);  
            console.log("textStatus: " + textStatus);
            recordArr.push("");
        }
    });
}

function lookReqult(){
	$("#questionAll").css("display","none");
	$("#answerAll").css("display","block");
	var results=[];
	for(var i=0;i<recordArr.length;i++){
		results.push({
			"audioUrl":recordArr[i],
			"questionId":$("#questionId"+i).val(),
			"questionSeq":$("#questionSeq"+i).val()
		});
		$("#video2_"+i).attr("src",recordArr[i]);
	}
	var  spokenResult = {
			"results": results,
			"groupId":$("#groupId").val()
	};

	spokenResult.exerciseId =  exerciseid;
	spokenResult.planDayId =  plandayid;
	spokenResult.startTime =  startTime;
	spokenResult.endTime =  endTime;
	if(!endTime || endTime==""){
		var date=new Date($.ajax({async: false}).getResponseHeader("Date"));
		endTime=zeroFn(date.getFullYear())+"-"+zeroFn((date.getMonth()+1))+"-"+zeroFn(date.getDate())+" "+zeroFn(date.getHours())+":"+zeroFn(date.getMinutes())+":"+zeroFn(date.getSeconds());
		spokenResult.endTime = endTime;
	}
	var info = JSON.stringify(spokenResult);
	 
	
	
	$.ajax({
		url: window.xiaoma.basePath+"/plan/answer/spoken",
		type: "POST",
		async: false,
		cache: false,
		data: { 
			"info": info,
		},
		success: function(data) {
		},
		error: function(data) {
		}
	});
}