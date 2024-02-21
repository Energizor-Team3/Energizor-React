import { createActions, handleActions } from 'redux-actions';

// 초기값 
const initialState = [];

// 액션
export const GET_GROUP_Organization = 'group/GET_GROUP_Organization';


// 액션생성자 생성
const actions = createActions( {
  [GET_GROUP_Organization]: () => {}
});


// 리듀서 handleActions는 리듀서생성자로 액션타입에 따라 상태 업데이트를 정의함

const groupReducer = handleActions(
  {
    [GET_GROUP_Organization]: (state, { payload }) => {


      return payload;
    }
  },
  initialState
);

export default groupReducer;














