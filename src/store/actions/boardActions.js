import { SET_BOARD } from "../constants";

export const setBoardAction = (rows, cols) => ({ type: SET_BOARD, rows, cols });