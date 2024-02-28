import "./attendance.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { callEmployeeAPI } from "../../apis/AttendanceAPICalls";
import { callMyPageAPI } from "../../apis/UserAPICalls";
import { decodeJwt } from "../../utils/tokenUtils";
import { Navigate } from "react-router-dom";


function EmployeeCommute() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const employee = useSelector((state) => state.attendanceReducer);
    
    /* 프로필 */
    const myInfo = useSelector((state) => state.userReducer);
    const [profileImagePath, setProfileImagePath] = useState(myInfo.profilePath);
    console.log('myInfo', myInfo);

    useEffect(() => {
        dispatch(callMyPageAPI());
    }, []);

    useEffect(() => {
        const newPath = `${myInfo.profilePath}?${new Date().getTime()}`;
        setProfileImagePath(newPath);
    }, [myInfo.profilePath]);
    
    /* 연차 */
    // const myOff = useSelector((state) => state.userReducer);
    // const [dayOff, setDayOff] = useState(myOff.dayOff);
    // console.log('myOff', myOff);

    // const [offCount, setOffCount] = useState(myOff.offCount);
    // const [offUsed, setOffUsed] = useState(myOff.offUsed);
    // const [difference, setDifference] = useState(0);

    // useEffect(() => {
    //     setOffCount(myOff.offCount);
    //     setOffUsed(myOff.offUsed);
    // }, [myOff.offCount, myOff.offUsed]);

    // useEffect(() => {
    //     // offCount 또는 offUsed가 변경될 때마다 차이를 다시 계산합니다.
    //     const newDifference = offCount - offUsed;
    //     setDifference(newDifference);
    // }, [offCount, offUsed]);



    const [currentDate, setCurrentDate] = useState(new Date());


    const formatDate = (date) => {
        const options = { year: '2-digit', month: '2-digit', day: '2-digit', weekday: 'short' };
        const formattedDate = date.toLocaleString('ko-KR', options);
        return formattedDate.replace('-', '-');
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
    }, []);

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

                        {/* <span className="e233_2823">총 연차</span>
                        <span className="e233_2824">사용 연차</span>
                        <span className="e233_2825">잔여 연차</span>
                        <div className="e233_2826" />
                        <div className="e233_2827" />
                        <div className="e233_2828" />
                        <div className="e233_1684" />
                        <span className="e233_2837">{myOff.offCount}</span>
                        <span className="e233_2838">{myOff.offUsed}</span>
                        <span className="e233_2839">{difference}</span> */}

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
                            {Array.isArray(employee) && employee.map((employeeData, index) => (
                                <tr key={index}>
                                    <td>{employeeData?.userName}</td>
                                    <td>{employeeData?.cdate}</td>
                                    <td>{employeeData?.cstate}</td>
                                    <td>{employeeData?.cstartTime}</td>
                                    <td>{employeeData?.cendTime}</td>
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
