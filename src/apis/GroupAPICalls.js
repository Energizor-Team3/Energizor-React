import { GET_GROUP_Organization } from "../modules/groupModule";
import { GET_GROUP_User } from "../modules/groupUserModule";

export const callOrganizationAPI = () => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/group/groupList`;

  return async (dispatch, getState) => {
    console.log("들옴?");

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
    console.log("들옴?");

    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    console.log("[ApprovalAPICalls] callGetuserDetailAPI RESULT : ", result);

    dispatch({ type: GET_GROUP_User, payload: result.data });
  };
};
