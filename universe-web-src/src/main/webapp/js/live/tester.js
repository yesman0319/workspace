function logEvent(logType, evt, color) 
{
	
/*    var log = document.createElement("div");
    var note = document.createElement("span");
    note.setAttribute('class', 'note');*/
	
    var log = document.createElement("li");
	    var div = document.createElement("div");
	    div.setAttribute('class', 'comment');
		    var span_people = document.createElement("span");
		    span_people.setAttribute('class', 'nicknames');
		    var span_time = document.createElement("span");
		    span_time.setAttribute('class', 'comment_time');
	   var p =  document.createElement("p");
	   p.setAttribute('class', 'comment_content');
  

    if(logType=='SDK'){
       log.innerHTML = (new Date()).toLocaleTimeString()+ "&nbsp;&nbsp;";
        log.style.color = color;
        var txt = evt.msg;
        if(typeof txt != "string"){
        	txt = JSON.stringify(txt);
        }
        note.innerHTML = txt;
        log.appendChild(note);
    }else if(logType=='WIDGET'){
        var txt = evt.data;
        var sender = txt.sender;
    	var content = txt.content;
    	var currentDate = new Date();
    	
    	
       /* 
    	log.innerHTML = (new Date()).toLocaleTimeString()+ "&nbsp;&nbsp;" + sender + ":";
        log.style.color = color;
        
        note.innerHTML = content;
        log.appendChild(note);
        
        */
        if(color == "#17bd2f"){
        	 log.setAttribute('class', 'me');
        	 span_people.innerHTML =   "我："
        }else{
        	span_people.innerHTML = sender + "："
        }
    	//span_time.innerHTML = (new Date()).toLocaleTimeString();
       span_time.innerHTML = getCurrentTime();
    	div.appendChild(span_people);
    	div.appendChild(span_time);
    	p.innerHTML = content;
    	log.appendChild(div);
    	log.appendChild(p);
        
        
    }else if(logType=='CHANNEL'){
/*       
    	log.innerHTML = (new Date()).toLocaleTimeString()+ "&nbsp;&nbsp;"+evt.type;
        log.style.color = color;*/
        
       /* var txt = evt.data;
        txt = txt.data.content;
        note.innerHTML = txt;
        log.appendChild(note);*/
       
        
        var txt = evt.data;
        txt = txt.data.content;
        log.setAttribute('class', 'me');
    	span_people.innerHTML = evt.type;
    	//span_time.innerHTML = (new Date()).toLocaleTimeString();
    	span_time.innerHTML = getCurrentTime();
    	div.appendChild(span_people);
    	div.appendChild(span_time);
    	p.innerHTML = txt;
    	log.appendChild(div);
    	log.appendChild(p);
    	
    }
    
    var eventslog = document.getElementById('eventslog');
    eventslog.appendChild(log, eventslog.firstChild);
    
    document.getElementById("eventslog").scrollTop = document.getElementById("eventslog").scrollHeight;
}

function appendSendedMsg(evt, color){
    var log = document.createElement("div");
    log.innerHTML = "[" +(new Date()).toLocaleTimeString()+ "] "+evt.type;
    log.style.color = color;

    var note = document.createElement("span");
    note.setAttribute('class', 'note');
    note.innerHTML = JSON.stringify(evt.data);

    log.appendChild(note);
    var eventslog = document.getElementById('sendedMsgDiv');
    eventslog.insertBefore(log, eventslog.firstChild);
}

//获取当前的时间
function getCurrentTime(){
	var currentDate = new Date();
	currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
	var hours = currentDate.getHours();
	if(hours < 10){
		hours = "0" + hours;
	}
	var min = currentDate.getMinutes();
	if(min < 10){
		min = "0" + min;
	}
	var seconds = currentDate.getSeconds();
	if(seconds < 10){
		seconds = "0" + seconds;
	}
	return hours + ":" + min + ":" + seconds
}
