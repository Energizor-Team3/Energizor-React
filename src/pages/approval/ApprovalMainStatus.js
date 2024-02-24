import {callSelectLineUserAPI} from '../../apis/ApprovalAPICalls'
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';




export default function ApprovalMainStatus(props){
    const { documentCode } = props;
    const dispatch = useDispatch();
    console.log(documentCode);
    
    const approvalLine = useSelector((state) => state.approvalLineReducer); // 겱재자
    console.log(approvalLine, 'approvalLine');


    useEffect(() => {
        if(documentCode){
            dispatch(callSelectLineUserAPI(documentCode));

        }
      },[documentCode])



    
    
    return(
        <div className="ctbox" >
          <div className="statustitle">
            <span>결재 현황</span>
            <span>{'['+approvalLine[0]?.document?.documentTitle + ']'}</span>
          </div>
          <div className="profile2" >
            <ul className="profileBox" >
              <li>
                <img
                  className="profileimg"
                  alt=""
                  src={approvalLine[0]?.document?.userDTO?.profilePath}
                />
              </li>
              <li>
                <ul className="pftext">
                  <li>{approvalLine[0]?.document?.userDTO?.userName}</li>
                  <li>{approvalLine[0]?.document?.userDTO?.team?.dept?.deptName + '/' + approvalLine[0]?.document?.userDTO?.team?.teamName}</li>
                  <li className="pfinsideStatus">기안자</li>
                </ul>
              </li>
            </ul>
            {approvalLine.map((line, index) => (
            <ul className="profileBox"  key={index}>
              <li>
                <img
                  className="profileimg"
                  alt=""
                  src={line?.user?.profilePath}
                />
              </li>
              <li>
                <ul className="pftext">
                  <li>{line?.user?.userName}</li>
                  <li>{line?.user?.team?.dept?.deptName + '/' + line?.user?.team?.teamName}</li>
                  <li className={line?.approvalLineStatus === '미결' ? 'pfinsideStatus1' : 'pfinsideStatus'}>{line?.approvalLineStatus}</li>
                </ul>
              </li>
            </ul>
            ))}
            
             
          </div>
          {/* 이미지, 텍스트 및 기타 컨텐츠 포함 가능 */}
        </div>
    )
}

