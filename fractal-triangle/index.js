// 创建 canvas
const myCanvas = document.createElement("canvas");

// 计算高度
const height = Math.sqrt(1000 * 1000 - 500 * 500);

// 设置宽度和高度
myCanvas.width = 1000;
myCanvas.height = height;

document.body.appendChild(myCanvas);
const ctx = myCanvas.getContext("2d");

// 递归函数
function drawFractalTriangle(ctx, x1, y1, x2, y2, x3, y3, loop) {
  if (loop === 0) {
    // 基础情况：绘制简单的三角形
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.strokeStyle = "black";
    ctx.stroke();
  } else {
    // 计算每条边的中点
    const midX1 = (x1 + x2) / 2;
    const midY1 = (y1 + y2) / 2;
    const midX2 = (x2 + x3) / 2;
    const midY2 = (y2 + y3) / 2;
    const midX3 = (x1 + x3) / 2;
    const midY3 = (y1 + y3) / 2;

    // 递归绘制三个子三角形
    drawFractalTriangle(ctx, x1, y1, midX1, midY1, midX3, midY3, loop - 1); // 上方第一个三角形
    drawFractalTriangle(ctx, midX1, midY1, x2, y2, midX2, midY2, loop - 1); // 左下方第二个三角形
    drawFractalTriangle(ctx, midX3, midY3, midX2, midY2, x3, y3, loop - 1); // 右下方第三个三角形
  }
}

// 绘制初始三角形，并递归生成分形三角形
const x1 = 500,
  y1 = 0;
const x2 = 0,
  y2 = height;
const x3 = 1000,
  y3 = height;

// 设置递归次数
const loop = 7;

// 调用函数绘制分形三角形
drawFractalTriangle(ctx, x1, y1, x2, y2, x3, y3, loop);
