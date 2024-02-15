import { combineReducers } from 'redux';
import userReducer from './UserModule';
import projectReducer from './ProjectModule';
import calendarReducer from './CalendarModule';

const rootReducer = combineReducers({
    userReducer,
    projectReducer,
    calendarReducer


});

export default rootReducer;
