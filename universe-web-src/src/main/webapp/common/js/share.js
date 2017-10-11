var top = window.screen.height / 2 - 250;  
var left = window.screen.width / 2 - 300;
var rLink = location.href;
var title = document.title;
function shareTSina() {  
     
  // pic = $(".p-img img").attr("src");  
    window.open("http://service.weibo.com/share/share.php?title=" +   
    encodeURIComponent(title.replace(/&nbsp;/g, " ").replace(/<br \/>/g, " "))+ "&url=" + encodeURIComponent(rLink),  
    "分享至腾讯微博",  
    "height=500,width=600,top=" + top + ",left=" + left + ",toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no");  
      
}
//腾讯微博  
function shareToWb(){     
         window.open('http://v.t.qq.com/share/share.php?url='+encodeURIComponent(rLink)+  
          '&title='+encodeURI(title)+'&appkey='+encodeURI(rLink),'_blank',  
           'scrollbars=no,width=600,height=450,left=' + left + ',top=' + top + ',status=no,resizable=yes');       
} 
function shareTieba() {  
    title = document.title; 
  // pic = $(".p-img img").attr("src");  
   rLink = "http://baidu.com";  
     
    window.open("http://tieba.baidu.com/f/commit/share/openShareApi?tittle=" +   
    encodeURI(title)+ "&url=" + encodeURIComponent(rLink),  
    "分享至百度贴吧",  
    "height=500,width=600,top=" + top + ",left=" + left + ",toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no");  
      
}
function sharetoqqzone()  
{  
 var shareqqzonestring='http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?summary='+encodeURIComponent(title.replace(/&nbsp;/g, " ").replace(/<br \/>/g, " "))+'&url='+encodeURIComponent(rLink)+"&title="+encodeURIComponent(title.replace(/&nbsp;/g, " ").replace(/<br \/>/g, " "));  
 window.open(shareqqzonestring,'newwindow','height=400,width=400,top=100,left=100');  
} 
