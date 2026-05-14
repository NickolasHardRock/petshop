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
        <div className="app-container">
            <aside>
                <h2>
                    PetShop
                </h2>
                <nav>
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/pets">Pets</Link>
                    <Link to="/owners">Donos</Link>
                    <Link to="/#">Serviços</Link>
                    <Link to="/#">Tipos de Serviços</Link>
                    <Link to="/#">Usuarios</Link>
                </nav>
            </aside>
            <main className="main-content">
                <button onClick={handleLogout}>Sair</button>
                <Outlet/>
            </main>

        </div>
    )



}

export default MainLayout