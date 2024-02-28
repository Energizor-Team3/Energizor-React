
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decodeJwt } from '../../utils/tokenUtils';
import { NavLink } from 'react-router-dom';
 
import'./projectMain.css';

import{
    callProjectListAPI
}from '../../apis/ProjectAPICalls'

import projectReducer from '../../modules/ProjectModule';

function ProjectMain(){

    const dispatch = useDispatch();
    const projects = useSelector(state => state.projectReducer);
    const projectList = projects.data;

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    };
        const sortByStartDate = (a, b) => {
            const dateA = new Date(a.proStartDate).getTime();
            const dateB = new Date(b.proStartDate).getTime();
            return dateB - dateA; // 내림차순으로 정렬
        };
        const backgroundColors =
         ['#CC86A8', '#C0A280', '#DD7090', '#A5C8B4', '#A27792', '#7186BF', '#82A584', '#5556A6', '#5B6693', '#7C6673'];

//     // 시작 날짜를 기준으로 프로젝트를 오래된 순서대로 정렬하는 함수
//     const sortByStartDate = (a, b) => {
//     const dateA = new Date(a.proStartDate).getTime();
//     const dateB = new Date(b.proStartDate).getTime();
//     return dateA - dateB; // 오름차순으로 정렬
// };

 
 

    useEffect(
        () => {
            dispatch(callProjectListAPI());            
        }
        ,[]
    );

    const [proNo, setproNo] = useState(0);

    return(
        <div id="wrap">
            <section>
            <article>
            <h2 className="menu_schedule">일정관리</h2>
            <div id="menu_1">
                     
                     <img src="/project/projectIcon.png" alt="" />
                     <NavLink to='/project/main'>  <span>프로젝트</span></NavLink>                          
             </div>
             <div id="menu_2">                  
                     <img src="/project/calendarIcon.png" alt="" />
                     <NavLink to='/calendar'>
                <span>캘린더</span></NavLink>                                  
             </div>
            </article>
        </section>
        <div className="pjmain">
            <div className="main_con">
            <div className="container_1">
                <button className="addpro_btn">
                <h1>+</h1>
                <NavLink to='/project/newproject'><h3>프로젝트 생성</h3></NavLink>
                </button>
            </div>

            <div className="container_2" id="projectContainer" >    
            {Array.isArray(projectList) && projectList.sort(sortByStartDate).map((projects, index) => (
                
                                
                <NavLink to={`/project/${projects.proNo}`} key={projects.proNo}>
                    <div
                        className="project"
                        style={{ backgroundColor: backgroundColors[index % backgroundColors.length] }}
                        key= { projects.proNo }
                >
                <h3 className="project_title">{ projects.proTitle }</h3>
                <div className='pjdate'>
                <h5 className="project_startdate">{ projects? formatDate(projects.proStartDate) : ''}</h5>
                ~
                <h5 className="project_enddate">{ projects? formatDate(projects.proEndDate) : ''}</h5></div>
                              </div> </NavLink> 

                        ) )}
            </div>
            </div>

        </div>
      </div>

    )
}

export default ProjectMain;