import { useMutation } from "@tanstack/react-query";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import React, { useEffect, useRef, useState } from "react";
import { BoardLayout } from "../../layouts/BoardLayout";

import { useNavigate, useParams } from "react-router-dom";
import { useGetBoardDetail } from "../../apis/board/useGetBoardDetail";
import { postBoard } from "../../apis/board/usePostBoard";
import { usePutBoard } from "../../apis/board/usePutBoard";
import "./Register.css";

const BOARD_LIST = [
  { va1lue: 1, label: "공지게시판" },
  { value: 2, label: "자유게시판" },
  { value: 3, label: "관리본부" },
  { value: 4, label: "영업본부" },
  { value: 5, label: "기술본부" },
  { value: 6, label: "마케팅본부" },
];

export const BoardRegister = () => {
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => console.log('params.edit : ',params.edit), [params.edit])
  
  const { mutate: postBoardMutate } = useMutation({
    mutationFn: postBoard,
  });
  console.log('postBoardMutate : ', postBoardMutate)
  const { mutate: putBoardMutate } = usePutBoard();
  
  const [title, setTitle] = useState("");
  useEffect(() => console.log('title : ', title))
  const [boardTypeCode, setBoardTypeCode] = useState(1);

  const { data: boardDetailData } = useGetBoardDetail(boardTypeCode);
  console.log('boardDetailData : ', boardDetailData);
  
  const [fileList, setFileList] = useState([]);

  const ref = useRef(null);
  const editorRef = useRef(null);

  const onSaveBoard = () => {
    console.log('params.id : ', params.id)

    if (params.id) {
      putBoardMutate(
        {
          boardCode: params.id,
          title,
          boardTypeCode,
          // fileList,
          content: editorRef.current.getInstance().getMarkdown(),
        },
        {
          onSuccess: () => {
            alert("게시글이 수정되었습니다");
            navigate(`/board/${params.id}`);
          },
        }
      );
    } else {

      const formData = new FormData();
      alert("title :"+title);
      alert("boardTypeCode :"+boardTypeCode);
      alert("content :"+editorRef.current.getInstance().getMarkdown());

      formData.append("title", title);
      formData.append("boardTypeCode", boardTypeCode);
      fileList.forEach((file) => {
        formData.append("uploadFiles", file);
      });
      formData.append("content", editorRef.current.getInstance().getMarkdown());

      console.log('formData : ', formData)
      postBoardMutate(formData, {
        onSuccess: () => {
          alert("게시글이 작성되었습니다");
        },
        onError: (e) => {
          console.error(e);
        },
      });
      
   
    }
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

  
  const onFileUpload = async (e) => {
    try {
      const files = e.target.files;
      setFileList([...fileList, ...files]);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => console.log('fileList : ', fileList), [])
  useEffect(() => {
    // const prevContent = boardDetailData?.data?.content;
    const prevContent = "";
    console.log('prevContent : ', prevContent)
    if (prevContent && editorRef.current.getInstance().getMarkdown() === "") {
      editorRef.current.getInstance().insertText(prevContent);
    }
  }, [boardDetailData]);
  useEffect(() => console.log(' editorRef.current.getInstance() : ',  editorRef.current.getInstance()))

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
            // value={title || boardDetailData?.data?.title}
            onChange={(e) => setTitle(e.target.value)}
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

export default BoardRegister;
