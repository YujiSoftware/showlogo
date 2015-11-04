function wave(){
  var canvas = document.getElementById('dest');
  var src = document.getElementById('src');
  var ctx = canvas.getContext('2d');
  
  ctx.fillStyle="#000000";
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

  // 出力先座標 (キャンバスの中央)
  var dx = (canvas.clientWidth - src.naturalWidth) / 2;
  var dy = (canvas.clientHeight - src.naturalHeight) / 2;
  
  for(var i = 0; i < src.naturalHeight; i++){
    ctx.drawImage(src, 0, i, src.naturalWidth, 1, dx + 15 * Math.sin((i * 10) * Math.PI / 180), dy + i, src.naturalWidth, 1);
  }
}

document.addEventListener("DOMContentLoaded", function(){ wave(); });
