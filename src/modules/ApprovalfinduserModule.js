import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */

export const GET_APPROVAL_FINDLINEUSER = 'approval/GET_APPROVAL_FINDLINEUSER';


const actions = createActions({
    
    [GET_APPROVAL_FINDLINEUSER]: () => {},
    
});

/* 리듀서 */
export const approvalfinduserReducer = handleActions(
    {
        
        [GET_APPROVAL_FINDLINEUSER]: (state, { payload }) => {
            
            return payload;
        }
      
    },
    initialState
);

export default approvalfinduserReducer;