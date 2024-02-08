import { combineReducers } from 'redux';
import userReducer from './UserModule';
import projectReducer from './ProjectModule';

const rootReducer = combineReducers({
    userReducer,
    projectReducer

});

export default rootReducer;
