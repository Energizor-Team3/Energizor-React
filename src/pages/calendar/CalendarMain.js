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

              {/* 
                
                
                
                캘린더 잔잔바리 빼고 완료 
                잔잔바리 : 공휴일 띄우기, 페이지 들어올때 전체일정 기본적으로 체크되어 모든 일정 보이게, ㅇ
                
                
            
                
                */}


function CalendarMainPage(){

    const dispatch = useDispatch();
    const calendar = useSelector(state => state.calendarReducer);  
    const schedule = useSelector(state => state.scheduleReducer);
    const scheduleList = schedule.data;
    const calendarList = calendar.data;
         
    const token = decodeJwt(window.localStorage.getItem("accessToken"));  
    const [selectedCalendars, setSelectedCalendars] = useState([]);
    const handleCalendarCheckboxChange = (calNo, isChecked) => {
        if (isChecked) {
            setSelectedCalendars([...selectedCalendars, calNo]); // 체크된 캘린더를 추가
        } else {
            setSelectedCalendars(selectedCalendars.filter(id => id !== calNo)); // 체크가 해제된 캘린더를 제거
        }
    };

    const [calNo, setcalNo] = useState(0);
    
    const [userCode, setuserCode] = useState(0);
    const [events, setEvents] = useState([]);

    const calendarRef = useRef(null);
    const [isExpanded, setIsExpanded] = useState(false); 
 
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [allCalChecked, setAllCalChecked] = useState(true); 

    const filteredSchedules = scheduleList && scheduleList.length > 0 ? 
    scheduleList.filter(schedule => {
        const startDate = new Date(schedule.schStartDate[0], schedule.schStartDate[1] - 1, schedule.schStartDate[2]);
        const endDate = schedule.schEndDate ? new Date(schedule.schEndDate[0], schedule.schEndDate[1] - 1, schedule.schEndDate[2]) : null;
        // 종료일이 존재하면 선택된 날짜는 시작일과 종료일 사이에 포함되게
        // 종료일이 존재하지 않으면 선택된 날짜는 시작일과 동일하게
        return (!endDate && selectedDate.getTime() === startDate.getTime()) ||
               (endDate && selectedDate >= startDate && selectedDate <= endDate);
    }) : [];



    const handleAllCalChange = (event) => {
        const isChecked = event.target.checked;
        setAllCalChecked(isChecked);
        const updatedCalendars = [];
        const checkboxes = document.querySelectorAll('.cal_nav input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
            checkbox.checked = isChecked;
            const calNo = parseInt(checkbox.id.split('_')[2]);
            if (isChecked) {
                updatedCalendars.push(calNo);
            }
        });
        setSelectedCalendars(updatedCalendars);
    };

    useEffect(() => {
        console.log("scheduleList:", scheduleList); // scheduleList 값 확인
        if (scheduleList && scheduleList.length > 0) {
            const scheduleEvents = scheduleList
                .filter(schedule => selectedCalendars.includes(schedule.calNo)) // 선택된 캘린더에 속한 스케줄 필터링
                .map(schedule => {
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
                        backgroundColor: `${schedule.calColor}B3`, // 투명도 추가
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
    }, [scheduleList, selectedCalendars]);



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
 
      const handleSelect = (selectionInfo) => {
        // 선택된 날짜 업데이트
        setSelectedDate(selectionInfo.start);
    };
    const formatDateTime = (dateTimeArray) => {
        const [year, month, day, hour, minute] = dateTimeArray;
        const formattedDate = new Date(year, month - 1, day, hour, minute).toLocaleString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', hour12: true, hour: '2-digit', minute: '2-digit' }).replace('.', '년 ').replace('.', '월 ').replace('.', '일');
        return formattedDate;
    };
    
 

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
                        <input type="checkbox" id="allcal_checkbox"
                        onChange={handleAllCalChange} />
                        <label htmlFor="allcal_checkbox">전체일정</label>
                    </li>
                    <li className="cal_menu">
                        개인 캘린더
                        <ul>
                            {calendarList && calendarList.map((calendar) => (
                                calendar.calType === "개인 캘린더" && // calType이 개인 캘린더인 경우에만 해당
                                <li key={calendar.calNo}>
                                    <input 
                                        type="checkbox" 
                                        id={`cal_checkbox_${calendar.calNo}`} 
                                        onChange={(e) => handleCalendarCheckboxChange(calendar.calNo, e.target.checked)} // 체크박스 변경 핸들러
                                        checked={selectedCalendars.includes(calendar.calNo)} // 체크 여부 확인
                                    />
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
                                    <input 
                                        type="checkbox" 
                                        id={`cal_checkbox_${calendar.calNo}`} 
                                        onChange={(e) => handleCalendarCheckboxChange(calendar.calNo, e.target.checked)} // 체크박스 변경 핸들러
                                        checked={selectedCalendars.includes(calendar.calNo)} // 체크 여부 확인
                                    />
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
                    dayMaxEventRows={3} 
                    // editable={true}
                    
                   
                />
                                
                </div>

                {/* 
                
                
                
                일정 다 띄움, 이제 클릭했을때 토글 하나씩 만 나와야함 지금은 다나옴 
                
                
            
                
                */}
                <div className="schedule">
                    <span className="selected_date">    {/* 선택 된 날짜 */}
                     {selectedDate ? 
                    `${selectedDate.getFullYear()}년 ${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일`  : ''}
                    </span>
                    <span className="schedule_count">{filteredSchedules.length}</span>    {/* 일정개수 */}
                   
                    
                    {filteredSchedules.map(schedule => (
                    <div  key={schedule.schNo} className={`schedule_box ${isExpanded ? 'expanded' : ''}`}>
                    <div className="schbox_top" onClick={toggleExpand}>
                        <div className="sch_time">
                        <div className="sch_start_date">{formatDateTime(schedule.schStartDate)}</div>
                {schedule.schEndDate && <span>~</span>}
                {schedule.schEndDate && <div className="sch_end_date">{formatDateTime(schedule.schEndDate)}</div>}
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
                    <div className="sch_title">{schedule.schTitle}</div>
                {isExpanded && (
                    <div className="schbox_mid">
                        <div className="calNameTitle">
                            캘린더 :{" "}
                            <span className="cal_dot" style={{ backgroundColor: calendarList.find(calendar => calendar.calNo === schedule.calNo)?.calColor }} />
                            <span className="cal_name">{calendarList.find(calendar => calendar.calNo === schedule.calNo)?.calName}</span>
                        </div>

                        {schedule.schLocal && <div className="locationTitle">
                        장소 &nbsp;&nbsp;&nbsp;:{" "}<span className="location">{schedule.schLocal}</span>
                        </div>}
 
                        <div className="att_listTitle">
                        참석자 : <span className="att_list">박보검</span>
                        </div>
                        {schedule.schDetail && <div className="schDetailTitle">
                        내용 &nbsp;&nbsp;&nbsp;:{" "} <p className="sch_datail">{schedule.schDetail}</p>
                        </div>}
 
                    </div>)}
                    </div>
 ))}
                </div>
                </div>
        </div>
        
    );
}
export default CalendarMainPage;

