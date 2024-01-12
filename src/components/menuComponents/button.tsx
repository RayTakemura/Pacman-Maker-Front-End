import React, { useState } from "react";

type ButtonProps = {
  onClick: boolean;
};

const ToggleButton: React.FC<ButtonProps> = ({ onClick }) => {
  const [isToggled, setIsToggled] = useState(onClick);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <button onClick={handleToggle}>
      {isToggled ? "Toggle On" : "Toggle Off"}
    </button>
  );
};

export default ToggleButton;
