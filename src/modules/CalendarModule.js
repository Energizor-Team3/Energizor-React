import { createActions, handleActions } from 'redux-actions';

/*초기값*/
const initialState = {
    data: []
  };
  

/*액션*/ 

export const GET_CALENDAR     ="calendar/GET_CALENDAR";
export const POST_CALENDAR    ="calendar/POST_CALENDAR";
export const DELETE_CALENDAR   ="calendar/DELETE_CALENDAR";
 


const actions = createActions({
    [GET_CALENDAR]: () => {},
    [POST_CALENDAR]:() => {},
    [DELETE_CALENDAR]:() => {}
 
});

/* 리듀서 */ 
const calendarReducer = handleActions(
    {
        [GET_CALENDAR]: (state, { payload }) => {

            return payload;
        },
   
        [POST_CALENDAR]: (state, { payload }) => {

            return payload; 
        },
        [DELETE_CALENDAR]: (state, { payload }) => {
        
            // 삭제된 스케줄을 상태에서 제거
              const newData = state.data.filter(calendar => calendar.calNo !== payload.calNo);
              return { ...state, data: newData };
            },
 },
    
    initialState
);

export default calendarReducer;

