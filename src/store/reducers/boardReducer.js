import {
    SET_BOARD,
    MOVE_TO_FLOOR,
} from '../constants';
import { createBoard } from "../../services/creators.service";
import { updateBoard } from "../../services/board.service";
import { cloneDeep } from "lodash";

const initialState = { board: [] };
export const boardReducer = (state = initialState, action) => {
    const { type, rows, cols, from, to, elevator } = action;
    switch (type) {
        case SET_BOARD: {
            const board = createBoard(rows, cols);
            return { ...state, board };
        }
        case MOVE_TO_FLOOR: {
            const board = updateBoard({
                board: cloneDeep(state.board),
                from,
                to,
                elevator
            });
            return { ...state, board };
        }
        default:
            return state;
    }
}