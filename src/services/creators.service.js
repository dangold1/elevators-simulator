import { CellItem, Elevator, Floor, CallsQueue } from "../classes";

export const createBoard = (rows, cols) => {
    let board = [];
    for (let row = 0; row < rows; row++) {
        board[row] = [];
        for (let col = 0; col < cols; col++) {
            const cellProps = { row, col };
            if (row === 0) cellProps.elevatorID = col;
            board[row][col] = new CellItem(cellProps);
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
        floors[row] = new Floor({ ID: row });
    }
    return floors;
}

export const createCallsQueue = () => new CallsQueue();