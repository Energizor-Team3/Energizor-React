import{
    GET_PROJECT
} from '../modules/ReservationModules.js';

export const callProjectDetailAPI = ({ proNo }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/reservation/all`;

    return async (dispatch, getState) => {
        const result = await fetch( requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());

            console.log('[ProjectAPICalls] callProjectDetailAPI RESULT : ',
         result);
       
            
        };
        
    };
