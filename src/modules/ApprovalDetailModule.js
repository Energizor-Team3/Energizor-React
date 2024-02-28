import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_APPROVAL_SELECTEMPDOCUMENTDETAIL = 'approval/GET_APPROVAL_SELECTEMPDOCUMENTDETAIL';


const actions = createActions({
    [GET_APPROVAL_SELECTEMPDOCUMENTDETAIL]: () => {},
    
});

/* 리듀서 */
export const approvalDetailReducer = handleActions(
    {
        [GET_APPROVAL_SELECTEMPDOCUMENTDETAIL]: (state, { payload }) => {
            
            return payload;
        }
      
    },
    initialState
);

export default approvalDetailReducer;