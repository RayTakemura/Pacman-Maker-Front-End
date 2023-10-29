import React, { useRef, useEffect } from "react";
const SimpleCanvasExample: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    // initiallize
    if (canvasRef.current) {
      canvasCtxRef.current = canvasRef.current.getContext("2d");
      const ctx = canvasCtxRef.current;
      ctx!.beginPath();
      ctx!.arc(95, 50, 40, 0, Math.PI * 2);
      ctx!.stroke();
    }
  }, []);
  return <canvas ref={canvasRef}></canvas>;
};
export default SimpleCanvasExample;
