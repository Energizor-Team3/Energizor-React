// (컴포넌트 파일)

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { decodeJwt } from "../../utils/tokenUtils";
import { callEmployeeAPI } from "../../apis/AttendanceAPICalls";

import "./attendance.css";

function EmployeeCommute() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const employee = useSelector((state) => state.attendanceReducer);

    console.log('employee', employee);

    useEffect(() => {
    dispatch(
        callEmployeeAPI({
        userCode: params.userCode,
        })
    );
    }, []);

    return (
        <div id="wrap">
            <section>
                <article>
                    <h2 className="attendance">근태관리</h2>

                    <div>
                        <button className="btn">근태 등록</button>
                    </div>

                    <a href="/attendance/all-users-list">
                        <div id='attendance_employee' style={{ color: "#415CBE" }}>
                            <img src='/attendance/Attendance.png' alt=''/>
                            <span>전직원 출근부</span>
                        </div>
                    </a>
                    <a href="/attendance/user-list/{userCode}">
                        <div id="attendance_commute">
                            <img src='/attendance/Attendance.png' alt=''/>
                            <span>내 출근부</span>
                        </div>
                    </a>
                </article>
            </section>

            <main>
                <div className="content">
                    <div className="subject">
                        <strong>전직원 출근부</strong>
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
                                    src="/attendance/rectangle.png"
                                    alt=""
                                    width="100%"
                                    />
                                </div>
                            </div>
                        </div>
                        <span className="e233_1676">영업팀/팀장</span>
                        <span className="e233_1677">김뫄뫄</span>
                        <span className="e233_1678">출근</span>
                        <span className="e233_2879">08:53</span>
                        <span className="e233_2880">19:30</span>
                        <span className="e233_1679">퇴근</span>
                        <div className="e233_1684" />
                        <span className="e233_2877">2024-02-29 (THU)</span>
                    </div>
                    <h2 style={{ textAlign: "center", paddingTop: 200 }}>2024-02</h2>

                    <table>
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
                            {Array.isArray(employee) && employee.map((employeeList, index) => (
                                <tr key={index}>
                                    {/* <td>{employeeList?.userCode}</td> */}
                                    <td>{employeeList?.userName}</td>
                                    <td>{employeeList.cDate}</td>
                                    <td>{employeeList.cStartTime}</td>
                                    <td>{employeeList.cEndTime}</td>
                                    <td>{employeeList.cStete}</td>
                                    {/* <td>{employeeList.cCode}</td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* <select name="page_number_choice" id="page_number_choice">
                        <option value="" />
                    </select>
                    <label className="page_number_choice_text" htmlFor="page_number_choice">페이지당 항목수</label> */}
                </div>
            </main>
        </div>
    );
}

export default EmployeeCommute;
