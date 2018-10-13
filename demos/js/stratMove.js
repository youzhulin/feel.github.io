function getStyle(obj, name) {
    if (obj.currentStyle) {
        //IE获取非行间样式
        return obj.currentStyle[name];
    } else {
        //普通浏览器获取非行间样式
        return getComputedStyle(obj, false)[name]
    }
}
function setStyle(obj, json, coefficient, fnEnd) {
    //每次调运之前关闭掉该元素前面的这个定时器
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        //定义一个开关
        var stop = true;
        //循环json中的每个元素
        for (curr in json) {
            //如果传入的参数curr是透明度
            if (curr == 'opacity') {
                //那么先获取透明度，再获取小数，再给乘100之后四舍五入取整
                var reStyle = Math.round(parseFloat(getStyle(obj, curr)) * 100);
            } else {
                //否则获取原来的属性取整
                var reStyle = parseInt(getStyle(obj, curr))
            }
            //然后为需要设置的属性定义一个变速度
            var speed = (json[curr] - reStyle) / coefficient;
            //如果速度大于0，则向上取整，否则向下取整
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            //如果那个元素的目标值不等于传入的属性值
            if (reStyle != json[curr]) {
                //那么开关为假
                stop = false;
            }
            //否则，如果传入的是透明度
            if (curr == 'opacity') {
                //那么就让透明度变为目标值
                //普通浏览器
                obj.style.opacity = (reStyle + speed) / 100;
                //IE浏览器
                obj.style.filter = "alpha(opcity:" + (reStyle + speed) + ")"
            } else {
                //否则就让所传属性到达目标属性值
                obj.style[curr] = reStyle + speed + "px"
            }
        }
        //当开关为真时
        if (stop == true) {
            //那么就关闭掉该函数身上的这个定时器
            clearInterval(obj.timer)
            //回调函数
            if (fnEnd) fnEnd();
        }
    }, 30)
}