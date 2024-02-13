import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Layout from './layouts/Layout';
import Sublayout from "./layouts/SubLayout"
import Login from './pages/user/Login';
import Error from './pages/Error';
import Main from './pages/main/Main'
import Message from "./pages/message/Message";
import Group from './pages/group/Group';



function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/main" element={ <Main /> } />
        <Route path="/login" element={ <Login/> } />
        <Route path="*" element={ <Error/> }/>

        <Route path="/" element={ <Sublayout/> }>
          <Route path="message" element={ <Message/> } />
          <Route path='group' element={ <Group/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
