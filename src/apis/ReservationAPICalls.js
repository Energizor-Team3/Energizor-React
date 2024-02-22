import { GET_RESERVATION_DETAILS } from "../modules/ReservationModules";
import { PUT_RESERVATION_MODIFY } from "../modules/ReservationModifyModule";
import { GET_RESERVATION_ATTENDEE } from "../modules/ReservationAttendeeModule";
import { GET_RESERVATION_TOTAL_DETAILS } from './../modules/ReservationTotalModules ';


// 전체 예약내역  조회
export const callResevationTotalDetailAPI = () => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/reservation/total`;

  return async (dispatch, getState) => {
    console.log("전체예약내역 확인하기");

    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    console.log(
      "[ReservationAPICall] callResevationTotalDetailAPI RESULT : ",
      result
    );

    dispatch({
      type: "reservation/GET_RESERVATION_TOTAL_DETAILS",
      payload: result.data,
    });
  };
};

// 내 예약내역 전체 조회
export const callResevationDetailAPI = () => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/reservation/all`;

  return async (dispatch, getState) => {
    console.log("내예약내역 확인하기");

    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    console.log(
      "[ReservationAPICall] callResevationDetailAPI RESULT : ",
      result
    );

    dispatch({
      type: "reservation/GET_RESERVATION_DETAILS",
      payload: result.data,
    });
  };
};

// 내 예약내역 상세 조회 
export const callResevationCodeDetailAPI = ({ reservationCode }) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/reservation/${reservationCode}`;

  return async (dispatch, getState) => {
    console.log("내 예약내역 상세조회");

    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    console.log('[ReservationAPICalls] callResevationCodeDetailAPI RESULT : ', result);
        if(result.status === 200){
            console.log('[ReservationAPICalls] callResevationCodeDetailAPI SUCCESS');
            dispatch({ type: 'reservation/GET_RESERVATION_CODE_DETAILS',  payload: result });
        }

        
    };
}


// 예약코드내 참석자 조회
export const callAttendeeDetailAPI = ({ reservationCode }) => {
  console.log(reservationCode, "sssssssssssssssssssssssssssss");

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/reservation/attendee/${reservationCode}`;

  return async (dispatch, getState) => {
    console.log("참석자 확인하기");

    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    console.log("[ReservationAPICall] callAttendeeDetailAPI RESULT : ", result);

    dispatch({ type: GET_RESERVATION_ATTENDEE, payload: result.data });
  };
};

// 예약수정
export const callResevationModifyAPI = () => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/reservation/modify`;

  return async (dispatch, getState) => {
    console.log("예약수정");

    const result = await fetch(requestURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    console.log(
      "[ReservationAPICall] callResevationModifyAPI RESULT : ",
      result
    );

    dispatch({
      type: "reservation/PUT_RESERVATION_MODIFY",
      payload: result.data,
    });
  };
};
