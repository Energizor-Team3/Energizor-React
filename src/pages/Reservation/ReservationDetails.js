import React from 'react';
import './ReservationDetails.css';


function ReservationDetails() {

    
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
            <div className="action-buttons" style={{ display: 'none' }}>
              <button id="editReservationButton">예약수정</button>
              <button id="cancelReservationButton">예약취소</button>
            </div>
            <div className="statustitle"></div>
          </div>
          <div id="reservationEditContainer" style={{ display: 'none' }}>
            <form id="reservationEditForm">
              <label htmlFor="place">장소:</label>
              <input type="text" id="place" name="place" required /><br />
              <label htmlFor="reason">신청사유:</label>
              <input id="reason" name="reason" required /><br />
              <label htmlFor="reason">참석자:</label>
              <input id="reason" name="reason" required /><br />
              <button type="button" id="orgChartButton">조직도</button>
              <label htmlFor="startDate">사용시작일시:</label>
              <input type="datetime-local" id="startDate" name="startDate" required /><br />
              <label htmlFor="endDate">사용종료일시:</label>
              <input type="datetime-local" id="endDate" name="endDate" required /><br />
              <button type="button" id="saveReservationButton">저장</button>
              <button type="button" id="cancelEditButton">취소</button>
            </form>
          </div>
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
              <tr>
                <td><input type="radio" name="resRadio" /></td>
                <td>PROJECT ROOM</td>
                <td>프로젝트 회의</td>
                <td>2024-01-05 14:20</td>
                <td>2024-01-05 14:20</td>
                <td>완료</td>
              </tr>
              <tr>
                <td><input type="radio" name="resRadio" /></td>
                <td>GREEN ROOM</td>
                <td>프로젝트 회의</td>
                <td>2024-01-05 14:20</td>
                <td>2024-01-05 14:20</td>
                <td>진행중</td>
              </tr>
              <tr>
                <td><input type="radio" name="resRadio" /></td>
                <td>BLUE ROOM</td>
                <td>프로젝트 회의</td>
                <td>2024-01-05 14:20</td>
                <td>2024-01-05 14:20</td>
                <td>대기</td>
              </tr>
              <tr>
                <td><input type="radio" name="resRadio" /></td>
                <td>BLUE ROOM</td>
                <td>프로젝트 회의</td>
                <td>2024-01-05 14:20</td>
                <td>2024-01-05 14:20</td>
                <td>대기</td>
              </tr>
            </tbody>
          </table>
          <select name="page_number_choice" id="page_number_choice">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
          <label className="page_number_choice_text" htmlFor="page_number_choice">페이지당 항목수</label>
        </div>
      </main>
    </div>
  );
}



export default ReservationDetails;
