import React, { useRef, useEffect } from "react";
// import { Boundary } from "./pacmanClasses/Boundary";
import { Boundary, Player, Pellet } from "./pacmanClasses/index";
const PacmanCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);
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
      return (
        circle.position.y - circle.radius + circle.velocity.y <=
          rectangle.position.y + rectangle.height &&
        circle.position.x + circle.radius + circle.velocity.x >=
          rectangle.position.x &&
        circle.position.y + circle.radius + circle.velocity.y >=
          rectangle.position.y &&
        circle.position.x - circle.radius + circle.velocity.x <=
          rectangle.position.x + rectangle.width
      );
    }
    function animate() {
      requestAnimationFrame(animate);
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
      pellets.forEach((pellet) => {
        pellet.draw();
      });
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
      // player!.velocity!.x = 0;
      // player!.velocity!.y = 0;
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
  return <canvas className="game" ref={canvasRef}></canvas>;
};
export default PacmanCanvas;
