// 结果页切换效果
function tabSlider(objCell, titCell, mainCell, trigger, vis, interTime){
    var _this = this;
        _this.obj = objCell;
        _this.hd = titCell || ".hd";
        _this.bd = mainCell || ".bd";
        _this.trigger = trigger || "mouseover";
        _this.count = vis || 2;
        _this.time = interTime || null;
        _this.n = 0;
    $(_this.obj + " " + _this.bd).eq(0).show().siblings().hide();
    this.slider = function(){
        $(_this.obj + " " + _this.hd).bind(_this.trigger, function(event){
            $(this).addClass("on").siblings().removeClass("on");
            var index = $(_this.obj + " " + _this.hd).index(this);
            $(_this.obj + " " + _this.bd).eq(index).show().siblings().hide();
            _this.n = index;
        })
    }
    this.addhover = function(){
        $(_this.obj).hover(function(){clearInterval(t)}, function(){t = setInterval(_this.autoplay, _this.time)});
    }
    this.autoplay = function(){
        _this.n = _this.n >= (_this.count-1) ? 0 : ++_this.n;
        $(_this.obj + " " + _this.hd).eq(_this.n).trigger(_this.trigger);
    }
    this.init = function(){
        this.slider();
        _this.time && (this.addhover(), t = setInterval(this.autoplay, _this.time));
    }
    this.init();
}
new tabSlider(".m-result", ".result-hd li", ".result-bd .tab-box", "mouseover", 4);
new tabSlider(".read-tab", ".box-hd li", ".box-bd table", "mouseover", 3);
new tabSlider(".listen-tab", ".box-hd li", ".box-bd .listen-box", "mouseover", 2);