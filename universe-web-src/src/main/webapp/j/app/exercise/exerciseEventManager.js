var exerciseEventManager = {};
exerciseEventManager.event = {};
exerciseEventManager.addEventListener = function(eventName,fn){//存放自定义的事件
	if(!this.event[eventName]){
		this.event[eventName] = [];
	}
	this.event[eventName].push( fn );
}

exerciseEventManager.dispatchEvent = function(eventName){//存放自定义的事件
	var i = 0;
	if(!this.event[eventName]){
		return;
	}
	for(len = this.event[eventName].length;i<len;i++){
		this.event[eventName][i].apply();
	}
}