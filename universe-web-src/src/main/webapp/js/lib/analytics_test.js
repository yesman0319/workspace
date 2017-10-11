var analytics = {
    param: {
        "ipAdress": "",
        "userAgent": "",
        "osName": "",
        "accessId": "",
        "refererUrl": "",
        "source": "",
        "medium": "",
        "campaign": "",
        "campaignContent": "",
        "keyword": "",
        "pageTitle": "",
        "pageUrl": "",
        "eventName": "",
        "eventAction": "",
        "eventContent": "",
        "eventValue": ""
    },
    getParam: function () {       
    	 function getUuid(len, radix){
        	 var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        	  var chars = CHARS, uuids = [], i;
        	    radix = radix || chars.length;
        	    if (len) {        	    
        	      for (i = 0; i < len; i++) uuids[i] = chars[0 | Math.random()*radix];
        	    } else {        	   
        	      var r;        	     
        	      uuids[8] = uuids[13] = uuids[18] = uuids[23] = '-';
        	      uuids[14] = '4';        	    
        	      for (i = 0; i < 36; i++) {
        	        if (!uuids[i]) {
        	          r = 0 | Math.random()*16;
        	          uuids[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        	        }
        	      }
        	    }
        	   return uuids.join('');
        }     	 
		function getCorrectValue(attr,value){        	
	      	if(value != null && value.length > 0){   
	      		var  param = ["source", "medium", "campaignContent"];
	      		for(var j = 0;j < param.length; j++){
	      			if (param[j] == attr) {	      				
	      				var specialChar = ["'","\"","#","!",">",";","@","$"];
	             		 for (var i = 0; i < specialChar.length; i++) {
	             			var index = value.indexOf(specialChar[i]);
	             			if(index != -1) return value.substr(0,index);              		
	             		 }   
	      			}
	      		}          				        		
	      	}
	       	return value;
	       }
		function getQueryString(name){		   
			   var url = document.referrer;
			   if(url){
				   var num = url.indexOf("?")
				   url = url.substr(num+1); 
				   var arr=url.split("&");
				   for(var i=0;i < arr.length;i++){
						num=arr[i].indexOf("=");
					    if(num > 0){			    
						     if(name==arr[i].substring(0,num)){
						    	 return arr[i].substr(num+1);
						     }			    
					     }
				    }
			   }
			   return "";
			} 
		 
		var url = "",reg = /([^?&=]+)=([^?&=]+)/g,objUrl = {},arrUrl = [],accessId = "",universeUuid = "";       
        url = window.location.href;       
               
        url.replace(reg, function () {
            objUrl[arguments[1]] = arguments[2];
        }); 
        //alert("source="+getQueryString("source"));
        arrUrl = ["source", "medium", "campaign", "campaignContent", "keyword"];
        for (var i = 0; i < arrUrl.length; i++) {
            analytics.param[arrUrl[i]] = "";
            $.each(objUrl, function (attr, value) {
                if (arrUrl[i] == attr) { 
                	//alert(attr+"="+decodeURIComponent(value));
                    analytics.param[arrUrl[i]] = getCorrectValue(attr,decodeURIComponent(value));
                    return (function () {
                    })();
                }
            });
        }      
        
        universeUuid = $.cookie("UNIVERSE_UUID"); 
        if (universeUuid != "" && universeUuid !=  null){
        	accessId = universeUuid;
        }else{
        	accessId = getUuid();
        	$.cookie("UNIVERSE_UUID", accessId, {expires: 7,path: '/', domain:'liuyang.com'});
        }   
        //alert("UNIVERSE_UUID="+$.cookie("UNIVERSE_UUID"));
        analytics.param.accessId = accessId;     
        analytics.param.refererUrl = document.referrer ? document.referrer : "";
        analytics.param.pageTitle = document.title ? document.title : "";
        analytics.param.pageUrl = url ? url : "";         
        //if(analytics.param.source == "" || analytics.param.source == null)analytics.param.source = getQueryString("source");
        //if(analytics.param.medium == "" || analytics.param.medium == null)analytics.param.medium = getQueryString("medium");
        //if(analytics.param.campaignContent == "" || analytics.param.campaignContent == null)analytics.param.campaignContent = getQueryString("campaignContent");
    },    
    Ana: function Ana(name,userId,content,url,value) {    	
        analytics.getParam();
        analytics.param.systemId = "1";
        analytics.param.eventName = typeof(name) == "undefined" ? "": name;
        analytics.param.eventAction = typeof(userId) == "undefined" ? "": userId;  
        analytics.param.eventContent = typeof(content) == "undefined" ? "": content;
        analytics.param.eventValue = typeof(value) == "undefined" ? "": value;         
        $.ajax({
            type: "GET",
            async: true,     
            url: "http://test.analysis.xmtoefl.com/analysis/visitor",
            dataType: "jsonp",
            data: analytics.param,
            jsonp: "callback",
            complete:function(){
            	 if(typeof(url) != "undefined" && url != "" )window.location.href= url;
            }            
        });        
    }    
};
$(function(){	
	analytics.Ana();	
});