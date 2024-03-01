
import{
  GET_PROJECTS,
  GET_PROJECT,
  DELETE_PROJECT,
  POST_PROJECT
  
} from '../modules/ProjectModule.js';

import{
  GET_TASKS,
  DELETE_TASK,
  POST_TASK,
  PATCH_TASK
} from'../modules/TaskModule.js';
export const callUpdateTaskAPI = ({ taskNo, taskStatus }) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/project/tasks/update/${taskNo}`;
  

  return async (dispatch, getState) => {
    try {
      const result = await fetch(requestURL, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
          Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
        },
        body: JSON.stringify({
          taskNo: taskNo,
          taskStatus: taskStatus,
        }),
      }).then((response) => response.json());

      console.log('[ProjectAPICalls] callUpdateTaskAPI RESULT : ', result);

      if (result.status === 200) {
        console.log('[ProjectAPICalls] callUpdateTaskAPI SUCCESS');
        dispatch({ type: PATCH_TASK, payload: result });
      } else {
        console.log('[ProjectAPICalls] callUpdateTaskAPI FAILURE');
        // 실패했을 경우 처리
      }
    } catch (error) {
      console.error('[ProjectAPICalls] callUpdateTaskAPI ERROR : ', error);
      // 에러 처리
    }
  };
};

export const callAddTaskAPI = ({ form }) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/project/addtask`;
  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept": "*/*",
          "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
      },
      body: JSON.stringify({
                    
        taskContent : form.taskContent,
        proParNo : form.proParNo,
    })
    })
    .then(response => response.json());
  
    console.log('[ProjectAPICalls] callAddTaskAPI RESULT : ', result);
    dispatch({ type: POST_TASK, payload: result});
  };
  }
  



export const callAddProjectAPI = ({ form }) => {
const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/project/addProject`;
return async (dispatch, getState) => {
  const result = await fetch(requestURL, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "*/*",
        "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
    },
    body: JSON.stringify({
                  
      proTitle : form.proTitle,
      proContent : form.proContent,
      proStartDate : form.proStartDate,
      proEndDate : form.proEndDate,
      userCodes : form.userCodes

  })
  })
  .then(response => response.json());

  console.log('[ProjectAPICalls] callAddProjectAPI RESULT : ', result);
  dispatch({ type: POST_PROJECT, payload: result});
};
}



export const callTasksAPI = ({ proNo }) => {
  const requestURL =`http://${process.env.REACT_APP_RESTAPI_IP}/project/${ proNo }/tasks`;

  return async (dispatch, getState) => {
      const result = await fetch(requestURL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
            Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
          },
      }).then((response) => response.json());

      console.log('[ProjectAPICalls] callTasksAPI RESULT : ', result);
      
      // 여기서 result.data만을 payload로 전달합니다.
      dispatch({ type: GET_TASKS, payload: result.data });
  };

};


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


export const callDeleteProjectAPI = ({ proNo }) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/project/delete/${ proNo }`; 

  return async (dispatch, getState) => {
    const result = 
      await fetch(requestURL, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
          Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
        },
      })
      .then(response => response.json());

      console.log('[ProduceAPICalls] callDeleteProjectAPI RESULT : ', result);
      dispatch({ type: DELETE_PROJECT, payload: result});
    };
}


export const callDeleteTaskAPI = ({ taskNo }) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}/project/delete/tasks/${ taskNo }`; 

  return async (dispatch, getState) => {
    const result = 
      await fetch(requestURL, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
          Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
        },
      })
      .then(response => response.json());

      console.log('[ProduceAPICalls] callDeleteTaskAPI RESULT : ', result);
      dispatch({ type: DELETE_TASK, payload: result});
    };
}