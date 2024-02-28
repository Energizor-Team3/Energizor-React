import { combineReducers } from "redux";
import userReducer from "./UserModule";
import approvalReducer from "./ApprovalMainModule";
import approvalSubReducer from "./ApprovalsubModule";
import approvalSubSubReducer from "./ApprovalSubSubModule";

import reservationReducer from "./ReservationModules";
import reservationAttendeeReducer from "./ReservationAttendeeModule";
import reservationModifyReducer from "./ReservationModifyModule";
import reservationCodeReducer from "./ReservationCodeDetailsModule";

import projectReducer from "./ProjectModule";
import calendarReducer from "./CalendarModule";
import scheduleReducer from "./ScheduleModule";
import approvalLineReducer from "./ApprovalLineModule";
import approvalRfReducer from "./ApprovalRfModule";
import approvalHeaderReducer from "./ApprovalHeaderModule";
import approvalHeaderSubReducer from "./ApprovalHeaderSubModule";
import approvalFileReducer from "./ApprovalFileModule";
import reservationTotalReducer from "./ReservationTotalModules ";
import contactReducer from "./ContactModule";
import groupReducer from "./GroupModule";
import groupUserReducer from "./GroupUserModule";
import groupDeptReducer from "./GroupDeptModule";
import groupTeamReducer from "./GroupTeamModule";
import reservationInsertReducer from "./ReservationInsertModule";
import groupAdminReducer from "./GroupAdminModule";
import taskReducer from "./TaskModule";
import approvalCommentReducer from "./ApprovalCommentModule";
import approvalComment2Reducer from "./ApprovalComment2Module";
import approvalfinduserReducer from "./ApprovalfinduserModule";
import approvalDetailReducer from "./ApprovalDetailModule";
import approvaltotaldocumentReducer from "./ApprovalTotalDocumentModule";

import attendanceReducer from './AttendanceModule';

const rootReducer = combineReducers({
  userReducer,
  reservationReducer,
  reservationAttendeeReducer,
  reservationModifyReducer,
  reservationCodeReducer,
  reservationTotalReducer,
  reservationInsertReducer,
  
  
  groupReducer,
  groupUserReducer,
  groupDeptReducer,
  groupTeamReducer,
  groupAdminReducer,
  
  projectReducer,
  calendarReducer,
  scheduleReducer,
  
  approvalReducer,
  approvalSubReducer,
  approvalLineReducer,
  approvalRfReducer,
  approvalHeaderReducer,
  approvalHeaderSubReducer,
  approvalFileReducer,
  approvalSubSubReducer,
  approvalCommentReducer,
  approvalfinduserReducer,
  approvalDetailReducer,
  approvaltotaldocumentReducer,
  approvalComment2Reducer,


  taskReducer,

 
  contactReducer,
  attendanceReducer,
});

export default rootReducer;
