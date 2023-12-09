import React, { useState, useRef, useEffect } from "react";
import {
  Boundary,
  Player,
  Pellet,
  Ghost,
  PowerUp,
  GhostSpawn,
} from "./pacmanClasses/index";
import InGameScore from "./InGameScore";
const PacmanCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);
  const [score, setScore] = useState<number>(0);
  function addScore(): void {
    setScore((prevScore) => {
      return prevScore + 10;
    });
  }
  function startGame() {
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
        velocity: { x: Ghost.speed, y: 0 },
        color: "red",
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
        ctx: canvasCtxRef.current,
      }),
      new Ghost({
        position: {
          x: Boundary.width * 6 + Boundary.width / 2,
          y: Boundary.height * 6 + Boundary.height / 2,
        },
        velocity: {
          x: 0,
          y: 0,
        },
        color: "orange",
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
      const padding = Boundary.width / 2 - circle.radius - 1;
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
      pink: 0,
      aqua: 0,
      orange: 0,
    };
    const ghostLapFinish = {
      pink: 3,
      aqua: 4,
      orange: 9,
    };

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
            player!.velocity!.y = -5;
          }
        }
      } else if (keys.a.pressed && lastKey === "a") {
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          const tempPlayer = new Player({
            position: player.position,
            velocity: { x: -5, y: 0 },
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
            player!.velocity!.x = -5;
          }
        }
      } else if (keys.s.pressed && lastKey === "s") {
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          const tempPlayer = new Player({
            position: player.position,
            velocity: { x: 0, y: 5 },
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
            player!.velocity!.y = 5;
          }
        }
      } else if (keys.d.pressed && lastKey === "d") {
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          const tempPlayer = new Player({
            position: player.position,
            velocity: { x: 5, y: 0 },
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
            player!.velocity!.x = 5;
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
          console.log("touching");
          powerUps.splice(i, 1);
          ghosts.forEach((ghost) => {
            ghost.scared = true;
            setTimeout(() => {
              ghost.scared = false;
            }, 5000);
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
            ghosts.splice(i, 1);
          } else {
            cancelAnimationFrame(animationId);
            console.log("you lose");
          }
        }
      }

      // win condition
      if (pellets.length === 0) {
        cancelAnimationFrame(animationId);
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
          addScore();
        }
      }
      player.update();
      ghosts.forEach((ghost) => {
        ghost.update();
        const collisions = Array<string>();
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
        // if (ghost.color === "pink" && ghostLaps.pink > ghostLapFinish.pink) {
        //   console.log("ghost y velocity", ghost.velocity.y);
        //   console.log("ghost.position.y", ghost.position.y);
        //   console.log(
        //     "(Boundary.height * 5 + Boundary.height / 2)",
        //     Boundary.height * 5 + Boundary.height / 2,
        //   );
        //   console.log(
        //     "ghost.position.y - (Boundary.height * 5 + Boundary.height / 2)",
        //     ghost.position.y - (Boundary.height * 5 + Boundary.height / 2),
        //   );
        //   console.log(
        //     "bool:",
        //     ghost.position.y - (Boundary.height * 5 + Boundary.height / 2) < 10,
        //   );
        //   console.log(animationId);
        //   // ghostLaps.pink++;
        // }
        if (
          ghost.color === "pink" &&
          ghostLaps.pink === ghostLapFinish.pink &&
          ghost.position.y - (Boundary.height * 5 + Boundary.height / 2) <
            Math.floor(ghost.radius / 2)
        ) {
          console.log(ghostLaps);
          ghost.position = {
            x: Boundary.width * 5 + Boundary.width / 2,
            y: Boundary.height * 5 + Boundary.height / 2,
          };
          ghost.velocity = {
            x: Ghost.speed,
            y: 0,
          };
          ghostLaps.pink++;
        }
        if (ghost.color === "aqua" && ghostLaps.aqua < ghostLapFinish.aqua) {
          if (ghost.position.y < Boundary.height * 6 + Boundary.height / 2) {
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
        if (ghost.color === "aqua" && animationId === 500) {
          ghost.position = {
            x: Boundary.width * 5 + Boundary.width / 2,
            y: Boundary.height * 5 + Boundary.height / 2,
          };
          ghost.velocity = {
            x: Ghost.speed,
            y: 0,
          };
        }
        if (ghost.color === "orange" && animationId < 700) {
          return;
        }
        if (ghost.color === "orange" && animationId === 700) {
          ghost.position = {
            x: Boundary.width * 5 + Boundary.width / 2,
            y: Boundary.height * 5 + Boundary.height / 2,
          };
          ghost.velocity = {
            x: Ghost.speed,
            y: 0,
          };
        }

        boundaries.forEach((boundary: Boundary) => {
          boundary.draw();
          const tempGhost = new Ghost({
            position: ghost.position,
            velocity: { x: Ghost.speed, y: 0 },
            color: ghost.color,
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
          tempGhost.velocity = { x: -Ghost.speed, y: 0 };
          if (
            !collisions.includes("left") &&
            circleCollidesWithRectangle({
              circle: tempGhost,
              rectangle: boundary,
            })
          ) {
            collisions.push("left");
          }
          tempGhost.velocity = { x: 0, y: -Ghost.speed };
          if (
            !collisions.includes("up") &&
            circleCollidesWithRectangle({
              circle: tempGhost,
              rectangle: boundary,
            })
          ) {
            collisions.push("up");
          }
          tempGhost.velocity = { x: 0, y: Ghost.speed };
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
              ghost.velocity.y = Ghost.speed;
              ghost.velocity.x = 0;
              break;
            case "up":
              ghost.velocity.y = -Ghost.speed;
              ghost.velocity.x = 0;
              break;
            case "left":
              ghost.velocity.y = 0;
              ghost.velocity.x = -Ghost.speed;
              break;
            case "right":
              ghost.velocity.y = 0;
              ghost.velocity.x = Ghost.speed;
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
      // console.log("keydown", key);
      switch (key) {
        case "w":
          keys!.w!.pressed = true;
          lastKey = "w";
          break;
        case "a":
          keys!.a!.pressed = true;
          lastKey = "a";
          break;
        case "s":
          keys!.s!.pressed = true;
          lastKey = "s";
          break;
        case "d":
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
        case "a":
          keys!.a!.pressed = false;
          break;
        case "s":
          keys!.s!.pressed = false;
          break;
        case "d":
          keys!.d!.pressed = false;
          break;
      }
    });
  }
  useEffect(() => {
    // initiallize
    if (canvasRef.current) {
      const can = canvasRef.current;
      can!.height = innerHeight;
      can!.width = innerWidth;
      canvasCtxRef.current = can.getContext("2d");
      // const ctx = canvasCtxRef.current;
      startGame();
      // console.log("after startGame()");
    }
  }, []);
  return (
    <>
      <InGameScore score={score} />
      <canvas className="game" ref={canvasRef}></canvas>;
    </>
  );
};
export default PacmanCanvas;
