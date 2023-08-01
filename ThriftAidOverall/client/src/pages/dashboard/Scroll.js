import React from "react";

const ScrollButton = ({ direction, onClick, onMouseOver }) => {
  return (
    <button
      className={`scroll-button ${direction === "left" ? "left" : "right"}`}
      onClick={onClick}
      onMouseOver={onMouseOver}
    >
      {direction === "left" ? "Scroll Left" : "Scroll Right"}
    </button>
  );
};

export default ScrollButton;