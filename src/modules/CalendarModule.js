import { createActions, handleActions } from 'redux-actions';

/*초기값*/
const initialState = {
    data: []
  };
  

/*액션*/ 

export const GET_CALENDAR     ="calendar/GET_CALENDAR";
export const POST_CALENDAR    ="calendar/POST_CALENDAR";
 


const actions = createActions({
    [GET_CALENDAR]: () => {},
    [POST_CALENDAR]:() => {}
 
});

/* 리듀서 */ 
const calendarReducer = handleActions(
    {
        [GET_CALENDAR]: (state, { payload }) => {

            return payload;
        },
   
        [POST_CALENDAR]: (state, { payload }) => {

            return payload; 
        }
 },
    
    initialState
);

export default calendarReducer;

