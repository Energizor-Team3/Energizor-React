import { GET_GROUP_Organization } from "../modules/GroupModule";
import { GET_GROUP_User } from "../modules/GroupUserModule";
import { GET_GROUP_TEAM } from "../modules/GroupTeamModule";
import { GET_GROUP_DEPT } from "../modules/GroupDeptModule";


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

    console.log("[ApprovalAPICalls] callOrganizationAPI RESULT : ", result);

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
