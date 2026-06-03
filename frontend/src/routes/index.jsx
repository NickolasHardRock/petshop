import { Routes, Route } from "react-router-dom";
import Login from '../pages/login'
import Dashboard from '../pages/dashboard'
import PrivateRoute from "./PrivateRoute";
import Pets from "../pages/pets";
import Owners from "../pages/owners";
import MainLayout from "../layouts/MainLayout";

function AppRoutes() {
    return (
        <div>
        <MainLayout/>
        <Routes>
                <Route path='/' element={<Login></Login>} />    
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/pets' element={<Pets />} />
                <Route path='/owners' element={<Owners />} />
        </Routes>
        </div>
    )
}


export default AppRoutes