import { combineReducers } from 'redux';
import itineraryReducer from './itineraryReducer';
import errorReducer from './errorReducer';

export default combineReducers({
    itineraries: itineraryReducer,
    error: errorReducer,
});