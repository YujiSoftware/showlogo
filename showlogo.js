var ShowLogo = function(){
};

ShowLogo.prototype = {
  startTime: 0,
  intervalId: 0,

  start: function(func){
    this.startTime = new Date().getTime();
    this.intervalId = setInterval(func.bind(this), 10);
  },

  horizontalWave: function(){
    var canvas = document.getElementById('dest');
    var src = document.getElementById('src');
    var ctx = canvas.getContext('2d');
    
    // 出力先座標 (キャンバスの中央)
    var dx = (canvas.clientWidth - src.naturalWidth) / 2;
    var dy = (canvas.clientHeight - src.naturalHeight) / 2;
    
    var elapsedTime = new Date().getTime() - this.startTime;
    var pitch = (elapsedTime / 5) % 360;
    
    for(var i = 0; i < src.naturalHeight; i++){
      ctx.drawImage(src, 0, i, src.naturalWidth, 1, dx + 15 * Math.sin((i * 10 + pitch) * Math.PI / 180), dy + i, src.naturalWidth, 1);
    }
  },

  verticalWave: function(){
    var canvas = document.getElementById('dest');
    var src = document.getElementById('src');
    var ctx = canvas.getContext('2d');

    this.reset();
    
    // 出力先座標 (キャンバスの中央)
    var dx = (canvas.clientWidth - src.naturalWidth) / 2;
    var dy = (canvas.clientHeight - src.naturalHeight) / 2;
    
    var elapsedTime = new Date().getTime() - this.startTime;
    var pitch = (elapsedTime / 5) % 360;
    
    for(var i = 0; i < src.naturalHeight; i += 0.3){
      ctx.drawImage(src, 0, i, src.naturalWidth, 1, dx, dy + i + 10 * Math.sin((i * 10 + pitch) * Math.PI / 180), src.naturalWidth, 1);
    }
  },

  waterfall: function(){
    var canvas = document.getElementById('dest');
    var src = document.getElementById('src');
    var ctx = canvas.getContext('2d');

    this.reset();
    
    // 出力先座標 (キャンバスの中央)
    var dx = (canvas.clientWidth - src.naturalWidth) / 2;
    var dy = (canvas.clientHeight - src.naturalHeight) / 2;
    
    var now = new Date().getTime();
    var height = (now - this.startTime) / 30;
    
    if(src.naturalHeight <= height){
      clearInterval(this.intervalId);
      height = src.naturalHeight;
    }

    // 伸びない部分の描画
    ctx.drawImage(src, 0, src.naturalHeight - height, src.naturalWidth, height, dx, dy + src.naturalHeight - height, src.naturalWidth, height);
    // 伸びる部分の描画
    ctx.drawImage(src, 0, src.naturalHeight - height, src.naturalWidth, 1, dx, 0, src.naturalWidth, dy + src.naturalHeight - height);
  },

  slide: function(){
    var canvas = document.getElementById('dest');
    var src = document.getElementById('src');
    var ctx = canvas.getContext('2d');

    this.reset();
    
    // 出力先座標 (キャンバスの中央)
    var dx = (canvas.clientWidth - src.naturalWidth) / 2;
    var dy = (canvas.clientHeight - src.naturalHeight) / 2;
    
    var now = new Date().getTime();
    var offset = (now - this.startTime) / 8;
    
    if(dx + src.naturalWidth <= offset){
      clearInterval(this.intervalId);
      offset = dx + src.naturalWidth;
    }

    for(var i = 0; i < src.naturalHeight; i += 2){
      ctx.drawImage(src, 0, i, src.naturalWidth, 1, offset - src.naturalWidth, dy + i, src.naturalWidth, 1);
    }
    for(var i = 1; i < src.naturalHeight; i += 2){
      ctx.drawImage(src, 0, i, src.naturalWidth, 1, canvas.clientWidth - offset, dy + i, src.naturalWidth, 1);
    }
  },

  reset: function(){
    var canvas = document.getElementById('dest');
    var src = document.getElementById('src');
    var ctx = canvas.getContext('2d');
    
    ctx.fillStyle="#000000";
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  },
  
  stop: function(){
    this.reset();
    clearInterval(this.intervalId);
  }
};