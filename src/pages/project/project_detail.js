 
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { NavLink  } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { decodeJwt } from '../../utils/tokenUtils';
import DonutChart from './projectDonutChart';
 
import'./project_detail.css';
import { 
    callProjectDetailAPI,
    callTasksAPI,
    callDeleteProjectAPI,
    callDeleteTaskAPI,
    callAddTaskAPI,
    callUpdateTaskAPI
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


//여기서부터 드래그앤 드랍 
const handleDrop = async (e, newStatus) => {
    e.preventDefault();
    const taskNo = e.dataTransfer.getData('taskNo');
    try {
        await dispatch(callUpdateTaskAPI({ taskNo, taskStatus: newStatus }));
        dispatch(callTasksAPI({ proNo: params.proNo }));
    } catch (error) {
        console.error('Error updating task status:', error);
    }
};
      
const handleDragOver = (e) => {
    e.preventDefault();
};

      const renderTasks = (tasks, taskStatus) => 
      tasks.map(task => (
        <div key={task.taskNo} className="task_1"
            draggable    
            onDragStart={(e) => e.dataTransfer.setData('taskNo', task.taskNo)}   
            onDrop={(e) => handleDrop(e, taskStatus)}  
            onDragOver={(e) => handleDragOver(e)}>
            <div className="task_top">
                <div className="task_title" style={{marginBottom:'10px'}}>{task.taskContent}</div>
                <div className="task_delete"
                 onClick={() => handleDeleteButtonClick(task.taskNo)}>X</div>
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

    const handleDeleteButtonClick = async (taskNo) => {
        const isConfirmed = window.confirm('task를 삭제하시겠습니까?');
      
        if (isConfirmed) {
          try {
            await dispatch(callDeleteTaskAPI({ taskNo }));
            window.location.reload(); 
          } catch (error) {
            console.error('task 삭제 중 오류가 발생했습니다:', error);
          }
        } else {
          console.log('삭제가 취소되었습니다.');
        }
      };
      const handleDeletePJButtonClick = async (proNo) => {
        const isConfirmed = window.confirm('project를 삭제하시겠습니까?');
    
        if (isConfirmed) {
          try {
            await dispatch(callDeleteProjectAPI({ proNo }));
            // 페이지 리로드 대신 navigate를 사용하여 특정 페이지로 이동
            navigate('/project/main');
          } catch (error) {
            console.error('project 삭제 중 오류가 발생했습니다:', error);
          }
        } else {
          console.log('삭제가 취소되었습니다.');
        }
      };

      const onCancelAddTask = () => {
        setShowAddTask(false);  
    };


    // addTask 버튼 클릭 이벤트 핸들러
    const [showAddTask, setShowAddTask] = useState(false); // 새로운 task 추가 UI 표시 여부
    const [selectedProParNo, setSelectedProParNo] = useState('');
    const onSelectParticipant = (event) => {
        const newSelectedProParNo = event.target.value;
        setSelectedProParNo(newSelectedProParNo);

        const selectedUser = project.participants.find(participant => participant.proParNo.toString() === newSelectedProParNo);
        console.log("선택된 task 담당자", selectedUser.proParNo);
        if (selectedUser) {
            setform(prevForm => ({
                ...prevForm,
                proParNo: selectedUser.proParNo
            }));
        }
    };



    const [form, setform] = useState({ // 새로운 task 내용 및 선택된 담당자
      taskContent: '',
      proParNo: ''
    });
    const handleAddTaskClick = () => {
        setShowAddTask(!showAddTask);
      };
    
      const onChangeHandler = (e) => {
        setform({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onClickPurchaseHandler = () => {
        console.log('[Task] Task event Started!!');
        console.log('form', form);

    dispatch(callAddTaskAPI({	
            form: form
        }))
        .then(() => {
            // 태스크 추가 후 태스크 목록을 다시 불러오는 로직
            dispatch(callTasksAPI({
                proNo: params.proNo
            }));    
            setShowAddTask(false);
            alert('Task등록이 완료 되었습니다');
        })
        .catch(error => {
            console.error('Task 추가 중 오류 발생:', error);
        });

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
            <NavLink to='/project/main'>   <h1 className="back_btn"> &lt; </h1> </NavLink>
                <div className="pro_detail">
                <div className="pro_info">
                    <div className="detail_top">
                    <h3 className="project_dtitle">{project ? project.proTitle : ''}</h3>
                    <div className="btns">
                        <button className="edit_btn">
                            <img src="/calendar/editcon.png" alt="수정" />
                        </button>
                        <button className="delete_btn"
                        onClick={() => handleDeletePJButtonClick(project.proNo)}>
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
                <div className="todo"
                     onDrop={(e) => handleDrop(e, "T")}  
                     onDragOver={(e) => handleDragOver(e)}>
                    <h4>TO DO</h4>
                    <button className='addTask'  onClick={handleAddTaskClick}> + </button>
                    {showAddTask && (
                    <div className='newtask'>
                        <input
                                                type='text'
                                                id="proTitle"
                                                name='taskContent'
                                                className='taskContent'
                                                value={form.taskContent}
                                                onChange={  onChangeHandler }
                                                
                                                placeholder='task 내용을 입력하세요'>

                        </input>
                        <select className='taskuser'
                                onChange={onSelectParticipant}>
                            <option disabled selected value="">----------Task 담당자----------</option>
                            {project && project.participants && project.participants.map((participant) => (
                                <option key={participant.proParNo} value={participant.proParNo}>
                                    {participant.userName}
                                </option>
                            ))}
                        </select>
                        <button className='submittask' onClick={onClickPurchaseHandler}> 추가 </button>
                        <button className='cancletask' onClick={onCancelAddTask}>취소</button>
                    </div>)}
                    {renderTasks(todoTasks,"T")}
                </div>
                <div className="inprogress"
                     onDrop={(e) => handleDrop(e, "I")}  
                     onDragOver={(e) => handleDragOver(e)}>
                    <h4>IN PROGRESS</h4>
                    {renderTasks(inProgressTasks,"I")}
                </div>  
                <div className="done"
                     onDrop={(e) => handleDrop(e, "D")}  
                     onDragOver={(e) => handleDragOver(e)}>
                    <h4>DONE</h4>
                    {renderTasks(doneTasks,"D")}
                </div>
                </div>
            </div>
        </main>
    
        
    </div>
    )

}


export default ProjectDetail;