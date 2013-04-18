//main.js

var width = 800,
height = 480,
gLoop,
c = document.getElementById('c'),
ctx = c.getContext('2d');

c.width = width;
c.height = height;


var clear = function(){
var img = document.getElementById("gamebackground");
	
ctx.clearRect(0, 0, width, height);
ctx.beginPath();
ctx.rect(0, 0, width, height);
ctx.closePath();
ctx.drawImage(img,0,0);
}



// var MoveCircles = function(e){
// for (var i = 0; i < howManyCircles; i++) {
// if (circles[i][1] - circles[i][2] > height) {
// circles[i][0] = Math.random() * width;
// circles[i][2] = Math.random() * 100;
// circles[i][1] = 0 - circles[i][2];
// circles[i][3] = Math.random() / 2;
// }
// else {
// circles[i][1] += e;
// }
// }
// };

var tank = new (function(){
var that = this;
that.image = new Image();

that.image.src = "tankdragon_placeholder.png"
that.width = 120;
that.height = 116;
that.frames = 0;
that.actualFrame = 0;
that.X = 0;
that.Y = 0;	

that.speed = 1;

that.setPosition = function(x, y){
if (x > 100){
	that.X = x;
}
that.Y = y;
}

that.run = function(){
	that.setPosition(that.X - that.speed, that.Y);
}

that.interval = 0;
that.draw = function(){
try {
ctx.drawImage(that.image, 0, that.height * that.actualFrame, that.width, that.height, that.X, that.Y, that.width, that.height);
}
catch (e) {
};

if (that.interval == 4 ) {
if (that.actualFrame == that.frames) {
that.actualFrame = 0;
}
else {
that.actualFrame++;
}
that.interval = 0;
}
that.interval++;	
}
})();


tank.setPosition(~~((width-tank.width)/2), ~~((height - tank.height)/2));

function Fire(x, y, Dx, Dy){
	var that = this;
	that.X = x;
	that.Y = y;
	that.destX = Dx;
	that.destY = Dy;
	that.speed = 10;
	
	that.image = new Image();
	that.image.src = "fire.png";
	that.width = 18;
	that.height = 8;
	that.frames = 0;
	that.actualFrame = 0;
	
	that.setPosition = function(x, y){
		that.X = x;
		that.Y = y;
	}
	
	that.move = function(){
		if (that.Y > that.destY){
			that.Y -= 1;
		}
		else if (that.Y < that.destY){
			that.Y += 1;
		}
		that.setPosition(that.X + that.speed, that.Y);
	}
	
	that.interval = 0;
	that.draw = function(){
		try {
			ctx.drawImage(that.image, 0, that.height * that.actualFrame, that.width, that.height, that.X, that.Y, that.width, that.height);
		}
		catch (e) {
		};

		if (that.interval == 4 ) {
			if (that.actualFrame == that.frames) {
				that.actualFrame = 0;
			}
			else {
				that.actualFrame++;
			}
			that.interval = 0;
		}
		that.interval++;	
	}
	
}

var howManyFire = 0;
var fireArray = [];// = new Fire(0,0,1,1);


var player = new (function(){
	var that = this;
	that.image = new Image();

	that.image.src = "soldier_placeholder.png"
	that.width = 82;
	that.height = 86;
	that.frames = 0;
	that.actualFrame = 0;
	that.X = 0;
	that.Y = 0;	
	that.gunY = 27;//the y coordinate where the railgun shoots at in relation to top of the player sprite

	that.setPosition = function(x, y){
		that.X = x;
		that.Y = y;
		if (that.Y < 0){
			that.Y = 0;
		}
		if (that.Y + that.height > height){
			that.Y = height - that.height;
		}
	}
	
	that.fire = function(){
		var newFire = new Fire(that.X + that.width, that.Y + that.gunY, 100, that.Y + that.gunY);
		fireArray.push(newFire);
		howManyFire += 1;
	}

	that.interval = 0;
	that.draw = function(){
		try {
			ctx.drawImage(that.image, 0, that.height * that.actualFrame, that.width, that.height, that.X, that.Y, that.width, that.height);
		}
		catch (e) {
		};

		if (that.interval == 4 ) {
			if (that.actualFrame == that.frames) {
				that.actualFrame = 0;
			}
			else {
				that.actualFrame++;
			}
			that.interval = 0;
		}
		that.interval++;	
	}
})();

var yPos = 185;
player.setPosition(15, yPos);



document.addEventListener('keydown', function(event) {
    if(event.keyCode == 40) {
		//Movin' on up...
		yPos = yPos + 5;
        player.setPosition(15, yPos);
    }
    else if(event.keyCode == 38) {
		//Goin' down...
		yPos = yPos - 5;
        player.setPosition(15, yPos);
    }
});

document.addEventListener('mousemove', function(e){
		player.setPosition(15, e.pageY);
});

document.addEventListener('mousedown', function(e){
		player.fire();
});


var GameLoop = function(){
	clear();
	tank.run();
	tank.draw();
	player.draw();
	for (var i = 0; i < howManyFire; i++){
		fireArray[i].move();
		fireArray[i].draw();
	}

	gLoop = setTimeout(GameLoop, 1000 / 50);
}

GameLoop();
