import { Routes, Route } from "react-router-dom";
import Login from '../pages/login'
import Dashboard from '../pages/dashboard'
import PrivateRoute from "./PrivateRoute";
import Pets from "../pages/pets";
import Owners from "../pages/owners";

function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Login></Login>} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/pets' element={<Pets />} />
                <Route path='/owners' element={<Owners />} />
        </Routes>
    )
}


export default AppRoutes