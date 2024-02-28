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
  const reservation = useSelector((state) => state.reservationReducer); // Redux 스토어에서 예약 상태 가져오기
  const reservationAttendee = useSelector(
    (state) => state.reservationAttendeeReducer
  ); // Redux 스토어에서 참석자 상태 가져오기
  console.log("----------------", reservationAttendee);

  const token = decodeJwt(window.localStorage.getItem("accessToken"));

  useEffect(() => {
    dispatch(callResevationDetailAPI());
  }, []);

  console.log("reservation", reservation);

  const [showPopup, setShowPopup] = useState(false); // 팝업 노출 상태를 관리하는 상태 변수
  const [attendeesInfo, setAttendeesInfo] = useState([]); // 참석자 정보를 관리하는 상태 변수
  const [selectedReservationCode, setSelectedReservationCode] = useState("");

  const doubleClickHandler = () => {};

  const showAttendees = async (reservationCode) => {
    // 참석자 정보 표시 함수
    console.log("showAttendees 호출", reservationCode); // 콘솔에 함수 호출 확인

    try {
      // 참석자 정보를 불러오는 API 호출
      await dispatch(callAttendeeDetailAPI({ reservationCode }));
    } catch (error) {
      console.error("Error fetching attendees:", error);
      return;
    }
  };

  useEffect(() => {
    // 참석자 상태 변경 시 실행되는 효과
    if (reservationAttendee) {
      // 참석자 정보가 존재하는 경우
      setAttendeesInfo(reservationAttendee); // 참석자 정보 설정
      setShowPopup(true); // 팝업 노출
    } else {
      // 참석자가 없는 경우 알림창 표시
      alert("참석자가 없습니다.");
    }
  }, [reservationAttendee]);

  useEffect(() => {
    // 페이지 로드 시 빈 팝업이 나타나지 않도록 팝업 상태 초기화
    setShowPopup(false);
  }, []);

  const closePopup = () => {
    setShowPopup(false); // 팝업 닫기
  };

  // 체크박스 선택 시 호출되는 함수
  const handleCheckboxChange = (e, reservationCode) => {
    const isChecked = e.target.checked; // 체크박스의 선택 여부
    if (isChecked) {
      // 체크박스가 선택된 경우
      setSelectedReservationCode(reservationCode); // 선택된 예약 코드 업데이트
      console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", reservationCode);
    } else {
      // 체크박스가 선택 해제된 경우
      setSelectedReservationCode(""); // 선택된 예약 코드 초기화
    }
  };

  // 예약 수정 버튼 클릭 시 호출되는 함수
  const handleReservationModifyClick = () => {
    if (selectedReservationCode) {
      // 선택된 예약 코드가 있는 경우에만 예약 수정 페이지로 이동합니다.
      navigate(`/reservationmodify?reservationCode=${selectedReservationCode}`);
    } else {
      // 선택된 예약 코드가 없는 경우 알림창을 띄웁니다.
      alert("하나의 예약을 선택하세요.");
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
                <img src="/common/reservation.png" alt="" />
                <a href="/reservationmain">
                  <span>예약현황</span>
                </a>
              </div>
            </li>
            <li className="sub_list_text">
              <div>
                <img src="/common/Mydocumentbox.png" alt="" />
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

          <div className="select_line">
            <div className="MDbutton">
              <button
                className="btnStatus"
                onClick={handleReservationModifyClick}
              >
                예약수정
              </button>
              <button
                className="btnStatus"
                onClick={() => navigate("/reservationcancel")}
              >
                예약취소
              </button>
            </div>
          </div>
          {/* 예약 목록을 렌더링하는 부분 */}
          <table className="resdetailtable">
            <thead>
              <tr>
                <th></th>
                <th>장소</th>
                <th>신청사유</th>
                <th>날짜</th>
               
                <th>참석자</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(reservation) &&
                reservation.map(
                  (
                    reservation // 예약 정보 배열이 존재하는 경우 배열 순회
                  ) => (
                    <tr key={reservation?.reservationCode}>
                      <td>
                        <input
                          type="radio"
                          name="selectedReservations"
                          value={reservation?.reservationCode}
                          onChange={(e) =>
                            handleCheckboxChange(
                              e,
                              reservation?.reservationCode
                            )
                          }
                        />
                      </td>
                      <td>{reservation?.meet?.meetName}</td>
                      <td>{reservation?.reservationContent}</td>
                      <td>{reservation?.reservationDate}</td>
                     
                      <td>
                        {/* 참석자 버튼: 클릭 시 해당 예약 코드를 인자로 전달하여 참석자 정보 호출 */}
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
                  )
                )}
            </tbody>
          </table>
        </div>
      </main>
      {showPopup && ( //팝업 노출 상태가 true인 경우에만 팝업 표시
        <div className="popup">
          <div className="popup_inner">
            <h2>참석자 정보</h2>
            <button onClick={closePopup}>Close</button>
            <table className="attendeeTable">
              {" "}
              {/* 참석자 정보 테이블 */}
              <thead>
                <tr>
                  <th>이름</th>
                  <th>이메일</th>
                  <th>전화번호</th>
                </tr>
              </thead>
              <tbody>
                {attendeesInfo.map(
                  (
                    attendee,
                    index //참석자 정보 배열 순회
                  ) => (
                    <tr key={index}>
                      <td>{attendee?.userCode?.userName}</td>
                      <td>{attendee?.userCode?.email}</td>
                      <td>{attendee?.userCode?.phone}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReservationDetails;
