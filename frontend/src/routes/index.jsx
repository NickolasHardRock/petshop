import { Routes, Route } from "react-router-dom";
import Login from '../pages/login'
import Dashboard from '../pages/dashboard'
import PrivateRoute from "./PrivateRoute";
import Pets from "../pages/pets";
import Owners from "../pages/owners";
<<<<<<< HEAD
import MainLayout from "../layouts/MainLayout";
=======
import TypeServices from "../pages/typeService"
import Services from "../pages/service"
import Users from "../pages/users"
>>>>>>> a24f0eeabcb9be8de772269c37af79a05db3e748

function AppRoutes() {
    return (
        <div>
        <MainLayout/>
        <Routes>
<<<<<<< HEAD
                <Route path='/' element={<Login></Login>} />    
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/pets' element={<Pets />} />
                <Route path='/owners' element={<Owners />} />
=======
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
            
>>>>>>> a24f0eeabcb9be8de772269c37af79a05db3e748
        </Routes>
        </div>
    )
}


export default AppRoutes