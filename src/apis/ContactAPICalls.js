import { GET_CONTACT } from '../modules/ContactModule';

export const callContactAPI = ({userCode}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/contact/personal-list/${userCode}`;

    return async (dispatch, getState) => {
        const result = await fetch ( requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());

        console.log('[ContactAPICalls] callContactlAPI RESULT : ', result);
        dispatch({type: 'contact/personal-list/GET_CONTACT', payload: result.data});
    };
};














/* ---------------------------------------------------------------------- */
// import { createAction } from 'redux-actions';
// import { fetchContactData } from '../services/contactService';
// import { setContactData } from './ContactModule'; // ContactModule.js 파일에서 setContactData 액션 임포트

// export const callContactAPI = ({ cpCode }) => {
//     return async (dispatch) => {
//         try {
//             const result = await fetchContactData(cpCode); // 서비스를 통해 데이터 가져오기
//             dispatch(setContactData(result)); // 가져온 데이터를 스토어에 설정하기
//         } catch (error) {
//             console.error('Error fetching contact data:', error);
//         }
//     };
// };
