import { createActions, handleActions } from 'redux-actions';

/*초기값*/
const initialState = {
    data: []
  };
  

/*액션*/ 

 
export const POST_SCHEDULE    ="calendar/POST_SCHEDULE";
export const GET_SCHEDULES     ="calendar/GET_SCHEDULES";


const actions = createActions({
 
    [POST_SCHEDULE]:() => {},
    [GET_SCHEDULES]:() => {}
});

/* 리듀서 */ 
const scheduleReducer = handleActions(
    {
        [GET_SCHEDULES]: (state, { payload }) => {

            return payload;
        }
    },    {
        [POST_SCHEDULE]: (state, { payload }) => {

            return payload;
        }
    },
    initialState
  );

export default scheduleReducer;