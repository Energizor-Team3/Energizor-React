import React, { useState, useEffect } from 'react';
import './ReservationDetails.css';

function ReservationDetails() {
  const [reservations, setReservations] = useState([]); // 예약 목록을 저장할 상태

 

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
                <a href="/reservationmain"><span>예약현황</span></a>
              </div>
            </li>
            <li className="sub_list_text">
              <div>
                <img src="/common/Approval.png" alt="" />
                <span>내예약내역</span>
              </div>
            </li>
          </ul>
        </article>
      </section>
      <main>
        <div className="content">
          <div className="subject">
            <strong>내 예약내역</strong>
            <div className="line"></div>
          </div>
          <div className="select_line"></div>
          <div id="contentBox" className="content-box">
            {/* 예약 목록을 렌더링하는 부분 */}
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>장소</th>
                  <th>신청사유</th>
                  <th>사용시작일시</th>
                  <th>사용종료일시</th>
                  <th>상태</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(reservations) && reservations.map((reservation, index) => (
                  <tr key={index}>
                    <td><input type="radio" name="resRadio" /></td>
                    <td>{reservation.meet.meetName}</td>
                    <td>{reservation.reservationContent}</td>
                    <td>{reservation.startDate}</td>
                    <td>{reservation.endDate}</td>
                    <td>{reservation.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* 나머지 내용은 그대로 유지 */}
        </div>
      </main>
    </div>
  );
}

export default ReservationDetails;
