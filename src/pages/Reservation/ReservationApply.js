//import "./ReservationApply.css";
import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import ReservationGroup from "./ReservationGroup"; // 조직도 컴포넌트 import

function ReservationApply() {
  const location = useLocation();
  const [room, setRoom] = useState(location.state ? location.state.room : "");
  const [showOrgChart, setShowOrgChart] = useState(false);

  console.log("999999999999999999999999999999", room);

  // ReservationGroup 컴포넌트에서 사용자 선택을 처리하는 함수를 정의합니다.
  const handleUserSelect = (userCode, actionType) => {
    // 선택된 사용자 코드와 액션 타입을 처리합니다. (예: '결재' 또는 '참조')
    console.log("선택된 사용자 코드:", userCode);
    console.log("액션 타입:", actionType);
  };

  // 조직도 표시 여부를 토글하는 함수를 정의합니다.
  const toggleOrgChart = () => {
    setShowOrgChart(!showOrgChart);
  };

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
              <button
                type="button"
                id="orgChartButton"
                onClick={toggleOrgChart}
              >
                조직도
              </button>
              {/* 조직도 컴포넌트 */}
              {showOrgChart && (
              <div className="orgChartContainer">
                <ReservationGroup />
              </div>
            )}
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
