Drge.prototype.down = function (ev) {
    var _this = this;
    var oEvent = event || ev;
    _this.X = oEvent.clientX - _this.oDiv.offsetLeft;
    _this.Y = oEvent.clientY - _this.oDiv.offsetTop;
    document.onmousemove =function(){
        _this.move(ev);
    } ;
    document.onmouseup =function(){
        _this.up(ev);
    } ;
    return false;
}
Drge.prototype.move = function (ev) {
    var _this = this;
    var oEvent = event || ev;
    _this.oDiv.style.left = oEvent.clientX - _this.X + "px";
    _this.oDiv.style.top = oEvent.clientY - _this.Y + "px";
}
Drge.prototype.up = function up() {
    document.onmousemove = "";
    document.onmouseup = "";
}
function Drge(tag) {
    var _this = this;
    this.oDiv = document.getElementById(tag);
    var oEvent = event || ev;
    this.oDiv.onmousedown = function () {
        _this.down();
    };
}