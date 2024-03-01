import { GET_RESERVATION_DETAILS } from "../modules/ReservationModules";
import { PUT_RESERVATION_MODIFY } from "../modules/ReservationModifyModule";
import { GET_RESERVATION_ATTENDEE } from "../modules/ReservationAttendeeModule";
import { GET_RESERVATION_TOTAL_DETAILS } from "./../modules/ReservationTotalModules ";
import { POST_RESERVATION_INSERT } from "../modules/ReservationInsertModule";

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

    console.log(
      "[ReservationAPICalls] callResevationCodeDetailAPI RESULT : ",
      result
    );
    if (result.status === 200) {
      console.log("[ReservationAPICalls] callResevationCodeDetailAPI SUCCESS");
      dispatch({
        type: "reservation/GET_RESERVATION_CODE_DETAILS",
        payload: result,
      });
    }
  };
};

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

// //예약신청 등록
// export const callReservationInsertAPI = (formData) => {
//   const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/reservation/create`;

//   console.log('formData$$$ : ',formData);

//   return async (dispatch, getState) => {
//     console.log("예약신청 등록");

//     try {
//       console.log(formData,'formData222222222222222222222222222222');
//       const result = await fetch(requestURL, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "*/*",
//           Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
//         },
//         body: JSON.stringify({
//           meetCode: formData.meetCode,
//           reservationContent: formData.reservationContent,
//           startTime: formData.startTime,
//           endTime: formData.endTime,
//           startDate: formData.startDate,
//           endDate: formData.endDate,
//           member: formData.member,
//         }),
//       }).then((response) => response.json());

//       console.log("[ReservationAPICall] callReservationInsertAPI RESULT****************** : ", result);

//       // 예약 등록 성공 시 액션 디스패치
//       dispatch({
//         type: POST_RESERVATION_INSERT,
//         payload: result,
//       });

//       // 예약 등록 성공 메시지 또는 다른 작업 수행
//       // 예: 사용자에게 알림 표시, 페이지 리디렉션 등
//     } catch (error) {
//       console.error("예약 등록 중 오류가 발생했습니다.", error);
//       // 예약 등록 실패 메시지 또는 오류 처리
//       // 예: 사용자에게 오류 메시지 표시, 재시도 요청 등
//     }
//   };
// };

// export const callReservationInsertAPI = ({ form }) => {
//   const formData = new FormData();

//   formData.append("reservationContent", form.reservationContent);
//   formData.append("meet", form.meetCode);
//   formData.append("member", form.member); // 배열을 문자열로 변환하여 전송
//   formData.append("startTime", form.startTime);
//   formData.append("endTime", form.endTime);
//   const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/reservation/create`;

//   console.log(form, "api에서 폼이다222222222222222222222222");
//   return async (dispatch, getState) => {
//     console.log("들옴?");
//     const result = await fetch(requestURL, {
//       method: "POST",
//       headers: {
        
//         Accept: "*/*",
//         Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
//       },
//       body: formData,
//     }).then((response) => response.json());

//     console.log(
//       "[ReservationAPICalls]@@@@@@@@@@callReservationInsertAPI RESULT : ",
//       result
//     );

//     dispatch({ type: POST_RESERVATION_INSERT , payload: result });
//   };
// };


export const callReservationInsertAPI = ({ form }) => {
  // FormData 대신에 직접 JSON 객체를 생성합니다.
  const jsonBody = {
    reservationContent: form.reservationContent,
    meet: form.meetCode,
    member: form.member, // 배열 그대로 전송합니다.
    startTime: form.startTime,
    endTime: form.endTime,
    reservationDate: form.reservationDate,
  };

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/reservation/create`;

  console.log(jsonBody, "api에서 폼이다222222222222222222222222");

  return async (dispatch, getState) => {
    console.log("들옴?");
    const result = await fetch(requestURL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json', // JSON 형식으로 전송을 명시합니다.
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(jsonBody), // JSON 객체를 문자열로 변환하여 전송합니다.
    }).then((response) => response.json());

    console.log(
      "[ReservationAPICalls]@@@@@@@@@@callReservationInsertAPI RESULT : ",
      result
    );
    

    dispatch({ type: POST_RESERVATION_INSERT, payload: result });
  };
};