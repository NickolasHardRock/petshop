import { Outlet, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";




function MainLayout() {

    const { logout } = useContext(AuthContext)
    const navigate = useNavigate

    function handleLogout(){
        logout()
        navigate('/')
    }

    return (
        <div>
            <aside>
                <h2>
                    PetShop
                </h2>
                <nav>
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/pets">Pets</Link>
                    <Link to="/#">Donos</Link>
                    <Link to="/#">Serviços</Link>
                    <Link to="/#">Tipos de Serviços</Link>
                    <Link to="/#">Usuarios</Link>
                </nav>
            </aside>
            <div>
                <button onClick={handleLogout}>Sair</button>
            </div>

        </div>
    )



}

export default MainLayout