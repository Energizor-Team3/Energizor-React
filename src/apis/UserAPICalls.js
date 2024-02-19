import { GET_USER_LIST, POST_LOGIN } from '../modules/UserModule';
import { POST_SEARCHPWD } from '../modules/UserModule';

export const callLoginAPI = ({ form }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/auth/login`;

    return async (dispatch, getState) => {
        // 클라이언트 fetch mode : no-cors 사용시 application/json 방식으로 요청이 불가능
        // 보안상의 이유로 브라우저는 스크립트에서 시작한 교차 출처 HTTP요청을 제한한다.
        // 서버에서 cors 허용을 해주어야 함
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                'Access-Control-Allow-Origin': '*', // 모든 도멘인에서 접근할 수 있음을 의미 (특정도메인을 넣고싶으면 * 대신 http://test.com)
            },
            body: JSON.stringify({
                userId: form.userId,
                userPw: form.userPw,
            }),
        }).then((response) => response.json());

        console.log('[UserAPICalls] callLoginAPI RESULT : ', result);
        if (result.failType) {
            alert(result.failType)
        } else if (result.status === 200) {
            window.localStorage.setItem('accessToken', result.userInfo.accessToken);
        }
        dispatch({ type: POST_LOGIN, payload: result });
    };
};

// export const callSearchPwdAPI = ({ form }) => {
//     const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/auth/searchpwd`;

//     return async (dispatch, getState) => {

//         const result = await fetch(requestURL, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Accept: '*/*',
//                 'Access-Control-Allow-Origin': '*',
//             },
//             body: JSON.stringify({
//                 userId: form.userId,
//                 email: form.email,
//             }),
//         }).then((response) => response.json());

//         console.log('[UserAPICalls] callSearchPwdAPI RESULT : ', result);

//         dispatch({ type: POST_SEARCHPWD, payload: result });
        
//     };
// };

// UserAPICalls.js 내 callSearchPwdAPI 수정 예
export const callSearchPwdAPI = ({ form }) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`http://${process.env.REACT_APP_RESTAPI_IP}/auth/searchpwd`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({
                    userId: form.userId,
                    email: form.email,
                }),
            });

            const result = await response.json();

            // 여기에서 액션을 디스패치
            dispatch({ type: POST_SEARCHPWD, payload: result });

            // 프로미스를 이용해 결과 객체 반환
            return result;
        } catch (error) {
            console.error('API 호출 중 에러 발생:', error);
            throw error;
        }
    };
};


export const callLogoutAPI = () => {
    return async (dispatch, getState) => {
        dispatch({ type: POST_LOGIN, payload: '' });
        console.log('[UserAPICalls] callLogoutAPI RESULT : SUCCESS');
    };
};

export const callUserListAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/users/users-management`;

    return async (dispatch, getState) => {
        console.log('확인!!!!!');
        
        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());

        console.log('[UserAPICalls] callUserListAPI RESULT : ', result);

        dispatch({ type: GET_USER_LIST,  payload: result.data });
        
    };
}