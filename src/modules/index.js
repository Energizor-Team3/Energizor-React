import { combineReducers } from 'redux';
import userReducer from './UserModule';
import approvalReducer from './ApprovalMainModule'
import approvalSubReducer from './ApprovalsubModule'


import reservationReducer from "./ReservationModules";
import reservationAttendeeReducer from "./ReservationAttendeeModule";
import reservationModifyReducer from "./ReservationModifyModule";
import reservationCodeReducer from "./ReservationCodeDetailsModule";




import groupReducer from './groupModule'
import groupUserReducer from './groupUserModule'
import projectReducer from './ProjectModule';
import calendarReducer from './CalendarModule';
import scheduleReducer from './ScheduleModule';

const rootReducer = combineReducers({
  userReducer,
  approvalReducer,
  reservationReducer,
  reservationAttendeeReducer,
  reservationModifyReducer,
  reservationCodeReducer,

    groupReducer,
    groupUserReducer,
    projectReducer,
    calendarReducer,
    scheduleReducer,
    approvalSubReducer,


});

export default rootReducer;
