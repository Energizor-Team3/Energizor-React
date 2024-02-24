import { GET_GROUP_Organization } from "../modules/GroupModule";
import { GET_GROUP_User } from "../modules/GroupUserModule";
import { GET_GROUP_TEAM } from "../modules/GroupTeamModule";
import { GET_GROUP_DEPT } from "../modules/GroupDeptModule";
import {
  POST_DEPT_INSERT,
  POST_TEAM_INSERT,
  POST_DEPT_UPDATE,
  POST_TEAM_UPDATE,
} from "../modules/GroupAdminModule";
// import { POST_LOGIN } from '../modules/UserModule';




// export const callLoginAPI = ({ form }) => {
//   const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/auth/login`;

//   return async (dispatch, getState) => {
//       // 클라이언트 fetch mode : no-cors 사용시 application/json 방식으로 요청이 불가능
//       // 보안상의 이유로 브라우저는 스크립트에서 시작한 교차 출처 HTTP요청을 제한한다.
//       // 서버에서 cors 허용을 해주어야 함
//       const result = await fetch(requestURL, {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/json',
//               Accept: '*/*',
//           },
//       }).then((response) => response.json());

//       console.log('[UserAPICalls] callLoginAPI RESULT : ', result);
//       if (result.status === 200) {
//           window.localStorage.setItem('accessToken', result.userInfo.accessToken);
//       }
//       dispatch({ type: POST_LOGIN, payload: result });
//   };
// };



export const callOrganizationAPI = () => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/group/groupList`;

  return async (dispatch, getState) => {
    console.log("조직도 올 체크!!===");

    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    console.log("callOrganizationAPI RESULT : ", result);

    dispatch({ type: GET_GROUP_Organization, payload: result.data });
  };
};

export const callGetuserDetailAPI = (userCode) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/group/user/${userCode}`;

  return async (dispatch, getState) => {
    console.log("유저코드 콜체크!!===");

    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    console.log("callGetuserDetailAPI RESULT : ", result);

    dispatch({ type: GET_GROUP_User, payload: result.data });

    console.log("리절트결과값==== ", result);
  };
};

export const callGetTeamDetailAPI = (teamCode) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/group/team/${teamCode}`;

  return async (dispatch, getState) => {
    console.log("팀코드 콜체크!!====?", teamCode);

    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    console.log(" callGetTeamDetailAPI RESULT : ", result);

    dispatch({ type: GET_GROUP_TEAM, payload: result.data });
  };
};

export const callGetDeptDetailAPI = (deptCode) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/group/dept/${deptCode}`;

  return async (dispatch, getState) => {
    console.log("부서코드 콜체크!!====?", deptCode);

    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    console.log("callGetDeptDetailAPI RESULT : ", result);

    dispatch({ type: GET_GROUP_DEPT, payload: result.data });
  };
};

// 부서 추가
export const callDeptInsertAPI = (deptName) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/group/dept-insert`;

  return async (dispatch, getState) => {
    try {
      console.log("부서추가 API체크!!====?");

      const result = await fetch(requestURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        },
        body: JSON.stringify({ deptName }),
      }).then((response) => response.json());

      console.log("접근권한확인하기=============== ", result.status);

      if (result.status === 403) {
        alert("접근 권한이 없습니다.");
      } else if (result.status === 200) {
        alert(`새로운 부서 "` + deptName + `" 가 생성되었어요!`);
      }
      dispatch({ type: POST_DEPT_INSERT, payload: result });
      console.log("부서추가 결과???? ", result);
    } catch (error) {
      console.error("DETP_INSERT_API 호출 중 에러 발생:", error);
      alert(`부서추가 실패..`);
      throw error;
    }
  };
};

// 팀 추가
export const callTeamInsertAPI = (teamName, deptCode) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/group/team-insert`;

  return async (dispatch, getState) => {
    try {
      console.log("팀추가 API체크!!====?");

      const result = await fetch(requestURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        },
        body: JSON.stringify({ deptCode: deptCode, teamName: teamName }),

      }).then((response) => response.json());
      console.log("접근권한확인하기=============== ", result.status);

      if (result.status === 403) {
        alert("접근 권한이 없습니다.");
      } else if (result.status === 200) {
        alert(`새로운 팀 "` + teamName + `" 이 생성되었어요!`);
      } 
      
      dispatch({ type: POST_TEAM_INSERT, payload: result });
      console.log("팀추가 결과???? ", result);
    } catch (error) {
      console.error("TEAM_INSERT_API 호출 중 에러 발생:", error);
      alert(`팀추가 실패..`);
      throw error;
    }
  };
};

// 부서 수정
export const callDeptUpdateAPI = (deptName , deptCode) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/group/dept-update`;

  return async (dispatch, getState) => {
    try {
      console.log("api로넘어온 수정할 부서이름=== ", deptName , deptCode);

      const result = await fetch(requestURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
          
        },
        body: JSON.stringify({ deptCode: deptCode, deptName: deptName }),
      }).then((response) => response.json());

      console.log("접근권한확인하기=============== ", result.status);

      if (result.status === 403) {
        alert("접근 권한이 없습니다.");
      } else if (result.status === 200) {
        alert(`"` + deptName + `"로 부서명이 수정되었어요!`);
      }
      dispatch({ type: POST_DEPT_UPDATE, payload: result });
      console.log("부서수정 결과=== ", result);
    } catch (error) {
      console.error("DETP_UPDATE_API 호출 중 에러 발생:", error);
      throw error;
    }
  };
};


// 팀 수정
export const callTeamUpdateAPI = (teamName , teamCode) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/group/team-update`;

  return async (dispatch, getState) => {
    try {
      console.log("팀추가 API체크!!====?");

      const result = await fetch(requestURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        },
        body: JSON.stringify({ teamName: teamName, teamCode: teamCode }),
      }).then((response) => response.json());

      console.log("접근권한확인하기=============== ", result.status);

      if (result.status === 403) {
        alert("접근 권한이 없습니다.");
      } else if (result.status === 200) {
        alert(`"` + teamName + `"로 팀명이 수정되었어요!`);
      }
      dispatch({ type: POST_TEAM_UPDATE, payload: result });
      console.log("팀수정 결과=== ", result);
    } catch (error) {
      console.error("TEAM_UPDATE_API 호출 중 에러 발생:", error);
      throw error;
    }
  };
};