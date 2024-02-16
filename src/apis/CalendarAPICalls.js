
import {
    GET_CALENDAR,
    POST_SCHEDULE,
    GET_SCHEDULE
} from '../modules/CalendarModule.js';

export const callCalendarListAPI = ({ userCode }) => { 
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/calendar/calendarsByUserCode/${ userCode }`;
    
    return async (dispatch, getState) => {
      const result = await fetch(requestURL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
          Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
        },
      }).then((response) => response.json());
  
      console.log('[CalendarAPICalls] callCalendarListAPI RESULT : ', result);
      dispatch({ type: GET_CALENDAR, payload: result});
    };
  }

  export const callScheduleAPI = ({})

  

  export const callAddScheduleAPI = ({form}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/calendar/schedule/insert`; 
    
    return async (dispatch, getState) => {
      const result = await fetch(requestURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*",
            "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
        },
        body: JSON.stringify({
          // schNo : form.schNo,                
          schTitle : form.schTitle,
          schDetail : form.schDetail,
          schStartDate : form.schStartDate,
          schEndDate : form.schEndDate,
          schAllDay : form.schAllDay,
          schLocal : form.schLocal,
          calNo  : form.calNo
      })
      })
      .then(response => response.json());

      console.log('[CalendarAPICalls] callScheduleAPI RESULT : ', result);
      dispatch({ type: POST_SCHEDULE, payload: result});
    };
  }

// export const callCalendarListAPI = ({ userCode }) => { 
//     const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/calendar/calendarsByUserCode/${ userCode }`;
    
//     return async (dispatch, getState) => {
//         const result = await fetch( requestURL, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Accept: '*/*',
//                 Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
//             },
//         }).then((response) => response.json());

//             console.log('[CalendarAPICalls] callProjectDetailAPI RESULT : ',
//          result);
//          dispatch({ type: GET_CALENDAR, payload: result.data});
            
//         };
// }