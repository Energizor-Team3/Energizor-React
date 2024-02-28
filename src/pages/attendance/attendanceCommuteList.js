// (컴포넌트 파일)

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { decodeJwt } from "../../utils/tokenUtils";
import { callAttendancePOSTAPI, callAttendancePUTAPI, callAttendanceAPI } from "../../apis/AttendanceAPICalls";
import AttendanceDetailModal from "./AttendanceDetailModal";
import { Navigate } from "react-router-dom";

import "./attendance.css";

function AttendanceCommute() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const attendance = useSelector((state) => state.attendanceReducer);
    const [isModalOpen, setIsModalOpen] = useState(false);  // 모달 상태를 관리하는 useState

    const myInfo = useSelector((state) => state.userReducer);
    const [profileImagePath, setProfileImagePath] = useState(myInfo.profilePath);
    console.log('myInfo', myInfo);

    useEffect(() => {
        const newPath = `${myInfo.profilePath}?${new Date().getTime()}`;
        setProfileImagePath(newPath);
    }, [myInfo.profilePath]);


    const [currentDate, setCurrentDate] = useState(new Date());

    // useEffect(() => {
    //     const timer = setInterval(() => {
    //     setCurrentDate(new Date());
    //     }, 1000); // 1초마다 현재 시간 업데이트

    //     return () => clearInterval(timer); // 컴포넌트가 언마운트될 때 타이머 정리
    // }, []);
    const formatDate = (date) => {
        const options = { year: '2-digit', month: '2-digit', day: '2-digit', weekday: 'short' };
        const formattedDate = date.toLocaleString('ko-KR', options);
        return formattedDate.replace('.', '-');
    };


    useEffect(() => {
        // 출퇴근 기록 조회
        dispatch(callAttendanceAPI({userCode: params.userCode,}));
    }, []);

        // 모달 보이기 함수
        const openModal = () => {
            console.log("모달이 열립니다.");
            setIsModalOpen(true);
        };
    
        // 모달 숨기기 함수
        const closeModal = () => {
            setIsModalOpen(false);
        };



    return (
        <div id="wrap">
            <section>
                <article>
                    <h2 className="attendance">근태관리</h2>



                    <a href="/attendance/all-users-list">
                        <div id='attendance_employee' >
                            <img src='/attendance/Attendance.png' alt=''/>
                            <span>전직원 출근부</span>
                        </div>
                    </a>
                    
                    <a href="/attendance/user-list/1">
                        <div id="attendance_commute" style={{ color: "#415CBE" }}>
                            <img src='/attendance/Attendance.png' alt=''/>
                            <span>내 출근부</span>
                        </div>
                    </a>



                    <div>
                    <button className="btn" onClick={openModal}>근태 등록</button>
                    
                    {isModalOpen && <AttendanceDetailModal setIsModalOpen={setIsModalOpen} userCode={params.userCode}/>}
                    </div>
                </article>
            </section>

            <main>
                <div className="content">
                    <div className="subject">
                        <strong>내 출근부</strong>
                        <div className="line" />
                    </div>
                    <div className="select_line">
                    {/* <select name="messageLead">
                                <option value="전체">전체</option>
                                <option value="읽음">읽음</option>
                                <option value="안읽음">안읽음</option>
                            </select> */}
                    </div>

                    {/* -------------------------------------------------------------------------------------------- */}
                    <div className="e233_1671">
                        <div className="e233_1672" />
                        <div className="e233_1673">
                            <div className="e233_1674">
                                <div className="e233_1675">
                                    <img
                                    src={myInfo.profilePath}
                                    // src="/attendance/rectangle.png"
                                    alt=""
                                    width="100%"
                                    />
                                </div>
                            </div>
                        </div>
                        <span className="e233_1676">{myInfo.team?.dept?.deptName}/{myInfo.team?.teamName}</span>
                        <span className="e233_1677">{myInfo.userName}</span>
                        {/* <span className="e233_1676">영업팀/팀장</span> */}
                        {/* <span className="e233_1677">김뫄뫄</span> */}
                        <span className="e233_1678">출근</span>
                        <span className="e233_2879">08:53</span>
                        <span className="e233_2880">19:30</span>
                        <span className="e233_1679">퇴근</span>
                        <div className="e233_1684" />
                        <span className="e233_2877">{formatDate(currentDate)}</span>
                    </div>
                    <h2 style={{ textAlign: "center", paddingTop: 200 }}>2024-02</h2>

                    <table className="table_at">
                        <thead>
                            <tr>
                                <th>직원</th>
                                <th>날짜</th>
                                <th>근태상태</th>
                                <th>출근시간</th>
                                <th>퇴근시간</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(attendance) && attendance.map((attendanceList, index) => (
                                <tr key={index}>
                                    <td>{attendanceList?.userName}</td>
                                    <td>{attendanceList?.cdate}</td>
                                    <td>{attendanceList?.cstate}</td>
                                    <td>{attendanceList?.cstartTime}</td>
                                    <td>{attendanceList?.cendTime}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

export default AttendanceCommute;