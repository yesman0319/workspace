var playObject;
playObject = $("#jp-jplayer").jPlayer({
    ready: function() {
        $(this).jPlayer("setMedia", {
            mp3: ""
        });
    },
    preload: 'auto',
    swfPath: "../swf",
    supplied: "mp3"
});

function asplay(mp3url) {
    playObject.jPlayer("setMedia", {
        mp3: mp3url
    }).jPlayer("play");
}

//播放音频
var playAudio = (function() {
    var $labaIcon = $('.gl-horn-icon');
    $labaIcon.each(function() {
        $(this).bind('click', function() {
            asplay($(this).attr('audiourl'));
        });
    });
}());

//查看解释
var explain = (function() {
    var $explain = $('.explain-icon');
    //var boolen = true;
    $explain.each(function() {
        $(this).bind('click', function(event) {
            //if(boolen){
            $(this).parent().find('.explainMark').show();
            //}else{
            //$(this).parent().find('.explainMark').hide();
            //}
            // boolen = !boolen;
            event.stopPropagation();
        });
    });
    $(document).bind('click', function() {
        //boolen = true;
        $('.explainMark').hide();
    });
}());
