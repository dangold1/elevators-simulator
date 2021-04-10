import { actionMoveToFloor, moveToFloor } from "../services/board.service";


export class CellItem {
    constructor({ elevatorID = null, row, col }) {
        this.row = row;
        this.col = col;
        this.elevatorID = elevatorID;
    }
}

export class Floor {
    constructor(ID) {
        this.ID = ID;
        this.status = "call";
        this.elevatorID = null;
    }
}

export class Elevator {
    constructor({ row, col, status = "call" }) {
        this.row = row;
        this.col = col;
        this.status = status;
        this.ID = col;
    }
}

export class CallsQueue {
    constructor(board, setBoard, setElevators) {
        this.board = board;
        this.setBoard = setBoard;
        this.setElevators = setElevators;
        this.calls = [];
        this.delay = 1000;
        setInterval(this.doTasks.bind(this), this.delay);
    }

    enqueue = (element) => {
        console.log({ element, this: this })
        this.calls.push(element);
    }

    dequeue = () => {
        this.calls.shift();
    }

    doTasks = () => {
        if (this.calls.length === 0 || !this.calls[0]) return;
        console.log(this.calls[0]);
        const { from, to, action, elevator } = this.calls[0];
        switch (action) {
            case "MOVE_TO_FLOOR":
                moveToFloor({ board: this.board, setBoard: this.setBoard, from, to, elevator, setElevators: this.setElevators });
                break;
            case "FLOOR_CALL_PRESS":
                actionMoveToFloor({ callsQueue: this, from, to, elevator });
            default:
                break;
        }
        this.dequeue();
    }
}