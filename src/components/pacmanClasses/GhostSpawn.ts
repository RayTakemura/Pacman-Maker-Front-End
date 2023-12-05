export class GhostSpawn {
  static width = 40;
  static height = 40;
  position: { x: number; y: number };
  width: number;
  height: number;
  pattern: string;
  image: HTMLImageElement;
  c: CanvasRenderingContext2D | null;
  constructor({
    position,
    pattern,
    image,
    ctx,
  }: {
    position: { x: number; y: number };
    pattern: string;
    image: HTMLImageElement;
    ctx: CanvasRenderingContext2D | null;
  }) {
    this.position = position;
    this.width = 40;
    this.height = 40;
    this.pattern = pattern;
    this.image = image;
    this.c = ctx;
  }
  draw() {
    // this!.c!.clearRect(
    //   this.position.x,
    //   this.position.y,
    //   this.width,
    //   this.height,
    // );
    // this!.c!.lineWidth = 4;
    // this!.c!.lineJoin = "round";
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
    } else {
      this.c!.drawImage(
        this.image,
        this.position.x,
        this.position.y,
        this.width,
        this.height,
      );
    }

    // this!.c!.fillStyle = "blue";
    // this!.c!.fillRect(
    //   this.position.x,
    //   this.position.y,
    //   this.width,
    //   this.height,
    // );
  }
}
