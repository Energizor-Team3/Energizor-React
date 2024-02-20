import "./Group.css";
import "../../components/common/SubHeader.css";

import {
  callOrganizationAPI,
  callGetuserDetailAPI,
  callGetTeamDetailAPI,
  callGetDeptDetailAPI,
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
  deptCode,
  onTeamSelect,
  onDeptSelect,
}) {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = children && children.length > 0;

  const toggleOpen = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
  };

  // 조직도 클릭시 클릭한 정보 가져오기 & 클릭한 요소 정보 출력하기

  const handleUserClick = (e) => {
    e.stopPropagation();

    if (userCode !== undefined && !teamCode && !deptCode) {
      onUserSelect(userCode);
    }

    if (teamCode !== undefined && !userCode && !deptCode) {
      onTeamSelect(teamCode);
    }

    if (deptCode !== undefined && !userCode && !teamCode) {
      onDeptSelect(deptCode);
    }
  };

  return (
    <div style={{ paddingLeft: `${depth * 20}px` }}>
      {hasChildren && (
        <span style={{ cursor: "pointer" }} onClick={toggleOpen}>
          {isOpen ? "▼" : "▶"}
        </span>
      )}
      <span onClick={handleUserClick} style={{ cursor: "pointer" }}>
        {name}
      </span>
      {isOpen && hasChildren && (
        <div>
          {children.map((child, index) => (
            <TreeNode
              key={index}
              name={child.name}
              children={child.children}
              depth={depth + 1}
              onUserSelect={onUserSelect}
              onTeamSelect={onTeamSelect}
              onDeptSelect={onDeptSelect}
              userCode={child.userCode}
              teamCode={child.teamCode}
              deptCode={child.deptCode}
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
  const [selectedTeamCode, setSelectedTeamCode] = useState(null);
  const [selectedDeptCode, setSelectedDeptCode] = useState(null);

  const GroupUser = useSelector((state) => state.groupUserReducer);
  const groupAndTeam = useSelector((state) => state.groupReducer);
  const team = useSelector((state) => state.groupTeamReducer);
  const dept = useSelector((state) => state.groupDeptReducer);
  const user = useSelector((state) => state.user);

  const [showTeamInfo, setShowTeamInfo] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [showDeptInfo, setShowDeptInfo] = useState(false);

  const isAdmin = user && user.isAdmin;

  useEffect(() => {
    dispatch(callOrganizationAPI());
  }, [dispatch]);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      const clickedElement = event.target;
      const isOrganizationClicked = clickedElement.closest(".group_list");

      if (!isOrganizationClicked) {
        setShowUserInfo(false);
        setShowTeamInfo(false);
        setShowDeptInfo(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  console.log("클릭한유저코드=======", GroupUser);
  console.log("groupAndTeam=============", groupAndTeam);
  console.log("클릭한팀코드=============", team);
  console.log("클릭한부서코드=============", dept);

  const handleUserSelect = (userCode) => {
    console.log("핸들유저셀렉트===", userCode);
    setSelectedUserCode(userCode);
    dispatch(callGetuserDetailAPI(userCode));
    setShowUserInfo(true);
    setShowTeamInfo(false);
    setShowDeptInfo(false);
  };

  const handleTeamSelect = (teamCode) => {
    console.log("핸들팀셀렉트===", teamCode);
    setSelectedTeamCode(teamCode);
    dispatch(callGetTeamDetailAPI(teamCode));
    setShowTeamInfo(true);
    setShowUserInfo(false);
    setShowDeptInfo(false);
  };

  const handleDeptSelect = (deptCode) => {
    console.log("핸들부서셀렉트===", deptCode);
    setSelectedDeptCode(deptCode);
    dispatch(callGetDeptDetailAPI(deptCode));

    setShowDeptInfo(true);
    setShowTeamInfo(false);
    setShowUserInfo(false);
  };

  const createUserListStructure = (userList) => {
    console.log("유저코드확인===", userList);

    return userList.map((user, index) => ({
      key: index,
      name: user.userName,
      userCode: user.userCode,
      children: [],
    }));
  };

  const createTeamListStructure = (teamList) => {
    console.log("팀코드확인===", teamList);

    return teamList.map((team, index) => ({
      key: index,
      name: team.teamName,
      teamCode: team.teamCode,
      children: team.userList ? createUserListStructure(team.userList) : [],
    }));
  };

  const data = Array.isArray(groupAndTeam)
    ? [
        {
          name: "EveryWare",
          children: groupAndTeam.map((group, index) => ({
            key: index,
            name: group.deptName,
            deptCode: group.deptCode,
            children: group.teamList
              ? createTeamListStructure(group.teamList)
              : [],
          })),
        },
        console.log("부서코드확인===", groupAndTeam), //들어옴
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

      <main className="group_list">
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
                    {data.length > 0 && (
                      <TreeNode
                        key={data[0].index}
                        name={data[0].name}
                        children={data[0].children}
                        depth={1}
                        onUserSelect={handleUserSelect}
                        onTeamSelect={handleTeamSelect}
                        onDeptSelect={handleDeptSelect}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="group_info_wrap">
              {/* 관리자만 보이는 버튼 */}
              {isAdmin && (
                <div className="admin_btn">
                  <button type="button">그룹추가</button>
                  <button type="button">그룹수정</button>
                  <button type="button">그룹삭제</button>
                </div>
              )}
              {showUserInfo && (
                <div className="group_member_info_wrap  ">
                  <a className="note_btn" href="#home">
                    쪽지
                  </a>
                  <hr />
                  <div className="group_info">
                    <ul className="group_member_info">
                      <li>
                        <strong>사용자 ID</strong>
                        <span>{GroupUser?.userId}</span>
                      </li>
                      <li>
                        <strong>이름</strong>
                        <span>{GroupUser?.userName}</span>
                      </li>
                      <li>
                        <strong>소속 부서</strong>
                        <span>{GroupUser?.team?.teamName}</span>
                      </li>
                      <li>
                        <strong>직급</strong>
                        <span>{GroupUser?.userRank}</span>
                      </li>
                      <li>
                        <strong>휴대폰 번호</strong>
                        <span>{GroupUser?.phone}</span>
                      </li>
                      <li>
                        <strong>이메일</strong>
                        <span>{GroupUser?.email}</span>
                      </li>
                    </ul>
                    <img src="/common/personSample.png" alt="" />
                  </div>
                </div>
              )}

              {showTeamInfo && (
                <div className="group_team_info_wrap ">
                  <ul className="group_team_dept_info">
                    <li>
                      <strong>팀명</strong>
                      <span>{team?.teamName}</span>
                    </li>
                    <li>
                      <strong>사원리스트</strong>
                      <div>
                        {team?.userList?.map((userList) => (
                          <span key={userList.userCode}>
                            {userList?.userName}
                          </span>
                        ))}
                      </div>
                    </li>
                  </ul>
                </div>
              )}
              {showDeptInfo && (
                <div className="group_department_info_wrap ">
                  <ul className="group_team_dept_info">
                    <li>
                      <strong>부서명</strong>
                      <span>{dept?.deptName}</span>
                    </li>
                    <li>
                      <strong>팀리스트</strong>
                      <div>
                        {dept?.teamList?.map((teamList) => (
                          <span key={teamList.teamCode}>
                            {teamList?.teamName}
                          </span>
                        ))}
                      </div>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Group;
