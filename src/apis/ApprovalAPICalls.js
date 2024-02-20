
import { 
    GET_APPROVAL_InboxApproval,
    GET_APPROVAL_SHAREDINBOX,
    GET_APPROVAL_Progress,
    POST_APPROVAL_INSERTGENERALDRAFT,
    GET_APPROVAL_FINDUSERDETAIL,
    POST_APPROVAL_SAVEGENERALDRAFT,
    POST_APPROVAL_INSERTBUSINESSTRIP,
    POST_APPROVAL_SAVEBUSINESSTRIP,
    POST_APPROVAL_INSERTEDUCATION,
    POST_APPROVAL_SAVEEDUCATION,
    POST_APPROVAL_INSERTVACATION,
    POST_APPROVAL_SAVEEVACATION
   
} from '../modules/ApprovalMainModule';



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


//일반 기안 임시저장

export const callSaveGeneralDraftAPI = ({form}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/approval/saveApprovalGeneral`;

    return async (dispatch, getState) => {
        console.log('들옴?');
        console.log(form,'api에서 폼이다');
        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body: form,
            
        })
        .then(response => response.json());
        

        console.log('[ApprovalAPICalls] callSaveGeneralDraftAPI RESULT : ', result);

        dispatch({ type: POST_APPROVAL_SAVEGENERALDRAFT,  payload: result });
        
    };
}

export const callInsertGeneralDraftAPI = ({form}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/approval/generalDraft`;

    return async (dispatch, getState) => {
        console.log('들옴?');
        console.log(form,'api에서 폼이다');
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

// 출장 임시저장 및 기안등록

export const callSaveBusinessTripAPI = ({form}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/approval/saveApprovalBusinessTrip`;

    return async (dispatch, getState) => {
        console.log('들옴?');
        console.log(form,'api에서 폼이다');
        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body: form,
            
        })
        .then(response => response.json());
        

        console.log('[ApprovalAPICalls] callSaveBusinessTripAPI RESULT : ', result);

        dispatch({ type: POST_APPROVAL_SAVEBUSINESSTRIP,  payload: result });
        
    };
}

export const callInsertBusinessTripAPI = ({form}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/approval/businessTrip`;

    return async (dispatch, getState) => {
        console.log('들옴?');
        console.log(form,'api에서 폼이다');
        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body: form,
            
        })
        .then(response => response.json());
        

        console.log('[ApprovalAPICalls] callInsertBusinessTripAPI RESULT : ', result);

        dispatch({ type: POST_APPROVAL_INSERTBUSINESSTRIP,  payload: result });
        
    };
}

// 교육 임시저장 및 기안등록

export const callSaveEducationAPI = ({form}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/approval/saveApprovalEducation`;

    return async (dispatch, getState) => {
        console.log('들옴?');
        console.log(form,'api에서 폼이다');
        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body: form,
            
        })
        .then(response => response.json());
        

        console.log('[ApprovalAPICalls] callSaveEducationAPI RESULT : ', result);

        dispatch({ type: POST_APPROVAL_SAVEEDUCATION,  payload: result });
        
    };
}

export const callInsertEducationAPI = ({form}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/approval/education`;

    return async (dispatch, getState) => {
        console.log('들옴?');
        console.log(form,'api에서 폼이다');
        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body: form,
            
        })
        .then(response => response.json());
        

        console.log('[ApprovalAPICalls] callInsertEducationAPI RESULT : ', result);

        dispatch({ type: POST_APPROVAL_INSERTEDUCATION,  payload: result });
        
    };
}

// 휴가 임시저장 및 기안등록

export const callSaveVacationAPI = ({form}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/approval/saveApprovalDayOff`;

    return async (dispatch, getState) => {
        console.log('들옴?');
        console.log(form,'api에서 폼이다');
        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body: form,
            
        })
        .then(response => response.json());
        

        console.log('[ApprovalAPICalls] callSaveVacationAPI RESULT : ', result);

        dispatch({ type: POST_APPROVAL_SAVEEDUCATION,  payload: result });
        
    };
}

export const callInsertVacationAPI = ({form}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/approval/dayOffApply`;

    return async (dispatch, getState) => {
        console.log('들옴?');
        console.log(form,'api에서 폼이다');
        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body: form,
            
        })
        .then(response => response.json());
        

        console.log('[ApprovalAPICalls] callInsertVacationAPI RESULT : ', result);

        dispatch({ type: POST_APPROVAL_INSERTEDUCATION,  payload: result });
        
    };
}

export const callSelectUserDetailAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/approval/user`;

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

        console.log('[ApprovalAPICalls] callSelectUserDetailAPI RESULT 111: ', result);

        dispatch({ type: 'approval/GET_APPROVAL_FINDUSERDETAIL',  payload: result.data });
        
    };
}



