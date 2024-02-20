 
import { createActions, handleActions } from 'redux-actions';

/*초기값*/
const initialState = {
    data: []
  };
  

/*액션*/ 

 
export const POST_SCHEDULE     ="calendar/POST_SCHEDULE";
export const GET_SCHEDULES     ="calendar/GET_SCHEDULES";
export const DELETE_SCHEDULE   ="calendar/DELETE_SCHEDULE"


const actions = createActions({
 
    [POST_SCHEDULE]:() => {},
    [GET_SCHEDULES]:() => {},
    [DELETE_SCHEDULE]:() => {},

});

/* 리듀서 */ 
const scheduleReducer = handleActions(
    {
        [GET_SCHEDULES]: (state, { payload }) => {

            return payload;
        }
    },   
     {
        [POST_SCHEDULE]: (state, { payload }) => {

            return payload;
        }
    },
    {
    [DELETE_SCHEDULE]: (state, { payload }) => {
        // 삭제된 스케줄을 상태에서 제거해야 합니다.
        const newData = state.data.filter(schedule => schedule.schNo !== payload.schNo);
        return { ...state, data: newData };
      }
    },
 
    initialState
  );

export default scheduleReducer;