var Block = function(data) {
    this.load(data);
};

Block.prototype = {
	_posX: 0,
	_posY: 0,
	_sizeX: 0,
	_sizeY: 0,
	
    load: function(data) {
		this._posX = data.posX;
		this._posY = data.posY;
		this._sizeX = data.sizeX;
		this._sizeY = data.sizeY;
		console.log("constructor Block");
    },
	
	draw: function(ctx){
		ctx.fillStyle="rgb(200,255,0)";
		ctx.fillRect(this._posX, this._posY, this._sizeX, this._sizeY);
		ctx.fill();
	},
		
	collide: function(ball){
	
		if( ( ball.getPosX()  <= this.right()) &&
			( ball.getPosX() >= this.left()) &&
			( ball.top()   >= this.bottom()) &&
			( ball.bottom() <= this.top()) ){
				console.log("OK!!! BLOCK");

				if( (ball.getPosX() <= this.top()) && (ball._posY >= this.bottom())){
					ball._velX = -ball._velX;
				}else{
					ball._velY = -ball._velY;
				}
				return true;
		}
		return false;
	},
	
	makeBlocks: function(levels, level, blocks){
		for (i=0; i<6; i++){
			for(j = 0; j < 10; j++){
				if(levels[level][i][j] > 0){
					blocks.push( new Block({posX:15 + (j*62), posY:200 - (i*32 + 35) , sizeX: 60 , sizeY:30 }));
				}
			}
		}
		return blocks;
	},
	
	getPos: function(){    
        return { posX: this._posX, posY: this._posY};
    },
	
	left: function(){
		return this._posX;
	},
	
	right: function(){
		return this._posX + this._sizeX ;
	},
	
	top: function(){
		return this._posY + this._sizeY;
	},
	
	bottom: function(){
		return this._posY;
	}
    
};
