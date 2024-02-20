import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_RESERVATION_ATTENDEE = "reservation/GET_RESERVATION_ATTENDEE";

const actions = createActions({
  [GET_RESERVATION_ATTENDEE]: () => {},
});

/* 리듀서 */
const reservationAttendeeReducer = handleActions(
  {
    // 이전 상태를 그대로 반환하도록 수정
    [GET_RESERVATION_ATTENDEE]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default reservationAttendeeReducer;
