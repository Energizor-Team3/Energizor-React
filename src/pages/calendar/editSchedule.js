


import { NavLink } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decodeJwt } from '../../utils/tokenUtils';
import './editSchedule.css';


import {
  callCalendarListAPI, 
  callScheduleDetailAPI,
  callUpdateScheduleAPI
} from '../../apis/CalendarAPICalls';


import calendarReducer from '../../modules/CalendarModule';


function EditSchedule(){


  let formatstartdate, formatenddate;
  const dispatch = useDispatch();
  const params = useParams();
  const schedule  = useSelector(state => state.scheduleReducer);
  
  
  console.log('scheduleInfo', schedule);


  const navigate = useNavigate();
 
  const [form, setForm] = useState({});
  useEffect(()=>{
    console.log('입력값 바뀐거',form);

    
  },[form])

  useEffect(() => {
    console.log('[ScheduleUpdate] schNo : ', params.schNo);
    dispatch(callScheduleDetailAPI({ schNo: params.schNo }));
  }, []);

  useEffect(() => {
    if (schedule !== undefined) {
      const formatDate = (dateArray) => {
        if (!Array.isArray(dateArray) || dateArray.length < 5) {
          return ''; // 혹은 적절한 기본값을 반환합니다.
        }
        const [year, month, day, hour, minute] = dateArray;
        const formattedDate = new Date(year, month - 1, day, hour, minute);
        const isoString = formattedDate.toISOString();
        return isoString.substring(0, 16);
      };

      const formattedStartDate = formatDate(schedule.schStartDate);
      const formattedEndDate = schedule.schEndDate ? formatDate(schedule.schEndDate) : '';

      setForm({
        ...form,
        schStartDate: formattedStartDate,
        schEndDate: formattedEndDate,
        schNo: schedule.schNo,
        schTitle: schedule.schTitle,
        schDetail: schedule.schDetail,
        schLocal: schedule.schLocal
      });
    }
  }, [schedule]);

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const onClickScheduleUpdateHandler = () => {
    const formData = new FormData();
    formData.append("schNo", form.schNo);
    formData.append("schTitle", form.schTitle);
    formData.append("schStartDate", form.schStartDate);
    formData.append("schEndDate", form.schEndDate);
    formData.append("schDetail", form.schDetail);
    formData.append("schLocal", form.schLocal);

    dispatch(callUpdateScheduleAPI({ form: formData })).then(() => {
      alert('수정이 완료되었습니다.');
      navigate('/calendar'); 
    });         
  
  
  
  } 
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
 
            <div id="menu_2">

                <img src="/project/projectIcon.png" alt="" />

                <NavLink to='/project/main'>  <span>프로젝트</span></NavLink>
            </div>
            </article>
           </section>
        <main className='calendarmain'>
          <div className="edit_sch_box">
            <h2> <NavLink to='/calendar'> &lt;</NavLink> &nbsp; &nbsp;일정 수정 </h2>
            <div className="editbox">
              <table className="edit_input_tb">
                <tbody>
                  <tr>
                    <td>일정명</td>
                    <td>
                    <input 
                      type="text" 
                      id="edit_title" 
                      name="schTitle" 
                      value={ form.schTitle  || '' }
                      onChange={ onChangeHandler }
                      

                    />
                    </td>
                  </tr>
                  <tr>
                    <td>캘린더</td>
                    <td>
                      <select id="edit_sch_cal">
                        <optgroup label="내 캘린더">
                          <option value="개인일정"> 개인일정</option>
                          <option value="외부일정">외부 일정</option>
                        </optgroup>
                        <optgroup label="공유 캘린더">
                          <option value="회사일정">회사 일정</option>
                          <option value="부서일정">부서 일정</option>
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
                          id="start_date" 
                          name="schStartDate" 
                          value={ form.schStartDate }
                          onChange={ onChangeHandler }
                        /> ~{" "}
                        <input 
                        type="datetime-local" 
                        id="end_date"
                        name="schEndDate" 
                        value={ form.schEndDate  || ''}
                        onChange={ onChangeHandler }/>
                          
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
                      type="text" 
                      id="edit_local" 
                      name="schLocal"
                      value={ form.schLocal  || '' }
                      onChange={ onChangeHandler }/>
                    </td>
                    <td>
                      <button id="find_map">찾기</button>
                    </td>
                  </tr>
                  <tr>
                    <td>참석자</td>
                    <td>
                      <span className="attlist">김땡땡</span>
                      <button className="add_att">+</button>
                    </td>
                  </tr>
                  <tr>
                    <td>내용</td>
                    <td>
                      <textarea
                        id="sch_detail"
                        style={{ resize: "none" }}
                        name="schDetail"
                        value={ form.schDetail  || '' }
                        onChange={ onChangeHandler }
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="chartbox">
                 
              </div>
            </div>
            <div className="editschbtns">
              
              <button className="essub_btn" type="submit"
              onClick={onClickScheduleUpdateHandler}>
                등록
              </button>
              <button className="escancle_btn">취소</button>
            </div>
          </div>
        </main>
      </div>
    )
}

export default EditSchedule;

