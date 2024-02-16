import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_RESERVATION_DETAILS = 'reservation/GET_RESERVATION_DETAILS';


const actions = createActions({
    [GET_RESERVATION_DETAILS]: () => {}
    
});

/* 리듀서 */
export const reservationReducer = handleActions(
    {
        [GET_RESERVATION_DETAILS]: (state, { payload }) => {
            
            return payload;
        }
      
    },
    initialState
);

export default reservationReducer;