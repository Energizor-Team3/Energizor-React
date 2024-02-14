import cmp from "./CalendarMain.css"
import React, { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react'; // FullCalendar React 래퍼 import
import dayGridPlugin from '@fullcalendar/daygrid'; // DayGrid 플러그인 import
 
import interactionPlugin from '@fullcalendar/interaction'; // Interaction 플러그인 import

function CalendarMainPage(){
    const calendarRef = useRef(null);
    const [isExpanded, setIsExpanded] = useState(false); 
    const [allCalChecked, setAllCalChecked] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
      if (calendarRef.current) {
        calendarRef.current.getApi().gotoDate(new Date()); // 현재 날짜로 이동
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
                    <input type="checkbox" id="allcal_checkbox" onChange={handleAllCalChange} />
                    <label htmlFor="allcal_checkbox">전체일정</label>
                </li>
                <li className="cal_menu">
                <a href="#내캘린더">  > 내 캘린더</a>
                    <ul>
                    <li>
                        <input type="checkbox" id="cal_checkbox_1" />
                        <label htmlFor="cal_checkbox_1">
                        개인일정
                        <span className="dot" style={{ backgroundColor: "red" }} />
                        </label>
                    </li>
                    <li>
                        <input type="checkbox" id="cal_checkbox_2" />
                        <label htmlFor="cal_checkbox_2">
                        외부일정
                        <span className="dot" style={{ backgroundColor: "blue" }} />
                        </label>
                    </li>
                    </ul>
                </li>
                <li className="cal_menu">
                    <a href="#내캘린더"> > 공유 캘린더</a>
                    <ul>
                    <li>
                        <input type="checkbox" id="companysch_cb" />
                        <label htmlFor="companysch_cb">
                        회사일정
                        <span
                            className="dot_2"
                            style={{ backgroundColor: "orange" }}
                        />
                        </label>
                    </li>
                    <li>
                        <input type="checkbox" id="departsch_cb" />
                        <label htmlFor="departsch_cb">
                        부서일정
                        <span
                            className="dot_2"
                            style={{ backgroundColor: "green" }}
                        />
                        </label>
                    </li>
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
                    plugins={[dayGridPlugin,interactionPlugin]}
                    events={[
                        { title: 'event 1', date: '2024-02-01' },
                        { title: 'event 1', date: '2024-02-01' },
                        { title: 'event 1', date: '2024-02-01' },

                        { title: 'event 1', date: '2024-02-11' },
                        { title: 'event 1', date: '2024-02-11' },
                        { title: 'event 1', date: '2024-02-11' },
                        { title: 'event 1', date: '2024-02-11' },

                        
                        { title: 'event 2', start: '2024-02-23',
                        end: '2024-02-26'},
                        { title: 'event 1', date: '2024-02-11' },
                        { title: 'event 1', date: '2024-02-11' },
                        { title: 'event 1', date: '2024-02-23' },

                        {
                            groupId: 999,
                            title: '회의',
                            start: '2024-02-01T16:00:00'
                          }
                    ]}

                     
                    selectable={true}
                    select={handleSelect}
                    dayMaxEventRows={3} // 한 칸에 표시할 최대 이벤트 행 수
                    eventLimit={true} // 더 많은 이벤트가 있을 때 +n more 링크 표시
                
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