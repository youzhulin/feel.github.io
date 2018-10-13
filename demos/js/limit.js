function LimitDage(id) {
    Drge.call(this, id);
}
for (var i in Drge.prototype) {
    LimitDage.prototype[i] = Drge.prototype[i]
}
LimitDage.prototype.move = function () {
    var obox = document.getElementById("box")
    var _this = this;
    var oEvent = event || ev;
    var L = oEvent.clientX - _this.X;
    var T = oEvent.clientY - _this.Y;
    if (L < 0) {
        L = 0
    } else if (L > obox.offsetWidth - _this.oDiv.offsetWidth) {
        L = obox.offsetWidth - _this.oDiv.offsetWidth;
    }
    if (T < 0) {
        T = 0
    } else if (T > obox.offsetHeight - _this.oDiv.offsetHeight) {
        T = obox.offsetHeight - _this.oDiv.offsetHeight;
    }
    _this.oDiv.style.left = L + "px";
    _this.oDiv.style.top = T + "px";
}