import { combineReducers } from "redux";
import userReducer from "./UserModule";
import approvalReducer from "./ApprovalMainModule";
import approvalSubReducer from "./ApprovalsubModule";

import reservationReducer from "./ReservationModules";
import reservationAttendeeReducer from "./ReservationAttendeeModule";
import reservationModifyReducer from "./ReservationModifyModule";
import reservationCodeReducer from "./ReservationCodeDetailsModule";

import projectReducer from "./ProjectModule";
import calendarReducer from "./CalendarModule";
import scheduleReducer from "./ScheduleModule";
import approvalLineReducer from "./ApprovalLineModule";
import approvalRfReducer from "./ApprovalRfModule";
import reservationTotalReducer from "./ReservationTotalModules ";
import contactReducer from "./ContactModule";
import groupReducer from "./GroupModule";
import groupUserReducer from "./GroupUserModule";
import groupDeptReducer from "./GroupDeptModule";
import groupTeamReducer from "./GroupTeamModule";


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
  groupDeptReducer,
  groupTeamReducer,

  projectReducer,
  calendarReducer,
  scheduleReducer,
  approvalSubReducer,
  approvalLineReducer,
  approvalRfReducer,

  userReducer,
  projectReducer,
  contactReducer,
});

export default rootReducer;
