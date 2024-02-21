import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_USER     = 'user/GET_USER';
export const POST_LOGIN     = 'user/POST_LOGIN';
export const POST_REGISTER  = 'user/POST_REGISTER';

const actions = createActions({
    [GET_USER]: () => {},
    [POST_LOGIN]: () => {},
    [POST_REGISTER]: () => {}
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
        [POST_REGISTER]: (state, { payload }) => {
            
            return payload;
        },

    },
    initialState
);

export default userReducer;


