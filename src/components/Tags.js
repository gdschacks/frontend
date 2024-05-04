import React from "react";
import "./Tags.scss";

const Tags = ({ text, color }) => {
  const buttonStyle = {
    backgroundColor: color,
    margin: "5px 0px",
  };

  return (
    <button className="grammar-button" style={buttonStyle}>
      {text}
    </button>
  );
};

export default Tags;
