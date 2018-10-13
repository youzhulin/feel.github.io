function getStyle(obj, name) {
	if(obj.currentStyle) {
		//IE获取非行间样式
		return obj.currentStyle[name];
	} else {
		//普通浏览器获取非行间样式
		return getComputedStyle(obj, false)[name];
	}
}

function setStyle(obj, curr, itarget, coefficient, fnEnd) {
	//每次调运之前关闭掉该元素前面的这个定时器
	clearInterval(obj.timer)
	obj.timer = setInterval(function() {
		//如果传入的参数curr是透明度
		if(curr == 'opacity') {
			//那么先获取透明度，再获取小数，再给乘100之后四舍五入取整
			var reStyle = Math.round(parseFloat(getStyle(obj, curr)) * 100);
		} else {
			//否则获取原来的属性取整
			var reStyle = parseInt(getStyle(obj, curr))
		}
		//然后为需要设置的属性定义一个变速度
		var speed = (itarget - reStyle) / coefficient;
		//如果速度大于0，则向上取整，否则向下取整
		speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
		//如果获取的值已经等于目标值
		if(reStyle == itarget) {
			//那么就关闭掉该函数身上的这个定时器
			clearInterval(obj.timer)
			//回调函数
			if(fnEnd) fnEnd();
		} else {
			//否则，如果传入的是透明度
			if(curr == 'opacity') {
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
	}, 30)
}

function toTow(number) {
	return number < 10 ? number = '0' + number : number = '' + number
}

function jitter(obj, curr, itarget1, itarget2, coefficient, fnEnd) {
	//每次调运之前关闭掉该元素前面的这个定时器
	clearInterval(obj.timer)
	obj.num = 0;
	obj.itarget = itarget1;
	obj.oldCurr = getStyle(obj, curr);
	obj.timer = setInterval(function() {
		//如果传入的参数curr是透明度
		if(curr == 'opacity') {
			//那么先获取透明度，再获取小数，再给乘100之后四舍五入取整
			var reStyle = Math.round(parseFloat(getStyle(obj, curr)) * 100);
		} else {
			//否则获取原来的属性取整
			var reStyle = parseInt(getStyle(obj, curr))
		}
		//然后为需要设置的属性定义一个变速度
		if(parseInt(getStyle(obj, curr)) >= itarget1) {
			obj.itarget = itarget2
			obj.num++
		} else if(parseInt(getStyle(obj, curr)) <= itarget2) {
			obj.itarget = itarget1;
			obj.num++
		}
		console.log(obj.itarget)
		var speed = (obj.itarget - reStyle) / coefficient;
		//如果速度大于0，则向上取整，否则向下取整
		speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
		//如果获取的值已经等于目标值
		if((obj.num == 5) && (obj.style[curr] == obj.oldCurr)) {
			//那么就关闭掉该函数身上的这个定时器
			clearInterval(obj.timer);
			//回调函数
			if(fnEnd) fnEnd();
		} else {
			//否则，如果传入的是透明度
			if(curr == 'opacity') {
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
	}, 30)
}

function detectNum(str) {
	var n = 0;
	if(str.length == 0) {
		return false
	}
	for(var i = 0; i < str.length; i++) {
		n = str.charCodeAt(i);
		if(n < 48 || n > 57) {
			return false
		}
	}
	return true
}