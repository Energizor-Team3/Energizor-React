import './CalendarSetting.css'

function CalendarSetting(){
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
            <a href="#내캘린더">내 캘린더</a>
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
            <a href="#내캘린더">공유 캘린더</a>
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
  <main>
    <div className="add_detail_box">
      <h2> 캘린더 설정 </h2>
      <div className="addbox">
        <table className="input_tb">
          <tbody>
            <tr className="tr_1">
              <td>캘린더 목록</td>
              <td className="cal_list">
                <div className="cal_listdiv">
                  <span className="cal-header">개인 캘린더</span>
                  <ul>
                    <li>
                      <span
                        className="dot"
                        style={{ backgroundColor: "red" }}
                      />
                      캘린더 1
                    </li>
                    <li>캘린더 2</li>
                    <li>캘린더 3</li>
                    <li>캘린더 4</li>
                  </ul>
                  <span className="cal-header">공유 캘린더</span>
                  <ul className="shared-cal-list">
                    <li>캘린더 5</li>
                    <li>캘린더 6</li>
                    {/* Add more shared calendars as needed */}
                  </ul>
                </div>
              </td>
            </tr>
            <tr className="tr_2" id="calendarAddRow">
              <td>캘린더 추가</td>
              <td className="add_cal_td">
                <table className="">
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