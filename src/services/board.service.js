import { cloneDeep } from "lodash";
import {
    CellItem,
    Elevator,
    Floor,
    CallsQueue,
} from "../classes/classes";


export const createBoard = (rows, cols) => {
    const board = { rows, cols, cells: [] };
    for (let row = 0; row < rows; row++) {
        board.cells[row] = [];
        for (let col = 0; col < cols; col++) {
            const cellProps = { row, col };
            if (row === 0) cellProps.elevatorID = col;
            board.cells[row][col] = new CellItem(cellProps);
        }
    }
    return board;
}

export const createElevators = (cols) => {
    const elevators = [];
    for (let col = 0; col < cols; col++) {
        elevators[col] = new Elevator({ row: 0, col });
    }
    return elevators;
}

export const createFloors = (rows) => {
    const floors = [];
    for (let row = 0; row < rows; row++) {
        floors[row] = new Floor(row);
    }
    return floors;
}

export const createCallsQueue = (board, setBoard, setElevators) => new CallsQueue(board, setBoard, setElevators);

export const onFloorCallPress = ({ callsQueue, to, elevators }) => {
    const elevator = selectElevator(to, elevators);
    callsQueue.enqueue({ action: 'FLOOR_CALL_PRESS', from: elevator.col, to, elevator });
}

export const actionMoveToFloor = ({ callsQueue, from, to, elevator }) => {
    for (let i = from; i < to; i++) {
        callsQueue.enqueue({ action: "MOVE_TO_FLOOR", from: i, to: i + 1, elevator });
    }
}

// const delay = ms => new Promise((resolve) => { setTimeout(resolve, ms) });

export const selectElevator = (toFloor, elevators) => {
    let callElevators = elevators.filter(elevator => elevator.status === "call" || elevator.status === "arrived");
    let elevatorsDistances = [];
    callElevators.forEach(elevator => {
        let distance = Math.abs(toFloor - elevator.row);
        elevatorsDistances.push({ distance, elevator });
    })


    let minDistance = elevatorsDistances[0].distance;
    let closestElevator = elevators[0];

    elevatorsDistances.forEach(elevatorDis => {
        if (elevatorDis.distance < minDistance) {
            minDistance = elevatorDis.distance;
            closestElevator = elevatorDis.elevator;
        }
    })
    return closestElevator;
}

export const moveToFloor = ({ board, setBoard, from, to, elevator, setElevators }) => {
    console.log({ stage: "before", board });
    board.cells[from][elevator.ID].elevatorID = null;
    board.cells[to][elevator.ID].elevatorID = elevator.ID;
    setElevators(prev => {
        prev[elevator.ID].row = to;
        return prev;
    });
    setBoard(cloneDeep(board));
    console.log({ stage: "after", board });
}