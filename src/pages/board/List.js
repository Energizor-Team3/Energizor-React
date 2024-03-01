import React, { useRef, useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetBoardList } from "../../apis/board/useGetBoardList";
import { usePostInterestBoard } from "../../apis/board/usePostInterestBoard";
import { BoardLayout } from "../../layouts/BoardLayout";
import { PAGE_NUMBER_LIST } from "../../utils/constants";
import "./List.css";
import { deleteBoard, useDeleteBoard } from "../../apis/board/useDeleteBoard";

const BoardList = ({ boardTypeCode }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(10);
  const [searchType, setSearchType] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState(null);
  const selectRef = useRef();
  const inputRef = useRef();
  const [isActive,setIsActive]=useState(false);
  const { data: boardListData } = useGetBoardList({
    boardTypeCode: searchParams.get("boardTypeCode"),
    page: page,
    size: pageNumber,
    type: searchType,
    keyword: searchKeyword
  });
  const { mutate: postInterestMutate } = usePostInterestBoard();

  const [interestedBoards, setInterestedBoards] = useState([]);
  const [selectedBoardList, setSelectedBoardList] = useState([]);
  const registerButton = () => {
    navigate("/register");
  };
  const { mutate } = useDeleteBoard()



  const onAddToInterestBoard = (id) => {
    postInterestMutate(
      {
        boardCode: id,
      },
      {
        onSuccess: () => {
          alert("관심 게시판에 등록되었습니다.");
          if (!interestedBoards.includes(id)) {
            setInterestedBoards((current) => [...current, id]);
          }
        },
        onError: () => {
          alert("관심 게시판에 등록 중 오류가 발생했습니다.");
        },
      }
    );
  };

  const handleGetNewPage = (pageNum) => {
    setPage(pageNum)
  };

  const handleChangePageNumber = (event) => {
    setPageNumber(Number(event.target.value));
  };

  const handleSearch = () => {
    setSearchType(selectRef.current.value === '제목' ? 't' : 'w');
    setSearchKeyword(inputRef.current.value);
  }

  const onClickBoard = (id) => {
    if (selectedBoardList.includes(id)) {
      setSelectedBoardList(
        selectedBoardList.filter((selectedId) => selectedId !== id)
      );
    } else {
      setSelectedBoardList([...selectedBoardList, id]);
    }
  };

  const deleteHandler = () => {
    console.log(selectedBoardList);   // [11]
    selectedBoardList.map((selectedBoard) => {
      mutate(selectedBoard);
    });
    
  };
  return (
    <BoardLayout>
      <div>
        <select className="search" ref={selectRef}>
          <option>제목</option>
          <option>작성자</option>
        </select>
        <input className="searchInput" ref={inputRef}/>
        <button className="searchButton" onClick={handleSearch}>검색</button>
      </div>
      <button className="trash_button"  onClick={deleteHandler}>
        <FaRegTrashCan className="trash"></FaRegTrashCan>
      </button>
      <table className="main_board_table">
        <thead>
          <th>
            <input type="checkbox" />
          </th>
          <th>순번</th>
          <th>관심</th>
          <th>제목</th>
          <th>작성자</th>
          <th>등록일</th>
          <th>조회수</th>
        </thead>
        <tbody>
          {boardListData?.data?.dtoList?.map((el, index) => (
            <tr key={el.id}>
              <td>
                <input type="checkbox"
                checked={selectedBoardList.includes(el.boardCode)}
                onChange={() => {
                    onClickBoard(el.boardCode);
                  }} />
              </td>
              <td>{index + 1}</td>
              <td>
                <button
                  className="interest_button"
                  onClick={() => onAddToInterestBoard(el.boardCode)}
                >
                  <FaRegStar></FaRegStar>
                </button>
              </td>
              <td onClick={() => navigate(`/board/${el.boardCode}`)}>
                {el.title}
              </td>
              <td>
                {[el.deptName, el.teamName, el.userName]
                  .filter(Boolean)
                  .join(" / ")}
              </td>
              <td>{el.registerDate.slice(0,3).join('-')}</td>
              <td>{el.viewCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pageContainer">
        <div className="page" style={{width: '100%', display: 'flex', gap: '5px', justifyContent: "center"}}>
            {boardListData?.data?.pageList?.map((el) => (
              <p onClick={() => handleGetNewPage(el)}>{el}</p>
            ))}
      </div>
      </div>
      <div className="pageSelector">
        <select
            name="page_number_choice"
            id="page_number_choice"
            onChange={handleChangePageNumber}
            value={pageNumber}
          >
            {PAGE_NUMBER_LIST.map((page) => (
              <option key={page} value={page}>
                {page}
              </option>
            ))}
          </select>
          <label className="page_number_choice_text" htmlFor="page_number_choice">
            페이지당 항목수
          </label>
      </div>
    </BoardLayout>
  );
};

export default BoardList;
