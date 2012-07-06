var Bat = function(data) {
    this.load(data);
};

Bat.prototype = {
	_posX: 0,
	_posY: 0,
	_sizeX: 0,
	_sizeY: 0,
	
    load: function(data) {
		this._posX = data.posX;
		this._posY = data.posY;
		this._sizeX = data.sizeX;
		this._sizeY = data.sizeY;
		console.log("constructor BAT");
    },
	
	draw: function(ctx){
		ctx.fillStyle="rgb(200,255,0)";
		ctx.beginPath();
		ctx.fillRect(this._posX, this._posY, this._sizeX, this._sizeY);
		ctx.closePath();
		ctx.fill();

		ctx.fillStyle="rgb(200,255,255)";
		ctx.beginPath();
		ctx.fillRect(this._posX + this._sizeX/2, this._posY, 2, this._sizeY);
		ctx.closePath();
		ctx.fill();

	},
	
	update: function(tecla){
		if(this._posX<=0){
			this._posX = 1;
			return;
		}
		if(this._posX + this._sizeX >=650){
			this._posX = 650-this._sizeX-1;
			return;
		}
	
		if(tecla == 37){ //izq
			this._posX -= 5;
		}
		if(tecla == 39){ //dere
			this._posX += 5; 
		}	
	},
	
	collide: function(ball){
				
		if( ( ball.getPosX()  <= this.right()) &&
			( ball.getPosX() >= this.left()) &&
			( ball.top()   >= this.bottom()) &&
			( ball.bottom() <= this.top())){ 
				console.log("collide BAT!!!");
				ball._velY = -ball._velY;
				
				pos = ball.getPosX() - (this._posX + this._sizeX/2);
				ball._velX = -pos/20;

				return true;
		}
		return false;
	},
	
	getPos: function(){    
        return { posX: this._posX, posY: this._posY};
    },
	
	left: function(){
		return this._posX;
	},
	
	right: function(){
		return this._posX + this._sizeX;
	},
	
	top: function(){
		return this._posY + this._sizeY;
	},
	
	bottom: function(){
		return this._posY;
	}
    
};
