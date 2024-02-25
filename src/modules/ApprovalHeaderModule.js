import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_APPROVAL_INBOXAPPROVAL1 = 'approval/GET_APPROVAL_INBOXAPPROVAL';
export const POST_APPROVAL_INSERTSHAREDDOCUMENT = 'approval/POST_APPROVAL_INSERTSHAREDDOCUMENT';


const actions = createActions({
    [GET_APPROVAL_INBOXAPPROVAL1]: () => {},
    [POST_APPROVAL_INSERTSHAREDDOCUMENT]: () => {}
    
});

/* 리듀서 */
export const approvalHeaderReducer = handleActions(
    {
        [GET_APPROVAL_INBOXAPPROVAL1]: (state, { payload }) => {
            
            return payload;
        },
        [POST_APPROVAL_INSERTSHAREDDOCUMENT]: (state, { payload }) => {
            
            return payload;
        },
       
      
    },
    initialState
);

export default approvalHeaderReducer;