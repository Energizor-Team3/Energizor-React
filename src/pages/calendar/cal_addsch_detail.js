import asdCSS from './cal_addsch_detail.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';




function AddDetailSchedule(){
    // const dispatch = useDispatch();
    // console.log('---------------',window.localStorage.getItem('accessToken'));

    return(
        <>
            <main >
            <div className= "add_detail_box">
                <h2 className='h222'> 일정 상세 등록 </h2>
                <div className= "addbox">
                <table className="input_tb">
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
                    <img src="/public/calendar/org_chartimg.png" />
                </div>
                </div>
                <div className="btns">
                <button className="sub_btn" type="submit">
                    등록
                </button>
                <button className="cancle_btn">취소</button>
                </div>
            </div>
            </main>

        
        </>
    );

}


export default AddDetailSchedule;