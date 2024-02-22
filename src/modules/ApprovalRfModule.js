import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_APPROVAL_FINDRFUSER = 'approval/GET_APPROVAL_FINDRFUSER';

const actions = createActions({
    [GET_APPROVAL_FINDRFUSER]: () => {}
});

/* 리듀서 */
export const approvalRfReducer = handleActions(
    {
        [GET_APPROVAL_FINDRFUSER]: (state, { payload }) => {
            
            return payload;
        }
      
    },
    initialState
);

export default approvalRfReducer;