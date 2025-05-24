self.onmessage = function(evt) {
  const canvas = evt.data.canvas;
  const ctx = canvas.getContext('2d');
  let hue = 0;

  function draw() {
    ctx.fillStyle = `hsl(${hue}, 50%, 50%)`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 绘制一些动画图形
    ctx.beginPath();
    ctx.arc(
      canvas.width / 2 + Math.cos(hue / 50) * 50,
      canvas.height / 2 + Math.sin(hue / 50) * 50,
      30,
      0,
      2 * Math.PI
    );
    ctx.fillStyle = 'white';
    ctx.fill();

    hue = (hue + 1) % 360;
    self.postMessage({ hue });
    requestAnimationFrame(draw);

    // var imageBitmap = canvas.transferToImageBitmap();  
    // console.log(imageBitmap)
  }

  draw();
 
};
