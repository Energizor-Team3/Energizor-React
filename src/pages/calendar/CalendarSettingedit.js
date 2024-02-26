import './CalendarSettingedit.css'
import CalendarGroup from './CalendarGroup';
import { NavLink,useNavigate } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decodeJwt } from '../../utils/tokenUtils';
import { callGetuserDetailAPI } from '../../apis/GroupAPICalls';
import {
  callCalendarListAPI,
  callDeleteCalendarAPI,
  callUpdateCalendarAPI
} from '../../apis/CalendarAPICalls'
import calendarReducer from '../../modules/CalendarModule';
 
function CalendarSettingedit(){
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const calendar = useSelector(state => state.calendarReducer); 
  const calpartlistuser = useSelector((state) => state.groupUserReducer); // 캘린더 참여자 불러옴
  const [calpartlist, setCalPartList] = useState([]);  //캘린더 참여자 상태
  const calendarList = calendar.data;
  const token = decodeJwt(window.localStorage.getItem("accessToken"));  
  const [calNo, setcalNo] = useState(0);
  const [userCode, setuserCode] = useState(0);
  const calendarRef = useRef(null);


  const [calendarType, setCalendarType] = useState('개인 캘린더');
  const [selectedCalendar, setSelectedCalendar] = useState(null);

  const [editCalName, setEditCalName] = useState('');
  const [editCalColor, setEditCalColor] = useState('');

  const handleCalendarClick = (calendar) => {
    setSelectedCalendar(calendar);
  };

  useEffect(() => {
    if (token !== null) {
      dispatch(callCalendarListAPI({ userCode: token.userCode }));
    }
  }, []);


  useEffect(() => {
    if (selectedCalendar) {
      setEditCalName(selectedCalendar.calName);
      setEditCalColor(selectedCalendar.calColor);
    }
  }, [selectedCalendar]);

  const handleCalNameChange = (e) => {
    setEditCalName(e.target.value);
  };

  const handleCalColorChange = (e) => {
    setEditCalColor(e.target.value);
  };

  const handleUpdateCalendar = async () => {
    if (!selectedCalendar) return;

    const updateForm = JSON.stringify({
      calName: editCalName,
      calColor: editCalColor,
    });
  
 

    await dispatch(callUpdateCalendarAPI(
      { calNo: selectedCalendar.calNo, form: updateForm }));

    alert('캘린더가 성공적으로 수정되었습니다.');
    window.location.reload();
  };
  useEffect(() => {
    // 상태가 변경될 때마다 실행되어 updateForm을 콘솔에 출력
    const updateForm = JSON.stringify({
      calName: editCalName,
      calColor: editCalColor,
    });
  
    console.log('updateForm:', updateForm);
  }, [editCalName, editCalColor]); 

  const handleUserSelect = (code) => {
    if (calpartlist.every(user => user.userCode !== code)) {
    console.log('참석자 코드', code);
    dispatch(callGetuserDetailAPI(code));}
     else {
    console.log('이미 추가된 사용자입니다.');
    alert('이미 추가된 사용자입니다.');
    console.log(calpartlistuser);
    console.log(calpartlistuser.userName);
    
      
    } }

 
    
 

   

   console.log('calpartlistuser',calpartlistuser);
   
 
 

    
   function rgbToHex(rgb) {     //색깔 코드 변환 
    const [r, g, b] = rgb.match(/\d+/g);
    return "#" + ((1 << 24) + (parseInt(r) << 16) + (parseInt(g) << 8) + parseInt(b)).toString(16).slice(1);
  
   }  
 

  console.log(calpartlist, "캘린더 참여자")   


 


  const toggleContent = () => {
    var chartbox = document.getElementById("chartbox");
    chartbox.classList.toggle("active");
  };

 





  const handleDeleteButtonClick = async (calNo) => {
    const isConfirmed = window.confirm('일정을 삭제하시겠습니까?');
  
    if (isConfirmed) {
      try {
        await dispatch(callDeleteCalendarAPI({ calNo }));
        console.log('삭제 완료');
        console.log('calendarList:', calendarList); // 삭제 후 calendarList 콘솔에 출력
        // 다른 작업 수행 가능
        window.location.reload();
      } catch (error) {
        console.error('일정 삭제 중 오류가 발생했습니다:', error);
      }
    } else {
      console.log('삭제가 취소되었습니다.');
    }
  };
 

  const [activeButton, setActiveButton] = useState('edit');  
  const backgroundPosition = activeButton === 'add' ? '0%' : '100%';
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
            <tr>
              <td> </td>
              <td className='calsettingbtn'  > 
              <div className='settingbtns'>
                      <div
                        className="background-slide"
                        style={{ transform: `translateX(${backgroundPosition})` }}
                      ></div>
                      <button
                        className={`settingbtn1 ${activeButton === 'add' ? 'settingbtn2-active' : ''}`}
                        onClick={() => navigate('/calendar/setting')}
                      >
                        추가
                      </button>
                      <button
                        className='settingbtn2'
                        onClick={() => setActiveButton('edit')}
                      >
                        수정
                      </button>
              </div>
 
              </td>
            </tr>
            <tr className="tr_1">
              <td>캘린더 목록</td>
              <td className="cal_list">
                <div className="cal_listdiv">
                  <span className="cal-header1">개인 캘린더</span>
                  <ul>
                  {calendarList && calendarList.map((calendar) => (
                      calendar.calType === "개인 캘린더" && (
                        <div className= {`caliconandname  ${selectedCalendar && selectedCalendar.calNo === calendar.calNo ? 'selectedCalendar' : ''}`} key={calendar.calNo}  onClick={() => handleCalendarClick(calendar)}>
                          <li className='calnames'>
                            {calendar.calName}
                          </li>
                          <li className='calicons'>
                            {calendar === selectedCalendar && (
                              <>
                                <img
                                  src="/calendar/caltrash.png"
                                  alt="deleteIcon"
                                  className="deletebtn"
                                  onClick={() => handleDeleteButtonClick(calendar.calNo)}
                                  
                                />
                              </>
                            )}
                          </li>
                        </div>
                      )
                    ))}
                      </ul>
                  {/* style={{textDecorationLine:'underline',textDecorationColor : 'blue'} } */}
                  <span className="cal-header2"  >공유 캘린더</span>
                  {calendarList && calendarList.map((calendar) => (
                    calendar.calType === "공유 캘린더" && (
                          <div className={`caliconandname  ${selectedCalendar && selectedCalendar.calNo === calendar.calNo ? 'selectedCalendar' : ''}`} key={calendar.calNo}  onClick={() => handleCalendarClick(calendar)}>
                              <li
                                className='calnames '

                              >
                              {calendar.calName}
                            </li>
                            <li className='calicons'>
                              {calendar === selectedCalendar && (
                                <>
    
                                  <img
                                    src="/calendar/caltrash.png"
                                    alt="deleteIcon"
                                    className="deletebtn"
                                    onClick={() => handleDeleteButtonClick(calendar.calNo)}
                                     
                                  />
                                </>
                              )}
                            </li>
                          </div>
                        )
                      ))}
 
                </div>
              </td>
            </tr>
            {!selectedCalendar && (
            <tr className="tr_2" id="calendarAddRow">
              <td>캘린더 수정</td>
              <td className="add_cal_td">
                <table className="dd">
                  <tbody>
                    <tr>
                      <td>
                        <label htmlFor="colors">색상:</label>{" "}
                      </td>
                      <td>
                        <input 
                          type="color" 
                          id="colors"
                          name='calColor'
                           />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label htmlFor="cal_title">캘린더명</label>
                      </td>
                      <td>
                        <input 
                          type="text" 
                          id="cal_title"
                          name='calName'
                          autoComplete='off'
                            />

                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>캘린더 유형</label>
                      </td>
                      <td>
                        <select className="cal_select"  >
                          <option value="개인 캘린더">개인 캘린더</option>
                          <option value="공유 캘린더">공유 캘린더</option>
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>)}
            {selectedCalendar && (
             <tr className="tr_2" id="calendarAddRow">
              <td>캘린더 수정</td>
              <td className="add_cal_td">
                <table className="dd">
                  <tbody>
                    <tr>
                      <td  >
                        색상 : 
                      </td>
                      <td                   >
                      <input 
                          type="color" 
                          id="colors"
                          name='calColor'
                          value={editCalColor}
                          onChange={handleCalColorChange} />

                      </td>
                    </tr>
                    <tr>
                      <td >
                         캘린더명 :
                      </td>
                      <td>
                      <input 
                          type="text" 
                          id="cal_title"
                          name='calName'
                          autoComplete='off'
                          value={editCalName}
                          onChange={handleCalNameChange}
                            />
                      </td>
                    </tr>
                    <tr>
                      <td  >
                         캘린더 유형 :
                      </td>
                      <td>
                      {selectedCalendar.calType}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
                           
            )} 
            {selectedCalendar && selectedCalendar.calType === '공유 캘린더' && selectedCalendar.participantNames && (
                              <tr className="tr_3" id="dateboxRow">
                                <td>참여자:</td>
                                <td className='addllist'>

                                <button className="add_att" onClick={toggleContent}>
                                    +
                                  </button>
                                  {selectedCalendar.participantNames.map((name, index) => (
                                  <div className='cal_partname' key={index} > 
                                  <button className='cpdeletebtn'  > X </button>
                                  <div className='cal_partnamedd' > 
                                     {name} </div>
                                </div> ))}
                                </td>
                                
                              </tr>
                            )}
            
           
            {/* datebox */}
 
          </tbody>
        </table>
        <div className="chartbox" id='chartbox'>
          <CalendarGroup onUserSelect={handleUserSelect}  />
 
        </div>
      </div>

 

      <div className="setting_btns">
      <button className="setting_submit_btn" onClick={handleUpdateCalendar}>
          등록
        </button>
        <button className="setting_cancle_btn">취소</button>
      </div>
    </div>
  </main>
</div>

    );

}
export default CalendarSettingedit;