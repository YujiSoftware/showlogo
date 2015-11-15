var startTime;
var intervalId;

function horizontalWave(){
  var canvas = document.getElementById('dest');
  var src = document.getElementById('src');
  var ctx = canvas.getContext('2d');
  
  // 出力先座標 (キャンバスの中央)
  var dx = (canvas.clientWidth - src.naturalWidth) / 2;
  var dy = (canvas.clientHeight - src.naturalHeight) / 2;
  
  var elapsedTime = new Date().getTime() - startTime;
  var pitch = (elapsedTime / 5) % 360;
  
  for(var i = 0; i < src.naturalHeight; i++){
    ctx.drawImage(src, 0, i, src.naturalWidth, 1, dx + 15 * Math.sin((i * 10 + pitch) * Math.PI / 180), dy + i, src.naturalWidth, 1);
  }
}

function verticalWave(){
  var canvas = document.getElementById('dest');
  var src = document.getElementById('src');
  var ctx = canvas.getContext('2d');

  reset();
  
  // 出力先座標 (キャンバスの中央)
  var dx = (canvas.clientWidth - src.naturalWidth) / 2;
  var dy = (canvas.clientHeight - src.naturalHeight) / 2;
  
  var elapsedTime = new Date().getTime() - startTime;
  var pitch = (elapsedTime / 5) % 360;
  
  for(var i = 0; i < src.naturalHeight; i += 0.3){
    ctx.drawImage(src, 0, i, src.naturalWidth, 1, dx, dy + i + 10 * Math.sin((i * 10 + pitch) * Math.PI / 180), src.naturalWidth, 1);
  }
}

function waterfall(){
  var canvas = document.getElementById('dest');
  var src = document.getElementById('src');
  var ctx = canvas.getContext('2d');

  reset();
  
  // 出力先座標 (キャンバスの中央)
  var dx = (canvas.clientWidth - src.naturalWidth) / 2;
  var dy = (canvas.clientHeight - src.naturalHeight) / 2;
  
  var now = new Date().getTime();
  var height = (now - startTime) / 30;
  
  if(src.naturalHeight <= height){
    clearInterval(intervalId);
    height = src.naturalHeight;
  }

  // 伸びない部分の描画
  ctx.drawImage(src, 0, src.naturalHeight - height, src.naturalWidth, height, dx, dy + src.naturalHeight - height, src.naturalWidth, height);
  // 伸びる部分の描画
  ctx.drawImage(src, 0, src.naturalHeight - height, src.naturalWidth, 1, dx, 0, src.naturalWidth, dy + src.naturalHeight - height);
}

function slide(){
  var canvas = document.getElementById('dest');
  var src = document.getElementById('src');
  var ctx = canvas.getContext('2d');

  reset();
  
  // 出力先座標 (キャンバスの中央)
  var dx = (canvas.clientWidth - src.naturalWidth) / 2;
  var dy = (canvas.clientHeight - src.naturalHeight) / 2;
  
  var now = new Date().getTime();
  var offset = (now - startTime) / 8;
  
  if(dx + src.naturalWidth <= offset){
    clearInterval(intervalId);
    offset = dx + src.naturalWidth;
  }

  for(var i = 0; i < src.naturalHeight; i += 2){
    ctx.drawImage(src, 0, i, src.naturalWidth, 1, offset - src.naturalWidth, dy + i, src.naturalWidth, 1);
  }
  for(var i = 1; i < src.naturalHeight; i += 2){
    ctx.drawImage(src, 0, i, src.naturalWidth, 1, (src.naturalWidth * 2) - offset, dy + i, src.naturalWidth, 1);
  }
}

function reset(){
  var canvas = document.getElementById('dest');
  var src = document.getElementById('src');
  var ctx = canvas.getContext('2d');
  
  ctx.fillStyle="#000000";
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}