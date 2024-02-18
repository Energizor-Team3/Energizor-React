import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_GROUP_Organization  = 'group/GET_GROUP_Organization';




const actions = createActions({
    [GET_GROUP_Organization]: () => {}
    
    
});

/* 리듀서 */
export const groupReducer = handleActions(
    {
        [GET_GROUP_Organization]: (state, { payload }) => {
            
            return payload;
        }
      
    },
    initialState
);

export default groupReducer;