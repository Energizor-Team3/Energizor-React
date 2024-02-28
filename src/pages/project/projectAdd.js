import './projectAdd.css'
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { callGetuserDetailAPI } from '../../apis/GroupAPICalls';
import {
    callAddProjectAPI,
} from '../../apis/ProjectAPICalls'

import ProjectGroup from './ProjectGroup';

import projectReducer from '../../modules/ProjectModule';

function ProjectAdd(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const propartlistuser = useSelector((state) => state.groupUserReducer); 
    const [propartlist, setProPartList] = useState([]);  //프로젝트 참여자 상태

    const projectRef = useRef(null); 



    const [form, setForm] = useState({
        proTitle : '',
        proContent : '',
        proStartDate : '',
        proEndDate : '',
        userCodes:''
 
    }); 
    

    useEffect(() => {
        // form 상태가 올바르게 설정되었다고 가정
        callAddProjectAPI(form); // form 전체를 API 호출에 전달
      }, [form]);
    console.log('Initial form state:', form);

    const handleUserSelect = (code) => {
        if (propartlist.every(user => user.userCode !== code)) {
        console.log('참석자 코드', code);
        dispatch(callGetuserDetailAPI(code));}
         else {
        console.log('이미 추가된 사용자입니다.');
        alert('이미 추가된 사용자입니다.');
        console.log(propartlistuser);
        console.log(propartlistuser.userName);
        } }


 




            
    
        useEffect(() => {
            // calpartlistuser가 유효한지 확인
            if (propartlistuser && propartlistuser.userCode) {
              if (!propartlist.some(user => user.userCode === propartlistuser.userCode)) {
                  setProPartList(prev => [...prev, propartlistuser]);
              }
              // calpartlistuser의 값을 form의 userCodes에 설정
              setForm(prevForm => ({
                ...prevForm,
                userCodes: [propartlistuser.userCode]
              }));
            }
          }, [propartlist, propartlistuser]);


        console.log('propartlistuser',propartlistuser);
   
        useEffect(() => {
         const partUserCode = propartlist.map(user => user.userCode);
     
         setForm(prevForm => ({
           ...prevForm,
           userCodes: partUserCode,
         }));
     }, [propartlist]);
 
     console.log(propartlist, "프로젝트 참여자")   
 
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onClickPurchaseHandler = () => {
        console.log('[Project] Add Project event Started!!');
        console.log('form', form);
 
        dispatch(callAddProjectAPI({	
            form: form
        }));      
        
        alert('프로젝트 등록이 완료 되었습니다');
        
        navigate("/project/main", { replace: true });        

    }
        const toggleContent = () => {
            var chartboxx = document.getElementById("chartboxxx");
            chartboxx.classList.toggle("active");
        };

      const deleteline = (userCode) => {
        setProPartList(prevProPartList => {
          // 새로운 calpartlist를 만들어 특정 사용자 제거
          const updatedList = prevProPartList.filter(user => user.userCode !== userCode);
      
          // 새로운 userCodes 배열 생성
          const updatedUserCodes = updatedList.map(user => user.userCode);
      
          // userCodes를 업데이트
          setForm(prevForm => ({
            ...prevForm,
            userCodes: updatedUserCodes
          }));
      
          return updatedList;
        });}

return(
    <div id="wrap">
    <section>
    <article>
    <h2 className="menu_schedule">일정관리</h2>
    <div id="menu_1">
             
             <img src="/project/projectIcon.png" alt="" />
             <NavLink to='/project/main'>  <span>프로젝트</span></NavLink>                          
     </div>
     <div id="menu_2">                  
             <img src="/project/calendarIcon.png" alt="" />
             <NavLink to='/calendar'>
        <span>캘린더</span></NavLink>                                  
     </div>
    </article>
  </section>
        <div className='pjmain'>
        <div className="add_detail_box">
            <h2> 프로젝트 생성 </h2>
            <div className="addbox">
            <table className="input_tb">
                <tbody>
                <tr>
                    <td>프로젝트 명</td>
                    <td>
                    <input 
                     type='text'
                     id="proTitle"
                     name='proTitle'
                     placeholder='프로젝트 명을 입력하세요'
                     onChange={ onChangeHandler } />
                    </td>
                </tr>
                <tr>
                    <td>일시</td>
                    <td>
                    <div className="pjdatebox">
                        <input 
                            type="date" 
                            id="pjstart_date" 
                            name='proStartDate'
                            onChange={ onChangeHandler }/> ~{" "}
                        <input 
                            type="date" 
                            id="pjend_date" 
                            name='proEndDate'
                            onChange={ onChangeHandler }/>
                    </div>
                    </td>
                </tr>
                <tr>
                    <td>참석자</td>
                    <td>
                   
                    <td className='addllist'>
                    <button id="add_att" onClick={toggleContent}>
                        +
                    </button>
                    {propartlist.length > 0 && propartlist.map((propartlistuser, index) => (
                      <div className='cal_partname' key={index}> 
                        <button className='cpdeletebtn'  onClick={() => deleteline(propartlistuser?.userCode)}> X </button>
                        <div className='cal_partnamedd' > 
                        {propartlistuser.userName}
                        
                      </div>
                      </div>
                    ))}</td>
                    </td>
                </tr>
                <tr>
                    <td>내용</td>
                    <td>
                    <textarea
                        id="sch_detail"
                        name='proContent'
                        style={{ resize: "none" }}
                        defaultValue={""}
                        onChange={ onChangeHandler }
                    />
                    </td>
                </tr>
                </tbody>
            </table>
            <div className="chartboxxx" id="chartboxxx" style={{height:"600px"}}>
            <ProjectGroup onUserSelect={handleUserSelect}  />
            </div>
            </div>
            <div className="pjbtns">
            <button className="pjsub_btn" type="submit" onClick={ onClickPurchaseHandler }>
                등록
            </button>
            <button className="pjcancle_btn">취소</button>

            </div>
        </div>
        </div>
 
</div>


  )
}
export default ProjectAdd;