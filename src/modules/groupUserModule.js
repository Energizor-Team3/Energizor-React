import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_GROUP_User  = 'group/GET_GROUP_User';




const actions = createActions({
    [GET_GROUP_User]: () => {}
    
    
});

/* 리듀서 */
export const groupUserReducer = handleActions(
    {
        [GET_GROUP_User]: (state, { payload }) => {
            
            return payload;
        }
      
    },
    initialState
);

export default groupUserReducer;