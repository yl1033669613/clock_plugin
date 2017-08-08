;(function(win) {
    var theSets = {
        color: ['#ccc'],
        colorChangeTime: 2000,
        colorAutoChange: false,
        clickable: false,
        needleColor: [
            "#333",
            "#333",
            "#333"
        ]
    };
    var clock = function() {
        // 对象继承
        this.init.apply(this, arguments);
    }

    clock.prototype = {
        init: function() {
            this.count = 0;
            var args = Array.prototype.slice.call(arguments);
            if (args && args.length > 0) {
                this.ele = args[0];
                var config = args[1];
                var getType = Object.prototype.toString;
                if (config && getType.call(config) == "[object Object]") {
                    this.config = new Object;
                    var c = extend(config, theSets);
                    this.config = c;
                }
            }
        },
        // 开始
        render: function() {
            var self = this;
            self.ele.style.background = "#f5f5f5";
            // create needle
            var classname = ["sec-needle", "min-needle", "our-needle"];
            for (var i = 0; i < classname.length; i++) {
                var a = document.createElement("div");
                a.className = classname[i];
                a.style.backgroundColor = self.config.needleColor[i];
                self.ele.appendChild(a)
            }
            self.autoChangeBgColor();
            self.needleRotate();
            self.clickBgChange();
        },
        // auto change color
        autoChangeBgColor: function() {
            var self = this;
            var timer;
            if (this.config.colorAutoChange) {
                var self = this;
                timer = setInterval(function() {
                    if (self.count < self.config.color.length) {
                        self.ele.style.background = self.config.color[self.count];
                        self.count++;
                    }
                    if (self.count == self.config.color.length) {
                        self.count = 0;
                    }
                    if (typeof self.callBack == "function") {
                        self.callBack();
                    }
                }, self.config.colorChangeTime)
            }
        },
        // needle rotate
        needleRotate: function() {
            var self = this;
            var rotateDeg1 = 0,
                rotateDeg2 = 0,
                rotateDeg3 = 0;
            // 获取当前时间
            var myDate = new Date();
            rotateDeg1 = (myDate.getSeconds() + 1) * 6;
            rotateDeg2 = (myDate.getMinutes() + 1) * 6;
            rotateDeg3 = (myDate.getHours() + 1) * 30;
            var rotateEleSec = self.ele.getElementsByClassName("sec-needle")[0],
                rotateEleMin = self.ele.getElementsByClassName("min-needle")[0],
                rotateEleOur = self.ele.getElementsByClassName("our-needle")[0];
            // 初始旋转角度
            rotateEleSec.style.transform = "rotate(" + rotateDeg1 + "deg)";
            rotateEleMin.style.transform = "rotate(" + rotateDeg2 + "deg)";
            rotateEleOur.style.transform = "rotate(" + rotateDeg3 + "deg)";
            var timer1;
            timer1 = setInterval(function() {
                rotateDeg1 += 6;
                rotateEleSec.style.transform = "rotate(" + rotateDeg1 + "deg)";
                if (rotateDeg1 == 360) {
                    rotateDeg1 = 0;
                    rotateDeg2 += 6;
                    rotateEleMin.style.transform = "rotate(" + rotateDeg2 + "deg)";
                    if (rotateDeg2 == 360) {
                        rotateDeg2 = 0;
                        rotateDeg3 += 30;
                        rotateEleOur.style.transform = "rotate(" + rotateDeg3 + "deg)";
                        if (rotateDeg3 == 360) {
                            rotateDeg3 = 0;
                        }
                    }
                }
            }, 1000)
        },
        clickBgChange: function() {
            var self = this;
            if (self.config.clickable) {
                self.ele.addEventListener("click", function() {
                    if (self.count < self.config.color.length) {
                        this.style.background = self.config.color[self.count];
                        self.count++;
                    }
                    if (self.count == self.config.color.length) {
                        self.count = 0;
                    }
                })
            }
        }
    }

    win.clock = function(ele, config) {
        new clock(ele, config).render();
    }

})(window)


function extend(des, src, override) {
    if (src instanceof Array) {
        for (var i = 0, len = src.length; i < len; i++)
            extend(des, src[i], override);
    }
    for (var i in src) {
        if (override || !(i in des)) {
            des[i] = src[i];
        }
    }
    return des;
}
