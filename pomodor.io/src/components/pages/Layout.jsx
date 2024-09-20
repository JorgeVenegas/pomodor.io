import React from 'react'
import { Outlet } from "react-router-dom";
import NavBar from '../NavBar';

const Layout = () => {
    return (
        <div className="h-screen">
            <div className="fixed top-0">
                <NavBar />
            </div>
            <Outlet />
        </div>
    )
}

export default Layout