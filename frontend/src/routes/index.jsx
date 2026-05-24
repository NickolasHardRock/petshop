import { Routes, Route } from "react-router-dom";
import Login from '../pages/login'
import Dashboard from '../pages/dashboard'
import PrivateRoute from "./PrivateRoute";
import Pets from "../pages/pets";
import Owners from "../pages/owners";

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
            {/* <Route path='/services' element={
                <PrivateRoute>
                <Service/>
                </PrivateRoute>
            }></Route>
            <Route path='/typeServices' element={
                <PrivateRoute>
                <TypeService/>
                </PrivateRoute>
            }></Route>
            <Route path='/users' element={
                <PrivateRoute>
                <Users/>
                </PrivateRoute>
            }></Route>             */}
        </Routes>
    )
}


export default AppRoutes