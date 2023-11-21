export class Pellet {
  position: { x: number; y: number };
  radius: number;
  c: CanvasRenderingContext2D | null;

  constructor({
    position,
    ctx,
  }: {
    position: { x: number; y: number };
    ctx: CanvasRenderingContext2D | null;
  }) {
    this.position = position;
    this.radius = 3;
    this.c = ctx;
  }

  draw(): void {
    this!.c!.beginPath();
    this!.c!.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    this!.c!.fillStyle = "white";
    this!.c!.fill();
    this!.c!.closePath();
  }
  update(): void {
    this!.draw();
  }
}
