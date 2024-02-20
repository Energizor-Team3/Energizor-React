import React, { useState } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";

import { Viewer } from "@toast-ui/react-editor";
import { BoardLayout } from "../../layouts/BoardLayout";

import "./Detail.css";
import { useNavigate, useParams } from "react-router-dom";
import { useGetBoardDetail } from "../../apis/board/useGetBoardDetail";
import dayjs from "dayjs";
import { useGetCommentList } from "../../apis/board/useGetCommentList";
import {usePostComment} from '../../apis/board/usePostComment'

export const BoardDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data: boardDetailData } = useGetBoardDetail(params.id);
  const {data:commentListData, refetch: refetchCommentList} = useGetCommentList(params.id);
  
  const {mutate:postCommentMutate} = usePostComment()

  const [commentContent, setCommentContents] = useState("");
  const onPostComment = () => {
    if (!commentContent) {
      alert("댓글을 입력해주세요.");
      return;
    }
    postCommentMutate({
      commentContent,
      boardCode : Number(params.id)
    }, {
      onSuccess : () => {
        setCommentContents("")
        alert("댓글이 정상적으로 등록되었습니다.");
        refetchCommentList();
      },
      onError : (e) =>{
        console.error(e);
        alert("댓글 작성 중에 오류가 발생했습니다.");
      }    
    })
  }
  return (
    <BoardLayout>
      <div className="detailCotentHeader">
        <div className="headerItemWrapper">
          <div className="headerItem">
            <div>제목</div>
            <div>{boardDetailData?.data?.title}</div>
          </div>
        </div>
        <div className="headerItemWrapper">
          <div className="headerItem">
            <div>작성자</div>
            <div>{[boardDetailData?.data.userName, boardDetailData?.data.deptName, boardDetailData?.data.teamName]
                  .filter(Boolean) 
                  .join(" / ")}</div>
            </div>
          <div className="headerItem">
            <div>작성일</div>
            <div>
            {boardDetailData?.data.registerDate?.join(".")}
            </div>
          </div>
        </div>
        <div className="headerItemWrapper">
          <div className="headerItem">
            <div>조회수</div>
            <div>{boardDetailData?.data.viewCount}</div>
          </div>
        </div>
        <div className="headerItemWrapper">
          <div className="headerItem">
            <div>첨부파일</div>
            <div>
              {boardDetailData?.fileList?.map((file) => (
                <div key={file.fileId}>{file.fileName}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div>
        <Viewer initialValue={boardDetailData?.content || ""} />
      </div>
      <div className="commentWrapper">
        <div className="commentHeader">댓글 {commentListData?.data?.length}개</div>
        <div>
          {
            commentListData?.data?.map((comment) =>  <div className="commentItem" key={comment.commentCode}>
            <div></div>
            <div className="commentContent">
              <div>{comment.userName}</div>
              <div>{comment.commentContent}</div>
            </div>
            <div className="commentFooter">
              <div>{`${comment.registerDate[0]}.${comment.registerDate[1]}.${comment.registerDate[2]}`}</div>
              <div>
                <button>수정</button>
                <button>삭제</button>
              </div>
            </div>
          </div>
            )
          }
    
        </div>
        <div className="commentWriteWrapper">
          <div className="commentWrite">
            <div>댓글</div>
            <textarea value={commentContent} onChange={e => setCommentContents(e.target.value)} />
          </div>
          <div>
            <button className="button saveButton" onClick={onPostComment}>작성</button>
          </div>
        </div>
      </div>
    </BoardLayout>
  );
};
