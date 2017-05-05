!function(){
	var btn1 = document.querySelector('.btn1');
	var btn2 = document.querySelector('.btn2');
	var cryp1 = document.querySelector('#cryp1');
	var cryp2 = document.querySelector('#cryp2');
	btn1.onclick = function(){
		var msg1 = document.querySelector('#msg1');
		cryp1.innerHTML = sha1(msg1.value);
	}
	btn2.onclick = function(){
		var key = document.querySelector('.m-key');
		var msg2 = document.querySelector('#msg2');
		var msg = msg2.value + key.value;
		cryp2.innerHTML = sha1(msg);
		console.log(key.value+','+msg);
	}
}();