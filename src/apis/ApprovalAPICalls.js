
import { 
    GET_APPROVAL_InboxApproval,
    GET_APPROVAL_SHAREDINBOX,
    GET_APPROVAL_Progress,
    POST_APPROVAL_INSERTGENERALDRAFT
   
} from '../modules/ApprovalMainModule';

// export const callGeneralDraftAPI = ({ form }) => {
//     const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/approval/generalDraft`;

//     return async (dispatch, getState) => {
//         // 클라이언트 fetch mode : no-cors 사용시 application/json 방식으로 요청이 불가능
//         // 보안상의 이유로 브라우저는 스크립트에서 시작한 교차 출처 HTTP요청을 제한한다.
//         // 서버에서 cors 허용을 해주어야 함
//         const result = await fetch(requestURL, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Accept: '*/*',
//                 // 토큰 넣어라 꼭
//             },
//             body: JSON.stringify({
//                 userId: form.userId,
//                 userPw: form.userPw,
//             }),
//         }).then((response) => response.json());

//         console.log('[UserAPICalls] callLoginAPI RESULT : ', result);
//         if (result.status === 200) {
//             window.localStorage.setItem('accessToken', result.userInfo.accessToken);
//         }
//         dispatch({ type: POST_LOGIN, payload: result });
//     };
// };
// 결재대기 문서
// export const callInboxApprovalAPI = ({ form }) => {
//     const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/approval/inboxApproval`;

//     return async (dispatch, getState) => {
//         // 클라이언트 fetch mode : no-cors 사용시 application/json 방식으로 요청이 불가능
//         // 보안상의 이유로 브라우저는 스크립트에서 시작한 교차 출처 HTTP요청을 제한한다.
//         // 서버에서 cors 허용을 해주어야 함
//         const result = await fetch(requestURL, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Accept: '*/*',
//                 // 토큰 넣어라 꼭
//             },
//             body: JSON.stringify({
//                 userId: form.userId,
//                 userPw: form.userPw,
//             }),
//         }).then((response) => response.json());

//         console.log('[UserAPICalls] callLoginAPI RESULT : ', result);
//         if (result.status === 200) {
//             window.localStorage.setItem('accessToken', result.userInfo.accessToken);
//         }
//         dispatch({ type: POST_LOGIN, payload: result });
//     };
// };

// export const callInboxApprovalAPI = () => {
//     const requestURL = `${process.env.REACT_APP_API_URL}/approval/inboxApproval`; // API URL 환경 변수 사용

//     return async (dispatch) => {
//         const accessToken = window.localStorage.getItem('accessToken'); // 액세스 토큰을 로컬 스토리지에서 가져옵니다.

//         try {
//             const response = await fetch(requestURL, {
//                 method: 'GET',
//                 headers: {
//                     'Accept': 'application/json',
//                     'Authorization': `Bearer ${accessToken}`, // 액세스 토큰을 헤더에 추가합니다.
//                 },
//             });

//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }

//             const result = await response.json();
//             console.log('[UserAPICalls] callInboxApprovalAPI RESULT : ', result);

//             // 결과에 따른 처리 로직
//             dispatch({ type: GET_APPROVAL_InboxApproval, payload: result.data }); // 실제 액션 타입과 payload를 적절히 조정해야 합니다.

//         } catch (error) {
//             console.error('There has been a problem with your fetch operation:', error);
//             // 오류 처리 로직을 추가합니다.
//         }
//     };
// };

export const callInboxApprovalAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/approval/inboxApproval`;

    return async (dispatch, getState) => {
        console.log('들옴?');
        
        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());

        console.log('[ApprovalAPICalls] callInboxApprovalAPI RESULT : ', result);

        dispatch({ type: GET_APPROVAL_InboxApproval,  payload: result.data });
        
    };
}

export const callSharedInBoxAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/approval/selectSharedDocument`;

    return async (dispatch, getState) => {
        console.log('들옴?');
        
        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());

        console.log('[ApprovalAPICalls] callSharedInBoxAPI RESULT : ', result);

        dispatch({ type: GET_APPROVAL_SHAREDINBOX,  payload: result.data });
        
    };
}

export const callApprovalingAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/approval/approvalProgress`;

    return async (dispatch, getState) => {
        console.log('들옴?');
        
        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());

        console.log('[ApprovalAPICalls] callApprovalingAPI RESULT : ', result);

        dispatch({ type: GET_APPROVAL_Progress,  payload: result.data });
        
    };
}



export const callInsertGeneralDraftAPI = ({form}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/approval/generalDraft`;

    return async (dispatch, getState) => {
        console.log('들옴?');
        
        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body: form,
        })
        .then(response => response.json());

        console.log('[ApprovalAPICalls] callInsertGeneralDraftAPI RESULT : ', result);

        dispatch({ type: POST_APPROVAL_INSERTGENERALDRAFT,  payload: result });
        
    };
}



