import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const POST_APPROVAL_INSERTCOMMENT = 'approval/POST_APPROVAL_INSERTCOMMENT';




const actions = createActions({
    [POST_APPROVAL_INSERTCOMMENT]: () => {},
  
    
    
});

/* 리듀서 */
export const approvalCommentReducer = handleActions(
    {
        [POST_APPROVAL_INSERTCOMMENT]: (state, { payload }) => {
            
            return payload;
        },
       
        
      
    },
    initialState
);

export default approvalCommentReducer;