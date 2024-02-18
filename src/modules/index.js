import { combineReducers } from 'redux';
import userReducer from './UserModule';
import approvalReducer from './ApprovalMainModule'
import groupReducer from './groupModule'

const rootReducer = combineReducers({
    userReducer,
    approvalReducer,
    groupReducer,
});

export default rootReducer;
