export class Player {
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  radius: number;
  radians: number;
  openRate: number;
  rotation: number;
  static speed: number;
  c: CanvasRenderingContext2D | null;

  constructor({
    position,
    velocity,
    speed,
    ctx,
  }: {
    position: { x: number; y: number };
    velocity: { x: number; y: number };
    speed: number;
    ctx: CanvasRenderingContext2D | null;
  }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = 15;
    this.radians = 0.75;
    this.openRate = 0.12;
    Player.speed = speed;
    this.rotation = 0;
    this.c = ctx;
  }

  draw(): void {
    this!.c!.save();
    this!.c!.translate(this.position.x, this.position.y);
    this!.c!.rotate(this.rotation);
    this!.c!.translate(-this.position.x, -this.position.y);
    this!.c!.beginPath();
    this!.c!.arc(
      this.position.x,
      this.position.y,
      this.radius,
      this.radians,
      Math.PI * 2 - this.radians,
    );
    this!.c!.lineTo(this.position.x, this.position.y);
    this!.c!.fillStyle = "yellow";
    this!.c!.fill();
    this!.c!.closePath();
    this!.c!.restore();
  }
  update(): void {
    this!.draw();
    this!.position!.x += this!.velocity!.x;
    this!.position!.y += this!.velocity!.y;
    // open close mouth
    if (this.radians < 0 || this.radians > 0.75) this.openRate = -this.openRate;
    this.radians += this.openRate;
  }
}
