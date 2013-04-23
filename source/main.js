//main.js

var width = 800,
height = 480,
gLoop,
c = document.getElementById('c'),
ctx = c.getContext('2d');

c.width = width;
c.height = height;


//global variables used in randomly calculating Y spawn pos of dragons
var min = 0;
var max = 364;


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



//code for tank dragon
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

//calculate random Y pos for tank
that.tankRandom = Math.floor(Math.random() * (max - min + 1)) + min;


//Tank Dragon Attributes
that.health = 10;
that.damage = 1;
that.speed = 1;
that.name = 'tank';

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
dragons.push(tank);
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

//Function called when health reaches 0
that.remove = function(){
		//that.markForDeletion = true;
		ctx.clearRect(that.X, that.Y, 120, 116);
	}
})();

//tank is drawn with position set to being slightly off screen with random Y coordinate
tank.setPosition(~~((width-tank.width)+200), tank.tankRandom);





//code for basic dragon
var basic = new (function(){
var that = this;
that.image = new Image();

that.image.src = "basicdragon_placeholder.png"
that.width = 175;
that.height = 79;
that.frames = 0;
that.actualFrame = 0;
that.X = 0;
that.Y = 0;	

//calculate random Y pos for basic
that.basicRandom = Math.floor(Math.random() * (max - min + 1)) + min;

//Basic Dragon Attributes
that.health = 6;
that.damage = 2;
that.speed = 2;
that.name = 'basic';

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
dragons.push(basic);
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
//Function called with health reaches 0
that.remove = function(){
		//that.markForDeletion = true;
		ctx.clearRect(that.X, that.Y, 175, 79);
	}
})();

//basic is drawn with position set to being slightly off screen with random Y coordinate
basic.setPosition(~~((width-basic.width)+200), basic.basicRandom);






//code for speedy dragon
var speedy = new (function(){
var that = this;
that.image = new Image();

that.image.src = "speeddragon_placeholder.png"
that.width = 110;
that.height = 70;
that.frames = 0;
that.actualFrame = 0;
that.X = 0;
that.Y = 0;	

//calculate random Y pos for speedy
that.speedyRandom = Math.floor(Math.random() * (max - min + 1)) + min;

//Speedy Dragon Attributes
that.health = 4;
that.damage = 6;
that.speed = 4;
that.name = 'speedy';

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
dragons.push(speedy);
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
//Function called when health reaches 0
that.remove = function(){
		//that.markForDeletion = true;
		ctx.clearRect(that.X, that.Y, 110, 70);
	}
})();

//speedy is drawn with position set to being slightly off screen with random Y coordinate
speedy.setPosition(~~((width-speedy.width)+200), speedy.speedyRandom);

var howManyDragons = 0;
var dragons = [];
dragons.push(tank);
dragons.push(basic);
dragons.push(speedy); 


function Fire(x, y, Dx, Dy){
	var that = this;
	that.X = x;
	that.Y = y;
	that.destX = Dx;
	that.destY = Dy;
	that.speed = 10;
	that.damage = 1;
	
	that.image = new Image();
	that.image.src = "fire.png";
	that.width = 18;
	that.height = 8;
	that.frames = 0;
	that.actualFrame = 0;
	that.markForDeletion = false;
	
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
		that.checkCollision();
	}
	
	that.checkCollision = function(){
		for (var i = 0; i < 3; i++){
			if (that.X + that.width > dragons[i].X){
				if (that.X < dragons[i].X + dragons[i].width){
					if (that.Y + that.height > dragons[i].Y){
						if (that.Y < dragons[i].Y + dragons[i].height){
							that.doDamage(dragons[i]);
						}
					}
				}
			}
		}
	}
	
	//I think this is to calculate damage done to a dragon????
 	that.doDamage = function(dragon){
	
			dragon.health = dragon.health - that.damage;//dragon.damage();
			that.remove();
			if (dragon.health <= 0){
				dragon.remove();
				}
			//for testing purposes...
			alert(dragon.health);
	}
	
	that.remove = function(){
		that.markForDeletion = true;
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
var fireArray = [];


//Brad: begin code for firing sound, taken from http://www.javascriptkit.com/script/script2/soundlink.shtml
var html5_audiotypes={
"wav": "audio/wav"
}

function createsoundbite(sound){
var html5audio=document.createElement('audio')
if (html5audio.canPlayType){ //check support for HTML5 audio
for (var i=0; i<arguments.length; i++){
var sourceel=document.createElement('source')
sourceel.setAttribute('src', arguments[i])
if (arguments[i].match(/\.(\w+)$/i))
sourceel.setAttribute('type', html5_audiotypes[RegExp.$1])
html5audio.appendChild(sourceel)
}
html5audio.load()
html5audio.playclip=function(){
html5audio.pause()
html5audio.currentTime=0
html5audio.play()
}
return html5audio
}
else{
return {playclip:function(){throw new Error("Your browser doesn't support HTML5 audio. Try using Google Chrome!")}}
}
}
var railgunsound=createsoundbite("railgun_sound.wav")
//Brad: end code for railgun sound




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
		railgunsound.playclip(); //Brad: code to play railgun sound
});


var GameLoop = function(){
	clear();
	
	tank.run();
	tank.draw();
	
	basic.run();
	basic.draw();
	
	speedy.run();
	speedy.draw();
	
	player.draw();
	
	
	
	for (var i = 0; i < howManyFire; i++){
		fireArray[i].move();
		fireArray[i].draw();
		 if (fireArray[i].markForDeletion){
			fireArray.splice(i,1);
			howManyFire -= 1;
		 }
	}
	

	gLoop = setTimeout(GameLoop, 1000 / 50);
}

GameLoop();
