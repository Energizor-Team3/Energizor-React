import React, { useRef, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetTempBoardList } from "../../apis/board/useGetTempBoardList";
import { BoardLayout } from "../../layouts/BoardLayout";
import { PAGE_NUMBER_LIST } from "../../utils/constants";
import "./TemporaryList.css";
import { useDeleteTemporaryBoard } from "../../apis/board/useDeleteTemporaryBoard";

const TemporaryList = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(10);
  const [searchType, setSearchType] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState(null);
  const selectRef = useRef();
  const inputRef = useRef();
  const { data: boardListData } = useGetTempBoardList({
    boardTypeCode: searchParams.get("boardTypeCode"),
    page: page,
    size: pageNumber,
    type: searchType,
    keyword: searchKeyword
  });

  const registerButton = () => {
    navigate("/register");
  };
  const { mutate } = useDeleteTemporaryBoard()

  const [selectedBoardList, setSelectedBoardList] = useState([]);

  const onClickBoard = (id) => {
    if (selectedBoardList.includes(id)) {
      setSelectedBoardList(
        selectedBoardList.filter((selectedId) => selectedId !== id)
      );
    } else {
      setSelectedBoardList([...selectedBoardList, id]);
    }
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

  const deleteHandler = () => {
    console.log(selectedBoardList);
    selectedBoardList.map((selectedBoard) => {
      mutate(selectedBoard);
    });
    setSelectedBoardList([])
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
      <table className="board_table">
        <thead>
          <th>
            <input type="checkbox" />
          </th>
          <th>순번</th>
          <th>제목</th>
          <th>작성자</th>
          <th>등록일</th>
          <th>조회수</th>
        </thead>
        <tbody>
          {boardListData?.data?.dtoList?.map((el, index) => (
            <tr key={el.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedBoardList.includes(el.temporaryCode)}
                  onChange={() => onClickBoard(el.temporaryCode)}
                />
              </td>
              <td>{index + 1}</td>
              <td onClick={() => navigate(`/board/temp/${el.temporaryCode}`)}>
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
      <div style={{width: '100%', display: 'flex', gap: '5px', justifyContent: "center"}}>
            {boardListData?.data?.pageList?.map((el) => (
              <p onClick={() => handleGetNewPage(el)}>{el}</p>
            ))}
          </div>
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
    </BoardLayout>
  );
};

export default TemporaryList;
