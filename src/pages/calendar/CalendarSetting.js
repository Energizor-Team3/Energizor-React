import './CalendarSetting.css'
import { NavLink } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decodeJwt } from '../../utils/tokenUtils';
import {
  callCalendarListAPI
} from '../../apis/CalendarAPICalls'
import calendarReducer from '../../modules/CalendarModule';

function CalendarSetting(){
  const dispatch = useDispatch();
  const calendar = useSelector(state => state.calendarReducer); 
  const calendarList = calendar.data;
  const token = decodeJwt(window.localStorage.getItem("accessToken"));  
  const [calNo, setcalNo] = useState(0);
  const [userCode, setuserCode] = useState(0);
  const calendarRef = useRef(null);

  useEffect(() => {
    console.log("useEffect의 token---->", token);
    console.log("useEffect의 token.userCode--->", token.userCode);

    if (token !== null) {
        dispatch(callCalendarListAPI({ userCode: token.userCode }));

    }
}, []);


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
    <div className="setting_box">
      <NavLink to='/calendar'><h2 className='settingh2'>  &lt; &nbsp; &nbsp; 캘린더 설정 </h2></NavLink>
      <div className="setbox">
        <table className="set_tb">
          <tbody>
            <tr className="tr_1">
              <td>캘린더 목록</td>
              <td className="cal_list">
                <div className="cal_listdiv">
                  <span className="cal-header1">개인 캘린더</span>
                  <ul>
                  {calendarList && calendarList.map((calendar) => (
                                calendar.calType === "개인 캘린더" &&
                    <li  key={calendar.calNo}>
                        {calendar.calName}
                    </li>
                    ))}
                  </ul>
                  <span className="cal-header2">공유 캘린더</span>
                  <ul className="shared-cal-list">
                  {calendarList && calendarList.map((calendar) => (
                                calendar.calType === "공유 캘린더" &&
                    <li  key={calendar.calNo}>
                        {calendar.calName}
                    </li>
                    ))}
                  </ul>
                  <ul className='block'>
                    <li>&nbsp;&nbsp;&nbsp;&nbsp;</li>
                  </ul>
                </div>
              </td>
            </tr>
            <tr className="tr_2" id="calendarAddRow">
              <td>캘린더 추가</td>
              <td className="add_cal_td">
                <table className="dd">
                  <tbody>
                    <tr>
                      <td>
                        <label htmlFor="colors">색상:</label>{" "}
                      </td>
                      <td>
                        <input type="color" id="colors" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label htmlFor="cal_title">캘린더명</label>
                      </td>
                      <td>
                        <input type="text" id="cal_title" />
                        <button className="add_title">추가</button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>캘린더 유형</label>
                      </td>
                      <td>
                        <select className="cal_select">
                          <option>개인 캘린더</option>
                          <option>공유 캘린더</option>
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            {/* datebox */}
            <tr className="tr_3" id="dateboxRow">
              <td>캘린더 공유하기</td>
              <td>
                <button className="add_att" onclick="toggleChartbox()">
                  +
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="chartbox">
          <img src="/resources/images/org_chartimg.png" />
        </div>
      </div>
      <div className="setting_btns">
        <button className="setting_submit_btn" type="submit">
          등록
        </button>
        <button className="setting_cancle_btn">취소</button>
      </div>
    </div>
  </main>
</div>

    );

}
export default CalendarSetting;