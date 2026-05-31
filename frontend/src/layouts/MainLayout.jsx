import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import DashboardMenu from "../components/DashboardMenu/DashBoardMenu";
import './MainLayoutStyle.css'


function MainLayout({ children }) {

    return (
        <div className="app-container">
            <DashboardMenu />
            <main className="main-content">
                <div className="content-inner">

                    {children ?? <Outlet />}

                </div>

            </main>
        </div>
    )

}



export default MainLayout