define(function(require, exports, module) {
    function videoListHandle() {
        var Event = require('util/event').Event;
        var videoList = document.getElementById('videoList'),
            liEl = videoList.getElementsByTagName('li'),
            lnalClass = liEl[0].className;
        for (var i = 0, len = liEl.length; i < len; i++) {
            Event.add(liEl[i], 'mouseover', overHandle);
            Event.add(liEl[i], 'mouseout', outHandle);
        }

        function overHandle() {
            for (var i = 0, len = liEl.length; i < len; i++) {
                liEl[i].className = lnalClass;
            }
            this.className += ' hover';
        }

        function outHandle() {
            this.className = lnalClass;
        }
    };

    exports.videoListHandle = videoListHandle;
});
