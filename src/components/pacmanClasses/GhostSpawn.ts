export class GhostSpawn {
  static width = 40;
  static height = 40;
  position: { x: number; y: number };
  width: number;
  height: number;
  image: HTMLImageElement;
  c: CanvasRenderingContext2D | null;
  constructor({
    position,
    image,
    ctx,
  }: {
    position: { x: number; y: number };
    image: HTMLImageElement;
    ctx: CanvasRenderingContext2D | null;
  }) {
    this.position = position;
    this.width = 40;
    this.height = 40;
    this.image = image;
    this.c = ctx;
  }
  draw() {
    // this!.c!.fillStyle = "blue";
    // this!.c!.fillRect(
    //   this.position.x,
    //   this.position.y,
    //   this.width,
    //   this.height,
    // );
  }
}
