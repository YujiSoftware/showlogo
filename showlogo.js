var ShowLogo = function(){
  this.initialize.apply(this, arguments);
};

ShowLogo.prototype = {
  startTime: 0,
  intervalId: 0,
  canvas: null,
  ctx: null,
  src: null,

  initialize: function(canvas){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
  },

  start: function(func, src){
    this.src = src;
  
    this.stop();
    
    this.startTime = new Date().getTime();
    this.intervalId = setInterval(func.bind(this), 10);
  },
  
  stop: function(){
    this.reset();
    clearInterval(this.intervalId);
  },

  horizontalWave: function(){
    // 出力先座標 (キャンバスの中央)
    var dx = (this.canvas.clientWidth - this.src.naturalWidth) / 2;
    var dy = (this.canvas.clientHeight - this.src.naturalHeight) / 2;
    
    var elapsedTime = new Date().getTime() - this.startTime;
    var pitch = (elapsedTime / 5) % 360;
    
    for(var i = 0; i < this.src.naturalHeight; i++){
      this.ctx.drawImage(this.src, 0, i, this.src.naturalWidth, 1, dx + 15 * Math.sin((i * 10 + pitch) * Math.PI / 180), dy + i, this.src.naturalWidth, 1);
    }
  },

  verticalWave: function(){
    this.reset();
    
    // 出力先座標 (キャンバスの中央)
    var dx = (this.canvas.clientWidth - this.src.naturalWidth) / 2;
    var dy = (this.canvas.clientHeight - this.src.naturalHeight) / 2;
    
    var elapsedTime = new Date().getTime() - this.startTime;
    var pitch = (elapsedTime / 5) % 360;
    
    for(var i = 0; i < this.src.naturalHeight; i += 0.3){
      this.ctx.drawImage(this.src, 0, i, this.src.naturalWidth, 1, dx, dy + i + 10 * Math.sin((i * 10 + pitch) * Math.PI / 180), this.src.naturalWidth, 1);
    }
  },

  waterfall: function(){
    this.reset();
    
    // 出力先座標 (キャンバスの中央)
    var dx = (this.canvas.clientWidth - this.src.naturalWidth) / 2;
    var dy = (this.canvas.clientHeight - this.src.naturalHeight) / 2;
    
    var now = new Date().getTime();
    var height = (now - this.startTime) / 30;
    
    if(this.src.naturalHeight <= height){
      clearInterval(this.intervalId);
      height = this.src.naturalHeight;
    }

    // 伸びない部分の描画
    this.ctx.drawImage(this.src, 0, this.src.naturalHeight - height, this.src.naturalWidth, height, dx, dy + this.src.naturalHeight - height, this.src.naturalWidth, height);
    // 伸びる部分の描画
    this.ctx.drawImage(this.src, 0, this.src.naturalHeight - height, this.src.naturalWidth, 1, dx, 0, this.src.naturalWidth, dy + this.src.naturalHeight - height);
  },

  slide: function(){
    this.reset();
    
    // 出力先座標 (キャンバスの中央)
    var dx = (this.canvas.clientWidth - this.src.naturalWidth) / 2;
    var dy = (this.canvas.clientHeight - this.src.naturalHeight) / 2;
    
    var now = new Date().getTime();
    var offset = (now - this.startTime) / 8;
    
    if(dx + this.src.naturalWidth <= offset){
      clearInterval(this.intervalId);
      offset = dx + this.src.naturalWidth;
    }

    for(var i = 0; i < this.src.naturalHeight; i += 2){
      this.ctx.drawImage(this.src, 0, i, this.src.naturalWidth, 1, offset - this.src.naturalWidth, dy + i, this.src.naturalWidth, 1);
    }
    for(var i = 1; i < this.src.naturalHeight; i += 2){
      this.ctx.drawImage(this.src, 0, i, this.src.naturalWidth, 1, this.canvas.clientWidth - offset, dy + i, this.src.naturalWidth, 1);
    }
  },

  reset: function(){    
    this.ctx.fillStyle="#000000";
    this.ctx.fillRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
  }
};