import{
    GET_RESERVATION_DETAILS

} from '../modules/ReservationModules';

export const callResevationDetailAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/reservation/all`;

    return async (dispatch, getState) => {
console.log('내예약내역 확인하기');

        const result = await fetch( requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
            }
        })
        .then((response) => response.json());

            console.log('[ReservationAPICall] callResevationDetailAPI RESULT : ', result);
       
            
            dispatch({ type: GET_RESERVATION_DETAILS,  payload: result.data });
        
        };
    }
