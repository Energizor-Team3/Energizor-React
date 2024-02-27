import { useNavigate } from "react-router-dom";
import { useGetBoardList } from "../../apis/board/useGetBoardList";
import MainNoticeCardCSS from "../main-cards/MainNoticeCardCSS.css";

// const MainNoticeCard = () => {
//     const { data: boardListData, isSuccess } = useGetBoardList({
//         boardTypeCode: 1,
//         page: 1,
//         size: 10
//       });
//     return <div>
//         {isSuccess ? boardListData?.data?.dtoList.map((notice, idx) => <Content data={notice} idx={idx}/>) : null}
//     </div>
// }
// export default MainNoticeCard;


// const Content = ({
//     data, idx
// }) => {
    // const navigate = useNavigate()
    // return <div className="mainBoardDiv" style={{display: 'flex', gap: '4px'}} onClick={() => {navigate(`/board/${data.boardCode}`)}}>
    //     <p>{idx + 1}</p>
    //     <p>{data.title}</p>
    //     <p> {[data.deptName, data.teamName, data.userName]
    //               .filter(Boolean)
    //               .join(" / ")}</p>
    //     <p>{data.registerDate.slice(0, 3).join('-')}</p>
    // </div>
    

// }
const MainNoticeCard = () => {
    const { data: boardListData, isSuccess } = useGetBoardList({
        boardTypeCode: 1,
        page: 1,
        size: 10
    });

    return (
        <div>
            {/* 데이터 제목을 한 번만 표시하는 div */}
            <div className="mainBoardTitles" style={{display: 'flex', gap: '4px', fontWeight: 'bold', marginBottom: '10px'}}>
                <p className="titleSeq">순번</p>
                <p className="titleName">제목</p>
                <p className="titleAuthor">작성자</p>
                <p className="titleDate">등록일</p>
            </div>

            {/* isSuccess가 true일 경우 게시물 데이터를 나열 */}
            {isSuccess && boardListData?.data?.dtoList.map((notice, idx) => (
                <Content key={idx} data={notice} idx={idx}/>
            ))}
        </div>
    );
}
export default MainNoticeCard;

const Content = ({
    data, idx
}) => {
    const navigate = useNavigate();
    return (
        <div className="mainBoardDiv" style={{display: 'flex', gap: '4px'}} onClick={() => {navigate(`/board/${data.boardCode}`)}}>
            <p className="titleSeq">{idx + 1}</p>
            <p className="titleName">{data.title}</p>
            <p className="titleAuthor">{[data.teamName, data.userName].filter(Boolean).join(" / ")}</p>
            <p className="titleDate">{data.registerDate.slice(0,3).join('-')}</p>
        </div>
    );
}