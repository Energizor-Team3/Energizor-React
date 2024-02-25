import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_APPROVAL_FINDLINEUSER = 'approval/GET_APPROVAL_FINDLINEUSER';
export const PUT_APPROVAL_REJECTION = 'approval/PUT_APPROVAL_REJECTION';
export const GET_APPROVAL_LINEDOCUMENTCOMPLETE  = 'approval/GET_APPROVAL_LINEDOCUMENTCOMPLETE';
export const GET_APPROVAL_TOTALDOCUMENT  = 'approval/GET_APPROVAL_TOTALDOCUMENT';
export const GET_APPROVAL_LINEDOCUMENT  = 'approval/GET_APPROVAL_LINEDOCUMENT';

const actions = createActions({
    [GET_APPROVAL_FINDLINEUSER]: () => {},
    [PUT_APPROVAL_REJECTION]: () => {},
    [GET_APPROVAL_LINEDOCUMENTCOMPLETE]: () => {},
    [GET_APPROVAL_TOTALDOCUMENT]: () => {},
    [GET_APPROVAL_LINEDOCUMENT]: () => {}
});

/* 리듀서 */
export const approvalLineReducer = handleActions(
    {
        [GET_APPROVAL_FINDLINEUSER]: (state, { payload }) => {
            
            return payload;
        },
        [PUT_APPROVAL_REJECTION]: (state, { payload }) => {
            
            return payload;
        },
        [GET_APPROVAL_LINEDOCUMENTCOMPLETE]: (state, { payload }) => {
            
            return payload;
        },
        [GET_APPROVAL_TOTALDOCUMENT]: (state, { payload }) => {
            
            return payload;
        },
        [GET_APPROVAL_LINEDOCUMENT]: (state, { payload }) => {
            
            return payload;
        }
      
    },
    initialState
);

export default approvalLineReducer;