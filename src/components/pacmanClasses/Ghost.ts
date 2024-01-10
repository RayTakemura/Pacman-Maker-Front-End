export class Ghost {
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  color: string;
  radius: number;
  prevCollisions = Array<string>();
  static speed: number;
  static spawnSpeed = 1;
  scared: boolean;
  blink: boolean = false;
  invisible: boolean = false;
  ghostImages: {
    redUp: HTMLImageElement;
    redRight: HTMLImageElement;
    redDown: HTMLImageElement;
    redLeft: HTMLImageElement;
    pinkUp: HTMLImageElement;
    pinkRight: HTMLImageElement;
    pinkDown: HTMLImageElement;
    pinkLeft: HTMLImageElement;
    aquaUp: HTMLImageElement;
    aquaRight: HTMLImageElement;
    aquaDown: HTMLImageElement;
    aquaLeft: HTMLImageElement;
    orangeUp: HTMLImageElement;
    orangeRight: HTMLImageElement;
    orangeDown: HTMLImageElement;
    orangeLeft: HTMLImageElement;
    blink: HTMLImageElement;
    scared: HTMLImageElement;
  };
  // redUp: HTMLImageElement;
  // redRight: HTMLImageElement;
  // redDown: HTMLImageElement;
  // redLeft: HTMLImageElement;
  // pinkUp: HTMLImageElement;
  // pinkRight: HTMLImageElement;
  // pinkDown: HTMLImageElement;
  // pinkLeft: HTMLImageElement;
  // aquaUp: HTMLImageElement;
  // aquaRight: HTMLImageElement;
  // aquaDown: HTMLImageElement;
  // aquaLeft: HTMLImageElement;
  // orangeUp: HTMLImageElement;
  // orangeRight: HTMLImageElement;
  // orangeDown: HTMLImageElement;
  // orangeLeft: HTMLImageElement;
  c: CanvasRenderingContext2D | null;

  constructor({
    position,
    velocity,
    color = "red",
    speed = 2,
    ghostImages,
    ctx,
  }: {
    position: { x: number; y: number };
    velocity: { x: number; y: number };
    color: string;
    speed: number;
    ctx: CanvasRenderingContext2D | null;
  }) {
    this.position = position;
    this.velocity = velocity;
    this.color = color;
    this.radius = 15;
    this.prevCollisions = Array<string>();
    Ghost.speed = speed;
    this.ghostImages = ghostImages;
    // this.spawnSpeed = 1;
    this.scared = false;
    this.blink = false;
    this.c = ctx;

    // this.redUp = new Image();
    // this.redUp.src = "/img/redGhostUp.png";
    // this.redRight = new Image();
    // this.redRight.src = "/img/redGhostRight.png";
    // this.redDown = new Image();
    // this.redDown.src = "/img/redGhostDown.png";
    // this.redLeft = new Image();
    // this.redLeft.src = "/img/redGhostLeft.png";
    // this.pinkUp = new Image();
    // this.pinkUp.src = "/img/pinkGhostUp.png";
    // this.pinkRight = new Image();
    // this.pinkRight.src = "/img/pinkGhostRight.png";
    // this.pinkDown = new Image();
    // this.pinkDown.src = "/img/pinkGhostDown.png";
    // this.pinkLeft = new Image();
    // this.pinkLeft.src = "/img/pinkGhostLeft.png";
    // this.aquaUp = new Image();
    // this.aquaUp.src = "/img/aquaGhostUp.png";
    // this.aquaRight = new Image();
    // this.aquaRight.src = "/img/aquaGhostRight.png";
    // this.aquaDown = new Image();
    // this.aquaDown.src = "/img/aquaGhostDown.png";
    // this.aquaLeft = new Image();
    // this.aquaLeft.src = "/img/aquaGhostLeft.png";
    // this.orangeUp = new Image();
    // this.orangeUp.src = "/img/orangeGhostUp.png";
    // this.orangeRight = new Image();
    // this.orangeRight.src = "/img/orangeGhostRight.png";
    // this.orangeDown = new Image();
    // this.orangeDown.src = "/img/orangeGhostDown.png";
    // this.orangeLeft = new Image();
    // this.orangeLeft = "/img/orangeGhostLeft.png";
  }

  draw(): void {
    // this!.c!.beginPath();
    // this!.c!.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    // this!.c!.fillStyle = this.scared ? "blue" : this.color;
    // this!.c!.fill();
    // this!.c!.closePath();
    if (this.invisible) return;
    let bodyImg: HTMLImageElement;
    if (this.scared) {
      if (this.blink) {
        bodyImg = this.ghostImages.blink;
      } else {
        bodyImg = this.ghostImages.scared;
      }
    } else {
      // if (this.color === "red") {
      if (this.velocity.x > 0) {
        bodyImg = this.ghostImages[`${this.color}Right`];
      } else if (this.velocity.x < 0) {
        bodyImg = this.ghostImages[`${this.color}Left`];
      } else if (this.velocity.y > 0) {
        bodyImg = this.ghostImages[`${this.color}Down`];
        // bodyImg.src = `/img/${this.color}GhostDown.png`;
      } else if (this.velocity.y < 0) {
        bodyImg = this.ghostImages[`${this.color}Up`];
        // bodyImg.src = `/img/${this.color}GhostUp.png`;
      } else {
        bodyImg = this.ghostImages[`${this.color}Right`];
      }
      // }
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
