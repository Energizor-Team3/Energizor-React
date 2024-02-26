import "./ReservationMain.css";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useDispatch, useSelector } from "react-redux";
import { callResevationTotalDetailAPI } from "./../../apis/ReservationAPICalls";
import { useEffect, useState } from "react";
import reservationTotalReducer from "./../../modules/ReservationTotalModules ";
import { Link } from "react-router-dom";

function ReservationMain() {
  const dispatch = useDispatch();
  const reservationTotal = useSelector(
    (state) => state.reservationTotalReducer
  ); // Redux 스토어에서 예약 상태 가져오기
  console.log("자자자전체내역들어갑니다", reservationTotal);
  useEffect(() => {
    // 페이지가 마운트될 때 예약 내역 가져오는 API 호출
    dispatch(callResevationTotalDetailAPI());
  }, [dispatch]);

  function getColorForMeetCode(meetCode) {
    switch (meetCode) {
      case 1:
        return "#b2fab4"; // 연한 초록색
      case 2:
        return "#b2dffb"; // 연한 파란색
      case 3:
        return "#dcb2f9"; // 연한 보라색
    }
  }

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
                <img src="/common/Approval.png" alt="" />
                <span> 예약현황</span>
              </div>
            </li>
            <li className="sub_list_text">
              <div>
                <img src="/common/Approval.png" alt="" />
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
            <strong>예약현황</strong>
            <div className="line"></div>
          </div>
          <div className="meeting-room-container">
            <div className="meeting-room-box">
              <img
                src="/reservation/meetingRoom1.jpg"
                alt="Meeting Room 1"
                className="meeting-room-image"
              />
              <div className="meeting-room-text">GREEN ROOM (6F)</div>
              <Link to="/reservationapply" state={{ room: "GREEN ROOM" }}>
                <button className="threebtn">예약하기</button>
              </Link>
            </div>
            <div className="meeting-room-box">
              <img
                src="/reservation/meetingRoom (2).jpg"
                alt="Meeting Room 2"
                className="meeting-room-image"
              />
              <div className="meeting-room-text">BLUE ROOM (5F)</div>
              <Link to="/reservationapply" state={{ room: "BLUE ROOM" }}>
                <button className="threebtn">예약하기</button>
              </Link>
            </div>
            <div className="meeting-room-box">
              <img
                src="/reservation/meetingRoom (3).jpg"
                alt="Meeting Room 3"
                className="meeting-room-image"
              />
              <div className="meeting-room-text">PROJECT ROOM (4F)</div>
              <Link to="/reservationapply" state={{ room: "PROJECT ROOM" }}>
                <button className="threebtn">예약하기</button>
              </Link>
            </div>
          </div>
          <div className="time-grid">
            <FullCalendar
              allDaySlot={false}
              plugins={[timeGridPlugin, interactionPlugin]}
              initialView="timeGridDay"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "timeGridDay,timeGridWeek",
              }}
              slotDuration="00:30:00"
              selectable={true}
              selectMirror={true}
              slotMinTime="08:00:00"
              slotMaxTime="19:30:00"
              contentHeight="auto"
              slotLabelFormat={{
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              }}
              events={reservationTotal.map((event) => {
                // reservationDate 배열을 날짜 문자열로 변환
                const year = event.reservationDate[0];
                const month = event.reservationDate[1].toString().padStart(2, '0'); // 월을 2자리 숫자로 만듦
                const day = event.reservationDate[2].toString().padStart(2, '0'); // 일을 2자리 숫자로 만듦
                const isoDate = `${year}-${month}-${day}`;
              
                return {
                  title: event.userCode.userName + " - " + event.reservationContent,
                  start: isoDate + "T08:00:00",
                  end: isoDate + "T10:00:00",
                  color: getColorForMeetCode(event.meetCode.meetCode), // getColorForMeetCode 함수의 매개변수명 수정 필요
                  textColor: "black",
                };
              })}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default ReservationMain;
