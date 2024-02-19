import "./ReservationDetails.css";
import { callResevationDetailAPI } from "./../../apis/ReservationAPICalls";
import { callAttendeeDetailAPI } from "./../../apis/ReservationAPICalls";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import queryString from "query-string";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { decodeJwt } from "../../utils/tokenUtils";

function ReservationDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reservation = useSelector((state) => state.reservationReducer);
  const reservationAttendee = useSelector(
    (state) => state.reservationAttendeeReducer
  );
  console.log("----------------", reservationAttendee);
  const reservationList = reservation?.data?.content;

  const token = decodeJwt(window.localStorage.getItem("accessToken"));
  useEffect(() => {
    dispatch(callResevationDetailAPI());
  }, []);

  console.log("reservation", reservation);

  const [showPopup, setShowPopup] = useState(false); // 팝업 상태 추가
  const [attendeesInfo, setAttendeesInfo] = useState([]); // 참석자 정보 상태 추가

  const doubleClickHandler = () => {};

  const showAttendees = (reservationCode) => {
    console.log("showAttendees 호출", reservationCode); // 콘솔에 함수 호출 확인

    try {
      dispatch(callAttendeeDetailAPI({ reservationCode }));
      if (reservationAttendee) {
        setAttendeesInfo(reservationAttendee); // API 호출 결과를 상태에 설정
        setShowPopup(true); // 팝업 열기
      } else {
        console.error("xxxxxxxxxx");
      }
    } catch (error) {
      console.error("Error fetching attendees:", error);
    }
  };

  const closePopup = () => {
    setShowPopup(false); // 팝업 닫기
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
                reservation.map((reservation) => (
                  <tr key={reservation?.reservationCode}>
                    <td>
                      <input
                        type="checkbox"
                        value={reservation?.reservationCode}
                      />
                    </td>

                    <td>{reservation?.meetCode?.meetName}</td>
                    <td>{reservation?.reservationContent}</td>
                    <td>{reservation?.reservationDate}</td>
                    <td>{reservation?.reservationDate}</td>
                    <td>
                      {/* 수정: 참석자 버튼 클릭 시 해당 예약 코드를 인자로 전달 */}
                      <button
                        className="btnStatus"
                        onClick={() => {
                          console.log("참석자 불러");
                          showAttendees(reservation?.reservationCode);
                        }}
                      >
                        참석자
                      </button>
                    </td>

                    <td>{reservation.status}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </main>
      {showPopup && (
        <div className="popup">
          <div className="popup_inner">
            <h2>참석자 정보</h2>
            <button onClick={closePopup}>Close</button>
            <table>
              <thead>
                <tr>
                  <th>이름</th>
                  <th>이메일</th>
                  <th>전화번호</th>
                </tr>
              </thead>
              <tbody>
                {attendeesInfo.map((attendee, index) => (
                  <tr key={index}>
                    <td>{attendee?.userCode?.userName}</td>
                    <td>{attendee?.userCode?.email}</td>
                    <td>{attendee?.userCode?.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ul>
              {attendeesInfo.map((attendee, index) => (
                <li key={index}>{attendee.name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReservationDetails;
