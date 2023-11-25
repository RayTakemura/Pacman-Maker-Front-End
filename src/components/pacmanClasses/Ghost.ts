export class Ghost {
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  color: string;
  radius: number;
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
    this.c = ctx;
  }

  draw(): void {
    this!.c!.beginPath();
    this!.c!.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    this!.c!.fillStyle = this.color;
    this!.c!.fill();
    this!.c!.closePath();
  }
  update(): void {
    this!.draw();
    this!.position!.x += this!.velocity!.x;
    this!.position!.y += this!.velocity!.y;
  }
}
