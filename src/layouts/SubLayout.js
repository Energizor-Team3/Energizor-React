// import { Outlet } from "react-router-dom";
import { Outlet } from "react-router-dom";
import SubHeader from "../components/common/SubHeader";


function Layout() {

    return (
        <>
            <SubHeader/>
            <Outlet/>
        </>
    );
}

export default Layout; 