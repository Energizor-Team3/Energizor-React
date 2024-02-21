import "./Group.css";
import "../../components/common/SubHeader.css";

import {
  callOrganizationAPI,
  callGetuserDetailAPI,
  callGetTeamDetailAPI,
  callGetDeptDetailAPI,
  callDeptInsertAPI,
  callTeamInsertAPI,
  callDeptUpdateAPI,
} from "../../apis/GroupAPICalls";

// import { callLoginAPI } from "../../apis/UserAPICalls";

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
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = children && children.length > 0;

  const toggleOpen = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
  };

  // 조직도 클릭시 클릭한 정보 가져오기 & 클릭한 요소 정보 출력하기  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

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
  const deptInset = useSelector((state) => state.groupAdminReducer);

  const [showTeamInfo, setShowTeamInfo] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [showDeptInfo, setShowDeptInfo] = useState(false);

  console.log("부서 인설트===", deptInset);

  // 관리자가 클릭했을때만 보이는 그룹관리 버튼  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const [showAdminButtons, setShowAdminButtons] = useState(false);
  const handleGroupAdminClick = async () => {
    setShowAdminButtons(true);
  };

  // 그룹추가버튼 클릭시 보이는 추가할수있는 화면  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const [GroupInsertButton, setGroupInsertButton] = useState(false);
  const groupInsertClick = async () => {
    setGroupInsertButton(true);
  };

  // 부서추가 (한글입력만 가능 )   >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const [departmentName, setDepartmentName] = useState("");

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const koreanRegex = /^[가-힣ㄱ-ㅎㅏ-ㅣ\s]*$/;

    if (!koreanRegex.test(inputValue) && inputValue !== "") {
      alert(`한글을 입력하세요.`);
      return;
    }

    if (koreanRegex.test(inputValue) || inputValue === "") {
      setDepartmentName(inputValue);
    }
  };

  const deptInsertClick = async () => {
    try {
      const result = await dispatch(callDeptInsertAPI(departmentName));

      if (result && result.status === 200) {
        console.log("부서 추가 성공:", result.data);
      }
    } catch (error) {
      console.error("부서 추가 API 호출 중 에러 발생:", error);
    }
  };

  // 부서 수정

  // const deptUpdateClick = async () => {
  //   try {
  //     const deptName = "리액트 부서 수정";
  //     const result = dispatch(callDeptUpdateAPI(deptName));

  //     if (result && result.status === 200) {
  //     }
  //   } catch (error) {
  //     console.error("부서 수정 API 호출 중 에러 발생:", error);
  //     alert("부서 수정 API 호출 중 에러가 발생했습니다.");
  //   }
  // };

  // 팀추가할 부서선택하기 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const [deptName, setDeptName] = useState("");
  const [isTeamInputRock, setIsTeamInputRock] = useState(false);
  const [isDeptOnlyLead, setIsDeptOnlyLead] = useState(true);
  const [deptCode, setDeptCode] = useState("");
  const [teamName, setTeamName] = useState("");

  const handleDeptConfirmation = () => {
    console.log("입력한부서명존재하니?==", deptName);

    // groupAndTeam 객체 안에 있는 deptName 값들과 입력된 부서명 비교
    let deptExists = false;
    let newDeptCode = "";

    for (const key in groupAndTeam) {
      if (groupAndTeam[key].deptName === deptName.trim()) {
        deptExists = true;
        newDeptCode = groupAndTeam[key].deptCode; // 새로운 부서 코드 저장
        console.log("입력한 부서코드=========", newDeptCode);
        break;
      }
    }

    if (!deptExists) {
      alert("존재하지 않는 부서입니다.");
      return;
    }

    if (deptExists) {
      alert("부서가 선택되었습니다.");
      setIsTeamInputRock(true);
      setIsDeptOnlyLead(false);
      setDeptCode(newDeptCode);
    }
  };

  // 팀 추가 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const handleInputTeam = (e) => {
    const inputValue = e.target.value;
    const koreanRegex = /^[가-힣ㄱ-ㅎㅏ-ㅣ0-9\s]*$/;

    if (!koreanRegex.test(inputValue) && inputValue !== "") {
      alert(`한글을 입력하세요.`);
      return;
    }

    if (koreanRegex.test(inputValue)) {
      setTeamName(inputValue);
    }
  };

  console.log("teamName결과====", teamName);

  const handleTeamAddition = async () => {
    try {
      const teamInsertResult = await dispatch(
        callTeamInsertAPI(teamName, deptCode)
      );

      if (teamInsertResult) {
        alert("팀이 추가되었습니다.");
      } else {
        alert("팀 추가에 실패했습니다.");
      }
      setTeamName("");
    } catch (error) {
      console.error("팀 추가 중 오류 발생:", error);
      alert("팀 추가에 실패했습니다.");
    }
  };

  // 조직도 조회화면에서만 조직도 상세보기 가능

  const [groupShow, setGroupShow] = useState(true);

  const groupShowButtonClick = async () => {
    if (groupShow) {
      setShowUserInfo(false);
      setShowTeamInfo(false);
      setShowDeptInfo(false);
    }
  };

  // 그룹 전체 조회 api 호출
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
        console.log("부서코드확인===", groupAndTeam),
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
                <a href="/group" onClick={() => setGroupShow(true)}>
                  조직도
                </a>
              </div>
            </li>
            <li className="subListText">
              <div>
                <img src="/common/group.png" alt="" />
                <button
                  type="button"
                  onClick={(event) => {
                    handleGroupAdminClick(event);
                    setGroupShow(false);
                  }}
                >
                  그룹관리
                </button>
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
              {showAdminButtons && (
                <>
                  <div className="admin_btn">
                    <button type="button" onClick={groupInsertClick}>
                      그룹추가
                    </button>
                    <button type="button" onClick={deptInsertClick}>
                      그룹수정
                    </button>
                    <button type="button">그룹삭제</button>
                  </div>
                  {GroupInsertButton && (
                    <div className="group_insert_wrap ">
                      <ul className="group_insert">
                        <li>
                          <label>부서명 :</label>
                          <input
                            type="text"
                            id="departmentName"
                            placeholder="추가할 부서명을 입력하세요"
                            value={departmentName}
                            onChange={handleInputChange}
                          />
                          <button type="button" onClick={deptInsertClick}>
                            부서추가
                          </button>
                        </li>
                        <hr />
                        <li className="teamInsert">
                          <div>
                            <label>부서선택 :</label>
                            <input
                              placeholder="팀을 추가하려는 부서명(한글)을 입력하세요"
                              type="text"
                              value={deptName}
                              onChange={(e) => setDeptName(e.target.value)}
                              disabled={!isDeptOnlyLead}
                            />
                            <button
                              onClick={handleDeptConfirmation}
                              disabled={!isDeptOnlyLead}
                            >
                              부서확인
                            </button>
                            <button
                              onClick={() => {
                                setIsDeptOnlyLead(true);
                                setIsTeamInputRock(false);
                              }}
                            >
                              재입력
                            </button>
                          </div>
                          <div>
                            <label>팀명 :</label>
                            <input
                              type="text"
                              placeholder="추가할 팀명을 입력하세요"
                              value={teamName}
                              onChange={handleInputTeam}
                              disabled={!isTeamInputRock}
                            ></input>
                            <button
                              type="button"
                              onClick={handleTeamAddition}
                              disabled={!isTeamInputRock}
                            >
                              팀추가
                            </button>
                          </div>
                        </li>
                      </ul>
                    </div>
                  )}
                </>
              )}

              {groupShow && (
                <>
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
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Group;
