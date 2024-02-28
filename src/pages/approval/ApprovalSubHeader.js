import {
    callInboxApprovalHeaderAPI,callTotalDocumentAPI,callTotalDocumentProceedingAPI
  } from '../../apis/ApprovalAPICalls';
  import { useSelector, useDispatch } from 'react-redux';
  import React,{ useEffect, useState } from 'react';
  import './ApprovalSubHeader.css'
  
  function ApprovalSubHeader(){
  
    
    const dispatch = useDispatch();
    const inboxDocumentHeader  = useSelector((state) => state.approvalHeaderReducer || []);
    const totaldocumentproceeding  = useSelector((state) => state.approvaltotaldocumentReducer);
    const totalInbox  = useSelector((state) => state.approvalLineReducer);
    const [isLoading, setIsLoading] = useState(true);

    
  
    
  
    
    console.log('inboxDocumentHeader',  inboxDocumentHeader.length );
    console.log('기안한 문서중 진행중인 문서 들어왔냐',  totaldocumentproceeding );
    console.log('totalInbox',  totalInbox );
    
    
    
    
    

    useEffect(() => {
      async function fetchData() {
        dispatch(callInboxApprovalHeaderAPI());
      
        dispatch(callTotalDocumentAPI())
        dispatch(callTotalDocumentProceedingAPI())
      setIsLoading(false);
    }
    fetchData();
    },[dispatch])
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
  
    
    
      return(
        <>

        <div className="stats-box">
        <div className="stat-item">
          <div className="stat-label"><a href="./approvalmain">결재 대기</a></div>
          <div className="stat-value"><a href="./approvalmain">{inboxDocumentHeader?.length}</a></div>
        </div>
        <div className="stat-item">
          <div className="stat-label"><a href="/approvaling">결재 진행</a></div>
          <div className="stat-value"><a href="/approvaling">{totaldocumentproceeding}</a></div>
        </div>
        <div className="stat-item">
          <div className="stat-label"><a href="/inbox">내문서함</a></div>
          <div className="stat-value"><a href="/inbox">{totalInbox}</a></div>
        </div>
      </div>
          
            
            </>
      )
  }
  
  export default ApprovalSubHeader;
  
  