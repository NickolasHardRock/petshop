import { Outlet, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Sidebar from "../components/Sidebar/Sidebar"
import './style.css'




function MainLayout() {

    const { logout } = useContext(AuthContext)
    const navigate = useNavigate();

    async function handleLogout() {
       try{
        await logout()
       }catch(err){
        console.error(err)
       }
        navigate('/')
    }

    return (
        <div className="app-container">
                <Sidebar onLogout={handleLogout} />
            
            <main className="main-content">
                <div className="content-inner">

                    <Outlet />

                </div>

            </main>
        </div>

    )



}

export default MainLayout