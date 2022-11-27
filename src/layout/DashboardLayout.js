import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Menubar from '../components/Menubar'

const DashboardLayout = () => {
    return (
        <div>
            <Menubar />
            <div className='max-w-[1440px] mx-auto'>
                <div className='text-center mt-10 mb-10'>
                    <Link to='/dashboard/my-orders' className='inline-block mr-3 mb-5'>
                        <button className="btn btn-outline btn-success rounded-full px-8">My Orders</button>
                    </Link>
                    <Link to='/' className='inline-block mr-3 mb-5'>
                        <button className="btn btn-outline btn-success rounded-full px-8">Add A product</button>
                    </Link>
                    <Link to='/' className='inline-block mr-3 mb-5'>
                        <button className="btn btn-outline btn-success rounded-full px-8">My Products</button>
                    </Link>
                    <Link to='/' className='inline-block mr-3 mb-5'>
                        <button className="btn btn-outline btn-success rounded-full px-8">All Sellers</button>
                    </Link>
                    <Link to='/' className='inline-block mr-3 mb-5'>
                        <button className="btn btn-outline btn-success rounded-full px-8">All Buyers</button>
                    </Link>
                </div>
                <Outlet />
            </div>
        </div>
    )
}

export default DashboardLayout