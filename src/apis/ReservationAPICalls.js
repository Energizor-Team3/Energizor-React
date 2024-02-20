import { GET_RESERVATION_DETAILS } from "../modules/ReservationModules";
import { PUT_RESERVATION_MODIFY } from "../modules/ReservationModifyModule";
import { GET_RESERVATION_ATTENDEE } from "../modules/ReservationAttendeeModule";

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
      type: "reservation/GET_RESERVATION_MODIFY",
      payload: result.data,
    });
  };
};
