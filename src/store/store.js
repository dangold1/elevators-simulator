import { createStore, combineReducers, compose } from 'redux';
import { boardReducer } from './reducers/boardReducer';
import { callsQueueReducer } from './reducers/callsQueueReducer';
import { elevatorsReducer } from './reducers/elevatorsReducer';
import { floorsReducer } from './reducers/floorsReducer';


const rootReducer = combineReducers({
    board: boardReducer,
    callsQueue: callsQueueReducer,
    elevators: elevatorsReducer,
    floors: floorsReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancer());

export default store;