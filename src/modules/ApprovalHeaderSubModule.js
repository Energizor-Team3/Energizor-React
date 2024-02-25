import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_APPROVAL_PROGRESS1 = 'approval/GET_APPROVAL_PROGRESS1';
export const GET_APPROVAL_TOTALDOCUMENT = 'approval/GET_APPROVAL_TOTALDOCUMENT';


const actions = createActions({
    [GET_APPROVAL_PROGRESS1]: () => {},
    [GET_APPROVAL_TOTALDOCUMENT]: () => {}
    
});

/* 리듀서 */
export const approvalHeaderSubReducer = handleActions(
    {
        [GET_APPROVAL_PROGRESS1]: (state, { payload }) => {
            
            return payload;
        },
        [GET_APPROVAL_TOTALDOCUMENT]: (state, { payload }) => {
            
            return payload;
        },
       
      
    },
    initialState
);

export default approvalHeaderSubReducer;