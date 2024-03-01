import ApprovalHeader from './approvalHeader'
import './ProxyApprovalLine.css'
import ApprovalGroup2 from './ApprovalGroup2'
import { callSelectUserDetailAPI, callInsertProxyAPI, callSelectProxyAPI, callUpdateProxyAPI} from '../../apis/ApprovalAPICalls';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useRef, useState } from 'react';
import { callGetuserDetailAPI } from '../../apis/GroupAPICalls';
import { useNavigate} from 'react-router-dom';




function ProxyApprovalLine(){
  
  const navigate = useNavigate();
  const userDetail = useSelector((state) => state.approvalReducer); // 로그인한 사용자 정보
  const proxyState = useSelector((state) => state.approvalSubReducer); // 대리결재 위임 했는지 확인
  const proxyuser = useSelector((state) => state.groupUserReducer); // 위임자
  console.log(userDetail, 'userDetail')
  console.log(proxyuser, 'proxyuser')
  console.log(proxyState, 'proxyState')

  

  // 위임자 선택시 코드

  const [form, setForm] = useState({
    changeUser: '',
    startDate: '',
    finishDate: '',
  });

  const onChangeHandler = (e) => {
    setForm({
        ...form,
        [e.target.name]: e.target.value
    });
  };

  useEffect(()=>{
    console.log('실제로 값이 변하는지',form);
  },[form])


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(callSelectUserDetailAPI());
    dispatch(callSelectProxyAPI());
  }, []);


  useEffect(() => {
    if(proxyuser != undefined){
      const proxyusercode = proxyuser?.userCode;
      
      // form 상태 업데이트
      setForm(prevForm => ({
        ...prevForm,
        changeUser: proxyusercode,
      }));
    }
    
    
  
  }, [proxyuser]);


  const handleUserSelect = (code) => {
    console.log(code);
    if (userDetail.userCode === code) {
      alert('위임은 본인에게 안됩니다.');
      return;
    }

    // 사용자 상세 정보 조회
    dispatch(callGetuserDetailAPI(code));
    }



    const toggleContent =() =>{
      var og = document.getElementById("og");
      og.classList.toggle("active");
      }
      // 대리결재 위임 취소
      const updateProxy = () =>{
        if(proxyState !== "조회성공"){

        
        const result = window.confirm("대리결재 위임 취소 진행 하시겠습니까?")
      if(result){
        dispatch(callUpdateProxyAPI(proxyState.proxyCode))
        alert('대리결재 위임 취소 완료 하셨습니다.')
        window.location.reload()
      }else{
        alert('취소하셨습니다.')
      }
    }
      }

    

      // 위임
      const onclickHandler = () => {
        
        if(form.changeUser === '' 
                || form.startDate === ''|| form.finishDate === ''){
                    alert('공란을 입력해주세요.');
                    return ;
            }


      const result = window.confirm("진행 하시겠습니까?")
      if(result){
        dispatch(callInsertProxyAPI({	
          form
          
        })); 
        alert('대리결재 위임 하셨습니다 결재메인페이지로 이동합니다.')
                window.location.reload()

      }else{
        alert('취소하셨습니다.')
      }
    };

    function formatDate(dateArray) {
      if(dateArray != null){
        // 월 값 조정: 배열의 두 번째 요소(월)에서 1을 뺌
        const adjustedDateArray = [dateArray[0], dateArray[1] - 1, dateArray[2]];
        const date = new Date(...adjustedDateArray);
    
        const year = date.getFullYear();
        const month = (`0${date.getMonth() + 1}`).slice(-2); 
        const day = (`0${date.getDate()}`).slice(-2);
    
        console.log(dateArray, 'dateArray');
        return `${year}-${month}-${day}`;
      }
    }

    

    return(
      <div id="wrap">
        <section>
    <ApprovalHeader/>

        </section>
      <main>
        <div className="content">
          <div className="subject">
            <strong>대리결재 위임</strong>
            <div className="line">
              <div className="search_box">
              {proxyState == "조회성공" && (
                <span>
                  <button onClick={toggleContent}>대리 결재 지정</button>
              </span>
              )}
              {proxyState !== "조회성공" && (
                <span>
                  <button onClick={updateProxy}>대리 결재 위임 취소</button>
              </span>
              )}
              <span>          
              </span>
              </div>
            </div>
            
          </div>
          <div className="select_line">
          </div>
          <div className='side'>
          {proxyState !== "조회성공" &&  (
            <div>
              <strong>대리결재 위임은 한명만 할 수 있습니다. 취소하거나 바꾸시려면 위임 취소를 하세요</strong>
            <div className='profile'>
            <ul className='user1'>
              <div className="profile-image" ><img   src={userDetail?.imgName}
                                        alt="프로필사진"/></div>
              <input type="text" className="input-field" readOnly placeholder="부서/팀" value={userDetail?.team?.dept?.deptName + '/' + userDetail?.team?.teamName}/>
              <input type="text" className="input-field" readOnly placeholder="이름" value={userDetail?.userName}/>
            </ul>
            <ul className='user2'>
              <div className="profile-image"><img  src={proxyState?.changeUser?.profilePath}
                                        alt=""/></div>
              <input type="text" className="input-field" readOnly placeholder="부서/팀" value={(proxyState?.changeUser?.team?.dept?.deptName && proxyState?.changeUser?.team?.teamName) ? `${proxyState?.changeUser?.team.dept.deptName}/${proxyState?.changeUser?.team.teamName}` : ''}/>
              <input type="text" className="input-field" readOnly placeholder="이름" value={proxyState?.changeUser?.userName}/>
            </ul>
          </div>
            <div className='proxydate'>
              <input type='date'    name="startDate" Value={formatDate(proxyState?.startDate)}/>
              <input type='date'   name="finishDate" Value={formatDate(proxyState?.finishDate)}/> 
            </div>
            </div>
          )}
          {proxyState == "조회성공" && (
          <div className="wrap11">
          <div className='profile'>
            <ul className='user1'>
              <div className="profile-image" ><img   src={userDetail?.imgName}
                                        alt="프로필사진"/></div>
              <input type="text" className="input-field" readOnly placeholder="부서/팀" value={userDetail?.team?.dept?.deptName + '/' + userDetail?.team?.teamName}/>
              <input type="text" className="input-field" readOnly placeholder="이름" value={userDetail?.userName}/>
            </ul>
            <ul className='user2'>
              <div className="profile-image"><img  src={proxyuser?.imgName}
                                        alt=""/></div>
              <input type="text" className="input-field" readOnly placeholder="부서/팀" value={(proxyuser?.team?.dept?.deptName && proxyuser?.team?.teamName) ? `${proxyuser.team.dept.deptName}/${proxyuser.team.teamName}` : ''}/>
              <input type="text" className="input-field" readOnly placeholder="이름" value={proxyuser?.userName}/>
            </ul>
          </div>
            <div className='proxydate'>
              <input type='date' onChange={onChangeHandler}   name="startDate" Value={form.startDate}/>
              <input type='date' onChange={onChangeHandler}  name="finishDate" Value={form.finishDate}/> 
            </div>
            <div className="btn1">
               <button className='proxybtn' onClick={onclickHandler}>위임</button>
            </div>
          </div>
          )}
          <div className='og' id='og' >
        <ApprovalGroup2 onUserSelect={handleUserSelect} />

          </div>
          </div>
          </div>
      </main>
      </div>
    )
}

export default ProxyApprovalLine;