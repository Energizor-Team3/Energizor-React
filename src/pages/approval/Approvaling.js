import './Approvaling.css';
import {
  callApprovalingAPI
} from '../../apis/ApprovalAPICalls';
import ApprovalMainStatus from './ApprovalMainStatus';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import queryString from 'query-string';
import { useSelector, useDispatch } from 'react-redux';
import React,{ useEffect, useState } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';
import ApprovalHeader from './approvalHeader'

function Approvaling() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const approvalingstate  = useSelector((state) => state.approvalReducer);
  const approvalingstateList = approvalingstate?.data?.content;
  const [selectedDocumentCode, setSelectedDocumentCode] = useState(null);

  


  const token = decodeJwt(window.localStorage.getItem("accessToken"));  
  useEffect(()=>{
      dispatch(callApprovalingAPI());
  },[])

  console.log('approvalingstate',  approvalingstate );
  console.log('approvalingstateList',  approvalingstateList);
  

  const onClickHandler= (documentCode, form) =>{
    console.log(documentCode,'documentCode')

    switch(form){
      case"휴가신청서": navigate('/vacationform', { state: { documentCode } });
      break;
      case"교육신청서": navigate('/educationform', { state: { documentCode } });
      break;
      case"출장신청서": navigate('/businesstripform', { state: { documentCode } });
      break;
      case"기안신청서": navigate('/generaldraftform', { state: { documentCode } });
      break;
    }

  }

  // 컨텐츠 박스 표시/숨김 토글 함수
  const toggleContent = (documentCode) => {
    setSelectedDocumentCode(documentCode)
    var contentBox = document.getElementById("contentBox");
      contentBox.classList.toggle("active");
  };


    return(
        <div id="wrap">
  <section>
        <ApprovalHeader/>
      </section>
  <main>
    <div className="content">
      <div className="subject">
        <strong>진행중인 문서</strong>
        <div className="line">
          <div className="search_box">
            <input
              type="search"
              placeholder="제목,기안자,문서번호,양식명을 입력하세요."
            />
          </div>
        </div>
      </div>
      <div className="select_line">
        {/* 셀렉트 문*/}
        {/* <select name="messageLead">
          <option value="전체">전체</option>
          <option value="결재함">결재함</option>
          <option value="참조함">참조함</option>
          <option value="반려함">반려함</option>
      </select> */}
        {/* <div class="attention_Text">
        <img src="/common/Exclamation.png" alt="">
        <span>보관하지 않은 쪽지는 3개월 후 자동 삭제됩니다</span>
      </div> */}
      </div>
      <div className='approvaltable'>
      <table>
              <thead>
                <tr>
                  <th><input type="checkbox" /></th>
                  <th>분류</th>
                  <th>제목</th>
                  <th>기안자</th>
                  <th>기안일</th>
                  <th>상태</th>
                </tr>
              </thead>
              {approvalingstate  && approvalingstate .map((document) => (
                <React.Fragment key={document?.documentCode}>
                  <tbody>
                    <tr>
                      <td><input type="checkbox" value={document?.documentCode} /></td>
                      <td>{document?.form}</td>
                      <td>
                        <a href="#" onClick={(e) => {
                          e.preventDefault();
                          onClickHandler(document?.documentCode, document?.form);
                        }}>{document?.documentTitle}</a>
                      </td>
                      <td>{document?.userDTO?.userName}</td>
                      <td>{document?.draftDay}</td>
                      <td>
                        <button className="btnStatus" onClick={() => toggleContent(document?.documentCode)}>
                          진행중
                        </button>
                      </td>
                    </tr>
                   
                      <tr className="contentBox" id='contentBox'>
                        <td colSpan="6" className='cblist'  >
                          <ApprovalMainStatus documentCode={selectedDocumentCode} />
                        </td>
                      </tr>
                    
                  </tbody>
                </React.Fragment>
              ))}
            </table>
            </div>
    </div>
  </main>
</div>

    )
}

export default Approvaling;