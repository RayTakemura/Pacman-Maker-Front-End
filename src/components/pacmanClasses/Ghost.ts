export class Ghost {
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  color: string;
  radius: number;
  prevCollisions = Array<string>();
  static speed = 2;
  static spawnSpeed = 1;
  scared: boolean;
  c: CanvasRenderingContext2D | null;

  constructor({
    position,
    velocity,
    color = "red",
    ctx,
  }: {
    position: { x: number; y: number };
    velocity: { x: number; y: number };
    color: string;
    ctx: CanvasRenderingContext2D | null;
  }) {
    this.position = position;
    this.velocity = velocity;
    this.color = color;
    this.radius = 15;
    this.prevCollisions = Array<string>();
    // this.speed = 2;
    // this.spawnSpeed = 1;
    this.scared = false;
    this.c = ctx;
  }

  draw(): void {
    this!.c!.beginPath();
    this!.c!.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    this!.c!.fillStyle = this.scared ? "blue" : this.color;
    this!.c!.fill();
    this!.c!.closePath();
  }
  update(): void {
    this!.draw();
    this!.position!.x += this!.velocity!.x;
    this!.position!.y += this!.velocity!.y;
  }
}
