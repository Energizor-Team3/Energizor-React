import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_APPROVAL_SELECTFILE = 'approval/GET_APPROVAL_SELECTFILE';


const actions = createActions({
    [GET_APPROVAL_SELECTFILE]: () => {},
    
});

/* 리듀서 */
export const approvalFileReducer = handleActions(
    {
        [GET_APPROVAL_SELECTFILE]: (state, { payload }) => {
            
            return payload;
        }
      
    },
    initialState
);

export default approvalFileReducer;