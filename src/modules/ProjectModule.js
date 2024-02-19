import { createActions, handleActions } from "redux-actions";


/*초기값*/

const initialState = {
    projects: []
};


/*액션*/

export const GET_PROJECT='project/GET_PROJECT';
export const GET_PROJECTS='projects/GET_PROJECTS';


const actions = createActions ( {
    [GET_PROJECT]: () => {} ,
    [GET_PROJECTS]:() => {}
});

/*리듀서*/

const projectReducer = handleActions(
    {
        [GET_PROJECTS]: (state, { payload }) => {
            return { ...state, data: payload.data }; // 전체 프로젝트 목록 업데이트
        },
        [GET_PROJECT]: (state, { payload }) => {

            return { ...state, data: payload };
        }
    },
    initialState
);

export default projectReducer;