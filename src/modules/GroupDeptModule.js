import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_GROUP_DEPT  = 'group/GET_GROUP_DEPT';


const actions = createActions({
    [GET_GROUP_DEPT]: () => {}
    
    
});

/* 리듀서 */
const groupDeptReducer = handleActions(
    {
        [GET_GROUP_DEPT]: (state, { payload }) => {
            
            return payload;
        }

    },
    initialState
);

export default groupDeptReducer;