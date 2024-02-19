import asdCSS from './cal_addsch_detail.css';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decodeJwt } from '../../utils/tokenUtils';

import {
    callCalendarListAPI, callAddScheduleAPI
} from '../../apis/CalendarAPICalls'

import calendarReducer from '../../modules/CalendarModule';

function AddDetailSchedule(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const calendar = useSelector(state => state.calendarReducer);  
    const calendarList = calendar.data;
    const token = decodeJwt(window.localStorage.getItem("accessToken"));  

    const [selectedCalendar, setSelectedCalendar] = useState(null);

    const calendarRef = useRef(null);
    const [isExpanded, setIsExpanded] = useState(false); 
    const [allCalChecked, setAllCalChecked] = useState(false);
 

    const onSelectCalendar = (event) => {
        const selectedCalName = event.target.value;
        const selectedCal = calendarList.find(calendar => calendar.calName === selectedCalName);
        console.log("선택된 캘린더의 calNo:", selectedCal.calNo);
        setForm(prevForm => ({
            ...prevForm,
            calNo: selectedCal.calNo
        }));
    };


    const [form, setForm] = useState({
        schTitle : '',
        schDetail : '',
        schStartDate : '',
        schEndDate : '',
        schAllDay : '',
        schLocal : '',
        calNo: selectedCalendar
    });

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onClickPurchaseHandler = () => {
        console.log('[Schedule] Schedule event Started!!');
        console.log('form', form);

        if(form.schTitle === '' || form.schStartDate === '' 
            || form.calNo === '' ){
                alert('필수 정보를 다 입력해주세요.');
                return ;
        }

        dispatch(callAddScheduleAPI({	
            form: form
        }));      
        
        alert('일정 등록이 완료 되었습니다');
        
        navigate("/calendar", { replace: true });        

    };

    useEffect(() => {
        console.log("useEffect의 token---->", token);
        console.log("useEffect의 token.userCode--->", token.userCode);

        if(token !== null) {
            dispatch(callCalendarListAPI({	
                userCode : token.userCode
            }));            
        }
    }, []);
    // useEffect(() => {
    //     setForm(prevForm => ({
    //         ...prevForm,
    //         calNo: selectedCalendar
    //     }));
    // }, [selectedCalendar]);

    const handleAllCalChange = (event) => {
        const isChecked = event.target.checked;
        setAllCalChecked(isChecked);
  
        const checkboxes = document.querySelectorAll('.cal_nav input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
          checkbox.checked = isChecked;
        });
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
                    <input type="checkbox" id="allcal_checkbox" />
                    <label htmlFor="allcal_checkbox">전체일정</label>
                </li>
                <li className="cal_menu">
                    개인 캘린더

                    <ul>
                    {calendarList && calendarList.map((calendar) => (
                    calendar.calType === "개인 캘린더" && 
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
           <main className='calendarmain'>
            <div className="add_detail_box">
             <h2 className="h222"> 일정 상세 등록 </h2>
             <div className="addbox">
                <table className="inputtb">
                <tbody>
                    <tr>
                    <td>일정명</td>
                    <td>
                        <input
                            name='schTitle'
                            placeholder='일정 제목'
                            id="sch_title"
                            autoComplete='off'
                            onChange={ onChangeHandler }
                         />
                    </td>
                    </tr>
                    <tr>
                    <td>캘린더</td>
                    <td>
                        <select id="sch_cal" onChange={onSelectCalendar}>
                        <option disabled selected value="">-----캘린더를 선택하시오-------</option>
                            <optgroup label="개인 캘린더">

                                {calendarList && calendarList.map((calendar) => (
                                    calendar.calType === "개인 캘린더" && 
                                    <option key={calendar.calNo} value={calendar.calName}>{calendar.calName}</option>
                                ))}
                            </optgroup>
                            <optgroup label="공유 캘린더">
                                {calendarList && calendarList.map((calendar) => (
                                    calendar.calType === "공유 캘린더" && 
                                    <option key={calendar.calNo} value={calendar.calName}>{calendar.calName}</option>
                                ))}
                            </optgroup>
                        </select>
                    </td>
    
                    </tr>
                    <tr>
                    <td>일시</td>
                    <td>
                        <div className="datebox">
                        <input 
                            type="datetime-local"
                            name='schStartDate' 
                            id="start_date"
                            className="start_date"
                            onChange={ onChangeHandler } 
                            /> ~{" "}
                        <input 
                            type="datetime-local" 
                            id="end_date"
                            className="end_date"
                            name='schEndDate' 
                            onChange={ onChangeHandler }  />
                        </div>
                    </td>
                    <td className="cb_zone">
                        <input type="checkbox" id="allday" />
                        <label htmlFor="allday">종일</label>
                    </td>
                    </tr>
                    <tr>
                    <td>장소</td>
                    <td>
                        <input                             
                            name='schLocal'
                            placeholder='주소'
                            autoComplete='off'
                            onChange={ onChangeHandler }/>
                    </td>
                    <td>
                        <button id="find_map">찾기</button>
                    </td>
                    </tr>
                    <tr>
                    <td>내용</td>
                    <td>
                        <textarea
                        id="sch_detail"
                        style={{ resize: "none" }}
                        defaultValue={""}
                        name='schDetail'
                        onChange={ onChangeHandler }
                        />
                    </td>
                    </tr>
                </tbody>
                </table>
                    <div className="chartbox">
    
                    </div>
                </div>
                <div className="asd_btns">
                    <button className="asd_sub_btn" onClick={ onClickPurchaseHandler }>등록</button>
                    <button className="asd_cancle_btn">취소</button>
                </div>
            </div>
        </main>
        </div>
    );
}

export default AddDetailSchedule;
