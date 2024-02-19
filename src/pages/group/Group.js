import "./Group.css";
import "../../components/common/SubHeader.css";

import {
  callOrganizationAPI,
  callGetuserDetailAPI,
  callGetTeamDetailAPI,
} from "../../apis/GroupAPICalls";

import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

function TreeNode({
  name,
  children,
  depth,
  onUserSelect,
  userCode,
  teamCode,
  onTeamSelect,
}) {
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
      console.log("=======유저코드", userCode)
      onUserSelect(userCode); // 유저 코드를 onUserSelect를 통해 상위 컴포넌트로 전달

    }
  };
  const handleTeamClick = (e) => {
    e.stopPropagation();
    if (!hasChildren && onTeamSelect) {

      console.log("=======팀코드", teamCode)
      onTeamSelect(teamCode); 
    }
  };



  return (
    <div style={{ paddingLeft: `${depth * 20}px` }}>
      {hasChildren && <span onClick={toggleOpen}>{isOpen ? "▼" : "▶"}</span>}
      <span onClick={handleUserClick}>{name}</span>
      <span onClick={handleTeamClick}>{teamCode}</span>
      {isOpen && hasChildren && (
        <div>
          {children.map((child, index) => (
            <TreeNode
              key={child.id}
              name={child.name}
              children={child.children}
              depth={depth + 1}
              onUserSelect={onUserSelect}
              onTeamSelect={onTeamSelect}
              userCode={child.userCode} // userCode를 자식 컴포넌트로 전달합니다.
              teamCode={child.teamCode}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function Group() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedUserCode, setSelectedUserCode] = useState(null);
  const [selectedTeamCode, setSelectedTeamCode] = useState(null); // 선택된 팀의 코드를 저장할 상태 변수
  const user = useSelector((state) => state.groupUserReducer);
  const groupAndTeam = useSelector((state) => state.groupReducer);
  const team = useSelector((state) => state.groupTeamReducer);

  const selectedCodes = useSelector((state) => state.selectedCodes);

  useEffect(() => {
    dispatch(callOrganizationAPI());
  }, []);

  console.log("user=======", user);
  console.log("groupAndTeam=============", groupAndTeam);
  console.log("TEAM=============", team);

  const handleUserSelect = (code) => {
    // 선택된 유저의 코드를 상태로 설정합니다.
    setSelectedUserCode(code);
    dispatch(callGetuserDetailAPI(code));
  };

  const handleTeamSelect = (teamCode) => {
    setSelectedTeamCode(teamCode);
    dispatch(callGetTeamDetailAPI(teamCode));
  };


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
      name: team.teamName,
      teamCode: team.teamCode, // teamList의 deptName을 name으로 할당
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

  return (
    <div id="wrap">
      <section>
        <article>
          <h2>조직도</h2>
          <div>
            <a href="writingNote.html" className="btn">
              새그룹
            </a>
          </div>
          <ul className="subList">
            <li>
              <div>
                <img src="/common/organization.png" alt="" />
                <a href="/views/organization/organization.html">조직도</a>
              </div>
            </li>
            <li className="subListText">
              <div>
                <img src="/common/group.png" alt="" />
                <a href="/views/organization/organizationManagement.html">
                  그룹관리
                </a>
              </div>
            </li>
          </ul>
        </article>
      </section>

      <main className="subMain">
        <div className="content">
          <div className="subject">
            <strong>조직도</strong>
            <div className="line">
              <div className="search_box">
                <input
                  type="search"
                  placeholder="보낸사람, 제목을 입력하세요."
                />
              </div>
            </div>
          </div>

          <div className="group_wrap">
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
                    <label htmlFor="group_search">
                      <img src="/resources/images/search.png" alt="" />
                    </label>
                  </div>

                  <div className="Group">
                    dddd
                    <TreeNode
                      name={data[0].name}
                      children={data[0].children}
                      depth={1}
                      onUserSelect={handleUserSelect}
                      onTeamSelect={handleTeamSelect}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="group_info_wrap">
              <div className="group_member_info_wrap">
                <a className="note_btn" href="#home">
                  쪽지
                </a>
                <hr />
                <div className="group_info">
                  <ul className="group_member_info">
                    <li>
                      <strong>사용자 ID</strong>
                      <span>{user?.userId}</span>
                    </li>
                    <li>
                      <strong>이름</strong>
                      <span>{user?.userName}</span>
                    </li>
                    <li>
                      <strong>소속 부서</strong>
                      <span>{user?.team?.teamName}</span>
                    </li>
                    <li>
                      <strong>직급</strong>
                      <span>{user?.userRank}</span>
                    </li>
                    <li>
                      <strong>휴대폰 번호</strong>
                      <span>{user?.phone}</span>
                    </li>
                    <li>
                      <strong>이메일</strong>
                      <span>{user?.email}</span>
                    </li>
                    {/* <li>
                      <strong>팀명dd</strong>
                      {user?.team?.teamName}
                      {groupAndTeam?.teamList?.map((team) => (
                        <span key={team.teamCode}>
                          {team.teamName}
                          {team.teamCode === user?.team?.teamCode && team.userList.map((user) => (
                            <span key={user.userId}>{user.userName}</span>
                          ))}
                        </span>
                        ))}
                    </li> */}

                    <li>
                      <strong>팀명</strong>
                      {user?.team?.teamName}
                      {groupAndTeam?.map((group) =>
                        group.teamList.map((team) => (
                          <span key={team.teamCode}>
                            {team.teamName}
                            {team.teamCode === user?.team?.teamCode &&
                              team.userList.map((user) => (
                                <span key={user.userId}>{user.userName}</span>
                              ))}
                          </span>
                        ))
                      )}
                    </li>
                  </ul>
                  <img src="/common/personSample.png" alt="" />
                </div>
              </div>

              <div className="group_department_info_wrap">
                <ul className="group_department_info">
                  <li>
                    <strong>팀명</strong>
                    <span>{team?.teamName}</span>
                    {/* <ul>
                      {team?.userList.map((user) => (
                        <li key={user.userCode}>{user.userName}</li>
                      ))}
                    </ul> */}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Group;
