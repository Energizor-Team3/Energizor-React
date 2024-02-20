import  './SaveInBox.css';
import {
  callSaveInBoxAPI,
  callInsertBySelectTempDocumentAPI
} from '../../apis/ApprovalAPICalls';

import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import queryString from 'query-string';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';

    

function SaveInBox() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const SaveInBoxState  = useSelector((state) => state.approvalReducer);
  const SaveInBoxStateList = SaveInBoxState?.data?.content;
   
  useEffect(()=>{
      dispatch(callSaveInBoxAPI());
  },[])
  

  console.log('shared',  SaveInBoxState );
  console.log('shared123',  SaveInBoxStateList);
  

  const doubleClickHandler= (documentCode,form) =>{

    console.log(documentCode,'documentCode')

    switch(form){
      case"휴가신청서": navigate('/vacation', { state: { documentCode } });
      break;
      case"교육신청서": navigate('/businesstrip', { state: { documentCode } });
      break;
      case"출장신청서": navigate('/education', { state: { documentCode } });
      break;
      case"기안신청서": navigate('/generaldraft', { state: { documentCode } });
      break;
    }
  }


    return (
        <div id="wrap">
  <section>
    <article>
      <h2>전자결재</h2>
      <div>
        <a href="/views/approval/newApproval.html/">
          <button className="btn">신규기안</button>
        </a>
      </div>
      <ul className="sub_list">
        <li>
          <div>
            <img src="/common/Approval.png" alt="" />
            <span>
              <a href="/views/approval/approvalMain.html/">결재할 문서</a>
            </span>
          </div>
        </li>
        <li className="sub_list_text">
          <div>
            <img src="/common/Approval.png" alt="" />
            <span>
              <a href="/views/approval/approvaling.html/">진행중인 문서</a>
            </span>
          </div>
        </li>
        <li>
          <div>
            <img src="/common/Mydocumentbox.png" alt="" />
            <span>
              <a href="/views/approval/mydocument.html/">내 문서함</a>
            </span>
          </div>
        </li>
        <li>
          <div>
            <img src="/common/Temporarystoragebox.png" alt="" />
            <span>
              <a href="/views/approval/temporarystorage.html/">임시보관함</a>
            </span>
          </div>
        </li>
        <li>
          <div>
            <img src="/common/Shareddocumentbox.png" alt="" />
            <span className="textcolor">
              <a href="/views/approval/sharedinbox.html/">공유받은 문서함</a>
            </span>
          </div>
        </li>
      </ul>
    </article>
  </section>
  <main>
    <div className="content">
      <div className="subject">
        <strong>임시보관함</strong>
        <div className="line">
          <div className="search_box">
            <input type="search" placeholder="제목,분류를 입력하세요." />
          </div>
        </div>
      </div>
      <div className="select_line">
      </div>
      <div className='approvaltables'>
        <thead>
          <tr>
            <th className='check'>
              <input type="checkbox" />
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
        <td><input type="checkbox" value={document?.documentCode}/></td>
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
      <div id="contentBox" className="content-box">
        <div className="statustitle">
          <span>결재 현황</span>
          <span>[개발 1팀] 연차사용 신청서</span>
        </div>
        <div className="profile">
          <ul className="profileBox">
            <li>
              <img
                className="profileimg"
                alt=""
                src="/common/profileimg1.png"
              />
            </li>
            <li>
              <ul className="text">
                <li>[사원 이준희]</li>
                <li>개발본부/개발1팀</li>
                <li className="insideStatus">기안자</li>
              </ul>
            </li>
          </ul>
          <ul className="profileBox">
            <li>
              <img
                className="profileimg"
                alt=""
                src="/common/profileimg1.png"
              />
            </li>
            <li>
              <ul className="text">
                <li>[팀장 장재영]</li>
                <li>개발본부/개발1팀</li>
                <li className="insideStatus">결재</li>
              </ul>
            </li>
          </ul>
          <ul className="profileBox">
            <li>
              <img
                className="profileimg"
                alt=""
                src="/common/profileimg1.png"
              />
            </li>
            <li>
              <ul className="text">
                <li>[본부장 우지선]</li>
                <li>개발본부/개발본부</li>
                <li className="insideStatus">결재</li>
              </ul>
            </li>
          </ul>
          <ul className="profileBox">
            <li>
              <img
                className="profileimg"
                alt=""
                src="/common/profileimg1.png"
              />
            </li>
            <li>
              <ul className="text">
                <li>[사장 축온청]</li>
                <li>경영본부/경영본부</li>
                <li className="insideStatus1">미결</li>
              </ul>
            </li>
          </ul>
          <ul className="profileBox">
            <li>
              <img
                className="profileimg"
                alt=""
                src="/common/profileimg1.png"
              />
            </li>
            <li>
              <ul className="text">
                <li>[대장 김수연]</li>
                <li>경영본부/경영본부</li>
                <li className="insideStatus1">미결</li>
              </ul>
            </li>
          </ul>
        </div>
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


export default SaveInBox;