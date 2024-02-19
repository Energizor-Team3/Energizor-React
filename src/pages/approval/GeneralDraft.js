import React, { useEffect, useRef, useState } from 'react';
import './GeneralDraft.css';
import './NewApprovaling.css';
import CurrentTime from './Time';
import ApprovalGroup from './ApprovalGroup';
import { useSelector, useDispatch } from 'react-redux';
import { callSelectUserDetailAPI } from '../../apis/ApprovalAPICalls';
import { callGetuserDetailAPI } from '../../apis/GroupAPICalls';

function GeneralDraft() {
  const dispatch = useDispatch();
  const currentTimeString = CurrentTime();
  const userDetail = useSelector((state) => state.approvalReducer); // 로그인한 사용자 정보
  const approvallineuser = useSelector((state) => state.groupUserReducer); // 로그인한 사용자 정보
  const [approvalLine, setApprovalLine] = useState([]); // 결재 라인 상태
  const [referenceLine, setReferenceLine] = useState([]); // 참조 라인 상태
  const [selectedAction, setSelectedAction] = useState(null); // 'approval' 또는 'reference' 액션 선택 상태
        console.log(approvalLine, '결재라인');
        console.log(referenceLine, '참조라인');
  const approvalList = useRef([]); 
  const approvalList2 = useRef([]); 

   const [clickType, setClickType ] = useState("");    
  useEffect(() => {
    dispatch(callSelectUserDetailAPI());
    console.log(clickType, 'clickTypeaaaaaaaaaaaa');
    
    console.log('--------------', approvalList);
    if(clickType == 'approval'){
      if (approvalLine.length <= 3) {
    approvalList.current.push(approvallineuser);

    setApprovalLine(approvalList.current.filter(approval => approval?.userName !== undefined));
      }else{
        if(approvalLine.length > 3)
        alert('결재라인에는 최대 4명까지 추가할 수 있습니다.');
      }
    }else if(clickType == 'reference'){
            if (referenceLine.length <= 3) {
              approvalList2.current.push(approvallineuser);
              setReferenceLine(approvalList2.current.filter(approval => approval?.userName !== undefined));
            }
    }else {
      if(referenceLine.length > 3){
        alert('참조라인에는 최대 4명까지 추가할 수 있습니다.');
      }
    }
  }, [approvallineuser]);
  

  const handleUserSelect = (code, actionType) => {
    // 로그인 사용자와 선택된 사용자가 동일한지 검사
    if (userDetail.userCode === code) {
      alert('기안자와 결재/참조자는 같을 수 없습니다.');
      return;
    }

    // 선택된 액션 타입을 상태로 저장
    setSelectedAction(actionType);

    // 사용자 상세 정보 조회
    dispatch(callGetuserDetailAPI(code));
      console.log(approvallineuser);
      
      if (actionType === 'approval') {
          setClickType('approval')
        } 
      if (actionType === 'reference') {
          setClickType('reference')
        
      }
    
  };
  

  const [form, setForm] = useState({
    gdTitle: '',
    gdContent: '',
    rfUser: '',
    lineUser: '',
    apFileNameOrigin: '',

  });
  // const onChangeImageUpload = (e) => {

  //   const image = e.target.files[0];

  //   setImage(image);
  // };
  // const onClickImageUpload = () => {
  //   imageInput.current.click();
  // };

  // form 데이터 세팅    
  const onChangeHandler = (e) => {
    setForm({
        ...form,
        [e.target.name]: e.target.value
    });
  };

  useEffect(()=>{
    console.log('실제로 값이 변하는지',form);
  },[form])

  // 결재 조직도 오픈
  const toggleContent =() =>{
    var og = document.getElementById("og");
    og.classList.toggle("active");
    }
  
   

    // const onClickInsertDocumentHandler = () => {

    //   console.log('[Approval] onClickInsertDocumentHandler');

    //   const formData = new FormData();

    //   formData.append("gdTitle", form.gdTitle);
    // formData.append("gdContent", form.gdContent);
    // formData.append("rfUser", form.rfUser);
    // formData.append("lineUser", form.lineUser);
    // formData.append("apFileNameOrigin", form.apFileNameOrigin);

    //   if(image){
    //       formData.append("apFileNameOrigin", image);
    //   }
    //   console.log('[Approval] formData : ', formData.get("gdTitle"));
    //   console.log('[Approval] formData : ', formData.get("gdContent"));
    //   console.log('[Approval] formData : ', formData.get("rfUser"));
    //   console.log('[Approval] formData : ', formData.get("lineUser"));
    //   console.log('[Approval] formData : ', formData.get("apFileNameOrigin"));
      
    // }

      // dispatch(callProductRegistAPI({	// 상품 상세 정보 조회
      //     form: formData
      // }));        
      
      
      // alert('상품 리스트로 이동합니다.');
      // navigate('/product-management', { replace: true });
      // window.location.reload();
  // }




  // const token = decodeJwt(window.localStorage.getItem("accessToken"));  
  // useEffect(()=>{
  //     dispatch(callInsertGeneralDraftAPI());
  // },[])

  


  // const titleValueHandler = (e)=>{
  //   setTitleValue(e.target.value);
  // }
  // useEffect(()=>{
  //   console.log('실제로 값이 변하는지',titleValue);
  // },[titleValue])

    return(<div id="wrap">
  
    <section>
      <article>
        <h2>전자결재</h2>
        <div>
          <a href="/views/approval/newApproval.html">
            <button className="btn">신규기안</button>
          </a>
        </div>
        <ul className="subList">
          <li>
            <div>
              <img src="/common/Approval.png" alt="" />
              <span>
                <a href="/views/approval/approvalMain.html">결재할 문서</a>
              </span>
            </div>
          </li>
          <li className="subListText">
            <div>
              <img src="/common/Approval.png" alt="" />
              <span>
                <a href="/views/approval/approvaling.html">진행중인 문서</a>
              </span>
            </div>
          </li>
          <li>
            <div>
              <img src="/common/Mydocumentbox.png" alt="" />
              <span>
                <a href="/views/approval/mydocument.html">내 문서함</a>
              </span>
            </div>
          </li>
          <li>
            <div>
              <img src="/common/Temporarystoragebox.png" alt="" />
              <span>
                <a href="/views/approval/temporarystorage.html">임시보관함</a>
              </span>
            </div>
          </li>
          <li>
            <div>
              <img src="/common/Shareddocumentbox.png" alt="" />
              <span>
                <a href="/views/approval/sharedinbox.html">공유받은 문서함</a>
              </span>
            </div>
          </li>
        </ul>
      </article>
    </section>
    <main>
      <div className="content">
        <div className="subject">
          <strong>신규 기안</strong>
          <div className="line">
            <div className="search_box">
              <span>
                <button onClick={toggleContent}>결재</button>
              </span>
              <span>
                <button>참조</button>
              </span>
              <span>
                <button>임시저장</button>
              </span>
              <span>
                <button>첨부파일</button>
              </span>
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
          <img src="/resources/images/Exclamation.png" alt="">
          <span>보관하지 않은 쪽지는 3개월 후 자동 삭제됩니다</span>
        </div> */}
        </div>
        <div className='side'>
        <div className="wrap2">
          <div className="approval">
            <span className="texttitle">기 안</span>
            <ul className="approvalul">
              <input type='text' className="one" value={userDetail?.team?.dept?.deptName + "/" + userDetail?.team?.teamName}/>
              <li className="two">
                <img src="" alt="" />
              </li>
              <input type="text" className="three" value={userDetail?.userName}/>
              <li className="four">날짜</li>
            </ul>
            <span className="texttitle">결 재</span>

            
            <ul className="approvalul">
              <input className="one" value={approvalLine?.team?.dept?.deptName + '/'}/>
              <input className="two"/>
              <input className="three" value={0}/>
              <input className="four" value={0}/>
            </ul>
          </div>
          <table>
            <thead>
              <tr>
                <th className="title">
                  <h1>일반기안서</h1>
                </th>
                <th className="title" />
              </tr>
            </thead>
            <tbody className="tbtb">
              <tr>
                <td className="text">제목</td>
                <td className="inputsize">
                  <input
                    type="text"
                    placeholder="제목을 입력하세요"
                    className="inputtext"
                    name='gdTitle'
                    value={form.gdTitle}
                    onChange={onChangeHandler}
                  />
                </td>
              </tr>
              <tr>
                <td className="text">부서</td>
                <td className="inputsize">
                  <input
                    type="text"
                    placeholder="에브리웨어"
                    className="inputtext"
                    value={userDetail?.team?.dept?.deptName + '/' + userDetail?.team?.teamName}
                  />
                </td>
              </tr>
              <tr>
                <td className="text">직위/직책</td>
                <td className="inputsize">
                  <input
                    type="text"
                    placeholder="직위/ 직책 자동으로 입력됩니다."
                    className="inputtext"
                    value={userDetail?.userRank}
                  />
                </td>
              </tr>
              <tr>
                <td className="text">기안자명</td>
                <td className="inputsize">
                  <input
                    type="text"
                    placeholder="기안자명 자동으로 입력됩니다."
                    className="inputtext"
                    value={userDetail?.userName}
                  />
                </td>
              </tr>
              <tr>
                <td className="text">기안일</td>
                <td className="inputsize">
                  <input
                    type="text"
                    placeholder="조직원이 기안하는 날짜가 자동으로 입력됩니다."
                    className="inputtext"
                    value={currentTimeString}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <table className="selectdetail">
            
            <thead className="contenttitle">
              <tr>
                <th colSpan={2} className="contenttitle">
                  목적 및 내용
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={2} className="hihi">
                  <textarea
                    name=""
                    id=""
                    cols={30}
                    rows={10}
                    placeholder="기안 목적 및 내용을 입력하세요"
                    className="inputbox3"
                    defaultValue={""}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="btn1">
             <button className="btn" >기안</button> {/*onClick={onClickInsertDocumentHandler} */}
          </div>
        </div>
        <div className='og' id='og' >
        <ApprovalGroup onUserSelect={handleUserSelect} />
        </div>
        </div>
        </div>
    </main>
    </div>
       );
    }
    
    export default GeneralDraft;