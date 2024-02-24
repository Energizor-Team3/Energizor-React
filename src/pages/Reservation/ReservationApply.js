import "./ReservationApply.css";
import { useLocation } from "react-router-dom"; 
import React, { useState } from "react";

function ReservationApply() {
  const location = useLocation();
  const [room, setRoom] = useState(location.state ? location.state.room : "");

  console.log("999999999999999999999999999999", room);

  return (
    <div id="wrap">
      <section>
        <article>
          <h2>자원예약</h2>
          <div>
            <a href="/reservationapply">
              <button className="btn">예약신청</button>
            </a>
          </div>
          <ul className="sub_list">
            <li>
              <div>
                <img src="/resources/images/Approval.png" alt="" />
                <a href="/reservationmain">
                  <span className="textcolor">예약현황</span>
                </a>
              </div>
            </li>
            <li className="sub_list_text">
              <div>
                <img src="/resources/images/Approval.png" alt="" />
                <a href="/reservationdetails">
                  {" "}
                  <span>내예약내역</span>
                </a>
              </div>
            </li>
          </ul>
        </article>
      </section>
      <main>
        <div className="content">
          <div className="subject">
            <strong>예약신청</strong>

            <div className="line"></div>
          </div>

          <div className="reservation-container">
            <form className="reservation-form">
              <label htmlFor="place">장소:</label>
              <select
                value={room || ""}
                onChange={(e) => setRoom(e.target.value)}
              >
                <option value="">장소를 선택하세요</option>
                <option value="GREEN ROOM">GREEN ROOM</option>
                <option value="BLUE ROOM">BLUE ROOM</option>
                <option value="PROJECT ROOM">PROJECT ROOM</option>
              </select>
              <br />
              <label htmlFor="reason">신청사유:</label>
              <input id="reason" name="reason" required />
              <br />
              <label htmlFor="reason">참석자:</label>
              <input id="reason" name="reason" required />
              <br />
              <button type="button" id="orgChartButton">
                조직도
              </button>
              <label htmlFor="startDate">사용시작일시:</label>
              <input
                type="datetime-local"
                id="startDate"
                name="startDate"
                required
              />
              <br />
              <label htmlFor="endDate">사용종료일시:</label>
              <input
                type="datetime-local"
                id="endDate"
                name="endDate"
                required
              />
              <br />
              <button type="button" id="saveReservationButton">
                저장
              </button>
              <button type="button" id="cancelButton">
                취소
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ReservationApply;
