export class Sun {
  constructor() {
    // 이게 줄어야 함
    this.radius = 50;
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.x = this.stageWidth - this.radius - 100;
    this.y = this.radius + 20;
  }

  draw(ctx, t) {
    ctx.fillStyle = "#FFB200";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }
}
