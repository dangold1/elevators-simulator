import React, { useState } from "react";
import "./Elevator.css";
const Elevator = () => {
  const renderElevator = () => {
    return (
      <img
        src={`${process.env.PUBLIC_URL}/assets/call-elevator.svg`}
        width="50px"
        height="50px"
      />
    );
  };

  return <div className="elevator">{renderElevator()}</div>;
};

export default Elevator;
