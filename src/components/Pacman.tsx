import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Boundary,
  Player,
  Pellet,
  Ghost,
  PowerUp,
  GhostSpawn,
} from "./pacmanClasses/index";
import InGameScore from "./InGameScore";
type pacProps = {
  pacSpeed: number;
  ghostSpeed: number;
  closeGame: () => void;
};
const Pacman: React.FC<pacProps> = ({ pacSpeed, ghostSpeed, closeGame }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);
  const [score, setScore] = useState<number>(0);
  function addScore(newScore: number): void {
    setScore((prevScore) => {
      return prevScore + newScore;
    });
  }
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameCleared, setGameCleared] = useState<boolean>(false);

  // const ghostImages = {
  //   redUp: HTMLImageElement,
  //   redRight: HTMLImageElement,
  //   redDown: HTMLImageElement,
  //   redLeft: HTMLImageElement,
  //   pinkUp: HTMLImageElement,
  //   pinkRight: HTMLImageElement,
  //   pinkDown: HTMLImageElement,
  //   pinkLeft: HTMLImageElement,
  //   aquaUp: HTMLImageElement,
  //   aquaRight: HTMLImageElement,
  //   aquaDown: HTMLImageElement,
  //   aquaLeft: HTMLImageElement,
  //   orangeUp: HTMLImageElement,
  //   orangeRight: HTMLImageElement,
  //   orangeDown: HTMLImageElement,
  //   orangeLeft: HTMLImageElement,
  //   blink: HTMLImageElement,
  //   scared: HTMLImageElement,
  // };
  const ghostImages: { [key: string]: HTMLImageElement } = {};
  ghostImages.redUp = new Image();
  ghostImages.redUp.src = "/img/redGhostUp.png";
  ghostImages.redRight = new Image();
  ghostImages.redRight.src = "/img/redGhostRight.png";
  ghostImages.redDown = new Image();
  ghostImages.redDown.src = "/img/redGhostDown.png";
  ghostImages.redLeft = new Image();
  ghostImages.redLeft.src = "/img/redGhostLeft.png";
  ghostImages.pinkUp = new Image();
  ghostImages.pinkUp.src = "/img/pinkGhostUp.png";
  ghostImages.pinkRight = new Image();
  ghostImages.pinkRight.src = "/img/pinkGhostRight.png";
  ghostImages.pinkDown = new Image();
  ghostImages.pinkDown.src = "/img/pinkGhostDown.png";
  ghostImages.pinkLeft = new Image();
  ghostImages.pinkLeft.src = "/img/pinkGhostLeft.png";
  ghostImages.aquaUp = new Image();
  ghostImages.aquaUp.src = "/img/aquaGhostUp.png";
  ghostImages.aquaRight = new Image();
  ghostImages.aquaRight.src = "/img/aquaGhostRight.png";
  ghostImages.aquaDown = new Image();
  ghostImages.aquaDown.src = "/img/aquaGhostDown.png";
  ghostImages.aquaLeft = new Image();
  ghostImages.aquaLeft.src = "/img/aquaGhostLeft.png";
  ghostImages.orangeUp = new Image();
  ghostImages.orangeUp.src = "/img/orangeGhostUp.png";
  ghostImages.orangeRight = new Image();
  ghostImages.orangeRight.src = "/img/orangeGhostRight.png";
  ghostImages.orangeDown = new Image();
  ghostImages.orangeDown.src = "/img/orangeGhostDown.png";
  ghostImages.orangeLeft = new Image();
  ghostImages.orangeLeft.src = "/img/orangeGhostLeft.png";
  ghostImages.blink = new Image();
  ghostImages.blink.src = "/img/ScaredGhostBlink.png";
  ghostImages.scared = new Image();
  ghostImages.scared.src = "/img/ScaredGhost.png";
  function startGame() {
    let spawnEntrance: { x: number; y: number };
    // console.log("beginning startGame");
    const map = [
      ["1", "-", "-", "-", "-", "-", "-", "-", "-", "-", "2"],
      ["|", "p", ".", ".", ".", ".", ".", ".", ".", "p", "|"],
      ["|", ".", "b", ".", "[", "7", "]", ".", "b", ".", "|"],
      ["|", ".", ".", ".", ".", "|", ".", ".", ".", ".", "|"],
      ["|", ".", "[", "]", ".", "_", ".", "[", "]", ".", "|"],
      ["|", ".", ".", ".", ".", ".", ".", ".", ".", ".", "|"],
      ["|", ".", "^", ".", "i", "j", "k", ".", "^", ".", "|"],
      ["|", ".", "_", ".", "l", "m", "n", ".", "_", ".", "|"],
      ["|", ".", ".", ".", ".", " ", ".", ".", ".", ".", "|"],
      ["|", ".", "[", "]", ".", "^", ".", "[", "]", ".", "|"],
      ["|", ".", ".", ".", ".", "|", ".", ".", ".", ".", "|"],
      ["|", ".", "b", ".", "[", "5", "]", ".", "b", ".", "|"],
      ["|", "p", ".", ".", ".", ".", ".", ".", ".", "p", "|"],
      ["3", "-", "-", "-", "-", "-", "-", "-", "-", "-", "4"],
    ];
    const boundaries = Array<Boundary>();
    const pellets = Array<Pellet>();
    const powerUps = Array<PowerUp>();
    const ghosts = Array<Ghost>();
    ghosts.push(
      new Ghost({
        position: {
          x: Boundary.width * 5 + Boundary.width / 2,
          y: Boundary.height * 5 + Boundary.height / 2,
        },
        velocity: { x: ghostSpeed, y: 0 },
        color: "red",
        speed: ghostSpeed,
        ghostImages: ghostImages,
        ctx: canvasCtxRef.current,
      }),
      new Ghost({
        position: {
          x: Boundary.width * 5 + Boundary.width / 2,
          y: Boundary.height * 7 + Boundary.height / 2,
        },
        velocity: {
          x: 0,
          y: -1,
        },
        color: "pink",
        speed: ghostSpeed,
        ghostImages: ghostImages,
        ctx: canvasCtxRef.current,
      }),
      new Ghost({
        position: {
          x: Boundary.width * 4 + Boundary.width / 2,
          y: Boundary.height * 6 + Boundary.height / 2,
        },
        velocity: {
          x: 0,
          y: -1,
        },
        color: "aqua",
        speed: ghostSpeed,
        ghostImages: ghostImages,
        ctx: canvasCtxRef.current,
      }),
      new Ghost({
        position: {
          x: Boundary.width * 6 + Boundary.width / 2,
          y: Boundary.height * 6 + Boundary.height / 2,
        },
        velocity: {
          x: 0,
          y: -1,
        },
        color: "orange",
        speed: ghostSpeed,
        ghostImages: ghostImages,
        ctx: canvasCtxRef.current,
      }),
    );
    const player = new Player({
      position: {
        x: Boundary.width * 5 + Boundary.width / 2,
        y: Boundary.height * 8 + Boundary.height / 2,
      },
      velocity: {
        x: 0,
        y: 0,
      },
      speed: pacSpeed,
      ctx: canvasCtxRef.current,
    });
    function createImage(src: string) {
      const image = new Image();
      image.src = src;
      return image;
    }

    map.forEach((row, i) => {
      row.forEach((symbol, j) => {
        switch (symbol) {
          case "-":
            boundaries.push(
              new Boundary({
                position: {
                  x: Boundary.width * j,
                  y: Boundary.height * i,
                },
                image: createImage("/img/pipeHorizontal.png"),
                ctx: canvasCtxRef.current,
                pattern: null,
              }),
            );
            break;
          case "|":
            boundaries.push(
              new Boundary({
                position: {
                  x: Boundary.width * j,
                  y: Boundary.height * i,
                },
                image: createImage("/img/pipeVertical.png"),
                ctx: canvasCtxRef.current,
                pattern: null,
              }),
            );
            break;
          case "1":
            boundaries.push(
              new Boundary({
                position: {
                  x: Boundary.width * j,
                  y: Boundary.height * i,
                },
                image: createImage("/img/pipeCorner1.png"),
                ctx: canvasCtxRef.current,
                pattern: null,
              }),
            );
            break;
          case "2":
            boundaries.push(
              new Boundary({
                position: {
                  x: Boundary.width * j,
                  y: Boundary.height * i,
                },
                image: createImage("/img/pipeCorner2.png"),
                ctx: canvasCtxRef.current,
                pattern: null,
              }),
            );
            break;
          case "3":
            boundaries.push(
              new Boundary({
                position: {
                  x: Boundary.width * j,
                  y: Boundary.height * i,
                },
                image: createImage("/img/pipeCorner3.png"),
                ctx: canvasCtxRef.current,
                pattern: null,
              }),
            );
            break;
          case "4":
            boundaries.push(
              new Boundary({
                position: {
                  x: Boundary.width * j,
                  y: Boundary.height * i,
                },
                image: createImage("/img/pipeCorner4.png"),
                ctx: canvasCtxRef.current,
                pattern: null,
              }),
            );
            break;
          case "b":
            boundaries.push(
              new Boundary({
                position: {
                  x: Boundary.width * j,
                  y: Boundary.height * i,
                },
                image: createImage("/img/block.png"),
                ctx: canvasCtxRef.current,
                pattern: null,
              }),
            );
            break;
          case "[":
            boundaries.push(
              new Boundary({
                position: {
                  x: Boundary.width * j,
                  y: Boundary.height * i,
                },
                image: createImage("/img/capLeft.png"),
                ctx: canvasCtxRef.current,
                pattern: null,
              }),
            );
            break;
          case "]":
            boundaries.push(
              new Boundary({
                position: {
                  x: Boundary.width * j,
                  y: Boundary.height * i,
                },
                image: createImage("/img/capRight.png"),
                ctx: canvasCtxRef.current,
                pattern: null,
              }),
            );
            break;
          case "_":
            boundaries.push(
              new Boundary({
                position: {
                  x: Boundary.width * j,
                  y: Boundary.height * i,
                },
                image: createImage("/img/capBottom.png"),
                ctx: canvasCtxRef.current,
                pattern: null,
              }),
            );
            break;
          case "^":
            boundaries.push(
              new Boundary({
                position: {
                  x: Boundary.width * j,
                  y: Boundary.height * i,
                },
                image: createImage("/img/capTop.png"),
                ctx: canvasCtxRef.current,
                pattern: null,
              }),
            );
            break;
          case "+":
            boundaries.push(
              new Boundary({
                position: {
                  x: Boundary.width * j,
                  y: Boundary.height * i,
                },
                image: createImage("/img/pipeCross.png"),
                ctx: canvasCtxRef.current,
                pattern: null,
              }),
            );
            break;
          case "5":
            boundaries.push(
              new Boundary({
                position: {
                  x: Boundary.width * j,
                  y: Boundary.height * i,
                },
                image: createImage("/img/pipeConnectorTop.png"),
                ctx: canvasCtxRef.current,
                pattern: null,
              }),
            );
            break;
          case "6":
            boundaries.push(
              new Boundary({
                position: {
                  x: Boundary.width * j,
                  y: Boundary.height * i,
                },
                image: createImage("/img/pipeConnectorRight.png"),
                ctx: canvasCtxRef.current,
                pattern: null,
              }),
            );
            break;
          case "7":
            boundaries.push(
              new Boundary({
                position: {
                  x: Boundary.width * j,
                  y: Boundary.height * i,
                },
                image: createImage("/img/pipeConnectorBottom.png"),
                ctx: canvasCtxRef.current,
                pattern: null,
              }),
            );
            break;
          case "8":
            boundaries.push(
              new Boundary({
                position: {
                  x: Boundary.width * j,
                  y: Boundary.height * i,
                },
                image: createImage("./../../public/img/pipeConnectorLeft.png"),
                ctx: canvasCtxRef.current,
                pattern: null,
              }),
            );
            break;
          case ".":
            pellets.push(
              new Pellet({
                position: {
                  x: Boundary.width * j + Boundary.width / 2,
                  y: Boundary.height * i + Boundary.height / 2,
                },
                ctx: canvasCtxRef.current,
              }),
            );
            break;
          case "p":
            powerUps.push(
              new PowerUp({
                position: {
                  x: Boundary.width * j + Boundary.width / 2,
                  y: Boundary.height * i + Boundary.height / 2,
                },
                ctx: canvasCtxRef.current,
              }),
            );
            break;
          case "i":
            boundaries.push(
              new Boundary({
                position: {
                  x: Boundary.width * j,
                  y: Boundary.height * i,
                },
                image: createImage("/img/spawn-i.svg"),
                pattern: "i",
                ctx: canvasCtxRef.current,
              }),
            );
            break;
          case "j":
            spawnEntrance = {
              x: Boundary.width * j + Math.floor(Boundary.width / 2),
              y: Boundary.height * (i - 1) + Math.floor(Boundary.height / 2),
            };
            // console.log("spawnEntrance", spawnEntrance);

            boundaries.push(
              new Boundary({
                position: {
                  x: Boundary.width * j,
                  y: Boundary.height * i,
                },
                image: createImage("/img/spawn-j.svg"),
                pattern: "j",
                ctx: canvasCtxRef.current,
              }),
            );
            break;
          case "k":
            boundaries.push(
              new Boundary({
                position: {
                  x: Boundary.width * j,
                  y: Boundary.height * i,
                },
                image: createImage("/img/spawn-k.svg"),
                pattern: "k",
                ctx: canvasCtxRef.current,
              }),
            );
            break;
          case "l":
            boundaries.push(
              new Boundary({
                position: {
                  x: Boundary.width * j,
                  y: Boundary.height * i,
                },
                image: createImage("/img/spawn-l.svg"),
                pattern: "l",
                ctx: canvasCtxRef.current,
              }),
            );
            break;
          case "m":
            boundaries.push(
              new Boundary({
                position: {
                  x: Boundary.width * j,
                  y: Boundary.height * i,
                },
                image: createImage("/img/spawn-m.svg"),
                pattern: "m",
                ctx: canvasCtxRef.current,
              }),
            );
            break;
          case "n":
            boundaries.push(
              new Boundary({
                position: {
                  x: Boundary.width * j,
                  y: Boundary.height * i,
                },
                image: createImage("/img/spawn-n.svg"),
                pattern: "n",
                ctx: canvasCtxRef.current,
              }),
            );
            break;
        }
      });
    });
    let lastKey = "";

    const keys = {
      w: {
        pressed: false,
      },
      a: {
        pressed: false,
      },
      s: {
        pressed: false,
      },
      d: {
        pressed: false,
      },
    };
    function circleCollidesWithRectangle({
      circle,
      rectangle,
    }: {
      circle: Player | Ghost;
      rectangle: Boundary | GhostSpawn;
    }) {
      // const padding = Boundary.width / 2 - circle.radius;
      const padding = Boundary.width / 2 - circle.radius - 1;
      // const padding = Boundary.width / 2 - circle.radius - 2;
      return (
        circle.position.y - circle.radius + circle.velocity.y <=
          rectangle.position.y + rectangle.height + padding &&
        circle.position.x + circle.radius + circle.velocity.x >=
          rectangle.position.x - padding &&
        circle.position.y + circle.radius + circle.velocity.y >=
          rectangle.position.y - padding &&
        circle.position.x - circle.radius + circle.velocity.x <=
          rectangle.position.x + rectangle.width + padding
      );
    }
    let animationId: number;
    const ghostLaps = {
      red: 1,
      pink: 0,
      aqua: 0,
      orange: 0,
    };
    const ghostLapFinish = {
      red: 1,
      pink: 3,
      aqua: 6,
      orange: 9,
    };
    const timeoutObj: { [key: string]: number } = {};
    const blinkObj: { [key: string]: number } = {};
    const blinkTimeoutObj: { [key: string]: number } = {};
    let ghostScore: number = 200;
    function animate() {
      animationId = requestAnimationFrame(animate);
      // console.log(animationId);
      const ctx = canvasCtxRef.current;
      const canvas = canvasRef.current;
      ctx?.clearRect(0, 0, canvas?.width ?? 0, canvas?.height ?? 0);
      if (keys.w.pressed && lastKey === "w") {
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          const tempPlayer = new Player({
            position: player.position,
            velocity: { x: 0, y: -5 },
            speed: pacSpeed,
            ctx: canvasCtxRef.current,
          });
          if (
            circleCollidesWithRectangle({
              circle: tempPlayer,
              rectangle: boundary,
            })
          ) {
            player!.velocity!.y = 0;
            break;
          } else {
            player!.velocity!.y = -Player.speed;
          }
        }
      } else if (keys.a.pressed && lastKey === "a") {
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          const tempPlayer = new Player({
            position: player.position,
            velocity: { x: -5, y: 0 },
            speed: pacSpeed,
            ctx: canvasCtxRef.current,
          });
          if (
            circleCollidesWithRectangle({
              circle: tempPlayer,
              rectangle: boundary,
            })
          ) {
            player!.velocity!.x = 0;
            break;
          } else {
            player!.velocity!.x = -Player.speed;
          }
        }
      } else if (keys.s.pressed && lastKey === "s") {
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          const tempPlayer = new Player({
            position: player.position,
            velocity: { x: 0, y: 5 },
            speed: pacSpeed,
            ctx: canvasCtxRef.current,
          });
          if (
            circleCollidesWithRectangle({
              circle: tempPlayer,
              rectangle: boundary,
            })
          ) {
            player!.velocity!.y = 0;
            break;
          } else {
            player!.velocity!.y = Player.speed;
          }
        }
      } else if (keys.d.pressed && lastKey === "d") {
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          const tempPlayer = new Player({
            position: player.position,
            velocity: { x: 5, y: 0 },
            speed: pacSpeed,
            ctx: canvasCtxRef.current,
          });
          if (
            circleCollidesWithRectangle({
              circle: tempPlayer,
              rectangle: boundary,
            })
          ) {
            player!.velocity!.x = 0;
            break;
          } else {
            player!.velocity!.x = Player.speed;
          }
        }
      }
      for (let i = powerUps.length - 1; i >= 0; i--) {
        const powerUp = powerUps[i];
        powerUp.draw();
        if (
          Math.hypot(
            powerUp.position.x - player.position.x,
            powerUp.position.y - player.position.y,
          ) <
          powerUp.radius + player.radius
        ) {
          // save settimeout value for each ghost
          // if settimeout value is set, cancel it and create a new one
          // else just settimeout
          powerUps.splice(i, 1);
          ghosts.forEach((ghost) => {
            ghost.blink = false;
            ghost.scared = true;
            // if(ghostSpeed === 1) {
            //   ghost.speed = 0.7; 
            // }else {
            //   ghost.speed = ghostSpeed - 1;
            // }
            // if(ghost.velocity.x < 0){
            //   ghost.velocity.x = -ghost.speed * 0.8
            // } else if (ghost.velocity.x > 0){
            //   ghost.velocity.x = ghost.speed * 0.8
            // } else if (ghost.velocity.y < 0){
            //   ghost.velocity.y = -ghost.speed * 0.8;
            // } else {
            //   ghost.velocity.y = ghost.speed * 0.8;
            // }
            clearTimeout(timeoutObj[ghost.color]);
            timeoutObj[ghost.color] = 0;
            timeoutObj[ghost.color] = setTimeout(() => {
              // ghost.speed = ghostSpeed;
              // if(ghost.velocity.x < 0){
              //   ghost.velocity.x = -ghost.speed
              // } else if (ghost.velocity.x > 0){
              //   ghost.velocity.x = ghost.speed
              // } else if (ghost.velocity.y < 0){
              //   ghost.velocity.y = -ghost.speed;
              // } else {
              //   ghost.velocity.y = ghost.speed;
              // }
              ghostScore = 200;
              ghost.scared = false;
            }, 10e3);
            clearInterval(blinkObj[ghost.color]);
            blinkObj[ghost.color] = 0;
            clearTimeout(blinkTimeoutObj[ghost.color]);
            blinkTimeoutObj[ghost.color] = 0;
            blinkTimeoutObj[ghost.color] = setTimeout(() => {
              blinkObj[ghost.color] = setInterval(() => {
                ghost.blink = !ghost.blink;
              }, 5e2);
            }, 5e3);
          });
        }
      }
      boundaries.forEach((boundary: Boundary) => {
        boundary.draw();
        if (
          circleCollidesWithRectangle({ circle: player, rectangle: boundary })
        ) {
          player!.velocity!.x = 0;
          player!.velocity!.y = 0;
        }
      });
      // reset the ghost score counter if player ate all the ghosts
      if (
        !ghosts[0].scared &&
        !ghosts[1].scared &&
        !ghosts[2].scared &&
        !ghosts[3].scared
      ) {
        ghostScore = 200;
      }
      for (let i = ghosts.length - 1; i >= 0; i--) {
        const ghost = ghosts[i];
        if (
          Math.hypot(
            ghost.position.x - player.position.x,
            ghost.position.y - player.position.y,
          ) <
          ghost.radius + player.radius
        ) {
          if (ghost.scared) {
            // const g = ghosts.splice(i, 1)[0];
            cancelAnimationFrame(animationId);
            ghost.invisible = true;
            // write the score
            canvasCtxRef!.current!.font = "20px Arial";
            canvasCtxRef!.current!.textAlign = "center";
            canvasCtxRef!.current!.fillStyle = "cyan";
            canvasCtxRef!.current!.fillText(
              `${ghostScore}`,
              ghost.position.x,
              ghost.position.y,
            );
            addScore(ghostScore);
            ghostScore = ghostScore * 2;
            setTimeout(() => {
              ghost.invisible = false;
              ghost.velocity = { x: 0, y: 0 };
              switch (ghost.color) {
                case "red":
                  ghostLaps.red = 0;
                  ghost.velocity = { x: 0, y: 1 };
                  ghost.position = {
                    x: Boundary.width * 5 + Boundary.width / 2,
                    y: Boundary.height * 7 + Boundary.height / 2,
                  };
                  break;
                case "pink":
                  ghostLaps.pink = 0;
                  ghost.velocity = { x: 0, y: 1 };
                  ghost.position = {
                    x: Boundary.width * 5 + Boundary.width / 2,
                    y: Boundary.height * 7 + Boundary.height / 2,
                  };
                  break;
                case "aqua":
                  ghostLaps.aqua = 0;
                  ghost.velocity = { x: 0, y: -1 };
                  ghost.position = {
                    x: Boundary.width * 4 + Boundary.width / 2,
                    y: Boundary.height * 6 + Boundary.height / 2,
                  };
                  break;
                case "orange":
                  ghostLaps.orange = 0;
                  ghost.velocity = { x: 0, y: -1 };
                  ghost.position = {
                    x: Boundary.width * 6 + Boundary.width / 2,
                    y: Boundary.height * 6 + Boundary.height / 2,
                  };
                  break;

                default:
                  ghost.position = { ...spawnEntrance };
                  ghost.velocity = { x: ghostSpeed, y: 0 };
                  break;
              }
              ghost.scared = false;
              animate();
            }, 500);
          } else {
            cancelAnimationFrame(animationId);

            setGameOver(true);

            console.log("you lose");
          }
        }
      }

      // win condition
      if (pellets.length === 0 && powerUps.length === 0) {
        cancelAnimationFrame(animationId);
        setGameCleared(true);
        console.log("you win!");
      }

      for (let i = pellets.length - 1; i >= 0; i--) {
        const pellet = pellets[i];
        // pellets.forEach((pellet, i) => {
        pellet.draw();
        if (
          Math.hypot(
            pellet.position.x - player.position.x,
            pellet.position.y - player.position.y,
          ) <
          pellet.radius + player.radius
        ) {
          console.log("touching");
          pellets.splice(i, 1);
          addScore(10);
        }
      }
      player.update();
      ghosts.forEach((ghost) => {
        ghost.update();
        const collisions = Array<string>();
        if (ghost.color === "red" && ghostLaps.red < ghostLapFinish.red) {
          if (ghost.position.y < Boundary.height * 6 + Boundary.height / 2) {
            ghost.velocity.y = 1;
          } else if (
            ghost.position.y >
            Boundary.height * 7 + Boundary.height / 2
          ) {
            ghostLaps.red++;
            ghost.velocity.y = -1;
          }
          return;
        }
        if (
          ghost.color === "red" &&
          ghostLaps.red === ghostLapFinish.red &&
          ghost.position.y - (Boundary.height * 5 + Boundary.height / 2) <
            Math.floor(ghost.radius / 2)
        ) {
          ghost.position = { ...spawnEntrance };
          ghost.velocity = {
            x: ghost.speed,
            y: 0,
          };
          ghostLaps.red++;
        }
        if (ghost.color === "pink" && ghostLaps.pink < ghostLapFinish.pink) {
          if (ghost.position.y < Boundary.height * 6 + Boundary.height / 2) {
            ghost.velocity.y = 1;
          } else if (
            ghost.position.y >
            Boundary.height * 7 + Boundary.height / 2
          ) {
            ghostLaps.pink++;
            ghost.velocity.y = -1;
          }
          return;
        }
        if (
          ghost.color === "pink" &&
          ghostLaps.pink === ghostLapFinish.pink &&
          ghost.position.y - (Boundary.height * 5 + Boundary.height / 2) <
            Math.floor(ghost.radius / 2)
        ) {
          ghost.position = { ...spawnEntrance };
          ghost.velocity = {
            x: ghost.speed,
            y: 0,
          };
          ghostLaps.pink++;
        }
        if (ghost.color === "aqua" && ghostLaps.aqua < ghostLapFinish.aqua) {
          if (ghost.position.y < Boundary.height * 6 + Boundary.height / 2) {
            if (ghostLaps.aqua === ghostLapFinish.aqua - 1) {
              ghost.velocity = {
                x: 1,
                y: 0,
              };
              ghostLaps.aqua++;
              return;
            }
            ghost.velocity.y = 1;
          } else if (
            ghost.position.y >
            Boundary.height * 7 + Boundary.height / 2
          ) {
            ghostLaps.aqua++;
            ghost.velocity.y = -1;
          }
          return;
        }
        if (
          ghost.color === "aqua" &&
          ghostLaps.aqua === ghostLapFinish.aqua &&
          ghost.position.x - (Boundary.width * 5 + Boundary.width / 2) >=
            Math.floor(ghost.radius / 4)
        ) {
          ghost.velocity = {
            x: 0,
            y: -ghost.speed,
          };
        }
        if (
          ghost.color === "aqua" &&
          ghostLaps.aqua === ghostLapFinish.aqua &&
          ghost.position.y - (Boundary.height * 5 + Boundary.height / 2) <
            Math.floor(ghost.radius / 2)
        ) {
          ghost.position = { ...spawnEntrance };
          ghost.velocity = {
            x: ghost.speed,
            y: 0,
          };
          ghostLaps.aqua++;
        }
        if (
          ghost.color === "orange" &&
          ghostLaps.orange < ghostLapFinish.orange
        ) {
          if (ghost.position.y < Boundary.height * 6 + Boundary.height / 2) {
            if (ghostLaps.orange === ghostLapFinish.orange - 1) {
              ghost.velocity = {
                x: -1,
                y: 0,
              };
              ghostLaps.orange++;
              return;
            }
            ghost.velocity.y = 1;
          } else if (
            ghost.position.y >
            Boundary.height * 7 + Boundary.height / 2
          ) {
            ghostLaps.orange++;
            ghost.velocity.y = -1;
          }
          return;
        }
        if (
          ghost.color === "orange" &&
          ghostLaps.orange === ghostLapFinish.orange &&
          ghost.position.x - (Boundary.width * 5 + Boundary.width / 2) <
            Math.floor(ghost.radius / 4)
        ) {
          ghost.velocity = {
            x: 0,
            y: -ghost.speed,
          };
        }
        if (
          ghost.color === "orange" &&
          ghostLaps.orange === ghostLapFinish.orange &&
          ghost.position.y - (Boundary.height * 5 + Boundary.height / 2) <
            Math.floor(ghost.radius / 2)
        ) {
          ghost.position = { ...spawnEntrance };
          ghost.velocity = {
            x: ghost.speed,
            y: 0,
          };
          ghostLaps.orange++;
        }

        boundaries.forEach((boundary: Boundary) => {
          boundary.draw();
          const tempGhost = new Ghost({
            position: ghost.position,
            velocity: { x: ghost.speed, y: 0 },
            color: ghost.color,
            speed: ghostSpeed,
            ghostImages: ghostImages,
            ctx: canvasCtxRef.current,
          });
          if (
            !collisions.includes("right") &&
            circleCollidesWithRectangle({
              circle: tempGhost,
              rectangle: boundary,
            })
          ) {
            collisions.push("right");
          }
          tempGhost.velocity = { x: -ghost.speed, y: 0 };
          if (
            !collisions.includes("left") &&
            circleCollidesWithRectangle({
              circle: tempGhost,
              rectangle: boundary,
            })
          ) {
            collisions.push("left");
          }
          tempGhost.velocity = { x: 0, y: -ghost.speed };
          if (
            !collisions.includes("up") &&
            circleCollidesWithRectangle({
              circle: tempGhost,
              rectangle: boundary,
            })
          ) {
            collisions.push("up");
          }
          tempGhost.velocity = { x: 0, y: ghost.speed };
          if (
            !collisions.includes("down") &&
            circleCollidesWithRectangle({
              circle: tempGhost,
              rectangle: boundary,
            })
          ) {
            collisions.push("down");
          }
        });
        if (collisions.length > ghost.prevCollisions.length) {
          ghost.prevCollisions = collisions;
        }
        if (
          JSON.stringify(collisions) !== JSON.stringify(ghost.prevCollisions)
        ) {
          if (ghost.velocity.x > 0) ghost.prevCollisions.push("right");
          if (ghost.velocity.x < 0) ghost.prevCollisions.push("left");
          if (ghost.velocity.y > 0) ghost.prevCollisions.push("down");
          if (ghost.velocity.y < 0) ghost.prevCollisions.push("up");
          // console.log(collisions);
          // console.log(ghost.prevCollisions);
          const pathways = ghost.prevCollisions.filter((collision) => {
            return !collisions.includes(collision);
          });
          // console.log({ pathways });
          const direction =
            pathways[Math.floor(Math.random() * pathways.length)]; //TODO: find a way to target the player instead of complete random
          // console.log(direction);
          switch (direction) {
            case "down":
              ghost.velocity.y = ghost.speed;
              ghost.velocity.x = 0;
              break;
            case "up":
              ghost.velocity.y = -ghost.speed;
              ghost.velocity.x = 0;
              break;
            case "left":
              ghost.velocity.y = 0;
              ghost.velocity.x = -ghost.speed;
              break;
            case "right":
              ghost.velocity.y = 0;
              ghost.velocity.x = ghost.speed;
              break;
          }
          ghost.prevCollisions = Array<string>();
        }
      });
      if (player.velocity.x > 0) player.rotation = 0;
      else if (player.velocity.x < 0) player.rotation = Math.PI;
      else if (player.velocity.y > 0) player.rotation = Math.PI / 2;
      else if (player.velocity.y < 0) player.rotation = Math.PI * 1.5;
    } // end of animate

    animate();
    addEventListener("keydown", ({ key }) => {
      switch (key) {
        case "w":
          keys!.w!.pressed = true;
          lastKey = "w";
          break;
        case "ArrowUp":
          keys!.w!.pressed = true;
          lastKey = "w";
          break;
        case "a":
          keys!.a!.pressed = true;
          lastKey = "a";
          break;
        case "ArrowLeft":
          keys!.a!.pressed = true;
          lastKey = "a";
          break;
        case "s":
          keys!.s!.pressed = true;
          lastKey = "s";
          break;
        case "ArrowDown":
          keys!.s!.pressed = true;
          lastKey = "s";
          break;
        case "d":
          keys!.d!.pressed = true;
          lastKey = "d";
          break;
        case "ArrowRight":
          keys!.d!.pressed = true;
          lastKey = "d";
          break;
      }
    });
    addEventListener("keyup", ({ key }) => {
      // console.log("keyup", key);
      switch (key) {
        case "w":
          keys!.w!.pressed = false;
          break;
        case "ArrowUp":
          keys!.w!.pressed = false;
          break;
        case "a":
          keys!.a!.pressed = false;
          break;
        case "ArrowLeft":
          keys!.a!.pressed = false;
          break;
        case "s":
          keys!.s!.pressed = false;
          break;
        case "ArrowDown":
          keys!.s!.pressed = false;
          break;
        case "d":
          keys!.d!.pressed = false;
          break;
        case "ArrowRight":
          keys!.d!.pressed = false;
          break;
      }
    });
    const touchStart = { x: 0, y: 0 };
    const touchEnd = { x: 0, y: 0 };
    const touchBuffer: number = 200;
    addEventListener("touchstart", (e) => {
      console.log(e);
      touchStart.x = e.changedTouches[0].screenX;
      touchStart.y = e.changedTouches[0].screenY;
    });
    addEventListener("touchend", (e) => {
      console.log(e);
      touchEnd.x = e.changedTouches[0].screenX;
      touchEnd.y = e.changedTouches[0].screenY;
      const xDiff: number = touchStart.x - touchEnd.x;
      const yDiff: number = touchStart.y - touchEnd.y;
      console.log(keys);
      if (Math.abs(xDiff) < Math.abs(yDiff)) {
        if (yDiff > 0) {
          keys!.a!.pressed = false;
          keys!.s!.pressed = false;
          keys!.d!.pressed = false;
          keys!.w!.pressed = true;
          lastKey = "w";
          setTimeout(() => {
            keys!.w!.pressed = false;
          }, touchBuffer);
        } else {
          keys!.w!.pressed = false;
          keys!.a!.pressed = false;
          keys!.d!.pressed = false;
          keys!.s!.pressed = true;
          lastKey = "s";
          setTimeout(() => {
            keys!.s!.pressed = false;
          }, touchBuffer);
        }
      } else if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
          keys!.w!.pressed = false;
          keys!.d!.pressed = false;
          keys!.s!.pressed = false;
          keys!.a.pressed = true;
          lastKey = "a";
          setTimeout(() => {
            keys!.a!.pressed = false;
          }, touchBuffer);
        } else {
          keys!.w!.pressed = false;
          keys!.a!.pressed = false;
          keys!.s!.pressed = false;
          keys!.d!.pressed = true;
          lastKey = "d";
          setTimeout(() => {
            keys!.d!.pressed = false;
          }, touchBuffer);
        }
      }
    });
  }
  useEffect(() => {
    // initiallize
    if (canvasRef.current) {
      const can = canvasRef.current;

      const gameHeight: number = 14 * Boundary.height;
      const gameWidth: number = 11 * Boundary.width;
      const windowHeight: number = window.innerHeight;
      const windowWidth: number = window.innerWidth;
      let adjustmentRatio: number;
      if (windowWidth < gameWidth && windowHeight > gameHeight) {
        adjustmentRatio = windowWidth / gameWidth;
      } else if (windowWidth > gameWidth && windowHeight < gameHeight) {
        adjustmentRatio = (windowHeight + 100) / gameHeight;
      } else {
        adjustmentRatio = 1;
      }
      can!.height = gameHeight;
      can!.width = gameWidth;
      canvasCtxRef.current = can.getContext("2d");
      canvasCtxRef.current!.scale(adjustmentRatio, adjustmentRatio);
      startGame();
    }
  }, []);
  const restartGame = (): undefined => {
    setGameCleared(false);
    setGameOver(false);
    startGame();
  };
  const emitClose = () => {
    console.log("emitClose");
    closeGame();
  };
  const endpoint = window.location.href.substring(
    window.location.href.lastIndexOf("/") + 1,
  );
  return (
    <div className="game flex justify-center flex-col overflow-hidden">
      <dialog open className="bg-black overflow-hidden h-svh w-full">
        <InGameScore score={score} />
        <canvas className="game mx-auto" ref={canvasRef}></canvas>
      </dialog>
      {(gameOver || gameCleared) && (
        <>
          <dialog open className="text-white bg-black p-8 border-4 border-blue">
            <div className="text-center mb-5">
              {gameOver ? "You Lose!" : "You Win!"}
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-y-5 sm:gap-x-5">
              <div className="flex justify-center">
                <button
                  className="border-4 py-2 rounded border-red-500 w-52 "
                  onClick={() => {
                    restartGame();
                  }}
                >
                  Play Again!
                </button>
              </div>
              {endpoint === "custom" ? (
                <div className="flex justify-center">
                  <Link
                    className="border-4 py-2 rounded border-ghost-pink w-52 text-center"
                    to="/"
                  >
                    Main Menu
                  </Link>
                </div>
              ) : (
                <div className="flex justify-center">
                  <button
                    className="border-4 py-2 rounded border-ghost-pink w-52 "
                    onClick={() => {
                      emitClose();
                    }}
                  >
                    Main Menu
                  </button>
                </div>
              )}
            </div>
          </dialog>
        </>
      )}
    </div>
  );
  // return (
  //   <div className="flex justify-center flex-col overflow-hidden">
  //     <dialog className="overflow-hidden h-screen w-full">
  //       <InGameScore score={score} />
  //       <canvas className="game mx-auto" ref={canvasRef}></canvas>
  //     </dialog>
  //   </div>
  // );
};
export default Pacman;
