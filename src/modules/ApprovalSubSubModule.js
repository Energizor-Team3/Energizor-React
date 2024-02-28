import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */

export const GET_APPROVAL_SELECTPROXY2 = 'approval/GET_APPROVAL_SELECTPROXY';


const actions = createActions({
    [GET_APPROVAL_SELECTPROXY2]: () => {},

});

/* 리듀서 */
export const approvalSubSubReducer = handleActions(
    {
        [GET_APPROVAL_SELECTPROXY2]: (state, { payload }) => {
            
            return payload;
        },
      
    },
    initialState
);

export default approvalSubSubReducer;