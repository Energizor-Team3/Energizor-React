import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_APPROVAL_FINDLINEUSER = 'approval/GET_APPROVAL_FINDLINEUSER';
export const PUT_APPROVAL_REJECTION = 'approval/PUT_APPROVAL_REJECTION';

const actions = createActions({
    [GET_APPROVAL_FINDLINEUSER]: () => {},
    [PUT_APPROVAL_REJECTION]: () => {}
});

/* 리듀서 */
export const approvalLineReducer = handleActions(
    {
        [GET_APPROVAL_FINDLINEUSER]: (state, { payload }) => {
            
            return payload;
        },
        [PUT_APPROVAL_REJECTION]: (state, { payload }) => {
            
            return payload;
        }
      
    },
    initialState
);

export default approvalLineReducer;