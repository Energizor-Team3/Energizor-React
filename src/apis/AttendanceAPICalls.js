import {
    GET_EMPLOYEE_COMMUTE,
    GET_ATTENDANCE_COMMUTE,
    POST_ATTENDANCE_COMMUTE,
    PUT_ATTENDACE_COMMUTE
} from '../modules/AttendanceModule';

// 출퇴근 전직원 목록 조회
export const callEmployeeAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/attendance/all-users-list`;

    return async (dispatch, getState) => {
        try {
            const result = await fetch ( requestURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
                },
            }).then((response) => response.json());

            console.log('[AttendanceAPICalls] callEmployeeAPI RESULT : ', result);
            dispatch({type: GET_EMPLOYEE_COMMUTE, payload: result.data});
        } catch (error) {
            console.error('Error fetching employee commutes:', error);
        }
    };
};

// 출퇴근 목록 조회
export const callAttendanceAPI = ({ userCode }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/attendance/user-list/${userCode}`;

    return async (dispatch, getState) => {
        try {
            const result = await fetch ( requestURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
                },
            }).then((response) => response.json());

            console.log('[AttendanceAPICalls] callAttendanceAPI RESULT : ', result);
            dispatch({type: GET_ATTENDANCE_COMMUTE, payload: result.data});
        } catch (error) {
            console.error('Error fetching attendance commutes:', error);
        }
    };
};

// 출근 도장
export const callAttendancePOSTAPI = ({ form }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/attendance/start-register`;

    return async (dispatch, getstate) => {
        // const requestData = {
        //     cStartTime: form.cStartTime
        // };

        try {
            const result = await fetch ( requestURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
                },
                body: JSON.stringify({
                    // requestData
                    cCode: form.cCode,
                    cStartTime: form.cStartTime,
                    cEndTime: form.cEndTime,
                    cState: form.cState,
                    userCode: form.userCode
                })
            }).then((response) => response.json());

            console.log('[AttendanceAPICalls] callAttendancePOSTAPI RESULT : 왜안돼 ', result);
            dispatch({type: POST_ATTENDANCE_COMMUTE, payload: result});
        } catch (error) {
            console.error('Error adding attendance commutes:', error);
        }
    };
};

// 퇴근 도장
export const callAttendancePUTAPI = ({ cCode, form }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/attendance/end-register/${cCode}`;

    return async (dispatch, getState) => {
        try {
            const result = await fetch(requestURL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
                },
                body: JSON.stringify(form)
            }).then((response) => response.json());

            console.log('[AttendanceAPICalls] callAttendancePUTAPI RESULT : ', result);
            dispatch({type: PUT_ATTENDACE_COMMUTE, payload: result});
        } catch (error) {
            console.error('Error updating attendance commutes:', error);
        }
    };
};