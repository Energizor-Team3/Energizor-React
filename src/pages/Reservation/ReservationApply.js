//import "./ReservationApply.css";
import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import ReservationGroup from "./ReservationGroup"; // 조직도 컴포넌트 import
import { FaTimes } from "react-icons/fa";

function ReservationApply() {
  const location = useLocation();
  const [room, setRoom] = useState(location.state ? location.state.room : "");
  const [showOrgChart, setShowOrgChart] = useState(false);
  const [attendees, setAttendees] = useState([]); // 선택된 참석자 목록

  console.log("999999999999999999999999999999", room);

  // ReservationGroup 컴포넌트에서 사용자를 선택했을 때 실행되는 함수
  const handleUserSelect = ({ userCode, name }) => {
    // 이미 선택된 사용자인지 확인
    if (!attendees.find((attendee) => attendee.userCode === userCode)) {
      // 선택된 사용자가 중복되지 않으면 추가
      setAttendees([...attendees, { userCode, name }]);
    }
  };

  // 참석자 목록을 삭제하는 함수
  const handleRemoveAttendee = (userCodeToRemove) => {
    // 선택된 사용자 목록에서 삭제
    const updatedAttendees = attendees.filter(
      (attendee) => attendee.userCode !== userCodeToRemove
    );
    setAttendees(updatedAttendees);
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

              <label htmlFor="attendees">참석자:</label>
              <div id="attendeesList">
                {attendees.map((attendee, index) => (
                  <span className="attendee-input" key={index}>
                    {attendee.name}
                    <FaTimes
                      className="attendee-remove-icon"
                      onClick={() => handleRemoveAttendee(attendee.userCode)}
                    />
                  </span>
                ))}
              </div>
              

              <br />
              <button
                type="button"
                id="orgChartButton"
                onClick={toggleOrgChart}
              >
                조직도
              </button>
              {showOrgChart && (
                <div className="orgChartContainer">
                  {/* ReservationGroup 컴포넌트에 handleUserSelect 함수 전달 */}
                  <ReservationGroup onUserSelect={handleUserSelect} />
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
