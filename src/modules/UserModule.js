import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_USER     = 'user/GET_USER';
export const POST_LOGIN     = 'user/POST_LOGIN';
export const POST_SEARCHPWD  = 'user/POST_SEARCHPWD';

const actions = createActions({
    [GET_USER]: () => {},
    [POST_LOGIN]: () => {},
    [POST_SEARCHPWD]: () => {}
});

/* 리듀서 */
const userReducer = handleActions(
    {
        [GET_USER]: (state, { payload }) => {
            
            return payload;
        },
        [POST_LOGIN]: (state, { payload }) => {
            
            return payload;
        },
        [POST_SEARCHPWD]: (state, { payload }) => {
            
            return payload;
        },

    },
    initialState
);

export default userReducer;


