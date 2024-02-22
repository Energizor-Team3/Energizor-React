import { combineReducers } from 'redux';
import userReducer from './UserModule';
import approvalReducer from './ApprovalMainModule'
import approvalSubReducer from './ApprovalsubModule'
import groupReducer from './groupModule'
import groupUserReducer from './groupUserModule'
import projectReducer from './ProjectModule';
import calendarReducer from './CalendarModule';
import scheduleReducer from './ScheduleModule';
import approvalLineReducer from './ApprovalLineModule';
import approvalRfReducer from './ApprovalRfModule';

const rootReducer = combineReducers({
    userReducer,
    approvalReducer,
    groupReducer,
    groupUserReducer,
    projectReducer,
    calendarReducer,
    scheduleReducer,
    approvalSubReducer,
    approvalLineReducer,
    approvalRfReducer,


});

export default rootReducer;
