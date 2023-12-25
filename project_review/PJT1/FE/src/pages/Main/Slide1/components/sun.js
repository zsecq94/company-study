export class Sun {
  constructor() {
    this.radius = 150;
    this.lightColor = "#FFF9C6";
    this.darkColor = "#FFB200";
    this.activeIndex = null;
  }

  resize(stageWidth, stageHeight, activeIndex) {
    this.activeIndex = activeIndex;
    this.radius = 120;

    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.x = this.stageWidth - this.radius - 250;
    this.y = this.radius + 20;
  }

  draw(ctx, t) {
    // 태양 그리기
    const grd = ctx.createRadialGradient(
      this.x,
      this.y,
      this.radius * 0.1,
      this.x,
      this.y,
      this.radius
    );
    grd.addColorStop(0, this.lightColor);
    grd.addColorStop(1, this.darkColor);

    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }
}
