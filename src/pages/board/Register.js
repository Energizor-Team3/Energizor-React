import React, { useEffect, useRef, useState } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";

import { Editor } from "@toast-ui/react-editor";
import { BoardLayout } from "../../layouts/BoardLayout";

import "./Register.css";
import { usePostBoard } from "../../apis/board/usePostBoard";
import { usePutBoard } from "../../apis/board/usePutBoard";
import { client } from "../../apis/Client";
import { useNavigate, useParams } from "react-router-dom";
import { GLOBAL_API_URL } from "../../apis/GLOBAL_API_URL";

const BOARD_LIST = [
  { value: "0", label: "공지게시판" },
  { value: "1", label: "자유게시판" },
  { value: "2", label: "관리본부" },
  { value: "3", label: "영업본부" },
  { value: "4", label: "기술본부" },
  { value: "5", label: "마케팅본부" },
];

export const BoardRegister = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { mutate: postBoardMutate } = usePostBoard();
  const { mutate: putBoardMutate } = usePutBoard();
  const [title, setTitle] = useState("");
  const [boardTypeCode, setBoardTypeCode] = useState(0);
  const [fileList, setFileList] = useState([]);
  const [content, setContent] = useState("");

  const ref = useRef(null);


  const onSaveBoard = () => {
    if (!params.id) {
      postBoardMutate(
        {
          title,
          boardTypeCode,
          fileList,
          content,
        },
        {
          onSuccess: () => {
            alert("게시글이 작성되었습니다");
          },
          onError: (e) => {
            console.error(e);
          }
        }
      );
    } else {
      putBoardMutate(
        {
          boardCode: params.id,
          title,
          boardTypeCode,
          fileList,
          content,
        },
        {
          onSuccess: () => {
            alert("게시글이 수정되었습니다");
          },
        }
      );
    }
  };

  const onSaveTemporaryBoard = () => {
    postBoardMutate(
      {
        title,
        boardTypeCode,
        fileList,
        content,
        isTemporaryOpt:true
      },
      {
        onSuccess: () => {
          alert("임시 게시글이 작성되었습니다");
        },
        onError: (e) => {
          console.error(e);
        }
      }
    );
  };

  const onFileUploadStart = () => {
    ref.current.click();
  };

  const onFileUpload = async (e) => {
    try {
    const files = e.target.files;
    const formData = new FormData();
    formData.append("boardCode", )
    for (const file of files) {
      formData.append("uploadFiles", file);
    }
    const result = await client.post(
      GLOBAL_API_URL.BOARD.FILE_UPLOAD,
      formData,
     
    );

    setFileList([...fileList, ...result.data]);
    } catch(e) {
      console.error(e)
    }
  };

  return (
    <BoardLayout>
      <div className="cotentHeader">
        <button className="saveButton button" onClick={onSaveBoard}>
          저장
        </button>
        <button className="button" onClick={onSaveTemporaryBoard}>
          임시저장
        </button>
        <button className="button" onClick={() => navigate("/board")}>
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
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>
      <div className="formItem">
        <label>게시판명</label>
        <div>
          <select className="select"
            value={boardTypeCode.toString()}
            onChange={(e) => setBoardTypeCode(Number(e.target.value))}
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
            {true
              ? "첨부파일이 없습니다."
              : fileList.map((item) => <div>{item.fileName}</div>)}
          </div>
        </div>
      </div>
      <Editor
        initialValue=""
        previewStyle="vertical"
        height="600px"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        onChange={(e) => setContent(e)}
        value={content}
      />
    </BoardLayout>
  );
};
