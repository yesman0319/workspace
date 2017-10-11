window.onload = function() {
    $('.speaking-wrap').each(function() {
        volumeHandle('.' + $(this).attr('class'), '#jp-speaking');
    });
    //load加载完成隐藏loading图
    $('.loadBox').hide();
};

// 声明拖放选择题答案数组
var dragAnswerArr = [];
//阅读拖拽
function Dragdrop(parent) {
    var Dragdrop = parent;
    var $drag = null;
    var $target = null;
    Dragdrop.each(function() {
        _that = $(this);
        $drag = $(this).find('.drag');
        $target = $(this).find('.target');
        var id = '';
        $drag.draggable({
            revert: true,
            cursor: 'move',
            onDrop: function() {}
        });
        $drag.each(function() {
            id += '#' + $(this).attr('id') + ',';
        });
        var idStr = id.substring(0, id.length - 1);
        $target.droppable({
            accept: idStr,
            onDrop: function(e, source) {
                if (!$(this).text()) {
                    $(source).hide();
                    $(this).text($(source).attr('id') + ".  " + $(source).attr('text'));
                    $(this).addClass("f-csp");
                    $(this).attr('index', $(source).attr('index'));
                    $(this).attr('_options', $.trim($(source).find('.sn-box').text()));
                }
                dragAnswerArr.push($.trim($(source).find('.sn-box').text()));
                $(this).closest(".Dragdrop-topic").attr("radioanswer", dragAnswerArr.sort());
            }
        });
        $target.dblclick(function() {
            var index = $(this).attr('index');
            $(this).text('');
            dragAnswerArr.splice($.inArray($(this).attr('_options'), dragAnswerArr), 1);
            $(this).closest(".Dragdrop-topic").attr("radioanswer", dragAnswerArr.sort());
            $(this).removeAttr('index');
            $(this).attr('_options', "");
            $drag.eq(index).fadeIn();
        });
    });
}