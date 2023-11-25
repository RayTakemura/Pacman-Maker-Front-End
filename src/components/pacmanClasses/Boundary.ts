export class Boundary {
  static width = 10;
  static height = 10;
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
    this.width = 10;
    this.height = 10;
    this.image = image;
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
    // this.c!.drawImage(this.image, this.position.x, this.position.y);
  }
}
