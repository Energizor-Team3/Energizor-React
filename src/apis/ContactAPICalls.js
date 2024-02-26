import {
    GET_COMPANY_CONTACT,
    GET_PERSONAL_CONTACT,
    POST_PERSONAL_CONTACT,
    PUT_PERSONAL_CONTACT,
    DELETE_PERSONAL_CONTACT
} from '../modules/ContactModule';

// 회사 연락처 조회
export const callCompanyAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/contact/company-list`;

    return async (dispatch, getState) => {
        try {
            const result = await fetch ( requestURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
                },
            }).then((response) => response.json());
    
            console.log('[ContactAPICalls] callCompanyAPI RESULT : ', result);
            dispatch({type: GET_COMPANY_CONTACT, payload: result.data});
        } catch (error) {
            console.error('Error fetching company contacts:', error);
        }
    };
};

// 개인 연락처 조회
export const callPersonalAPI = ({ userCode }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/contact/personal-list/${userCode}`;

    return async (dispatch, getState) => {
        try {
            const result = await fetch ( requestURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
                },
            }).then((response) => response.json());
    
            console.log('[ContactAPICalls] callPersonalAPI RESULT : ', result);
            dispatch({type: GET_PERSONAL_CONTACT, payload: result.data});
        } catch (error) {
            console.error('Error fetching personal contacts:', error);
        }
    };
};

// 개인 연락처 추가
export const callPersonalPOSTAPI = ({ form }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/contact/personal-insert`;

    return async (dispatch, getState) => {
        
        try {
            const result = await fetch ( requestURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
                }, 
                body: JSON.stringify({
                    pcName: form.pcName,
                    pcCompany: form.pcCompany,
                    pcRank: form.pcRank,
                    pcDept: form.pcDept,
                    pcPhone: form.pcPhone,
                    pcEmail: form.pcEmail,
                    userCode: form.userCode
                })
            }).then((response) => response.json());
    
            console.log('[ContactAPICalls] callPersonalPOSTAPI RESULT : ', result);
            dispatch({type: POST_PERSONAL_CONTACT, payload: result});
        } catch (error) {
            console.error('Error adding personal contact:', error);
        }
    };
};

// 개인 연락처 수정
export const callPersonalPUTAPI = ({ pcCode, form }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/contact/personal-update/${pcCode}`;

    return async (dispatch, getState) => {
        try {
            const result = await fetch(requestURL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
                },
                body: JSON.stringify(form)
            }).then((response) => response.json());

            console.log('[ContactAPICalls] callPersonalPUTAPI RESULT : ', result);
            dispatch({type: PUT_PERSONAL_CONTACT, payload: result});
        } catch (error) {
            console.error('Error updating personal contact:', error);
            // 예외 처리
        }
    };
};

// 개인 연락처 삭제
export const callPersonalDELETEAPI = ( pcCode ) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/contact/personal-delete/${pcCode}`;

    return async (dispatch, getState) => {
        try {
            const result = await fetch(requestURL, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
                },
            })

            console.log('[ContactAPICalls] callPersonalDELETEAPI RESULT : ', result);
            dispatch({type: DELETE_PERSONAL_CONTACT, payload: result});
        } catch (error) {
            console.error("Error deleting personal contact:", error);
            // 예외 처리
        }
    };
};


