import React, { useEffect, useRef } from 'react';
import './ReservationMain.css'; // CSS 파일을 import하여 스타일 적용
import FullCalendar from '@fullcalendar/react'; // FullCalendar React 래퍼 import
import dayGridPlugin from '@fullcalendar/daygrid'; // DayGrid 플러그인 import
import timeGridPlugin from '@fullcalendar/timegrid'; // TimeGrid 플러그인 import
import interactionPlugin from '@fullcalendar/interaction'; // Interaction 플러그인 import

function ReservationMain() {
  const calendarRef = useRef(null);

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.getApi().gotoDate(new Date()); // 현재 날짜로 이동
    }
  }, []);

  return (
    <div id="wrap">
      <header>
        <h1>
          <img src="/resources/images/Logo.png" alt="" />
        </h1>
        <nav>
          <div id="main_list_icon">
            <div>
              <a href="#">
                <img src="/resources/images/Home.png" alt="" />
              </a>
              <span>홈</span>
            </div>
            <div>
              <a href="#">
                <img src="/resources/images/Approval.png" alt="" />
              </a>
              <span>전자결재</span>
            </div>
            <div>
              <a href="#">
                <img src="/resources/images/Attendance.png" alt="" />
              </a>
              <span>근태관리</span>
            </div>
            <div>
              <a href="#">
                <img src="/resources/images/calendar.png" alt="" />
              </a>
              <span>일정관리</span>
            </div>
            <div>
              <a href="#">
                <img src="/resources/images/Address.png" alt="" />
              </a>
              <span>주소록</span>
            </div>
            <div>
              <a href="#">
                <img src="/resources/images/Organization.png" alt="" />
              </a>
              <span>조직도</span>
            </div>
            <div>
              <a href="#">
                <img src="/resources/images/Mail.png" alt="" />
              </a>
              <span>쪽지</span>
            </div>
            <div>
              <a href="#">
                <img src="/resources/images/Messanger.png" alt="" />
              </a>
              <span>메신저</span>
            </div>
            <div>
              <a href="#">
                <img src="/resources/images/reservation.png" alt="" />
              </a>
              <span>자원예약</span>
            </div>
            <div>
              <a href="#">
                <img src="/resources/images/board.png" alt="" />
              </a>
              <span>게시판</span>
            </div>
          </div>
        </nav>
      </header>
      <section>
        <article>
          <h2>자원예약</h2>
          <div>
            <a href="/views/reservation/reservationApply.html">
              <button className="btn">예약신청</button>
            </a>
          </div>
          <ul className="sub_list">
            <li>
              <div>
                <img src="/resources/images/Approval.png" alt="" />
                <span className="textcolor">예약현황</span>
              </div>
            </li>
            <li className="sub_list_text">
              <div>
                <img src="/resources/images/Approval.png" alt="" />
                <a href="/views/reservation/reservationDetails.html">
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
            <div className="line" />
          </div>
          <div className="meeting-room-container">
            <div className="meeting-room-box">
            <img src={process.env.PUBLIC_URL + '/reservation/meetingRoom (1).jpg'} alt="로고" />
              <div className="meeting-room-text">GREEN ROOM (6F)</div>
            </div>
            <div className="meeting-room-box">
            <img src={process.env.PUBLIC_URL + '/reservation/meetingRoom (2).jpg'} alt="로고" />

              <div className="meeting-room-text">BLUE ROOM (5F)</div>
            </div>
            <div className="meeting-room-box">
            <img src={process.env.PUBLIC_URL + '/reservation/meetingRoom (3).jpg'} alt="로고" />

              <div className="meeting-room-text">PROJECT ROOM (4F)</div>
            </div>
          </div>
          <div id="calendars" className="calendar-column">
            <div id="calendar1" className="calendar-column">
              <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                selectable={true}
                select={(selectionInfo) => {
                  // 선택된 시간 처리
                  console.log('선택된 시간:', selectionInfo.startStr, '부터', selectionInfo.endStr, '까지');
                }}
              />
            </div>
            <div id="calendar2" className="calendar-column" />
            <div id="calendar3" className="calendar-column" />
          </div>
        </div>
      </main>
    </div>
  );
}

export default ReservationMain;