import React, { useRef, useEffect } from "react";
import { Boundary } from "./pacmanClasses/Boundary";
const PacmanCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);
  function startGame() {
    console.log("startGame started");
    const b = new Boundary();
    console.log(b.sayHello());
  }
  useEffect(() => {
    // initiallize
    if (canvasRef.current) {
      const can = canvasRef.current;
      console.log(can);
      can!.height = innerHeight;
      can!.width = innerWidth;
      canvasCtxRef.current = can.getContext("2d");
      const ctx = canvasCtxRef.current;
      console.log(ctx);
      startGame();
    }
  });
  return <canvas ref={canvasRef}></canvas>;
};
export default PacmanCanvas;
