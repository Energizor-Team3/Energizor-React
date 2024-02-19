import  "./ApprovalGroup.css";
import {
    callOrganizationAPI,

} from '../../apis/GroupAPICalls';

import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import queryString from 'query-string';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';





function TreeNode({ name, children, depth, onUserSelect, userCode }) {
    const [isOpen, setIsOpen] = useState(false);
    const hasChildren = children && children.length > 0;
  

    const toggleOpen = () => {
        if (hasChildren) {
          setIsOpen(!isOpen);
        }
      };

      // 유저이름 클릭했을때 유저코드 가져오는거
      const handleUserClick = (e) => {
        e.stopPropagation();
        if (!hasChildren && onUserSelect) {
          onUserSelect(userCode); // 유저 코드를 onUserSelect를 통해 상위 컴포넌트로 전달
        }
      };


      return (
        <div style={{ paddingLeft: `${depth * 20}px` }}>
        {hasChildren && (
          <span onClick={toggleOpen}>
            {isOpen ? "▼" : "▶"}
          </span>
        )}
        <span onClick={handleUserClick}>{name}</span>
        {isOpen && hasChildren && (
          <div>
            {children.map((child, index) => (
              <TreeNode
                key={index}
                name={child.name}
                children={child.children}
                depth={depth + 1}
                onUserSelect={onUserSelect}
                userCode={child.userCode} // userCode를 자식 컴포넌트로 전달합니다.
              />
            ))}
          </div>
        )}
      </div>
    );
  }
  
  function ApprovalGroup({onUserSelect}) {

const navigate = useNavigate();
const dispatch = useDispatch();
const groupAndTeam  = useSelector((state) => state.groupReducer); 
console.log('groupAndTeam',groupAndTeam )





useEffect(()=>{
    dispatch(callOrganizationAPI());
},[])



// teamList 안의 userList를 순회하여 children을 생성하는 함수
const createUserListStructure = (userList) => {
return userList.map(user => ({
  name: user.userName, // userList의 userName을 name으로 할당
  userCode: user.userCode,
  children: [] // 추가적인 하위 구조가 있다면 여기에 재귀적으로 추가
}));
};

// teamList를 순회하여 children을 생성하는 함수
const createTeamListStructure = (teamList) => {
return teamList.map(team => ({
  name: team.teamName, // teamList의 deptName을 name으로 할당
  children: team.userList ? createUserListStructure(team.userList) : [] // userList가 있으면 해당 함수 호출
}));
};

// 최상위 데이터 구조를 만드는 함수
const data = Array.isArray(groupAndTeam) ? [
{
  name: "EveryWare",
  children: groupAndTeam.map(group => ({
    name: group.deptName,
    children: createTeamListStructure(group.teamList),
  })),
},
] : [];


    
  
    return (
        <div className="group">
        {/* <!-- <div class="group">&lt;조직&gt;</div> --> */}

        <div className="group_content">
          <div className="group_list">
            <div className="group_search">
              <input
                type="search"
                id="group_search"
                placeholder="부서명 , 직원명을 입력하세요"
              />
              {/* <!-- <button id="search_button">검색</button> --> */}
              <label for="group_search">
                <img src="/common/search.png" alt="" />
              </label>
            </div>

            <div className="Group"> 
              <TreeNode
                name={data[0].name}
                children={data[0].children}
                depth={1}
                onUserSelect={onUserSelect}
              />
            </div>

            <div className="approvalbtn3"><span><button>결재</button></span><span><button>참조</button></span></div>
          </div>
        </div>
      </div>
    );
  }

  export default ApprovalGroup;