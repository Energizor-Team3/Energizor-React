import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */

export const GET_APPROVAL_SELECTCOMMENT = 'approval/GET_APPROVAL_SELECTCOMMENT';



const actions = createActions({

    [GET_APPROVAL_SELECTCOMMENT]: () => {},
    
    
});

/* 리듀서 */
export const approvalComment2Reducer = handleActions(
    {
        
        [GET_APPROVAL_SELECTCOMMENT]: (state, { payload }) => {
            
            return payload;
        },
        
      
    },
    initialState
);

export default approvalComment2Reducer;