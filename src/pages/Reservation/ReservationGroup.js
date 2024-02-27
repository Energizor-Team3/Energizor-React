import React, { useEffect, useState } from "react";
import "./ReservationGroup.css";
import { useSelector, useDispatch } from "react-redux";
import { callOrganizationAPI } from "../../apis/GroupAPICalls";

function TreeNode({
  name,
  children,
  depth,
  onUserSelect,
  userCode,
  selectedUserCode,
  setSelectedUserCode, // 새로 추가됨
}) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = children && children.length > 0;

  const toggleOpen = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
  };

  // 클릭한 사용자 정보를 콘솔에 출력
  const handleUserClick = (e) => {
    e.stopPropagation();
    if (!hasChildren) {
      console.log("선택된 참석자:", { userCode, name }); // 선택된 참석자 정보를 콘솔에 출력

      onUserSelect({ userCode, name }); // 사용자 코드와 이름을 전달
      setSelectedUserCode(userCode); // 선택된 사용자 코드를 업데이트
    }
  };

  return (
    <div
      className="res-tree-node"
      style={{
        paddingLeft: `${depth * 20}px`,
        backgroundColor:
          userCode === selectedUserCode ? "#58adfa" : "transparent",
      }}
      onClick={handleUserClick} // 클릭 핸들러 추가
    >
      {hasChildren && <span onClick={toggleOpen}>{isOpen ? "▼" : "▶"}</span>}
      <span>{name}</span>
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
              selectedUserCode={selectedUserCode}
              setSelectedUserCode={setSelectedUserCode} // 새로 추가됨
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ReservationGroup({ onUserSelect }) {
  const dispatch = useDispatch();
  const groupAndTeam = useSelector((state) => state.groupReducer);
  const [selectedUserCode, setSelectedUserCode] = useState(null); // 현재 선택된 사용자의 코드를 상태로 관리합니다.

  useEffect(() => {
    dispatch(callOrganizationAPI());
  }, [dispatch]);

  // teamList 안의 userList를 순회하여 children을 생성하는 함수
  const createUserListStructure = (userList) => {
    return userList.map((user) => ({
      name: user.userName, // userList의 userName을 name으로 할당
      userCode: user.userCode,
      children: [], // 추가적인 하위 구조가 있다면 여기에 재귀적으로 추가
    }));
  };

  // teamList를 순회하여 children을 생성하는 함수
  const createTeamListStructure = (teamList) => {
    return teamList.map((team) => ({
      name: team.teamName, // teamList의 deptName을 name으로 할당
      children: team.userList ? createUserListStructure(team.userList) : [], // userList가 있으면 해당 함수 호출
    }));
  };

  // 최상위 데이터 구조를 만드는 함수
  const data = Array.isArray(groupAndTeam)
    ? [
        {
          name: "EveryWare",
          children: groupAndTeam.map((group) => ({
            name: group.deptName,
            children: createTeamListStructure(group.teamList),
          })),
        },
      ]
    : [];

  // 결재 버튼과 참조 버튼의 클릭 핸들러에서 선택 유형을 onUserSelect에 전달합니다.
  const handlereservationClick = () => {
    if (selectedUserCode) {
      // 선택된 사용자가 있을 경우에만 실행
      onUserSelect(selectedUserCode, "reservation");
    }
  };

  return (
    <div className="group_content">
      <div className="group_list">
        {/* 나머지 마크업 */}
        <div className="Group">
          <TreeNode
            name={data[0].name}
            children={data[0].children}
            depth={1}
            onUserSelect={onUserSelect}
            selectedUserCode={selectedUserCode}
            setSelectedUserCode={setSelectedUserCode} // 새로 추가됨
          />
        </div>
       
      </div>
    </div>
  );
}

export default ReservationGroup;
