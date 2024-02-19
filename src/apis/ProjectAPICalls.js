
import{
    GET_PROJECTS,
    GET_PROJECT,
} from '../modules/ProjectModule.js';

export const callProjectListAPI = () => {
    const requestURL =`http://${process.env.REACT_APP_RESTAPI_IP}/project/projects`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Accept: '*/*',
              Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
          }).then((response) => response.json());

          console.log('[ProjectAPICalls] callProjectListAPI RESULT : ', result);
          dispatch({ type: GET_PROJECTS, payload:result});
    };


};


        
export const callProjectDetailAPI = ({ proNo }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/project/${ proNo }`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());

        console.log('[ProjectAPICalls] callProjectDetailAPI RESULT : ', result);
        if (result.status === 200) {
            console.log('[ProduceAPICalls] callProductDetailAPI SUCCESS');
            dispatch({ type: GET_PROJECT, payload: result.data });
        }
    };
};

