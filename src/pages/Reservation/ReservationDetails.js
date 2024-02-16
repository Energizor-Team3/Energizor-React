import "./ReservationDetails.css";

import { callResevationDetailAPI } from "./../../apis/ReservationAPICalls";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import queryString from "query-string";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { decodeJwt } from "../../utils/tokenUtils";
import reservationReducer from "./../../modules/ReservationModules";

function ReservationDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reservation = useSelector((state) => state.reservationReducer);
  const reservationList = reservation?.data?.content;

  const token = decodeJwt(window.localStorage.getItem("accessToken"));
  useEffect(() => {
    dispatch(callResevationDetailAPI());
  }, []);

  console.log("reservation", reservation);
  console.log("reservationList", reservationList);

  const doubleClickHandler = () => {

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
                <a href="/reservationmain">
                  <span>예약현황</span>
                </a>
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
          {/* 예약 목록을 렌더링하는 부분 */}
          <table>
            <thead>
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                <th>장소</th>
                <th>신청사유</th>
                <th>사용시작일시</th>
                <th>사용종료일시</th>
                <th>참석자</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(reservation) &&
                reservation.map((reservation, index) => (
                  <tr key={index}>
                    <td>
                      <input type="radio" name="resRadio" />
                    </td>
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
      </main>
    </div>
  );
}

export default ReservationDetails;
