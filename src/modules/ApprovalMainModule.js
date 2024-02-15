import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_APPROVAL_InboxApproval = 'approval/GET_APPROVAL_InboxApproval';


const actions = createActions({
    [GET_APPROVAL_InboxApproval]: () => {}
    
});

/* 리듀서 */
export const approvalReducer = handleActions(
    {
        [GET_APPROVAL_InboxApproval]: (state, { payload }) => {
            
            return payload;
        }
      
    },
    initialState
);

export default approvalReducer;