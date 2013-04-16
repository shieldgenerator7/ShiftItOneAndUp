//main.js
var width = 800, 
	height = 480,
	c = document.getElementById('c'), 
	ctx = c.getContext('2d');
	var img = document.getElementById("gamebackground");
	c.width = width;
	c.height = height;
	ctx.drawImage(img,0,0);
clear();
