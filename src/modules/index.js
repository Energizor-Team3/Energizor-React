import { combineReducers } from 'redux';
import userReducer from './UserModule';
import projectReducer from './ProjectModule';
import contactReducer from './ContactModule';

const rootReducer = combineReducers({
    userReducer,
    projectReducer,
    contactReducer
});

export default rootReducer;
