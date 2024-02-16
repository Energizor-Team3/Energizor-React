import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sublayout from "./layouts/SubLayout"
import Login from './pages/user/Login';
import Error from './pages/Error';
import Main from './pages/main/Main'
import ReservationMain from './pages/Reservation/ReservationMain'
import AddDetailSchedule from './pages/calendar/cal_addsch_detail'
import Message from "./pages/message/Message";
import Layout from './layouts/Layout';
import GeneralDraft from './pages/approval/GeneralDraft'
import ApprovalMain from './pages/approval/ApprovalMain'
import SearchPwd from './pages/user/SearchPwd';
import SearchPwdEmail from './pages/user/SearchPwdEmail';


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

        <Route
          path="/"
          element={<Sublayout />}
        >
          <Route path="message" element={<Message />} />
          <Route path="/generaldraft" element={<GeneralDraft />} />
          <Route path="/approvalmain" element={<ApprovalMain />} />
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
