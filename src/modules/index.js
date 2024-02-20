import { combineReducers } from "redux";
import userReducer from "./UserModule";
import approvalReducer from "./ApprovalMainModule";
import reservationReducer from "./ReservationModules";
import reservationAttendeeReducer from "./ReservationAttendeeModule";
import reservationModifyReducer from "./ReservationModifyModule";


const rootReducer = combineReducers({
  userReducer,
  approvalReducer,
  reservationReducer,
  reservationAttendeeReducer,
  reservationModifyReducer,
});

export default rootReducer;
