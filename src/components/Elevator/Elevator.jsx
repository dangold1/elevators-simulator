import React from "react";
import { useSelector } from "react-redux";
import "./Elevator.css";

const Elevator = ({ elevatorID }) => {
  const { elevators } = useSelector((state) => state.elevators);
  const src = `${process.env.PUBLIC_URL}/assets/${elevators[elevatorID].status}-elevator.svg`;
  return (
    <div className="elevator">
      <img src={src} width="40px" height="40px" />
    </div>
  );
};

export default Elevator;
