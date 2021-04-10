import { moveToFloorAction } from "../store/actions/callsQueueActions";
import store from "../store/store";
import { MOVE_TO_FLOOR, FLOOR_CALL_PRESS } from "./constants";

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
    constructor() {
        this.calls = [];
        this.delay = 1000;
        setInterval(this.runQueue.bind(this), this.delay);
    }

    enqueue = (element) => {
        this.calls.push(element);
    }

    dequeue = () => {
        this.calls.shift();
    }

    runQueue = () => {
        if (this.calls.length === 0 || !this.calls[0]) return;
        const { from, to, action, elevator } = this.calls[0];
        switch (action) {
            case MOVE_TO_FLOOR:
                store.dispatch(moveToFloorAction({ from, to, elevator }));
                break;
            case FLOOR_CALL_PRESS:
                this.decomposeMoves({ from, to, elevator, action: MOVE_TO_FLOOR });
            default:
                break;
        }
        this.dequeue();
    }

    decomposeMoves = ({ action, from, to, elevator }) => {
        const task = { action, elevator }
        if (to > from) {
            for (let i = from; i < to; i++) {
                this.enqueue({ ...task, from: i, to: i + 1 });
            }
        }
        if (to < from) {
            for (let i = from; i > to; i--) {
                this.enqueue({ ...task, from: i, to: i - 1 });
            }
        }
    }
}