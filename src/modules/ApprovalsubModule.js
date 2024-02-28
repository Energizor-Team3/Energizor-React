import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */

export const GET_APPROVAL_SELECTPROXY = 'approval/GET_APPROVAL_SELECTPROXY';
export const PUT_APPROVAL_APPROVEMENT = 'approval/PUT_APPROVAL_APPROVEMENT';
export const PUT_APPROVAL_UPDATEPROXY = 'approval/PUT_APPROVAL_UPDATEPROXY';
export const GET_APPROVAL_REJECTION2 = 'approval/GET_APPROVAL_REJECTION2';

const actions = createActions({
    
    [PUT_APPROVAL_APPROVEMENT]: () => {},
    [GET_APPROVAL_SELECTPROXY]: () => {},
    [PUT_APPROVAL_UPDATEPROXY]: () => {},
    [GET_APPROVAL_REJECTION2]: () => {}
});

/* 리듀서 */
export const approvalSubReducer = handleActions(
    {
        
        [PUT_APPROVAL_APPROVEMENT]: (state, { payload }) => {
            
            return payload;
        },
        [GET_APPROVAL_SELECTPROXY]: (state, { payload }) => {
            
            return payload;
        },
        [PUT_APPROVAL_UPDATEPROXY]: (state, { payload }) => {
            
            return payload;
        },
        [GET_APPROVAL_REJECTION2]: (state, { payload }) => {
            
            return payload;
        }
      
    },
    initialState
);

export default approvalSubReducer;