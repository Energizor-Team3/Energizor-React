import  './GeneralDraft.css';
import  './NewApprovaling.css';
import CurrentTime from './Time';

import {
  callInsertGeneralDraftAPI
} from '../../apis/ApprovalAPICalls';

import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import queryString from 'query-string';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';





function GeneralDraft(){
  
  const currentTimeString = CurrentTime();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = decodeJwt(window.localStorage.getItem("accessToken"));
  const approvalingstate  = useSelector((state) => state.approvalReducer);
  const approvalingstateList = approvalingstate?.data?.content;

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState();
  const imageInput = useRef();
  // const [titleValue,setTitleValue] = useState('');

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

  
   

    const onClickInsertDocumentHandler = () => {

      console.log('[Approval] onClickInsertDocumentHandler');

      const formData = new FormData();

      formData.append("gdTitle", form.gdTitle);
    formData.append("gdContent", form.gdContent);
    formData.append("rfUser", form.rfUser);
    formData.append("lineUser", form.lineUser);
    formData.append("apFileNameOrigin", form.apFileNameOrigin);

      if(image){
          formData.append("productImage", image);
      }
      console.log('[Approval] formData : ', formData.get("gdTitle"));
      console.log('[Approval] formData : ', formData.get("gdContent"));
      console.log('[Approval] formData : ', formData.get("rfUser"));
      console.log('[Approval] formData : ', formData.get("lineUser"));
      console.log('[Approval] formData : ', formData.get("apFileNameOrigin"));
      
    }

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

  console.log('approvalingstate',  approvalingstate );
  console.log('approvalingstateList',  approvalingstateList);


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
                <button>결재</button>
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
        <div className="wrap2">
          <div className="approval">
            <span className="texttitle">기 안</span>
            <ul className="approvalul">
              <input type='text' className="one" value={token.userRole[0].authority.authName}/>
              <li className="two">
                <img src="" alt="" />
                도장
              </li>
              <input type="text" className="three" placeholder='축온청'/>
              <li className="four">날짜</li>
            </ul>
            <span className="texttitle">결 재</span>
            <ul className="approvalul">
              <li className="one">운영 이사/팀원</li>
              <li className="two">도장</li>
              <li className="three">축온청</li>
              <li className="four">날짜</li>
            </ul>
            <ul className="approvalul">
              <li className="one">운영 이사/팀원</li>
              <li className="two">도장</li>
              <li className="three">축온청</li>
              <li className="four">날짜</li>
            </ul>
            <ul className="approvalul">
              <li className="one">운영 이사/팀원</li>
              <li className="two">도장</li>
              <li className="three">축온청</li>
              <li className="four">날짜</li>
            </ul>
            <ul className="approvalul">
              <li className="one">운영 이사/팀원</li>
              <li className="two">도장</li>
              <li className="three">축온청</li>
              <li className="four">날짜</li>
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
                    value={token.userName}
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
                    value={token.userName}
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
                    value={token.userName}
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
            <thead>
              <tr>
                <th colSpan={2}>제목</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={2}>
                  <input
                    type="text"
                    className="inputbox2"
                    placeholder="제목을 입력하세요"
                  />
                </td>
              </tr>
            </tbody>
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
            <button className="btn">기안</button>
          </div>
        </div>
      </div>
    </main>
    </div>
       );
    }
    
    export default GeneralDraft;