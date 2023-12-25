export class Ghost {
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  color: string;
  radius: number;
  prevCollisions = Array<string>();
  static speed = 2;
  static spawnSpeed = 1;
  scared: boolean;
  blink: boolean;
  // bodyImage: HTMLImageElement;
  // eyesUpDown: HTMLImageElement;
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
    this.blink = false;
    this.c = ctx;
  }

  draw(): void {
    // this!.c!.beginPath();
    // this!.c!.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    // this!.c!.fillStyle = this.scared ? "blue" : this.color;
    // this!.c!.fill();
    // this!.c!.closePath();
    const bodyImg = new Image();
    if (this.scared) {
      if(this.blink){
        bodyImg.src = '/img/ScaredGhostBlink.png';
      }else {
        bodyImg.src = `/img/ScaredGhost.png`;
      }
    } else {
      if (this.velocity.x > 0) {
        bodyImg.src = `/img/${this.color}GhostRight.png`;
      } else if (this.velocity.x < 0) {
        bodyImg.src = `/img/${this.color}GhostLeft.png`;
      } else if (this.velocity.y > 0) {
        bodyImg.src = `/img/${this.color}GhostDown.png`;
      } else if (this.velocity.y < 0) {
        bodyImg.src = `/img/${this.color}GhostUp.png`;
      } else {
        bodyImg.src = `/img/${this.color}Ghost.png`;
      }
    }
    this.c!.drawImage(
      bodyImg,
      this.position.x - this.radius,
      this.position.y - this.radius,
      this.radius * 2,
      this.radius * 2,
    );
  }
  update(): void {
    this!.draw();
    this!.position!.x += this!.velocity!.x;
    this!.position!.y += this!.velocity!.y;
  }
}
