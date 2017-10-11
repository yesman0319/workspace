/*
 * 获取class
 */
define(function(require, exports, module) {
    function getByClass(elem, classes) {
        var elem = elem || document,
            re = new RegExp("(^|\\s)" + classes + "(\\s|$)"),
            result = [],
            child = elem.getElementsByTagName('*');
        for (var i = 0, len = child.length; i < len; i++) {
            if (re.test(child[i].className)) {
                result.push(child[i]);
            }
        }
        return result;
    };
    exports.getByClass = getByClass;
});
