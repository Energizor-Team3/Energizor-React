import { createActions, handleActions } from "redux-actions";


/*초기값*/
const initialState = [];


/*액션*/

export const GET_PROJECTS         ='projects/GET_PROJECTS';
export const GET_PROJECT          ='project/GET_PROJECT';
export const DELETE_PROJECT   ="calendar/DELETE_PROJECT";

const actions = createActions ( {
    [GET_PROJECTS]:() => {},
    [GET_PROJECT]: () => {},
    [DELETE_PROJECT]:() => {}
});

/*리듀서*/

const projectReducer = handleActions(
    {
        [GET_PROJECTS]: (state, { payload }) => {
            
            return payload;
        },
        [GET_PROJECT]: (state, { payload }) => {
            
            return payload;
        },
        [DELETE_PROJECT]: (state, { payload }) => {
            
            return payload;
        },
    },
    initialState
);

export default projectReducer;