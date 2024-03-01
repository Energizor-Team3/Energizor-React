import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */

export const GET_APPROVAL_TOTALDOCUMENTPROCEEDING = 'approval/GET_APPROVAL_TOTALDOCUMENTPROCEEDING';


const actions = createActions({
    
    [GET_APPROVAL_TOTALDOCUMENTPROCEEDING]: () => {}
    
});

/* 리듀서 */
export const approvaltotaldocumentReducer = handleActions(
    {
        
        [GET_APPROVAL_TOTALDOCUMENTPROCEEDING]: (state, { payload }) => {
            
            return payload;
        },
       
        
    },
    initialState
);


export default approvaltotaldocumentReducer;