import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cell from './components/Cell/Cell';
import { onFloorCallPress } from './services/board.service';
import { setBoardAction } from "./store/actions/boardActions";
import { setCallsQueueAction } from "./store/actions/callsQueueActions";
import { setElevatorsAction } from "./store/actions/elevatorsActions";
import { setFloorsAction } from "./store/actions/floorsActions";
import { isEmpty } from "lodash";
import clsx from 'clsx';
import './App.css';

const rows = 10;
const cols = 5;

function App() {
  const { board } = useSelector(state => state.board);
  const { elevators } = useSelector(state => state.elevators);
  const { floors } = useSelector(state => state.floors);
  const { callsQueue } = useSelector(state => state.callsQueue);
  const dispatch = useDispatch();


  const didMount = () => {
    dispatch(setBoardAction(rows, cols));
    dispatch(setElevatorsAction(cols));
    dispatch(setFloorsAction(rows));
  }

  const didUpdate = () => {
    if (board && isEmpty(callsQueue)) dispatch(setCallsQueueAction(board));
  }

  useEffect(() => {
    didMount();
  }, []);

  useEffect(() => {
    didUpdate();
  }, [board]);

  const renderFloorsBtns = () => (
    <div className="floors-btns-col">
      {floors.map(floor => (
        <button
          key={floor.ID}
          className={clsx("floor-btn", floor.status)}
          onClick={() => onFloorCallPress({ callsQueue, to: floor.ID, elevators })}
        >
          {floor.status}
        </button>
      ))}
    </div>
  );

  const renderFloorsNumbers = () => (
    <div>
      {floors.map(floor => <div>{floor.ID === 0 ? "Grounded Floor" : floor.ID}</div>)}
    </div>
  );

  const renderBoard = () => (
    <table className="board">
      <tbody>
        {board.map((row, i) => {
          return (
            <tr className="board-row" key={i}>
              {row.map((cell, j) => <td className="cell-container" key={j}>
                <Cell data={cell} />
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
