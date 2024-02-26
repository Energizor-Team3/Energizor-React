import { createActions, handleActions } from 'redux-actions';

//예약신청 등록

/* 초기값 */
const initialState = [];

/* 액션 */
export const POST_RESERVATION_INSERT = 'reservation/POST_RESERVATION_INSERT';

const actions = createActions({
    [POST_RESERVATION_INSERT]: () => {},
  })

  /* 리듀서 */
const reservationInsertReducer = handleActions(
    {
      // 이전 상태를 그대로 반환하도록 수정
      [POST_RESERVATION_INSERT]: (state, { payload }) => {
        return payload;
      },
    },
    initialState
  );
  
  export default reservationInsertReducer;
  