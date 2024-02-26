 
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { NavLink  } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { decodeJwt } from '../../utils/tokenUtils';
import DonutChart from './projectDonutChart';
 
import'./project_detail.css';
import { 
    callProjectDetailAPI,
    callTasksAPI
} from '../../apis/ProjectAPICalls'

import projectReducer from '../../modules/ProjectModule';
import taskReducer from '../../modules/TaskModule'



function ProjectDetail(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
 
    const project  = useSelector(state => state.projectReducer);
    const tasks = useSelector(state => state.taskReducer);

    const todoTasks = Array.isArray(tasks) ? tasks.filter(task => task.taskStatus === 'T') : [];
    const inProgressTasks = Array.isArray(tasks) ? tasks.filter(task => task.taskStatus === 'I') : [];
    const doneTasks = Array.isArray(tasks) ? tasks.filter(task => task.taskStatus === 'D') : [];

    const renderTasks = (tasks) => tasks.map(task => (
        <div key={task.taskNo} className="task_1">
            <div className="task_top">
                <div className="task_title">{task.taskContent}</div>
                <div className="task_delete">X</div>
            </div>
            <div className="task_att">
                <span>담당자 : </span>
                <div className="task_user">{task.userName}</div>
            </div>
        </div>
    ));

    console.log("Tasks:", tasks);
    console.log("TODO Tasks:", todoTasks);
    console.log("In Progress Tasks:", inProgressTasks);
    console.log("Done Tasks:", doneTasks);


    useEffect(
        () => {
            dispatch(callProjectDetailAPI({	 
                proNo: params.proNo
            }));            
        }
        ,[]
    );
    useEffect(
        () => {
            dispatch(callTasksAPI({	 
                proNo: params.proNo
            }));            
        }
        ,[]
    );

    
 

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    };


     
    return(
      
    <div id="wrap"> 
        <section>
            <article>
                <h2 className="menu_schedule">일정관리</h2>
                <div id="menu_1">

                    <img src="/calendar/calendarIcon.png" alt="" />
                    <NavLink to='/calendar'>
                    <span>캘린더</span></NavLink>
                    </div>
                    <div>

                    <NavLink to='/schedule/add/detail'> <button className="cal_btn">일정추가</button></NavLink>
                    <NavLink to='/calendar/setting'> <button className="cal_btn">캘린더 설정</button></NavLink>
                    </div>

                    <div id="menu_2">

                    <img src="/project/projectIcon.png" alt="" />

                    <NavLink to='/project/main'>  <span>프로젝트</span></NavLink>
                    </div>
            </article>
        </section>
        
        <main className="projectmain">
            <div className="project_detail_box">
                <h1 className="back_btn"> &lt; </h1>
                <div className="pro_detail">
                <div className="pro_info">
                    <div className="detail_top">
                    <h3 className="project_dtitle">{project ? project.proTitle : ''}</h3>
                    <div className="btns">
                        <button className="edit_btn">
                            <img src="/calendar/editcon.png" alt="수정" />
                        </button>
                        <button className="delete_btn">
                        <img src="/calendar/caltrash.png"  alt='삭제'/>
                        </button>
                    </div>
                    </div>
                    <div className="pro_content">
                                {project ? project.proContent : ''} {/* 프로젝트가 있는지 확인 */}
                            </div>
                    <div className="pro_atttitle">프로젝트 당담자:</div>
 
                        <div className="pro_attlist">
                        {project && project.participants && project.participants.map((participant, index) => (
                            <div key={index} className="pro_attuser">{participant.userName}</div>
                        ))}
                        </div>
                    <div className="pro_date">
                    <span>프로젝트 기간:</span>
                    <div className="pro_startdate">{project ? formatDate(project.proStartDate) : ''}</div> {/* 프로젝트가 있는지 확인 */}
                    ~
                    <div className="pro_enddate">{project ? formatDate(project.proEndDate) : ''}</div> {/* 프로젝트가 있는지 확인 */}                
                        </div>
                </div>
                </div>

                <div className="pro_progress">
                    <h3> 진행률 </h3>
                    <div className='donut'>
                    <DonutChart
                        todoCount={todoTasks.length}
                        inProgressCount={inProgressTasks.length}
                        doneCount={doneTasks.length}
                         
                    /></div>
                </div>
                <div className="pro_task">
                <div className="todo">
                    <h4>TO DO</h4>
                    {renderTasks(todoTasks)}
                </div>
                <div className="inprogress">
                    <h4>IN PROGRESS</h4>
                    {renderTasks(inProgressTasks)}
                </div>
                <div className="done">
                    <h4>DONE</h4>
                    {renderTasks(doneTasks)}
                </div>
                </div>
            </div>
        </main>
    
        
    </div>
    )

}


export default ProjectDetail;