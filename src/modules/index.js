import { combineReducers } from 'redux';
import userReducer from './UserModule';
import approvalReducer from './ApprovalMainModule'
import groupReducer from './GroupModule'
import groupUserReducer from './GroupUserModule'
import groupTeamReducer from './GroupTeamModule'


const rootReducer = combineReducers({
    userReducer,
    approvalReducer,
    groupReducer,
    groupUserReducer,
    groupTeamReducer,
    
});

export default rootReducer;
