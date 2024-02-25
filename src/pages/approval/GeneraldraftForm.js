import './GeneralDraft.css'
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { callSelectRfUserAPI, callSelectLineUserAPI, callSelectTempDocumentDetailAPI, callSelectUserDetailAPI, callApprovementAPI,callRejectionAPI } from '../../apis/ApprovalAPICalls';
import { printDocument } from './pdf.js';
import ApprovalHeader from './approvalHeader'


function GeneraldraftForm(){

    let formatdate,formatdate2,formatdate3;

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
  const [isLoading, setIsLoading] = useState(true);


  if (approvalDetail && Array.isArray(approvalDetail?.document?.draftDay)) {

    const formattedDate = approvalDetail.document.draftDay.map(num => String(num).padStart(2, '0'));
    
    // 배열이 정의되어 있고, 배열인 경우에만 join을 실행합니다.
    formatdate = formattedDate.join('-');
    
    

    console.log(formatdate);
    
    
  } 
  
  
  
  //시간 바꾸기
  function formatDate(dateArray) {
    if(dateArray != null){
      const date = new Date(...dateArray);
   
      const year = date.getFullYear();
      const month = (`0${date.getMonth() + 1}`).slice(-2); 
      const day = (`0${date.getDate()}`).slice(-2);
      const hour = (`0${date.getHours()}`).slice(-2);
      const minute = (`0${date.getMinutes()}`).slice(-2);
    
      
      console.log(dateArray, 'dateArray');
      return `${year}-${month}-${day} ${hour}:${minute}`;
    }
      
    
    
  }

  

  function getDaysDifference(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const difference = end - start; // 밀리초 단위의 차이
    const days = difference / (1000 * 60 * 60 * 24); // 일수로 변환
    return Math.round(days); // 소수점 아래를 반올림하여 반환
  }
  

  useEffect(() => {
    async function fetchData() {
      // 여러 데이터를 가져오는 비동기 함수들을 호출합니다.
      await dispatch(callSelectUserDetailAPI());
      await dispatch(callSelectTempDocumentDetailAPI(documentCodeData));
      await dispatch(callSelectRfUserAPI(documentCodeData));
      await dispatch(callSelectLineUserAPI(documentCodeData));
      // 데이터 로딩이 완료되면 로딩 상태를 false로 설정합니다.
      setIsLoading(false);
    }

    fetchData();
  }, [dispatch, documentCodeData]);

  
  if (isLoading) {
    return <div>Loading...</div>;
  }


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
        <ApprovalHeader/>

          </section>

      <main>
        <div className="content">
          <div className="subject">
            <strong>기안문서</strong>
            <div className="line">
              <div className="search_box">
                <span>
              {
              approvalLine.filter((line) =>
              line.user.userCode === userDetail?.userCode &&
               line.approvalLineStatus === '미결'
              ).length > 0 && (
                <button onClick={testBtn}>승인</button>
               )
              }
              </span>
              <span>{
              approvalLine.filter((line) =>
              line.user.userCode === userDetail?.userCode &&
              line.approvalLineStatus === '미결'
              ).length > 0 && (            
              <button onClick={testBtn1}>반려</button>   
              )
            }           
              </span>
              <span>
              <button onClick={() => printDocument('pdf-content')}>PDF</button>
              </span>
              </div>
            </div>
          </div>
          <div className="select_line">
          </div>
          <div className='side'>
          <div className="wrap2" id='pdf-content'>
            <div className="approval">
            <span className="texttitle">기 안</span>
          <ul className="approvalul">
              <input type='text' className="one" value={approvalDetail?.document?.userDTO?.team?.dept?.deptName + '/' + approvalDetail?.document?.userDTO?.team?.teamName} />
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
                    <input className="four" value={formatDate(approval?.processingDate)} readOnly />
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
                      value={approvalDetail?.document?.userDTO?.team?.dept?.deptName + '/' + approvalDetail?.document?.userDTO?.team?.teamName}
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
                      value={approvalDetail?.gdContent}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="btn1">
               
            </div>
          </div>
          <div className='og' id='og' >
          </div>
          </div>
          </div>
      </main>
      </div>
         );
}
export default GeneraldraftForm;