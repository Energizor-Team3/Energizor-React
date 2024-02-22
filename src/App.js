import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sublayout from "./layouts/SubLayout";
import Login from "./pages/user/Login";
import Error from "./pages/Error";
import Main from "./pages/main/Main";
import AddDetailSchedule from "./pages/calendar/cal_addsch_detail";
import Message from "./pages/message/Message";
import Group from './pages/group/Group';
import GeneralDraft from './pages/approval/GeneralDraft';
import ApprovalMain from './pages/approval/ApprovalMain';
import BusinessTrip from './pages/approval/BusinessTrip';
import Education from './pages/approval/Education';
import GeneraldraftForm from './pages/approval/GeneraldraftForm';
import EducationForm from './pages/approval/EducationForm';
import VacationForm from './pages/approval/VacationForm';
import BusinesstripForm from './pages/approval/BusinesstripForm';
import SharedInBox from './pages/approval/SharedInBox';
import InBox from './pages/approval/InBox';
import Approvaling from './pages/approval/Approvaling';
import NewApproval from './pages/approval/NewApproval';
import Vacation from './pages/approval/Vacation';
import SaveInBox from './pages/approval/SaveInBox';
import Layout from './layouts/SubLayout';
// import Group from './pages/group/Group';

import ProjectDetail from "./pages/project/project_detail";
import PersonalContact from "./pages/contact/personalContactList";
import CompanyContact from "./pages/contact/companyContactList";

import CalendarMainPage from "./pages/calendar/CalendarMain";
import CalendarSetting from "./pages/calendar/CalendarSetting";
import ProjectMain from "./pages/project/projectMain";
import EditSchedule from "./pages/calendar/editSchedule";

import ReservationMain from "./pages/Reservation/ReservationMain";
import ReservationDetails from "./pages/Reservation/ReservationDetails";
import ReservationApply from "./pages/Reservation/ReservationApply";
import ReservationModify from "./pages/Reservation/ReservationModify";
import SearchPwd from "./pages/user/SearchPwd";
import SearchPwdEmail from "./pages/user/SearchPwdEmail";
import UserList from "./pages/admin/UserList";
import MyPage from "./pages/user/MyPage";
import UserRegist from "./pages/admin/UserRegist";
import ModifyUser from "./pages/admin/ModifyUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/searchpwd" element={<SearchPwd />} />
        <Route path="/searchpwdemail" element={<SearchPwdEmail />} />

{/* 
      <Route path="/main" element={ <Layout/> }>
        <Route index element={ <Main /> } />
      </Route> */}
        <Route path="/login" element={ <Login/> } />
        <Route path="*" element={ <Error/> }/>

        



        <Route path="/" element={ <Sublayout/> }>
        <Route path="/reservationmain" element={ <ReservationMain/> } />
          <Route path="message" element={ <Message/> } />
          <Route path="/generaldraft" element={ <GeneralDraft/> } />
          <Route path="/education" element={ <Education/> } />
          <Route path="/businesstrip" element={ <BusinessTrip/> } />
          <Route path="/saveinbox" element={ <SaveInBox/> } />
          <Route path="/vacation" element={ <Vacation/> } />
          <Route path="/approvalmain" element={ <ApprovalMain/> } />
          <Route path="/sharedinbox" element={ <SharedInBox/> } />
          <Route path="/inbox" element={ <InBox/> } />
          <Route path="/approvaling" element={ <Approvaling/> } />
          <Route path="/newapproval" element={ <NewApproval/> } />
          <Route path="/generaldraftform" element={ <GeneraldraftForm/> } />
          <Route path="/educationform" element={ <EducationForm/> } />
          <Route path="/businesstripform" element={ <BusinesstripForm/> } />
          <Route path="/vacationform" element={ <VacationForm/> } />
          <Route path="/group" element={ <Group/> } />

          <Route path="/project/:proNo" element={ <ProjectDetail/> }/>       
          <Route path="/schedule/add/detail" element={ <AddDetailSchedule/> }/>
          <Route path="/calendar" element={ <CalendarMainPage/> } />
          <Route path="/calendar/setting" element={ <CalendarSetting/>}/>
          <Route path='/project/main' element={ <ProjectMain/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
