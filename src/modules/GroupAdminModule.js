import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const POST_DEPT_INSERT  = 'group/POST_DEPT_INSERT';
export const POST_TEAM_INSERT  = 'group/POST_TEAM_INSERT';
export const POST_DEPT_UPDATE = 'group/POST_DEPT_UPDATE';
export const POST_TEAM_UPDATE = 'group/POST_TEAM_UPDATE';
export const POST_DEPT_DELETE = 'group/POST_DEPT_DELETE';


const actions = createActions({
    [POST_DEPT_INSERT]: () => {},
    [POST_TEAM_INSERT]: () => {},
    [POST_DEPT_UPDATE]: () => {},
    [POST_TEAM_UPDATE]: () => {},
    [POST_DEPT_DELETE]: () => {},

    
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
        },
        [POST_TEAM_UPDATE]: (state, { payload }) => {
            
            return payload;
        },
        [POST_DEPT_DELETE]: (state, { payload }) => {
            
            return payload;
        }

    },
    initialState
);

export default groupAdminReducer;