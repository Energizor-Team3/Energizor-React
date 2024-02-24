import { combineReducers } from 'redux';
import userReducer from './UserModule';
import projectReducer from './ProjectModule';
import contactReducer from './ContactModule';
import attendanceReducer from './AttendanceModule';

const rootReducer = combineReducers({
    userReducer,
    projectReducer,
    contactReducer,
    attendanceReducer
});

export default rootReducer;
