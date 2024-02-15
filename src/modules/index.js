import { combineReducers } from 'redux';
import userReducer from './UserModule';
import approvalReducer from './ApprovalMainModule'

const rootReducer = combineReducers({
    userReducer,
    approvalReducer,
});

export default rootReducer;
