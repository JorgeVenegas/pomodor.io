import React from 'react'
import { Outlet } from "react-router-dom";
import NavBar from '../NavBar';

const Layout = () => {
    return (
        <div className='flex flex-col'>
            <div className="fixed top-0 w-full flex justify-center">
                <NavBar />
            </div>
            <div className="h-full mt-16">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout