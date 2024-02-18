import { combineReducers } from 'redux';
import userReducer from './UserModule';
import approvalReducer from './ApprovalMainModule'
import groupReducer from './groupModule'
import groupUserReducer from './groupUserModule'

const rootReducer = combineReducers({
    userReducer,
    approvalReducer,
    groupReducer,
    groupUserReducer,
});

export default rootReducer;
