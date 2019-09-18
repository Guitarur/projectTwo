(function ($,root) {
    function Control(len,listNum) {
        this.index = listNum;
        this.len = len;
    }

    Control.prototype = {
        pre: function () {
            return this.getIndex(-1);
        },
        next: function () {
            return this.getIndex(1);
        },
        getIndex: function (val) {
            var index = this.index;
            var len = this.len;
            var curIndex = (index + val + len) % len;
            this.index = curIndex;
            return curIndex;
        }
    }

    root.control = Control;
})(window.Zepto,window.player || (window.player = {}))