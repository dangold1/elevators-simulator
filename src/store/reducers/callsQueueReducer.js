import {
    SET_CALLS_QUEUE,
} from '../constants';

import { createCallsQueue } from "../../services/creators.service";

const initialState = { callsQueue: {} };

export const callsQueueReducer = (state = initialState, action) => {
    const { type, board } = action;
    switch (type) {
        case SET_CALLS_QUEUE:
            const callsQueue = createCallsQueue(board);
            return {
                ...state,
                callsQueue
            };
        default:
            return state;
    }
}