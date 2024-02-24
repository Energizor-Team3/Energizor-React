import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_APPROVAL_INBOXAPPROVAL1 = 'approval/GET_APPROVAL_INBOXAPPROVAL';


const actions = createActions({
    [GET_APPROVAL_INBOXAPPROVAL1]: () => {}
    
});

/* 리듀서 */
export const approvalHeaderReducer = handleActions(
    {
        [GET_APPROVAL_INBOXAPPROVAL1]: (state, { payload }) => {
            
            return payload;
        },
       
      
    },
    initialState
);

export default approvalHeaderReducer;