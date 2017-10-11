
function logEvent(logType, evt, color) 
{
    var log = document.createElement("div");
    var note = document.createElement("span");
    note.setAttribute('class', 'note');

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
    	
        log.innerHTML = (new Date()).toLocaleTimeString()+ "&nbsp;&nbsp;" + sender + "说：";
        log.style.color = color;
        
        note.innerHTML = content;
        log.appendChild(note);
    }else if(logType=='CHANNEL'){
        log.innerHTML = (new Date()).toLocaleTimeString()+ "&nbsp;&nbsp;"+evt.type;
        log.style.color = color;
        
        var txt = evt.data;
        txt = txt.data.content;
        note.innerHTML = txt;
        log.appendChild(note);
    }
    
    var eventslog = document.getElementById('eventslog');
    eventslog.appendChild(log, eventslog.firstChild);
    
    document.getElementById("box").scrollTop = document.getElementById("box").scrollHeight;
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