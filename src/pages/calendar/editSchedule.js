import { NavLink } from 'react-router-dom';
import './editSchedule.css';

function EditSchedule(){
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
                      <input id="edit_title" defaultValue="수정전 일정이 들어감" />
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
                        <input type="datetime-local" id="start_date" /> ~{" "}
                        <input type="datetime-local" id="end_date" />
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
                      <input defaultValue="원래 장소 info가 들어감" />
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
                        defaultValue={""}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="chartbox">
                 
              </div>
            </div>
            <div className="editschbtns">
              <button className="essub_btn" type="submit">
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