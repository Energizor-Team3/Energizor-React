import { combineReducers } from "redux";
import userReducer from "./UserModule";
import approvalReducer from "./ApprovalMainModule";
import reservationReducer from "./ReservationModules";
import reservationAttendeeReducer from "./ReservationAttendeeModule";

const rootReducer = combineReducers({
  userReducer,
  approvalReducer,
  reservationReducer,
  reservationAttendeeReducer,
});

export default rootReducer;
