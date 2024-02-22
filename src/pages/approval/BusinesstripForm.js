// function BusinesstripForm(){
//     return(
//         <div className="wrap2">
//       <div className="approval">
//             <span className="texttitle">기 안</span>
//             <ul className="approvalul">
//               <input type='text' className="one" value={userDetail?.team?.dept?.deptName + "/" + userDetail?.team?.teamName}/>
//               <li className="two">
//                 <img src="" alt="" />
//               </li>
//               <input type="text" className="three" value={userDetail?.userName}/>
//               <input className="four" value={currentTimeString}/>
//             </ul>
//             <span className="texttitle">결 재</span>
//               {approvalLine.map((approval, index) => (
//                 <ul className="approvalul" key={index}>
//                   <input className="one" value={approval.team?.dept?.deptName + '/' + approval.team?.teamName} readOnly />
//                   <input className="two"  onClick={() => deleteline(approval?.userCode)} placeholder='결재자 제거'/>
//                     <input className="three" value={approval.userName} readOnly />
//                     <input className="four" readOnly />
//                 </ul>
//               ))}
//               </div>
//               <div className='approval'>
//                 <span className="texttitle">참 조</span>
//                 {referenceLine.map((reference, index) => (
//                 <ul className='approvalul' key={index}>                
//                   <input className='one' value={reference.team?.dept?.deptName + '/' + reference.team?.teamName} readOnly />
//                   <input className='two'  onClick={() => deleteline2(reference?.userCode)} placeholder='참조자 제거'/>
//                   <input className='three' value={reference.userName} readOnly />
//                   <input className='four' readOnly />                    
//                 </ul>
//                   ))}
//               </div>
//         <div className='businesstable'>
//           <thead>
//             <tr>
//               <th className="title">
//                 <h1>출장신청서</h1>
//               </th>
//               <th className="title" />
//             </tr>
//           </thead>
//           <tbody className="tbtb">
//             <tr>
//               <td className="text">제목</td>
//               <td className="inputsize">
//                 <input
//                   type="text"
//                   placeholder="제목을 입력하세요"
//                   className="inputtext"
//                   name='btTitle'
//                   defaultValue={form.btTitle}
//                   onChange={onChangeHandler}
//                 />
//               </td>
//             </tr>
//             <tr>
//               <td className="text">부서</td>
//               <td className="inputsize">
//                 <input
//                   type="text"
//                   placeholder="에브리웨어"
//                   className="inputtext"
//                   value={userDetail?.team?.dept?.deptName + '/' + userDetail?.team?.teamName}
//                 />
//               </td>
//             </tr>
//             <tr>
//               <td className="text">직위/직책</td>
//               <td className="inputsize">
//                 <input
//                   type="text"
//                   placeholder="직위/ 직책 자동으로 입력됩니다."
//                   className="inputtext"
//                   value={userDetail?.userRank}
//                 />
//               </td>
//             </tr>
//             <tr>
//               <td className="text">기안자명</td>
//               <td className="inputsize">
//                 <input
//                   type="text"
//                   placeholder="기안자명 자동으로 입력됩니다."
//                   className="inputtext"
//                   value={userDetail?.userName}
//                 />
//               </td>
//             </tr>
//             <tr>
//               <td className="text">기안일</td>
//               <td className="inputsize">
//                 <input
//                   type="text"
//                   placeholder="조직원이 기안하는 날짜가 자동으로 입력됩니다."
//                   className="inputtext"
//                   value={currentTimeString}
//                 />
//               </td>
//             </tr>
//             <tr>
//               <td className="text">출장 일수 합계</td>
//               <td className="inputsize">
//                 <input type="text" className="inputtext1" defaultValue="0일" />
//               </td>
//             </tr>
//           </tbody>
//         </div>
//         <table className="selectdetail">
//           <thead>
//             <tr>
//               <th>출장자</th>
//               <th>출장 기간</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>
//                 <input
//                   type="text"
//                   className="inputbox"
//                   value={userDetail?.userName}
//                 />
//               </td>
//               <td>
//                 <input type="date" id="start-date" className="inputbox55" name='btStart' onChange={onChangeHandler} value={form.btStart}/>
//                 <label htmlFor="">~</label>
//                 <input type="date" id="end-date" className="inputbox55" name='btFinish' onChange={onChangeHandler} value={form.btFinish}/>
//               </td>
//             </tr>
//           </tbody>
//           <thead>
//             <tr>
//               <th>출장지 연락처 </th>
//               <th>출장 지역</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td className="hihi2">
//                 <input
//                   type="text"
//                   className="inputbox"
//                   placeholder="출장지 연락처"
//                   name='btPhone'
//                   value={form.btPhone}
//                   onChange={onChangeHandler}
//                 />
//               </td>
//               <td className="hihi2">
//                 <input
//                   type="text"
//                   className="inputbox"
//                   placeholder="출장지역"
//                   name="btPlace"
//                   value={form.btPlace}
//                   onChange={onChangeHandler}
//                 />
//               </td>
//             </tr>
//           </tbody>
//           <thead className="contenttitle">
//             <tr>
//               <th colSpan={2} className="contenttitle">
//                 목적 및 내용
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td colSpan={2} className="hihi">
//                 <textarea
//                   id=""
//                   cols={30}
//                   rows={10}
//                   placeholder="출장 목적 및 내용을 입력하세요"
//                   className="inputbox2"
//                   name="btContent"
//                   defaultValue={form.btContent}
//                   onChange={onChangeHandler}
//                 />
//               </td>
//             </tr>
//           </tbody>
//         </table>
//         <div className="btn1">
//           <button className="btn" onClick={onClickInsertDocumentHandler}>기안</button>
//         </div>
//       </div>
//     )
// }
// export default BusinesstripForm;