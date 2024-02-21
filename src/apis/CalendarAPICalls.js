import {
  GET_CALENDAR

} from '../modules/CalendarModule.js';
import {
POST_SCHEDULE,
GET_SCHEDULES,
GET_ONESCHEDULE,
DELETE_SCHEDULE,
PATCH_SCHEDULE
} from '../modules/ScheduleModule.js';


export const callUpdateScheduleAPI = ({ schNo, updatedData }) => {
  console.log('[CalendarAPICalls] callScheduleUpdateAPI Call');
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/calendar/schedule/update/${ schNo }`; 

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
      },
      body: JSON.stringify(updatedData)
    })
    .then(response => response.json());

    console.log('[CalendarAPICalls] callUpdateScheduleAPI RESULT : ', result);
    dispatch({ type: PATCH_SCHEDULE, payload: result});
  };
}

export const callScheduleDetailAPI = ({ schNo }) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/calendar/schedule/detail/${ schNo }`;

  return async (dispatch, getState) => {
      const result = await fetch(requestURL, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              Accept: '*/*',
              Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
          },
      }).then((response) => response.json());

      console.log('[CalendarAPICalls] callOneScheduleAPI RESULT : ', result);
      if (result.status === 200) {
          console.log('[CalendarAPICalls] callOneScheduleAPI RESULT : ');
          dispatch({ type: GET_ONESCHEDULE, payload: result.data });
      }
  };
};


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

export const callSchedulesAPI = ({ userCode }) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/calendar/scheduleByUserCode/${ userCode }`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
      },
    }).then((response) => response.json());

    console.log('[CalendarAPICalls] callScheduleListAPI RESULT : ', result);
    dispatch({ type: GET_SCHEDULES, payload: result});
  };
}



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

    console.log('[CalendarAPICalls] callAddScheduleAPI RESULT : ', result);
    dispatch({ type: POST_SCHEDULE, payload: result});
  };

}
export const callDeleteScheduleAPI = ({ schNo }) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/calendar/schedule/delete/${ schNo }`; 

  return async (dispatch, getState) => {
    const result = 
      await fetch(requestURL, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
          Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
        },
      })
      .then(response => response.json());

      console.log('[CalendarAPICalls] callDeleteScheduleAPI RESULT : ', result);
      dispatch({ type: DELETE_SCHEDULE, payload: result});
    };
}


// export const callSchedulUpdateAPI = ({ form })=> {
//   console.log('[CalendarAPICalls] callScheduleUpdateAPI Call');
//   const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/calendar/schedule/update/${ schNo }`;
  
//   return async (dispatch, getState) => {
//       const result = await fetch(requestURL, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//           Accept: '*/*',
//           Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
//         },
//         body: JSON.stringify({
//           schNo : form.schNo,                
//           schTitle : form.schTitle,
//           schDetail : form.schDetail,
//           schStartDate : form.schStartDate,
//           schEndDate : form.schEndDate,
//           schAllDay : form.schAllDay,
//           schLocal : form.schLocal,
//           calNo  : form.calNo})

//     }).then((response) => response.json());

//     console.log('[CalendarAPICalls] callScheduleUpdateAPI RESULT : ', result);

//     dispatch({ type: PATCH_SCHEDULE, payload: result });
//     };
//   }









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