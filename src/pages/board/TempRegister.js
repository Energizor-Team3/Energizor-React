import { useMutation } from "@tanstack/react-query";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import React, { useEffect, useRef, useState } from "react";
import { BoardLayout } from "../../layouts/BoardLayout";

import { useNavigate, useParams } from "react-router-dom";
import { useGetTempBoardDetail } from "../../apis/board/useGetTempBoardDetail";
import { postBoard } from "../../apis/board/usePostBoard";
import { deleteTemporaryBoard } from "../../apis/board/useDeleteTemporaryBoard";
import { usePutBoard } from "../../apis/board/usePutBoard";
import "./Register.css";

const BOARD_LIST = [
  { value: "1", label: "공지게시판" },
  { value: "2", label: "자유게시판" },
  { value: "3", label: "관리본부" },
  { value: "4", label: "영업본부" },
  { value: "5", label: "기술본부" },
  { value: "6", label: "마케팅본부" },
];

export const TempBoardRegister = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data: boardDetailData } = useGetTempBoardDetail(params.id);
  console.log(boardDetailData);
  const { mutate: postBoardMutate } = useMutation({
    mutationFn: postBoard,
  });
  const { mutate: deleteTemporaryBoardMutaet } = useMutation({
    mutationFn: deleteTemporaryBoard,
  })
  const { mutate: putBoardMutate } = usePutBoard();
  // const [title, setTitle] = useState("");
  // const [boardTypeCode, setBoardTypeCode] = useState(1);
  const [fileList, setFileList] = useState([]);

  const [title, setTitle] = useState(boardDetailData?.data?.title || "");
  useEffect(() => console.log('title : ', title))

  const chageTitle = (e) =>{
    const inputValue = e.target.value;
    // 입력값이 비어있는 경우에만 제목을 초기화합니다.
    if (inputValue === "") {
      setTitle("");
    } else {
      setTitle(inputValue);
    }
    
  }

  // const [boardTypeCode, setBoardTypeCode] = useState(1);
  const [boardTypeCode, setBoardTypeCode] = useState(boardDetailData?.data?.boardTypeCode || "");
  useEffect(() => console.log('boardTypeCode : ', boardTypeCode))

  const chageBoardType = (e) =>{
    const inputValue = e.target.value;
    // 입력값이 비어있는 경우에만 제목을 초기화합니다.
    if (inputValue === "") {
      setBoardTypeCode("");
    } else {
      setBoardTypeCode(inputValue);
    }
    
  }

  const ref = useRef(null);
  const editorRef = useRef(null);

  const onSaveBoard = () => {
    const formData = new FormData();
      formData.append("title", title);
      formData.append("boardTypeCode", boardTypeCode);
      fileList.forEach((file) => {
        formData.append("uploadFiles", file);
      });
      formData.append("content", editorRef.current.getInstance().getMarkdown());
      postBoardMutate(formData, {
        onSuccess: () => {
          alert("게시글이 작성되었습니다");
          deleteTemporaryBoardMutaet( params.id, {
            onSuccess: () => {
              alert("임시 게시글 삭제되었습니다");
            },
            onError: (e) =>{
              console.error(e);
            }

          });
        },
        onError: (e) => {
          console.error(e);
        },
      });
  };

  const onSaveTemporaryBoard = () => {
    postBoardMutate(
      {
        title,
        boardTypeCode,
        fileList,
        content: editorRef.current.getInstance().getMarkdown(),
        isTemporaryOpt: true,
      },
      {
        onSuccess: () => {
          alert("임시 게시글이 작성되었습니다");
        },
        onError: (e) => {
          console.error(e);
        },
      }
    );
  };

  const onFileUploadStart = () => {
    ref.current.click();
  };

  console.log(fileList);
  const onFileUpload = async (e) => {
    try {
      const files = e.target.files;
      setFileList([...fileList, ...files]);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    const prevContent = boardDetailData?.data?.content;
    if (prevContent && editorRef.current.getInstance().getMarkdown() === "") {
      editorRef.current.getInstance().insertText(prevContent);
    }
  }, [boardDetailData]);

  return (
    <BoardLayout>
      <div className="cotentHeader">
        <button className="saveButton button" onClick={onSaveBoard}>
          저장
        </button>
        <button className="button" onClick={onSaveTemporaryBoard}>
          임시저장
        </button>
        <button className="button" onClick={() => navigate(-1)}>
          취소
        </button>
      </div>
      <div className="formItem">
        <label>제목</label>
        <div>
          <input
            type="text"
            placeholder="제목을 입력해주세요"
            value={title}
            // onChange={(e) => setTitle(e.target.value)}
            onChange={chageTitle}
          />
        </div>
      </div>
      <div className="formItem">
        <label>게시판명</label>
        <div>
          <select
            className="select"
            // value={
            //   boardDetailData?.data?.boardTypeCode?.toString() ??
            //   boardTypeCode.toString()
            // }
            value={boardTypeCode}
            // onChange={(e) => setBoardTypeCode(Number(e.target.value))}
            onChange={chageBoardType}
            // onChange={(e) => setBoardTypeCode(Number(e.target.value))}
          >
            {BOARD_LIST.map((item) => {
              return (
                <option value={item.value} key={item.value}>
                  {item.label}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="formItem">
        <label>첨부파일</label>
        <div>
          <input
            type="file"
            style={{
              display: "none",
            }}
            ref={ref}
            onChange={onFileUpload}
          />
          <div className="attchFileHeader">
            <div onClick={onFileUploadStart}>내 PC</div>
            <div>첨부파일 {fileList.length}개</div>
          </div>
          <div className="attchFileList">
            {fileList.length === 0
              ? "첨부파일이 없습니다."
              : fileList.map((item) => <div>{item.name}</div>)}
          </div>
        </div>
      </div>
      <Editor
        ref={editorRef}
        initialValue=""
        previewStyle="vertical"
        height="600px"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
      />
    </BoardLayout>
  );
};

export default TempBoardRegister;
