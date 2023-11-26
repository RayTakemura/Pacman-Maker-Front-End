import React, { useState, useRef, useEffect } from "react";
// import { Boundary } from "./pacmanClasses/Boundary";
import { Boundary, Player, Pellet, Ghost } from "./pacmanClasses/index";
import InGameScore from "./InGameScore";
const PacmanCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);
  const [score, setScore] = useState<number>(0);
  function addScore(): void {
    console.log("addScore", score);
    // setScore(score + 10);
    setScore((prevScore) => {
      console.log("addScore", prevScore);
      return prevScore + 10;
    });
  }
  function startGame() {
    console.log("beginning startGame");
    const map = [
      ["1", "-", "-", "-", "-", "-", "-", "-", "-", "-", "2"],
      ["|", ".", ".", ".", ".", ".", ".", ".", ".", ".", "|"],
      ["|", ".", "b", ".", "[", "7", "]", ".", "b", ".", "|"],
      ["|", ".", ".", ".", ".", "_", ".", ".", ".", ".", "|"],
      ["|", ".", "[", "]", ".", ".", ".", "[", "]", ".", "|"],
      ["|", ".", ".", ".", ".", "^", ".", ".", ".", ".", "|"],
      ["|", ".", "b", ".", "[", "+", "]", ".", "b", ".", "|"],
      ["|", ".", ".", ".", ".", "_", ".", ".", ".", ".", "|"],
      ["|", ".", "[", "]", ".", ".", ".", "[", "]", ".", "|"],
      ["|", ".", ".", ".", ".", "^", ".", ".", ".", ".", "|"],
      ["|", ".", "b", ".", "[", "5", "]", ".", "b", ".", "|"],
      ["|", ".", ".", ".", ".", ".", ".", ".", ".", "p", "|"],
      ["3", "-", "-", "-", "-", "-", "-", "-", "-", "-", "4"],
    ];
    const boundaries = Array<Boundary>();
    const pellets = Array<Pellet>();
    const ghosts = Array<Ghost>();
    ghosts.push(
      new Ghost({
        position: {
          x: Boundary.width * 6 + Boundary.width / 2,
          y: Boundary.height + Boundary.height / 2,
        },
        velocity: { x: Ghost.speed, y: 0 },
        color: "red",
        ctx: canvasCtxRef.current,
      }),
      new Ghost({
        position: {
          x: Boundary.width * 6 + Boundary.width / 2,
          y: Boundary.height * 3 + Boundary.height / 2,
        },
        velocity: {
          x: Ghost.speed,
          y: 0,
        },
        color: "pink",
        ctx: canvasCtxRef.current,
      }),
    );
    const player = new Player({
      position: {
        x: Boundary.width + Boundary.width / 2,
        y: Boundary.height + Boundary.height / 2,
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
      circle: Player;
      rectangle: Boundary;
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
    function animate() {
      animationId = requestAnimationFrame(animate);
      console.log(animationId);
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
      boundaries.forEach((boundary: Boundary) => {
        boundary.draw();
        if (
          circleCollidesWithRectangle({ circle: player, rectangle: boundary })
        ) {
          player!.velocity!.x = 0;
          player!.velocity!.y = 0;
        }
      });
      player.update();
      ghosts.forEach((ghost) => {
        ghost.update();
        if (
          Math.hypot(
            ghost.position.x - player.position.x,
            ghost.position.y - player.position.y,
          ) <
          ghost.radius + player.radius
        ) {
          cancelAnimationFrame(animationId);
          console.log("you lose");
        }
        const collisions = Array<string>();
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
          console.log(collisions);
          console.log(ghost.prevCollisions);
          const pathways = ghost.prevCollisions.filter((collision) => {
            return !collisions.includes(collision);
          });
          console.log({ pathways });
          const direction =
            pathways[Math.floor(Math.random() * pathways.length)]; //TODO: find a way to target the player instead of complete random
          console.log(direction);
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
    }
    animate();
    addEventListener("keydown", ({ key }) => {
      console.log("keydown", key);
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
      console.log("keyup", key);
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
      console.log("after startGame()");
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
