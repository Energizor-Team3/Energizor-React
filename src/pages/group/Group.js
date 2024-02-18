import  "./Group.css";
import "../../components/common/SubHeader.css";

import {
    callOrganizationAPI
} from '../../apis/GroupAPICalls';

import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import queryString from 'query-string';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';


    function TreeNode({ name, children, depth }) {
        const [isOpen, setIsOpen] = useState(false);
      
    
    const toggleOpen = () => {
        // 자식이 있을 때만 토글 기능이 작동하도록 합니다.
        if (children && children.length > 0) {
          setIsOpen(!isOpen);
        }
      };
    
      const hasChildren = children && children.length > 0;
    
      return (
        <>
          <div style={{ paddingLeft: `${depth * 20}px`, cursor: hasChildren ? "pointer" : "default" }}>
            {/* 자식이 있을 때만 토글 아이콘을 표시합니다. */}
            {hasChildren && (
              <span onClick={toggleOpen}>
                {isOpen ? "▼" : "▶"}
              </span>
            )}
            <span>{name}</span>
          </div>
    
          {isOpen && hasChildren && (
            <div>
              {children.map((child, index) => (
                <TreeNode
                  key={index}
                  name={child.name}
                  children={child.children}
                  // depth 값을 증가시켜 자식에게 전달합니다.
                  depth={depth + 1}
                />
              ))}
            </div>
          )}
        </>
      );
    }
      
      function Group() {

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
  const data = [
    {
      name: "EveryWare",
      children: groupAndTeam.map(group => ({
        name: group.deptName,
        children: createTeamListStructure(group.teamList),
      })),
    },
  ];
  
  console.log(data);

        
      
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
                          <label for="group_search">
                            <img src="/resources/images/search.png" alt="" />
                          </label>
                        </div>
      
                        <div className="Group"> 조직도부분
                          <TreeNode
                            name={data[0].name}
                            children={data[0].children}
                            depth={1}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
      
                  <div className="group_info_wrap">
                    <div class="group_member_info_wrap">
                      <a class="note_btn" href="#home">
                        쪽지
                      </a>
                      <hr />
                      <div class="group_info">
                        <ul class="group_member_info">
                          <li>
                            <strong>사용자 ID</strong>
                            <span>45454</span>
                          </li>
                          <li>
                            <strong>이름</strong>
                            <span>홍길동</span>
                          </li>
                          <li>
                            <strong>소속 부서</strong>
                            <span>개발 1팀</span>
                          </li>
                          <li>
                            <strong>직급</strong>
                            <span>대리</span>
                          </li>
                          <li>
                            <strong>휴대폰 번호</strong>
                            <span>010-1234-4567</span>
                          </li>
                          <li>
                            <strong>이메일</strong>
                            <span></span>
                          </li>
                        </ul>
                        <img src="/resources/images/personSample.png" alt="" />
                      </div>
                    </div>
      
                    <div class="group_department_info_wrap">
                      <ul class="group_department_info">
                        <li>
                          <strong>그룹명</strong>
                          <span>개발1팀</span>
                        </li>
                        <li class="department_member">
                          <strong>소속 직원</strong>
                          <div>
                            <img src="/resources/images/person.png" alt="" />
                            <span>홍길동1</span>
                          </div>
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