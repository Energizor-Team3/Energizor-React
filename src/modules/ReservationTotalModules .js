import { createActions, handleActions } from 'redux-actions';

// 내 예약내역 전체 조회


/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_RESERVATION_TOTAL_DETAILS = 'reservation/GET_RESERVATION_TOTAL_DETAILS';


const actions = createActions({
    [GET_RESERVATION_TOTAL_DETAILS]: () => {}
    
});

/* 리듀서 */
export const reservationTotalReducer = handleActions(
    {
        [GET_RESERVATION_TOTAL_DETAILS]: (state, { payload }) => {
            
            return payload;
        }
    },
    initialState
);

export default reservationTotalReducer;