import {
    SET_ELEVATORS,
    MOVE_TO_FLOOR,
} from '../constants';

import { createElevators } from "../../services/creators.service";
import { updateElevator } from "../../services/board.service";
import { cloneDeep } from "lodash";

const initialState = { elevators: [] }
export const elevatorsReducer = (state = initialState, action) => {
    const { type, cols, to, elevator, status } = action;
    switch (type) {
        case SET_ELEVATORS: {
            const elevators = createElevators(cols);
            return { ...state, elevators };
        }
        case MOVE_TO_FLOOR: {
            const elevators = updateElevator({
                to,
                elevator,
                status,
                elevators: cloneDeep(state.elevators)
            });
            return { ...state, elevators };
        }
        default:
            return state;
    }
}