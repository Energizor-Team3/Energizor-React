import React, { useEffect,useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useGetBoardList } from "../../apis/board/useGetBoardList";
import { BoardLayout } from "../../layouts/BoardLayout";
import './List.css';
import { usePostInterestBoard } from "../../apis/board/usePostInterestBoard";
import { FaRegStar } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import dayjs from "dayjs";


const BoardList = ({ boardTypeCode }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data: boardListData } = useGetBoardList({
    boardTypeCode: searchParams.get("boardTypeCode"),
    
  });
  const {mutate:postInterestMutate} = usePostInterestBoard()

  const [boardCode, setBoardCode] = useState(null);

  const [interestedBoards, setInterestedBoards] = useState([]);


  const registerButton = () => {
    navigate("/register");
  };

  const onAddToInterestBoard = (id) => {
    postInterestMutate({
      boardCode : id,
    }, {
      onSuccess : () => {
        alert("관심 게시판에 등록되었습니다.")
        if(!interestedBoards.includes(id)) {
          setInterestedBoards(current => [...current,id]);
        }
      },
      onError : () => {
        alert("관심 게시판에 등록 중 오류가 발생했습니다.")
      }
    })
  }

  const handleGetNewPage = (pageNum) => {
    
  }
  return (
    <BoardLayout>
      <button className="trash_button"><FaRegTrashCan className="trash"></FaRegTrashCan></button>
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
      <td><input type="checkbox" onChange={() => setBoardCode(el.id)} /></td>
      <td>{index + 1}</td>
      
      <td><button className="interest_button" onClick={() => onAddToInterestBoard(el.boardCode)}><FaRegStar></FaRegStar></button></td>
      <td onClick={() => navigate(`/board/${el.boardCode}`)}>{el.title}</td>
      <td>
        {[el.deptName, el.teamName, el.userName].filter(Boolean).join(" / ")}
      </td>
      <td>{el.registerDate}</td>
      <td>{el.viewCount}</td>
    </tr>
  ))}
  <div>
    {
      boardListData?.data?.pageList?.map(el =>
        <p onClick={() => handleGetNewPage(el)}>{el}</p>)
    }
  </div>
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

export default BoardList;
