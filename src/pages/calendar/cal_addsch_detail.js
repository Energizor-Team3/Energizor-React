import asdCSS from './cal_addsch_detail.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';




function AddDetailSchedule(){
    // const dispatch = useDispatch();
    // console.log('---------------',window.localStorage.getItem('accessToken'));

    return(
      <div id="wrap">
        <section>
            <article>
            <h2 className="menu_schedule">일정관리</h2>
            <div id="menu_1">
                <a href="/">
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
             <h2 className="h222"> 일정 상세 등록 </h2>
             <div className="addbox">
                <table className="inputtb">
                <tbody>
                    <tr>
                    <td>일정명</td>
                    <td>
                        <input id="sch_title" />
                    </td>
                    </tr>
                    <tr>
                    <td>캘린더</td>
                    <td>
                        <select id="sch_cal">
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
                        <input />
                    </td>
                    <td>
                        <button id="find_map">찾기</button>
                    </td>
                    </tr>
                    <tr>
                    <td>참석자</td>
                    <td>
                        <button id="add_att" onclick="toggleChartbox()">
                        +
                        </button>
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
                <div className="asd_btns">
                    <button className="asd_sub_btn" type="submit">등록</button>
                    <button className="asd_cancle_btn">취소</button>
                </div>
            </div>
        </main>
        </div>
 
    );

}


export default AddDetailSchedule;