import { useState } from "react";
import "./SubHeader.css";
import { NavLink } from 'react-router-dom';




function Header() {

        
    
    const [hover, setHover] = useState(false);

    const handleMouseHover = () => {
        setHover(true);
    };

    const handleMouseLeave = () => {
        setHover(false);
    };

    const spanStyle = {
        display: hover ? "inline-block" : "none"
    };

    return (

        <header
            className="header"
            style={hover ? { width: "230px" } : { width: "85px" }}
            onMouseEnter={handleMouseHover}
            onMouseLeave={handleMouseLeave}
        >
            <h1>
            <img
                src="/common/Logo.png"
                alt=""
                className="logo"
                style={hover ? { width: "200px" } : { width: "80px" }}
            />
            </h1>
            <nav>
                <div id="main_list_icon">
                    <div>
                        <a href="/main">
                            <img src="/common/Home.png" alt="" />
                            <span style={spanStyle}>홈</span>
                        </a>
                    </div>
                    <div>
                        <a href="/approvalmain">
                            <img src="/common/Approval.png" alt="" />
                            <span style={spanStyle}>전자결재</span>
                        </a>
                    </div>
                    <div>
                        <a href="/attendance/all-users-list">
                            <img src="/common/Attendance.png" alt="" />
                            <span style={spanStyle}>근태관리</span>
                        </a>
                    </div>
                    <div>
                    <NavLink to='/calendar'>
                        <img src="/common/calendar.png" alt="캘린더 아이콘" />
                        <span style={spanStyle}>일정관리</span>
                    </NavLink>
                    </div>
                    <div>
                        <a href="/contact/company-list">
                            <img src="/common/Address.png" alt="" />
                            <span style={spanStyle}>주소록</span>
                        </a>
                    </div>
                    <div>
                        <a href="/group">
                            <img src="/common/Organization.png" alt="" />
                            <span style={spanStyle}>조직도</span>
                        </a>
                    </div>
                    <div>
                        <a href="/message">
                            <img src="/common/Mail.png" alt="" />
                            <span style={spanStyle}>쪽지</span>
                        </a>
                    </div>
                    {/* <div>
                    <a href="/group">
                        <img src="/common/Messanger.png" alt="" />
                    </a>
                    <span style={spanStyle}>메신저</span>
                    </div> */}
                    <div>
                        <a href="/reservationmain">
                            <img src="/common/reservation.png" alt="" />
                            <span style={spanStyle}>자원예약</span>
                        </a>
                    </div>
                    <div>
                        <a href="/board">
                            <img src="/common/board.png" alt="" />
                            <span style={spanStyle}>게시판</span>
                        </a>
                    </div>
                    <div>
                        <a href="/userlist">
                            <img src="/mypage/hrm.png" alt="" />
                            <span style={spanStyle}>인사관리</span>
                        </a>
                    </div>
                </div>
            </nav>
        </header>

    );
    }

export default Header;