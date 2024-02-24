import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_APPROVAL_SELECTEMPDOCUMENTDETAIL = 'approval/GET_APPROVAL_SELECTEMPDOCUMENTDETAIL';
export const GET_APPROVAL_SELECTPROXY = 'approval/GET_APPROVAL_SELECTPROXY';
export const PUT_APPROVAL_APPROVEMENT = 'approval/PUT_APPROVAL_APPROVEMENT';

const actions = createActions({
    [GET_APPROVAL_SELECTEMPDOCUMENTDETAIL]: () => {},
    [PUT_APPROVAL_APPROVEMENT]: () => {},
    [GET_APPROVAL_SELECTPROXY]: () => {}
});

/* 리듀서 */
export const approvalSubReducer = handleActions(
    {
        [GET_APPROVAL_SELECTEMPDOCUMENTDETAIL]: (state, { payload }) => {
            
            return payload;
        },
        [PUT_APPROVAL_APPROVEMENT]: (state, { payload }) => {
            
            return payload;
        },
        [GET_APPROVAL_SELECTPROXY]: (state, { payload }) => {
            
            return payload;
        }
      
    },
    initialState
);

export default approvalSubReducer;