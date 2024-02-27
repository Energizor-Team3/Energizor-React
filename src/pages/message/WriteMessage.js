import "../../components/common/SubHeader.css";
import MessageNavbar from "./MessageNavbar";
import "./writeMessage.css";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { decodeJwt } from "../../utils/tokenUtils";
import { callMyPageAPI } from "../../apis/UserAPICalls";

function WriteMessage() {
  const dispatch = useDispatch();
  const myInfo = useSelector((state) => state.userReducer);

  useEffect(() => {
    dispatch(callMyPageAPI());
  }, []);

  console.log("로그인한유저정보확인!==========", myInfo);

  return (
    <div id="wrap">
      <MessageNavbar />

      <main className="subMain">
        <div className="content">
          <div className="subject">
            <strong>쪽지쓰기</strong>
            <div className="line"></div>
          </div>

          <div className="button_list">
            <button type="submit">보내기</button>
            <button type="button">임시저장</button>
            <button type="reset">취소</button>
          </div>

          <form className="message_form">
            <div className="form_wrap">
              <div>
                <label htmlFor="subject">제목</label>
                <input type="text" id="subject" />
              </div>
              <div>
                <label htmlFor="Recipients">받는사람</label>
                <input type="text" id="Recipients" />
              </div>
              <div>
                <span>첨부파일</span>
                <label htmlFor="fileInput">
                  <img src="/resources/images/pc.png" alt="" />
                  내pc
                </label>
                <input type="file" id="fileInput" multiple />
                <div id="fileList"></div>
              </div>
            </div>
            <textarea
              id="summernote"
              name="editordata"
              spellcheck="false"
            ></textarea>
          </form>
        </div>
      </main>
    </div>
  );
}

export default WriteMessage;
