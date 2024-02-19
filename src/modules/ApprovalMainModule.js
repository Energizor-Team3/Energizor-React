import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_APPROVAL_InboxApproval = 'approval/GET_APPROVAL_InboxApproval';
export const GET_APPROVAL_SHAREDINBOX = 'approval/GET_APPROVAL_SHAREDINBOX';
export const GET_APPROVAL_Progress = 'approval/GET_APPROVAL_Progress';
export const POST_APPROVAL_INSERTGENERALDRAFT = 'approval/POST_APPROVAL_INSERTGENERALDRAFT';
export const GET_APPROVAL_FINDUSERDETAIL = 'approval/GET_APPROVAL_FINDUSERDETAIL';




const actions = createActions({
    [GET_APPROVAL_InboxApproval]: () => {},
    [GET_APPROVAL_SHAREDINBOX]: () => {},
    [GET_APPROVAL_Progress]: () => {},
    [POST_APPROVAL_INSERTGENERALDRAFT]: () => {},
    [GET_APPROVAL_FINDUSERDETAIL]: () => {}
    
});

/* 리듀서 */
export const approvalReducer = handleActions(
    {
        [GET_APPROVAL_InboxApproval]: (state, { payload }) => {
            
            return payload;
        },
        [GET_APPROVAL_SHAREDINBOX]: (state, { payload }) => {
            
            return payload;
        },
        [GET_APPROVAL_Progress]: (state, { payload }) => {
            
            return payload;
        },
        [POST_APPROVAL_INSERTGENERALDRAFT]: (state, { payload }) => {
            
            return payload;
        },
        [GET_APPROVAL_FINDUSERDETAIL]: (state, { payload }) => {
            
            return payload;
        }
      
    },
    initialState
);

export default approvalReducer;