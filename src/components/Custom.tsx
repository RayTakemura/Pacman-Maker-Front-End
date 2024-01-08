import { useState } from "react";
import { Link } from "react-router-dom";
import Pacman from "./Pacman"
const Custom: React.FC = () => {
  const [pacSpeed, setPacSpeed] = useState<number>(1);
  const changePacSpeed = (newSpeed: number) => {
    setPacSpeed(newSpeed);
  };
  const [ghostSpeed, setGhostSpeed] = useState<number>(1);
  const changeGhostSpeed = (newSpeed: number) => {
    setGhostSpeed(newSpeed);
  };
  const [playing, setPlaying] = useState<boolean>(false);
  const playGame = () => {
    setPlaying(true);
  }
  return (
    <>
      {
        !playing && 
        <div className="flex flex-col gap-y-5">
          <div className="w-96 self-center pb-7">
            <Link className="border-4 border-blue p-3 text-2xl font-extrabold" to="/">Back</Link>
          </div>
          <h2 className="text-center text-4xl pb-36">Custom Game</h2>
          <div>
            <div className="flex flex-row justify-center">
              <h3>Pacman Speed: </h3>
              <h3>{pacSpeed}</h3>
            </div>
            <div className="w-64 mx-auto">
              <input
                type="range"
                min="1"
                max="5"
                value={pacSpeed}
                onChange={(e) => changePacSpeed(Number(e.target.value))}
                className="pac-slider"
                id="pac-speed"
              />
            </div>
          </div>
          <div>
            <div className="flex flex-row justify-center">
              <h3>Ghost Speed: </h3>
              <h3>{ghostSpeed}</h3>
            </div>
            <div className="w-64 mx-auto">
              <input
                type="range"
                min="1"
                max="5"
                value={ghostSpeed}
                onChange={(e) => changeGhostSpeed(Number(e.target.value))}
                className="ghost-slider"
                id="ghost-speed"
              />
            </div>
          </div>
          <div className="flex justify-center pt-5">
            <button onClick={playGame} className="border-4 py-2 rounded border-red-500 w-52">Start!</button>
          </div>
        </div>
      }
      {
        playing &&
        <Pacman/>
      }
    </>
  );
};

export default Custom;
