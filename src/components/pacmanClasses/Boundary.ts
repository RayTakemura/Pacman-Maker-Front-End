export class Boundary {
  static width = 40;
  static height = 40;
  position: { x: number; y: number };
  width: number;
  height: number;
  image: HTMLImageElement;
  pattern: string | null;
  c: CanvasRenderingContext2D | null;
  constructor({
    position,
    image,
    ctx,
    pattern,
  }: {
    position: { x: number; y: number };
    image: HTMLImageElement;
    ctx: CanvasRenderingContext2D | null;
    pattern: string | null;
  }) {
    this.position = position;
    this.width = 40;
    this.height = 40;
    this.image = image;
    this.c = ctx;
    this.pattern = pattern;
  }
  draw() {
    // this!.c!.fillStyle = "blue";
    // this!.c!.fillRect(
    //   this.position.x,
    //   this.position.y,
    //   this.width,
    //   this.height,
    // );
    // if(!this.pattern) {
    if (this.pattern === "j") {
      this.c!.drawImage(
        this.image,
        this.position.x,
        this.position.y,
        this.width,
        5,
      );
    } else if (this.pattern === "m") {
      this.c!.drawImage(
        this.image,
        this.position.x,
        this.position.y + this.height - 3,
        this.width,
        3,
      );
    }else{
      this.c!.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
    // }
  }
}
