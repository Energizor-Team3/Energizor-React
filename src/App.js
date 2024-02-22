import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sublayout from "./layouts/SubLayout";
import Login from "./pages/user/Login";
import Error from "./pages/Error";
import Main from "./pages/main/Main";
import AddDetailSchedule from "./pages/calendar/cal_addsch_detail";
import Message from "./pages/message/Message";
import Group from "./pages/group/Group";
import GeneralDraft from "./pages/approval/GeneralDraft";
import ApprovalMain from "./pages/approval/ApprovalMain";
import BusinessTrip from "./pages/approval/BusinessTrip";
import Education from "./pages/approval/Education";
import GeneraldraftForm from "./pages/approval/GeneraldraftForm";
import EducationForm from "./pages/approval/EducationForm";
import VacationForm from "./pages/approval/VacationForm";
import BusinesstripForm from "./pages/approval/BusinesstripForm";
import SharedInBox from "./pages/approval/SharedInBox";
import InBox from "./pages/approval/InBox";
import Approvaling from "./pages/approval/Approvaling";
import NewApproval from "./pages/approval/NewApproval";
import Vacation from "./pages/approval/Vacation";
import SaveInBox from "./pages/approval/SaveInBox";
import Layout from "./layouts/SubLayout";
// import Group from './pages/group/Group';

import ProjectDetail from "./pages/project/project_detail";
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
import ModifyUser from "./pages/admin/ModifyUser";
import MyPage from './pages/user/MyPage';
import UserRegist from './pages/admin/UserRegist';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/searchpwd" element={<SearchPwd />} />
        <Route path="/searchpwdemail" element={<SearchPwdEmail />} />

        <Route path="/" element={<Sublayout />}>
          {/*메인 전용 헤더 붙히기 전  */}
          <Route path="/main" element={<Main />} />
          {/* 쪽지 */}
          <Route path="/message" element={<Message />} />


          <Route path="/userlist" element={ <UserList/> } />
          <Route path="/my-page" element={ <MyPage/> } />
          <Route path="/userregist" element={ <UserRegist/> } />
          <Route path="/modifyuser/:userCode" element={ <ModifyUser/> } />


          {/* 결재 */}

          <Route path="/generaldraft" element={<GeneralDraft />} />
          <Route path="/education" element={<Education />} />
          <Route path="/businesstrip" element={<BusinessTrip />} />
          <Route path="/saveinbox" element={<SaveInBox />} />
          <Route path="/inbox" element={<InBox />} />
          <Route path="/vacation" element={<Vacation />} />
          <Route path="/approvalmain" element={<ApprovalMain />} />
          <Route path="/sharedinbox" element={<SharedInBox />} />
          <Route path="/approvaling" element={<Approvaling />} />
          <Route path="/newapproval" element={<NewApproval />} />
          <Route path="/generaldraftform" element={<GeneraldraftForm />} />
          <Route path="/educationform" element={<EducationForm />} />
          <Route path="/businesstripform" element={<BusinesstripForm />} />
          <Route path="/vacationform" element={<VacationForm />} />
          <Route path="/group" element={<Group />} />

          {/* 자원예약 */}

          <Route path="/reservationdetails" element={<ReservationDetails />} />
          <Route path="/reservationapply" element={<ReservationApply />} />
          <Route path="/reservationmain" element={<ReservationMain />} />
          <Route path="/reservationmodify" element={<ReservationModify />} />

          {/*일정관리- 캘린더, 프로젝트  */}

          <Route path="/project/main" element={<ProjectMain />} />
          <Route path="/project/:proNo" element={<ProjectDetail />} />
          <Route path="/calendar" element={<CalendarMainPage />} />
          <Route path="/calendar/setting" element={<CalendarSetting />} />
          <Route path="/schedule/add/detail" element={<AddDetailSchedule />} />
          <Route path="/schedule/edit/:schNo" element={<EditSchedule />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
