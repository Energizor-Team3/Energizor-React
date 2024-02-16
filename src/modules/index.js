import { combineReducers } from "redux";
import userReducer from "./UserModule";
import approvalReducer from "./ApprovalMainModule";
import reservationReducer from "./ReservationModules";

const rootReducer = combineReducers({
  userReducer,
  approvalReducer,
  reservationReducer,
});

export default rootReducer;
