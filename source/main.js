//main.js

var width = 800, 
	height = 480;
var c = document.getElementById('c');
var ctx = c.getContext('2d');
	var img = document.getElementById("gamebackground");
	c.width = width;
	c.height = height;

var main = function(){

	ctx.drawImage(img,0,0);
	
	mLoop = setTimeout(main, 1000 / 50);
}

main();

