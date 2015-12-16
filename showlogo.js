var ShowLogo = function(){
  this.initialize.apply(this, arguments);
};

ShowLogo.prototype = {
  startTime: 0,
  intervalId: 0,
  canvas: null,
  position: null,
  ctx: null,
  src: null,

  initialize: function(canvas){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");

    this.reset();
  },

  start: function(func, src){
    this.src = src;

    // 出力先座標
    this.position = {
      dx: (this.canvas.clientWidth - this.src.naturalWidth) / 2,
      dy: (this.canvas.clientHeight - this.src.naturalHeight) / 2
    };
  
    this.stop();
    
    this.startTime = new Date().getTime();
    this.intervalId = setInterval(func.bind(this), 10);
  },
  
  stop: function(){
    this.reset();
    clearInterval(this.intervalId);
  },

  horizontalWave: function(){
    this.reset();
    
    var elapsedTime = new Date().getTime() - this.startTime;
    var pitch = (elapsedTime / 5) % 360;
    
    for(var i = 0; i < this.src.naturalHeight; i++){
      this.ctx.drawImage(this.src, 0, i, this.src.naturalWidth, 1, this.position.dx + 15 * Math.sin((i * 10 + pitch) * Math.PI / 180), this.position.dy + i, this.src.naturalWidth, 1);
    }
  },

  verticalWave: function(){
    this.reset();
    
    var elapsedTime = new Date().getTime() - this.startTime;
    var pitch = (elapsedTime / 5) % 360;
    
    for(var i = 0; i < this.src.naturalHeight; i += 0.3){
      this.ctx.drawImage(this.src, 0, i, this.src.naturalWidth, 1, this.position.dx, this.position.dy + i + 10 * Math.sin((i * 10 + pitch) * Math.PI / 180), this.src.naturalWidth, 1);
    }
  },

  waterfall: function(){
    this.reset();
    
    var now = new Date().getTime();
    var height = (now - this.startTime) / 30;
    
    if(this.src.naturalHeight <= height){
      clearInterval(this.intervalId);
      height = this.src.naturalHeight;
    }

    // 伸びない部分の描画
    this.ctx.drawImage(this.src, 0, this.src.naturalHeight - height, this.src.naturalWidth, height, this.position.dx, this.position.dy + this.src.naturalHeight - height, this.src.naturalWidth, height);
    // 伸びる部分の描画
    this.ctx.drawImage(this.src, 0, this.src.naturalHeight - height, this.src.naturalWidth, 1, this.position.dx, 0, this.src.naturalWidth, this.position.dy + this.src.naturalHeight - height);
  },

  slide: function(){
    this.reset();
    
    var now = new Date().getTime();
    var offset = (now - this.startTime) / 8;
    
    if(this.position.dx + this.src.naturalWidth <= offset){
      clearInterval(this.intervalId);
      offset = this.position.dx + this.src.naturalWidth;
    }

    for(var i = 0; i < this.src.naturalHeight; i += 2){
      this.ctx.drawImage(this.src, 0, i, this.src.naturalWidth, 1, offset - this.src.naturalWidth, this.position.dy + i, this.src.naturalWidth, 1);
    }
    for(var i = 1; i < this.src.naturalHeight; i += 2){
      this.ctx.drawImage(this.src, 0, i, this.src.naturalWidth, 1, this.canvas.clientWidth - offset, this.position.dy + i, this.src.naturalWidth, 1);
    }
  },

  slideAndWave: function(){
    this.reset();
    
    var now = new Date().getTime();
    var elapsedTime = now - this.startTime;
    var time = 1200;
    
    if(time <= elapsedTime){
      clearInterval(this.intervalId);
      elapsedTime = time;
    }
    
    for(var i = 0; i < this.src.naturalHeight; i += 2){
      this.ctx.drawImage(this.src, 0, i, this.src.naturalWidth, 1, this.position.dx + ((time - elapsedTime) / 30) * Math.sin((i * 10 + (elapsedTime / 1.5)) * Math.PI / 180), this.position.dy + i, this.src.naturalWidth, 1);
    }
    for(var i = 1; i < this.src.naturalHeight; i += 2){
      this.ctx.drawImage(this.src, 0, i, this.src.naturalWidth, 1, this.position.dx + ((time - elapsedTime) / 30) * Math.sin(-(i * 10 + (elapsedTime / 1.5)) * Math.PI / 180), this.position.dy + i, this.src.naturalWidth, 1);
    }
  },

  zoomOut: function(){
    this.reset();

    var now = new Date().getTime();
    var elapsedTime = now - this.startTime;
    var time = 1000;
    
    if(time <= elapsedTime){
      clearInterval(this.intervalId);
      elapsedTime = time;
    }

    this.ctx.drawImage(this.src, 0, 0, this.src.naturalWidth, this.src.naturalHeight, elapsedTime / 20 * 1.4, elapsedTime / 20, this.src.naturalWidth * 2 - elapsedTime / 20 * 2.8, this.src.naturalHeight * 3 - elapsedTime / 20 * 2);
  },

  zoomIn: function(){
    this.reset();

    var now = new Date().getTime();
    var elapsedTime = now - this.startTime;
    var time = 500;
    
    if(time <= elapsedTime){
      clearInterval(this.intervalId);
      elapsedTime = time;
    }

    var jotai = elapsedTime / 20;

    this.ctx.drawImage(this.src, 0, 0, this.src.naturalWidth, this.src.naturalHeight, this.src.naturalWidth - jotai * 2.8, 75 - jotai, jotai * 5.6, jotai * 2);
  },

  slideX: null,

  randomSlide: function(){
    if(this.slideX == null){
      this.slideX = new Array();
      for(var i = 0; i < this.src.naturalHeight; i++){
        this.slideX[i] = i;
      }

      var random = this.slideX.map(Math.random);
      this.slideX.sort(function(a, b) { return random[a] - random[b]; });
    }

    var now = new Date().getTime();
    var elapsedTime = now - this.startTime;
    var time = 1000;

    var jotai = elapsedTime / Math.max(time, elapsedTime) * this.src.naturalHeight;

    for(var i = 0; i < jotai; i++){
      this.ctx.drawImage(this.src, 0, this.slideX[i], this.src.naturalWidth, 1, this.position.dx, this.position.dy + this.slideX[i], this.src.naturalWidth, 1);
    }
    
    if(time <= elapsedTime){
      clearInterval(this.intervalId);
      this.slideX = null;
    }
  },
  
  randomDot: function(){
    if(this.slideX == null){
      this.slideX = [];
      for(var i = 0; i < 70; i++){
        this.slideX[i] = i;
      }
      
      var random = this.slideX.map(Math.random);
      this.slideX.sort(function(a, b) { return random[a] - random[b]; });
    }
    
    var now = new Date().getTime();
    var elapsedTime = now - this.startTime;
    var time = 1000;
    
    var jotai = elapsedTime / Math.max(time, elapsedTime) * 70;
    
    for(var i = 0; i < jotai; i++){
      var x = 10 * (this.slideX[i] % 14);
      var y = 10 * Math.floor(this.slideX[i] / 14, 10);
      this.ctx.drawImage(this.src, x, y, 10, 10, this.position.dx + x, this.position.dy + y, 10, 10);
    }
    
    if(time <= elapsedTime){
      clearInterval(this.intervalId)
      this.slideX = null;
    }
  },

  drawImage: function(image, sx, sy, sw, sh, dx, dy, dw, dh){
    this.ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
  },

  reset: function(){    
    this.ctx.fillStyle="#000000";
    this.ctx.fillRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
  }
};
