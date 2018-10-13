window.onload = function() {
	var oCon = document.getElementsByClassName("con")[0]
	var oLi = oCon.getElementsByTagName("li");
	var oTot = document.getElementsByClassName("total")[0];
	for(var i = 0; i < oLi.length; i++) {
		jiagejisuan(oTot,oLi[i],oLi)
	}
}

function jiagejisuan(tot, oLi,oLi1) {
	var aBtn = oLi.getElementsByTagName("button");
	var aTrong = oLi.getElementsByTagName("strong");
	var aTrongD = parseFloat(aTrong[0].innerHTML);
	var aSpan = oLi.getElementsByTagName("span")[0];
	var num = 0;
	aBtn[1].onclick = function() {
		num++;
		aSpan.innerHTML = num;
		aTrong[1].innerHTML = (num * aTrongD).toFixed(2);
		total(tot, oLi,oLi1)
	}
	aBtn[0].onclick = function() {
		num--;
		if(num == -1) {
			num = 0
		}
		aSpan.innerHTML = num;
		aTrong[1].innerHTML = (num * aTrongD).toFixed(2);
		total(tot, oLi,oLi1)
	}

}
function total(tot, oLi,oLi1) {
	var aSpan1 = tot.getElementsByTagName("span");
	var num1 = 0;
	var num2 = 0;
	var num3 = [];
	var num4 = 0;
	for(var i = 0; i < oLi1.length; i++) {
		var aTrong = oLi1[i].getElementsByTagName("strong");
		var aTrongX = parseFloat(aTrong[1].innerHTML);
		var aSpan = oLi1[i].getElementsByTagName("span")[0];
		var aSpanG = parseInt(aSpan.innerHTML);
		num1 += aSpanG;
		num2 += aTrongX;
		if(oLi1[i].getElementsByTagName("span")[0].innerHTML != 0){
			num3.push(parseFloat(oLi1[i].getElementsByTagName("strong")[0].innerHTML))
		}
	}
	console.log(num3)
	for(var i = 0 ; i < num3.length; i++){
		if(num4 < num3[i]){
			num4 = num3[i]
		}else{
			num4 = num4
		}
	}
	aSpan1[0].innerHTML = num1;
	aSpan1[1].innerHTML = num2.toFixed(2);
	aSpan1[2].innerHTML = num4;
}