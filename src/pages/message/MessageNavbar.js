import "./MessageNavbar.css";
// import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Link } from "react-router-dom";

function MessageNavbar() {
  return (
    <section className="messageNavbar">
      <article>
        <h2>쪽지</h2>
        <div>
          <Link to="/write-message" id="link" className="btn">
            쪽지쓰기
          </Link>
        </div>
        <ul className="messageNavbar_sub_list">
          <li>
            <div>
              <img src="/common/Inbox.png" alt="" />
              <Link to="/rec-message" id="link">
                받은쪽지함
              </Link>
            </div>
            <span className="message_number">5</span>
          </li>
          <li className="sub_list_text">
            <div>
              <img src="/common/Outbox.png" alt="" />
              <Link to="/send-message" id="link">
                보낸쪽지함
              </Link>
            </div>
            <button type="button">수신확인</button>
          </li>
          <li>
            <div>
              <img src="/common/note.png" alt="" />
              <Link to="/rec-message-storage" id="link">
                쪽지보관함
              </Link>
            </div>
          </li>
          <li>
            <div>
              <img src="/common/Temporarystoragebox.png" alt="" />
              <Link to="/send-message-storage" id="link">
                임시보관함
              </Link>
            </div>
          </li>
          <li>
            <div>
              <img src="/common/Trash.png" alt="" />
              <Link to="/message-trash" id="link">
                휴지통
              </Link>
            </div>
          </li>
        </ul>
      </article>
    </section>
  );
}

export default MessageNavbar;
