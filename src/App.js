import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Layout from './layouts/Layout';
import Sublayout from "./layouts/SubLayout";
import Login from "./pages/user/Login";
import Error from "./pages/Error";
import Main from "./pages/main/Main";
import ReservationMain from "./pages/Reservation/ReservationMain";
import AddDetailSchedule from "./pages/calendar/cal_addsch_detail";
import Message from "./pages/message/Message";
import Layout from "./layouts/SubLayout";
// import Group from './pages/group/Group';
import GeneralDraft from "./pages/approval/GeneralDraft";
import ProjectDetail from "./pages/project/project_detail";
import List from "./pages/board/List";
import BoardList from "./pages/board/List";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BoardRegister } from "./pages/board/Register";
import { BoardDetail } from "./pages/board/Detail";
import InterestList from "./pages/board/InterestList";
import TemporaryList from "./pages/board/TemporaryList";
import SearchBoard from "./pages/board/List";
import TempBoardRegister from "./pages/board/TempRegister";


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={ <Layout/> }>
          <Route index element={ <Main/> }/>  

        </Route> */}

          <Route path="/main" element={<Main />} />

          <Route path="/main" element={<Layout />}>
            <Route index element={<Main />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error />} />

          <Route path="/reservationmain" element={<ReservationMain />} />

          <Route path="/" element={<Sublayout />}>
            <Route path="message" element={<Message />} />

            <Route path="/generaldraft" element={<GeneralDraft />} />
            <Route path="/project/:proNo" element={<ProjectDetail />} />
            <Route path="/addDetailSchedule" element={<AddDetailSchedule />} />
            <Route path="list/:boardTypeCode" element={<List />} />
            <Route path="/board" element={<BoardList />} />
            <Route path="/board/edit" element={<BoardRegister />} />
            <Route path="/board/edit/:id" element={<BoardRegister />} />
            <Route path="/board/:id" element={<BoardDetail />} />
            <Route path="/board/temp/:id" element={<TempBoardRegister />} />
            <Route path="/board/temp_list" element={<TemporaryList/>}/>
            <Route path="/board/interest_list" element={<InterestList/>}/>
            <Route path="list/:boardTypeCode/:type/:keyword" element={<SearchBoard/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
