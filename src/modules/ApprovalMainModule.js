import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_APPROVAL_InboxApproval = 'approval/GET_APPROVAL_InboxApproval';
export const GET_APPROVAL_SHAREDINBOX = 'approval/GET_APPROVAL_SHAREDINBOX';
export const GET_APPROVAL_Progress = 'approval/GET_APPROVAL_Progress';
export const POST_APPROVAL_INSERTGENERALDRAFT = 'approval/POST_APPROVAL_INSERTGENERALDRAFT';
export const GET_APPROVAL_FINDUSERDETAIL = 'approval/GET_APPROVAL_FINDUSERDETAIL';
export const POST_APPROVAL_SAVEGENERALDRAFT = 'approval/POST_APPROVAL_SAVEGENERALDRAFT';
export const POST_APPROVAL_INSERTBUSINESSTRIP = 'approval/POST_APPROVAL_INSERTBUSINESSTRIP';
export const POST_APPROVAL_SAVEBUSINESSTRIP = 'approval/POST_APPROVAL_SAVEBUSINESSTRIP';
export const POST_APPROVAL_INSERTEDUCATION = 'approval/POST_APPROVAL_INSERTEDUCATION';
export const POST_APPROVAL_SAVEEDUCATION = 'approval/POST_APPROVAL_SAVEEDUCATION';
export const POST_APPROVAL_INSERTVACATION = 'approval/POST_APPROVAL_INSERTVACATION';
export const POST_APPROVAL_SAVEVACATION = 'approval/POST_APPROVAL_SAVEVACATION';
export const GET_APPROVAL_SAVEINBOX = 'approval/GET_APPROVAL_SAVEINBOX';
export const GET_APPROVAL_APPROVALCOMPLETE = 'approval/GET_APPROVAL_APPROVALCOMPLETE';
export const POST_APPROVAL_INSERTPROXY = 'approval/POST_APPROVAL_INSERTPROXY';
export const DELETE_APPROVAL_DELETETEMPAPPROVAL = 'approval/DELETE_APPROVAL_DELETETEMPAPPROVAL';









const actions = createActions({
    [GET_APPROVAL_InboxApproval]: () => {},
    [GET_APPROVAL_SHAREDINBOX]: () => {},
    [GET_APPROVAL_Progress]: () => {},
    [POST_APPROVAL_INSERTGENERALDRAFT]: () => {},
    [GET_APPROVAL_FINDUSERDETAIL]: () => {},
    [POST_APPROVAL_SAVEGENERALDRAFT]: () => {},
    [POST_APPROVAL_INSERTBUSINESSTRIP]: () => {},
    [POST_APPROVAL_SAVEBUSINESSTRIP]: () => {},
    [POST_APPROVAL_INSERTEDUCATION]: () => {},
    [POST_APPROVAL_SAVEEDUCATION]: () => {},
    [POST_APPROVAL_SAVEVACATION]: () => {},
    [POST_APPROVAL_INSERTVACATION]: () => {},
    [GET_APPROVAL_SAVEINBOX]: () => {},
    [GET_APPROVAL_APPROVALCOMPLETE]: () => {},
    [POST_APPROVAL_INSERTPROXY]: () => {},
    [DELETE_APPROVAL_DELETETEMPAPPROVAL]: () => {}
    
    
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
        },
        [POST_APPROVAL_SAVEGENERALDRAFT]: (state, { payload }) => {
            
            return payload;
        },
        [POST_APPROVAL_INSERTBUSINESSTRIP]: (state, { payload }) => {
            
            return payload;
        },
        [POST_APPROVAL_SAVEBUSINESSTRIP]: (state, { payload }) => {
            
            return payload;
        },
        [POST_APPROVAL_INSERTEDUCATION]: (state, { payload }) => {
            
            return payload;
        },
        [POST_APPROVAL_SAVEEDUCATION]: (state, { payload }) => {
            
            return payload;
        },
        [POST_APPROVAL_SAVEVACATION]: (state, { payload }) => {
            
            return payload;
        },
        [POST_APPROVAL_INSERTVACATION]: (state, { payload }) => {
            
            return payload;
        },
        [GET_APPROVAL_SAVEINBOX]: (state, { payload }) => {
            
            return payload;
        },
        [GET_APPROVAL_APPROVALCOMPLETE]: (state, { payload }) => {
            
            return payload;
        },
        [POST_APPROVAL_INSERTPROXY]: (state, { payload }) => {
            
            return payload;
        },
        [DELETE_APPROVAL_DELETETEMPAPPROVAL]: (state, { payload }) => {
            
            return payload;
        }
      
    },
    initialState
);

export default approvalReducer;