import React, { useEffect, useState } from 'react';
import './ApprovalGroup.css';
import { useSelector, useDispatch } from 'react-redux';
import { callOrganizationAPI } from '../../apis/GroupAPICalls';


function TreeNode({ name, children, depth, onUserSelect, userCode, selectedUserCode }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = children && children.length > 0;

  const toggleOpen = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
  };

  // 클릭 시 onUserSelect를 호출하고, 선택된 사용자의 코드를 상태로 저장합니다.
  const handleUserClick = (e) => {
    e.stopPropagation();
    if (!hasChildren) {
      onUserSelect(userCode); // 여기서 userCode는 선택된 사용자의 코드입니다.
    }
  };


  return (
    <div style={{ paddingLeft: `${depth * 20}px`, backgroundColor: userCode === selectedUserCode ? 'lightblue' : 'transparent' }}>
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
              userCode={child.userCode}
              selectedUserCode={selectedUserCode} // 선택된 사용자 코드를 자식 컴포넌트로 전달합니다.
            />
          ))}
        </div>
      )}
    </div>
  );
}
  
function ApprovalGroup2({ onUserSelect }) {
  const dispatch = useDispatch();
  const groupAndTeam = useSelector((state) => state.groupReducer);
  const [selectedUserCode, setSelectedUserCode] = useState(null); // 현재 선택된 사용자의 코드를 상태로 관리합니다.

  useEffect(() => {
    dispatch(callOrganizationAPI());
  }, [dispatch]);


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


    
  
    // 결재 버튼과 참조 버튼의 클릭 핸들러에서 선택 유형을 onUserSelect에 전달합니다.
  const handleApprovalClick = () => {
    if (selectedUserCode) { // 선택된 사용자가 있을 경우에만 실행
      onUserSelect(selectedUserCode);
    }
  };

  

  return (
    <div className="group1">
      <div className="group_content1">
        <div className="group_list1">
          {/* 나머지 마크업 */}
          <div className="Group1">
            <TreeNode
              name={data[0].name}
              children={data[0].children}
              depth={1}
              onUserSelect={setSelectedUserCode}
              selectedUserCode={selectedUserCode}
            />
          </div>
          <div className="approvalbtn3">
            <span><button onClick={handleApprovalClick}>선택</button></span>
          </div>
        </div>
      </div>
    </div>
  );
}

  export default ApprovalGroup2;