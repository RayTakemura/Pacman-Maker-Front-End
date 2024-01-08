// import React, { useState, useRef, useEffect } from "react";
import React, { useState } from "react";
// import React from "react";
import Pacman from "./Pacman";
// import Button from "./menuComponents/button";
const MainMenu: React.FC = () => {
  const [playing, setPlaying] = useState<boolean>(false);
  // const handlePlaying = (p: boolean) => {
  //   setPlaying(p);
  // };
  const playGame = () => {
    setPlaying(true);
  };
  // const testButton = () => {
  //   console.log("testing button");
  // };
  return (
    <>
      {
        !playing &&
        <>
          <div className="flex justify-center pb-48">
            <h1 className="border-4 border-blue py-10 rounded text-center text-4xl w-96">Pacman</h1>
          </div>
          <div className="flex flex-col justify-center gap-y-3">
            <div className="flex justify-center"><button className="border-4 py-2 rounded border-red-500 w-52 " onClick={playGame}>Just Play!</button></div>
            <div className="flex justify-center"><button className="border-4 py-2 rounded border-ghost-pink w-52 " onClick={playGame}>Custom Game</button></div>
            <div className="flex justify-center"><button className="border-4 py-2 rounded border-ghost-aqua w-52 " onClick={playGame}>High Scores</button></div>
            <div className="flex justify-center"><button className="border-4 py-2 rounded border-ghost-orange w-52 " onClick={playGame}>Author</button></div>
          </div>
        </>
      }
      {playing && <Pacman />}
    </>
  );
};
export default MainMenu;
