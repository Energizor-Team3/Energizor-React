 

 
import { createActions, handleActions } from 'redux-actions';

/*초기값*/
const initialState = {
    data: []
  };

  export const GET_TASKS     ="project/GET_TASKS";
  export const DELETE_TASK   ="project/DELETE_TASK";
  export const POST_TASK     ="project/POST_TASK";
  export const PATCH_TASK    ="project/PATCH_TASK";


  const actions = createActions({
 
    [GET_TASKS]:() => {},
    [DELETE_TASK]:() => {},
    [POST_TASK]:()   => {},
    [PATCH_TASK]:()   => {},
    
 

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
    [DELETE_TASK]: (state, { payload }) => {

      return payload;
  },
    [POST_TASK]: (state, { payload }) => {

      return payload;
  },
  [PATCH_TASK]: (state, { payload }) => {

    return payload;
},
    },

 
    initialState
  );

export default taskReducer;