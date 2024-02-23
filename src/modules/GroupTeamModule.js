import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_GROUP_TEAM  = 'group/GET_GROUP_TEAM';




const actions = createActions({
    [GET_GROUP_TEAM]: () => {}
    
    
});

/* 리듀서 */
 const groupTeamReducer = handleActions(
    {
        [GET_GROUP_TEAM]: (state, { payload }) => {
            
            return payload;
        }
      
    },
    initialState
);

export default groupTeamReducer;