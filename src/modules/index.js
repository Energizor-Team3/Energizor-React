import { combineReducers } from 'redux';
import userReducer from './UserModule';
import projectReducer from './ProjectModule';
import groupReducer from './GroupModule';

const rootReducer = combineReducers({
    userReducer,
    projectReducer,
    groupReducer

});

export default rootReducer;
