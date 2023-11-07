import React, { useRef, useEffect } from "react";
import { Boundary } from "./pacmanClasses/Boundary";
const PacmanCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);
  function startGame() {
    console.log("startGame started");
    const map = [
      ["-", "-", "-", "-", "-", "-"],
      ["-", " ", " ", " ", " ", "-"],
      ["-", " ", " ", " ", " ", "-"],
      ["-", "-", "-", "-", "-", "-"],
    ];
    // const boundaries = Array<Boundary>;
    const boundaries = Array<Boundary>;
    map.forEach((row, i) => {
      row.forEach((symbol, j) => {
        switch (symbol) {
          case "-":
            boundaries.push(
              new Boundary({
                position: {
                  x: 0 * j,
                  y: 0 * i,
                },
                ctx: canvasCtxRef.current,
              }),
            );
            break;
        }
      });
    });
    boundaries.forEach((boundary: Boundary) => {
      boundary.draw();
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
    }
  });
  return <canvas ref={canvasRef}></canvas>;
};
export default PacmanCanvas;
