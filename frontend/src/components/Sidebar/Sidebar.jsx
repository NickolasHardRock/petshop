import { Outlet, Link, useNavigate,NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import './style.css'




function Sidebar() {

    const { logout } = useContext(AuthContext)
    const navigate = useNavigate

    function handleLogout(){
        logout()
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
        
            <aside>
                <h2>
                    PetShop
                </h2>
                <nav className="sidebar">
                    {MenuItems.map((item,index) => (
                        <NavLink className="NavLink" key={index} to={item.path}></NavLink>
                    ))}
                </nav>
            
            
                <button onClick={handleLogout}>Sair</button>
                <Outlet/>
            </aside>
    );
}

export default Sidebar