import "./attendance.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { callEmployeeAPI } from "../../apis/AttendanceAPICalls";
import { decodeJwt } from "../../utils/tokenUtils";



function EmployeeCommute() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const employee = useSelector((state) => state.attendanceReducer);
    const employeeInfo = employee.data;
    console.log('employeeInfo', employeeInfo);
    
    const [currentDate, setCurrentDate] = useState(new Date());


    const formatDate = (date) => {
        if(date != undefined){

            const options = { year: '2-digit', month: '2-digit', day: '2-digit', weekday: 'short' };
            const formattedDate = date.toLocaleString('ko-KR', options);
            return formattedDate.replace('.', '-');
        }
    };

    let formatdate;

    if (employee && Array.isArray(employee)) {
        const formatedDate = employee.map((item) => Array.isArray(item.cDate) ? item.cDate.join('-') : item.cDate);
        formatdate = formatedDate.join('-');
    }
            console.log(formatdate);

        console.log('employee', employee);









    useEffect(() => {
        

            dispatch(
                callEmployeeAPI({
                    userCode: params.userCode,
                })
            );
        
    }, [params]);








    return (
        <div id="wrap">
            <section>
                <article>
                    <h2 className="attendance">근태관리</h2>
                    <a href="/attendance/all-users-list">
                        <div id='attendance_employee' style={{ color: "#415CBE" }}>
                            <img src='/attendance/Attendance.png' alt=''/>
                            <span>전직원 출근부</span>
                        </div>
                    </a>
                    <a href="/attendance/user-list/1">
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
                        <span className="e233_2877">{formatDate(currentDate)}</span>
                    </div>
                    <h2 style={{ textAlign: "center", paddingTop: 200 }}>2024-02</h2>

                    <table className="table_at">
                        <thead>
                            <tr>
                                <th>직원</th>
                                <th>근태상태</th>
                                <th>날짜</th>
                                <th>출근시간</th>
                                <th>퇴근시간</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(employee) && employee.map((employeeData, index) => (
                                <tr key={index}>
                                    <td>{employeeData.userName}</td>
                                    <td>{employeeData.cdate}</td>
                                    <td>{employeeData.cstartTime}</td>
                                    <td>{employeeData.cendTime}</td>
                                    <td>{employeeData.cstate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

export default EmployeeCommute;
