import { Routes, Route } from "react-router-dom";
import Login from '../pages/login'
import Dashboard from '../pages/dashboard'
import PrivateRoute from "./PrivateRoute";
import Pets from "../pages/pets";
import Owners from "../pages/owners";
import MainLayout from "../layouts/MainLayout";

function AppRoutes(){
    return(
        <Routes>
            <Route path='/' element={<Login></Login>}></Route>
            <Route element={
                <PrivateRoute>
                    <MainLayout></MainLayout>
                </PrivateRoute>
            }
            ></Route>
            <Route path='/dashboard' element={<Dashboard/>}></Route>
            <Route path='/pets' element={<Pets/>}></Route>
            <Route path='/owners' element={<Owners/>}></Route>            
        </Routes>
    )
}


export default AppRoutes