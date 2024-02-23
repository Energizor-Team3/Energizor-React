import { combineReducers } from "redux";
import userReducer from "./UserModule";
import approvalReducer from "./ApprovalMainModule";
import reservationReducer from "./ReservationModules";
import reservationAttendeeReducer from "./ReservationAttendeeModule";
import reservationModifyReducer from "./ReservationModifyModule";
import reservationCodeReducer from "./ReservationCodeDetailsModule";




import groupReducer from './groupModule'
import groupUserReducer from './groupUserModule'
import projectReducer from './ProjectModule';
import calendarReducer from './CalendarModule';
import scheduleReducer from './ScheduleModule';
import reservationTotalReducer from "./ReservationTotalModules ";

const rootReducer = combineReducers({
  userReducer,
  approvalReducer,
  reservationReducer,
  reservationAttendeeReducer,
  reservationModifyReducer,
  reservationCodeReducer,
  reservationTotalReducer,

    groupReducer,
    groupUserReducer,
    projectReducer,
    calendarReducer,
    scheduleReducer


});

export default rootReducer;
