import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_CONTACT = 'contact/personal-list/GET_CONTACT';

const actions = createActions (
    {
    [GET_CONTACT] : () => {}
});

/* 리듀서 */
const contactReducer = handleActions (
    {
        [GET_CONTACT]: (state, { payload }) => {

            return payload;
        },
    },
    initialState
);

export default contactReducer;