import { useState } from "react";
const Custom: React.FC = () => {
  const [pacSpeed, setPacSpeed] = useState<number>(1);
  const changePacSpeed = (newSpeed: number) => {
    setPacSpeed(newSpeed);
  };
  const [ghostSpeed, setGhostSpeed] = useState<number>(1);
  const changeGhostSpeed = (newSpeed: number) => {
    setGhostSpeed(newSpeed);
  };
  return (
    <>
      <h2>Custom Game</h2>
      <div className="flex flex-row">
        <h3>Pacman Speed: </h3>
        <h3>{pacSpeed}</h3>
      </div>
      <div className="w-64">
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
      <div className="flex flex-row">
        <h3>Ghost Speed: </h3>
        <h3>{ghostSpeed}</h3>
      </div>
      <div className="w-64">
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
    </>
  );
};

export default Custom;
