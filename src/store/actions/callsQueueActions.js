import { SET_CALLS_QUEUE, MOVE_TO_FLOOR } from "../constants";

export const setCallsQueueAction = (board) => ({ type: SET_CALLS_QUEUE, board });
export const moveToFloorAction = ({ from, to, elevator, status, calledFloor }) => ({
    type: MOVE_TO_FLOOR,
    from,
    to,
    elevator,
    status,
    calledFloor
});