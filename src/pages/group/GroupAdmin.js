import "./Group.css";
import "../../components/common/SubHeader.css";
import "./GroupInsert";
import "./GroupUpdate";

import { callGroupAdminAPI } from "../../apis/GroupAPICalls";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import GroupInsert from "./GroupInsert";
import GroupUpdate from "./GroupUpdate";
import GroupDelete from "./GroupDelete";


function TreeNodeAdmin({
  name,
  children,
  depth = 1,
  onClickCode,
  userCode,
  teamCode,
  deptCode,
  searchOpen,
}) {
  const [isOpen, setIsOpen] = useState(depth === 1);
  const hasChildren = children && children.length > 0;
  const [highlighted, setHighlighted] = useState(false);

  useEffect(() => {
    let isOpenValue = depth === 1;

    if (children) {
      isOpenValue =
        isOpenValue ||
        children.some((child) => {
          // some : 콜백함수조건 만족여부에 따라 불리언값을 반환
          if (child.name === searchOpen) {
            // 부서명과 일치시 트루값 반환
            return true;
          } else if (child.children) {
            return child.children.some((grandchild) => {
              if (grandchild.name === searchOpen) {
                // 팀명과 일치시 트루 반환
                return true;
              } else if (grandchild.children) {
                return grandchild.children.some(
                  // === 연산자를 통해 유저명과일치시 불리언값 반환
                  (greatGrandchild) => greatGrandchild.name === searchOpen
                );
              }
              return false;
            });
          }
          return false;
        });
    }

    // prevState : 현상태라는 뜻 , useState 훅 사용시 현재 상태값이 true , false 인지 확인할떄 사용함
    setIsOpen((prevState) => {
      // prevState가 false로 들어오면서(닫힌노드) isOpenValue가 트루일때만(조직도 == 검색명 일치) if문실행
      if (!prevState && isOpenValue) {
        return true;
      }
      return prevState; // 노드가 열려있으면 그대로 반환(열린노드는 열린상태 유지)
    });
    setHighlighted(name === searchOpen); // 조직도 == 검색명 일치시엔 텍스트 색상 변경위해 트루반환
  }, [searchOpen, children, name, depth]);
  // 이펙트를 사용하여 여기 셋 중 상태 변경시마다 코드실행 , searchOpen(검색)이 바뀔때마다 코드실행됨
  // 만약 검색한 부서 , 팀 , 유저 중 노드가 닫혀있는 경우에만 노드토글이 열림

  const toggleOpen = () => {
    if (hasChildren) {
      setIsOpen((prevIsOpen) => !prevIsOpen);
    }
  };

  const handleClick = (e) => {
    e.stopPropagation();

    if (userCode !== undefined && !teamCode && !deptCode) {
      onClickCode(userCode, "user");
    } else if (teamCode !== undefined && !userCode && !deptCode) {
      onClickCode(teamCode, "team");
    } else if (deptCode !== undefined && !userCode && !teamCode) {
      onClickCode(deptCode, "dept");
    }
  };

  return (
    <div style={{ paddingLeft: `${depth * 15}px` }}>
      {hasChildren && (
        <span style={{ cursor: "pointer" }} onClick={toggleOpen}>
          {isOpen ? "▼" : "▶"}
        </span>
      )}
      <span
        onClick={handleClick}
        style={{ cursor: "pointer", color: highlighted ? "red" : "black" }}
      >
        {name}
      </span>
      {isOpen && hasChildren && (
        <div className="group_style">
          {children.map((child, index) => (
            <TreeNodeAdmin
              key={index}
              name={child.name}
              children={child.children}
              depth={depth + 1}
              onClickCode={onClickCode}
              userCode={child.userCode}
              teamCode={child.teamCode}
              deptCode={child.deptCode}
              searchOpen={searchOpen}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function GroupAdmin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allGroup = useSelector((state) => state.groupAdminReducer);
  const [updateCount, setUpdateCount] = useState(0);

  // api내부에 접근권한 설정해놈(api비동기호출이후 접근권한 처리시 버튼 두번클릭해야 페이지이동되는 문제발생됨)
  useEffect(() => {
    dispatch(callGroupAdminAPI());
    setClickData([]);
  }, [dispatch, updateCount]);

  useEffect(() => {
    if (allGroup.status && allGroup.status !== 200) {
      // 상태값은 숫자이므로 '' 문자가아닌 숫자로!!!
      navigate("/group");
    }
  }, [allGroup.status, navigate]);

  console.log("올크룹===", allGroup);

  // 일부 브라우저와 모바일기기에서도 input 자동포커싱을 위해 useRef(dom요소 직접접근) 사용
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
    console.log("포커싱!!!=====");
  }, []);

  const groupSelect = () => {
    navigate("/group");
  };

  const allGroupList = allGroup.result?.map((group) => ({
    ...group,
    teamList: group.teamList.map((team) => ({
      ...team,
      userList: team.userList.map((user) => ({
        ...user,
      })),
    })),
  }));

  /* 조직도 트리 구조 */
  const createUserList = (userList) => {
    return userList
      .filter((user) => user.userStatus === "Y")
      .map((user, index) => ({
        key: index,
        name: user.userName,
        userCode: user.userCode,
      }));
  };

  const createTeamList = (teamList) => {
    return teamList.map((team, index) => ({
      key: index,
      name: team.teamName,
      teamCode: team.teamCode,
      children: team.userList ? createUserList(team.userList) : [],
    }));
  };

  const data = allGroupList
    ? [
        {
          name: "EeveryWare",
          children: allGroup.result?.map((group, index) => ({
            key: index,
            name: group.deptName,
            deptCode: group.deptCode,
            children: group.teamList ? createTeamList(group.teamList) : [],
          })),
        },
      ]
    : [];

  console.log("퇴사자 제외 조직도=======", data);

  /* 조직도 검색 */
  const [SearchOpen, setSearchOpen] = useState("");

  const handleSearch = (searchValue) => {
    let resultFound = false;

    allGroup.result?.forEach((group) => {
      group.teamList.forEach((team) => {
        if (
          team.teamName === searchValue ||
          team.userList.some(
            (user) =>
              user.userName === searchValue || group.deptName === searchValue
          )
        ) {
          setSearchOpen(searchValue);
          console.log("조직도 검색값 저장됐는지 확인 ===", searchValue);
          resultFound = true;
        }
      });
    });

    if (!resultFound) {
      console.log("검색 결과를 찾을 수 없습니다.");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setSearchOpen("");
      event.target.value = "";
    }
  };

  const [clickData, setClickData] = useState([]);
  // const [activeBtn, setActiveBtn] = useState([]);
  console.log("allGroup====", allGroup.result);

  const handleCode = (code, codeType) => {
    console.log("유저코드?????====", code, codeType);
    let newData = { code, codeType };

    if (codeType === "dept") {
      allGroup.result.forEach((dept) => {
        if (dept.deptCode === code) {
          newData = { ...newData, name: dept.deptName };
          setClickData((prevList) => [...prevList, newData]);
        }
      });
    } else if (codeType === "team") {
      allGroup.result.forEach((dept) => {
        dept.teamList.forEach((team) => {
          if (team.teamCode === code) {
            newData = { ...newData, name: team.teamName };
            setClickData((prevList) => [...prevList, newData]);
          }
        });
      });
    }
  };

  console.log("부모에서 전달하는값====", clickData);

  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonId) => {
    if (activeButton !== buttonId) {
      setActiveButton(buttonId);
      setClickData([]);
    }
  };

  const [insertShow, setInsertShow] = useState(true);
  const [updateShow, setUpdateShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);

  

  return (
    <div id="wrap">
      <section>
        <article>
          <h2>조직도</h2>
          <div>
            <button type="button" className="btn" onClick={groupSelect}>
              조직도
            </button>
          </div>
          <ul className="subList">
            <li className="subListText">
              <div>
                <img src="/common/group.png" alt="" />
                <button type="button">그룹관리</button>
              </div>
            </li>
          </ul>
        </article>
      </section>

      <main className="main_group">
        <div className="subject">
          <strong>조직도</strong>
          <div className="line"></div>
        </div>

        <div className="group_view_box">
          <div className="group_view_warp">
            <div className="group_contents">
              <div className="group_search">
                <input
                  type="search"
                  id="group_search"
                  placeholder="부서명 , 직원명을 입력하세요(Enter시 검색 초기화)"
                  onChange={(e) => handleSearch(e.target.value)}
                  onKeyPress={handleKeyPress}
                  ref={inputRef}
                />
                <label htmlFor="typing_search">
                  <img src="/common/search.png" alt="" />
                </label>
              </div>

              <div className="group_view">
                {data.length > 0 && (
                  <TreeNodeAdmin
                    key={data[0].index}
                    name={data[0].name}
                    children={data[0].children}
                    searchOpen={SearchOpen}
                    onClickCode={handleCode}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="group_admin_view">
            <div className="admin_btn">
              <button
                type="button"
                className={activeButton === "add" ? "button active" : "button"}
                onClick={(e) => {
                  handleButtonClick("add");
                  setInsertShow(true);
                  setUpdateShow(false);
                  setDeleteShow(false);
                }}
              >
                그룹추가
              </button>
              <button
                type="button"
                className={activeButton === "edit" ? "button active" : "button"}
                onClick={() => {
                  handleButtonClick("edit");
                  setInsertShow(false);
                  setUpdateShow(true);
                  setDeleteShow(false);
                }}
              >
                그룹수정
              </button>
              <button
                type="button"
                className={
                  activeButton === "delete" ? "button active" : "button"
                }
                onClick={() => {
                  handleButtonClick("delete");
                  setInsertShow(false);
                  setUpdateShow(false);
                  setDeleteShow(true);
                }}
              >
                그룹삭제
              </button>
            </div>
            <div className="group_cud">
              <div className="group-insert">
                {insertShow && (
                  <GroupInsert
                    allGroup={allGroup.result}
                    setUpdateCount={setUpdateCount}
                    setSearchOpen={setSearchOpen}
                  />
                )}
              </div>

              <div className="group_update">
                {updateShow && activeButton === "edit" && (
                  <GroupUpdate 
                  clickData={clickData} 
                  setUpdateCount={setUpdateCount}
                  />
                )}
              </div>

              <div className="group_delete">
                {deleteShow && (
                  <GroupDelete 
                  clickData={clickData} 
                  setUpdateCount={setUpdateCount}
                  allGroup={allGroup.result}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
export default GroupAdmin;
