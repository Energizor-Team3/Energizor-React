import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Layout from './layouts/Layout';
import Sublayout from "./layouts/SubLayout";
import Login from "./pages/user/Login";
import Error from "./pages/Error";
import Main from "./pages/main/Main";
import AddDetailSchedule from "./pages/calendar/cal_addsch_detail";
import Message from "./pages/message/Message";
import Layout from "./layouts/SubLayout";
// import Group from './pages/group/Group';
import GeneralDraft from './pages/approval/GeneralDraft';
import ApprovalMain from './pages/approval/ApprovalMain';
import SharedInBox from './pages/approval/SharedInBox';
import Approvaling from './pages/approval/Approvaling';
import NewApproval from './pages/approval/NewApproval';

import ReservationMain from "./pages/Reservation/ReservationMain";
import ReservationDetails from "./pages/Reservation/ReservationDetails";
import ReservationApply from "./pages/Reservation/ReservationApply";
import ReservationModify from "./pages/Reservation/ReservationModify";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={ <Layout/> }>
          <Route index element={ <Main/> }/>  

        </Route> */}

        <Route path="/" element={ <Sublayout/> }>
          <Route path="message" element={ <Message/> } />
          <Route path="/generaldraft" element={ <GeneralDraft/> } />
          <Route path="/approvalmain" element={ <ApprovalMain/> } />
          <Route path="/sharedinbox" element={ <SharedInBox/> } />
          <Route path="/approvaling" element={ <Approvaling/> } />
          <Route path="/newapproval" element={ <NewApproval/> } />
          <Route path="/reservationdetails" element={<ReservationDetails />} />
          <Route path="/reservationapply" element={<ReservationApply />} />
          <Route path="/reservationmain" element={<ReservationMain />} />
          <Route path="/reservationmodify" element={<ReservationModify />} />
        <Route path="/main" element={<Main />} />

        <Route path="/main" element={<Layout />}>
          <Route index element={<Main />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error />} />

        <Route path="/addDetailSchedule" element={<AddDetailSchedule />} />



        
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
