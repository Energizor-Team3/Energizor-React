import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Layout from './layouts/Layout';
import Sublayout from "./layouts/SubLayout"
import Login from './pages/user/Login';
import Error from './pages/Error';
import Main from './pages/main/Main'
import Message from "./pages/message/Message";
import Group from './pages/group/Group';
import GeneralDraft from './pages/approval/GeneralDraft';
import ApprovalMain from './pages/approval/ApprovalMain';
import SharedInBox from './pages/approval/SharedInBox';
import Approvaling from './pages/approval/Approvaling';
import NewApproval from './pages/approval/NewApproval';


function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/main" element={ <Main /> } />
        <Route path="/login" element={ <Login/> } />
        <Route path="*" element={ <Error/> }/>

        <Route path="/" element={ <Sublayout/> }>
          <Route path="message" element={ <Message/> } />
          <Route path="/generaldraft" element={ <GeneralDraft/> } />
          <Route path="/approvalmain" element={ <ApprovalMain/> } />
          <Route path="/sharedinbox" element={ <SharedInBox/> } />
          <Route path="/approvaling" element={ <Approvaling/> } />
          <Route path="/newapproval" element={ <NewApproval/> } />
          <Route path="/group" element={ <Group/> } />
        </Route>
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
