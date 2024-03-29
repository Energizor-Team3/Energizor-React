import React, { useEffect, useRef, useState } from 'react';
import './Vacation.css';
import './NewApprovaling.css';
import CurrentTime from './Time';
import ApprovalGroup from './ApprovalGroup';
import { useSelector, useDispatch } from 'react-redux';
import { callSelectUserDetailAPI, callSaveVacationAPI, callInsertVacationAPI, callSelectTempDocumentDetailAPI} from '../../apis/ApprovalAPICalls';
import { callGetuserDetailAPI } from '../../apis/GroupAPICalls';
import ApprovalHeader from './approvalHeader'
import { useNavigate, useLocation } from 'react-router-dom';




function Vacation(){
  const location = useLocation();
  const documentCodeData = location.state?.documentCode;
  let formatdate, formatdate2;

  console.log(documentCodeData,'넘어온값'); // 이전 페이지에서 전달한 document 객체에 접근  
  const tempDocument = useSelector((state) => state.approvalSubReducer); // 로그인한 사용자 정보
  console.log(tempDocument, 'tempDocument');

 
  if (tempDocument && Array.isArray(tempDocument.offStart)) {

    const formattedDate = tempDocument.offStart.map(num => String(num).padStart(2, '0'));
    const formattedDate2 = tempDocument.offEnd.map(num => String(num).padStart(2, '0'));
    // 배열이 정의되어 있고, 배열인 경우에만 join을 실행합니다.
    formatdate = formattedDate.join('-');
    formatdate2 = formattedDate2.join('-');

    console.log(formatdate);
    console.log(formatdate2);
  } 


  // 조회해온 임시저장문서 가 있을경우 진행
  useEffect(() => {
    

    if (tempDocument !== undefined) { 
      setForm(prevForm => ({
        ...prevForm,
        offApplyTitle: tempDocument?.offApplyTitle,
        offStart: formatdate,
        offEnd: formatdate2,
        
        offReason: tempDocument.offReason,
        
        
        
    }));
    }
  }, [tempDocument]);
  

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentTimeString = CurrentTime();
    const userDetail = useSelector((state) => state.approvalReducer); // 로그인한 사용자 정보
    const approvallineuser = useSelector((state) => state.groupUserReducer); // 결재,참조자 불러옴
    const [approvalLine, setApprovalLine] = useState([]); // 결재 라인 상태
    const [referenceLine, setReferenceLine] = useState([]); // 참조 라인 상태
    const [selectedAction, setSelectedAction] = useState(null); // 'approval' 또는 'reference' 액션 선택 상태
    const [clickType, setClickType] = useState("") 
    const [image, setImage] = useState(null);
    const imageInput = useRef(); 

    function getDaysDifference(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const difference = end - start; // 밀리초 단위의 차이
        const days = difference / (1000 * 60 * 60 * 24); // 일수로 변환
        return Math.round(days); // 소수점 아래를 반올림하여 반환
      }
  
    const [form, setForm] = useState({
        offApplyTitle: '',
        offStart: '',
        offEnd: '',
        offDay: '',
        offReason: '',
        rfUser: '',
        lineUser: '',
        file: '',

  
    });
    
    console.log(approvalLine, "결재자")   
    console.log(referenceLine, "참조자")   
    // 로그인한 정보 불러옴
    useEffect(() => {
      dispatch(callSelectUserDetailAPI());
      if(documentCodeData !== undefined){  
        dispatch(callSelectTempDocumentDetailAPI(documentCodeData));
      }
    }, [dispatch]);
  
    useEffect(() => {
    // approvallineuser가 유효한지 확인 (userCode가 존재하는지)
    if (approvallineuser && approvallineuser.userCode){
    switch(clickType){
      case 'approval': 
      if(approvalLine.length < 4){
        if (!approvalLine.some(user => user.userCode === approvallineuser.userCode)) {
          if (!referenceLine.some(user => user.userCode === approvallineuser.userCode)) {
            setApprovalLine(prev => [...prev, approvallineuser]);
          } 
        }
      }else{
        alert('결재라인에는 최대 4명까지 추가할 수 있습니다.');
      }
      break;
      case 'reference': if(referenceLine.length < 4){
        
        
        if (!referenceLine.some(user => user.userCode === approvallineuser.userCode)) {
          if (!approvalLine.some(user => user.userCode === approvallineuser.userCode)) {
            setReferenceLine(prev => [...prev, approvallineuser]);
          } 
          
        } 
      } else{
        alert('참조라인에는 최대 4명까지 추가할 수 있습니다.');
      }
      break;
      default: break;
  
    }
  }
  }, [approvallineuser, clickType, approvalLine, referenceLine]);
  
  // 결재, 참조자 유저코드만 뽑아서 배열로 바꾼후 폼안에 넣어줌
  useEffect(() => {
    // approvalLine에서 userCode만 추출하여 쉼표로 구분된 문자열 생성
    const lineUserCodes = approvalLine.map(user => user.userCode).join(',');
    // referenceLine에서 userCode만 추출하여 쉼표로 구분된 문자열 생성
    const rfUserCodes = referenceLine.map(user => user.userCode).join(',');
  
    // form 상태 업데이트
    setForm(prevForm => ({
      ...prevForm,
      lineUser: lineUserCodes,
      rfUser: rfUserCodes,
    }));
  }, [approvalLine, referenceLine]);
  
    const handleUserSelect = (code, actionType) => {
      // 로그인 사용자와 선택된 사용자가 동일한지 검사
      if (userDetail.userCode === code) {
        alert('기안자와 결재/참조자는 같을 수 없습니다.');
        return;
      }
  
      // 이미 결재자 또는 참조자로 지정된 사용자인지 검사
    const isAlreadySelected = [...approvalLine, ...referenceLine].some(user => user.userCode === code);
    if (isAlreadySelected) {
      alert('이미 지정된 사용자입니다.');
      return;
    }
  
      // 선택된 액션 타입을 상태로 저장
      setSelectedAction(actionType);
  
      // 사용자 상세 정보 조회
      dispatch(callGetuserDetailAPI(code));
        console.log(approvallineuser);
        
        if (actionType === 'approval') {
            setClickType('approval')
          } 
        if (actionType === 'reference') {
            setClickType('reference')
          
        }
      
    };
      
    
  
    // form 데이터 세팅    
    const onChangeHandler = (e) => {
      setForm({
          ...form,
          [e.target.name]: e.target.value
      });
    };
    // 휴가일수 계산해서 넣어주기
    useEffect(() => {
      if (form.offStart && form.offEnd) { // offStart와 offEnd가 모두 유효한 경우에만 실행
        setForm(prevForm => ({
          ...prevForm,
          offDay: getDaysDifference(form.offStart, form.offEnd) + 1,
        }));
      }
    }, [form.offStart, form.offEnd]);
  
    useEffect(()=>{
      console.log('실제로 값이 변하는지',form);
    },[form])
  
    // 결재 조직도 오픈
    const toggleContent =() =>{
      var og = document.getElementById("og");
      og.classList.toggle("active");
      }
      //결재 참조자 제거
      const deleteline = (userCode) => {
        console.log(userCode,'userName222222222222222222222222')
        setApprovalLine(approvalLine => approvalLine.filter(user => user.userCode !== userCode));      
      }
      
      const deleteline2 = (userCode) => {
        console.log(userCode,'userName111111111111111111111111111')
        setReferenceLine(referenceLine => referenceLine.filter(user => user.userCode !== userCode));
        }
        
        
    // 이미지 업로드 세팅
    const onClickImageUpload = () => {
        imageInput.current.click();
    }
  
    // 파일 업로드 핸들러
    const onFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImage(file);
        setForm(prevForm => ({
          ...prevForm,
          file: file.name,
        }));
      }
    };
        // 기안하기
      const onClickInsertDocumentHandler = () => {
        console.log('[Approval] onClickInsertDocumentHandler');
  
        const formData = new FormData();
  
        formData.append("offApplyTitle", form.offApplyTitle);
      formData.append("offStart", form.offStart);
      formData.append("offEnd", form.offEnd);
      formData.append("offDay", form.offDay);
      formData.append("offReason", form.offReason);
    
      formData.append("rfUser", form.rfUser);
      formData.append("lineUser", form.lineUser);
      formData.append("file", form.file);
      
      
        
      
        if(image){
            formData.append("file", image);
        }
      
        if(form.offApplyTitle === '' 
              || form.offStart === ''|| form.offEnd === ''|| form.offDay === ''|| form.offReason === ''||  form.lineUser === ''){
                  alert('공란을 입력해주세요.');
                  return ;
          }
        
  
      dispatch(callInsertVacationAPI({	
        form: formData
        
      }));   
      
      console.log(form, ' 기안 올린 내용');
        
        alert('결재기안이 완료 되었습니다. 전자결재 페이지로 이동 됩니다.');
        navigate('/approvalmain', { replace: true });
        
    }
    //임시 저장 onClickcallSaveGeneralDraftAPI
  
    const onClickcallSaveGeneralDraftAPI = () => {
  
      console.log('[Approval] onClickInsertDocumentHandler');
  
      const formData = new FormData();
  
      formData.append("offApplyTitle", form.offApplyTitle);
      formData.append("offStart", form.offStart);
      formData.append("offEnd", form.offEnd);
      formData.append("offDay", form.offDay);
      formData.append("offReason", form.offReason);
      
      
    
  
    
      if(form.offApplyTitle === '' 
      || form.offStart === ''|| form.offEnd === ''|| form.offDay === ''|| form.offReason === ''){
                alert('공란을 입력해주세요.');
                return ;
        }
      
  
    dispatch(callSaveVacationAPI({	
      form: formData
      
    }));   
    
    console.log(form, ' 임시기안 올린 내용');
      
      alert('임시저장이 완료 되었습니다. 전자결재 페이지로 이동 됩니다.');
      navigate('/approvalmain', { replace: true });
      
  }


    return(
        <div id="wrap">
  <section>
  <ApprovalHeader/>

      </section>
  <main>
    <div className="content">
      <div className="subject">
      <strong>신규 기안</strong>
          <div className="line">
            <div className="search_box">
              <span>
                <button onClick={toggleContent}>결재지정</button>
              </span>
              <span>
                <button onClick={onClickcallSaveGeneralDraftAPI}>임시저장</button>
              </span>
              <input
        type="file"
        ref={imageInput}
        onChange={onFileChange}
        style={{ display: 'none' }} // 시각적으로 숨김 처리
      />
              <span className='filebutton'>
                <button onClick={ onClickImageUpload }>첨부파일</button>
              </span>
          </div>
        </div>
      </div>
      <div className="select_line">
      </div>
      <div className='side'>
      <div className="wrap2">
      <div className="approval">
          <span className="texttitle">기 안</span>
          <ul className="approvalul">
              <input type='text' className="one" value={userDetail?.team?.dept?.deptName + "/" + userDetail?.team?.teamName}/>
              <li className="two">
                <img src="" alt="" />
              </li>
              <input type="text" className="three" value={userDetail?.userName}/>
              <input className="four" value={currentTimeString}/>
            </ul>
            <span className="texttitle">결 재</span>
              {approvalLine.map((approval, index) => (
                <ul className="approvalul" key={index}>
                  <input className="one" value={approval.team?.dept?.deptName + '/' + approval.team?.teamName} readOnly />
                  <input className="two"  onClick={() => deleteline(approval?.userCode)} placeholder='결재자 제거'/>
                    <input className="three" value={approval.userName} readOnly />
                    <input className="four" readOnly />
                </ul>
              ))}
              </div>
              <div className='approval'>
                <span className="texttitle">참 조</span>
                {referenceLine.map((reference, index) => (
                <ul className='approvalul' key={index}>                
                  <input className='one' value={reference.team?.dept?.deptName + '/' + reference.team?.teamName} readOnly />
                  <input className='two'  onClick={() => deleteline2(reference?.userCode)} placeholder='참조자 제거'/>
                  <input className='three' value={reference.userName} readOnly />
                  <input className='four' readOnly />                    
                </ul>
                  ))}
              </div>
        <table>
          <thead>
            <tr>
              <th className="title">
                <h1>휴가신청서</h1>
              </th>
              <th className="title" />
            </tr>
          </thead>
          <tbody className="tbtb">
            <tr>
              <td className="text">제목</td>
              <td className="inputsize">
                <input
                  type="text"
                  placeholder="제목을 입력하세요"
                  className="inputtext"
                  name='offApplyTitle'
                  value={form.offApplyTitle}
                  onChange={onChangeHandler}
                />
              </td>
            </tr>
            <tr>
              <td className="text">부서</td>
              <td className="inputsize">
                <input
                  type="text"
                  placeholder="에브리웨어"
                  className="inputtext"
                  value={userDetail?.team?.dept?.deptName + '/' + userDetail?.team?.teamName}

                />
              </td>
            </tr>
            <tr>
              <td className="text">직위/직책</td>
              <td className="inputsize">
                <input
                  type="text"
                  placeholder="직위/ 직책 자동으로 입력됩니다."
                  className="inputtext"
                  value={userDetail?.userRank}

                />
              </td>
            </tr>
            <tr>
              <td className="text">기안자명</td>
              <td className="inputsize">
                <input
                  type="text"
                  placeholder="기안자명 자동으로 입력됩니다."
                  className="inputtext"
                  value={userDetail?.userName}

                />
              </td>
            </tr>
            <tr>
              <td className="text">기안일</td>
              <td className="inputsize">
                <input
                  type="text"
                  placeholder="조직원이 기안하는 날짜가 자동으로 입력됩니다."
                  className="inputtext"
                  value={currentTimeString}

                />
              </td>
            </tr>
            <tr>
              <td className="text">남은연차</td>
              <td className="inputsize">
                <input type="text" className="inputtext1" value={(userDetail?.dayOff?.offCount) - (userDetail?.dayOff?.offUsed)}/>
              </td>
            </tr>
          </tbody>
        </table>
        <table className="selectdetail">
          <thead>
            <tr>
              <th colspan="2">휴가 기간</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="2">
                <input type="date" 
                id="start-date" 
                className="inputbox1"  
                name='offStart'
                  value={form.offStart}
                  onChange={onChangeHandler}/>
                <label htmlFor="">~</label>
                <input type="date" id="end-date" className="inputbox1" 
                name='offEnd'
                value={form.offEnd}
                onChange={onChangeHandler}/>
              </td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th>휴가 일수</th>
              <th>휴가 사유</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="hihi">
                <input
                  type="text"
                  className="inputbox"
                  placeholder="휴가 일수를 입력하세요"
                  value={(getDaysDifference(form.offStart,form.offEnd) + 1)}
                />
              </td>
              <td className="hihi">
                <input
                  type="text"
                  className="inputbox"
                  placeholder="휴가 사유를 입력하세요"
                  name='offReason'
                value={form.offReason}
                onChange={onChangeHandler}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="btn1">
          <button className="btn" onClick={onClickInsertDocumentHandler}>기안</button>
        </div>
      </div>
      <div className='og' id='og' >
        <ApprovalGroup onUserSelect={handleUserSelect} />
        </div>
      </div>
    </div>
  </main>
</div>

    )
}

export default Vacation