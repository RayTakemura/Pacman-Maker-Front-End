import React, { useRef, useEffect } from "react";
// import { Boundary } from "./pacmanClasses/Boundary";
import { Boundary, Player } from "./pacmanClasses/index";
const PacmanCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);
  function startGame() {
    console.log("beginning startGame");
    const map = [
      ["-", "-", "-", "-", "-", "-"],
      ["-", " ", " ", " ", " ", "-"],
      ["-", " ", "-", "-", " ", "-"],
      ["-", " ", " ", " ", " ", "-"],
      ["-", "-", "-", "-", "-", "-"],
    ];
    const boundaries = Array<Boundary>();
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
    console.log(player);
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

    function animate() {
      requestAnimationFrame(animate);
      const ctx = canvasCtxRef.current;
      const canvas = canvasRef.current;
      ctx?.clearRect(0, 0, canvas?.width ?? 0, canvas?.height ?? 0);
      boundaries.forEach((boundary: Boundary) => {
        boundary.draw();
      });
      player.update();
      player!.velocity!.x = 0;
      player!.velocity!.y = 0;

      if (keys.w.pressed && lastKey === "w") {
        player!.velocity!.y = -5;
      } else if (keys.a.pressed && lastKey === "a") {
        player!.velocity!.x = -5;
      } else if (keys.s.pressed && lastKey === "s") {
        player!.velocity!.y = 5;
      } else if (keys.d.pressed && lastKey === "d") {
        player!.velocity!.x = 5;
      }
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
    // switch (key) {
    //   case "w":
    //     player!.velocity.y = -2.5;
    //     player!.velocity.x = 0;
    //     break;
    //   case "a":
    //     player!.velocity!.x = -2.5;
    //     player!.velocity!.y = 0;
    //     break;
    //   case "s":
    //     player!.velocity!.y = 2.5;
    //     player!.velocity!.x = 0;
    //     break;
    //   case "d":
    //     player!.velocity!.x = 2.5;
    //     player!.velocity!.y = 0;
    //     break;
    // }
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
