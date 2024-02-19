import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Layout from './layouts/Layout';
import Sublayout from "./layouts/SubLayout"
import Login from './pages/user/Login';
import Error from './pages/Error';
import Main from './pages/main/Main'
import ReservationMain from './pages/Reservation/ReservationMain'
import AddDetailSchedule from './pages/calendar/cal_addsch_detail'
import Message from "./pages/message/Message";
import Layout from './layouts/SubLayout';
// import Group from './pages/group/Group';
import GeneralDraft from './pages/approval/GeneralDraft'
import ProjectDetail from './pages/project/project_detail';
import Group from './pages/group/Group';




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

        <Route path="/reservationmain" element={ <ReservationMain/> } />



        <Route path="/" element={ <Sublayout/> }>
          <Route path="message" element={ <Message/> } />
          <Route path='group' element={ <Group/>}/>
          <Route path='generalDraft' element={ <GeneralDraft/>}/>
          <Route path='projectDetail' element={ <ProjectDetail/>}/>
          <Route path='addDetailSchedule' element={ <AddDetailSchedule/>}/>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
