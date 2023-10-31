export class Boundary {
  position: Array<number>;
  width: number;
  height: number;
  c: CanvasRenderingContext2D | null;
  constructor({
    position,
    ctx,
  }: {
    position: Array<number>;
    ctx: CanvasRenderingContext2D | null;
  }) {
    this.position = position;
    this.width = 40;
    this.height = 40;
    this.c = ctx;
  }
  draw() {}
}
