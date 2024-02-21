import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Layout from './layouts/Layout';
import Sublayout from "./layouts/SubLayout"
import Login from './pages/user/Login';
import Error from './pages/Error';
import Main from './pages/main/Main'
import ReservationMain from './pages/Reservation/ReservationMain'
import AddDetailSchedule from './pages/calendar/cal_addsch_detail'
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
import Approvaling from './pages/approval/Approvaling';
import NewApproval from './pages/approval/NewApproval';
import Vacation from './pages/approval/Vacation';
import SaveInBox from './pages/approval/SaveInBox';
import Layout from './layouts/SubLayout';
// import Group from './pages/group/Group';

import ProjectDetail from './pages/project/project_detail';
 import CalendarMainPage from './pages/calendar/CalendarMain'
import CalendarSetting from './pages/calendar/CalendarSetting';
import ProjectMain from './pages/project/projectMain';



function App() {

  return (
    <BrowserRouter>
      <Routes>

        {/* <Route path="/" element={ <Layout/> }>
          <Route index element={ <Main/> }/>  

        </Route> */}

        <Route path="/main" element={ <Main /> } />


      <Route path="/main" element={ <Layout/> }>
        <Route index element={ <Main /> } />
      </Route>
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


