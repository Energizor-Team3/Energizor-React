import './Approvaling.css';
import {
  callApprovalingAPI, callRfDocumentAPI, callLineDocumentAPI
} from '../../apis/ApprovalAPICalls';
import ApprovalMainStatus from './ApprovalMainStatus';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React,{ useEffect, useState } from 'react';
import ApprovalHeader from './approvalHeader'

function Approvaling() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const approvalingstate  = useSelector((state) => state.approvalReducer);
  const rfdocument  = useSelector((state) => state.approvalRfReducer);
  const linedocument  = useSelector((state) => state.approvalLineReducer);
  const approvalingstateList = approvalingstate?.data?.content;
  const [selectedDocumentCode, setSelectedDocumentCode] = useState(null);
  const [selected, setSelected] = useState('전체');


  const allDocuments = [
    ...(approvalingstate || []),
  ...(linedocument || []),
  ...(rfdocument || [])
  ];

 
  useEffect(()=>{
      dispatch(callApprovalingAPI());
      dispatch(callRfDocumentAPI());
      dispatch(callLineDocumentAPI());
  },[])

  console.log('approvalingstate',  approvalingstate );
  console.log('approvalingstateList',  approvalingstateList);
  console.log('rfdocument',  rfdocument);
  console.log('linedocument',  linedocument);
  

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

  const onSelectChange = (e) => {
    setSelected(e.target.value); // 선택된 값으로 상태를 업데이트합니다.
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
      <select name="messageLead" value={selected} onChange={onSelectChange} >
          <option value="전체"  >전체</option>
          <option value="결재">결재함</option>
          <option value="참조">참조함</option>
          <option value="기안">기안함</option>
      </select>
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
              {selected == "전체" &&  (
                <tbody>
                {allDocuments  && allDocuments .map((document) => (
                  <React.Fragment key={document?.documentCode}>
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
                    
                      </React.Fragment>
            ))}
                </tbody>
              )}
              {selected == "기안" &&  (
                <tbody>
                {approvalingstate  && approvalingstate .map((document) => (
                  <React.Fragment key={document?.documentCode}>
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
                    
                      </React.Fragment>
            ))}
                </tbody>
              )}
              {selected == "참조" &&  (
                <tbody>
                {rfdocument  && rfdocument .map((document) => (
                  <React.Fragment key={document?.documentCode}>
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
                    
                      </React.Fragment>
            ))}
                </tbody>
              )}
              {selected == "결재" &&  (
                <tbody>
                {linedocument  && linedocument .map((document) => (
                  <React.Fragment key={document?.documentCode}>
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
                    
                      </React.Fragment>
            ))}
                </tbody>
              )}
          </table>
        </div>
    </div>
  </main>
</div>

    )
}

export default Approvaling;