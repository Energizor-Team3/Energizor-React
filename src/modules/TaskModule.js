 

 
import { createActions, handleActions } from 'redux-actions';

/*초기값*/
const initialState = {
    data: []
  };

  export const GET_TASKS     ="project/GET_TASKS";


  const actions = createActions({
 
    [GET_TASKS]:() => {},
 

});


/* 리듀서 */ 
const taskReducer = handleActions(
    {
      [GET_TASKS]: (state, { payload }) => {

        return payload;
    },
       
    },
 
    initialState
  );

export default taskReducer;
