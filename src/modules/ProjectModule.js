import { createActions, handleActions } from "redux-actions";


/*초기값*/

const initialState =[];


/*액션*/

export const GET_PROJECT='project/GET_PROJECT';


const actions = createActions ( {
    [GET_PROJECT]: () => {} 
});

/*리듀서*/

const projectReducer = handleActions(
    {
        [GET_PROJECT]: (state, { payload }) => {
            return payload;
        },
    },
    initialState
);

export default projectReducer;