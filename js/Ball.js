var Ball = function(data) {
    this.load(data);
};

Ball.prototype = {
	_radius: 0,
	_posX: 0,
	_posY: 0,
	_velX: 0,
	_velY: 0,
	
    load: function(data) {
		this._radius = data.radius;
		this._posX = data.posX;
		this._posY = data.posY;
		this._velX = data.velX;
		this._velY = data.velY;
		console.log("constructorBALL" + " "  + this._posX);
    },
	
	draw: function(ctx){
		ctx.fillStyle="rgb(200,255,0)";
        ctx.beginPath();
		ctx.arc(this._posX, this._posY, this._radius, 0, Math.PI*2, true);
        ctx.closePath();
	 	ctx.fill();
	},
	
	getPos: function(){    
        return { posX: this._posX, posY: this._posY};
    },
	
	update: function(){
		//console.log(this._posX + " " + this._posY);

     	this._posX = this._posX - this._velX;
		this._posY = this._posY - this._velY;
		
		
		WIDTH = 650;
		HEIGHT = 400;
		
		if( ( this._posX + this._radius/2 ) >= WIDTH ){
			this._posX = WIDTH - this._radius;
			this._velX = -this._velX;
		}else if( (this._posY - this._radius) <=0){ 
			this._posY = this._radius;
			this._velY = - this._velY;
		}else if( (this._posY + this._radius) >= HEIGHT){
			this._posY = HEIGHT - this._radius;
			this._velY = -this._velY;
			return false;
		}else if( ( this._posX - this._radius ) <= 0){
			this._posX = this._radius;
			this._velX = -this._velX;
		}
		return true;
	},
	
	resetBall: function(bat){
		this._posX = bat._posX;
		this._posY = 369;
	},
	
	getPosX: function(){
		return this._posX;
	},
		
	top: function(){
		return this._posY + this._radius;
	},
	
	bottom: function(){
		return this._posY - this._radius;
	}
    
};
