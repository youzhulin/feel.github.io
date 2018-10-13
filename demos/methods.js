

/* ======================================================对话框函数====================================================================== */

 function CreateDialog() {
    this.dialog = document.createElement('div');//创建dialog对话框
    this.dialog.className = 'dialog';
    this.dialog.innerHTML = `
                <h2 class="title">title<button class="button">创建</button></h2>
                <ul class="content"><li class="li"><span>content</span><button class="button">删除</button><button class="button">隐藏</button></li></ul>
                <div class="footer">footer<button class="button">confirm</button><button class="button">cancel</button></div>
                `
    document.body.appendChild(this.dialog);
    this.title = this.dialog.getElementsByClassName('title')[0];//获取头部
    this.content = this.dialog.getElementsByClassName('content')[0];//获取内容
    this.contetLi = this.content.getElementsByClassName('li');//获取内容中的所有项
    this.footer = this.dialog.getElementsByClassName('footer')[0];//获取尾部
    this.buttonCearte = this.dialog.getElementsByTagName('button');//创建按钮
    this.btn = this.dialog.getElementsByTagName('button');//对话框中的所有按钮
}
//样式函数
CreateDialog.prototype.appearance = function () {
    if (!document.getElementsByTagName('style')[0]) {
        document.getElementsByTagName('head')[0].innerHTML += `<style></style>`
    }
    let styleStr = `.dialog{width: 400px;border: 1px solid #ccc;position: absolute;}
    .title{text-align: center;line-height: 80px;background: #09f;margin: 0;}.content{ margin: 20px 0;list-style: none;}
    .button{line-height: 40px;padding: 0 20px;border: none;background: #09f;margin: 0 10px;color: #fff;outline: none;cursor: pointer;border-radius: 20px;box-shadow: 1px 1px 5px 2px #00f;}
    .button:hover{ background: #a030f0;}.button:active{background: #a030c0;box-shadow: 1px 1px 2px 0px #00f;}
    .footer{line-height: 50px;background: #09f;}.title,.conten,.footer{padding: 0 20px;}li{padding:10px 0;}`;
    if(document.getElementsByTagName('style')[0].innerHTML.indexOf(styleStr) == -1){
        document.getElementsByTagName('style')[0].innerHTML += styleStr;
    }
    return this
}
//对话框移动函数
CreateDialog.prototype.moveDialog = function () {
    var mouseClickXY = null;
    var mouseMoveXY = null;
    var dialogStartLT = null;
    var mouseOfdialog = null;
    var mouseStartOfMove = null;
    var _this = this;
    this.title.onmousedown = function (ev) {
        var oEvent = ev || event;
        mouseClickXY = { x: oEvent.clientX, y: oEvent.clientY };
        dialogStartLT = { L: _this.dialog.offsetLeft, T: _this.dialog.offsetTop };
        mouseOfdialog = { L: mouseClickXY.x - dialogStartLT.L, T: mouseClickXY.y - dialogStartLT.T };
        document.onmousemove = function (ev) {
            var oEvent = ev || event;
            mouseMoveXY = { x: oEvent.clientX, y: oEvent.clientY };
            mouseStartOfMove = { left: mouseMoveXY.x - mouseClickXY.x, top: mouseMoveXY.y - mouseClickXY.y };
            _this.dialog.style.left = dialogStartLT.L + mouseStartOfMove.left + 'px';
            _this.dialog.style.top = dialogStartLT.T + mouseStartOfMove.top + 'px';
        }
        document.onmouseup = function () {
            document.onmousemove = null;
            document.onmouseup = null;
            mouseClickXY = null;
            mouseMoveXY = null;
            dialogStartLT = null;
            mouseOfdialog = null;
            mouseStartOfMove = null;
        }
    }

    return this;
}
//新建li的函数
CreateDialog.prototype.operating = function () {
    var _this = this;
    this.buttonCearte[0].onclick = function () {
        console.log(_this.content)
        _this.content.innerHTML += '<li class="li"><span>content</span><button class="button">删除</button><button class="button">隐藏</button></li>'
        _this.itemOperating();
    }

    return this;
}
//li中两个按钮功能
CreateDialog.prototype.itemOperating = function () {
    for (let i = 0; i < this.contetLi.length; i++) {
        this.buttonContente = this.contetLi[i].getElementsByTagName('button');
        this.buttonContente[0].onclick = function () {
            this.parentNode.remove();
        }
        this.buttonContente[1].onclick = function () {
            this.parentNode.style.display = 'none';
        }
    }
    return this;
}
//footer功能函数
CreateDialog.prototype.foot = function(){
    this.footer = this.dialog.getElementsByClassName('footer')[0];
    this.fBtn = this.footer.getElementsByClassName('button');
    this.fBtn[0].onclick = function(){
        this.dialog.remove();
    }.bind(this)
    this.fBtn[1].onclick = function(){
       for(let i = 0 ; i < this.btn.length ; i++){
            this.btn[i].onclick = '';
       }
    }.bind(this)
    return this
}
//选中的对话框永远显示在最上层
CreateDialog.prototype.show = function(){
    this.DOMdialog = document.getElementsByClassName('dialog');
    var oldThis = '';
    for(let i = 0 ; i < this.DOMdialog.length ; i++){
        this.DOMdialog[i].onmousedown = function(){
            if(oldThis){
                oldThis.style.zIndex = '10';
                oldThis.style.filter = 'grayscale(50%)';
            }
            this.style.zIndex = 100;
            this.style.filter = 'grayscale(0%)';
            oldThis = this;
        }
    }
    return this;
}


/*============================================================================================================================= */