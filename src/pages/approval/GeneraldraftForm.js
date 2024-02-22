// function GeneraldraftForm(){
//     return(
//         <div className="wrap2">
//           <div className="approval">
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
//           <table>
//             <thead>
//               <tr>
//                 <th className="title">
//                   <h1>일반기안서</h1>
//                 </th>
//                 <th className="title" />
//               </tr>
//             </thead>
//             <tbody className="tbtb">
//               <tr>
//                 <td className="text">제목</td>
//                 <td className="inputsize">
//                   <input
//                     type="text"
//                     placeholder="제목을 입력하세요"
//                     className="inputtext"
//                     name='gdTitle'
//                     defaultValue={form.gdTitle}
//                     onChange={onChangeHandler}
//                   />
//                 </td>
//               </tr>
//               <tr>
//                 <td className="text">부서</td>
//                 <td className="inputsize">
//                   <input
//                     type="text"
//                     placeholder="에브리웨어"
//                     className="inputtext"
//                     value={userDetail?.team?.dept?.deptName + '/' + userDetail?.team?.teamName}
//                   />
//                 </td>
//               </tr>
//               <tr>
//                 <td className="text">직위/직책</td>
//                 <td className="inputsize">
//                   <input
//                     type="text"
//                     placeholder="직위/ 직책 자동으로 입력됩니다."
//                     className="inputtext"
//                     value={userDetail?.userRank}
//                   />
//                 </td>
//               </tr>
//               <tr>
//                 <td className="text">기안자명</td>
//                 <td className="inputsize">
//                   <input
//                     type="text"
//                     placeholder="기안자명 자동으로 입력됩니다."
//                     className="inputtext"
//                     value={userDetail?.userName}
//                   />
//                 </td>
//               </tr>
//               <tr>
//                 <td className="text">기안일</td>
//                 <td className="inputsize">
//                   <input
//                     type="text"
//                     placeholder="조직원이 기안하는 날짜가 자동으로 입력됩니다."
//                     className="inputtext"
//                     value={currentTimeString}
//                   />
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//           <table className="selectdetail">
            
//             <thead className="contenttitle">
//               <tr>
//                 <th colSpan={2} className="contenttitle">
//                   목적 및 내용
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td colSpan={2} className="hihi">
//                   <textarea
//                     cols={30}
//                     rows={10}
//                     placeholder="기안 목적 및 내용을 입력하세요"
//                     className="inputbox3"
//                     name="gdContent"
//                     defaultValue={form.gdContent}
//                     onChange={onChangeHandler}
//                   />
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//           <div className="btn1">
//             <input
//               type="file"
//               ref={imageInput}
//               onChange={onFileChange}
//               style={{ display: 'none' }} // 시각적으로 숨김 처리
//             />
//             <button className="btn" onClick={onClickInsertDocumentHandler} >기안</button> 
//           </div>
//         </div>
//     )
// }
// export default GeneraldraftForm;