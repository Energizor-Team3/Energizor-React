import  './SharedInBox.css';
import {
    callApprovalCompleteAPI,
    callRfdocumentcompleteAPI,
    callLineDocumentCompleteAPI,
    callRejection2API
} from '../../apis/ApprovalAPICalls';

import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import queryString from 'query-string';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';
import ApprovalHeader from './approvalHeader'

    

function InBox() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const SharedInBoxState  = useSelector((state) => state.approvalReducer);
  const completeRfDocument  = useSelector((state) => state.approvalRfReducer);
  const completeLineDocument  = useSelector((state) => state.approvalLineReducer);
  const rejectionDocument  = useSelector((state) => state.approvalSubReducer);
  const SharedInBoxStateList = SharedInBoxState?.data?.content;
  const rejectionDocumentList = rejectionDocument?.data?.content;
  
  const [selected, setSelected] = useState('전체');

  
  console.log('completeRfDocument111111111111111111111111',  completeRfDocument );
  console.log('completeLineDocument111111111111111111111',  completeLineDocument );
  console.log('rejectionDocumentList111111111111111111111',  rejectionDocumentList );
  console.log('SharedInBoxStateList111111111111111111',  SharedInBoxStateList );
  


  const token = decodeJwt(window.localStorage.getItem("accessToken"));  
  useEffect(()=>{
      dispatch(callApprovalCompleteAPI())
      dispatch(callRfdocumentcompleteAPI())
      dispatch(callLineDocumentCompleteAPI())
      dispatch(callRejection2API())
  },[])

  const allDocuments = [
    ...(SharedInBoxStateList || []),
  ...(completeRfDocument || []),
  ...(completeLineDocument || []),
  ...(rejectionDocumentList || [])
  ];
  


  
  

  const onSelectChange = (e) => {
    setSelected(e.target.value); // 선택된 값으로 상태를 업데이트합니다.
  };

  
  

  const onClickHandler= (documentCode,form) =>{

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


    return (
        <div id="wrap">
  <section>
  <ApprovalHeader/>
      </section>
  <main>
    <div className="content">
      <div className="subject">
        <strong>내 문서함</strong>
        <div className="line">
          <div className="search_box">
            <input type="search" placeholder="제목,분류를 입력하세요." />
          </div>
        </div>
      </div>
      <div className="select_line">
        {/* 셀렉트 문*/}
        <select name="messageLead" value={selected} onChange={onSelectChange} >
          <option value="전체"  >전체</option>
          <option value="결재">결재함</option>
          <option value="참조">참조함</option>
          <option value="기안">기안함</option>
          <option value="반려">반려함</option>
      </select>
        {/* <div class="attention_Text">
        <img src="/common/Exclamation.png" alt="">
        <span>보관하지 않은 쪽지는 3개월 후 자동 삭제됩니다</span>
      </div> */}
      </div>
      <div className='approvaltables'>
        <thead>
          <tr>
            <th className='check'>
              <input type="checkbox" />
            </th>
            <th>분류</th>
            <th>제목</th>
            <th>기안일</th>
          </tr>
        </thead>
        {selected == "전체" &&  (
        <tbody>          
          {Array.isArray(allDocuments) &&
                    allDocuments.map((document) =>(
                        <tr key={document?.documentCode} >
                            <td><input type="checkbox" value={document?.documentCode}/></td>
              <td >{document?.form}</td>
              <td><a href="#" onClick={(e) => { 
          e.preventDefault(); // 기본 이벤트를 방지합니다.
          onClickHandler(document?.documentCode, document?.form);
        }}>{document?.documentTitle}</a></td>

              <td>{document?.draftDay}</td>
              
            </tr>
                    ))}
          </tbody>
        )}
        {selected == "기안" &&  (
        <tbody>          
          {Array.isArray(SharedInBoxStateList) &&
                    SharedInBoxStateList.map((document) =>(
                        <tr key={document?.documentCode} >
                            <td><input type="checkbox" value={document?.documentCode}/></td>
              <td >{document?.form}</td>
              <td><a href="#" onClick={(e) => { 
          e.preventDefault(); // 기본 이벤트를 방지합니다.
          onClickHandler(document?.documentCode, document?.form);
        }}>{document?.documentTitle}</a></td>

              <td>{document?.draftDay}</td>
              
            </tr>
                    ))}
          </tbody>
        )}
        {selected == "반려" &&  (
        <tbody>          
          {Array.isArray(rejectionDocumentList) &&
                    rejectionDocumentList.map((document) =>(
                        <tr key={document?.documentCode} >
                            <td><input type="checkbox" value={document?.documentCode}/></td>
              <td >{document?.form}</td>
              <td><a href="#" onClick={(e) => { 
          e.preventDefault(); // 기본 이벤트를 방지합니다.
          onClickHandler(document?.documentCode, document?.form);
        }}>{document?.documentTitle}</a></td>

              <td>{document?.draftDay}</td>
              
            </tr>
                    ))}
          </tbody>
        )}
        {selected == "참조" &&  (
        <tbody>          
          {Array.isArray(completeRfDocument) &&
                    completeRfDocument.map((document) =>(
                        <tr key={document?.documentCode} >
                            <td><input type="checkbox" value={document?.documentCode}/></td>
              <td >{document?.form}</td>
              <td><a href="#" onClick={(e) => { 
          e.preventDefault(); // 기본 이벤트를 방지합니다.
          onClickHandler(document?.documentCode, document?.form);
        }}>{document?.documentTitle}</a></td>

              <td>{document?.draftDay}</td>
              
            </tr>
                    ))}
          </tbody>
        )}
        {selected == "결재" &&  (
        <tbody>          
          {Array.isArray(completeLineDocument) &&
                    completeLineDocument.map((document) =>(
                        <tr key={document?.documentCode} >
                            <td><input type="checkbox" value={document?.documentCode}/></td>
              <td >{document?.form}</td>
              <td><a href="#" onClick={(e) => { 
          e.preventDefault(); // 기본 이벤트를 방지합니다.
          onClickHandler(document?.documentCode, document?.form);
        }}>{document?.documentTitle}</a></td>

              <td>{document?.draftDay}</td>
              
            </tr>
                    ))}
          </tbody>
        )}
        </div>
      <div id="contentBox" className="content-box">
        
        
        {/* 이미지, 텍스트 및 기타 컨텐츠 포함 가능 */}
      </div>
      <select name="page_number_choice" id="page_number_choice">
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
      </select>
      <label className="page_number_choice_text" htmlFor="page_number_choice">
        페이지당 항목수
      </label>
    </div>
  </main>
</div>

    )
}


export default InBox;