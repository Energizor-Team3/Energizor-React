import React, { useEffect,useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useGetInterestBoardList } from "../../apis/board/useGetInterestBoardList";
import { BoardLayout } from "../../layouts/BoardLayout";
import './InterestList.css';
import { FaRegTrashCan } from "react-icons/fa6";
import {useMutation} from '@tanstack/react-query'
import { deleteBoard } from "../../apis/board/deleteBoard";

const InterestList = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data: boardListData } = useGetInterestBoardList({
    boardTypeCode: searchParams.get("boardTypeCode"),
    
  });
  const {mutate} = useMutation({
    mutationFn: deleteBoard
  })

  const [selectedBoardList, setSelectedBoardList] = useState([])

  const onClickBoard = (id) => {
    if (selectedBoardList.includes(id)) {
      setSelectedBoardList(selectedBoardList.filter(selectedId => selectedId !== id));
    } else {
      setSelectedBoardList([...selectedBoardList, id])
    }
  }
  const deleteHandler = () => {
    console.log(selectedBoardList)
    selectedBoardList.map(selectedBoard => {
      mutate(selectedBoard);
    })
  }
  return (
    <BoardLayout>
      <button className="trash_button" onClick={deleteHandler}><FaRegTrashCan className="trash"></FaRegTrashCan></button>
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
  {boardListData?.data?.dtoList?.map((el,index) => (
    <tr key={el.id}>
      <td><input type="checkbox" onChange={() => {onClickBoard(el.boardCode)}} /></td>
      <td>{index + 1}</td>
      <td onClick={() => navigate(`/board/${el.boardCode}`)}>{el.title}</td>
      <td>
        {[el.deptName, el.teamName, el.userName].filter(Boolean).join(" / ")}
      </td>
      <td>{el.registerDate}</td>
      <td>{el.viewCount}</td>
    </tr>
  ))}
</tbody>

      </table>
      <select name="page_number_choice" id="page_number_choice">
        <option value="" />
      </select>
      <label className="page_number_choice_text" htmlFor="page_number_choice">
        페이지당 항목수
      </label>
    </BoardLayout>
  );
};

export default InterestList;
