function setCookie(name,vlaue,iDay){
    var oDate = new Date();
    oDate.setDate(oDate.getDate()+iDay);
    document.cookie = name+ '='+vlaue + ";expires=" + oDate;
};
function getCookie(name){
    var arr = document.cookie.split(";");//以封号将字符串拆分
    for(var i = 0; i < arr.length;i++){
        var getArr = arr[i].split("=");//以等号将字符串拆分
        for(var i=0;i<getArr.length;i++){
            if(getArr[0] == name){
                return getArr[1]
            }
        }
        return "";
    }
}
function delCookie(name){//删除cookie
    setCookie(name,1,-1)//该条昨天过期
}