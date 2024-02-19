import { GET_GROUP } from "../modules/GroupModule.js";

export const callGetGroupAPI = () => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/group/groupList`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    console.log("callGetGroupAPI RESULT========== : ", result);

    if (result.status === 200) {
      console.log(" callGetGroupAPI SUCCESS==========");
      dispatch({ type: GET_GROUP, payload: result.data });

      console.log(" data==========", result.data);
    }
  };
};
