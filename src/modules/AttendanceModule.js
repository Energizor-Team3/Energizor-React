import { createActions, handleActions } from "redux-actions";

// 초기값
const initialState = {};

// 액션 타입 정의
export const GET_EMPLOYEE_COMMUTE = 'attendance/all-users-list/GET_EMPLOYEE_COMMUTE';
export const GET_ATTENDANCE_COMMUTE = 'attendance/user-list/GET_ATTENDANCE_COMMUTE';
export const POST_ATTENDANCE_COMMUTE = 'attendance/start-register/POST_ATTENDANCE_COMMUTE';
export const PUT_ATTENDACE_COMMUTE = 'attendace/end-register/PUT_ATTENDACE_COMMUTE';

// 액션 생성자 함수 생성
const actions = createActions({
    [GET_EMPLOYEE_COMMUTE]: () => {},
    [GET_ATTENDANCE_COMMUTE]: () => {},
    [POST_ATTENDANCE_COMMUTE]: () => {},
    [PUT_ATTENDACE_COMMUTE]: () => {}
});

// 리듀서
const attendanceReducer = handleActions(
    {
        [GET_EMPLOYEE_COMMUTE]: (state, { payload }) => {
            return payload;
        },
        [GET_ATTENDANCE_COMMUTE]: (state, { payload }) => {
            return payload;
        },
        [POST_ATTENDANCE_COMMUTE]: (state, { payload }) => {
            return payload;
        },
        [PUT_ATTENDACE_COMMUTE]: (state, { payload }) => {
            return payload;
        }
    }, initialState
);

export default attendanceReducer;