import GroupCSS from "./Group.module.css";


function Group() {
    return (
        <>
        <section>
            <article>
            <h2>조직도</h2>
            <div>
                <a href="writingNote.html" className={GroupCSS.btn}>
                새그룹
                </a>
            </div>
            <ul class="sub_list">
                <li>
                <div>
                    <img src="/resources/images/organization.png" alt="" />
                    <a href="/views/organization/organization.html">조직도</a>
                </div>
                </li>
                <li className={GroupCSS.sub_list_text}>
                <div>
                    <img src="/resources/images/file2.png" alt="" />
                    <a href="/views/organization/organizationManagement.html">
                    그룹관리
                    </a>
                </div>
                </li>
            </ul>
            </article>
        </section>
        <main>
            <div className={GroupCSS.content}>
            <div className={GroupCSS.subject}>
                <strong>조직도</strong>
                <div className={GroupCSS.line}>
                <div className={GroupCSS.search_box}>
                    <input
                    type="search"
                    placeholder="보낸사람, 제목을 입력하세요."
                    />
                </div>
                </div>
            </div>

            <div className={GroupCSS.group_wrap}>
                <div className={GroupCSS.group}>
                {/* <!-- <div className="group">&lt;조직&gt;</div> --> */}

                <div className={GroupCSS.group_content}>
                    <div className={GroupCSS.group_list}>
                    <div className={GroupCSS.group_search}>
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
                    <div>
                        <div id="org_chart"></div>
                    </div>
                    </div>
                </div>
                </div>

                <div className={GroupCSS.group_info_wrap}>
                <div className={GroupCSS.group_member_info_wrap}>
                    <a className={GroupCSS.note_btn} href="#home">
                    쪽지
                    </a>
                    <hr />
                    <div className={GroupCSS.group_info}>
                    <ul className={GroupCSS.group_member_info}>
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

                <div className={GroupCSS.group_department_info_wrap}>
                    <ul className={GroupCSS.group_department_info}>
                    <li>
                        <strong>그룹명</strong>
                        <span>개발1팀</span>
                    </li>
                    <li className={GroupCSS.department_member}>
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
        </>
    );
}

export default Group;
