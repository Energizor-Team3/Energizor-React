import  './ApprovalMain.css';
import {
    callInboxApprovalAPI
} from '../../apis/ApprovalAPICalls';

import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import queryString from 'query-string';
import { useSelector, useDispatch } from 'react-redux';
import React,{ useEffect, useState } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';
import ApprovalHeader from './approvalHeader'
import ApprovalMainStatus from './ApprovalMainStatus'




function ApprovalMain(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const inboxDocument  = useSelector((state) => state.approvalReducer);
    const inboxDocumentList = inboxDocument?.data?.content;  
    const [selectedDocumentCode, setSelectedDocumentCode] = useState(null);

    const onClickHandler = (documentCode, form) => {
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
    
    //   // 새 창에서 열 문서에 대한 URL을 구성합니다.
    //   const urlToOpen = `${baseURL}${path}?documentCode=${documentCode}`;
    
    //   // 새 창(또는 탭)을 엽니다.
    //   window.open(urlToOpen, '_blank');
    // }

    const token = decodeJwt(window.localStorage.getItem("accessToken"));  
    useEffect(()=>{
        dispatch(callInboxApprovalAPI());
    },[])

    console.log('inbox',  inboxDocument );
    console.log('inbox list', inboxDocumentList);
    

   


    const toggleContent = (documentCode) => {
      setSelectedDocumentCode(documentCode)
      var contentBox = document.getElementById("contentBox");
        contentBox.classList.toggle("active");
    };
 


    return(
      <div id="wrap">
      <section>
        <ApprovalHeader />
      </section>
      <main>
        <div className="content">
          <div className="subject">
            <strong>결재할 문서</strong>
            <div className="line">
              <div className="search_box">
                <input type="search" placeholder="제목,기안자,양식명을 입력하세요." />
              </div>
            </div>
          </div>
          <div className="select_line"></div>
          <div className="approvaltable">
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
              {inboxDocument && inboxDocument.map((document) => (
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
  );
}

export default ApprovalMain;