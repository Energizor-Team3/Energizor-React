 
import { createActions, handleActions } from 'redux-actions';

/*초기값*/
const initialState = {
    data: []
  };
  

/*액션*/ 

 
export const POST_SCHEDULE     ="calendar/POST_SCHEDULE";
export const GET_SCHEDULES     ="calendar/GET_SCHEDULES";
export const DELETE_SCHEDULE   ="calendar/DELETE_SCHEDULE";
export const PATCH_SCHEDULE    ="calendar/PATCH_SCHEDULE";
export const GET_ONESCHEDULE   ="calendar/GET_ONESCHEDULE"


const actions = createActions({
 
    [POST_SCHEDULE]:() => {},
    [GET_SCHEDULES]:() => {},
    [DELETE_SCHEDULE]:() => {},
    [PATCH_SCHEDULE]:()  => {},
    [GET_ONESCHEDULE]:()  => {},

});

/* 리듀서 */ 
const scheduleReducer = handleActions(
    {
      [GET_ONESCHEDULE]: (state, { payload }) => {

        return payload;
    },
        [GET_SCHEDULES]: (state, { payload }) => {

            return payload;
        },
        [POST_SCHEDULE]: (state, { payload }) => {

            return payload; 
        },
        [DELETE_SCHEDULE]: (state, { payload }) => {
        
      // 삭제된 스케줄을 상태에서 제거
        const newData = state.data.filter(schedule => schedule.schNo !== payload.schNo);
        return { ...state, data: newData };
      },
      [PATCH_SCHEDULE]: (state, { payload }) => {

        return payload;
    }   
    },
 
    initialState
  );

export default scheduleReducer;