import React, { useEffect, useRef, useState } from 'react';
import './GeneralDraft.css';
import './NewApprovaling.css';
import CurrentTime from './Time';
import ApprovalGroup from './ApprovalGroup';
import { useSelector, useDispatch } from 'react-redux';
import { callSelectUserDetailAPI, callInsertGeneralDraftAPI, callSaveGeneralDraftAPI, callSelectTempDocumentDetailAPI} from '../../apis/ApprovalAPICalls';

import { callGetuserDetailAPI } from '../../apis/GroupAPICalls';
import { useNavigate, useLocation } from 'react-router-dom';


function GeneralDraft() {

  const location = useLocation();
  const documentCodeData = location.state?.documentCode;
 
  const tempDocument = useSelector((state) => state.approvalSubReducer); 
  

 
  

  // 조회해온 임시저장문서 가 있을경우 진행
  useEffect(() => {
    if (tempDocument !== undefined) { 
      setForm(prevForm => ({
        ...prevForm,
        gdTitle: tempDocument.gdTitle,
        gdContent: tempDocument.gdContent,
    }));
    }
  }, [tempDocument]);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentTimeString = CurrentTime();
  const userDetail = useSelector((state) => state.approvalReducer); // 로그인한 사용자 정보
  const approvallineuser = useSelector((state) => state.groupUserReducer); // 로그인한 사용자 정보
  const [approvalLine, setApprovalLine] = useState([]); // 결재 라인 상태
  const [referenceLine, setReferenceLine] = useState([]); // 참조 라인 상태
  const [selectedAction, setSelectedAction] = useState(null); // 'approval' 또는 'reference' 액션 선택 상태
  const [clickType, setClickType] = useState("") 
  const [image, setImage] = useState(null);
  const imageInput = useRef(); 

  const [form, setForm] = useState({
    gdTitle: '',
    gdContent: '',
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

    const onClickInsertDocumentHandler = () => {

      console.log('[Approval] onClickInsertDocumentHandler');

      const formData = new FormData();

      formData.append("gdTitle", form.gdTitle);
    formData.append("gdContent", form.gdContent);
    formData.append("rfUser", form.rfUser);
    formData.append("lineUser", form.lineUser);
    formData.append("file", form.file);

      if(image){
          formData.append("file", image);
      }
    
      if(form.gdTitle === '' || form.gdContent === '' 
            || form.lineUser === ''){
                alert('정보를 다 입력해주세요.');
                return ;
        }
      

    dispatch(callInsertGeneralDraftAPI({	
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

    formData.append("gdTitle", form.gdTitle);
    formData.append("gdContent", form.gdContent);
  

  
    if(form.gdTitle === '' || form.gdContent === '' 
          ){
              alert('최소 하나의 정보를 입력해주세요.');
              return ;
      }
    

  dispatch(callSaveGeneralDraftAPI({	
    form: formData
    
  }));   
  
  console.log(form, ' 임시기안 올린 내용');
    
    alert('임시저장이 완료 되었습니다. 전자결재 페이지로 이동 됩니다.');
    navigate('/approvalmain', { replace: true });
    
}


    return(
    <div id="wrap">
      <section>
      <article>
        <h2>전자결재</h2>
        <div>
          <a href="/views/approval/newApproval.html">
            <button className="btn">신규기안</button>
          </a>
        </div>
        <ul className="subList">
          <li>
            <div>
              <img src="/common/Approval.png" alt="" />
              <span>
                <a href="/approval/approvalMain.html">결재할 문서</a>
              </span>
              <span className="listlist">1</span>
            </div>
          </li>
          <li className="subListText">
            <div>
              <img src="/common/Approval.png" alt="" />
              <span>
                <a href="/views/approval/approvaling.html">진행중인 문서</a>
              </span>
              <span className="listlist1">1</span>
            </div>
          </li>
          <li>
            <div>
              <img src="/common/Mydocumentbox.png" alt="" />
              <span>
                <a href="/views/approval/mydocument.html">내 문서함</a>
              </span>
            </div>
          </li>
          <li>
            <div>
              <img src="/common/Temporarystoragebox.png" alt="" />
              <span>
                <a href="/views/approval/temporarystorage.html">임시보관함</a>
              </span>
            </div>
          </li>
          <li>
            <div>
              <img src="/common/Shareddocumentbox.png" alt="" />
              <span>
                <a href="/views/approval/sharedinbox.html">공유받은 문서함</a>
              </span>
            </div>
          </li>
        </ul>
      </article>
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
              <span>
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
                  <h1>일반기안서</h1>
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
                    name='gdTitle'
                    defaultValue={form.gdTitle}
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
            </tbody>
          </table>
          <table className="selectdetail">
            
            <thead className="contenttitle">
              <tr>
                <th colSpan={2} className="contenttitle">
                  목적 및 내용
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={2} className="hihi">
                  <textarea
                    cols={30}
                    rows={10}
                    placeholder="기안 목적 및 내용을 입력하세요"
                    className="inputbox3"
                    name="gdContent"
                    defaultValue={form.gdContent}
                    onChange={onChangeHandler}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="btn1">
            <input
              type="file"
              ref={imageInput}
              onChange={onFileChange}
              style={{ display: 'none' }} // 시각적으로 숨김 처리
            />
            <button className="btn" onClick={onClickInsertDocumentHandler} >기안</button> 
          </div>
        </div>
        <div className='og' id='og' >
        <ApprovalGroup onUserSelect={handleUserSelect} />
        </div>
        </div>
        </div>
    </main>


    </div>
        );
    }
    
    export default GeneralDraft;