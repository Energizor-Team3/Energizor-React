import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import SubHeader from "../components/common/SubHeader";
import "./BoardLayout.css";
import { useEffect, useState } from "react";
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

const mapPathToTitle = {
  '/board/temp_list': '임시보관함',
  '/board/interest_list': '관심게시함',
  '/board?boardTypeCode=1': '공지 게시판',
  '/board?boardTypeCode=3': '관리본부',
  '/board?boardTypeCode=4': '영업본부',
  '/board?boardTypeCode=5': '기술본부',
  '/board?boardTypeCode=6': '마케팅본부',
  '/board?boardTypeCode=2': '자유 게시판',
}

export function BoardLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [currentBoardType, setCurrentBoardType] = useState();
  const [currentBoardTitle,setCurrentBoardTitle] = useState();

  const handleMenuClick = (menu) => {
    setCurrentBoardType(menu);
  };


  useEffect(()=>{
    if (Object.keys(mapPathToTitle).includes(location.pathname + location.search)) setCurrentBoardTitle(mapPathToTitle[location.pathname + location.search])
    else if (location.pathname === '/board/edit') setCurrentBoardTitle('게시글 작성')
    else if (location.pathname.startsWith('/board/edit')) setCurrentBoardTitle('수정하기')
    else if (location.pathname.startsWith('/board/temp')) setCurrentBoardTitle('수정하기')
    else setCurrentBoardTitle('게시글 상세')
  }, [location])
  

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
              </div>
            </div>
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
