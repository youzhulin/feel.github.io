function collision(oDiv, oImg) {
	oDiv.onmousedown = function(ev) {
		if(oDiv.setCapture) {
			oDiv.setCapture() //设置全局捕获
		}
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		var oEvent = ev || event;
		var iW = oDiv.offsetLeft;
		var iH = oDiv.offsetTop;;
		var x = oEvent.clientX - iW;
		var y = oEvent.clientY - iH + scrollTop;
		var wid = document.documentElement.clientWidth || document.body.clientWidth;
		var hei = document.documentElement.clientHeight || document.body.clientHeight;
		//console.log(scrollTop)
		document.onmousemove = function(ev) {
			var oEvent = ev || event;
			var l = oEvent.clientX - x;
			var t = oEvent.clientY - y + scrollTop;
			//oImg四边
			var oImgL = oImg.offsetLeft;
			var oImgR = oImg.offsetLeft + oImg.offsetWidth;
			var oImgT = oImg.offsetTop;
			var oImgB = oImg.offsetTop + oImg.offsetHeight;
			//oDiv四边
			var oDivL = oDiv.offsetLeft;
			var oDivR = oDiv.offsetLeft + oDiv.offsetWidth;
			var oDivT = oDiv.offsetTop;
			var oDivB = oDiv.offsetTop + oDiv.offsetHeight;
			//
			if(oDivL > oImgR || oDivR < oImgL || oDivB < oImgT || oDivT > oImgB) {
				oImg.src = "img/1.jpg"
			} else {
				oImg.src = "img/2.jpg"
			}
			if(l <= 0) {
				l = 0;
			} else if(l >= (wid - oDiv.offsetWidth)) {
				l = wid - oDiv.offsetWidth + 'px'
			}
			if(t <= 0) {
				t = 0;
			} else if(t >= (hei - oDiv.offsetHeight + scrollTop)) {
				t = hei - oDiv.offsetHeight + scrollTop + 'px'
			}
			oDiv.style.left = l + 'px';
			oDiv.style.top = t + 'px';
			return false;
		}
		document.onmouseup = function() {
			document.onmousemove = document.onmouseup = null;
			if(oDiv.releaseCapture) {
				oDiv.releaseCapture() //释放全局捕获
			}
		}
	}
}

function drag(oDiv) {
	oDiv.onmousedown = function(ev) {
		if(oDiv.setCapture) {
			oDiv.setCapture() //设置全局捕获
		}
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		var oEvent = ev || event;
		var iW = oDiv.offsetLeft;
		var iH = oDiv.offsetTop;;
		var x = oEvent.clientX - iW;
		var y = oEvent.clientY - iH + scrollTop;
		var wid = document.documentElement.clientWidth || document.body.clientWidth;
		var hei = document.documentElement.clientHeight || document.body.clientHeight;
		//console.log(scrollTop)
		document.onmousemove = function(ev) {
			var oEvent = ev || event;
			var l = oEvent.clientX - x;
			var t = oEvent.clientY - y + scrollTop;
			if(l <= 0) {
				l = 0;
			} else if(l >= (wid - oDiv.offsetWidth)) {
				l = wid - oDiv.offsetWidth + 'px'
			}
			if(t <= 0) {
				t = 0;
			} else if(t >= (hei - oDiv.offsetHeight + scrollTop)) {
				t = hei - oDiv.offsetHeight + scrollTop + 'px'
			}
			oDiv.style.left = l + 'px';
			oDiv.style.top = t + 'px';
			return false;
		}
		document.onmouseup = function() {
			document.onmousemove = document.onmouseup = null;
			if(oDiv.releaseCapture) {
				oDiv.releaseCapture() //释放全局捕获
			}
		}
	}
}