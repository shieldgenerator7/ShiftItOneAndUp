//main.js

//Excerpt from http://liza.io/making-a-laser-beam-entity-in-impactjs-using-html5-canvas-stroke/
ig.global.EntityLaserbeam = ig.Entity.extend({
  size: {x: 1, y: 1},
	offset: {x: 0, y: 0},
	maxVel: {x: 500, y: 500},
	kind: null,

	type: ig.Entity.TYPE.NONE,
	// The entities that the laser beam kills are of TYPE A, so it checks against A
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.NEVER,

	init: function( x, y, settings ) {
		this.parent(x, y, settings);
		this.vel.y = -500;
		this.setProperties();
		console.log('alive');
	},

	setProperties: function() {
		if (this.kind === 'fire') {
			this.lingrad = ig.system.context.createLinearGradient(0,0,0,480);
			this.lingrad.addColorStop(0, '#ff0000');
			this.lingrad.addColorStop(0.5, '#c11700');
			this.lingrad.addColorStop(0.75, '#8f1100');
			this.lingrad.addColorStop(1, '#650c01'); 
		}

		else if (this.kind === 'water') {
			this.lingrad = ig.system.context.createLinearGradient(0,0,0,480);
			this.lingrad.addColorStop(0, '#0000ff');
			this.lingrad.addColorStop(0.5, '#006dc1');
			this.lingrad.addColorStop(0.75, '#00508f');
			this.lingrad.addColorStop(1, '#013a65');
		}
	},

	update: function() {
		// Laser beams follows player's pos x
		this.pos.x = ig.game.player.pos.x + ig.game.player.size.x / 2;

		// Size of the beam changes as it is shot out, growing as it moves
		// This means ANY PART of the beam does damage to ANY relevant entity it hits
		// As opposed to just the tip of the beam. 
		this.size.y = ig.game.player.pos.y - this.pos.y;

		// For every frame the laser beam is alive, 
		// it drains power.
		if (this.kind === 'fire') {
			ig.game.laser.incrementLaser(-0.1,0);
			if (ig.game.laser.fireLaser < 1) {
				this.kill();
				console.log('killing beam');
			}
		}

		else if (this.kind === 'water') {
			ig.game.laser.incrementLaser(0,-0.1);
			if (ig.game.laser.waterLaser < 1) {
				this.kill();
				this.laserBeam = null;
			}
		}	

		this.parent();

		// If the laser beam is not touching an enemy entity (a "block"), its vel.y is -500
		for (var i = 0; i < ig.game.allBlocks.length; i++) {
			var block = ig.game.allBlocks[i];
			if( !this.touches(block)) {
				this.vel.y = -500;
			}	
		}	
	},

	check: function( other ) {
		// If the beam touches a block or hit area of a boss
		if (other instanceof EntityBlock || other instanceof EntityHitarea ) {
			// And its kind does NOT match the vulnerability of the other entity
			if (this.kind != other.vulnerability && other.vulnerability != 'all') {
				// It stops against that entity
				this.vel.y = 0;
				this.pos.y = other.pos.y + other.size.y;
			}

			// Otherwise, if it's touching a block or hit area of a boss 
			// and its kind DOES match the vulnerability of the other entity
			else {
				// Its vel.y is -500 and the other entity takes damage
				this.vel.y = -500;
				other.receiveDamage(1, this);			
    		} 
    	}
	}, 

	 // The actual beam is drawn as a stroke on the canvas
 	 draw: function() {
        ig.system.context.strokeStyle = this.lingrad;

        ig.system.context.beginPath();
        ig.system.context.moveTo(ig.game.player.pos.x + ig.game.player.size.x / 2,ig.game.player.pos.y);
        ig.system.context.lineTo(this.pos.x,this.pos.y);
        ig.system.context.stroke();
        ig.system.context.closePath();       
    } 

});
