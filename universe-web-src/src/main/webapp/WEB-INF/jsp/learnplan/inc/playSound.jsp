<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<SCRIPT LANGUAGE="JScript" FOR=soundIE EVENT=playStateChange(NewState)>

    // Test for the player current state, display a message for each.
    switch (NewState) {
        case 1://stopped
            $('#soundImg').attr('src', window.xiaoma.basePath+'/i/dic-pic.png');
            break;
        case 2://paused
            $('#soundImg').attr('src', window.xiaoma.basePath+'/i/dic-pic.png');
            break;
        case 10://ready
            $('#soundImg').attr('src', window.xiaoma.basePath+'/i/dic-pic.png');
            break;
        // Other cases go here.
        default:
            $('#soundImg').attr('src', window.xiaoma.basePath+'/i/i1.gif');
            break;
    }
</SCRIPT>

<!--播放录音-->
<SCRIPT LANGUAGE="JScript" FOR=ieAudio EVENT=playStateChange(playState)>
    switch (playState){
        case 1://stopped
            if(typeof my_stopped_func=="function"){
                my_stopped_func(playState);
            }
            break;
        case 2://paused
            if(typeof my_paused_func=="function"){
                my_paused_func(playState);
            }
            break;
        case 10://ready
            if(typeof my_ready_func=="function"){
                my_ready_func(playState);
            }
            break;
        default:
            if(typeof my_default_func=="function"){
                my_default_func(playState);
            }
            break;
    }
</SCRIPT>