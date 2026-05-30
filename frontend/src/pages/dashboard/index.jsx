import e from "cors";
import { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import "./style.css"
import DashboardMenu from "../../components/DashboardMenu/DashBoardMenu";
function Dashboard(){
    return(
        <>
        <MainLayout>
            <h1 className="Dashboard">Dashboard</h1>
            <DashboardMenu/>
            </MainLayout>
        </>
    )
}

export default Dashboard