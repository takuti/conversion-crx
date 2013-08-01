/*--- 進数変換 ---*/
var nums = document.getElementsByName('num');

document.getElementById('binary').onclick = function(){
	var n = nums[0].value;
	localStorage['binary'] = n;
	if(n.match(/^[01]+$/)){
		document.getElementById('error').innerHTML = "";

		nums[1].value = parseInt(n,2);
		localStorage['decimal'] = parseInt(n,2);

		nums[2].value = parseInt(n,2).toString(16);
		localStorage['hex'] = parseInt(n,2).toString(16);
	} else {
		document.getElementById('error').innerHTML = "ちゃんと2進数を入力して！";
	}
}

document.getElementById('decimal').onclick = function(){
	var n = nums[1].value;
	localStorage['decimal'] = n;
	if(n.match(/^[0-9]+$/)){
		document.getElementById('error').innerHTML = "";

		nums[0].value = parseInt(n).toString(2);
		localStorage['binary'] = parseInt(n).toString(2);

		nums[2].value = parseInt(n).toString(16);
		localStorage['hex'] = parseInt(n).toString(16);
	} else {
		document.getElementById('error').innerHTML = "ちゃんと10進数を入力して！";
	}
}

document.getElementById('hex').onclick = function(){
	var n = nums[2].value;
	localStorage['hex'] = n;
	if(n.match(/^[0-9A-Fa-f]+$/)){
		document.getElementById('error').innerHTML = "";

		nums[0].value = parseInt(n,16).toString(2);
		localStorage['binary'] = parseInt(n,16).toString(2);

		nums[1].value = parseInt(n,16);
		localStorage['decimal'] = parseInt(n,16);
	} else {
		document.getElementById('error').innerHTML = "ちゃんと16進数を入力して！";
	}
}


/*--- カラーコード・RGB変換 ---*/
var color = document.getElementsByName('color');
var rgbs = document.getElementsByName('rgb');

document.getElementById('to-rgb').onclick = function(){
	var c = color[0].value;
	if(c.match(/^[0-9A-Za-z]{6}$/)){ c = "#" + c; }
	localStorage['RGBColor'] = c;

	if(c.match(/^#[0-9A-Fa-f]{6}$/)){
		document.getElementById('error').innerHTML = "";

		var rgb_color = new RGBColor(c);
		rgbs[0].value = rgb_color.r;
		rgbs[1].value = rgb_color.g;
		rgbs[2].value = rgb_color.b;
	} else {
		document.getElementById('error').innerHTML = "ちゃんとカラーコードを入力して！";
	}
}

document.getElementById('to-color').onclick = function(){
	var r = rgbs[0].value;
	var g = rgbs[1].value;
	var b = rgbs[2].value;
	if(r.match(/^[0-9]{1,3}$/) && g.match(/^[0-9]{1,3}$/) && b.match(/^[0-9]{1,3}$/)){
		document.getElementById('error').innerHTML = "";

		var rgb_color = new RGBColor('white');
		rgb_color.r = parseInt(r);
		rgb_color.g = parseInt(g);
		rgb_color.b = parseInt(b);
		localStorage['RGBColor'] = rgb_color.toHex();
		color[0].value = rgb_color.toHex();
	} else {
		document.getElementById('error').innerHTML = "ちゃんとRGBを入力して！";
	}
}


/*--- 共通 ---*/
document.body.onload = function(){
	if(localStorage['binary']) nums[0].value = localStorage['binary'];
	if(localStorage['decimal']) nums[1].value = localStorage['decimal'];
	if(localStorage['hex']) nums[2].value = localStorage['hex'];
	if(localStorage['RGBColor']){
		var c = localStorage['RGBColor'];
		color[0].value = c;
		var rgb_color = new RGBColor(c);
		rgbs[0].value = rgb_color.r;
		rgbs[1].value = rgb_color.g;
		rgbs[2].value = rgb_color.b;
	}
}