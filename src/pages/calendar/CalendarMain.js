import cmp from "./CalendarMain.css"
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decodeJwt } from '../../utils/tokenUtils';

import FullCalendar from '@fullcalendar/react'; 
import dayGridPlugin from '@fullcalendar/daygrid'; 
import interactionPlugin from '@fullcalendar/interaction'; 


import {
    callCalendarListAPI,
    callSchedulesAPI
} from '../../apis/CalendarAPICalls'

import calendarReducer from '../../modules/CalendarModule';
import scheduleReducer from '../../modules/ScheduleModule';


function CalendarMainPage(){

    const dispatch = useDispatch();
    const calendar = useSelector(state => state.calendarReducer);  
    const schedule = useSelector(state => state.scheduleReducer);
    const scheduleList = schedule.data;
    const calendarList = calendar.data;
         
    const token = decodeJwt(window.localStorage.getItem("accessToken"));  

    const [calNo, setcalNo] = useState(0);
    
    const [userCode, setuserCode] = useState(0);
    const [events, setEvents] = useState([]);

    const calendarRef = useRef(null);
    const [isExpanded, setIsExpanded] = useState(false); 
    const [allCalChecked, setAllCalChecked] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());



    useEffect(() => {
        console.log("scheduleList:", scheduleList); // scheduleList 값 확인
        if (scheduleList && scheduleList.length > 0) {
            const scheduleEvents = scheduleList.map(schedule => {
                // 배열 형태의 시작일과 종료일을 JavaScript Date 객체로 변환
                const startDateTimeArray = schedule.schStartDate;
                const endDateTimeArray = schedule.schEndDate;
    
                // 초 정보가 없는 경우에도 정상적으로 처리
                const startDateTime = new Date(startDateTimeArray[0], startDateTimeArray[1] - 1, startDateTimeArray[2], startDateTimeArray[3], startDateTimeArray[4], startDateTimeArray[5] || 0);
                
                let endDateTime = null;
                if (endDateTimeArray) {
                    // 초 정보가 없는 경우에도 정상적으로 처리
                    endDateTime = new Date(endDateTimeArray[0], endDateTimeArray[1] - 1, endDateTimeArray[2], endDateTimeArray[3], endDateTimeArray[4], endDateTimeArray[5] || 0);
                }
    
                const event = {
                    title: schedule.schTitle,
                    start: startDateTime,
                    backgroundColor: schedule.calColor,
                    borderColor: schedule.calColor
                    

                };
    
                // 종료일이 있는 경우에만 설정
                if (endDateTime) {
                    event.end = endDateTime;
                }
    
                return event;
            });
            setEvents(scheduleEvents);
        }
    }, [scheduleList]);



    useEffect(() => {
        console.log("useEffect의 token---->", token);
        console.log("useEffect의 token.userCode--->", token.userCode);
    
        if (calendarRef.current) {
            calendarRef.current.getApi().gotoDate(new Date()); // 현재 날짜로 이동
        }
    
        if (token !== null) {
            dispatch(callCalendarListAPI({ userCode: token.userCode }));
            dispatch(callSchedulesAPI({ userCode: token.userCode }));
        }
    }, []);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded); // 클릭 시 토글 상태 변경
      };
    const handleAllCalChange = (event) => {
        const isChecked = event.target.checked;
        setAllCalChecked(isChecked); // 전체일정 체크박스 상태 변경
  
        // 모든 서브 체크박스 상태 변경
        const checkboxes = document.querySelectorAll('.cal_nav input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
          checkbox.checked = isChecked;
        });
      };
      const handleSelect = (selectionInfo) => {
        // 선택된 날짜 업데이트
        setSelectedDate(selectionInfo.start);
    };

    // useEffect(() => {
    //     document.querySelectorAll('.fc-h-event').forEach(element => {
    //         const backgroundColor = window.getComputedStyle(element).backgroundColor;
    //         const rgbaColor = backgroundColor.replace(')', ', 0.7)').replace('rgb', 'rgba');
    //         element.style.backgroundColor = rgbaColor;
    //         element.style.borderColor = backgroundColor;
    //     });
    // }, [events]); 

    return(
        <div id="wrap">
        <section>
            <article>
            <h2 className="menu_schedule">일정관리</h2>
            <div id="menu_1">
                <a href="#">
                <img src="/resources/images/calendarIcon.png" alt="" />
                </a>
                <span>캘린더</span>
            </div>
            <div>
                <button className="cal_btn">일정추가</button>
                <button className="cal_btn">캘린더 설정</button>
            </div>
            <nav className="cal_nav">
                <ul className="cal_ul">
                <li>
                    <input type="checkbox" id="allcal_checkbox" />
                    <label htmlFor="allcal_checkbox">전체일정</label>
                </li>
                <li className="cal_menu">
                    개인 캘린더

                    <ul>
                    {calendarList && calendarList.map((calendar) => (
                    calendar.calType === "개인 캘린더" && // calType이 개인 캘린더인 경우에만 해당
                    <li key={calendar.calNo}>
                        <input type="checkbox" id={`cal_checkbox_${calendar.calNo}`} />
                        <label htmlFor={`cal_checkbox_${calendar.calNo}`}>
                            {calendar.calName}
                            <span className="dot" style={{ backgroundColor: calendar.calColor }} />
                        </label>
                    </li>
                        ))}
     
                    </ul>
                </li>
                <li className="cal_menu">
                    공유 캘린더
                    <ul>
                    {calendarList && calendarList.map((calendar) => (
                    calendar.calType === "공유 캘린더" && 
                    <li key={calendar.calNo}>
                        <input type="checkbox" id={`cal_checkbox_${calendar.calNo}`} />
                        <label htmlFor={`cal_checkbox_${calendar.calNo}`}>
                            {calendar.calName}
                            <span className="dot" style={{ backgroundColor: calendar.calColor }} />
                        </label>
                    </li>
                        ))}
 
                    </ul>
                </li>
                </ul>
            </nav>
            </article>
           </section>
           <div className="cmpmain">
                <div id="calendar">
                <FullCalendar
                    ref={calendarRef}
                    plugins={[dayGridPlugin, interactionPlugin]}
                    events={events} 
                    selectable={true}
                    select={handleSelect}
                    dayMaxEventRows={2} 
                    editable={true}
                    
                   
                />
                                
                </div>
                <div className="schedule">
                    <span className="selected_date">    {selectedDate ? 
                    `${selectedDate.getFullYear()}년 ${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일`  : ''}</span>
                    <span className="schedule_count">1</span>
                    <div className={`schedule_box ${isExpanded ? 'expanded' : ''}`} onClick={toggleExpand}>
                    <div className="schbox_top">
                        <div className="sch_time">
                        <div className="sch_start_date">1월3일 10:00</div>
                        <span>~</span>
                        <div className="sch_end_date">1월3일 11:00</div>
                        </div>
                        <div className="sch_btns">
                        <img
                            src="/calendar/editIcon 1.png"
                            alt="editIcon"
                            className="editbtn"
                        />
                        <img
                            src="/calendar/trash 1.png"
                            alt="editIcon"
                            className="deletebtn"
                        />
                        </div>
                    </div>
                    <div className="sch_title">외부미팅</div>
                {isExpanded && (
                    <div className="schbox_mid">
                        <div className="calNameTitle">
                        캘린더 :{" "}
                        <span className="cal_dot" style={{ backgroundColor: "blue" }} />
                        <span className="cal_name">외부일정</span>
                        </div>
                        <div className="locationTitle">
                        장소 &nbsp;&nbsp;&nbsp;:{" "}
                        <span className="location">서울시 강남구 무슨동 협력사 사무실</span>
                        </div>
                        <div className="att_listTitle">
                        참석자 : <span className="att_list">박보검</span>
                        </div>
                        <div className="schDetailTitle">
                        내용&nbsp;&nbsp;&nbsp; :
                        <br />
                        <p className="sch_datail">
                            협력사 B와의 새로운 프로젝트에 대한 기획 및 협의.
                            <br />
                            우리 회사 담당자: 김매니저, 이팀장
                            <br />
                            협력사 B 담당자: 박팀장, 최개발자
                            <br />
                            기술적인 요구사항 및 일정 조율.
                        </p>
                        </div>
                    </div>)}
                    </div>
 
                    {/* <div className="delete_popup">
                    <p>삭제하시겠습니까?</p>
                    <button onclick="deleteSchedule()">확인</button>
                    <button onclick="hideConfirmationPopup()">취소</button>
                    </div>
                    <div className="dpop_overlay" /> */}
                </div>
                </div>
        </div>
        
    );
}
export default CalendarMainPage;