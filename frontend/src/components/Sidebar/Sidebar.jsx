import { Outlet, Link, useNavigate,NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import './style.css'

export default function Sidebar({onLogout}) {

    const { logout } = useContext(AuthContext)
    const navigate = useNavigate();

    function handleLogout(){
        if(onLogout) return onLogout();
        try{
            
        logout()
        }catch(err){
            console.error(err)
        }
        navigate('/')
    }

    const MenuItems = [
        {path: "/dashboard", label:"Dashboar"},
        {path: "/pets", label:"Pets"},
        {path: "/owners", label:"Donos"},
        {path: "/services", label:"Serviços"},
        {path: "/service-types", label:"Tipos de Serviços"},
        {path: "/users", label:"Usuario"}

    ]

    return (
        
            <aside className="sidebar-aside">
                <h2>
                    PetShop
                </h2>
                <nav className="sidebar-nav">
                    {MenuItems.map((item,index) => (
                        <NavLink className="NavLink" key={index} to={item.path}
                        className={({isActive}) => (isActive ? "NavLink active": "NavLink")}>
                        {item.label}
                        </NavLink>
                    ))}
                </nav>
            
            
                <button className="logout-btn" onClick={handleLogout}>Sair</button>
                
            </aside>
    );
}
