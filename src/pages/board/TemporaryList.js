import React, { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetTempBoardList } from "../../apis/board/useGetTempBoardList";
import { BoardLayout } from "../../layouts/BoardLayout";
import { PAGE_NUMBER_LIST } from "../../utils/constants";
import "./TemporaryList.css";

const TemporaryList = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [pageNumber, setPageNumber] = useState(10);
  const { data: boardListData } = useGetTempBoardList({
    boardTypeCode: searchParams.get("boardTypeCode"),
  });

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

  const handleChangePageNumber = (event) => {
    setPageNumber(Number(event.target.value));
  };

  return (
    <BoardLayout>
      <button className="trash_button">
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
              <td>{el.registerDate}</td>
              <td>{el.viewCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
