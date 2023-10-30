import React, { useRef, useEffect } from "react";
const SimpleCanvasExample: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);
  let x = 95;
  let y = 50;
  function draw() {
    if (x > 200) return;
    const can = canvasRef.current;
    const ctx = canvasCtxRef.current;
    ctx?.beginPath();
    ctx?.arc(x, y, 40, 0, Math.PI * 2);
    ctx!.fillStyle = "rgba(250,0,0,0.4)";
    ctx?.fill();
    x += 2;
    y = 50;
    ctx!.fillStyle = "rgba(34,45,23,0.4)";
    ctx!.fillRect(0, 0, can!.width, can!.height);
    requestAnimationFrame(draw);
  }
  useEffect(() => {
    // initiallize
    if (canvasRef.current) {
      const can = canvasRef.current;
      console.log(can);
      can!.height = 1000;
      can!.width = 1300;
      canvasCtxRef.current = can.getContext("2d");
      const ctx = canvasCtxRef.current;
      ctx!.fillStyle = "black";
      ctx!.fillRect(700, 100, 100, 100);
      // ctx!.beginPath();
      // ctx!.arc(x, y, 40, 0, Math.PI * 2);
      // ctx!.stroke();
      draw();
    }
  });
  return <canvas ref={canvasRef}></canvas>;
};
export default SimpleCanvasExample;
