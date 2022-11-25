import React from 'react'
import { Outlet } from 'react-router-dom'
import Menubar from '../components/Menubar'

const Main = () => {
    return (
        <div>
            <Menubar />
            <Outlet />
        </div>
    )
}

export default Main