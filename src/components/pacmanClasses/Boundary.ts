export class Boundary {
  position: { x: number; y: number };
  width: number;
  height: number;
  c: CanvasRenderingContext2D | null;
  constructor({
    position,
    ctx,
  }: {
    position: { x: number; y: number };
    ctx: CanvasRenderingContext2D | null;
  }) {
    this.position = position;
    this.width = 40;
    this.height = 40;
    this.c = ctx;
  }
  draw() {
    this!.c!.fillStyle = "blue";
    this!.c!.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height,
    );
  }
}
