import "./Group.css";
import "../../components/common/SubHeader.css";
import TreeNode from "./GroupTreeNode";
import GroupDetail from "./GroupDetail";

import { callOrganizationAPI } from "../../apis/GroupAPICalls";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";

function Group() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allGroup = useSelector((state) => state.groupReducer);

  // 일부 브라우저와 모바일기기에서도 input 자동포커싱을 위해 useRef(dom요소 직접접근) 사용
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
    console.log("포커싱!!!=====");
  }, []);

  useEffect(() => {
    dispatch(callOrganizationAPI());
  }, [dispatch]);

  console.log("전체조직도======", allGroup);

  const onlyAdmin = () => {
    navigate('/group-admin')
  }

  const groupSelect = () => {
    navigate('/group')
  }

  const allGroupList = allGroup.map((group) => ({
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

  console.log("createUserList===", createUserList.name);

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
          children: allGroup.map((group, index) => ({
            key: index,
            name: group.deptName,
            deptCode: group.deptCode,
            children: group.teamList ? createTeamList(group.teamList) : [],
          })),
        },
      ]
    : [];

  console.log("퇴사자 제외 조직도=======", data);

  const [clickCode, setClickCode] = useState({ code: "", codeType: "" });

  const handleCode = (code, codeType) => {
    console.log("유저코드====", code, codeType);
    setClickCode({ code, codeType });
  };

  /* 조직도 검색 */
  const [SearchOpen, setSearchOpen] = useState("");

  const handleSearch = (searchValue) => {
    let resultFound = false;

    allGroup.forEach((group) => {
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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setSearchOpen("");
      e.target.value = "";
    }
  };

  return (
    <div id="wrap">
      <section>
        <article>
          <h2>조직도</h2>
          <div>
            <button 
            type='button' 
            className="btn"
            onClick={groupSelect}
            >
              조직도
            </button>
          </div>
          <ul className="subList">
            <li className="subListText">
              <div>
                <img src="/common/group.png" alt="" />
                <button 
                type="button" 
                onClick={onlyAdmin}>
                  그룹관리
                  </button>
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
                  <TreeNode
                    key={data[0].index}
                    name={data[0].name}
                    children={data[0].children}
                    onClickCode={handleCode}
                    searchOpen={SearchOpen}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="group_info_wrap">
            <GroupDetail clickCode={clickCode} />
          </div>
        </div>
      </main>
    </div>
  );
}
export default Group;
