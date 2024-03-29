
import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_USER_LIST     = 'user/GET_USER_LIST';
export const GET_USER     = 'user/GET_USER';
export const POST_LOGIN     = 'user/POST_LOGIN';
export const POST_SEARCHPWD  = 'user/POST_SEARCHPWD';
export const GET_MYPAGE = 'user/GET_MYPAGE';
export const POST_SIGNUP = 'user/POST_SIGNUP';
export const PUT_PASSWORD = 'user/PUT_PASSWORD';
export const MODIFY_SUCCESS = 'user/MODIFY_SUCCESS';
export const PUT_PROFILE = 'user/PUT_PROFILE';
export const DELETE_PROFILE = 'user/DELETE_PROFILE';

const actions = createActions({
    [GET_USER_LIST]: () => {},
    [GET_USER]: () => {},
    [POST_LOGIN]: () => {},
    [POST_SEARCHPWD]: () => {},
    [GET_MYPAGE]: () => {},
    [POST_SIGNUP]: () => {},
    [PUT_PASSWORD]: () => {},
    [MODIFY_SUCCESS]: () => {},
    [PUT_PROFILE]: () => {},
    [DELETE_PROFILE]: () => {},
});

/* 리듀서 */
export const userReducer = handleActions(
    {
        [GET_USER_LIST]: (state, { payload }) => {
            
            return payload;
        },
        [GET_USER]: (state, { payload }) => {
            
            return payload;
        },
        [POST_LOGIN]: (state, { payload }) => {
            
            return payload;
        },
        [POST_SEARCHPWD]: (state, { payload }) => {
            
            return payload;
        },
        [GET_MYPAGE]: (state, { payload }) => {
            
            return payload;
        },
        [POST_SIGNUP]: (state, { payload }) => {
            
            return payload;
        },
        [PUT_PASSWORD]: (state, { payload }) => {
            
            return payload;
        },
        [MODIFY_SUCCESS]: (state, { payload }) => {
            
            return payload;
        },
        [PUT_PROFILE]: (state, { payload }) => {
            
            return payload;
        },
        [DELETE_PROFILE]: (state, { payload }) => {
            
            return payload;
        },



    },
    initialState
);

export default userReducer;

