import {
    SET_FLOORS,
    MOVE_TO_FLOOR,
} from '../constants';

import { createFloors } from "../../services/creators.service";
import { updateFloor } from "../../services/board.service";
import { cloneDeep } from "lodash";


const initialState = { floors: [] };

export const floorsReducer = (state = initialState, action) => {
    const { type, rows, status, calledFloor } = action;
    switch (type) {
        case SET_FLOORS:
            const floors = createFloors(rows);
            return {
                ...state,
                floors
            };
        case MOVE_TO_FLOOR: {
            const floors = updateFloor({
                status,
                calledFloor,
                floors: cloneDeep(state.floors)
            });
            return { ...state, floors };
        }
        default:
            return state;
    }
}