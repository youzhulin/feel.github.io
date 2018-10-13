/*--========================================================= Ajax ========================================================--*/ 


function getAjax(method,url,data,fn){
    var xhr = null;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest;
    }else{
        xhr = new ActiveXObject('Microsoft.XHLHttp')
    }
    if(method === 'get'&&data){
        url = '?' + data;
    }
    xhr.open(method,url,true);
    if(method === 'get'){
        xhr.send();
    }else{
        xhr,setRequsetHeader('content-type','application/x-www-form-urlencoded')
        xhr.send(data);
    }
    xhr.onreadystatechange = function(){
        if(xhr.readyState===4&&xhr.status === 200){
            fn&&fn(xhr.responseText)
        }
    }

}

/*--=============================================== jsonp =============================================--*/ 


function getData(data){
    if(data.error_code===0){
      var inp = new Reservation().aInp[2];
      if(data.data.county){
        inp.value = data.data.province + '-' + data.data.city + '-' + data.data.county     
      }else{
        inp.value = data.data.province + '-' + data.data.city
      }  
      inp = null;
    }else{
        alert('对不起数据请求失败，请检查你输入的是否是正确的城市地址')
    }
}






/*--=====================================================  banner =====================================================--*/
function Banner() {
    this.Ul = document.querySelectorAll('.banner ul');
    this.li = document.querySelectorAll('.banner ul li');
    this.liW = this.li[0].offsetWidth;
    this.oOlLi = document.querySelectorAll('.banner ol li');
    this.nowNum = 0;
    this.num = 0;
    this.Ul[0].innerHTML += this.Ul[0].innerHTML;
    this.Ul[0].style.width = this.liW * this.li.length * 2 + 'px';
    this.Ul[0].style.transition = '0.5s';
}
Banner.prototype.bannerMove = function () {
    _this = this;
    this.Ul[0].addEventListener('touchstart', this.start.bind(_this), false);
    this.Ul[0].addEventListener('touchmove', this.move.bind(_this), false);
    this.Ul[0].addEventListener('touchend', this.end.bind(_this), false);
}
Banner.prototype.start = function (ev) {
    clearInterval(this.timer)
    this.num = Math.round(this.Ul[0].offsetLeft / this.liW);
    if (this.num === 0) {
        this.Ul[0].style.left = -this.li.length * this.liW + 'px';
    } else if (-this.num === this.li.length * 2 - 1) {

        this.Ul[0].style.left = -(this.li.length - 1) * this.liW + 'px';
    }
    this.cliX = ev.touches[0].pageX;
this.nowUl = this.Ul[0].offsetLeft;
}
Banner.prototype.move = function (ev) {
    this.Ul[0].style.transition = '';
    this.cliXNow = ev.touches[0].pageX;
    this.disX = this.cliXNow - this.cliX;
    this.Ul[0].style.left = this.nowUl + this.disX + 'px';
}
Banner.prototype.autoMove = function () {
    that = this;
    this.timer = setInterval(function () {
        that.num = Math.abs(that.num);
        that.Ul[0].style.transition = '0.5s';
        that.num++;
        that.oOlLi[that.nowNum].className = '';
        that.oOlLi[that.num % that.li.length].className = 'active';
        that.nowNum = that.num % that.li.length;
        that.Ul[0].style.left = -(that.num%(that.li.length*2)) * that.liW + 'px';
    }, 3000)
}
Banner.prototype.end = function () {
    this.num = Math.round(this.Ul[0].offsetLeft / this.liW);
    if (this.num < -(this.li.length * 2 - 1)) {
        this.num = -(this.li.length * 2 - 1)
    } else if (this.num > 0) {
        this.num = 0
    }
    this.Ul[0].style.transition = '0.5s';
    this.oOlLi[this.nowNum].className = '';
    this.oOlLi[-this.num % this.li.length].className = 'active';
    this.nowNum = -this.num % this.li.length;
    this.Ul[0].style.left = this.num * this.liW + 'px';
    this.autoMove();
}
// console.log(document.querySelectorAll('.banner'))
if(document.querySelectorAll('.banner')[0]){
    var banner = new Banner();
    banner.bannerMove();
    banner.autoMove();
}



/*========================================================= 页面滚动效果 ==========================================================================*/ 


function Pagescroll(){
    this.oContentwrap = document.querySelector('.contentwrap');
    this.oContentwrapH = this.oContentwrap.getBoundingClientRect();
    this.oContent = document.querySelector('.contentwrap>.content');
    this.oContentH = this.oContent.offsetHeight;
    this.oTop = document.querySelector('.top');
    this.oTopH = this.oTop.offsetHeight;
    this.H = window.innerHeight;
    this.startdis = 0;
    this.moveY = 0;
    this.contentwrap = function(){
        contentwrap =  document.querySelector('.contentwrap')
        contentwrap.style.top = this.oTopH + 'px';
    }
    // this.stopScrollLine = this.oContentH - window.innerWidth - this.oTopH;
    // console.log(this.stopScrollLine)
}
Pagescroll.prototype.pageMove = function(){
    this.oContent.addEventListener('touchstart',this.start.bind(this),false)
    this.oContent.addEventListener('touchmove',this.move.bind(this),false)
}
Pagescroll.prototype.start = function(ev){
    this.startX = ev.changedTouches[0].pageY;
    this.startdis = this.moveY
    ev.stopPropagation();
}
Pagescroll.prototype.move = function(ev){
    // alert(this.oContentH,this.oTopH-this.H)
    this.nowX = ev.changedTouches[0].pageY;
    this.disX = this.nowX - this.startX;
    this.moveY = this.startdis + this.disX;
    if(this.moveY>0){
        this.moveY = 0;
    }else if(this.moveY < -this.oContentH - ( this.oTopH-this.H)){
        this.moveY = (-this.oContentH - ( this.oTopH-this.H));
        
    };
    this.oContent.style.transform = 'translateY('+ this.moveY +'px)';
}
var pageMove = new Pagescroll();
pageMove.pageMove();
pageMove.contentwrap();

/*========================================================= 倾城宝贝 ==========================================================================*/ 


function Allure(){
    this.allure = document.getElementsByClassName('allure')[0];
    this.ol = this.allure.getElementsByTagName('ol')[0];
    this.btn = this.ol.getElementsByTagName('li');
    this.contMove = this.allure.getElementsByClassName('cont_move')[0];
    this.contMove.style.width = window.innerWidth*this.btn.length + 'px';
    this.oldN = 0;
}
Allure.prototype.contentMove = function(){
    _this = this;
    for(var i = 0 ; i < this.btn.length ; i++){
        this.btn[i].index = i;
        this.btn[i].addEventListener('touchstart',function(){
            _this.btn[_this.oldN].className = '';
            this.className = 'active';
            _this.oldN = this.index;
            _this.start(this.index)
        })
    }
}
Allure.prototype.start = function(index){
    this.contMove.style.transform = 'translateX('+ (-index*window.innerWidth) +'px)'
}
if(document.getElementsByClassName('allure')[0]){
    var oAllure = new Allure();
    oAllure.contentMove();
}





/*========================================================= 在线预约 ==========================================================================*/ 



function Reservation(){
    this.reservation = document.getElementsByClassName('reservation')[0];
    this.aInp = this.reservation.getElementsByTagName('input');
    this.tel = this.aInp[1].value;
    this.city = this.aInp[2].value;
}



Reservation.prototype.check = function(){
    this.aInp[0].addEventListener('blur',this.checkName.bind(this));
    this.aInp[1].addEventListener('blur',this.checkTel.bind(this));
    this.aInp[2].addEventListener('keyup',function(){
         this.city = this.value 
    });
    this.aInp[2].addEventListener('blur',this.checkCity);
};
Reservation.prototype.checkName = function(){
    var name = this.aInp[0].value;
    var nameLaw = /[\u4e00-\u9fa5]{1,5}/
    console.log(typeof(name.match(nameLaw)),typeof(name))
    if(name != name.match(nameLaw)){
        alert('亲，请输入正确姓名');
        return false;
    }
    return this;
}

Reservation.prototype.checkTel = function(){
    var tel = this.aInp[1].value;
    var telLaw = /(^(0|1)\d{10,11})|((0\d{2,3}-)?[1-9]\d{7}(-\d{1,5}))/
    if(!tel.match(telLaw)||(tel.match(telLaw)==null?undefined:tel.match(telLaw)[0] != tel)){
        alert('亲，请输入正确电话');
        return false;
    }
    return this;
}

Reservation.prototype.checkCity = function(){
    var jsonData = document.getElementById('jsonData');
    if(jsonData){
        jsonData.remove();
    }
    if(this.city){
        var script = document.createElement('script');
        script.src = 'https://api.shenjian.io/?appid=9731bd8a6051a5a8cffeb0c4480be2d9&city='+this.city + '&callback=getData';
        script.id = 'jsonData';
        document.body.appendChild(script);
    }
}

if(document.getElementsByClassName('reservation')[0]){
    var iReservation = new Reservation();
    iReservation.check();
}


/-- ==================================================  阻止手机页面放大行为  ======================================================== --/ 

document.addEventListener('dblclick', function (ev) {
    ev.preventDefault();
}, { passive: false })
document.addEventListener('touchmove', function (ev) {
    var toucheList = ev.touches.length;
    if(toucheList == 2){
        ev.preventDefault();
    }
}, { passive: false })


/-- ==================================================  评论列表  ======================================================== --/ 
function EvaluationList(){
    this.evaluation = document.getElementsByClassName('evaluation');
    this.tpage = document.getElementsByClassName('tpage');
}
if(document.getElementsByClassName('evaluation')){
    var iEvaluationList = new EvaluationList();
}