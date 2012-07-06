function InputManager() {
    this.keyState = [];
    this.keyCurrent = [];
    this.keyLast = [];
    this.tecla = 0;
    var self = this;


    window.addEventListener('keydown', function(ev){
        self.keyCurrent[ev.which] = true;
        self.keyState[ev.which] = true;
        self.tecla = ev.which;

    });
        window.addEventListener('keyup', function(ev){
        self.keyState[ev.which] = false;
    });
}


InputManager.prototype.update = function(){
    this.keyLast = this.keyCurrent;
    this.keyCurrent = this.keyState.slice(0);
    if(!this.isKeyDown(this.tecla)){
        this.tecla = 0;
    }
    return this.tecla;
};


InputManager.prototype.isKeyDown = function(key){
  return !!this.keyCurrent[key];
};


InputManager.prototype.isKeyTriggered = function(key){
  return !!this.keyCurrent[key] && !this.keyLast[key];
};


InputManager.prototype.isKeyReleased = function(key){
  return !this.keyCurrent[key] && !!this.keyLast[key];
};


