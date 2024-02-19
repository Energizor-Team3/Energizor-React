
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decodeJwt } from '../../utils/tokenUtils';
 
import'./projectMain.css';

import{
    callProjectListAPI
}from '../../apis/ProjectAPICalls'

import projectReducer from '../../modules/ProjectModule';

function ProjectMain(){

    const dispatch = useDispatch();
    const projects = useSelector(state => state.projectReducer);
    const projectList = projects.data;

 
 

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
                     <span>프로젝트</span>           
                  
             </div>
             <div id="menu_2">                  
                     <img src="/project/calendarIcon.png" alt="" />
                     <span>캘린더</span>                                       
             </div>
            </article>
        </section>
        <div className="pjmain">
            <div className="main_con">
            <div className="container_1">
                <button className="addpro_btn">
                <h1>+</h1>
                <h3>프로젝트 생성</h3>
                </button>
            </div>

            <div className="container_2" id="projectContainer" >    
            {projectList && projectList.map(
                    (projects) => (             
                <div
                className="project"
                style={{ backgroundColor: "rgb(204, 134, 168)" }}
                key= { projects.proNo }
                >
                <h3 className="project_title">{ projects.proTitle }</h3>

                <h5 className="project_date">{ projects.proStartDate }</h5>
                <h5 className="project_date">{ projects.proEndDate }</h5>
                </div>
                        ) )}
            </div>
            </div>

        </div>
      </div>

    )
}

export default ProjectMain;