import "./ReservationApply.css";
import {
  callResevationCodeDetailAPI,
  callResevationModifyAPI,
  callAttendeeDetailAPI,
} from "./../../apis/ReservationAPICalls";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { decodeJwt } from "../../utils/tokenUtils";
import { useLocation } from "react-router-dom";
import queryString from "query-string";


function ReservationModify() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const reservation = useSelector((state) => state.reservationCodeReducer);
  const attendee = useSelector((state) => state.reservationAttendeeReducer);
  const reservationDetail = reservation.data;
  const token = decodeJwt(window.localStorage.getItem("accessToken"));
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const reservationCode = queryParams.reservationCode;
  
  useEffect(() => {
    dispatch(callResevationCodeDetailAPI({ reservationCode }));
    dispatch(callAttendeeDetailAPI({ reservationCode }));
  }, [dispatch, reservationCode]);

  

  console.log('555555555555555555555', reservationCode);
  console.log('Reservation Detail:', reservationDetail);
  console.log('attendee Detail:', attendee);

  const attendeeName = attendee.map(attendee => attendee.userCode.userName).join(','); //포문돌려서 배열에 담기
  


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
            <strong>예약수정</strong>

            <div className="line"></div>
          </div>

          <div className="reservation-container">
            <form className="reservation-form">
              <label htmlFor="place">장소:</label>
              <select id="place" name="place" required value={reservationDetail?.meetCode?.meetName || ''}>
                <option value="">장소를 선택하세요</option>
                <option value="GREEN ROOM">GREEN ROOM</option>
                <option value="BLUE ROOM">BLUE ROOM</option>
                <option value="PROJECT ROOM">PROJECT ROOM</option>
              </select>
              <br />
              <label htmlFor="reason" required>
                신청사유:
              </label>
              <input id="reason" name="reason" required value={reservationDetail?.reservationContent || ''} />
              <br />
              <label htmlFor="attendees">참석자:</label>
              <input id="attendees" name="attendees" readOnly Value={attendeeName} />


              <button type="button" id="orgChartButton">
                조직도
              </button>
              <br />
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

export default ReservationModify;
