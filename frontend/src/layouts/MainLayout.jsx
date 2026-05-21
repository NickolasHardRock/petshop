import { Outlet, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Sidebar from "../components/Sidebar/Sidebar"
import './style.css'




function MainLayout() {

    const { logout } = useContext(AuthContext)
    const navigate = useNavigate

    function handleLogout() {
        logout()
        navigate('/')
    }

    return (
        <div className="app-container">
            <Sidebar />
            <main>
                <Outlet></Outlet>
            </main>
        </div>

    )



}

export default MainLayout