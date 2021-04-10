import React from "react";
import Elevator from "../Elevator/Elevator";
import "./Cell.css";

const Cell = ({ data, getElevatorByID }) => {
  const { elevatorID, row, col } = data;
  
  return (
    <div className="cell">
      {elevatorID === null && `[${row},${col}]`}
      {typeof elevatorID === "number" && (
        <Elevator cellData={data} getElevatorByID={getElevatorByID} />
      )}
    </div>
  );
};

export default Cell;