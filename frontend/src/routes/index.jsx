import { Routes, Route } from "react-router-dom";
import Login from '../pages/login'
import Dashboard from '../pages/dashboard'
import PrivateRoute from "./PrivateRoute";
import Pets from "../pages/pets";
import Owners from "../pages/owners";
import TypeServices from "../pages/typeService"
import Services from "../pages/service"
import Users from "../pages/users"

function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Login></Login>}></Route>
            <Route path='/dashboard' 
                element={
                <PrivateRoute>
                <Dashboard/>
                </PrivateRoute>
            }></Route>
            <Route path='/pets' element={
                <PrivateRoute>
                <Pets/>
                </PrivateRoute>
            }></Route>
            <Route path='/owners' element={
                <PrivateRoute>
                <Owners/>
                </PrivateRoute>
            }></Route>
            <Route path='/service-types' element={
                <PrivateRoute>
                <TypeServices/>
                </PrivateRoute>
            }></Route>
            <Route path='/services' element={
                <PrivateRoute>
                <Services/>
                </PrivateRoute>
            }></Route>
            <Route path='/users' element={
                <PrivateRoute>
                <Users/>
                </PrivateRoute>
            }></Route>
            
        </Routes>
    )
}


export default AppRoutes