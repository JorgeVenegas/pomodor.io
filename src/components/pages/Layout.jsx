import React from 'react'
import { Outlet } from "react-router-dom";
import NavBar from '../NavBar';

const Layout = () => {
    return (
        <div className='h-full flex flex-col'>
            <div className="fixed top-0 w-full flex justify-center">
                <NavBar />
            </div>
            <div className="h-full pt-16 flex justify-center">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout