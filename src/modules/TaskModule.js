 

 
import { createActions, handleActions } from 'redux-actions';

/*초기값*/
const initialState = {
    data: []
  };

  export const GET_TASKS     ="project/GET_TASKS";
  export const DELETE_TASK   ="calendar/DELETE_TASK";


  const actions = createActions({
 
    [GET_TASKS]:() => {},
    [DELETE_TASK]:() => {}
 

});


/* 리듀서 */ 
const taskReducer = handleActions(
    {
      [GET_TASKS]: (state, { payload }) => {

        return payload;
    },
    [DELETE_TASK]: (state, { payload }) => {

      return payload;
  },
       
    },
 
    initialState
  );

export default taskReducer;