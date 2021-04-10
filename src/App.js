import React, { useState, useEffect } from "react";
import Cell from './components/Cell/Cell';
import {
  createBoard,
  createElevators,
  createFloors,
  createCallsQueue,
  onFloorCallPress,
} from './services/board.service';
import { cloneDeep } from "lodash";
import './App.css';

const rows = 10;
const cols = 5;

function App() {
  const [board, setBoard] = useState(createBoard(rows, cols));
  const [elevators, setElevators] = useState(createElevators(cols));
  const [floors, setFloors] = useState(createFloors(rows));
  const [callsQueue, setCallsQueue] = useState(null);


  useEffect(() => {
    if (board) setCallsQueue(createCallsQueue(board, setBoard, setElevators));
  }, []);

  const getElevatorByID = id => elevators[id];

  const renderFloorsBtns = () => (
    <div>
      {floors.map(floor => {
        return (
          <div>
            <button onClick={() => onFloorCallPress({ callsQueue, to: floor.ID, elevators })}>
              {floor.status}
            </button>
            <span>{floor.ID}</span>
          </div>
        )
      })}
    </div>
  );

  const renderFloorsNumbers = () => (
    <div>
      {floors.map(floor => <div>{floor.ID}</div>)}
    </div>
  );

  const renderBoard = () => (
    <table className="board">
      <tbody>
        {board.cells.map((row, i) => {
          return (
            <tr className="board-row" key={i}>
              {row.map((cell, j) => <td className="cell-container" key={j}>
                <Cell data={cell} getElevatorByID={getElevatorByID} />
              </td>)}
            </tr>
          )
        })}
      </tbody>
    </table>
  );

  return (
    <div className="App">
      {renderFloorsNumbers()}
      {renderBoard()}
      {renderFloorsBtns()}
    </div>
  );
}
export default App;
