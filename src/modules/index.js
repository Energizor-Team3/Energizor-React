import { combineReducers } from 'redux';
import userReducer from './UserModule';
import projectReducer from './ProjectModule';
import calendarReducer from './CalendarModule';
import scheduleReducer from './ScheduleModule';

const rootReducer = combineReducers({
    userReducer,
    projectReducer,
    calendarReducer,
    scheduleReducer


});

export default rootReducer;
