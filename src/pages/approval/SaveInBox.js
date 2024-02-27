import  './SaveInBox.css';
import {
  callSaveInBoxAPI,
  callDeleteTempApprovalAPI
} from '../../apis/ApprovalAPICalls';

import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import queryString from 'query-string';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';
import ApprovalHeader from './approvalHeader'


    

function SaveInBox() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const SaveInBoxState  = useSelector((state) => state.approvalReducer);
  const SaveInBoxStateList = SaveInBoxState?.data?.content;

  const [selectAll, setSelectAll] = useState(false);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
   
  useEffect(()=>{
      dispatch(callSaveInBoxAPI());
      
  },[])
  

  console.log('shared',  SaveInBoxState );
  console.log('shared123',  SaveInBoxStateList);

  useEffect(() => {
    console.log('변하는값',selectedDocuments)
  },[selectedDocuments])
  

  const doubleClickHandler= (documentCode,form) =>{

    console.log(documentCode,'documentCode')

    switch(form){
      case"휴가신청서": navigate('/vacation', { state: { documentCode } });
      break;
      case"교육신청서": navigate('/education', { state: { documentCode } });
      break;
      case"출장신청서": navigate('/businesstrip', { state: { documentCode } });
      break;
      case"기안신청서": navigate('/generaldraft', { state: { documentCode } });
      break;
    }
  }

  // 맨 위의 체크박스를 처리하는 함수
  const handleSelectAll = (e) => {
    setSelectAll(e.target.checked);
    if (e.target.checked) {
      // 모든 documentCode를 선택
      const allDocumentCodes = SaveInBoxStateList.map((doc) => doc.documentCode);
      setSelectedDocuments(allDocumentCodes);
    } else {
      // 선택 해제
      setSelectedDocuments([]);
    }
  };


  // 개별 문서를 처리하는 함수
  const handleSelectDocument = (documentCode) => {
    if (selectedDocuments.includes(documentCode)) {
      setSelectedDocuments(selectedDocuments.filter(code => code !== documentCode));
    } else {
      setSelectedDocuments([...selectedDocuments, documentCode]);
    }
  };

  // SaveInBoxStateList가 변경될 때마다 selectAll 상태를 초기화합니다.
  useEffect(() => {
    setSelectAll(false);
    setSelectedDocuments([]);
  }, [SaveInBoxStateList]);

  
 const deleteTemp =() =>{
  const result = window.confirm("진행 하시겠습니까?")
    if(result){
      dispatch(callDeleteTempApprovalAPI(selectedDocuments))
      alert('삭제되었습니다.')
      window.location.reload()
    }else{
      alert('취소하셨습니다.')
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
        <strong>임시보관함</strong>
        <div className="line">
          <div className="search_box">
            
            <span>
                <button onClick={deleteTemp} >삭제</button>
              </span>
          </div>
        </div>
      </div>
      <div className="select_line">
      </div>
      <div className='approvaltables'>
        <thead>
          <tr>
            <th className='check'>
              <input type='checkbox' checked={selectAll} onChange={handleSelectAll}/>
            </th>
            <th>분류</th>
            <th>제목</th>
            <th>임시저장일</th>
          </tr>
        </thead>
        <tbody>
  {Array.isArray(SaveInBoxStateList) &&
    SaveInBoxStateList.map((document) => (
      <tr key={document?.documentCode}>
        <td><input type="checkbox" value={document?.documentCode} checked={selectedDocuments.includes(document?.documentCode)} onChange={() => handleSelectDocument(document?.documentCode)}/></td>
        <td>{document?.form}</td>
        
        <td><a href="#" onClick={(e) => { 
          e.preventDefault(); // 기본 이벤트를 방지합니다.
          doubleClickHandler(document?.documentCode, document?.form);
        }}>{document?.documentTitle}</a></td>
        <td>{document?.draftDay}</td>
      </tr>
    ))}
</tbody>
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


export default SaveInBox;