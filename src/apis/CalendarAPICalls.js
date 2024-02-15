import {
    GET_CALENDAR
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
  
      console.log('[CalendarAPICalls] callProjectDetailAPI RESULT : ', result);
      dispatch({ type: GET_CALENDAR, payload: result});
    };
  };