import { POST_LOGIN } from '../modules/ApprovalModule';

export const callLoginAPI = ({ form }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/approval/generalDraft`;

    return async (dispatch, getState) => {
        // 클라이언트 fetch mode : no-cors 사용시 application/json 방식으로 요청이 불가능
        // 보안상의 이유로 브라우저는 스크립트에서 시작한 교차 출처 HTTP요청을 제한한다.
        // 서버에서 cors 허용을 해주어야 함
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                // 토큰 넣어라 꼭
            },
            body: JSON.stringify({
                userId: form.userId,
                userPw: form.userPw,
            }),
        }).then((response) => response.json());

        console.log('[UserAPICalls] callLoginAPI RESULT : ', result);
        if (result.status === 200) {
            window.localStorage.setItem('accessToken', result.userInfo.accessToken);
        }
        dispatch({ type: POST_LOGIN, payload: result });
    };
};

export const callLogoutAPI = () => {
    return async (dispatch, getState) => {
        dispatch({ type: POST_LOGIN, payload: '' });
        console.log('[UserAPICalls] callLogoutAPI RESULT : SUCCESS');
    };
};