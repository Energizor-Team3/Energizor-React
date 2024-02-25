import "./ReservationApply.css";
import React, { useState } from "react";
import ReservationGroup from "./ReservationGroup"; // 조직도 컴포넌트 import
import { FaTimes } from "react-icons/fa";
import { callReservationInsertAPI } from "./../../apis/ReservationAPICalls";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ReservationApply() {
  const [room, setRoom] = useState("");
  const [showOrgChart, setShowOrgChart] = useState(false);
  const [attendees, setAttendees] = useState([]); // 선택된 참석자 목록
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("08:30");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // generateAvailableTimes 함수 수정
  const generateAvailableTimes = () => {
    const times = [];
    for (let hour = 8; hour <= 19; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedHour = hour.toString().padStart(2, "0");
        const formattedMinute = minute.toString().padStart(2, "0");
        times.push(`${formattedHour}:${formattedMinute}`);
      }
    }
    return times;
  };

  // 예약 저장 버튼 클릭 시 실행되는 함수
  const handleSaveReservation = () => {
    // 예약 정보를 저장하는 로직
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

  // ReservationGroup 컴포넌트에서 사용자를 선택했을 때 실행되는 함수
  const handleUserSelect = ({ userCode, name }) => {
    // 이미 선택된 사용자인지 확인
    if (!attendees.find((attendee) => attendee.userCode === userCode)) {
      // 선택된 사용자가 중복되지 않으면 추가
      setAttendees([...attendees, { userCode, name }]);
    }
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
              <select value={room} onChange={(e) => setRoom(e.target.value)}>
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

              <div>
                <label htmlFor="startDate">시작 날짜:</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date || new Date())}
                  minDate={new Date()}
                  maxDate={
                    new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
                  } // 7 days ahead
                  dateFormat="yyyy-MM-dd"
                />

                <label htmlFor="startTime">시작 시간:</label>
                <select
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                >
                  {generateAvailableTimes().map((time, index) => (
                    <option key={index} value={time}>
                      {time}
                    </option>
                  ))}
                </select>

                <label htmlFor="endDate">종료 날짜:</label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date || new Date())}
                  minDate={startDate}
                  maxDate={
                    new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
                  } // 7 days ahead
                  dateFormat="yyyy-MM-dd"
                />

                <label htmlFor="endTime">종료 시간:</label>
                <select
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                >
                  {generateAvailableTimes().map((time, index) => (
                    <option key={index} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              <br />
              <button
                type="button"
                id="saveReservationButton"
                onClick={handleSaveReservation}
              >
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
