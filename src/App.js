import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sublayout from "./layouts/SubLayout";
import Login from "./pages/user/Login";
import Error from "./pages/Error";
import Main from "./pages/main/Main";
import AddDetailSchedule from "./pages/calendar/cal_addsch_detail";
import Message from "./pages/message/Message";
import Group from './pages/group/Group';
import GeneralDraft from './pages/approval/GeneralDraft';
import ApprovalMain from './pages/approval/ApprovalMain';
import SharedInBox from './pages/approval/SharedInBox';
import Approvaling from './pages/approval/Approvaling';
import NewApproval from './pages/approval/NewApproval';

import ProjectDetail from './pages/project/project_detail';
 import CalendarMainPage from './pages/calendar/CalendarMain'
import CalendarSetting from './pages/calendar/CalendarSetting';
import ProjectMain from './pages/project/projectMain';
import EditSchedule from './pages/calendar/editSchedule';


import ReservationMain from "./pages/Reservation/ReservationMain";
import ReservationDetails from "./pages/Reservation/ReservationDetails";
import ReservationApply from "./pages/Reservation/ReservationApply";
import ReservationModify from "./pages/Reservation/ReservationModify";

function App() {
  return (
    <BrowserRouter>
      <Routes>


           {/*메인 전용 헤더 붙히기 전  */}
        <Route path="/main" element={ <Main /> } />



        <Route path="/login" element={ <Login/> } />
        <Route path="*" element={ <Error/> }/>

        




        <Route path="/" element={ <Sublayout/> }>
{/* 쪽지 */}
          <Route path="/message" element={ <Message/> } />

{/* 결재 */}

          <Route path="/approvalmain" element={ <ApprovalMain/> } />
          <Route path="/sharedinbox" element={ <SharedInBox/> } />
          <Route path="/approvaling" element={ <Approvaling/> } />
          <Route path="/newapproval" element={ <NewApproval/> } />

{/* 자원예약 */}

          <Route path="/reservationdetails" element={<ReservationDetails />} />
          <Route path="/reservationapply" element={<ReservationApply />} />
          <Route path="/reservationmain" element={<ReservationMain />} />
          <Route path="/reservationmodify" element={<ReservationModify />} />



{/*일정관리- 캘린더, 프로젝트  */}

          <Route path='/project/main' element={ <ProjectMain/>}/>
          <Route path="/project/:proNo" element={ <ProjectDetail/> }/>       

          <Route path="/calendar" element={ <CalendarMainPage/> } />
          <Route path="/calendar/setting" element={ <CalendarSetting/>}/>
          <Route path="/schedule/add/detail" element={ <AddDetailSchedule/> }/>
          <Route path="/schedule/edit" element={ <EditSchedule/> }/>



        
        </Route>
 
       

      </Routes>
    </BrowserRouter>
  );
}

export default App;
