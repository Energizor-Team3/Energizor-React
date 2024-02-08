import pdCss from './project_detail.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { decodeJwt } from '../../utils/tokenUtils';

import { 
    callProjectDetailAPI
} from '../../apis/ProjectAPICalls'



function ProjectDetail(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const project = useSelector(state => state.projectReducer);
console.log('project',project);



    useEffect(
        () => {
            dispatch(callProjectDetailAPI({	// 프로젝트 상세 정보 조회
                proNo: params.proNo
            }));            
        }
        ,[]
    );


    
    return(
        <>
            <main>
                <div className="project_detail_box">
                    <h1 className="back_btn"> &lt; </h1>
                    <div className="pro_detail">
                    <div className="pro_info">
                        <div className="detail_top">
                        <h3 className="project_title">{ project.proTitle || '' }</h3>
                        <div className="btns">
                            <button className="edit_btn">
                             <img src="/calendar/editIcon 1.png" alt="수정" />
                            </button>
                            <button className="delete_btn">
                            <img src="/calendar/trash 1.png"  alt='삭제'/>
                            </button>
                        </div>
                        </div>
                        <div className="pro_content">
                          { project.proContent || '' }
                        </div>
                        <div className="pro_atttitle">프로젝트 당담자:</div>
                        <div className="pro_attlist">
                        <div className="pro_attuser">이름1</div>
                        <div className="pro_attuser">이름2</div>
                        <div className="pro_attuser">이름3</div>
                        <div className="pro_attuser">이름4</div>
       
                        </div>
                        <div className="pro_date">
                        <span>프로젝트 기간:</span>
                        <div className="pro_startdate">{ project.proStartDate || '' }</div>~
                        <div className="pro_enddate">{ project.proEndDate || '' }</div>
                        </div>
                    </div>
                    </div>
                    <div className="pro_progress"></div>
                    <div className="pro_task">
                    <div className="todo">
                        <h4>TO DO</h4>
                        <div className="task_1">
                        <div className="task_top">
                            <div className="task_title">TASK_1</div>
                            <div className="task_delete">X</div>
                        </div>
                        <div className="task_content">
                            여기에는 테스크 내용이 들어갑니다. 여기에는 테스크 내용이 들어갑니다
                        </div>
                        <div className="task_att">
                            <span>담당자 : </span>
                            <div className="task_user"> 개발본부 / 이름 1</div>
                        </div>
                        </div>
                        <div className="task_1">
                        <div className="task_top">
                            <div className="task_title">TASK_1</div>
                            <div className="task_delete">X</div>
                        </div>
                        <div className="task_content">
                            여기에는 테스크 내용이 들어갑니다. 여기에는 테스크 내용이 들어갑니다
                        </div>
                        <div className="task_att">
                            <span>담당자 : </span>
                            <div className="task_user"> 개발본부 / 이름 1</div>
                        </div>
                        </div>
                        <div className="task_1">
                        <div className="task_top">
                            <div className="task_title">TASK_1</div>
                            <div className="task_delete">X</div>
                        </div>
                        <div className="task_content">
                            여기에는 테스크 내용이 들어갑니다. 여기에는 테스크 내용이 들어갑니다
                        </div>
                        <div className="task_att">
                            <span>담당자 : </span>
                            <div className="task_user"> 개발본부 / 이름 1</div>
                        </div>
                        </div>
                    </div>
                    <div className="inprogress">
                        <h4>IN PROGRESS</h4>
                    </div>
                    <div className="done">
                        <h4>DONE</h4>
                    </div>
                    </div>
                </div>
            </main>
        
        
        </>
    )

}


export default ProjectDetail;