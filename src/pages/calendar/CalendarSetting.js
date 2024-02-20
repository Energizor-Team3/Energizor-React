import './CalendarSetting.css'
import { NavLink } from 'react-router-dom';

function CalendarSetting(){
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
                    <li >
 
                      캘린더 1
                    </li>
                    <li>캘린더 2</li>
                    <li>캘린더 3</li>
                    <li>캘린더 4</li>
                  </ul>
                  <span className="cal-header2">공유 캘린더</span>
                  <ul className="shared-cal-list">
                    <li>캘린더 5</li>
                    <li>캘린더 6</li>
                    {/* Add more shared calendars as needed */}
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