import React from "react";
import "./ReservationMain.css";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid"; // dayGridPlugin 추가

function ReservationMain() {
  const resources = [
    { id: "room1", title: "GREEN ROOM (6F)" },
    { id: "room2", title: "BLUE ROOM (5F)" },
    { id: "room3", title: "PROJECT ROOM (4F)" },
  ];
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
                src="/reservation/meetingRoom (1).jpg"
                alt="Meeting Room 1"
                className="meeting-room-image"
              />
              <div className="meeting-room-text">GREEN ROOM (6F)</div>
              <button className="threebtn">예약하기</button>
            </div>
            <div className="meeting-room-box">
              <img
                src="/reservation/meetingRoom (2).jpg"
                alt="Meeting Room 2"
                className="meeting-room-image"
              />
              <div className="meeting-room-text">BLUE ROOM (5F)</div>
              <button className="threebtn">예약하기</button>
            </div>
            <div className="meeting-room-box">
              <img
                src="/reservation/meetingRoom (3).jpg"
                alt="Meeting Room 3"
                className="meeting-room-image"
              />
              <div className="meeting-room-text">PROJECT ROOM (4F)</div>
              <button className="threebtn">예약하기</button>
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
              resources={resources}
              slotLabelFormat={{
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              }}
              events={[
                {
                  id: "event1",
                  resourceId: "room1",
                  start: "2024-02-21T10:00:00",
                  end: "2024-02-21T12:00:00",
                  title: "GREEN ROOM",
                  backgroundColor: "lightgreen", // 초록색
                },
                {
                  id: "event2",
                  resourceId: "room2",
                  start: "2024-02-21T10:00:00",
                  end: "2024-02-21T12:00:00",
                  title: "BLUE ROOM",
                  backgroundColor: "lightblue", // 파란색
                },
                {
                  id: "event3",
                  resourceId: "room3",
                  start: "2024-02-21T10:00:00",
                  end: "2024-02-21T12:00:00",
                  title: "PROJECT ROOM",
                  backgroundColor: "lavender", // 보라색
                },
                // 추가적인 이벤트 데이터 추가 가능
              ]}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default ReservationMain;
