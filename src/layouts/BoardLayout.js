import { Link, useNavigate, useSearchParams } from "react-router-dom";
import SubHeader from "../components/common/SubHeader";
import "./BoardLayout.css";
import { useState } from "react";
import { FaRegFileLines } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";


const MENU_LIST = [
  {
    title: "공지 게시판",
    link: "/board?boardTypeCode=1",
  },
  {
    title: "부서 게시판",
    children: [
      {
        title: "관리본부",
        link: "/board?boardTypeCode=3",
      },
      {
        title: "영업본부",
        link: "/board?boardTypeCode=4",
      },
      {
        title: "기술본부",
        link: "/board?boardTypeCode=5",
      },
      {
        title: "마케팅본부",
        link: "/board?boardTypeCode=6",
      },
    ],
  },
  {
    title: "자유 게시판",
    link: "/board?boardTypeCode=2",
  }
];



export function BoardLayout({ children }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentBoardType, setCurrentBoardType] = useState();
  const [currentBoardTitle,setCurrentBoardTitle] = useState();

  const handleMenuClick = (menu) => {
    setCurrentBoardType(menu);
    setCurrentBoardTitle(menu.title); // 선택된 메뉴의 제목으로 currentBoardTitle 상태 업데이트
  };

  // 하위 메뉴 클릭 시 실행될 함수
  const handleSubMenuClick = (title) => {
    setCurrentBoardTitle(title); // 선택된 하위 메뉴의 제목으로 currentBoardTitle 상태 업데이트
  };
  

  return (
    <>
      <SubHeader />
      <div className="contents">
        <section>
          <article>
            <h2>게시판</h2>
            <div>
              <button className={"writeButton"}>
                <Link to="/board/edit" className={"writeButton"}>글쓰기</Link>
              </button>
            </div>
            <ul className="sub_list">
              <li>
                <div className="sub_list_text">
                  <FaRegFileLines className="icon"/>
                  <Link to="/board/temp_list">임시보관함</Link>
                </div>
              </li>
              <li className="sub_list_text">
                <div>
                  <FaRegStar className="icon"/>
                  <Link to="/board/interest_list">관심게시함</Link>
                </div>
              </li>
            </ul>
            <ul className="board_type">
              {MENU_LIST.map((menu) => (
                <li className="boradItem" key={menu.link}>
                  {menu.children ? (
                    <span
                      id="showDiv"
                      onClick={() => handleMenuClick(menu)}
                    >
                      {menu.title}
                      <i className="fa-solid fa-angle-down" />
                      {currentBoardType?.title === menu.title &&currentBoardType?.children && (
                        <div className="department_div">
                          <ul className="department_list">
                            {currentBoardType.children.map((child) => (
                              <li className="subBoradItem" key={child.link} onClick={(e) => {
                                e.stopPropagation(); // 상위 메뉴의 onClick 이벤트가 호출되는 것을 방지
                                handleSubMenuClick(child.title);
                              }}>
                                <Link to={child.link}>{child.title}</Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </span>
                  ) : (
                    <Link to={menu.link} onClick={() => handleMenuClick(menu)}>{menu.title}</Link>
                  )}
                </li>
              ))}
            </ul>
          </article>
        </section>
        <main>
          <div className="content">
            <div className="subject">
              <strong>{currentBoardTitle}</strong>
              <div className="line">
                <div className="search_box">
                  <input
                    type="search"
                    placeholder="제목, 작성자를 입력하세요."  
                  />
                  <IoSearch />
                </div>
              </div>
            </div>
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
