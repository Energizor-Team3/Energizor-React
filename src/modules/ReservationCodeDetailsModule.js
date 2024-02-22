import { createActions, handleActions } from 'redux-actions';

//내 예약내역 상세 조회 

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_RESERVATION_CODE_DETAILS = 'reservation/GET_RESERVATION_CODE_DETAILS';


const actions = createActions({
    [GET_RESERVATION_CODE_DETAILS]: () => {}
    
});

/* 리듀서 */
const reservationCodeReducer = handleActions(
    {
        [GET_RESERVATION_CODE_DETAILS]: (state, { payload }) => {
            
            return payload;
        }
    },
    initialState
);

export default reservationCodeReducer;