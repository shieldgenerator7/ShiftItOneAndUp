//dragon.js

var tank = new function() {

//tank's attributes (currently not global(obviously!))
var speed = 1;
var health = 50;
var damage = 20;

var that = this;
//attributes
that.image = new Image();
that.image.src = "tankdragon_placeholder.png"
//create new image and set it's source to tankdragon_placeholder.png

that.width = 100;
//width of the single frame

that.height = 100;
//height of the single frame

that.X = 0;
that.Y = 0;
//X & Y position

//methods
  that.setPosition = function(x, y) {
	that.X = x;
	that.Y = y;
	}
	
	that.draw = function() {
		try {
			ctx.drawImage(that.image, 0, 0, that.width, that.height);
			//cutting source image and pasting it into destination one, drawImage
			} catch (e) {
			//sometimes, if character's image is too big and will not load until the drawing for the first frame JavaScript will throw a fit
			}
		}
	})();
	//we immediately execute the function above and 
	//assign its result to the 'tank' variable
	//as a new object
	
	tank.setPosition(~~((width-tank.width)/2), ~~((height - player.height)/2));
	//tank dragon is ready to roll out!!
	//to the center of the screen :(
	
	
	//ADD IN ANIMATION STUFF LATER(REFER TO ANGEL GAME URL ----> http://michalbe.blogspot.com/2010/09/simple-game-with-html5-canvas-part-2.html
	
	/*HERE IS THE START OF THE CODE BLOCK YOU NEED TO LOOK AT ----\/
	//var player = new (function(){
	(...)
    that.frames = 1;
//number of frames indexed from zero
    that.actualFrame = 0;
//start from which frame
    that.interval = 0;
//we don't need to switch animation frame
//on each game loop, interval will helps
//with this.
*/
}

var basic = new function() {
var speed = 3;
var health = 10;
var damage = 5;


}

var speedy = new function() {
var speed = 5;
var health = 5;
var damage = 10;


}

var range = new function() {
var speed = 1;
var health = 10;
var damage = 10;


}

