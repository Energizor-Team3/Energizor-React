import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const POST_DEPT_INSERT  = 'group/POST_DEPT_INSERT';
export const POST_TEAM_INSERT  = 'group/POST_TEAM_INSERT';
export const POST_DEPT_UPDATE = 'group/POST_DEPT_UPDATE'

const actions = createActions({
    [POST_DEPT_INSERT]: () => {},
    [POST_TEAM_INSERT]: () => {},
    [POST_DEPT_UPDATE]: () => {}
    
});

/* 리듀서 */
const groupAdminReducer = handleActions(
    {
        [POST_DEPT_INSERT]: (state, { payload }) => {
            
            return payload;
        },

        [POST_TEAM_INSERT]: (state, { payload }) => {
            
            return payload;
        },

        [POST_DEPT_UPDATE]: (state, { payload }) => {
            
            return payload;
        }

    },
    initialState
);

export default groupAdminReducer;