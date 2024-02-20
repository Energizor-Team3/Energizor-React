import React from 'react';
import './ReservationMain.css';

function ReservationMain() {
  return (
    <div id="wrap">
   

      <section>
        <article>
          <h2>자원예약</h2>
          <div>
            <a href="/reservationapply"><button className="btn">예약신청</button></a>
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
                <a href="/reservationdetails"> <span>내예약내역</span></a>
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
                <img src="/reservation/meetingRoom (1).jpg" alt="Meeting Room 1" className="meeting-room-image" />
                <div className="meeting-room-text">GREEN ROOM (6F)</div>
            </div>
            <div className="meeting-room-box">
                <img src="/reservation/meetingRoom (2).jpg" alt="Meeting Room 2" className="meeting-room-image" />
                <div className="meeting-room-text">BLUE ROOM (5F)</div>
            </div>
            <div className="meeting-room-box">
                <img src="/reservation/meetingRoom (3).jpg" alt="Meeting Room 3" className="meeting-room-image" />
                <div className="meeting-room-text">PROJECT ROOM (4F)</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ReservationMain;
