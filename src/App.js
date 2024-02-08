import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Login from './pages/user/Login';
import Error from './pages/Error';
import Main from './pages/main/Main'
import AddDetailSchedule from './pages/calendar/cal_addsch_detail'
import ProjectDetail from './pages/project/project_detail';




function App() {

  return (
    <BrowserRouter>

      <Routes>

        {/* <Route path="/" element={ <Layout/> }>
          <Route index element={ <Main/> }/>  

        </Route> */}

        <Route path="/main" element={ <Main /> } />

        <Route path="/login" element={ <Login/> } />
        <Route path="*" element={ <Error/> }/>
        <Route path="/addDetailSchedule" element={ <AddDetailSchedule/> }/>
        <Route path="/project/:proNo" element={ <ProjectDetail/> }/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
