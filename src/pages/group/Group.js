import "./Group.css";
import "../../components/common/SubHeader.css";
import React, { useState } from "react";
// import "jstree";

function TreeNode({ name, children, depth }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const hasChildren = children && children.length > 0;

  return (
    <>
      <div>
        <div onClick={toggleOpen} style={{ cursor: "pointer" }}>
          {children ? (isOpen ? "▼" : "▶") : null} {name}
        </div>

        {isOpen && children && (
          <div style={{ paddingLeft: `${depth * 20}px` }}>
            {children.map((child, index) => (
              <TreeNode
                key={index}
                name={child.name}
                children={child.children}
                depth={1}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function Group() {
  const data = [
    {
      name: "EveryWare",
      children: [
        {
          name: "관리본부",
          children: [
            { name: "총무팀", children: [{ name: "박서준팀장" }] },
            { name: "회계팀", children: [{ name: "강동원팀장" }] },
          ],
        },
        { name: "영업본부", children: [{ name: "영업팀" }] },
        {
          name: "개발본부",
          children: [
            { name: "IT운영팀", children: [{ name: "차은우팀장" }] },
            {
              name: "개발팀",
              children: [
                { name: "유승제팀장" },
                { name: "우지선" },
                { name: "박다희" },
                { name: "김수연" },
                { name: "김다혜" },
                { name: "축온청" },
                { name: "장재영" },
                { name: "이준희" },
              ],
            },
          ],
        },
        { name: "마케팅본부", children: [{ name: "지창욱 마케팅본부장" }] },
      ],
    },
  ];

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
        <div class="content">
          <div class="subject">
            <strong>조직도</strong>
            <div class="line">
              <div class="search_box">
                <input
                  type="search"
                  placeholder="보낸사람, 제목을 입력하세요."
                />
              </div>
            </div>
          </div>

          <div class="group_wrap">
            <div class="group">
              {/* <!-- <div class="group">&lt;조직&gt;</div> --> */}

              <div class="group_content">
                <div class="group_list">
                  <div class="group_search">
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

                  <div className="Group">
                    <TreeNode
                      name={data[0].name}
                      children={data[0].children}
                      depth={1}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="group_info_wrap">
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
