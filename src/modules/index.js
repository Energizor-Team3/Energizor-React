import { combineReducers } from 'redux';
import userReducer from './UserModule';
import approvalReducer from './ApprovalMainModule'
import groupReducer from './groupModule'
import groupUserReducer from './groupUserModule'
import projectReducer from './ProjectModule';
import calendarReducer from './CalendarModule';

const rootReducer = combineReducers({
    userReducer,
    approvalReducer,
    groupReducer,
    groupUserReducer,
    projectReducer,
    calendarReducer


});

export default rootReducer;
