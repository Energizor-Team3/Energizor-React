import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sublayout from "./layouts/SubLayout"
import Login from './pages/user/Login';
import Error from './pages/Error';
import Main from './pages/main/Main'
import ReservationMain from './pages/Reservation/ReservationMain'
import AddDetailSchedule from './pages/calendar/cal_addsch_detail'
import Message from "./pages/message/Message";
// import Group from './pages/group/Group';
import GeneralDraft from './pages/approval/GeneralDraft';
import ApprovalMain from './pages/approval/ApprovalMain';
import SharedInBox from './pages/approval/SharedInBox';
import Approvaling from './pages/approval/Approvaling';
import NewApproval from './pages/approval/NewApproval';
import Layout from './layouts/Layout';
import SearchPwd from './pages/user/SearchPwd';
import SearchPwdEmail from './pages/user/SearchPwdEmail';
import UserList from './pages/admin/UserList';
import MyPage from './pages/user/MyPage';
import UserRegist from './pages/admin/UserRegist';
import ModifyUser from './pages/admin/ModifyUser';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/searchpwd" element={<SearchPwd />} />
        <Route path="/searchpwdemail" element={<SearchPwdEmail />} />

        <Route
          path="/main"
          element={<Layout />}
        >
          <Route index element={<Main />} />
        </Route>

        <Route path="/reservationmain" element={<ReservationMain />} />
        <Route path="/addDetailSchedule" element={<AddDetailSchedule />} />

        <Route path="/" element={ <Sublayout/> }>
          <Route path="message" element={ <Message/> } />
          <Route path="/generaldraft" element={ <GeneralDraft/> } />
          <Route path="/approvalmain" element={ <ApprovalMain/> } />
          <Route path="/sharedinbox" element={ <SharedInBox/> } />
          <Route path="/approvaling" element={ <Approvaling/> } />
          <Route path="/newapproval" element={ <NewApproval/> } />

          <Route path="/userlist" element={ <UserList/> } />
          <Route path="/my-page" element={ <MyPage/> } />
          <Route path="/userregist" element={ <UserRegist/> } />
          <Route path="/modifyuser/:userCode" element={ <ModifyUser/> } />
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
