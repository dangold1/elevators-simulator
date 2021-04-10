import {
    SET_FLOORS
} from '../constants';

import { createFloors } from "../../services/creators.service";

const initialState = { floors: [] };

export const floorsReducer = (state = initialState, action) => {
    const { type, rows } = action;
    switch (type) {
        case SET_FLOORS:
            const floors = createFloors(rows);
            return {
                ...state,
                floors
            };
        default:
            return state;
    }
}