// import React, { useState, useRef, useEffect } from "react";
import React, { useState } from "react";
// import React from "react";
import Pacman from "./Pacman";
import { Link } from "react-router-dom";
// import Button from "./menuComponents/button";
const MainMenu: React.FC = () => {
  const [playing, setPlaying] = useState<boolean>(false);
  // const handlePlaying = (p: boolean) => {
  //   setPlaying(p);
  // };
  const playGame = () => {
    setPlaying(true);
  };
  const turnOffGame = () => {
    console.log("turnoffGame");
    setPlaying(false);
  };
  const [howToPlay, setHowToPlay] = useState<boolean>(false);
  const showHowToPlay = (show: boolean) => {
    console.log("show how to play");
    setHowToPlay(show);
  }
  return (
    <>
      {!playing && (
        <>
          <div className="h-svh overflow-hidden">
            <div className="flex justify-center pb-28 sm:pb-36">
              <h1 className="border-4 border-blue py-10 rounded text-center text-4xl w-96">
                Pacman
              </h1>
            </div>
            <div className="flex flex-col justify-center gap-y-2 sm:gap-y-5">
              <div className="flex justify-center">
                <button
                  className="border-4 py-2 rounded border-red-500 w-52 "
                  onClick={playGame}
                >
                  Just Play!
                </button>
              </div>
              <div className="flex justify-center">
                <Link
                  className="border-4 py-2 rounded border-ghost-pink w-52 text-center"
                  to="/custom"
                >
                  Custom Game
                </Link>
              </div>
              <div className="flex justify-center">
                <button
                  className="border-4 py-2 rounded border-ghost-aqua w-52 "
                  onClick={() => { showHowToPlay(true) }}
                >
                  How to Play
                </button>
              </div>
              <div className="flex justify-center">
                <a href="https://raytakemura.netlify.app/" target="_blank">
                  <button
                    className="border-4 py-2 rounded border-ghost-orange w-52 "
                  >
                    Author
                  </button>
                </a>
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 text-center">
              &copy; Ray Takemura
            </div>
          </div>
        </>
      )}
      {playing && (
        <Pacman
          pacSpeed={2.4}
          ghostSpeed={2.4}
          closeGame={() => {
            turnOffGame();
          }}
        />
      )}
      {howToPlay &&
        <dialog open className="text-white border-4 border-ghost-aqua rounded p-4 bg-black inset-y-1/2 w-1/2">
          <div className="pb-5"><span><span>Keyboard: </span> Use W, A, S, and D or the arrow keys to move!</span></div>
          <div><span><span>Touch Screen: </span> Swipe to the direction you want to move on time!</span></div>
          <div className="w-full flex justify-center">
            <button className="text-center border-4 border-blue rounded p-2" onClick={() => { showHowToPlay(false) }}>Close</button>
          </div>
        </dialog>
      }
    </>
  );
};
export default MainMenu;
