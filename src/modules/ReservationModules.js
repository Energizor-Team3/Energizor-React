import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_RESERVATION_DETAILS = 'reservation/GET_RESERVATION_DETAILS';
export const GET_RESERVATION_ATTENDEE = 'reservation/GET_ATTENDEE_DETAILS';


const actions = createActions({
    [GET_RESERVATION_DETAILS]: () => {},
    [GET_RESERVATION_ATTENDEE]: () => {}
    
});

/* 리듀서 */
export const reservationReducer = handleActions(
    {
        [GET_RESERVATION_DETAILS]: (state, { payload }) => {
            
            return payload;
        },

         // 이전 상태를 그대로 반환하도록 수정
         [GET_RESERVATION_ATTENDEE]: (state, { payload }) => {
            return state;
        }
    },
    initialState
);

export default reservationReducer;