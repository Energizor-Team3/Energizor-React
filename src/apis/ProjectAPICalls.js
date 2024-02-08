import{
    GET_PROJECT
} from '../modules/ProjectModule.js';
// export const callProjectDetailAPI = ({ proNo }) => {
//     const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/project/${proNo}`;

//     return async (dispatch, getState) => {
//         const accessToken = window.localStorage.getItem('accessToken');
//         const result = await fetch(requestURL, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Accept: '*/*',
//                 Authorization: `Bearer ${accessToken}`, // 공백 추가
//             },
//         }).then((response) => response.json());

//         console.log('[ProjectAPICalls] callProjectDetailAPI RESULT : ', result);
//         dispatch({ type: GET_PROJECT, payload: result.data });
//     };
// };
export const callProjectDetailAPI = ({ proNo }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/project/${ proNo }`;

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
         dispatch({ type: GET_PROJECT, payload: result.data});
            
        };
        
    };
