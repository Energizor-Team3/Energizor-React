import { createActions, handleActions } from 'redux-actions';

//예약수정

/* 초기값 */
const initialState = [];

/* 액션 */
export const PUT_RESERVATION_MODIFY = 'reservation/PUT_RESERVATION_MODIFY';

const actions = createActions({
    [PUT_RESERVATION_MODIFY]: () => {},
  })

  /* 리듀서 */
const reservationModifyReducer = handleActions(
    {
      // 이전 상태를 그대로 반환하도록 수정
      [PUT_RESERVATION_MODIFY]: (state, { payload }) => {
        return payload;
      },
    },
    initialState
  );
  
  export default reservationModifyReducer;
  