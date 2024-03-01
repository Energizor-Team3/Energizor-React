 
import "./CalendarMain.css"
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decodeJwt } from '../../utils/tokenUtils';

import FullCalendar from '@fullcalendar/react'; 
import dayGridPlugin from '@fullcalendar/daygrid'; 
import interactionPlugin from '@fullcalendar/interaction'; 
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import {
    callCalendarListAPI,
    callSchedulesAPI,
    callDeleteScheduleAPI
} from '../../apis/CalendarAPICalls'

import calendarReducer from '../../modules/CalendarModule';
import scheduleReducer from '../../modules/ScheduleModule';
 




function CalendarMainPage(){
    
    const navigate = useNavigate();

    const handleEditButtonClick = ( schNo ) => {
        navigate(`/schedule/edit/${ schNo }`);
    };
    
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

    const handleDeleteButtonClick = async (schNo) => {
        const isConfirmed = window.confirm('일정을 삭제하시겠습니까?');
      
        if (isConfirmed) {
          try {
            await dispatch(callDeleteScheduleAPI({ schNo }));
            window.location.reload(); 
          } catch (error) {
            console.error('일정 삭제 중 오류가 발생했습니다:', error);
          }
        } else {
          console.log('삭제가 취소되었습니다.');
        }
      };
      
    
 
    return(
        <div id="wrap">
        <section>
            <article>
            <h2 className="menu_schedule">일정관리</h2>
            <div id="menu_1">

                <img src="/calendar/calendarIcon.png" alt="" />
                <NavLink to='/calendar'>
                <span>캘린더</span></NavLink>
            </div>
            <div>             
                <NavLink to='/schedule/add/detail'> <button className="cal_btn">일정추가</button></NavLink>
                <NavLink to='/calendar/setting'> <button className="cal_btn">캘린더 설정</button></NavLink>
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
            <div id="menu_2">

                <img src="/project/projectIcon.png" alt="" />

                <NavLink to='/project/main'>  <span>프로젝트</span></NavLink>
            </div>
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
                <div className="schedule">
                    <span className="selected_date">    {/* 선택 된 날짜 */}
                     {selectedDate ? 
                    `${selectedDate.getFullYear()}년 ${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일`  : ''}
                    </span>
                    <span className="schedule_count">{filteredSchedules.length}</span>    {/* 일정개수 */}
                    <button className="allopen" style={ {float:"right", cursor:"pointer", border:"none", backgroundColor:"white", fontSize:"16px"}}  onClick={toggleExpand}> 전체보기</button>
                    
                    {filteredSchedules.map(schedule => (
                    <div  key={schedule.schNo} className={`schedule_box ${isExpanded ? 'expanded' : ''}`}>
                    <div className="schbox_top">
                        <div className="sch_time">
                        <div className="sch_start_date">{formatDateTime(schedule.schStartDate)}</div>
                            {schedule.schEndDate && <span>~</span>}
                            {schedule.schEndDate && <div className="sch_end_date">{formatDateTime(schedule.schEndDate)}</div>}
                        </div>
                        <div className="sch_btns">
                        <img
                            src=" /calendar/editcon.png"
                            alt="editIcon"
                            className="editbtn"
                            onClick={() => handleEditButtonClick(schedule.schNo)}   
                        />
                        <img
                            src="/calendar/caltrash.png"
                            alt="trashIcon"
                            className="deletebtn"
                            onClick={() => handleDeleteButtonClick(schedule.schNo)}
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

