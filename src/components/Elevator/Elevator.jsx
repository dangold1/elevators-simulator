import React, { useState } from "react";
import "./Elevator.css";
const Elevator = () => {
  return (
    <div className="elevator">
      <img
        src={`${process.env.PUBLIC_URL}/assets/standby-elevator.svg`}
        width="50px"
        height="50px"
      />
    </div>
  );
};

export default Elevator;
