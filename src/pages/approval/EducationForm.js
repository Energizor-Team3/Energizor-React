import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { callSelectRfUserAPI, callSelectLineUserAPI, callSelectTempDocumentDetailAPI, callSelectUserDetailAPI, callApprovementAPI,callRejectionAPI } from '../../apis/ApprovalAPICalls';



function EducationForm(){
  let formatdate,formatdate2,formatdate3, Date1;

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const documentCodeData = location.state?.documentCode;
  console.log(documentCodeData, 'documentCodeData');
  const approvalLine = useSelector((state) => state.approvalLineReducer); // 겱재자
  const approvalRf = useSelector((state) => state.approvalRfReducer); //참조자
  const approvalDetail = useSelector((state) => state.approvalSubReducer);// 문서 상세 정보
  const userDetail = useSelector((state) => state.approvalReducer); // 로그인한 사용자 정보
  console.log(approvalLine, 'approvalLine');
  console.log(approvalRf, 'approvalRf');
  console.log(approvalDetail, 'approvalDetail');
  console.log(userDetail, 'userDetail');


  if (approvalDetail && Array.isArray(approvalDetail?.document?.draftDay)) {

    const formattedDate = approvalDetail.document.draftDay.map(num => String(num).padStart(2, '0'));
    const formattedDate2 = approvalDetail.eduStart.map(num => String(num).padStart(2, '0'));
    const formattedDate3 = approvalDetail.eduFinish.map(num => String(num).padStart(2, '0'));
    
    
    // 배열이 정의되어 있고, 배열인 경우에만 join을 실행합니다.
    formatdate = formattedDate.join('-');
    formatdate2 = formattedDate2.join('-');
    formatdate3 = formattedDate3.join('-');
    

    console.log(formatdate);
    console.log(formatdate2);
    console.log(formatdate3);
    
  } 
  
  
  

  //시간 바꾸기
  function formatDate(dateArray) {
    if(approvalLine && Array.isArray(approvalLine?.approvalLineStatus)){
    
    }
    
    const date = new Date(...dateArray);
   
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2); 
    const day = (`0${date.getDate()}`).slice(-2);
    const hour = (`0${date.getHours()}`).slice(-2);
    const minute = (`0${date.getMinutes()}`).slice(-2);
  
    
    return `${year}-${month}-${day} ${hour}:${minute}`;
  }

  

  function getDaysDifference(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const difference = end - start; // 밀리초 단위의 차이
    const days = difference / (1000 * 60 * 60 * 24); // 일수로 변환
    return Math.round(days); // 소수점 아래를 반올림하여 반환
  }
  

  useEffect(() => {
    dispatch(callSelectUserDetailAPI());
    dispatch(callSelectTempDocumentDetailAPI(documentCodeData));
    dispatch(callSelectRfUserAPI(documentCodeData));
    dispatch(callSelectLineUserAPI(documentCodeData));
  },[])

  const testBtn = () =>{
    const result = window.confirm("진행 하시겠습니까?")
    if(result){
      dispatch(callApprovementAPI(documentCodeData))
      alert('승인하셨습니다 결재페이지로 이동합니다.')
      navigate('/approvalmain', { replace: true });
    }else{
      alert('취소하셨습니다.')
    }
  }
  const testBtn1 = () =>{
    const result = window.confirm("진행 하시겠습니까?")
    if(result){
      alert('반려하셨습니다 결재페이지로 이동합니다.')
      dispatch(callRejectionAPI(documentCodeData))
      navigate('/approvalmain', { replace: true });
    }else{
      alert('취소하셨습니다.')
    }
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
      <ul className="sub_list">
        <li>
          <div>
            <img src="/common/Approval.png" alt="" />
            <span>
              <a href="/views/approval/approvalMain.html">결재할 문서</a>
            </span>
          </div>
        </li>
        <li className="sub_list_text">
          <div>
            <img src="/common/Approval.png" alt="" />
            <span>
              <a href="/views/approval/approvaling.html">진행중인 문서</a>
            </span>
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
      <strong>기안서</strong>
          <div className="line">
            <div className="search_box">
              <span>
              {/* {userRole === 'admin' && ()} */}
              <button onClick={testBtn}>승인</button>
              </span>
              <span>              
              <button onClick={testBtn1}>반려</button>              
              </span>
              <span>
              <button>PDF</button>
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
              <input type='text' className="one" value={approvalDetail?.document?.userDTO?.team?.dept?.deptName + '/' +approvalDetail?.document?.userDTO?.team?.teamName} />
              <li className="two"><img src="/Approvalimage/approvalstamp.png" style={{width:"70px"}} alt="승인 도장" /></li>
              <input type="text" className="three" value={approvalDetail?.document?.userDTO?.userName}/>
              <input className="four"  value={formatdate} />
            </ul>
            <span className="texttitle">결 재</span>
              {approvalLine.map((approval, index) => (
                <ul className="approvalul" key={index}>
                  <input className="one" value={approval?.user?.team?.dept?.deptName + '/' + approval.user?.team?.teamName} readOnly />
                  <li className="two" >{
    approval?.approvalLineStatus === '미결' ? (
      <span>미결</span>
    ) : approval?.approvalLineStatus === '결재' ? (
      <img src="/Approvalimage/approvalstamp.png" style={{width: "70px"}} alt="승인 도장" />
    ) : approval?.approvalLineStatus === '반려' ? (
      <span>반려</span>
    ) : null
  }</li>
                    <input className="three" value={approval?.user?.userName } readOnly />
                    <input className="four" value={approval?.processingDate} readOnly />
                </ul>
              ))}
              </div>
              <div className='approval'>
                <span className="texttitle">참 조</span>
                {approvalRf.map((reference, index) => (
                <ul className='approvalul' key={index}>                
                  <input className='one' value={reference?.user?.team?.dept?.deptName + '/' + reference.user?.team?.teamName} readOnly />
                  <input className='two'   />
                  <input className='three' value={reference?.user?.userName} readOnly />
                  <input className='four' readOnly />                    
                </ul>
                  ))}
              </div>
        <table>
          <thead>
            <tr>
              <th className="title">
                <h1>교육신청서</h1>
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
                  name='eduTitle'
                  value={approvalDetail?.document?.documentTitle}
                 
                  
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
                  value={approvalDetail?.document?.userDTO?.team?.dept?.deptName}
                 
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
                  value={approvalDetail?.document?.userDTO?.userRank}
                  

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
                  value={approvalDetail?.document?.userDTO?.userName}
                  
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
                  value={formatdate}
                  
                />
              </td>
            </tr>
            <tr>
              <td className="text">교육 일수 </td>
              <td className="inputsize">
                <input type="text" className="inputtext1" value={getDaysDifference(formatdate2,formatdate3)+ 1} />
              </td>
            </tr>
          </tbody>
        </table>
        <table className="selectdetail">
          <thead>
            <tr>
              <th>교육명</th>
              <th>교육 기간</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  className="inputbox"
                  placeholder="교육명을 입력하세요"
                  name="eduName"
                  value={approvalDetail?.eduName}
                  
                />
              </td>
              <td>
                <input type="date" id="start-date" className="inputbox44"   name="eduStart" value={formatdate2} />
                <label htmlFor="">~</label>
                <input type="date" id="end-date" className="inputbox44"  name="eduFinish" value={formatdate3} />
              </td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th>교육기관</th>
              <th>교육비</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="hihi2">
                <input
                  type="text"
                  className="inputbox"
                  placeholder="교육기관을 입력하세요"
                  name="eduInstitution"
                  value={approvalDetail?.eduInstitution}
                  
                />
              </td>
              <td className="hihi2">
                <input
                  type="text"
                  className="inputbox"
                  placeholder="교육비를 입력하세요"
                  name="eduPrice"
                  value={approvalDetail?.eduPrice}
                  
                />
              </td>
            </tr>
          </tbody>
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
                  
                  id=""
                  cols={30}
                  rows={10}
                  placeholder="교육 목적 및 내용을 입력하세요"
                  className="inputbox2"
                  name="eduContent"
                  value={approvalDetail?.eduContent}
                  
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='og' id='og' >
        
        </div>
      </div>
    </div>
  </main>
</div>
        
    )
}
export default EducationForm;