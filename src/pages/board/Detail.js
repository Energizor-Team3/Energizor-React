import "@toast-ui/editor/dist/toastui-editor.css";
import React, { useEffect, useRef, useState } from "react";

import { Viewer } from "@toast-ui/react-editor";
import { BoardLayout } from "../../layouts/BoardLayout";

import { FaRegTrashCan } from "react-icons/fa6";
import { PiNotePencilDuotone } from "react-icons/pi";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteBoard } from "../../apis/board/useDeleteBoard";
import { useDeleteComment } from "../../apis/board/useDeleteComment";
import { useGetBoardDetail } from "../../apis/board/useGetBoardDetail";
import { useGetBoardFileList } from "../../apis/board/useGetBoardFileList";
import { useGetCommentList } from "../../apis/board/useGetCommentList";
import { usePatchComment } from "../../apis/board/usePatchComment";
import { usePostComment } from "../../apis/board/usePostComment";
import { downloadFile } from "../../utils/downloadFile";
import "./Detail.css";

export const BoardDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data: boardDetailData } = useGetBoardDetail(params.id);
  const { data: boardFileListData } = useGetBoardFileList(params.id);
  const { data: commentListData, refetch: refetchCommentList } =
    useGetCommentList(params.id);

  const { mutate: postCommentMutate } = usePostComment();
  const { mutate: patchCommentMutate } = usePatchComment();
  const { mutate: deleteCommentMutate } = useDeleteComment();
  const { mutate: deleteBoardMutate } = useDeleteBoard();

  const [commentContent, setCommentContents] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  console.log(commentContent);
  const [editingCommentContent, setEditingCommentContent] = useState("");
  const [viewerValue, setViewerValue] = useState('');
 


  const onPostComment = () => {
    if (!commentContent) {
      alert("댓글을 입력해주세요.");
      return;
    }
    postCommentMutate(
      {
        commentContent,
        boardCode: Number(params.id),
      },
      {
        onSuccess: () => {
          setCommentContents("");
          alert("댓글이 정상적으로 등록되었습니다.");
          refetchCommentList();
        },
        onError: (e) => {
          console.error(e);
          alert("댓글 작성 중에 오류가 발생했습니다.");
        },
      }
    );
  };
  const handleEdit = (id, comment) => {
    setEditingCommentId(id);
    setEditingCommentContent(comment);
  };
  const handleEditCancel = () => {
    setEditingCommentId(null);
    setEditingCommentContent("");
  };
  const handleEditSave = () => {
    if (!editingCommentContent) {
      alert("댓글을 입력해주세요.");
      return;
    }
    patchCommentMutate(
      {
        editingCommentContent,
        boardCode: Number(params.id),
        commentCode: editingCommentId,
      },
      {
        onSuccess: () => {
          setEditingCommentId(null);
          alert("댓글이 정상적으로 수정되었습니다.");
          refetchCommentList();
        },
        onError: (e) => {
          console.error(e);
          alert("댓글 작성 중에 오류가 발생했습니다.");
        },
      }
    );
  };
  
  const handleDelete = (id) => {
    deleteCommentMutate(id, {
      onSuccess: () => {
        alert("댓글이 정상적으로 삭제되었습니다.");
        refetchCommentList();
      },
      onError: (error) => {
        console.error(error);
        alert("댓글 삭제 중 오류가 발생했습니다.");
      },
    });
  };

  const handleDownloadFile = (event, fileData, fileName) => {
    event.preventDefault();
    downloadFile(fileData, fileName);
  };

  const handleDeleteBoardDetail = (id) => {
    deleteBoardMutate(id, {
      onSuccess: () => {
        alert("게시글이 정상적으로 삭제되었습니다.");
        navigate(-1);
      },
      onError: (error) => {
        console.error(error);
        alert("게시글 삭제 중 오류가 발생했습니다.");
      },
    });
  };

  console.log("boardFileListData", boardFileListData);
  console.log("boardDetailData", boardDetailData);

  const handleEditBoardDetail = () => {
    navigate(`/board/edit/${params.id}`);
  };


  useEffect(()=>{
    setViewerValue(boardDetailData?.data?.content ?? '');
  }, [boardDetailData])
  return (
    <BoardLayout>
      <div className="boardButton">
        <button className="updateButton" onClick={handleEditBoardDetail}>
          <PiNotePencilDuotone></PiNotePencilDuotone>
        </button>
        <button
          className="deleteButton"
          onClick={() => handleDeleteBoardDetail(params.id)}
        >
          <FaRegTrashCan></FaRegTrashCan>
        </button>
      </div>
      <div className="detailCotentHeader">
        <div className="headerItemWrapper">
          <div className="headerItem">
            <div>제목</div>
            <div>{boardDetailData?.data?.title}</div>
          </div>

          <div className="headerItem">
            <div className="writer">작성자</div>
            <div>
              {[
                boardDetailData?.data.userName,
                boardDetailData?.data.deptName,
                boardDetailData?.data.teamName,
              ]
                .filter(Boolean)
                .join(" / ")}
            </div>
          </div>
        </div>

        <div className="headerItemWrapper">
          <div className="headerItem">
            <div>작성일</div>
            <div>{boardDetailData?.data.registerDate?.join(".")}</div>
          </div>

          <div className="headerItem">
            <div className="viewCount">조회수</div>
            <div>{boardDetailData?.data.viewCount}</div>
          </div>
        </div>

        <div className="headerItem">
          <div>첨부파일</div>
          <div>
            {boardFileListData?.data?.map((file) => (
              <a
                href="#"
                key={file.fileId}
                onClick={(event) =>
                  handleDownloadFile(event, file.data, file.fileName)
                }
              >
                {file.fileName}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="textDiv">
        {viewerValue === '' ? null :
        <Viewer
          className="viewer"
          initialValue={viewerValue}
        />}
      </div>
      <div className="commentWrapper">
        <div className="commentHeader">
          댓글 {commentListData?.data?.length}개
        </div>
        <div>
          {commentListData?.data?.map((comment) => (
            <div className="commentItem" key={comment.commentCode}>
              <div></div>
              <div className="commentContent">
                <div>{comment.teamName}/{comment.userName}</div>
                {editingCommentId === comment.commentCode ? (
                  <textarea
                    value={editingCommentContent}
                    onChange={(e) => setEditingCommentContent(e.target.value)}
                  />
                ) : (
                  <div>{comment.commentContent}</div>
                )}
              </div>
              <div className="commentFooter">
                <div>{`${comment.updateDate[0]}.${comment.updateDate[1]}.${comment.updateDate[2]}`}</div>
                <div>
                  {editingCommentId === comment.commentCode ? (
                    <>
                      <button className="commentButton2" onClick={handleEditSave}>완료</button>
                      <button className="commentButton2" onClick={handleEditCancel}>취소</button>
                    </>
                  ) : (
                    <button className="commentButton"
                      onClick={() => {
                        handleEdit(comment.commentCode, comment.commentContent);
                      }}
                    >
                      수정
                    </button>
                  )}

                  <button className="commentButton"
                    onClick={() => {
                      handleDelete(comment.commentCode);
                    }}
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="commentWriteWrapper">
          <div className="commentWrite">
            <div>댓글</div>
            <textarea
              value={commentContent}
              onChange={(e) => setCommentContents(e.target.value)}
            />
          </div>
          <div>
            <button className="button saveButton" onClick={onPostComment}>
              작성
            </button>
          </div>
        </div>
      </div>
    </BoardLayout>
  );
};

export default BoardDetail;
