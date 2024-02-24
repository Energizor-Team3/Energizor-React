
import { 
    GET_APPROVAL_InboxApproval,
    GET_APPROVAL_SHAREDINBOX,
    GET_APPROVAL_Progress,
    POST_APPROVAL_INSERTGENERALDRAFT,
    POST_APPROVAL_SAVEGENERALDRAFT,
    POST_APPROVAL_INSERTBUSINESSTRIP,
    POST_APPROVAL_SAVEBUSINESSTRIP,
    POST_APPROVAL_INSERTEDUCATION,
    POST_APPROVAL_SAVEEDUCATION,
    POST_APPROVAL_INSERTVACATION,
    POST_APPROVAL_SAVEVACATION,
    GET_APPROVAL_SAVEINBOX,
    GET_APPROVAL_FINDUSERDETAIL,
    GET_APPROVAL_APPROVALCOMPLETE,
    POST_APPROVAL_INSERTPROXY
} from '../modules/ApprovalMainModule';
import {
    GET_APPROVAL_SELECTEMPDOCUMENTDETAIL,
    PUT_APPROVAL_APPROVEMENT,
    GET_APPROVAL_SELECTPROXY
   
} from '../modules/ApprovalsubModule';
import {
    GET_APPROVAL_FINDLINEUSER,
    PUT_APPROVAL_REJECTION
   
} from '../modules/ApprovalLineModule';
import {
    GET_APPROVAL_FINDRFUSER
   
} from '../modules/ApprovalRfModule';




// 결대 해야할 문서
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

// 결재 완료된 문서
export const callApprovalCompleteAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/approval/approvalComplete`;

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

        console.log('[ApprovalAPICalls] callApprovalCompleteAPI RESULT : ', result);

        dispatch({ type: GET_APPROVAL_APPROVALCOMPLETE,  payload: result.data });
        
    };
}



// 임시보관함
export const callSaveInBoxAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/approval/tempSaveDocument`;

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

        dispatch({ type: GET_APPROVAL_SAVEINBOX,  payload: result.data });
        
    };
}


// 공유문서함
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

        dispatch({ type: POST_APPROVAL_SAVEVACATION,  payload: result });
        
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

        dispatch({ type: POST_APPROVAL_INSERTVACATION,  payload: result });
        
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

        dispatch({ type: GET_APPROVAL_FINDUSERDETAIL,  payload: result.data });
        
    };
}

//임시 기안 문서 상세조회
export const callSelectTempDocumentDetailAPI = (documentCode) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/approval/selectTempDocumentDetail/${documentCode}`;

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

        console.log('[ApprovalAPICalls] callSelectTempDocumentDetailAPI RESULT 111: ', result);

        dispatch({ type: GET_APPROVAL_SELECTEMPDOCUMENTDETAIL,  payload: result.data });
        
    };
}

//결재자 조회
export const callSelectLineUserAPI = (documentCode) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/approval/selectApprovalLine/${documentCode}`;

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

        console.log('[ApprovalAPICalls] callSelectLineUserAPI RESULT 111: ', result);

        dispatch({ type: GET_APPROVAL_FINDLINEUSER,  payload: result.data });
        
    };
}

//참조자 조회
export const callSelectRfUserAPI = (documentCode) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/approval/selectApprovalRf/${documentCode}`;

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

        console.log('[ApprovalAPICalls] callSelectRfUserAPI RESULT 111: ', result);

        dispatch({ type: GET_APPROVAL_FINDRFUSER,  payload: result.data });
        
    };
}

//결재하기
export const callApprovementAPI = (documentCode) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/approval/approvement/${documentCode}`;

    return async (dispatch, getState) => {
        console.log('들옴?');
        
        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());

        console.log('[ApprovalAPICalls] callApprovementAPI RESULT 111: ', result);

        dispatch({ type: PUT_APPROVAL_APPROVEMENT,  payload: result.data });
        
    };
}

//결재하기
export const callRejectionAPI = (documentCode) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/approval/rejection/${documentCode}`;

    return async (dispatch, getState) => {
        console.log('들옴?');
        
        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());

        console.log('[ApprovalAPICalls] callRejectionAPI RESULT 111: ', result);

        dispatch({ type: PUT_APPROVAL_REJECTION,  payload: result.data });
        
    };
}


//대리 결재 위임

export const callInsertProxyAPI = ({form}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/approval/insertProxy`;

    return async (dispatch, getState) => {
        console.log('들옴?');
        console.log(form,'api에서 폼이다');
        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body: JSON.stringify({
                changeUser: {
                    userCode: form.changeUser
                  },
                startDate: form.startDate,
                finishDate: form.finishDate,
            }),
        }).then(response => response.json());
        

        console.log('[ApprovalAPICalls] callInsertProxyAPI RESULT : ', result);

        dispatch({ type: POST_APPROVAL_INSERTPROXY,  payload: result });
        
    };
}



export const callSelectProxyAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/approval/proxy`;

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

        console.log('[ApprovalAPICalls] callSelectProxyAPI RESULT 111: ', result);

        dispatch({ type: GET_APPROVAL_SELECTPROXY,  payload: result.data });
        
    };
}