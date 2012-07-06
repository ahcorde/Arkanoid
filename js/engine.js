window.requestAnimateFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              window.oRequestAnimationFrame      ||
              window.msRequestAnimationFrame     ||
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
})();


var Engine = function (data) {
    this.load(data);
};

Engine.prototype = {
    ctx: 0,
    stats:0,
    i: 0,
    objects:[],
    inputManager: null,
    _dialog: false,
	_gameover :  false,
	_won :  false,
	_level :  0,
	_maxLevel : 5,
	_score : 0,
	_scoreHTML: 0,
	_lives :  3,
	_livesHTML: 3,
	_block: new Array(),
	_ballIsMoving: false,
    wallLastTimeStamp: 0,
    gameTime: 0,
    maxStep: 0.05,
	levels :[
			[[0,0,1,1,1,1,1,1,0,0],[0,1,1,0,0,0,0,1,1,0],[0,0,1,1,1,1,1,1,0,0],
			[0,0,1,1,1,1,1,1,0,0],[0,1,1,0,0,0,0,1,1,0],[0,0,1,1,1,1,1,1,0,0]],

			[[1,1,1,1,1,1,1,1,1,1],[1,0,0,1,0,0,1,0,0,1],[0,1,1,0,1,1,0,1,1,0],
			[0,1,1,0,1,1,0,1,1,0],[1,0,1,1,0,0,1,0,0,1],[1,1,1,1,1,1,1,1,1,1]],

			[[0,0,0,1,1,1,1,0,0,0],[0,0,1,1,1,1,1,1,0,0],[1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1],[0,1,1,1,1,1,1,1,1,0],[0,0,1,1,1,1,1,1,0,0]],

			[[1,0,1,1,1,1,1,1,0,1],[1,1,1,0,1,1,0,1,1,1],[1,0,1,1,0,0,1,1,0,1],
			[1,0,1,1,0,0,1,1,0,1],[1,1,1,0,1,1,0,1,1,1],[1,0,1,1,1,1,1,1,0,1]],

			[[1,1,1,1,1,1,1,1,1,1],[1,0,1,1,0,0,1,1,0,1],[1,1,0,0,1,1,0,0,1,1],
			[1,1,0,0,1,1,0,0,1,1],[1,0,1,1,0,0,1,1,0,1],[1,1,1,1,1,1,1,1,1,1]]

			],
        
    load: function(data){
        this.ctx = data.ctx;
        this.stats = data.stats;
        this.objects = data.objects;
        this.inputManager = new InputManager();
		this._scoreHTML = data.score;
		this._livesHTML = data.lives;
    },
    
    tick: function() {
        var wallCurrent = Date.now();
        var wallDelta = (wallCurrent - this.wallLastTimeStamp)/1000;
        this.wallLastTimeStamp = wallCurrent;
        
        var gameDelta = Math.min(wallDelta, this.maxStep);
        this.gameTime +=gameDelta;
        return gameDelta
    },
}

Engine.prototype.loop = function(){

    this.stats.update();
    var tecla = this.inputManager.update();
	
	this.ctx.fillStyle="rgb(0, 0, 255)";
	this.ctx.beginPath();
	this.ctx.fillRect(0, 0, 650, 400);
	this.ctx.closePath();
	this.ctx.fill();
    
	var tick = this.tick();
  	
	ball = this.objects[0];
	bat = this.objects[1];
	
	bat.update(tecla);
	
	if(tecla==32){
		this._ballIsMoving = true;
	}
	
	if(this._lives<0){
		this._ballIsMoving = false;
	}
	
	if(this._ballIsMoving){
		if(ball.update()==false){
			this.loseLife();
		}
		
		if(bat.collide(ball)==false){
			
			for(i = 0; i< this._block.length ;i++){
				if(this._block[i].collide(ball)){
					console.log("blocks "+ this._block.length);
					this._block.splice(i,1);
					this._score = this._score + 100;
					this._scoreHTML.innerHTML = "<div id = \"score\"><h1>" + this._score + "</h1></div>";;

					if(this._block.length==0){
						this.nextLevel(ball, bat);
					}
				}
			}
		
		}
		
	}else{
		ball._posX = bat._posX + 50;
	}
	

	
	if(this.i==1){
		var block = new Block(({posX:0, posY:0 , sizeX: 60 , sizeY:30 }));
		this._block = block.makeBlocks(this.levels, this._level, this._block);
	}

	for(i = 0; i< this._block.length ;i++){
		this._block[i].draw(this.ctx);
	}
	
	this.i++;
		
    ball.draw(this.ctx);
	bat.draw(this.ctx);

		
}

Engine.prototype.resetGame = function(){
	this._score = 0;
	this._scoreHTML.innerHTML = "<div id = \"score\"><h1>" + 0 + "</h1></div>";;

	this._lives = 3;
	this._livesHTML.innerHTML = "<div id = \"lives\"><h1>" + 3 + "</h1></div>";;

	this._level = 1;
	this._gameover = false;
	this._won = false; 
	this._block = [];
}
Engine.prototype.nextLevel = function(ball, bat){

	this._score = this._score + 100 * this._lives * this._level;
	this._scoreHTML.innerHTML = "<div id = \"score\"><h1>" + this._score + "</h1></div>";;

	ball.resetBall(bat);
	this._ballIsMoving = false;
	if(this._level < this._maxLevel){
		this._level = this._level + 1;
		this._block = new Array();
		var block = new Block(({posX:0, posY:0 , sizeX: 60 , sizeY:30 }));

		block.makeBlocks(this.levels, this._level, this._block);
	}else{
		this._won = true;
	}
}

Engine.prototype.loseLife = function(ball){
	console.log("loseLife");
	this.objects[0].resetBall(this.objects[1]);
	this._lives = this._lives - 1;
	this._livesHTML.innerHTML = "<div id = \"lives\"><h1>" + this._lives + "</h1></div>";;
	if(this._lives==0){
		_gameover = true;
	}
	this._ballIsMoving = false;
}

Engine.prototype.start = function(ctx){
    console.log("Starting Engine");
    var self = this;
    (function gameLoop(){
        self.loop();
        requestAnimateFrame(gameLoop, self.ctx.canvas);
    })();    
}
