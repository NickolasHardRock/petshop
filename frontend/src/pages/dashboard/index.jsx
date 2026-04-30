import e from "cors";
import { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import "./style.css"
function Dashboard(){
    return(
        <>
            <h1 className="Dashboard">Dashboard</h1>
            <MainLayout></MainLayout>
        </>
    )
}

export default Dashboard