import {
    DELETE_PROFILE,
    GET_MYPAGE,
    GET_USER,
    GET_USER_LIST,
    MODIFY_SUCCESS,
    POST_LOGIN,
    POST_SIGNUP,
    PUT_PASSWORD,
    PUT_PROFILE,
} from '../modules/UserModule';
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
                'Access-Control-Allow-Origin': '*', // 모든 도메인에서 접근할 수 있음을 의미 (특정도메인을 넣고싶으면 * 대신 http://test.com)
            },
            body: JSON.stringify({
                userId: form.userId,
                userPw: form.userPw,
            }),
        }).then((response) => response.json());

        console.log('[UserAPICalls] callLoginAPI RESULT : ', result);
        if (result.failType) {
            alert(result.failType);
        } else if (result.status === 200) {
            window.localStorage.setItem('accessToken', result.userInfo.accessToken);
        }
        dispatch({ type: POST_LOGIN, payload: result });
    };
};

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

export const callUserListAPI = ({ currentPage }) => {
    let requestURL;

    if (currentPage !== undefined || currentPage !== null) {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/users/users-management?offset=${currentPage}`;
    } else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/users/users-management}`;
    }

    console.log('[UserAPICalls] requestURL : ', requestURL);

    return async (dispatch, getState) => {
        console.log('확인!!!!!');

        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());

        console.log('[UserAPICalls] callUserListAPI RESULT : ', result);

        if (result.status === 403) {
            alert('관리자 권한이 필요합니다. 인사관리 담당자에게 문의하세요.');
        }

        dispatch({ type: GET_USER_LIST, payload: result.data });
    };
};

export const callMyPageAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/users/mypage`;

    return async (dispatch, getState) => {
        console.log('확인!!!!!');

        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());

        console.log('[UserAPICalls] callMyPageAPI RESULT : ', result);

        dispatch({ type: GET_MYPAGE, payload: result.data });
    };
};

export const callUserRegistAPI = (requestData, navigate) => async (dispatch) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/auth/signup`;

    try {
        const response = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
            body: JSON.stringify(requestData),
        });

        const data = await response.json();

        if (!response.ok) {
            // 서버에서 에러 메시지를 반환한 경우, 직접 에러 처리
            throw new Error(data.message || '직원 등록에 실패했습니다.');
        }

        // 성공 처리 로직 (예: 상태 업데이트, 성공 메시지 표시 등)
        alert('직원 등록에 성공했습니다.');
        // 성공 액션 디스패치 (필요한 경우)
        dispatch({
            type: 'REGISTRATION_SUCCESS',
            payload: data,
        });
        navigate('/userlist', { replace: true });
    } catch (error) {
        // 에러 처리 (예: 오류 메시지 표시)
        alert(error.message);
        // 오류 액션 디스패치 (필요한 경우)
        dispatch({
            type: 'REGISTRATION_ERROR',
            payload: error.message,
        });
    }
};

export const callTeamListAPI = async () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/users/teams`;

    try {
        const response = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        });

        if (response.status === 403) {
            // 관리자 권한이 필요한 경우
            alert('관리자 권한이 필요합니다. 인사관리 담당자에게 문의하세요.');
            throw new Error('관리자 권한이 필요합니다.');
        } else if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const teams = await response.json();
        console.log('[UserAPICalls] callTeamListAPI RESULT : ', teams);

        return teams; // 함수 호출 결과로 팀 목록 반환
    } catch (error) {
        console.error('callTeamListAPI 호출 중 에러 발생:', error);
        throw error;
    }
};

export const callModifyUserAPI = (userCode, requestData, navigate) => async (dispatch) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/users/user-update/${userCode}`;

    try {
        const response = await fetch(requestURL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
            body: JSON.stringify(requestData),
        });

        const data = await response.json();

        if (!response.ok) {
            // 서버에서 에러 메시지를 반환한 경우, 직접 에러 처리
            throw new Error(data.message || '직원 정보 수정에 실패했습니다.');
        }

        // 성공 처리 로직 (예: 상태 업데이트, 성공 메시지 표시 등)
        alert('직원 정보 수정에 성공했습니다.');
        // 성공 액션 디스패치 (필요한 경우)
        dispatch({
            type: MODIFY_SUCCESS,
            payload: data,
        });
        navigate('/userlist', { replace: true });
    } catch (error) {
        // 에러 처리 (예: 오류 메시지 표시)
        alert(error.message);
        // 오류 액션 디스패치 (필요한 경우)
        dispatch({
            type: 'MODIFY_ERROR',
            payload: error.message,
        });
    }
};

export const callUserDetailAPI = ({ userCode }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/users/users-management/${userCode}`;

    return async (dispatch, getState) => {
        console.log('확인!!!!!');

        try {
            const response = await fetch(requestURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
                },
            });

            if (!response.ok) {
                throw new Error('서버 응답이 올바르지 않습니다: ' + response.statusText);
            }

            const result = await response.json();
            console.log('[UserAPICalls] callUserDetailAPI RESULT : ', result);

            if (result.status === 403) {
                alert('관리자 권한이 필요합니다. 인사관리 담당자에게 문의하세요.');
            } else {
                console.log('---------------> check');
                dispatch({ type: GET_USER, payload: result.data });
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
            dispatch({ type: 'GET_USER_DETAIL_FAILURE', payload: error.message });
        }
    };
};

export const callPasswordUpdateAPI = (navigate, requestData) => async (dispatch) => {
    console.log('[UserAPICalls] callPasswordUpdateAPI Call');

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/users/change-password`;

    const response = await fetch(requestURL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
            Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
        },
        body: JSON.stringify(requestData),
    });

    const data = await response.json();

    if (!response.ok) {
        // 서버에서 에러 메시지를 반환한 경우, 직접 에러 처리
        throw new Error(data.message || '비밀번호 변경에 실패했습니다.');
    }

    // 성공 처리 로직 (예: 상태 업데이트, 성공 메시지 표시 등)
    alert('비밀번호 변경에 성공했습니다.');
    // 성공 액션 디스패치 (필요한 경우)
    dispatch({
        type: PUT_PASSWORD,
        payload: data,
    });

    navigate('/login', { replace: true});
    window.location.reload();
};

export const callUpdateProfileAPI = ({ form }) => {
    console.log('[UserAPICalls] callUpdateProfileAPI Call');

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/users/change-profile`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'PUT',
            headers: {
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
            body: form,
        }).then((response) => response.json());

        console.log('[UserAPICalls] callUpdateProfileAPI RESULT : ', result);

        alert('프로필 사진 변경이 완료되었습니다.')

        dispatch({ type: PUT_PROFILE, payload: result });
    };
};

export const callDeleteProfileAPI = () => {
    console.log('[UserAPICalls] callDeleteProfileAPI Call');

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/users/delete-profile`;

    return async (dispatch) => {
        const result = await fetch(requestURL, {
            method: 'PUT',
            headers: {
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());

        console.log('[UserAPICalls] callUpdateProfileAPI RESULT : ', result);

        alert('프로필 사진이 삭제되었습니다.')

        dispatch({ type: DELETE_PROFILE, payload: result });
    };
};