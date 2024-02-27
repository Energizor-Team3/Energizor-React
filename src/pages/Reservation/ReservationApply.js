import "./ReservationApply.css";
import React, { useEffect, useState } from "react";
import ReservationGroup from "./ReservationGroup"; // 조직도 컴포넌트 import
import { FaTimes } from "react-icons/fa";
import { callReservationInsertAPI } from "./../../apis/ReservationAPICalls";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";

function ReservationApply() {
  const dispatch = useDispatch();

  const [showOrgChart, setShowOrgChart] = useState(false);

  // form 상태 변수 추가
  const [form, setForm] = useState({
    meetCode: "",
    reservationContent: "", // 추가: 신청 사유
    startTime: "",
    endTime: "",
    member: [], // 수정: 초기값을 빈 배열로 설정
    startDate: new Date(), // 시작 날짜를 현재 날짜로 초기화
    endDate: new Date(), // 종료 날짜를 현재 날짜로 초기화
  });

  useEffect(() => {
    console.log(form);
  }, [form]);

  const onChangeHandler = (e) => {
    // form 상태 업데이트
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveReservation = () => {
    // 예약 가능 여부 확인
    if (isReservationAvailable()) {
      // 시작 날짜와 종료 날짜를 현재 날짜로 설정하지 않고 선택한 값으로 설정
      const updatedForm = {
        ...form,
        startDate: form.startDate || new Date(),
        endDate: form.endDate || new Date(),
      };
  
      dispatch(callReservationInsertAPI({ form: updatedForm }));
      // 예약이 완료되었습니다 알림창
      window.alert("예약이 완료되었습니다.");
      // 확인을 누르면 reservationmain으로 이동
      window.open("/reservationmain", "_self");
    } else {
      // 예약이 불가능한 경우 알림창 표시
      window.alert("해당 시간에 이미 예약이 있습니다. 다른 시간을 선택해주세요.");
    }
  };

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

  // 예약 가능 여부 확인하는 함수
  const isReservationAvailable = () => {
    // 같은 meetCode와 날짜, 시간이 겹치는 예약이 있는지 확인
    // 여기에 해당 로직 구현
    return true; // 일단은 항상 true로 반환하도록 임시 구현
  };

  // 참석자 목록 삭제 함수 수정
  const handleRemoveAttendee = (userCodeToRemove) => {
    // 선택된 사용자 목록에서 삭제
    const updatedAttendees = form.attendees.filter(
      (attendee) => attendee.userCode !== userCodeToRemove
    );
    setForm({
      ...form,
      member: updatedAttendees,
    });
  };

  // 조직도 표시 여부 토글 함수 수정
  const toggleOrgChart = () => {
    setShowOrgChart(!showOrgChart);
  };

  // 사용자 선택 시 실행되는 함수 수정
  const handleUserSelect = ({ userCode, name }) => {
    // 이미 선택된 사용자인지 확인
    if (!form.member.some((attendee) => attendee.userCode === userCode)) {
      // 선택된 사용자가 중복되지 않으면 추가
      setForm({
        ...form,
        member: [...form.member, { userCode, name }],
      });
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
              <label htmlFor="meetCode">장소:</label>
              <select
                value={form.meetCode}
                name="meetCode"
                onChange={onChangeHandler}
              >
                <option value="">장소를 선택하세요</option>
                <option value="1">GREEN ROOM</option>
                <option value="2">BLUE ROOM</option>
                <option value="3">PROJECT ROOM</option>
              </select>
              <br />
              <label htmlFor="reason">신청사유:</label>
              {/* 추가: 신청 사유 입력란 */}
              <input
                id="reservationContent"
                name="reservationContent"
                value={form.reservationContent}
                onChange={onChangeHandler}
                required
              />
              <br />

              <label htmlFor="member">참석자:</label>
              <div id="attendeesList">
                {form.member.map((attendee, index) => (
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
                  selected={form.startDate}
                  onChange={(date) =>
                    setForm({ ...form, startDate: date || new Date() })
                  }
                  minDate={new Date()}
                  maxDate={
                    new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
                  } // 7 days ahead
                  dateFormat="yyyy-MM-dd"
                />

                <label htmlFor="startTime">시작 시간:</label>
                <select
                  value={form.startTime}
                  onChange={(e) =>
                    setForm({ ...form, startTime: e.target.value })
                  }
                >
                  {generateAvailableTimes().map((time, index) => (
                    <option key={index} value={time}>
                      {time}
                    </option>
                  ))}
                </select>

                <label htmlFor="endDate">종료 날짜:</label>
                <DatePicker
                  selected={form.endDate}
                  onChange={(date) =>
                    setForm({ ...form, endDate: date || new Date() })
                  }
                  minDate={form.startDate}
                  maxDate={
                    new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
                  } // 7 days ahead
                  dateFormat="yyyy-MM-dd"
                />

                <label htmlFor="endTime">종료 시간:</label>
                <select
                  value={form.endTime}
                  onChange={(e) =>
                    setForm({ ...form, endTime: e.target.value })
                  }
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
