import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_APPROVAL_FINDRFUSER = 'approval/GET_APPROVAL_FINDRFUSER';
export const GET_APPROVAL_RFDOCUMENTCOMPLETE  = 'approval/GET_APPROVAL_RFDOCUMENTCOMPLETE';
export const GET_APPROVAL_RFDOCUMENT  = 'approval/GET_APPROVAL_RFDOCUMENT';

const actions = createActions({
    [GET_APPROVAL_FINDRFUSER]: () => {},
    [GET_APPROVAL_RFDOCUMENTCOMPLETE]: () => {},
    [GET_APPROVAL_RFDOCUMENT]: () => {}
});

/* 리듀서 */
export const approvalRfReducer = handleActions(
    {
        [GET_APPROVAL_FINDRFUSER]: (state, { payload }) => {
            
            return payload;
        },
        [GET_APPROVAL_RFDOCUMENTCOMPLETE]: (state, { payload }) => {
            
            return payload;
        },
        [GET_APPROVAL_RFDOCUMENT]: (state, { payload }) => {
            
            return payload;
        }
      
    },
    initialState
);

export default approvalRfReducer;